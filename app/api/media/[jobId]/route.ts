import { errorResponse } from "../../../../lib/server/api";
import { requireUser } from "../../../../lib/server/auth";
import { databaseRpc, type GenerationJob } from "../../../../lib/server/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  request: Request,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const user = await requireUser();
    const { jobId } = await context.params;
    const job = await databaseRpc<GenerationJob>("getJob", { userId: user.id, jobId });
    const audioKey = String(job.result?.audioKey ?? "");
    const audioExtension = String(job.result?.audioExtension ?? "mp3");
    if (!audioKey) return new Response("Not found", { status: 404 });

    const { env } = await getCloudflareContext({ async: true });
    const rangeHeader = request.headers.get("range");
    let range: { offset: number; length?: number } | undefined;
    let contentRange = "";
    let responseLength: number | undefined;
    if (rangeHeader) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
      if (!match) return new Response("Invalid range", { status: 416 });
      const start = match[1] ? Number(match[1]) : undefined;
      const end = match[2] ? Number(match[2]) : undefined;
      const metadata = await env.MEDIA_BUCKET.head(audioKey);
      if (!metadata) return new Response("Not found", { status: 404 });
      if (start === undefined && end !== undefined) {
        const length = Math.min(end, metadata.size);
        range = { offset: metadata.size - length, length };
        contentRange = `bytes ${metadata.size - length}-${metadata.size - 1}/${metadata.size}`;
        responseLength = length;
      } else if (start !== undefined) {
        if (start >= metadata.size) {
          return new Response("Range not satisfiable", {
            status: 416,
            headers: { "content-range": `bytes */${metadata.size}` },
          });
        }
        const finalEnd = Math.min(end ?? metadata.size - 1, metadata.size - 1);
        responseLength = finalEnd - start + 1;
        range = { offset: start, length: responseLength };
        contentRange = `bytes ${start}-${finalEnd}/${metadata.size}`;
      }
    }

    const object = await env.MEDIA_BUCKET.get(audioKey, range ? { range } : undefined);
    if (!object) return new Response("Not found", { status: 404 });
    const headers = new Headers({
      "content-type": object.httpMetadata?.contentType ?? "audio/mpeg",
      "cache-control": "private, max-age=3600",
      "accept-ranges": "bytes",
      "content-disposition": `inline; filename="${job.id}.${audioExtension}"`,
    });
    if (responseLength !== undefined) headers.set("content-length", String(responseLength));
    else headers.set("content-length", String(object.size));
    if (contentRange) headers.set("content-range", contentRange);
    return new Response(object.body, { status: range ? 206 : 200, headers });
  } catch (error) {
    return errorResponse(error);
  }
}
