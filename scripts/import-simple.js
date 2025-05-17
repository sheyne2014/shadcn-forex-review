// Import brokers script (simplified version)
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Main import function
async function importBrokers() {
  console.log('🚀 Starting broker import process...');
  
  try {
    // Create categories
    const categories = await ensureCategories();
    console.log(`✅ Verified ${categories.length} categories`);
    
    // Get broker data from hardcoded backup sources
    const allBrokers = getAllHardcodedBrokers();
    console.log(`✅ Prepared ${allBrokers.length} brokers for import`);
    
    // Import brokers to database
    const importedBrokers = await importBrokersToDatabase(allBrokers, categories);
    console.log(`✅ Imported ${importedBrokers.length} brokers to Supabase`);
    
    console.log('✅ Import completed successfully!');
  } catch (error) {
    console.error('❌ Error importing brokers:', error);
    process.exit(1);
  }
}

// Ensure categories exist
async function ensureCategories() {
  // Check if categories already exist
  const { data: existingCategories, error } = await supabase
    .from('categories')
    .select('*');
    
  if (error) throw error;
  
  // If we have categories, return them
  if (existingCategories && existingCategories.length > 0) {
    return existingCategories;
  }
  
  // Otherwise create default categories
  const categoryNames = [
    'Forex Brokers',
    'Stock Brokers',
    'ETF Brokers',
    'Cryptocurrency Brokers',
    'Options Brokers', 
    'Futures Brokers',
    'CFD Brokers',
    'Bond Brokers',
    'Brokers for Beginners',
    'Most Popular Brokers',
    'ECN Brokers',
    'Market Maker Brokers',
    'Low Spread Brokers',
    'High Leverage Brokers',
    'Regulated Brokers',
    'MT4/MT5 Brokers'
  ];
  
  const categories = [];
  for (const name of categoryNames) {
    const { data, error } = await supabase
      .from('categories')
      .insert({ name })
      .select()
      .single();
      
    if (error) throw error;
    categories.push(data);
  }
  
  return categories;
}

// Get all hardcoded brokers
function getAllHardcodedBrokers() {
  const forexBrokers = getForexBrokers();
  const stockBrokers = getStockBrokers();
  const cryptoBrokers = getCryptoBrokers();
  const cfdBrokers = getCFDBrokers();
  const beginnerBrokers = getBeginnerBrokers();
  
  // Combine all brokers and remove duplicates
  const allBrokers = [];
  const brokerNames = new Set();
  
  // Process each category
  [
    { brokers: forexBrokers, category: 'forex' },
    { brokers: stockBrokers, category: 'stocks' },
    { brokers: cryptoBrokers, category: 'crypto' },
    { brokers: cfdBrokers, category: 'cfd' },
    { brokers: beginnerBrokers, category: 'beginner' }
  ].forEach(({ brokers, category }) => {
    brokers.forEach(broker => {
      if (!brokerNames.has(broker.name)) {
        brokerNames.add(broker.name);
        
        // Add category to broker data
        broker.categories = [category];
        allBrokers.push(broker);
      } else {
        // If broker already exists, add this category to its categories
        const existingBroker = allBrokers.find(b => b.name === broker.name);
        if (existingBroker && !existingBroker.categories.includes(category)) {
          existingBroker.categories.push(category);
        }
      }
    });
  });
  
  // Limit to top 100
  return allBrokers.slice(0, 100);
}

