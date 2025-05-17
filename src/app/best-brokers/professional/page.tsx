import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Brokers for Professional Traders 2025 | Top Institutional-Grade Platforms",
  description: "Compare the best trading platforms for professional traders with direct market access, institutional-grade tools, and ultra-low latency execution. Expert-reviewed and ranked.",
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
    platforms: ["TWS", "IBKR API", "IB Gateway"],
    regulation: ["SEC", "FCA", "ASIC", "MAS"],
    pros: [
      "Institutional-grade execution",
      "Direct market access to 135+ markets",
      "Advanced FIX API integration"
    ],
    cons: [
      "Complex platform interface",
      "Technical customer support",
      "High learning curve"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      directMarketAccess: true,
      fixApi: true,
      colocation: true,
      lowCommissions: true
    }
  },
  {
    id: 2,
    name: "Centerpoint Securities",
    logo: "https://placehold.co/120x60/png?text=Centerpoint",
    rating: 4.8,
    minDeposit: "$30,000",
    spread: "Commission-based",
    platforms: ["Sterling Trader Pro", "DAS Trader", "FIX API"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Superior order routing",
      "Extensive locate inventory for short selling",
      "Professional trading platform integrations"
    ],
    cons: [
      "High minimum deposit",
      "Expensive platform fees",
      "Limited international market access"
    ],
    url: "/reviews/centerpoint-securities",
    features: {
      directMarketAccess: true,
      fixApi: true,
      colocation: true,
      lowCommissions: false
    }
  },
  {
    id: 3,
    name: "Lightspeed",
    logo: "https://placehold.co/120x60/png?text=Lightspeed",
    rating: 4.7,
    minDeposit: "$25,000",
    spread: "Commission-based",
    platforms: ["Lightspeed Trader", "Sterling", "Livevol X"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Ultra-low latency execution",
      "Robust options analytics",
      "Advanced routing capabilities"
    ],
    cons: [
      "High account minimum",
      "Complex fee structure",
      "Limited research tools"
    ],
    url: "/reviews/lightspeed",
    features: {
      directMarketAccess: true,
      fixApi: true,
      colocation: true,
      lowCommissions: false
    }
  },
  {
    id: 4,
    name: "Saxo Bank",
    logo: "https://placehold.co/120x60/png?text=Saxo",
    rating: 4.6,
    minDeposit: "$10,000",
    spread: "From 0.4 pips",
    platforms: ["SaxoTraderPRO", "FIX API", "SaxoTraderGO"],
    regulation: ["FCA", "MAS", "ASIC", "FINMA"],
    pros: [
      "Multi-asset institutional trading",
      "Advanced portfolio analysis",
      "Global market access"
    ],
    cons: [
      "High minimum deposit",
      "Premium pricing",
      "Limited DMA for some assets"
    ],
    url: "/reviews/saxo-bank",
    features: {
      directMarketAccess: true,
      fixApi: true,
      colocation: false,
      lowCommissions: false
    }
  },
  {
    id: 5,
    name: "TradeStation",
    logo: "https://placehold.co/120x60/png?text=TradeStation",
    rating: 4.5,
    minDeposit: "$2,000",
    spread: "Commission-based",
    platforms: ["TradeStation Desktop", "API", "Web Trading"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Advanced order execution",
      "Sophisticated strategy development",
      "Quality historical data"
    ],
    cons: [
      "Higher pricing for less active traders",
      "Complex platform for beginners",
      "Limited international offerings"
    ],
    url: "/reviews/tradestation",
    features: {
      directMarketAccess: true,
      fixApi: true,
      colocation: false,
      lowCommissions: true
    }
  }
];

