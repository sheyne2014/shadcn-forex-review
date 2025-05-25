import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const batch6Brokers = [
  {
    id: 'd0000000-0000-0000-0000-000000000200',
    name: 'Nubank',
    logo_url: '/images/brokers/nubank.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'CVM, BACEN',
    supported_assets: ['Stocks', 'ETFs', 'Crypto'],
    country: 'Brazil',
    rating: 4.7,
    website_url: 'https://www.nubank.com.br',
    max_leverage: '1:1',
    trading_platforms: 'Nubank App, Nubank Web',
    spread_from: '$0 commissions',
    headquarters: 'São Paulo, Brazil',
    year_founded: '2013'
  },
  {
    id: 'd1000000-0000-0000-0000-000000000210',
    name: 'NinjaTrader',
    logo_url: '/images/brokers/ninjatrader.png',
    min_deposit: 1000,
    trading_fee: 0.53,
    regulations: 'CFTC, NFA',
    supported_assets: ['Futures', 'Forex'],
    country: 'USA',
    rating: 4.6,
    website_url: 'https://www.ninjatrader.com',
    max_leverage: '1:50',
    trading_platforms: 'NinjaTrader 8, NinjaTrader Mobile',
    spread_from: '$0.53 per contract',
    headquarters: 'Chicago, Illinois, USA',
    year_founded: '2003'
  },
  {
    id: 'd2000000-0000-0000-0000-000000000220',
    name: 'Admirals',
    logo_url: '/images/brokers/admirals.png',
    min_deposit: 100,
    trading_fee: 0.5,
    regulations: 'FCA, CySEC, ASIC, EFSA',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Estonia',
    rating: 4.6,
    website_url: 'https://www.admirals.com',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, MetaTrader WebTrader',
    spread_from: '0.5 pips',
    headquarters: 'Tallinn, Estonia',
    year_founded: '2001'
  },
  {
    id: 'd3000000-0000-0000-0000-000000000230',
    name: 'LMAX',
    logo_url: '/images/brokers/lmax.png',
    min_deposit: 10000,
    trading_fee: 0.1,
    regulations: 'FCA',
    supported_assets: ['Forex', 'CFDs', 'Metals'],
    country: 'UK',
    rating: 4.6,
    website_url: 'https://www.lmax.com',
    max_leverage: '1:30',
    trading_platforms: 'LMAX Platform, MT4, FIX API',
    spread_from: '0.1 pips',
    headquarters: 'London, UK',
    year_founded: '2010'
  },
  {
    id: 'd4000000-0000-0000-0000-000000000240',
    name: 'Rakuten Securities',
    logo_url: '/images/brokers/rakuten-securities.png',
    min_deposit: 0,
    trading_fee: 0.0,
    regulations: 'JFSA',
    supported_assets: ['Stocks', 'Futures', 'Options'],
    country: 'Japan',
    rating: 4.6,
    website_url: 'https://www.rakuten-sec.co.jp',
    max_leverage: '1:25',
    trading_platforms: 'MarketSpeed, iSPEED, Rakuten Mobile',
    spread_from: '¥0 commissions',
    headquarters: 'Tokyo, Japan',
    year_founded: '1999'
  },
  {
    id: 'd5000000-0000-0000-0000-000000000250',
    name: 'Exness',
    logo_url: '/images/brokers/exness.png',
    min_deposit: 0,
    trading_fee: 0.3,
    regulations: 'FCA, CySEC, FSCA',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Cyprus',
    rating: 4.6,
    website_url: 'https://www.exness.com',
    max_leverage: '1:2000',
    trading_platforms: 'MT4, MT5, Exness Terminal',
    spread_from: '0.3 pips',
    headquarters: 'Limassol, Cyprus',
    year_founded: '2008'
  },
  {
    id: 'd6000000-0000-0000-0000-000000000260',
    name: 'FxPro',
    logo_url: '/images/brokers/fxpro.png',
    min_deposit: 100,
    trading_fee: 0.6,
    regulations: 'FCA, CySEC, FSCA, SCB',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'UK',
    rating: 4.6,
    website_url: 'https://www.fxpro.com',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, cTrader, FxPro Edge',
    spread_from: '0.6 pips',
    headquarters: 'London, UK',
    year_founded: '2006'
  },
  {
    id: 'd7000000-0000-0000-0000-000000000270',
    name: 'Vantage',
    logo_url: '/images/brokers/vantage.png',
    min_deposit: 200,
    trading_fee: 0.0,
    regulations: 'ASIC, FCA, CIMA',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Australia',
    rating: 4.6,
    website_url: 'https://www.vantagemarkets.com',
    max_leverage: '1:500',
    trading_platforms: 'MT4, MT5, Vantage App',
    spread_from: '0.0 pips',
    headquarters: 'Sydney, Australia',
    year_founded: '2009'
  },
  {
    id: 'd8000000-0000-0000-0000-000000000280',
    name: 'AvaTrade',
    logo_url: '/images/brokers/avatrade.png',
    min_deposit: 100,
    trading_fee: 0.9,
    regulations: 'CBI, ASIC, FSCA, ADGM',
    supported_assets: ['Forex', 'CFDs', 'Crypto'],
    country: 'Ireland',
    rating: 4.6,
    website_url: 'https://www.avatrade.com',
    max_leverage: '1:30',
    trading_platforms: 'MT4, MT5, AvaTradeGO, WebTrader',
    spread_from: '0.9 pips',
    headquarters: 'Dublin, Ireland',
    year_founded: '2006'
  },
  {
    id: 'd9000000-0000-0000-0000-000000000290',
    name: 'IG',
    logo_url: '/images/brokers/ig.png',
    min_deposit: 250,
    trading_fee: 0.6,
    regulations: 'FCA, ASIC, MAS, BaFin',
    supported_assets: ['Forex', 'CFDs', 'Stocks'],
    country: 'UK',
    rating: 4.6,
    website_url: 'https://www.ig.com',
    max_leverage: '1:30',
    trading_platforms: 'IG Platform, MT4, ProRealTime, L2 Dealer',
    spread_from: '0.6 pips',
    headquarters: 'London, UK',
    year_founded: '1974'
  }
];

async function addBatch6Brokers() {
  try {
    console.log('Adding Batch 6 brokers to database...');

    for (const broker of batch6Brokers) {
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

    console.log('\n🎉 Batch 6 brokers processing complete!');

  } catch (error) {
    console.error('Error:', error);
  }
}

addBatch6Brokers();
