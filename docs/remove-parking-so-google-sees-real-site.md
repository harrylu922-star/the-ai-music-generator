# 让 Google 抓取真实网站（摆脱域名停放）

当前现象：Google 抓到的仍是 Sedo/NameSilo 停放页（广告页），看不到你的 Next 应用。  
解决办法：**把域名从停放切到真实托管，并关掉停放**。

---

## 第一步：确认 Next 应用部署在哪里

你的站可能部署在：

- **Vercel**（常见）
- **Cloudflare Pages**
- **其他**（自有服务器、Netlify 等）

先确认：用「预览域名」能打开你的真实站点吗？例如：

- Vercel：`https://xxx.vercel.app` 或 `https://the-ai-music-generator.vercel.app`
- Cloudflare Pages：`https://xxx.pages.dev`

记下这个**真实站点的地址**，后面 DNS 要指到这里。

---

## 第二步：在域名注册商处关掉停放、改 DNS

域名在 **NameSilo**（或 Sedo 等）时，需要两件事：

### 2.1 关闭域名停放（NameSilo 示例）

1. 登录 **NameSilo**
2. 进入 **My Account → Domain Manager**
3. 找到 `theaimusicgenerator.com`，点 **Manage**
4. 查找与 **Parking / Sedo / Monetization** 相关的选项，**关闭/禁用**
5. 若域名曾添加到 **Sedo** 做停放，到 Sedo 后台把该域名**从停放中移除**或停用停放

只要停放还开着，就可能继续把流量/DNS 指到 Sedo，Google 就会继续抓到停放页。

### 2.2 把 DNS 指到你的真实托管（而不是 Sedo）

同样在 NameSilo 的 **Domain Manager → theaimusicgenerator.com**：

- 进入 **DNS Records** / **Nameservers** 或 **Redirect** 等
- **删除** 指向 Sedo/停放的记录，例如：
  - Sedo 的 A 记录 / CNAME
  - 或「Parking」「Monetization」提供的 IP/CNAME
- **改为** 使用你托管商提供的 DNS 配置：

**若用 Vercel：**

- 在 Vercel 项目里添加域名：`theaimusicgenerator.com` 和 `www.theaimusicgenerator.com`
- Vercel 会给出解析要求，例如：
  - `theaimusicgenerator.com` → A 记录指向 `76.76.21.21`，或 CNAME 到 `cname.vercel-dns.com`
  - `www.theaimusicgenerator.com` → CNAME 到 `cname.vercel-dns.com`
- 在 NameSilo 里**只保留** Vercel 要求的 A/CNAME，**不要**再保留 Sedo 的

**若用 Cloudflare Pages：**

- 在 Cloudflare 添加站点并添加该域名
- 把 NameSilo 的 **Nameservers** 改成 Cloudflare 提供的 NS（如 `xxx.ns.cloudflare.com`），让 DNS 完全由 Cloudflare 管理；或在 NameSilo 用 A/CNAME 按 Cloudflare 要求指向 Pages 的 IP/CNAME

保存后等待 **DNS 生效**（几分钟到 48 小时，通常几小时内）。

---

## 第三步：自检「是否已经切到真实站」

在 DNS 生效后：

1. **本机**（可先清 DNS 缓存）访问：
   - `https://theaimusicgenerator.com/`
   - `https://www.theaimusicgenerator.com/`
2. 确认：
   - 打开的是你的 **Next 应用**（你写的页面）
   - **没有** Sedo/NameSilo logo、没有停放广告
   - 若有 301，`http` 和 `www` 会跳到你要的主站（如 `https://theaimusicgenerator.com`）

若仍看到停放页，说明 DNS 或停放还没完全切干净，回到第二步检查。

---

## 第四步：让 Google 重新抓取「真实站」

DNS 已指向真实站后：

1. 打开 **Google Search Console**
2. 确认使用的资源是 **网址前缀**：`https://theaimusicgenerator.com`（或你定的主域）
3. 用 **URL 检查**：
   - 输入 `https://theaimusicgenerator.com/`
   - 点击「请求编入索引」（或「测试实时网址」后再请求编入索引）
4. 在 **Sitemap** 里重新提交 `https://theaimusicgenerator.com/sitemap.xml`（若之前提交过可再提交一次）

之后 Google 会重新抓取，新抓取到的就是你的 Next 应用，而不是停放页。  
索引更新可能需要几天到一两周，可过几天再在 GSC 看「已抓取的页面」和「Page resources」是否已变成你站的真实内容。

---

## 小结清单

| 步骤 | 做什么 |
|------|--------|
| 1 | 确认 Next 应用部署在哪（Vercel/Cloudflare 等），记下预览地址 |
| 2 | 在 NameSilo 关掉域名停放 / Sedo 停放 |
| 3 | 在 NameSilo 把 DNS 改为指向 Vercel/Cloudflare（按托管商文档），删掉 Sedo 相关记录 |
| 4 | 浏览器访问根域和 www，确认已是真实站、无停放广告 |
| 5 | GSC 对首页「请求编入索引」并提交 sitemap |

只要 DNS 指向的是你真实托管且停放已关，Google 就会逐渐抓到你的真实网站内容，不再显示依赖广告的停放页。
