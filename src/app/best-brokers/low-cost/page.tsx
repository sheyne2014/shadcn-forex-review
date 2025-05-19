import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Low-Cost Brokers 2025 | Top Affordable Trading Platforms",
  description: "Compare the best low-cost brokers with minimal fees, tight spreads, and no hidden charges. Expert-reviewed and ranked for cost-conscious traders.",
};

// Low-cost broker data
const topBrokers = [
  {
    id: 1,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.8,
    minDeposit: "$0",
    tradingFees: "$0.005 per share, $1 minimum",
    platforms: ["Trader Workstation", "Client Portal", "IBKR Mobile"],
    regulation: ["SEC", "FINRA", "FCA"],
    pros: [
      "Ultra-low trading commissions",
      "Competitive margin rates",
      "Global market access"
    ],
    cons: [
      "Complex platform for beginners",
      "Higher learning curve"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      lowCommission: true,
      lowSpread: true,
      noHiddenFees: true,
      competitiveFinancing: true
    }
  },
  {
    id: 2,
    name: "Charles Schwab",
    logo: "https://placehold.co/120x60/png?text=Schwab",
    rating: 4.7,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["StreetSmart Edge", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Commission-free stock trading",
      "No account fees",
      "Solid research tools"
    ],
    cons: [
      "Higher fees for some mutual funds",
      "Margin rates not the lowest"
    ],
    url: "/reviews/charles-schwab",
    features: {
      lowCommission: true,
      lowSpread: false,
      noHiddenFees: true,
      competitiveFinancing: false
    }
  },
  {
    id: 3,
    name: "Fidelity",
    logo: "https://placehold.co/120x60/png?text=Fidelity",
    rating: 4.7,
    minDeposit: "$0",
    tradingFees: "$0 per stock trade",
    platforms: ["Active Trader Pro", "Web Platform", "Mobile App"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Commission-free stock trading",
      "Zero expense ratio index funds",
      "No payment for order flow"
    ],
    cons: [
      "Higher options contract fees",
      "Average forex pricing"
    ],
    url: "/reviews/fidelity",
    features: {
      lowCommission: true,
      lowSpread: false,
      noHiddenFees: true,
      competitiveFinancing: false
    }
  },
  {
    id: 4,
    name: "Degiro",
    logo: "https://placehold.co/120x60/png?text=Degiro",
    rating: 4.6,
    minDeposit: "$0",
    tradingFees: "€0.50 + 0.05% per trade",
    platforms: ["Degiro Platform", "Mobile App"],
    regulation: ["AFM", "BaFin", "FCA"],
    pros: [
      "Very low trading fees",
      "Global market access",
      "Transparent fee structure"
    ],
    cons: [
      "Limited research tools",
      "Basic platform features"
    ],
    url: "/reviews/degiro",
    features: {
      lowCommission: true,
      lowSpread: true,
      noHiddenFees: true,
      competitiveFinancing: false
    }
  },
  {
    id: 5,
    name: "Trading 212",
    logo: "https://placehold.co/120x60/png?text=Trading212",
    rating: 4.5,
    minDeposit: "$1",
    tradingFees: "0% commission, Spread-based for CFDs",
    platforms: ["Web Platform", "Mobile App"],
    regulation: ["FCA", "CySEC"],
    pros: [
      "Commission-free stock trading",
      "Extremely low minimum deposit",
      "Fractional shares available"
    ],
    cons: [
      "Wider spreads on some CFDs",
      "Limited product range"
    ],
    url: "/reviews/trading-212",
    features: {
      lowCommission: true,
      lowSpread: false,
      noHiddenFees: true,
      competitiveFinancing: false
    }
  }
];

