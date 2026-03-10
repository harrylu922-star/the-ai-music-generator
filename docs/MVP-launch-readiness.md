# MVP 上线就绪梳理

截止当前，所有已新增/修改内容与仍待补充项，按功能、UI、后台、Schema、SEO/GEO 等维度整理，供 MVP 上线前核对。

---

## 一、已完成的页面与路由

| 路由 | 说明 | 备注 |
|------|------|------|
| `/` | 首页 | H1 两行、功能卡、Explore、The spark、How it works、Use cases、Who uses、Copyright、CTA；配图 14 张在 `public/images/home/` |
| `/ai-music-generator` | AI 音乐生成 | Suspense 包裹 Workspace；生成为前端 mock（约 2s 后 completed） |
| `/ai-music-generator/own-lyrics` | 自带歌词生成音乐 | 子页 |
| `/ai-lyrics-generator` | AI 歌词生成 | 生成为前端 mock（约 1.5s 后写死文案） |
| `/ai-rap-lyrics-generator` | Rap 歌词落地页 | 长尾冷启动；含 FAQ + FAQPage JSON-LD |
| `/text-to-music` | 文字转音乐 | 工具页 |
| `/ai-music-tools` | AI 音乐工具集合 | 占位/导航页 |
| `/for-youtube-creators` | YouTube 创作者 | 含 FAQ + FAQPage JSON-LD |
| `/pricing` | 定价 | 月/年订阅 + 一次性 Credit 包；订阅/购买 CTA 指向 `/coming-soon` |
| `/resources` | 资源索引 | 列表页 |
| `/resources/who-owns-ai-generated-music` | 单篇资源 | |
| `/resources/ai-music-licensing-2026` | 单篇资源 | |
| `/resources/youtube-ai-music-labeling-2026` | 单篇资源 | |
| `/legal` | 法律入口 | 跳转至 `/privacy`、`/terms`、`/license`（Refund 已并入 Terms） |
| `/logo-preview` | Logo 预览 | **内部用，建议不放入 sitemap、不对外链接** |

---

## 二、已完成的 SEO / GEO / AEO

| 项 | 状态 | 说明 |
|----|------|------|
| 根 layout 元数据 | ✅ | `metadataBase`、default title/description、openGraph、twitter、robots |
| 首页独立 metadata | ✅ | title、description（无 og:image） |
| 各子页 title/description | ✅ | 主要页面均有 export metadata |
| sitemap.xml | ✅ | `app/sitemap.ts`，未包含 `/logo-preview` |
| robots.txt | ✅ | `app/robots.ts`，allow `/`，sitemap 指向 `/sitemap.xml` |
| 首页 H1 | ✅ | 两行 span，避免中等宽度断行 |
| 各子页 H1 | ✅ | 单 H1 |
| 语义化结构 | ✅ | main, header, footer, nav, section, article |
| 内部链接 | ✅ | 首页→各工具、Header/Footer、正文内链；Rap 页已入 Footer Features |
| html lang | ✅ | `lang="en"` |
| AI Lyrics 结构化数据 | ✅ | SoftwareApplication、FAQPage、ItemList（`json-ld.ts`，仅已上线工具） |
| 首页 FAQ JSON-LD | ✅ | `app/home-faq-ld.ts`，5 条 FAQ 与正文一致 |
| Rap 页 FAQ JSON-LD | ✅ | `app/ai-rap-lyrics-generator/rap-faq-ld.ts` |
| YouTube 创作者 FAQ JSON-LD | ✅ | `app/for-youtube-creators/youtube-faq-ld.ts` |
| 资源子页 JSON-LD | ✅ | 部分资源页有 Article 等（如 youtube-ai-music-labeling-2026） |

**环境变量**：`.env.example` 已说明 `NEXT_PUBLIC_SITE_URL`；未设置时默认 `https://theaimusicgenerator.com`。

---

## 三、已完成的 UI / 前端行为

