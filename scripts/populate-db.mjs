import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase URL or service role key in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('Setting up Supabase database...');
    
    // Insert sample brokers
    const { data, error } = await supabase
      .from('brokers')
      .insert([
        {
          id: 'b1000000-0000-0000-0000-000000000001',
          name: 'XYZ Broker',
          description: 'A leading forex broker with competitive spreads and advanced trading tools.',
          country: 'United Kingdom',
          regulations: 'FCA, ASIC',
          min_deposit: 100,
          trading_fee: 0.8,
          logo_url: 'https://placehold.co/150x60?text=XYZ',
          rating: 4.7,
          supported_assets: ['Forex', 'Stocks', 'Commodities', 'Crypto'],
          url: 'https://xyz-broker.example.com'
        },
        {
          id: 'b2000000-0000-0000-0000-000000000002',
          name: 'Alpha Trading',
          description: 'Multi-asset broker with a focus on forex and commodities trading.',
          country: 'Australia',
          regulations: 'ASIC, CySEC',
          min_deposit: 200,
          trading_fee: 1.2,
          logo_url: 'https://placehold.co/150x60?text=Alpha',
          rating: 4.2,
          supported_assets: ['Forex', 'Commodities', 'Indices'],
          url: 'https://alpha-trading.example.com'
        },
        {
          id: 'b3000000-0000-0000-0000-000000000003',
          name: 'Global FX',
          description: 'Global forex broker with 24/7 customer support and educational resources.',
          country: 'Cyprus',
          regulations: 'CySEC, FSA',
          min_deposit: 50,
          trading_fee: 0.5,
          logo_url: 'https://placehold.co/150x60?text=GlobalFX',
          rating: 4.8,
          supported_assets: ['Forex', 'Crypto', 'Metals'],
          url: 'https://globalfx.example.com'
        },
        {
          id: 'b4000000-0000-0000-0000-000000000004',
          name: 'Trade Pro',
          description: 'Advanced trading platform for professional traders and institutions.',
          country: 'Germany',
          regulations: 'BaFin, FCA',
          min_deposit: 500,
          trading_fee: 0.3,
          logo_url: 'https://placehold.co/150x60?text=TradePro',
          rating: 4.6,
          supported_assets: ['Forex', 'CFD', 'Options', 'ETF'],
          url: 'https://tradepro.example.com'
        },
        {
          id: 'b5000000-0000-0000-0000-000000000005',
          name: 'Crypto Exchange',
          description: 'Specialized in cryptocurrency trading with low fees and high security.',
          country: 'Singapore',
          regulations: 'MAS',
          min_deposit: 100,
          trading_fee: 0.1,
          logo_url: 'https://placehold.co/150x60?text=CryptoEx',
          rating: 4.5,
          supported_assets: ['Crypto', 'Tokens', 'NFTs'],
          url: 'https://cryptoex.example.com'
        },
        {
          id: 'b6000000-0000-0000-0000-000000000006',
          name: 'Stock Trader',
          description: 'Stock trading platform with access to global markets.',
          country: 'United States',
          regulations: 'SEC, FINRA',
          min_deposit: 0,
          trading_fee: 0.01,
          logo_url: 'https://placehold.co/150x60?text=StockTrader',
          rating: 4.3,
          supported_assets: ['Stocks', 'ETF', 'Options'],
          url: 'https://stocktrader.example.com'
        },
        {
          id: 'b7000000-0000-0000-0000-000000000007',
          name: 'Commodity Hub',
          description: 'Specialized in commodity trading with deep market insights.',
          country: 'Switzerland',
          regulations: 'FINMA',
          min_deposit: 250,
          trading_fee: 0.9,
          logo_url: 'https://placehold.co/150x60?text=CommodityHub',
          rating: 4.0,
          supported_assets: ['Commodities', 'Metals', 'Energy'],
          url: 'https://commodityhub.example.com'
        },
        {
          id: 'b8000000-0000-0000-0000-000000000008',
          name: 'CFD Master',
          description: 'CFD trading with high leverage and competitive spreads.',
          country: 'United Kingdom',
          regulations: 'FCA',
          min_deposit: 200,
          trading_fee: 0.7,
          logo_url: 'https://placehold.co/150x60?text=CFDMaster',
          rating: 4.1,
          supported_assets: ['CFD', 'Indices', 'Stocks'],
          url: 'https://cfdmaster.example.com'
        },
        {
          id: 'b9000000-0000-0000-0000-000000000009',
          name: 'Options Trader',
          description: 'Options trading platform with advanced analytics.',
          country: 'United States',
          regulations: 'SEC, CFTC',
          min_deposit: 300,
          trading_fee: 1.0,
          logo_url: 'https://placehold.co/150x60?text=OptionsTrader',
          rating: 4.4,
          supported_assets: ['Options', 'Futures', 'Stocks'],
          url: 'https://optionstrader.example.com'
        },
        {
          id: 'b1000000-0000-0000-0000-000000000010',
          name: 'ETF Invest',
          description: 'ETF investment platform for long-term investors.',
          country: 'Canada',
          regulations: 'IIROC',
          min_deposit: 50,
          trading_fee: 0.05,
          logo_url: 'https://placehold.co/150x60?text=ETFInvest',
          rating: 4.9,
          supported_assets: ['ETF', 'Bonds', 'Index Funds'],
          url: 'https://etfinvest.example.com'
        }
      ])
      .select();

    if (error) {
      console.error('Error inserting sample data:', error);
      return;
    }

    console.log('Sample data inserted successfully!');
    console.log(`Inserted ${data?.length || 0} broker records.`);
    console.log('Please refresh your page at http://localhost:3000/brokers to see the brokers.');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

setupDatabase(); 