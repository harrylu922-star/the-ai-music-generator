# 加载速度与 Core Web Vitals (CWV) 模拟测试

当前项目可以这样模拟/测试**加载速度**和**网页核心数据（Core Web Vitals）**。

---

## 一、Core Web Vitals 是什么

| 指标 | 含义 | 大致「良好」参考 |
|------|------|------------------|
| **LCP** (Largest Contentful Paint) | 最大内容绘制完成时间 | ≤ 2.5s |
| **INP** (Interaction to Next Paint) | 从交互到下一次绘制（响应性） | ≤ 200ms |
| **CLS** (Cumulative Layout Shift) | 累计布局偏移（视觉稳定性） | ≤ 0.1 |

此外常看：**FCP**（首次内容绘制）、**TBT**（总阻塞时间）、**Speed Index**（速度指数）、**Performance Score**（Lighthouse 性能分 0–100）。

---

## 二、方式一：本地用 Lighthouse（需 Chrome）

**前提**：本机已安装 Chrome/Chromium，且本地已启动站点（如 `npm run start` 在 3000 端口）。

1. 构建并启动生产服务（若尚未启动）：
   ```bash
   npm run build
   npm run start
   ```
2. 新开一个终端，对首页跑一次性能审计并生成报告：
   ```bash
   npm run lighthouse
   ```
   或直接使用 CLI（需先安装 Chrome）：
   ```bash
   npx lighthouse http://localhost:3000 --only-categories=performance --output=html --output-path=./lighthouse-report.html --chrome-flags="--headless"
   ```
3. 打开生成的 `lighthouse-report.html`，在 **Performance** 里查看：
   - **Performance score**（0–100）
   - **Core Web Vitals**：LCP、CLS；若环境支持会看到 INP 或 FID
   - 以及 FCP、TBT、Speed Index 等

**多页测试**（可选）：对 `/pricing`、`/ai-music-generator` 等重复上述命令，仅改 URL 和输出文件名即可。

---

## 三、方式二：PageSpeed Insights（无需本地 Chrome）

**适用**：已部署到公网或使用隧道（如 ngrok）暴露本地服务时。

1. 打开：<https://pagespeed.web.dev/>
2. 输入要测的 URL（例如 `https://your-domain.com` 或 ngrok 提供的地址）。
3. 点击「分析」后，可查看：
   - **Core Web Vitals**（LCP、INP、CLS）及「良好/需改进/差」
   - 性能评分与其它加载速度相关指标

本地未部署时，可先 `npm run build && npm run start`，用 ngrok 等把 `http://localhost:3000` 暴露为 https 地址，再在 PageSpeed Insights 里测该地址。

---

## 四、当前状态说明

- **可以**在现有状态下做上述两种模拟测试：
  - 本地：Lighthouse 针对 `http://localhost:3000`（或其它本地端口）。
  - 线上：PageSpeed Insights 针对已上线或隧道暴露的 URL。
- 测到的是**当时环境**下的加载速度与 CWV（受本机/网络、图片与资源是否就绪等影响），与真实用户环境会存在差异，但足以做相对对比和回归检查。

---

## 五、建议的测试节奏

| 阶段 | 建议 |
|------|------|
| MVP 上线前 | 本地用 Lighthouse 跑一次首页 + 1–2 个关键页（如 `/pricing`、`/ai-music-generator`），确认无红色 CWV、性能分可接受。 |
| 上线后 | 用 PageSpeed Insights 对生产 URL 跑一次，并可在 Google Search Console 中查看「核心网页指标」真实数据。 |

若希望把 Lighthouse 集成进 CI（例如每次部署前自动跑），可后续再接入 **Lighthouse CI** 或类似方案。
