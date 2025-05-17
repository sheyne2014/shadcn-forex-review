import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Low Spread Brokers 2025 | Top Trading Platforms with Tight Spreads",
  description: "Compare the best trading platforms offering the lowest spreads for forex, CFDs, and other instruments. Expert-reviewed and ranked for competitive pricing.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "IC Markets",
    logo: "https://placehold.co/120x60/png?text=ICMarkets",
    rating: 4.9,
    minDeposit: "$200",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "cTrader"],
    regulation: ["ASIC", "CySEC", "FSA"],
    pros: [
      "Raw spread accounts available",
      "ECN pricing model",
      "Fast execution speeds"
    ],
    cons: [
      "Commission fees on raw spread accounts",
      "Limited educational resources",
      "Customer service can be slow"
    ],
    url: "/reviews/ic-markets",
    features: {
      rawSpreads: true,
      ecnPricing: true,
      zeroMarkup: true,
      lowEurUsdSpread: true
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
    regulation: ["FCA", "ASIC", "CySEC", "DFSA"],
    pros: [
      "Razor-thin spreads on major pairs",
      "Fast execution with low slippage",
      "Multiple account types"
    ],
    cons: [
      "Commission charged on Razor accounts",
      "Limited product range outside forex",
      "No proprietary platform"
    ],
    url: "/reviews/pepperstone",
    features: {
      rawSpreads: true,
      ecnPricing: true,
      zeroMarkup: true,
      lowEurUsdSpread: true
    }
  },
  {
    id: 3,
    name: "FP Markets",
    logo: "https://placehold.co/120x60/png?text=FPMarkets",
    rating: 4.7,
    minDeposit: "$100",
    spread: "From 0.0 pips",
    platforms: ["MT4", "MT5", "Iress"],
    regulation: ["ASIC", "CySEC"],
    pros: [
      "Competitive raw spreads",
      "DMA/ECN execution model",
      "Good customer support"
    ],
    cons: [
      "Higher minimum deposit for premium accounts",
      "Platform fees for Iress",
      "Limited cryptocurrency offering"
    ],
    url: "/reviews/fp-markets",
    features: {
      rawSpreads: true,
      ecnPricing: true,
      zeroMarkup: false,
      lowEurUsdSpread: true
    }
  },
  {
    id: 4,
    name: "XM",
    logo: "https://placehold.co/120x60/png?text=XM",
    rating: 4.6,
    minDeposit: "$5",
    spread: "From 0.6 pips",
    platforms: ["MT4", "MT5"],
    regulation: ["CySEC", "ASIC", "IFSC"],
    pros: [
      "Low spread on standard accounts",
      "Very low minimum deposit",
      "Multilingual customer support"
    ],
    cons: [
      "Not the absolute lowest spreads",
      "Limited platform options",
      "Fewer research tools than competitors"
    ],
    url: "/reviews/xm",
    features: {
      rawSpreads: false,
      ecnPricing: false,
      zeroMarkup: false,
      lowEurUsdSpread: true
    }
  },
  {
    id: 5,
    name: "FXCM",
    logo: "https://placehold.co/120x60/png?text=FXCM",
    rating: 4.5,
    minDeposit: "$50",
    spread: "From 0.2 pips",
    platforms: ["Trading Station", "MT4", "ZuluTrade"],
    regulation: ["FCA", "ASIC", "FSCA"],
    pros: [
      "No dealing desk execution",
      "Transparent spread model",
      "Advanced platforms"
    ],
    cons: [
      "Limited cryptocurrency offering",
      "Higher spreads during volatile markets",
      "Some account fees"
    ],
    url: "/reviews/fxcm",
    features: {
      rawSpreads: false,
      ecnPricing: true,
      zeroMarkup: false,
      lowEurUsdSpread: true
    }
  }
];

