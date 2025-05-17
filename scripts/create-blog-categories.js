const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define blog categories
const categories = [
  { name: 'Forex Trading', slug: 'forex' },
  { name: 'Stock Trading', slug: 'stocks' },
  { name: 'Cryptocurrency Trading', slug: 'crypto' },
  { name: 'Trading Strategies', slug: 'trading-strategies' },
  { name: 'Market Analysis', slug: 'market-analysis' },
  { name: 'Regulation Updates', slug: 'regulation-updates' },
  { name: 'Educational Guides', slug: 'educational-guides' },
  { name: 'Trading Technology', slug: 'trading-technology' },
  { name: 'Broker Reviews', slug: 'broker-reviews' },
  { name: 'Commodities', slug: 'commodities' },
  { name: 'Options Trading', slug: 'options' },
  { name: 'Futures Trading', slug: 'futures' },
  { name: 'Beginner Guides', slug: 'beginners' }
];

// Main function to create blog categories
async function createBlogCategories() {
  try {
    console.log('Starting category creation...');
    
    // Get existing categories
    const { data: existingCategories, error: fetchError } = await supabase
      .from('blog_categories')
      .select('slug');
    
    if (fetchError) {
      throw new Error(`Error fetching existing categories: ${fetchError.message}`);
    }
    
    const existingSlugs = existingCategories.map(cat => cat.slug);
    
    // Filter out categories that already exist
    const newCategories = categories.filter(cat => !existingSlugs.includes(cat.slug));
    
    if (newCategories.length === 0) {
      console.log('All categories already exist. No new categories created.');
      return;
    }
    
    console.log(`Adding ${newCategories.length} new categories...`);
    
    // Insert new categories
    const { data, error } = await supabase
      .from('blog_categories')
      .insert(newCategories);
    
    if (error) {
      throw new Error(`Error creating categories: ${error.message}`);
    }
    
    console.log('Categories created successfully!');
  } catch (error) {
    console.error('Category creation failed:', error);
  }
}

// Run the function
createBlogCategories(); 