import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best ETF Brokers 2025 | Top-Rated ETF Trading Platforms",
  description: "Compare the best ETF brokers with low fees, wide selection, and reliable platforms. Expert-reviewed and ranked for all types of ETF investors.",
};

// ETF broker data
export const topBrokers = [
  {
    id: 1,
    name: "Vanguard",
    logo: "https://placehold.co/120x60/png?text=Vanguard",
    rating: 4.8,
    minDeposit: "$0",
    commission: "$0 per trade",
    platforms: ["Vanguard.com", "Vanguard Mobile"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Commission-free ETF trading",
      "Extensive lineup of proprietary ETFs",
      "Low expense ratios"
    ],
    cons: [
      "Basic trading platform",
      "Limited research tools for non-Vanguard ETFs"
    ],
    url: "/reviews/vanguard",
    features: {
      lowFees: true,
      research: false,
      selection: true,
      beginner: true
    }
  },
  {
    id: 2,
    name: "Charles Schwab",
    logo: "https://placehold.co/120x60/png?text=Schwab",
    rating: 4.7,
    minDeposit: "$0",
    commission: "$0 per trade",
    platforms: ["Schwab.com", "StreetSmart Edge", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Commission-free ETF trading",
      "Excellent ETF screener tools",
      "Strong educational resources"
    ],
    cons: [
      "More complex platform for beginners",
      "High minimum for robo-advisor service"
    ],
    url: "/reviews/charles-schwab",
    features: {
      lowFees: true,
      research: true,
      selection: true,
      beginner: true
    }
  },
  {
    id: 3,
    name: "Fidelity",
    logo: "https://placehold.co/120x60/png?text=Fidelity",
    rating: 4.8,
    minDeposit: "$0",
    commission: "$0 per trade",
    platforms: ["Fidelity.com", "Active Trader Pro", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Commission-free ETF trading",
      "Zero expense ratio index funds",
      "Top-tier research and screening tools"
    ],
    cons: [
      "Advanced platform may be overwhelming",
      "Some specialty ETFs not commission-free"
    ],
    url: "/reviews/fidelity",
    features: {
      lowFees: true,
      research: true,
      selection: true,
      beginner: true
    }
  },
  {
    id: 4,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.7,
    minDeposit: "$0",
    commission: "$0 per trade",
    platforms: ["TDAmeritrade.com", "thinkorswim", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Commission-free ETF trading",
      "Powerful ETF screener",
      "Excellent educational content"
    ],
    cons: [
      "thinkorswim platform has steep learning curve",
      "No fractional ETF shares"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      lowFees: true,
      research: true,
      selection: true,
      beginner: false
    }
  },
  {
    id: 5,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.6,
    minDeposit: "$0",
    commission: "$0 per trade",
    platforms: ["Client Portal", "Trader Workstation", "IBKR Mobile"],
    regulation: ["SEC", "FINRA", "FCA"],
    pros: [
      "Global ETF access",
      "Powerful research tools",
      "Competitive margin rates"
    ],
    cons: [
      "Complex platform for beginners",
      "Limited educational resources"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      lowFees: true,
      research: true,
      selection: true,
      beginner: false
    }
  }
];

export default function BestETFBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best ETF Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top ETF brokers with commission-free trading, wide selection, and powerful research tools. All brokers thoroughly tested by our expert team.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 ETF Brokers</h2>
        
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
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">ETF Commission</h4>
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.research ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.research ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Research Tools</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.selection ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.selection ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Wide Selection</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank ETF Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our ETF broker rankings are based on extensive testing and analysis across multiple factors. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>ETF Selection:</strong> Wide range of ETFs covering various asset classes, sectors, and investment styles</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Pricing Structure:</strong> Commission-free ETF trading and low expense ratios on proprietary ETFs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Research Tools:</strong> Quality ETF screeners, comparison tools, and in-depth ETF analysis</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Educational Resources:</strong> Comprehensive materials on ETF investing for all experience levels</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Platform Quality:</strong> Intuitive interfaces with reliable performance across devices</span>
              </li>
            </ul>
            <p>
              Each ETF broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving market conditions and product offerings.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Regulations */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">ETF Investment Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Exchange-Traded Funds (ETFs) are regulated investment products that offer important protections for investors. Key regulatory aspects include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">SEC Oversight</h3>
                <p className="text-sm text-muted-foreground">The Securities and Exchange Commission regulates ETF issuers and requires detailed disclosure of holdings, expenses, and risks.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Broker Regulation</h3>
                <p className="text-sm text-muted-foreground">ETF brokers are regulated by FINRA and subject to strict capital requirements and operational standards.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">SIPC Protection</h3>
                <p className="text-sm text-muted-foreground">The Securities Investor Protection Corporation provides insurance covering up to $500,000 in securities per customer.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Exchange Rules</h3>
                <p className="text-sm text-muted-foreground">ETFs must meet listing standards of exchanges like NYSE or Nasdaq, ensuring liquidity and transparency.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Prospectus Requirements</h3>
                <p className="text-sm text-muted-foreground">ETF issuers must provide detailed prospectuses disclosing investment objectives, strategies, risks, and fees.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Creation/Redemption Process</h3>
                <p className="text-sm text-muted-foreground">The unique structure of ETFs allows authorized participants to create and redeem shares, helping maintain prices close to net asset value.</p>
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
              Our expert team conducts comprehensive hands-on testing of each ETF broker. We open real accounts, explore ETF offerings, test research tools, and evaluate the overall investment experience.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">ETF Selection Analysis</h3>
                <p className="text-sm text-muted-foreground">We evaluate the breadth and quality of available ETFs, including specialty sectors, international markets, and innovative strategies.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Fee Assessment</h3>
                <p className="text-sm text-muted-foreground">We analyze all costs including commissions, expense ratios of proprietary ETFs, and any platform or account fees.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Platform Testing</h3>
                <p className="text-sm text-muted-foreground">We evaluate ETF screening tools, charting capabilities, portfolio analysis features, and mobile functionality.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Education Quality</h3>
                <p className="text-sm text-muted-foreground">We assess the depth and accessibility of educational resources specifically focused on ETF investing.</p>
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
              <CardTitle>What are ETFs and how do they differ from mutual funds?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Exchange-Traded Funds (ETFs) are investment funds that trade on stock exchanges, similar to individual stocks. Unlike mutual funds, which are priced once daily after market close, ETFs can be bought and sold throughout the trading day at market prices. ETFs typically have lower expense ratios than mutual funds, more tax efficiency, and no minimum investment requirements beyond the price of a single share (or less with fractional shares).</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What should I look for when choosing an ETF broker?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>When selecting an ETF broker, consider commission-free ETF offerings, breadth of ETF selection, quality of research and screening tools, expense ratios of proprietary ETFs, availability of fractional shares, account minimums, and educational resources. For active traders, also evaluate platform functionality, chart tools, and mobile app capabilities. For long-term investors, focus on retirement account options, automatic investment features, and portfolio analysis tools.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How are ETF investments taxed?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>ETFs are generally more tax-efficient than mutual funds due to their unique structure. When held in taxable accounts, ETF investors typically pay capital gains taxes only when they sell shares at a profit. ETFs may also distribute dividends and capital gains, which are taxable in the year received. Index ETFs tend to be more tax-efficient than actively managed ETFs due to lower turnover. For maximum tax efficiency, consider holding ETFs in tax-advantaged accounts like IRAs or 401(k)s.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to start investing in ETFs?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended ETF brokers today, or use our comparison tool to find the perfect broker for your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All ETF Brokers
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