# 部署到 Cloudflare

本项目支持两种方式部署到 Cloudflare：

- **推荐：Cloudflare Pages（静态导出）** — 使用 `output: "export"` 构建到 `out/`，无 WASM 依赖，部署稳定。
- **Workers + OpenNext** — 完整 Next.js 运行时，当前在 Windows 上可能遇到 resvg.wasm 路径错误，可在 WSL/Linux 或等待上游修复后使用。

---

## 一、前置条件

- 已安装 Node.js 18+
- 拥有 [Cloudflare 账号](https://dash.cloudflare.com/sign-up)
- 代码已推送到 GitHub（可选，用于 CI/CD）

---

## 二、方式一：Cloudflare Pages（静态，推荐）

避免 Workers 的 resvg.wasm 问题，直接部署静态站点。

### 1. 安装依赖并登录

```bash
npm install
npx wrangler login
```

### 2. 构建并部署到 Pages

```bash
npm run deploy
```

会先执行 `next build`（输出到 `out/`），再执行 `wrangler pages deploy out`，将 `out/` 部署到 Cloudflare Pages。

### 3. 首次部署：创建 Pages 项目

若尚未在 Cloudflare 创建 Pages 项目，首次运行 `npm run deploy` 时按提示输入项目名（如 `the-ai-music-generator`），或先到 [Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Direct Upload**，再使用上方命令部署。

### 4. 查看结果

- 部署成功后终端会输出预览 URL，形如 `https://<branch>.<project>.pages.dev`。
- 在 **Workers & Pages** → 你的 Pages 项目 中可查看生产地址与绑定自定义域名。

---

## 三、方式二：Workers + OpenNext（备选）

若需完整 Next.js 服务端能力（SSR、API 等），可在 **WSL 或 Linux 环境** 使用（Windows 上可能遇到 resvg.wasm 路径错误）：

```bash
npm run deploy:workers
```

需已执行 `npx wrangler login`。部署后地址一般为 `https://the-ai-music-generator.<子域>.workers.dev`。

本地预览（与 Workers 一致的环境）：

```bash
npm run preview
```

---

## 四、通过 GitHub 自动部署（Pages 静态）

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages**。
2. 点击 **Create** → **Pages** → **Connect to Git**。
3. 选择 **GitHub**，授权后选择仓库 **harrylu922-star/the-ai-music-generator**。
4. **Build 配置**：
   - **Framework preset**: Next.js (Static HTML Export) 或 None
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. **Environment variables**（可选）：`NEXT_PUBLIC_SITE_URL` = 你的生产域名。
6. 保存并部署。之后每次推送到所选分支（如 `main`）会自动构建并部署。

---

## 五、自定义域名

1. 在 **Workers & Pages** 中打开本项目。
2. 进入 **Settings** → **Domains & Routes**（或 **Custom domains**）。
3. 添加你的域名并按提示在 DNS 中添加 CNAME 或 A/AAAA 记录。

绑定后可在环境变量中把 `NEXT_PUBLIC_SITE_URL` 设为该域名，以便 sitemap、og:image 等使用正确根地址。

---

## 六、已添加的工程文件说明

| 文件 | 说明 |
|------|------|
| `wrangler.jsonc` | Cloudflare Worker 配置（入口、兼容性、静态资源、自引用等） |
| `open-next.config.ts` | OpenNext 适配 Cloudflare 的配置 |
| `.dev.vars` | 本地预览时的环境变量（如 `NEXTJS_ENV=development`） |
| `public/_headers` | 静态资源缓存头（`/_next/static/*` 长期缓存） |
| `.gitignore` | 已加入 `.open-next`，避免提交构建产物 |

---

## 七、常见问题

- **部署报错找不到 wrangler**：先执行 `npm install`，再执行 `npm run deploy`。
- **需要环境变量**：在 Cloudflare Dashboard 该项目 **Settings** → **Variables** 中配置；本地预览可在 `.dev.vars` 中配置（勿提交敏感信息）。
- **图片优化**：若需使用 Cloudflare Images，可在 `wrangler.jsonc` 中增加 `images` binding，详见 [OpenNext 文档](https://opennext.js.org/cloudflare/howtos/image)。

更多说明见 [OpenNext Cloudflare](https://opennext.js.org/cloudflare) 与 [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)。