| 项 | 状态 | 说明 |
|----|------|------|
| 全局布局 | ✅ | SiteHeader、SiteFooter、GlobalPlayerLayout |
| 首页配图 | ✅ | HomeFeatureImage、HomeCtaImage（onError 占位）；14 张图见 `public/images/home/README.md` |
| 音乐生成反馈 | ✅ | handleGenerate 约 2s 后条目从 generating → completed（mock） |
| 歌词生成反馈 | ✅ | 约 1.5s 后写入占位文案（mock） |
| Sign in / 登录预览 | ✅ | `useLoginPreview` 读 cookie 模拟，无真实鉴权 |
| 定价 CTA | ✅ | 订阅/一次性购买按钮指向 `/coming-soon`；Coming Soon 页已品牌化 |

---

## 四、仍缺或建议 MVP 上线前补充的内容

### 4.1 功能与产品闭环（无后端则只能“静态/演示”上线）

| 项 | 优先级 | 说明 |
|----|--------|------|
| 真实登录/注册 | P0（若要做付费） | 当前无 Auth；见 `docs/backend-todo.md` 认证与用户 |
| AI 音乐生成 API | P0 | 当前为前端 mock；需 BFF + 第三方或自建模型、任务状态、音频存储与 URL |
| AI 歌词生成 API | P0 | 当前为前端 mock；需 BFF + LLM 或歌词接口 |
| 积分与计费 | P0（若要做付费） | 积分账户、扣减、订阅/一次性购买、Webhook；定价 CTA 目前为 `#` |
| 用户与生成记录存储 | P1 | 用户表、音乐/歌词生成记录、云端存储时长策略；无 DB/Prisma |
| 文件存储 | P1 | 生成音频上传 OSS/S3，返回可播放/下载 URL |

**结论**：若以「仅展示产品形态、收集等待列表」为目的，可先不接后端；若要以「可注册、可生成、可付费」为 MVP，则需按 `docs/backend-todo.md` 与 `docs/integration-checklist.md` 实现 Auth → DB → AI API → 积分 → 支付 → 存储。

---

### 4.2 UI / 体验

| 项 | 优先级 | 说明 |
|----|--------|------|
| 全局 404 页 | ✅ 已完成 | `app/not-found.tsx` 品牌化 404，带回到首页与主要工具 |
| 定价页 CTA | ✅ 已处理 | 订阅/一次性购买指向 `/coming-soon`；接支付时再改为 Stripe 等 |
| Footer「Contact Us」「Affiliate Marketing」 | ✅ 已完成 | 已指向 `/coming-soon` |
| 音乐播放条 | P1（接真实 API 时） | 需 `<audio>` + audioUrl、播放/暂停、进度与时长；见 `docs/integration-checklist.md` |
| 错误/空状态 | P1 | 生成失败、超时、无历史时的提示与 UI 区分 |

---

### 4.3 后台 / Schema / 数据

| 项 | 优先级 | 说明 |
|----|--------|------|
| 后端 API 路由 | P0（接真实能力时） | 无 `app/api/*`；需至少 `POST /api/music/generate`（及 status）、`POST /api/lyrics/generate`，见 `docs/integration-checklist.md` |
| 数据库与 ORM | P0（接用户/计费时） | 无 Prisma/DB；需用户表、生成记录、可选订阅/订单表，见 `docs/backend-todo.md` |
| 环境变量与密钥 | P0（上线前） | AI API Key、DB、Stripe、OSS 等仅放 `.env`，不提交仓库；`.env.example` 已存在，可补充 LYRICS_API_URL、MUSIC_API_URL 等占位 |
| 限流与鉴权中间件 | P1 | 对 `/api/*` 做 IP 或用户限流、登录校验 |

---

### 4.4 SEO / GEO / AEO 补充（建议上线前或上线后尽快）

