import { NextRequest, NextResponse } from "next/server";
import { getAgreements, addAgreement } from "../../../lib/agreements";

// 静态导出时需声明，否则 build 报错；部署到 Pages 时 /api 需由 Workers 或后端提供
export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    const list = await getAgreements(email ?? undefined);
    return NextResponse.json({ agreements: list });
  } catch (e) {
    console.error("GET /api/agreements", e);
    return NextResponse.json(
      { error: "Failed to load agreements" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email : null;
    const document =
      body?.document === "terms" || body?.document === "privacy"
        ? body.document
        : "content-license";
    const documentVersion =
      typeof body?.documentVersion === "string"
        ? body.documentVersion
        : "2025-03-10";

    if (!email) {
      return NextResponse.json(
        { error: "Missing or invalid email" },
        { status: 400 }
      );
    }

    const record = await addAgreement(email, document, documentVersion);
    return NextResponse.json(record, { status: 201 });
  } catch (e) {
    console.error("POST /api/agreements", e);
    return NextResponse.json(
      { error: "Failed to create agreement" },
      { status: 500 }
    );
  }
}
