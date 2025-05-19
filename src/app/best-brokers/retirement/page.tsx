import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Retirement Brokers 2025 | Top IRA & 401k Trading Platforms",
  description: "Compare the best retirement brokers with IRA options, retirement planning tools, and low fees. Expert-reviewed and ranked for long-term investors.",
};

// Retirement broker data
const topBrokers = [
  {
    id: 1,
    name: "Fidelity",
    logo: "https://placehold.co/120x60/png?text=Fidelity",
    rating: 4.9,
    minDeposit: "$0",
    tradingFees: "$0 per stock/ETF trade",
    platforms: ["Fidelity.com", "Active Trader Pro", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Comprehensive retirement planning tools",
      "Zero expense ratio index funds",
      "Excellent research resources"
    ],
    cons: [
      "Advanced platform may overwhelm beginners",
      "Higher fees for some mutual funds"
    ],
    url: "/reviews/fidelity",
    features: {
      iraOptions: true,
      retirementPlanning: true,
      noFeeFunds: true,
      rollovers: true
    }
  },
  {
    id: 2,
    name: "Charles Schwab",
    logo: "https://placehold.co/120x60/png?text=Schwab",
    rating: 4.8,
    minDeposit: "$0",
    tradingFees: "$0 per stock/ETF trade",
    platforms: ["Schwab.com", "StreetSmart Edge", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Multiple retirement account types",
      "Excellent customer service",
      "Robust educational content"
    ],
    cons: [
      "Higher fees for broker-assisted trades",
      "Complex platform for beginners"
    ],
    url: "/reviews/charles-schwab",
    features: {
      iraOptions: true,
      retirementPlanning: true,
      noFeeFunds: true,
      rollovers: true
    }
  },
  {
    id: 3,
    name: "Vanguard",
    logo: "https://placehold.co/120x60/png?text=Vanguard",
    rating: 4.7,
    minDeposit: "$0",
    tradingFees: "$0 per stock/ETF trade",
    platforms: ["Vanguard.com", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Industry-leading low-cost funds",
      "Strong retirement focus",
      "Client-owned structure"
    ],
    cons: [
      "Basic trading platform",
      "Less appealing for active traders"
    ],
    url: "/reviews/vanguard",
    features: {
      iraOptions: true,
      retirementPlanning: true,
      noFeeFunds: true,
      rollovers: true
    }
  },
  {
    id: 4,
    name: "E*TRADE",
    logo: "https://placehold.co/120x60/png?text=ETRADE",
    rating: 4.6,
    minDeposit: "$0",
    tradingFees: "$0 per stock/ETF trade",
    platforms: ["Etrade.com", "Power E*TRADE", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Strong retirement planning tools",
      "No-fee IRAs",
      "Intuitive mobile experience"
    ],
    cons: [
      "Higher broker-assisted fees",
      "Complex research center"
    ],
    url: "/reviews/etrade",
    features: {
      iraOptions: true,
      retirementPlanning: true,
      noFeeFunds: false,
      rollovers: true
    }
  },
  {
    id: 5,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.6,
    minDeposit: "$0",
    tradingFees: "$0 per stock/ETF trade",
    platforms: ["TDAmeritrade.com", "thinkorswim", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Multiple IRA options",
      "Free retirement calculators",
      "Extensive educational content"
    ],
    cons: [
      "Merging with Charles Schwab",
      "Overwhelming platform for beginners"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      iraOptions: true,
      retirementPlanning: true,
      noFeeFunds: false,
      rollovers: true
    }
  }
];

