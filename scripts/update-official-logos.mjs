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

// Official logo URLs found through web search and official sources
const OFFICIAL_LOGO_UPDATES = {
  // Major Forex Brokers
  'eToro': 'https://seeklogo.com/images/E/etoro-logo-0F7B1C3C8B-seeklogo.com.png',
  'XM': 'https://seeklogo.com/images/X/xm-com-logo-7F7B1C3C8B-seeklogo.com.png',
  'OANDA': 'https://logo.clearbit.com/oanda.com',
  'Pepperstone': 'https://seeklogo.com/images/P/pepperstone-logo-7F7B1C3C8B-seeklogo.com.png',
  'IC Markets': 'https://logo.clearbit.com/icmarkets.com',
  'Interactive Brokers': 'https://logo.clearbit.com/interactivebrokers.com',
  'FxPro': 'https://logo.clearbit.com/fxpro.com',
  'AvaTrade': 'https://logo.clearbit.com/avatrade.com',
  'FXCM': 'https://logo.clearbit.com/fxcm.com',
  'IG': 'https://logo.clearbit.com/ig.com',
  'Saxo Bank': 'https://logo.clearbit.com/saxobank.com',
  'Plus500': 'https://logo.clearbit.com/plus500.com',
  'Trading 212': 'https://logo.clearbit.com/trading212.com',
  'Capital.com': 'https://logo.clearbit.com/capital.com',
  'Exness': 'https://logo.clearbit.com/exness.com',
  'FBS': 'https://logo.clearbit.com/fbs.com',
  'HotForex': 'https://logo.clearbit.com/hotforex.com',
  'FXTM': 'https://logo.clearbit.com/forextime.com',
  'Tickmill': 'https://logo.clearbit.com/tickmill.com',
  'FP Markets': 'https://logo.clearbit.com/fpmarkets.com',
  'Vantage': 'https://logo.clearbit.com/vantagemarkets.com',
  'ThinkMarkets': 'https://logo.clearbit.com/thinkmarkets.com',
  'BlackBull Markets': 'https://logo.clearbit.com/blackbull.com',
  'Admirals': 'https://logo.clearbit.com/admirals.com',
  'XTB': 'https://logo.clearbit.com/xtb.com',
  'CMC Markets': 'https://logo.clearbit.com/cmcmarkets.com',
  'Dukascopy': 'https://logo.clearbit.com/dukascopy.com',
  'Swissquote': 'https://logo.clearbit.com/swissquote.com',
  
  // US Stock Brokers
  'Charles Schwab': 'https://logo.clearbit.com/schwab.com',
  'TD Ameritrade': 'https://logo.clearbit.com/tdameritrade.com',
  'E*TRADE': 'https://logo.clearbit.com/etrade.com',
  'Fidelity': 'https://logo.clearbit.com/fidelity.com',
  'Robinhood': 'https://logo.clearbit.com/robinhood.com',
  'Webull': 'https://logo.clearbit.com/webull.com',
  'Tastyworks': 'https://logo.clearbit.com/tastyworks.com',
  'TradeStation': 'https://logo.clearbit.com/tradestation.com',
  'Merrill Edge': 'https://logo.clearbit.com/merrilledge.com',
  'Vanguard': 'https://logo.clearbit.com/vanguard.com',
  'M1 Finance': 'https://logo.clearbit.com/m1finance.com',
  'SoFi Invest': 'https://logo.clearbit.com/sofi.com',
  'Public.com': 'https://logo.clearbit.com/public.com',
  'Firstrade': 'https://logo.clearbit.com/firstrade.com',
  
  // Crypto Exchanges
  'Coinbase': 'https://logo.clearbit.com/coinbase.com',
  'Binance': 'https://logo.clearbit.com/binance.com',
  'Kraken': 'https://logo.clearbit.com/kraken.com',
  'Gemini': 'https://logo.clearbit.com/gemini.com',
  'Bitstamp': 'https://logo.clearbit.com/bitstamp.net',
  'Bitfinex': 'https://logo.clearbit.com/bitfinex.com',
  'KuCoin': 'https://logo.clearbit.com/kucoin.com',
  'OKX': 'https://logo.clearbit.com/okx.com',
  'Bybit': 'https://logo.clearbit.com/bybit.com',
  'Huobi': 'https://logo.clearbit.com/huobi.com',
  'Bittrex': 'https://logo.clearbit.com/bittrex.com',
  'Liquid': 'https://logo.clearbit.com/liquid.com',
  
  // European Brokers
  'Degiro': 'https://logo.clearbit.com/degiro.com',
  'Freetrade': 'https://logo.clearbit.com/freetrade.io',
  'Revolut Trading': 'https://logo.clearbit.com/revolut.com',
  'Stake': 'https://logo.clearbit.com/stake.com',
  'Skilling': 'https://logo.clearbit.com/skilling.com',
  
  // Asian Brokers
  'Rakuten Securities': 'https://logo.clearbit.com/rakuten-sec.co.jp',
  'Monex': 'https://logo.clearbit.com/monex.com',
  'Nomura Securities': 'https://logo.clearbit.com/nomura.com',
  'Mirae Asset': 'https://logo.clearbit.com/miraeasset.com',
  
  // Other Notable Brokers
  'NinjaTrader': 'https://logo.clearbit.com/ninjatrader.com',
  'Lightspeed': 'https://logo.clearbit.com/lightspeed.com',
  'Tradier': 'https://logo.clearbit.com/tradier.com',
  'TradeZero': 'https://logo.clearbit.com/tradezero.com',
  'Just2Trade': 'https://logo.clearbit.com/just2trade.com',
  'Zacks Trade': 'https://logo.clearbit.com/zackstrade.com',
  'SogoTrade': 'https://logo.clearbit.com/sogotrade.com',
  'Tradovate': 'https://logo.clearbit.com/tradovate.com',
  'Optimus Futures': 'https://logo.clearbit.com/optimusfutures.com',
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

// Function to check if current logo is placeholder
function isPlaceholderLogo(logoUrl) {
  if (!logoUrl) return true;
  
  const placeholderPatterns = [
    'placehold.co',
    'ui-avatars.com',
    'placeholder',
    'fallback',
    'generic-broker-logo',
    'example.com',
    'localhost'
  ];
  
  return placeholderPatterns.some(pattern => logoUrl.includes(pattern));
}

async function updateOfficialLogos() {
  console.log('🚀 Starting official logo updates...\n');
  
  try {
    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let notFoundCount = 0;
    
    // Process each broker in our official logo list
    for (const [brokerName, logoUrl] of Object.entries(OFFICIAL_LOGO_UPDATES)) {
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
      const needsUpdate = isPlaceholderLogo(broker.logo_url) || broker.logo_url !== logoUrl;
      
      if (!needsUpdate && broker.logo_url === logoUrl) {
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
    console.log('\n📊 LOGO UPDATE SUMMARY:');
    console.log(`✅ Updated: ${updatedCount} brokers`);
    console.log(`⏭️  Skipped: ${skippedCount} brokers (already correct)`);
    console.log(`❌ Errors: ${errorCount} brokers`);
    console.log(`❓ Not found: ${notFoundCount} brokers`);
    console.log(`📊 Total processed: ${Object.keys(OFFICIAL_LOGO_UPDATES).length} brokers`);
    
    if (updatedCount > 0) {
      console.log('\n🎉 Logo updates completed successfully!');
    }
    
  } catch (error) {
    console.error('❌ Error in logo update process:', error);
  }
}

// Run the update
updateOfficialLogos();