export default function BestLowSpreadBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Low Spread Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top trading platforms offering the tightest spreads on forex, CFDs, and other instruments. All brokers thoroughly tested for spread consistency and overall value.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Brokers with Lowest Spreads</h2>
        
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
                          <h4 className="text-sm font-medium text-center mb-2">Raw Spreads</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.rawSpreads ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.rawSpreads ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">ECN Pricing</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.ecnPricing ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.ecnPricing ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Zero Markup</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.zeroMarkup ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.zeroMarkup ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Low EUR/USD Spread</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.lowEurUsdSpread ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.lowEurUsdSpread ? '✓' : '✗'}
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
        <h2 className="text-3xl font-bold mb-8">Low Spread Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank Low Spread Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Spread Measurement</CardTitle>
              <CardDescription>We measure real spreads across multiple time periods.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We conduct extensive testing of actual spread sizes across different market conditions, tracking both advertised and real-time spreads. Our testing includes measurements during various market sessions (Asian, European, and US), during major news events, and at market open/close when spreads typically widen. We prioritize brokers whose spreads remain consistently tight even during volatile periods.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Total Cost Analysis</CardTitle>
              <CardDescription>We evaluate all fees beyond just the spread.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Low spreads alone can be misleading if other fees are high. We conduct comprehensive cost analysis including commissions, overnight financing rates, inactivity fees, and withdrawal charges. Some brokers offer zero-spread accounts with higher commissions, which may be more cost-effective for frequent traders. Our rankings consider the total transaction cost across different trading volumes and holding periods.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Execution Quality</CardTitle>
              <CardDescription>We test for slippage, rejection rates, and execution speed.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Tight spreads mean little if orders are frequently rejected or subject to significant slippage. We conduct hundreds of real trades to measure order execution quality, testing for slippage (both positive and negative), rejection rates, and execution speed. Brokers offering consistently reliable execution without manipulative practices score higher in our rankings regardless of slightly wider spreads.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pricing Model Transparency</CardTitle>
              <CardDescription>We evaluate the clarity and consistency of spread disclosure.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We assess how transparently brokers disclose their pricing models, particularly distinguishing between ECN/DMA providers offering raw interbank spreads plus commission versus dealing desk brokers with marked-up spreads. We review legal documentation, conduct customer service inquiries, and test actual trading conditions to verify if the advertised pricing model matches reality.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="mb-16" id="features">
        <h2 className="text-3xl font-bold mb-8">Key Spread Features to Consider</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">When evaluating brokers for tight spreads, pay attention to these important factors:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Raw vs. Standard Spreads</h3>
                <p>Many brokers offer multiple account types with different spread models. Raw spread accounts provide direct access to interbank spreads with a separate commission charge, while standard accounts have no commission but include markup in the spread. For high-volume traders, raw spread accounts typically offer better value despite the commission. For occasional traders, standard accounts may be more cost-effective.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Variable vs. Fixed Spreads</h3>
                <p>Fixed spreads remain constant regardless of market conditions, providing predictable costs but typically at a premium. Variable spreads fluctuate with market liquidity and volatility, offering potentially lower costs during calm periods but widening during volatile markets or major news events. Your trading style should determine which model is preferable—scalpers typically benefit from variable spreads during normal conditions, while news traders might prefer fixed spreads.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Spread Consistency Across Instruments</h3>
                <p>Some brokers offer exceptionally tight spreads on major pairs like EUR/USD to attract clients, but have significantly wider spreads on other instruments. If you trade beyond major pairs, examine the spreads across your entire trading universe. The same applies to CFDs, where some brokers offer competitive spreads on popular indices but wider spreads on individual stocks or commodities.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Commission Structure</h3>
                <p>For ECN/STP brokers offering raw spreads, commission structure becomes critical. Some charge a flat fee per lot, while others use a percentage-based model. Calculate the total cost (spread + commission) based on your typical trade size and frequency. Also consider whether round-turn commission is charged at trade opening or split between opening and closing—this affects your capital efficiency and margin requirements.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Understanding Spreads Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Understanding Trading Spreads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>The True Cost of Spreads</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Spreads directly impact your trading profitability. For example, a 1 pip spread on EUR/USD means you need the market to move at least 1 pip in your favor just to break even. For a standard lot (100,000 units), each pip is worth approximately $10, so a 1 pip spread represents a $10 cost per transaction. High-frequency traders making multiple trades daily find that even small spread differences compound significantly over time. A difference of 0.2 pips between brokers might seem negligible, but for a trader executing 20 trades daily, this represents $40 in daily savings or around $10,000 annually.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How Brokers Set Spreads</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Understanding how different broker types set spreads helps you make informed decisions. Market makers (dealing desk brokers) create their own prices and typically offer wider spreads but no commission. STP (Straight Through Processing) brokers pass your orders to liquidity providers but often add markup to the raw spread. ECN (Electronic Communication Network) brokers connect you directly to the interbank market with minimal or no markup, but charge explicit commissions. The best choice depends on your trading strategy: scalpers and high-frequency traders typically benefit from ECN models, while longer-term position traders might find market makers more cost-effective.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Methodology Section */}
      <section className="mb-16" id="methodology">
        <h2 className="text-3xl font-bold mb-8">Our Testing Methodology</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Our evaluations of low spread brokers involve rigorous testing protocols:</p>
            
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <span className="font-bold">Continuous Spread Monitoring:</span> We track actual spreads throughout the trading day using automated tools that capture spread data every 15 minutes. This monitoring continues for several weeks to establish reliable averages across different market conditions.
              </li>
              <li>
                <span className="font-bold">Multi-Instrument Testing:</span> We don't just test major pairs like EUR/USD. Our analysis covers a basket of currency pairs including majors, minors, and exotics, as well as CFDs on indices, commodities, and stocks to evaluate spread consistency across instruments.
              </li>
              <li>
                <span className="font-bold">Real Trading Conditions:</span> We execute hundreds of actual trades of various sizes to measure real execution quality, including testing during high-impact news events when spreads typically widen to assess if the broker's infrastructure can maintain reasonable spreads.
              </li>
              <li>
                <span className="font-bold">Slippage Analysis:</span> We measure how frequently orders experience slippage (both positive and negative) and the average magnitude of slippage to assess the relationship between tight spreads and reliable execution.
              </li>
              <li>
                <span className="font-bold">Total Cost Calculation:</span> We model total trading costs for different trader profiles, combining spread, commission, overnight fees, and other charges to determine which brokers offer the best overall value rather than just the narrowest headline spread.
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
              <CardTitle>Are zero spread brokers really free to trade with?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No, zero spread brokers aren't truly "free" to trade with. They typically charge commissions that compensate for the absence of spreads. For instance, a broker advertising 0.0 pip spreads might charge $7 per lot round-turn commission. Additionally, some zero spread brokers make money through higher overnight financing fees or by widening spreads during volatile market conditions despite their zero spread marketing. When evaluating zero spread offerings, always calculate the total transaction cost including commissions and compare it to conventional spread-based pricing models. Some traders prefer zero spread accounts for their pricing transparency and because the broker's incentives are aligned with execution quality rather than spread revenue.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Why do spreads widen during news events?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Spreads widen during news events due to increased market volatility and reduced liquidity. When major economic data or central bank decisions are released, market participants become uncertain about appropriate price levels, causing many liquidity providers to temporarily withdraw or significantly widen their quotes. This reduced liquidity means fewer market participants willing to take the other side of trades, resulting in wider bid-ask spreads. Brokers pass these widened interbank spreads to traders, sometimes with additional markup due to their own risk management concerns. Fixed spread brokers often suspend trading briefly during major news or introduce significant slippage instead. If you regularly trade during news events, consider a broker with transparent policies regarding spread widening and execution during high volatility, even if their normal spreads are slightly wider.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Are tighter spreads always better for every trader?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tighter spreads aren't automatically better for all traders—their importance depends on your trading strategy. For high-frequency traders and scalpers making dozens of trades daily with small profit targets, minimal spreads are critical as they represent a significant percentage of potential profits. However, for swing traders holding positions for days or weeks targeting hundreds of pips, a difference of 0.1-0.2 pips is negligible compared to other factors like overnight financing rates, platform reliability, and execution quality. Some brokers offering slightly wider spreads may provide superior research tools, educational resources, or customer service that deliver more value for certain trading styles. Additionally, consider whether a broker tightens spreads at the expense of execution quality—exceptionally narrow spreads with frequent requotes or slippage can be more costly than slightly wider spreads with reliable execution.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How do ECN brokers offer lower spreads than market makers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>ECN (Electronic Communication Network) brokers can offer lower spreads than market makers because of their fundamentally different business models. ECN brokers connect traders directly to liquidity providers in the interbank market without a dealing desk intervention. They aggregate price feeds from multiple banks and institutional players, allowing clients to trade directly on the best available prices. ECN brokers profit primarily from commissions rather than from spread markup or trading against clients. This creates an incentive to provide the tightest possible spreads. Market makers, conversely, create their own market and may profit from client losses or spread markup. They typically offer commission-free trading but compensate with wider spreads. The ECN model generally provides more transparent pricing and eliminates potential conflicts of interest, though it requires sufficient trading volume to be cost-effective due to the commission structure.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to trade with the tightest spreads?</CardTitle>
            <CardDescription>Compare top low-spread brokers and minimize your trading costs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top Low Spread Brokers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 