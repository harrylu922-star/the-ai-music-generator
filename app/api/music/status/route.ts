import { NextResponse } from "next/server";
import { ApiError, errorResponse } from "../../../../lib/server/api";
import { requireUser } from "../../../../lib/server/auth";
import { databaseRpc, type GenerationJob } from "../../../../lib/server/db";
import {
  fetchMusicStatus,
  persistGeneratedAudio,
} from "../../../../lib/server/music-provider";

export async function GET(request: Request) {
  try {
    const user = await requireUser();
    const jobId = new URL(request.url).searchParams.get("jobId") ?? "";
    let job = await databaseRpc<GenerationJob>("getJob", { userId: user.id, jobId });
    if (job.status === "completed" || job.status === "failed") {
      return NextResponse.json({ ok: job.status === "completed", job });
    }
    if (!job.providerJobId) {
      throw new ApiError(409, "JOB_NOT_READY", "The music provider has not returned a job ID yet.");
    }

    const providerResult = await fetchMusicStatus(job.providerJobId);
    if (providerResult.status === "failed") {
      job = await databaseRpc<GenerationJob>("updateJob", {
        jobId: job.id,
        status: "failed",
        error: providerResult.error ?? "Music generation failed.",
      });
      return NextResponse.json({ ok: false, job, error: job.error }, { status: 502 });
    }

    if (providerResult.status === "completed" && providerResult.audioUrl) {
      const stored = await persistGeneratedAudio(
        user.id,
        job.id,
        providerResult.audioUrl,
        providerResult.duration
      );
      job = await databaseRpc<GenerationJob>("updateJob", {
        jobId: job.id,
        status: "completed",
        result: { status: "completed", ...stored },
      });
      return NextResponse.json({ ok: true, job });
    }

    job = await databaseRpc<GenerationJob>("updateJob", {
      jobId: job.id,
      status: "generating",
      providerJobId: providerResult.providerJobId ?? job.providerJobId,
    });
    return NextResponse.json({ ok: true, job }, { status: 202 });
  } catch (error) {
    return errorResponse(error);
  }
}
