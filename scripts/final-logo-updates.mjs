import { createClient } from '@supabase/supabase-js';

// Hardcode the credentials
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyODY5MjIsImV4cCI6MjA1ODg2MjkyMn0.sk4slxLQmxCpcmTz_6X-yE6ybZ8eaX4ItUasm_ZVH-k';

const supabase = createClient(supabaseUrl, supabaseKey);

// Final logo updates for the remaining brokers
const FINAL_LOGO_UPDATES = {
  'Cannon Futures': 'https://logo.clearbit.com/cannontrading.com',
  'CFD Master': 'https://logo.clearbit.com/cfdmaster.com',
  'Commodity Hub': 'https://logo.clearbit.com/commodityhub.com',
  'Daniels Futures': 'https://logo.clearbit.com/danielstrading.com',
  'Generic Futures': 'https://logo.clearbit.com/genericfutures.com',
  'NBHM Pro': 'https://logo.clearbit.com/nbhm.com',
  'Tradovate Futures': 'https://logo.clearbit.com/tradovate.com'
};

// Fallback logos for brokers that might not have Clearbit logos
const FALLBACK_LOGOS = {
  'Cannon Futures': 'https://ui-avatars.com/api/?name=CF&background=1f2937&color=fff&size=128&bold=true&format=png',
  'CFD Master': 'https://ui-avatars.com/api/?name=CM&background=059669&color=fff&size=128&bold=true&format=png',
  'Commodity Hub': 'https://ui-avatars.com/api/?name=CH&background=dc2626&color=fff&size=128&bold=true&format=png',
  'Daniels Futures': 'https://ui-avatars.com/api/?name=DF&background=7c3aed&color=fff&size=128&bold=true&format=png',
  'Generic Futures': 'https://ui-avatars.com/api/?name=GF&background=ea580c&color=fff&size=128&bold=true&format=png',
  'NBHM Pro': 'https://ui-avatars.com/api/?name=NP&background=0891b2&color=fff&size=128&bold=true&format=png',
  'Tradovate Futures': 'https://ui-avatars.com/api/?name=TF&background=be185d&color=fff&size=128&bold=true&format=png'
};

// Function to validate if a logo URL is accessible
async function validateLogoUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function updateFinalLogos() {
  console.log('🚀 Starting final logo updates for remaining brokers...\n');
  
  try {
    let updatedCount = 0;
    let errorCount = 0;
    let notFoundCount = 0;
    
    // Process each broker in our final logo list
    for (const [brokerName, logoUrl] of Object.entries(FINAL_LOGO_UPDATES)) {
      console.log(`🔍 Processing: ${brokerName}`);
      
      // First, check if the broker exists in our database
      const { data: brokers, error: fetchError } = await supabase
        .from('brokers')
        .select('id, name, logo_url')
        .ilike('name', brokerName)
        .limit(1);
      
      if (fetchError) {
        console.error(`❌ Error fetching ${brokerName}:`, fetchError);
        errorCount++;
        continue;
      }
      
      if (!brokers || brokers.length === 0) {
        console.log(`⚠️  ${brokerName} not found in database`);
        notFoundCount++;
        continue;
      }
      
      const broker = brokers[0];
      
      // Validate the primary logo URL
      console.log(`🔍 Validating primary logo URL for ${brokerName}...`);
      let finalLogoUrl = logoUrl;
      let isValid = await validateLogoUrl(logoUrl);
      
      if (!isValid) {
        console.log(`⚠️  Primary logo failed, trying fallback for ${brokerName}...`);
        finalLogoUrl = FALLBACK_LOGOS[brokerName];
        isValid = await validateLogoUrl(finalLogoUrl);
      }
      
      if (!isValid) {
        console.log(`❌ Both primary and fallback logos failed for ${brokerName}`);
        errorCount++;
        continue;
      }
      
      // Update the broker logo
      const { data, error: updateError } = await supabase
        .from('brokers')
        .update({ logo_url: finalLogoUrl })
        .eq('id', broker.id)
        .select();
      
      if (updateError) {
        console.error(`❌ Error updating ${brokerName}:`, updateError);
        errorCount++;
      } else {
        console.log(`✅ ${brokerName} logo updated successfully`);
        console.log(`   Old: ${broker.logo_url || 'None'}`);
        console.log(`   New: ${finalLogoUrl}`);
        updatedCount++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
      console.log(''); // Empty line for readability
    }
    
    // Summary
    console.log('\n📊 FINAL LOGO UPDATE SUMMARY:');
    console.log(`✅ Updated: ${updatedCount} brokers`);
    console.log(`❌ Errors: ${errorCount} brokers`);
    console.log(`❓ Not found: ${notFoundCount} brokers`);
    console.log(`📊 Total processed: ${Object.keys(FINAL_LOGO_UPDATES).length} brokers`);
    
    if (updatedCount > 0) {
      console.log('\n🎉 Final logo updates completed successfully!');
    }
    
  } catch (error) {
    console.error('❌ Error in final logo update process:', error);
  }
}

// Function to do a final audit of all broker logos
async function finalAudit() {
  console.log('\n🔍 Performing final audit of all broker logos...\n');
  
  try {
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('id, name, logo_url')
      .order('name');
    
    if (error) {
      console.error('❌ Error fetching brokers:', error);
      return;
    }
    
    console.log(`📊 Found ${brokers.length} brokers in database\n`);
    
    let hasValidLogo = 0;
    let needsUpdate = 0;
    let stillMissing = [];
    
    // Check each broker
    for (const broker of brokers) {
      const needsLogoUpdate = !broker.logo_url || 
        broker.logo_url.includes('placehold.co') ||
        broker.logo_url.includes('placeholder') ||
        broker.logo_url.includes('fallback') ||
        broker.logo_url.includes('generic-broker-logo');
      
      if (needsLogoUpdate) {
        needsUpdate++;
        stillMissing.push(broker.name);
      } else {
        hasValidLogo++;
      }
    }
    
    console.log('\n📊 FINAL AUDIT RESULTS:');
    console.log(`✅ Brokers with valid logos: ${hasValidLogo}`);
    console.log(`❌ Brokers still needing logos: ${needsUpdate}`);
    console.log(`📈 Success rate: ${((hasValidLogo / brokers.length) * 100).toFixed(1)}%`);
    
    if (stillMissing.length > 0) {
      console.log('\n📝 Brokers still needing logos:');
      stillMissing.forEach(name => console.log(`   - ${name}`));
    } else {
      console.log('\n🎉 ALL BROKERS NOW HAVE LOGOS! 🎉');
    }
    
  } catch (error) {
    console.error('❌ Error in final audit:', error);
  }
}

// Run the final updates and audit
async function main() {
  await updateFinalLogos();
  await finalAudit();
}

main();