// Forex brokers
function getForexBrokers() {
  const topForexBrokers = [
    { name: 'Pepperstone', rating: 4.8, website: 'https://pepperstone.com' },
    { name: 'IC Markets', rating: 4.7, website: 'https://icmarkets.com' },
    { name: 'XM', rating: 4.6, website: 'https://xm.com' },
    { name: 'eToro', rating: 4.6, website: 'https://etoro.com' },
    { name: 'AvaTrade', rating: 4.5, website: 'https://avatrade.com' },
    { name: 'FXTM', rating: 4.5, website: 'https://fxtm.com' },
    { name: 'FxPro', rating: 4.5, website: 'https://fxpro.com' },
    { name: 'OANDA', rating: 4.5, website: 'https://oanda.com' },
    { name: 'Plus500', rating: 4.4, website: 'https://plus500.com' },
    { name: 'IG', rating: 4.6, website: 'https://ig.com' },
    { name: 'CMC Markets', rating: 4.5, website: 'https://cmcmarkets.com' },
    { name: 'Exness', rating: 4.4, website: 'https://exness.com' },
    { name: 'FXCM', rating: 4.3, website: 'https://fxcm.com' },
    { name: 'Forex.com', rating: 4.4, website: 'https://forex.com' },
    { name: 'Saxo Bank', rating: 4.5, website: 'https://home.saxo' },
    { name: 'HYCM', rating: 4.3, website: 'https://hycm.com' },
    { name: 'FBS', rating: 4.2, website: 'https://fbs.com' },
    { name: 'NAGA', rating: 4.1, website: 'https://naga.com' },
    { name: 'Tickmill', rating: 4.4, website: 'https://tickmill.com' },
    { name: 'FP Markets', rating: 4.5, website: 'https://fpmarkets.com' },
    { name: 'Axi', rating: 4.3, website: 'https://axi.com' },
    { name: 'ThinkMarkets', rating: 4.3, website: 'https://thinkmarkets.com' },
    { name: 'Vantage', rating: 4.2, website: 'https://vantagemarkets.com' },
    { name: 'RoboForex', rating: 4.1, website: 'https://roboforex.com' },
    { name: 'Admiral Markets', rating: 4.4, website: 'https://admiralmarkets.com' }
  ];
  
  return topForexBrokers.map(broker => {
    return {
      name: broker.name,
      website: broker.website,
      logo_url: `https://logo.clearbit.com/${broker.website.replace('https://', '')}`,
      rating: broker.rating,
      min_deposit: Math.floor(Math.random() * 200) + 50,
      regulations: ['FCA', 'ASIC', 'CySEC', 'FSCA', 'BaFin', 'DFSA'].slice(0, Math.floor(Math.random() * 3) + 1).join(', '),
      trading_fee: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
      country: ['UK', 'Australia', 'Cyprus', 'Singapore', 'Hong Kong', 'USA'][Math.floor(Math.random() * 6)],
      supported_assets: ['Forex', 'Commodities', 'Indices', 'Stocks', 'Cryptocurrencies'].slice(0, Math.floor(Math.random() * 5) + 1)
    };
  });
}

// Stock brokers
function getStockBrokers() {
  const topStockBrokers = [
    { name: 'Fidelity', rating: 4.8, website: 'https://fidelity.com' },
    { name: 'Charles Schwab', rating: 4.7, website: 'https://schwab.com' },
    { name: 'TD Ameritrade', rating: 4.7, website: 'https://tdameritrade.com' },
    { name: 'E*TRADE', rating: 4.6, website: 'https://etrade.com' },
    { name: 'Interactive Brokers', rating: 4.5, website: 'https://interactivebrokers.com' },
    { name: 'Robinhood', rating: 4.3, website: 'https://robinhood.com' },
    { name: 'Webull', rating: 4.3, website: 'https://webull.com' },
    { name: 'Merrill Edge', rating: 4.5, website: 'https://merrilledge.com' },
    { name: 'Ally Invest', rating: 4.4, website: 'https://ally.com/invest' },
    { name: 'TradeStation', rating: 4.4, website: 'https://tradestation.com' },
    { name: 'Firstrade', rating: 4.2, website: 'https://firstrade.com' },
    { name: 'SoFi Invest', rating: 4.3, website: 'https://sofi.com/invest' },
    { name: 'Tastyworks', rating: 4.4, website: 'https://tastyworks.com' },
    { name: 'Lightspeed', rating: 4.2, website: 'https://lightspeed.com' },
    { name: 'Vanguard', rating: 4.5, website: 'https://vanguard.com' }
  ];
  
  return topStockBrokers.map(broker => {
    return {
      name: broker.name,
      website: broker.website,
      logo_url: `https://logo.clearbit.com/${broker.website.replace('https://', '')}`,
      rating: broker.rating,
      min_deposit: Math.floor(Math.random() * 500) + 100,
      regulations: ['SEC', 'FINRA', 'SIPC'].slice(0, Math.floor(Math.random() * 3) + 1).join(', '),
      trading_fee: parseFloat((Math.random() * 10 + 2).toFixed(2)),
      country: 'USA',
      supported_assets: ['Stocks', 'ETFs', 'Options', 'Mutual Funds', 'Bonds'].slice(0, Math.floor(Math.random() * 5) + 1)
    };
  });
}

