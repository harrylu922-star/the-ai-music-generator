# Resources 文章 SEO 与内链规范

## 1. TL;DR 使用方式

- **不放在正文**：正文中不设「TL;DR」小节，避免与标题/描述重复且影响首屏结构。
- **用于元数据**：TL;DR 的要点用于推敲 `title`、`description`、`openGraph.description`，提升搜索摘要与点击率。

## 2. Title / Description 字符与 SEO

| 字段 | 建议字符数 | 说明 |
|------|------------|------|
| **title** | 50–60 字符 | 过长易在 SERP 被截断；含核心关键词与年份/场景以利 SEO 与 CTR |
| **meta description** | 150–160 字符 | 搜索摘要主来源；一句话说清主题+收益，可带行动暗示 |
| **openGraph.title / description** | 与 meta 一致或略短 | 社交分享用，与 meta 对齐便于维护 |

## 3. H1 / H2 / H3

- **每页一个 H1**：与页面主题一致，可与 `title` 相同或略长。
- **H2**：正文主段落标题，不写「TL;DR」；为简洁可去掉序号（如「1.」「2.」），有利于语义与 SEO。
- **H3**：隶属于 H2 的子节，用于小节、案例、清单等。

## 4. 内链：相对 URL，便于多语言

- **站内链接一律使用相对路径**：`/resources/...`、`/ai-music-generator`、`/for-youtube-creators`、`/pricing`、`/legal`, `/privacy`, `/terms`, `/license` 等，**不要**写死完整域名。
- **好处**：后续做多语言（如 `/en/resources/...`、`/zh/resources/...`）时，由路由或 i18n 层统一加前缀即可，链接无需改。
- **外链**（如参考来源）继续使用绝对 URL。

## 5. 当前四篇优化摘要

| 文章 | Title 优化 | Description 优化 | 正文调整 |
|------|------------|------------------|----------|
| Who Owns AI Generated Music | 缩短为「Copyright in 2026」 | 去掉 TL;DR 字样，约 120 字符 | 移除 TL;DR 小节，H2 去序号 |
| AI Music Licensing 2026 | 缩短为「Practical Guide for Creators」 | 约 115 字符，带「Avoid claims」 | 移除 TL;DR 小节 |
| YouTube AI Music Labeling 2026 | 缩短为「Rules & Workflow for Creators」 | 约 105 字符 | 无 TL;DR，H1/H2 与 title 一致 |
| Monetize AI Music 2026 | 缩短为「Licensing, Platforms & Workflow」 | 约 115 字符 | 无 TL;DR，H1 与 title 一致 |

上述四篇内链均已使用相对 URL，可直接支持后续多语言扩展。
