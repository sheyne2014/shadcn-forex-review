/**
 * Script to fix the slug for a blog post
 * Run with: node --experimental-json-modules src/scripts/fix-blog-post-slug.js
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

// Function to update the slug for a specific blog post
async function fixBlogPostSlug() {
  try {
    const postTitle = "Setting Effective Forex Trading Goals in 2025: A Strategic Approach";
    const targetSlug = "forex-trading-goals-in-2025";
    
    console.log(`Looking for blog post with title: "${postTitle}"`);
    
    // First, find the post with the title
    const { data: posts, error: findError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('title', postTitle);
    
    if (findError) {
      console.error('Error finding blog post:', findError);
      process.exit(1);
    }
    
    if (!posts || posts.length === 0) {
      console.error('No blog post found with the specified title');
      process.exit(1);
    }
    
    const post = posts[0];
    console.log('Found blog post:');
    console.log('ID:', post.id);
    console.log('Title:', post.title);
    console.log('Current slug:', post.slug || 'null');
    
    // Update the slug
    const { data: updatedPost, error: updateError } = await supabase
      .from('blog_posts')
      .update({ slug: targetSlug })
      .eq('id', post.id)
      .select();
    
    if (updateError) {
      console.error('Error updating blog post slug:', updateError);
      process.exit(1);
    }
    
    console.log('✅ Successfully updated blog post slug:');
    console.log('ID:', updatedPost[0].id);
    console.log('Title:', updatedPost[0].title);
    console.log('New slug:', updatedPost[0].slug);
    
  } catch (error) {
    console.error('Error in script:', error);
    process.exit(1);
  }
}

// Run the script
fixBlogPostSlug().catch(error => {
  console.error('Error in script execution:', error);
  process.exit(1);
}); 