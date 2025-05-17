import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Copy Trading Brokers 2025 | Top Platforms for Social Trading",
  description: "Compare the best copy trading platforms that allow you to automatically replicate the trades of successful investors. Expert-reviewed and ranked for social trading features.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "eToro",
    logo: "https://placehold.co/120x60/png?text=eToro",
    rating: 4.9,
    minDeposit: "$50",
    copyMinimum: "$200",
    platforms: ["eToro Platform", "Mobile App"],
    regulation: ["FCA", "ASIC", "CySEC"],
    pros: [
      "Largest social trading community",
      "Wide range of tradable assets",
      "Intuitive copy trading interface"
    ],
    cons: [
      "Higher spreads than some competitors",
      "Limited technical analysis tools",
      "Withdrawal fees"
    ],
    url: "/reviews/etoro",
    features: {
      riskScoring: true,
      partialCopying: true,
      performanceMetrics: true,
      managerSearch: true
    }
  },
  {
    id: 2,
    name: "NAGA",
    logo: "https://placehold.co/120x60/png?text=NAGA",
    rating: 4.8,
    minDeposit: "$250",
    copyMinimum: "$50",
    platforms: ["NAGA Trader", "NAGA Web", "Mobile Apps"],
    regulation: ["CySEC", "BaFin"],
    pros: [
      "Advanced copy trading features",
      "Comprehensive trader statistics",
      "Social feed integration"
    ],
    cons: [
      "Limited educational content",
      "Higher minimum deposit",
      "Not as widely known as competitors"
    ],
    url: "/reviews/naga",
    features: {
      riskScoring: true,
      partialCopying: true,
      performanceMetrics: true,
      managerSearch: true
    }
  },
  {
    id: 3,
    name: "Pepperstone",
    logo: "https://placehold.co/120x60/png?text=Pepperstone",
    rating: 4.7,
    minDeposit: "$200",
    copyMinimum: "$100",
    platforms: ["MT4", "MT5", "cTrader", "DupliTrade", "Myfxbook"],
    regulation: ["FCA", "ASIC", "CySEC", "DFSA", "SCB"],
    pros: [
      "Multiple copy trading platforms",
      "Excellent execution speed",
      "Low cost trading"
    ],
    cons: [
      "No proprietary copy trading platform",
      "Steeper learning curve",
      "Different minimum deposits per platform"
    ],
    url: "/reviews/pepperstone",
    features: {
      riskScoring: true,
      partialCopying: true,
      performanceMetrics: true,
      managerSearch: false
    }
  },
  {
    id: 4,
    name: "ZuluTrade",
    logo: "https://placehold.co/120x60/png?text=ZuluTrade",
    rating: 4.6,
    minDeposit: "$100",
    copyMinimum: "$50",
    platforms: ["ZuluTrade Platform", "Mobile App"],
    regulation: ["Partner broker dependent"],
    pros: [
      "Large network of signal providers",
      "Advanced filtering options",
      "Works with multiple brokers"
    ],
    cons: [
      "Quality of signal providers varies",
      "Complex fee structure",
      "Overwhelming number of traders to copy"
    ],
    url: "/reviews/zulutrade",
    features: {
      riskScoring: true,
      partialCopying: true,
      performanceMetrics: true,
      managerSearch: true
    }
  },
  {
    id: 5,
    name: "AvaTrade",
    logo: "https://placehold.co/120x60/png?text=AvaTrade",
    rating: 4.5,
    minDeposit: "$100",
    copyMinimum: "$200",
    platforms: ["MT4", "MT5", "DupliTrade", "ZuluTrade"],
    regulation: ["ASIC", "FSCA", "FSA", "FRSA", "CBI"],
    pros: [
      "Integration with multiple copy platforms",
      "Strong regulatory framework",
      "Excellent educational resources"
    ],
    cons: [
      "Inactivity fees",
      "No proprietary copy platform",
      "Weekend fees on certain positions"
    ],
    url: "/reviews/avatrade",
    features: {
      riskScoring: true,
      partialCopying: false,
      performanceMetrics: true,
      managerSearch: false
    }
  }
];

