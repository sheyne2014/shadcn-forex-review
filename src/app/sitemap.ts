import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  // Main pages
  const routes = [
    '',
    '/tools/compare',
    '/brokers',
    '/blog',
    '/about',
    '/contact',
    '/faq',
    '/terms',
    '/privacy',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  // Add dynamic routes here when you have them
  // For example, blog posts, broker pages, etc.
  
  return routes;
}
