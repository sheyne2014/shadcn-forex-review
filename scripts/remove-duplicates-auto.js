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

async function removeDuplicatesAuto() {
  try {
    console.log('🧹 AUTOMATIC DUPLICATE REMOVAL\n');

    // Get all brokers
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('id, name, rating, min_deposit, country, created_at')
      .order('name');

    if (error) {
      console.error('Error fetching brokers:', error);
      return;
    }

    console.log(`📊 Analyzing ${brokers.length} brokers...\n`);

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
      console.log('✅ No duplicates found! Database is clean.');
      return;
    }

    console.log(`🔍 Found ${duplicates.length} duplicate groups. Removing...\n`);
    
    let totalRemoved = 0;
    
    for (const [name, brokers] of duplicates) {
      console.log(`Processing: ${name.toUpperCase()}`);
      
      // Sort by quality (rating, then created_at)
      const sorted = brokers.sort((a, b) => {
        if (b.rating !== a.rating) return (b.rating || 0) - (a.rating || 0);
        return new Date(a.created_at) - new Date(b.created_at);
      });
      
      const keepBroker = sorted[0];
      const removeBrokers = sorted.slice(1);
      
      console.log(`   ✅ Keeping: ${keepBroker.id} (Rating: ${keepBroker.rating || 'N/A'})`);
      
      // Remove duplicates
      for (const broker of removeBrokers) {
        console.log(`   🗑️  Removing: ${broker.id} (Rating: ${broker.rating || 'N/A'})`);
        
        const { error: deleteError } = await supabase
          .from('brokers')
          .delete()
          .eq('id', broker.id);
        
        if (deleteError) {
          console.error(`   ❌ Error removing ${broker.id}:`, deleteError);
        } else {
          console.log(`   ✅ Successfully removed ${broker.id}`);
          totalRemoved++;
        }
      }
      console.log('');
    }

    // Final verification
    console.log('🔍 Final verification...');
    const { data: finalBrokers, error: finalError } = await supabase
      .from('brokers')
      .select('id, name')
      .order('name');

    if (finalError) {
      console.error('Error in final verification:', finalError);
      return;
    }

    const finalGroups = {};
    finalBrokers.forEach(broker => {
      const key = broker.name.toLowerCase().trim();
      if (!finalGroups[key]) {
        finalGroups[key] = [];
      }
      finalGroups[key].push(broker);
    });

    const finalDuplicates = Object.entries(finalGroups).filter(([name, brokers]) => brokers.length > 1);
    
    console.log('\n📊 FINAL RESULTS:');
    console.log(`   - Duplicate groups processed: ${duplicates.length}`);
    console.log(`   - Total duplicates removed: ${totalRemoved}`);
    console.log(`   - Final broker count: ${finalBrokers.length}`);
    console.log(`   - Remaining duplicates: ${finalDuplicates.length}`);
    
    if (finalDuplicates.length === 0) {
      console.log('\n🎉 SUCCESS! All duplicates removed!');
      console.log('✅ Your /brokers page should now show unique brokers only');
      console.log('✅ No more duplicate broker cards');
      console.log('\n💡 Next steps:');
      console.log('   1. Visit http://localhost:3000/brokers to verify');
      console.log('   2. Check that no duplicate cards appear');
      console.log('   3. Test different category tabs');
    } else {
      console.log('\n⚠️  Some duplicates still remain:');
      finalDuplicates.forEach(([name, brokers]) => {
        console.log(`   - ${name}: ${brokers.length} entries`);
      });
    }

  } catch (error) {
    console.error('❌ Error in automatic duplicate removal:', error);
  }
}

// Run the removal
removeDuplicatesAuto();
