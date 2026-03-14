# AI 音乐视频生成 — 六首曲目情景描述与高清封面说明

本文档为 **AI Music Video Generator** 页面右侧展示的 6 首曲目提供：  
1）每首曲目的**详细情景/场景描述**，可直接用于 Gemini、ChatGPT 等 AI 视频生成提示；  
2）**对应封面图片的高清版本**的路径与规格说明，便于作为视频参考图或首帧。

---

## 资源路径与规格

| 项目 | 说明 |
|------|------|
| **音频** | 路径见下表 `audioSrc`，文件位于 `public/audio/` |
| **当前封面（站内用）** | `public/images/covers/sample-*.webp`（约 640px 宽）、`sample-*-400.webp` |
| **高清封面（视频用）** | 放置于 `public/images/covers/hd/`，命名与规格见下文「高清封面」 |

**高清封面建议规格（用于 Gemini/ChatGPT 生成视频）：**

- **分辨率**：1920×1080（Full HD）或 3840×2160（4K）
- **格式**：PNG 或 JPEG，质量 90+；若用 WebP 则 quality 85+
- **命名**：`sample-{曲目英文名}-1920x1080.webp` 或 `.png`（见下表「高清封面文件名」）

**一键生成 1920×1080 封面：** 在项目根目录执行 `node scripts/optimize-images.js`，会从 `public/images/covers/` 下的 `sample-*.jpg`（或 `.webp`）自动生成 6 首曲目的 1920×1080 WebP，输出到 `public/images/covers/hd/`，文件名形如 `sample-cinematic-1920x1080.webp`。

下表为每首曲目的**情景描述**与**封面信息**汇总，每首下方有可直接复制到 AI 视频模型的**长文案提示**。

---

## 1. Cinematic opener（电影感开场）

- **风格**：Cinematic  
- **音频**：`/audio/sample-cinematic.mp3`  
- **当前封面**：`/images/covers/sample-cinematic.webp`  
- **高清封面文件名**：`sample-cinematic-1920x1080.webp` 或 `.png`（路径：`public/images/covers/hd/`）

**简短描述**：产品发布、预告片用的史诗感开场曲，适合品牌片头、活动开场。

**详细情景描述（供 AI 视频用）：**

- **时间与氛围**：黎明或黄昏，光线从地平线一侧扫过，整体偏暖金/冷蓝电影调色。  
- **空间**：开阔场景——城市天际线、山脉剪影、大海与天空交界、或抽象几何/粒子空间。  
- **镜头与节奏**：缓慢推进或缓慢横移，景深大；可穿插慢动作（烟雾、旗帜、人物剪影）。节奏随鼓点与弦乐推进，中后段可有一两次快速切镜增强张力。  
- **色调与质感**：电影感 LUT，高光柔和、暗部有细节；可带轻微颗粒感。  
- **可选元素**：剪影人物、飞鸟、云层流动、光线穿透雾霭、品牌 logo 淡入。

**可直接复制的长文案提示（中英）：**

```
【中文】电影感开场：黎明或黄昏的大场景，城市天际线或山海交界，暖金/冷蓝电影调色。镜头缓慢推进或横移，景深大，可有剪影人物、飞鸟、云层与光线穿透雾霭。节奏随史诗感弦乐与鼓点推进，中后段可快速切镜增强张力。整体高光柔和、暗部有细节，带轻微电影颗粒感。宽画幅 16:9，4K 质感。

【English】Cinematic opener: Wide landscape at dawn or dusk—city skyline, mountains, or sea meeting sky. Warm gold or cool blue cinematic color grade. Slow push-in or dolly, deep depth of field. Silhouettes, birds, clouds, light through mist. Pace builds with epic strings and drums; one or two quick cuts for tension. Soft highlights, detailed shadows, subtle film grain. 16:9, 4K look.
```

---

## 2. Lo-fi focus instrumental（Lo-fi 专注 instrumental）

- **风格**：Lo-fi  
- **音频**：`/audio/sample-lofi.mp3`  
- **当前封面**：`/images/covers/sample-lofi.webp`  
- **高清封面文件名**：`sample-lofi-1920x1080.webp` 或 `.png`

**简短描述**：适合学习、工作背景的放松 instrumental，略带复古与低保真质感。

**详细情景描述（供 AI 视频用）：**

- **时间与氛围**：室内午后或夜晚，暖色台灯、窗外雨/雪/霓虹，私密、安静、略带怀旧。  
- **空间**：书房、咖啡馆一角、卧室窗边、或 Lo-fi 常见意象（黑胶、咖啡杯、绿植、书本）。  
- **镜头与节奏**：固定机位或极慢的轻微晃动，少量慢速推拉；节奏舒缓，切镜少而慢。  
- **色调与质感**：偏暖、略褪色、可带轻微噪点或 VHS 感，阴影偏柔。  
- **可选元素**：雨滴/雪花落在玻璃、蒸汽从杯口升起、黑胶转动、猫在窗台、城市夜景虚化。

