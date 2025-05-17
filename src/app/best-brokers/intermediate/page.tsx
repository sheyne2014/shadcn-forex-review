import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Brokers for Intermediate Traders 2025 | Top Trading Platforms",
  description: "Compare the best trading platforms for intermediate traders with advanced charting tools, multiple asset classes, and competitive fees. Expert-reviewed and ranked.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.9,
    minDeposit: "$0",
    spread: "Commission-based",
    platforms: ["TWS", "IBKR Mobile", "Client Portal"],
    regulation: ["SEC", "FCA", "ASIC", "MAS"],
    pros: [
      "Extensive market access",
      "Advanced trading tools",
      "Competitive fees"
    ],
    cons: [
      "Complex platform interface",
      "Steep learning curve",
      "Inactivity fees may apply"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      advancedCharts: true,
      apiAccess: true,
      multipleAssets: true,
      advancedOrder: true
    }
  },
  {
    id: 2,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD",
    rating: 4.8,
    minDeposit: "$0",
    spread: "Commission-based",
    platforms: ["thinkorswim", "TD Ameritrade Mobile"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Powerful thinkorswim platform",
      "Extensive research tools",
      "Comprehensive educational resources"
    ],
    cons: [
      "Higher options contract fees",
      "Limited international market access",
      "US-focused"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      advancedCharts: true,
      apiAccess: true,
      multipleAssets: true,
      advancedOrder: true
    }
  },
  {
    id: 3,
    name: "Saxo Markets",
    logo: "https://placehold.co/120x60/png?text=Saxo",
    rating: 4.7,
    minDeposit: "$2,000",
    spread: "From 0.6 pips",
    platforms: ["SaxoTraderGO", "SaxoTraderPRO"],
    regulation: ["FCA", "MAS", "ASIC", "JFSA"],
    pros: [
      "Extensive product range",
      "Advanced charting capabilities",
      "Quality research"
    ],
    cons: [
      "Higher minimum deposit",
      "Premium pricing structure",
      "Complex fee structure"
    ],
    url: "/reviews/saxo-markets",
    features: {
      advancedCharts: true,
      apiAccess: true,
      multipleAssets: true,
      advancedOrder: true
    }
  },
  {
    id: 4,
    name: "IG",
    logo: "https://placehold.co/120x60/png?text=IG",
    rating: 4.6,
    minDeposit: "$250",
    spread: "From 0.6 pips",
    platforms: ["IG Platform", "ProRealTime", "MT4"],
    regulation: ["FCA", "ASIC", "FSCA", "MAS"],
    pros: [
      "Extensive range of markets",
      "ProRealTime platform integration",
      "Strong regulatory framework"
    ],
    cons: [
      "Higher spreads in some markets",
      "Complex account types",
      "Platform can be overwhelming"
    ],
    url: "/reviews/ig",
    features: {
      advancedCharts: true,
      apiAccess: true,
      multipleAssets: true,
      advancedOrder: true
    }
  },
  {
    id: 5,
    name: "TradeStation",
    logo: "https://placehold.co/120x60/png?text=TradeStation",
    rating: 4.5,
    minDeposit: "$0",
    spread: "Commission-based",
    platforms: ["TradeStation Desktop", "TradeStation Web", "TradeStation Mobile"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Advanced charting and analysis",
      "Strategy testing tools",
      "Extensive historical data"
    ],
    cons: [
      "Pricing can be complex",
      "Steep learning curve",
      "Limited international market access"
    ],
    url: "/reviews/tradestation",
    features: {
      advancedCharts: true,
      apiAccess: true,
      multipleAssets: true,
      advancedOrder: true
    }
  }
];

