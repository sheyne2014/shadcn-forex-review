import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeftRight,
  Check,
  ShieldCheck,
  Zap,
  Award,
  ChevronRight,
  Star,
  BarChart3,
  Search,
  Clock,
  Calculator,
  ThumbsUp,
  Users,
  Briefcase,
  Sparkles,
  Trophy,
  BadgeCheck,
  Lightbulb,
  Rocket,
  DollarSign
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { HeroAnimation } from "@/components/HeroAnimation";
import { Badge } from "@/components/ui/badge";
import { CallToAction } from "@/components/CallToAction";
import { FAQAccordion } from "@/components/FAQAccordion";
import { StatsCounter } from "@/components/StatsCounter";
import { BrokerComparisonTable } from "@/components/BrokerComparisonTable";
import { db } from "@/lib/database";
import { BrokerData } from "@/components/BrokerComparisonTable";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { BrokerComparisonCard } from "@/components/BrokerComparisonCard";
import { ClientSideIcon } from "@/components/ClientSideIcon";
import { BrokerCardClient } from "@/components/BrokerCardClient";

// Extended broker type that includes all the fields we need
interface ExtendedBroker {
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
}

export const metadata: Metadata = {
  title: "Trading Broker Reviews & Analysis 2025 | Forex, Stocks, Crypto & More | May 2025 Update",
  description: "Find the perfect trading broker for stocks, forex, crypto, options, CFDs and ETFs. Compare features, read expert reviews, and discover personalized broker recommendations. Updated May 2025.",
};

// Feature definitions for broker comparison
const brokerFeatures = [
  { name: "Min Deposit", tooltip: "Minimum deposit required to open an account" },
  { name: "Trading Fee", tooltip: "Fee charged per trade" },
  { name: "Supported Assets", tooltip: "Asset classes available for trading" },
  { name: "Trading Platforms", tooltip: "Available trading platforms" }
];

// Get broker categories with actual brokers
async function getBrokerCategories() {
  // Get all categories
  const categories = await db.categories.getAll();

  // Create broker category map
  const categoryMap = [
    {
      title: "Best for Beginners",
      brokers: [] as {name: string, rating: number, feature: string}[],
      icon: "Users",
      href: "/best-brokers/beginners"
    },
    {
      title: "Best Low-Cost Brokers",
      brokers: [] as {name: string, rating: number, feature: string}[],
      icon: "ThumbsUp",
      href: "/best-brokers/low-cost"
    },
    {
      title: "Best for Advanced Traders",
      brokers: [] as {name: string, rating: number, feature: string}[],
      icon: "Award",
      href: "/best-brokers/advanced"
    },
    {
      title: "Best MT4/MT5 Brokers",
      brokers: [] as {name: string, rating: number, feature: string}[],
      icon: "Briefcase",
      href: "/best-brokers/forex"
    }
  ];

  // Define features based on category
  const features = {
    "Best for Beginners": ["Easy to Use", "Educational Resources", "Low Min Deposit"],
    "Best Low-Cost Brokers": ["Low Fees", "No Commission", "Tight Spreads"],
    "Best for Advanced Traders": ["Advanced Tools", "API Access", "Multi-Asset"],
    "Best MT4/MT5 Brokers": ["MT4/MT5", "EAs Support", "Custom Indicators"]
  };

  // Default mock brokers for each category in case database returns no results
  const mockBrokers = {
    "Best for Beginners": [
      { name: "eToro", rating: 4.7 },
      { name: "Plus500", rating: 4.5 },
      { name: "Capital.com", rating: 4.6 }
    ],
    "Best Low-Cost Brokers": [
      { name: "XTB", rating: 4.8 },
      { name: "Interactive Brokers", rating: 4.9 },
      { name: "DEGIRO", rating: 4.6 }
    ],
    "Best for Advanced Traders": [
      { name: "Interactive Brokers", rating: 4.9 },
      { name: "Saxo Bank", rating: 4.7 },
      { name: "TD Ameritrade", rating: 4.8 }
    ],
    "Best MT4/MT5 Brokers": [
      { name: "IC Markets", rating: 4.8 },
      { name: "XM", rating: 4.6 },
      { name: "Pepperstone", rating: 4.7 }
    ]
  };

  // For each category, get top 3 brokers
  for (let i = 0; i < categoryMap.length; i++) {
    const categoryTitle = categoryMap[i].title;
    const category = categories.find(c =>
      c.name.toLowerCase().includes(categoryTitle.toLowerCase().replace("best ", "").replace(" brokers", ""))
    );

    const categoryFeatures = features[categoryTitle as keyof typeof features] || [];

    if (category) {
      const brokers = await db.brokers.getByCategory(category.id);

      // If we got brokers from database, use them
      if (brokers && brokers.length > 0) {
        // Get top 3 brokers with their ratings and features
        categoryMap[i].brokers = brokers.slice(0, 3).map((broker, idx) => {
          return {
            name: broker.name,
            rating: broker.rating || 4.0 + Math.random() * 0.9,
            feature: categoryFeatures[idx % categoryFeatures.length]
          };
        });
      } else {
        // Use mock data if database returned no brokers
        categoryMap[i].brokers = useMockBrokers(categoryTitle, categoryFeatures);
      }
    } else {
      // Category not found in database, use mock data
      categoryMap[i].brokers = useMockBrokers(categoryTitle, categoryFeatures);
    }
  }

  return categoryMap;

  // Helper function to get mock brokers with features
  function useMockBrokers(categoryTitle: string, categoryFeatures: string[]) {
    const mockBrokersForCategory = mockBrokers[categoryTitle as keyof typeof mockBrokers] || [];
    return mockBrokersForCategory.map((broker, idx) => {
      return {
        name: broker.name,
        rating: broker.rating,
        feature: categoryFeatures[idx % categoryFeatures.length]
      };
    });
  }
}

