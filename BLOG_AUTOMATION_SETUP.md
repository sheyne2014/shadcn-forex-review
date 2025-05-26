# Blog Automation System Setup Guide

This guide will walk you through setting up the automated blog post generation system for your broker review website.

## 🎯 Overview

The blog automation system generates 3+ SEO-optimized blog posts per week automatically by:
- **Diverse Content Types**: Creates broker reviews (30%), forex guides (25%), stock analysis (20%), crypto guides (15%), options/CFD/ETF content (10%)
- **Smart Topic Selection**: Uses weighted random selection to ensure content variety
- **Real-time Research**: Searches current trends, questions, and market news across all financial categories
- **AI-Powered Generation**: Creates comprehensive, SEO-optimized content using Context7, OpenAI, or Claude
- **Automated Publishing**: Stores directly in your Supabase database with proper categorization
- **Flexible Scheduling**: Runs via Vercel cron jobs or external schedulers

## 📊 Content Distribution

The system automatically generates diverse content across financial markets:

- **30% Broker Reviews**: eToro Review 2025, XM vs Competitors, IC Markets Analysis
- **25% Forex Trading**: Currency Pair Analysis, Forex Strategies, Market Trends
- **20% Stock Market**: Stock Analysis, Investment Strategies, Market Predictions
- **15% Cryptocurrency**: Crypto Trading, Bitcoin Analysis, DeFi Strategies
- **5% Options Trading**: Options Strategies, Greeks Explained, Risk Management
- **3% CFD Trading**: CFD vs Stocks, Leverage Strategies, Platform Comparison
- **2% ETF Investing**: Best ETFs 2025, Portfolio Diversification, Index Funds

## 📋 Prerequisites

- Next.js application with Supabase database
- At least one AI API key (Context7, OpenAI, or Anthropic)
- Blog posts table in Supabase
- Vercel deployment (for automated scheduling)

## 🔧 Step 1: Environment Setup

### 1.1 Copy Environment Template
```bash
cp .env.example .env.local
```

### 1.2 Required Environment Variables

Add these to your `.env.local` file:

```env
# Required for blog automation
BLOG_AUTOMATION_SECRET=your_unique_secret_token_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# At least one AI API (choose one or more)
CONTEXT7_API_KEY=your_context7_api_key
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Optional but recommended for better content
GOOGLE_SEARCH_API_KEY=your_google_search_api_key
GOOGLE_SEARCH_ENGINE_ID=your_custom_search_engine_id
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

### 1.3 Generate Secret Token

Generate a secure secret token:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

## 🗄️ Step 2: Database Setup

### 2.1 Verify Blog Posts Table

Ensure your `blog_posts` table has these columns:
```sql
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  reading_time INTEGER,
  tags TEXT,
  image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  author_id UUID,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.2 Test Database Connection

```bash
npm run test-blog-automation
```

## 🤖 Step 3: API Key Setup

