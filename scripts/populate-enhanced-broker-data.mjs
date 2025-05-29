#!/usr/bin/env node

/**
 * Enhanced Broker Data Population Script
 * 
 * This script populates the enhanced broker fields with realistic sample data
 * for existing brokers in the database.
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

// Sample data for populating enhanced fields
const sampleEnhancementData = {
  regulators: [
    'FCA', 'CySEC', 'ASIC', 'CFTC', 'NFA', 'ESMA', 'BaFin', 'AMF', 'CONSOB', 'CNMV',
    'FSA', 'JFSA', 'MAS', 'HKMA', 'FINMA', 'DFSA', 'CBB', 'CMA'
  ],
  
  platforms: [
    'MetaTrader 4', 'MetaTrader 5', 'cTrader', 'TradingView', 'WebTrader',
    'Mobile App', 'Proprietary Platform', 'NinjaTrader', 'ZuluTrade'
  ],
  
  supportLanguages: [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Chinese', 'Japanese', 'Arabic', 'Russian', 'Dutch', 'Polish'
  ],
  
  accountTypeTemplates: {
    standard: {
      name: 'Standard',
      minDeposit: 100,
      spread: 1.2,
      features: ['Demo Account', 'Educational Resources', 'Customer Support']
    },
    pro: {
      name: 'Professional',
      minDeposit: 5000,
      spread: 0.8,
      features: ['Lower Spreads', 'Priority Support', 'Advanced Tools']
    },
    vip: {
      name: 'VIP',
      minDeposit: 25000,
      spread: 0.5,
      features: ['Lowest Spreads', 'Dedicated Manager', 'Premium Research']
    }
  },
  
  uniqueSellingPoints: [
    'Zero commission trading',
    'Negative balance protection',
    'Copy trading platform',
    'Advanced charting tools',
    'Educational academy',
    'Multi-asset trading',
    'Institutional-grade execution',
    'Social trading features',
    'Automated trading support',
    'Premium market research'
  ],
  
  pros: [
    'Competitive spreads',
    'Strong regulation',
    'User-friendly platform',
    'Excellent customer support',
    'Wide range of instruments',
    'Fast execution',
    'Educational resources',
    'Mobile trading app',
    'Multiple account types',
    'Professional tools'
  ],
  
  cons: [
    'Higher minimum deposit',
    'Limited payment methods',
    'No US clients',
    'Inactivity fees',
    'Limited research tools',
    'Higher spreads on minors',
    'Complex fee structure',
    'Limited educational content',
    'Slow withdrawal process',
    'Platform limitations'
  ]
};

/**
 * Generate random sample data for a broker
 */
