import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalPlayerLayout } from "../components/GlobalPlayerLayout";
import { SiteConfigProvider } from "../components/SiteConfigProvider";
import { getServerSiteConfig } from "../lib/site-config";

// 注意：Cloudflare Pages 当前使用静态导出 (output: "export")，无法使用 force-dynamic。
// 静态构建下所有页面在构建期预渲染，单一部署无法按域名切换品牌。
// 若需 aimusicfactory.com 与 theaimusicgenerator.com 内容不同，请：
// 方案 A) 为两个域名各建一个 Pages 项目，分别设置 NEXT_PUBLIC_SITE_URL 后构建；
// 方案 B) 改用 OpenNext/Workers 部署（SSR），保留 force-dynamic 即可按 Host 切换。

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getServerSiteConfig();
  return {
    metadataBase: new URL(config.siteUrl),
    title: {
      default: config.defaultTitle,
      template: config.titleTemplate,
    },
    description: config.defaultDescription,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: config.siteName,
      title: config.defaultTitle,
      description: config.defaultDescription,
      images: [
        {
          url: "/images/home/hero-card-ai-music-generator.jpg",
          width: 1200,
          height: 630,
          alt: config.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.defaultTitle,
      description: config.defaultDescription,
      images: ["/images/home/hero-card-ai-music-generator.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getServerSiteConfig();
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/plain" href="/llm.txt" title="LLM context" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteConfigProvider config={config}>
          <GlobalPlayerLayout>{children}</GlobalPlayerLayout>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
