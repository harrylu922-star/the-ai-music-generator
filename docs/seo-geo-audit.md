# MVP 上线前 SEO & GEO 审计

审计范围：当前 MVP 所有已上线页面（首页、AI Music Generator、AI Lyrics、Text to Music、AI Music Tools、Pricing、Resources、Legal）。  
审计日期：按执行日。

---

## 一、SEO 审计

### 1.1 已达标项

| 项 | 状态 | 说明 |
|----|------|------|
| 根 layout title/description | ✅ | 已设 default + template，子页继承 |
| 各子页独立 title/description | ✅ | ai-music-generator、ai-lyrics、text-to-music、pricing、ai-music-tools、resources、legal 均有 export metadata |
| 首页 H1 | ✅ | 单 H1：「The AI Music Generator / for Modern Creators」 |
| 各子页 H1 | ✅ | 各主要页面均有单一 H1 |
| 语义化结构 | ✅ | 使用 main, header, footer, nav, section, article |
| 内部链接 | ✅ | 首页→各工具、Header/Footer 导航、正文内链充足 |
| AI Lyrics 结构化数据 | ✅ | JSON-LD：SoftwareApplication、FAQPage、ItemList |
| html lang | ✅ | layout 中 `<html lang="en">` |

### 1.2 已修复项（本次实施）

| 项 | 修复内容 |
|----|----------|
| 首页无独立 metadata | 为 `app/page.tsx` 增加 export metadata（首页专用 title/description） |
| 无 metadataBase | 在根 layout 中设置 `metadataBase`，保证 og:url、sitemap 等绝对 URL 正确 |
| 无 Open Graph / Twitter | 在根 layout 增加默认 openGraph、twitter card，利于社交分享与爬虫 |
| 无 sitemap | 新增 `app/sitemap.ts`，输出所有 MVP 页面 URL |
| 无 robots.txt | 新增 `app/robots.ts`，allow / 并指向 sitemap.xml |
| JSON-LD ItemList 错误 | 将「AI Vocal Remover」「AI Stem Splitter」的 url 从 /ai-music-generator 改为 /ai-music-tools（或仅列已上线工具），避免误导与无效链接 |

### 1.3 建议上线后或后续迭代

| 项 | 建议 |
|----|------|
| 真实图片与 alt | 首页当前为 ImagePlaceholder；上线真实图后为所有 `<img>`/Next Image 添加简明 alt |
| 首页 og:image | 增加默认 og:image（如 1200×630），提升分享与收录效果 |
| 各子页 og/twitter 覆盖 | 重要页（首页、定价、AI Music/Lyrics）可单独设置 og title/description/image |
| Core Web Vitals | 上线后用 Search Console / PageSpeed Insights 观察 LCP、CLS、INP，按需优化图片与字体 |
| canonical | 若存在多域名或带参数重复页，再增加 canonical；当前单域名无参数可暂不设 |

---

## 二、GEO（地理/本地化）审计

### 2.1 已达标项

| 项 | 状态 | 说明 |
|----|------|------|
| 语言声明 | ✅ | `<html lang="en">`，与当前全英内容一致 |
| 单语言 MVP | ✅ | 无多语言版本时无需 hreflang |

### 2.2 当前设计（保留即可）

| 项 | 说明 |
|----|------|
| 语言切换器 | Header/首页为「EN ▾」占位，无功能；单语言上线无需改 |
| 无地域限定内容 | 定价为 USD、无地区切换，符合当前 MVP 范围 |

### 2.3 后续如做多语言/多地区

| 项 | 建议 |
|----|------|
| hreflang | 若有 en / zh 等多语言版本，在 layout 或各页增加 hreflang 与 alternate 链接 |
| 地域化定价 | 若按国家/地区展示不同货币或方案，再考虑 geo 元数据或结构化数据 |

---

## 三、实施清单（本次已完成）

- [x] 首页 `app/page.tsx` 增加 `metadata`（title, description）
- [x] 根 `app/layout.tsx` 增加 `metadataBase`、默认 `openGraph`、`twitter`
- [x] 新增 `app/sitemap.ts`，包含所有 MVP 路由
- [x] 新增 `app/robots.ts`，allow `/`，sitemap 指向 `/sitemap.xml`
- [x] `app/ai-lyrics-generator/json-ld.ts` 中 ItemList 的 position 4/5 链接改为 `/ai-music-tools`（或仅列已上线工具）

---

## 四、结论

在完成上述修复后，MVP 范围内 **SEO 与 GEO 满足先行上线要求**：  
标题与描述完整、可被爬虫与分享、sitemap 与 robots 就绪、结构化数据无误链。  
建议上线后配置 Google Search Console 并提交 sitemap，观察收录与表现后再做 og:image、多语言等增强。

**环境变量**：生产环境可设置 `NEXT_PUBLIC_SITE_URL`（如 `https://yourdomain.com`），用于 sitemap、robots、og:url；未设置时默认 `https://theaimusicgenerator.com`。参见 `.env.example`。
