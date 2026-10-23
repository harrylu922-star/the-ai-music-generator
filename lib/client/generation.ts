export type ClientGenerationJob = {
  id: string;
  type: "music" | "lyrics";
  status: "queued" | "generating" | "completed" | "failed";
  title: string;
  request: Record<string, unknown>;
  result: {
    lyrics?: string;
    audioUrl?: string;
    duration?: number | null;
  } | null;
  error: string | null;
  createdAt: number;
  updatedAt: number;
};

export async function apiJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });
  if (response.status === 401) {
    const next = `${window.location.pathname}${window.location.search}`;
    const authUrl = new URL("/auth", window.location.origin);
    authUrl.searchParams.set("next", next);
    window.location.assign(authUrl.toString());
    throw new Error("Sign in to continue.");
  }
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(data.error ?? "The request failed.");
  return data;
}

export async function pollMusicJob(
  initial: ClientGenerationJob,
  onUpdate: (job: ClientGenerationJob) => void
): Promise<ClientGenerationJob> {
  let job = initial;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (job.status === "completed" || job.status === "failed") return job;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await apiJson<{ job: ClientGenerationJob }>(
      `/api/music/status?jobId=${encodeURIComponent(job.id)}`,
      { cache: "no-store" }
    );
    job = response.job;
    onUpdate(job);
  }
  throw new Error("Generation timed out. Check your account for the latest status.");
}
