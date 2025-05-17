const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Path to blog post MDX files
const postsDirectory = path.join(process.cwd(), 'src/app/blog');

// Function to read MDX file content and extract front matter
async function readMDXFile(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    frontmatter: data,
    content
  };
}

// Function to extract slug from filename
function getSlugFromFilename(filename) {
  return filename.replace(/\.mdx$/, '');
}

// Function to calculate reading time
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Function to extract integer from reading time string
function extractReadingTimeNumber(readingTime) {
  // If readingTime is already a number, return it
  if (typeof readingTime === 'number') {
    return readingTime;
  }
  
  // If it's a string like "12 min read", extract the number
  if (typeof readingTime === 'string') {
    const match = readingTime.match(/(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  }
  
  // Default fallback
  return 5;
}

// Main function to import blog posts
async function importBlogPosts() {
  try {
    console.log('Starting blog post import...');
    
    // Get all MDX files
    const mdxFiles = fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.mdx'));
    
    // Get all blog categories
    const { data: categories, error: categoriesError } = await supabase
      .from('blog_categories')
      .select('id, slug');
    
    if (categoriesError) {
      throw new Error(`Error fetching categories: ${categoriesError.message}`);
    }

    console.log(`Found ${mdxFiles.length} MDX files to process`);
    
    // Process each MDX file
    for (const file of mdxFiles) {
      const filePath = path.join(postsDirectory, file);
      const slug = getSlugFromFilename(file);
      
      // Check if post with this slug already exists
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .single();
      
      if (existingPost) {
        console.log(`Skipping ${slug} - already exists in database`);
        continue;
      }
      
      console.log(`Processing ${file}...`);
      
      // Read and parse file
      const { frontmatter, content } = await readMDXFile(filePath);
      
      // Calculate reading time if not provided
      const readingTimeRaw = frontmatter.readingTime || calculateReadingTime(content);
      const readingTime = extractReadingTimeNumber(readingTimeRaw);
      
      // Find category ID if category is provided
      let categoryId = null;
      if (frontmatter.category) {
        const category = categories.find(c => 
          c.slug.toLowerCase() === frontmatter.category.toLowerCase());
        
        if (category) {
          categoryId = category.id;
        }
      }
      
      // Prepare blog post data
      const blogPostData = {
        title: frontmatter.title,
        content: content,
        slug: slug,
        excerpt: frontmatter.excerpt || content.substring(0, 160) + '...',
        published_at: frontmatter.date || new Date().toISOString(),
        image_url: frontmatter.image || null,
        reading_time: readingTime,
        tags: frontmatter.tags || [],
        category_id: categoryId
      };
      
      // Insert into database
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([blogPostData]);
      
      if (error) {
        console.error(`Error inserting ${slug}:`, error);
      } else {
        console.log(`Successfully imported ${slug}`);
      }
    }
    
    console.log('Blog post import completed!');
  } catch (error) {
    console.error('Import failed:', error);
  }
}

// Run the import
importBlogPosts(); 