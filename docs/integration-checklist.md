# 接入真实 AI 歌词 / AI 音乐：除 API 外还需补充的内容

在「已有歌词/音乐生成 API」的前提下，以下内容仍需在项目内补充。

---

## 一、后端（Next.js BFF，推荐必做）

即使第三方直接提供 HTTP API，也建议用一层自己的后端，避免在前端暴露 API Key 并统一错误与鉴权。

| 项 | 说明 |
|----|------|
| **API 路由** | 例如 `POST /api/lyrics/generate`、`POST /api/music/generate`（或 `POST` 提交 + `GET /api/music/status?jobId=xxx` 轮询）。在路由内调用第三方 API，把前端参数转成对方格式，把对方返回转成前端约定格式。 |
| **环境变量** | 在服务端读取 `LYRICS_API_URL`、`MUSIC_API_URL`、`API_KEY` 等（不要写进前端代码或暴露给浏览器）。 |
| **错误与状态码** | 将第三方 4xx/5xx、限流、内容策略错误等转成统一 JSON 格式（如 `{ ok: false, code, message }`），便于前端统一处理。 |

---

## 二、前端：调用链与数据

### 1. 请求与参数

| 项 | 说明 |
|----|------|
| **调用入口** | 在 `LyricsGeneratorWorkspace` 的 `handleGenerate`、`AiMusicGeneratorWorkspace` 的 `handleGenerate` 中，用 `fetch`（或封装）请求上述 BFF 接口，不再用 `setTimeout` 模拟。 |
| **请求体** | 与 BFF 约定好请求体。歌词示例：`title, prompt, structure, style, language, vocal`；音乐示例：`prompt, title, genre, mood, vocal` 或 `lyrics + coverStyle`（Own Lyrics 模式）。 |

### 2. 歌词侧：响应与展示

| 项 | 说明 |
|----|------|
| **响应结构** | 约定 BFF 返回格式，例如 `{ lyrics: string }` 或 `{ ok: true, data: { lyrics } }`。 |
| **写入历史** | 用接口返回的 `lyrics` 写入当前条目的 `item.lyrics`，并设 `status: "completed"`；失败则设 `status: "completed"` 且 `lyrics` 为错误提示或单独 `error` 字段，便于 UI 区分。 |
| **无新增数据结构** | 现有 `LyricHistoryItem` 已有 `lyrics`、`status`，只需把 mock 替换成接口返回。 |

### 3. 音乐侧：响应、轮询与播放

| 项 | 说明 |
|----|------|
| **历史条目扩展** | `HistoryItem` 需增加 `audioUrl?: string`（及可选 `duration?: string`）。生成完成后用 API 返回的音频 URL 和时长写入。 |
| **异步模型** | 若 API 为「提交任务 → 返回 jobId → 轮询/WebSocket 获取结果」：需在前端实现轮询（或 WS），在收到 `status: completed` 且 `audioUrl` 时更新对应历史项；若失败或超时，将该项标为失败并提示。 |
| **播放器** | 底部播放条目前无 `<audio>`。需增加 `<audio src={playingItem?.audioUrl} />` 并绑定 ref，用其 `play()`/`pause()`、`timeupdate`、`ended` 驱动播放按钮与进度条；无 `audioUrl` 时禁用播放或显示「无音频」。 |
| **时长** | 若 API 返回时长（秒或 "MM:SS"），写入 `item.duration` 并在列表与播放条展示；若未返回，可保留 "—" 或由前端根据 audio 的 `duration` 计算。 |

---

## 三、前端：状态与体验

| 项 | 说明 |
|----|------|
| **加载中** | 请求发出后到收到结果前：禁用「Generate」按钮，或显示 loading 状态，避免重复提交。 |
| **错误处理** | 请求失败、超时、或 API 返回业务错误时：在列表该项旁或 toast 中展示可读错误信息（如「生成失败，请重试」），并将该条设为失败状态或从列表中移除，避免一直停在「生成中」。 |
| **空/失败状态** | 若仅保留「成功」记录，可提供「生成失败」的轻量提示（如 toast）；若在历史中保留失败项，需在 UI 上区分（如红色标签、不可播放）。 |

---

## 四、可选但建议

| 项 | 说明 |
|----|------|
| **请求校验** | 在 BFF 或前端提交前校验：prompt 长度上限、必填项（如歌词的 prompt、音乐的 prompt 或 lyrics），避免无效请求。 |
| **限流** | 在 BFF 按 IP 或用户做简单限流，防止滥用（在未接登录前可按 IP）。 |
| **.env.example** | 在仓库中提供 `.env.example`，列出 `LYRICS_API_URL`、`MUSIC_API_URL`、`API_KEY` 等占位，便于部署与协作。 |

---

## 五、不需要在首版做的

- **登录/鉴权**：可先不要求登录，BFF 用 IP 或匿名标识限流即可。  
- **积分/计费**：可先不扣 credits，接上真实生成再迭代。  
- **持久化历史**：可仍用前端 state，刷新即清空；后续再接「拉取历史」接口与持久化。  

---

## 六、小结：最小改动清单

**歌词：**

1. 新增 `app/api/lyrics/generate/route.ts`，内部调第三方歌词 API，读 `.env`。  
2. 前端 `handleGenerate` 改为 `fetch("/api/lyrics/generate", { method: "POST", body: JSON.stringify({...}) })`。  
3. 用返回的 `lyrics` 更新对应历史项并设 `status: "completed"`；失败时提示并更新或移除该项。  
4. 请求期间禁用按钮或显示 loading。  

**音乐：**

1. 新增 `app/api/music/generate/route.ts`（及若异步则 `app/api/music/status/route.ts`），内部调第三方音乐 API，读 `.env`。  
2. 前端 `handleGenerate` 改为调用 BFF；若为异步则轮询直到完成或失败。  
3. `HistoryItem` 增加 `audioUrl`（及可选 `duration`），完成时写入。  
4. 底部播放条增加 `<audio>` 并绑定 `playingItem?.audioUrl`，实现真实播放与进度。  
5. 请求/轮询期间禁用按钮或 loading；失败时提示并标记该项。  

以上为「除提供 API 以外」需要补充的全部内容；API 本身由你或第三方提供，在 BFF 中调用即可。
