/**
 * Broker template data for generating broker pages
 */

export interface BrokerTemplateData {
  slug: string;
  name: string;
  description: string;
  logo_url: string;
  website_url: string;
  min_deposit: number;
  max_leverage: string;
  regulations: string;
  trading_platforms: string;
  spreads_from: string;
  account_types: string[];
  country: string;
  established: string;
  overall_rating: number;
  pros: string[];
  cons: string[];
  educational_resources: boolean;
}

/**
 * Template data for all brokers
 */
export const brokerTemplates: Record<string, BrokerTemplateData> = {
  'interactive-brokers': {
    slug: 'interactive-brokers',
    name: "Interactive Brokers",
    description: "Interactive Brokers is a global electronic brokerage firm offering trading in stocks, options, futures, currencies, bonds, and funds.",
    logo_url: "/images/brokers/interactive-brokers.png",
    website_url: "https://www.interactivebrokers.com",
    min_deposit: 0,
    max_leverage: "1:4",
    regulations: "SEC, FINRA, FCA, CFTC",
    trading_platforms: "IBKR Trader Workstation, IBKR Mobile, Client Portal",
    spreads_from: "0.1 pips",
    account_types: ["Cash", "Margin", "Portfolio Margin", "IRA"],
    country: "United States",
    established: "1978",
    overall_rating: 4.8,
    pros: ["Extensive product range", "Advanced trading platforms", "Low commissions", "Global market access"],
    cons: ["Complex platform for beginners", "High account minimums for some features", "Customer service can be slow"],
    educational_resources: true
  },
  'xtb': {
    slug: 'xtb',
    name: "XTB",
    description: "XTB is a global forex and CFD broker offering access to thousands of financial markets including forex, indices, commodities, and shares.",
    logo_url: "/images/brokers/xtb.png",
    website_url: "https://www.xtb.com",
    min_deposit: 0,
    max_leverage: "1:30",
    regulations: "FCA, KNF, CySEC",
    trading_platforms: "xStation 5, MT4, Mobile App",
    spreads_from: "0.1 pips",
    account_types: ["Standard", "Pro"],
    country: "Poland",
    established: "2002",
    overall_rating: 4.7,
    pros: ["No minimum deposit", "Regulated by multiple authorities", "Competitive spreads", "Proprietary trading platform"],
    cons: ["Limited product range compared to some competitors", "No US clients accepted"],
    educational_resources: true
  },
  'oanda': {
    slug: 'oanda',
    name: "OANDA",
    description: "OANDA is a global forex broker offering access to forex, indices, commodities, and metals trading with competitive spreads.",
    logo_url: "/images/brokers/oanda.png",
    website_url: "https://www.oanda.com",
    min_deposit: 0,
    max_leverage: "1:50",
    regulations: "FCA, ASIC, CFTC, MAS",
    trading_platforms: "OANDA Trade, MT4, fxTrade Mobile",
    spreads_from: "0.6 pips",
    account_types: ["Standard", "Premium"],
    country: "United States",
    established: "1996",
    overall_rating: 4.6,
    pros: ["No minimum deposit", "Regulated globally", "Advanced charting tools", "Excellent educational resources"],
    cons: ["Higher spreads than some competitors", "Limited product range", "No MT5 platform"],
    educational_resources: true
  },
  'saxo-bank': {
    slug: 'saxo-bank',
    name: "Saxo Bank",
    description: "Saxo Bank is a Danish investment bank specializing in online trading and investment across global financial markets.",
    logo_url: "/images/brokers/saxo-bank.png",
    website_url: "https://www.home.saxo",
    min_deposit: 2000,
    max_leverage: "1:50",
    regulations: "FCA, ASIC, MAS, FINMA",
    trading_platforms: "SaxoTraderGO, SaxoTraderPRO, SaxoTraderMobile",
    spreads_from: "0.4 pips",
    account_types: ["Classic", "Platinum", "VIP"],
    country: "Denmark",
    established: "1992",
    overall_rating: 4.7,
    pros: ["Extensive product range", "Advanced trading platforms", "Excellent research tools", "Strong regulatory oversight"],
    cons: ["High minimum deposit", "Higher fees for small accounts", "Complex platform for beginners"],
    educational_resources: true
  },
  'axi': {
    slug: 'axi',
    name: "AXI",
    description: "AXI (formerly AxiTrader) is a global forex and CFD broker offering trading on forex, commodities, indices, and cryptocurrencies.",
    logo_url: "/images/brokers/axi.png",
    website_url: "https://www.axi.com",
    min_deposit: 50,
    max_leverage: "1:400",
    regulations: "ASIC, FCA, DFSA",
    trading_platforms: "MT4, MT5, WebTrader",
    spreads_from: "0.0 pips",
    account_types: ["Standard", "Pro"],
    country: "Australia",
    established: "2007",
    overall_rating: 4.5,
    pros: ["Low minimum deposit", "Competitive spreads", "Multiple platform options", "Fast execution"],
    cons: ["Limited product range", "Educational resources could be improved"],
    educational_resources: false
  },
  'swissquote': {
    slug: 'swissquote',
    name: "Swissquote",
    description: "Swissquote is a Swiss banking group specializing in providing online financial and trading services.",
    logo_url: "/images/brokers/swissquote.png",
    website_url: "https://www.swissquote.com",
    min_deposit: 1000,
    max_leverage: "1:100",
    regulations: "FINMA, FCA, DFSA, MAS",
    trading_platforms: "Advanced Trader, MT4, MT5, Mobile App",
    spreads_from: "0.8 pips",
    account_types: ["Standard", "Premium", "Prime"],
    country: "Switzerland",
    established: "1996",
    overall_rating: 4.6,
    pros: ["Swiss bank security", "Wide range of markets", "Advanced trading tools", "Multi-asset platform"],
    cons: ["Higher minimum deposit", "Higher fees than some competitors", "Complex account structure"],
    educational_resources: true
  },
  'startrader': {
    slug: 'startrader',
    name: "StarTrader",
    description: "StarTrader is a forex and CFD broker offering trading on multiple financial instruments with competitive conditions.",
    logo_url: "/images/brokers/startrader.png",
    website_url: "https://www.startrader.com",
    min_deposit: 100,
    max_leverage: "1:500",
    regulations: "FSC, CySEC",
    trading_platforms: "MT4, MT5, WebTrader",
    spreads_from: "0.5 pips",
    account_types: ["Standard", "ECN", "VIP"],
    country: "Cyprus",
    established: "2010",
    overall_rating: 4.3,
    pros: ["Competitive spreads", "Multiple account types", "Fast execution", "24/7 customer support"],
    cons: ["Limited educational resources", "Newer broker with less track record", "Limited product range"],
    educational_resources: false
  },
  'etoro': {
    slug: 'etoro',
    name: "eToro",
    description: "eToro is a multi-asset investment platform with a social trading feature that enables users to copy trades of successful investors.",
    logo_url: "/images/brokers/etoro.png",
    website_url: "https://www.etoro.com",
    min_deposit: 50,
    max_leverage: "1:30",
    regulations: "FCA, CySEC, ASIC",
    trading_platforms: "eToro Platform, Mobile App",
    spreads_from: "1.0 pips",
    account_types: ["Retail", "Professional"],
    country: "Israel",
    established: "2007",
    overall_rating: 4.5,
    pros: ["Social trading features", "Wide range of assets", "User-friendly platform", "CopyTrader functionality"],
    cons: ["Higher spreads than some competitors", "Withdrawal fees", "Limited technical analysis tools"],
    educational_resources: true
  },
  'plus500': {
    slug: 'plus500',
    name: "Plus500",
    description: "Plus500 is a global CFD broker offering trading on forex, indices, commodities, cryptocurrencies, shares, and ETFs.",
    logo_url: "/images/brokers/plus500.png",
    website_url: "https://www.plus500.com",
    min_deposit: 100,
    max_leverage: "1:30",
    regulations: "FCA, CySEC, ASIC, MAS",
    trading_platforms: "Plus500 WebTrader, Mobile App",
    spreads_from: "0.6 pips",
    account_types: ["Retail", "Professional"],
    country: "Israel",
    established: "2008",
    overall_rating: 4.4,
    pros: ["User-friendly platform", "No commissions", "Guaranteed stop loss", "Wide range of instruments"],
    cons: ["Limited educational resources", "No MT4/MT5 integration", "Limited research tools"],
    educational_resources: false
  },
  'capital-com': {
    slug: 'capital-com',
    name: "Capital.com",
    description: "Capital.com is a global CFD broker offering trading on forex, indices, commodities, cryptocurrencies, and shares with AI-powered insights.",
    logo_url: "/images/brokers/capital-com.png",
    website_url: "https://capital.com",
    min_deposit: 20,
    max_leverage: "1:30",
    regulations: "FCA, CySEC, ASIC, NBRB",
    trading_platforms: "Capital.com Platform, MT4, Mobile App",
    spreads_from: "0.6 pips",
    account_types: ["Standard", "Plus", "Premier"],
    country: "Cyprus",
    established: "2016",
    overall_rating: 4.6,
    pros: ["Low minimum deposit", "AI-powered trading insights", "No commissions", "Excellent educational resources"],
    cons: ["Limited product range", "Newer broker with less track record", "No MT5 platform"],
    educational_resources: true
  }
};

/**
 * Get broker template data by slug
 * 
 * @param slug - The broker slug
 * @returns The broker template data or undefined if not found
 */
export function getBrokerTemplate(slug: string): BrokerTemplateData | undefined {
  return brokerTemplates[slug];
}
