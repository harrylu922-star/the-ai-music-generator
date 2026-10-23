import { NextResponse } from "next/server";

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function errorResponse(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { ok: false, error: error.message, code: error.code },
      { status: error.status }
    );
  }

  console.error("Unhandled API error", error);
  return NextResponse.json(
    { ok: false, error: "The server could not complete this request.", code: "INTERNAL_ERROR" },
    { status: 500 }
  );
}

export async function readJson<T>(request: Request): Promise<T> {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 64 * 1024) {
    throw new ApiError(413, "PAYLOAD_TOO_LARGE", "The request is too large.");
  }

  try {
    return (await request.json()) as T;
  } catch {
    throw new ApiError(400, "INVALID_JSON", "Provide a valid JSON request body.");
  }
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local"
  );
}
