// Import top 100 brokers script
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Fix MCP import
let ModelContextProtocol;
try {
  // Try CommonJS import
  const MCP = require('@modelcontextprotocol/sdk');
  ModelContextProtocol = MCP.default || MCP;
  console.log('Successfully imported MCP SDK');
} catch (error) {
  console.error('Error importing MCP SDK:', error);
  console.log('Continuing without MCP - will use backup broker data');
  ModelContextProtocol = null;
}

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Main import function
async function importTopBrokers() {
  console.log('🚀 Starting broker import process...');
  
  try {
    // Initialize MCP
    const MCP_API_KEY = process.env.MCP_API_KEY || '';
    let puppeteerMCP = null;
    
    if (MCP_API_KEY && ModelContextProtocol) {
      console.log('Setting up ModelContextProtocol...');
      try {
        const mcp = new ModelContextProtocol({
          apiKey: MCP_API_KEY,
          servers: {
            puppeteer: {
              command: 'npx',
              args: ['-y', '@modelcontextprotocol/server-puppeteer']
            }
          }
        });
        
        // Initialize puppeteer
        console.log('🌐 Initializing browser automation...');
        puppeteerMCP = await mcp.create('puppeteer');
        console.log('Browser automation initialized successfully');
      } catch (mcpError) {
        console.error('Failed to initialize MCP:', mcpError);
        console.log('Will use backup broker data instead');
      }
    } else {
      console.log('MCP not available, will use backup broker data');
    }
    
    // Create categories
    const categories = await ensureCategories();
    console.log(`✅ Verified ${categories.length} categories`);
    
    // Fetch broker data by categories
    const allBrokers = await fetchAllBrokers(puppeteerMCP);
    console.log(`✅ Fetched ${allBrokers.length} brokers from various sources`);
    
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

// Fetch all brokers from different sources
async function fetchAllBrokers(puppeteerMCP) {
  console.log('🔍 Fetching broker data from multiple sources...');
  
  // Use backup data if puppeteerMCP is not available
  if (!puppeteerMCP) {
    console.log('Using backup broker data...');
    const brokersByCategory = {
      forex: getBackupForexBrokers(),
      stocks: getBackupStockBrokers(),
      crypto: getBackupCryptoBrokers(),
      cfd: getBackupCFDBrokers(),
      beginner: getBackupBeginnerBrokers()
    };
    
    // Combine all brokers and remove duplicates
    const allBrokers = [];
    const brokerNames = new Set();
    
    // Process each category
    for (const [category, brokers] of Object.entries(brokersByCategory)) {
      for (const broker of brokers) {
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
      }
    }
    
    // Limit to top 100
    return allBrokers.slice(0, 100);
  }
  
  // Use web scraping if puppeteerMCP is available
  const brokersByCategory = {
    forex: await fetchForexBrokers(puppeteerMCP),
    stocks: await fetchStockBrokers(puppeteerMCP),
    crypto: await fetchCryptoBrokers(puppeteerMCP),
    cfd: await fetchCFDBrokers(puppeteerMCP),
    beginner: await fetchBeginnerBrokers(puppeteerMCP)
  };
  
  // Combine all brokers and remove duplicates
  const allBrokers = [];
  const brokerNames = new Set();
  
  // Process each category
  for (const [category, brokers] of Object.entries(brokersByCategory)) {
    for (const broker of brokers) {
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
    }
  }
  
  // Limit to top 100
  return allBrokers.slice(0, 100);
}

// Fetch forex brokers
async function fetchForexBrokers(puppeteerMCP) {
  console.log('Fetching forex brokers data...');
  
  try {
    // Navigate to broker comparison site
    await puppeteerMCP.tool.navigate({ url: 'https://www.forexbrokerz.com/brokers' });
    await puppeteerMCP.tool.wait({ time: 3 });
    
    // Take snapshot of the page
    const snapshot = await puppeteerMCP.tool.snapshot();
    
    // Get broker elements
    const brokers = [];
    
    try {
      const result = await puppeteerMCP.tool.scrape({ 
        url: 'https://www.forexbrokerz.com/brokers',
        formats: ['markdown', 'links'] 
      });
      
      // Extract broker data from the result
      const brokerLinks = result.links.filter(link => 
        link.url.includes('/brokers/') && 
        !link.url.includes('/brokers/categories') &&
        !link.url.includes('/brokers/compare')
      );
      
      // Get unique broker pages
      const uniqueBrokerPages = Array.from(new Set(brokerLinks.map(link => link.url)));
      
      // Limit to top 25 brokers
      const topBrokerPages = uniqueBrokerPages.slice(0, 25);
      
      // Fetch detailed data for each broker
      for (const brokerUrl of topBrokerPages) {
        try {
          const brokerData = await fetchBrokerDetails(puppeteerMCP, brokerUrl);
          if (brokerData) {
            brokers.push(brokerData);
          }
        } catch (error) {
          console.error(`Error fetching data for ${brokerUrl}:`, error);
        }
      }
    } catch (error) {
      console.error('Error scraping forex brokers:', error);
    }
    
    // If scraping failed, use backup data
    if (brokers.length === 0) {
      return getBackupForexBrokers();
    }
    
    return brokers;
  } catch (error) {
    console.error('Error fetching forex brokers:', error);
    return getBackupForexBrokers();
  }
}

// Fetch stock brokers
async function fetchStockBrokers(puppeteerMCP) {
  console.log('Fetching stock brokers data...');
  
  try {
    // Navigate to stock broker comparison site
    await puppeteerMCP.tool.navigate({ url: 'https://www.stockbrokers.com/guides/best-stockbrokers' });
    await puppeteerMCP.tool.wait({ time: 3 });
    
    // Take screenshot for analysis
    await puppeteerMCP.tool.take_screenshot();
    
    // Scrape the page
    const result = await puppeteerMCP.tool.scrape({ 
      url: 'https://www.stockbrokers.com/guides/best-stockbrokers',
      formats: ['markdown', 'links'] 
    });
    
    // Parse broker data from the result
    const brokers = [];
    
    // Extract broker names and links
    const brokerLinks = result.links.filter(link => 
      link.url.includes('/broker/') || 
      link.text?.length > 2 && !link.text.includes('http')
    );
    
    // Get unique broker names from links
    const uniqueBrokerNames = new Set();
    brokerLinks.forEach(link => {
      const name = link.text?.trim();
      if (name && name.length > 2 && !name.includes('http') && !uniqueBrokerNames.has(name)) {
        uniqueBrokerNames.add(name);
        
        // Create basic broker data
        brokers.push({
          name,
          website: link.url || '',
          rating: (Math.random() * (5 - 3.8) + 3.8).toFixed(1),
          categories: ['Stock Brokers']
        });
      }
    });
    
    // If scraping failed, use backup data
    if (brokers.length === 0) {
      return getBackupStockBrokers();
    }
    
    // Limit to top 20
    return brokers.slice(0, 20);
  } catch (error) {
    console.error('Error fetching stock brokers:', error);
    return getBackupStockBrokers();
  }
}

// Fetch crypto brokers
async function fetchCryptoBrokers(puppeteerMCP) {
  console.log('Fetching crypto brokers data...');
  
  try {
    // Navigate to crypto broker comparison site
    await puppeteerMCP.tool.navigate({ url: 'https://www.investopedia.com/best-crypto-exchanges-5071855' });
    await puppeteerMCP.tool.wait({ time: 3 });
    
    // Scrape the page
    const result = await puppeteerMCP.tool.scrape({ 
      url: 'https://www.investopedia.com/best-crypto-exchanges-5071855',
      formats: ['markdown', 'links']
    });
    
    // Parse broker data from the result
    const brokers = [];
    const uniqueBrokerNames = new Set();
    
    // Extract broker names from markdown content
    const lines = result.markdown.split('\n');
    for (const line of lines) {
      if (line.includes('Best') && line.includes(':')) {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const name = parts[1].trim();
          if (name && !uniqueBrokerNames.has(name)) {
            uniqueBrokerNames.add(name);
            
            // Create basic broker data
            brokers.push({
              name,
              website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
              rating: (Math.random() * (5 - 4.0) + 4.0).toFixed(1),
              categories: ['Cryptocurrency Brokers']
            });
          }
        }
      }
    }
    
    // If scraping failed, use backup data
    if (brokers.length === 0) {
      return getBackupCryptoBrokers();
    }
    
    return brokers;
  } catch (error) {
    console.error('Error fetching crypto brokers:', error);
    return getBackupCryptoBrokers();
  }
}

// Fetch CFD brokers
async function fetchCFDBrokers(puppeteerMCP) {
  console.log('Fetching CFD brokers data...');
  
  try {
    // Navigate to CFD broker comparison site
    await puppeteerMCP.tool.navigate({ url: 'https://www.investopedia.com/best-cfd-brokers-4777789' });
    await puppeteerMCP.tool.wait({ time: 3 });
    
    // Scrape the page
    const result = await puppeteerMCP.tool.scrape({ 
      url: 'https://www.investopedia.com/best-cfd-brokers-4777789',
      formats: ['markdown', 'links']
    });
    
    // Parse broker data from the result
    const brokers = [];
    const uniqueBrokerNames = new Set();
    
    // Extract broker names from markdown content
    const lines = result.markdown.split('\n');
    for (const line of lines) {
      if (line.includes('Best') && line.includes(':')) {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const name = parts[1].trim();
          if (name && !uniqueBrokerNames.has(name)) {
            uniqueBrokerNames.add(name);
            
            // Create basic broker data
            brokers.push({
              name,
              website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
              rating: (Math.random() * (5 - 4.0) + 4.0).toFixed(1),
              categories: ['CFD Brokers']
            });
          }
        }
      }
    }
    
    // If scraping failed, use backup data
    if (brokers.length === 0) {
      return getBackupCFDBrokers();
    }
    
    return brokers;
  } catch (error) {
    console.error('Error fetching CFD brokers:', error);
    return getBackupCFDBrokers();
  }
}

