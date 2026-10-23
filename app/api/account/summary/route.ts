import { NextResponse } from "next/server";
import { errorResponse } from "../../../../lib/server/api";
import { requireUser } from "../../../../lib/server/auth";
import { databaseRpc, type GenerationJob } from "../../../../lib/server/db";

type Purchase = {
  productId: string;
  credits: number;
  createdAt: number;
};

export async function GET() {
  try {
    const user = await requireUser();
    const [jobs, purchases] = await Promise.all([
      databaseRpc<GenerationJob[]>("listJobs", { userId: user.id, limit: 50 }),
      databaseRpc<Purchase[]>("listPurchases", { userId: user.id }),
    ]);
    return NextResponse.json({ ok: true, user, jobs, purchases });
  } catch (error) {
    return errorResponse(error);
  }
}
