import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Stock Brokers 2025 | Top-Rated Stock Trading Platforms",
  description: "Compare the best stock brokers with low fees, powerful research tools, and reliable trading platforms. Expert-reviewed and ranked for all types of stock traders.",
};

// Stock broker data
export const topBrokers = [
  {
    id: 1,
    name: "Fidelity",
    logo: "https://placehold.co/120x60/png?text=Fidelity",
    rating: 4.8,
    minDeposit: "$0",
    spread: "$0 commission",
    platforms: ["Fidelity.com", "Active Trader Pro", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Commission-free stock trading",
      "Excellent research tools",
      "Strong customer service"
    ],
    cons: [
      "Active Trader Pro platform may be overwhelming for beginners",
      "International trading requires additional approval"
    ],
    url: "/reviews/fidelity",
    features: {
      lowFees: true,
      research: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 2,
    name: "Charles Schwab",
    logo: "https://placehold.co/120x60/png?text=Schwab",
    rating: 4.7,
    minDeposit: "$0",
    spread: "$0 commission",
    platforms: ["Schwab.com", "StreetSmart Edge", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Comprehensive research and education",
      "Excellent customer service",
      "Strong wealth management options"
    ],
    cons: [
      "StreetSmart Edge has steeper learning curve",
      "Some advanced tools require higher account balances"
    ],
    url: "/reviews/charles-schwab",
    features: {
      lowFees: true,
      research: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 3,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.7,
    minDeposit: "$0",
    spread: "$0 or tiered commission",
    platforms: ["Client Portal", "Trader Workstation", "IBKR Mobile"],
    regulation: ["SEC", "FINRA", "FCA"],
    pros: [
      "Global market access",
      "Advanced trading platforms",
      "Low margin rates"
    ],
    cons: [
      "Platform can be complex for beginners",
      "Customer service may be less responsive than competitors"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      lowFees: true,
      research: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 4,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.7,
    minDeposit: "$0",
    spread: "$0 commission",
    platforms: ["TDAmeritrade.com", "thinkorswim", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Top-tier thinkorswim platform",
      "Extensive educational resources",
      "24/7 customer support"
    ],
    cons: [
      "Higher options contract fees than some competitors",
      "Website and thinkorswim platform can feel disconnected"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      lowFees: true,
      research: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 5,
    name: "E*TRADE",
    logo: "https://placehold.co/120x60/png?text=ETRADE",
    rating: 4.6,
    minDeposit: "$0",
    spread: "$0 commission",
    platforms: ["ETRADE.com", "Power E*TRADE", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "User-friendly Power E*TRADE platform",
      "Good mobile experience",
      "Quality research and tools"
    ],
    cons: [
      "Higher options contract fees than some competitors",
      "Advanced features may require higher account balances"
    ],
    url: "/reviews/etrade",
    features: {
      lowFees: true,
      research: true,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestStockBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Stock Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top stock brokers with commission-free trading, powerful research tools, and reliable platforms. All brokers thoroughly tested by our expert team.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Stock Brokers</h2>
        
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
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Stock Trading</h4>
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.lowFees ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.lowFees ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Low Fees</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.research ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.research ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Research Tools</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank Stock Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our stock broker rankings are based on extensive testing and analysis across multiple factors. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Trading Costs:</strong> Commission-free stock trading, low options fees, and transparent pricing structures</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Research & Tools:</strong> High-quality research, stock screeners, charting tools, and educational resources</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Platform Performance:</strong> Fast, reliable platforms with intuitive interfaces across desktop and mobile</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Customer Service:</strong> Responsive support across multiple channels with extended hours</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Investment Options:</strong> Wide range of stocks, ETFs, mutual funds, and other investment products</span>
              </li>
            </ul>
            <p>
              Each stock broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving market conditions and technology.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Regulations */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">Stock Broker Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Trading with regulated stock brokers provides important protections for your funds and ensures fair treatment. Key regulatory bodies include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">SEC (US)</h3>
                <p className="text-sm text-muted-foreground">The Securities and Exchange Commission oversees securities exchanges, broker-dealers, and investment advisors.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">FINRA (US)</h3>
                <p className="text-sm text-muted-foreground">The Financial Industry Regulatory Authority is a self-regulatory organization that oversees broker-dealers.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">SIPC (US)</h3>
                <p className="text-sm text-muted-foreground">The Securities Investor Protection Corporation provides insurance covering up to $500,000 in securities per customer.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">FCA (UK)</h3>
                <p className="text-sm text-muted-foreground">The Financial Conduct Authority regulates financial services and markets in the United Kingdom.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">ASIC (Australia)</h3>
                <p className="text-sm text-muted-foreground">The Australian Securities and Investments Commission oversees Australia's financial markets and services.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">SEBI (India)</h3>
                <p className="text-sm text-muted-foreground">The Securities and Exchange Board of India protects investor interests in securities and promotes market development.</p>
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
              Our expert team conducts comprehensive hands-on testing of each stock broker. We open real accounts, deposit funds, execute trades, test customer service, and evaluate the overall trading experience.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Platform Testing</h3>
                <p className="text-sm text-muted-foreground">We test desktop, web, and mobile platforms for functionality, ease of use, features, stability, and performance.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Order Execution</h3>
                <p className="text-sm text-muted-foreground">We measure order execution speed, fill prices, and order routing quality across different market conditions.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Research Quality</h3>
                <p className="text-sm text-muted-foreground">We evaluate the depth and quality of research reports, stock screening tools, and educational content.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Cost Analysis</h3>
                <p className="text-sm text-muted-foreground">We analyze all fees including commissions, spreads, margin rates, account fees, and any other charges.</p>
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
              <CardTitle>What's the difference between full-service and discount brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Full-service brokers provide personalized investment advice, wealth management, and dedicated advisors, but typically charge higher fees. Discount brokers offer self-directed trading platforms with lower costs but minimal personalized guidance. Most online brokers today are discount brokers with various levels of research and tools.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How much money do I need to start trading stocks?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Most major online brokers now offer $0 minimum deposit requirements and commission-free stock trading. You can start with as little as the price of a single share (or even less with brokers offering fractional shares). However, starting with at least $500-$1,000 provides more diversification options and can help offset any account or inactivity fees.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Are my funds safe with an online broker?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Reputable stock brokers are regulated by financial authorities and typically offer insurance on securities through programs like SIPC in the US, which covers up to $500,000 in securities per customer (including $250,000 in cash). While this protection doesn't cover investment losses due to market fluctuations, it does protect against broker insolvency.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to start investing in stocks?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended stock brokers today, or use our comparison tool to find the perfect broker for your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Stock Brokers
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