export default function BestCopyTradingBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Copy Trading Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top platforms for social and copy trading, allowing you to automatically replicate the strategies of successful traders. All platforms thoroughly tested for performance and user experience.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Brokers for Copy Trading</h2>
        
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
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Copy Minimum</h4>
                          <p className="font-medium">{broker.copyMinimum}</p>
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
                          <h4 className="text-sm font-medium text-center mb-2">Risk Scoring</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.riskScoring ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.riskScoring ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Partial Copying</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.partialCopying ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.partialCopying ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Performance Metrics</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.performanceMetrics ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.performanceMetrics ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Advanced Search</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.managerSearch ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.managerSearch ? '✓' : '✗'}
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
        <h2 className="text-3xl font-bold mb-8">Copy Trading Platform Comparison</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Broker</TableHead>
                <TableHead>Min. Deposit</TableHead>
                <TableHead>Copy Minimum</TableHead>
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
                  <TableCell>{broker.copyMinimum}</TableCell>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank Copy Trading Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Signal Provider Quality</CardTitle>
              <CardDescription>We evaluate the performance and transparency of available traders.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We thoroughly assess the quality, variety, and verification of signal providers on each platform. This includes analyzing historical performance data, risk metrics, and consistency. We prioritize platforms that maintain strict standards for signal providers, offer transparent track records spanning different market conditions, and provide comprehensive performance analytics to help users make informed decisions when selecting traders to copy.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Copy Trading Features</CardTitle>
              <CardDescription>We assess the flexibility and control of the copy mechanism.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We evaluate the sophistication of each platform's copy trading features, including options for partial copying, copy stop-loss settings, risk management tools, and the ability to modify copied trades. Platforms that offer greater customization and control over how trades are copied score higher in our rankings. We also assess the efficiency and reliability of the copying mechanism, including execution speed and slippage when replicating trades.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Usability</CardTitle>
              <CardDescription>We test how easy it is to find and copy suitable traders.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>The ability to efficiently identify appropriate signal providers is crucial for successful copy trading. We assess the search and filtering capabilities of each platform, evaluating criteria such as performance metrics, trading style, risk level, and asset focus. We also examine the overall user experience of the copy trading interface, including the clarity of performance statistics, ease of subscribing/unsubscribing, and the quality of notifications about copied activities.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cost Structure</CardTitle>
              <CardDescription>We analyze all fees associated with copy trading.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Copy trading costs can significantly impact returns. We analyze the complete fee structure, including platform fees, performance fees, spreads, and commissions. Some platforms charge premium fees for accessing top-performing traders, while others may build costs into wider spreads. We evaluate the overall value proposition, identifying whether higher fees are justified by superior performance, features, or trader quality.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="mb-16" id="features">
        <h2 className="text-3xl font-bold mb-8">Key Copy Trading Features to Consider</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">When evaluating copy trading platforms, pay attention to these important factors:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Risk Management Controls</h3>
                <p>Advanced copy trading platforms provide comprehensive risk management tools that allow you to limit potential losses. Look for features such as copy stop-loss settings (automatically stopping copying when losses reach a certain threshold), maximum drawdown limits, and the ability to set maximum amounts per copied trade. Some platforms also offer risk score ratings for signal providers, helping you match your risk tolerance with appropriate traders. The best platforms allow granular control over risk parameters for each trader you follow.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Proportional Copying Flexibility</h3>
                <p>Different platforms offer varying degrees of flexibility in how you allocate capital to copied traders. Look for platforms that allow proportional copying (where you can allocate different percentages of your capital to different signal providers) and the ability to set fixed amounts rather than percentages. This functionality enables more sophisticated portfolio construction, allowing you to diversify across multiple traders with different strategies, risk profiles, and asset specializations.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Signal Provider Transparency</h3>
                <p>Evaluate how transparently the platform presents signal provider information. The best copy trading services offer comprehensive performance metrics beyond simple profit percentages, including drawdown history, risk-adjusted returns, trade frequency, average holding periods, and performance across different market conditions. Look for platforms that verify trader identities, prevent the manipulation of performance statistics, and provide sufficient historical data to evaluate providers through multiple market cycles.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Copy Trading Community</h3>
                <p>The size and quality of the copy trading community significantly impact your experience. Larger communities typically offer more signal providers to choose from, while high-quality communities feature more professional traders. Assess whether the platform has active discussion forums, trader interaction capabilities, and community feedback mechanisms. Some platforms incorporate social features that allow you to follow traders' market analyses and trading ideas even before deciding to copy their trades.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Understanding Copy Trading Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Understanding Copy Trading</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>How Copy Trading Works</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Copy trading automatically replicates the trades of experienced investors in your account. When you follow a trader, the platform creates proportional positions in your account whenever they execute a trade. For example, if you allocate $1,000 to copy a trader who invests 5% of their portfolio in a EUR/USD position, the system will invest $50 of your funds in the same position. Most platforms allow you to follow multiple traders simultaneously, creating a diversified portfolio of trading strategies. The technology handles all aspects of trade replication, including opening positions, setting stop-losses and take-profits, and closing trades—all without requiring your manual intervention.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Selecting Signal Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Choosing the right traders to copy is the most critical decision in copy trading. Effective evaluation goes beyond just past returns to include risk-adjusted performance metrics such as Sharpe ratio, maximum drawdown, and win rate. Consider the trader's strategy (day trading, swing trading, value investing) and whether it aligns with your goals and risk tolerance. Analyze performance consistency across different market conditions rather than focusing on short-term results. The best signal providers maintain transparent track records, provide clear strategy explanations, and demonstrate sustainable performance. Many successful copy traders diversify across multiple signal providers with different approaches, ensuring their portfolio isn't dependent on any single trading style.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Methodology Section */}
      <section className="mb-16" id="methodology">
        <h2 className="text-3xl font-bold mb-8">Our Testing Methodology</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Our evaluations of copy trading platforms involve comprehensive testing:</p>
            
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <span className="font-bold">Live Copy Testing:</span> We open real accounts on each platform and actively copy multiple traders with different strategies and risk profiles over a minimum three-month period. This allows us to evaluate the actual copying mechanism performance, including execution speed, slippage, and reliability.
              </li>
              <li>
                <span className="font-bold">Signal Provider Analysis:</span> We conduct in-depth statistical analysis of available signal providers, evaluating performance consistency, risk metrics, and transparency. We prioritize platforms that maintain high-quality control standards for their signal provider networks and prevent performance manipulation.
              </li>
              <li>
                <span className="font-bold">Feature Benchmarking:</span> We systematically test all copy trading features, including search filters, risk management tools, and customization options. We create standardized scenarios to compare how each platform handles common situations like partial closing of positions or managing conflicts between multiple copied traders.
              </li>
              <li>
                <span className="font-bold">User Experience Testing:</span> We recruit both novice and experienced traders to evaluate the intuitiveness of each platform's copy trading interface. This includes assessing how easily users can find appropriate signal providers, understand performance metrics, and manage their copied portfolio.
              </li>
              <li>
                <span className="font-bold">Cost Comparison:</span> We calculate the total costs of copy trading across platforms, including explicit fees and implicit costs like spreads. We model these expenses for different trading volumes and strategies to identify which platforms offer the best value for various user profiles.
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
              <CardTitle>Is copy trading suitable for beginners?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Copy trading can be highly suitable for beginners, serving as both a learning tool and a way to potentially generate returns while developing trading knowledge. The primary advantages for newcomers include accessing experienced traders' strategies without requiring extensive market knowledge, observing professional trading decisions in real-time, and avoiding common novice mistakes. However, beginners should maintain realistic expectations and understand that copy trading doesn't eliminate risk. For maximum educational benefit, beginners should actively monitor the copied trades, study the signal providers' approaches, and gradually develop their own understanding of market dynamics. Starting with smaller allocations across multiple diverse traders is often the prudent approach for newcomers. Many platforms also offer demo copy trading accounts, allowing beginners to practice without risking real capital while they learn the system.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How much money do I need to start copy trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Copy trading minimum requirements vary significantly across platforms, with some allowing you to start with as little as $50, while others require $1,000 or more. Beyond the platform's minimum, consider practical requirements for effective diversification. Copying multiple traders with a very small account can lead to fractional position sizes that limit potential returns. As a practical guideline, allocating at least $200-500 per copied trader allows for meaningful position replication while maintaining reasonable diversification. Some premium copy services with institutional-grade signal providers may require higher minimums of $5,000-$10,000. Many platforms implement tiered systems where different signal providers have varying minimum copy amounts based on their performance history and strategy complexity. For beginners, starting with moderate allocations and gradually increasing exposure as you gain confidence in the process is typically the most prudent approach.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What are the main risks of copy trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Despite its accessibility, copy trading carries several important risks. Past performance of signal providers never guarantees future results—strategies that worked in specific market conditions may fail when circumstances change. Some traders may temporarily outperform through luck rather than skill, leading to subsequent underperformance when copied. Additionally, copy trading platforms may create incentives for signal providers to take excessive risks to attract followers, particularly if their compensation is tied to performance fees or follower counts. Technical risks include execution discrepancies between the signal provider's account and followers' accounts, potentially creating performance differences. From a psychological perspective, copy trading can create a false sense of detachment from risk, as investors might commit more capital than they would if actively trading themselves. Mitigate these risks by diversifying across multiple signal providers with different strategies, thoroughly researching traders before copying, starting with smaller allocations, and regularly reviewing performance.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Can I customize how I copy other traders?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Most advanced copy trading platforms offer significant customization options that allow you to tailor how you replicate other traders' activities. Common customization features include proportional copying (allocating specific percentages of your capital to different traders), selective instrument copying (choosing to only copy trades in certain asset classes), and risk modification (adjusting the relative position sizes compared to the signal provider). Many platforms also allow you to set maximum drawdown thresholds that automatically stop copying when losses reach a certain level, as well as options to exclude specific instruments or trade types. Some sophisticated systems even permit you to modify aspects of copied trades, such as adjusting stop-loss and take-profit levels to match your personal risk tolerance. The degree of available customization varies substantially between platforms, with dedicated copy trading specialists typically offering more granular control than brokers who provide copy trading as a supplementary feature.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start copy trading?</CardTitle>
            <CardDescription>Compare top platforms and start replicating successful trading strategies.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top Copy Trading Platforms
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 