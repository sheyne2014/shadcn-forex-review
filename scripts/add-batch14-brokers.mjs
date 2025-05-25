import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch14Brokers = [
  {
    id: 'e0000000-0000-0000-0000-000000001000',
    name: 'Bittrex',
    logo_url: '/images/brokers/bittrex.png',
    min_deposit: 0,
    trading_fee: 0.25,
    regulations: 'FinCEN, State Licenses',
    supported_assets: ['Bitcoin', 'Ethereum', 'Altcoins'],
    country: 'USA',
    rating: 4.2,
    website_url: 'https://www.bittrex.com',
    max_leverage: '1:1',
    trading_platforms: 'Bittrex Platform, Bittrex Mobile, Bittrex API',
    spread_from: '0.25% trading fee',
    headquarters: 'Seattle, Washington, USA',
    year_founded: '2014'
  },
  {
    id: 'e1000000-0000-0000-0000-000000001010',
    name: 'Dough Finance',
    logo_url: '/images/brokers/dough-finance.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'Options'],
    country: 'USA',
    rating: 4.2,
    website_url: 'https://www.dough.com',
    max_leverage: '1:4',
    trading_platforms: 'Dough Platform, Dough Mobile',
    spread_from: '$0 commissions',
    headquarters: 'Chicago, Illinois, USA',
    year_founded: '2019'
  },
  {
    id: 'e2000000-0000-0000-0000-000000001020',
    name: 'eToro USA',
    logo_url: '/images/brokers/etoro-usa.png',
    min_deposit: 50,
    trading_fee: 0.0,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'ETFs', 'Crypto'],
    country: 'USA',
    rating: 4.2,
    website_url: 'https://www.etoro.com/us',
    max_leverage: '1:2',
    trading_platforms: 'eToro USA Platform, eToro USA Mobile',
    spread_from: '$0 commissions',
    headquarters: 'Hoboken, New Jersey, USA',
    year_founded: '2018'
  },
  {
    id: 'e3000000-0000-0000-0000-000000001030',
    name: 'ICM Capital',
    logo_url: '/images/brokers/icm-capital.png',
    min_deposit: 200,
    trading_fee: 0.9,
    regulations: 'FCA, CySEC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'UK',
    rating: 4.2,
    website_url: 'https://www.icmcapital.co.uk',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, ICM Mobile',
    spread_from: '0.9 pips',
    headquarters: 'London, UK',
    year_founded: '2009'
  },
  {
    id: 'e4000000-0000-0000-0000-000000001040',
    name: 'Just2Trade',
    logo_url: '/images/brokers/just2trade.png',
    min_deposit: 100,
    trading_fee: 2.50,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'Options', 'Futures'],
    country: 'USA',
    rating: 4.2,
    website_url: 'https://www.just2trade.com',
    max_leverage: '1:4',
    trading_platforms: 'Just2Trade Platform, Just2Trade Mobile',
    spread_from: '$2.50 per trade',
    headquarters: 'New York, USA',
    year_founded: '2006'
  },
  {
    id: 'e5000000-0000-0000-0000-000000001050',
    name: 'M4Markets',
    logo_url: '/images/brokers/m4markets.png',
    min_deposit: 100,
    trading_fee: 0.0,
    regulations: 'FSA, VFSC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Seychelles',
    rating: 4.2,
    website_url: 'https://www.m4markets.com',
    max_leverage: '1:1000',
    trading_platforms: 'MT4, MT5, M4Markets Mobile',
    spread_from: '0.0 pips',
    headquarters: 'Victoria, Seychelles',
    year_founded: '2018'
  },
  {
    id: 'e6000000-0000-0000-0000-000000001060',
    name: 'SMC Global',
    logo_url: '/images/brokers/smc-global.png',
    min_deposit: 0,
    trading_fee: 0.5,
    regulations: 'SEBI, BSE, NSE',
    supported_assets: ['Stocks', 'Commodities', 'Forex'],
    country: 'India',
    rating: 4.2,
    website_url: 'https://www.smcindiaonline.com',
    max_leverage: '1:10',
    trading_platforms: 'SMC Platform, SMC Mobile, MT4',
    spread_from: '0.5 pips',
    headquarters: 'New Delhi, India',
    year_founded: '1994'
  },
  {
    id: 'e7000000-0000-0000-0000-000000001070',
    name: 'SMC Global Pro',
    logo_url: '/images/brokers/smc-global-pro.png',
    min_deposit: 0,
    trading_fee: 0.3,
    regulations: 'SEBI, BSE, NSE',
    supported_assets: ['Stocks', 'Commodities', 'Forex'],
    country: 'India',
    rating: 4.2,
    website_url: 'https://www.smcindiaonline.com/pro',
    max_leverage: '1:10',
    trading_platforms: 'SMC Pro Platform, SMC Pro Mobile, Advanced Tools',
    spread_from: '0.3 pips',
    headquarters: 'New Delhi, India',
    year_founded: '1994'
  },
  {
    id: 'e8000000-0000-0000-0000-000000001080',
    name: 'Tradier',
    logo_url: '/images/brokers/tradier.png',
    min_deposit: 0,
    trading_fee: 0.35,
    regulations: 'SEC, FINRA, SIPC',
    supported_assets: ['Stocks', 'Options'],
    country: 'USA',
    rating: 4.2,
    website_url: 'https://www.tradier.com',
    max_leverage: '1:4',
    trading_platforms: 'Tradier Platform, Tradier Mobile, API Access',
    spread_from: '$0.35 per contract',
    headquarters: 'Charlotte, North Carolina, USA',
    year_founded: '2012'
  },
  {
    id: 'e9000000-0000-0000-0000-000000001090',
    name: 'Vantagepoint AI',
    logo_url: '/images/brokers/vantagepoint-ai.png',
    min_deposit: 25,
    trading_fee: 1.0,
    regulations: 'ASIC, VFSC',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Australia',
    rating: 4.2,
    website_url: 'https://www.vantagepointai.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, Vantagepoint AI Mobile',
    spread_from: '1.0 pips',
    headquarters: 'Sydney, Australia',
    year_founded: '2009'
  }
];

async function addBatch14Brokers() {
  try {
    console.log('Adding Batch 14 brokers to database...');

    for (const broker of batch14Brokers) {
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

    console.log('\n🎉 Batch 14 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch14Brokers();
