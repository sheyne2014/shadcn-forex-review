const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Get environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

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

    // 1. Make sure the brokers table exists
    const { error: brokerTableError } = await supabase
      .from('brokers')
      .select('id')
      .limit(1);

    if (brokerTableError) {
      console.error('Error checking brokers table:', brokerTableError);
      console.log('Creating tables...');

      // Read and execute database-setup.sql
      const setupSQL = fs.readFileSync(path.resolve(__dirname, '../database-setup.sql'), 'utf8');
      const { error: setupError } = await supabase.rpc('exec_sql', { sql: setupSQL });

      if (setupError) {
        console.error('Error setting up database:', setupError);
        return;
      }
      console.log('Database tables created successfully.');
    } else {
      console.log('Database tables already exist.');
    }

    // 2. Insert sample data
    console.log('Inserting sample data...');

    // Insert sample brokers
    const { error: insertError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Insert sample brokers if they don't exist
        INSERT INTO brokers (id, name, description, country, regulations, min_deposit, trading_fee, logo_url, rating, supported_assets, url)
        VALUES
            ('b1000000-0000-0000-0000-000000000001', 'XYZ Broker', 'A leading forex broker with competitive spreads and advanced trading tools.', 'United Kingdom', 'FCA, ASIC', 100, 0.8, 'https://placehold.co/150x60?text=XYZ', 4.7, ARRAY['Forex', 'Stocks', 'Commodities', 'Crypto'], 'https://xyz-broker.example.com'),
            ('b2000000-0000-0000-0000-000000000002', 'Alpha Trading', 'Multi-asset broker with a focus on forex and commodities trading.', 'Australia', 'ASIC, CySEC', 200, 1.2, 'https://placehold.co/150x60?text=Alpha', 4.2, ARRAY['Forex', 'Commodities', 'Indices'], 'https://alpha-trading.example.com'),

            ('b4000000-0000-0000-0000-000000000004', 'Trade Pro', 'Advanced trading platform for professional traders and institutions.', 'Germany', 'BaFin, FCA', 500, 0.3, 'https://placehold.co/150x60?text=TradePro', 4.6, ARRAY['Forex', 'CFD', 'Options', 'ETF'], 'https://tradepro.example.com'),
            ('b5000000-0000-0000-0000-000000000005', 'Crypto Exchange', 'Specialized in cryptocurrency trading with low fees and high security.', 'Singapore', 'MAS', 100, 0.1, 'https://placehold.co/150x60?text=CryptoEx', 4.5, ARRAY['Crypto', 'Tokens', 'NFTs'], 'https://cryptoex.example.com'),

            ('b7000000-0000-0000-0000-000000000007', 'Commodity Hub', 'Specialized in commodity trading with deep market insights.', 'Switzerland', 'FINMA', 250, 0.9, 'https://placehold.co/150x60?text=CommodityHub', 4.0, ARRAY['Commodities', 'Metals', 'Energy'], 'https://commodityhub.example.com'),
            ('b8000000-0000-0000-0000-000000000008', 'CFD Master', 'CFD trading with high leverage and competitive spreads.', 'United Kingdom', 'FCA', 200, 0.7, 'https://placehold.co/150x60?text=CFDMaster', 4.1, ARRAY['CFD', 'Indices', 'Stocks'], 'https://cfdmaster.example.com'),
            ('b9000000-0000-0000-0000-000000000009', 'Options Trader', 'Options trading platform with advanced analytics.', 'United States', 'SEC, CFTC', 300, 1.0, 'https://placehold.co/150x60?text=OptionsTrader', 4.4, ARRAY['Options', 'Futures', 'Stocks'], 'https://optionstrader.example.com'),
            ('b1000000-0000-0000-0000-000000000010', 'ETF Invest', 'ETF investment platform for long-term investors.', 'Canada', 'IIROC', 50, 0.05, 'https://placehold.co/150x60?text=ETFInvest', 4.9, ARRAY['ETF', 'Bonds', 'Index Funds'], 'https://etfinvest.example.com')
        ON CONFLICT (id) DO NOTHING;
      `
    });

    if (insertError) {
      console.error('Error inserting sample data:', insertError);
      return;
    }

    console.log('Sample data inserted successfully!');
    console.log('Database is now populated with broker data.');
    console.log('Please refresh your page at http://localhost:3000/brokers to see the brokers.');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

setupDatabase();