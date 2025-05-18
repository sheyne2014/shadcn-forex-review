import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { supabaseBrokerClient } from '@/lib/supabase/broker-client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  
  // Main static pages
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: `${baseUrl}/brokers`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/best-brokers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    },
    {
      url: `${baseUrl}/find-my-broker`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3
    }
  ];
  
  // Get all broker data for dynamic routes
  const { data: brokers } = await supabaseBrokerClient
    .from('brokers')
    .select('id, created_at, updated_at')
    .order('updated_at', { ascending: false });
    
  // Get all categories for dynamic routes
  const { data: categories } = await supabaseBrokerClient
    .from('categories')
    .select('id');
  
  // Create dynamic broker routes
  const brokerRoutes = brokers?.map(broker => ({
    url: `${baseUrl}/broker/${broker.id}`,
    lastModified: new Date(broker.updated_at || broker.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  })) || [];
  
  // Create dynamic category routes
  const categoryPaths = [
    'forex', 'stocks', 'crypto', 'cfd', 'options', 'futures', 
    'etf', 'commodities', 'beginners', 'advanced', 'professional', 
    'low-spread', 'high-leverage', 'mobile', 'copy-trading'
  ];

  const categoryRoutes = categoryPaths.map(category => ({
    url: `${baseUrl}/best-brokers/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));
  
  // Create dynamic country routes
  const countryPaths = [
    'uk', 'us', 'australia', 'canada', 'singapore', 
    'india', 'europe', 'asia'
  ];
  
  const countryRoutes = countryPaths.map(country => ({
    url: `${baseUrl}/best-brokers/${country}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));
  
  // Create comparison routes for top brokers (combinations of top 5 brokers)
  const comparisonRoutes = [];
  if (brokers && brokers.length > 1) {
    const topBrokers = brokers.slice(0, 10); // Use top 10 brokers for combinations
    
    for (let i = 0; i < topBrokers.length; i++) {
      for (let j = i + 1; j < topBrokers.length; j++) {
        comparisonRoutes.push({
          url: `${baseUrl}/compare/${topBrokers[i].id}-vs-${topBrokers[j].id}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7
        });
      }
    }
  }
  
  // Get blog posts if they exist
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: blogPosts } = await supabaseBrokerClient
      .from('blog_posts')
      .select('slug, created_at, updated_at')
      .order('updated_at', { ascending: false });
      
    blogRoutes = blogPosts?.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6
    })) || [];
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }
  
  // Combine all routes
  return [
    ...staticRoutes,
    ...brokerRoutes,
    ...categoryRoutes,
    ...countryRoutes,
    ...comparisonRoutes,
    ...blogRoutes
  ];
}
