# 后端还需完善的内容

当前项目**没有后端实现**：无 `app/api` 路由、无真实鉴权/支付、音乐与歌词生成均为前端 mock。以下按优先级列出需要完善的后端内容。

---

## 一、核心能力（产品闭环必做）

### 1. 认证与用户（Auth）

| 项 | 说明 | 当前状态 |
|----|------|----------|
| 注册 / 登录 | 邮箱或第三方登录，发 token 或 session | 无，仅 `useLoginPreview` 读 cookie 模拟 |
| 登出 | 清除 session / token | 无 |
| 会话校验 | 请求头或 cookie 校验身份，保护 API | 无 |
| 用户信息 | 昵称、头像、邮箱等，供 Header/个人中心 | 无 |

**建议**：NextAuth.js、Clerk、Supabase Auth 等选一；或自建 JWT + 数据库用户表。

---

### 2. AI 音乐生成 API

| 项 | 说明 | 当前状态 |
|----|------|----------|
| 提交任务 | 接收 prompt / title / genre / mood / vocal 等，调用第三方或自建模型（如 Suno、Udio、Replicate） | 无，前端 `handleGenerate` 仅写本地 state + 2 秒后改 status |
| 任务状态 | 轮询或 WebSocket 返回 generating → completed / failed | 无 |
| 音频存储与 URL | 生成完成后上传到 OSS/S3，返回可播放、可下载的 URL | 无 |
| 单次扣费 | 与计费模块联动，每次生成扣 credits | 无 |

**接口形态示例**：  
`POST /api/music/generate` → 返回 `{ jobId }`；  
`GET /api/music/status?jobId=xxx` 或 WebSocket → 返回 `{ status, audioUrl? }`。

---

### 3. AI 歌词生成 API

| 项 | 说明 | 当前状态 |
|----|------|----------|
| 生成歌词 | 接收 title、prompt、structure、style、language、vocal 等，调 LLM 或专用歌词接口 | 无，前端 1.5 秒后写死 “(Lyrics generated.)” |
| 可选：持久化 | 登录用户的历史歌词存库，多端同步 | 无，仅前端 state |

**接口形态示例**：`POST /api/lyrics/generate` → 返回 `{ lyrics, ... }`。

---

### 4. 积分与计费（Credits & Billing）

| 项 | 说明 | 当前状态 |
|----|------|----------|
| 积分账户 | 用户维度：免费每日额度、订阅/一次性购买的 credits，存库并实时查询 | 无，定价页为静态文案 |
| 扣减逻辑 | 音乐/歌词生成前检查余额，生成成功后扣减 | 无 |
| 订阅与续费 | 月付/年付（如 Stripe），创建/更新订阅、续期、取消 | 无，定价 CTA 指向 `#` |
| 一次性购买 | Credit 包购买、支付回调后加额 | 无 |
| Webhook | 支付成功/失败、订阅状态变更的回调处理 | 无 |

**依赖**：用户体系（Auth）+ 音乐/歌词生成 API 的“生成前校验、生成后扣费”策略。

---

## 二、存储与数据（支撑核心能力）

### 5. 用户数据与生成记录

| 项 | 说明 | 当前状态 |
|----|------|----------|
| 用户表 | id, email, name, avatar, createdAt 等 | 无 |
| 音乐生成记录 | userId, jobId, prompt, title, audioUrl, duration, creditsUsed, createdAt | 无，仅前端 state |
| 歌词生成记录 | userId, title, prompt, lyrics, tags, createdAt（可选） | 无 |
| 云端存储时长 | 定价页提到的 7 天/365 天等，需按计划在存储或任务表体现 | 无 |

**建议**：PostgreSQL / MySQL + Prisma 或 Drizzle；或 Supabase（Auth + DB + Storage 一体）。

---

### 6. 文件与媒体存储

| 项 | 说明 | 当前状态 |
|----|------|----------|
| 生成音频文件 | 上传至 S3 / R2 / Cloudflare 等，生成公开或签名 URL | 无 |
| 可选：封面图 | 若支持自定义封面，同上 | 无 |

---

## 三、安全与运维（上线前建议有）

### 7. 安全与限流

| 项 | 说明 |
|----|------|
| 鉴权中间件 | 对 `/api/music/*`、`/api/lyrics/*`、`/api/billing/*` 等校验登录与权限 |
| 限流 | 按 IP 或 userId 限制生成/登录/支付接口 QPS，防刷 |
| 输入校验 | prompt 长度、敏感词、参数类型与范围校验 |

### 8. 配置与环境

| 项 | 说明 |
|----|------|
| 环境变量 | AI 服务 API Key、数据库连接、Stripe Key、OSS 配置等放入 `.env`，不提交仓库 |
| 功能开关 | 免费/付费策略、单日免费次数等可配置，便于运营 |

---

## 四、建议实现顺序

1. **Auth**：先有用户与会话，再谈积分与记录。
2. **数据库**：用户表 + 音乐/歌词记录表（及可选订阅/订单表）。
3. **AI 音乐 API**：对接一家音乐生成服务，实现「提交 → 轮询/推送 → 存音频 → 返 URL」。
4. **AI 歌词 API**：对接 LLM 或歌词接口，返回歌词文本。
5. **积分与扣费**：定义 credits 规则，在生成接口内做“查余额 → 扣减”。
6. **支付**：Stripe 订阅 + 一次性购买，Webhook 给用户加 credits。
7. **存储**：生成音频上传 OSS，记录表存 URL；按计划实现“过期删除”策略。

---

## 五、与前端对接点（便于联调）

| 前端位置 | 需要后端提供 |
|----------|--------------|
| `AiMusicGeneratorWorkspace` 的 `handleGenerate` | `POST /api/music/generate`，轮询或 WS 的 status/audioUrl |
| `LyricsGeneratorWorkspace` 的 `handleGenerate` | `POST /api/lyrics/generate` 返回歌词 |
| `useLoginPreview` / Header “Sign in” | 真实登录 API 或 OAuth，并将会话写入 cookie/header |
| 定价页 “Subscribe Now” / “One-time Purchase” | 创建 Checkout Session 或支付链接（如 Stripe） |
| 历史列表 / 播放器 | 若历史从服务端拉取，需 `GET /api/music/history`、`/api/lyrics/history` 及音频 URL |

以上为当前后端需要完善的内容清单，可按阶段（如先 Auth + 音乐 API + 积分）逐步实现。