### 3.1 Context7 API (Recommended)
1. Sign up at [Context7](https://context7.ai)
2. Get your API key from the dashboard
3. Add to `.env.local`: `CONTEXT7_API_KEY=your_key`

### 3.2 OpenAI API (Alternative)
1. Sign up at [OpenAI](https://platform.openai.com)
2. Create an API key
3. Add to `.env.local`: `OPENAI_API_KEY=your_key`

### 3.3 Google Search API (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable Custom Search API
3. Create credentials
4. Set up Custom Search Engine at [CSE](https://cse.google.com)
5. Add both keys to `.env.local`

### 3.4 Unsplash API (Optional)
1. Sign up at [Unsplash Developers](https://unsplash.com/developers)
2. Create an application
3. Add access key to `.env.local`

## 🧪 Step 4: Testing

### 4.1 Test System Components
```bash
# Test all components
npm run test-blog-automation

# Test with actual blog generation
npm run test-blog-generation
```

### 4.2 Manual Blog Generation
```bash
# Generate a single blog post manually
npm run generate-blog-post
```

## ⏰ Step 5: Scheduling Setup

### 5.1 Vercel Cron Jobs (Recommended)

The system is pre-configured with Vercel cron jobs in `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/generate-blog-post",
      "schedule": "0 9 * * 1,3,5"
    }
  ]
}
```

This runs Monday, Wednesday, Friday at 9 AM UTC.

### 5.2 Add Secret to Vercel

1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Add environment variable:
   - Name: `BLOG_AUTOMATION_SECRET`
   - Value: Your secret token

### 5.3 Alternative: External Scheduler

If you prefer external scheduling:

1. Sign up at [Cron-Job.org](https://cron-job.org) or similar
2. Create a new cron job:
   - URL: `https://your-domain.com/api/generate-blog-post`
   - Method: POST
   - Headers: `x-secret-token: your_secret_token`
   - Schedule: `0 9 * * 1,3,5` (Mon, Wed, Fri at 9 AM)

## 🚀 Step 6: Deployment

### 6.1 Deploy to Vercel
```bash
# Deploy with environment variables
vercel --prod
```

### 6.2 Verify Deployment
1. Check Vercel dashboard for successful deployment
2. Verify environment variables are set
3. Test the API endpoint manually

## 📊 Step 7: Monitoring

### 7.1 Check Generated Posts
```bash
# View recent blog posts
npm run test-blog-automation
```

### 7.2 Monitor Logs
- Check Vercel function logs for cron job execution
- Monitor Supabase for new blog posts
- Set up alerts for failed generations

## 🛠️ Customization

### 7.1 Adjust Posting Frequency

Edit `vercel.json` to change schedule:
```json
{
  "crons": [
    {
      "path": "/api/generate-blog-post",
      "schedule": "0 9 * * *"  // Daily at 9 AM
    }
  ]
}
```

### 7.2 Customize Content Generation

Edit `src/lib/blog-generator.ts` to:
- Modify blog structure
- Change content length
- Adjust SEO optimization
- Add custom sections

### 7.3 Add Content Filters

Modify the broker selection logic in `src/app/api/generate-blog-post/route.ts`:
```typescript
// Filter by specific criteria
const filteredBrokers = brokers.filter(broker =>
  broker.rating >= 4.0 &&
  broker.regulation
);
```

## 🔍 Troubleshooting

### Common Issues

1. **"Unauthorized" Error**
   - Check `BLOG_AUTOMATION_SECRET` is set correctly
   - Verify the secret matches in both local and Vercel environments

2. **"Failed to fetch brokers"**
   - Verify Supabase connection
   - Check if brokers table has data
   - Ensure service role key has proper permissions

3. **"Content generation failed"**
   - Verify at least one AI API key is working
   - Check API quotas and billing
   - Review error logs for specific issues

4. **"Database insertion error"**
   - Check blog_posts table schema
   - Verify required columns exist
   - Check for unique constraint violations

### Debug Mode

Enable debug logging:
```env
DEBUG_BLOG_GENERATION=true
```

### Test Mode

For development, enable test mode for shorter content:
```env
BLOG_TEST_MODE=true
```

## 📈 Performance Optimization

1. **Content Quality**: Use Context7 or GPT-4 for best results
2. **Search Integration**: Add Google Search API for trending topics across all financial markets
3. **Image Quality**: Use Unsplash API for category-specific professional images
4. **SEO Optimization**: Ensure all meta fields are populated with category-relevant keywords
5. **Content Diversity**: System automatically balances content types for maximum audience reach

## 🎯 Content Examples

The system generates diverse, high-quality content such as:

### Broker Reviews (30%)
- "eToro Review 2025: Complete Social Trading Platform Analysis"
- "XM vs IC Markets: Which Forex Broker Offers Better Value?"
- "Interactive Brokers Platform Review: Features, Fees, and Performance"

### Forex Trading (25%)
- "EUR/USD Forecast 2025: Technical Analysis and Market Trends"
- "Best Forex Trading Strategies for Volatile Markets"
- "Forex Risk Management: Position Sizing and Stop Loss Strategies"

### Stock Market (20%)
- "Best Growth Stocks to Buy in 2025: Complete Analysis"
- "Dividend Investing Strategies for Passive Income"
- "Stock Market Volatility: How to Profit from Market Swings"

### Cryptocurrency (15%)
- "Bitcoin Price Prediction 2025: Technical and Fundamental Analysis"
- "DeFi Investing Guide: Opportunities and Risk Management"
- "Altcoin Analysis: Hidden Gems for 2025 Portfolio"

### Options Trading (5%)
- "Covered Call Strategy: Generate Income from Stock Holdings"
- "Options Greeks Explained: Delta, Gamma, Theta, and Vega"
- "Iron Condor Strategy: Profit from Sideways Market Movement"

### CFD Trading (3%)
- "CFD vs Stocks: Which Trading Method Suits Your Style?"
- "Leverage in CFD Trading: Maximizing Profits While Managing Risk"
- "Best CFD Brokers 2025: Platform Comparison and Features"

### ETF Investing (2%)
- "Best ETFs for 2025: Diversified Portfolio Building"
- "Sector ETF Analysis: Technology, Healthcare, and Energy"
- "International ETF Investing: Global Diversification Strategies"

## 🔒 Security Considerations

1. Keep your `BLOG_AUTOMATION_SECRET` secure
2. Use environment variables for all API keys
3. Regularly rotate API keys
4. Monitor for unusual API usage
5. Set up rate limiting if needed

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review Vercel function logs
3. Test components individually
4. Verify all environment variables

The system is designed to be robust with fallbacks, but proper configuration is essential for optimal performance.
