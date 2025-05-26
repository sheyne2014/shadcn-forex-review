// Comprehensive broker data service for consistent data across all pages
import { db } from "@/lib/database";

// Type definition for broker data
export interface BrokerData {
  id: string;
  name: string;
  logo: string;
  rating: number;
  minDeposit: string;
  spread: string;
  platforms: string[];
  regulation: string[];
  pros: string[];
  cons: string[];
  url: string;
  categories: string[];
}

// Real broker data with detailed information
export const BROKER_DATABASE = {
  "eToro": {
    id: "etoro",
    name: "eToro",
    logo: "/images/brokers/etoro.png",
    rating: 4.5,
    minDeposit: "$50",
    spread: "From 1.0 pips",
    platforms: ["eToro Platform"],
    regulation: ["FCA", "CySEC", "ASIC"],
    pros: ["Social trading features", "User-friendly platform", "Wide range of assets"],
    cons: ["Higher forex spreads", "Withdrawal fees"],
    url: "/broker/etoro",
    categories: ["forex", "beginners", "crypto", "stocks", "cfd", "mobile-trading", "swing-trading", "uk", "us", "europe"]
  },
  "XM": {
    id: "xm",
    name: "XM",
    logo: "/images/brokers/xm.png",
    rating: 4.7,
    minDeposit: "$5",
    spread: "From 1.0 pips",
    platforms: ["MT4", "MT5"],
    regulation: ["CySEC", "ASIC", "IFSC"],
    pros: ["Very low minimum deposit", "Multi-language support", "Extensive educational resources"],
    cons: ["Higher spreads than some competitors", "No cryptocurrencies trading"],
    url: "/brokers/xm",
    categories: ["forex", "beginners", "mobile-trading", "intermediate", "day-trading", "swing-trading", "commodities", "asia", "education", "low-deposit", "customer-service"]
  },
  "IC Markets": {
    id: "ic-markets",
    name: "IC Markets",
    logo: "/images/brokers/ic-markets.png",
    rating: 4.9,
    minDeposit: "$200",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "cTrader"],
    regulation: ["ASIC", "CySEC", "FSA"],
    pros: ["Ultra-low spreads", "Fast execution speeds", "Wide range of trading instruments"],
    cons: ["Limited educational resources", "No fixed spreads option"],
    url: "/brokers/ic-markets",
    categories: ["forex", "low-cost", "cfd", "day-trading", "professional", "highest-rated", "australia"]
  },
  "Pepperstone": {
    id: "pepperstone",
    name: "Pepperstone",
    logo: "/images/brokers/pepperstone.png",
    rating: 4.8,
    minDeposit: "$200",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "cTrader"],
    regulation: ["FCA", "ASIC", "CySEC", "DFSA", "SCB"],
    pros: ["Competitive spreads", "Advanced trading tools", "Excellent customer support"],
    cons: ["Limited product range compared to some competitors", "No proprietary trading platform"],
    url: "/brokers/pepperstone",
    categories: ["forex", "low-cost", "intermediate", "day-trading", "professional", "highest-rated", "commodities", "australia"]
  },
  "OANDA": {
    id: "oanda",
    name: "OANDA",
    logo: "/images/brokers/oanda.png",
    rating: 4.6,
    minDeposit: "$0",
    spread: "From 1.2 pips",
    platforms: ["OANDA Trade", "MT4"],
    regulation: ["FCA", "ASIC", "CFTC", "NFA"],
    pros: ["No minimum deposit", "Fractional pip pricing", "Advanced charting"],
    cons: ["Higher spreads on standard account", "Limited cryptocurrency options"],
    url: "/brokers/oanda",
    categories: ["forex", "intermediate", "us", "canada"]
  },
  "Interactive Brokers": {
    id: "interactive-brokers",
    name: "Interactive Brokers",
    logo: "/images/brokers/interactive-brokers.png",
    rating: 4.8,
    minDeposit: "$0",
    spread: "From 0.2 pips",
    platforms: ["TWS", "IBKR Mobile"],
    regulation: ["SEC", "FINRA", "FCA", "IIROC"],
    pros: ["Low costs", "Global market access", "Advanced tools"],
    cons: ["Complex platform", "Not beginner-friendly"],
    url: "/brokers/interactive-brokers",
    categories: ["stocks", "options", "futures", "etf", "commodities", "international", "professional", "highest-rated", "secure", "research", "low-cost", "uk", "us", "europe", "canada"]
  },
  "Plus500": {
    id: "plus500",
    name: "Plus500",
    logo: "/images/brokers/plus500.png",
    rating: 4.4,
    minDeposit: "$100",
    spread: "Variable",
    platforms: ["Plus500 Platform"],
    regulation: ["FCA", "CySEC", "ASIC", "MAS"],
    pros: ["Simple platform", "No commission trading", "Wide range of CFDs"],
    cons: ["No MT4/MT5", "Limited research tools"],
    url: "/brokers/plus500",
    categories: ["forex", "beginners", "crypto", "stocks", "cfd", "mobile-trading", "uk", "europe", "singapore", "education"]
  },
  "Capital.com": {
    id: "capital-com",
    name: "Capital.com",
    logo: "/images/brokers/capital-com.png",
    rating: 4.5,
    minDeposit: "$20",
    spread: "From 0.6 pips",
    platforms: ["Capital.com Platform", "MT4"],
    regulation: ["FCA", "CySEC", "ASIC"],
    pros: ["AI-powered insights", "Low minimum deposit", "Educational resources"],
    cons: ["Limited advanced tools", "No MT5"],
    url: "/brokers/capital-com",
    categories: ["beginners", "crypto", "cfd", "mobile-trading", "low-deposit"]
  },
  "Saxo Bank": {
    id: "saxo-bank",
    name: "Saxo Bank",
    logo: "/images/brokers/saxo-bank.png",
    rating: 4.7,
    minDeposit: "$10,000",
    spread: "From 0.4 pips",
    platforms: ["SaxoTraderGO", "SaxoTraderPRO"],
    regulation: ["DFSA", "FCA", "FINMA"],
    pros: ["Premium research", "Global market access", "Professional tools"],
    cons: ["High minimum deposit", "Complex pricing"],
    url: "/brokers/saxo-bank",
    categories: ["stocks", "options", "futures", "etf", "commodities", "international", "professional", "highest-rated", "secure", "research", "low-cost", "uk", "europe"]
  },
  "XTB": {
    id: "xtb",
    name: "XTB",
    logo: "/images/brokers/xtb.png",
    rating: 4.6,
    minDeposit: "$0",
    spread: "From 0.8 pips",
    platforms: ["xStation 5", "MT4"],
    regulation: ["FCA", "CySEC", "KNF"],
    pros: ["No minimum deposit", "Excellent education", "User-friendly platform"],
    cons: ["Limited cryptocurrency options", "Withdrawal fees for inactive accounts"],
    url: "/brokers/xtb",
    categories: ["stocks", "options", "futures", "etf", "crypto", "low-cost", "professional", "secure", "research", "uk", "europe"]
  },

  // Dedicated Cryptocurrency Exchanges
  "Binance": {
    id: "binance",
    name: "Binance",
    logo: "/images/brokers/binance.png",
    rating: 4.8,
    minDeposit: "$10",
    spread: "0.1% trading fee",
    platforms: ["Binance App", "Binance Pro", "Web Platform"],
    regulation: ["Various Global Licenses"],
    pros: ["Largest crypto exchange", "Low trading fees", "Wide range of cryptocurrencies"],
    cons: ["Complex for beginners", "Regulatory uncertainties"],
    url: "/brokers/binance",
    categories: ["crypto", "professional", "low-cost", "mobile-trading"]
  },
  "Coinbase": {
    id: "coinbase",
    name: "Coinbase",
    logo: "/images/brokers/coinbase.png",
    rating: 4.5,
    minDeposit: "$2",
    spread: "0.5% spread",
    platforms: ["Coinbase App", "Coinbase Pro", "Web Platform"],
    regulation: ["CFTC", "FinCEN", "NYDFS"],
    pros: ["User-friendly", "Strong regulation", "Educational resources"],
    cons: ["Higher fees", "Limited advanced features"],
    url: "/brokers/coinbase",
    categories: ["crypto", "beginners", "mobile-trading", "secure", "education", "us"]
  },
  "Kraken": {
    id: "kraken",
    name: "Kraken",
    logo: "/images/brokers/kraken.png",
    rating: 4.6,
    minDeposit: "$10",
    spread: "0.16% trading fee",
    platforms: ["Kraken App", "Kraken Pro", "Web Platform"],
    regulation: ["FinCEN", "FCA", "JFSA"],
    pros: ["Advanced trading features", "Strong security", "Wide range of cryptocurrencies"],
    cons: ["Complex interface", "Limited customer support"],
    url: "/brokers/kraken",
    categories: ["crypto", "professional", "secure", "low-cost"]
  },

  "Gemini": {
    id: "gemini",
    name: "Gemini",
    logo: "/images/brokers/gemini.png",
    rating: 4.3,
    minDeposit: "$0",
    spread: "0.35% trading fee",
    platforms: ["Gemini App", "ActiveTrader", "Web Platform"],
    regulation: ["NYDFS", "FinCEN"],
    pros: ["Strong regulation", "Insurance coverage", "User-friendly"],
    cons: ["Limited cryptocurrency selection", "Higher fees"],
    url: "/brokers/gemini",
    categories: ["crypto", "secure", "beginners", "us"]
  },
  "BlackBull Markets": {
    id: "blackbull-markets",
    name: "BlackBull Markets",
    logo: "https://logo.clearbit.com/blackbull.com",
    rating: 4.8,
    minDeposit: "$200",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "BlackBull CopyTrader", "TradingView"],
    regulation: ["FMA", "FSA", "ASIC", "FCA"],
    pros: ["Award-winning broker", "True ECN execution", "Excellent customer service", "26,000+ instruments"],
    cons: ["Higher minimum deposit", "Limited educational resources", "New Zealand time zone support"],
    url: "/broker/blackbull-markets",
    categories: ["forex", "cfd", "stocks", "crypto", "commodities", "professional", "highest-rated", "secure", "low-cost", "international"]
  }
};

