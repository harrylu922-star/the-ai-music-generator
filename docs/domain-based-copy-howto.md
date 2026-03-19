# 按域名分支渲染前端文案 — 操作说明

同一套代码部署到多个域名时，可根据**当前访问的域名**显示不同站名、标题、版权等文案。

---

## 1. 已实现内容

- **`lib/site-config.ts`**  
  - 定义 `SiteBrandConfig`（站名、副标题、版权名、title/description 等）。  
  - `getSiteConfig(host)`：根据 host 或 `NEXT_PUBLIC_SITE_URL` 返回对应配置。  
  - `getServerSiteConfig()`：服务端用，从请求头取 host 后调用 `getSiteConfig`；静态构建时用 env 的 host。

- **`components/SiteConfigProvider.tsx`**  
  - 用 React Context 把当前站配置传给整棵树。  
  - 客户端组件通过 `useSiteConfig()` 取配置。

- **已按配置渲染的页面/组件**  
  - **根 layout**：`generateMetadata()` 用 `getServerSiteConfig()` 生成 title、description、og、twitter。  
  - **首页** `app/page.tsx`：H1（站名 + tagline）、输入框 placeholder、首页 metadata、JSON-LD 使用当前 config。  
  - **SiteHeader**：Logo alt、品牌名、aria-label 使用 config；主站仍保留 TAMG 字母高亮。  
  - **SiteFooter**：版权行、页脚品牌名使用 config。

---

## 2. 为新域名改前端文案（Cloudflare Pages）

### 步骤一：在代码里为新域名加配置

打开 **`lib/site-config.ts`**，在 `BRAND_BY_HOST` 里为**新域名**加一项（host 不含端口、小写），例如：

```ts
const BRAND_BY_HOST: Record<string, Partial<SiteBrandConfig>> = {
  "theaimusicgenerator.com": {},
  "www.theaimusicgenerator.com": {},
  "你的新域名.com": {
    siteUrl: "https://你的新域名.com",
    siteName: "新站名称",
    shortName: "新站短名",
    tagline: "新站副标题",
    copyrightName: "你的新域名.com",
    titleTemplate: "%s | 新站名称",
    defaultTitle: "新站首页标题",
    defaultDescription: "新站的默认 meta 描述。",
    ogImageAlt: "新站 – og 图片 alt 文案",
  },
};
```

保存后，当访问 host 为 `你的新域名.com`（或部署时 `NEXT_PUBLIC_SITE_URL` 为该域名）时，整站会使用上面这套文案。

### 步骤二：Cloudflare Pages 部署与环境变量

- **同一仓库、多套部署（推荐）**  
  - 在 Cloudflare Pages 里为**新域名**再建一个 **Project**（或同一 Project 下绑多个域名）。  
  - 该 Project 的 **Environment variables** 里设置：  
    - `NEXT_PUBLIC_SITE_URL=https://你的新域名.com`  
  - 构建并发布后，新域名访问到的就是新文案。

- **静态导出（STATIC_EXPORT=1）**  
  - 每次构建只对应一个域名：构建时用到的 `NEXT_PUBLIC_SITE_URL` 的 host 会传给 `getSiteConfig(null)`，因此**每个域名各建一个 Pages Project 并设好各自的 `NEXT_PUBLIC_SITE_URL`** 即可，无需在请求里再判断。

- **若同一部署同时服务多域名（例如同一 Worker/Node 且未静态导出）**  
  - 请求会带 `Host` 头，`getServerSiteConfig()` 会按 `Host` 选配置，只要在 `BRAND_BY_HOST` 里为每个域名都配好即可。

### 步骤三：确认效果

- 浏览器访问新域名首页，检查：  
  - 标题、H1、Header/Footer 品牌名与版权、输入框 placeholder 是否均为新文案。  
- 查看页面源码 / 分享预览：  
  - og:title、og:description、twitter、JSON-LD 是否为新站信息。

---

## 3. 其他页面也想按域名改文案时

- **服务端组件（如各 `page.tsx`）**  
  - 在页面里 `const config = await getServerSiteConfig();`，然后用 `config.siteName`、`config.defaultTitle` 等渲染或生成 metadata。

- **客户端组件**  
  - 使用 `useSiteConfig()` 取当前 config，再渲染对应文案。

- **子页面 metadata**  
  - 若希望子页面 title 也带当前站名，可在该页的 `generateMetadata()` 里调用 `getServerSiteConfig()`，用 `config.titleTemplate` 或 `config.siteName` 拼 title。

---

## 4. 小结

| 要做的事 | 在哪里做 |
|----------|----------|
| 为新域名设一套站名、标题、版权等 | `lib/site-config.ts` → `BRAND_BY_HOST["新域名.com"]` |
| 新域名用不同 env 部署 | Cloudflare Pages 新 Project（或新环境）里设 `NEXT_PUBLIC_SITE_URL=https://新域名.com` |
| 在服务端组件里用当前站文案 | `getServerSiteConfig()` |
| 在客户端组件里用当前站文案 | `useSiteConfig()` |

这样即可在同一套代码下，按域名分支渲染前端文案，并在 Cloudflare Pages 上通过环境变量和 `BRAND_BY_HOST` 管理多域名。
