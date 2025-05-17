import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Brokers for Beginners 2025 | Top User-Friendly Trading Platforms",
  description: "Compare the best beginner-friendly brokers with educational resources, low minimum deposits, and intuitive platforms. Expert-reviewed and ranked for new traders.",
};

// Beginner broker data
export const topBrokers = [
  {
    id: 1,
    name: "eToro",
    logo: "https://placehold.co/120x60/png?text=eToro",
    rating: 4.7,
    minDeposit: "$50",
    tradingFees: "Spread-based, 0% commission on stocks",
    platforms: ["Web Platform", "Mobile App"],
    regulation: ["FCA", "ASIC", "CySEC"],
    pros: [
      "User-friendly platform",
      "Copy trading functionality",
      "Extensive educational resources"
    ],
    cons: [
      "Higher spreads than some competitors",
      "Withdrawal fee applies"
    ],
    url: "/reviews/etoro",
    features: {
      userFriendly: true,
      education: true,
      lowDeposit: true,
      demoAccount: true
    }
  },
  {
    id: 2,
    name: "Plus500",
    logo: "https://placehold.co/120x60/png?text=Plus500",
    rating: 4.6,
    minDeposit: "$100",
    tradingFees: "Spread-based",
    platforms: ["WebTrader", "Mobile App"],
    regulation: ["FCA", "ASIC", "CySEC"],
    pros: [
      "Simple interface design",
      "Free demo account",
      "No commissions"
    ],
    cons: [
      "Limited educational resources",
      "CFD-only offering"
    ],
    url: "/reviews/plus500",
    features: {
      userFriendly: true,
      education: false,
      lowDeposit: true,
      demoAccount: true
    }
  },
  {
    id: 3,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.8,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["thinkorswim", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Outstanding educational content",
      "Commission-free stock trading",
      "Excellent customer support"
    ],
    cons: [
      "Advanced platform may overwhelm beginners",
      "Higher futures and forex fees"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      userFriendly: true,
      education: true,
      lowDeposit: true,
      demoAccount: true
    }
  },
  {
    id: 4,
    name: "Robinhood",
    logo: "https://placehold.co/120x60/png?text=Robinhood",
    rating: 4.3,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["Mobile App", "Web Platform"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Simple, intuitive interface",
      "Commission-free trading",
      "Fractional shares available"
    ],
    cons: [
      "Limited educational resources",
      "Basic research tools",
      "Limited customer support"
    ],
    url: "/reviews/robinhood",
    features: {
      userFriendly: true,
      education: false,
      lowDeposit: true,
      demoAccount: false
    }
  },
  {
    id: 5,
    name: "Charles Schwab",
    logo: "https://placehold.co/120x60/png?text=Schwab",
    rating: 4.7,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["StreetSmart Edge", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Excellent learning center",
      "Commission-free stock trading",
      "Outstanding customer service"
    ],
    cons: [
      "Complex platform for complete beginners",
      "Higher fees for some products"
    ],
    url: "/reviews/charles-schwab",
    features: {
      userFriendly: true,
      education: true,
      lowDeposit: true,
      demoAccount: true
    }
  }
];

