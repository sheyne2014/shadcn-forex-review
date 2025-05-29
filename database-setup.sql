-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables with UUID primary keys and timestamps
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE
);

-- Brokers table with enhanced schema
CREATE TABLE IF NOT EXISTS brokers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE, -- URL-friendly version of name
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  short_description TEXT,

  -- Basic Trading Information
  min_deposit NUMERIC,
  min_deposit_usd INTEGER, -- Standardized USD amount
  trading_fee NUMERIC,
  max_leverage INTEGER, -- Standardized as integer (e.g., 500 for 1:500)

  -- Detailed Spread Information
  spreads_eur_usd DECIMAL(4,2), -- EUR/USD spread in pips
  spreads_gbp_usd DECIMAL(4,2), -- GBP/USD spread in pips
  spreads_usd_jpy DECIMAL(4,2), -- USD/JPY spread in pips
  spreads_from TEXT, -- Legacy field for display
  commission_per_lot DECIMAL(6,2), -- Commission per standard lot

  -- Regulation & Safety
  regulations TEXT, -- Legacy field
  primary_regulator VARCHAR(100), -- Main regulatory body
  secondary_regulators TEXT[], -- Additional regulators
  license_number VARCHAR(50),
  segregated_accounts BOOLEAN DEFAULT false,
  insurance_coverage INTEGER, -- Coverage amount in USD

  -- Platform Details
  trading_platforms TEXT, -- Legacy field
  platform_names TEXT[], -- Array of platform names
  mobile_app_rating DECIMAL(2,1), -- App store rating (1-5)
  demo_account_available BOOLEAN DEFAULT true,
  api_access BOOLEAN DEFAULT false,
  social_trading BOOLEAN DEFAULT false,

  -- Account Information
  account_currencies TEXT, -- Legacy field
  account_types JSONB, -- Structured account type data
  supported_assets TEXT[],

  -- Customer Service
  support_languages TEXT[],
  support_hours VARCHAR(100),
  live_chat_available BOOLEAN DEFAULT false,
  phone_support_available BOOLEAN DEFAULT false,

  -- Educational Resources
  educational_content_quality INTEGER CHECK (educational_content_quality >= 1 AND educational_content_quality <= 10),
  webinars_available BOOLEAN DEFAULT false,
  trading_signals BOOLEAN DEFAULT false,
  market_research BOOLEAN DEFAULT false,

  -- Ratings & Scores
  rating NUMERIC, -- Legacy overall rating
  overall_rating DECIMAL(3,1) CHECK (overall_rating >= 1 AND overall_rating <= 5),
  expert_score DECIMAL(3,1) CHECK (expert_score >= 1 AND expert_score <= 5),
  user_experience_score DECIMAL(3,1) CHECK (user_experience_score >= 1 AND user_experience_score <= 5),
  value_for_money_score DECIMAL(3,1) CHECK (value_for_money_score >= 1 AND value_for_money_score <= 5),

  -- Unique Features & Analysis
  unique_selling_points TEXT[],
  pros TEXT[],
  cons TEXT[],

  -- Company Information
  country TEXT, -- Legacy field
  headquarters TEXT,
  year_founded TEXT,
  founded_year INTEGER,

  -- Content & SEO
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  featured_image_url TEXT,

  -- Review & Analysis Meta
  last_reviewed_date DATE,
  review_methodology_version INTEGER DEFAULT 1,
  is_featured BOOLEAN DEFAULT false,
  is_trusted BOOLEAN DEFAULT false,
  is_regulated BOOLEAN DEFAULT false,

  -- Legacy fields for backward compatibility
  min_trade_size TEXT,
  regulation TEXT,
  badge TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Broker Categories junction table
CREATE TABLE IF NOT EXISTS broker_categories (
  broker_id UUID REFERENCES brokers(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (broker_id, category_id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  broker_id UUID REFERENCES brokers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating NUMERIC CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tools table
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  url TEXT
);

-- Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row-Level Security (RLS) on required tables
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE broker_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Define RLS policies

-- Reviews policies
-- Allow users to insert their own reviews
CREATE POLICY insert_own_reviews ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to select their own reviews
CREATE POLICY select_own_reviews ON reviews
  FOR SELECT USING (auth.uid() = user_id);

-- Allow public to select all reviews (read-only)
CREATE POLICY select_all_reviews ON reviews
  FOR SELECT USING (true);

-- Allow users to update their own reviews
CREATE POLICY update_own_reviews ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Only admins can delete reviews
CREATE POLICY delete_reviews_admin ON reviews
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM users
      WHERE is_admin = true
    )
  );

-- Broker Categories policies
-- Public can select broker_categories
CREATE POLICY select_broker_categories ON broker_categories
  FOR SELECT USING (true);

-- Only admins can insert, update or delete broker_categories
CREATE POLICY admin_broker_categories ON broker_categories
  USING (
    auth.uid() IN (
      SELECT id FROM users
      WHERE is_admin = true
    )
  );

-- Blog Posts policies
-- Public can select published blog posts
CREATE POLICY select_published_blog_posts ON blog_posts
  FOR SELECT USING (published_at IS NOT NULL);

-- Authors can select their own posts (including unpublished)
CREATE POLICY select_own_blog_posts ON blog_posts
  FOR SELECT USING (auth.uid() = author_id);

-- Authors can insert their own posts
CREATE POLICY insert_own_blog_posts ON blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Authors can update their own posts
CREATE POLICY update_own_blog_posts ON blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Only admins can delete blog posts
CREATE POLICY delete_blog_posts_admin ON blog_posts
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM users
      WHERE is_admin = true
    )
  );

-- Add is_admin column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_broker_id ON reviews(broker_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_broker_categories_broker_id ON broker_categories(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_categories_category_id ON broker_categories(category_id);

-- Enhanced indexes for brokers table
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

-- Trigger to automatically update updated_at on brokers table
CREATE TRIGGER update_brokers_updated_at
    BEFORE UPDATE ON brokers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();