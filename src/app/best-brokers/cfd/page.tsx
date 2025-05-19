import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best CFD Brokers 2025 | Top-Rated CFD Trading Platforms",
  description: "Compare the best CFD brokers with competitive spreads, advanced platforms, and reliable execution. Expert-reviewed and ranked for all types of CFD traders.",
};

// CFD broker data
const topBrokers = [
  {
    id: 1,
    name: "IC Markets",
    logo: "https://placehold.co/120x60/png?text=IC+Markets",
    rating: 4.7,
    minDeposit: "$200",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "cTrader"],
    regulation: ["ASIC", "CySEC"],
    pros: [
      "Ultra-low spreads",
      "Fast execution speeds",
      "Wide range of CFD instruments"
    ],
    cons: [
      "Limited educational resources for beginners",
      "No guaranteed stop-loss"
    ],
    url: "/reviews/ic-markets",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 2,
    name: "IG",
    logo: "https://placehold.co/120x60/png?text=IG",
    rating: 4.6,
    minDeposit: "$250",
    spread: "From 0.8 pips",
    platforms: ["IG Platform", "MT4", "ProRealTime"],
    regulation: ["FCA", "ASIC", "FSCA"],
    pros: [
      "Extensive market access",
      "Strong regulatory protection",
      "Advanced risk management tools"
    ],
    cons: [
      "Higher minimum deposit than some competitors",
      "Inactivity fees may apply"
    ],
    url: "/reviews/ig",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 3,
    name: "CMC Markets",
    logo: "https://placehold.co/120x60/png?text=CMC+Markets",
    rating: 4.5,
    minDeposit: "$0",
    spread: "From 0.7 pips",
    platforms: ["Next Generation", "MT4", "Mobile App"],
    regulation: ["FCA", "ASIC", "BaFin"],
    pros: [
      "Intuitive proprietary platform",
      "Comprehensive educational resources",
      "Competitive spreads"
    ],
    cons: [
      "Higher spreads during volatile markets",
      "Limited cryptocurrency CFDs"
    ],
    url: "/reviews/cmc-markets",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 4,
    name: "Pepperstone",
    logo: "https://placehold.co/120x60/png?text=Pepperstone",
    rating: 4.8,
    minDeposit: "$200",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "cTrader"],
    regulation: ["FCA", "ASIC", "CySEC", "DFSA", "SCB"],
    pros: [
      "No dealing desk execution",
      "Advanced trading tools",
      "Excellent customer support"
    ],
    cons: [
      "Limited product range compared to some competitors",
      "Higher minimum deposit than some brokers"
    ],
    url: "/reviews/pepperstone",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 5,
    name: "XTB",
    logo: "https://placehold.co/120x60/png?text=XTB",
    rating: 4.7,
    minDeposit: "$10",
    spread: "From 0.1 pips",
    platforms: ["xStation 5", "MT4", "Mobile App"],
    regulation: ["CySEC", "FCA", "KNF"],
    pros: [
      "User-friendly xStation platform",
      "Low minimum deposit",
      "Free educational resources"
    ],
    cons: [
      "Limited US market access",
      "Higher spreads on some instruments"
    ],
    url: "/reviews/xtb",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestCFDBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best CFD Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top CFD brokers with tight spreads, fast execution, and comprehensive trading tools. All platforms thoroughly tested by our expert team.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 CFD Brokers</h2>
        
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
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Typical Spread</h4>
                          <p className="font-medium">{broker.spread}</p>
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.lowSpread ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.lowSpread ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Low Spread</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.fastExecution ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.fastExecution ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Fast Execution</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank CFD Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our CFD broker rankings are based on extensive testing and analysis across multiple factors. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Competitive Pricing:</strong> Low spreads, commissions, and transparent fee structures</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Execution Quality:</strong> Fast, reliable order execution with minimal slippage</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Platform Quality:</strong> Intuitive, feature-rich trading platforms with advanced charting</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Regulation:</strong> Oversight from respected financial authorities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Risk Management:</strong> Tools for managing risk, including stop-loss orders and negative balance protection</span>
              </li>
            </ul>
            <p>
              Each CFD broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Regulations */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">CFD Broker Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              CFD trading involves significant risk, making regulatory oversight especially important. Key regulatory bodies for CFD brokers include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">FCA (UK)</h3>
                <p className="text-sm text-muted-foreground">The Financial Conduct Authority enforces leverage limits and requires segregated client funds and negative balance protection.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">ASIC (Australia)</h3>
                <p className="text-sm text-muted-foreground">The Australian Securities and Investments Commission imposes product intervention measures for CFDs, including leverage limits.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">CySEC (Cyprus)</h3>
                <p className="text-sm text-muted-foreground">The Cyprus Securities and Exchange Commission provides passporting rights throughout the EU and requires client fund protection.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">BaFin (Germany)</h3>
                <p className="text-sm text-muted-foreground">The Federal Financial Supervisory Authority enforces strict rules for CFD providers, including mandatory negative balance protection.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">FSCA (South Africa)</h3>
                <p className="text-sm text-muted-foreground">The Financial Sector Conduct Authority regulates CFD trading with a focus on consumer protection and market integrity.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">ESMA Guidelines</h3>
                <p className="text-sm text-muted-foreground">The European Securities and Markets Authority provides standardized rules for CFD trading across EU member states, including leverage caps.</p>
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
              Our expert team conducts comprehensive hands-on testing of each CFD broker. We open real accounts, deposit funds, execute trades, test customer service, and evaluate the overall trading experience.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Platform Testing</h3>
                <p className="text-sm text-muted-foreground">We test all available platforms (web, desktop, mobile) for functionality, ease of use, features, stability, and performance.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Execution Analysis</h3>
                <p className="text-sm text-muted-foreground">We measure execution speed, slippage, and rejection rates across different market conditions and trading sessions.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Cost Analysis</h3>
                <p className="text-sm text-muted-foreground">We track all trading costs including spreads, commissions, overnight financing, and withdrawal fees to ensure transparency.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Risk Management Tools</h3>
                <p className="text-sm text-muted-foreground">We evaluate available risk management features including stop-loss orders, negative balance protection, and account limits.</p>
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
              <CardTitle>What are CFDs and how do they work?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Contracts for Difference (CFDs) are derivative products that allow traders to speculate on the price movements of assets without owning the underlying asset. When trading CFDs, you're essentially agreeing to exchange the difference in price of an asset from the time you open the position to when you close it. CFDs offer leverage, allowing traders to control larger positions with a relatively small amount of capital.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What are the risks of CFD trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>CFD trading involves significant risks, including potential loss exceeding your initial investment due to leverage. Around 70-80% of retail CFD traders lose money. Key risks include market volatility, leverage magnifying both profits and losses, counterparty risk (broker solvency), liquidity risk, and overnight financing costs for positions held open overnight. Risk management strategies are essential for CFD trading.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Are CFDs legal in the United States?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No, CFDs are not legal for retail traders in the United States. The Securities and Exchange Commission (SEC) and Commodity Futures Trading Commission (CFTC) prohibit offering CFDs to U.S. residents due to their high-risk nature and lack of exchange regulation. U.S. traders looking for similar products may consider futures contracts, options, or ETFs, which are regulated and traded on recognized exchanges.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to start trading CFDs?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended CFD brokers today, or use our comparison tool to find the perfect broker for your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All CFD Brokers
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