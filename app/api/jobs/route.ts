import { NextResponse } from "next/server";
import { errorResponse } from "../../../lib/server/api";
import { requireUser } from "../../../lib/server/auth";
import { databaseRpc, type GenerationJob } from "../../../lib/server/db";

export async function GET(request: Request) {
  try {
    const user = await requireUser();
    const type = new URL(request.url).searchParams.get("type");
    const jobs = await databaseRpc<GenerationJob[]>("listJobs", {
      userId: user.id,
      type: type === "music" || type === "lyrics" ? type : undefined,
      limit: 50,
    });
    return NextResponse.json({ ok: true, jobs });
  } catch (error) {
    return errorResponse(error);
  }
}
