-- Migration script to add missing columns to brokers table

ALTER TABLE brokers 
ADD COLUMN IF NOT EXISTS min_trade_size TEXT,
ADD COLUMN IF NOT EXISTS max_leverage TEXT,
ADD COLUMN IF NOT EXISTS spread_from TEXT,
ADD COLUMN IF NOT EXISTS trading_platforms TEXT,
ADD COLUMN IF NOT EXISTS account_currencies TEXT,
ADD COLUMN IF NOT EXISTS regulation TEXT,
ADD COLUMN IF NOT EXISTS headquarters TEXT,
ADD COLUMN IF NOT EXISTS year_founded TEXT,
ADD COLUMN IF NOT EXISTS website_url TEXT,
ADD COLUMN IF NOT EXISTS badge TEXT;

-- In case regulations column already exists and conflicts with regulation column:
-- Migrate data from regulations to regulation if needed
UPDATE brokers SET regulation = regulations WHERE regulation IS NULL AND regulations IS NOT NULL;

-- In case country column already exists and conflicts with headquarters column:
-- Migrate data from country to headquarters if needed
UPDATE brokers SET headquarters = country WHERE headquarters IS NULL AND country IS NOT NULL; 