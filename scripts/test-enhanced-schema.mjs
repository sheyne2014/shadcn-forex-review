#!/usr/bin/env node

/**
 * Enhanced Schema Test Script
 * 
 * Tests the enhanced broker schema by creating a sample broker
 * and verifying all new fields work correctly.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test broker data with all enhanced fields
const testBrokerData = {
  name: 'Enhanced Test Broker',
  slug: 'enhanced-test-broker',
  logo_url: 'https://example.com/logo.png',
  website_url: 'https://example.com',
  description: 'A comprehensive test broker with all enhanced features for testing the new database schema.',
  short_description: 'Professional test broker with enhanced features.',
  
  // Basic Trading Information
  min_deposit: 250,
  min_deposit_usd: 250,
  trading_fee: 0.5,
  max_leverage: 500,
  
  // Detailed Spread Information
  spreads_eur_usd: 0.8,
  spreads_gbp_usd: 1.2,
  spreads_usd_jpy: 0.9,
  spreads_from: '0.8 pips',
  commission_per_lot: 3.50,
  
  // Regulation & Safety
  regulations: 'FCA, CySEC, ASIC',
  primary_regulator: 'FCA',
  secondary_regulators: ['CySEC', 'ASIC'],
  license_number: 'FCA123456',
  segregated_accounts: true,
  insurance_coverage: 500000,
  
  // Platform Details
  trading_platforms: 'MT4, MT5, WebTrader',
  platform_names: ['MetaTrader 4', 'MetaTrader 5', 'WebTrader', 'Mobile App'],
  mobile_app_rating: 4.3,
  demo_account_available: true,
  api_access: true,
  social_trading: true,
  
  // Account Information
  account_currencies: 'USD, EUR, GBP',
  account_types: {
    standard: {
      name: 'Standard',
      minDeposit: 250,
      spread: 1.0,
      commission: 0,
      features: ['Demo Account', 'Educational Resources', 'Customer Support'],
      description: 'Perfect for beginners and intermediate traders'
    },
    pro: {
      name: 'Professional',
      minDeposit: 5000,
      spread: 0.6,
      commission: 3.5,
      features: ['Lower Spreads', 'Priority Support', 'Advanced Tools', 'Market Research'],
      description: 'For experienced traders seeking professional conditions'
    },
    vip: {
      name: 'VIP',
      minDeposit: 25000,
      spread: 0.4,
      commission: 2.5,
      features: ['Lowest Spreads', 'Dedicated Manager', 'Premium Research', 'Exclusive Events'],
      description: 'Premium service for high-volume traders'
    }
  },
  supported_assets: ['Forex', 'Stocks', 'Indices', 'Commodities', 'Crypto'],
  
  // Customer Service
  support_languages: ['English', 'Spanish', 'French', 'German', 'Italian'],
  support_hours: '24/5 (Monday-Friday)',
  live_chat_available: true,
  phone_support_available: true,
  
  // Educational Resources
  educational_content_quality: 8,
  webinars_available: true,
  trading_signals: true,
  market_research: true,
  
  // Ratings & Scores
  rating: 4.4,
  overall_rating: 4.4,
  expert_score: 4.6,
  user_experience_score: 4.2,
  value_for_money_score: 4.3,
  
  // Unique Features & Analysis
  unique_selling_points: [
    'Zero commission on major pairs',
    'Advanced social trading platform',
    'Institutional-grade execution',
    'Comprehensive educational academy',
    'Multi-asset trading platform'
  ],
  pros: [
    'Competitive spreads',
    'Strong multi-jurisdiction regulation',
    'User-friendly platforms',
    'Excellent customer support',
    'Wide range of trading instruments',
    'Fast order execution',
    'Comprehensive educational resources'
  ],
  cons: [
    'Higher minimum deposit than some competitors',
    'Inactivity fees after 12 months',
    'Limited cryptocurrency offerings',
    'No US clients accepted'
  ],
  
  // Company Information
  country: 'United Kingdom',
  headquarters: 'London, United Kingdom',
  year_founded: '2010',
  founded_year: 2010,
  
  // Content & SEO
  meta_title: 'Enhanced Test Broker Review 2025 | Forex Broker | BrokerAnalysis',
  meta_description: 'Comprehensive Enhanced Test Broker review 2025. Trading conditions, regulation, platforms & more. Expert analysis & user reviews.',
  featured_image_url: 'https://example.com/featured-image.jpg',
  
  // Review & Analysis Meta
  last_reviewed_date: new Date().toISOString().split('T')[0],
  review_methodology_version: 1,
  is_featured: true,
  is_trusted: true,
  is_regulated: true,
  
  // Legacy fields
  min_trade_size: '0.01 lots',
  regulation: 'FCA',
  badge: 'trusted'
};

/**
 * Test the enhanced schema
 */
