import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Penny Stock Brokers 2025 | Top Trading Platforms for Penny Stocks",
  description: "Compare the best brokers for penny stock trading with access to OTC markets, low fees, and reliable platforms. Expert-reviewed and ranked.",
};

// Penny stock broker data
export const topBrokers = [
  {
    id: 1,
    name: "Charles Schwab",
    logo: "https://placehold.co/120x60/png?text=Schwab",
    rating: 4.8,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["StreetSmart Edge", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Excellent OTC stock access",
      "No surcharges for penny stocks",
      "Strong research tools"
    ],
    cons: [
      "Advanced platform has learning curve",
      "Phone trading has high fees"
    ],
    url: "/reviews/charles-schwab",
    features: {
      otcAccess: true,
      screening: true,
      noSurcharges: true,
      level2Data: true
    }
  },
  {
    id: 2,
    name: "Fidelity",
    logo: "https://placehold.co/120x60/png?text=Fidelity",
    rating: 4.7,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["Active Trader Pro", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Strong trade execution quality",
      "No penny stock surcharges",
      "Comprehensive screening tools"
    ],
    cons: [
      "Some penny stocks may be restricted",
      "Platform can be overwhelming"
    ],
    url: "/reviews/fidelity",
    features: {
      otcAccess: true,
      screening: true,
      noSurcharges: true,
      level2Data: true
    }
  },
  {
    id: 3,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.7,
    minDeposit: "$0",
    tradingFees: "$0.005 per share ($1 min)",
    platforms: ["Trader Workstation", "Client Portal", "IBKR Mobile"],
    regulation: ["SEC", "FINRA", "FCA"],
    pros: [
      "Comprehensive OTC market access",
      "Advanced order types",
      "Powerful scanning capabilities"
    ],
    cons: [
      "Complex platform for beginners",
      "Higher per-share pricing can add up"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      otcAccess: true,
      screening: true,
      noSurcharges: false,
      level2Data: true
    }
  },
  {
    id: 4,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.6,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["thinkorswim", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Excellent thinkorswim platform",
      "Strong stock screeners",
      "No added fees for OTC trades"
    ],
    cons: [
      "Some penny stocks may be restricted",
      "Steep learning curve for thinkorswim"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      otcAccess: true,
      screening: true,
      noSurcharges: true,
      level2Data: true
    }
  },
  {
    id: 5,
    name: "E*TRADE",
    logo: "https://placehold.co/120x60/png?text=ETRADE",
    rating: 4.5,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["Power E*TRADE", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Good OTC market access",
      "Commission-free trading",
      "Solid screening tools"
    ],
    cons: [
      "Some penny stocks unavailable",
      "May restrict certain volatile stocks"
    ],
    url: "/reviews/etrade",
    features: {
      otcAccess: true,
      screening: true,
      noSurcharges: true,
      level2Data: false
    }
  }
];

