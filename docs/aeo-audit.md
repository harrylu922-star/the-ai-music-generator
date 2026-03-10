# AEO（Answer Engine Optimization）审计

**目标**：让 AI 答案引擎（如 ChatGPT、Perplexity、Google AI Overview、Claude 等）在回答「AI 音乐生成」「AI 歌词」「免费做歌」等问题时，更容易引用并展示本站内容。

---

## 一、AEO 已达标项

| 项 | 状态 | 说明 |
|----|------|------|
| 结构化数据 FAQ | ✅ | AI Lyrics 页已有 FAQPage JSON-LD，与正文 FAQ 一致，便于被引用 |
| 结构化数据 SoftwareApplication | ✅ | AI Lyrics 页有名称、分类、价格、评分、URL |
| 结构化数据 ItemList | ✅ | 工具列表，已修正为已上线页面 |
| 清晰问答句式 | ✅ | 各 FAQ 为「问题 + 直接回答」，适合被摘录 |
| 长文与 H2 结构 | ✅ | AI Lyrics / Text to Music 等有「How it works」「For rappers」「For YouTubers」等，便于理解主题 |
| 定义式首段 | ✅ | 多页有「Our AI lyrics generator uses…」「Text to music is an AI feature that…」等可被引用的定义 |
| 语义化 HTML | ✅ | 使用 section、h1/h2/h3、article，利于解析 |

---

## 二、已补充项（本次实施）

| 项 | 说明 |
|----|------|
| 首页 FAQ 的 JSON-LD | 首页有 5 条 FAQ（What can I create / Do I own / YouTube TikTok / Experience / Lyrics first），此前仅 HTML `<details>`，无 FAQPage 结构化数据。已为首页增加 **FAQPage** JSON-LD，与正文一一对应，便于答案引擎在回答「AI music generator」相关问题时引用本站首页。 |

---

## 三、AEO 建议（后续可做）

| 项 | 建议 |
|----|------|
| 定义块前置 | 重要页（如 AI Music Generator、Pricing）首屏可增加 1～2 句「What is…」式定义，便于被摘成一句话引用 |
| AI Music Generator 页 FAQ + JSON-LD | 若该页增加 FAQ 区块，建议同步输出 FAQPage schema，与 AI Lyrics 页一致 |
| 简明「工具列表」文案 | 在 AI Music Tools 或首页保留一句「The AI Music Generator offers: AI music generator, AI lyrics generator, text-to-music.」类总结，利于被引用为来源 |
| 避免纯图片信息 | 关键信息保持为可爬文本；当前占位图无实质内容，无影响 |

---

## 四、与 SEO 的配合

- AEO 依赖的 **FAQPage、SoftwareApplication** 等 schema 同时有利于传统搜索的富结果（如 FAQ 折叠）。
- 保持 **标题、描述、H1/H2** 与「用户/AI 常问问题」一致（如含「free」「how to」「what is」），对搜索与答案引擎都有帮助。

---

## 五、结论

在完成「首页 FAQ JSON-LD」后，MVP 在 **AEO 方面** 已具备：  
多页结构化数据、清晰问答与定义、可被安全引用的正文与 schema。  
后续可按「建议」逐步为 AI Music Generator 等页增加 FAQ + schema、首段定义，进一步强化被引用率。