| 项 | 优先级 | 说明 |
|----|--------|------|
| 首页 og:image | ✅ 已完成 | 根 layout 已配置默认 og:image（1200×630）与 twitter images；构建前校验见 `docs/og-image-verification.md` |
| 重要子页 og/twitter 覆盖 | 低 | 首页、定价、AI Music/Lyrics 可单独设置 og title/description/image |
| AI Music Generator 页 FAQ + JSON-LD | 低 | 若加 FAQ 区块，建议同步 FAQPage schema，与 AI Lyrics 一致 |
| canonical | 低 | 单域名、无参数可暂不设；多域名或重复内容时再加 |
| Core Web Vitals | 上线后 | 用 Search Console / PageSpeed 观察 LCP、CLS、INP |

---

### 4.5 其它

| 项 | 优先级 | 说明 |
|----|--------|------|
| logo-preview 是否公开 | 低 | 未在 sitemap 中，未在 Footer/Header 暴露；若仅内部用，可在 robots 或中间件中禁止爬取（可选） |
| 多语言 / hreflang | 延后 | 当前单语言英文，无需 hreflang |
| 语言切换器 | 延后 | Header/Footer「EN ▾」为占位，单语言 MVP 可保留 |

---

## 五、MVP 上线前最小清单（按目标分）

**若目标为「仅展示站点的静态/演示版」：**

- [x] 所有现有页面与路由可访问  
- [x] SEO/GEO/AEO 已做项保持（sitemap、robots、metadata、JSON-LD）  
- [x] `app/not-found.tsx` 品牌化 404  
- [x] 根 layout 默认 `og:image`  
- [x] 无去处 CTA（定价、Footer Affiliate/Contact）指向 `/coming-soon` 品牌页  

**若目标为「可注册、可生成、可付费」的 MVP：**

- [ ] 认证（注册/登录/登出/会话）  
- [ ] 数据库（用户 + 音乐/歌词记录，可选订阅/订单）  
- [ ] BFF：`POST /api/music/generate`（及 status）、`POST /api/lyrics/generate`  
- [ ] 前端：音乐/歌词 Workspace 调用 BFF，替换 mock；音乐侧需 audioUrl + 播放条  
- [ ] 积分与扣费逻辑 + 支付（如 Stripe）  
- [ ] 生成音频存储与 URL  
- [ ] 环境变量与安全（限流、鉴权、输入校验）  
- [ ] 定价页 CTA 指向真实支付  
- [ ] 建议：not-found、og:image、错误/空状态 UI  

---

## 六、相关文档索引

| 文档 | 内容 |
|------|------|
| `docs/backend-todo.md` | 后端待办：Auth、AI 音乐/歌词 API、积分与计费、存储、安全与配置 |
| `docs/integration-checklist.md` | 接入真实 API 时 BFF、前端调用链、播放条、错误与状态 |
| `docs/seo-geo-audit.md` | SEO/GEO 审计与已修复项 |
| `docs/aeo-audit.md` | AEO 审计与首页 FAQ JSON-LD |
| `docs/rap-longtail-coldstart.md` | Rap 长尾与落地页 |
| `docs/homepage-image-prompts.md` | 首页配图提示词 |
| `public/images/home/README.md` | 首页 14 张配图列表与用途 |
| `docs/og-image-verification.md` | OG 图存在与尺寸校验、生产环境确认方式 |

---

## 七、结论

- **已完成**：全站路由与主要页面、首页与多页配图、统一 Header/Footer、sitemap/robots、多页 metadata 与 JSON-LD（首页/AI Lyrics/Rap/YouTube/资源）、Rap 落地页与内链、音乐/歌词 mock 反馈、定价与 Legal 静态内容。  
- **MVP 上线还差什么**：取决于目标。  
  - **仅展示**：补 404 页与可选 og:image 即可。  
  - **可用的产品闭环**：需按本节与 `backend-todo`、`integration-checklist` 补齐 Auth、DB、BFF、AI API、积分、支付、存储及对应 UI（播放条、错误状态、定价 CTA）。

以上为截止当前的新增与修改梳理及 MVP 上线仍需补充的内容。
