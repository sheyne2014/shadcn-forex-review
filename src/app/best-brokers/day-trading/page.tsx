import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Day Trading Brokers 2025 | Top Platforms for Active Traders",
  description: "Compare the best day trading brokers with fast execution, advanced charting, and low fees. Expert-reviewed and ranked for active traders.",
};

// Day trading broker data
export const topBrokers = [
  {
    id: 1,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.9,
    minDeposit: "$0",
    tradingFees: "$0.005 per share, $1 minimum",
    platforms: ["Trader Workstation", "Client Portal", "IBKR Mobile"],
    regulation: ["SEC", "FINRA", "FCA"],
    pros: [
      "Direct market access",
      "Advanced order types",
      "Superior execution speed"
    ],
    cons: [
      "Complex platform for beginners",
      "Higher learning curve"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      fastExecution: true,
      advancedCharting: true,
      levelII: true,
      hotkeys: true
    }
  },
  {
    id: 2,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.8,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["thinkorswim", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Professional-grade thinkorswim platform",
      "Advanced charting and scanning",
      "Extensive educational resources"
    ],
    cons: [
      "Higher options and futures fees",
      "Complex platform for beginners"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      fastExecution: true,
      advancedCharting: true,
      levelII: true,
      hotkeys: true
    }
  },
  {
    id: 3,
    name: "TradeStation",
    logo: "https://placehold.co/120x60/png?text=TradeStation",
    rating: 4.7,
    minDeposit: "$0",
    tradingFees: "$0 per trade or $0.01 per share",
    platforms: ["TradeStation Desktop", "TS Web", "TS Mobile"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Advanced trading technology",
      "Robust backtesting tools",
      "Customizable trading automation"
    ],
    cons: [
      "Data fees for some features",
      "Steeper learning curve"
    ],
    url: "/reviews/tradestation",
    features: {
      fastExecution: true,
      advancedCharting: true,
      levelII: true,
      hotkeys: true
    }
  },
  {
    id: 4,
    name: "Lightspeed",
    logo: "https://placehold.co/120x60/png?text=Lightspeed",
    rating: 4.6,
    minDeposit: "$10,000",
    tradingFees: "$0.0045 per share, $1 minimum",
    platforms: ["Lightspeed Trader", "Sterling Trader Pro", "Web Platform"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Ultra-fast direct market access",
      "Professional-grade tools",
      "Robust risk management features"
    ],
    cons: [
      "High minimum deposit",
      "Expensive for casual traders"
    ],
    url: "/reviews/lightspeed",
    features: {
      fastExecution: true,
      advancedCharting: true,
      levelII: true,
      hotkeys: true
    }
  },
  {
    id: 5,
    name: "Webull",
    logo: "https://placehold.co/120x60/png?text=Webull",
    rating: 4.5,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["Webull Desktop", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Commission-free trading",
      "Full extended hours trading",
      "Free Level 2 market data"
    ],
    cons: [
      "Limited customer support",
      "Fewer asset classes than competitors"
    ],
    url: "/reviews/webull",
    features: {
      fastExecution: true,
      advancedCharting: true,
      levelII: true,
      hotkeys: false
    }
  }
];

