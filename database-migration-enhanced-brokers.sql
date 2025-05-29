-- Enhanced Broker Database Schema Migration
-- This script safely adds new columns to existing brokers table
-- Run this on your existing database to add the enhanced fields

-- Add new columns to existing brokers table
ALTER TABLE brokers 
-- Basic Information
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS short_description TEXT,

-- Enhanced Trading Information
ADD COLUMN IF NOT EXISTS min_deposit_usd INTEGER,
ADD COLUMN IF NOT EXISTS spreads_eur_usd DECIMAL(4,2),
ADD COLUMN IF NOT EXISTS spreads_gbp_usd DECIMAL(4,2),
ADD COLUMN IF NOT EXISTS spreads_usd_jpy DECIMAL(4,2),
ADD COLUMN IF NOT EXISTS commission_per_lot DECIMAL(6,2),

-- Regulation & Safety
ADD COLUMN IF NOT EXISTS primary_regulator VARCHAR(100),
ADD COLUMN IF NOT EXISTS secondary_regulators TEXT[],
ADD COLUMN IF NOT EXISTS license_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS segregated_accounts BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS insurance_coverage INTEGER,

-- Platform Details
ADD COLUMN IF NOT EXISTS platform_names TEXT[],
ADD COLUMN IF NOT EXISTS mobile_app_rating DECIMAL(2,1),
ADD COLUMN IF NOT EXISTS demo_account_available BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS api_access BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS social_trading BOOLEAN DEFAULT false,

-- Account Information
ADD COLUMN IF NOT EXISTS account_types JSONB,

-- Customer Service
ADD COLUMN IF NOT EXISTS support_languages TEXT[],
ADD COLUMN IF NOT EXISTS support_hours VARCHAR(100),
ADD COLUMN IF NOT EXISTS live_chat_available BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS phone_support_available BOOLEAN DEFAULT false,

-- Educational Resources
ADD COLUMN IF NOT EXISTS educational_content_quality INTEGER,
ADD COLUMN IF NOT EXISTS webinars_available BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS trading_signals BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS market_research BOOLEAN DEFAULT false,

-- Enhanced Ratings & Scores
ADD COLUMN IF NOT EXISTS overall_rating DECIMAL(3,1),
ADD COLUMN IF NOT EXISTS expert_score DECIMAL(3,1),
ADD COLUMN IF NOT EXISTS user_experience_score DECIMAL(3,1),
ADD COLUMN IF NOT EXISTS value_for_money_score DECIMAL(3,1),

-- Unique Features & Analysis
ADD COLUMN IF NOT EXISTS unique_selling_points TEXT[],
ADD COLUMN IF NOT EXISTS pros TEXT[],
ADD COLUMN IF NOT EXISTS cons TEXT[],

-- Company Information
ADD COLUMN IF NOT EXISTS founded_year INTEGER,

-- Content & SEO
ADD COLUMN IF NOT EXISTS meta_title VARCHAR(60),
ADD COLUMN IF NOT EXISTS meta_description VARCHAR(160),
ADD COLUMN IF NOT EXISTS featured_image_url TEXT,

-- Review & Analysis Meta
ADD COLUMN IF NOT EXISTS last_reviewed_date DATE,
ADD COLUMN IF NOT EXISTS review_methodology_version INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_trusted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_regulated BOOLEAN DEFAULT false,

-- Timestamps
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add constraints for new rating fields
ALTER TABLE brokers 
ADD CONSTRAINT IF NOT EXISTS check_overall_rating 
  CHECK (overall_rating IS NULL OR (overall_rating >= 1 AND overall_rating <= 5));

ALTER TABLE brokers 
ADD CONSTRAINT IF NOT EXISTS check_expert_score 
  CHECK (expert_score IS NULL OR (expert_score >= 1 AND expert_score <= 5));

ALTER TABLE brokers 
ADD CONSTRAINT IF NOT EXISTS check_user_experience_score 
  CHECK (user_experience_score IS NULL OR (user_experience_score >= 1 AND user_experience_score <= 5));

ALTER TABLE brokers 
ADD CONSTRAINT IF NOT EXISTS check_value_for_money_score 
  CHECK (value_for_money_score IS NULL OR (value_for_money_score >= 1 AND value_for_money_score <= 5));

ALTER TABLE brokers 
ADD CONSTRAINT IF NOT EXISTS check_educational_content_quality 
  CHECK (educational_content_quality IS NULL OR (educational_content_quality >= 1 AND educational_content_quality <= 10));