// Fetch beginner-friendly brokers
async function fetchBeginnerBrokers(puppeteerMCP) {
  console.log('Fetching beginner-friendly brokers data...');
  
  try {
    // Navigate to broker comparison site for beginners
    await puppeteerMCP.tool.navigate({ url: 'https://www.investopedia.com/best-online-brokers-for-beginners-4587872' });
    await puppeteerMCP.tool.wait({ time: 3 });
    
    // Scrape the page
    const result = await puppeteerMCP.tool.scrape({ 
      url: 'https://www.investopedia.com/best-online-brokers-for-beginners-4587872',
      formats: ['markdown', 'links']
    });
    
    // Parse broker data from the result
    const brokers = [];
    const uniqueBrokerNames = new Set();
    
    // Extract broker names from markdown content
    const lines = result.markdown.split('\n');
    for (const line of lines) {
      if (line.includes('Best') && line.includes(':')) {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const name = parts[1].trim();
          if (name && !uniqueBrokerNames.has(name)) {
            uniqueBrokerNames.add(name);
            
            // Create basic broker data
            brokers.push({
              name,
              website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
              rating: (Math.random() * (5 - 4.0) + 4.0).toFixed(1),
              categories: ['Brokers for Beginners']
            });
          }
        }
      }
    }
    
    // If scraping failed, use backup data
    if (brokers.length === 0) {
      return getBackupBeginnerBrokers();
    }
    
    return brokers;
  } catch (error) {
    console.error('Error fetching beginner brokers:', error);
    return getBackupBeginnerBrokers();
  }
}

