import { NextResponse } from "next/server";
import { errorResponse } from "../../../../lib/server/api";
import { deleteSession } from "../../../../lib/server/auth";

export async function POST() {
  try {
    await deleteSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
