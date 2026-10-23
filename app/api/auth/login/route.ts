import { NextResponse } from "next/server";
import { ApiError, errorResponse, readJson } from "../../../../lib/server/api";
import {
  createSession,
  enforceRateLimit,
  normalizeEmail,
  validateEmail,
  verifyPassword,
} from "../../../../lib/server/auth";
import { databaseRpc, type CreditUser } from "../../../../lib/server/db";

type LoginBody = {
  email?: string;
  password?: string;
};

type StoredUser = CreditUser & {
  passwordHash: string;
  passwordSalt: string;
};

export async function POST(request: Request) {
  try {
    await enforceRateLimit(request, "login", 10, 15 * 60 * 1000);
    const body = await readJson<LoginBody>(request);
    const email = normalizeEmail(body.email ?? "");
    validateEmail(email);

    const user = await databaseRpc<StoredUser | null>("getUserByEmail", { email });
    if (!user || !(await verifyPassword(body.password ?? "", user.passwordHash, user.passwordSalt))) {
      throw new ApiError(401, "INVALID_CREDENTIALS", "Email or password is incorrect.");
    }

    await createSession(user.id);
    const safeUser: CreditUser = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      credits: user.credits,
      plan: user.plan,
      planPeriodEnd: user.planPeriodEnd,
      createdAt: user.createdAt,
    };
    return NextResponse.json({ ok: true, user: safeUser });
  } catch (error) {
    return errorResponse(error);
  }
}
