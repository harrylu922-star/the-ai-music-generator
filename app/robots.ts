import type { MetadataRoute } from "next";
import { getServerSiteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getServerSiteConfig();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}
