import { DurableObject } from "cloudflare:workers";

const FREE_DAILY_UNITS = 12;
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function publicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    credits: (row.free_credit_units + row.paid_credit_units) / 2,
    plan: row.plan,
    planPeriodEnd: row.plan_period_end,
    createdAt: row.created_at,
  };
}

function publicJob(row) {
  if (!row) return null;
  return {
    id: row.id,
    type: row.type,
    status: row.status,
    title: row.title,
    request: JSON.parse(row.request_json),
    result: row.result_json ? JSON.parse(row.result_json) : null,
    error: row.error,
    providerJobId: row.provider_job_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class AppDatabase extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
    this.env = env;
    ctx.blockConcurrencyWhile(async () => this.initialize());
  }

  initialize() {
    const sql = this.ctx.storage.sql;
    sql.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        display_name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        free_credit_units INTEGER NOT NULL DEFAULT 12,
        paid_credit_units INTEGER NOT NULL DEFAULT 0,
        daily_refill_at INTEGER NOT NULL,
        plan TEXT NOT NULL DEFAULT 'free',
        plan_period_end INTEGER,
        stripe_customer_id TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS sessions (
        session_hash TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        title TEXT NOT NULL,
        request_json TEXT NOT NULL,
        result_json TEXT,
        error TEXT,
        provider_job_id TEXT,
        charged_free_units INTEGER NOT NULL DEFAULT 0,
        charged_paid_units INTEGER NOT NULL DEFAULT 0,
        credits_refunded INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS jobs_user_type_idx ON jobs(user_id, type, created_at DESC);
      CREATE TABLE IF NOT EXISTS purchases (
        event_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        credit_units INTEGER NOT NULL,
        stripe_session_id TEXT,
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS purchases_user_idx ON purchases(user_id, created_at DESC);
      CREATE TABLE IF NOT EXISTS rate_limits (
        key TEXT PRIMARY KEY,
        window_start INTEGER NOT NULL,
        count INTEGER NOT NULL
      );
    `);
  }

  async fetch(request) {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

    try {
      const body = await request.json();
      const result = await this.dispatch(body.action, body.payload ?? {});
      return json(result);
    } catch (error) {
      const status = Number.isInteger(error?.status) ? error.status : 500;
      return json(
        {
          error: status === 500 ? "Database operation failed" : error.message,
          code: error?.code ?? "DATABASE_ERROR",
        },
        status
      );
    }
  }

  maybeRefill(user) {
    if (!user || user.daily_refill_at > Date.now()) return user;
    const now = Date.now();
    const nextRefill = now + 24 * 60 * 60 * 1000;
    this.ctx.storage.sql.exec(
      `UPDATE users
       SET free_credit_units = ?,
           daily_refill_at = ?,
           updated_at = ?
       WHERE id = ?`,
      FREE_DAILY_UNITS,
      nextRefill,
      now,
      user.id
    );
    return this.getUser(user.id);
  }

  getUser(id) {
    const row = this.ctx.storage.sql
      .exec("SELECT * FROM users WHERE id = ?", id)
      .toArray()[0];
    return this.maybeRefill(row);
  }

  async dispatch(action, payload) {
    const sql = this.ctx.storage.sql;
    const now = Date.now();

    switch (action) {
      case "ping":
        return { ok: true };

      case "rateLimit": {
        const key = String(payload.key ?? "");
        const limit = Math.max(1, Number(payload.limit) || 10);
        const windowMs = Math.max(1000, Number(payload.windowMs) || 60000);
        const row = sql
          .exec("SELECT * FROM rate_limits WHERE key = ?", key)
          .toArray()[0];
        let count = 1;
        let windowStart = now;
        if (row && now - row.window_start < windowMs) {
          count = row.count + 1;
          windowStart = row.window_start;
        }
        sql.exec(
          `INSERT INTO rate_limits (key, window_start, count)
           VALUES (?, ?, ?)
           ON CONFLICT(key) DO UPDATE SET window_start = excluded.window_start, count = excluded.count`,
          key,
          windowStart,
          count
        );
        return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
      }

      case "createUser": {
        const email = String(payload.email ?? "").trim().toLowerCase();
        const existing = sql
          .exec("SELECT * FROM users WHERE email = ?", email)
          .toArray()[0];
        if (existing) throw Object.assign(new Error("An account already exists for this email"), { status: 409, code: "EMAIL_EXISTS" });

        const id = crypto.randomUUID();
        const dailyRefillAt = now + 24 * 60 * 60 * 1000;
        sql.exec(
          `INSERT INTO users
            (id, email, display_name, password_hash, password_salt,
             free_credit_units, paid_credit_units, daily_refill_at,
             plan, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, 0, ?, 'free', ?, ?)`,
          id,
          email,
          String(payload.displayName ?? "").trim() || email.split("@")[0],
          payload.passwordHash,
          payload.passwordSalt,
          FREE_DAILY_UNITS,
          dailyRefillAt,
          now,
          now
        );
        return publicUser(this.getUser(id));
      }

      case "getUserByEmail": {
        const row = sql
          .exec("SELECT * FROM users WHERE email = ?", String(payload.email ?? "").trim().toLowerCase())
          .toArray()[0];
        return row
          ? { ...publicUser(this.maybeRefill(row)), passwordHash: row.password_hash, passwordSalt: row.password_salt }
          : null;
      }

      case "getUser":
        return publicUser(this.getUser(String(payload.userId ?? "")));

      case "createSession": {
        const expiresAt = now + SESSION_TTL_SECONDS * 1000;
        sql.exec(
          "INSERT INTO sessions (session_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)",
          payload.sessionHash,
          payload.userId,
          expiresAt,
          now
        );
        return { expiresAt };
      }

      case "getSession": {
        const row = sql
          .exec(
            `SELECT users.*
             FROM sessions
             JOIN users ON users.id = sessions.user_id
             WHERE sessions.session_hash = ? AND sessions.expires_at > ?`,
            payload.sessionHash,
            now
          )
          .toArray()[0];
        return publicUser(this.maybeRefill(row));
      }

      case "deleteSession":
        sql.exec("DELETE FROM sessions WHERE session_hash = ?", payload.sessionHash);
        return { ok: true };

      case "createJob": {
        let user = this.getUser(String(payload.userId ?? ""));
        if (!user) throw Object.assign(new Error("Account not found"), { status: 404, code: "USER_NOT_FOUND" });
        user = this.maybeRefill(user);
        const cost = Math.max(1, Number(payload.creditUnits) || 1);
        const free = Number(user.free_credit_units) || 0;
        const paid = Number(user.paid_credit_units) || 0;
        if (free + paid < cost) {
          throw Object.assign(new Error("Not enough credits"), { status: 402, code: "INSUFFICIENT_CREDITS" });
        }
        const chargeFree = Math.min(free, cost);
        const chargePaid = cost - chargeFree;
        const id = crypto.randomUUID();
        sql.exec(
          `UPDATE users
           SET free_credit_units = free_credit_units - ?,
               paid_credit_units = paid_credit_units - ?,
               updated_at = ?
           WHERE id = ?`,
          chargeFree,
          chargePaid,
          now,
          user.id
        );
        sql.exec(
          `INSERT INTO jobs
             (id, user_id, type, status, title, request_json,
              charged_free_units, charged_paid_units, created_at, updated_at)
           VALUES (?, ?, ?, 'queued', ?, ?, ?, ?, ?, ?)`,
          id,
          user.id,
          payload.type,
          payload.title,
          JSON.stringify(payload.request),
          chargeFree,
          chargePaid,
          now,
          now
        );
        return publicJob(
          sql.exec("SELECT * FROM jobs WHERE id = ?", id).toArray()[0]
        );
      }

      case "updateJob": {
        const job = sql
          .exec("SELECT * FROM jobs WHERE id = ?", payload.jobId)
          .toArray()[0];
        if (!job) throw Object.assign(new Error("Job not found"), { status: 404, code: "JOB_NOT_FOUND" });
        const status = String(payload.status ?? job.status);
        const shouldRefund = status === "failed" && !job.credits_refunded;
        sql.exec(
          `UPDATE jobs
           SET status = ?,
               result_json = COALESCE(?, result_json),
               error = ?,
               provider_job_id = COALESCE(?, provider_job_id),
               credits_refunded = CASE WHEN ? THEN 1 ELSE credits_refunded END,
               updated_at = ?
           WHERE id = ?`,
          status,
          payload.result ? JSON.stringify(payload.result) : null,
          payload.error ?? null,
          payload.providerJobId ?? null,
          shouldRefund ? 1 : 0,
          now,
          job.id
        );
        if (shouldRefund) {
          sql.exec(
            `UPDATE users
             SET free_credit_units = free_credit_units + ?,
                 paid_credit_units = paid_credit_units + ?,
                 updated_at = ?
             WHERE id = ?`,
            job.charged_free_units,
            job.charged_paid_units,
            now,
            job.user_id
          );
        }
        return publicJob(
          sql.exec("SELECT * FROM jobs WHERE id = ?", job.id).toArray()[0]
        );
      }

      case "getJob": {
        let row = sql
          .exec("SELECT * FROM jobs WHERE id = ?", payload.jobId)
          .toArray()[0];
        if (!row || row.user_id !== payload.userId) {
          throw Object.assign(new Error("Job not found"), { status: 404, code: "JOB_NOT_FOUND" });
        }
        return publicJob(row);
      }

      case "listJobs": {
        const type = payload.type ? String(payload.type) : null;
        const limit = Math.min(100, Math.max(1, Number(payload.limit) || 30));
        const rows = type
          ? sql.exec(
              "SELECT * FROM jobs WHERE user_id = ? AND type = ? ORDER BY created_at DESC LIMIT ?",
              payload.userId,
              type,
              limit
            ).toArray()
          : sql.exec(
              "SELECT * FROM jobs WHERE user_id = ? ORDER BY created_at DESC LIMIT ?",
              payload.userId,
              limit
            ).toArray();
        return rows.map(publicJob);
      }

      case "grantCredits": {
        const user = this.getUser(String(payload.userId ?? ""));
        if (!user) throw Object.assign(new Error("Account not found"), { status: 404, code: "USER_NOT_FOUND" });
        const units = Math.max(0, Number(payload.creditUnits) || 0);
        sql.exec(
          "UPDATE users SET paid_credit_units = paid_credit_units + ?, updated_at = ? WHERE id = ?",
          units,
          now,
          user.id
        );
        return publicUser(this.getUser(user.id));
      }

      case "recordPurchase": {
        const existing = sql
          .exec("SELECT event_id FROM purchases WHERE event_id = ?", payload.eventId)
          .toArray()[0];
        if (existing) return { duplicate: true };
        const user = this.getUser(String(payload.userId ?? ""));
        if (!user) throw Object.assign(new Error("Account not found"), { status: 404, code: "USER_NOT_FOUND" });
        sql.exec(
          `INSERT INTO purchases
             (event_id, user_id, product_id, credit_units, stripe_session_id, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
          payload.eventId,
          user.id,
          payload.productId,
          payload.creditUnits,
          payload.stripeSessionId ?? null,
          now
        );
        sql.exec(
          "UPDATE users SET paid_credit_units = paid_credit_units + ?, updated_at = ? WHERE id = ?",
          payload.creditUnits,
          now,
          user.id
        );
        return { duplicate: false, user: publicUser(this.getUser(user.id)) };
      }

      case "setSubscription": {
        sql.exec(
          `UPDATE users
           SET plan = ?, plan_period_end = ?, stripe_customer_id = COALESCE(?, stripe_customer_id), updated_at = ?
           WHERE id = ?`,
          payload.plan ?? "free",
          payload.planPeriodEnd ?? null,
          payload.stripeCustomerId ?? null,
          now,
          payload.userId
        );
        return publicUser(this.getUser(payload.userId));
      }

      case "listPurchases":
        return sql
          .exec(
            "SELECT product_id AS productId, credit_units AS creditUnits, created_at AS createdAt FROM purchases WHERE user_id = ? ORDER BY created_at DESC LIMIT 30",
            payload.userId
          )
          .toArray()
          .map((row) => ({ ...row, credits: row.creditUnits / 2 }));

      default:
        throw Object.assign(new Error("Unknown database action"), { status: 400, code: "UNKNOWN_ACTION" });
    }
  }
}

const worker = {
  async fetch(request, env) {
    if (request.method !== "POST") return json({ error: "Not found" }, 404);
    const stub = env.APP_DATABASE.get(env.APP_DATABASE.idFromName("global"));
    return stub.fetch(request);
  },
};

export default worker;
