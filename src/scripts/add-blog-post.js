/**
 * Script to add a blog post to the Supabase database
 * Run with: npm run add-blog-post
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: '.env.local' })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Supabase URL or Service Role Key not found in environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// First, check if the blog_posts table exists and get its structure
async function checkTableStructure() {
  try {
    console.log('Checking table structure...')
    
    // List all tables in the database
    const { data: tables, error: tablesError } = await supabase
      .from('_tables')
      .select('*')
    
    if (tablesError) {
      console.log('Unable to list tables, trying direct approach')
      return false
    }
    
    console.log('Available tables:', tables.map(t => t.name).join(', '))
    
    if (!tables.some(t => t.name === 'blog_posts')) {
      console.log('blog_posts table not found')
      return false
    }
    
    return true
  } catch (error) {
    console.log('Error checking table structure:', error.message)
    return false
  }
}

async function addBlogPost(filePath) {
  try {
    // Default to the forex trading mistakes blog if no file path is provided
    const blogFilePath = filePath || path.join(process.cwd(), 'src/app/blog/10-critical-forex-trading-mistakes-to-avoid-in-2025.mdx')
    
    console.log(`Reading blog file: ${blogFilePath}`)
    const fileContent = fs.readFileSync(blogFilePath, 'utf8')
    
    // Extract metadata from frontmatter
    const titleMatch = fileContent.match(/title: "([^"]+)"/)
    const descriptionMatch = fileContent.match(/description: "([^"]+)"/)
    
    if (!titleMatch) {
      throw new Error('Required metadata missing from blog post: title')
    }
    
    const title = titleMatch[1]
    const description = descriptionMatch ? descriptionMatch[1] : ''
    
    // Get content without frontmatter
    const contentStart = fileContent.indexOf('---', fileContent.indexOf('---') + 3) + 3
    const content = fileContent.substring(contentStart).trim()
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    
    console.log('Adding blog post to Supabase...')
    console.log('Title:', title)
    console.log('Slug:', slug)
    
    // First try adding title, content, and description
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{ 
          title: title,
          content: content,
          description: description,
          slug: slug
        }])
        .select()
      
      if (error) {
        // If that fails, try with just title and content
        console.log('First attempt failed:', error.message)
        console.log('Trying with fewer fields...')
        
        const { data: data2, error: error2 } = await supabase
          .from('blog_posts')
          .insert([{ 
            title: title,
            content: content
          }])
          .select()
        
        if (error2) {
          // If that fails too, try with just title
          console.log('Second attempt failed:', error2.message)
          console.log('Trying with title only...')
          
          const { data: data3, error: error3 } = await supabase
            .from('blog_posts')
            .insert([{ title: title }])
            .select()
          
          if (error3) {
            if (error3.message.includes('does not exist')) {
              console.error('Error: The blog_posts table does not exist in your database')
              console.log('You need to create the table first. Example SQL:')
              console.log(`
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`)
              process.exit(1)
            } else {
              throw error3
            }
          }
          
          console.log('✅ Blog post added successfully with title only!')
          console.log('Post ID:', data3[0].id)
        } else {
          console.log('✅ Blog post added successfully with title and content!')
          console.log('Post ID:', data2[0].id)
        }
      } else {
        console.log('✅ Blog post added successfully with all fields!')
        console.log('Post ID:', data[0].id)
      }
    } catch (insertError) {
      throw insertError
    }
  } catch (error) {
    console.error('❌ Error adding blog post:', error.message)
    if (error.details) console.error('Details:', error.details)
    if (error.hint) console.error('Hint:', error.hint)
    console.log('\nTo debug the issue, please check:')
    console.log('1. The blog_posts table exists in your Supabase database')
    console.log('2. You have the correct permissions (using service role key)')
    console.log('3. The table structure has appropriate columns (at least title)')
    process.exit(1)
  }
}

// Check for file argument
const args = process.argv.slice(2)
const filePath = args[0]

// Run the function
addBlogPost(filePath) 