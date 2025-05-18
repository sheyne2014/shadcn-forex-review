/**
 * Script to add the regulated forex brokers blog post to the Supabase database
 * Run with: node src/scripts/add-regulated-brokers-blog.js
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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

async function addRegulatedBrokersBlogPost() {
  try {
    // Path to the blog post content file
    const blogFilePath = path.join(process.cwd(), 'src/lib/content/blog-regulated-forex-brokers-2025.md')
    
    console.log(`Reading blog file: ${blogFilePath}`)
    const fileContent = fs.readFileSync(blogFilePath, 'utf8')
    
    // Extract metadata from frontmatter
    const titleMatch = fileContent.match(/title: "([^"]+)"/)
    const slugMatch = fileContent.match(/slug: "([^"]+)"/)
    const excerptMatch = fileContent.match(/excerpt: "([^"]+)"/)
    const imageUrlMatch = fileContent.match(/image_url: "([^"]+)"/)
    const publishedAtMatch = fileContent.match(/published_at: "([^"]+)"/)
    const readingTimeMatch = fileContent.match(/reading_time: (\d+)/)
    const tagsMatch = fileContent.match(/tags: \[(.*?)\]/)
    
    if (!titleMatch || !slugMatch) {
      throw new Error('Required metadata missing from blog post: title or slug')
    }
    
    const title = titleMatch[1]
    const slug = slugMatch[1]
    const excerpt = excerptMatch ? excerptMatch[1] : ''
    const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '/images/blog/regulated-forex-brokers.jpg'
    const publishedAt = publishedAtMatch ? publishedAtMatch[1] : new Date().toISOString()
    const readingTime = readingTimeMatch ? parseInt(readingTimeMatch[1]) : 12
    
    // Parse tags if available
    let tags = []
    if (tagsMatch && tagsMatch[1]) {
      // Extract quoted strings from the tags array
      const tagRegex = /"(.*?)"/g
      let match
      while ((match = tagRegex.exec(tagsMatch[1])) !== null) {
        tags.push(match[1])
      }
    }
    
    // Get content without frontmatter
    const contentStart = fileContent.indexOf('---', fileContent.indexOf('---') + 3) + 3
    const content = fileContent.substring(contentStart).trim()
    
    console.log('Adding blog post to Supabase...')
    console.log('Title:', title)
    console.log('Slug:', slug)
    console.log('Tags:', tags)
    
    // Add the blog post to Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        { 
          title: title,
          slug: slug,
          content: content,
          excerpt: excerpt,
          image_url: imageUrl,
          published_at: publishedAt,
          reading_time: readingTime,
          tags: JSON.stringify(tags)
        }
      ])
      .select()
    
    if (error) {
      console.error('Error adding blog post:', error)
      
      // Try with fewer fields if the first attempt fails
      console.log('Trying with fewer fields...')
      
      const { data: data2, error: error2 } = await supabase
        .from('blog_posts')
        .insert([{ 
          title: title,
          slug: slug,
          content: content
        }])
        .select()
      
      if (error2) {
        throw error2
      } else {
        console.log('✅ Blog post added successfully with basic fields!')
        console.log('Post ID:', data2[0].id)
      }
    } else {
      console.log('✅ Blog post added successfully with all fields!')
      console.log('Post ID:', data[0].id)
    }
  } catch (error) {
    console.error('❌ Error adding blog post:', error.message)
    if (error.details) console.error('Details:', error.details)
    if (error.hint) console.error('Hint:', error.hint)
    process.exit(1)
  }
}

// Run the function
addRegulatedBrokersBlogPost() 