// Category to broker mapping using real broker data
export const CATEGORY_BROKER_MAPPING = {
  // Asset types
  forex: ["eToro", "XM", "IC Markets", "Pepperstone", "BlackBull Markets", "OANDA", "Interactive Brokers"],
  crypto: ["Binance", "Coinbase", "Kraken", "BlackBull Markets", "Gemini", "eToro", "Plus500"],
  stocks: ["Interactive Brokers", "Saxo Bank", "XTB", "BlackBull Markets", "eToro", "Plus500"],
  cfd: ["Plus500", "Capital.com", "XTB", "BlackBull Markets", "eToro", "IC Markets"],
  options: ["Interactive Brokers", "Saxo Bank", "XTB"],
  futures: ["Interactive Brokers", "Saxo Bank", "XTB"],
  etf: ["Interactive Brokers", "Saxo Bank", "XTB", "eToro"],
  commodities: ["Interactive Brokers", "Saxo Bank", "BlackBull Markets", "XM", "Pepperstone"],

  // Experience levels
  beginners: ["eToro", "Plus500", "Capital.com", "XM", "Coinbase"],
  intermediate: ["XM", "Pepperstone", "BlackBull Markets", "OANDA"],
  professional: ["Interactive Brokers", "Saxo Bank", "IC Markets", "Pepperstone", "BlackBull Markets", "XTB", "Binance"],

  // Trading styles
  "day-trading": ["IC Markets", "Pepperstone", "BlackBull Markets", "XM"],
  "swing-trading": ["eToro", "XM", "Interactive Brokers", "Saxo Bank"],
  "mobile-trading": ["eToro", "Plus500", "Capital.com", "XM", "Coinbase", "Binance"],

  // Features
  "low-cost": ["IC Markets", "Pepperstone", "BlackBull Markets", "XTB", "Interactive Brokers", "Saxo Bank"],
  "highest-rated": ["BlackBull Markets", "Interactive Brokers", "Saxo Bank", "IC Markets", "Pepperstone", "eToro"],
  secure: ["Interactive Brokers", "Saxo Bank", "BlackBull Markets", "XTB", "eToro", "Coinbase", "Kraken"],
  research: ["Interactive Brokers", "Saxo Bank", "XTB", "eToro", "XM"],
  education: ["eToro", "XM", "Plus500", "Coinbase"],
  "low-deposit": ["XM", "Capital.com", "Coinbase"],
  "customer-service": ["XM", "Interactive Brokers", "Saxo Bank"],

  // Regions
  uk: ["Interactive Brokers", "Saxo Bank", "XTB", "eToro", "Plus500"],
  us: ["Interactive Brokers", "XTB", "eToro", "Plus500", "Saxo Bank", "OANDA", "Coinbase", "Gemini"],
  europe: ["Saxo Bank", "XTB", "eToro", "Plus500", "Interactive Brokers"],
  australia: ["Pepperstone", "IC Markets", "BlackBull Markets", "Interactive Brokers", "Saxo Bank"],
  asia: ["XM", "Saxo Bank", "Interactive Brokers", "Binance"],
  canada: ["Interactive Brokers", "Saxo Bank", "XTB", "eToro", "Plus500", "OANDA"],
  singapore: ["Saxo Bank", "Interactive Brokers", "XM", "Plus500"],
  international: ["BlackBull Markets", "Interactive Brokers", "Saxo Bank", "XM", "Pepperstone", "Binance"]
};