// Crypto brokers
function getCryptoBrokers() {
  const topCryptoBrokers = [
    { name: 'Binance', rating: 4.7, website: 'https://binance.com' },
    { name: 'Coinbase', rating: 4.6, website: 'https://coinbase.com' },
    { name: 'Kraken', rating: 4.6, website: 'https://kraken.com' },
    { name: 'FTX', rating: 4.5, website: 'https://ftx.com' },
    { name: 'Gemini', rating: 4.5, website: 'https://gemini.com' },
    { name: 'BitFinex', rating: 4.4, website: 'https://bitfinex.com' },
    { name: 'KuCoin', rating: 4.4, website: 'https://kucoin.com' },
    { name: 'Bitstamp', rating: 4.3, website: 'https://bitstamp.net' },
    { name: 'OKX', rating: 4.3, website: 'https://okx.com' },
    { name: 'Bybit', rating: 4.2, website: 'https://bybit.com' },
    { name: 'Crypto.com', rating: 4.5, website: 'https://crypto.com' },
    { name: 'Huobi', rating: 4.3, website: 'https://huobi.com' },
    { name: 'Gate.io', rating: 4.2, website: 'https://gate.io' },
    { name: 'Bittrex', rating: 4.1, website: 'https://bittrex.com' },
    { name: 'BitMEX', rating: 4.0, website: 'https://bitmex.com' }
  ];
  
  return topCryptoBrokers.map(broker => {
    return {
      name: broker.name,
      website: broker.website,
      logo_url: `https://logo.clearbit.com/${broker.website.replace('https://', '')}`,
      rating: broker.rating,
      min_deposit: Math.floor(Math.random() * 100) + 10,
      regulations: ['FinCEN', 'NYDFS', 'FCA', 'MAS'].slice(0, Math.floor(Math.random() * 2) + 1).join(', '),
      trading_fee: parseFloat((Math.random() * 0.5 + 0.1).toFixed(3)),
      country: ['USA', 'Malta', 'Singapore', 'Hong Kong', 'Cayman Islands'][Math.floor(Math.random() * 5)],
      supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins', 'Stablecoins', 'Tokens'].slice(0, Math.floor(Math.random() * 3) + 3)
    };
  });
}

// CFD brokers
function getCFDBrokers() {
  const topCFDBrokers = [
    { name: 'Plus500', rating: 4.6, website: 'https://plus500.com' },
    { name: 'IG', rating: 4.7, website: 'https://ig.com' },
    { name: 'CMC Markets', rating: 4.6, website: 'https://cmcmarkets.com' },
    { name: 'eToro', rating: 4.5, website: 'https://etoro.com' },
    { name: 'AvaTrade', rating: 4.4, website: 'https://avatrade.com' },
    { name: 'XTB', rating: 4.5, website: 'https://xtb.com' },
    { name: 'City Index', rating: 4.3, website: 'https://cityindex.co.uk' },
    { name: 'FXCM', rating: 4.2, website: 'https://fxcm.com' },
    { name: 'Markets.com', rating: 4.1, website: 'https://markets.com' },
    { name: 'Pepperstone', rating: 4.5, website: 'https://pepperstone.com' },
    { name: 'FxPro', rating: 4.4, website: 'https://fxpro.com' },
    { name: 'FP Markets', rating: 4.3, website: 'https://fpmarkets.com' },
    { name: 'Tickmill', rating: 4.2, website: 'https://tickmill.com' },
    { name: 'ThinkMarkets', rating: 4.1, website: 'https://thinkmarkets.com' },
    { name: 'Capital.com', rating: 4.4, website: 'https://capital.com' }
  ];
  
  return topCFDBrokers.map(broker => {
    return {
      name: broker.name,
      website: broker.website,
      logo_url: `https://logo.clearbit.com/${broker.website.replace('https://', '')}`,
      rating: broker.rating,
      min_deposit: Math.floor(Math.random() * 300) + 100,
      regulations: ['FCA', 'ASIC', 'CySEC', 'FSCA'].slice(0, Math.floor(Math.random() * 3) + 1).join(', '),
      trading_fee: parseFloat((Math.random() * 3 + 0.5).toFixed(2)),
      country: ['UK', 'Australia', 'Cyprus', 'South Africa'][Math.floor(Math.random() * 4)],
      supported_assets: ['Indices', 'Commodities', 'Forex', 'Stocks', 'Cryptos'].slice(0, Math.floor(Math.random() * 3) + 3)
    };
  });
}

