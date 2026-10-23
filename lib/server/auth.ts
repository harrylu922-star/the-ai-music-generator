import { cookies } from "next/headers";
import { ApiError, clientIp } from "./api";
import { databaseRpc, type CreditUser } from "./db";

const SESSION_COOKIE = "tamg_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateEmail(email: string): void {
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ApiError(400, "INVALID_EMAIL", "Enter a valid email address.");
  }
}

export function validatePassword(password: string): void {
  if (password.length < 8 || password.length > 128) {
    throw new ApiError(400, "INVALID_PASSWORD", "Use a password between 8 and 128 characters.");
  }
}

export async function hashPassword(
  password: string,
  salt: Uint8Array<ArrayBuffer>
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 100_000 },
    key,
    256
  );
  return bytesToBase64(new Uint8Array(bits));
}

export async function createPasswordRecord(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return {
    passwordSalt: bytesToBase64(salt),
    passwordHash: await hashPassword(password, salt),
  };
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
  passwordSalt: string
): Promise<boolean> {
  const decodedSalt = Uint8Array.from(atob(passwordSalt), (char) => char.charCodeAt(0));
  const saltBuffer = new ArrayBuffer(decodedSalt.byteLength);
  new Uint8Array(saltBuffer).set(decodedSalt);
  const candidate = await hashPassword(password, new Uint8Array(saltBuffer));
  if (candidate.length !== passwordHash.length) return false;
  let mismatch = 0;
  for (let index = 0; index < candidate.length; index += 1) {
    mismatch |= candidate.charCodeAt(index) ^ passwordHash.charCodeAt(index);
  }
  return mismatch === 0;
}

export async function hashSessionToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return bytesToBase64(new Uint8Array(digest));
}

export async function createSession(userId: string): Promise<void> {
  const tokenBytes = crypto.getRandomValues(new Uint8Array(32));
  const token = bytesToBase64(tokenBytes);
  const sessionHash = await hashSessionToken(token);
  await databaseRpc("createSession", { userId, sessionHash });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await databaseRpc("deleteSession", {
      sessionHash: await hashSessionToken(token),
    });
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionUser(): Promise<CreditUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return databaseRpc<CreditUser | null>("getSession", {
    sessionHash: await hashSessionToken(token),
  });
}

export async function requireUser(): Promise<CreditUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new ApiError(401, "AUTH_REQUIRED", "Sign in to continue.");
  }
  return user;
}

export async function enforceRateLimit(
  request: Request,
  scope: string,
  limit: number,
  windowMs: number
): Promise<void> {
  const result = await databaseRpc<{ allowed: boolean }>("rateLimit", {
    key: `${scope}:${clientIp(request)}`,
    limit,
    windowMs,
  });
  if (!result.allowed) {
    throw new ApiError(429, "RATE_LIMITED", "Too many requests. Try again later.");
  }
}
