import { getCloudflareContext } from "@opennextjs/cloudflare";
import { ApiError } from "./api";

export type CreditUser = {
  id: string;
  email: string;
  displayName: string;
  credits: number;
  plan: string;
  planPeriodEnd: number | null;
  createdAt: number;
};

export type GenerationJob = {
  id: string;
  type: "music" | "lyrics";
  status: "queued" | "generating" | "completed" | "failed";
  title: string;
  request: Record<string, unknown>;
  result: Record<string, unknown> | null;
  error: string | null;
  providerJobId: string | null;
  createdAt: number;
  updatedAt: number;
};

export async function databaseRpc<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.APP_DATABASE) {
    throw new ApiError(
      503,
      "DATABASE_NOT_CONFIGURED",
      "Account services are not configured in this environment."
    );
  }

  const response = await env.APP_DATABASE.getByName("global").fetch("https://app-db.internal/rpc", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, payload }),
  });
  const result = (await response.json()) as T & { error?: string; code?: string };
  if (!response.ok) {
    throw new ApiError(
      response.status,
      result.code ?? "DATABASE_ERROR",
      result.error ?? "Database request failed."
    );
  }
  return result;
}
