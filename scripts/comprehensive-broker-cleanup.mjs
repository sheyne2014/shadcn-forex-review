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
    'Nubank': 'https://logo.clearbit.com/nubank.com.br',
    'Tradovate': 'https://logo.clearbit.com/tradovate.com',
    'CMC Markets': 'https://logo.clearbit.com/cmcmarkets.com',
    'Degiro': 'https://logo.clearbit.com/degiro.com',
    'Tastyworks': 'https://logo.clearbit.com/tastyworks.com',
    'TradeStation': 'https://logo.clearbit.com/tradestation.com',
    'Upstox': 'https://logo.clearbit.com/upstox.com',
    'Mirae Asset': 'https://logo.clearbit.com/miraeasset.com',
    'Bitstamp': 'https://logo.clearbit.com/bitstamp.com'
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

// Main cleanup function
async function comprehensiveBrokerCleanup() {
  console.log('🧹 Starting comprehensive broker cleanup...');
  
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
    
    // Step 1: Find and remove duplicates
    console.log('\n🔍 Step 1: Finding duplicates...');
    const brokerGroups = {};
    brokers.forEach(broker => {
      const key = broker.name.toLowerCase().trim();
      if (!brokerGroups[key]) {
        brokerGroups[key] = [];
      }
      brokerGroups[key].push(broker);
    });
    
    const duplicates = Object.entries(brokerGroups).filter(([_, group]) => group.length > 1);
    console.log(`Found ${duplicates.length} duplicate broker groups`);
    
    // Remove duplicates (keep the one with the best data)
    for (const [name, group] of duplicates) {
      console.log(`\n🔄 Processing duplicates for: ${name}`);
      
      // Sort by quality (prefer non-placeholder logos, higher ratings, more complete data)
      const sorted = group.sort((a, b) => {
        // Prefer non-placeholder logos
        const aHasGoodLogo = !isPlaceholderLogo(a.logo_url) ? 1 : 0;
        const bHasGoodLogo = !isPlaceholderLogo(b.logo_url) ? 1 : 0;
        if (aHasGoodLogo !== bHasGoodLogo) return bHasGoodLogo - aHasGoodLogo;
        
        // Prefer higher ratings
        const aRating = a.rating || 0;
        const bRating = b.rating || 0;
        if (aRating !== bRating) return bRating - aRating;
        
        // Prefer more complete data (more fields filled)
        const aFields = Object.values(a).filter(v => v !== null && v !== '').length;
        const bFields = Object.values(b).filter(v => v !== null && v !== '').length;
        return bFields - aFields;
      });
      
      const keepBroker = sorted[0];
      const removeBrokers = sorted.slice(1);
      
      console.log(`   Keeping: ${keepBroker.id} (${keepBroker.name})`);
      
      // Remove duplicates
      for (const broker of removeBrokers) {
        console.log(`   Removing: ${broker.id} (${broker.name})`);
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
    
    // Step 2: Update logos
    console.log('\n🎨 Step 2: Updating logos...');
    
    // Fetch updated broker list after duplicate removal
    const { data: updatedBrokers, error: fetchError } = await supabase
      .from('brokers')
      .select('*')
      .order('name');
    
    if (fetchError) {
      console.error('❌ Error fetching updated brokers:', fetchError);
      return;
    }
    
    let logoUpdates = 0;
    
    for (const broker of updatedBrokers) {
      const needsUpdate = isPlaceholderLogo(broker.logo_url);
      const officialLogoUrl = getOfficialLogoUrl(broker.name);
      
      if (needsUpdate && officialLogoUrl) {
        console.log(`🔄 Updating ${broker.name} logo...`);
        
        const { error: updateError } = await supabase
          .from('brokers')
          .update({ logo_url: officialLogoUrl })
          .eq('id', broker.id);
        
        if (updateError) {
          console.error(`❌ Error updating ${broker.name}:`, updateError);
        } else {
          console.log(`✅ ${broker.name} logo updated`);
          logoUpdates++;
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    // Step 3: Ensure BlackBull Markets is properly configured
    console.log('\n🎯 Step 3: Checking BlackBull Markets...');
    
    const { data: blackbullData, error: blackbullError } = await supabase
      .from('brokers')
      .select('*')
      .eq('name', 'BlackBull Markets');
    
    if (blackbullError) {
      console.error('❌ Error checking BlackBull Markets:', blackbullError);
    } else if (blackbullData && blackbullData.length > 0) {
      const blackbull = blackbullData[0];
      console.log(`✅ BlackBull Markets found: ${blackbull.id}`);
      
      // Update with latest data if needed
      const updates = {};
      if (blackbull.rating !== 4.8) updates.rating = 4.8;
      if (blackbull.logo_url !== 'https://logo.clearbit.com/blackbull.com') {
        updates.logo_url = 'https://logo.clearbit.com/blackbull.com';
      }
      if (!blackbull.supported_assets || !blackbull.supported_assets.includes('Forex')) {
        updates.supported_assets = ['Forex', 'CFDs', 'Stocks', 'Crypto', 'Commodities'];
      }
      
      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from('brokers')
          .update(updates)
          .eq('id', blackbull.id);
        
        if (updateError) {
          console.error('❌ Error updating BlackBull Markets:', updateError);
        } else {
          console.log('✅ BlackBull Markets updated with latest data');
        }
      }
    } else {
      console.log('⚠️  BlackBull Markets not found - adding it...');
      
      const { error: insertError } = await supabase
        .from('brokers')
        .insert({
          name: 'BlackBull Markets',
          logo_url: 'https://logo.clearbit.com/blackbull.com',
          min_deposit: 200,
          trading_fee: 0.0,
          regulations: 'FMA, FSA, ASIC, FCA',
          supported_assets: ['Forex', 'CFDs', 'Stocks', 'Crypto', 'Commodities'],
          country: 'New Zealand',
          rating: 4.8,
          website_url: 'https://blackbull.com',
          max_leverage: '1:500',
          trading_platforms: 'MT4, MT5, BlackBull CopyTrader, TradingView',
          spread_from: '0.0 pips',
          headquarters: 'Auckland, New Zealand',
          year_founded: '2014'
        });
      
      if (insertError) {
        console.error('❌ Error adding BlackBull Markets:', insertError);
      } else {
        console.log('✅ BlackBull Markets added successfully');
      }
    }
    
    // Final report
    console.log('\n📋 CLEANUP RESULTS:');
    console.log(`✅ Removed ${duplicates.length} duplicate groups`);
    console.log(`🎨 Updated ${logoUpdates} logos`);
    console.log(`🎯 BlackBull Markets verified/added`);
    
    console.log('\n🎉 Comprehensive broker cleanup completed!');
    
  } catch (error) {
    console.error('❌ Error in broker cleanup:', error);
  }
}

// Run the cleanup
comprehensiveBrokerCleanup();
