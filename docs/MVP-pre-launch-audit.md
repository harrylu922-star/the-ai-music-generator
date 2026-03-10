# MVP 上线前再次审计

按「仅展示站点 / 静态演示版」的 MVP 标准审计，基于当前代码与构建结果。

---

## 一、已达标项 ✅

| 类别 | 项 | 状态 |
|------|-----|------|
| **路由与页面** | 首页、AI Music/Lyrics/Rap、Text to Music、AI Music Tools、For YouTube Creators、Pricing、Resources（含 3 篇）、Legal、Coming Soon、404 | ✅ 全部可访问，构建通过 |
| **无死链** | 原 `href="#"` 的定价 CTA、Footer Affiliate/Contact、首页底部 About Us | ✅ 已统一指向 `/coming-soon` |
| **404** | 品牌化 404 页 | ✅ `app/not-found.tsx`，带回到首页与主要工具 |
| **Coming Soon** | 敬请期待页（Stay Tuned + 品牌） | ✅ `app/coming-soon`，noindex |
| **SEO** | 根 layout metadataBase、openGraph、twitter、robots | ✅ |
| **SEO** | 默认 og:image（1200×630） | ✅ 根 layout 已配置 |
| **SEO** | sitemap.xml、robots.txt | ✅ 不含 logo-preview、不含 coming-soon |
| **SEO** | 各页 title/description、H1、语义化、内链 | ✅ |
| **AEO** | 首页 / AI Lyrics / Rap / YouTube 等 FAQ JSON-LD | ✅ |
| **构建** | `npm run build` | ✅ 通过，21 个静态页 |

---

## 二、建议上线前处理（非阻塞）

| 项 | 说明 | 建议 |
|----|------|------|
| **Header「Sign in」** | 当前为 `<button>`，无跳转 | 若希望点击有反馈：改为 `<Link href="/coming-soon">Sign in</Link>`，与全站“未开放功能→Coming Soon”一致 |
| **Header「EN ▾」** | 语言切换占位，无跳转 | 单语言 MVP 可保留；若希望可点击，可指向 `/coming-soon` 或保持 button |
| **.env.example** | 仅含 `NEXT_PUBLIC_SITE_URL` | 上线前可补充占位：`# LYRICS_API_URL=`, `# MUSIC_API_KEY=` 等，便于后续接 API 时对照（可选） |

---

## 三、无需改动（当前设计合理）

| 项 | 说明 |
|----|------|
| **LandingNav (Soon) 项** | AI Vocal Remover、AI Stem Splitter 等为禁用 `<span>`，不链出，符合“即将推出”展示 |
| **hideLandingLinks 时的 `#`** | Header 中用于占位的 `href="#"` 配合 `invisible pointer-events-none`，用户不可点击，可保留 |
| **/logo-preview** | 未入 sitemap、未在导航暴露，仅内部使用，可保留 |
| **/coming-soon 未入 sitemap** | 该页已设 `robots: { index: false }`，不收录即可，不入 sitemap 合理 |

---

## 四、与「可注册、可生成、可付费」的差距（非本次 MVP）

若后续要做真实产品闭环，仍需：

- 认证、数据库、BFF（音乐/歌词 API）、积分与支付、音频存储等  
- 详见 `docs/backend-todo.md`、`docs/integration-checklist.md`、`docs/MVP-launch-readiness.md`。

---

## 五、结论

按**当前 MVP 标准（仅展示/静态演示）**：

- **无阻塞问题**：构建通过、无死链、404 与 Coming Soon 已就绪、SEO/og:image 已配置。
- **可选优化**：Header「Sign in」改为指向 `/coming-soon` 以统一体验；其余为锦上添花。

**可上线。**
