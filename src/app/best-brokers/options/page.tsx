import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Options Brokers 2025 | Top-Rated Options Trading Platforms",
  description: "Compare the best options brokers with low fees, powerful tools, and reliable trading platforms. Expert-reviewed and ranked for all types of options traders.",
};

// Options broker data
const topBrokers = [
  {
    id: 1,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.8,
    minDeposit: "$0",
    optionsFee: "$0.65 per contract",
    platforms: ["thinkorswim", "TD Ameritrade Web", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Industry-leading thinkorswim platform",
      "Extensive options analysis tools",
      "Excellent educational resources"
    ],
    cons: [
      "Higher per-contract fee than some competitors",
      "Advanced platform may intimidate beginners"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      lowFees: false,
      advancedTools: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 2,
    name: "tastyworks",
    logo: "https://placehold.co/120x60/png?text=tastyworks",
    rating: 4.7,
    minDeposit: "$0",
    optionsFee: "$1 per contract (max $10 per leg)",
    platforms: ["Tastyworks Desktop", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Designed specifically for options traders",
      "Innovative trade analysis tools",
      "Capped commission structure"
    ],
    cons: [
      "Limited research tools",
      "Platform focused on derivatives over stocks"
    ],
    url: "/reviews/tastyworks",
    features: {
      lowFees: true,
      advancedTools: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 3,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.7,
    minDeposit: "$0",
    optionsFee: "$0.65 per contract (tiered pricing available)",
    platforms: ["Trader Workstation", "Client Portal", "IBKR Mobile"],
    regulation: ["SEC", "FINRA", "FCA"],
    pros: [
      "Lowest margin rates in the industry",
      "Advanced options trading tools",
      "Global market access"
    ],
    cons: [
      "Complex platform interface",
      "Less intuitive for beginners"
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
    id: 4,
    name: "E*TRADE",
    logo: "https://placehold.co/120x60/png?text=ETRADE",
    rating: 4.6,
    minDeposit: "$0",
    optionsFee: "$0.65 per contract",
    platforms: ["Power E*TRADE", "E*TRADE Web", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Powerful Options Analyzer tool",
      "Intuitive Power E*TRADE platform",
      "Good educational resources"
    ],
    cons: [
      "Higher fees than some specialized options brokers",
      "Advanced features require higher account balances"
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
    id: 5,
    name: "Charles Schwab",
    logo: "https://placehold.co/120x60/png?text=Schwab",
    rating: 4.6,
    minDeposit: "$0",
    optionsFee: "$0.65 per contract",
    platforms: ["StreetSmart Edge", "Schwab.com", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Comprehensive research",
      "Quality customer service",
      "Full-featured trading platform"
    ],
    cons: [
      "Less specialized for options-focused traders",
      "Higher options fees than discount brokers"
    ],
    url: "/reviews/charles-schwab",
    features: {
      lowFees: false,
      advancedTools: true,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestOptionsBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Options Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top options brokers with powerful trading tools, competitive pricing, and reliable platforms. All brokers thoroughly tested by our expert team.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Options Brokers</h2>
        
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
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Options Fee</h4>
                          <p className="font-medium">{broker.optionsFee}</p>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank Options Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our options broker rankings are based on extensive testing and analysis across multiple factors. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Options-Specific Tools:</strong> Advanced options analysis, strategy builders, and probability calculators</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Competitive Pricing:</strong> Low per-contract fees, volume discounts, and transparent fee structures</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Platform Performance:</strong> Fast option chain loading, reliable executions, and intuitive order entry</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Educational Resources:</strong> Options-focused tutorials, strategy guides, and webinars</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Approval Process:</strong> Fair and reasonable options trading approval requirements</span>
              </li>
            </ul>
            <p>
              Each options broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving market conditions and platform improvements.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Regulations */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">Options Trading Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Options trading is highly regulated to protect investors. Key regulatory aspects include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">SEC Oversight</h3>
                <p className="text-sm text-muted-foreground">The Securities and Exchange Commission oversees options markets to ensure fair and transparent trading.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">OCC Clearing</h3>
                <p className="text-sm text-muted-foreground">The Options Clearing Corporation guarantees all listed options contracts and manages settlement procedures.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">FINRA Supervision</h3>
                <p className="text-sm text-muted-foreground">The Financial Industry Regulatory Authority establishes suitability requirements for options traders.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Trading Levels</h3>
                <p className="text-sm text-muted-foreground">Brokers must classify traders into approval levels based on experience, knowledge, and financial resources.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Risk Disclosure</h3>
                <p className="text-sm text-muted-foreground">Mandatory disclosure of options trading risks and the provision of the Options Disclosure Document to all traders.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Pattern Day Trader Rules</h3>
                <p className="text-sm text-muted-foreground">Special requirements for accounts that frequently trade options, including minimum equity requirements.</p>
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
              Our expert team conducts comprehensive hands-on testing of each options broker. We open real accounts, deposit funds, execute option trades, test customer service, and evaluate the overall trading experience.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Options Chain Analysis</h3>
                <p className="text-sm text-muted-foreground">We evaluate option chain organization, information display, filtering capabilities, and loading speeds.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Strategy Tools Testing</h3>
                <p className="text-sm text-muted-foreground">We test options strategy builders, profit/loss calculators, and probability analysis features for accuracy and usability.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Execution Quality</h3>
                <p className="text-sm text-muted-foreground">We measure fill rates, execution speed, and price improvement when executing various option strategies across different market conditions.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Fee Analysis</h3>
                <p className="text-sm text-muted-foreground">We analyze all fees including per-contract rates, exercise/assignment fees, and any platform or data fees related to options trading.</p>
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
              <CardTitle>What is options trading and how does it work?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Options trading involves buying or selling contracts that give the holder the right (but not obligation) to buy or sell an underlying asset at a predetermined price (strike price) within a specific time period. Call options give the right to buy, while put options give the right to sell. Options can be used for speculation, income generation, or hedging existing positions.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How much money do I need to start trading options?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>While most options brokers have no minimum deposit requirement, you should consider starting with at least $2,000-$5,000 for meaningful options trading. This amount allows you to properly manage position sizes and employ basic strategies. For advanced strategies like spreads or iron condors, a minimum of $5,000-$10,000 is recommended. Different option approval levels may also have specific minimum balance requirements.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What are options approval levels?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Options approval levels (typically Level 1-4 or similar) determine which strategies you can trade. Level 1 usually allows covered calls and protective puts. Level 2 adds long calls and puts. Level 3 includes spreads (vertical, calendar, diagonal). Level 4 permits selling naked options. Brokers assess your experience, knowledge, and financial situation to determine your approval level, with requirements becoming more stringent for higher levels.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to start trading options?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended options brokers today, or use our comparison tool to find the perfect broker for your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Options Brokers
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