/**
 * Script to update missing fields in a blog post
 * Run with: node --experimental-json-modules src/scripts/update-blog-post-fields.js <slug>
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

// Function to update blog post fields
async function updateBlogPostFields(slug) {
  try {
    console.log(`Updating blog post with slug: ${slug}`);
    
    // First, get the blog post data
    const { data: post, error: getError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (getError) {
      console.error('Error fetching blog post:', getError);
      return;
    }
    
    console.log('Found blog post:', post.title);
    
    // Prepare the update data
    const updateData = {
      excerpt: post.excerpt || "Learn how to establish meaningful forex trading goals that drive success, balancing ambition with realism across multiple time horizons while focusing on process excellence and measurable improvement.",
      image_url: post.image_url || "/images/blog/forex-trading-goals.jpg",
      published_at: post.published_at || new Date().toISOString(),
    };
    
    console.log('\nUpdating with values:');
    console.log('--------------------');
    console.log('Excerpt:', updateData.excerpt);
    console.log('Image URL:', updateData.image_url);
    console.log('Published at:', updateData.published_at);
    
    // Update the blog post
    const { data: updatedPost, error: updateError } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', post.id)
      .select();
    
    if (updateError) {
      console.error('Error updating blog post:', updateError);
      return;
    }
    
    console.log('\n✅ Successfully updated blog post:');
    console.log('ID:', updatedPost[0].id);
    console.log('Title:', updatedPost[0].title);
    console.log('Slug:', updatedPost[0].slug);
    console.log('Excerpt:', updatedPost[0].excerpt ? updatedPost[0].excerpt.substring(0, 50) + '...' : null);
    console.log('Image URL:', updatedPost[0].image_url);
    console.log('Published at:', updatedPost[0].published_at);
    
  } catch (error) {
    console.error('Error in script:', error);
    process.exit(1);
  }
}

// Get slug from command line arguments
const args = process.argv.slice(2);
const slug = args[0] || 'forex-trading-goals-in-2025';

// Update blog post fields
updateBlogPostFields(slug); 