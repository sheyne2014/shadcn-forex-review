import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Futures Brokers 2025 | Top-Rated Futures Trading Platforms",
  description: "Compare the best futures brokers with low commissions, advanced platforms, and reliable execution. Expert-reviewed and ranked for all types of futures traders.",
};

// Futures broker data
export const topBrokers = [
  {
    id: 1,
    name: "NinjaTrader",
    logo: "https://placehold.co/120x60/png?text=NinjaTrader",
    rating: 4.8,
    minDeposit: "$1,000",
    commission: "$0.59 per side",
    platforms: ["NinjaTrader 8", "Mobile App"],
    regulation: ["NFA", "CFTC"],
    pros: [
      "Advanced charting and technical analysis",
      "Competitive commissions",
      "Free version for market analysis"
    ],
    cons: [
      "Higher minimum deposit requirements",
      "Advanced platform may intimidate beginners"
    ],
    url: "/reviews/ninjatrader",
    features: {
      lowFees: true,
      advancedTools: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 2,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.7,
    minDeposit: "$0",
    commission: "$0.85 per contract",
    platforms: ["Trader Workstation", "Client Portal", "IBKR Mobile"],
    regulation: ["NFA", "CFTC", "FCA"],
    pros: [
      "Global market access",
      "Institutional-grade platform",
      "Competitive margin rates"
    ],
    cons: [
      "Complex platform interface",
      "Customer service could be improved"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      lowFees: true,
      advancedTools: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 3,
    name: "E*TRADE",
    logo: "https://placehold.co/120x60/png?text=ETRADE",
    rating: 4.6,
    minDeposit: "$0",
    commission: "$1.50 per contract",
    platforms: ["Power E*TRADE", "E*TRADE Pro", "Mobile App"],
    regulation: ["NFA", "CFTC"],
    pros: [
      "User-friendly platforms",
      "Good educational resources",
      "Multiple trading platforms"
    ],
    cons: [
      "Higher futures commissions than specialists",
      "Limited futures product range compared to specialists"
    ],
    url: "/reviews/etrade",
    features: {
      lowFees: false,
      advancedTools: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 4,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.7,
    minDeposit: "$0",
    commission: "$2.25 per contract",
    platforms: ["thinkorswim", "TD Ameritrade Web", "Mobile App"],
    regulation: ["NFA", "CFTC"],
    pros: [
      "Powerful thinkorswim platform",
      "Excellent educational content",
      "24/7 customer support"
    ],
    cons: [
      "Higher commissions than futures specialists",
      "Complex platform for beginners"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      lowFees: false,
      advancedTools: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 5,
    name: "TradeStation",
    logo: "https://placehold.co/120x60/png?text=TradeStation",
    rating: 4.6,
    minDeposit: "$2,000",
    commission: "$1.50 per contract",
    platforms: ["TradeStation Desktop", "TradeStation Web", "Mobile App"],
    regulation: ["NFA", "CFTC"],
    pros: [
      "Professional-grade trading tools",
      "Extensive historical data",
      "Automated strategy capabilities"
    ],
    cons: [
      "Higher account minimums",
      "Steep learning curve for platform"
    ],
    url: "/reviews/tradestation",
    features: {
      lowFees: true,
      advancedTools: true,
      mobileFriendly: true,
      beginner: false
    }
  }
];

export default function BestFuturesBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Futures Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top futures brokers with reliable execution, competitive pricing, and advanced trading tools. All brokers thoroughly tested by our expert team.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Futures Brokers</h2>
        
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
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Commission</h4>
                          <p className="font-medium">{broker.commission}</p>
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.advancedTools ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.advancedTools ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Advanced Tools</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.mobileFriendly ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.mobileFriendly ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Mobile Friendly</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank Futures Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our futures broker rankings are based on extensive testing and analysis across multiple factors. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Execution Quality:</strong> Fast, reliable order execution with minimal slippage</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Competitive Pricing:</strong> Low commission rates, transparent fee structures, and reasonable margin requirements</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Platform Capabilities:</strong> Advanced charting, market depth, technical indicators, and automation features</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Market Access:</strong> Wide range of futures contracts across different exchanges</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Customer Support:</strong> Knowledgeable representatives available during all trading hours</span>
              </li>
            </ul>
            <p>
              Each futures broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving market conditions and platform improvements.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Regulations */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">Futures Trading Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Futures trading is highly regulated to ensure market integrity and protect participants. Key regulatory bodies include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">CFTC (US)</h3>
                <p className="text-sm text-muted-foreground">The Commodity Futures Trading Commission oversees U.S. futures markets to protect against manipulation, fraud, and abusive practices.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">NFA (US)</h3>
                <p className="text-sm text-muted-foreground">The National Futures Association is the self-regulatory organization for the U.S. derivatives industry, including futures, options, and swaps.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">FCA (UK)</h3>
                <p className="text-sm text-muted-foreground">The Financial Conduct Authority regulates financial services firms including futures brokers in the United Kingdom.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Exchange Rules</h3>
                <p className="text-sm text-muted-foreground">Futures exchanges like CME, ICE, and Eurex establish their own trading rules, contract specifications, and margin requirements.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Margin Requirements</h3>
                <p className="text-sm text-muted-foreground">Regulatory bodies set minimum margin requirements for futures positions to ensure market stability and risk management.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Position Limits</h3>
                <p className="text-sm text-muted-foreground">Regulators establish position limits to prevent market manipulation and excessive speculation in futures markets.</p>
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
              Our expert team conducts comprehensive hands-on testing of each futures broker. We open real accounts, deposit funds, execute trades, test customer service, and evaluate the overall trading experience.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Platform Evaluation</h3>
                <p className="text-sm text-muted-foreground">We test platform stability, feature set, customization options, and performance under various market conditions.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Order Execution Analysis</h3>
                <p className="text-sm text-muted-foreground">We measure execution speed, slippage rates, and fill quality across different futures contracts and market conditions.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Cost Structure Assessment</h3>
                <p className="text-sm text-muted-foreground">We analyze all applicable fees including commissions, exchange fees, market data fees, and platform charges.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Support Quality</h3>
                <p className="text-sm text-muted-foreground">We evaluate the knowledge, response time, and availability of customer support across various channels.</p>
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
              <CardTitle>What are futures contracts and how do they work?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Futures contracts are standardized agreements to buy or sell a specific asset (commodity, currency, index, etc.) at a predetermined price at a specified time in the future. Unlike options, futures represent an obligation to make or take delivery of the underlying asset, though most traders close positions before expiration. Futures are traded on margin, requiring only a fraction of the contract value as collateral.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How much money do I need to start trading futures?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Most futures brokers require at least $1,000-$5,000 to open an account, though some may have higher minimums of $10,000 or more. However, initial margin requirements for a single contract can range from $500 to $10,000+ depending on the specific futures contract and market volatility. Day trading futures typically requires at least $5,000-$10,000 to properly manage risk across multiple positions.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Are futures riskier than stocks?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Futures trading generally involves higher risk than stock trading due to leverage. The margin requirement for futures is typically 3-12% of contract value, meaning small price movements can result in large gains or losses relative to your account balance. Additionally, futures markets can experience significant volatility, especially in commodity contracts affected by supply disruptions or weather events. Proper risk management is essential when trading futures.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to start trading futures?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended futures brokers today, or use our comparison tool to find the perfect broker for your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Futures Brokers
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