**可直接复制的长文案提示（中英）：**

```
【中文】Lo-fi 学习/工作氛围：室内午后或雨夜，暖色台灯与窗外雨或霓虹。书房或咖啡馆一角，黑胶、咖啡杯、绿植、书本。固定机位或极慢轻微晃动，节奏舒缓，切镜少。色调偏暖、略褪色，轻微噪点或 VHS 感。可有雨滴落在玻璃、蒸汽、黑胶转动、城市夜景虚化。16:9，柔和舒适。

【English】Lo-fi study/work vibe: Interior, afternoon or rainy night, warm lamp and window with rain or neon. Study or café corner—vinyl, coffee cup, plants, books. Static or very slow subtle camera movement, relaxed pace, few cuts. Warm, slightly faded color, light grain or VHS feel. Optional: rain on glass, steam, vinyl spinning, blurred city night. 16:9, soft and cozy.
```

---

## 3. Loop for talking videos（口播/对谈背景循环）

- **风格**：Loop  
- **音频**：`/audio/sample-loop.mp3`  
- **当前封面**：`/images/covers/sample-loop.webp`  
- **高清封面文件名**：`sample-loop-1920x1080.webp` 或 `.png`

**简短描述**：为口播、对谈、播客设计的轻柔循环，不抢戏，可无缝循环。

**详细情景描述（供 AI 视频用）：**

- **时间与氛围**：白天或傍晚，自然光或柔和补光，干净、中性、偏专业/轻松。  
- **空间**：简约室内、工作室、带窗的办公室、或抽象渐变/几何背景。  
- **镜头与节奏**：几乎静态或极慢移动，便于与说话人画面叠加或作为画中画背景；节奏平稳，可做成无缝循环。  
- **色调与质感**：干净、低饱和度或柔和渐变，避免强烈对比。  
- **可选元素**：柔和光斑、缓慢变化的渐变、几何图形缓慢运动、窗外自然光变化。

**可直接复制的长文案提示（中英）：**

```
【中文】口播/对谈背景：简约室内或工作室，自然光或柔和补光，干净中性。可抽象渐变或几何背景。镜头几乎静态或极慢移动，节奏平稳，适合无缝循环。低饱和度、柔和，可有缓慢光斑或几何运动。适合与说话人画面叠加。16:9。

【English】Talking-head / podcast background: Minimal interior or studio, natural or soft fill light, clean and neutral. Optional abstract gradient or geometric backdrop. Nearly static or very slow camera, steady rhythm, loop-friendly. Low saturation, soft; optional slow bokeh or geometric motion. Suits overlay with speaker. 16:9.
```

---

## 4. Documentary emotional bed（纪录片情绪垫乐）

- **风格**：Documentary  
- **音频**：`/audio/sample-documentary.mp3`  
- **当前封面**：`/images/covers/sample-documentary.webp`  
- **高清封面文件名**：`sample-documentary-1920x1080.webp` 或 `.png`

**简短描述**：钢琴与弦乐为主的叙事型垫乐，适合纪录片、回忆、人物故事。

**详细情景描述（供 AI 视频用）：**

- **时间与氛围**：自然光主导——清晨、阴天、或黄昏；情绪偏沉思、回忆、希望或淡淡忧伤。  
- **空间**：自然景观（田野、森林、海岸）、旧建筑、走廊、或人物中近景与空镜交替。  
- **镜头与节奏**：纪录片式跟拍、缓慢摇镜、固定长镜头；节奏随钢琴与弦乐起伏，留白多。  
- **色调与质感**：自然、略偏冷或暖黄，可带轻微褪色感，像老照片或纪实风格。  
- **可选元素**：逆光剪影、风吹草地/树叶、海浪、旧物特写、人物背影或侧脸。

**可直接复制的长文案提示（中英）：**

```
【中文】纪录片情绪：自然光场景—清晨、阴天或黄昏的田野、森林、海岸或旧建筑。沉思、回忆感。纪录片式跟拍与缓慢摇镜，节奏随钢琴与弦乐起伏，留白多。色调自然，略褪色或纪实感。逆光剪影、风吹草木、海浪、旧物特写、人物背影。16:9，电影纪实风格。

【English】Documentary emotional: Natural light—morning, overcast or dusk in fields, forest, coast or old architecture. Reflective, nostalgic. Doc-style follow and slow pan, pace follows piano and strings, plenty of negative space. Natural color, slight fade or doc look. Backlit silhouettes, wind in grass, waves, object close-ups, figure from behind. 16:9, documentary cinema.
```

---

## 5. Late night R&B groove（深夜 R&B 律动）

