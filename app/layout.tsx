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
    default: "The AI Music Generator | Create Royalty-Free Music with AI",
    template: "%s | The AI Music Generator",
  },
  description:
    "Turn text into songs and instrumentals in seconds. Free AI music generator and lyrics tool for creators.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The AI Music Generator",
    title: "The AI Music Generator | Create Royalty-Free Music with AI",
    description:
      "Turn text into songs and instrumentals in seconds. Free AI music generator and lyrics tool for creators.",
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
    title: "The AI Music Generator | Create Royalty-Free Music with AI",
    description:
      "Turn text into songs and instrumentals in seconds. Free AI music generator and lyrics tool for creators.",
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
