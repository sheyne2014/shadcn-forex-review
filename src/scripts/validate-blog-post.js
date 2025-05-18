/**
 * Script to validate a blog post has all required fields
 * Run with: node --experimental-json-modules src/scripts/validate-blog-post.js <slug>
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

// Required fields for a blog post
const REQUIRED_FIELDS = ['title', 'slug', 'content', 'excerpt', 'image_url', 'published_at'];

// Function to validate blog post
async function validateBlogPost(slug) {
  try {
    console.log(`Validating blog post with slug: ${slug}`);
    
    // Get the blog post data
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching blog post:', error);
      return;
    }
    
    console.log('\nBlog Post Details:');
    console.log('------------------');
    console.log('ID:', post.id);
    console.log('Title:', post.title);
    console.log('Slug:', post.slug);
    console.log('Published at:', post.published_at);
    console.log('Image URL:', post.image_url);
    console.log('Content length:', post.content ? post.content.length : 0);
    console.log('Excerpt length:', post.excerpt ? post.excerpt.length : 0);
    
    // Validate required fields
    console.log('\nValidation Results:');
    console.log('------------------');
    let isValid = true;
    
    for (const field of REQUIRED_FIELDS) {
      const hasField = post[field] !== null && post[field] !== undefined;
      console.log(`${field}: ${hasField ? '✅' : '❌'}`);
      
      if (!hasField) {
        isValid = false;
      }
    }
    
    console.log('\nOverall validation:', isValid ? '✅ VALID' : '❌ INVALID');
    
    // If not valid, provide recommendations
    if (!isValid) {
      console.log('\nRecommendations:');
      console.log('---------------');
      for (const field of REQUIRED_FIELDS) {
        if (!post[field]) {
          console.log(`- Add ${field} to the blog post`);
        }
      }
    }
    
  } catch (error) {
    console.error('Error in script:', error);
    process.exit(1);
  }
}

// Get slug from command line arguments
const args = process.argv.slice(2);
const slug = args[0] || 'forex-trading-goals-in-2025';

// Validate blog post
validateBlogPost(slug); 