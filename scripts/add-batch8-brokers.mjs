import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch8Brokers = [
  {
    id: 'f0000000-0000-0000-0000-000000000400',
    name: 'HotForex',
    logo_url: '/images/brokers/hotforex.png',
    min_deposit: 50,
    trading_fee: 0.0,
    regulations: 'CySEC, FCA, DFSA',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Cyprus',
    rating: 4.5,
    website_url: 'https://www.hotforex.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, HotForex Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Limassol, Cyprus',
    year_founded: '2010'
  },
  {
    id: 'f1000000-0000-0000-0000-000000000410',
    name: 'JP Morgan Self-Directed Investing',
    logo_url: '/images/brokers/jp-morgan.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Options'],
    country: 'USA',
    rating: 4.5,
    website_url: 'https://www.jpmorgan.com/wealth-management/wealth-partners/investing',
    max_leverage: '1:4',
    trading_platforms: 'JP Morgan Platform, JP Morgan Mobile, JP Morgan Web',
    spread_from: '$0 commissions',
    headquarters: 'New York, USA',
    year_founded: '2021'
  },
  {
    id: 'f2000000-0000-0000-0000-000000000420',
    name: 'SaxoInvestor',
    logo_url: '/images/brokers/saxoinvestor.png',
    min_deposit: 2000,
    trading_fee: 0.0,
    regulations: 'DFSA, FCA, ASIC',
    supported_assets: ['Stocks', 'ETFs', 'Bonds'],
    country: 'Denmark',
    rating: 4.5,
    website_url: 'https://www.saxoinvestor.com',
    max_leverage: '1:5',
    trading_platforms: 'SaxoInvestor Platform, SaxoInvestor Mobile',
    spread_from: 'Low fees',
    headquarters: 'Copenhagen, Denmark',
    year_founded: '1992'
  },
  {
    id: 'f3000000-0000-0000-0000-000000000430',
    name: 'Upstox',
    logo_url: '/images/brokers/upstox.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEBI, NSE, BSE',
    supported_assets: ['Stocks', 'Options', 'Futures'],
    country: 'India',
    rating: 4.5,
    website_url: 'https://www.upstox.com',
    max_leverage: '1:5',
    trading_platforms: 'Upstox Pro, Upstox Mobile, Upstox Web',
    spread_from: 'Low brokerage',
    headquarters: 'Mumbai, India',
    year_founded: '2009'
  },
  {
    id: 'f4000000-0000-0000-0000-000000000440',
    name: 'Mirae Asset',
    logo_url: '/images/brokers/mirae-asset.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'FSC, KRX',
    supported_assets: ['Stocks', 'ETFs', 'Futures'],
    country: 'South Korea',
    rating: 4.5,
    website_url: 'https://www.miraeasset.com',
    max_leverage: '1:3',
    trading_platforms: 'Mirae Asset Platform, Mirae Asset Mobile',
    spread_from: 'Competitive fees',
    headquarters: 'Seoul, South Korea',
    year_founded: '1997'
  },
  {
    id: 'f5000000-0000-0000-0000-000000000450',
    name: 'QInvest',
    logo_url: '/images/brokers/qinvest.png',
    min_deposit: 5000,
    trading_fee: 0.0,
    regulations: 'QFCRA',
    supported_assets: ['Stocks', 'Bonds', 'Sukuk'],
    country: 'Qatar',
    rating: 4.5,
    website_url: 'https://www.qinvest.com',
    max_leverage: '1:2',
    trading_platforms: 'QInvest Platform, QInvest Mobile',
    spread_from: 'Premium fees',
    headquarters: 'Doha, Qatar',
    year_founded: '2007'
  },
  {
    id: 'f6000000-0000-0000-0000-000000000460',
    name: 'Zacks Trade',
    logo_url: '/images/brokers/zacks-trade.png',
    min_deposit: 2500,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'Options', 'Futures'],
    country: 'USA',
    rating: 4.5,
    website_url: 'https://www.zackstrade.com',
    max_leverage: '1:4',
    trading_platforms: 'Zacks Trade Platform, Zacks Trade Mobile',
    spread_from: 'Low commissions',
    headquarters: 'Chicago, Illinois, USA',
    year_founded: '2006'
  },
  {
    id: 'f7000000-0000-0000-0000-000000000470',
    name: 'MultiBank',
    logo_url: '/images/brokers/multibank.png',
    min_deposit: 50,
    trading_fee: 0.0,
    regulations: 'CySEC, ASIC, ADGM',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'UAE',
    rating: 4.4,
    website_url: 'https://www.multibank.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, MultiBank Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Dubai, UAE',
    year_founded: '2005'
  },
  {
    id: 'f8000000-0000-0000-0000-000000000480',
    name: 'RoboForex',
    logo_url: '/images/brokers/roboforex.png',
    min_deposit: 10,
    trading_fee: 0.0,
    regulations: 'CySEC, IFSC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Belize',
    rating: 4.4,
    website_url: 'https://www.roboforex.com',
    max_leverage: '1:2000',
    trading_platforms: 'MT4, MT5, cTrader, R Trader',
    spread_from: '0.0 pips',
    headquarters: 'Belize City, Belize',
    year_founded: '2009'
  },
  {
    id: 'f9000000-0000-0000-0000-000000000490',
    name: 'Bybit',
    logo_url: '/images/brokers/bybit.png',
    min_deposit: 0,
    trading_fee: 0.1,
    regulations: 'Various jurisdictions, Compliance programs',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'Singapore',
    rating: 4.4,
    website_url: 'https://www.bybit.com',
    max_leverage: '1:100',
    trading_platforms: 'Bybit Platform, Bybit Mobile, Bybit API',
    spread_from: '0.1% trading fee',
    headquarters: 'Singapore',
    year_founded: '2018'
  }
];

async function addBatch8Brokers() {
  try {
    console.log('Adding Batch 8 brokers to database...');

    for (const broker of batch8Brokers) {
      console.log(`\nProcessing ${broker.name}...`);
      
      // Check if broker already exists
      const { data: existingBroker } = await supabase
        .from('brokers')
        .select('id')
        .eq('id', broker.id)
        .single();

      if (existingBroker) {
        console.log(`${broker.name} already exists in database`);
        continue;
      }

      // Insert broker
      const { data, error } = await supabase
        .from('brokers')
        .insert([broker])
        .select();

      if (error) {
        console.error(`Error adding ${broker.name}:`, error);
      } else {
        console.log(`✅ Successfully added ${broker.name} to database`);
      }
    }

    console.log('\n🎉 Batch 8 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch8Brokers();
