# 子页面 SEO 配置说明（对标 MusicCreator.ai）

对标 [MusicCreator.ai](https://www.musiccreator.ai/) 的页面结构，为以下三个子页面统一配置了 SEO 元数据与配图：

- `/ai-music-generator` — AI Music Generator
- `/text-to-music` — Text to Music
- `/ai-lyrics-generator` — AI Lyrics Generator

## 1. 各页 SEO 内容梳理

### 1.1 AI Music Generator (`/ai-music-generator`)

| 项目 | 内容 |
|------|------|
| **Title** | AI Music Generator for Free \| Create Royalty-Free Music Instantly |
| **Description** | Generate unique, royalty-free music from text with our free AI music generator. Describe genre, mood, and style—get full tracks in seconds. For creators, filmmakers, and musicians. |
| **Keywords** | AI music generator, free AI song generator, text to music, royalty-free music, AI music creator, generate music from text |
| **正文结构** | How it works（3 步 + 配图）、Explore our AI Music Generator（配图）、4 个特性卡片、FAQ、CTA |
| **OG/Twitter 分享图** | `/images/home/hero-card-ai-music-generator.jpg` |

**页面内配图：**

- How it works 三步：`how-1-describe.jpg`、`how-2-ai-compose.jpg`、`how-3-export.jpg`
- Explore 区块：`hero-card-ai-music-generator.jpg`

---

### 1.2 Text to Music (`/text-to-music`)

| 项目 | 内容 |
|------|------|
| **Title** | Text to Music \| Turn Words into Songs with AI |
| **Description** | Convert text descriptions into full music tracks with our free AI. Describe genre, mood, instruments, and atmosphere—get original songs in seconds. No music theory required. |
| **Keywords** | text to music, AI text to music, turn text into music, free AI music generator, describe music get song |
| **正文结构** | How Text to Music Works（配图）、创作者/电影/游戏/音乐人场景、Showcase 示例（配图）、FAQ、Footer |
| **OG/Twitter 分享图** | `/images/home/hero-card-ai-music-generator.jpg`（与 AI Music Generator 同产品线） |

**页面内配图：**

- How it works 区块：`hero-card-ai-music-generator.jpg`
- Showcase 区块：`explore-idea-starters.jpg`

---

### 1.3 AI Lyrics Generator (`/ai-lyrics-generator`)

| 项目 | 内容 |
|------|------|
| **Title** | AI Lyrics Generator for Free \| Write Song Lyrics with AI |
| **Description** | Create original song lyrics instantly with our free AI lyrics generator. Perfect for songwriters, rappers, and content creators. Choose mood, structure, and style. |
| **Keywords** | AI lyrics generator, free AI song lyrics, write song lyrics with AI, AI songwriting, lyrics generator for rappers |
| **正文结构** | How the AI Lyrics Generator Works（配图）、Rappers/YouTubers/Songwriters 场景、Showcase 示例（配图）、FAQ（与 JSON-LD 一致） |
| **结构化数据** | SoftwareApplication、FAQPage、ItemList（见 `json-ld.ts`） |
| **OG/Twitter 分享图** | `/images/home/hero-card-ai-lyrics-generator.jpg` |

**页面内配图：**

- How it works 区块：`hero-card-ai-lyrics-generator.jpg`
- Showcase 区块：`explore-idea-starters.jpg`

---

## 2. 图片与用途对照

| 图片路径 | 用途 |
|----------|------|
| `hero-card-ai-music-generator.jpg` | AI Music Generator 页 OG/内文；Text to Music 页 OG + “How it works” 首图 |
| `hero-card-ai-lyrics-generator.jpg` | AI Lyrics Generator 页 OG + “How it works” 首图 |
| `how-1-describe.jpg` | AI Music Generator 页 “How it works” 步骤 1 |
| `how-2-ai-compose.jpg` | AI Music Generator 页 “How it works” 步骤 2 |
| `how-3-export.jpg` | AI Music Generator 页 “How it works” 步骤 3 |
| `explore-idea-starters.jpg` | Text to Music / AI Lyrics Generator 页 Showcase 区块 |

OG 图建议尺寸：1200×630，用于社交分享卡片。根 layout 的 `metadataBase` 会与相对路径拼接为绝对 URL。

## 3. 可选后续优化

- 为 Text to Music 单独制作一张 OG 图（如 `og-text-to-music.jpg`），与 AI Music Generator 区分。
- 若需更贴近 MusicCreator.ai 的 “Who uses” 多角色区块，可在各页增加对应场景配图（如 use-cases-creators、who-uses-community）。
