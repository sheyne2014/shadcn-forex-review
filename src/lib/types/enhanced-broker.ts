/**
 * Enhanced Broker Types
 * 
 * Comprehensive type definitions for the enhanced broker database schema
 */

import { Broker as SupabaseBroker } from '@/types/supabase';

// Account type structure for JSONB field
export interface AccountType {
  name: string;
  minDeposit: number;
  spread: number;
  commission?: number;
  features: string[];
  description?: string;
}

// Structured account types
export interface AccountTypes {
  [key: string]: AccountType;
}

// Enhanced broker interface with all new fields
export interface EnhancedBroker extends SupabaseBroker {
  // Basic Information
  slug: string;
  description: string;
  short_description?: string;
  
  // Enhanced Trading Information
  min_deposit_usd: number;
  spreads_eur_usd: number;
  spreads_gbp_usd: number;
  spreads_usd_jpy: number;
  commission_per_lot: number;
  
  // Regulation & Safety
  primary_regulator: string;
  secondary_regulators: string[];
  license_number: string;
  segregated_accounts: boolean;
  insurance_coverage: number;
  
  // Platform Details
  platform_names: string[];
  mobile_app_rating: number;
  demo_account_available: boolean;
  api_access: boolean;
  social_trading: boolean;
  
  // Account Information
  account_types: AccountTypes;
  
  // Customer Service
  support_languages: string[];
  support_hours: string;
  live_chat_available: boolean;
  phone_support_available: boolean;
  
  // Educational Resources
  educational_content_quality: number; // 1-10 scale
  webinars_available: boolean;
  trading_signals: boolean;
  market_research: boolean;
  
  // Enhanced Ratings & Scores
  overall_rating: number; // 1-5 scale
  expert_score: number; // 1-5 scale
  user_experience_score: number; // 1-5 scale
  value_for_money_score: number; // 1-5 scale
  
  // Unique Features & Analysis
  unique_selling_points: string[];
  pros: string[];
  cons: string[];
  
  // Company Information
  founded_year: number;
  
  // Content & SEO
  meta_title: string;
  meta_description: string;
  featured_image_url: string;
  
  // Review & Analysis Meta
  last_reviewed_date: string;
  review_methodology_version: number;
  is_featured: boolean;
  is_trusted: boolean;
  is_regulated: boolean;
  
  // Timestamps
  updated_at: string;
}

// Broker creation/update interfaces
export interface CreateBrokerData {
  name: string;
  slug?: string;
  logo_url?: string;
  website_url?: string;
  description?: string;
  short_description?: string;
  
  // Trading Information
  min_deposit?: number;
  min_deposit_usd?: number;
  trading_fee?: number;
  max_leverage?: number;
  
  // Spreads
  spreads_eur_usd?: number;
  spreads_gbp_usd?: number;
  spreads_usd_jpy?: number;
  commission_per_lot?: number;
  
  // Regulation
  primary_regulator?: string;
  secondary_regulators?: string[];
  license_number?: string;
  segregated_accounts?: boolean;
  insurance_coverage?: number;
  
  // Platforms
  platform_names?: string[];
  mobile_app_rating?: number;
  demo_account_available?: boolean;
  api_access?: boolean;
  social_trading?: boolean;
  
  // Account types
  account_types?: AccountTypes;
  supported_assets?: string[];
  
  // Customer service
  support_languages?: string[];
  support_hours?: string;
  live_chat_available?: boolean;
  phone_support_available?: boolean;
  
  // Educational
  educational_content_quality?: number;
  webinars_available?: boolean;
  trading_signals?: boolean;
  market_research?: boolean;
  
  // Ratings
  overall_rating?: number;
  expert_score?: number;
  user_experience_score?: number;
  value_for_money_score?: number;
  
  // Analysis
  unique_selling_points?: string[];
  pros?: string[];
  cons?: string[];
  
  // Company info
  headquarters?: string;
  founded_year?: number;
  
  // SEO
  meta_title?: string;
  meta_description?: string;
  featured_image_url?: string;
  
  // Flags
  is_featured?: boolean;
  is_trusted?: boolean;
  is_regulated?: boolean;
}

// Broker filter and search interfaces
export interface BrokerFilters {
  minDeposit?: {
    min?: number;
    max?: number;
  };
  leverage?: {
    min?: number;
    max?: number;
  };
  spreads?: {
    max?: number;
  };
  regulators?: string[];
  platforms?: string[];
  assets?: string[];
  features?: {
    segregatedAccounts?: boolean;
    demoAccount?: boolean;
    apiAccess?: boolean;
    socialTrading?: boolean;
    liveChat?: boolean;
    mobileApp?: boolean;
  };
  ratings?: {
    overall?: number;
    expert?: number;
    userExperience?: number;
    valueForMoney?: number;
  };
  flags?: {
    featured?: boolean;
    trusted?: boolean;
    regulated?: boolean;
  };
}

// Broker comparison interface
export interface BrokerComparison {
  brokers: EnhancedBroker[];
  comparisonFields: string[];
  differences: {
    [field: string]: {
      [brokerId: string]: any;
    };
  };
}

// Broker analytics interface
export interface BrokerAnalytics {
  id: string;
  name: string;
  viewCount: number;
  reviewCount: number;
  averageRating: number;
  conversionRate: number;
  lastUpdated: string;
}

// Export utility types
export type BrokerSortField = 
  | 'overall_rating'
  | 'min_deposit_usd'
  | 'spreads_eur_usd'
  | 'expert_score'
  | 'user_experience_score'
  | 'value_for_money_score'
  | 'last_reviewed_date'
  | 'name';

export type SortDirection = 'asc' | 'desc';

export interface BrokerSortOptions {
  field: BrokerSortField;
  direction: SortDirection;
}

// Validation schemas (for use with validation libraries)
export const BROKER_VALIDATION_RULES = {
  name: { required: true, minLength: 2, maxLength: 100 },
  slug: { required: true, pattern: /^[a-z0-9-]+$/ },
  min_deposit_usd: { min: 0, max: 100000 },
  max_leverage: { min: 1, max: 3000 },
  spreads_eur_usd: { min: 0, max: 10 },
  spreads_gbp_usd: { min: 0, max: 10 },
  spreads_usd_jpy: { min: 0, max: 10 },
  overall_rating: { min: 1, max: 5 },
  expert_score: { min: 1, max: 5 },
  user_experience_score: { min: 1, max: 5 },
  value_for_money_score: { min: 1, max: 5 },
  educational_content_quality: { min: 1, max: 10 },
  mobile_app_rating: { min: 1, max: 5 },
  meta_title: { maxLength: 60 },
  meta_description: { maxLength: 160 },
} as const;
