import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Commodities Brokers 2025 | Top-Rated Commodities Trading Platforms",
  description: "Compare the best commodities brokers with competitive fees, wide market access, and reliable platforms. Expert-reviewed and ranked for commodity traders.",
};

// Commodities broker data
export const topBrokers = [
  {
    id: 1,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.8,
    minDeposit: "$0",
    tradingFees: "Commission + Exchange fees",
    platforms: ["Trader Workstation", "Client Portal", "IBKR Mobile"],
    regulation: ["CFTC", "NFA", "FCA"],
    pros: [
      "Extensive commodity market access",
      "Competitive commission rates",
      "Advanced trading platform"
    ],
    cons: [
      "Complex platform for beginners",
      "Limited educational resources"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      lowFees: true,
      marketAccess: true,
      advancedTools: true,
      beginner: false
    }
  },
  {
    id: 2,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.7,
    minDeposit: "$0",
    tradingFees: "$2.25 per contract + Exchange fees",
    platforms: ["thinkorswim", "TD Ameritrade Web", "Mobile App"],
    regulation: ["CFTC", "NFA"],
    pros: [
      "Powerful thinkorswim platform",
      "Excellent educational resources",
      "Strong customer support"
    ],
    cons: [
      "Higher futures commissions than some specialists",
      "Limited direct physical commodity access"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      lowFees: false,
      marketAccess: true,
      advancedTools: true,
      beginner: true
    }
  },
  {
    id: 3,
    name: "IG",
    logo: "https://placehold.co/120x60/png?text=IG",
    rating: 4.7,
    minDeposit: "$250",
    tradingFees: "Spread-based",
    platforms: ["IG Platform", "MetaTrader 4", "ProRealTime"],
    regulation: ["FCA", "ASIC", "FSCA"],
    pros: [
      "Wide range of commodity CFDs",
      "Competitive spreads",
      "Strong educational content"
    ],
    cons: [
      "Higher minimum deposit",
      "Not available to US traders"
    ],
    url: "/reviews/ig",
    features: {
      lowFees: true,
      marketAccess: true,
      advancedTools: true,
      beginner: true
    }
  },
  {
    id: 4,
    name: "E*TRADE",
    logo: "https://placehold.co/120x60/png?text=ETRADE",
    rating: 4.6,
    minDeposit: "$0",
    tradingFees: "$1.50 per contract + Exchange fees",
    platforms: ["Power E*TRADE", "E*TRADE Pro", "Mobile App"],
    regulation: ["CFTC", "NFA"],
    pros: [
      "User-friendly platform",
      "Good educational resources",
      "Multiple account types available"
    ],
    cons: [
      "Limited commodity options beyond futures",
      "Higher commissions than specialized futures brokers"
    ],
    url: "/reviews/etrade",
    features: {
      lowFees: false,
      marketAccess: false,
      advancedTools: true,
      beginner: true
    }
  },
  {
    id: 5,
    name: "CMC Markets",
    logo: "https://placehold.co/120x60/png?text=CMC+Markets",
    rating: 4.6,
    minDeposit: "$0",
    tradingFees: "Spread-based",
    platforms: ["Next Generation", "Mobile App"],
    regulation: ["FCA", "ASIC", "BaFin"],
    pros: [
      "Wide range of commodity CFDs",
      "Low minimum deposit",
      "Competitive spreads"
    ],
    cons: [
      "CFD-only commodity trading",
      "Not available to US traders"
    ],
    url: "/reviews/cmc-markets",
    features: {
      lowFees: true,
      marketAccess: true,
      advancedTools: true,
      beginner: true
    }
  }
];

