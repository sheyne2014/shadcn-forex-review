import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Australian Brokers 2025 | Top ASIC-Regulated Trading Platforms",
  description: "Compare the best brokers for Australian traders with strong ASIC regulation, competitive fees, and reliable platforms. Expert-reviewed and ranked.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "Pepperstone",
    logo: "https://placehold.co/120x60/png?text=Pepperstone",
    rating: 4.9,
    minDeposit: "A$200",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "cTrader"],
    regulation: ["ASIC", "FCA", "CySEC", "DFSA", "SCB"],
    pros: [
      "Competitive spreads",
      "Fast execution speeds",
      "Advanced trading tools"
    ],
    cons: [
      "Limited product range compared to some competitors",
      "Basic research tools"
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
    id: 2,
    name: "IC Markets",
    logo: "https://placehold.co/120x60/png?text=IC+Markets",
    rating: 4.8,
    minDeposit: "A$200",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "cTrader"],
    regulation: ["ASIC", "CySEC", "FSA"],
    pros: [
      "Ultra-low spreads",
      "Fast execution",
      "Deep liquidity"
    ],
    cons: [
      "Limited educational resources",
      "Basic research tools"
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
    id: 3,
    name: "IG",
    logo: "https://placehold.co/120x60/png?text=IG",
    rating: 4.7,
    minDeposit: "A$300",
    spread: "From 0.6 pips",
    platforms: ["IG Platform", "MT4", "ProRealTime"],
    regulation: ["ASIC", "FCA", "BaFin", "FINMA"],
    pros: [
      "Extensive market access",
      "Advanced trading platforms",
      "Comprehensive educational resources"
    ],
    cons: [
      "Higher minimum deposit",
      "Not the lowest spreads"
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
    id: 4,
    name: "CMC Markets",
    logo: "https://placehold.co/120x60/png?text=CMC",
    rating: 4.6,
    minDeposit: "A$0",
    spread: "From 0.7 pips",
    platforms: ["Next Generation", "MT4"],
    regulation: ["ASIC", "FCA", "MAS"],
    pros: [
      "Award-winning platform",
      "No minimum deposit",
      "Extensive product range"
    ],
    cons: [
      "Higher spreads than some competitors",
      "Platform may be complex for beginners"
    ],
    url: "/reviews/cmc-markets",
    features: {
      lowSpread: true,
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
    minDeposit: "A$50",
    spread: "From 1.0 pips",
    platforms: ["eToro Platform"],
    regulation: ["ASIC", "FCA", "CySEC"],
    pros: [
      "Social trading features",
      "User-friendly platform",
      "Low minimum deposit"
    ],
    cons: [
      "Higher spreads",
      "Withdrawal fees"
    ],
    url: "/reviews/etoro",
    features: {
      lowSpread: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestAustraliaBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers in Australia
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top ASIC-regulated brokers with competitive fees, excellent trading platforms, and comprehensive tools tailored for Australian traders.
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
              ASIC Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Australian Brokers</h2>
        
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
        <h2 className="text-3xl font-bold mb-8">Australian Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank Australian Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>We prioritize brokers with strong ASIC regulation and customer protection measures.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>All brokers we recommend must be fully regulated by the Australian Securities and Investments Commission (ASIC), ensuring they adhere to strict Australian financial regulations. We verify compliance with capital requirements and client money protection rules.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trading Costs</CardTitle>
              <CardDescription>We analyze the complete cost structure including spreads, commissions, and account fees.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We conduct detailed analyses of each broker's fee structure, including typical spreads on popular currency pairs and ASX stocks, commissions, overnight charges, and any additional account fees. Our rankings favor brokers offering competitive and transparent pricing structures for Australian traders.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Capabilities</CardTitle>
              <CardDescription>We evaluate the quality, reliability, and features of trading platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our team tests each platform's execution speed, stability, charting tools, available indicators, and overall user experience. We consider platform performance during Australian trading hours and the availability of ASX market data where relevant.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Local Support & Services</CardTitle>
              <CardDescription>We assess the quality of customer service and localized features for Australian traders.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Top Australian brokers should offer dedicated local support during Australian business hours, AUD-denominated accounts, and local payment methods. We give higher ratings to brokers with physical presence in Australia and Australian-focused educational content.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* ASIC Regulations Section */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-8">Understanding ASIC Broker Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Trading with an ASIC-regulated broker provides significant protections for Australian traders:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Australian Securities and Investments Commission (ASIC)</h3>
                <p>ASIC is Australia's financial regulatory body with oversight of financial markets, securities, and consumer protection. ASIC-regulated brokers must maintain substantial capital reserves, follow strict financial reporting requirements, and adhere to fair business practices.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Client Money Protection</h3>
                <p>Under Australian regulations, brokers must keep client funds in segregated trust accounts with authorized Australian banks, separate from the company's operational funds. This segregation ensures client funds are protected in case the broker faces financial difficulties.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Product Intervention Measures</h3>
                <p>ASIC has implemented leverage limits and other product intervention measures for CFD trading to enhance consumer protection. These measures include leverage caps of 30:1 for major currency pairs and lower limits for other instruments, as well as negative balance protection.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Dispute Resolution</h3>
                <p>ASIC-regulated brokers must have an internal dispute resolution procedure and must be members of the Australian Financial Complaints Authority (AFCA), which provides free, independent dispute resolution for financial complaints.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Australian Market Insights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Australian Trading Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>ASX Access and Local Market Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For Australian traders, having direct access to the Australian Securities Exchange (ASX) is often important. The best Australian brokers offer comprehensive coverage of ASX-listed stocks along with global markets. Look for brokers providing quality research on Australian companies and sectors, particularly resources which are a significant part of the Australian market.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Considerations for Australian Traders</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Australian traders need to be aware of Capital Gains Tax implications and potential Foreign Income reporting requirements. Some brokers provide annual tax reporting features tailored for the Australian Tax Office requirements. Consider brokers that offer Australian tax-friendly account structures where appropriate.</p>
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
                <span className="font-bold">Account Creation:</span> We open real accounts with each broker to evaluate the onboarding process, including ID verification procedures and account funding options relevant to Australian residents.
              </li>
              <li>
                <span className="font-bold">Platform Testing:</span> Our team conducts multiple trades on each platform during Australian market hours, assessing execution speed, slippage, and overall reliability under various market conditions.
              </li>
              <li>
                <span className="font-bold">Customer Service:</span> We contact each broker's support team through multiple channels during Australian business hours to evaluate response times, knowledge, and helpfulness.
              </li>
              <li>
                <span className="font-bold">Regulatory Verification:</span> We verify each broker's regulatory status directly with ASIC's registry and assess their history of compliance with Australian regulations.
              </li>
              <li>
                <span className="font-bold">Cost Analysis:</span> We conduct detailed analyses of all trading and non-trading fees for AUD-denominated accounts, including spread comparisons during Australian trading hours.
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
              <CardTitle>What is the minimum amount needed to start trading with an Australian broker?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Minimum deposits with Australian brokers vary significantly. Some brokers like CMC Markets offer accounts with no minimum deposit, while others require A$200-A$300 to start. For beginners, we recommend starting with at least A$500, even with low-minimum brokers, to ensure adequate capital for proper risk management.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How do ASIC's leverage restrictions compare to other countries?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>ASIC's leverage restrictions are similar to those implemented by European regulators under ESMA guidelines. Maximum leverage is capped at 30:1 for major forex pairs, 20:1 for minor forex pairs and major indices, 10:1 for commodities, 5:1 for shares, and 2:1 for cryptocurrencies. These limits are more restrictive than some offshore jurisdictions but are designed to enhance consumer protection.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Can non-Australian residents use ASIC-regulated brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Yes, most ASIC-regulated brokers accept international clients, though services may differ depending on your location. Some countries may be excluded due to local regulations. Australian brokers typically have a global presence through subsidiaries regulated in other jurisdictions, which may be more appropriate for non-Australian clients.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What payment methods are commonly available with Australian brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Australian brokers typically offer a range of AUD payment options including local bank transfers (BPAY), credit/debit cards, and electronic payment methods like POLi. Some brokers also support international payment methods and multiple currencies. Most Australian brokers process AUD deposits with no fees, though withdrawals may incur charges depending on the method.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start trading with an Australian broker?</CardTitle>
            <CardDescription>Compare the top platforms and open an account in minutes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top Australian Brokers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 