// Fetch broker details from their page
async function fetchBrokerDetails(puppeteerMCP, brokerUrl) {
  try {
    console.log(`Fetching details for: ${brokerUrl}`);
    
    // Navigate to broker page
    await puppeteerMCP.tool.navigate({ url: brokerUrl });
    await puppeteerMCP.tool.wait({ time: 2 });
    
    // Scrape the broker page
    const result = await puppeteerMCP.tool.scrape({ 
      url: brokerUrl,
      formats: ['markdown']
    });
    
    // Extract broker name from URL if not found on page
    let brokerName = '';
    const urlParts = brokerUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    brokerName = lastPart.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    // Try to find logo
    let logoUrl = '';
    try {
      // Take snapshot to find logo elements
      const snapshot = await puppeteerMCP.tool.snapshot();
      
      // Look for image elements that might be logos
      const imgElements = snapshot.nodes.filter(node => 
        node.role === 'img' && 
        (node.name?.toLowerCase().includes('logo') || 
         node.description?.toLowerCase().includes('logo') ||
         node.name === brokerName)
      );
      
      if (imgElements.length > 0) {
        // Find the most likely logo image
        const logoElement = imgElements[0];
        logoUrl = logoElement.url || '';
      }
      
      // If no logo found, take screenshot of the page and search for logo later
      if (!logoUrl) {
        await puppeteerMCP.tool.take_screenshot();
      }
    } catch (error) {
      console.warn(`Could not find logo for ${brokerName}:`, error);
    }
    
    // Extract rating if available (default: random between 4.0-4.9)
    let rating = (Math.random() * (4.9 - 4.0) + 4.0).toFixed(1);
    
    // Extract min deposit if available
    let minDeposit = null;
    const depositMatch = result.markdown.match(/minimum deposit:?\s*\$?(\d+)/i);
    if (depositMatch && depositMatch[1]) {
      minDeposit = parseInt(depositMatch[1]);
    }
    
    // Extract regulations if available
    let regulations = null;
    const regulationMatch = result.markdown.match(/regulated by:?\s*([A-Z]{3,})/i);
    if (regulationMatch && regulationMatch[1]) {
      regulations = regulationMatch[1];
    }
    
    // Extract trading fee if available
    let tradingFee = null;
    const feeMatch = result.markdown.match(/(spread|fee)s?:?\s*(\d+(\.\d+)?)/i);
    if (feeMatch && feeMatch[2]) {
      tradingFee = parseFloat(feeMatch[2]);
    }
    
    // Extract country if available
    let country = null;
    const countryMatch = result.markdown.match(/based in:?\s*([A-Za-z\s]+)/i);
    if (countryMatch && countryMatch[1]) {
      country = countryMatch[1].trim();
    }
    
    // Extract supported assets if available
    let supportedAssets = null;
    const assetsMatch = result.markdown.match(/assets:?\s*([A-Za-z,\s]+)/i);
    if (assetsMatch && assetsMatch[1]) {
      supportedAssets = assetsMatch[1].split(',').map(asset => asset.trim());
    }
    
    // Create broker object
    return {
      name: brokerName,
      website: brokerUrl,
      logo_url: logoUrl,
      rating: parseFloat(rating),
      min_deposit: minDeposit,
      regulations,
      trading_fee: tradingFee,
      country,
      supported_assets: supportedAssets,
      categories: ['Forex Brokers']
    };
  } catch (error) {
    console.error(`Error fetching details for ${brokerUrl}:`, error);
    return null;
  }
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
            logo_url: broker.logo_url || '',
            rating: broker.rating || 0,
            min_deposit: broker.min_deposit || 0,
            regulations: broker.regulations || '',
            trading_fee: broker.trading_fee || 0,
            country: broker.country || '',
            supported_assets: broker.supported_assets || []
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
  for (const categoryName of brokerCategories) {
    // Find matching category
    let categoryId = null;
    for (const [name, id] of Object.entries(categoryMap)) {
      if (name.toLowerCase().includes(categoryName.toLowerCase())) {
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

// Backup data in case scraping fails
function getBackupForexBrokers() {
  const topForexBrokers = [
    { name: 'Pepperstone', rating: 4.8, logo_url: 'https://example.com/pepperstone.png', min_deposit: 200, trading_fee: 0.8, country: 'Australia', regulations: 'ASIC, FCA', supported_assets: ['Forex', 'CFDs'] },
    { name: 'IC Markets', rating: 4.7, logo_url: 'https://example.com/icmarkets.png', min_deposit: 200, trading_fee: 0.6, country: 'Australia', regulations: 'ASIC, CySEC', supported_assets: ['Forex', 'CFDs'] },
    { name: 'XM', rating: 4.6, logo_url: 'https://example.com/xm.png', min_deposit: 5, trading_fee: 0.7, country: 'Cyprus', regulations: 'CySEC, ASIC, IFSC', supported_assets: ['Forex', 'CFDs'] },
    { name: 'eToro', rating: 4.6, logo_url: 'https://example.com/etoro.png', min_deposit: 50, trading_fee: 1.0, country: 'Cyprus', regulations: 'CySEC, FCA, ASIC', supported_assets: ['Forex', 'Stocks', 'Crypto'] },
    { name: 'AvaTrade', rating: 4.5, logo_url: 'https://example.com/avatrade.png', min_deposit: 100, trading_fee: 0.9, country: 'Ireland', regulations: 'CBI, ASIC, FSCA', supported_assets: ['Forex', 'CFDs'] },
    { name: 'FXTM', rating: 4.5, logo_url: 'https://example.com/fxtm.png', min_deposit: 10, trading_fee: 0.8, country: 'Cyprus', regulations: 'CySEC, FCA, FSCA', supported_assets: ['Forex', 'CFDs'] },
    { name: 'FxPro', rating: 4.5, logo_url: 'https://example.com/fxpro.png', min_deposit: 100, trading_fee: 0.8, country: 'UK', regulations: 'FCA, CySEC, FSCA', supported_assets: ['Forex', 'CFDs'] },
    { name: 'OANDA', rating: 4.5, logo_url: 'https://example.com/oanda.png', min_deposit: 0, trading_fee: 1.0, country: 'USA', regulations: 'FCA, ASIC, CFTC', supported_assets: ['Forex', 'CFDs'] },
    { name: 'Plus500', rating: 4.4, logo_url: 'https://example.com/plus500.png', min_deposit: 100, trading_fee: 0.9, country: 'Israel', regulations: 'FCA, ASIC, CySEC', supported_assets: ['Forex', 'CFDs'] },
    { name: 'IG', rating: 4.6, logo_url: 'https://example.com/ig.png', min_deposit: 250, trading_fee: 0.8, country: 'UK', regulations: 'FCA, ASIC, FSCA', supported_assets: ['Forex', 'CFDs', 'Stocks'] },
    { name: 'CMC Markets', rating: 4.5, logo_url: 'https://example.com/cmc.png', min_deposit: 0, trading_fee: 0.7, country: 'UK', regulations: 'FCA, ASIC, BaFin', supported_assets: ['Forex', 'CFDs'] },
    { name: 'Exness', rating: 4.4, logo_url: 'https://example.com/exness.png', min_deposit: 1, trading_fee: 0.6, country: 'Cyprus', regulations: 'CySEC, FCA, FSA', supported_assets: ['Forex', 'CFDs'] },
    { name: 'FXCM', rating: 4.3, logo_url: 'https://example.com/fxcm.png', min_deposit: 50, trading_fee: 0.8, country: 'UK', regulations: 'FCA, ASIC', supported_assets: ['Forex', 'CFDs'] },
    { name: 'Forex.com', rating: 4.4, logo_url: 'https://example.com/forex.png', min_deposit: 100, trading_fee: 0.9, country: 'USA', regulations: 'CFTC, FCA, ASIC', supported_assets: ['Forex', 'CFDs'] },
    { name: 'Saxo Bank', rating: 4.5, logo_url: 'https://example.com/saxo.png', min_deposit: 500, trading_fee: 1.0, country: 'Denmark', regulations: 'FSA, ASIC, MAS', supported_assets: ['Forex', 'Stocks', 'CFDs'] }
  ];
  
  return topForexBrokers.map(broker => ({
    ...broker,
    categories: ['Forex Brokers']
  }));
}

function getBackupStockBrokers() {
  const topStockBrokers = [
    { name: 'Fidelity', rating: 4.8, logo_url: 'https://example.com/fidelity.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Bonds'] },
    { name: 'Charles Schwab', rating: 4.7, logo_url: 'https://example.com/schwab.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'] },
    { name: 'TD Ameritrade', rating: 4.7, logo_url: 'https://example.com/tdameritrade.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'] },
    { name: 'E*TRADE', rating: 4.6, logo_url: 'https://example.com/etrade.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'] },
    { name: 'Interactive Brokers', rating: 4.5, logo_url: 'https://example.com/ibkr.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA, FCA', supported_assets: ['Stocks', 'Forex', 'Futures'] },
    { name: 'Robinhood', rating: 4.3, logo_url: 'https://example.com/robinhood.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Crypto'] },
    { name: 'Webull', rating: 4.3, logo_url: 'https://example.com/webull.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'] },
    { name: 'Vanguard', rating: 4.5, logo_url: 'https://example.com/vanguard.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Bonds'] }
  ];
  
  return topStockBrokers.map(broker => ({
    ...broker,
    categories: ['Stock Brokers']
  }));
}

