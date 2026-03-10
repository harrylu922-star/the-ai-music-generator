# OG 图校验：确保分享/爬虫不 404

默认 OG 图路径：`public/images/home/hero-card-ai-music-generator.jpg`，在根 layout 与多页 metadata 中引用。若该文件缺失或不可用，社交分享与爬虫会拿到 404。

## 本地与构建时

- **完整校验（推荐）**：存在 + 尺寸 1200×630  
  ```bash
  npm run verify:og
  ```
- **仅校验存在**（过渡期未改图时可先用）：  
  ```bash
  VERIFY_OG_DIMENSIONS=0 node scripts/verify-og-image.js
  ```
- **构建前自动校验**：`npm run build` 会先执行 `prebuild`，即完整校验；未通过则构建失败。若当前图片尚未改为 1200×630，可临时设置环境变量再构建：
  ```bash
  set VERIFY_OG_DIMENSIONS=0
  npm run build
  ```
  （Linux/macOS 用 `export VERIFY_OG_DIMENSIONS=0`。）

建议上线前将图片裁切/导出为 **1200×630**，然后去掉 `VERIFY_OG_DIMENSIONS=0`，保证 CI 与本地 build 都做完整校验。

## 生产环境如何确认

1. **确认文件存在且可访问**  
   在浏览器或 curl 请求绝对 URL（需与站点一致）：
   ```bash
   curl -I https://theaimusicgenerator.com/images/home/hero-card-ai-music-generator.jpg
   ```
   应返回 `200`，且 `Content-Type` 为 `image/jpeg`（或对应图片类型）。

2. **确认尺寸**  
   - 在 CI 中跑 `npm run verify:og`（部署前构建已包含 prebuild，等同完整校验）。  
   - 或本地下载该 URL 后运行 `npm run verify:og`（需把文件放到 `public/images/home/hero-card-ai-music-generator.jpg` 再跑脚本）。  
   - 或使用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) / [Twitter Card Validator](https://cards-dev.twitter.com/validator) 等工具查看抓取到的图片尺寸。

3. **部署清单**  
   - 部署包或镜像中是否包含 `public/images/home/hero-card-ai-music-generator.jpg`（若构建产物只含 `.next` 与静态资源，需确保 `public/` 被完整拷贝到运行目录）。  
   - CDN/反向代理未对该路径做特殊拦截或 404。

总结：**构建阶段**用 `scripts/verify-og-image.js`（或 `npm run verify:og`）避免缺图或尺寸不对；**生产环境**用上述 URL 检查 + 部署清单确认文件存在且可访问，即可避免分享/爬虫 404。