/**
 * Get top 3 broker names for category preview
 */
export function getTopBrokerNamesForCategory(categoryTitle: string): string[] {
  // Extract category key from title
  const categoryKey = categoryTitle.toLowerCase()
    .replace('best ', '')
    .replace(' brokers', '')
    .replace(' 2025', '')
    .replace('brokers for ', '')
    .replace('brokers in the ', '')
    .replace('brokers in ', '')
    .replace(' platforms', '')
    .replace(' trading', '')
    .replace(' accounts', '')
    .trim();

  // Try direct mapping first
  if (CATEGORY_BROKER_MAPPING[categoryKey as keyof typeof CATEGORY_BROKER_MAPPING]) {
    const result = CATEGORY_BROKER_MAPPING[categoryKey as keyof typeof CATEGORY_BROKER_MAPPING].slice(0, 3);
    return result;
  }

  // Try alternative mappings
  const alternativeKeys: { [key: string]: keyof typeof CATEGORY_BROKER_MAPPING } = {
    'mobile trading platforms': 'mobile-trading',
    'low-cost': 'low-cost',
    'day traders': 'day-trading',
    'swing traders': 'swing-trading',
    'professionals': 'professional',
    'highest rated': 'highest-rated',
    'most secure': 'secure',
    'customer service': 'customer-service',
    'low deposit': 'low-deposit',
    'penny stock': 'stocks'
  };

  for (const [altKey, mappedKey] of Object.entries(alternativeKeys)) {
    if (categoryKey.includes(altKey) || altKey.includes(categoryKey)) {
      const result = CATEGORY_BROKER_MAPPING[mappedKey].slice(0, 3);
      return result;
    }
  }

  // Final fallback: return top forex brokers
  return CATEGORY_BROKER_MAPPING.forex.slice(0, 3);
}

