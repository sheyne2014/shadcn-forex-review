import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Function to get official logo URL for a broker
function getOfficialLogoUrl(brokerName) {
  const logoMappings = {
    'TD Ameritrade': 'https://logo.clearbit.com/tdameritrade.com',
    'Charles Schwab': 'https://logo.clearbit.com/schwab.com',
    'BlackBull Markets': 'https://logo.clearbit.com/blackbull.com',
    'Interactive Brokers': 'https://logo.clearbit.com/interactivebrokers.com',
    'eToro': 'https://logo.clearbit.com/etoro.com',
    'XM': 'https://logo.clearbit.com/xm.com',
    'IC Markets': 'https://logo.clearbit.com/icmarkets.com',
    'Pepperstone': 'https://logo.clearbit.com/pepperstone.com',
    'OANDA': 'https://logo.clearbit.com/oanda.com',
    'Plus500': 'https://logo.clearbit.com/plus500.com',
    'Capital.com': 'https://logo.clearbit.com/capital.com',
    'Saxo Bank': 'https://logo.clearbit.com/saxobank.com',
    'XTB': 'https://logo.clearbit.com/xtb.com',
    'Binance': 'https://logo.clearbit.com/binance.com',
    'Coinbase': 'https://logo.clearbit.com/coinbase.com',
    'Kraken': 'https://logo.clearbit.com/kraken.com',
    'Gemini': 'https://logo.clearbit.com/gemini.com',
    'FXCM': 'https://logo.clearbit.com/fxcm.com',
    'AvaTrade': 'https://logo.clearbit.com/avatrade.com',
    'FxPro': 'https://logo.clearbit.com/fxpro.com',
    'LMAX': 'https://logo.clearbit.com/lmax.com',
    'HotForex': 'https://logo.clearbit.com/hotforex.com',
    'FXOpen': 'https://logo.clearbit.com/fxopen.com',
    'Tickmill': 'https://logo.clearbit.com/tickmill.com',
    'Exness': 'https://logo.clearbit.com/exness.com',
    'Admiral Markets': 'https://logo.clearbit.com/admiralmarkets.com',
    'ThinkMarkets': 'https://logo.clearbit.com/thinkmarkets.com',
    'FXTM': 'https://logo.clearbit.com/fxtm.com',
    'Dukascopy': 'https://logo.clearbit.com/dukascopy.com',
    'Trading 212': 'https://logo.clearbit.com/trading212.com',
    'M1 Finance': 'https://logo.clearbit.com/m1finance.com',
    'Webull': 'https://logo.clearbit.com/webull.com',
    'Robinhood': 'https://logo.clearbit.com/robinhood.com',
    'Fidelity': 'https://logo.clearbit.com/fidelity.com',
    'E*TRADE': 'https://logo.clearbit.com/etrade.com',
    'Merrill Edge': 'https://logo.clearbit.com/merrilledge.com',
    'Ally Invest': 'https://logo.clearbit.com/ally.com',
    'Vanguard': 'https://logo.clearbit.com/vanguard.com',
    'thinkorswim': 'https://logo.clearbit.com/tdameritrade.com',
    'Nubank': 'https://logo.clearbit.com/nubank.com.br'
  };
  
  return logoMappings[brokerName] || null;
}

// Function to check if a logo URL is a placeholder
function isPlaceholderLogo(logoUrl) {
  if (!logoUrl) return true;
  
  const placeholderPatterns = [
    'placehold.co',
    'ui-avatars.com',
    'placeholder',
    'fallback',
    'text='
  ];
  
  return placeholderPatterns.some(pattern => logoUrl.includes(pattern));
}

// Main audit function
async function comprehensiveLogoAudit() {
  console.log('🔍 Starting comprehensive logo audit...');
  
  try {
    // Fetch all brokers from database
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('❌ Error fetching brokers:', error);
      return;
    }
    
    console.log(`📊 Found ${brokers.length} brokers in database`);
    
    let updatedCount = 0;
    let missingLogos = [];
    let conflictingLogos = [];
    
    // Check for logo conflicts first
    const logoGroups = {};
    brokers.forEach(broker => {
      if (broker.logo_url && !isPlaceholderLogo(broker.logo_url)) {
        if (!logoGroups[broker.logo_url]) {
          logoGroups[broker.logo_url] = [];
        }
        logoGroups[broker.logo_url].push(broker.name);
      }
    });
    
    // Find conflicts
    Object.entries(logoGroups).forEach(([logoUrl, brokerNames]) => {
      if (brokerNames.length > 1) {
        conflictingLogos.push({ logoUrl, brokers: brokerNames });
      }
    });
    
    if (conflictingLogos.length > 0) {
      console.log('\n⚠️  LOGO CONFLICTS DETECTED:');
      conflictingLogos.forEach(conflict => {
        console.log(`   ${conflict.logoUrl} used by: ${conflict.brokers.join(', ')}`);
      });
    }
    
    // Process each broker
    for (const broker of brokers) {
      const needsUpdate = isPlaceholderLogo(broker.logo_url);
      const officialLogoUrl = getOfficialLogoUrl(broker.name);
      
      if (needsUpdate && officialLogoUrl) {
        console.log(`🔄 Updating ${broker.name} logo...`);
        
        const { data, error: updateError } = await supabase
          .from('brokers')
          .update({ logo_url: officialLogoUrl })
          .eq('id', broker.id)
          .select();
        
        if (updateError) {
          console.error(`❌ Error updating ${broker.name}:`, updateError);
        } else {
          console.log(`✅ ${broker.name} logo updated`);
          updatedCount++;
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } else if (needsUpdate && !officialLogoUrl) {
        missingLogos.push(broker.name);
      }
    }
    
    // Report results
    console.log('\n📋 AUDIT RESULTS:');
    console.log(`✅ Updated logos: ${updatedCount}`);
    console.log(`⚠️  Logo conflicts: ${conflictingLogos.length}`);
    console.log(`❌ Missing official logos: ${missingLogos.length}`);
    
    if (missingLogos.length > 0) {
      console.log('\n🔍 Brokers needing manual logo research:');
      missingLogos.forEach(name => console.log(`   - ${name}`));
    }
    
    console.log('\n🎉 Logo audit completed!');
    
  } catch (error) {
    console.error('❌ Error in logo audit:', error);
  }
}

// Run the audit
comprehensiveLogoAudit();
