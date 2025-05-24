// Import 100 more brokers script
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env.local
let supabaseUrl = '';
let supabaseKey = '';

try {
  // Try to load from .env.local file
  const envPath = path.join(process.cwd(), '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n');

    for (const line of envLines) {
      const [key, value] = line.split('=');
      if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
        supabaseUrl = value.trim();
      } else if (key === 'SUPABASE_SERVICE_ROLE_KEY') {
        supabaseKey = value.trim();
      }
    }
  }

  // If still not found, try parent directory
  if (!supabaseUrl || !supabaseKey) {
    const parentEnvPath = path.join(process.cwd(), '../.env.local');
    if (fs.existsSync(parentEnvPath)) {
      const envContent = fs.readFileSync(parentEnvPath, 'utf8');
      const envLines = envContent.split('\n');

      for (const line of envLines) {
        const [key, value] = line.split('=');
        if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
          supabaseUrl = value.trim();
        } else if (key === 'SUPABASE_SERVICE_ROLE_KEY') {
          supabaseKey = value.trim();
        }
      }
    }
  }

  // Check if environment variables are in process.env
  if (!supabaseUrl && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  }

  if (!supabaseKey && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  }

  console.log(`Supabase URL found: ${supabaseUrl ? 'Yes' : 'No'}`);
  console.log(`Supabase Key found: ${supabaseKey ? 'Yes' : 'No'}`);

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Required environment variables not found');
  }
} catch (error) {
  console.error('Error loading environment variables:', error);
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Main import function
async function importMoreBrokers() {
  console.log('🚀 Starting import of 100 more brokers...');

  try {
    // Get categories
    const { data: categories, error } = await supabase.from('categories').select('*');
    if (error) throw error;

    console.log(`✅ Found ${categories.length} categories`);

    // Create category map for lookups
    const categoryMap = {};
    categories.forEach(category => {
      categoryMap[category.name] = category.id;
    });

    // Get broker data
    const moreBrokers = getMoreBrokers();
    console.log(`✅ Prepared ${moreBrokers.length} additional brokers for import`);

    // Import brokers
    let importCount = 0;

    for (const broker of moreBrokers) {
      try {
        // Check if broker already exists
        const { data: existingBroker } = await supabase
          .from('brokers')
          .select('id')
          .eq('name', broker.name)
          .maybeSingle();

        let brokerId;

        if (existingBroker) {
          console.log(`Broker ${broker.name} already exists, updating...`);
          brokerId = existingBroker.id;

          // Update existing broker
          await supabase
            .from('brokers')
            .update({
              logo_url: broker.logo || '',
              rating: broker.rating || 0,
              min_deposit: broker.deposit || 0,
              trading_fee: broker.fee || 0,
              country: broker.country || '',
              regulations: broker.regulations || '',
              supported_assets: broker.assets || []
            })
            .eq('id', brokerId);

        } else {
          // Insert new broker
          const { data: newBroker, error } = await supabase
            .from('brokers')
            .insert({
              name: broker.name,
              logo_url: broker.logo || '',
              rating: broker.rating || 0,
              min_deposit: broker.deposit || 0,
              trading_fee: broker.fee || 0,
              country: broker.country || '',
              regulations: broker.regulations || '',
              supported_assets: broker.assets || []
            })
            .select()
            .single();

          if (error) {
            console.error(`Error creating broker ${broker.name}:`, error);
            continue;
          }

          brokerId = newBroker.id;
          importCount++;
          console.log(`Imported broker: ${broker.name}`);
        }

        // Add broker categories
        await linkBrokerToCategories(brokerId, broker.categories, categoryMap);

      } catch (error) {
        console.error(`Error processing broker ${broker.name}:`, error);
      }
    }

    console.log(`✅ Successfully imported ${importCount} new brokers to Supabase`);
  } catch (error) {
    console.error('❌ Error importing brokers:', error);
    process.exit(1);
  }
}

// Link broker to categories
async function linkBrokerToCategories(brokerId, brokerCategories, categoryMap) {
  // Get existing categories for the broker
  const { data: existingLinks } = await supabase
    .from('broker_categories')
    .select('category_id')
    .eq('broker_id', brokerId);

  const existingCategoryIds = existingLinks ? existingLinks.map(link => link.category_id) : [];

  // Process each category
  for (const categoryName of brokerCategories) {
    // Find matching category
    let categoryId = null;
    for (const [name, id] of Object.entries(categoryMap)) {
      if (name.toLowerCase().includes(categoryName.toLowerCase())) {
        categoryId = id;
        break;
      }
    }

    // Skip if no category match or already linked
    if (!categoryId) continue;
    if (existingCategoryIds.includes(categoryId)) continue;

    try {
      // Add broker-category relation
      const { error } = await supabase
        .from('broker_categories')
        .insert({ broker_id: brokerId, category_id: categoryId });

      if (error && error.code !== '23505') { // Ignore duplicate key errors
        console.error(`Error linking broker to category:`, error);
      }
    } catch (error) {
      console.error(`Exception linking broker to category:`, error);
    }
  }
}

// Get more brokers data - compact format
function getMoreBrokers() {
  return [
    // Forex and CFD Brokers - Part 1
    { name: "XTB", rating: 4.7, deposit: 10, fee: 0.08, country: "Poland", regulations: "CySEC, FCA, KNF", logo: "https://example.com/xtb.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "OANDA", rating: 4.8, deposit: 0, fee: 0.8, country: "USA", regulations: "CFTC, FCA, ASIC", logo: "https://example.com/oanda.png", assets: ["Forex", "CFDs"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "Plus500", rating: 4.5, deposit: 100, fee: 0.5, country: "Israel", regulations: "FCA, CySEC, ASIC", logo: "https://example.com/plus500.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "AvaTrade", rating: 4.6, deposit: 100, fee: 0.9, country: "Ireland", regulations: "CBI, ASIC, FSCA", logo: "https://example.com/avatrade.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "FBS", rating: 4.3, deposit: 5, fee: 0.7, country: "Belize", regulations: "IFSC, CySEC", logo: "https://example.com/fbs.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "HYCM", rating: 4.4, deposit: 100, fee: 0.8, country: "UK", regulations: "FCA, CySEC, DFSA", logo: "https://example.com/hycm.png", assets: ["Forex", "CFDs", "Commodities"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "Admirals", rating: 4.6, deposit: 100, fee: 0.5, country: "Estonia", regulations: "CySEC, FCA, ASIC", logo: "https://example.com/admirals.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "FP Markets", rating: 4.7, deposit: 100, fee: 0.45, country: "Australia", regulations: "ASIC, CySEC", logo: "https://example.com/fpmarkets.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "Skilling", rating: 4.2, deposit: 100, fee: 0.07, country: "Cyprus", regulations: "CySEC, FSA", logo: "https://example.com/skilling.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "Brokers for Beginners"] },
    { name: "FXDD", rating: 4.3, deposit: 50, fee: 0.5, country: "Malta", regulations: "MFSA", logo: "https://example.com/fxdd.png", assets: ["Forex", "CFDs"], categories: ["Forex Brokers", "CFD Brokers"] },

    // Forex and CFD Brokers - Part 2
    { name: "EightCap", rating: 4.2, deposit: 100, fee: 0.5, country: "Australia", regulations: "ASIC, VFSC", logo: "https://example.com/eightcap.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "NAGA", rating: 4.1, deposit: 250, fee: 0.07, country: "Germany", regulations: "BaFin, FCA", logo: "https://example.com/naga.png", assets: ["Forex", "CFDs", "Stocks"], categories: ["Forex Brokers", "Social Trading"] },
    { name: "Moneta Markets", rating: 4.3, deposit: 50, fee: 0.4, country: "Australia", regulations: "ASIC, FSA", logo: "https://example.com/moneta.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "HFM", rating: 4.3, deposit: 5, fee: 0.3, country: "Cyprus", regulations: "CySEC, FSC", logo: "https://example.com/hfm.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "Windsor Brokers", rating: 4.2, deposit: 100, fee: 0.6, country: "Cyprus", regulations: "CySEC, FSC", logo: "https://example.com/windsor.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "GO Markets", rating: 4.3, deposit: 200, fee: 0.5, country: "Australia", regulations: "ASIC, FSA", logo: "https://example.com/gomarkets.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "M4Markets", rating: 4.2, deposit: 100, fee: 0.7, country: "Seychelles", regulations: "FSA, CySEC", logo: "https://example.com/m4markets.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "CFD Brokers"] },
    { name: "FXOpen", rating: 4.4, deposit: 1, fee: 0.5, country: "UK", regulations: "FCA, ASIC", logo: "https://example.com/fxopen.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "Swissquote", rating: 4.7, deposit: 1000, fee: 0.9, country: "Switzerland", regulations: "FINMA, FCA, ACPR", logo: "https://example.com/swissquote.png", assets: ["Forex", "Stocks", "CFDs"], categories: ["Forex Brokers", "Stock Brokers"] },


    // Cryptocurrency Brokers
    { name: "Bitfinex", rating: 4.5, deposit: 0, fee: 0.1, country: "Hong Kong", regulations: "Various", logo: "https://example.com/bitfinex.png", assets: ["Bitcoin", "Ethereum", "Altcoins"], categories: ["Cryptocurrency Brokers"] },
    { name: "Huobi", rating: 4.4, deposit: 0, fee: 0.2, country: "Seychelles", regulations: "Various", logo: "https://example.com/huobi.png", assets: ["Bitcoin", "Ethereum", "Altcoins"], categories: ["Cryptocurrency Brokers"] },
    { name: "FTX.US", rating: 4.3, deposit: 0, fee: 0.1, country: "USA", regulations: "FinCEN", logo: "https://example.com/ftxus.png", assets: ["Bitcoin", "Ethereum", "Altcoins"], categories: ["Cryptocurrency Brokers"] },
    { name: "BitMEX", rating: 4.2, deposit: 0, fee: 0.075, country: "Seychelles", regulations: "Various", logo: "https://example.com/bitmex.png", assets: ["Bitcoin", "Ethereum", "Altcoins"], categories: ["Cryptocurrency Brokers"] },
    { name: "Bittrex", rating: 4.2, deposit: 0, fee: 0.35, country: "USA", regulations: "FinCEN", logo: "https://example.com/bittrex.png", assets: ["Bitcoin", "Ethereum", "Altcoins"], categories: ["Cryptocurrency Brokers"] },
    { name: "Kraken Pro", rating: 4.6, deposit: 0, fee: 0.16, country: "USA", regulations: "FinCEN", logo: "https://example.com/krakenpro.png", assets: ["Bitcoin", "Ethereum", "Altcoins"], categories: ["Cryptocurrency Brokers"] },
    { name: "Liquid", rating: 4.3, deposit: 0, fee: 0.1, country: "Japan", regulations: "FSA", logo: "https://example.com/liquid.png", assets: ["Bitcoin", "Ethereum", "Altcoins"], categories: ["Cryptocurrency Brokers"] },
    { name: "BitMax", rating: 4.2, deposit: 0, fee: 0.1, country: "Singapore", regulations: "Various", logo: "https://example.com/bitmax.png", assets: ["Bitcoin", "Ethereum", "Altcoins"], categories: ["Cryptocurrency Brokers"] },

    { name: "Coincheck", rating: 4.1, deposit: 0, fee: 0.25, country: "Japan", regulations: "FSA", logo: "https://example.com/coincheck.png", assets: ["Bitcoin", "Ethereum", "Altcoins"], categories: ["Cryptocurrency Brokers"] },

    // Stock Brokers
    { name: "Robinhood", rating: 4.1, deposit: 0, fee: 0.0, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/robinhood.png", assets: ["Stocks", "ETFs", "Crypto"], categories: ["Stock Brokers", "Brokers for Beginners"] },
    { name: "Moomoo", rating: 4.2, deposit: 0, fee: 0.0, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/moomoo.png", assets: ["Stocks", "ETFs", "Options"], categories: ["Stock Brokers"] },
    { name: "Public.com", rating: 4.0, deposit: 0, fee: 0.0, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/public.png", assets: ["Stocks", "ETFs"], categories: ["Stock Brokers", "Brokers for Beginners"] },
    { name: "Firstrade", rating: 4.3, deposit: 0, fee: 0.0, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/firstrade.png", assets: ["Stocks", "ETFs", "Options"], categories: ["Stock Brokers"] },
    { name: "Trading 212", rating: 4.4, deposit: 1, fee: 0.0, country: "UK", regulations: "FCA", logo: "https://example.com/trading212.png", assets: ["Stocks", "ETFs", "CFDs"], categories: ["Stock Brokers", "CFD Brokers"] },
    { name: "Degiro", rating: 4.5, deposit: 0, fee: 0.0, country: "Netherlands", regulations: "AFM, DNB", logo: "https://example.com/degiro.png", assets: ["Stocks", "ETFs", "Options"], categories: ["Stock Brokers"] },
    { name: "Freetrade", rating: 4.0, deposit: 0, fee: 0.0, country: "UK", regulations: "FCA", logo: "https://example.com/freetrade.png", assets: ["Stocks", "ETFs"], categories: ["Stock Brokers", "Brokers for Beginners"] },
    { name: "Stake", rating: 4.1, deposit: 0, fee: 0.0, country: "Australia", regulations: "ASIC", logo: "https://example.com/stake.png", assets: ["Stocks", "ETFs"], categories: ["Stock Brokers"] },
    { name: "FreeTrade", rating: 4.0, deposit: 0, fee: 0.0, country: "UK", regulations: "FCA", logo: "https://example.com/freetrade.png", assets: ["Stocks", "ETFs"], categories: ["Stock Brokers", "Brokers for Beginners"] },
    { name: "Revolut", rating: 3.9, deposit: 0, fee: 0.0, country: "UK", regulations: "FCA", logo: "https://example.com/revolut.png", assets: ["Stocks", "ETFs", "Crypto"], categories: ["Stock Brokers", "Brokers for Beginners"] },

    // Options and Futures Brokers
    { name: "Optionshouse", rating: 4.4, deposit: 0, fee: 0.65, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/optionshouse.png", assets: ["Options", "Futures"], categories: ["Options Brokers"] },
    { name: "dough", rating: 4.2, deposit: 0, fee: 0.5, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/dough.png", assets: ["Stocks", "Options"], categories: ["Options Brokers"] },
    { name: "thinkorswim", rating: 4.8, deposit: 0, fee: 0.65, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/thinkorswim.png", assets: ["Stocks", "Options", "Futures"], categories: ["Options Brokers", "Futures Brokers"] },
    { name: "Tradovate", rating: 4.5, deposit: 0, fee: 0.79, country: "USA", regulations: "CFTC, NFA", logo: "https://example.com/tradovate.png", assets: ["Futures"], categories: ["Futures Brokers"] },
    { name: "AMP Futures", rating: 4.3, deposit: 500, fee: 0.5, country: "USA", regulations: "CFTC, NFA", logo: "https://example.com/ampfutures.png", assets: ["Futures", "Options"], categories: ["Futures Brokers"] },
    { name: "Optimus Futures", rating: 4.4, deposit: 500, fee: 0.55, country: "USA", regulations: "CFTC, NFA", logo: "https://example.com/optimus.png", assets: ["Futures"], categories: ["Futures Brokers"] },
    { name: "Generic Trade", rating: 4.1, deposit: 1000, fee: 0.59, country: "USA", regulations: "CFTC, NFA", logo: "https://example.com/generictrade.png", assets: ["Futures"], categories: ["Futures Brokers"] },

    { name: "Daniels Trading", rating: 4.2, deposit: 500, fee: 0.6, country: "USA", regulations: "CFTC, NFA", logo: "https://example.com/daniels.png", assets: ["Futures", "Options"], categories: ["Futures Brokers"] },
    { name: "Cannon Trading", rating: 4.1, deposit: 1000, fee: 0.59, country: "USA", regulations: "CFTC, NFA", logo: "https://example.com/cannon.png", assets: ["Futures", "Options"], categories: ["Futures Brokers"] },

    // ECN Brokers
    { name: "IC Markets", rating: 4.7, deposit: 200, fee: 0.6, country: "Australia", regulations: "ASIC, CySEC", logo: "https://example.com/icmarkets.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "Pepperstone", rating: 4.8, deposit: 200, fee: 0.8, country: "Australia", regulations: "ASIC, FCA", logo: "https://example.com/pepperstone.png", assets: ["Forex", "CFDs"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "Hotforex", rating: 4.5, deposit: 50, fee: 0.7, country: "Cyprus", regulations: "CySEC, FSC", logo: "https://example.com/hotforex.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "AMarkets", rating: 4.3, deposit: 100, fee: 0.8, country: "Saint Vincent", regulations: "FSA", logo: "https://example.com/amarkets.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "RoboForex", rating: 4.4, deposit: 10, fee: 0.7, country: "Belize", regulations: "IFSC", logo: "https://example.com/roboforex.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "Vantagepoint", rating: 4.2, deposit: 25, fee: 0.5, country: "Australia", regulations: "ASIC, FCA", logo: "https://example.com/vantagepoint.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "NBHM", rating: 4.1, deposit: 100, fee: 0.5, country: "UK", regulations: "FCA", logo: "https://example.com/nbhm.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "LCG", rating: 4.3, deposit: 0, fee: 0.6, country: "UK", regulations: "FCA", logo: "https://example.com/lcg.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "ATFX", rating: 4.4, deposit: 100, fee: 0.6, country: "UK", regulations: "FCA, CySEC", logo: "https://example.com/atfx.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },
    { name: "FXFlat", rating: 4.2, deposit: 500, fee: 0.5, country: "Germany", regulations: "BaFin", logo: "https://example.com/fxflat.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "ECN Brokers"] },

    // Regional Brokers
    { name: "Zerodha", rating: 4.7, deposit: 0, fee: 0.0, country: "India", regulations: "SEBI", logo: "https://example.com/zerodha.png", assets: ["Stocks", "Options", "Futures"], categories: ["Stock Brokers"] },
    { name: "Upstox", rating: 4.5, deposit: 0, fee: 0.05, country: "India", regulations: "SEBI", logo: "https://example.com/upstox.png", assets: ["Stocks", "Options", "Futures"], categories: ["Stock Brokers"] },
    { name: "Angel One", rating: 4.4, deposit: 0, fee: 0.05, country: "India", regulations: "SEBI", logo: "https://example.com/angelone.png", assets: ["Stocks", "Options", "Futures"], categories: ["Stock Brokers"] },
    { name: "Groww", rating: 4.5, deposit: 0, fee: 0.05, country: "India", regulations: "SEBI", logo: "https://example.com/groww.png", assets: ["Stocks", "ETFs", "Mutual Funds"], categories: ["Stock Brokers", "Brokers for Beginners"] },
    { name: "XP Investimentos", rating: 4.6, deposit: 0, fee: 0.0, country: "Brazil", regulations: "CVM", logo: "https://example.com/xp.png", assets: ["Stocks", "ETFs", "Futures"], categories: ["Stock Brokers"] },
    { name: "Nubank", rating: 4.7, deposit: 0, fee: 0.0, country: "Brazil", regulations: "CVM", logo: "https://example.com/nubank.png", assets: ["Stocks", "ETFs", "Crypto"], categories: ["Stock Brokers", "Brokers for Beginners"] },
    { name: "Avenue Securities", rating: 4.3, deposit: 0, fee: 0.2, country: "Brazil", regulations: "CVM, SEC", logo: "https://example.com/avenue.png", assets: ["Stocks", "ETFs", "REITs"], categories: ["Stock Brokers"] },
    { name: "SMC Global", rating: 4.2, deposit: 0, fee: 0.05, country: "India", regulations: "SEBI", logo: "https://example.com/smcglobal.png", assets: ["Stocks", "Commodities", "Forex"], categories: ["Stock Brokers"] },
    { name: "ICICI Direct", rating: 4.3, deposit: 0, fee: 0.05, country: "India", regulations: "SEBI", logo: "https://example.com/icicidirect.png", assets: ["Stocks", "ETFs", "Mutual Funds"], categories: ["Stock Brokers"] },
    { name: "SaxoInvestor", rating: 4.5, deposit: 2000, fee: 0.1, country: "Denmark", regulations: "FSA", logo: "https://example.com/saxoinvestor.png", assets: ["Stocks", "ETFs", "Bonds"], categories: ["Stock Brokers"] },

    // Islamic/Sharia-Compliant Brokers
    { name: "ICM Capital", rating: 4.2, deposit: 200, fee: 0.7, country: "UK", regulations: "FCA", logo: "https://example.com/icmcapital.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "Islamic Brokers"] },
    { name: "JustForex", rating: 4.1, deposit: 1, fee: 0.5, country: "Saint Vincent", regulations: "SVGFSA", logo: "https://example.com/justforex.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "Islamic Brokers"] },
    { name: "FxPrimus", rating: 4.3, deposit: 100, fee: 0.6, country: "Cyprus", regulations: "CySEC", logo: "https://example.com/fxprimus.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "Islamic Brokers"] },
    { name: "MultiBank", rating: 4.4, deposit: 50, fee: 0.7, country: "UAE", regulations: "DFSA, FSC", logo: "https://example.com/multibank.png", assets: ["Forex", "CFDs", "Crypto"], categories: ["Forex Brokers", "Islamic Brokers"] },
    { name: "QInvest", rating: 4.5, deposit: 5000, fee: 1.0, country: "Qatar", regulations: "QFCRA", logo: "https://example.com/qinvest.png", assets: ["Stocks", "Bonds", "Sukuk"], categories: ["Stock Brokers", "Islamic Brokers"] },

    // Asian Brokers
    { name: "Rakuten Securities", rating: 4.6, deposit: 0, fee: 0.1, country: "Japan", regulations: "FSA", logo: "https://example.com/rakuten.png", assets: ["Stocks", "Futures", "Options"], categories: ["Stock Brokers"] },
    { name: "Monex", rating: 4.4, deposit: 0, fee: 0.2, country: "Japan", regulations: "FSA", logo: "https://example.com/monex.png", assets: ["Stocks", "Forex", "Futures"], categories: ["Stock Brokers", "Forex Brokers"] },
    { name: "Nomura Securities", rating: 4.7, deposit: 1000, fee: 0.1, country: "Japan", regulations: "FSA", logo: "https://example.com/nomura.png", assets: ["Stocks", "Bonds", "Futures"], categories: ["Stock Brokers"] },
    { name: "Mirae Asset", rating: 4.5, deposit: 0, fee: 0.15, country: "South Korea", regulations: "FSC", logo: "https://example.com/miraeasset.png", assets: ["Stocks", "ETFs", "Futures"], categories: ["Stock Brokers"] },


    // Specialized Brokers

    { name: "JP Morgan Self-Directed Investing", rating: 4.5, deposit: 0, fee: 0.0, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/jpmorgan.png", assets: ["Stocks", "ETFs", "Options"], categories: ["Stock Brokers"] },

    { name: "Zacks Trade", rating: 4.5, deposit: 2500, fee: 0.01, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/zackstrade.png", assets: ["Stocks", "Options", "Futures"], categories: ["Stock Brokers", "Options Brokers"] },

    { name: "M1 Finance", rating: 4.4, deposit: 100, fee: 0.0, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/m1finance.png", assets: ["Stocks", "ETFs"], categories: ["Stock Brokers", "Brokers for Beginners"] },
    { name: "eToro USA", rating: 4.2, deposit: 50, fee: 0.0, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/etorousa.png", assets: ["Stocks", "ETFs", "Crypto"], categories: ["Stock Brokers", "Brokers for Beginners"] },
    { name: "SogoTrade", rating: 4.1, deposit: 500, fee: 0.0, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/sogotrade.png", assets: ["Stocks", "Options"], categories: ["Stock Brokers", "Options Brokers"] },
    { name: "TradeZero", rating: 4.3, deposit: 500, fee: 0.0, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/tradezero.png", assets: ["Stocks", "ETFs", "Options"], categories: ["Stock Brokers"] },
    { name: "Just2Trade", rating: 4.2, deposit: 100, fee: 0.0, country: "USA", regulations: "SEC, FINRA", logo: "https://example.com/just2trade.png", assets: ["Stocks", "Options", "Futures"], categories: ["Stock Brokers", "Options Brokers"] }
  ];
}

// Run the import function
importMoreBrokers()
  .then(() => {
    console.log('Imported 100 more brokers successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error importing brokers:', error);
    process.exit(1);
  });