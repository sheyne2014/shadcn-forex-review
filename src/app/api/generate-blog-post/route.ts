import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/env';
import { webSearch, searchTrendingTopics } from '@/lib/web-search';
import { generateBlogContent } from '@/lib/blog-generator';
import { getBrokers } from '@/lib/supabase/broker-client';
import { selectContentType, CONTENT_TYPES } from '@/lib/content-types';

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Authenticate the request
    const authHeader = request.headers.get('authorization');
    const secretToken = request.headers.get('x-secret-token');

    if (secretToken !== process.env.BLOG_AUTOMATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🚀 Starting automated blog post generation...');

    // Step 1: Select content type (broker review vs general financial topic)
    const selectedContentType = selectContentType();
    console.log(`📝 Selected content type: ${selectedContentType.name} (${selectedContentType.category})`);

    let selectedBroker = undefined;
    let searchQuery = '';
    let targetKeywords: string[] = [];

    if (selectedContentType.category === 'brokers') {
      // Step 2a: Broker-focused content
      const { data: brokers, error: brokerError } = await getBrokers({
        limit: 100,
        sort_by: 'rating',
        sort_order: 'desc'
      });

      if (brokerError || !brokers || brokers.length === 0) {
        throw new Error('Failed to fetch brokers from database');
      }

      // Select a random broker, weighted towards higher-rated ones
      const weightedBrokers = brokers.slice(0, 20); // Top 20 brokers
      selectedBroker = weightedBrokers[Math.floor(Math.random() * weightedBrokers.length)];

      console.log(`📊 Selected broker: ${selectedBroker.name}`);

      // Broker-specific search queries
      const brokerSearchQueries = [
        `"${selectedBroker.name}" review 2025`,
        `${selectedBroker.name} trading platform features`,
        `${selectedBroker.name} fees and spreads`,
        `${selectedBroker.name} vs competitors`,
        `is ${selectedBroker.name} safe and regulated`
      ];

      searchQuery = brokerSearchQueries[Math.floor(Math.random() * brokerSearchQueries.length)];
      targetKeywords = [
        `${selectedBroker.name.toLowerCase()} review`,
        `${selectedBroker.name.toLowerCase()} broker`,
        'forex broker review',
        'trading platform review'
      ];
    } else {
      // Step 2b: General financial topic content
      console.log(`📈 Generating ${selectedContentType.category} content`);

      // Get trending topics for the category
      const trendingTopics = await searchTrendingTopics(selectedContentType.category);
      const randomTopic = trendingTopics[Math.floor(Math.random() * Math.min(trendingTopics.length, 5))];

      searchQuery = randomTopic;
      targetKeywords = selectedContentType.keywords;

      console.log(`🔍 Selected topic: ${randomTopic}`);
    }

    console.log(`🔍 Searching for: ${searchQuery}`);

    // Step 3: Generate blog content using Context7 and web search
    const blogData = await generateBlogContent({
      broker: selectedBroker,
      contentType: selectedContentType,
      searchQuery,
      targetKeywords,
      category: selectedContentType.category
    });

    // Step 4: Create slug and validate content
    const slug = blogData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 60);

    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingPost) {
      // Add timestamp to make unique
      const timestamp = Date.now().toString().slice(-4);
      blogData.slug = `${slug}-${timestamp}`;
    } else {
      blogData.slug = slug;
    }

    // Step 5: Insert into database
    const { data: insertedPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert([{
        title: blogData.title,
        slug: blogData.slug,
        content: blogData.content,
        excerpt: blogData.excerpt,
        published_at: new Date().toISOString(),
        reading_time: blogData.readingTime,
        tags: JSON.stringify(blogData.tags),
        image_url: blogData.featuredImage,
        seo_title: blogData.seoTitle,
        seo_description: blogData.seoDescription,
        author_id: null, // Automated posts
        published: true
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Database insertion error:', insertError);
      throw new Error(`Failed to insert blog post: ${insertError.message}`);
    }

    console.log('✅ Blog post created successfully!');
    console.log(`📝 Title: ${blogData.title}`);
    console.log(`🔗 Slug: ${blogData.slug}`);
    console.log(`📊 Reading time: ${blogData.readingTime} minutes`);

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      data: {
        id: insertedPost.id,
        title: blogData.title,
        slug: blogData.slug,
        contentType: selectedContentType.name,
        category: selectedContentType.category,
        broker: selectedBroker?.name || null,
        readingTime: blogData.readingTime,
        url: `/blog/${blogData.slug}`
      }
    });

  } catch (error) {
    console.error('❌ Blog generation failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate blog post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