function generateEnhancementData(broker) {
  const data = {};
  
  // Generate slug if missing
  if (!broker.slug) {
    data.slug = broker.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  // Basic descriptions
  if (!broker.description) {
    data.description = `${broker.name} is a leading forex and CFD broker offering competitive trading conditions and professional services to traders worldwide.`;
  }
  
  if (!broker.short_description) {
    data.short_description = `Professional trading with ${broker.name} - competitive spreads and reliable execution.`;
  }
  
  // Trading information
  if (!broker.min_deposit_usd && broker.min_deposit) {
    data.min_deposit_usd = Math.round(broker.min_deposit);
  } else if (!broker.min_deposit_usd) {
    data.min_deposit_usd = [100, 250, 500, 1000, 2500][Math.floor(Math.random() * 5)];
  }
  
  // Spreads
  if (!broker.spreads_eur_usd) {
    data.spreads_eur_usd = (Math.random() * 2 + 0.5).toFixed(1);
  }
  if (!broker.spreads_gbp_usd) {
    data.spreads_gbp_usd = (Math.random() * 2.5 + 0.8).toFixed(1);
  }
  if (!broker.spreads_usd_jpy) {
    data.spreads_usd_jpy = (Math.random() * 2 + 0.6).toFixed(1);
  }
  
  // Commission
  if (!broker.commission_per_lot) {
    data.commission_per_lot = Math.random() < 0.3 ? (Math.random() * 10 + 2).toFixed(2) : 0;
  }
  
  // Regulation
  if (!broker.primary_regulator) {
    data.primary_regulator = sampleEnhancementData.regulators[
      Math.floor(Math.random() * sampleEnhancementData.regulators.length)
    ];
  }
  
  if (!broker.secondary_regulators) {
    const numSecondary = Math.floor(Math.random() * 3);
    data.secondary_regulators = sampleEnhancementData.regulators
      .filter(reg => reg !== data.primary_regulator)
      .slice(0, numSecondary);
  }
  
  // Platform information
  if (!broker.platform_names) {
    const numPlatforms = Math.floor(Math.random() * 4) + 1;
    data.platform_names = sampleEnhancementData.platforms.slice(0, numPlatforms);
  }
  
  if (!broker.mobile_app_rating) {
    data.mobile_app_rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 - 5.0
  }
  
  // Support information
  if (!broker.support_languages) {
    const numLanguages = Math.floor(Math.random() * 6) + 2;
    data.support_languages = sampleEnhancementData.supportLanguages.slice(0, numLanguages);
  }
  
  if (!broker.support_hours) {
    data.support_hours = '24/5 (Mon-Fri)';
  }
  
  // Educational content quality (1-10)
  if (!broker.educational_content_quality) {
    data.educational_content_quality = Math.floor(Math.random() * 4) + 6; // 6-10
  }
  
  // Ratings (1-5 scale)
  if (!broker.overall_rating && broker.rating) {
    data.overall_rating = broker.rating;
  } else if (!broker.overall_rating) {
    data.overall_rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 - 5.0
  }
  
  if (!broker.expert_score) {
    data.expert_score = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 - 5.0
  }
  
  if (!broker.user_experience_score) {
    data.user_experience_score = (Math.random() * 1.5 + 3.5).toFixed(1);
  }
  
  if (!broker.value_for_money_score) {
    data.value_for_money_score = (Math.random() * 1.5 + 3.5).toFixed(1);
  }
  
  // Features and analysis
  if (!broker.unique_selling_points) {
    const numUSPs = Math.floor(Math.random() * 4) + 2;
    data.unique_selling_points = sampleEnhancementData.uniqueSellingPoints
      .sort(() => 0.5 - Math.random())
      .slice(0, numUSPs);
  }
  
  if (!broker.pros) {
    const numPros = Math.floor(Math.random() * 4) + 3;
    data.pros = sampleEnhancementData.pros
      .sort(() => 0.5 - Math.random())
      .slice(0, numPros);
  }
  
  if (!broker.cons) {
    const numCons = Math.floor(Math.random() * 3) + 2;
    data.cons = sampleEnhancementData.cons
      .sort(() => 0.5 - Math.random())
      .slice(0, numCons);
  }
  
  // Company information
  if (!broker.founded_year && broker.year_founded) {
    const year = parseInt(broker.year_founded);
    if (!isNaN(year)) {
      data.founded_year = year;
    }
  } else if (!broker.founded_year) {
    data.founded_year = Math.floor(Math.random() * 30) + 1990; // 1990-2020
  }
  
  // SEO fields
  if (!broker.meta_title) {
    data.meta_title = `${broker.name} Review 2025 | Forex Broker | BrokerAnalysis`;
  }
  
  if (!broker.meta_description) {
    data.meta_description = `Comprehensive ${broker.name} review 2025. Trading conditions, regulation, platforms & more. Expert analysis & user reviews.`;
  }
  
  // Account types (JSONB)
  if (!broker.account_types) {
    data.account_types = {
      standard: {
        ...sampleEnhancementData.accountTypeTemplates.standard,
        minDeposit: data.min_deposit_usd || 100
      },
      pro: sampleEnhancementData.accountTypeTemplates.pro
    };
    
    // Add VIP for higher-tier brokers
    if ((data.min_deposit_usd || 100) >= 1000) {
      data.account_types.vip = sampleEnhancementData.accountTypeTemplates.vip;
    }
  }
  
  // Boolean flags with realistic defaults
  const booleanFields = {
    demo_account_available: 0.9, // 90% have demo accounts
    api_access: 0.7, // 70% have API access
    social_trading: 0.3, // 30% have social trading
    live_chat_available: 0.8, // 80% have live chat
    phone_support_available: 0.6, // 60% have phone support
    webinars_available: 0.5, // 50% have webinars
    trading_signals: 0.4, // 40% provide signals
    market_research: 0.7, // 70% provide research
    segregated_accounts: 0.9, // 90% have segregated accounts
    is_featured: 0.2, // 20% are featured
    is_trusted: 0.8, // 80% are trusted
    is_regulated: 0.95 // 95% are regulated
  };
  
  Object.entries(booleanFields).forEach(([field, probability]) => {
    if (broker[field] === null || broker[field] === undefined) {
      data[field] = Math.random() < probability;
    }
  });
  
  // Insurance coverage for regulated brokers
  if (!broker.insurance_coverage && (data.is_regulated || broker.is_regulated)) {
    const coverageAmounts = [50000, 100000, 250000, 500000, 1000000];
    data.insurance_coverage = coverageAmounts[Math.floor(Math.random() * coverageAmounts.length)];
  }
  
  // Review metadata
  if (!broker.last_reviewed_date) {
    data.last_reviewed_date = new Date().toISOString().split('T')[0];
  }
  
  if (!broker.review_methodology_version) {
    data.review_methodology_version = 1;
  }
  
  return data;
}

/**
 * Main execution function
 */
async function populateEnhancedData() {
  try {
    console.log('🚀 Starting enhanced broker data population...');
    
    // Get all existing brokers
    const { data: brokers, error: fetchError } = await supabase
      .from('brokers')
      .select('*');
    
    if (fetchError) {
      throw fetchError;
    }
    
    if (!brokers || brokers.length === 0) {
      console.log('❌ No brokers found in database');
      return;
    }
    
    console.log(`📊 Found ${brokers.length} brokers to enhance`);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    // Process brokers in batches
    const batchSize = 5;
    for (let i = 0; i < brokers.length; i += batchSize) {
      const batch = brokers.slice(i, i + batchSize);
      
      console.log(`\n🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(brokers.length / batchSize)}`);
      
      for (const broker of batch) {
        try {
          const enhancementData = generateEnhancementData(broker);
          
          if (Object.keys(enhancementData).length === 0) {
            console.log(`⏭️  ${broker.name}: No updates needed`);
            continue;
          }
          
          const { error: updateError } = await supabase
            .from('brokers')
            .update(enhancementData)
            .eq('id', broker.id);
          
          if (updateError) {
            throw updateError;
          }
          
          console.log(`✅ ${broker.name}: Updated ${Object.keys(enhancementData).length} fields`);
          updatedCount++;
          
        } catch (error) {
          console.error(`❌ ${broker.name}: ${error.message}`);
          errorCount++;
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n🎉 Enhanced data population completed!');
    console.log(`✅ Successfully updated: ${updatedCount} brokers`);
    console.log(`❌ Errors: ${errorCount} brokers`);
    
  } catch (error) {
    console.error('💥 Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
populateEnhancedData();
