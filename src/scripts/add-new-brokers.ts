import { db } from '../lib/database';
import { BrokerInsert } from '../lib/database-types';

// Define a custom type with all database fields
interface CustomBrokerInsert {
  id?: string;
  name: string;
  logo_url?: string | null;
  min_deposit?: number | null;
  trading_fee?: number | null;
  regulations?: string | null;
  supported_assets?: string[] | null;
  country?: string | null;
  rating?: number | null;
  min_trade_size?: string | null;
  max_leverage?: string | null;
  spread_from?: string | null;
  trading_platforms?: string | null;
  account_currencies?: string | null;
  regulation?: string | null;
  headquarters?: string | null;
  year_founded?: string | null;
  website_url?: string | null;
  badge?: string | null;
  created_at?: string | null;
}

/**
 * Script to add StarTrader and AXI brokers to the database
 */
async function addNewBrokers() {
  try {
    console.log('Adding new brokers to the database...');
    
    // Get all categories
    const categories = await db.categories.getAll();
    const forexCategory = categories.find(c => c.name.toLowerCase().includes('forex'));
    const stocksCategory = categories.find(c => c.name.toLowerCase().includes('stocks'));
    const cryptoCategory = categories.find(c => c.name.toLowerCase().includes('crypto'));
    const commoditiesCategory = categories.find(c => c.name.toLowerCase().includes('commodit'));
    const indicesCategory = categories.find(c => c.name.toLowerCase().includes('indic'));
    
    if (!forexCategory) {
      throw new Error('Forex category not found');
    }
    
    // Add StarTrader
    const starTraderData: CustomBrokerInsert = {
      name: 'StarTrader',
      logo_url: 'https://placehold.co/200x200?text=StarTrader',
      min_deposit: 200,
      trading_fee: 0,
      regulations: 'ASIC, FCA, CySEC',
      supported_assets: ['Forex', 'Indices', 'Commodities', 'Stocks', 'Crypto'],
      country: 'Australia',
      rating: 4.6,
      min_trade_size: '0.01 lots',
      max_leverage: '1:500',
      spread_from: '0.8 pips',
      trading_platforms: 'StarTrader Pro, MT4, MT5, Mobile App',
      account_currencies: 'USD, EUR, GBP, AUD',
      regulation: 'ASIC (Australia), FCA (UK), CySEC (Cyprus)',
      headquarters: 'Sydney, Australia',
      year_founded: '2015',
      website_url: 'https://www.startrader.com'
    };
    
    console.log('Adding StarTrader...');
    const starTraderBroker = await db.brokers.createOrUpdate(starTraderData as unknown as BrokerInsert);
    
    // Add categories for StarTrader
    if (forexCategory) {
      await db.brokerCategories.add(starTraderBroker.id, forexCategory.id);
    }
    if (stocksCategory) {
      await db.brokerCategories.add(starTraderBroker.id, stocksCategory.id);
    }
    if (cryptoCategory) {
      await db.brokerCategories.add(starTraderBroker.id, cryptoCategory.id);
    }
    if (commoditiesCategory) {
      await db.brokerCategories.add(starTraderBroker.id, commoditiesCategory.id);
    }
    if (indicesCategory) {
      await db.brokerCategories.add(starTraderBroker.id, indicesCategory.id);
    }
    
    // Add AXI
    const axiData: CustomBrokerInsert = {
      name: 'AXI',
      logo_url: 'https://placehold.co/200x200?text=AXI',
      min_deposit: 50,
      trading_fee: 0,
      regulations: 'ASIC, FCA, DFSA',
      supported_assets: ['Forex', 'Indices', 'Commodities', 'Crypto'],
      country: 'Australia',
      rating: 4.4,
      min_trade_size: '0.01 lots',
      max_leverage: '1:400',
      spread_from: '0.0 pips',
      trading_platforms: 'MT4, WebTrader, Mobile App',
      account_currencies: 'USD, EUR, GBP, AUD, JPY',
      regulation: 'ASIC (Australia), FCA (UK), DFSA (Dubai)',
      headquarters: 'Sydney, Australia',
      year_founded: '2007',
      website_url: 'https://www.axi.com'
    };
    
    console.log('Adding AXI...');
    const axiBroker = await db.brokers.createOrUpdate(axiData as unknown as BrokerInsert);
    
    // Add categories for AXI
    if (forexCategory) {
      await db.brokerCategories.add(axiBroker.id, forexCategory.id);
    }
    if (cryptoCategory) {
      await db.brokerCategories.add(axiBroker.id, cryptoCategory.id);
    }
    if (commoditiesCategory) {
      await db.brokerCategories.add(axiBroker.id, commoditiesCategory.id);
    }
    if (indicesCategory) {
      await db.brokerCategories.add(axiBroker.id, indicesCategory.id);
    }
    
    console.log('Successfully added new brokers!');
  } catch (error) {
    console.error('Error adding new brokers:', error);
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  addNewBrokers().then(() => process.exit(0));
}

export default addNewBrokers; 