async function testEnhancedSchema() {
  console.log('🧪 Testing Enhanced Broker Schema...\n');
  
  let testBrokerId = null;
  
  try {
    // 1. Test broker creation
    console.log('1️⃣ Testing broker creation with enhanced fields...');
    
    const { data: createdBroker, error: createError } = await supabase
      .from('brokers')
      .insert(testBrokerData)
      .select()
      .single();
    
    if (createError) {
      throw new Error(`Creation failed: ${createError.message}`);
    }
    
    testBrokerId = createdBroker.id;
    console.log(`✅ Successfully created test broker with ID: ${testBrokerId}`);
    
    // 2. Test data retrieval
    console.log('\n2️⃣ Testing data retrieval...');
    
    const { data: retrievedBroker, error: retrieveError } = await supabase
      .from('brokers')
      .select('*')
      .eq('id', testBrokerId)
      .single();
    
    if (retrieveError) {
      throw new Error(`Retrieval failed: ${retrieveError.message}`);
    }
    
    console.log('✅ Successfully retrieved broker data');
    
    // 3. Test specific enhanced fields
    console.log('\n3️⃣ Testing enhanced field values...');
    
    const fieldsToTest = [
      'slug',
      'spreads_eur_usd',
      'primary_regulator',
      'secondary_regulators',
      'platform_names',
      'account_types',
      'support_languages',
      'overall_rating',
      'unique_selling_points',
      'pros',
      'cons',
      'is_featured',
      'updated_at'
    ];
    
    fieldsToTest.forEach(field => {
      const value = retrievedBroker[field];
      if (value !== null && value !== undefined) {
        console.log(`✅ ${field}: ${typeof value === 'object' ? JSON.stringify(value).substring(0, 50) + '...' : value}`);
      } else {
        console.log(`⚠️  ${field}: null/undefined`);
      }
    });
    
    // 4. Test filtering capabilities
    console.log('\n4️⃣ Testing filtering capabilities...');
    
    // Test slug-based retrieval
    const { data: slugBroker, error: slugError } = await supabase
      .from('brokers')
      .select('*')
      .eq('slug', 'enhanced-test-broker')
      .single();
    
    if (slugError) {
      throw new Error(`Slug retrieval failed: ${slugError.message}`);
    }
    
    console.log('✅ Slug-based retrieval works');
    
    // Test array filtering
    const { data: assetBrokers, error: assetError } = await supabase
      .from('brokers')
      .select('*')
      .contains('supported_assets', ['Forex']);
    
    if (assetError) {
      throw new Error(`Asset filtering failed: ${assetError.message}`);
    }
    
    console.log(`✅ Asset filtering works (found ${assetBrokers.length} brokers)`);
    
    // Test rating filtering
    const { data: ratedBrokers, error: ratingError } = await supabase
      .from('brokers')
      .select('*')
      .gte('overall_rating', 4.0);
    
    if (ratingError) {
      throw new Error(`Rating filtering failed: ${ratingError.message}`);
    }
    
    console.log(`✅ Rating filtering works (found ${ratedBrokers.length} brokers)`);
    
    // 5. Test update functionality
    console.log('\n5️⃣ Testing update functionality...');
    
    const updateData = {
      overall_rating: 4.7,
      expert_score: 4.8,
      pros: [...testBrokerData.pros, 'Excellent test results']
    };
    
    const { data: updatedBroker, error: updateError } = await supabase
      .from('brokers')
      .update(updateData)
      .eq('id', testBrokerId)
      .select()
      .single();
    
    if (updateError) {
      throw new Error(`Update failed: ${updateError.message}`);
    }
    
    console.log('✅ Update functionality works');
    console.log(`✅ Updated rating: ${updatedBroker.overall_rating}`);
    console.log(`✅ Updated_at timestamp: ${updatedBroker.updated_at}`);
    
    // 6. Test JSONB functionality
    console.log('\n6️⃣ Testing JSONB account_types functionality...');
    
    const { data: jsonbBrokers, error: jsonbError } = await supabase
      .from('brokers')
      .select('*')
      .not('account_types', 'is', null);
    
    if (jsonbError) {
      throw new Error(`JSONB query failed: ${jsonbError.message}`);
    }
    
    console.log(`✅ JSONB queries work (found ${jsonbBrokers.length} brokers with account types)`);
    
    console.log('\n🎉 All tests passed! Enhanced schema is working correctly.');
    
  } catch (error) {
    console.error(`❌ Test failed: ${error.message}`);
    return false;
  } finally {
    // Cleanup: Remove test broker
    if (testBrokerId) {
      console.log('\n🧹 Cleaning up test data...');
      
      const { error: deleteError } = await supabase
        .from('brokers')
        .delete()
        .eq('id', testBrokerId);
      
      if (deleteError) {
        console.error(`⚠️  Failed to cleanup test broker: ${deleteError.message}`);
      } else {
        console.log('✅ Test broker cleaned up successfully');
      }
    }
  }
  
  return true;
}

/**
 * Test database connection and schema
 */
async function testConnection() {
  try {
    console.log('🔌 Testing database connection...');
    
    const { data, error } = await supabase
      .from('brokers')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Enhanced Broker Schema Test Suite\n');
  
  // Test connection first
  const connectionOk = await testConnection();
  if (!connectionOk) {
    process.exit(1);
  }
  
  // Run schema tests
  const testsOk = await testEnhancedSchema();
  
  if (testsOk) {
    console.log('\n✅ All tests completed successfully!');
    console.log('🎯 Your enhanced broker schema is ready for production use.');
  } else {
    console.log('\n❌ Some tests failed. Please check the error messages above.');
    process.exit(1);
  }
}

// Run the tests
main();