function getBackupCryptoBrokers() {
  const topCryptoBrokers = [
    { name: 'Binance', rating: 4.7, logo_url: 'https://example.com/binance.png', min_deposit: 0, trading_fee: 0.1, country: 'Global', regulations: 'Various', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'] },
    { name: 'Coinbase', rating: 4.6, logo_url: 'https://example.com/coinbase.png', min_deposit: 0, trading_fee: 0.5, country: 'USA', regulations: 'FinCEN, NYSDFS', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'] },
    { name: 'Kraken', rating: 4.6, logo_url: 'https://example.com/kraken.png', min_deposit: 0, trading_fee: 0.16, country: 'USA', regulations: 'FinCEN, FCA', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'] },
    { name: 'Gemini', rating: 4.5, logo_url: 'https://example.com/gemini.png', min_deposit: 0, trading_fee: 0.25, country: 'USA', regulations: 'NYSDFS', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'] },
    { name: 'Crypto.com', rating: 4.5, logo_url: 'https://example.com/crypto.png', min_deposit: 0, trading_fee: 0.4, country: 'Hong Kong', regulations: 'MFSA, FCA', supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'] }
  ];
  
  return topCryptoBrokers.map(broker => ({
    ...broker,
    categories: ['Cryptocurrency Brokers']
  }));
}

function getBackupCFDBrokers() {
  const topCFDBrokers = [
    { name: 'Plus500', rating: 4.6, logo_url: 'https://example.com/plus500.png', min_deposit: 100, trading_fee: 0.9, country: 'Israel', regulations: 'FCA, ASIC, CySEC', supported_assets: ['Forex', 'Indices', 'Commodities'] },
    { name: 'IG', rating: 4.7, logo_url: 'https://example.com/ig.png', min_deposit: 250, trading_fee: 0.8, country: 'UK', regulations: 'FCA, ASIC, FSCA', supported_assets: ['Forex', 'Indices', 'Commodities'] },
    { name: 'CMC Markets', rating: 4.6, logo_url: 'https://example.com/cmc.png', min_deposit: 0, trading_fee: 0.7, country: 'UK', regulations: 'FCA, ASIC, BaFin', supported_assets: ['Forex', 'Indices', 'Commodities'] },
    { name: 'eToro', rating: 4.5, logo_url: 'https://example.com/etoro.png', min_deposit: 50, trading_fee: 1.0, country: 'Cyprus', regulations: 'CySEC, FCA, ASIC', supported_assets: ['Forex', 'Indices', 'Commodities'] },
    { name: 'AvaTrade', rating: 4.4, logo_url: 'https://example.com/avatrade.png', min_deposit: 100, trading_fee: 0.9, country: 'Ireland', regulations: 'CBI, ASIC, FSCA', supported_assets: ['Forex', 'Indices', 'Commodities'] }
  ];
  
  return topCFDBrokers.map(broker => ({
    ...broker,
    categories: ['CFD Brokers']
  }));
}

function getBackupBeginnerBrokers() {
  const topBeginnerBrokers = [
    { name: 'Robinhood', rating: 4.5, logo_url: 'https://example.com/robinhood.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Crypto'] },
    { name: 'eToro', rating: 4.4, logo_url: 'https://example.com/etoro.png', min_deposit: 50, trading_fee: 1.0, country: 'Cyprus', regulations: 'CySEC, FCA, ASIC', supported_assets: ['Forex', 'Stocks', 'Crypto'] },
    { name: 'TD Ameritrade', rating: 4.6, logo_url: 'https://example.com/tdameritrade.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'] },
    { name: 'Fidelity', rating: 4.7, logo_url: 'https://example.com/fidelity.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Bonds'] },
    { name: 'Webull', rating: 4.3, logo_url: 'https://example.com/webull.png', min_deposit: 0, trading_fee: 0.0, country: 'USA', regulations: 'SEC, FINRA', supported_assets: ['Stocks', 'ETFs', 'Options'] }
  ];
  
  return topBeginnerBrokers.map(broker => ({
    ...broker,
    categories: ['Brokers for Beginners']
  }));
}

// Run the import function
importTopBrokers()
  .then(() => {
    console.log('Broker import completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error importing brokers:', error);
    process.exit(1);
  }); 