export default function BestRetirementBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Retirement Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top brokers for retirement accounts with comprehensive IRA options, planning tools, and tax advantages. All platforms thoroughly tested by our expert team.
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
          <Link href="#account-types">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Account Types
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Retirement Brokers</h2>
        
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.iraOptions ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.iraOptions ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Multiple IRA Types</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.retirementPlanning ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.retirementPlanning ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Planning Tools</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.noFeeFunds ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.noFeeFunds ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">No-Fee Funds</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.rollovers ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.rollovers ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">401k Rollovers</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank Retirement Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our rankings for retirement brokers are based on extensive testing and analysis across multiple factors that matter to long-term investors. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Account Options:</strong> Variety of IRA types (Traditional, Roth, SEP, SIMPLE) and specialized retirement accounts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Planning Tools:</strong> Comprehensive retirement calculators, goal-setting features, and income projections</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Investment Selection:</strong> Access to retirement-focused funds, target-date funds, and low-cost index options</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Fee Structure:</strong> Low or no account maintenance fees, competitive fund expense ratios, and transparent pricing</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Educational Resources:</strong> Retirement-specific educational content, tax guidance, and planning resources</span>
              </li>
            </ul>
            <p>
              Each broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving retirement plan options and fee structures.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Account Types */}
      <section className="mb-16" id="account-types">
        <h2 className="text-3xl font-bold mb-6">Retirement Account Types Explained</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Understanding the different retirement account options is crucial when selecting a broker. Here are the key types offered by most brokers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Traditional IRA</h3>
                <p className="text-sm text-muted-foreground">Tax-deductible contributions with tax-deferred growth. Withdrawals are taxed as ordinary income in retirement. 2025 contribution limit: $7,000 ($8,000 if 50+).</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Roth IRA</h3>
                <p className="text-sm text-muted-foreground">After-tax contributions with tax-free growth and withdrawals in retirement. Same contribution limits as Traditional IRAs, with income restrictions.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">SEP IRA</h3>
                <p className="text-sm text-muted-foreground">Simplified Employee Pension IRAs for self-employed individuals or small business owners. Higher contribution limits up to 25% of compensation or $69,000 (2025).</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">SIMPLE IRA</h3>
                <p className="text-sm text-muted-foreground">Savings Incentive Match Plan for Employees, designed for small businesses with under 100 employees. 2025 contribution limit: $16,000 ($19,500 if 50+).</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Solo 401(k)</h3>
                <p className="text-sm text-muted-foreground">For self-employed individuals with no full-time employees. Combines employee and employer contributions for higher limits than traditional IRAs.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Rollover IRA</h3>
                <p className="text-sm text-muted-foreground">Account that allows you to transfer assets from a previous employer retirement plan without tax penalties, maintaining tax-advantaged status.</p>
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
              Our expert team includes financial planners and retirement specialists who evaluate each broker's retirement offerings through comprehensive hands-on testing.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Account Opening Process</h3>
                <p className="text-sm text-muted-foreground">We open actual retirement accounts to evaluate the application process, account options, and ease of funding for various IRA types.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Retirement Tools Assessment</h3>
                <p className="text-sm text-muted-foreground">We test retirement calculators, goal-setting features, and income projections tools for accuracy, customization options, and usability.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Fee Analysis</h3>
                <p className="text-sm text-muted-foreground">We conduct thorough analysis of all account fees, fund expense ratios, and potential hidden charges that could impact long-term retirement growth.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Investment Selection</h3>
                <p className="text-sm text-muted-foreground">We evaluate the breadth and quality of retirement-focused investment options, including target-date funds, index funds, and managed portfolios.</p>
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
              <CardTitle>What's the difference between a Traditional IRA and a Roth IRA?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The primary difference between Traditional and Roth IRAs is how and when they're taxed. With a Traditional IRA, contributions may be tax-deductible in the year they're made, reducing your current taxable income. However, withdrawals in retirement are taxed as ordinary income. In contrast, Roth IRA contributions are made with after-tax dollars (no immediate tax benefit), but qualified withdrawals in retirement are completely tax-free, including all earnings. Other key differences include: 1) Roth IRAs have income eligibility limits while Traditional IRAs don't; 2) Traditional IRAs require minimum distributions (RMDs) starting at age 73, while Roth IRAs never require withdrawals during the owner's lifetime; and 3) Traditional IRAs impose penalties for withdrawals before age 59½, while Roth IRAs allow contribution withdrawals (but not earnings) at any time without penalties.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How do I rollover a 401(k) from a previous employer to an IRA?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Rolling over a 401(k) to an IRA typically involves these steps: 1) Select a broker and open the appropriate IRA type (Traditional for pre-tax 401(k)s, Roth for Roth 401(k)s); 2) Contact your former employer's plan administrator to initiate the rollover - most top brokers provide dedicated rollover specialists to assist with this process; 3) Choose between a direct rollover (preferred), where funds transfer directly to your new IRA without passing through your hands, or an indirect rollover where you receive a check and have 60 days to deposit into your IRA to avoid taxes and penalties; 4) Complete the required paperwork from both your former plan and your new IRA provider; 5) Once funds arrive (typically 1-2 weeks), select your investments in the new IRA. Most leading retirement brokers offer fee-free rollovers and dedicated specialists who can guide you through every step of this process, helping you avoid potential tax pitfalls.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What should I look for in a target-date retirement fund?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>When evaluating target-date funds for retirement, consider these key factors: 1) Expense ratio - lower is better, with good options typically charging 0.08%-0.60%, as high fees significantly impact long-term returns; 2) Glide path strategy - how the asset allocation changes over time, with "through" glide paths continuing to adjust after retirement date versus "to" glide paths that stop adjusting at retirement; 3) Asset allocation - examine the fund's current and projected future mix of stocks, bonds, and other assets to ensure it aligns with your risk tolerance; 4) Fund family reputation - established providers like Vanguard, Fidelity, and Schwab generally offer well-designed, low-cost options; 5) Underlying investments - whether the fund uses index funds (typically lower cost) or actively managed funds; and 6) Performance relative to peers with similar target dates, though past performance doesn't guarantee future results. The best retirement brokers offer a selection of high-quality, low-cost target-date funds with transparent glide paths.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to secure your retirement future?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended retirement brokers today, or use our comparison tool to find the perfect platform for your long-term investment goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Retirement Brokers
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