export default function BestPennyStockBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Penny Stock Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top brokers for penny stock trading with OTC market access, minimal fees, and powerful screening tools. All platforms thoroughly tested by our expert team.
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
          <Link href="#risks">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Risk Factors
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Penny Stock Brokers</h2>
        
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.otcAccess ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.otcAccess ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">OTC Market Access</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.screening ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.screening ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Stock Screening</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.noSurcharges ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.noSurcharges ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">No Surcharges</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.level2Data ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.level2Data ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Level II Data</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank Penny Stock Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our rankings for penny stock brokers are based on extensive testing and analysis across multiple factors that matter to low-priced stock traders. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>OTC Market Access:</strong> Comprehensive access to OTCQX, OTCQB, and Pink Sheets with minimal restrictions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Fee Structure:</strong> Low or no surcharges for penny and OTC stocks, transparent pricing with no hidden costs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Trading Tools:</strong> Advanced screening capabilities for finding penny stock opportunities and detailed quotes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Market Data:</strong> Access to Level II quotes, time and sales data, and detailed order book information</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Execution Quality:</strong> Fast, reliable trade execution with minimal slippage for low-liquidity stocks</span>
              </li>
            </ul>
            <p>
              Each broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving penny stock trading policies and platform capabilities.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Risk Section */}
      <section className="mb-16" id="risks">
        <h2 className="text-3xl font-bold mb-6">Penny Stock Trading Risks</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Before trading penny stocks, it's essential to understand the significant risks involved in this volatile market segment:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Limited Liquidity</h3>
                <p className="text-sm text-muted-foreground">Penny stocks often have low trading volumes, making it difficult to buy or sell shares at desired prices. This can lead to significant price slippage and difficulty exiting positions.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">High Volatility</h3>
                <p className="text-sm text-muted-foreground">Low-priced stocks can experience extreme price swings in short periods, potentially leading to substantial losses. Price movements of 20-50% in a single day are not uncommon.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Limited Information</h3>
                <p className="text-sm text-muted-foreground">Many OTC companies provide minimal financial disclosures compared to exchange-listed stocks, making thorough research challenging and increasing investment risk.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Manipulation Risk</h3>
                <p className="text-sm text-muted-foreground">Penny stocks are more susceptible to "pump and dump" schemes and other market manipulation tactics due to their lower liquidity and regulatory oversight.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Regulatory Considerations</h3>
                <p className="text-sm text-muted-foreground">Trading certain penny stocks may trigger Pattern Day Trader rules if you execute frequent trades. Some brokers also impose additional restrictions on OTC securities.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Dilution Risk</h3>
                <p className="text-sm text-muted-foreground">Penny stock companies frequently issue new shares to raise capital, diluting existing shareholders' stakes and potentially causing significant price declines.</p>
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
              Our expert team conducts hands-on testing of each broker's penny stock trading capabilities through real-world trading scenarios and platform evaluations.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">OTC Accessibility Testing</h3>
                <p className="text-sm text-muted-foreground">We attempt to trade various OTC stocks across different tiers (OTCQX, OTCQB, Pink) to evaluate access, restrictions, and execution quality.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Fee Analysis</h3>
                <p className="text-sm text-muted-foreground">We conduct detailed analysis of all costs associated with penny stock trading, including any surcharges, minimum fees, or hidden costs that could impact profitability.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Screening Tool Evaluation</h3>
                <p className="text-sm text-muted-foreground">We test each broker's stock screening capabilities for finding penny stock opportunities, assessing customization options and filtering criteria.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Platform Stability</h3>
                <p className="text-sm text-muted-foreground">We evaluate how each platform handles high-volatility penny stock trading scenarios, including order execution speed and reliability during price spikes.</p>
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
              <CardTitle>What are penny stocks and how are they different from regular stocks?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Penny stocks are shares of small companies that trade at low prices per share, typically under $5 according to the SEC definition. Unlike regular exchange-listed stocks, most penny stocks trade on the Over-the-Counter (OTC) market rather than major exchanges like NYSE or NASDAQ. Key differences include: 1) Lower liquidity, with fewer buyers and sellers creating wider bid-ask spreads; 2) Reduced regulatory requirements, with many OTC companies providing limited financial disclosures; 3) Higher volatility, with price movements of 20-50% in a single day not uncommon; 4) Increased risk of manipulation through "pump and dump" schemes; and 5) Different trading mechanics, with some brokers imposing special requirements or fees. While penny stocks offer potential for substantial returns due to their low price points and growth potential, they carry significantly higher risks than established exchange-listed securities.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What is the Pattern Day Trader rule and how does it affect penny stock trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The Pattern Day Trader (PDT) rule significantly impacts penny stock trading strategies. Under FINRA regulations, if you execute four or more day trades within five business days in a margin account, and these trades exceed 6% of your total trading activity during that period, you'll be classified as a Pattern Day Trader. This classification requires maintaining a minimum equity balance of $25,000 in your account. Since penny stocks are often day-traded due to their volatility, many traders hit this threshold quickly. If your account falls below $25,000 after being flagged as a PDT, you'll be restricted to no more than three day trades in a five-day rolling period until you restore the minimum balance. To avoid PDT restrictions with less than $25,000, traders can: 1) Use a cash account instead of margin (though this subjects you to settlement periods); 2) Limit day trades to fewer than four in five days; or 3) Hold positions overnight (though this increases exposure to gap risk with volatile penny stocks).</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What screening criteria are most effective for finding promising penny stocks?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>When screening for promising penny stocks, focus on these key criteria: 1) Volume and liquidity — look for stocks with consistently higher trading volumes (at least 300,000+ daily volume) to ensure you can enter and exit positions; 2) Price momentum — stocks showing recent upward momentum with increasing volume often indicate growing interest; 3) Company fundamentals — despite limited disclosures, prioritize companies with positive revenue growth, manageable debt levels, and real business operations; 4) Recent filings — companies that maintain current and transparent SEC filings demonstrate better governance; 5) Institutional/insider ownership — stocks with meaningful insider ownership or recent insider buying suggest management confidence; 6) Market capitalization — micro-cap stocks ($50M-$300M) often provide better balance of opportunity and risk than nano-caps; and 7) Sector trends — penny stocks in sectors experiencing broader growth may benefit from industry tailwinds. The best penny stock brokers provide screenable filters for most of these criteria, allowing you to identify candidates with reduced risk profiles.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to trade penny stocks?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended penny stock brokers today, or use our comparison tool to find the perfect platform for your low-priced stock trading strategy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Penny Stock Brokers
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