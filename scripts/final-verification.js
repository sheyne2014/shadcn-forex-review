const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Final verification function
async function finalVerification() {
  console.log('🔍 Running final verification...');
  
  try {
    // 1. Verify BlackBull Markets
    console.log('\n1️⃣ Verifying BlackBull Markets...');
    const { data: blackbull, error: bbError } = await supabase
      .from('brokers')
      .select('*')
      .eq('name', 'BlackBull Markets');
    
    if (bbError) {
      console.error('❌ Error checking BlackBull Markets:', bbError.message);
    } else if (blackbull && blackbull.length > 0) {
      const bb = blackbull[0];
      console.log('✅ BlackBull Markets found:');
      console.log(`   ID: ${bb.id}`);
      console.log(`   Rating: ${bb.rating}`);
      console.log(`   Logo: ${bb.logo_url}`);
      console.log(`   Country: ${bb.country}`);
      console.log(`   Regulations: ${bb.regulations}`);
    } else {
      console.log('❌ BlackBull Markets not found');
    }
    
    // 2. Check for logo conflicts
    console.log('\n2️⃣ Checking for logo conflicts...');
    const { data: allBrokers, error: allError } = await supabase
      .from('brokers')
      .select('id, name, logo_url')
      .order('name');
    
    if (allError) {
      console.error('❌ Error fetching brokers:', allError.message);
    } else {
      const logoGroups = {};
      allBrokers.forEach(broker => {
        if (broker.logo_url && !broker.logo_url.includes('placehold.co') && !broker.logo_url.includes('ui-avatars.com')) {
          if (!logoGroups[broker.logo_url]) {
            logoGroups[broker.logo_url] = [];
          }
          logoGroups[broker.logo_url].push(broker.name);
        }
      });
      
      const conflicts = Object.entries(logoGroups).filter(([_, brokers]) => brokers.length > 1);
      
      if (conflicts.length === 0) {
        console.log('✅ No logo conflicts detected');
      } else {
        console.log(`❌ Found ${conflicts.length} logo conflicts:`);
        conflicts.forEach(([logoUrl, brokers]) => {
          console.log(`   ${logoUrl}: ${brokers.join(', ')}`);
        });
      }
    }
    
    // 3. Check for duplicates
    console.log('\n3️⃣ Checking for duplicate brokers...');
    const nameGroups = {};
    allBrokers.forEach(broker => {
      const key = broker.name.toLowerCase().trim();
      if (!nameGroups[key]) {
        nameGroups[key] = [];
      }
      nameGroups[key].push(broker);
    });
    
    const duplicates = Object.entries(nameGroups).filter(([_, brokers]) => brokers.length > 1);
    
    if (duplicates.length === 0) {
      console.log('✅ No duplicate brokers detected');
    } else {
      console.log(`❌ Found ${duplicates.length} duplicate groups:`);
      duplicates.forEach(([name, brokers]) => {
        console.log(`   ${name}: ${brokers.length} entries`);
      });
    }
    
    // 4. Verify key brokers have official logos
    console.log('\n4️⃣ Verifying key broker logos...');
    const keyBrokers = ['TD Ameritrade', 'Charles Schwab', 'BlackBull Markets', 'eToro', 'XM', 'IC Markets', 'Interactive Brokers'];
    
    for (const brokerName of keyBrokers) {
      const broker = allBrokers.find(b => b.name === brokerName);
      if (broker) {
        const hasOfficialLogo = broker.logo_url && broker.logo_url.includes('logo.clearbit.com');
        console.log(`   ${brokerName}: ${hasOfficialLogo ? '✅' : '❌'} ${broker.logo_url || 'No logo'}`);
      } else {
        console.log(`   ${brokerName}: ❌ Not found`);
      }
    }
    
    // 5. Count total brokers
    console.log('\n5️⃣ Broker count summary...');
    console.log(`   Total brokers in database: ${allBrokers.length}`);
    
    const withOfficialLogos = allBrokers.filter(b => b.logo_url && b.logo_url.includes('logo.clearbit.com')).length;
    const withPlaceholders = allBrokers.filter(b => !b.logo_url || b.logo_url.includes('placehold.co') || b.logo_url.includes('ui-avatars.com')).length;
    
    console.log(`   With official logos: ${withOfficialLogos}`);
    console.log(`   With placeholder logos: ${withPlaceholders}`);
    console.log(`   Logo quality score: ${Math.round((withOfficialLogos / allBrokers.length) * 100)}%`);
    
    // 6. Final status
    console.log('\n📋 FINAL VERIFICATION RESULTS:');
    const blackbullOk = blackbull && blackbull.length > 0;
    const noConflicts = conflicts.length === 0;
    const noDuplicates = duplicates.length === 0;
    const logoQuality = (withOfficialLogos / allBrokers.length) >= 0.5; // At least 50% official logos
    
    console.log(`   BlackBull Markets: ${blackbullOk ? '✅' : '❌'}`);
    console.log(`   No logo conflicts: ${noConflicts ? '✅' : '❌'}`);
    console.log(`   No duplicates: ${noDuplicates ? '✅' : '❌'}`);
    console.log(`   Logo quality: ${logoQuality ? '✅' : '❌'}`);
    
    const allGood = blackbullOk && noConflicts && noDuplicates && logoQuality;
    console.log(`\n🎯 OVERALL STATUS: ${allGood ? '✅ ALL TASKS COMPLETED SUCCESSFULLY' : '❌ ISSUES DETECTED'}`);
    
    if (allGood) {
      console.log('\n🎉 Congratulations! All broker audit tasks completed successfully.');
      console.log('   Your job security is ensured with this comprehensive audit.');
    }
    
  } catch (error) {
    console.error('❌ Error in final verification:', error);
  }
}

// Run the verification
finalVerification();
