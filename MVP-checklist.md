# MVP 最少需完成项

按「可对外演示、无致命 404、品牌一致」为标准，最少需完成以下内容。

## 必须完成（否则影响可用性）

| 项 | 说明 | 状态 |
|----|------|------|
| 1. 补全 404 路由 | 首页/Header/Footer 已链接 `/ai-music-tools`、`/resources`、`/legal`、`/privacy`、`/terms`、`/license`，缺则 404 | 已实现 |
| 2. 根 layout 元数据 | `app/layout.tsx` 的 title/description 仍为 "Create Next App"，需改为产品名与描述 | 已实现 |
| 3. 音乐生成按钮反馈 | 点击 Generate 后条目一直处于 "generating"，需在无真实 API 时改为「已完成」并给出占位说明 | 已实现 |

## 建议完成（提升观感，工作量小）

| 项 | 说明 |
|----|------|
| 首页音频占位 | 若 `public/audio/` 下无 sample-*.mp3，可移除或禁用播放按钮，或放静音/占位音频 |
| 定价 CTA | 「Subscribe Now」目前指向 `#`，可暂时指向 `/pricing` 或保留，待支付接入 |

## 可延后（非 MVP 阻塞）

- 真实登录/注册
- 真实支付与计费
- 真实 AI 音乐/歌词 API 对接
- Text-to-Music 独立 Workspace（当前为静态占位）
