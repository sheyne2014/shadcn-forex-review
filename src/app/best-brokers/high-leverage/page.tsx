import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best High Leverage Brokers 2025 | Top Trading Platforms with Maximum Leverage",
  description: "Compare the best trading platforms offering high leverage for forex, CFDs, and other instruments. Expert-reviewed and ranked for traders seeking greater market exposure.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "ICMarkets",
    logo: "https://placehold.co/120x60/png?text=ICMarkets",
    rating: 4.9,
    minDeposit: "$200",
    maxLeverage: "1:500",
    platforms: ["MT4", "MT5", "cTrader"],
    regulation: ["ASIC", "CySEC", "FSA"],
    pros: [
      "Very high leverage options",
      "Suitable for professional traders",
      "Multiple account types"
    ],
    cons: [
      "Lower leverage for retail EU clients",
      "Limited educational resources",
      "Customer service can be slow"
    ],
    url: "/reviews/ic-markets",
    features: {
      forexLeverage: true,
      cryptoLeverage: true,
      professionalAccounts: true,
      negativeBalanceProtection: true
    }
  },
  {
    id: 2,
    name: "Exness",
    logo: "https://placehold.co/120x60/png?text=Exness",
    rating: 4.8,
    minDeposit: "$1",
    maxLeverage: "1:2000",
    platforms: ["MT4", "MT5"],
    regulation: ["CySEC", "FCA", "FSCA"],
    pros: [
      "Extremely high leverage options",
      "Very low minimum deposit",
      "Fast withdrawal processing"
    ],
    cons: [
      "Limited product range outside forex",
      "Restricted in some countries",
      "Lower leverage for EU clients"
    ],
    url: "/reviews/exness",
    features: {
      forexLeverage: true,
      cryptoLeverage: true,
      professionalAccounts: true,
      negativeBalanceProtection: true
    }
  },
  {
    id: 3,
    name: "FBS",
    logo: "https://placehold.co/120x60/png?text=FBS",
    rating: 4.7,
    minDeposit: "$1",
    maxLeverage: "1:3000",
    platforms: ["MT4", "MT5"],
    regulation: ["CySEC", "ASIC", "IFSC"],
    pros: [
      "Ultra-high leverage options",
      "Micro account with minimal deposit",
      "Good educational content"
    ],
    cons: [
      "Limited product offerings",
      "Less known in Western markets",
      "Mixed customer reviews"
    ],
    url: "/reviews/fbs",
    features: {
      forexLeverage: true,
      cryptoLeverage: false,
      professionalAccounts: true,
      negativeBalanceProtection: false
    }
  },
  {
    id: 4,
    name: "XM",
    logo: "https://placehold.co/120x60/png?text=XM",
    rating: 4.6,
    minDeposit: "$5",
    maxLeverage: "1:1000",
    platforms: ["MT4", "MT5"],
    regulation: ["CySEC", "ASIC", "IFSC"],
    pros: [
      "High leverage across multiple account types",
      "Extensive educational resources",
      "Multilingual customer support"
    ],
    cons: [
      "Limited cryptocurrency options",
      "Withdrawal fees for some methods",
      "No proprietary platform"
    ],
    url: "/reviews/xm",
    features: {
      forexLeverage: true,
      cryptoLeverage: false,
      professionalAccounts: true,
      negativeBalanceProtection: true
    }
  },
  {
    id: 5,
    name: "FxPro",
    logo: "https://placehold.co/120x60/png?text=FxPro",
    rating: 4.5,
    minDeposit: "$100",
    maxLeverage: "1:500",
    platforms: ["MT4", "MT5", "cTrader", "FxPro Edge"],
    regulation: ["FCA", "CySEC", "FSCA", "SCB"],
    pros: [
      "Solid high leverage offerings",
      "Strong regulatory framework",
      "Proprietary platform option"
    ],
    cons: [
      "Higher minimum deposit than competitors",
      "EU restrictions apply",
      "Variable spreads can widen during volatility"
    ],
    url: "/reviews/fxpro",
    features: {
      forexLeverage: true,
      cryptoLeverage: true,
      professionalAccounts: true,
      negativeBalanceProtection: true
    }
  }
];

