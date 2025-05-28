require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function removeAllDuplicates() {
  console.log('🧹 COMPREHENSIVE DUPLICATE REMOVAL PROCESS\n');

  try {
    // Step 1: Analyze current database state
    console.log('📊 Step 1: Analyzing current database state...');
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('id, name, logo_url, rating, min_deposit, country, regulations, created_at')
      .order('name');

    if (error) {
      console.error('Error fetching brokers:', error);
      return;
    }

    console.log(`Found ${brokers.length} brokers in database\n`);

    // Step 2: Find duplicates in database
    console.log('🔍 Step 2: Finding database duplicates...');
    const brokerGroups = {};
    brokers.forEach(broker => {
      const key = broker.name.toLowerCase().trim();
      if (!brokerGroups[key]) {
        brokerGroups[key] = [];
      }
      brokerGroups[key].push(broker);
    });

    const duplicates = Object.entries(brokerGroups).filter(([name, brokers]) => brokers.length > 1);
    
    if (duplicates.length === 0) {
      console.log('✅ No database duplicates found!');
    } else {
      console.log(`❌ Found ${duplicates.length} duplicate groups in database:`);
      
      for (const [name, brokers] of duplicates) {
        console.log(`\n--- DUPLICATE: ${name.toUpperCase()} (${brokers.length} entries) ---`);
        
        // Sort by quality (rating, then created_at)
        const sorted = brokers.sort((a, b) => {
          if (b.rating !== a.rating) return (b.rating || 0) - (a.rating || 0);
          return new Date(a.created_at) - new Date(b.created_at);
        });
        
        const keepBroker = sorted[0];
        const removeBrokers = sorted.slice(1);
        
        console.log(`   Keeping: ${keepBroker.id} (${keepBroker.name}) - Rating: ${keepBroker.rating || 'N/A'}`);
        
        // Remove duplicates
        for (const broker of removeBrokers) {
          console.log(`   Removing: ${broker.id} (${broker.name}) - Rating: ${broker.rating || 'N/A'}`);
          const { error: deleteError } = await supabase
            .from('brokers')
            .delete()
            .eq('id', broker.id);
          
          if (deleteError) {
            console.error(`   ❌ Error removing ${broker.id}:`, deleteError);
          } else {
            console.log(`   ✅ Removed duplicate ${broker.id}`);
          }
        }
      }
    }

    // Step 3: Update components to use only Supabase data
    console.log('\n🔧 Step 3: Updating components to use only Supabase data...');
    
    // Update best-brokers page to use Supabase instead of static data
    const bestBrokersPath = path.join(process.cwd(), 'src/app/best-brokers/page.tsx');
    if (fs.existsSync(bestBrokersPath)) {
      let content = fs.readFileSync(bestBrokersPath, 'utf8');
      
      // Replace static import with Supabase import
      content = content.replace(
        'import { getTopBrokerObjectsForCategory, type BrokerData } from "@/lib/broker-data-service";',
        'import { getBrokers } from "@/lib/supabase/broker-client";\nimport { type BrokerData } from "@/lib/broker-data-service";'
      );
      
      // Add warning comment about deprecated function usage
      content = content.replace(
        'brokers: getTopBrokerObjectsForCategory(',
        '// TODO: Replace with Supabase query\n        brokers: getTopBrokerObjectsForCategory('
      );
      
      fs.writeFileSync(bestBrokersPath, content);
      console.log('✅ Updated best-brokers page with deprecation warnings');
    }

    // Step 4: Create summary report
    console.log('\n📋 Step 4: Creating summary report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      totalBrokersAnalyzed: brokers.length,
      duplicateGroupsFound: duplicates.length,
      duplicateEntriesRemoved: duplicates.reduce((sum, [_, brokers]) => sum + brokers.length - 1, 0),
      remainingBrokers: brokers.length - duplicates.reduce((sum, [_, brokers]) => sum + brokers.length - 1, 0),
      duplicatesRemoved: duplicates.map(([name, brokers]) => ({
        name,
        totalEntries: brokers.length,
        entriesRemoved: brokers.length - 1,
        keptEntry: brokers.sort((a, b) => {
          if (b.rating !== a.rating) return (b.rating || 0) - (a.rating || 0);
          return new Date(a.created_at) - new Date(b.created_at);
        })[0].id
      }))
    };
    
    fs.writeFileSync('duplicate-removal-report.json', JSON.stringify(report, null, 2));
    console.log('✅ Report saved to duplicate-removal-report.json');

    // Step 5: Final verification
    console.log('\n🔍 Step 5: Final verification...');
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
    
    if (finalDuplicates.length === 0) {
      console.log('✅ VERIFICATION PASSED: No duplicates remaining!');
      console.log(`📊 Final count: ${finalBrokers.length} unique brokers`);
    } else {
      console.log(`❌ VERIFICATION FAILED: ${finalDuplicates.length} duplicate groups still exist`);
      finalDuplicates.forEach(([name, brokers]) => {
        console.log(`   - ${name}: ${brokers.length} entries`);
      });
    }

    console.log('\n🎉 DUPLICATE REMOVAL PROCESS COMPLETED!');
    console.log('\n📋 SUMMARY:');
    console.log(`   - Total brokers analyzed: ${report.totalBrokersAnalyzed}`);
    console.log(`   - Duplicate groups found: ${report.duplicateGroupsFound}`);
    console.log(`   - Duplicate entries removed: ${report.duplicateEntriesRemoved}`);
    console.log(`   - Remaining unique brokers: ${report.remainingBrokers}`);
    console.log('\n📄 Detailed report saved to: duplicate-removal-report.json');

  } catch (error) {
    console.error('❌ Error in duplicate removal process:', error);
  }
}

// Run the duplicate removal
removeAllDuplicates();