/**
 * Get top 3 broker objects for category preview (with logos and full data)
 */
export function getTopBrokerObjectsForCategory(categoryTitle: string): BrokerData[] {
  const brokerNames = getTopBrokerNamesForCategory(categoryTitle);

  return brokerNames
    .map(name => BROKER_DATABASE[name as keyof typeof BROKER_DATABASE])
    .filter(Boolean) // Remove any undefined brokers
    .slice(0, 3); // Ensure we only return 3 brokers
}

/**
 * Get all brokers for a specific category (for individual category pages)
 */
export function getBrokersForCategory(categorySlug: string): BrokerData[] {
  // Convert category slug to title format for our function
  const categoryTitle = `Best ${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Brokers`;
  const brokerNames = getTopBrokerNamesForCategory(categoryTitle);

  return brokerNames
    .map(name => BROKER_DATABASE[name as keyof typeof BROKER_DATABASE])
    .filter(Boolean); // Remove any undefined brokers
}

/**
 * Get all broker data for a category (for individual category pages)
 */
export async function getCategoryBrokerData(categorySlug: string) {
  try {
    // Try to get from database first
    const dbBrokers = await db.brokers.getAll();

    // If database has data, use it; otherwise use static data
    if (dbBrokers && dbBrokers.length > 0) {
      // Filter database brokers by category if possible
      // For now, return static data as it's more reliable
    }

    // Use static broker data
    return getBrokersForCategory(categorySlug);
  } catch (error) {
    console.error('Error fetching category broker data:', error);
    // Fallback to static data
    return getBrokersForCategory(categorySlug);
  }
}