// Get specified brokers with updated data
async function getSpecifiedBrokers() {
  const allBrokers = await db.brokers.getAll();

  // List of broker names we want to display
  const targetBrokerNames = [
    "Interactive Brokers",
    "XTB",
    "OANDA",
    "Tradestation Global",
    "Swissquote",
    "StarTrader",
    "AXI"
  ];

  // Filter brokers by name
  let filteredBrokers = allBrokers.filter(broker =>
    targetBrokerNames.some(name =>
      broker.name.toLowerCase().includes(name.toLowerCase())
    )
  ).map(broker => broker as unknown as ExtendedBroker);

  // Default data for brokers that might not be in the database
  const defaultBrokerData: Record<string, Partial<ExtendedBroker>> = {
    "Interactive Brokers": {
      id: "interactive-brokers",
      name: "Interactive Brokers",
      logo_url: "https://placehold.co/200x200?text=IBKR",
      min_deposit: 0,
      trading_fee: 0.005,
      supported_assets: ["Stocks", "ETFs", "Forex", "Futures", "Options", "Bonds", "Crypto"],
      trading_platforms: "IBKR Trader Workstation, IBKR Mobile",
      rating: 4.8,
      regulations: "FCA, SEC, FINRA, IIROC, ASIC",
      country: "United States"
    },
    "XTB": {
      id: "xtb",
      name: "XTB",
      logo_url: "https://placehold.co/200x200?text=XTB",
      min_deposit: 250,
      trading_fee: 0,
      supported_assets: ["Forex", "Stocks", "ETFs", "Indices", "Commodities", "Crypto"],
      trading_platforms: "xStation 5, MT4, Mobile Apps",
      rating: 4.7,
      regulations: "FCA, KNF, CNMV, IFSC",
      country: "Poland"
    },
    "OANDA": {
      id: "oanda",
      name: "OANDA",
      logo_url: "https://placehold.co/200x200?text=OANDA",
      min_deposit: 0,
      trading_fee: 0,
      supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
      trading_platforms: "OANDA Trade, MT4, MT5, TradingView",
      rating: 4.7,
      regulations: "FCA, ASIC, CFTC, MAS",
      country: "United States"
    },
    "Tradestation Global": {
      id: "tradestation-global",
      name: "Tradestation Global",
      logo_url: "https://placehold.co/200x200?text=TS",
      min_deposit: 1000,
      trading_fee: 0.01,
      supported_assets: ["Stocks", "Options", "Futures", "Crypto", "ETFs"],
      trading_platforms: "TradeStation Desktop, Web, Mobile",
      rating: 4.6,
      regulations: "SEC, FINRA, FCA",
      country: "United States"
    },
    "Swissquote": {
      id: "swissquote",
      name: "Swissquote",
      logo_url: "https://placehold.co/200x200?text=SQ",
      min_deposit: 1000,
      trading_fee: 0.1,
      supported_assets: ["Forex", "Stocks", "Options", "ETFs", "Funds", "Bonds"],
      trading_platforms: "Advanced Trader, MT4, MT5",
      rating: 4.5,
      regulations: "FINMA, FCA, DFSA, MAS",
      country: "Switzerland"
    },
    "StarTrader": {
      id: "startrader",
      name: "StarTrader",
      logo_url: "https://placehold.co/200x200?text=Star",
      min_deposit: 200,
      trading_fee: 0,
      supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "Crypto"],
      trading_platforms: "StarTrader Pro, MT4, MT5, Mobile App",
      rating: 4.6,
      regulations: "ASIC, FCA, CySEC",
      country: "Australia"
    },
    "AXI": {
      id: "axi",
      name: "AXI",
      logo_url: "https://placehold.co/200x200?text=AXI",
      min_deposit: 50,
      trading_fee: 0,
      supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
      trading_platforms: "MT4, WebTrader, Mobile App",
      rating: 4.4,
      regulations: "ASIC, FCA, DFSA",
      country: "Australia"
    }
  };

  // Ensure we display all the target brokers in the correct order
  const brokerDataList: BrokerData[] = [];

  for (const brokerName of targetBrokerNames) {
    // Find actual broker from database
    let broker = filteredBrokers.find(b =>
      b.name.toLowerCase().includes(brokerName.toLowerCase())
    );

    // If not found, use default data
    if (!broker) {
      const defaultData = defaultBrokerData[brokerName];
      broker = {
        id: defaultData.id || `default-${brokerName.toLowerCase().replace(/\s+/g, '-')}`,
        ...defaultData
      } as ExtendedBroker;
    }

    // Format supported assets
    let supportedAssetsDisplay = 'N/A';
    if (broker.supported_assets) {
      if (Array.isArray(broker.supported_assets)) {
        supportedAssetsDisplay = broker.supported_assets.slice(0, 3).join(', ');
        if (broker.supported_assets.length > 3) {
          supportedAssetsDisplay += ` +${broker.supported_assets.length - 3} more`;
        }
      } else if (typeof broker.supported_assets === 'string') {
        supportedAssetsDisplay = broker.supported_assets;
      }
    }

    // Add to broker list
    brokerDataList.push({
      id: broker.id,
      name: broker.name,
      logo: broker.logo_url || undefined,
      rating: broker.rating || 4.5,
      badge: broker.badge || getBrokerBadge(broker),
      link: broker.website_url || `#${broker.id}`,
      features: {
        min_deposit: broker.min_deposit ? `$${broker.min_deposit}` : 'N/A',
        trading_fee: broker.trading_fee !== undefined && broker.trading_fee !== null ?
          broker.trading_fee === 0 ? 'Commission-free' : `${broker.trading_fee}%` : 'N/A',
        supported_assets: supportedAssetsDisplay,
        trading_platforms: broker.trading_platforms || 'N/A'
      },
    });
  }

  return brokerDataList;
}

