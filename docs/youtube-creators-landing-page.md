# For YouTube Creators 落地页 — 实施步骤与确认事项

## 一、已完成的步骤

1. **新建落地页路由**  
   - 路径：`/for-youtube-creators`  
   - 文件：`app/for-youtube-creators/page.tsx`

2. **页面结构（与现有 ai-rap-lyrics-generator 等保持一致）**  
   - Hero：标题 + 副标题 + 双 CTA（「Create Music for My Videos」/「View Pricing」）+ 三个标签（Royalty-Free、YouTube & Shorts、Ready in seconds）  
   - 使用场景：6 张卡片（Vlogs、Shorts、Intros/outros、Tutorials、Gaming、Documentaries）  
   - How it works：3 步（Describe → Generate → Download）  
   - Why us：4 条卖点（royalty-free、custom、no subscription、lyrics + full songs）  
   - FAQ：5 个问题，带 JSON-LD（FAQPage）  
   - CTA：再次强调「Create Music」/「View Pricing」

3. **SEO / 结构化数据**  
   - `metadata`：title、description  
   - `youtube-faq-ld.ts`：FAQ 与 JSON-LD 与页面文案一致，便于 AEO/SEO

4. **全站入口**  
   - `app/sitemap.ts`：已加入 `/for-youtube-creators`  
   - `components/SiteHeader.tsx`：导航增加「For YouTube」  
   - `components/SiteFooter.tsx`：Features 下增加「For YouTube Creators」  
   - 首页 `app/page.tsx` 的 footer：Features 下增加「For YouTube Creators」

---

## 二、需要您确认的事项

### 1. 路由与命名

- **当前路径**：`/for-youtube-creators`  
  - 是否需要改为其他路径？例如：`/youtube-creators`、`/music-for-youtube` 等。

- **导航文案**：  
  - Header 使用「For YouTube」，Footer 使用「For YouTube Creators」。  
  - 是否需要统一或改成更简短的文案（如「YouTube」）？

### 2. 文案与卖点

- **Hero 副标题与 CTA**：当前强调「royalty-free、no copyright strikes、describe and get a track」。  
  - 是否有品牌话术或必须出现的关键词需要加入？

- **使用场景**：目前包含 Vlogs、Shorts、Intros/outros、Tutorials、Gaming、Documentaries。  
  - 是否要增删场景（例如：直播、课程、广告）？

- **FAQ**：现有 5 个问题（YouTube 使用、royalty-free、时长、是否需要经验、Shorts/ intros）。  
  - 是否需要增加/删改问题？例如：  
    - 与 YouTube 版权/Content ID 的关系  
    - 商用/盈利视频是否允许  
    - 多语言/多地区合规

### 3. 法律与许可

- **许可表述**：页面写的是「royalty-free」「suitable for YouTube」「avoid copyright claims from our tracks」。  
  - 是否与你们实际《Terms》/《License》一致？  
  - 是否需要加上「详见 Legal 页面」或具体条款链接？

### 4. 转化与数据

- **主 CTA**：目前两个按钮都链到 `/ai-music-generator` 和 `/pricing`。  
  - 是否需要单独追踪「来自 YouTube 落地页」的转化（例如 UTM：`?utm_source=youtube-landing`）？  
  - 是否需要在 CTA 上挂上分析事件（如 GTM/GA4）？

### 5. 多语言与 SEO

- **语言**：当前页面为英文。  
  - 是否计划做中文版或其他语言？若需要，是子路径（如 `/zh/for-youtube-creators`）还是子域名？

- **关键词**：若已有目标关键词列表（如「youtube background music」「royalty free music for youtube」），可以再对 title、description、H1、FAQ 做一轮优化。

### 6. 视觉与品牌

- **图片/视频**：当前无配图，仅文字与卡片。  
  - 是否计划加入：  
    - Hero 背景或插图  
    - 使用场景配图  
    - 短视频演示「从描述到生成」  
    - 创作者/频道主 testimonial 或 logo？

- **Social**：  
  - 是否需要为本页单独设置 `openGraph` / `twitter:image`（例如一张「For YouTube Creators」专用图）？

---

## 三、建议的后续操作（可选）

1. 在 `/ai-music-generator` 或首页的「Who it’s for」/ 用例中，增加一句指向「YouTube creators」并链接到 `/for-youtube-creators`。  
2. 若有多角色落地页（如 For Filmmakers、For Podcasters），可考虑统一「Audiences」导航或目录结构。  
3. 在 Resources 或博客中写一篇「How to use AI music on YouTube without copyright issues」，内链到本落地页和 Legal 页。

---

## 四、如何本地预览

```bash
npm run dev
```

浏览器打开：`http://localhost:3000/for-youtube-creators`  
检查：标题、CTA、FAQ 展开、Header/Footer 链接、移动端排版。

---

确认以上事项后，可按需微调文案、链接和追踪参数；若有具体修改点（例如某一段要改成什么话），可以直接指出，我可以按你的要求改好对应文件。
