const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Path to blog post MDX files
const postsDirectory = path.join(process.cwd(), 'src/app/blog');

// Categories mapping
const categories = {
  'forex': 'forex',
  'stocks': 'stocks',
  'crypto': 'crypto',
  'trading-strategies': 'trading-strategies',
  'market-analysis': 'market-analysis',
  'regulation': 'regulation-updates',
  'educational': 'educational-guides',
  'technology': 'trading-technology'
};

// Function to extract category from filename
function getCategoryFromFilename(filename) {
  const keywords = Object.keys(categories);
  for (const key of keywords) {
    if (filename.includes(key)) {
      return categories[key];
    }
  }
  return 'market-analysis'; // Default category
}

// Function to extract tags from filename
function getTagsFromFilename(filename) {
  const tags = [];
  const words = filename.replace(/-/g, ' ').split(' ');
  
  // Common tags to extract
  const commonTags = [
    'forex', 'stocks', 'crypto', 'trading', 'analysis', 'strategy',
    'beginner', 'advanced', 'regulation', 'brokers', '2025'
  ];
  
  commonTags.forEach(tag => {
    if (words.some(word => word.toLowerCase().includes(tag.toLowerCase()))) {
      tags.push(tag);
    }
  });
  
  return tags;
}

// Function to generate excerpt from content
function generateExcerpt(content, maxLength = 160) {
  // Remove markdown formatting
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headings
    .replace(/\*\*|__/g, '')    // Remove bold
    .replace(/\*|_/g, '')       // Remove italic
    .replace(/\n/g, ' ')        // Replace newlines with spaces
    .replace(/\s+/g, ' ')       // Replace multiple spaces with single space
    .trim();
    
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
}

// Function to calculate reading time
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Main function to update MDX frontmatter
async function updateMDXFrontmatter() {
  try {
    console.log('Starting MDX frontmatter update...');
    
    // Get all MDX files
    const mdxFiles = fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.mdx'));
    
    console.log(`Found ${mdxFiles.length} MDX files to process`);
    
    // Process each MDX file
    for (const file of mdxFiles) {
      const filePath = path.join(postsDirectory, file);
      
      console.log(`Processing ${file}...`);
      
      // Read the file
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContents);
      
      // Update frontmatter
      const updatedFrontmatter = {
        ...frontmatter,
        title: frontmatter.title || file.replace(/-/g, ' ').replace('.mdx', ''),
        date: frontmatter.date || new Date().toISOString(),
        excerpt: frontmatter.excerpt || generateExcerpt(content),
        category: frontmatter.category || getCategoryFromFilename(file),
        tags: frontmatter.tags || getTagsFromFilename(file),
        readingTime: frontmatter.readingTime || calculateReadingTime(content),
        image: frontmatter.image || `https://placehold.co/1200x630?text=${encodeURIComponent(file.replace(/-/g, ' ').replace('.mdx', ''))}`
      };
      
      // Write updated frontmatter back to file
      const updatedFileContent = matter.stringify(content, updatedFrontmatter);
      fs.writeFileSync(filePath, updatedFileContent);
      
      console.log(`Updated frontmatter for ${file}`);
    }
    
    console.log('MDX frontmatter update completed!');
  } catch (error) {
    console.error('Update failed:', error);
  }
}

// Run the update
updateMDXFrontmatter(); 