function getBrokerBadge(broker: ExtendedBroker): string {
  // Determine badge based on broker characteristics
  if (broker.name.includes("Interactive Brokers")) {
    return "Best for Advanced Traders";
  } else if (broker.name.includes("XTB")) {
    return "Best for Stocks & Forex";
  } else if (broker.name.includes("OANDA")) {
    return "Best for Forex Trading";
  } else if (broker.name.includes("Tradestation")) {
    return "Best Trading Technology";
  } else if (broker.name.includes("Swissquote")) {
    return "Best for Wealth Management";
  } else if (broker.name.includes("StarTrader")) {
    return "Best for Beginners";
  } else if (broker.name.includes("AXI")) {
    return "Best for Low Deposits";
  } else {
    return "Top-Rated Broker";
  }
}

export default async function LandingPage() {
  // Get real broker data
  let topRatedBrokers = [];
  let brokerCategories = [];

  try {
    // Try to fetch real data from database
    topRatedBrokers = await getSpecifiedBrokers();
    brokerCategories = await getBrokerCategories();
  } catch (error) {
    console.error('Error fetching broker data:', error);

    // Fallback mock data for broker categories if database fails
    brokerCategories = [
      {
        title: "Best for Beginners",
        brokers: [
          { name: "eToro", rating: 4.7, feature: "Easy to Use" },
          { name: "Plus500", rating: 4.5, feature: "Educational Resources" },
          { name: "Capital.com", rating: 4.6, feature: "Low Min Deposit" }
        ],
        icon: "Users",
        href: "/best-brokers/beginners"
      },
      {
        title: "Best Low-Cost Brokers",
        brokers: [
          { name: "XTB", rating: 4.8, feature: "Low Fees" },
          { name: "Interactive Brokers", rating: 4.9, feature: "No Commission" },
          { name: "DEGIRO", rating: 4.6, feature: "Tight Spreads" }
        ],
        icon: "ThumbsUp",
        href: "/best-brokers/low-cost"
      },
      {
        title: "Best for Advanced Traders",
        brokers: [
          { name: "Interactive Brokers", rating: 4.9, feature: "Advanced Tools" },
          { name: "Saxo Bank", rating: 4.7, feature: "API Access" },
          { name: "TD Ameritrade", rating: 4.8, feature: "Multi-Asset" }
        ],
        icon: "Award",
        href: "/best-brokers/advanced"
      },
      {
        title: "Best MT4/MT5 Brokers",
        brokers: [
          { name: "IC Markets", rating: 4.8, feature: "MT4/MT5" },
          { name: "XM", rating: 4.6, feature: "EAs Support" },
          { name: "Pepperstone", rating: 4.7, feature: "Custom Indicators" }
        ],
        icon: "Briefcase",
        href: "/best-brokers/forex"
      }
    ];

    // Fallback mock data for top rated brokers
    topRatedBrokers = [
      {
        id: "interactive-brokers",
        name: "Interactive Brokers",
        logo: "https://placehold.co/200x200?text=IBKR",
        rating: 4.8,
        badge: "Best for Advanced Traders",
        link: "/broker/interactive-brokers",
        features: {
          min_deposit: "$0",
          trading_fee: "0.005%",
          supported_assets: "Stocks, ETFs, Forex +7 more",
          trading_platforms: "IBKR Trader Workstation, IBKR Mobile"
        }
      },
      {
        id: "xtb",
        name: "XTB",
        logo: "https://placehold.co/200x200?text=XTB",
        rating: 4.7,
        badge: "Best for Stocks & Forex",
        link: "/broker/xtb",
        features: {
          min_deposit: "$250",
          trading_fee: "Commission-free",
          supported_assets: "Forex, Stocks, ETFs +3 more",
          trading_platforms: "xStation 5, MT4, Mobile Apps"
        }
      },
      {
        id: "oanda",
        name: "OANDA",
        logo: "https://placehold.co/200x200?text=OANDA",
        rating: 4.7,
        badge: "Best for Forex Trading",
        link: "/broker/oanda",
        features: {
          min_deposit: "$0",
          trading_fee: "Commission-free",
          supported_assets: "Forex, Indices, Commodities, Crypto",
          trading_platforms: "OANDA Trade, MT4, MT5, TradingView"
        }
      }
    ];
  }

  return (
    <div className="space-y-16 py-12">
      {/* Hero section - Enhanced with modern design elements */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>

            <Badge className="px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 transition-colors">
              <ClientSideIcon name="Sparkles" className="h-3.5 w-3.5 mr-1.5" /> Trusted by traders worldwide
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight relative">
              Find the <span className="text-primary relative">
                Perfect Broker
                <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/20 -z-10 rounded-full"></span>
              </span> for Your Trading Journey
            </h1>

            <p className="text-xl text-muted-foreground">
              Expert reviews, side-by-side comparisons, and personalized recommendations to help you make the right choice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="pulse-on-hover bg-primary hover:bg-primary/90 shadow-lg" asChild>
                <Link href="/tools/quiz">
                  <span className="flex items-center">
                    <ClientSideIcon name="Search" className="mr-2 h-4 w-4" /> Find My Broker <ClientSideIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="hover-glow" asChild>
                <Link href="/tools/compare">
                  <span className="flex items-center">
                    <ClientSideIcon name="ArrowLeftRight" className="mr-2 h-4 w-4" /> Compare Brokers
                  </span>
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-6">
              {[
                { icon: 'ShieldCheck', text: 'Only Regulated Brokers', color: 'text-green-500' },
                { icon: 'Star', text: 'Expert Reviews', color: 'text-amber-500' },
                { icon: 'Zap', text: 'Fast Comparison', color: 'text-blue-500' }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-muted/30 px-3 py-2 rounded-full">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${item.color} bg-white/90 dark:bg-black/30 shadow-sm`}>
                    <ClientSideIcon name={item.icon} className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[450px] rounded-xl overflow-hidden shadow-xl hidden lg:block hover-lift">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-10"></div>
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full px-4 py-2 shadow-lg z-20 flex items-center">
              <ClientSideIcon name="BarChart3" className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">Live Market Data</span>
            </div>
            <HeroAnimation className="h-full w-full" />
          </div>
        </div>
      </section>

      {/* Stats section - Enhanced with modern design elements */}
      <section className="py-12 bg-muted/20 rounded-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8">
            <Badge className="px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 transition-colors mb-4">
              <ClientSideIcon name="Users" className="h-3.5 w-3.5 mr-1.5 text-blue-500" /> Global Trading Community
            </Badge>
            <h2 className="text-3xl font-bold mb-3">Trusted By Traders Worldwide</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Join thousands of traders who rely on our expert analysis to make informed decisions
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50 rounded-xl"></div>
            <StatsCounter
              items={[
                {
                  value: 150,
                  label: 'Brokers Reviewed',
                  suffix: '+'
                },
                {
                  value: 50000,
                  label: 'Monthly Visitors',
                  suffix: '+'
                },
                {
                  value: 10000,
                  label: 'Broker Comparisons',
                  suffix: '+'
                },
                {
                  value: 99,
                  label: 'Customer Satisfaction',
                  suffix: '%'
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Top Brokers Section - Move up as key useful content */}
      <section className="py-12 bg-muted/10 rounded-xl">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top-Rated Trading Brokers</h2>
          <BrokerComparisonTable
            brokers={topRatedBrokers}
            features={brokerFeatures}
          />
          <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/brokers">
                View All Brokers
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/best-brokers">
                Browse Broker Categories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why choose us section - Enhanced with modern design elements */}
      <section className="py-14 bg-muted/20 rounded-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <Badge className="px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 transition-colors mb-4">
              <ClientSideIcon name="Trophy" className="h-3.5 w-3.5 mr-1.5 text-amber-500" /> Industry-Leading Analysis
            </Badge>
            <h2 className="text-3xl font-bold">Why Choose Our Platform</h2>
            <p className="text-muted-foreground text-lg">
              We provide comprehensive, unbiased broker reviews to help you make informed trading decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: "BadgeCheck",
                title: 'Comprehensive Reviews',
                description: 'Detailed analysis of trading platforms, fees, features, and user experience',
                color: 'from-blue-500/20 to-blue-600/20',
                iconColor: 'text-blue-500'
              },
              {
                icon: "ShieldCheck",
                title: 'Safety First',
                description: 'We only recommend regulated brokers with strong security measures',
                color: 'from-green-500/20 to-green-600/20',
                iconColor: 'text-green-500'
              },
              {
                icon: "Trophy",
                title: 'Expert Team',
                description: 'Our analysts have years of experience in the trading industry',
                color: 'from-amber-500/20 to-amber-600/20',
                iconColor: 'text-amber-500'
              },
              {
                icon: "Rocket",
                title: 'Up-to-Date Information',
                description: 'We regularly update our reviews to reflect the latest broker offerings',
                color: 'from-purple-500/20 to-purple-600/20',
                iconColor: 'text-purple-500'
              }
            ].map((feature) => (
              <Card
                key={feature.title}
                className="border-2 bg-card/50 h-full hover-lift card-hover hover:border-primary/30 relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <CardHeader className="relative z-10">
                  <div className={`h-16 w-16 rounded-2xl bg-white dark:bg-black/20 flex items-center justify-center mb-4 shadow-md ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    <ClientSideIcon name={feature.icon} className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Broker Categories Section - Key conversion section for finding specific brokers */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Brokers By Category</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find the perfect broker for your trading style and experience level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {brokerCategories && brokerCategories.length > 0 ? brokerCategories.map((category, index) => {
              // Convert icon to string instead of React component
              const iconName = category.icon;

              return (
                <Card key={index} className="hover:shadow-lg transition-all border-2 overflow-hidden group cursor-pointer hover:border-primary/50">
                  <Link href={category.href || "/best-brokers"} className="block h-full">
                    <CardHeader className="pb-2 bg-muted/20 group-hover:bg-muted/40 transition-colors border-b">
                      <CardTitle className="flex items-center text-lg group-hover:text-primary transition-colors">
                        <ClientSideIcon name={iconName} className="mr-2 h-5 w-5 text-primary" />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 pb-2">
                      <div className="mb-3">
                        <h3 className="text-sm font-medium text-muted-foreground">Top Recommended Brokers:</h3>
                      </div>
                      {category.brokers && category.brokers.length > 0 ? (
                        <div className="space-y-3">
                          {category.brokers.map((broker, idx) => (
                            <BrokerCardClient
                              key={idx}
                              broker={broker}
                              idx={idx}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">Loading broker information...</p>
                      )}
                    </CardContent>
                    <CardFooter className="border-t bg-muted/10 group-hover:bg-muted/30 transition-colors pt-3 pb-3">
                      <div className="flex justify-between items-center w-full text-sm font-medium text-primary">
                        View All {category.brokers && category.brokers.length > 0 ? `(${category.brokers.length}+)` : ""} <ClientSideIcon name="ChevronRight" className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
              );
            }) : (
              // Fallback skeleton loading cards
              Array(4).fill(0).map((_, i) => (
                <Card key={i} className="hover:shadow-lg transition-all border-2 overflow-hidden">
                  <CardHeader className="pb-2 bg-muted/20">
                    <div className="h-6 w-32 bg-muted animate-pulse rounded mb-2"></div>
                  </CardHeader>
                  <CardContent className="pt-4 pb-2">
                    <div className="space-y-3">
                      {Array(3).fill(0).map((_, j) => (
                        <div key={j} className="p-2 rounded-md bg-muted/30">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-muted animate-pulse mr-3"></div>
                            <div className="flex-1">
                              <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                              <div className="h-2 w-16 bg-muted animate-pulse rounded mt-2"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/10 pt-3 pb-3">
                    <div className="h-4 w-16 bg-muted animate-pulse rounded"></div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="default" className="px-8 py-6 hover:bg-primary/90 hover:scale-105 transition-all">
              <Link href="/best-brokers">
                View All Broker Categories <ClientSideIcon name="ArrowRight" className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trading tools section - Enhanced with modern icons and hover effects */}
      <section className="py-12 bg-muted/10 rounded-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <Badge className="px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 transition-colors mb-4">
              <ClientSideIcon name="Lightbulb" className="h-3.5 w-3.5 mr-1.5 text-yellow-500" /> Powerful Trading Resources
            </Badge>
            <h2 className="text-3xl font-bold">Essential Trading Tools</h2>
            <p className="text-muted-foreground text-lg">Everything you need to make smarter trading decisions</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Broker Comparison Tool',
                description: 'Compare multiple brokers side by side to find the best match',
                link: '/tools/compare',
                icon: "ArrowLeftRight",
                color: 'text-blue-500',
                bgColor: 'bg-blue-500/10'
              },
              {
                title: 'Trading Calculator',
                description: 'Calculate pip values, margin requirements, and potential profits',
                link: '/tools/calculator',
                icon: "Calculator",
                color: 'text-green-500',
                bgColor: 'bg-green-500/10'
              },
              {
                title: 'Broker Finder Quiz',
                description: 'Get personalized broker recommendations based on your needs',
                link: '/tools/quiz',
                icon: "Search",
                color: 'text-purple-500',
                bgColor: 'bg-purple-500/10'
              },
              {
                title: 'Forex Converter',
                description: 'Real-time currency conversion for major and exotic pairs',
                link: '/tools/converter',
                icon: "DollarSign",
                color: 'text-amber-500',
                bgColor: 'bg-amber-500/10'
              },
              {
                title: 'Scam Broker Check',
                description: 'Verify if a broker is legitimate or potentially fraudulent',
                link: '/tools/scam-check',
                icon: "ShieldCheck",
                color: 'text-red-500',
                bgColor: 'bg-red-500/10'
              },
              {
                title: 'Trading Guides',
                description: 'Educational resources for beginners and advanced traders',
                link: '/blog/guides',
                icon: "Lightbulb",
                color: 'text-cyan-500',
                bgColor: 'bg-cyan-500/10'
              }
            ].map((tool) => (
              <Link key={tool.title} href={tool.link} className="block h-full">
                <Card className="hover-lift card-hover border-2 h-full hover:border-primary/30 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10 flex flex-row items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl ${tool.bgColor} flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <ClientSideIcon name={tool.icon} className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-muted-foreground">{tool.description}</p>
                  </CardContent>
                  <CardFooter className="relative z-10">
                    <div className="w-full text-center flex justify-between items-center text-sm font-medium text-primary">
                      <span>Access Tool</span>
                      <span className="bg-primary/10 rounded-full p-1 group-hover:bg-primary/20 transition-colors group-hover:translate-x-1 duration-300">
                        <ClientSideIcon name="ArrowRight" className="h-4 w-4" />
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Comparisons Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Popular Broker Comparisons</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how top trading brokers stack up against each other across various markets
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {/* Use the new BrokerComparisonCard component with different broker combinations */}
            <BrokerComparisonCard
              broker1={{ id: "interactive-brokers", name: "Interactive Brokers" }}
              broker2={{ id: "saxo-bank", name: "Saxo Bank" }}
              category="Stocks"
              views="4.8K"
            />

            <BrokerComparisonCard
              broker1={{ id: "oanda", name: "OANDA" }}
              broker2={{ id: "pepperstone", name: "Pepperstone" }}
              category="Forex"
              views="3.5K"
            />

            <BrokerComparisonCard
              broker1={{ id: "xm", name: "XM" }}
              broker2={{ id: "ic-markets", name: "IC Markets" }}
              category="Crypto"
              views="3.2K"
            />

            <BrokerComparisonCard
              broker1={{ id: "xtb", name: "XTB" }}
              broker2={{ id: "interactive-brokers", name: "Interactive Brokers" }}
              category="Options"
              views="2.7K"
            />

            <BrokerComparisonCard
              broker1={{ id: "pepperstone", name: "Pepperstone" }}
              broker2={{ id: "axi", name: "AXI" }}
              category="CFDs"
              views="2.5K"
            />

            <BrokerComparisonCard
              broker1={{ id: "saxo-bank", name: "Saxo Bank" }}
              broker2={{ id: "swissquote", name: "Swissquote" }}
              category="ETFs"
              views="2.3K"
            />

            <BrokerComparisonCard
              broker1={{ id: "ic-markets", name: "IC Markets" }}
              broker2={{ id: "startrader", name: "StarTrader" }}
              category="Indices"
              views="2.1K"
            />

            <BrokerComparisonCard
              broker1={{ id: "interactive-brokers", name: "Interactive Brokers" }}
              broker2={{ id: "oanda", name: "OANDA" }}
              category="Futures"
              views="1.9K"
            />

            <BrokerComparisonCard
              broker1={{ id: "xm", name: "XM" }}
              broker2={{ id: "xtb", name: "XTB" }}
              category="Commodities"
              views="1.7K"
            />

            <BrokerComparisonCard
              broker1={{ id: "swissquote", name: "Swissquote" }}
              broker2={{ id: "startrader", name: "StarTrader" }}
              category="Bonds"
              views="1.5K"
            />
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/compare">
                View All Broker Comparisons
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ROKU AI section */}
      <section className="py-14 bg-muted/30 rounded-lg">
        <div className="container mx-auto">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 md:grid-cols-2 md:gap-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Get Answers to Your Trading Questions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Introducing ROKU AI, your personal forex trading assistant. Ask questions about brokers, trading strategies, or market analysis to get instant, accurate answers.
              </p>
              <ul className="mt-6 grid gap-2">
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500/20 p-1">
                    <ClientSideIcon name="Check" className="h-4 w-4 text-green-500" />
                  </div>
                  <span>Compare broker features and fees</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500/20 p-1">
                    <ClientSideIcon name="Check" className="h-4 w-4 text-green-500" />
                  </div>
                  <span>Learn trading strategies and techniques</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500/20 p-1">
                    <ClientSideIcon name="Check" className="h-4 w-4 text-green-500" />
                  </div>
                  <span>Get insights on market conditions</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Try ROKU AI by clicking the chat icon in the bottom right corner of any page!
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[350px] w-full max-w-[300px] rounded-lg border bg-background p-4 shadow-md">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border bg-background px-4 py-1 text-sm font-medium">
                  ROKU AI Demo
                </div>
                <div className="flex h-full flex-col">
                  <div className="flex-1 space-y-4 overflow-auto p-1">
                    <div className="max-w-[75%] rounded-lg bg-muted p-3 text-sm">
                      Hello! I'm ROKU AI. How can I help you today?
                    </div>
                    <div className="ml-auto max-w-[75%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                      What are the best forex brokers with low spreads?
                    </div>
                    <div className="max-w-[75%] rounded-lg bg-muted p-3 text-sm">
                      Based on our analysis, the top forex brokers with low spreads include:
                      <ul className="mt-2 list-disc pl-4">
                        <li>IC Markets</li>
                        <li>Pepperstone</li>
                        <li>FxPro</li>
                      </ul>
                      Would you like more details about any of these brokers?
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-center text-sm text-muted-foreground">
                      Ask ROKU AI about brokers, trading strategies, and more!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 bg-muted/20 rounded-xl">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>

          <TestimonialsCarousel
            testimonials={[
              {
                content: "BrokerAnalysis helped me avoid a scam broker and find a legitimate one with great trading conditions.",
                name: "Michael T.",
                role: "Forex Trader, UK",
                rating: 5
              },
              {
                content: "The comparison tools made it simple to find a broker that matched my trading style and budget.",
                name: "Sarah L.",
                role: "Beginner Trader, Canada",
                rating: 4
              },
              {
                content: "I use their market news section daily to stay informed. Comprehensive and reliable information.",
                name: "David H.",
                role: "Professional Trader, Australia",
                rating: 5
              },
              {
                content: "Thanks to the detailed reviews, I switched from my old broker to Interactive Brokers and saved over 30% on trading fees.",
                name: "Jennifer K.",
                role: "Stock Investor, Germany",
                rating: 5
              },
              {
                content: "I was overwhelmed by all the broker options until I found this site. The broker quiz led me to OANDA which perfectly fits my forex trading needs.",
                name: "Robert M.",
                role: "Part-time Trader, USA",
                rating: 5
              },
              {
                content: "The side-by-side comparison between XTB and IC Markets helped me understand the fee structures and choose the right platform for my trading style.",
                name: "Akira Y.",
                role: "Day Trader, Japan",
                rating: 4
              },
              {
                content: "As a complete beginner, the educational content and broker recommendations for novices led me to StarTrader. Couldn't be happier with my choice!",
                name: "Emma P.",
                role: "Novice Investor, France",
                rating: 5
              },
              {
                content: "The regulation information saved me from depositing with an unregulated broker. Ended up with Pepperstone instead and have had a great experience.",
                name: "Carlos R.",
                role: "Forex & Crypto Trader, Brazil",
                rating: 5
              },
              {
                content: "I appreciate how transparent the reviews are about spreads and fees. This site has significantly improved my profitability by helping me find lower-cost trading.",
                name: "Sophia L.",
                role: "Scalp Trader, Singapore",
                rating: 4
              },
              {
                content: "The advanced trader section offers incredible insights. Their platform analysis and tool recommendations are always spot-on.",
                name: "Thomas B.",
                role: "Professional Trader, Switzerland",
                rating: 5
              },
              {
                content: "The extensive educational resources on algorithmic trading have been invaluable. I've learned so much about execution speed and automated strategies.",
                name: "Olivia W.",
                role: "Algo Trader, New Zealand",
                rating: 4
              },
              {
                content: "The security guides and deposit protection information were exactly what I needed for my larger investments. Really appreciate the focus on safety.",
                name: "Daniel F.",
                role: "Long-term Investor, UAE",
                rating: 5
              }
            ]}
          />
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-14 bg-muted/10 rounded-xl">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Get answers to common questions about trading and choosing the right broker
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FAQAccordion
              items={[
                {
                  question: "What should I look for in a broker?",
                  answer: "When choosing a broker, consider regulatory compliance, trading fees, available markets, platform usability, customer support, and educational resources."
                },
                {
                  question: "How do I know if a broker is safe?",
                  answer: "Look for regulation from respected authorities like FCA, ASIC, CySEC, or SEC. Also check for segregated client funds and investor protection schemes."
                }
              ]}
            />

            <FAQAccordion
              items={[
                {
                  question: "What's the difference between ECN and Market Maker brokers?",
                  answer: "ECN brokers connect traders directly to liquidity providers, while Market Makers take the opposite side of trades. ECN typically offers more transparency but may have higher fees."
                },
                {
                  question: "How much money do I need to start trading?",
                  answer: "This varies by broker. Some allow you to start with as little as $10, while others require minimum deposits of $1,000 or more."
                }
              ]}
            />
          </div>

          <div className="text-center pt-6">
            <Button variant="outline" asChild>
              <Link href="/faq">
                View all FAQs <ClientSideIcon name="ArrowRight" className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA section - Enhanced with modern design elements */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

            <CallToAction
              title="Ready to find your ideal broker?"
              description="Answer a few questions about your trading experience and goals, and we'll recommend the best brokers for you."
              primaryAction={{
                text: "Take the Broker Quiz",
                href: "/tools/quiz",
                icon: true
              }}
              secondaryAction={{
                text: "Compare All Brokers",
                href: "/tools/compare"
              }}
              variant="gradient"
              size="large"
              className="border-0 shadow-xl hover-lift pulse-on-hover"
              primaryButtonProps={{
                className: "bg-white text-primary hover:bg-white/90 dark:bg-black dark:text-primary dark:hover:bg-black/90"
              }}
              secondaryButtonProps={{
                className: "bg-white/10 hover:bg-white/20 text-white border-white/20 dark:bg-black/10 dark:hover:bg-black/20 dark:border-white/10"
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}