// Beginner brokers
function getBeginnerBrokers() {
  const topBeginnerBrokers = [
    { name: 'Robinhood', rating: 4.5, website: 'https://robinhood.com' },
    { name: 'eToro', rating: 4.4, website: 'https://etoro.com' },
    { name: 'TD Ameritrade', rating: 4.6, website: 'https://tdameritrade.com' },
    { name: 'Fidelity', rating: 4.7, website: 'https://fidelity.com' },
    { name: 'Charles Schwab', rating: 4.6, website: 'https://schwab.com' },
    { name: 'E*TRADE', rating: 4.5, website: 'https://etrade.com' },
    { name: 'Webull', rating: 4.3, website: 'https://webull.com' },
    { name: 'SoFi Invest', rating: 4.4, website: 'https://sofi.com/invest' },
    { name: 'Ally Invest', rating: 4.3, website: 'https://ally.com/invest' },
    { name: 'M1 Finance', rating: 4.5, website: 'https://m1finance.com' },
    { name: 'Public.com', rating: 4.2, website: 'https://public.com' },
    { name: 'Acorns', rating: 4.4, website: 'https://acorns.com' },
    { name: 'Stash', rating: 4.1, website: 'https://stash.com' },
    { name: 'Firstrade', rating: 4.0, website: 'https://firstrade.com' },
    { name: 'Vanguard', rating: 4.3, website: 'https://vanguard.com' }
  ];
  
  return topBeginnerBrokers.map(broker => {
    return {
      name: broker.name,
      website: broker.website,
      logo_url: `https://logo.clearbit.com/${broker.website.replace('https://', '')}`,
      rating: broker.rating,
      min_deposit: Math.floor(Math.random() * 100) + 1,
      regulations: ['SEC', 'FINRA', 'SIPC'].slice(0, Math.floor(Math.random() * 3) + 1).join(', '),
      trading_fee: parseFloat((Math.random() * 5 + 0).toFixed(2)),
      country: 'USA',
      supported_assets: ['Stocks', 'ETFs', 'Crypto', 'Fractional Shares'].slice(0, Math.floor(Math.random() * 4) + 1)
    };
  });
}

