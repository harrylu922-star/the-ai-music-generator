import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return NextResponse.json({
      ok: true,
      services: {
        database: Boolean(env.APP_DATABASE),
        lyrics: Boolean(env.AI),
        music: Boolean(env.MUSIC_GENERATE_URL && env.MUSIC_STATUS_URL && env.MUSIC_API_KEY),
        stripe: Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET),
        media: Boolean(env.MEDIA_BUCKET),
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
