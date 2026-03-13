# 图片优化说明（Image Delivery / Lighthouse）

为满足 Lighthouse 测速与 LCP/CLS 要求，项目已做以下优化。

---

## 1. 图标体积（修复 34MB 级浪费）

- **问题**：`tamg-icon2.png` 原图 2048×2048、约 6.9MB，页眉仅显示 36×36。
- **处理**：
  - 脚本 `scripts/optimize-images.js` 将 `tamg-icon2.png`、`tamg-icon.png`、`tamg-logo.png` 生成为 **72×72** 的 `*-72.webp` 与 `*-72.png`（72px 满足 2x 视网膜）。
  - **SiteHeader** 使用 `/images/tamg-icon2-72.webp`，失败时回退到 `/images/tamg-icon2-72.png`，不再加载原图。
- **使用**：构建前会自动执行（`prebuild` 含 `optimize-images`）；本地可手动运行 `npm run optimize:images`。

---

## 2. 首屏 / LCP 加载策略

- 首屏关键图不再延迟加载：
  - **SiteHeader 图标**：`loading="eager"`、`fetchPriority="high"`。
  - **首页第一张功能卡图**：`HomeFeatureImage` 增加 `priority`，首卡传入 `priority={true}`。
  - **子页首屏大图**：`/ai-music-generator`、`/ai-lyrics-generator`、`/text-to-music` 的 hero 图已加 `priority`。
- 其余图片仍为默认懒加载，以节省带宽。

---

## 3. 自适应与尺寸声明（sizes / 宽高）

- **sizes**：首页与子页的 `Image` / `HomeFeatureImage` 已按布局设置 `sizes`（如 `(max-width: 768px) 100vw, 33vw`），避免加载过宽图片。
- **宽高**：Header 图标使用显式 `width={36} height={36}`；`fill` 图片由外层 `aspect-video` / `aspect-[2/1]` 等固定比例容器约束，减少 CLS。

---

## 4. 响应式变体（Improve image delivery）

- **how-1/2/3**：生成 **192w**（96px 展示用，如 ai-music-generator 三步）与 **640w**（首页 How it works 卡片）。
- **首页大图**：spark-creators、use-cases-creators、who-uses-community、copyright-license、cta-ready-to-create、explore-* 生成 **640w**，页面用 `srcSet` 选 640/960，移动端少下大图。
- 构建前运行 `npm run optimize:images` 会生成上述变体；页面已改为 `<img srcSet>` 或 `HomeFeatureImage`/`HomeCtaImage` 的 `src640`。

---

## 5. 大图尺寸上限（可选）

- `optimize-images.js` 会对 `public/images/home/*.jpg` 与 `public/images/covers/*.jpg` 做**最大宽 960px**（home）/ 640px（covers）的 WebP 转换。
- 若你希望额外输出 AVIF 或更大尺寸：可在脚本中增加对应逻辑。

---

## 6. 当前静态导出与 next/image

- 项目使用 `output: "export"` 且 `images.unoptimized: true`，Next 不会在构建时生成多尺寸/WebP。因此：
  - 图标已通过脚本预生成 72px WebP/PNG 并替换引用；
  - hero/explore/section 图已生成 640w（及 how-* 的 192w），页面用 `srcSet`/`sizes` 按视口选图；
  - 其余依赖合理 `sizes` 与源图尺寸控制（必要时可先本地压缩再提交）。

上线前建议：运行 `npm run optimize:images` 后执行 `npm run build`，用 Lighthouse 再测一次 LCP 与 “Improve image delivery” 项。
