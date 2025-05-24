// Import brokers script (JavaScript version)
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Main import function
async function importBrokers() {
  console.log('Starting broker import...');

  try {
    // First make sure we have categories
    const categories = await ensureCategories();
    console.log(`✅ Verified ${categories.length} categories`);

    // Get broker data (hardcoded list)
    const brokers = getHardcodedBrokers();
    console.log(`✅ Prepared ${brokers.length} brokers for import`);

    // Import brokers to database
    const importedBrokers = await importBrokersToDatabase(brokers, categories);
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
    'ECN Brokers',
    'Market Maker Brokers',
    'Brokers for Beginners',
    'Low Spread Brokers',
    'High Leverage Brokers',
    'Cryptocurrency Brokers',
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

// Get hardcoded broker data
function getHardcodedBrokers() {
  // Create a hardcoded list of top forex brokers with their approximate ratings
  const topBrokers = [
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
    { name: 'Admiral Markets', rating: 4.4, website: 'https://admiralmarkets.com' },
    { name: 'FXDD', rating: 4.0, website: 'https://fxdd.com' },
    { name: 'VantageFX', rating: 4.3, website: 'https://vantagefx.com' },
    { name: 'HFM', rating: 4.2, website: 'https://hfm.com' },
    { name: 'Interactive Brokers', rating: 4.4, website: 'https://interactivebrokers.com' },
    { name: 'OctaFX', rating: 4.1, website: 'https://octafx.com' },
    { name: 'Skilling', rating: 4.2, website: 'https://skilling.com' },
    { name: 'InstaForex', rating: 4.0, website: 'https://instaforex.com' },
    { name: 'FXOpen', rating: 4.1, website: 'https://fxopen.com' },
    { name: 'BlackBull Markets', rating: 4.3, website: 'https://blackbullmarkets.com' },
    { name: 'Capital.com', rating: 4.4, website: 'https://capital.com' },
    { name: 'LegacyFX', rating: 4.0, website: 'https://legacyfx.com' },
    { name: 'Alpari', rating: 4.2, website: 'https://alpari.com' },
    { name: 'FIBO Group', rating: 4.0, website: 'https://fibogroup.com' },
    { name: 'Libertex', rating: 4.1, website: 'https://libertex.com' },
    { name: 'FXChoice', rating: 4.1, website: 'https://fxchoice.com' },
    { name: 'HotForex', rating: 4.3, website: 'https://hotforex.com' },
    { name: 'FXGiants', rating: 4.0, website: 'https://fxgiants.com' },
    { name: 'Markets.com', rating: 4.2, website: 'https://markets.com' },
    { name: 'ATFX', rating: 4.1, website: 'https://atfx.com' },
    { name: 'ActivTrades', rating: 4.3, website: 'https://activtrades.com' },
    { name: 'Darwinex', rating: 4.0, website: 'https://darwinex.com' },
    { name: 'GO Markets', rating: 4.2, website: 'https://gomarkets.com' },
    { name: 'easyMarkets', rating: 4.1, website: 'https://easymarkets.com' },
    { name: 'GemForex', rating: 3.9, website: 'https://gemforex.com' },
    { name: 'BDSwiss', rating: 4.0, website: 'https://bdswiss.com' },
    { name: 'XTB', rating: 4.4, website: 'https://xtb.com' },
    { name: 'Core Spreads', rating: 4.1, website: 'https://corespreads.com' },
    { name: 'Trade.com', rating: 4.0, website: 'https://trade.com' },
    { name: 'Dukascopy', rating: 4.2, website: 'https://dukascopy.com' },
    { name: 'MTrading', rating: 3.9, website: 'https://mtrading.com' },
    { name: 'SuperForex', rating: 3.8, website: 'https://superforex.com' },
    { name: 'Windsor Brokers', rating: 4.0, website: 'https://windsorbrokers.com' },
    { name: 'Fair Forex', rating: 3.9, website: 'https://fairforex.com' },
    { name: 'ETX Capital', rating: 4.1, website: 'https://etxcapital.com' },
    { name: 'Swissquote', rating: 4.3, website: 'https://swissquote.com' },
    { name: 'FXCC', rating: 3.9, website: 'https://fxcc.com' },
    { name: 'FXTrading.com', rating: 4.0, website: 'https://fxtrading.com' },
    { name: 'GKFX', rating: 4.0, website: 'https://gkfx.com' },
    { name: 'HY Markets', rating: 3.9, website: 'https://hymarkets.com' },
    { name: 'MultiBank', rating: 4.1, website: 'https://multibankfx.com' },
    { name: 'Tradeo', rating: 3.9, website: 'https://tradeo.com' },
    { name: 'eToro X', rating: 4.0, website: 'https://etorox.com' },
    { name: 'Iron FX', rating: 4.0, website: 'https://ironfx.com' },
    { name: 'SimpleFX', rating: 3.9, website: 'https://simplefx.com' },
    { name: 'LQDFX', rating: 3.8, website: 'https://lqdfx.com' },
    { name: 'CryptoAltum', rating: 3.9, website: 'https://cryptoaltum.com' },

    { name: 'Stocks', rating: 3.9, website: 'https://stocks.com' },
    { name: 'TradeView Forex', rating: 4.0, website: 'https://tradeviewforex.com' },
    { name: 'City Index', rating: 4.1, website: 'https://cityindex.com' },
    { name: 'Hantec Markets', rating: 4.0, website: 'https://hantecmarkets.com' },
    { name: 'Rakuten Securities', rating: 4.2, website: 'https://rakutensecurities.com' }
  ];

  // Generate broker metadata
  return topBrokers.map(broker => {
    return {
      name: broker.name,
      description: `${broker.name} is a leading forex broker offering competitive spreads, advanced trading platforms, and excellent customer service.`,
      website: broker.website,
      rating: broker.rating,
      min_deposit: Math.floor(Math.random() * 200) + 50,
      founded: (2000 + Math.floor(Math.random() * 20)).toString(),
      headquarters: ['London, UK', 'Sydney, Australia', 'Cyprus', 'Singapore', 'Hong Kong', 'New York, USA'][Math.floor(Math.random() * 6)],
      regulation: ['FCA', 'ASIC', 'CySEC', 'FSCA', 'BaFin', 'DFSA'].slice(0, Math.floor(Math.random() * 3) + 1).join(', '),
      logo_url: `https://example.com/logos/${broker.name.toLowerCase().replace(/\s+/g, '-')}.png`
    };
  });
}

// Import brokers to database
async function importBrokersToDatabase(brokers, categories) {
  const importedBrokers = [];

  // Create each broker
  for (const broker of brokers) {
    try {
      // Check if broker already exists
      const { data: existingBroker } = await supabase
        .from('Brokers')
        .select('id')
        .eq('name', broker.name)
        .maybeSingle();

      if (existingBroker) {
        console.log(`Broker ${broker.name} already exists, skipping...`);
        importedBrokers.push(existingBroker);
        continue;
      }

      // Insert broker into the database
      const { data: createdBroker, error } = await supabase
        .from('Brokers')
        .insert({
          name: broker.name,
          website: broker.website,
          founded: broker.founded,
          headquarters: broker.headquarters,
          regulation: broker.regulation,
          rating: broker.rating,
          min_deposit: broker.min_deposit,
          logo_url: broker.logo_url,
          description: broker.description
        })
        .select()
        .single();

      if (error) {
        console.error(`Error creating broker ${broker.name}:`, error);
        continue;
      }

      // Assign to 2-3 random categories
      const shuffledCategories = [...categories].sort(() => 0.5 - Math.random());
      const categoryCount = Math.floor(Math.random() * 2) + 2; // 2-3 categories

      for (let i = 0; i < categoryCount && i < shuffledCategories.length; i++) {
        const { error: categoryError } = await supabase
          .from('broker_categories')
          .insert({
            broker_id: createdBroker.id,
            category_id: shuffledCategories[i].id
          });

        if (categoryError) {
          console.error(`Error linking broker ${broker.name} to category:`, categoryError);
        }
      }

      importedBrokers.push(createdBroker);
      console.log(`Imported broker: ${broker.name}`);
    } catch (error) {
      console.error(`Error importing broker ${broker.name}:`, error);
    }
  }

  return importedBrokers;
}

// Run the import function
importBrokers()
  .then(() => {
    console.log('Broker import completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error importing brokers:', error);
    process.exit(1);
  });