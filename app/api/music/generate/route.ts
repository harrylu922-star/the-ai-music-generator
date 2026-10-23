import { NextResponse } from "next/server";
import {
  ApiError,
  errorResponse,
  readJson,
} from "../../../../lib/server/api";
import { enforceRateLimit, requireUser } from "../../../../lib/server/auth";
import { databaseRpc, type GenerationJob } from "../../../../lib/server/db";
import {
  persistGeneratedAudio,
  submitMusicJob,
  type MusicRequest,
} from "../../../../lib/server/music-provider";

const MUSIC_CREDIT_UNITS = 3;

export async function POST(request: Request) {
  let job: GenerationJob | null = null;
  try {
    const user = await requireUser();
    await enforceRateLimit(request, "music-generate", 10, 60_000);
    const body = await readJson<Partial<MusicRequest>>(request);
    const prompt = String(body.prompt ?? "").trim();
    const lyrics = String(body.lyrics ?? "").trim();
    if ((!prompt && !lyrics) || prompt.length > 500 || lyrics.length > 5000) {
      throw new ApiError(400, "INVALID_MUSIC_REQUEST", "Provide a prompt or lyrics within the allowed length.");
    }
    const title = String(body.title ?? "").trim().slice(0, 80) || "Untitled";
    const input: MusicRequest = {
      prompt,
      title,
      genre: String(body.genre ?? "").slice(0, 100),
      mood: String(body.mood ?? "").slice(0, 100),
      vocal: String(body.vocal ?? "").slice(0, 100),
      lyrics,
      durationSeconds:
        Number.isFinite(Number(body.durationSeconds)) && Number(body.durationSeconds) > 0
          ? Math.min(480, Number(body.durationSeconds))
          : undefined,
    };

    job = await databaseRpc<GenerationJob>("createJob", {
      userId: user.id,
      type: "music",
      title,
      request: input,
      creditUnits: MUSIC_CREDIT_UNITS,
    });

    const result = await submitMusicJob(input);
    if (result.status === "failed") {
      const failedJob = await databaseRpc<GenerationJob>("updateJob", {
        jobId: job.id,
        status: "failed",
        error: result.error ?? "Music generation failed.",
      });
      return NextResponse.json({ ok: false, job: failedJob, error: failedJob.error }, { status: 502 });
    }

    let finalResult: Record<string, unknown> = {
      status: result.status,
      duration: result.duration ?? null,
    };
    if (result.status === "completed" && result.audioUrl) {
      finalResult = {
        ...finalResult,
        status: "completed",
        ...(await persistGeneratedAudio(user.id, job.id, result.audioUrl, result.duration)),
      };
    }

    job = await databaseRpc<GenerationJob>("updateJob", {
      jobId: job.id,
      status: result.status,
      providerJobId: result.providerJobId,
      result: finalResult,
    });
    return NextResponse.json({ ok: true, job }, { status: result.status === "completed" ? 200 : 202 });
  } catch (error) {
    if (job) {
      await databaseRpc("updateJob", {
        jobId: job.id,
        status: "failed",
        error: error instanceof Error ? error.message : "Music generation failed.",
      }).catch(() => undefined);
    }
    return errorResponse(error);
  }
}
