-- Insert sample brokers if they don't exist
INSERT INTO brokers (id, name, description, country, regulations, min_deposit, trading_fee, logo_url, rating, supported_assets, url)
VALUES 
    ('b1000000-0000-0000-0000-000000000001', 'XYZ Broker', 'A leading forex broker with competitive spreads and advanced trading tools.', 'United Kingdom', 'FCA, ASIC', 100, 0.8, 'https://placehold.co/150x60?text=XYZ', 4.7, ARRAY['Forex', 'Stocks', 'Commodities', 'Crypto'], 'https://xyz-broker.example.com'),
    ('b2000000-0000-0000-0000-000000000002', 'Alpha Trading', 'Multi-asset broker with a focus on forex and commodities trading.', 'Australia', 'ASIC, CySEC', 200, 1.2, 'https://placehold.co/150x60?text=Alpha', 4.2, ARRAY['Forex', 'Commodities', 'Indices'], 'https://alpha-trading.example.com'),
    ('b3000000-0000-0000-0000-000000000003', 'Global FX', 'Global forex broker with 24/7 customer support and educational resources.', 'Cyprus', 'CySEC, FSA', 50, 0.5, 'https://placehold.co/150x60?text=GlobalFX', 4.8, ARRAY['Forex', 'Crypto', 'Metals'], 'https://globalfx.example.com')
ON CONFLICT (id) DO NOTHING;

-- Insert sample reviews if they don't exist
INSERT INTO reviews (id, broker_id, user_name, user_email, rating, comment, created_at)
VALUES 
    ('r1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'John Smith', 'john@example.com', 5, 'Excellent execution speed and responsive customer service.', NOW() - INTERVAL '5 days'),
    ('r2000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Sarah Jones', 'sarah@example.com', 4, 'Good platform with minor issues. Overall satisfied with their services.', NOW() - INTERVAL '10 days'),
    ('r3000000-0000-0000-0000-000000000003', 'b2000000-0000-0000-0000-000000000002', 'Michael Brown', 'michael@example.com', 3, 'Average service. Could improve their educational resources.', NOW() - INTERVAL '15 days'),
    ('r4000000-0000-0000-0000-000000000004', 'b3000000-0000-0000-0000-000000000003', 'Emma Davis', 'emma@example.com', 5, 'The best forex broker I have used. Very low spreads and fast execution.', NOW() - INTERVAL '7 days')
ON CONFLICT (id) DO NOTHING;

-- Insert sample blog posts if they don't exist
INSERT INTO blog_posts (id, title, content, slug, excerpt, published_at, image_url, reading_time, category_id)
VALUES 
    ('p1000000-0000-0000-0000-000000000001', 'Understanding Forex Market Volatility', '<h2>What is Volatility?</h2><p>Volatility refers to the rate at which the price of a currency pair increases or decreases. Higher volatility means that the price of the currency can change dramatically over a short time period in either direction.</p><h2>How to Trade Volatile Markets</h2><p>Trading volatile markets requires strict risk management and a solid trading strategy.</p>', 'understanding-forex-market-volatility', 'Learn how market volatility affects forex trading and strategies to manage risk during volatile periods.', NOW() - INTERVAL '3 days', 'https://placehold.co/800x450?text=Volatility', 8, (SELECT id FROM blog_categories WHERE slug = 'market-analysis')),
    
    ('p2000000-0000-0000-0000-000000000002', 'Top 5 Trading Strategies for Beginners', '<h2>1. Price Action Trading</h2><p>Price action trading involves analyzing the movement of price to form the basis of your trading decisions.</p><h2>2. Trend Following</h2><p>This strategy involves identifying the direction of market momentum and entering trades that align with this trend.</p>', 'top-5-trading-strategies-for-beginners', 'Discover beginner-friendly trading strategies that can help you start your forex trading journey with confidence.', NOW() - INTERVAL '7 days', 'https://placehold.co/800x450?text=Strategies', 10, (SELECT id FROM blog_categories WHERE slug = 'trading-strategies')),
    
    ('p3000000-0000-0000-0000-000000000003', 'New Regulations Impacting Forex Brokers in 2024', '<h2>Regulatory Changes</h2><p>Several major regulatory bodies have introduced new requirements for forex brokers in 2024.</p><h2>Impact on Traders</h2><p>These regulations aim to provide better protection for retail traders and increase transparency.</p>', 'new-regulations-impacting-forex-brokers-2024', 'Stay updated on the latest regulatory changes affecting forex brokers and how they might impact your trading.', NOW() - INTERVAL '2 days', 'https://placehold.co/800x450?text=Regulations', 7, (SELECT id FROM blog_categories WHERE slug = 'regulation-updates'))
ON CONFLICT (id) DO NOTHING;

-- Insert sample pages if they don't exist
INSERT INTO pages (id, title, slug, content, meta_description, published, published_at)
VALUES 
    ('pg100000-0000-0000-0000-000000000001', 'About Us', 'about-us', '<h1>About BrokerAnalysis</h1><p>BrokerAnalysis is a leading forex broker comparison website dedicated to helping traders find the right broker for their needs.</p><h2>Our Mission</h2><p>We aim to provide unbiased, comprehensive reviews of forex brokers worldwide.</p>', 'Learn about BrokerAnalysis and our mission to help traders find the best forex brokers.', TRUE, NOW() - INTERVAL '30 days'),
    
    ('pg200000-0000-0000-0000-000000000002', 'Contact Us', 'contact-us', '<h1>Contact BrokerAnalysis</h1><p>Have questions or feedback? We''d love to hear from you.</p><h2>Contact Information</h2><p>Email: info@brokeranalysis.example.com</p><p>Phone: +1 (555) 123-4567</p>', 'Contact BrokerAnalysis for questions, feedback, or partnership opportunities.', TRUE, NOW() - INTERVAL '30 days'),
    
    ('pg300000-0000-0000-0000-000000000003', 'Privacy Policy', 'privacy-policy', '<h1>Privacy Policy</h1><p>At BrokerAnalysis, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your personal information.</p>', 'BrokerAnalysis privacy policy explains how we collect, use, and protect your information.', TRUE, NOW() - INTERVAL '30 days')
ON CONFLICT (id) DO NOTHING;

-- Update broker ratings based on reviews
UPDATE brokers
SET rating = (
  SELECT ROUND(AVG(rating)::numeric, 1)
  FROM reviews
  WHERE broker_id = brokers.id
)
WHERE EXISTS (
  SELECT 1
  FROM reviews
  WHERE broker_id = brokers.id
); 