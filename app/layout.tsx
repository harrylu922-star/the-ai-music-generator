import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalPlayerLayout } from "../components/GlobalPlayerLayout";
import { SiteConfigProvider } from "../components/SiteConfigProvider";
import { getServerSiteConfig } from "../lib/site-config";

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
