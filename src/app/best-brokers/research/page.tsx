import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Research & Analysis Brokers 2025 | Top Market Research Platforms",
  description: "Compare the best brokers with premium research tools, market analysis capabilities, and in-depth trading insights. Expert-reviewed and ranked.",
};

// Research broker data
const topBrokers = [
  {
    id: 1,
    name: "Fidelity",
    logo: "https://placehold.co/120x60/png?text=Fidelity",
    rating: 4.9,
    minDeposit: "$0",
    tradingFees: "$0 per stock/ETF trade",
    platforms: ["Fidelity.com", "Active Trader Pro", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Extensive research from 20+ providers",
      "Exceptional stock screening tools",
      "Robust fundamental analysis"
    ],
    cons: [
      "Advanced platform can overwhelm beginners",
      "Research navigation has learning curve"
    ],
    url: "/reviews/fidelity",
    features: {
      thirdPartyResearch: true,
      technicalAnalysis: true,
      fundamentalAnalysis: true,
      newsIntegration: true
    }
  },
  {
    id: 2,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.8,
    minDeposit: "$0",
    tradingFees: "$0 per stock/ETF trade",
    platforms: ["thinkorswim", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Excellent thinkorswim platform for analysis",
      "Comprehensive charting capabilities",
      "Strong market commentary"
    ],
    cons: [
      "Research spread across multiple platforms",
      "Steep learning curve for beginners"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      thirdPartyResearch: true,
      technicalAnalysis: true,
      fundamentalAnalysis: true,
      newsIntegration: true
    }
  },
  {
    id: 3,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.8,
    minDeposit: "$0",
    tradingFees: "$0.005 per share ($1 min)",
    platforms: ["Trader Workstation", "Client Portal", "IBKR Mobile"],
    regulation: ["SEC", "FINRA", "FCA"],
    pros: [
      "Global market research coverage",
      "Powerful scanner and screening tools",
      "Advanced fundamentals database"
    ],
    cons: [
      "Research tools can be overwhelming",
      "Higher learning curve for TWS platform"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      thirdPartyResearch: true,
      technicalAnalysis: true,
      fundamentalAnalysis: true,
      newsIntegration: true
    }
  },
  {
    id: 4,
    name: "Charles Schwab",
    logo: "https://placehold.co/120x60/png?text=Schwab",
    rating: 4.7,
    minDeposit: "$0",
    tradingFees: "$0 per stock/ETF trade",
    platforms: ["Schwab.com", "StreetSmart Edge", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Excellent equity research reports",
      "Intuitive stock screeners",
      "Quality market commentary"
    ],
    cons: [
      "Research navigation could be streamlined",
      "Advanced features require desktop platform"
    ],
    url: "/reviews/charles-schwab",
    features: {
      thirdPartyResearch: true,
      technicalAnalysis: true,
      fundamentalAnalysis: true,
      newsIntegration: true
    }
  },
  {
    id: 5,
    name: "E*TRADE",
    logo: "https://placehold.co/120x60/png?text=ETRADE",
    rating: 4.6,
    minDeposit: "$0",
    tradingFees: "$0 per stock/ETF trade",
    platforms: ["Power E*TRADE", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Strong third-party research integration",
      "User-friendly research interface",
      "Excellent options analysis tools"
    ],
    cons: [
      "Research spread across different platforms",
      "Some advanced features require high balances"
    ],
    url: "/reviews/etrade",
    features: {
      thirdPartyResearch: true,
      technicalAnalysis: true,
      fundamentalAnalysis: true,
      newsIntegration: true
    }
  }
];

