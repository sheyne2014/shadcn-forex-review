import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Official logo mappings for major brokers
const OFFICIAL_LOGOS = {
  'eToro': 'https://logo.clearbit.com/etoro.com',
  'XM': 'https://logo.clearbit.com/xm.com',
  'OANDA': 'https://logo.clearbit.com/oanda.com',
  'Pepperstone': 'https://logo.clearbit.com/pepperstone.com',
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
  'Charles Schwab': 'https://logo.clearbit.com/schwab.com',
  'TD Ameritrade': 'https://logo.clearbit.com/tdameritrade.com',
  'E*TRADE': 'https://logo.clearbit.com/etrade.com',
  'Fidelity': 'https://logo.clearbit.com/fidelity.com',
  'Robinhood': 'https://logo.clearbit.com/robinhood.com',
  'Webull': 'https://logo.clearbit.com/webull.com',
  'Tastyworks': 'https://logo.clearbit.com/tastyworks.com',
  'TradeStation': 'https://logo.clearbit.com/tradestation.com',
  'Coinbase': 'https://logo.clearbit.com/coinbase.com',
  'Binance': 'https://logo.clearbit.com/binance.com',
  'Kraken': 'https://logo.clearbit.com/kraken.com',
  'Gemini': 'https://logo.clearbit.com/gemini.com',
  'Bitstamp': 'https://logo.clearbit.com/bitstamp.net',
  'Bitfinex': 'https://logo.clearbit.com/bitfinex.com',
  'KuCoin': 'https://logo.clearbit.com/kucoin.com',
  'OKX': 'https://logo.clearbit.com/okx.com',
  'Bybit': 'https://logo.clearbit.com/bybit.com',
  'Huobi': 'https://logo.clearbit.com/huobi.com'
};

// Function to check if a logo URL is a placeholder
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

// Function to validate if a logo URL is accessible
async function validateLogoUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch (error) {
    return false;
  }
}

// Function to search for broker logo using web search
async function searchBrokerLogo(brokerName) {
  try {
    // Try multiple search strategies
    const searchQueries = [
      `${brokerName} official logo`,
      `${brokerName} broker logo`,
      `${brokerName} trading platform logo`,
      `${brokerName} company logo`
    ];
    
    // For now, we'll use the Clearbit API approach
    // In a real implementation, you would integrate with Google Custom Search API
    const domain = getBrokerDomain(brokerName);
    if (domain) {
      const clearbitUrl = `https://logo.clearbit.com/${domain}`;
      const isValid = await validateLogoUrl(clearbitUrl);
      if (isValid) {
        return clearbitUrl;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error searching for ${brokerName} logo:`, error);
    return null;
  }
}

// Function to get broker domain from name
function getBrokerDomain(brokerName) {
  const domainMappings = {
    'eToro': 'etoro.com',
    'XM': 'xm.com',
    'OANDA': 'oanda.com',
    'Pepperstone': 'pepperstone.com',
    'IC Markets': 'icmarkets.com',
    'Interactive Brokers': 'interactivebrokers.com',
    'FxPro': 'fxpro.com',
    'AvaTrade': 'avatrade.com',
    'FXCM': 'fxcm.com',
    'IG': 'ig.com',
    'Saxo Bank': 'saxobank.com',
    'Plus500': 'plus500.com',
    'Trading 212': 'trading212.com',
    'Capital.com': 'capital.com',
    'Exness': 'exness.com',
    'FBS': 'fbs.com',
    'HotForex': 'hotforex.com',
    'FXTM': 'forextime.com',
    'Tickmill': 'tickmill.com',
    'FP Markets': 'fpmarkets.com',
    'Vantage': 'vantagemarkets.com',
    'ThinkMarkets': 'thinkmarkets.com',
    'BlackBull Markets': 'blackbull.com',
    'Admirals': 'admirals.com',
    'XTB': 'xtb.com',
    'CMC Markets': 'cmcmarkets.com',
    'Dukascopy': 'dukascopy.com',
    'Swissquote': 'swissquote.com',
    'Charles Schwab': 'schwab.com',
    'TD Ameritrade': 'tdameritrade.com',
    'E*TRADE': 'etrade.com',
    'Fidelity': 'fidelity.com',
    'Robinhood': 'robinhood.com',
    'Webull': 'webull.com',
    'Tastyworks': 'tastyworks.com',
    'TradeStation': 'tradestation.com',
    'Coinbase': 'coinbase.com',
    'Binance': 'binance.com',
    'Kraken': 'kraken.com',
    'Gemini': 'gemini.com',
    'Bitstamp': 'bitstamp.net',
    'Bitfinex': 'bitfinex.com',
    'KuCoin': 'kucoin.com',
    'OKX': 'okx.com',
    'Bybit': 'bybit.com',
    'Huobi': 'huobi.com'
  };
  
  return domainMappings[brokerName] || null;
}

// Main function to update all broker logos
async function updateAllBrokerLogos() {
  console.log('🚀 Starting comprehensive broker logo update...\n');
  
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
    
    console.log(`📊 Found ${brokers.length} brokers in database\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    // Process each broker
    for (const broker of brokers) {
      console.log(`🔍 Processing: ${broker.name}`);
      
      // Check if broker needs logo update
      const needsUpdate = isPlaceholderLogo(broker.logo_url);
      
      if (!needsUpdate) {
        console.log(`✅ ${broker.name} already has a valid logo`);
        skippedCount++;
        continue;
      }
      
      // Try to find official logo
      let newLogoUrl = null;
      
      // First, check our official mappings
      if (OFFICIAL_LOGOS[broker.name]) {
        newLogoUrl = OFFICIAL_LOGOS[broker.name];
        console.log(`📋 Using official mapping for ${broker.name}`);
      } else {
        // Search for logo using web search
        console.log(`🔍 Searching for ${broker.name} logo...`);
        newLogoUrl = await searchBrokerLogo(broker.name);
      }
      
      if (newLogoUrl) {
        // Validate the logo URL
        const isValid = await validateLogoUrl(newLogoUrl);
        
        if (isValid) {
          // Update the broker logo in database
          const { data, error: updateError } = await supabase
            .from('brokers')
            .update({ logo_url: newLogoUrl })
            .eq('id', broker.id)
            .select();
          
          if (updateError) {
            console.error(`❌ Error updating ${broker.name}:`, updateError);
            errorCount++;
          } else {
            console.log(`✅ ${broker.name} logo updated successfully`);
            updatedCount++;
          }
        } else {
          console.log(`⚠️  Invalid logo URL for ${broker.name}: ${newLogoUrl}`);
          errorCount++;
        }
      } else {
        console.log(`❌ No logo found for ${broker.name}`);
        errorCount++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
      console.log(''); // Empty line for readability
    }
    
    // Summary
    console.log('\n📊 LOGO UPDATE SUMMARY:');
    console.log(`✅ Updated: ${updatedCount} brokers`);
    console.log(`⏭️  Skipped: ${skippedCount} brokers (already have valid logos)`);
    console.log(`❌ Errors: ${errorCount} brokers`);
    console.log(`📊 Total processed: ${brokers.length} brokers`);
    
  } catch (error) {
    console.error('❌ Error in logo update process:', error);
  }
}

// Run the update
updateAllBrokerLogos();
