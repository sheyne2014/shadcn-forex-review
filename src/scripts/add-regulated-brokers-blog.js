/**
 * Script to add the regulated brokers blog post to the Supabase database
 * Run with: node src/scripts/add-regulated-brokers-blog.js
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

async function addBlogPost() {
  try {
    const blogFilePath = path.join(process.cwd(), 'src/app/blog/regulated-brokers-guide-2025.mdx')
    
    console.log(`Reading blog file: ${blogFilePath}`)
    const fileContent = fs.readFileSync(blogFilePath, 'utf8')
    
    // Extract metadata from frontmatter - handle both single and double quotes
    const titleMatch = fileContent.match(/title:\s*['"]([^'"]+)['"]/)
    const descriptionMatch = fileContent.match(/description:\s*['"]([^'"]+)['"]/) || fileContent.match(/description:\s*>\s*\n\s*([^\n]+(?:\n\s+[^\n]+)*)/)
    const dateMatch = fileContent.match(/date:\s*['"]([^'"]+)['"]/)
    const authorMatch = fileContent.match(/author:\s*['"]([^'"]+)['"]/)
    const categoryMatch = fileContent.match(/category:\s*['"]([^'"]+)['"]/)
    const featuredMatch = fileContent.match(/featured:\s*(true|false)/)
    const imageMatch = fileContent.match(/image:\s*['"]([^'"]+)['"]/)
    const readingTimeMatch = fileContent.match(/readingTime:\s*['"]([^'"]+)['"]/)
    const excerptMatch = fileContent.match(/excerpt:\s*['"]([^'"]+)['"]/) || fileContent.match(/excerpt:\s*>\s*\n\s*([^\n]+(?:\n\s+[^\n]+)*)/)
    const keywordsMatch = fileContent.match(/keywords:\s*['"]([^'"]+)['"]/) || fileContent.match(/keywords:\s*>\s*\n\s*([^\n]+(?:\n\s+[^\n]+)*)/)
    
    // Extract tags as an array
    const tagsMatch = fileContent.match(/tags:\s*\n((?:\s*-\s*['"]?[^'\n"]*['"]?\n)+)/)
    let tags = []
    if (tagsMatch && tagsMatch[1]) {
      const tagLines = tagsMatch[1].trim().split('\n')
      tags = tagLines.map(line => {
        const tag = line.replace(/^\s*-\s*['"]?|['"]?\s*$/, '').trim()
        return tag
      })
    }
    
    if (!titleMatch) {
      throw new Error('Required metadata missing from blog post: title')
    }
    
    const title = titleMatch[1]
    const description = descriptionMatch ? descriptionMatch[1].replace(/\n\s+/g, ' ').trim() : ''
    const excerpt = excerptMatch ? excerptMatch[1].replace(/\n\s+/g, ' ').trim() : ''
    const keywords = keywordsMatch ? keywordsMatch[1].replace(/\n\s+/g, ' ').trim() : ''
    const published_at = dateMatch ? dateMatch[1] : '2025-01-15'
    const author = authorMatch ? authorMatch[1] : 'BrokerAnalysis Team'
    const category = categoryMatch ? categoryMatch[1] : 'Broker Reviews'
    const featured = featuredMatch ? featuredMatch[1] === 'true' : false
    const image_url = imageMatch ? imageMatch[1] : '/images/blog/regulated-forex-brokers.jpg'
    const reading_time = readingTimeMatch ? readingTimeMatch[1].replace(/\s*min read$/, '') : '11'
    
    // Get content without frontmatter
    const contentStart = fileContent.indexOf('---', fileContent.indexOf('---') + 3) + 3
    const content = fileContent.substring(contentStart).trim()
    
    // Use the specified slug
    const slug = 'regulated-brokers-guide-2025'
    
    console.log('Adding blog post to Supabase...')
    console.log('Title:', title)
    console.log('Slug:', slug)
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ 
        id: uuidv4(),
        title,
        content,
        description,
        excerpt,
        slug,
        published_at,
        author,
        category,
        featured,
        image_url,
        reading_time: parseInt(reading_time, 10) || 11,
        tags: JSON.stringify(tags),
        keywords
      }])
      .select()
    
    if (error) {
      throw error
    }
    
    console.log('✅ Blog post added successfully!')
    console.log('Post ID:', data[0].id)
  } catch (error) {
    console.error('❌ Error adding blog post:', error.message)
    if (error.details) console.error('Details:', error.details)
    if (error.hint) console.error('Hint:', error.hint)
  }
}

// Run the function
addBlogPost() 