- **风格**：R&B  
- **音频**：`/audio/sample-rnb.mp3`  
- **当前封面**：`/images/covers/sample-rnb.webp`  
- **高清封面文件名**：`sample-rnb-1920x1080.webp` 或 `.png`

**简短描述**：Neo-soul 感，适合深夜、放松、浪漫或城市夜生活场景。

**详细情景描述（供 AI 视频用）：**

- **时间与氛围**：夜晚，城市灯光、霓虹、车内或酒吧/天台，私密、暧昧或慵懒。  
- **空间**：城市天际线、街道车流、酒吧内、车内视角、公寓窗边、或抽象霓虹/光斑。  
- **镜头与节奏**：缓慢推拉或跟随，可带轻微手持感；节奏与贝斯/鼓点贴合，切镜可略多。  
- **色调与质感**：深色为主，霓虹色点缀（蓝、紫、粉、金），高光柔和。  
- **可选元素**：车灯轨迹、霓虹反射、烟雾、酒杯、城市倒影、人物剪影或局部特写。

**可直接复制的长文案提示（中英）：**

```
【中文】深夜 R&B：城市夜景、霓虹、车内或酒吧/天台。私密暧昧或慵懒。镜头缓慢推拉或跟随，略带手持感，节奏贴合贝斯与鼓点。深色基调，霓虹蓝紫粉金点缀，高光柔和。车灯轨迹、霓虹反射、烟雾、酒杯、城市倒影、人物剪影。16:9，电影感夜戏。

【English】Late night R&B: City night, neon, car interior or bar/rooftop. Intimate, moody or laid-back. Slow push or follow, slight handheld, rhythm locked to bass and drums. Dark base, neon blue/purple/pink/gold accents, soft highlights. Light trails, neon reflections, smoke, glass, city reflections, silhouettes. 16:9, cinematic night.
```

---

## 6. Game menu ambient（游戏菜单/界面环境音）

- **风格**：Ambient  
- **音频**：`/audio/sample-ambient.mp3`  
- **当前封面**：`/images/covers/sample-ambient.webp`  
- **高清封面文件名**：`sample-ambient-1920x1080.webp` 或 `.png`

**简短描述**：平静、可循环的环境氛围，适合游戏菜单、应用启动、冥想或背景展示。

**详细情景描述（供 AI 视频用）：**

- **时间与氛围**：无明确昼夜，偏抽象或极简自然——太空、云海、深海、森林薄雾、几何空间。  
- **空间**：抽象渐变、粒子场、星空、云层、水面倒影、或极简 3D 场景。  
- **镜头与节奏**：极慢推进或旋转，几乎无切镜，适合长时间循环。  
- **色调与质感**：柔和、低对比，蓝/绿/紫或中性灰，可带轻微发光或雾化。  
- **可选元素**：漂浮粒子、星点、缓慢流动的云或水、几何体缓慢旋转、UI 或 HUD 风格光效（若做游戏向）。

**可直接复制的长文案提示（中英）：**

```
【中文】游戏/界面环境：抽象或极简自然—太空、云海、深海、森林薄雾或几何空间。极慢推进或旋转，几乎无切镜，可长时间循环。柔和低对比，蓝绿紫或中性灰，轻微发光或雾化。漂浮粒子、星点、流动的云或水、几何体缓慢旋转。可选 UI/HUD 风格光效。16:9，干净科技感或自然静谧。

【English】Game menu / UI ambient: Abstract or minimal nature—space, clouds, deep sea, misty forest or geometric void. Very slow push or rotation, almost no cuts, long loop. Soft, low contrast, blue/green/purple or neutral grey, subtle glow or fog. Floating particles, stars, flowing clouds or water, slow-rotating geometry. Optional UI/HUD-style glow. 16:9, clean tech or serene nature.
```

---

## 高清封面存放与生成建议

1. **目录**：在项目中创建 `public/images/covers/hd/`，用于存放视频生成用的高清图。  
2. **命名**：建议 `sample-cinematic-1920x1080.png`、`sample-lofi-1920x1080.png` 等（与上表一致）。  
3. **来源**：  
   - 若已有高分辨率原图（≥1920×1080），可复制或导出到 `hd/` 并重命名。  
   - 若当前仅有 640px 的 webp，可用图像工具或 AI 放大至 1920×1080 后放入 `hd/`。  
4. **给 Gemini/ChatGPT 的用法**：将对应曲目的「详细情景描述」或「可直接复制的长文案提示」与 `hd/` 下对应封面图一起提交，作为「参考图 + 文本提示」生成视频。

运行 `node scripts/optimize-images.js` 时会自动从 `covers/sample-*.jpg`（或 `.webp`）生成上述 6 首的 1920×1080 版本到 `covers/hd/`，可直接用作视频参考图。