export default function BestResearchBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Research & Analysis Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top brokers with premium research tools, market analysis capabilities, and in-depth trading insights. All platforms thoroughly tested by our expert team.
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
          <Link href="#tools">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Research Tools
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Research Brokers</h2>
        
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
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Trading Fees</h4>
                          <p className="font-medium">{broker.tradingFees}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Platforms</h4>
                          <p className="font-medium">{broker.platforms.join(", ")}</p>
                        </div>
                        <div className="md:col-span-3">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Regulation</h4>
                          <div className="flex flex-wrap gap-2">
                            {broker.regulation.map(reg => (
                              <Badge key={reg} variant="outline">{reg}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="features">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.thirdPartyResearch ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.thirdPartyResearch ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">3rd Party Research</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.technicalAnalysis ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.technicalAnalysis ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Technical Analysis</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.fundamentalAnalysis ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.fundamentalAnalysis ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Fundamental Data</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.newsIntegration ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.newsIntegration ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">News Integration</span>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pros-cons">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Pros</h4>
                          <ul className="space-y-2">
                            {broker.pros.map((pro, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 shrink-0" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Cons</h4>
                          <ul className="space-y-2">
                            {broker.cons.map((con, i) => (
                              <li key={i} className="flex items-start">
                                <Info className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 shrink-0" />
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
      
      {/* Methodology */}
      <section className="mb-16" id="how-we-rank">
        <h2 className="text-3xl font-bold mb-6">How We Rank Research Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our rankings for research and analysis brokers are based on extensive testing across multiple factors that matter to data-driven traders. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Research Breadth:</strong> Comprehensive access to reports from multiple third-party providers like Morningstar, Argus, and CFRA</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Technical Analysis:</strong> Advanced charting with a wide range of indicators, drawing tools, and pattern recognition features</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Fundamental Data:</strong> Comprehensive financial statements, ratio analysis, earnings estimates, and competitive benchmarking</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Screening Capabilities:</strong> Powerful stock, ETF, and options screeners with extensive customization options</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>News & Market Analysis:</strong> Real-time news integration, market commentary, and analyst insights to inform trading decisions</span>
              </li>
            </ul>
            <p>
              Each broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving research offerings and platform capabilities.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Research Tools */}
      <section className="mb-16" id="tools">
        <h2 className="text-3xl font-bold mb-6">Essential Research Tools for Traders</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              When evaluating research brokers, look for these key analytical tools that can significantly enhance your trading decisions:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Stock Screeners</h3>
                <p className="text-sm text-muted-foreground">Advanced filtering tools that allow you to search for investment opportunities based on technical indicators, fundamental metrics, and other criteria to match your strategy.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Equity Research Reports</h3>
                <p className="text-sm text-muted-foreground">In-depth analysis from professional research firms providing insights on company performance, growth prospects, valuation, and price targets.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Technical Analysis Tools</h3>
                <p className="text-sm text-muted-foreground">Customizable charting platforms with multiple timeframes, drawing tools, and hundreds of technical indicators to identify patterns and potential entry/exit points.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Fundamental Data</h3>
                <p className="text-sm text-muted-foreground">Comprehensive financial statement analysis, ratio comparisons, earnings projections, and competitive benchmarking data for deep company evaluation.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Market News Integration</h3>
                <p className="text-sm text-muted-foreground">Real-time news feeds from trusted sources with customizable alerts and the ability to filter by company, sector, or market events that impact your investments.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Portfolio Analysis</h3>
                <p className="text-sm text-muted-foreground">Tools that evaluate your portfolio's performance, risk metrics, diversification, asset allocation, and potential weaknesses to help optimize your holdings.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Methodology Section */}
      <section className="mb-16" id="methodology">
        <h2 className="text-3xl font-bold mb-6">Our Testing Methodology</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-6">
              Our expert team conducts hands-on testing of each broker's research capabilities through extensive real-world use cases and comparative analysis.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Research Provider Assessment</h3>
                <p className="text-sm text-muted-foreground">We evaluate the quality, depth, and timeliness of research from each third-party provider offered by the broker, comparing analyst accuracy and coverage breadth.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Technical Analysis Platform Testing</h3>
                <p className="text-sm text-muted-foreground">We test charting platforms for functionality, customization options, available indicators, and performance across different market conditions.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Screener Evaluation</h3>
                <p className="text-sm text-muted-foreground">We assess screening tools by building complex filters, testing for speed, available criteria, and the quality of results produced for various investment strategies.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Data Integration Analysis</h3>
                <p className="text-sm text-muted-foreground">We analyze how well fundamental data, news, and market events are integrated across platforms and the ease of incorporating this information into trading decisions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* FAQs */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Is it worth paying extra for premium research features?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Whether premium research features justify additional costs depends on your trading style and needs. For active traders who rely on in-depth analysis to make decisions, the additional cost often proves worthwhile through better-informed trades and potentially higher returns. Premium features typically include professional-grade stock screeners, real-time data from multiple exchanges, advanced charting capabilities, institutional-level research reports, and comprehensive fundamental analysis tools. These tools can identify opportunities you might otherwise miss and provide deeper insights into market trends. However, casual or long-term passive investors may find free or basic research services sufficient for their needs. Most top research brokers offer tiered access, allowing you to select the research level appropriate for your trading frequency, portfolio size, and strategy complexity. Many also waive premium research fees for clients who maintain certain account balances or trading activity levels.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How can I best combine fundamental and technical research for better trading decisions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Creating an effective hybrid analysis approach involves using fundamental research to identify what to trade and technical analysis to determine when to trade. Begin by using fundamental analysis to identify financially sound companies or assets with strong growth potential, healthy balance sheets, competitive advantages, and fair valuations. This creates a watchlist of quality investments worth considering. Then apply technical analysis to these pre-screened opportunities to determine optimal entry and exit points, analyzing price patterns, volume trends, support/resistance levels, and momentum indicators. The most effective research brokers facilitate this workflow by allowing seamless transitions between fundamental screeners and technical charting tools. For longer-term positions, prioritize fundamental factors for selection while using technical signals for timing. For shorter-term trades, you might emphasize technical patterns while using fundamentals as a risk filter to avoid companies with concerning financial metrics. Most successful traders develop a personalized framework that assigns appropriate weight to each research type based on their timeframe and strategy.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What should I look for in a broker's stock screening tools?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>When evaluating a broker's stock screening capabilities, prioritize these key features: 1) Comprehensive filtering criteria that includes fundamental metrics (P/E, EPS growth, debt ratios, etc.), technical indicators (RSI, MACD, moving averages), and descriptive data (sector, market cap, dividend yields); 2) Customization flexibility that allows creating and saving multiple screens for different strategies; 3) Real-time updating of results rather than delayed data; 4) Intuitive interfaces that visualize results through sortable tables, charts, or heatmaps; 5) Exportability of screening results to spreadsheets for further analysis; 6) Pre-built screens from market experts or the ability to access community-shared filters; 7) Screening across multiple asset classes (stocks, ETFs, options, fixed income); and 8) Global market coverage beyond just domestic exchanges. The best research brokers also provide seamless integration between screener results and detailed research pages, allowing you to quickly drill down into promising candidates identified by your screens without navigating through multiple menus or interfaces.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to elevate your trading decisions?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended research brokers today, or use our comparison tool to find the perfect platform for your analysis needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Research Brokers
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/tools/quiz">
              Take the Broker Finder Quiz
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 