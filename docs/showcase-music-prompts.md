# 首页/展示区 8 首音乐提示词与风格说明

用于「The AI Music Generator for Modern Creators」站点的样音展示：覆盖全曲、器乐、Loop、短视频等场景，面向创作者（视频、播客、游戏、电影、音乐人）。  
**输入方式参照 [MusicMakerApp](https://www.musicmakerapp.com/)：** 用简短想法描述 mood、genre、style，不写 BPM/技术参数；风格标签用于发现与展示（如 "dreamy electronic soundscapes, lo-fi study beats"）。

---

## 1. Cinematic opener（电影感开场）

**输入提示词（用户会打的短句）**  
`Epic film trailer intro, dramatic and building tension, like a movie premiere or product launch.`

| 维度 | 说明 |
|------|------|
| **风格标签** | Cinematic · Orchestral · Film trailer |
| **Genre** | Classical / Cinematic |
| **Mood** | Inspiring · Epic |
| **用途** | 产品发布、预告片、纪录片开场、品牌短片 |
| **展示标签** | Full track · Cinematic |

---

## 2. Lo-fi focus instrumental（Lo-fi 专注器乐）

**输入提示词（用户会打的短句）**  
`Chill lofi beats for studying or working, warm and cozy, like a rainy day in a bedroom studio.`

| 维度 | 说明 |
|------|------|
| **风格标签** | Lo-fi study beats · Chill instrumental · Bedroom vibe |
| **Genre** | Hip Hop / Lo-fi |
| **Mood** | Soothing · Warm |
| **用途** | 学习、工作 BGM，vlog 背景，播客垫乐 |
| **展示标签** | Instrumental · Lo-fi |

---

## 3. Loop for talking videos（口播/讲解 Loop）

**输入提示词（用户会打的短句）**  
`Simple upbeat background loop for tutorials and talking videos, clean and not distracting.`

| 维度 | 说明 |
|------|------|
| **风格标签** | Tutorial background · Minimal loop · Clean and neutral |
| **Genre** | Pop / Minimal |
| **Mood** | Gentle · Warm |
| **用途** | 口播视频、教程、讲解、产品演示 |
| **展示标签** | Loop · Background |

---

## 4. 15-second social clip（15 秒短视频片段）

**输入提示词（用户会打的短句）**  
`Short catchy hook for TikTok or Reels, energetic and memorable, punchy synths and drums.`

| 维度 | 说明 |
|------|------|
| **风格标签** | TikTok hook · Upbeat pop · Social media clip |
| **Genre** | Pop / EDM |
| **Mood** | Joyous · Inspiring |
| **用途** | TikTok、Reels、短视频片头/转场 |
| **展示标签** | Short clip · Social |

---

## 5. Documentary emotional bed（纪录片情绪垫乐）

**输入提示词（用户会打的短句）**  
`Emotional documentary music, gentle piano and strings, contemplative and moving, for storytelling.`

| 维度 | 说明 |
|------|------|
| **风格标签** | Documentary underscore · Emotional · Contemplative |
| **Genre** | Classical / Ambient |
| **Mood** | Sad · Gentle · Soothing |
| **用途** | 纪录片、故事向 vlog、回忆/独白段落 |
| **展示标签** | Full track · Documentary |

---

## 6. Upbeat vlog intro（活力 vlog 开场）

**输入提示词（用户会打的短句）**  
`Upbeat vlog intro, bright acoustic guitar and friendly energy, like a channel or episode opener.`

| 维度 | 说明 |
|------|------|
| **风格标签** | Upbeat vlog · Indie pop-rock · Channel intro |
| **Genre** | Pop / Rock / Folk |
| **Mood** | Joyous · Warm · Inspiring |
| **用途** | 频道片头、单集开场、品牌标识 |
| **展示标签** | Short clip · Vlog |

---

## 7. Late night R&B groove（深夜 R&B 律动）

**输入提示词（用户会打的短句）**  
`Smooth late night R&B, warm and relaxed, neo-soul vibe, no vocals, for chill or romantic mood.`

| 维度 | 说明 |
|------|------|
| **风格标签** | Neo-soul R&B · Late night · Chill instrumental |
| **Genre** | R&B / Jazz |
| **Mood** | Soulful · Romantic · Soothing |
| **用途** | 歌单、情感向内容、广告氛围 |
| **展示标签** | Instrumental · R&B |

---

## 8. Game or app menu ambient（游戏/应用菜单氛围）

**输入提示词（用户会打的短句）**  
`Calm ambient music for a game menu or app, peaceful and easy to loop, subtle and relaxing.`

| 维度 | 说明 |
|------|------|
| **风格标签** | Game menu ambient · Peaceful loop · Calm electronic |
| **Genre** | Electronic / Ambient |
| **Mood** | Soothing · Gentle |
| **用途** | 游戏菜单、应用背景、等待/加载场景 |
| **展示标签** | Loop · Ambient |

---

## MusicMakerApp 式输入说明

- **主输入框**：只填「输入提示词」里的短句即可（描述想法、情绪、场景），无需写 BPM、no vocals 等参数。  
- **Genre / Mood**：若产品有下拉或标签，可选用上表中的 Genre、Mood 做二次筛选。  
- **风格标签**：用于展示区/发现区文案，如 *"from dreamy electronic soundscapes and lo-fi study beats to upbeat pop and indie rock"*，可摘 2–3 个标签 per 曲目。

---

## 使用建议

1. **首页展示**：可从 8 首中选 4 首与现有 4 卡对应（Cinematic / Lo-fi / Loop / Social），或改为 2×4 网格展示全部 8 首。  
2. **卡片文案**：`category` 用「展示标签」，`title` 用英文标题，`description` 可用「风格标签」或「用途」写成一句。  
3. **音频文件**：用上述「输入提示词」在任意 AI 音乐站生成后，放入 `public/audio/`，与 `app/page.tsx` 中 `sampleTracks` 的 `audioSrc` 对应。  
4. **SEO/落地页**：在 AI music generator、text-to-music、for-youtube-creators 等页面可引用风格标签（Cinematic, Lo-fi, R&B, Documentary 等）以强化关键词。

---

## 与现有首页 4 首的对应关系

| 现有首页卡片 | 建议对应本文编号 | 说明 |
|--------------|------------------|------|
| Full track · Cinematic | #1 | 保持「电影感开场」 |
| Instrumental · Lo-fi | #2 | 保持「Lo-fi 专注器乐」 |
| Loop · Background | #3 | 保持「口播 Loop」 |
| Short clip · Social | #4 | 保持「15 秒社交片段」 |
| （扩展） | #5–#8 | 纪录片、vlog 开场、R&B、游戏/应用氛围 |

若首页改为 8 卡，可将 #5–#8 一并加入 `sampleTracks` 数组并补充对应 `audioSrc` 与配图。

---

## 方便拷贝（直接复制下面整块）

**仅 8 条提示词（每行一条，可整段复制后逐条粘贴到音乐站）：**

```
Epic film trailer intro, dramatic and building tension, like a movie premiere or product launch.
Chill lofi beats for studying or working, warm and cozy, like a rainy day in a bedroom studio.
Simple upbeat background loop for tutorials and talking videos, clean and not distracting.
Short catchy hook for TikTok or Reels, energetic and memorable, punchy synths and drums.
Emotional documentary music, gentle piano and strings, contemplative and moving, for storytelling.
Upbeat vlog intro, bright acoustic guitar and friendly energy, like a channel or episode opener.
Smooth late night R&B, warm and relaxed, neo-soul vibe, no vocals, for chill or romantic mood.
Calm ambient music for a game menu or app, peaceful and easy to loop, subtle and relaxing.
```

**提示词 + 风格标签（可贴到 Excel/表格，制表符分隔）：**

```
Epic film trailer intro, dramatic and building tension, like a movie premiere or product launch	Cinematic · Orchestral · Film trailer
Chill lofi beats for studying or working, warm and cozy, like a rainy day in a bedroom studio	Lo-fi study beats · Chill instrumental · Bedroom vibe
Simple upbeat background loop for tutorials and talking videos, clean and not distracting	Tutorial background · Minimal loop · Clean and neutral
Short catchy hook for TikTok or Reels, energetic and memorable, punchy synths and drums	TikTok hook · Upbeat pop · Social media clip
Emotional documentary music, gentle piano and strings, contemplative and moving, for storytelling	Documentary underscore · Emotional · Contemplative
Upbeat vlog intro, bright acoustic guitar and friendly energy, like a channel or episode opener	Upbeat vlog · Indie pop-rock · Channel intro
Smooth late night R&B, warm and relaxed, neo-soul vibe, no vocals, for chill or romantic mood	Neo-soul R&B · Late night · Chill instrumental
Calm ambient music for a game menu or app, peaceful and easy to loop, subtle and relaxing	Game menu ambient · Peaceful loop · Calm electronic
```
