import { db } from "@/lib/database";

// This is a placeholder for the broker type. You might want to create a proper type file.
export interface BrokerDetails {
  id: string;
  name: string;
  logo_url?: string | null;
  min_deposit?: number | null;
  trading_fee?: number | null;
  regulations?: string | null;
  supported_assets?: string[] | null;
  country?: string | null;
  rating?: number | null;
  created_at?: string | null;
  min_trade_size?: string | null;
  max_leverage?: string | null;
  spread_from?: string | null;
  trading_platforms?: string | null;
  year_founded?: string | null;
  website_url?: string | null;
  badge?: string | null;
  demo_account?: boolean | null;
  research_reports?: boolean | null;
  trading_ideas?: boolean | null;
  news_feed?: boolean | null;
  video_tutorials?: boolean | null;
  trading_courses?: boolean | null;
  webinars?: boolean | null;
  [key: string]: any; // Allow any additional properties
}

export async function fetchBrokerDetails(brokerId: string): Promise<BrokerDetails> {
  try {
    // Try to get broker from the database
    const broker = await db.brokers.getById(brokerId);
    
    if (broker) {
      return broker as unknown as BrokerDetails;
    }
  } catch (error) {
    console.error(`Error fetching broker ${brokerId}:`, error);
  }
  
  // Fallback data for brokers
  const fallbackBrokers: Record<string, Partial<BrokerDetails>> = {
    "interactive-brokers": {
      id: "interactive-brokers",
      name: "Interactive Brokers",
      logo_url: "https://logo.clearbit.com/interactivebrokers.com",
      min_deposit: 0,
      trading_fee: 0.005,
      supported_assets: ["Stocks", "ETFs", "Forex", "Futures", "Options", "Bonds", "Crypto"],
      trading_platforms: "IBKR Trader Workstation, IBKR Mobile",
      rating: 4.8,
      regulations: "FCA, SEC, FINRA, IIROC, ASIC",
      country: "United States",
      year_founded: "1978",
      demo_account: true,
      research_reports: true,
      trading_ideas: true,
      news_feed: true,
      video_tutorials: true,
      trading_courses: true,
      webinars: true,
      max_leverage: "40:1",
      spread_from: "0.1 pips"
    },
    "xtb": {
      id: "xtb",
      name: "XTB",
      logo_url: "https://logo.clearbit.com/xtb.com",
      min_deposit: 250,
      trading_fee: 0,
      supported_assets: ["Forex", "Stocks", "ETFs", "Indices", "Commodities", "Crypto"],
      trading_platforms: "xStation 5, MT4, Mobile Apps",
      rating: 4.7,
      regulations: "FCA, KNF, CNMV, IFSC",
      country: "Poland",
      year_founded: "2002",
      demo_account: true,
      research_reports: true,
      trading_ideas: true,
      news_feed: true,
      video_tutorials: true,
      trading_courses: false,
      webinars: true,
      max_leverage: "30:1",
      spread_from: "0.1 pips"
    },
    "oanda": {
      id: "oanda",
      name: "OANDA",
      logo_url: "https://logo.clearbit.com/oanda.com",
      min_deposit: 0,
      trading_fee: 0,
      supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
      trading_platforms: "OANDA Trade, MT4, MT5, TradingView",
      rating: 4.7,
      regulations: "FCA, ASIC, CFTC, MAS",
      country: "United States",
      year_founded: "1996",
      demo_account: true,
      research_reports: true,
      trading_ideas: true,
      news_feed: true,
      video_tutorials: true,
      trading_courses: true,
      webinars: true,
      max_leverage: "50:1",
      spread_from: "0.0 pips"
    },
    "ic-markets": {
      id: "ic-markets",
      name: "IC Markets",
      logo_url: "https://logo.clearbit.com/icmarkets.com",
      min_deposit: 200,
      trading_fee: 0,
      supported_assets: ["Forex", "Stocks", "Commodities", "Indices", "Bonds", "Futures", "Crypto"],
      trading_platforms: "MT4, MT5, cTrader",
      rating: 4.6,
      regulations: "ASIC, CySEC, FSA",
      country: "Australia",
      year_founded: "2007",
      demo_account: true,
      research_reports: false,
      trading_ideas: false,
      news_feed: true,
      video_tutorials: true,
      trading_courses: false,
      webinars: true,
      max_leverage: "500:1",
      spread_from: "0.0 pips"
    },
    "pepperstone": {
      id: "pepperstone",
      name: "Pepperstone",
      logo_url: "https://logo.clearbit.com/pepperstone.com",
      min_deposit: 200,
      trading_fee: 0,
      supported_assets: ["Forex", "Commodities", "Indices", "Crypto"],
      trading_platforms: "MT4, MT5, cTrader",
      rating: 4.7,
      regulations: "FCA, ASIC, CySEC, DFSA, BaFin",
      country: "Australia",
      year_founded: "2010",
      demo_account: true,
      research_reports: false,
      trading_ideas: false,
      news_feed: true,
      video_tutorials: true,
      trading_courses: true,
      webinars: true,
      max_leverage: "500:1",
      spread_from: "0.0 pips"
    },
    "xm": {
      id: "xm",
      name: "XM",
      logo_url: "https://logo.clearbit.com/xm.com",
      min_deposit: 5,
      trading_fee: 0,
      supported_assets: ["Forex", "Commodities", "Indices", "Stocks", "Crypto", "Metals"],
      trading_platforms: "MT4, MT5, Mobile Apps",
      rating: 4.5,
      regulations: "FCA, ASIC, CySEC, IFSC",
      country: "Cyprus",
      year_founded: "2009",
      demo_account: true,
      research_reports: false,
      trading_ideas: true,
      news_feed: true,
      video_tutorials: true,
      trading_courses: true,
      webinars: true,
      max_leverage: "1000:1",
      spread_from: "0.0 pips"
    },
    "saxo-bank": {
      id: "saxo-bank",
      name: "Saxo Bank",
      logo_url: "https://logo.clearbit.com/saxobank.com",
      min_deposit: 2000,
      trading_fee: 0.08,
      supported_assets: ["Forex", "Stocks", "ETFs", "Bonds", "Options", "Futures", "Crypto"],
      trading_platforms: "SaxoTraderGO, SaxoTraderPRO",
      rating: 4.8,
      regulations: "FCA, MAS, ASIC, FINMA, JFSA",
      country: "Denmark",
      year_founded: "1992",
      demo_account: true,
      research_reports: true,
      trading_ideas: true,
      news_feed: true,
      video_tutorials: true,
      trading_courses: true,
      webinars: true,
      max_leverage: "200:1",
      spread_from: "0.4 pips"
    },
    "axi": {
      id: "axi",
      name: "AXI",
      logo_url: "https://logo.clearbit.com/axi.com",
      min_deposit: 50,
      trading_fee: 0,
      supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
      trading_platforms: "MT4, WebTrader, Mobile App",
      rating: 4.4,
      regulations: "ASIC, FCA, DFSA",
      country: "Australia",
      year_founded: "2007",
      demo_account: true,
      research_reports: false,
      trading_ideas: false,
      news_feed: true,
      video_tutorials: true,
      trading_courses: false,
      webinars: true,
      max_leverage: "400:1",
      spread_from: "0.0 pips"
    },
    "swissquote": {
      id: "swissquote",
      name: "Swissquote",
      logo_url: "https://logo.clearbit.com/swissquote.com",
      min_deposit: 1000,
      trading_fee: 0.1,
      supported_assets: ["Forex", "Stocks", "Options", "ETFs", "Funds", "Bonds"],
      trading_platforms: "Advanced Trader, MT4, MT5",
      rating: 4.5,
      regulations: "FINMA, FCA, DFSA, MAS",
      country: "Switzerland",
      year_founded: "1996",
      demo_account: true,
      research_reports: true,
      trading_ideas: true,
      news_feed: true,
      video_tutorials: false,
      trading_courses: false,
      webinars: true,
      max_leverage: "100:1",
      spread_from: "0.6 pips"
    },
    "startrader": {
      id: "startrader",
      name: "StarTrader",
      logo_url: "https://ui-avatars.com/api/?name=StarTrader&background=0D8ABC&color=fff&size=128&bold=true&format=png",
      min_deposit: 200,
      trading_fee: 0,
      supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "Crypto"],
      trading_platforms: "StarTrader Pro, MT4, MT5, Mobile App",
      rating: 4.6,
      regulations: "ASIC, FCA, CySEC",
      country: "Australia",
      year_founded: "2012",
      demo_account: true,
      research_reports: false,
      trading_ideas: true,
      news_feed: true,
      video_tutorials: true,
      trading_courses: true,
      webinars: true,
      max_leverage: "500:1",
      spread_from: "0.1 pips"
    }
  };
  
  // Return fallback data for the broker or a default "unknown" broker
  return (fallbackBrokers[brokerId] || {
    id: brokerId,
    name: brokerId.replace(/-/g, ' '),
    rating: 3.0
  }) as BrokerDetails;
} 