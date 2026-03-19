import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalPlayerLayout } from "../components/GlobalPlayerLayout";
import { SiteConfigProvider } from "../components/SiteConfigProvider";
import { getServerSiteConfig } from "../lib/site-config";

// 强制动态渲染：所有页面在每次请求时重新渲染。
// 必须设置，否则 getServerSiteConfig() 内的 try/catch 会吞掉 Next.js 的
// DYNAMIC_SERVER_USAGE 信号，导致构建期用单一品牌(TAMG)静态预渲染所有页面，
// 访问 aimusicfactory.com 时也只能拿到预烘焙的 TAMG HTML。
export const dynamic = "force-dynamic";

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
