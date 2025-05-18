/**
 * Script to fix the content of a blog post
 * Run with: node --experimental-json-modules src/scripts/fix-blog-content.js
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

// Function to fix blog post content
async function fixBlogPostContent() {
  try {
    const slug = 'forex-trading-goals-in-2025';
    console.log(`Fixing blog post content for slug: ${slug}`);
    
    // First, get the current content
    const { data: post, error: getError } = await supabase
      .from('blog_posts')
      .select('id, title, content')
      .eq('slug', slug)
      .single();
    
    if (getError) {
      console.error('Error getting blog post:', getError);
      return;
    }
    
    console.log('Found blog post:', post.title);
    console.log('Original content length:', post.content ? post.content.length : 0);
    console.log('Original content starts with:', post.content.substring(0, 100));
    
    // Remove the import statement from the content
    // Start content from the first ## heading
    const headingIndex = post.content.indexOf('##');
    if (headingIndex === -1) {
      console.error('Could not find heading in content');
      return;
    }
    
    const fixedContent = post.content.substring(headingIndex);
    
    console.log('Fixed content length:', fixedContent.length);
    console.log('Content preview after fix:', fixedContent.substring(0, 200) + '...');
    
    // Update the content in the database
    const { data: updatedPost, error: updateError } = await supabase
      .from('blog_posts')
      .update({ content: fixedContent })
      .eq('id', post.id)
      .select();
    
    if (updateError) {
      console.error('Error updating blog post:', updateError);
      return;
    }
    
    console.log('✅ Successfully updated blog post content');
    
  } catch (error) {
    console.error('Error in script:', error);
    process.exit(1);
  }
}

// Run the script
fixBlogPostContent(); 