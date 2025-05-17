import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Canadian Brokers 2025 | Top IIROC-Regulated Trading Platforms",
  description: "Compare the best brokers for Canadian traders with strong regulation, competitive fees, and reliable platforms. Expert-reviewed and ranked.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "Questrade",
    logo: "https://placehold.co/120x60/png?text=Questrade",
    rating: 4.9,
    minDeposit: "CA$1,000",
    spread: "Commission-based",
    platforms: ["Questrade IQ", "Questrade Web", "Questrade Mobile"],
    regulation: ["IIROC", "CIPF"],
    pros: [
      "Low fee structure",
      "Excellent desktop and mobile platforms",
      "Strong IIROC regulation"
    ],
    cons: [
      "Higher minimum deposit",
      "ECN fees apply to some transactions"
    ],
    url: "/reviews/questrade",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 2,
    name: "TD Direct Investing",
    logo: "https://placehold.co/120x60/png?text=TD",
    rating: 4.8,
    minDeposit: "CA$0",
    spread: "Commission-based",
    platforms: ["WebBroker", "Advanced Dashboard", "TD Mobile"],
    regulation: ["IIROC", "CIPF"],
    pros: [
      "Integration with banking services",
      "Advanced research tools",
      "No minimum deposit"
    ],
    cons: [
      "Higher trading fees",
      "Platform can be complex for beginners"
    ],
    url: "/reviews/td-direct-investing",
    features: {
      lowSpread: false,
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
    minDeposit: "CA$0",
    spread: "Commission-based",
    platforms: ["TWS", "IBKR Mobile", "Client Portal"],
    regulation: ["IIROC", "CIPF", "SEC", "FCA"],
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
    name: "Wealthsimple Trade",
    logo: "https://placehold.co/120x60/png?text=Wealthsimple",
    rating: 4.6,
    minDeposit: "CA$0",
    spread: "Commission-free",
    platforms: ["Wealthsimple Web", "Wealthsimple Mobile"],
    regulation: ["IIROC", "CIPF"],
    pros: [
      "Commission-free trading",
      "User-friendly interface",
      "No minimum deposit"
    ],
    cons: [
      "Limited investment options",
      "Basic research tools",
      "Currency conversion fees"
    ],
    url: "/reviews/wealthsimple-trade",
    features: {
      lowSpread: true,
      fastExecution: false,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 5,
    name: "RBC Direct Investing",
    logo: "https://placehold.co/120x60/png?text=RBC",
    rating: 4.5,
    minDeposit: "CA$0",
    spread: "Commission-based",
    platforms: ["RBC DI Online", "RBC Mobile"],
    regulation: ["IIROC", "CIPF"],
    pros: [
      "Integration with banking services",
      "Comprehensive research tools",
      "Reliable customer support"
    ],
    cons: [
      "Higher trading fees",
      "Limited international market access"
    ],
    url: "/reviews/rbc-direct-investing",
    features: {
      lowSpread: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestCanadaBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers in Canada
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top IIROC-regulated Canadian brokers with competitive fees, excellent trading platforms, and comprehensive tools. All platforms thoroughly tested by our expert team.
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
              Canadian Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Canadian Brokers</h2>
        
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
        <h2 className="text-3xl font-bold mb-8">Canadian Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank Canadian Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>We prioritize brokers with strong IIROC regulation and CIPF protection.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>All brokers we recommend must be fully regulated by the Investment Industry Regulatory Organization of Canada (IIROC), ensuring they adhere to strict Canadian financial regulations. We also assess membership in the Canadian Investor Protection Fund (CIPF), which protects client assets up to CA$1 million.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trading Costs</CardTitle>
              <CardDescription>We analyze the complete cost structure including commissions and account fees.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We conduct detailed analyses of each broker's fee structure, including commission rates, foreign exchange fees, ECN fees, account maintenance fees, and inactivity charges. Our rankings favor brokers offering competitive and transparent pricing structures suitable for Canadian traders.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Capabilities</CardTitle>
              <CardDescription>We evaluate the quality, reliability, and features of trading platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our team tests each platform's execution speed, stability, charting tools, available indicators, and overall user experience. We consider both desktop and mobile platforms, as well as the availability of advanced trading tools and customization options.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Canadian Market Access</CardTitle>
              <CardDescription>We assess access to TSX, TSX Venture, and international markets.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Top Canadian brokers should provide comprehensive access to domestic exchanges like the Toronto Stock Exchange (TSX) and TSX Venture Exchange, as well as major U.S. and international markets. We evaluate the range of available instruments, including stocks, ETFs, options, and fixed income securities.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Canadian Regulations Section */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-8">Understanding Canadian Broker Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Trading with an IIROC-regulated broker provides significant protections for Canadian traders:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Investment Industry Regulatory Organization of Canada (IIROC)</h3>
                <p>IIROC is the national self-regulatory organization that oversees investment dealers and trading activity in Canada. IIROC-regulated brokers must meet strict capital requirements, comply with extensive rules and regulations, and undergo regular audits.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Canadian Investor Protection Fund (CIPF)</h3>
                <p>CIPF provides protection for client assets held by IIROC member firms in case of insolvency or bankruptcy. Coverage includes up to CA$1 million for combined general and separate accounts, providing an important safety net for Canadian investors.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Provincial Securities Commissions</h3>
                <p>Securities regulation in Canada is managed at the provincial level. Key authorities include the Ontario Securities Commission (OSC), British Columbia Securities Commission (BCSC), and Autorité des marchés financiers (AMF) in Quebec. These commissions work alongside IIROC to ensure market integrity.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Client Relationship Model (CRM2)</h3>
                <p>Canadian brokers must adhere to CRM2 requirements, which mandate enhanced transparency around fees, performance reporting, and potential conflicts of interest. This framework helps ensure Canadian investors receive clear information about their investments.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Canadian Market Insights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Canadian Trading Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Resource-Focused Markets</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Canadian markets have a strong focus on natural resources, with significant representation from energy, mining, and forestry sectors. Traders interested in commodities should look for brokers offering comprehensive access to resource stocks on the TSX and TSX Venture Exchange, as well as related ETFs and futures products.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Considerations for Canadian Traders</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Canadian investors should be aware of the benefits of tax-advantaged accounts like Tax-Free Savings Accounts (TFSAs) and Registered Retirement Savings Plans (RRSPs). Quality brokers offer these registered account options with appropriate reporting. Also consider foreign withholding taxes when trading U.S. securities and the implications of currency conversion costs.</p>
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
                <span className="font-bold">Account Creation:</span> We open real accounts with each broker to evaluate the onboarding process, including identity verification procedures and funding options specific to Canadian residents.
              </li>
              <li>
                <span className="font-bold">Platform Testing:</span> Our team conducts multiple trades on each platform, with a focus on Canadian securities and during North American market hours, to assess execution speed, slippage, and overall reliability.
              </li>
              <li>
                <span className="font-bold">Customer Service:</span> We contact each broker's support team through multiple channels, including phone support with Canadian toll-free numbers where available, to evaluate response times, knowledge, and helpfulness.
              </li>
              <li>
                <span className="font-bold">Regulatory Verification:</span> We verify each broker's regulatory status directly with IIROC and assess their compliance history and standing within Canadian regulatory frameworks.
              </li>
              <li>
                <span className="font-bold">Cost Analysis:</span> We conduct detailed analyses of all trading and non-trading fees relevant to Canadian traders, including currency conversion costs for trading on foreign markets.
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
              <CardTitle>What is the difference between a discount broker and a full-service broker in Canada?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Canadian discount brokers like Questrade and Wealthsimple Trade offer self-directed trading with lower commissions but minimal personalized advice. Full-service brokers like those offered by major banks provide investment advice, financial planning, and portfolio management, but typically charge higher fees. For active traders comfortable making their own decisions, discount brokers usually offer better value.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Should I use a TFSA or RRSP for trading in Canada?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Both account types offer tax advantages, but with different benefits. TFSAs provide tax-free growth and withdrawals with no tax implications, making them ideal for shorter-term goals. RRSPs offer tax deductions on contributions but tax withdrawals as income, making them better suited for retirement. For active trading, TFSAs may be preferable due to their flexibility, but contribution limits are lower than RRSPs.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How do currency conversion fees affect Canadian traders?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>When trading U.S. or international securities, Canadian brokers typically charge currency conversion fees ranging from 1.5% to 2.5% each way. These costs can significantly impact returns, especially for frequent traders. Some brokers offer U.S. dollar accounts that allow you to hold USD, avoiding repeated conversions. Norbert's Gambit is another technique some traders use to reduce conversion costs for larger amounts.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Are there tax implications for trading U.S. stocks as a Canadian resident?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Canadian residents trading U.S. stocks face a 15% withholding tax on dividends (reduced from 30% due to the Canada-U.S. tax treaty). This withholding tax doesn't apply to stocks held in RRSPs but does affect TFSAs. Additionally, Canadian traders must report all worldwide income, including capital gains from foreign stocks, on their Canadian tax returns, though foreign tax credits may be available to avoid double taxation.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start trading with a Canadian broker?</CardTitle>
            <CardDescription>Compare the top platforms and open an account in minutes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top Canadian Brokers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 