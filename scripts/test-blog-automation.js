#!/usr/bin/env node

/**
 * Blog Automation Testing Script
 *
 * This script allows you to test the blog automation system manually
 * and monitor its performance.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Test the blog generation API endpoint
 */
async function testBlogGeneration() {
  console.log('🧪 Testing blog generation API...\n');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/generate-blog-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-token': process.env.BLOG_AUTOMATION_SECRET
      }
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Blog generation successful!');
      console.log(`📝 Title: ${data.data.title}`);
      console.log(`🔗 Slug: ${data.data.slug}`);
      console.log(`📊 Reading time: ${data.data.readingTime} minutes`);
      console.log(`📂 Content Type: ${data.data.contentType}`);
      console.log(`🏷️ Category: ${data.data.category}`);
      console.log(`🏢 Broker: ${data.data.broker || 'General Topic'}`);
      console.log(`🌐 URL: ${data.data.url}`);
    } else {
      console.log('❌ Blog generation failed:');
      console.log(`Error: ${data.error}`);
      if (data.details) {
        console.log(`Details: ${data.details}`);
      }
    }
  } catch (error) {
    console.error('❌ Failed to test blog generation:', error.message);
  }
}

/**
 * Check environment variables
 */
function checkEnvironment() {
  console.log('🔍 Checking environment variables...\n');

  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'BLOG_AUTOMATION_SECRET'
  ];

  const optional = [
    'CONTEXT7_API_KEY',
    'OPENAI_API_KEY',
    'ANTHROPIC_API_KEY',
    'GOOGLE_SEARCH_API_KEY',
    'GOOGLE_SEARCH_ENGINE_ID',
    'BING_SEARCH_API_KEY',
    'UNSPLASH_ACCESS_KEY',
    'PEXELS_API_KEY'
  ];

  let allGood = true;

  console.log('Required variables:');
  required.forEach(key => {
    const exists = !!process.env[key];
    console.log(`  ${exists ? '✅' : '❌'} ${key}: ${exists ? 'Set' : 'Missing'}`);
    if (!exists) allGood = false;
  });

  console.log('\nOptional variables:');
  optional.forEach(key => {
    const exists = !!process.env[key];
    console.log(`  ${exists ? '✅' : '⚠️'} ${key}: ${exists ? 'Set' : 'Not set'}`);
  });

  // Check if at least one AI API is available
  const aiApis = ['CONTEXT7_API_KEY', 'OPENAI_API_KEY', 'ANTHROPIC_API_KEY'];
  const hasAI = aiApis.some(key => process.env[key]);

  console.log(`\n🤖 AI API availability: ${hasAI ? '✅ At least one AI API configured' : '❌ No AI APIs configured'}`);

  // Check if at least one search API is available
  const searchApis = ['GOOGLE_SEARCH_API_KEY', 'BING_SEARCH_API_KEY'];
  const hasSearch = searchApis.some(key => process.env[key]);

  console.log(`🔍 Search API availability: ${hasSearch ? '✅ At least one search API configured' : '⚠️ No search APIs configured (will use fallback)'}`);

  return allGood && hasAI;
}

/**
 * Check database connectivity and blog_posts table
 */
async function checkDatabase() {
  console.log('🗄️ Checking database connectivity...\n');

  try {
    // Test connection
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count(*)')
      .limit(1);

    if (error) {
      console.log('❌ Database connection failed:');
      console.log(`Error: ${error.message}`);
      return false;
    }

    console.log('✅ Database connection successful');

    // Check table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);

    if (tableError) {
      console.log('❌ Failed to query blog_posts table:');
      console.log(`Error: ${tableError.message}`);
      return false;
    }

    console.log('✅ blog_posts table accessible');

    // Count existing posts
    const { count, error: countError } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`📊 Current blog posts in database: ${count}`);
    }

    return true;
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    return false;
  }
}

/**
 * Check broker data availability
 */
async function checkBrokerData() {
  console.log('🏢 Checking broker data...\n');

  try {
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('id, name, rating')
      .order('rating', { ascending: false })
      .limit(10);

    if (error) {
      console.log('❌ Failed to fetch broker data:');
      console.log(`Error: ${error.message}`);
      return false;
    }

    if (!brokers || brokers.length === 0) {
      console.log('⚠️ No brokers found in database');
      return false;
    }

    console.log(`✅ Found ${brokers.length} brokers (showing top 10):`);
    brokers.forEach((broker, index) => {
      console.log(`  ${index + 1}. ${broker.name} (Rating: ${broker.rating || 'N/A'})`);
    });

    return true;
  } catch (error) {
    console.error('❌ Broker data check failed:', error.message);
    return false;
  }
}

/**
 * Show recent blog posts
 */
async function showRecentPosts() {
  console.log('📰 Recent blog posts...\n');

  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('title, slug, published_at, reading_time')
      .order('published_at', { ascending: false })
      .limit(5);

    if (error) {
      console.log('❌ Failed to fetch recent posts:');
      console.log(`Error: ${error.message}`);
      return;
    }

    if (!posts || posts.length === 0) {
      console.log('📭 No blog posts found');
      return;
    }

    console.log('Recent posts:');
    posts.forEach((post, index) => {
      const date = post.published_at ? new Date(post.published_at).toLocaleDateString() : 'No date';
      console.log(`  ${index + 1}. ${post.title}`);
      console.log(`     Slug: ${post.slug}`);
      console.log(`     Published: ${date}`);
      console.log(`     Reading time: ${post.reading_time || 'N/A'} minutes\n`);
    });
  } catch (error) {
    console.error('❌ Failed to show recent posts:', error.message);
  }
}

/**
 * Main test function
 */
async function runTests() {
  console.log('🚀 Blog Automation System Test\n');
  console.log('=' .repeat(50) + '\n');

  // Check environment
  const envOk = checkEnvironment();
  console.log('\n' + '=' .repeat(50) + '\n');

  // Check database
  const dbOk = await checkDatabase();
  console.log('\n' + '=' .repeat(50) + '\n');

  // Check broker data
  const brokerOk = await checkBrokerData();
  console.log('\n' + '=' .repeat(50) + '\n');

  // Show recent posts
  await showRecentPosts();
  console.log('=' .repeat(50) + '\n');

  // Overall status
  if (envOk && dbOk && brokerOk) {
    console.log('✅ All checks passed! System ready for blog automation.');

    // Ask if user wants to test generation
    const args = process.argv.slice(2);
    if (args.includes('--generate') || args.includes('-g')) {
      console.log('\n' + '=' .repeat(50) + '\n');
      await testBlogGeneration();
    } else {
      console.log('\n💡 Run with --generate or -g flag to test blog generation');
    }
  } else {
    console.log('❌ Some checks failed. Please fix the issues before using blog automation.');
  }

  console.log('\n🏁 Test completed.');
}

// Run tests
runTests().catch(console.error);
