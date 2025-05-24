// Import additional top brokers script
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Main import function
async function importAdditionalBrokers() {
  console.log('🚀 Starting additional brokers import process...');

  try {
    // Create categories if needed
    const categories = await ensureCategories();
    console.log(`✅ Verified ${categories.length} categories`);

    // Get additional brokers data
    const additionalBrokers = getAdditionalBrokers();
    console.log(`✅ Prepared ${additionalBrokers.length} additional brokers from research`);

    // Import brokers to database
    const importedBrokers = await importBrokersToDatabase(additionalBrokers, categories);
    console.log(`✅ Imported ${importedBrokers.length} additional brokers to Supabase`);

    console.log('✅ Additional brokers import completed successfully!');
  } catch (error) {
    console.error('❌ Error importing additional brokers:', error);
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

      let brokerId;

      if (existingBroker) {
        console.log(`Broker ${broker.name} already exists, updating...`);
        brokerId = existingBroker.id;

        // Update existing broker
        const { error: updateError } = await supabase
          .from('brokers')
          .update({
            logo_url: broker.logo_url || '',
            rating: broker.rating || 0,
            min_deposit: broker.min_deposit || 0,
            regulations: broker.regulations || '',
            trading_fee: broker.trading_fee || 0,
            country: broker.country || '',
            supported_assets: broker.supported_assets || []
          })
          .eq('id', brokerId);

        if (updateError) {
          console.error(`Error updating broker ${broker.name}:`, updateError);
          continue;
        }

        importedBrokers.push({id: brokerId, name: broker.name});
      } else {
        // Insert new broker
        const { data: createdBroker, error } = await supabase
          .from('brokers')
          .insert({
            name: broker.name,
            logo_url: broker.logo_url || '',
            rating: broker.rating || 0,
            min_deposit: broker.min_deposit || 0,
            regulations: broker.regulations || '',
            trading_fee: broker.trading_fee || 0,
            country: broker.country || '',
            supported_assets: broker.supported_assets || []
          })
          .select()
          .single();

        if (error) {
          console.error(`Error creating broker ${broker.name}:`, error);
          continue;
        }

        brokerId = createdBroker.id;
        importedBrokers.push(createdBroker);
        console.log(`Imported broker: ${broker.name}`);
      }

      // Add broker categories
      await linkBrokerToCategories(brokerId, broker.categories, categoryMap);
    } catch (error) {
      console.error(`Error importing broker ${broker.name}:`, error);
    }
  }

  return importedBrokers;
}

// Link broker to categories
async function linkBrokerToCategories(brokerId, brokerCategories, categoryMap) {
  // First, get existing categories for the broker
  const { data: existingLinks, error: fetchError } = await supabase
    .from('broker_categories')
    .select('category_id')
    .eq('broker_id', brokerId);

  if (fetchError) {
    console.error(`Error fetching broker categories:`, fetchError);
    return;
  }

  const existingCategoryIds = existingLinks ? existingLinks.map(link => link.category_id) : [];

  // Map broker category names to category IDs
  for (const categoryName of brokerCategories) {
    // Find matching category
    let categoryId = null;
    for (const [name, id] of Object.entries(categoryMap)) {
      if (name.toLowerCase().includes(categoryName.toLowerCase())) {
        categoryId = id;
        break;
      }
    }

    // Skip if no matching category or already linked
    if (!categoryId) {
      console.log(`No matching category found for "${categoryName}"`);
      continue;
    }

    if (existingCategoryIds.includes(categoryId)) {
      console.log(`Broker ${brokerId} already linked to category ${categoryId}`);
      continue;
    }

    try {
      // Add broker-category relation
      const { error } = await supabase
        .from('broker_categories')
        .insert({
          broker_id: brokerId,
          category_id: categoryId
        });

      if (error) {
        if (error.code === '23505') { // Duplicate key violation
          console.log(`Relation already exists between broker ${brokerId} and category ${categoryId}`);
        } else {
          console.error(`Error linking broker to category:`, error);
        }
      } else {
        console.log(`Successfully linked broker ${brokerId} to category ${categoryId}`);
      }
    } catch (error) {
      console.error(`Exception linking broker to category:`, error);
    }
  }
}

