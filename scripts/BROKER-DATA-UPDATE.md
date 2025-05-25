# Comprehensive Broker Data Update Scripts

This directory contains scripts to replace hardcoded eToro template data with accurate, broker-specific information for all brokers in the database.

## 🎯 Purpose

The broker pages at `/brokers` currently display hardcoded information inherited from the eToro template, including:
- Spreads and commission structures
- Fee information
- Account types
- Trading conditions
- Platform details
- Other broker-specific sections

These scripts will replace this hardcoded data with real, accurate information for each broker.

## 📁 Main Files

### Core Scripts
- **`comprehensive-broker-data-update.ts`** - Main update script with all data sources
- **`broker-data-enhancer.ts`** - Advanced data extraction and analysis utilities
- **`run-broker-update.ts`** - Interactive CLI runner with safety checks

## 🚀 Quick Start

### Option 1: Interactive CLI (Recommended)
```bash
npx tsx scripts/run-broker-update.ts
```

This will show an interactive menu with options:
1. 🔄 Full Update (All brokers, all data sources)
2. 🎯 Selective Update (Choose specific brokers)
3. 🖼️ Images Only (Find missing logos and screenshots)
4. 📊 Data Validation (Check existing data quality)
5. 🔙 Rollback (Restore from backup)

### Option 2: Direct Script Execution
```bash
# Full update
npx tsx scripts/comprehensive-broker-data-update.ts

# Images only
npx tsx scripts/comprehensive-broker-data-update.ts --images-only

# Specific brokers
npx tsx scripts/comprehensive-broker-data-update.ts --brokers="broker-id-1,broker-id-2"

# Data validation
npx tsx scripts/comprehensive-broker-data-update.ts --validate-only

# Rollback
npx tsx scripts/comprehensive-broker-data-update.ts --rollback="broker-backup-1234567890.json"
```

## 🔧 Prerequisites

1. **Environment Variables** (in `.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   MCP_API_KEY=your_mcp_api_key (optional)
   ```

2. **Dependencies**:
   ```bash
   npm install @supabase/supabase-js dotenv
   npm install -g tsx  # For TypeScript execution
   ```

## 📊 Data Sources

The scripts utilize multiple data sources:

### 🤖 MCP Servers
- **Context7**: Content generation and SEO optimization
- **Puppeteer**: Web scraping from official broker websites
- **YFinance**: Financial market data

### 🔍 Web Search
- Claude AI web search capabilities
- Google Images for logos and screenshots
- Financial news and review sites

### 🌐 Direct Sources
- Official broker websites
- Regulatory authority databases
- Clearbit Logo API for missing logos

## 📋 What Gets Updated

### Trading Conditions
- ✅ Spreads (EUR/USD, GBP/USD, USD/JPY, XAU/USD)
- ✅ Commission structures
- ✅ Minimum deposits
- ✅ Maximum leverage
- ✅ Account types
- ✅ Fee structures (withdrawal, deposit, inactivity)

### Platform Information
- ✅ Available platforms (MT4, MT5, WebTrader, Mobile)
- ✅ Platform features and capabilities
- ✅ Screenshots and images
- ✅ Platform ratings and reviews

### Regulatory & Company Info
- ✅ Regulatory authorities (FCA, CySEC, ASIC, etc.)
- ✅ Company headquarters
- ✅ Year founded
- ✅ Official website URLs

### Images & Assets
- ✅ Official broker logos
- ✅ MT4/MT5 platform screenshots
- ✅ WebTrader interface images
- ✅ Mobile app screenshots

## 🛡️ Safety Features

### Automatic Backups
- Creates timestamped backup before any changes
- Backup files: `broker-backup-{timestamp}.json`
- Rollback capability to restore previous state

### Data Validation
- Validates extracted data against known patterns
- Flags suspicious values (e.g., spreads > 10 pips)
- Confidence scoring for data quality

### Error Handling
- Comprehensive error logging
- Graceful fallbacks when services unavailable
- Progress tracking and reporting

## 📈 Progress Tracking

The scripts provide detailed progress information:

```
🔍 Processing broker: eToro (805f65c5-3911-448e-8800-0143bbbb2a0f)
✅ Successfully scraped data for eToro
✅ Generated enhanced content for eToro
✅ Found logo for eToro: https://logo.clearbit.com/etoro.com
✅ Successfully processed eToro

📋 Progress: 5/50 (10%) - Success: 4, Failed: 1, Skipped: 0
```

## 📊 Reports Generated

### Update Summary
- `broker-update-summary.json` - Complete update statistics
- `broker-update.log` - Detailed execution log

### Validation Report
- `broker-validation-report.json` - Data quality assessment
- Lists brokers with issues and recommendations

## 🔄 Update Modes

### 1. Full Update
- Processes all brokers
- Uses all data sources
- Updates all fields
- **Recommended for initial setup**

### 2. Selective Update
- Choose specific brokers by ID
- Useful for testing or fixing specific issues
- Same comprehensive data collection

### 3. Images Only
- Searches for missing logos and screenshots
- Faster execution
- Good for visual improvements

### 4. Data Validation
- Checks existing data quality
- Identifies issues and inconsistencies
- No database changes

### 5. Rollback
- Restores from backup file
- Emergency recovery option
- Validates backup before restore

## 🚨 Troubleshooting

### Common Issues

1. **MCP Services Not Available**
   - Scripts will continue with web search fallbacks
   - Check MCP_API_KEY environment variable

2. **Supabase Connection Failed**
   - Verify SUPABASE_URL and SERVICE_ROLE_KEY
   - Check network connectivity

3. **Rate Limiting**
   - Scripts include delays between requests
   - Reduce batch size if needed

4. **Data Validation Failures**
   - Review validation report
   - Manual verification may be needed

### Getting Help

1. Check the execution logs: `broker-update.log`
2. Review the validation report: `broker-validation-report.json`
3. Use rollback if needed: `--rollback="backup-file.json"`

## 🎯 Expected Results

After running the scripts, you should see:

1. **Accurate Trading Conditions**: Real spreads, commissions, and fees for each broker
2. **Proper Platform Information**: Correct MT4/MT5 availability and features
3. **Updated Images**: Official logos and platform screenshots
4. **Regulatory Compliance**: Accurate regulatory information
5. **Consistent Data**: No more eToro template data on other broker pages

The goal is to ensure each broker page displays authentic, up-to-date information specific to that broker rather than generic template data.

## 🚀 Getting Started

To start the broker data update process:

1. **Run the interactive CLI**:
   ```bash
   npx tsx scripts/run-broker-update.ts
   ```

2. **Follow the prompts** to select your update mode

3. **Review the results** in the generated reports

4. **Test the updated broker pages** at http://localhost:3000/brokers

The scripts are designed to be safe, comprehensive, and provide detailed feedback throughout the process.
