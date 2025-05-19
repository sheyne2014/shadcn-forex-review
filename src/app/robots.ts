import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Generate robots.txt rules for search engines
 * This controls which parts of the site search engines can access
 * 
 * @returns Robots MetadataRoute object
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",         // Don't index API routes
        "/admin/",       // Don't index admin pages
        "/_next/",       // Don't index Next.js system files
        "/login/",       // Don't index login page
        "/register/",    // Don't index registration page
        "/account/",     // Don't index user account pages
        "/email-verify/",// Don't index email verification pages
        "/*/draft/",     // Don't index draft pages
        "/*/preview/",   // Don't index preview pages
        "/*.json$",      // Don't index JSON files
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