// Get additional brokers data researched from internet
function getAdditionalBrokers() {
  return [
    // Forex and CFD Brokers
    { name: 'Exness', rating: 4.6, logo_url: 'https://example.com/exness.png', min_deposit: 0, trading_fee: 0.7, country: 'Cyprus', regulations: 'CySEC, FCA, FSCA', supported_assets: ['Forex', 'CFDs', 'Crypto'], categories: ['Forex Brokers', 'CFD Brokers', 'High Leverage Brokers'] },
    { name: 'BlackBull Markets', rating: 4.4, logo_url: 'https://example.com/blackbull.png', min_deposit: 10, trading_fee: 0.8, country: 'New Zealand', regulations: 'FMA, FSA, SFSA', supported_assets: ['Forex', 'CFDs', 'Crypto'], categories: ['Forex Brokers', 'CFD Brokers'] },
    { name: 'FXTM', rating: 4.4, logo_url: 'https://example.com/fxtm.png', min_deposit: 200, trading_fee: 0.5, country: 'Cyprus', regulations: 'CySEC, FCA, FSCA', supported_assets: ['Forex', 'CFDs', 'Stocks'], categories: ['Forex Brokers', 'CFD Brokers', 'Professional Traders'] },
    { name: 'OCTA', rating: 4.3, logo_url: 'https://example.com/octa.png', min_deposit: 25, trading_fee: 0.6, country: 'St. Vincent', regulations: 'FSA', supported_assets: ['Forex', 'Crypto', 'Indices'], categories: ['Forex Brokers', 'Brokers for Beginners'] },
    { name: 'Capital.com', rating: 4.5, logo_url: 'https://example.com/capital.png', min_deposit: 20, trading_fee: 0.8, country: 'UK', regulations: 'FCA, ASIC, CySEC', supported_assets: ['Forex', 'Stocks', 'Crypto', 'Indices'], categories: ['Forex Brokers', 'CFD Brokers', 'Brokers for Beginners'] },
    { name: 'Vantage', rating: 4.6, logo_url: 'https://example.com/vantage.png', min_deposit: 50, trading_fee: 0.5, country: 'Australia', regulations: 'ASIC, FSCA', supported_assets: ['Forex', 'CFDs', 'Crypto'], categories: ['Forex Brokers', 'CFD Brokers', 'Copy Trading'] },
    { name: 'FxPro', rating: 4.6, logo_url: 'https://example.com/fxpro.png', min_deposit: 100, trading_fee: 0.9, country: 'UK', regulations: 'FCA, CySEC, FSCA, SCB', supported_assets: ['Forex', 'CFDs', 'Crypto'], categories: ['Forex Brokers', 'Automated Trading'] },
    { name: '50K Global', rating: 4.5, logo_url: 'https://example.com/50kglobal.png', min_deposit: 50, trading_fee: 0.0, country: 'Global', regulations: 'Various', supported_assets: ['Forex', 'CFDs', 'Crypto'], categories: ['Forex Brokers', 'CFD Brokers'] },
    { name: 'ActivTrades', rating: 4.6, logo_url: 'https://example.com/activtrades.png', min_deposit: 0, trading_fee: 0.5, country: 'UK', regulations: 'FCA, FSC, SCB', supported_assets: ['Forex', 'CFDs', 'Stocks'], categories: ['Forex Brokers', 'CFD Brokers'] },
    { name: 'Axi', rating: 4.4, logo_url: 'https://example.com/axi.png', min_deposit: 1, trading_fee: 0.0, country: 'Australia', regulations: 'ASIC, DFSA, FCA', supported_assets: ['Forex', 'CFDs', 'Stocks'], categories: ['Forex Brokers', 'CFD Brokers', 'Low Spread Brokers'] },

    // Crypto Brokers
    { name: 'Binance', rating: 4.7, logo_url: 'https://example.com/binance.png', min_deposit: 0, trading_fee: 0.1, country: 'Global', regulations: 'Various', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'], categories: ['Cryptocurrency Brokers'] },
    { name: 'Coinbase', rating: 4.6, logo_url: 'https://example.com/coinbase.png', min_deposit: 0, trading_fee: 0.5, country: 'USA', regulations: 'FinCEN, NYSDFS', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'], categories: ['Cryptocurrency Brokers'] },
    { name: 'Kraken', rating: 4.6, logo_url: 'https://example.com/kraken.png', min_deposit: 0, trading_fee: 0.16, country: 'USA', regulations: 'FinCEN, FCA', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'], categories: ['Cryptocurrency Brokers'] },
    { name: 'OKX', rating: 4.5, logo_url: 'https://example.com/okx.png', min_deposit: 0, trading_fee: 0.1, country: 'Seychelles', regulations: 'Various', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'], categories: ['Cryptocurrency Brokers'] },
    { name: 'KuCoin', rating: 4.5, logo_url: 'https://example.com/kucoin.png', min_deposit: 0, trading_fee: 0.1, country: 'Seychelles', regulations: 'Various', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'], categories: ['Cryptocurrency Brokers'] },

    // Stock Brokers
    { name: 'Fidelity', rating: 4.8, logo_url: 'https://example.com/fidelity.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Bonds'], categories: ['Stock Brokers', 'ETF Brokers'] },
    { name: 'Charles Schwab', rating: 4.7, logo_url: 'https://example.com/schwab.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'], categories: ['Stock Brokers', 'ETF Brokers'] },
    { name: 'TD Ameritrade', rating: 4.7, logo_url: 'https://example.com/tdameritrade.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'], categories: ['Stock Brokers', 'Options Brokers'] },
    { name: 'E*TRADE', rating: 4.6, logo_url: 'https://example.com/etrade.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'], categories: ['Stock Brokers', 'ETF Brokers'] },
    { name: 'Webull', rating: 4.3, logo_url: 'https://example.com/webull.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'], categories: ['Stock Brokers', 'Brokers for Beginners'] },

    // More Forex/CFD Brokers
    { name: 'IG Markets', rating: 4.6, logo_url: 'https://example.com/ig.png', min_deposit: 250, trading_fee: 0.8, country: 'UK', regulations: 'FCA, ASIC, FSCA', supported_assets: ['Forex', 'CFDs', 'Stocks'], categories: ['Forex Brokers', 'CFD Brokers'] },
    { name: 'CMC Markets', rating: 4.5, logo_url: 'https://example.com/cmc.png', min_deposit: 0, trading_fee: 0.7, country: 'UK', regulations: 'FCA, ASIC, BaFin', supported_assets: ['Forex', 'CFDs', 'Stocks'], categories: ['Forex Brokers', 'CFD Brokers'] },
    { name: 'Tickmill', rating: 4.5, logo_url: 'https://example.com/tickmill.png', min_deposit: 100, trading_fee: 0.0, country: 'UK', regulations: 'FCA, CySEC, FSA', supported_assets: ['Forex', 'Indices', 'Commodities'], categories: ['Forex Brokers', 'Low Spread Brokers'] },
    { name: 'FXCM', rating: 4.3, logo_url: 'https://example.com/fxcm.png', min_deposit: 50, trading_fee: 0.8, country: 'UK', regulations: 'FCA, ASIC', supported_assets: ['Forex', 'CFDs'], categories: ['Forex Brokers', 'CFD Brokers'] },
    { name: 'Forex.com', rating: 4.4, logo_url: 'https://example.com/forex.png', min_deposit: 100, trading_fee: 0.9, country: 'USA', regulations: 'CFTC, FCA, ASIC', supported_assets: ['Forex', 'CFDs', 'Indices'], categories: ['Forex Brokers', 'Most Popular Brokers'] },
    { name: 'Saxo Bank', rating: 4.5, logo_url: 'https://example.com/saxo.png', min_deposit: 500, trading_fee: 1.0, country: 'Denmark', regulations: 'FSA, ASIC, MAS', supported_assets: ['Forex', 'Stocks', 'CFDs'], categories: ['Forex Brokers', 'Stock Brokers'] },
    { name: 'Dukascopy', rating: 4.4, logo_url: 'https://example.com/dukascopy.png', min_deposit: 100, trading_fee: 0.8, country: 'Switzerland', regulations: 'FINMA, JFSA', supported_assets: ['Forex', 'CFDs', 'Cryptocurrencies'], categories: ['Forex Brokers', 'ECN Brokers'] },
    { name: 'ThinkMarkets', rating: 4.3, logo_url: 'https://example.com/thinkmarkets.png', min_deposit: 250, trading_fee: 0.7, country: 'UK', regulations: 'FCA, ASIC', supported_assets: ['Forex', 'Indices', 'Commodities'], categories: ['Forex Brokers', 'CFD Brokers'] },
    { name: 'FIBO Group', rating: 4.2, logo_url: 'https://example.com/fibogroup.png', min_deposit: 300, trading_fee: 0.8, country: 'Cyprus', regulations: 'CySEC', supported_assets: ['Forex', 'Metals', 'Indices'], categories: ['Forex Brokers', 'ECN Brokers'] },
    { name: 'Darwinex', rating: 4.2, logo_url: 'https://example.com/darwinex.png', min_deposit: 500, trading_fee: 0.9, country: 'UK', regulations: 'FCA', supported_assets: ['Forex', 'Indices', 'Commodities'], categories: ['Forex Brokers', 'Social Trading'] },

    // Additional Crypto Brokers
    { name: 'Bitstamp', rating: 4.5, logo_url: 'https://example.com/bitstamp.png', min_deposit: 0, trading_fee: 0.5, country: 'Luxembourg', regulations: 'CSSF', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'], categories: ['Cryptocurrency Brokers'] },
    { name: 'Gemini', rating: 4.5, logo_url: 'https://example.com/gemini.png', min_deposit: 0, trading_fee: 0.35, country: 'USA', regulations: 'NYDFS', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'], categories: ['Cryptocurrency Brokers'] },

    { name: 'Bybit', rating: 4.4, logo_url: 'https://example.com/bybit.png', min_deposit: 0, trading_fee: 0.1, country: 'Singapore', regulations: 'Various', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'], categories: ['Cryptocurrency Brokers'] },


    // Additional Stock Brokers
    { name: 'Vanguard', rating: 4.5, logo_url: 'https://example.com/vanguard.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Bonds'], categories: ['Stock Brokers', 'ETF Brokers'] },
    { name: 'Merrill Edge', rating: 4.4, logo_url: 'https://example.com/merrill.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'], categories: ['Stock Brokers'] },
    { name: 'Ally Invest', rating: 4.3, logo_url: 'https://example.com/ally.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'], categories: ['Stock Brokers'] },
    { name: 'SoFi Invest', rating: 4.2, logo_url: 'https://example.com/sofi.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Crypto'], categories: ['Stock Brokers', 'Brokers for Beginners'] },
    { name: 'Tradier', rating: 4.2, logo_url: 'https://example.com/tradier.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'Options'], categories: ['Stock Brokers', 'Options Brokers'] },

    // Specialized Brokers
    { name: 'NinjaTrader', rating: 4.6, logo_url: 'https://example.com/ninjatrader.png', min_deposit: 1000, trading_fee: 0.5, country: 'USA', regulations: 'NFA, CFTC', supported_assets: ['Futures', 'Forex'], categories: ['Futures Brokers'] },
    { name: 'TradeStation', rating: 4.5, logo_url: 'https://example.com/tradestation.png', min_deposit: 2000, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'Options', 'Futures'], categories: ['Stock Brokers', 'Futures Brokers'] },
    { name: 'Tastyworks', rating: 4.5, logo_url: 'https://example.com/tastyworks.png', min_deposit: 0, trading_fee: 1.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'Options', 'Futures'], categories: ['Options Brokers'] },
    { name: 'Interactive Brokers', rating: 4.7, logo_url: 'https://example.com/ibkr.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA, FCA', supported_assets: ['Stocks', 'Forex', 'Futures'], categories: ['Stock Brokers', 'Forex Brokers', 'Professional Traders'] },
    { name: 'Lightspeed', rating: 4.3, logo_url: 'https://example.com/lightspeed.png', min_deposit: 10000, trading_fee: 0.0045, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'Options', 'Futures'], categories: ['Stock Brokers', 'Professional Traders'] }
  ];
}

// Run the import function
importAdditionalBrokers()
  .then(() => {
    console.log('Additional brokers import completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error importing additional brokers:', error);
    process.exit(1);
  });