export default function BestHighLeverageBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best High Leverage Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top trading platforms offering maximum leverage on forex, CFDs, and other instruments. All brokers thoroughly tested for risk management tools and trading conditions.
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
          <Link href="#features">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Key Features
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Brokers with Highest Leverage</h2>
        
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
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Max Leverage</h4>
                          <p className="font-medium">{broker.maxLeverage}</p>
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
                          <h4 className="text-sm font-medium text-center mb-2">High Forex Leverage</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.forexLeverage ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.forexLeverage ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Crypto Leverage</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.cryptoLeverage ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.cryptoLeverage ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Pro Accounts</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.professionalAccounts ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.professionalAccounts ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Negative Balance Protection</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.negativeBalanceProtection ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.negativeBalanceProtection ? '✓' : '✗'}
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
        <h2 className="text-3xl font-bold mb-8">High Leverage Broker Comparison</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Broker</TableHead>
                <TableHead>Min. Deposit</TableHead>
                <TableHead>Max Leverage</TableHead>
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
                  <TableCell>{broker.maxLeverage}</TableCell>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank High Leverage Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Leverage Options</CardTitle>
              <CardDescription>We evaluate maximum leverage across different instruments.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We thoroughly assess leverage offerings across various asset classes, particularly forex, indices, commodities, and cryptocurrencies. Our evaluation considers both the headline maximum leverage and the specific leverage available for popular trading instruments. We also examine whether high leverage is consistently available or restricted to specific account types, and we verify that advertised leverage matches actual trading conditions.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Risk Management Tools</CardTitle>
              <CardDescription>We assess features that help control leverage risks.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>High leverage amplifies both profits and losses, making risk management critical. We evaluate brokers based on the quality of their risk management features, including guaranteed stop losses, negative balance protection, margin calculators, and automated risk monitoring systems. Brokers that combine high leverage with robust risk management tools score higher in our rankings than those offering high leverage without adequate safeguards.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>We verify how brokers navigate leverage regulations.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Many jurisdictions impose leverage restrictions (e.g., 1:30 in the EU, 1:50 in the US). We assess how transparently brokers communicate these restrictions and what options they offer for traders seeking higher leverage. This includes evaluating professional client classification processes, offshore entity structures, and whether the broker maintains consistent standards across all regulatory domains.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trading Conditions</CardTitle>
              <CardDescription>We examine margin requirements, liquidation practices, and costs.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Beyond maximum leverage figures, we evaluate the practical aspects of leveraged trading. This includes assessing margin call procedures, liquidation thresholds, weekend margin requirements, and whether spreads or commissions increase with higher leverage. We also test how reliably the platform performs during high volatility when leveraged positions are most vulnerable.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="mb-16" id="features">
        <h2 className="text-3xl font-bold mb-8">Key Leverage Features to Consider</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">When evaluating brokers for high leverage trading, pay attention to these important factors:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Instrument-Specific Leverage</h3>
                <p>Maximum leverage often varies significantly between different asset classes. A broker advertising 1:500 leverage might only offer this on major forex pairs, with substantially lower leverage on exotic pairs, indices, commodities, and especially cryptocurrencies. Evaluate the specific leverage available for the instruments you actually trade rather than focusing solely on the headline maximum figure.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Negative Balance Protection</h3>
                <p>This critical safety feature ensures you cannot lose more than your account balance, even during extreme market events when prices gap beyond stop-loss levels. Without negative balance protection, high leverage trading can expose you to potentially unlimited losses. While reputable brokers generally offer this protection, the specific implementation and limitations vary, so review the exact terms carefully.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Dynamic Leverage Conditions</h3>
                <p>Many brokers implement tiered leverage systems where available leverage decreases as position size increases, or during weekends and market events when volatility is expected. Understanding these dynamic conditions is essential for proper risk management. Look for brokers with transparent policies and preferably automated notifications when leverage changes are imminent.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Professional Client Classification</h3>
                <p>In regions with regulatory leverage caps (like the EU's 1:30 limit under ESMA rules), brokers may offer higher leverage to traders who qualify as "professional clients." Evaluate the requirements for this classification, which typically involve demonstrating trading experience, portfolio size, and financial industry knowledge. Consider whether the benefits of higher leverage outweigh the reduced investor protections that come with professional status.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Understanding Leverage Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Understanding Trading Leverage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Calculating Leverage Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Understanding the relationship between leverage and risk is crucial. With 1:100 leverage, a mere 1% price movement against your position can wipe out your entire margin. For example, if you invest $1,000 with 1:100 leverage to control a $100,000 position in EUR/USD, a 100-pip movement (roughly 1%) represents a $1,000 gain or loss—your entire initial investment. Experienced traders rarely use maximum available leverage, instead sizing positions based on strict risk management rules, typically risking no more than 1-2% of their account on any single trade regardless of available leverage.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Perspective</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Regulatory bodies worldwide have increasingly restricted maximum leverage due to the high percentage of retail traders who lose money with excessive leverage. The European Securities and Markets Authority (ESMA) limits retail leverage to 1:30 for major forex pairs and even lower for other instruments, while Australia caps it at 1:30, and the US at 1:50. Brokers offering significantly higher leverage typically operate through entities regulated in jurisdictions with lighter oversight, such as the Seychelles, Vanuatu, or Saint Vincent. When choosing an offshore broker for higher leverage, carefully assess its reputation, operating history, and whether it voluntarily implements safeguards like segregated client funds.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Methodology Section */}
      <section className="mb-16" id="methodology">
        <h2 className="text-3xl font-bold mb-8">Our Testing Methodology</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Our evaluations of high leverage brokers involve comprehensive testing protocols:</p>
            
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <span className="font-bold">Leverage Verification:</span> We open accounts and verify the actual leverage available across different instruments and account sizes, comparing it to advertised maximum leverage. We test whether temporary leverage increases during promotions are implemented as promised.
              </li>
              <li>
                <span className="font-bold">Margin Call Simulation:</span> We intentionally allow positions to approach margin call levels to evaluate the notification process, time given to respond, and whether the platform's margin call and liquidation procedures match their documented policies.
              </li>
              <li>
                <span className="font-bold">Market Gap Testing:</span> Using historical data from major market events, we simulate how the broker's systems would handle leveraged positions during significant price gaps, assessing stop-loss reliability and negative balance protection effectiveness.
              </li>
              <li>
                <span className="font-bold">Professional Client Process:</span> Where applicable, we evaluate the process for attaining professional client status, including documentation requirements, response times, and whether the promised higher leverage is actually applied once approved.
              </li>
              <li>
                <span className="font-bold">Cross-Platform Consistency:</span> We verify that leverage settings are consistently applied across all platform options (desktop, web, mobile) and that changes to leverage settings in one platform are properly synchronized across all trading interfaces.
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
              <CardTitle>Is maximum leverage always the best option for traders?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No, maximum leverage is rarely the optimal choice for most traders. While brokers advertise high leverage as a benefit, professional traders typically use much lower leverage than what's available. Using full leverage significantly increases risk of account depletion during normal market fluctuations. For example, with 1:500 leverage, a mere 0.2% adverse price movement would trigger a margin call. Most successful traders use leverage conservatively, often keeping effective leverage below 1:10 regardless of what's available. Higher leverage should be viewed as providing flexibility for specific strategies rather than as a standard approach. The ideal leverage depends on your strategy, risk tolerance, and experience level—typically, the less experienced you are, the lower your leverage should be.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How does negative balance protection work with high leverage?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Negative balance protection is particularly critical when trading with high leverage, as it prevents you from losing more than your deposited funds. Without this protection, extreme market events can create losses exceeding your account balance, leaving you in debt to the broker. The protection works by automatically closing all positions when your equity approaches zero. However, implementation varies between brokers: some guarantee zero balance in all scenarios, while others offer "best effort" protection with exceptions. During extreme market volatility or flash crashes, prices can gap beyond stop-loss orders, potentially causing losses before the system can close positions. With reputable brokers offering true negative balance protection, any negative balance resulting from such events will be reset to zero, effectively having the broker absorb the excess loss.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What's the difference between leverage in regulated vs. offshore brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The primary difference lies in maximum allowed leverage and associated consumer protections. Strictly regulated brokers in jurisdictions like the EU, UK, Australia, and US must adhere to leverage caps (typically 1:30 for major forex pairs for retail clients), but offer stronger investor protection including compensation schemes, strict capital requirements, and regular audits. Offshore brokers operating under less stringent regulators can offer much higher leverage (1:500, 1:1000, or even 1:3000), but typically with fewer protections. When choosing an offshore broker for higher leverage, examine their operational history, reputation, and voluntary safeguards like audited accounts and fund segregation. Some reputable brokers maintain both highly-regulated entities with lower leverage and offshore entities with higher leverage, applying consistent operational standards across both. Professional traders often split funds between regulated brokers for security and offshore brokers for specific high-leverage strategies.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How do margin requirements change across different markets?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Margin requirements vary significantly across asset classes due to differences in underlying volatility and liquidity. Major forex pairs typically offer the highest leverage (up to 1:500 or more with some brokers) due to their high liquidity and relatively low volatility. Minor and exotic forex pairs usually have lower maximum leverage due to wider spreads and higher volatility. Indices and commodities generally have moderate leverage caps, often 1:100-1:200 with offshore brokers or 1:10-1:20 with regulated entities. Cryptocurrencies, being the most volatile major asset class, have the lowest leverage limits, typically 1:2-1:20 even with offshore brokers. Additionally, many brokers implement dynamic margin requirements that automatically reduce available leverage during market closures (weekends), before major economic announcements, or when position sizes exceed certain thresholds. Understanding these varying requirements is essential for proper position sizing across a diversified portfolio.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to amplify your trading power?</CardTitle>
            <CardDescription>Compare top high-leverage brokers and maximize your market exposure.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top High Leverage Brokers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 