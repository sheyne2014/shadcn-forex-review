-- Add a slug column to the blog_posts table
ALTER TABLE IF EXISTS blog_posts 
ADD COLUMN IF NOT EXISTS slug TEXT;

-- Update existing blog posts with a slug based on the title
UPDATE blog_posts 
SET slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- Add a url column to the brokers table
ALTER TABLE IF EXISTS brokers 
ADD COLUMN IF NOT EXISTS url TEXT;

-- Create the pages table if it doesn't exist
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    meta_description TEXT,
    meta_keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE
);

-- Create index on pages slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- Ensure blog_posts has all required columns
ALTER TABLE IF EXISTS blog_posts
ADD COLUMN IF NOT EXISTS excerpt TEXT,
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS reading_time INTEGER,
ADD COLUMN IF NOT EXISTS author_id UUID,
ADD COLUMN IF NOT EXISTS category_id UUID,
ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Add ratings and reviews tables if they don't exist
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    broker_id UUID REFERENCES brokers(id) ON DELETE CASCADE,
    user_name TEXT,
    user_email TEXT,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on reviews broker_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_reviews_broker_id ON reviews(broker_id);

-- Create blog_categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default blog categories
INSERT INTO blog_categories (name, slug)
VALUES 
('Market Analysis', 'market-analysis'),
('Trading Strategies', 'trading-strategies'),
('Trading Technology', 'trading-technology'),
('Regulation Updates', 'regulation-updates'),
('Educational Guides', 'educational-guides')
ON CONFLICT (slug) DO NOTHING;

-- Add category relationship to blog_posts if it doesn't exist already
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'fk_blog_posts_category'
    ) THEN
        ALTER TABLE blog_posts
        ADD CONSTRAINT fk_blog_posts_category 
        FOREIGN KEY (category_id) REFERENCES blog_categories(id)
        ON DELETE SET NULL;
    END IF;
END $$;

-- Ensure the brokers table has the supported_assets column
ALTER TABLE IF EXISTS brokers
ADD COLUMN IF NOT EXISTS supported_assets TEXT[]; 