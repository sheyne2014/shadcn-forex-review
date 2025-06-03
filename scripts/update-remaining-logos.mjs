import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Updated logo URLs for the brokers that failed in the previous script
const REMAINING_LOGO_UPDATES = {
  // High-quality official logos found through web search
  'eToro': 'https://altcoinsbox.com/wp-content/uploads/2023/04/full-etoro-logo.png',
  'XM': 'https://logo.clearbit.com/xm.com', // This should work as it's a major broker
  'Pepperstone': 'https://logo.clearbit.com/pepperstone.com', // This should work as it's a major broker
  'Just2Trade': 'https://logo.clearbit.com/just2trade.online', // Try alternative domain
  
  // Additional high-quality logos for other major brokers
  'OANDA': 'https://logo.clearbit.com/oanda.com',
  'IC Markets': 'https://logo.clearbit.com/icmarkets.com',
  'Interactive Brokers': 'https://logo.clearbit.com/interactivebrokers.com',
  'FxPro': 'https://logo.clearbit.com/fxpro.com',
  'Saxo Bank': 'https://logo.clearbit.com/saxobank.com',
  'Plus500': 'https://logo.clearbit.com/plus500.com',
  'Capital.com': 'https://logo.clearbit.com/capital.com',
  'BlackBull Markets': 'https://logo.clearbit.com/blackbull.com',
  'XTB': 'https://logo.clearbit.com/xtb.com',
  'Charles Schwab': 'https://logo.clearbit.com/schwab.com',
  'TD Ameritrade': 'https://logo.clearbit.com/tdameritrade.com',
  'E*TRADE': 'https://logo.clearbit.com/etrade.com',
  'Robinhood': 'https://logo.clearbit.com/robinhood.com',
  'Coinbase': 'https://logo.clearbit.com/coinbase.com',
  'Binance': 'https://logo.clearbit.com/binance.com',
  'Kraken': 'https://logo.clearbit.com/kraken.com',
  'Gemini': 'https://logo.clearbit.com/gemini.com',
  'Bitfinex': 'https://logo.clearbit.com/bitfinex.com',
  'Stake': 'https://logo.clearbit.com/stake.com',
  'Mirae Asset': 'https://logo.clearbit.com/miraeasset.com',
  'SogoTrade': 'https://logo.clearbit.com/sogotrade.com',
  'Cannon Trading': 'https://logo.clearbit.com/cannontrading.com',
  'Daniels Trading': 'https://logo.clearbit.com/danielstrading.com'
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

// Function to check if current logo is placeholder or needs update
function needsLogoUpdate(currentLogoUrl, newLogoUrl) {
  if (!currentLogoUrl) return true;
  
  const placeholderPatterns = [
    'placehold.co',
    'ui-avatars.com',
    'placeholder',
    'fallback',
    'generic-broker-logo',
    'example.com',
    'localhost',
    '/images/brokers/' // Local images should be replaced with CDN versions
  ];
  
  const isPlaceholder = placeholderPatterns.some(pattern => currentLogoUrl.includes(pattern));
  const isDifferent = currentLogoUrl !== newLogoUrl;
  
  return isPlaceholder || isDifferent;
}

async function updateRemainingLogos() {
  console.log('🚀 Starting remaining logo updates...\n');
  
  try {
    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let notFoundCount = 0;
    
    // Process each broker in our remaining logo list
    for (const [brokerName, logoUrl] of Object.entries(REMAINING_LOGO_UPDATES)) {
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
      
      // Check if broker needs logo update
      const needsUpdate = needsLogoUpdate(broker.logo_url, logoUrl);
      
      if (!needsUpdate) {
        console.log(`✅ ${brokerName} already has the correct logo`);
        skippedCount++;
        continue;
      }
      
      // Validate the new logo URL
      console.log(`🔍 Validating logo URL for ${brokerName}...`);
      const isValid = await validateLogoUrl(logoUrl);
      
      if (!isValid) {
        console.log(`❌ Invalid logo URL for ${brokerName}: ${logoUrl}`);
        errorCount++;
        continue;
      }
      
      // Update the broker logo
      const { data, error: updateError } = await supabase
        .from('brokers')
        .update({ logo_url: logoUrl })
        .eq('id', broker.id)
        .select();
      
      if (updateError) {
        console.error(`❌ Error updating ${brokerName}:`, updateError);
        errorCount++;
      } else {
        console.log(`✅ ${brokerName} logo updated successfully`);
        console.log(`   Old: ${broker.logo_url || 'None'}`);
        console.log(`   New: ${logoUrl}`);
        updatedCount++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
      console.log(''); // Empty line for readability
    }
    
    // Summary
    console.log('\n📊 REMAINING LOGO UPDATE SUMMARY:');
    console.log(`✅ Updated: ${updatedCount} brokers`);
    console.log(`⏭️  Skipped: ${skippedCount} brokers (already correct)`);
    console.log(`❌ Errors: ${errorCount} brokers`);
    console.log(`❓ Not found: ${notFoundCount} brokers`);
    console.log(`📊 Total processed: ${Object.keys(REMAINING_LOGO_UPDATES).length} brokers`);
    
    if (updatedCount > 0) {
      console.log('\n🎉 Remaining logo updates completed successfully!');
    }
    
  } catch (error) {
    console.error('❌ Error in remaining logo update process:', error);
  }
}

// Function to check all brokers for missing or placeholder logos
async function auditAllBrokerLogos() {
  console.log('\n🔍 Auditing all broker logos...\n');
  
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
    
    let needsUpdate = 0;
    let hasValidLogo = 0;
    let missingLogos = [];
    
    // Check each broker
    for (const broker of brokers) {
      const needsLogoUpdate = !broker.logo_url || 
        broker.logo_url.includes('placehold.co') ||
        broker.logo_url.includes('ui-avatars.com') ||
        broker.logo_url.includes('placeholder') ||
        broker.logo_url.includes('fallback') ||
        broker.logo_url.includes('generic-broker-logo');
      
      if (needsLogoUpdate) {
        console.log(`❌ ${broker.name}: Needs logo update (${broker.logo_url || 'No logo'})`);
        needsUpdate++;
        missingLogos.push(broker.name);
      } else {
        console.log(`✅ ${broker.name}: Has valid logo`);
        hasValidLogo++;
      }
    }
    
    console.log('\n📊 AUDIT SUMMARY:');
    console.log(`✅ Brokers with valid logos: ${hasValidLogo}`);
    console.log(`❌ Brokers needing logo updates: ${needsUpdate}`);
    
    if (missingLogos.length > 0) {
      console.log('\n📝 Brokers still needing logos:');
      missingLogos.forEach(name => console.log(`   - ${name}`));
    }
    
  } catch (error) {
    console.error('❌ Error in audit:', error);
  }
}

// Run the updates and then audit
async function main() {
  await updateRemainingLogos();
  await auditAllBrokerLogos();
}

main();
