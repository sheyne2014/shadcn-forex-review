// Check brokers count in database
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkBrokersCount() {
  try {
    // Get brokers count
    const { count, error } = await supabase
      .from('brokers')
      .select('*', { count: 'exact', head: true });
      
    if (error) {
      console.error('Error fetching brokers count:', error);
      return;
    }
    
    console.log(`Total brokers in database: ${count}`);
    
    // Get categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*');
      
    if (catError) {
      console.error('Error fetching categories:', catError);
      return;
    }
    
    console.log(`Total categories: ${categories.length}`);
    console.log('Categories:', categories.map(c => c.name).join(', '));
    
    // Get broker count by category
    if (categories.length > 0) {
      for (const category of categories) {
        const { count: catCount, error: countError } = await supabase
          .from('broker_categories')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id);
          
        if (countError) {
          console.error(`Error fetching count for category ${category.name}:`, countError);
          continue;
        }
        
        console.log(`Category "${category.name}": ${catCount} brokers`);
      }
    }
  } catch (error) {
    console.error('Error checking brokers count:', error);
  }
}

// Run the check
checkBrokersCount()
  .then(() => {
    console.log('Check completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during check:', error);
    process.exit(1);
  }); 