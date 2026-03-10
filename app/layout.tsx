import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalPlayerLayout } from "../components/GlobalPlayerLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theaimusicgenerator.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free AI Music Generator | Royalty-Free Songs in Seconds",
    template: "%s | The AI Music Generator",
  },
  description:
    "Create royalty-free music from text in seconds. Free AI music generator and lyrics tool for creators, filmmakers & YouTubers. No copyright strikes—try now.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The AI Music Generator",
    title: "Free AI Music Generator | Royalty-Free Songs in Seconds",
    description:
      "Create royalty-free music from text in seconds. Free AI music & lyrics tools for creators. No copyright strikes—try now.",
    images: [
      {
        url: "/images/home/hero-card-ai-music-generator.jpg",
        width: 1200,
        height: 630,
        alt: "The AI Music Generator – Create royalty-free music with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Music Generator | Royalty-Free Songs in Seconds",
    description:
      "Create royalty-free music from text in seconds. Free AI music & lyrics for creators. No copyright strikes—try now.",
    images: ["/images/home/hero-card-ai-music-generator.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalPlayerLayout>{children}</GlobalPlayerLayout>
      </body>
    </html>
  );
}