export default function BestProfessionalBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers for Professional Traders
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top trading platforms for professional traders with direct market access, institutional-grade tools, and ultra-low latency execution. All platforms thoroughly tested by our expert team.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Brokers for Professional Traders</h2>
        
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
                          <h4 className="text-sm font-medium text-center mb-2">Direct Market Access</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.directMarketAccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.directMarketAccess ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">FIX API</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.fixApi ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.fixApi ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Colocation</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.colocation ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.colocation ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Low Commissions</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.lowCommissions ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.lowCommissions ? '✓' : '✗'}
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
        <h2 className="text-3xl font-bold mb-8">Professional Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank Brokers for Professional Traders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Execution Quality</CardTitle>
              <CardDescription>We measure latency, slippage, and market access capabilities.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>For professional traders, microseconds matter. We conduct extensive latency testing across various market conditions and order sizes, measuring execution from order submission to fill confirmation. We evaluate smart order routing capabilities, venue-specific execution quality, and the availability of direct market access (DMA). We prioritize brokers that provide transparent execution statistics and routing control.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API & Integration</CardTitle>
              <CardDescription>We evaluate FIX protocol support, documentation, and third-party compatibility.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Professional trading often requires programmatic access and integration with proprietary systems. We thoroughly test each broker's API capabilities, assessing FIX protocol implementation, REST API functionality, documentation quality, rate limits, and reliability. We prioritize brokers that provide comprehensive endpoints, stable connections, and robust developer support.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Institutional Infrastructure</CardTitle>
              <CardDescription>We assess colocation services, dedicated support, and enterprise-grade features.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Professional traders require enterprise-level infrastructure. We evaluate the availability of colocation services, dedicated connectivity options (leased lines, VPN), disaster recovery protocols, and multi-account management capabilities. We also assess dedicated institutional support teams, account manager expertise, and the broker's ability to accommodate custom requests.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cost Structure</CardTitle>
              <CardDescription>We analyze tiered pricing, exchange fee pass-through, and volume rebates.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Professional trading volumes demand sophisticated pricing models. We examine tiered commission structures, exchange fee pass-through policies, ECN rebate programs, and margin rates for different account sizes. We consider minimum monthly activity requirements, platform fees, data charges, and API access costs to calculate the true total cost of ownership for different trading profiles.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="mb-16" id="features">
        <h2 className="text-3xl font-bold mb-8">Key Features for Professional Traders</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">When choosing a broker as a professional trader, these institutional-grade features are essential:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Direct Market Access (DMA)</h3>
                <p>Professional traders require unfiltered access to market liquidity and order books. True DMA allows you to route orders directly to specific exchanges, ECNs, or dark pools without intermediary handling. This provides complete control over execution, potential for price improvement, and transparency regarding how your orders interact with the market. Look for brokers offering detailed venue selection, order book visibility, and the ability to use exchange-specific order types.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">FIX Protocol Implementation</h3>
                <p>The Financial Information eXchange (FIX) protocol is the industry standard for institutional trading. Professional platforms should offer robust FIX API access with complete order management capabilities, market data streaming, and account information. Evaluate the quality of FIX implementation by assessing connection stability, message throughput capacity, latency characteristics, and support for advanced order types. The best brokers provide comprehensive documentation, testing environments, and technical support for FIX integration.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Colocation & Network Optimization</h3>
                <p>For latency-sensitive strategies, physical proximity to exchange matching engines provides critical advantages. Evaluate brokers offering colocation services in key data centers, cross-connects to major exchanges, and optimized network routes. Consider the availability of dedicated infrastructure, guaranteed bandwidth, and detailed latency statistics. Some brokers also offer virtualized solutions that provide many colocation benefits without requiring physical hardware.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Portfolio Margining</h3>
                <p>Sophisticated risk-based margin models can significantly enhance capital efficiency for multi-asset strategies. Look for brokers offering true portfolio margining that calculates requirements based on overall portfolio risk rather than position-by-position. This approach recognizes hedged positions and correlations between instruments, often reducing margin requirements by 40-60% compared to standard Reg T calculations. Particularly valuable for options strategies and diversified portfolios.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Professional Trading Considerations Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Advanced Institutional Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Prime Brokerage Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Professional traders with substantial capital should consider brokers offering prime brokerage services. These typically include centralized clearing across multiple executing brokers, enhanced reporting capabilities, securities lending for short selling, financing options beyond standard margin, and custody solutions. While traditionally reserved for hedge funds and institutional investors, several brokers now offer "mini-prime" services for professional individual traders with lower asset thresholds (typically starting at $1-5 million).</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Custom Liquidity Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Professional traders often benefit from customized liquidity arrangements. Top-tier brokers can provide access to non-displayed liquidity pools, dark venues, and institutional order flow. Some offer the ability to negotiate custom liquidity with specific counterparties or create bespoke trading arrangements. These capabilities are particularly valuable for traders executing large orders or dealing in less liquid instruments where minimizing market impact is essential.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Methodology Section */}
      <section className="mb-16" id="methodology">
        <h2 className="text-3xl font-bold mb-8">Our Testing Methodology</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Our broker evaluations for professional traders involve institutional-grade testing protocols:</p>
            
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <span className="font-bold">Execution Benchmarking:</span> We conduct thousands of controlled test trades across multiple market conditions, measuring execution quality against arrival price, VWAP, and implementation shortfall benchmarks. We specifically test various order sizes to evaluate market impact and price improvement statistics.
              </li>
              <li>
                <span className="font-bold">API Stress Testing:</span> Our development team constructs high-throughput testing scenarios to evaluate API reliability, message handling capacity, and error recovery. We measure order acknowledgment times, data consistency, and connection stability under various load conditions.
              </li>
              <li>
                <span className="font-bold">Infrastructure Assessment:</span> We evaluate network architecture, redundancy measures, and failover capabilities by analyzing connection statistics and historical uptime data. For colocation services, we conduct comparative latency tests between standard connectivity and colocated access.
              </li>
              <li>
                <span className="font-bold">Cost Modeling:</span> We create detailed cost analyses for various professional trading profiles (high-frequency trader, institutional portfolio manager, proprietary trading firm), calculating all-in costs including commissions, exchange fees, platform charges, market data costs, and connectivity fees across different volume tiers.
              </li>
              <li>
                <span className="font-bold">Professional Support Evaluation:</span> We engage with institutional support teams through multiple channels, assessing response times, technical knowledge, and problem-solving capabilities for complex scenarios that professional traders commonly encounter.
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
              <CardTitle>How important is the FIX protocol for professional trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For most professional trading operations, FIX (Financial Information eXchange) protocol access is essential rather than optional. Unlike standard REST APIs, FIX provides significant advantages: lower latency (often sub-millisecond) with minimal overhead, standardized messaging that integrates with institutional trading systems, support for complex order types and advanced features, and higher throughput capacity for high-volume trading. FIX also provides real-time push notifications rather than requiring constant polling. While implementing FIX requires greater technical resources than REST APIs, the performance improvements justify the investment for professional trading operations executing significant volumes or latency-sensitive strategies.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What are the practical benefits of portfolio margining?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Portfolio margining can transform capital efficiency for professional traders managing complex positions. Under traditional Reg T margin rules, requirements are calculated position-by-position with fixed percentages, ignoring hedging relationships. Portfolio margining uses risk-based calculations that consider correlations and potential portfolio-wide losses under various market scenarios. The practical impact is substantial: an options spread strategy might require 100% of maximum risk as margin under Reg T, but only 15-25% under portfolio margining. Similarly, hedged positions across correlated instruments receive significant margin relief. For a $1 million portfolio, this can translate to $300,000-600,000 in freed capital available for additional positions or as a safety buffer during volatile periods.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How should professional traders evaluate execution quality?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Professional traders should adopt systematic approaches to execution quality measurement rather than relying on subjective impressions. Key metrics include: (1) Effective spread - the difference between your execution price and the midpoint at order submission, (2) Implementation shortfall - performance versus the price at decision time, (3) Reversion analysis - price movement following your execution, which can indicate information leakage or market impact, (4) Fill rates - especially for limit orders, and (5) Latency consistency - standard deviation of execution times can be more important than average speed. The best brokers provide execution quality reports with these metrics, but sophisticated traders should implement independent measurement systems. Many professional traders conduct periodic A/B testing between brokers using identical orders to quantify differences in execution quality.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Are colocation services worth the cost for professional traders?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The value proposition of colocation services depends entirely on your trading strategy's latency sensitivity. For high-frequency strategies where microseconds matter, the advantages are clear: typical latency improvements of 10-30ms for retail connections versus 50-500μs for colocated connectivity represent orders of magnitude difference. This translates to execution priority and reduced slippage in fast-moving markets. However, for strategies operating on longer timeframes, the cost-benefit analysis shifts dramatically. Professional traders should quantify the impact of latency on their specific strategy through backtesting with realistic execution models at different latency assumptions. Costs typically range from $1,000-5,000 monthly for basic colocation packages to $10,000+ for premium configurations, making this a significant consideration in your trading infrastructure budget.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready for institutional-grade trading?</CardTitle>
            <CardDescription>Compare the top platforms for professional traders and access the ultimate trading capabilities.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top Brokers for Professional Traders
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 