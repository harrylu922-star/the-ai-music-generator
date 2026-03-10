# 把外部生成的歌曲接入本站展示

在其他站点（如 Suno、Udio、Splash 等）生成好歌曲后，按下面步骤即可把音频装到本仓库，在首页「Hear what our AI music generator sounds like」区块播放。

---

## 一、准备音频文件

1. **格式**：建议 **MP3**（本站用 `audio/mpeg` 播放）。若只有 WAV/OGG，可先转成 MP3 再放入，或后续在代码里为 `<source>` 增加对应 `type`。
2. **命名**：随意，例如 `sample-cinematic.mp3`、`my-lofi-track.mp3`。只要和下一步里填的路径一致即可。
3. **版权**：确保你有权在本站使用（商用/展示需符合你生成时该平台的使用条款）。

---

## 二、放进项目并让站点能访问

1. 在项目根目录下创建文件夹（若还没有）：
   ```
   public/audio/
   ```
2. 把生成的 MP3 文件**复制**到 `public/audio/` 里。  
   例如：
   - `public/audio/sample-cinematic.mp3`
   - `public/audio/sample-lofi.mp3`
   - `public/audio/sample-loop.mp3`
   - `public/audio/sample-social.mp3`

Next.js 会把 `public/` 下的文件按根路径提供，所以访问路径是：**`/audio/文件名.mp3`**。

---

## 三、在首页配置「展示列表」

展示列表写在 **`app/page.tsx`** 的 `sampleTracks` 数组里。

**方式 A：替换现有 4 首（路径不变）**  
若你仍用 4 首、且文件名和现在一致（`sample-cinematic.mp3`、`sample-lofi.mp3`、`sample-loop.mp3`、`sample-social.mp3`），则**只需把对应 MP3 放进 `public/audio/` 覆盖或新建**，无需改代码。  
若文件名不同，就按方式 B 改列表。

**方式 B：改成你自己的文件名或增加/减少曲目**  
打开 `app/page.tsx`，找到约第 13–17 行的 `sampleTracks`：

```ts
const sampleTracks = [
  { category: "Full track · Cinematic", title: "Cinematic opener", description: "…", audioSrc: "/audio/sample-cinematic.mp3" },
  { category: "Instrumental · Lo-fi", title: "Lo-fi focus instrumental", description: "…", audioSrc: "/audio/sample-lofi.mp3" },
  // …
];
```

- **只改文件**：把 `audioSrc` 改成你在 `public/audio/` 里放的文件名，例如 `"/audio/my-cinematic.mp3"`。
- **增加一首**：在数组里多加一条对象，包含 `category`、`title`、`description`、`audioSrc`（`audioSrc` 指向 `/audio/xxx.mp3`）。
- **减少一首**：删掉对应对象即可。  
保存后首页会按新列表展示；播放器会使用你填的 `audioSrc`。

---

## 四、可选：展示 8 首时的布局

若你按 `docs/showcase-music-prompts.md` 做了 8 首并都想在首页展示：

1. 在 `public/audio/` 放入 8 个 MP3。
2. 在 `app/page.tsx` 的 `sampleTracks` 里配置 8 条（每条都有 `category`、`title`、`description`、`audioSrc`）。
3. 若希望 8 首占满两行、不再显示后面的「占位卡片」，可删掉或注释掉 `sampleTracks.map` 后面那一段「4 个占位」的代码（约 161–176 行的 `{[1, 2, 3, 4].map(...)}`）。需要的话我可以按你当前 `page.tsx` 帮你标出具体行号。

---

## 五、和你（本仓库）的配合方式总结

| 你做的事 | 本仓库/站点做的事 |
|---------|-------------------|
| 在其他站点生成歌曲并导出 MP3 | — |
| 把 MP3 放到 `public/audio/` | 通过 `/audio/xxx.mp3` 提供静态文件 |
| 在 `app/page.tsx` 的 `sampleTracks` 里填/改 `audioSrc`、标题、描述 | 首页用该列表渲染卡片并用 `<audio><source src={audioSrc} /></audio>` 播放 |

不需要改构建命令或环境变量；放好文件、改好 `sampleTracks` 后，本地 `npm run dev` 或部署后即可听到你装的歌。

如果你愿意，我可以根据你实际要用的文件名和 4 首/8 首列表，直接给你一段可粘贴进 `app/page.tsx` 的 `sampleTracks` 示例。
