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

-- Brokers table
CREATE TABLE IF NOT EXISTS brokers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  min_deposit NUMERIC,
  trading_fee NUMERIC,
  regulations TEXT,
  supported_assets TEXT[],
  country TEXT,
  rating NUMERIC,
  min_trade_size TEXT,
  max_leverage TEXT,
  spread_from TEXT,
  trading_platforms TEXT,
  account_currencies TEXT,
  regulation TEXT,
  headquarters TEXT,
  year_founded TEXT,
  website_url TEXT,
  badge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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