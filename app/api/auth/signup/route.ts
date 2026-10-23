import { NextResponse } from "next/server";
import { errorResponse, readJson } from "../../../../lib/server/api";
import {
  createPasswordRecord,
  createSession,
  enforceRateLimit,
  normalizeEmail,
  validateEmail,
  validatePassword,
} from "../../../../lib/server/auth";
import { databaseRpc, type CreditUser } from "../../../../lib/server/db";

type SignupBody = {
  displayName?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    await enforceRateLimit(request, "signup", 5, 15 * 60 * 1000);
    const body = await readJson<SignupBody>(request);
    const email = normalizeEmail(body.email ?? "");
    const password = body.password ?? "";
    validateEmail(email);
    validatePassword(password);

    const passwordRecord = await createPasswordRecord(password);
    const user = await databaseRpc<CreditUser>("createUser", {
      email,
      displayName: String(body.displayName ?? "").slice(0, 80),
      ...passwordRecord,
    });
    await createSession(user.id);
    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
