import { getCloudflareContext } from "@opennextjs/cloudflare";
import { ApiError } from "./api";

export type MusicRequest = {
  prompt: string;
  title: string;
  genre?: string;
  mood?: string;
  vocal?: string;
  lyrics?: string;
  durationSeconds?: number;
};

export type MusicProviderResult = {
  providerJobId: string | null;
  status: "generating" | "completed" | "failed";
  audioUrl?: string;
  duration?: number | null;
  error?: string;
};

function providerData(payload: Record<string, unknown>): Record<string, unknown> {
  if (
    typeof payload.code === "number" &&
    "data" in payload
  ) {
    if (payload.code !== 200) {
      throw new ApiError(
        502,
        "MUSIC_PROVIDER_ERROR",
        String(payload.msg ?? payload.message ?? `Music provider error ${payload.code}.`)
      );
    }
    if (typeof payload.data === "string") {
      return { jobId: payload.data };
    }
    return payload.data && typeof payload.data === "object"
      ? (payload.data as Record<string, unknown>)
      : {};
  }
  return payload;
}

function normalizePayload(payload: Record<string, unknown>): MusicProviderResult {
  payload = providerData(payload);
  const data =
    payload.data && typeof payload.data === "object"
      ? (payload.data as Record<string, unknown>)
      : payload;
  const rawStatus = String(data.status ?? payload.status ?? "generating").toLowerCase();
  const status =
    rawStatus === "completed" || rawStatus === "succeeded" || rawStatus === "success"
      ? "completed"
      : rawStatus === "failed" || rawStatus === "error"
        ? "failed"
        : "generating";
  let result = data.result ?? payload.result;
  if (typeof result === "string") {
    try {
      result = JSON.parse(result);
    } catch {
      result = null;
    }
  }
  const track =
    Array.isArray(result) && result[0] && typeof result[0] === "object"
      ? (result[0] as Record<string, unknown>)
      : null;
  const audioUrl = String(
    track?.audio_url ??
    track?.audioUrl ??
    data.audioUrl ?? data.audio_url ?? data.url ?? payload.audioUrl ?? ""
  );
  const rawDuration =
    track?.duration ??
    (track?.metadata && typeof track.metadata === "object"
      ? (track.metadata as Record<string, unknown>).duration
      : null) ??
    data.duration ??
    payload.duration;
  return {
    providerJobId: String(data.jobId ?? data.id ?? payload.jobId ?? payload.id ?? "") || null,
    status,
    audioUrl: audioUrl || undefined,
    duration:
      typeof rawDuration === "number"
        ? rawDuration
        : typeof rawDuration === "string" && Number.isFinite(Number(rawDuration))
          ? Number(rawDuration)
          : null,
    error: String(data.error ?? data.errorMsg ?? payload.error ?? "") || undefined,
  };
}

async function providerFetch(url: string, init: RequestInit): Promise<Record<string, unknown>> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.MUSIC_API_KEY) {
    throw new ApiError(503, "MUSIC_NOT_CONFIGURED", "Music generation is not configured yet.");
  }
  const response = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${env.MUSIC_API_KEY}`,
      "content-type": "application/json",
      ...init.headers,
    },
    signal: AbortSignal.timeout(30_000),
  });
  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    console.error("Music provider request failed", response.status, payload.error);
    throw new ApiError(
      502,
      "MUSIC_PROVIDER_ERROR",
      String(payload.error ?? payload.message ?? "The music provider rejected this request.")
    );
  }
  return payload;
}

export async function submitMusicJob(input: MusicRequest): Promise<MusicProviderResult> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.MUSIC_GENERATE_URL) {
    throw new ApiError(503, "MUSIC_NOT_CONFIGURED", "Music generation is not configured yet.");
  }
  const providerBody =
    env.MUSIC_PROVIDER === "cqtai"
      ? {
          task: "create",
          model: env.MUSIC_MODEL || "v50",
          customMode: false,
          makeInstrumental: /instrumental|no vocal/i.test(input.vocal ?? ""),
          prompt: [
            input.prompt,
            input.genre ? `Genre: ${input.genre}.` : "",
            input.mood ? `Mood: ${input.mood}.` : "",
            input.vocal ? `Vocal: ${input.vocal}.` : "",
            input.lyrics ? `Lyrics: ${input.lyrics}` : "",
            "Create an original track. Do not imitate a named artist or existing song.",
          ]
            .filter(Boolean)
            .join(" ")
            .slice(0, 400),
        }
      : input;
  return normalizePayload(
    await providerFetch(env.MUSIC_GENERATE_URL, {
      method: "POST",
      body: JSON.stringify(providerBody),
    })
  );
}

export async function fetchMusicStatus(providerJobId: string): Promise<MusicProviderResult> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.MUSIC_STATUS_URL) {
    throw new ApiError(503, "MUSIC_NOT_CONFIGURED", "Music status polling is not configured yet.");
  }
  const statusUrl = new URL(env.MUSIC_STATUS_URL);
  statusUrl.searchParams.set(
    env.MUSIC_PROVIDER === "cqtai" ? "id" : "jobId",
    providerJobId
  );
  return normalizePayload(
    await providerFetch(statusUrl.toString(), {
      method: "GET",
    })
  );
}

export async function persistGeneratedAudio(
  userId: string,
  jobId: string,
  audioUrl: string,
  duration: number | null | undefined
): Promise<{
  audioUrl: string;
  audioKey: string;
  audioExtension: string;
  duration: number | null;
}> {
  const parsed = new URL(audioUrl);
  if (parsed.protocol !== "https:") {
    throw new ApiError(502, "INVALID_MEDIA_URL", "The provider returned an insecure media URL.");
  }

  const { env } = await getCloudflareContext({ async: true });
  const response = await fetch(parsed, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    throw new ApiError(502, "MEDIA_FETCH_FAILED", "Could not retrieve the generated audio.");
  }
  const contentLength = Number(response.headers.get("content-length") ?? "0");
  if (contentLength > 25 * 1024 * 1024) {
    throw new ApiError(413, "MEDIA_TOO_LARGE", "The generated audio exceeds the storage limit.");
  }
  const contentType = response.headers.get("content-type") ?? "audio/mpeg";
  if (!contentType.startsWith("audio/")) {
    throw new ApiError(502, "INVALID_MEDIA_TYPE", "The provider did not return an audio file.");
  }
  const bytes = await response.arrayBuffer();
  if (bytes.byteLength > 25 * 1024 * 1024) {
    throw new ApiError(413, "MEDIA_TOO_LARGE", "The generated audio exceeds the storage limit.");
  }
  const extension = contentType.includes("mp4")
    ? "m4a"
    : contentType.includes("wav")
      ? "wav"
      : contentType.includes("ogg")
        ? "ogg"
        : "mp3";
  const audioKey = `music/${userId}/${jobId}.${extension}`;
  await env.MEDIA_BUCKET.put(audioKey, bytes, {
    httpMetadata: { contentType, cacheControl: "private, max-age=3600" },
    customMetadata: { userId, jobId },
  });
  return {
    audioUrl: `/api/media/${jobId}`,
    audioKey,
    audioExtension: extension,
    duration: duration ?? null,
  };
}
