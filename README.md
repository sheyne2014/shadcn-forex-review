# BrokerAnalysis - Forex Broker Comparison Platform

A comprehensive platform for comparing forex brokers, built with Next.js 15, React 19, Tailwind CSS, and Supabase. The platform uses advanced web scraping, real-time data fetching, and browser automation to provide users with accurate and up-to-date broker information.

## Features

### Core Features
- Database-driven broker comparison with detailed information
- Authenticated user reviews and ratings
- Categorized broker listings
- Responsive UI using shadcn/ui components

### Advanced Web Intelligence Features
- **Automated Broker Data Scraping**: Uses FireCrawl to automatically extract broker information from official websites
- **Real-time Market News**: Aggregates financial news from multiple sources using web scraping
- **Broker Scam Detection**: Checks broker legitimacy against warning signs from multiple sources
- **Regulatory Verification**: Uses browser automation to verify broker regulation claims on official regulator websites

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Web Intelligence**:
  - FireCrawl for web scraping and search
  - Playwright for browser automation
  - Custom parsing algorithms for data extraction

## Project Structure

```
/
├── src/
│   ├── app/               # Next.js app directory with routes
│   │   ├── api/           # API routes for data operations
│   │   │   └── ...
│   │   ├── auth/          # Authentication routes
│   │   ├── broker/        # Individual broker pages
│   │   └── ...
│   ├── components/        # React components
│   │   ├── brokers/       # Broker-specific components
│   │   ├── ui/            # UI components from shadcn
│   │   └── ...
│   ├── lib/               # Utility functions and services
│   │   ├── scrapers/      # Web scraping services
│   │   ├── database.ts    # Database service layer
│   │   └── ...
│   └── ...
├── database-setup.sql     # SQL setup script for Supabase
└── ...
```

## Web Intelligence Features in Detail

### Broker Data Scraping

The system uses advanced web scraping to:
- Find broker websites using semantic search
- Extract key information like minimum deposit, trading fees, and regulations
- Validate information across multiple sources

### Market News Aggregation

Real-time market news is sourced from:
- Financial news websites
- Broker blogs
- Regulatory announcements
- Categorized by asset class (Forex, Crypto, Stocks, Commodities)

### Scam Detection System

The platform uses multi-source verification to:
- Check broker names against scam warnings
- Analyze user sentiment from forums and review sites
- Verify regulatory claims with official sources
- Generate risk scores based on collective findings

### Regulatory Verification

Using browser automation to:
- Navigate to official regulator websites
- Submit search queries for broker names
- Extract and parse registration status
- Capture verification screenshots as evidence

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sheyne2014/shadcn-forex-review.git
cd shadcn-forex-review
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Set up the database:
Run the SQL script in `database-setup.sql` in your Supabase SQL editor.

5. Run the development server:
```bash
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