export default function BestIntermediateBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers for Intermediate Traders
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top trading platforms for experienced traders with advanced charting tools, multiple asset classes, and competitive fees. All platforms thoroughly tested by our expert team.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Brokers for Intermediate Traders</h2>
        
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
                          <h4 className="text-sm font-medium text-center mb-2">Advanced Charts</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.advancedCharts ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.advancedCharts ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">API Access</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.apiAccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.apiAccess ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Multiple Assets</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.multipleAssets ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.multipleAssets ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Advanced Orders</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.advancedOrder ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.advancedOrder ? '✓' : '✗'}
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
        <h2 className="text-3xl font-bold mb-8">Intermediate Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank Brokers for Intermediate Traders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Trading Tools</CardTitle>
              <CardDescription>We prioritize brokers with comprehensive technical analysis and trade management features.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Intermediate traders require more sophisticated tools than beginners. We evaluate the depth of technical analysis features, including customizable charts, advanced indicator options, drawing tools, and pattern recognition capabilities. We also assess trade management tools such as OCO orders, trailing stops, and automated trade execution options.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Customization</CardTitle>
              <CardDescription>We evaluate the flexibility and adaptability of trading platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>As traders develop their own strategies, platform customization becomes increasingly important. We assess how extensively traders can personalize the trading environment, including workspace layouts, chart settings, hotkeys, alerts, and automated trading capabilities. Platforms that offer both simplicity and depth score highest.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Market Access</CardTitle>
              <CardDescription>We assess the range of tradable assets and market access options.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Intermediate traders often diversify across multiple asset classes and markets. We evaluate brokers based on the breadth of instruments available, including stocks, options, futures, forex, bonds, and international markets. We also consider the depth within each asset class, such as the number of available forex pairs or option contracts.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Execution Quality</CardTitle>
              <CardDescription>We measure order execution speed, slippage, and reliability.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>For intermediate traders, high-quality trade execution becomes critical. We conduct extensive testing to measure execution speeds, assess slippage under different market conditions, and evaluate fill quality. We also consider advanced routing options, execution algorithms, and the availability of direct market access (DMA) where relevant.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="mb-16" id="features">
        <h2 className="text-3xl font-bold mb-8">Key Features for Intermediate Traders</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">When choosing a broker as an intermediate trader, these features deserve special attention:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Advanced Order Types</h3>
                <p>Intermediate traders benefit from complex order types beyond basic market and limit orders. Look for platforms offering OCO (One-Cancels-Other) orders, trailing stops, conditional orders, and time-based orders. These tools enable more sophisticated risk management strategies and can automate aspects of your trading plan.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Technical Analysis Capabilities</h3>
                <p>Comprehensive charting with multiple timeframes, dozens of technical indicators, drawing tools, and pattern recognition features are essential for intermediate traders developing their technical analysis skills. The ability to save chart templates, create custom indicators, and access historical data for backtesting is also valuable.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">API Access</h3>
                <p>As traders progress, many want to implement custom trading algorithms or connect third-party analysis tools. Brokers offering robust API access allow for custom solution development, algorithmic trading implementation, and integration with specialized software. Documentation quality and developer support are important considerations.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Multi-Device Synchronization</h3>
                <p>Intermediate traders typically use multiple devices and need seamless transitions between desktop, web, and mobile platforms. Look for brokers that offer consistent experiences across devices with synchronized watchlists, alerts, and account information. The ability to start analysis on one device and continue on another becomes increasingly valuable.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Strategy Development Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Strategy Development for Intermediate Traders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Backtesting Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p>At the intermediate level, developing and testing trading strategies becomes crucial. Look for brokers offering robust backtesting tools that allow you to apply your strategies to historical data. Quality platforms provide performance metrics, customizable testing parameters, and visualization tools to help refine your approach before risking real capital.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Risk Management Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p>As your trading becomes more sophisticated, so should your risk management. The best platforms for intermediate traders offer portfolio-level risk analysis, correlation monitoring, and scenario testing. Features like maximum drawdown calculators, risk-to-reward visualization, and volatility indicators help maintain disciplined trading as your strategy evolves.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Methodology Section */}
      <section className="mb-16" id="methodology">
        <h2 className="text-3xl font-bold mb-8">Our Testing Methodology</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Our broker evaluations for intermediate traders involve advanced testing protocols:</p>
            
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <span className="font-bold">Technical Analysis Depth:</span> We assess each platform's technical analysis capabilities by creating complex multi-indicator setups, testing custom indicators, and evaluating chart responsiveness with large datasets.
              </li>
              <li>
                <span className="font-bold">Execution Quality Measurement:</span> We conduct hundreds of trades across different market conditions, measuring execution speed, slippage, and reliability. We pay particular attention to performance during high volatility and news events.
              </li>
              <li>
                <span className="font-bold">API Functionality:</span> Our developers test each broker's API capabilities by building simple trading algorithms and data integration tools, evaluating documentation quality, rate limits, and support responsiveness.
              </li>
              <li>
                <span className="font-bold">Multi-Asset Trading:</span> We evaluate the platform's capabilities across various asset classes, assessing the consistency of the trading experience, order types available, and any limitations specific to certain markets.
              </li>
              <li>
                <span className="font-bold">Cost Structure Analysis:</span> We analyze total trading costs for typical intermediate trading patterns, including active day trading, swing trading, and multi-asset portfolios. We factor in all fees including commissions, spreads, overnight charges, and platform fees.
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
              <CardTitle>How important is API access for intermediate traders?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>API access becomes increasingly valuable as you advance from beginner to intermediate level. Even if you don't currently use algorithmic trading, having API capabilities provides flexibility as your skills grow. APIs allow you to build custom analytics, automate routine tasks, implement trading signals from external sources, and eventually develop algorithmic strategies. If you have programming skills or plan to work with a developer, prioritize brokers with well-documented, stable APIs and strong developer support.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Should intermediate traders prioritize lower costs or better tools?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>At the intermediate level, the right balance depends on your trading style. If you're an active trader making numerous trades daily, cost efficiency should be a primary concern as fees can significantly impact profitability. However, if you make fewer, more calculated trades based on technical analysis or specific setups, investing in superior tools that improve your analysis and execution quality may provide better returns than saving on commissions. Many traders find that a middle-ground approach works best—seeking a broker with competitive fees and strong analytical capabilities.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How should intermediate traders approach multi-asset trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>As an intermediate trader, expanding to multiple asset classes can provide diversification and new opportunities, but should be approached methodically. Start by mastering one additional asset class before adding more. Understand the unique characteristics, trading hours, and risk profiles of each market. Consider using a broker that offers uniform trading interfaces across different assets to minimize learning curves. Pay attention to margin requirements and regulatory differences between asset classes, and be aware that optimal trading strategies often differ significantly between markets like forex, options, and futures.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What advanced order types are most useful for intermediate traders?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Beyond basic market and limit orders, several advanced order types become valuable as you progress. Trailing stops automatically adjust your stop loss as the price moves in your favor, helping to protect profits while letting winners run. OCO (One-Cancels-Other) orders allow you to set both take-profit and stop-loss levels simultaneously. Bracket orders combine entry orders with predefined profit targets and stop losses. Conditional orders that trigger based on technical indicators or price action in related securities enable more sophisticated strategies. Experimenting with these order types in a demo account before implementing them in live trading is highly recommended.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to elevate your trading capabilities?</CardTitle>
            <CardDescription>Compare the top platforms for intermediate traders and take your trading to the next level.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top Brokers for Intermediate Traders
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 