export default function BestCommoditiesBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Commodities Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top commodities brokers with extensive market access, advanced trading tools, and competitive pricing. All brokers thoroughly tested by our expert team.
        </p>
      </div>
      
      {/* Quick Navigation */}
      <div className="bg-muted/30 p-6 rounded-lg mb-12">
        <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="#comparison">
            <Button variant="outline" className="w-full justify-start">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Broker Comparison
            </Button>
          </Link>
          <Link href="#how-we-rank">
            <Button variant="outline" className="w-full justify-start">
              <Info className="mr-2 h-4 w-4" />
              How We Rank
            </Button>
          </Link>
          <Link href="#regulations">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Regulations
            </Button>
          </Link>
          <Link href="#methodology">
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Methodology
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Top 5 Brokers */}
      <section className="mb-16" id="comparison">
        <h2 className="text-3xl font-bold mb-8">Top 5 Commodities Brokers</h2>
        
        <div className="space-y-6">
          {topBrokers.map((broker, index) => (
            <Card key={broker.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/4 bg-muted/30 flex flex-col items-center justify-center p-6 border-r">
                  <Badge className="mb-2">{`#${index + 1}`}</Badge>
                  <div className="w-[120px] h-[60px] bg-white flex items-center justify-center rounded mb-4">
                    <img 
                      src={broker.logo} 
                      alt={`${broker.name} logo`}
                      className="max-w-full max-h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center">{broker.name}</h3>
                  <div className="flex items-center mt-2 mb-4">
                    <span className="text-yellow-500 font-bold">{broker.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">/5</span>
                  </div>
                  <div className="space-y-2 w-full">
                    <Button asChild className="w-full">
                      <Link href={broker.url}>Visit Broker</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/reviews/${broker.name.toLowerCase().replace(/\s+/g, '-')}`}>Read Review</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-3/4 p-6">
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="pros-cons">Pros & Cons</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Min. Deposit</h4>
                          <p className="font-medium">{broker.minDeposit}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Trading Fees</h4>
                          <p className="font-medium">{broker.tradingFees}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Platforms</h4>
                          <p className="font-medium">{broker.platforms.join(", ")}</p>
                        </div>
                        <div className="md:col-span-3">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Regulation</h4>
                          <div className="flex flex-wrap gap-2">
                            {broker.regulation.map(reg => (
                              <Badge key={reg} variant="outline">{reg}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="features">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.lowFees ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.lowFees ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Low Fees</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.marketAccess ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.marketAccess ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Wide Market Access</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.advancedTools ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.advancedTools ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Advanced Tools</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.beginner ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.beginner ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Good for Beginners</span>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pros-cons">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Pros</h4>
                          <ul className="space-y-2">
                            {broker.pros.map((pro, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 shrink-0" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Cons</h4>
                          <ul className="space-y-2">
                            {broker.cons.map((con, i) => (
                              <li key={i} className="flex items-start">
                                <Info className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 shrink-0" />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Methodology */}
      <section className="mb-16" id="how-we-rank">
        <h2 className="text-3xl font-bold mb-6">How We Rank Commodities Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our commodities broker rankings are based on extensive testing and analysis across multiple factors. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Market Access:</strong> Wide range of commodity markets including energy, metals, agriculture, and specialty goods</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Trading Methods:</strong> Multiple ways to trade commodities, including futures, options, CFDs, and ETFs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Pricing Structure:</strong> Transparent and competitive commission rates, spreads, and other fees</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Platform Quality:</strong> Advanced charts, technical analysis tools, and market data specific to commodities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Research Resources:</strong> Access to fundamental analysis, news, and insights for commodity markets</span>
              </li>
            </ul>
            <p>
              Each commodities broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving market conditions and offerings.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Regulations */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">Commodities Trading Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Commodity trading is regulated to ensure market integrity and protect participants. Key regulatory aspects include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">CFTC (US)</h3>
                <p className="text-sm text-muted-foreground">The Commodity Futures Trading Commission oversees US futures and options markets to protect against manipulation, fraud, and abusive practices.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">NFA (US)</h3>
                <p className="text-sm text-muted-foreground">The National Futures Association is the self-regulatory organization for the US derivatives industry, including commodity futures and options.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">FCA (UK)</h3>
                <p className="text-sm text-muted-foreground">The Financial Conduct Authority regulates commodity trading firms in the United Kingdom, including brokers offering commodity CFDs.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Exchange Rules</h3>
                <p className="text-sm text-muted-foreground">Commodity exchanges like CME Group, ICE, and LME establish specific trading rules, contract specifications, and position limits.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Position Limits</h3>
                <p className="text-sm text-muted-foreground">Regulatory bodies set limits on the size of positions that traders can hold to prevent market manipulation and excessive speculation.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Reporting Requirements</h3>
                <p className="text-sm text-muted-foreground">Large traders must report their positions to regulatory authorities, providing transparency to market participants.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Methodology Section */}
      <section className="mb-16" id="methodology">
        <h2 className="text-3xl font-bold mb-6">Our Testing Methodology</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-6">
              Our expert team conducts comprehensive hands-on testing of each commodities broker. We open real accounts, execute trades, and evaluate the overall trading experience.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Market Access Assessment</h3>
                <p className="text-sm text-muted-foreground">We evaluate the range of commodities available, including energy products, precious metals, industrial metals, agricultural commodities, and specialty goods.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Trading Cost Analysis</h3>
                <p className="text-sm text-muted-foreground">We analyze all applicable fees including commissions, spreads, overnight financing (for CFDs), and any platform or data fees.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Platform Evaluation</h3>
                <p className="text-sm text-muted-foreground">We test platform functionality, charting tools, order types, execution quality, and mobile capabilities specifically for commodity trading.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Research Quality</h3>
                <p className="text-sm text-muted-foreground">We assess fundamental research resources, market news, seasonal analysis tools, and other commodity-specific insights provided by the broker.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* FAQs */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>What are the different ways to trade commodities?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>There are several ways to trade commodities: Futures contracts are the most direct method, allowing standardized trading on exchanges like CME. Options on futures provide leverage with limited risk. Commodity CFDs offer trading without physical delivery, popular outside the US. Commodity ETFs and ETNs track specific commodities or indices without futures contract management. Physical trading involves actual ownership of commodities, mainly for institutional investors. The best method depends on your investment goals, market knowledge, and risk tolerance.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How much money do I need to start trading commodities?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The capital required varies by trading method. For futures trading, minimum account requirements typically range from $1,000-$10,000, with individual contract margins from $1,000-$15,000 depending on the commodity. CFD trading often requires $100-$1,000 to start, with higher leverage but greater risk. ETF investing can begin with as little as the price of one share (or less with fractional shares). For meaningful commodity trading that allows proper risk management, consider starting with at least $5,000-$10,000.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What are the risks of commodity trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Commodity trading involves significant risks including high price volatility driven by supply/demand factors, weather events, geopolitical disruptions, and economic conditions. Leverage in futures and CFDs magnifies both gains and losses. Other risks include liquidity challenges in some markets, potential delivery obligations with futures contracts (if not closed before expiration), and correlation risks when using commodity-related stocks or ETFs. Proper risk management through position sizing, stop-loss orders, and diversification is essential for commodity traders.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to start trading commodities?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended commodities brokers today, or use our comparison tool to find the perfect broker for your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Commodities Brokers
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/tools/quiz">
              Take the Broker Finder Quiz
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 