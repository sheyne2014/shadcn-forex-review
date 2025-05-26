import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Enhanced robots.txt configuration for optimal SEO crawling
 * Optimized for 2025 search engine requirements and Core Web Vitals
 *
 * @returns Robots MetadataRoute object
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      // Main crawling rules for all search engines
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",           // Don't index API routes
          "/admin/",         // Don't index admin pages
          "/_next/",         // Don't index Next.js system files
          "/auth/",          // Don't index authentication pages
          "/login/",         // Don't index login page
          "/register/",      // Don't index registration page
          "/signup/",        // Don't index signup page
          "/account/",       // Don't index user account pages
          "/dashboard/",     // Don't index user dashboard
          "/email-verify/",  // Don't index email verification pages
          "/unauthorized/",  // Don't index unauthorized page
          "/*/draft/",       // Don't index draft pages
          "/*/preview/",     // Don't index preview pages
          "/test-*",         // Don't index test pages
          "/*.json$",        // Don't index JSON files
          "/*.xml$",         // Don't index XML files except sitemap
          "/search?*",       // Don't index search result pages
          "/*?*sort=*",      // Don't index sorted pages
          "/*?*filter=*",    // Don't index filtered pages
          "/*?*page=*",      // Don't index paginated pages
        ],
        crawlDelay: 1, // Be respectful to server resources
      },
      // Special rules for Google Bot (more permissive)
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/auth/",
          "/dashboard/",
          "/unauthorized/",
          "/*/draft/",
          "/*/preview/",
          "/test-*",
        ],
        crawlDelay: 0.5, // Faster crawling for Google
      },
      // Special rules for Bing Bot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/auth/",
          "/dashboard/",
          "/unauthorized/",
          "/*/draft/",
          "/*/preview/",
          "/test-*",
        ],
        crawlDelay: 1,
      },
      // Block aggressive crawlers that might impact performance
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "BLEXBot"
        ],
        disallow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
