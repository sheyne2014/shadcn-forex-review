require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function analyzeDuplicates() {
  try {
    console.log('🔍 Analyzing broker duplicates...\n');

    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('id, name, logo_url, rating, min_deposit, country, regulations')
      .order('name');

    if (error) {
      console.error('Error fetching brokers:', error);
      return;
    }

    console.log(`📊 Total brokers in database: ${brokers.length}\n`);

    // Group brokers by name to find duplicates
    const brokerGroups = {};
    brokers.forEach(broker => {
      const key = broker.name.toLowerCase().trim();
      if (!brokerGroups[key]) {
        brokerGroups[key] = [];
      }
      brokerGroups[key].push(broker);
    });

    // Find duplicates
    const duplicates = Object.entries(brokerGroups).filter(([name, brokers]) => brokers.length > 1);
    
    if (duplicates.length === 0) {
      console.log('✅ No duplicate brokers found!');
    } else {
      console.log(`❌ Found ${duplicates.length} duplicate broker groups:\n`);
      
      duplicates.forEach(([name, brokers]) => {
        console.log(`--- DUPLICATE: ${name.toUpperCase()} (${brokers.length} entries) ---`);
        brokers.forEach((broker, index) => {
          console.log(`  ${index + 1}. ID: ${broker.id}`);
          console.log(`     Name: ${broker.name}`);
          console.log(`     Rating: ${broker.rating || 'No rating'}`);
          console.log(`     Min Deposit: ${broker.min_deposit || 'No min deposit'}`);
          console.log(`     Country: ${broker.country || 'No country'}`);
          console.log('');
        });
      });
    }

    // Show some statistics
    console.log('\n=== STATISTICS ===');
    console.log(`Total brokers: ${brokers.length}`);
    console.log(`Unique broker names: ${Object.keys(brokerGroups).length}`);
    console.log(`Duplicate groups: ${duplicates.length}`);
    
    if (duplicates.length > 0) {
      const totalDuplicates = duplicates.reduce((sum, [_, brokers]) => sum + brokers.length - 1, 0);
      console.log(`Total duplicate entries to remove: ${totalDuplicates}`);
    }

  } catch (error) {
    console.error('Error analyzing duplicates:', error);
  }
}

// Run the analysis
analyzeDuplicates();