// Import brokers to database
async function importBrokersToDatabase(brokers, categories) {
  const importedBrokers = [];
  const categoryMap = {};
  
  // Create category map for easy lookup
  categories.forEach(category => {
    categoryMap[category.name] = category.id;
  });
  
  // Process each broker
  for (const broker of brokers) {
    try {
      // Check if broker already exists
      const { data: existingBroker } = await supabase
        .from('brokers')
        .select('id')
        .eq('name', broker.name)
        .maybeSingle();
      
      if (existingBroker) {
        console.log(`Broker ${broker.name} already exists, updating...`);
        
        // Update existing broker
        const { error: updateError } = await supabase
          .from('brokers')
          .update({
            website: broker.website,
            logo_url: broker.logo_url,
            rating: broker.rating,
            min_deposit: broker.min_deposit,
            regulations: broker.regulations,
            trading_fee: broker.trading_fee,
            country: broker.country,
            supported_assets: broker.supported_assets
          })
          .eq('id', existingBroker.id);
        
        if (updateError) {
          console.error(`Error updating broker ${broker.name}:`, updateError);
          continue;
        }
        
        importedBrokers.push(existingBroker);
        
        // Update broker categories
        await updateBrokerCategories(existingBroker.id, broker.categories, categoryMap);
        
        continue;
      }
      
      // Insert new broker
      const { data: createdBroker, error } = await supabase
        .from('brokers')
        .insert({
          name: broker.name,
          website: broker.website,
          logo_url: broker.logo_url,
          rating: broker.rating,
          min_deposit: broker.min_deposit,
          regulations: broker.regulations,
          trading_fee: broker.trading_fee,
          country: broker.country,
          supported_assets: broker.supported_assets
        })
        .select()
        .single();
      
      if (error) {
        console.error(`Error creating broker ${broker.name}:`, error);
        continue;
      }
      
      importedBrokers.push(createdBroker);
      console.log(`Imported broker: ${broker.name}`);
      
      // Add broker categories
      await addBrokerCategories(createdBroker.id, broker.categories, categoryMap);
    } catch (error) {
      console.error(`Error importing broker ${broker.name}:`, error);
    }
  }
  
  return importedBrokers;
}

// Add broker categories
async function addBrokerCategories(brokerId, brokerCategories, categoryMap) {
  // Map broker category names to category IDs
  for (const categoryKey of brokerCategories) {
    // Find matching category
    let categoryId = null;
    
    // Find category by matching keywords (forex, stocks, crypto, etc.)
    for (const [name, id] of Object.entries(categoryMap)) {
      if (name.toLowerCase().includes(categoryKey) ||
          (categoryKey === 'forex' && name.toLowerCase().includes('forex')) ||
          (categoryKey === 'stocks' && name.toLowerCase().includes('stock')) ||
          (categoryKey === 'crypto' && name.toLowerCase().includes('crypto')) ||
          (categoryKey === 'cfd' && name.toLowerCase().includes('cfd')) ||
          (categoryKey === 'beginner' && name.toLowerCase().includes('beginner'))) {
        categoryId = id;
        break;
      }
    }
    
    if (!categoryId) continue;
    
    // Add broker-category relation
    const { error } = await supabase
      .from('broker_categories')
      .insert({
        broker_id: brokerId,
        category_id: categoryId
      });
      
    if (error) {
      console.error(`Error linking broker to category:`, error);
    }
  }
}

// Update broker categories
async function updateBrokerCategories(brokerId, brokerCategories, categoryMap) {
  // First, get existing categories for the broker
  const { data: existingLinks, error: fetchError } = await supabase
    .from('broker_categories')
    .select('category_id')
    .eq('broker_id', brokerId);
    
  if (fetchError) {
    console.error(`Error fetching broker categories:`, fetchError);
    return;
  }
  
  const existingCategoryIds = existingLinks.map(link => link.category_id);
  
  // Map broker category keys to category IDs
  for (const categoryKey of brokerCategories) {
    // Find matching category
    let categoryId = null;
    
    // Find category by matching keywords
    for (const [name, id] of Object.entries(categoryMap)) {
      if (name.toLowerCase().includes(categoryKey) ||
          (categoryKey === 'forex' && name.toLowerCase().includes('forex')) ||
          (categoryKey === 'stocks' && name.toLowerCase().includes('stock')) ||
          (categoryKey === 'crypto' && name.toLowerCase().includes('crypto')) ||
          (categoryKey === 'cfd' && name.toLowerCase().includes('cfd')) ||
          (categoryKey === 'beginner' && name.toLowerCase().includes('beginner'))) {
        categoryId = id;
        break;
      }
    }
    
    if (!categoryId || existingCategoryIds.includes(categoryId)) continue;
    
    // Add broker-category relation
    const { error } = await supabase
      .from('broker_categories')
      .insert({
        broker_id: brokerId,
        category_id: categoryId
      });
      
    if (error) {
      console.error(`Error linking broker to category:`, error);
    }
  }
}

// Run the import function
importBrokers()
  .then(() => {
    console.log('✨ Broker import completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error importing brokers:', error);
    process.exit(1);
  }); 