import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best US Brokers 2025 | Top FINRA-Regulated Trading Platforms",
  description: "Compare the best brokers for US traders with SEC/FINRA regulation, competitive fees, and reliable platforms. Expert-reviewed and ranked.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.9,
    minDeposit: "$0",
    spread: "Commission-free stocks/ETFs",
    platforms: ["thinkorswim", "TD Ameritrade Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: [
      "Advanced thinkorswim platform",
      "Excellent research tools",
      "Commission-free stock trading"
    ],
    cons: [
      "Complex platform for beginners",
      "Higher forex fees"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 2,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.8,
    minDeposit: "$0",
    spread: "Tiered commissions",
    platforms: ["IBKR Trader Workstation", "IBKR Mobile"],
    regulation: ["SEC", "FINRA", "SIPC", "CFTC", "NFA"],
    pros: [
      "Global market access",
      "Low trading costs",
      "Advanced trading tools"
    ],
    cons: [
      "Complex platform interface",
      "Steep learning curve"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 3,
    name: "Charles Schwab",
    logo: "https://placehold.co/120x60/png?text=Schwab",
    rating: 4.7,
    minDeposit: "$0",
    spread: "Commission-free stocks/ETFs",
    platforms: ["StreetSmart Edge", "Schwab Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: [
      "High-quality research",
      "Excellent customer service",
      "Comprehensive investment offerings"
    ],
    cons: [
      "Basic trading platform",
      "Limited forex options"
    ],
    url: "/reviews/charles-schwab",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 4,
    name: "E*TRADE",
    logo: "https://placehold.co/120x60/png?text=ETRADE",
    rating: 4.6,
    minDeposit: "$0",
    spread: "Commission-free stocks/ETFs",
    platforms: ["Power E*TRADE", "E*TRADE Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: [
      "User-friendly platforms",
      "Strong research tools",
      "Good mobile experience"
    ],
    cons: [
      "Higher options contract fees",
      "Limited international trading"
    ],
    url: "/reviews/etrade",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 5,
    name: "Fidelity",
    logo: "https://placehold.co/120x60/png?text=Fidelity",
    rating: 4.5,
    minDeposit: "$0",
    spread: "Commission-free stocks/ETFs",
    platforms: ["Active Trader Pro", "Fidelity Mobile"],
    regulation: ["SEC", "FINRA", "SIPC"],
    pros: [
      "Outstanding research",
      "Excellent trade execution",
      "Robust retirement services"
    ],
    cons: [
      "Limited forex and futures trading",
      "Platform less suitable for active traders"
    ],
    url: "/reviews/fidelity",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestUSBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers in the US
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top SEC and FINRA regulated brokers available to US residents with competitive fees, excellent trading platforms, and comprehensive research tools.
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
              US Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 US Brokers</h2>
        
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
                          <p className="font-medium">{broker.regulation.join(", ")}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="features">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Low Spread</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.lowSpread ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.lowSpread ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Fast Execution</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.fastExecution ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.fastExecution ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Mobile Friendly</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.mobileFriendly ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.mobileFriendly ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Beginner Friendly</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.beginner ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.beginner ? '✓' : '✗'}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pros-cons">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-green-600 mb-2">Pros</h4>
                          <ul className="space-y-1">
                            {broker.pros.map((pro, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-600 mb-2">Cons</h4>
                          <ul className="space-y-1">
                            {broker.cons.map((con, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-red-600 mr-2">✗</span>
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
      
      {/* Broker Comparison Table */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">US Broker Comparison</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Broker</TableHead>
                <TableHead>Min. Deposit</TableHead>
                <TableHead>Spread</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead>Regulation</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topBrokers.map((broker) => (
                <TableRow key={broker.id}>
                  <TableCell className="font-medium">{broker.name}</TableCell>
                  <TableCell>{broker.minDeposit}</TableCell>
                  <TableCell>{broker.spread}</TableCell>
                  <TableCell>{broker.platforms.join(", ")}</TableCell>
                  <TableCell>{broker.regulation.join(", ")}</TableCell>
                  <TableCell>{broker.rating}/5</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      
      {/* How We Rank Section */}
      <section className="mb-16" id="how-we-rank">
        <h2 className="text-3xl font-bold mb-8">How We Rank US Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>We prioritize brokers with strong US regulation and customer protection measures.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>All brokers we recommend must be fully regulated by US authorities such as the SEC, FINRA, and where applicable, the CFTC and NFA. We also assess SIPC membership, which protects securities customers of member firms for up to $500,000.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trading Costs</CardTitle>
              <CardDescription>We analyze the complete cost structure including commissions, fees, and hidden charges.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We conduct detailed analyses of each broker's fee structure, including commission-free offerings, contract fees for options and futures, account maintenance fees, and any additional service charges. Our rankings favor brokers offering competitive and transparent pricing structures.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Capabilities</CardTitle>
              <CardDescription>We evaluate the quality, reliability, and features of trading platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our team tests each platform's execution speed, stability, charting tools, available indicators, and overall user experience. We consider both desktop and mobile platforms, giving special consideration to proprietary trading platforms that offer advanced features for active traders.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Research & Education</CardTitle>
              <CardDescription>We assess the quality and depth of market research and educational resources.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Top US brokers should offer comprehensive educational content for traders of all levels, alongside quality market research, news feeds, and analysis tools. We give higher ratings to brokers that provide third-party research access and comprehensive learning resources for investors.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* US Regulations Section */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-8">Understanding US Broker Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Trading with a properly regulated US broker provides significant protections:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Securities and Exchange Commission (SEC)</h3>
                <p>The SEC oversees securities exchanges, securities brokers and dealers, investment advisors, and mutual funds to promote market integrity and protect investors.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Financial Industry Regulatory Authority (FINRA)</h3>
                <p>FINRA is a self-regulatory organization that regulates member brokerage firms and exchange markets. It sets and enforces rules governing broker-dealers to ensure investor protection and market integrity.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Securities Investor Protection Corporation (SIPC)</h3>
                <p>SIPC provides insurance that protects securities customers of member firms for up to $500,000 (including $250,000 for cash claims) in case of a member firm's failure.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Commodity Futures Trading Commission (CFTC) & National Futures Association (NFA)</h3>
                <p>For brokers offering futures and options on futures, the CFTC and NFA provide regulatory oversight to protect market participants from fraud, manipulation, and abusive trading practices.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* US Market Insights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">US Trading Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Commission-Free Revolution</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The US brokerage landscape has been transformed by the shift to commission-free trading for stocks and ETFs. This has dramatically lowered barriers to entry for retail investors, though traders should still be aware of other potential fees like options contract fees, account inactivity fees, and data subscription costs.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Considerations for US Traders</CardTitle>
            </CardHeader>
            <CardContent>
              <p>US traders should be aware of short-term vs. long-term capital gains tax implications. Many US brokers offer integrated tax reporting features to help with annual tax returns, including cost basis tracking and automated 1099 form generation. Consider tax-advantaged accounts like IRAs for long-term investing where applicable.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Methodology Section */}
      <section className="mb-16" id="methodology">
        <h2 className="text-3xl font-bold mb-8">Our Testing Methodology</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Our broker evaluations involve rigorous, hands-on testing:</p>
            
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <span className="font-bold">Account Creation:</span> We open real accounts with each broker to evaluate the onboarding process, including identity verification procedures and account funding options.
              </li>
              <li>
                <span className="font-bold">Platform Testing:</span> Our team conducts multiple trades on each platform, assessing execution speed, order routing quality, and overall reliability across various market conditions and security types.
              </li>
              <li>
                <span className="font-bold">Customer Service:</span> We contact each broker's support team through multiple channels to evaluate response times, knowledge, and helpfulness across different types of queries.
              </li>
              <li>
                <span className="font-bold">Regulatory Verification:</span> We verify each broker's regulatory status directly with FINRA's BrokerCheck system and assess their compliance history for any significant violations.
              </li>
              <li>
                <span className="font-bold">Cost Analysis:</span> We conduct detailed analyses of all trading and non-trading fees, including any hidden charges or conditional fees that may affect different types of traders.
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>
      
      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Are all US brokers available to residents of all 50 states?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>While most major US brokers operate nationwide, some may have restrictions in certain states due to specific state regulations or licensing requirements. Always check a broker's state availability before attempting to open an account, especially for specialized services like cryptocurrency trading or specific investment products.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How do US residents access forex trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Forex trading options for US residents are more limited than in other countries due to stricter regulations. US traders can access forex markets through CFTC-registered Retail Foreign Exchange Dealers (RFEDs) or through futures contracts on regulated exchanges. Major brokers like Interactive Brokers and TD Ameritrade offer forex trading to US clients under these regulatory frameworks.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What investment options are typically available with US brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>US brokers typically offer a wide range of investment products including stocks, ETFs, mutual funds, bonds, options, and in some cases futures and forex. Many now also offer fractional share investing, allowing investors to purchase portions of expensive stocks. Cryptocurrency offerings vary significantly between brokers, with some offering direct crypto trading while others only provide crypto-related securities.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How does SIPC protection work with US brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>SIPC insurance protects customers of member firms for up to $500,000 in securities and cash (with a $250,000 limit on cash) if a brokerage firm fails. This protection covers the custody function of the broker, ensuring customers receive their securities back in case of broker bankruptcy. However, it does not protect against market losses or bad investment decisions. Many large brokers also carry additional private insurance beyond SIPC limits.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start trading with a US broker?</CardTitle>
            <CardDescription>Compare the top platforms and open an account in minutes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top US Brokers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 