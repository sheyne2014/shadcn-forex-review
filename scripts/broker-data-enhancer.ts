#!/usr/bin/env tsx

/**
 * Broker Data Enhancer - Advanced data extraction and enhancement
 * 
 * This companion script provides advanced data extraction capabilities
 * for the comprehensive broker data update process.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Enhanced data extraction patterns
const DATA_EXTRACTION_PATTERNS = {
  spreads: {
    patterns: [
      /spreads?\s*(?:from|starting\s*at)?\s*(\d+\.?\d*)\s*pips?/i,
      /eur\/usd\s*(?:spread)?\s*(\d+\.?\d*)\s*pips?/i,
      /typical\s*spreads?\s*(\d+\.?\d*)\s*pips?/i
    ],
    unit: 'pips'
  },
  leverage: {
    patterns: [
      /leverage\s*(?:up\s*to)?\s*1:(\d+)/i,
      /maximum\s*leverage\s*1:(\d+)/i,
      /(\d+):1\s*leverage/i
    ],
    format: (value: string) => `1:${value}`
  },
  minDeposit: {
    patterns: [
      /minimum\s*deposit\s*(?:of)?\s*\$?(\d+)/i,
      /min\s*deposit\s*\$?(\d+)/i,
      /deposit\s*from\s*\$?(\d+)/i
    ],
    unit: 'USD'
  },
  commission: {
    patterns: [
      /commission\s*(?:from)?\s*\$?(\d+\.?\d*)/i,
      /(\d+\.?\d*)\s*(?:per|\/)\s*lot/i,
      /trading\s*fee\s*(\d+\.?\d*)%/i
    ]
  }
};

// Platform detection patterns
const PLATFORM_PATTERNS = {
  mt4: /metatrader\s*4|mt4/i,
  mt5: /metatrader\s*5|mt5/i,
  webTrader: /web\s*trader|webtrader|browser\s*based/i,
  mobileApp: /mobile\s*app|ios|android|smartphone/i,
  proprietary: /proprietary\s*platform|custom\s*platform/i
};

// Regulatory authority patterns
const REGULATORY_PATTERNS = {
  fca: /fca|financial\s*conduct\s*authority/i,
  cysec: /cysec|cyprus\s*securities/i,
  asic: /asic|australian\s*securities/i,
  sec: /sec|securities\s*and\s*exchange/i,
  finra: /finra/i,
  cftc: /cftc|commodity\s*futures/i,
  bafin: /bafin/i,
  fsa: /fsa|financial\s*services\s*authority/i
};

// Extract structured data from text content
export function extractTradingConditions(text: string): any {
  const conditions: any = {};
  
  // Extract spreads
  for (const pattern of DATA_EXTRACTION_PATTERNS.spreads.patterns) {
    const match = text.match(pattern);
    if (match) {
      conditions.spread_from = `${match[1]} ${DATA_EXTRACTION_PATTERNS.spreads.unit}`;
      break;
    }
  }
  
  // Extract leverage
  for (const pattern of DATA_EXTRACTION_PATTERNS.leverage.patterns) {
    const match = text.match(pattern);
    if (match) {
      conditions.max_leverage = DATA_EXTRACTION_PATTERNS.leverage.format(match[1]);
      break;
    }
  }
  
  // Extract minimum deposit
  for (const pattern of DATA_EXTRACTION_PATTERNS.minDeposit.patterns) {
    const match = text.match(pattern);
    if (match) {
      conditions.min_deposit = parseInt(match[1]);
      break;
    }
  }
  
  // Extract commission
  for (const pattern of DATA_EXTRACTION_PATTERNS.commission.patterns) {
    const match = text.match(pattern);
    if (match) {
      conditions.commission_structure = match[0];
      break;
    }
  }
  
  return conditions;
}

// Extract platform information
export function extractPlatformInfo(text: string): any {
  const platforms: any = {
    available_platforms: [],
    platform_details: {}
  };
  
  // Check for each platform type
  Object.entries(PLATFORM_PATTERNS).forEach(([platform, pattern]) => {
    if (pattern.test(text)) {
      platforms.available_platforms.push(platform);
      platforms.platform_details[`${platform}_available`] = true;
    }
  });
  
  // Generate platform string
  if (platforms.available_platforms.length > 0) {
    platforms.trading_platforms = platforms.available_platforms
      .map(p => p.replace(/([A-Z])/g, ' $1').trim())
      .join(', ');
  }
  
  return platforms;
}

// Extract regulatory information
export function extractRegulatoryInfo(text: string): any {
  const regulatory: any = {
    regulations: [],
    regulatory_details: {}
  };
  
  // Check for each regulatory authority
  Object.entries(REGULATORY_PATTERNS).forEach(([authority, pattern]) => {
    if (pattern.test(text)) {
      regulatory.regulations.push(authority.toUpperCase());
      regulatory.regulatory_details[authority] = true;
    }
  });
  
  // Generate regulations string
  if (regulatory.regulations.length > 0) {
    regulatory.regulations_string = regulatory.regulations.join(', ');
  }
  
  return regulatory;
}

// Extract account types from text
export function extractAccountTypes(text: string): string[] {
  const accountTypes: string[] = [];
  const accountPatterns = [
    /standard\s*account/i,
    /premium\s*account/i,
    /vip\s*account/i,
    /professional\s*account/i,
    /pro\s*account/i,
    /basic\s*account/i,
    /advanced\s*account/i,
    /elite\s*account/i,
    /micro\s*account/i,
    /mini\s*account/i,
    /ecn\s*account/i,
    /stp\s*account/i
  ];
  
  accountPatterns.forEach(pattern => {
    const match = text.match(pattern);
    if (match) {
      const accountType = match[0].replace(/\s*account/i, '').trim();
      if (!accountTypes.includes(accountType)) {
        accountTypes.push(accountType);
      }
    }
  });
  
  return accountTypes.length > 0 ? accountTypes : ['Standard', 'Premium', 'VIP'];
}

// Extract payment methods
export function extractPaymentMethods(text: string): string[] {
  const paymentMethods: string[] = [];
  const paymentPatterns = [
    /credit\s*card/i,
    /debit\s*card/i,
    /bank\s*transfer/i,
    /wire\s*transfer/i,
    /paypal/i,
    /skrill/i,
    /neteller/i,
    /bitcoin/i,
    /cryptocurrency/i,
    /e-wallet/i,
    /visa/i,
    /mastercard/i,
    /american\s*express/i
  ];
  
  paymentPatterns.forEach(pattern => {
    const match = text.match(pattern);
    if (match) {
      const method = match[0].trim();
      if (!paymentMethods.some(existing => existing.toLowerCase() === method.toLowerCase())) {
        paymentMethods.push(method);
      }
    }
  });
  
  return paymentMethods.length > 0 ? paymentMethods : ['Credit Card', 'Bank Transfer', 'E-Wallets'];
}

// Extract fee structure
export function extractFeeStructure(text: string): any {
  const fees: any = {};
  
  // Withdrawal fee patterns
  const withdrawalPatterns = [
    /withdrawal\s*fee\s*(?:of)?\s*\$?(\d+\.?\d*)/i,
    /withdraw\s*(?:fee)?\s*\$?(\d+\.?\d*)/i
  ];
  
  // Deposit fee patterns
  const depositPatterns = [
    /deposit\s*fee\s*(?:of)?\s*\$?(\d+\.?\d*)/i,
    /no\s*deposit\s*fee/i
  ];
  
  // Inactivity fee patterns
  const inactivityPatterns = [
    /inactivity\s*fee\s*(?:of)?\s*\$?(\d+\.?\d*)/i,
    /dormant\s*account\s*fee\s*\$?(\d+\.?\d*)/i
  ];
  
  // Extract withdrawal fees
  for (const pattern of withdrawalPatterns) {
    const match = text.match(pattern);
    if (match) {
      fees.withdrawal_fee = match[1] ? `$${match[1]}` : match[0];
      break;
    }
  }
  
  // Extract deposit fees
  for (const pattern of depositPatterns) {
    const match = text.match(pattern);
    if (match) {
      fees.deposit_fee = match[1] ? `$${match[1]}` : 'Free';
      break;
    }
  }
  
  // Extract inactivity fees
  for (const pattern of inactivityPatterns) {
    const match = text.match(pattern);
    if (match) {
      fees.inactivity_fee = match[1] ? `$${match[1]} monthly` : match[0];
      break;
    }
  }
  
  return fees;
}

// Comprehensive text analysis function
export function analyzeWebsiteContent(text: string, broker: any): any {
  const analysis: any = {
    broker_name: broker.name,
    analysis_timestamp: new Date().toISOString(),
    data_sources: ['website_content_analysis']
  };
  
  // Extract all data types
  const tradingConditions = extractTradingConditions(text);
  const platformInfo = extractPlatformInfo(text);
  const regulatoryInfo = extractRegulatoryInfo(text);
  const accountTypes = extractAccountTypes(text);
  const paymentMethods = extractPaymentMethods(text);
  const feeStructure = extractFeeStructure(text);
  
  // Combine all extracted data
  Object.assign(analysis, tradingConditions);
  Object.assign(analysis, platformInfo);
  Object.assign(analysis, regulatoryInfo);
  
  analysis.account_types = accountTypes;
  analysis.payment_methods = paymentMethods;
  Object.assign(analysis, feeStructure);
  
  // Add confidence scores based on data completeness
  analysis.data_confidence = calculateDataConfidence(analysis);
  
  return analysis;
}

// Calculate confidence score for extracted data
function calculateDataConfidence(data: any): number {
  const requiredFields = [
    'spread_from',
    'max_leverage',
    'min_deposit',
    'trading_platforms',
    'regulations_string',
    'account_types',
    'payment_methods'
  ];
  
  const presentFields = requiredFields.filter(field => 
    data[field] && 
    (Array.isArray(data[field]) ? data[field].length > 0 : true)
  );
  
  return Math.round((presentFields.length / requiredFields.length) * 100);
}

// Validate extracted data against known patterns
export function validateExtractedData(data: any): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Validate spreads
  if (data.spread_from) {
    const spreadValue = parseFloat(data.spread_from);
    if (isNaN(spreadValue) || spreadValue < 0 || spreadValue > 10) {
      issues.push(`Suspicious spread value: ${data.spread_from}`);
    }
  }
  
  // Validate leverage
  if (data.max_leverage) {
    const leverageMatch = data.max_leverage.match(/1:(\d+)/);
    if (leverageMatch) {
      const leverageValue = parseInt(leverageMatch[1]);
      if (leverageValue < 1 || leverageValue > 2000) {
        issues.push(`Suspicious leverage value: ${data.max_leverage}`);
      }
    }
  }
  
  // Validate minimum deposit
  if (data.min_deposit) {
    if (data.min_deposit < 0 || data.min_deposit > 100000) {
      issues.push(`Suspicious minimum deposit: ${data.min_deposit}`);
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}

// Export all functions
export {
  extractTradingConditions,
  extractPlatformInfo,
  extractRegulatoryInfo,
  extractAccountTypes,
  extractPaymentMethods,
  extractFeeStructure,
  analyzeWebsiteContent,
  validateExtractedData
};
