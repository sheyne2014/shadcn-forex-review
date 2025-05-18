/**
 * Script to check the content of a blog post
 * Run with: node --experimental-json-modules src/scripts/check-blog-content.js <slug>
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

// Function to check blog post content
async function checkBlogPostContent(slug) {
  try {
    console.log(`Checking blog post content for slug: ${slug}`);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, content')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error checking blog post:', error);
      return;
    }
    
    console.log('✅ Blog post found:');
    console.log('ID:', data.id);
    console.log('Title:', data.title);
    console.log('Slug:', data.slug);
    console.log('Content Length:', data.content ? data.content.length : 0);
    console.log('Content Preview:', data.content ? data.content.substring(0, 200) + '...' : 'No content');
    
    // Check if content is null or empty
    if (!data.content) {
      console.log('❌ WARNING: Blog post content is empty or null');
    }
    
  } catch (error) {
    console.error('Error in script:', error);
    process.exit(1);
  }
}

// Get slug from command line arguments
const args = process.argv.slice(2);
const slug = args[0] || 'forex-trading-goals-in-2025';

// Check blog post content
checkBlogPostContent(slug); 