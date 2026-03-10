# 部署到 Vercel（下一步操作）

代码已在 GitHub，按以下步骤即可把站点部署上线。

---

## 一、用 Vercel 连接 GitHub 仓库

1. 打开 **https://vercel.com**，用 GitHub 账号登录（建议使用 **harrylu922-star**）。
2. 点击 **Add New…** → **Project**。
3. 在 **Import Git Repository** 里选择 **harrylu922-star/the-ai-music-generator**，点 **Import**。
4. **Configure Project** 保持默认即可（Vercel 会自动识别 Next.js）：
   - Framework Preset: **Next.js**
   - Build Command: `next build`
   - Output Directory: 默认
   - Install Command: `npm install`
5. 在 **Environment Variables** 中可选添加：
   - 名称：`NEXT_PUBLIC_SITE_URL`  
   - 值：你的生产域名，例如 `https://theaimusicgenerator.com` 或先填 Vercel 给的域名如 `https://xxx.vercel.app`
6. 点击 **Deploy**，等待构建完成。

---

## 二、部署完成后

- Vercel 会给出一个地址，例如 `https://the-ai-music-generator-xxx.vercel.app`。
- 之后每次向 GitHub **main** 分支 push，Vercel 会自动重新部署。
- 若你有自己的域名，可在 Vercel 项目 **Settings → Domains** 里绑定，并在环境变量中把 `NEXT_PUBLIC_SITE_URL` 设为该域名。

---

## 三、可选：本机用 Vercel CLI 部署

若已安装 Vercel CLI：

```bash
npx vercel
```

按提示登录并关联项目即可部署当前目录。
