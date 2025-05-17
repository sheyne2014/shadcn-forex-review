import { db } from '@/lib/database';
import { 
  Broker, BrokerInsert, 
  Category, CategoryInsert, 
  Review, ReviewInsert, 
  BlogPost, BlogPostInsert,
  Tool, ToolInsert,
  User, UserInsert
} from '@/lib/database-types';
import { createClient } from '@/lib/supabase/client';

// Import types here but use dynamic imports later to avoid errors if packages aren't installed
import type { ModelContextProtocol } from '@modelcontextprotocol/sdk';
import type { SmitherySDK } from '@smithery/sdk';

// Main seed function
async function seed() {
  console.log('Starting database seeding...');
  
  try {
    // Dynamically import and initialize MCP
    const MCP_API_KEY = process.env.MCP_API_KEY || '3a9b6664-86d8-4fe0-8a95-c55c80e1bcb1';
    
    const { default: ModelContextProtocol } = await import('@modelcontextprotocol/sdk');
    const { initialize } = await import('@smithery/sdk');
    
    const mcp = new ModelContextProtocol({
      apiKey: MCP_API_KEY,
      servers: {
        context7: {
          command: 'npx',
          args: ['-y', '@upstash/context7-mcp@latest']
        },
        yfinanceMCP: {
          command: 'docker',
          args: ['run', '-i', '--rm', 'narumi/yfinance-mcp']
        },
        puppeteer: {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-puppeteer']
        }
      }
    });
    
    // Initialize Smithery
    const smithery = initialize({ apiKey: MCP_API_KEY });
    
    // Create users first
    const users = await seedUsers();
    console.log(`✅ Created ${users.length} users`);
    
    // Create categories
    const categories = await seedCategories();
    console.log(`✅ Created ${categories.length} categories`);
    
    // Create brokers
    const brokers = await seedBrokers(categories, mcp);
    console.log(`✅ Created ${brokers.length} brokers`);
    
    // Create reviews
    const reviews = await seedReviews(brokers, users[0].id, mcp);
    console.log(`✅ Created ${reviews.length} reviews`);
    
    // Create blog posts
    const blogPosts = await seedBlogPosts(users[1].id, mcp);
    console.log(`✅ Created ${blogPosts.length} blog posts`);
    
    // Create tools
    const tools = await seedTools(mcp);
    console.log(`✅ Created ${tools.length} tools`);
    
    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Seed users
async function seedUsers() {
  const users: UserInsert[] = [
    {
      email: 'reviewer@example.com',
      password_hash: 'placeholder_hash', // In a real app, use proper password hashing
      created_at: new Date().toISOString(),
      is_admin: false
    },
    {
      email: 'blogger@example.com',
      password_hash: 'placeholder_hash', // In a real app, use proper password hashing
      created_at: new Date().toISOString(),
      is_admin: true
    }
  ];
  
  // Use the Supabase client directly for batch insert
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .insert(users)
    .select();
    
  if (error) throw error;
  return data || [];
}

// Seed categories
async function seedCategories() {
  const categoriesData = [
    { name: 'ECN Brokers' },
    { name: 'Market Maker Brokers' },
    { name: 'Brokers for Beginners' },
    { name: 'Low Spread Brokers' },
    { name: 'High Leverage Brokers' },
    { name: 'Cryptocurrency Brokers' },
    { name: 'Regulated Brokers' },
    { name: 'MT4/MT5 Brokers' }
  ];
  
  const results = [];
  
  for (const categoryData of categoriesData) {
    const result = await db.categories.create(categoryData);
    results.push(result);
  }
  
  return results;
}

// Seed brokers
async function seedBrokers(categories: Category[], mcp: any) {
  // Define broker information (we'll use a combination of real data and generated info)
  const brokerBaseInfo = [
    {
      name: 'Pepperstone',
      website: 'https://pepperstone.com',
      founded: 2010,
      headquarters: 'Melbourne, Australia',
      regulation: 'ASIC, FCA',
      baseRating: 4.7
    },
    {
      name: 'IC Markets',
      website: 'https://icmarkets.com',
      founded: 2007,
      headquarters: 'Sydney, Australia',
      regulation: 'ASIC, CySEC, FSA',
      baseRating: 4.6
    },
    {
      name: 'XM',
      website: 'https://xm.com',
      founded: 2009,
      headquarters: 'Limassol, Cyprus',
      regulation: 'CySEC, ASIC, IFSC',
      baseRating: 4.5
    },
    {
      name: 'eToro',
      website: 'https://etoro.com',
      founded: 2007,
      headquarters: 'Tel Aviv, Israel',
      regulation: 'FCA, CySEC, ASIC',
      baseRating: 4.4
    },
    {
      name: 'AvaTrade',
      website: 'https://avatrade.com',
      founded: 2006,
      headquarters: 'Dublin, Ireland',
      regulation: 'Central Bank of Ireland, ASIC, FSA',
      baseRating: 4.3
    }
  ];
  
  // Initialize context7 MCP
  let context7MCP;
  try {
    context7MCP = await mcp.create('context7');
  } catch (error) {
    console.warn('Warning: Could not initialize context7 MCP. Using static data instead.');
    context7MCP = null;
  }
  
  const enrichedBrokers = [];
  
  for (const broker of brokerBaseInfo) {
    let description = `${broker.name} is a forex broker founded in ${broker.founded} and headquartered in ${broker.headquarters}. They are regulated by ${broker.regulation}.`;
    let features = ['Competitive spreads', 'Multiple trading platforms', '24/7 customer support'];
    let platforms = ['MetaTrader 4', 'MetaTrader 5', 'cTrader'];
    
    // If context7 is available, use it to enrich the data
    if (context7MCP) {
      try {
        const descResult = await context7MCP.tool.generateBrokerDescription({
          brokerName: broker.name,
          founded: broker.founded,
          headquarters: broker.headquarters,
          regulation: broker.regulation
        });
        
        if (descResult && descResult.description) {
          description = descResult.description;
        }
        
        const featuresResult = await context7MCP.tool.generateBrokerFeatures({
          brokerName: broker.name
        });
        
        if (featuresResult && featuresResult.features) {
          features = featuresResult.features;
        }
        
        const platformsResult = await context7MCP.tool.generateTradingPlatforms({
          brokerName: broker.name
        });
        
        if (platformsResult && platformsResult.platforms) {
          platforms = platformsResult.platforms;
        }
      } catch (error) {
        console.warn(`Warning: Error using context7 for ${broker.name}. Using static data.`);
      }
    }
    
    // Create broker entry
    const brokerData: BrokerInsert = {
      name: broker.name,
      description,
      website: broker.website,
      founded: broker.founded.toString(),
      headquarters: broker.headquarters,
      regulation: broker.regulation,
      trading_platforms: platforms,
      features: features,
      min_deposit: Math.floor(Math.random() * 200) + 50,
      rating: broker.baseRating,
      logo_url: `https://example.com/logos/${broker.name.toLowerCase().replace(/\s+/g, '-')}.png`
    };
    
    enrichedBrokers.push(brokerData);
  }
  
  // Insert brokers into database
  const results = [];
  for (const broker of enrichedBrokers) {
    const result = await db.brokers.create(broker);
    
    // Assign each broker to 2-3 random categories
    const shuffledCategories = [...categories].sort(() => 0.5 - Math.random());
    const categoryCount = Math.floor(Math.random() * 2) + 2; // 2-3 categories
    
    for (let i = 0; i < categoryCount && i < shuffledCategories.length; i++) {
      await db.brokerCategories.add(result.id, shuffledCategories[i].id);
    }
    
    results.push(result);
  }
  
  return results;
}

// Seed reviews
async function seedReviews(brokers: Broker[], userId: string, mcp: any) {
  let context7MCP;
  try {
    context7MCP = await mcp.create('context7');
  } catch (error) {
    console.warn('Warning: Could not initialize context7 MCP. Using static data instead.');
    context7MCP = null;
  }
  
  const reviews = [];
  
  for (const broker of brokers) {
    // Generate 5-10 reviews per broker
    const reviewCount = Math.floor(Math.random() * 6) + 5;
    
    for (let i = 0; i < reviewCount; i++) {
      // Create a rating that varies around the broker's base rating
      const rating = Math.min(5, Math.max(3, broker.rating + (Math.random() * 1 - 0.5)));
      
      // Generate review content
      let reviewContent = `The ${broker.name} platform is very user-friendly. Their customer service is ${rating > 4 ? 'excellent' : rating > 3 ? 'good' : 'average'}.`;
      
      if (context7MCP) {
        try {
          const result = await context7MCP.tool.generateBrokerReview({
            brokerName: broker.name,
            rating: rating,
            brokerFeatures: broker.features,
            sentiment: rating >= 4 ? 'positive' : rating >= 3 ? 'mixed' : 'negative'
          });
          
          if (result && result.review) {
            reviewContent = result.review;
          }
        } catch (error) {
          console.warn(`Warning: Error using context7 for ${broker.name} review. Using static data.`);
        }
      }
      
      // Create review with a date in the past year
      const reviewDate = new Date();
      reviewDate.setDate(reviewDate.getDate() - Math.floor(Math.random() * 365));
      
      const reviewData: ReviewInsert = {
        broker_id: broker.id,
        user_id: userId,
        rating: rating,
        content: reviewContent,
        created_at: reviewDate.toISOString()
      };
      
      // Insert review
      const result = await db.reviews.create(reviewData);
      reviews.push(result);
    }
  }
  
  return reviews;
}

// Seed blog posts
async function seedBlogPosts(authorId: string, mcp: any) {
  let context7MCP;
  try {
    context7MCP = await mcp.create('context7');
  } catch (error) {
    console.warn('Warning: Could not initialize context7 MCP. Using static data instead.');
    context7MCP = null;
  }
  
  // Define blog post topics and keywords
  const blogTopics = [
    { title: 'AI in Forex Trading: The Ultimate Guide for 2025', keywords: ['AI', 'forex trading', 'machine learning', 'algorithmic trading'] },
    { title: 'Best Forex Brokers for Beginners in 2025', keywords: ['forex brokers', 'beginners', 'trading platform', 'low spread'] },
    { title: 'How to Choose the Right ECN Broker', keywords: ['ECN broker', 'forex trading', 'direct market access', 'low commission'] },
    { title: 'Understanding Leverage in Forex Trading', keywords: ['leverage', 'risk management', 'margin', 'forex trading'] },
    { title: 'Top 10 Trading Strategies for Volatile Markets', keywords: ['trading strategies', 'volatility', 'risk management', 'technical analysis'] }
  ];
  
  const blogPosts = [];
  
  for (const topic of blogTopics) {
    // Basic content structure to use if context7 is not available
    let content = `
# ${topic.title}

## Table of Contents
- Introduction
- Key Points
- Best Practices
- Conclusion

## Introduction
This is an introductory guide to ${topic.keywords.join(', ')}.

## Key Points
Here are the key points about ${topic.keywords[0]}.

## Best Practices
Follow these best practices for success.

## Conclusion
In conclusion, ${topic.keywords[0]} is an important topic in forex trading.

## FAQ
- Q: What is ${topic.keywords[0]}?
- A: It is a key concept in forex trading.
`;
    
    let seoMetadata = {
      description: `Learn all about ${topic.keywords.join(', ')} in this comprehensive guide.`
    };
    
    // If context7 is available, generate a richer blog post
    if (context7MCP) {
      try {
        const result = await context7MCP.tool.generateBlogPost({
          title: topic.title,
          keywords: topic.keywords,
          wordCount: 1500,
          includeFAQ: true,
          includeTableOfContents: true
        });
        
        if (result && result.content) {
          content = result.content;
        }
        
        if (result && result.seoMetadata) {
          seoMetadata = result.seoMetadata;
        }
      } catch (error) {
        console.warn(`Warning: Error using context7 for blog post "${topic.title}". Using static content.`);
      }
    }
    
    // Calculate reading time (average reading speed: 225 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 225);
    
    const blogPost: BlogPostInsert = {
      title: topic.title,
      slug: topic.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
      content: content,
      excerpt: content.substring(0, 150) + '...',
      author_id: authorId,
      published: true,
      published_at: new Date().toISOString(),
      reading_time: readingTime,
      seo_title: topic.title,
      seo_description: seoMetadata.description || content.substring(0, 160),
      featured_image: `https://example.com/blog-images/${topic.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}.jpg`,
      tags: topic.keywords
    };
    
    // Insert blog post
    try {
      const result = await createBlogPost(blogPost);
      blogPosts.push(result);
    } catch (error) {
      console.error(`Error creating blog post "${topic.title}":`, error);
    }
  }
  
  return blogPosts;
}

// Helper function to create blog posts (since full database API may not be available)
async function createBlogPost(blogPost: BlogPostInsert) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(blogPost)
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

// Seed trading tools
async function seedTools(mcp: any) {
  let context7MCP;
  let yfinanceMCP;
  
  try {
    context7MCP = await mcp.create('context7');
  } catch (error) {
    console.warn('Warning: Could not initialize context7 MCP. Using static data instead.');
    context7MCP = null;
  }
  
  try {
    yfinanceMCP = await mcp.create('yfinanceMCP');
  } catch (error) {
    console.warn('Warning: Could not initialize yfinanceMCP. Using static data instead.');
    yfinanceMCP = null;
  }
  
  const toolsInfo = [
    {
      name: 'MetaTrader 4',
      url: 'https://www.metatrader4.com',
      category: 'Platform'
    },
    {
      name: 'MetaTrader 5',
      url: 'https://www.metatrader5.com',
      category: 'Platform'
    },
    {
      name: 'TradingView',
      url: 'https://www.tradingview.com',
      category: 'Charts'
    },
    {
      name: 'Forex Factory Calendar',
      url: 'https://www.forexfactory.com/calendar',
      category: 'News'
    },
    {
      name: 'Currency Strength Meter',
      url: 'https://www.myfxbook.com/forex-market/currency-strength',
      category: 'Analysis'
    }
  ];
  
  const tools = [];
  
  for (const toolInfo of toolsInfo) {
    // Default description
    let description = `${toolInfo.name} is a popular ${toolInfo.category.toLowerCase()} tool for forex trading.`;
    let marketContext = '';
    
    // If context7 is available, get a detailed description
    if (context7MCP) {
      try {
        const result = await context7MCP.tool.generateToolDescription({
          toolName: toolInfo.name,
          category: toolInfo.category
        });
        
        if (result && result.description) {
          description = result.description;
        }
      } catch (error) {
        console.warn(`Warning: Error using context7 for tool "${toolInfo.name}". Using static description.`);
      }
    }
    
    // If yfinanceMCP is available and it's a market-related tool, add market context
    if (yfinanceMCP && (toolInfo.category === 'Charts' || toolInfo.category === 'Analysis')) {
      try {
        const marketData = await yfinanceMCP.tool.getMarketSummary();
        if (marketData && marketData.summary) {
          marketContext = `Current market conditions: ${marketData.summary}`;
        }
      } catch (error) {
        console.warn(`Warning: Error getting market data for "${toolInfo.name}". Skipping market context.`);
      }
    }
    
    const toolData: ToolInsert = {
      name: toolInfo.name,
      description: description + (marketContext ? `\n\n${marketContext}` : ''),
      url: toolInfo.url,
      category: toolInfo.category,
      featured: Math.random() > 0.5
    };
    
    // Insert tool
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tools')
      .insert(toolData)
      .select()
      .single();
      
    if (error) throw error;
    tools.push(data);
  }
  
  return tools;
}

// Run the seed function
seed()
  .then(() => {
    console.log('Database seeding completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  }); 