export default function BestLowCostBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Low-Cost Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top brokers with minimal fees, tight spreads, and transparent pricing. All brokers thoroughly tested by our expert team for cost-conscious traders.
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
              Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Low-Cost Brokers</h2>
        
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.lowCommission ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.lowCommission ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Low Commissions</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.lowSpread ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.lowSpread ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Tight Spreads</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.noHiddenFees ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.noHiddenFees ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">No Hidden Fees</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.competitiveFinancing ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.competitiveFinancing ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Low Margin Rates</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank Low-Cost Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our low-cost broker rankings are based on comprehensive fee analysis and testing across multiple factors. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Trading Commissions:</strong> Minimal or zero commissions on common asset classes like stocks, ETFs and cryptocurrencies</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Spreads:</strong> Competitive and transparent spreads for forex, CFDs, and other spread-based instruments</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Account Fees:</strong> No or minimal account maintenance, inactivity, or withdrawal fees</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Financing Costs:</strong> Competitive overnight and margin rates for leveraged positions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Fee Transparency:</strong> Clear disclosure of all applicable charges without hidden costs</span>
              </li>
            </ul>
            <p>
              Each broker is regularly re-evaluated to ensure our rankings remain accurate as fee structures change and new competitive offerings emerge.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Regulations */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">Regulatory Considerations for Cost-Conscious Traders</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              When seeking low-cost brokers, it's important to balance cost savings with proper regulatory protection:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Tier-1 Regulation</h3>
                <p className="text-sm text-muted-foreground">The most reputable low-cost brokers maintain licenses from top-tier regulators like the SEC, FCA, ASIC, and BaFin, ensuring strong customer protections.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Business Models</h3>
                <p className="text-sm text-muted-foreground">Understanding how brokers make money is crucial. Some low-cost brokers may use payment for order flow or wider spreads to offset commission-free trading.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Investor Protection</h3>
                <p className="text-sm text-muted-foreground">Check if the broker participates in investor compensation schemes like SIPC (US), FSCS (UK), or similar programs in other jurisdictions.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Account Segregation</h3>
                <p className="text-sm text-muted-foreground">Properly regulated brokers keep client funds in segregated accounts, separate from the company's operational funds for added security.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Fee Disclosure</h3>
                <p className="text-sm text-muted-foreground">Regulated brokers must provide clear and transparent disclosure of all fees and charges, making it easier to compare true costs.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Execution Quality</h3>
                <p className="text-sm text-muted-foreground">Top regulators require brokers to demonstrate best execution practices, ensuring you get competitive prices despite low fees.</p>
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
              Our expert team conducts thorough cost analysis of each broker across multiple asset classes. We open real accounts, execute trades, and evaluate the true cost of trading.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Total Cost Analysis</h3>
                <p className="text-sm text-muted-foreground">We calculate the total cost of typical trades across different asset classes, accounting for commissions, spreads, and any additional fees.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Fee Structure Evaluation</h3>
                <p className="text-sm text-muted-foreground">We examine all account-related fees, including inactivity fees, deposit/withdrawal charges, data subscriptions, and platform fees.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Hidden Cost Detection</h3>
                <p className="text-sm text-muted-foreground">We investigate for less obvious costs, such as currency conversion fees, financing charges for leveraged positions, and account maintenance fees.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Value Assessment</h3>
                <p className="text-sm text-muted-foreground">We evaluate what traders receive in exchange for fees paid, considering platform quality, research tools, and customer service.</p>
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
              <CardTitle>How do brokers offer commission-free trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Brokers can offer commission-free trading through several revenue models. Many earn money from payment for order flow (PFOF), where they route customer orders to market makers in exchange for rebates. Others make money from the bid-ask spread, interest on uninvested cash balances, margin lending, or premium subscription services. Some brokers also earn from securities lending or foreign exchange conversion fees. It's important to understand that "commission-free" doesn't mean completely free, as costs may be embedded in other ways. The best low-cost brokers are transparent about their revenue model.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What hidden fees should I watch out for when choosing a low-cost broker?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>When evaluating low-cost brokers, watch for: inactivity fees charged after periods without trading; withdrawal fees, especially for international transfers; currency conversion fees when trading non-local assets; data subscription fees for real-time market data; account maintenance or platform fees; regulatory fees that may be passed on to customers; higher spreads on certain instruments that offset commission-free trading; and financing/overnight charges for margin or CFD positions. The most transparent brokers will clearly disclose all these potential charges upfront rather than hiding them in fine print.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Is execution quality compromised with low-cost brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Execution quality can vary significantly among low-cost brokers. Some discount brokers may offer slower execution speeds or less favorable pricing in exchange for lower commissions, particularly those using the payment for order flow model. However, many modern low-cost brokers provide excellent execution while maintaining competitive pricing. To evaluate execution quality, consider factors like price improvement (getting better prices than quoted), speed of execution, slippage (difference between expected and actual execution price), and the availability of direct market access. The best low-cost brokers balance affordable pricing with reliable execution.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to reduce your trading costs?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended low-cost brokers today, or use our comparison tool to find the most affordable broker for your specific trading needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Low-Cost Brokers
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