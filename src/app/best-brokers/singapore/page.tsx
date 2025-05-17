import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Singapore Brokers 2025 | Top MAS-Regulated Trading Platforms",
  description: "Compare the best brokers for Singapore traders with strong regulation, competitive fees, and reliable platforms. Expert-reviewed and ranked.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "Tiger Brokers",
    logo: "https://placehold.co/120x60/png?text=Tiger",
    rating: 4.9,
    minDeposit: "S$0",
    spread: "Commission-based",
    platforms: ["Tiger Trade", "Tiger Trade Pro", "Tiger Mobile"],
    regulation: ["MAS", "SEC", "SFC"],
    pros: [
      "Low commission fees",
      "Multi-market access (SG, US, HK, CN)",
      "User-friendly platforms"
    ],
    cons: [
      "Limited research tools",
      "Relatively new in the market"
    ],
    url: "/reviews/tiger-brokers",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 2,
    name: "Saxo Markets",
    logo: "https://placehold.co/120x60/png?text=Saxo",
    rating: 4.8,
    minDeposit: "S$3,000",
    spread: "From 0.6 pips",
    platforms: ["SaxoTraderGO", "SaxoTraderPRO"],
    regulation: ["MAS", "FCA", "ASIC", "JFSA"],
    pros: [
      "Extensive product range",
      "Advanced trading platforms",
      "Comprehensive research"
    ],
    cons: [
      "Higher minimum deposit",
      "Premium pricing model"
    ],
    url: "/reviews/saxo-markets",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 3,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.7,
    minDeposit: "S$0",
    spread: "Commission-based",
    platforms: ["TWS", "IBKR Mobile", "Client Portal"],
    regulation: ["MAS", "SEC", "FCA", "ASIC"],
    pros: [
      "Global market access",
      "Advanced trading tools",
      "Competitive pricing"
    ],
    cons: [
      "Complex platform for beginners",
      "Inactivity fees may apply"
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
    id: 4,
    name: "POEMS by Phillip Securities",
    logo: "https://placehold.co/120x60/png?text=POEMS",
    rating: 4.6,
    minDeposit: "S$0",
    spread: "Commission-based",
    platforms: ["POEMS", "POEMS Mercury", "POEMS Mobile"],
    regulation: ["MAS", "SGX"],
    pros: [
      "Local market expertise",
      "Multiple investment products",
      "Reliable customer service"
    ],
    cons: [
      "Higher commission fees",
      "Platform less intuitive than competitors"
    ],
    url: "/reviews/poems",
    features: {
      lowSpread: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 5,
    name: "Moomoo / FUTU SG",
    logo: "https://placehold.co/120x60/png?text=Moomoo",
    rating: 4.5,
    minDeposit: "S$0",
    spread: "Commission-based",
    platforms: ["Moomoo App", "Moomoo Desktop"],
    regulation: ["MAS", "SEC", "SFC"],
    pros: [
      "Zero commission promotions",
      "Real-time market data",
      "Strong mobile platform"
    ],
    cons: [
      "Limited investment products",
      "Newer platform with less track record"
    ],
    url: "/reviews/moomoo",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestSingaporeBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers in Singapore
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top MAS-regulated Singapore brokers with competitive fees, excellent trading platforms, and comprehensive tools. All platforms thoroughly tested by our expert team.
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
              Singapore Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Singapore Brokers</h2>
        
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
        <h2 className="text-3xl font-bold mb-8">Singapore Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank Singapore Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>We prioritize brokers with strong MAS regulation and investor protection.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>All brokers we recommend must be fully regulated by the Monetary Authority of Singapore (MAS), ensuring they adhere to strict financial regulations. We verify their regulatory status and assess their compliance history to ensure they maintain the required standards to protect investor interests.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
              <CardDescription>We analyze the complete cost structure including commissions and account fees.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We conduct detailed analyses of each broker's fee structure, including commission rates, currency conversion fees, platform fees, and inactivity charges. Our rankings favor brokers offering transparent and competitive pricing structures suitable for Singapore-based traders.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Multi-Market Access</CardTitle>
              <CardDescription>We evaluate access to SGX and international markets.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Top Singapore brokers should provide comprehensive access to the Singapore Exchange (SGX) as well as major international markets like the US, Hong Kong, and China. We assess the range of available instruments, including stocks, ETFs, options, and REITs.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Technology</CardTitle>
              <CardDescription>We evaluate the quality, reliability, and features of trading platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our team tests each platform's execution speed, stability, charting tools, and overall user experience. We place particular emphasis on mobile trading capabilities, given the high smartphone usage in Singapore. We also assess platform reliability during peak trading hours.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Singapore Regulations Section */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-8">Understanding Singapore Broker Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Trading with a MAS-regulated broker provides significant protections for Singapore traders:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Monetary Authority of Singapore (MAS)</h3>
                <p>MAS is Singapore's central bank and financial regulatory authority. Brokers regulated by MAS must adhere to strict capital requirements, compliance procedures, and business conduct standards. MAS-regulated brokers are subject to regular audits and must maintain proper client asset segregation.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Capital Markets Services (CMS) License</h3>
                <p>Legitimate brokers operating in Singapore must hold a Capital Markets Services (CMS) license issued by MAS to deal in securities or provide trading services. This licensing ensures that brokers meet stringent financial and operational standards.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Client Asset Protection</h3>
                <p>MAS regulations require brokers to maintain segregated accounts for client funds, ensuring that customer assets are separated from the broker's operational funds. This provides a critical layer of protection in case of broker insolvency.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Investor Compensation</h3>
                <p>While Singapore does not have a universal investor compensation scheme like some other countries, MAS-regulated brokers must maintain professional indemnity insurance and meet specific capital adequacy requirements designed to protect investor interests.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Singapore Market Insights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Singapore Trading Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Financial Hub Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Singapore's position as a global financial hub offers traders unique advantages, including access to multiple Asian markets and international exchanges. Singapore-based traders benefit from the city-state's strong financial infrastructure, political stability, and strategic time zone that bridges Asian and Western trading hours.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Considerations for Singapore Traders</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Singapore offers a favorable tax environment for traders. There is no capital gains tax on stock investments, and dividend income from foreign sources is not taxable if received in Singapore. However, if trading is deemed to be your primary business activity, profits may be subject to income tax. Quality brokers should provide proper transaction reporting to assist with tax filings.</p>
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
                <span className="font-bold">Account Creation:</span> We open real accounts with each broker to evaluate the onboarding process, including KYC procedures and account funding options available to Singapore residents.
              </li>
              <li>
                <span className="font-bold">Platform Testing:</span> Our team conducts multiple trades on each platform, with a focus on SGX-listed securities and during Asian market hours, to assess execution speed, slippage, and overall reliability.
              </li>
              <li>
                <span className="font-bold">Regional Customer Service:</span> We contact each broker's support team through multiple channels to evaluate response times, knowledge, and helpfulness, with particular attention to service hours aligned with Singapore time zone.
              </li>
              <li>
                <span className="font-bold">Regulatory Verification:</span> We verify each broker's regulatory status directly with MAS and assess their compliance history and standing within Singapore's regulatory framework.
              </li>
              <li>
                <span className="font-bold">Multi-Market Testing:</span> We evaluate the broker's capability to provide access to multiple markets important to Singapore traders, including SGX, Hong Kong, US, and China A-shares where applicable.
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
              <CardTitle>What account types are available to Singapore traders?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Singapore traders typically have access to several account types. Cash accounts require full payment for securities purchases. Margin accounts allow trading with borrowed funds, subject to margin requirements set by both the broker and MAS. CDP-linked accounts connect to the Central Depository for direct ownership of SGX-listed securities, while custodian accounts hold securities in the broker's name on your behalf, often with lower fees but less direct ownership rights.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How do CDP and custodian accounts differ for Singapore investors?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>CDP (Central Depository) accounts give you direct ownership of SGX-listed securities with your name appearing on the company's share register. You receive corporate communications directly and maintain ownership even if your broker faces financial issues. Custodian accounts hold securities under the broker's name, typically offering lower fees and easier access to international markets, but with less direct ownership. Many Singapore traders maintain both account types for different purposes.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What fees should Singapore traders be aware of?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Singapore traders should consider multiple fee types beyond the obvious commission rates. These include custody fees for holding securities (more common with international shares), dividend handling fees, currency conversion costs (especially significant for multi-currency trading), account maintenance fees, market data fees for real-time information, and platform fees for advanced trading tools. The total cost impact can vary significantly based on your trading style and the markets you access.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Can foreigners open accounts with Singapore brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Yes, most Singapore brokers accept foreign clients, though requirements vary by broker and the applicant's country of residence. Non-residents typically need to provide additional documentation such as proof of address, identity verification, and sometimes tax identification from their home country. Some brokers may have country-specific restrictions due to regulatory requirements. Foreigners should also be aware of potential tax implications in both Singapore and their home country.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start trading with a Singapore broker?</CardTitle>
            <CardDescription>Compare the top platforms and open an account in minutes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top Singapore Brokers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 