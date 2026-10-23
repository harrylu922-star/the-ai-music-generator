import { NextResponse } from "next/server";
import { errorResponse } from "../../../../lib/server/api";
import { getSessionUser } from "../../../../lib/server/auth";

export async function GET() {
  try {
    return NextResponse.json({ ok: true, user: await getSessionUser() });
  } catch (error) {
    return errorResponse(error);
  }
}
