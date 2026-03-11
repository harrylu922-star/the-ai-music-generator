# PageSpeed Insights 优化说明

针对 PageSpeed（移动端）报告中的两项建议，已做如下处理。

---

## 一、Legacy JavaScript（约 13 KiB）

### 原因

- Next.js 内置会注入 **polyfill-module**，为 `Array.prototype.at`、`flat`、`flatMap`、`Object.fromEntries`、`Object.hasOwn`、`String.prototype.trimStart`/`trimEnd` 等提供兼容。
- 这些在 **Chrome 111+、Safari 16.4+、Firefox 111+** 等现代浏览器中已原生支持，无需再发这段 JS。
- 报告里约 **13.4 KiB** 来自某个 chunk（如 `chunks/25df93df54190ff3.js`），正是上述 polyfill。

### 已做改动

1. **空 polyfill 占位**  
   - 新增 `lib/empty-polyfill.js`，仅 `module.exports = {}`，用作占位模块。

2. **next.config 中替换 polyfill 引用**  
   - **Webpack**（`next build` 使用 `--webpack` 时）：  
     `resolve.alias` 将  
     `next/dist/build/polyfills/polyfill-module` 与  
     `../build/polyfills/polyfill-module`  
     指向上述空模块（绝对路径）。
   - **Turbopack**（Next 16 默认）：  
     使用 `turbopack.resolveAlias` 指向 `./lib/empty-polyfill.js`（相对路径，避免 Windows 下绝对路径问题）。

效果：现代浏览器不再加载这段约 13 KiB 的旧版 JS，有利于 PageSpeed「Avoid serving legacy JavaScript to modern browsers」项。

参考：[next.js/discussions/64330](https://github.com/vercel/next.js/discussions/64330)

---

## 二、Use efficient cache lifetimes（约 4 KiB）

### 原因

- 报告里提到 **Cache TTL**：某资源（如 Cloudflare 的 `beacon.min.js`，来自 `static.cloudflareinsights.com`）缓存只有 **1 天**，重复访问会重复下载（约 11 KiB 传输）。
- 该脚本是 **第三方域名**，我们无法改其服务器上的 Cache-Control；只能从「本站资源」和「加载方式」上优化。

### 已做改动

1. **本站静态资源长缓存**  
   在 `public/_headers` 中为本站静态资源加长缓存，减少重复访问时的传输与请求：
   - `/_next/static/*`：已有 `max-age=31536000,immutable`
   - `/images/*`：新增 `Cache-Control: public,max-age=31536000,immutable`
   - `/audio/*`：新增 `Cache-Control: public,max-age=31536000,immutable`

2. **关于 Cloudflare beacon**  
   - `beacon.min.js` 的 1 天 TTL 由 Cloudflare 控制，无法在本项目中修改。
   - 若在 Cloudflare Dashboard 开启了 Web Analytics，可考虑：
     - 确认脚本为异步加载（不阻塞首屏），和/或  
     - 若对分析依赖不高，可关闭以进一步减少第三方请求。

---

## 三、Improve image delivery（约 180 KiB）

### 原因（复核）

- 报告中 **323.5 KiB 为多张图片的合计**，并非单张文件体积；单张 hero 卡最大约 54 KiB（与本地优化后一致）。
- 「Improve image delivery」的约 180 KiB 可节省，主要来自：**图片尺寸大于展示尺寸**（例如 954×536 的图在移动端只显示约 596×333），应使用响应式图片（srcset）按需下发，减少多余下载。

### 已做改动

1. **构建时校验**  
   - `scripts/optimize-images.js` 在生成 home 图后，校验三张 `hero-card-*.webp` 单文件均 ≤100 KiB，否则 **build 失败**，作为安全网避免误部署大图。

2. **响应式 hero 图**  
   - 脚本为三张 hero 卡额外生成 **640w** 版本（`*-640.webp`），首页 `HomeFeatureImage` 使用 **srcset**（640w + 960w），移动端按视口选小图，减少 LCP 与总下载量。

---

## 四、构建与部署说明

- **API 路由与静态导出**：`app/api/agreements/route.ts` 在 `output: "export"` 下需声明 `export const dynamic = "force-static"`，否则 `next build` 会报错。部署到 **Cloudflare Pages（纯静态）** 时，`/api/*` 不会运行，若需要该接口，需用 **Workers** 或其它后端单独提供。
- **构建命令**：`npm run build` 使用 Turbopack；若需用 Webpack 验证 polyfill 替换，可使用 `next build --webpack`（若项目支持）。

---

## 五、下一步：是否还需优化、优化哪些

**当前已做且与截屏结论一致：**

| 项目 | 截屏结论 | 已做改动 | 状态 |
|------|----------|----------|------|
| Legacy JavaScript | 约 13 KiB 可省 | polyfill 指向空模块 | 已做，部署后生效 |
| Efficient cache | 约 4 KiB 可省 | 本站 `/images`、`/audio`、`/_next/static` 长缓存 | 已做；第三方 beacon 无法改 |
| Improve image delivery | 323.5 KiB 为多图合计，单张最大约 54 KiB；约 180 KiB 可省 | hero 卡 640w + srcset，构建校验 ≤100 KiB | 已做，部署后移动端会拉小图 |

**结论：**

- **不必为「323.5 / 单张 54」再改图**：单张已约 54 KiB，无单张过大问题；323.5 是多项总和，已通过 srcset 减少不必要下载。
- **建议先部署当前改动并复测**：部署后跑一次 PageSpeed（移动端），看「Legacy JavaScript」「Improve image delivery」是否明显改善，再决定是否做下面可选项。

**若复测后仍想继续优化，可做（按优先级）：**

1. **Reduce unused JavaScript（约 28 KiB）**  
   - 未做。可做：路由/组件级 code-splitting、非首屏组件懒加载、检查 radix-ui / lucide-react 等是否可按需引入或替换为更轻量用法。

2. **Avoid long main-thread tasks（1 long task）**  
   - 未做。可做：用 Chrome DevTools Performance 定位长任务，再考虑拆分或延后执行。

3. **图片（可选）**  
   - 若「Improve image delivery」仍有余量：对非 hero 的 home 图（如 explore-*、how-*）做 640w 或略降质量；或为支持的浏览器提供 AVIF（静态导出下需预生成多格式）。

---

## 六、建议复测

部署后建议：

1. 在 [PageSpeed Insights](https://pagespeed.web.dev/) 对生产 URL（移动端）再测一次。
2. 确认「Legacy JavaScript」「Improve image delivery」是否消失或减轻。
3. 确认「Efficient cache lifetimes」中本站资源（`/_next/static/*`、`/images/*`、`/audio/*`）是否显示为长缓存（如 1 年）。
