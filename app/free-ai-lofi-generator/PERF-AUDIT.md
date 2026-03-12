# Free AI Lofi Generator — 加载与资源检测

## 1. 图片

| 资源 | 大小 | 说明 |
|------|------|------|
| how-1-describe.webp | 60.8 KB | How it works 步骤 1 |
| how-2-ai-compose.webp | 39.3 KB | 步骤 2 |
| how-3-export.webp | 51.6 KB | 步骤 3 |
| explore-loops.webp | 57.3 KB | Features 卡片 1 |
| copyright-license.webp | 33.9 KB | Features 卡片 2 |
| use-cases-creators.webp | 82.3 KB | Features 卡片 3（最大单张） |
| hero-card-ai-music-generator.webp | 43.2 KB | 对比区（已有 -640：26.2 KB） |
| explore-idea-starters.webp | 47.7 KB | SEO 正文配图 |
| **小计（区块图）** | **~456 KB** | 全部为 WebP，已 lazy |
| sample-lofi.webp / -400 | 31.7 / 13.1 KB | Showcase 封面，用 srcSet 400w |
| sample-rnb.webp / -400 | 48 / 23 KB | 同上 |
| sample-loop.webp / -400 | 20.2 / 10.5 KB | 同上 |
| sample-ambient.webp / -400 | 6.7 / 3.3 KB | 同上 |
| **Showcase 封面（按 400w 计）** | **~50 KB** | HomeSampleTracks 已用 srcSet |

**结论**：首屏无图，所有图片均在首屏下且带 `loading="lazy"`，对 LCP 影响小。总图约 **~500 KB**，可接受。项目为 `output: "export"` + `images.unoptimized: true`，无法用 Next 图片优化，只能通过选用小尺寸源（如 -640）减体积。

## 2. 音频（按需加载）

| 文件 | 大小 | 说明 |
|------|------|------|
| sample-lofi.mp3 | 2.8 MB | 仅点击播放时加载 |
| sample-rnb.mp3 | 4.3 MB | 同上 |
| sample-loop.mp3 | 3.0 MB | 同上 |
| sample-ambient.mp3 | 4.7 MB | 同上 |
| **合计** | **~14.8 MB** | 不预加载，不影响首屏 |

## 3. 已做优化

- 对比区大图改用 `<img srcSet>`，小视口用 hero-card-ai-music-generator-640.webp（约省 17 KB）。
- 所有区块图已设合理 `sizes`，便于后续若启用优化时做 srcset。

## 4. 建议（可选）

- 若需再减体积：为 `explore-loops`、`use-cases-creators`、`explore-idea-starters`、`how-1/2/3` 在 `scripts/optimize-images.js` 中增加 640w 或 400w 变体，页面用原生 `<img srcSet>` 引用。
- 音频：保持按需加载即可；若希望更快试听，可考虑 30s 预览片段。
