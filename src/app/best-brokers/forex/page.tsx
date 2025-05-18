import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";

// Define the metadata with category-specific content
export const metadata: Metadata = {
  title: "Best Forex Brokers 2025 | Top Currency Trading Platforms | BrokerAnalysis",
  description: "Compare the best forex brokers with tight spreads, fast execution, and reliable platforms. Expert-reviewed and ranked for all types of forex traders.",
  openGraph: {
    title: "Top 10 Best Forex Brokers for 2025 | Ranked by Expert Analysis",
    description: "Compare leading forex brokers with the lowest spreads, fastest execution speeds, and most reliable trading platforms. Updated weekly with the latest broker data.",
    type: "website",
    url: `${siteConfig.url}/best-brokers/forex`,
    images: [
      {
        url: `${siteConfig.url}/images/categories/forex-brokers.png`,
        width: 1200,
        height: 630,
        alt: "Best Forex Brokers"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Forex Brokers 2025 | Top-Rated Currency Trading Platforms",
    description: "Compare the best forex brokers with tight spreads, fast execution, and reliable platforms. Expert-reviewed and ranked for all types of forex traders.",
    images: [`${siteConfig.url}/images/categories/forex-brokers.png`],
  },
  keywords: [
    "best forex brokers", 
    "top forex trading platforms", 
    "low spread forex brokers", 
    "fast execution forex brokers",
    "forex broker comparison",
    "MT4 forex brokers",
    "MT5 forex brokers", 
    "regulated forex brokers"
  ],
  alternates: {
    canonical: `${siteConfig.url}/best-brokers/forex`,
  },
};

// Generate JSON-LD structured data for forex brokers list
function generateListingJsonLd(topBrokers: any[]) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Forex Brokers',
    description: 'Top-rated forex brokers of 2025',
    numberOfItems: topBrokers.length,
    itemListElement: topBrokers.map((broker, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'FinancialService',
        name: broker.name,
        description: `${broker.name} forex broker with ${broker.spread} spreads and ${broker.minDeposit} minimum deposit`,
        image: broker.logo,
        url: `${siteConfig.url}${broker.url}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: broker.rating,
          bestRating: '5',
          worstRating: '1',
          ratingCount: '120'
        }
      }
    }))
  };

  return `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "IC Markets",
    logo: "https://placehold.co/120x60/png?text=IC+Markets",
    rating: 4.9,
    minDeposit: "$200",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "cTrader"],
    regulation: ["ASIC", "CySEC", "FSA"],
    pros: [
      "Ultra-low spreads",
      "Fast execution speeds",
      "Wide range of trading instruments"
    ],
    cons: [
      "Limited educational resources",
      "No fixed spreads option"
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
    name: "Pepperstone",
    logo: "https://placehold.co/120x60/png?text=Pepperstone",
    rating: 4.8,
    minDeposit: "$200",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "cTrader"],
    regulation: ["FCA", "ASIC", "CySEC", "DFSA", "SCB"],
    pros: [
      "Competitive spreads",
      "Advanced trading tools",
      "Excellent customer support"
    ],
    cons: [
      "Limited product range compared to some competitors",
      "No proprietary trading platform"
    ],
    url: "/reviews/pepperstone",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 3,
    name: "XM",
    logo: "https://placehold.co/120x60/png?text=XM",
    rating: 4.7,
    minDeposit: "$5",
    spread: "From 1.0 pips",
    platforms: ["MT4", "MT5"],
    regulation: ["CySEC", "ASIC", "IFSC"],
    pros: [
      "Very low minimum deposit",
      "Multi-language support",
      "Extensive educational resources"
    ],
    cons: [
      "Higher spreads than some competitors",
      "No cryptocurrencies trading"
    ],
    url: "/reviews/xm",
    features: {
      lowSpread: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 4,
    name: "FXCM",
    logo: "https://placehold.co/120x60/png?text=FXCM",
    rating: 4.6,
    minDeposit: "$50",
    spread: "From 1.3 pips",
    platforms: ["Trading Station", "MT4", "ZuluTrade"],
    regulation: ["FCA", "ASIC"],
    pros: [
      "Proprietary Trading Station platform",
      "Advanced charting tools",
      "Reliable execution"
    ],
    cons: [
      "Higher spreads for standard accounts",
      "Limited cryptocurrency offerings"
    ],
    url: "/reviews/fxcm",
    features: {
      lowSpread: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 5,
    name: "eToro",
    logo: "https://placehold.co/120x60/png?text=eToro",
    rating: 4.5,
    minDeposit: "$50",
    spread: "From 1.0 pips",
    platforms: ["eToro Platform"],
    regulation: ["FCA", "CySEC", "ASIC"],
    pros: [
      "Social trading features",
      "User-friendly platform",
      "Wide range of assets"
    ],
    cons: [
      "Higher forex spreads",
      "Withdrawal fees"
    ],
    url: "/reviews/etoro",
    features: {
      lowSpread: false,
      fastExecution: false,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestForexBrokersPage() {
  const categoryTitle = "Forex";
  const categoryDescription = "Compare the top forex brokers with tight spreads, fast execution, and comprehensive trading tools. All platforms thoroughly tested by our expert team.";
  
  return (
    <>
      {/* Add JSON-LD structured data */}
      <div dangerouslySetInnerHTML={{ __html: generateListingJsonLd(topBrokers) }} />
      
      <div className="container py-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">Updated January 2025</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Best {categoryTitle} Brokers
          </h1>
          <p className="text-xl text-muted-foreground">
            {categoryDescription}
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
          <h2 className="text-3xl font-bold mb-8">Top {topBrokers.length} {categoryTitle} Brokers</h2>
          
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
          <h2 className="text-3xl font-bold mb-6">How We Rank Forex Brokers</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                Our forex broker rankings are based on extensive testing and analysis across multiple factors. We prioritize brokers with:
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
                  <span><strong>Platform Quality:</strong> Intuitive, feature-rich trading platforms with advanced tools</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                  <span><strong>Regulation:</strong> Oversight from respected financial authorities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                  <span><strong>Customer Service:</strong> Responsive, knowledgeable support across multiple channels</span>
                </li>
              </ul>
              <p>
                Each broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date.
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Regulations */}
        <section className="mb-16" id="regulations">
          <h2 className="text-3xl font-bold mb-6">Forex Broker Regulations</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                Trading with regulated brokers provides important protections for your funds and ensures fair treatment. Key regulatory bodies include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">FCA (UK)</h3>
                  <p className="text-sm text-muted-foreground">Financial Conduct Authority provides strong consumer protections including the FSCS compensation scheme.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">CySEC (Cyprus)</h3>
                  <p className="text-sm text-muted-foreground">Cyprus Securities and Exchange Commission offers EU passporting rights and investor compensation fund.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">ASIC (Australia)</h3>
                  <p className="text-sm text-muted-foreground">Australian Securities and Investments Commission enforces strict financial service laws.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">CFTC/NFA (US)</h3>
                  <p className="text-sm text-muted-foreground">Commodity Futures Trading Commission and National Futures Association regulate US forex trading.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">JFSA (Japan)</h3>
                  <p className="text-sm text-muted-foreground">Japan Financial Services Agency enforces some of the strictest forex regulations globally.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">BaFin (Germany)</h3>
                  <p className="text-sm text-muted-foreground">Federal Financial Supervisory Authority provides strong oversight in the German market.</p>
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
                Our expert team conducts comprehensive hands-on testing of each broker. We open real accounts, deposit funds, execute trades, test customer service, and evaluate the overall trading experience.
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
                  <p className="text-sm text-muted-foreground">We track all trading costs including spreads, commissions, and swap rates over extended periods to ensure consistency.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold mb-1">Customer Service Evaluation</h3>
                  <p className="text-sm text-muted-foreground">We contact support through all available channels at different times to evaluate responsiveness, knowledge, and helpfulness.</p>
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
                <CardTitle>What is the minimum deposit required for forex trading?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Minimum deposits vary widely between brokers. Some brokers like XM offer accounts with as little as $5, while others may require $100-$1000. However, we recommend starting with at least $200-$500 for more effective trading even if lower options are available.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What makes a good forex broker?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>A good forex broker offers tight spreads, fast execution, reliable platforms, strong regulation, responsive customer support, and comprehensive educational resources. The best broker for you depends on your specific trading style, experience level, and needs.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Is forex trading suitable for beginners?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Forex trading can be suitable for beginners, but it requires education and practice. Start with a demo account, learn about currency pairs, risk management, and trading strategies before risking real money. Consider brokers with good educational resources and low minimum deposits.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start trading forex?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Open an account with one of our recommended brokers today, or use our comparison tool to find the perfect broker for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/tools/compare">
                Compare All Forex Brokers
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
    </>
  );
} 