-- Add unique constraint for slug
ALTER TABLE brokers 
ADD CONSTRAINT IF NOT EXISTS unique_broker_slug UNIQUE (slug);

-- Create enhanced indexes
CREATE INDEX IF NOT EXISTS idx_brokers_slug ON brokers(slug);
CREATE INDEX IF NOT EXISTS idx_brokers_overall_rating ON brokers(overall_rating DESC);
CREATE INDEX IF NOT EXISTS idx_brokers_min_deposit_usd ON brokers(min_deposit_usd);
CREATE INDEX IF NOT EXISTS idx_brokers_primary_regulator ON brokers(primary_regulator);
CREATE INDEX IF NOT EXISTS idx_brokers_is_featured ON brokers(is_featured);
CREATE INDEX IF NOT EXISTS idx_brokers_is_trusted ON brokers(is_trusted);
CREATE INDEX IF NOT EXISTS idx_brokers_is_regulated ON brokers(is_regulated);
CREATE INDEX IF NOT EXISTS idx_brokers_supported_assets ON brokers USING GIN(supported_assets);
CREATE INDEX IF NOT EXISTS idx_brokers_platform_names ON brokers USING GIN(platform_names);
CREATE INDEX IF NOT EXISTS idx_brokers_last_reviewed_date ON brokers(last_reviewed_date DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS update_brokers_updated_at ON brokers;
CREATE TRIGGER update_brokers_updated_at 
    BEFORE UPDATE ON brokers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Data migration: Generate slugs for existing brokers
UPDATE brokers 
SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- Data migration: Convert max_leverage text to integer where possible
UPDATE brokers 
SET max_leverage = CASE 
    WHEN max_leverage ~ '^1:([0-9]+)$' THEN 
        CAST(SUBSTRING(max_leverage FROM '^1:([0-9]+)$') AS INTEGER)
    WHEN max_leverage ~ '^([0-9]+)$' THEN 
        CAST(max_leverage AS INTEGER)
    ELSE NULL
END
WHERE max_leverage IS NOT NULL;

-- Data migration: Set default values for boolean fields
UPDATE brokers SET 
    demo_account_available = COALESCE(demo_account_available, true),
    api_access = COALESCE(api_access, false),
    social_trading = COALESCE(social_trading, false),
    live_chat_available = COALESCE(live_chat_available, false),
    phone_support_available = COALESCE(phone_support_available, false),
    webinars_available = COALESCE(webinars_available, false),
    trading_signals = COALESCE(trading_signals, false),
    market_research = COALESCE(market_research, false),
    is_featured = COALESCE(is_featured, false),
    is_trusted = COALESCE(is_trusted, false),
    is_regulated = COALESCE(is_regulated, false),
    segregated_accounts = COALESCE(segregated_accounts, false);

-- Data migration: Copy rating to overall_rating if not set
UPDATE brokers 
SET overall_rating = rating 
WHERE overall_rating IS NULL AND rating IS NOT NULL;

-- Data migration: Set is_regulated based on regulations field
UPDATE brokers 
SET is_regulated = true 
WHERE is_regulated = false AND (regulations IS NOT NULL AND regulations != '');

-- Data migration: Convert year_founded text to integer
UPDATE brokers 
SET founded_year = CASE 
    WHEN year_founded ~ '^[0-9]{4}$' THEN 
        CAST(year_founded AS INTEGER)
    ELSE NULL
END
WHERE founded_year IS NULL AND year_founded IS NOT NULL;

-- Data migration: Set review methodology version and last reviewed date
UPDATE brokers 
SET 
    review_methodology_version = COALESCE(review_methodology_version, 1),
    last_reviewed_date = COALESCE(last_reviewed_date, CURRENT_DATE)
WHERE review_methodology_version IS NULL OR last_reviewed_date IS NULL;

-- Set updated_at for all existing records
UPDATE brokers SET updated_at = NOW() WHERE updated_at IS NULL;

-- Display migration summary
DO $$
DECLARE
    broker_count INTEGER;
    slug_count INTEGER;
    rating_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO broker_count FROM brokers;
    SELECT COUNT(*) INTO slug_count FROM brokers WHERE slug IS NOT NULL;
    SELECT COUNT(*) INTO rating_count FROM brokers WHERE overall_rating IS NOT NULL;
    
    RAISE NOTICE 'Migration completed successfully!';
    RAISE NOTICE 'Total brokers: %', broker_count;
    RAISE NOTICE 'Brokers with slugs: %', slug_count;
    RAISE NOTICE 'Brokers with overall ratings: %', rating_count;
END $$;