export default function BestDayTradingBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Day Trading Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top brokers for day traders with lightning-fast execution, advanced charting tools, and competitive fees. All platforms thoroughly tested by our expert team.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Day Trading Brokers</h2>
        
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.fastExecution ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.fastExecution ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Fast Execution</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.advancedCharting ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.advancedCharting ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Advanced Charting</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.levelII ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.levelII ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Level II Data</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.hotkeys ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.hotkeys ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Customizable Hotkeys</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank Day Trading Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our rankings for day trading brokers are based on extensive testing and analysis across multiple factors that matter to active traders. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Execution Speed:</strong> Ultra-fast order execution with minimal slippage and direct market access options</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Trading Costs:</strong> Competitive commissions, low per-share pricing options, and transparent fee structures</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Advanced Platforms:</strong> Powerful desktop software with customizable layouts, advanced charting, and automated trading capabilities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Market Data:</strong> Access to Level II quotes, time and sales, depth charts, and advanced scanning tools</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Risk Management:</strong> Robust tools for setting stops, managing positions, and monitoring account exposure</span>
              </li>
            </ul>
            <p>
              Each broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving platform features and fee structures.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Regulations */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">Regulatory Considerations for Day Traders</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Day trading involves specific regulatory requirements and protections that traders should understand:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Pattern Day Trader Rules</h3>
                <p className="text-sm text-muted-foreground">U.S. traders who execute 4+ day trades in 5 business days in a margin account with over 6% of trading activity must maintain $25,000 minimum equity.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Margin Requirements</h3>
                <p className="text-sm text-muted-foreground">Day traders often use margin which is subject to regulatory requirements and can vary by broker. Understand the leverage limitations and maintenance requirements.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Broker Financial Strength</h3>
                <p className="text-sm text-muted-foreground">Choose brokers with strong capital positions and good standing with regulators to ensure stability during high market volatility.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Execution Quality Reporting</h3>
                <p className="text-sm text-muted-foreground">SEC Rule 605/606 reports provide transparency on broker execution quality, payment for order flow, and routing practices important for day traders.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Account Protection</h3>
                <p className="text-sm text-muted-foreground">Verify the broker participates in investor protection programs like SIPC, which protects securities in accounts up to $500,000 including $250,000 in cash.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Tax Implications</h3>
                <p className="text-sm text-muted-foreground">Day trading has specific tax considerations including wash sale rules, trader tax status eligibility, and potential mark-to-market accounting options.</p>
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
              Our expert team includes experienced day traders who conduct hands-on testing of each platform during actual market hours to evaluate real-world performance.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Execution Testing</h3>
                <p className="text-sm text-muted-foreground">We place actual trades during various market conditions to measure execution speed, slippage, and reliability of order types like limit orders and stops.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Platform Stress Testing</h3>
                <p className="text-sm text-muted-foreground">We evaluate platform stability during high volatility periods, market opens, and news events when many day traders are most active.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Total Cost Analysis</h3>
                <p className="text-sm text-muted-foreground">We calculate the all-in costs of typical day trading strategies, including commissions, data fees, platform fees, and margin costs.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Tool Evaluation</h3>
                <p className="text-sm text-muted-foreground">We assess the quality and usefulness of day trading specific tools like hotkeys, scanner customization, chart studies, and risk management features.</p>
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
              <CardTitle>What is the pattern day trader rule and how does it affect me?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The Pattern Day Trader (PDT) rule is a FINRA regulation that applies to U.S. traders who execute four or more day trades within a five-business-day period in a margin account, representing more than 6% of their total trading activity. Once classified as a pattern day trader, you must maintain a minimum equity of $25,000 in your account. If your balance falls below this threshold, you'll be restricted from day trading until you deposit additional funds to meet the requirement. This rule doesn't apply to cash accounts, though these are subject to settlement periods that can limit frequent trading. International brokers outside U.S. regulation may not impose this requirement, which is why some active traders with less than $25,000 seek offshore brokers.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What trading platform features are most important for day traders?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For day traders, the most critical platform features include: 1) Execution speed with minimal latency and direct market access; 2) Advanced charting with multiple timeframes, technical indicators, and drawing tools; 3) Level II market data showing order book depth and market maker activity; 4) Customizable hotkeys for rapid order entry and modification; 5) Versatile order types including conditional orders and bracket orders; 6) Powerful stock scanners with real-time filtering capabilities; 7) Time and sales data for tracking individual transactions; 8) Risk management tools for setting maximum loss limits and position sizing; 9) Stable, reliable performance during high volatility; and 10) Multiple monitor support with customizable layouts. The importance of each feature may vary based on your specific trading strategy, but execution speed and reliable data should be non-negotiable.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How do commission structures impact day trading profitability?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Commission structures significantly impact day trading profitability, especially for high-frequency traders. Per-share pricing models (e.g., $0.005 per share) typically benefit traders who deal in higher-priced stocks with smaller share quantities, while flat-fee structures work better for traders of lower-priced stocks with larger share counts. Tiered pricing, which reduces rates as volume increases, can substantially benefit very active traders. Beyond basic commissions, consider ECN/exchange fees, which can add up quickly with certain order types and routing choices. Rebate programs offered by some brokers can provide credits for adding liquidity to the market. For margin users, the interest rate on borrowed funds directly impacts overnight positions. When comparing brokers, calculate your expected monthly cost based on your typical trading volume and style, as the difference between brokers can represent thousands of dollars annually for active traders.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to elevate your day trading?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended day trading brokers today, or use our comparison tool to find the perfect platform for your trading style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Day Trading Brokers
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