/**
 * Script to check if a blog post exists in the Supabase database
 * Run with: node --experimental-json-modules src/scripts/check-blog-post.js <slug>
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Supabase URL or Service Role Key not found in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function to check all blog posts
async function listAllBlogPosts() {
  try {
    console.log('Fetching all blog posts from database...');
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*');
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      process.exit(1);
    }
    
    console.log(`Found ${data.length} blog posts:`);
    
    // Display all blog posts with their slugs
    data.forEach((post, index) => {
      console.log(`\n--- Blog Post ${index + 1} ---`);
      console.log('ID:', post.id);
      console.log('Title:', post.title);
      console.log('Slug:', post.slug);
      console.log('Created at:', post.created_at);
    });
    
    // Check for blog post with title containing "Forex Trading Goals"
    const goalsBlogPost = data.find(post => post.title.includes('Forex Trading Goals'));
    
    if (goalsBlogPost) {
      console.log('\n✅ Found blog post with "Forex Trading Goals" in title:');
      console.log('Title:', goalsBlogPost.title);
      console.log('ID:', goalsBlogPost.id);
      console.log('Slug:', goalsBlogPost.slug);
    } else {
      console.log('\n❌ No blog post found with "Forex Trading Goals" in title');
    }
    
  } catch (error) {
    console.error('Error in script:', error);
    process.exit(1);
  }
}

// Function to check a specific blog post by slug
async function checkBlogPostBySlug(slug) {
  try {
    console.log(`Checking blog post with slug: ${slug}`);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log(`❌ No blog post found with slug: ${slug}`);
        
        // Try to find posts with similar slugs
        const { data: similarPosts } = await supabase
          .from('blog_posts')
          .select('slug, title')
          .ilike('slug', `%${slug.split('-').join('%')}%`);
        
        if (similarPosts && similarPosts.length > 0) {
          console.log('\nFound posts with similar slugs:');
          similarPosts.forEach(post => {
            console.log(`- ${post.slug} (${post.title})`);
          });
        }
      } else {
        console.error('Error checking blog post:', error);
      }
      return;
    }
    
    console.log('✅ Blog post found:');
    console.log('Title:', data.title);
    console.log('Slug:', data.slug);
    console.log('ID:', data.id);
    console.log('Created at:', data.created_at);
    
  } catch (error) {
    console.error('Error in script:', error);
    process.exit(1);
  }
}

// Get slug from command line arguments
const args = process.argv.slice(2);
const slug = args[0];

// If slug provided, check specific post, otherwise list all posts
if (slug) {
  checkBlogPostBySlug(slug);
} else {
  listAllBlogPosts();
} 