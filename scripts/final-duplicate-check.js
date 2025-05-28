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

async function finalDuplicateCheck() {
  try {
    console.log('🔍 FINAL DUPLICATE CHECK\n');

    // Get all brokers
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('id, name, rating, min_deposit, country, created_at')
      .order('name');

    if (error) {
      console.error('Error fetching brokers:', error);
      return;
    }

    console.log(`📊 Total brokers in database: ${brokers.length}\n`);

    // Group by name to find duplicates
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
      console.log('✅ EXCELLENT! No duplicate brokers found!');
      console.log(`📊 Database contains ${brokers.length} unique brokers`);
      
      // Show some sample brokers
      console.log('\n📋 Sample brokers:');
      brokers.slice(0, 10).forEach((broker, index) => {
        console.log(`   ${index + 1}. ${broker.name} (Rating: ${broker.rating || 'N/A'})`);
      });
      
      console.log('\n🎉 DUPLICATE REMOVAL SUCCESSFUL!');
      console.log('✅ Your /brokers page should now show unique brokers only');
      console.log('✅ No more duplicate broker cards');
      
    } else {
      console.log(`❌ Found ${duplicates.length} duplicate groups:\n`);
      
      let totalDuplicatesToRemove = 0;
      
      duplicates.forEach(([name, brokers]) => {
        console.log(`--- DUPLICATE: ${name.toUpperCase()} (${brokers.length} entries) ---`);
        
        // Sort by quality (rating, then created_at)
        const sorted = brokers.sort((a, b) => {
          if (b.rating !== a.rating) return (b.rating || 0) - (a.rating || 0);
          return new Date(a.created_at) - new Date(b.created_at);
        });
        
        const keepBroker = sorted[0];
        const removeBrokers = sorted.slice(1);
        totalDuplicatesToRemove += removeBrokers.length;
        
        console.log(`   ✅ KEEP: ${keepBroker.id} (${keepBroker.name}) - Rating: ${keepBroker.rating || 'N/A'}`);
        removeBrokers.forEach(broker => {
          console.log(`   ❌ REMOVE: ${broker.id} (${broker.name}) - Rating: ${broker.rating || 'N/A'}`);
        });
        console.log('');
      });
      
      console.log(`📊 SUMMARY:`);
      console.log(`   - Total brokers: ${brokers.length}`);
      console.log(`   - Duplicate groups: ${duplicates.length}`);
      console.log(`   - Duplicates to remove: ${totalDuplicatesToRemove}`);
      console.log(`   - Final unique brokers: ${brokers.length - totalDuplicatesToRemove}`);
      
      // Ask if user wants to remove duplicates
      console.log('\n❓ Would you like to remove these duplicates automatically?');
      console.log('   Run: node scripts/remove-duplicates-auto.js');
    }

  } catch (error) {
    console.error('❌ Error in duplicate check:', error);
  }
}

// Run the check
finalDuplicateCheck();