export default function BestBeginnersBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers for Beginners
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top brokers for new traders with user-friendly platforms, educational resources, and low minimum deposits. All brokers thoroughly tested by our expert team.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Brokers for Beginners</h2>
        
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.userFriendly ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.userFriendly ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">User Friendly</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.education ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.education ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Educational Resources</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.lowDeposit ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.lowDeposit ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Low Deposit</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.demoAccount ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.demoAccount ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Demo Account</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank Beginner-Friendly Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our rankings for beginner brokers are based on extensive testing and analysis across multiple factors that matter specifically to new traders. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>User-Friendly Platforms:</strong> Intuitive interfaces with clean designs that are easy to navigate for first-time traders</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Educational Resources:</strong> Comprehensive learning materials, tutorials, webinars, and courses for trading fundamentals</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Affordability:</strong> Low minimum deposits, competitive fees, and transparent pricing with no hidden charges</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Demo Accounts:</strong> Quality practice accounts with virtual funds to learn trading without financial risk</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Customer Support:</strong> Responsive, multilingual support through multiple channels to help resolve beginner questions</span>
              </li>
            </ul>
            <p>
              Each broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving platform features and beginner-focused offerings.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Regulations */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">Regulatory Protection for New Traders</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Proper regulation is especially important for beginner traders. Here's what you should know about broker regulation:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Regulatory Oversight</h3>
                <p className="text-sm text-muted-foreground">The best brokers for beginners are regulated by respected authorities like the FCA (UK), ASIC (Australia), CySEC (EU), SEC/FINRA (US) that enforce strict rules.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Fund Segregation</h3>
                <p className="text-sm text-muted-foreground">Reputable brokers keep client funds in segregated accounts, separate from operational funds, providing protection in case of insolvency.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Investor Compensation</h3>
                <p className="text-sm text-muted-foreground">Many regulated brokers participate in investor compensation schemes that provide additional protection up to certain limits.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Risk Disclosures</h3>
                <p className="text-sm text-muted-foreground">Regulated brokers must provide clear risk warnings and ensure clients understand potential losses, which is crucial for newcomers.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Trading Protections</h3>
                <p className="text-sm text-muted-foreground">Many regulators require negative balance protection, guaranteed stops, and other safeguards that protect beginners from catastrophic losses.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Dispute Resolution</h3>
                <p className="text-sm text-muted-foreground">Regulated brokers provide formal complaint procedures and often fall under financial ombudsman services that can mediate disputes.</p>
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
              Our expert team conducts hands-on testing of each broker from the perspective of a complete beginner. We open real accounts, navigate the platforms, and evaluate the learning experience.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Platform Usability Testing</h3>
                <p className="text-sm text-muted-foreground">We assess how intuitive the trading interface is for first-time users, testing basic functions like opening positions, setting stop-losses, and navigating between screens.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Educational Content Evaluation</h3>
                <p className="text-sm text-muted-foreground">We review and rate all learning resources, from basic articles and glossaries to interactive courses, webinars, and market analysis materials.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Demo Account Quality</h3>
                <p className="text-sm text-muted-foreground">We test demo accounts for realism, features, time limitations, and how accurately they represent the live trading environment.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Support Responsiveness</h3>
                <p className="text-sm text-muted-foreground">We contact customer service through multiple channels with typical beginner questions, rating the speed, helpfulness, and clarity of responses.</p>
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
              <CardTitle>How much money should I start with as a beginner trader?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>As a beginner, it's prudent to start with only what you can afford to lose. Most beginner-friendly brokers accept minimum deposits of $50-$250. Consider starting with a modest amount like $200-$500 even if you can afford more, as this limits potential losses while learning. Practice on a demo account first, then transition to real trading with a small deposit. Many experienced traders recommend risking no more than 1-2% of your account on any single trade.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What types of investments are best for beginners?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Beginners should typically start with more straightforward investment types like stocks of well-known companies, ETFs that track major indices (like S&P 500), or mutual funds that provide built-in diversification. These have lower complexity and generally less volatility than options, futures, or leveraged products. Many beginners find success with a core portfolio of index ETFs, complemented by a few individual stocks in familiar companies or sectors they understand. As you gain experience, you can gradually explore more complex instruments.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How long should I use a demo account before trading real money?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Most beginners benefit from using a demo account for at least 1-3 months before transitioning to real money trading. During this time, you should develop and test a trading strategy, become comfortable with the platform's features, and practice proper risk management. Rather than focusing on a specific timeframe, aim to achieve consistent results in your demo trading before switching to real funds. Many successful traders first aim for several weeks of profitable demo trading, then start with real money using very small position sizes before gradually scaling up.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to start your trading journey?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended beginner-friendly brokers today, or use our comparison tool to find the perfect broker for your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Beginner Brokers
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