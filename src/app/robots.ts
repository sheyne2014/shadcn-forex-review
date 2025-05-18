import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/auth/',
          '/unauthorized/',
          '/verify/',
          '/_next/',
          '/script*',
          '/test-page/',
          '/*.json$',
          '/*.xml$'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/auth/',
          '/unauthorized/',
          '/verify/',
          '/_next/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/auth/',
          '/unauthorized/',
          '/verify/',
          '/_next/',
        ],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/auth/',
          '/unauthorized/',
          '/verify/',
          '/_next/',
        ],
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
