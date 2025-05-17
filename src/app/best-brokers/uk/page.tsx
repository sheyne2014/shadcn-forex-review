import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best UK Brokers 2025 | Top FCA-Regulated Trading Platforms",
  description: "Compare the best brokers for UK traders with strong FCA regulation, competitive fees, and reliable platforms. Expert-reviewed and ranked.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "IG",
    logo: "https://placehold.co/120x60/png?text=IG",
    rating: 4.9,
    minDeposit: "£250",
    spread: "From 0.6 pips",
    platforms: ["IG Platform", "MT4", "ProRealTime"],
    regulation: ["FCA", "ASIC", "BaFin", "FINMA"],
    pros: [
      "Extensive market access",
      "Advanced trading platforms",
      "Strong regulatory protection"
    ],
    cons: [
      "Higher minimum deposit",
      "Complex platform for beginners"
    ],
    url: "/reviews/ig",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 2,
    name: "Hargreaves Lansdown",
    logo: "https://placehold.co/120x60/png?text=Hargreaves",
    rating: 4.8,
    minDeposit: "£100",
    spread: "Commission-based",
    platforms: ["HL Platform"],
    regulation: ["FCA"],
    pros: [
      "Excellent research tools",
      "Wide range of investments",
      "Trusted UK institution"
    ],
    cons: [
      "Higher trading fees",
      "No MT4/MT5 support"
    ],
    url: "/reviews/hargreaves-lansdown",
    features: {
      lowSpread: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 3,
    name: "Pepperstone",
    logo: "https://placehold.co/120x60/png?text=Pepperstone",
    rating: 4.7,
    minDeposit: "£100",
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
    id: 4,
    name: "CMC Markets",
    logo: "https://placehold.co/120x60/png?text=CMC",
    rating: 4.6,
    minDeposit: "£0",
    spread: "From 0.7 pips",
    platforms: ["Next Generation", "MT4"],
    regulation: ["FCA", "ASIC", "MAS"],
    pros: [
      "Award-winning platform",
      "Competitive pricing",
      "No minimum deposit"
    ],
    cons: [
      "Complex platform interface",
      "Limited MT4 integration"
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
    name: "FXCM",
    logo: "https://placehold.co/120x60/png?text=FXCM",
    rating: 4.5,
    minDeposit: "£50",
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
  }
];

export default function BestUKBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers in the UK
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top FCA-regulated UK brokers with competitive fees, excellent trading platforms, and comprehensive tools. All platforms thoroughly tested by our expert team.
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
              UK Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 UK Brokers</h2>
        
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
        <h2 className="text-3xl font-bold mb-8">UK Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank UK Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>We prioritize brokers with strong FCA regulation and customer protection measures.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>All brokers we recommend must be fully regulated by the Financial Conduct Authority (FCA), ensuring they adhere to strict UK financial regulations. We also assess membership in the Financial Services Compensation Scheme (FSCS), which protects client funds up to £85,000.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trading Costs</CardTitle>
              <CardDescription>We analyze the complete cost structure including spreads, commissions, and account fees.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We conduct detailed analyses of each broker's fee structure, including typical spreads on popular currency pairs, commissions, overnight charges, and any additional account fees. Our rankings favor brokers offering competitive and transparent pricing structures.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Capabilities</CardTitle>
              <CardDescription>We evaluate the quality, reliability, and features of trading platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our team tests each platform's execution speed, stability, charting tools, available indicators, and overall user experience. We consider both desktop and mobile platforms, as well as the availability of popular third-party platforms like MetaTrader 4/5.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Research & Education</CardTitle>
              <CardDescription>We assess the quality and depth of market research and educational resources.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Top UK brokers should offer comprehensive educational content for traders of all levels, alongside quality market research, news feeds, and analysis tools. We give higher ratings to brokers that invest in helping clients develop their trading skills.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* UK Regulations Section */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-8">Understanding UK Broker Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Trading with an FCA-regulated broker provides significant protections for UK traders:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Financial Conduct Authority (FCA)</h3>
                <p>The FCA is the primary financial regulatory body in the UK. FCA-regulated brokers must adhere to strict operational, capital, and client money requirements.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Client Money Protection</h3>
                <p>FCA rules require brokers to keep client funds in segregated bank accounts, separate from the company's operational funds, ensuring your money is protected if the broker faces financial difficulties.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Financial Services Compensation Scheme (FSCS)</h3>
                <p>UK traders are protected by the FSCS, which provides compensation of up to £85,000 if an FCA-regulated broker fails financially.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Financial Ombudsman Service</h3>
                <p>UK traders can file complaints with the Financial Ombudsman Service if disputes with FCA-regulated brokers cannot be resolved directly.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* UK Market Insights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">UK Trading Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Trading in Brexit's Aftermath</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Post-Brexit, the UK financial markets have experienced significant changes. Many traders are focusing on GBP pairs and UK stocks, which have shown increased volatility. Look for brokers offering competitive spreads on GBP/USD, GBP/EUR, and FTSE 100 components.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>UK Tax Considerations for Traders</CardTitle>
            </CardHeader>
            <CardContent>
              <p>UK traders should be aware of Capital Gains Tax implications and potential Stamp Duty on certain transactions. Some brokers offer integrated tax reporting features to help with your annual tax return. Consider ISA or SIPP accounts for tax-efficient trading where applicable.</p>
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
                <span className="font-bold">Account Creation:</span> We open real accounts with each broker to evaluate the onboarding process, including KYC procedures and account funding options.
              </li>
              <li>
                <span className="font-bold">Platform Testing:</span> Our team conducts multiple trades on each platform, assessing execution speed, slippage, and overall reliability under various market conditions.
              </li>
              <li>
                <span className="font-bold">Customer Service:</span> We contact each broker's support team through multiple channels to evaluate response times, knowledge, and helpfulness.
              </li>
              <li>
                <span className="font-bold">Regulatory Verification:</span> We verify each broker's regulatory status directly with the FCA and assess their history of compliance.
              </li>
              <li>
                <span className="font-bold">Cost Analysis:</span> We conduct detailed analyses of all trading and non-trading fees, including spread comparisons during different market conditions.
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
              <CardTitle>What is the minimum amount needed to start trading with a UK broker?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Minimum deposits with UK brokers vary significantly. Some brokers like CMC Markets offer accounts with no minimum deposit, while others require £100-£250 to start. For beginners, we recommend starting with at least £200-£500, even with low-minimum brokers, to ensure adequate capital for proper risk management.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Are UK brokers available to international clients?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Most FCA-regulated UK brokers accept international clients through their global entities, though services may differ depending on your location. Some UK brokers have restrictions for clients from certain countries, particularly the US. Always check the broker's terms for your specific country of residence.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How do UK tax rules apply to trading profits?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Trading profits in the UK are typically subject to Capital Gains Tax, with an annual tax-free allowance (£12,300 for the 2021/22 tax year). However, if HMRC determines your trading activity constitutes a business, profits may be subject to Income Tax instead. Consider consulting with a tax professional for personalized advice.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What happens to my funds if a UK broker goes bankrupt?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>FCA-regulated brokers must keep client funds in segregated accounts, separate from the company's operational funds. Additionally, UK traders are protected by the Financial Services Compensation Scheme (FSCS), which covers up to £85,000 per person per firm if an FCA-regulated broker fails.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start trading with a UK broker?</CardTitle>
            <CardDescription>Compare the top platforms and open an account in minutes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top UK Brokers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 