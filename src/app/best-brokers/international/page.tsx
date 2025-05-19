import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best International Brokers 2025 | Top Global Trading Platforms",
  description: "Compare the best international brokers with global market access, multi-currency support, and local regulations. Expert-reviewed for worldwide traders.",
};

// International broker data
const topBrokers = [
  {
    id: 1,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.9,
    minDeposit: "$0",
    tradingFees: "Varies by market",
    platforms: ["Trader Workstation", "Client Portal", "IBKR Mobile"],
    regulation: ["SEC", "FCA", "ASIC", "MAS"],
    pros: [
      "Access to 150+ global markets",
      "33 currency deposit options",
      "Competitive forex conversion"
    ],
    cons: [
      "Complex platform for beginners",
      "Higher learning curve"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      globalMarkets: true,
      multiCurrency: true,
      localSupport: true,
      taxReporting: true
    }
  },
  {
    id: 2,
    name: "Saxo Bank",
    logo: "https://placehold.co/120x60/png?text=Saxo",
    rating: 4.8,
    minDeposit: "$2,000",
    tradingFees: "Varies by market",
    platforms: ["SaxoTraderGO", "SaxoTraderPRO", "Mobile App"],
    regulation: ["FCA", "MAS", "ASIC", "JFSA"],
    pros: [
      "Extensive global market access",
      "Premium research tools",
      "Excellent customer service"
    ],
    cons: [
      "Higher minimum deposit",
      "More expensive than competitors"
    ],
    url: "/reviews/saxo-bank",
    features: {
      globalMarkets: true,
      multiCurrency: true,
      localSupport: true,
      taxReporting: true
    }
  },
  {
    id: 3,
    name: "IG",
    logo: "https://placehold.co/120x60/png?text=IG",
    rating: 4.7,
    minDeposit: "$250",
    tradingFees: "Spread-based, varies by market",
    platforms: ["Web Platform", "Mobile App", "MetaTrader"],
    regulation: ["FCA", "ASIC", "FSCA", "BaFin"],
    pros: [
      "Offices in 16 countries",
      "17,000+ tradable markets",
      "Strong regulatory oversight"
    ],
    cons: [
      "Higher spreads for some markets",
      "Platform can be overwhelming"
    ],
    url: "/reviews/ig",
    features: {
      globalMarkets: true,
      multiCurrency: true,
      localSupport: true,
      taxReporting: false
    }
  },
  {
    id: 4,
    name: "Degiro",
    logo: "https://placehold.co/120x60/png?text=Degiro",
    rating: 4.6,
    minDeposit: "$0",
    tradingFees: "Very low, varies by exchange",
    platforms: ["Web Platform", "Mobile App"],
    regulation: ["AFM", "BaFin", "CNMV", "FCA"],
    pros: [
      "Extremely low fees for global trading",
      "Access to 50+ exchanges worldwide",
      "European investor protection"
    ],
    cons: [
      "Limited research tools",
      "No crypto trading"
    ],
    url: "/reviews/degiro",
    features: {
      globalMarkets: true,
      multiCurrency: true,
      localSupport: false,
      taxReporting: false
    }
  },
  {
    id: 5,
    name: "CMC Markets",
    logo: "https://placehold.co/120x60/png?text=CMC",
    rating: 4.6,
    minDeposit: "$0",
    tradingFees: "Spread-based",
    platforms: ["Next Generation", "Mobile App", "MetaTrader 4"],
    regulation: ["FCA", "ASIC", "MAS", "FSCA"],
    pros: [
      "12 global offices",
      "Multi-language support",
      "10,000+ tradable instruments"
    ],
    cons: [
      "Higher spreads for some markets",
      "Limited cryptocurrency offerings"
    ],
    url: "/reviews/cmc-markets",
    features: {
      globalMarkets: true,
      multiCurrency: true,
      localSupport: true,
      taxReporting: false
    }
  }
];

export default function BestInternationalBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best International Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top brokers with global market access, multi-currency accounts, and worldwide support. All platforms thoroughly tested by our expert team for international traders.
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
              Global Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 International Brokers</h2>
        
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.globalMarkets ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.globalMarkets ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Global Markets</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.multiCurrency ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.multiCurrency ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Multi-Currency</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.localSupport ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.localSupport ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Local Support</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.taxReporting ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.taxReporting ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Tax Reporting</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank International Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our rankings for international brokers are based on extensive testing and analysis across multiple factors that matter to global traders. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Global Market Access:</strong> Availability of multiple stock exchanges, international indices, forex, and other global assets</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Multi-Currency Support:</strong> Ability to deposit, withdraw, and maintain balances in various currencies with competitive conversion rates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Regulatory Coverage:</strong> Oversight from respected financial authorities in multiple jurisdictions for enhanced security</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>International Support:</strong> Multilingual customer service, global office locations, and localized trading platforms</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Cross-Border Considerations:</strong> Solutions for international tax reporting, compliance issues, and region-specific trading restrictions</span>
              </li>
            </ul>
            <p>
              Each broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with evolving global regulatory landscapes and platform capabilities.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Regulations */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">Global Regulatory Landscape</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              International brokers operate under various regulatory frameworks around the world. Understanding these key regulatory bodies helps assess broker reliability:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">FCA (UK)</h3>
                <p className="text-sm text-muted-foreground">The Financial Conduct Authority provides strict oversight with client money segregation and the Financial Services Compensation Scheme (FSCS) protecting up to £85,000.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">SEC/FINRA (US)</h3>
                <p className="text-sm text-muted-foreground">The Securities and Exchange Commission and Financial Industry Regulatory Authority oversee US brokers with robust investor protections including SIPC coverage up to $500,000.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">ASIC (Australia)</h3>
                <p className="text-sm text-muted-foreground">The Australian Securities and Investments Commission enforces strict capital requirements and conduct standards, though without a formal compensation scheme.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">MAS (Singapore)</h3>
                <p className="text-sm text-muted-foreground">The Monetary Authority of Singapore is known for stringent regulation in Asia, requiring client fund segregation and robust capital standards.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">BaFin (Germany)</h3>
                <p className="text-sm text-muted-foreground">The Federal Financial Supervisory Authority enforces EU MiFID II regulations and provides compensation coverage through the EdW investor compensation scheme.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">CySEC (Cyprus)</h3>
                <p className="text-sm text-muted-foreground">The Cyprus Securities and Exchange Commission provides EU passporting rights to brokers with Investor Compensation Fund protection up to €20,000.</p>
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
              Our expert team includes reviewers from multiple countries who test international brokers from various global perspectives to evaluate real-world performance for diverse users.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Global Market Testing</h3>
                <p className="text-sm text-muted-foreground">We evaluate access to major global exchanges, testing the availability, execution quality, and fees for trading international stocks, indices, and other assets.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Multi-Currency Analysis</h3>
                <p className="text-sm text-muted-foreground">We assess deposit/withdrawal methods in various currencies, examining conversion costs, processing times, and overall transparency.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Global Support Evaluation</h3>
                <p className="text-sm text-muted-foreground">We test customer service in multiple languages and time zones, rating responsiveness, knowledge, and accessibility for international clients.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Regulatory Compliance</h3>
                <p className="text-sm text-muted-foreground">We verify each broker's regulatory status across jurisdictions, examining their compliance history and client fund protection measures.</p>
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
              <CardTitle>Can I open an account with an international broker if I'm not a resident of their country?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Yes, most international brokers accept clients from multiple countries, though restrictions apply based on local regulations. The broker will typically verify your residency during the account opening process and may tailor available services based on your location. For example, US residents face significant restrictions due to SEC regulations, with many international brokers excluding them entirely. Similarly, residents of sanctioned countries or those with strict capital controls may be restricted. Always check the broker's "Countries Accepted" list before applying. Top international brokers maintain separate regulatory entities in major jurisdictions (UK, EU, Australia, etc.) and may direct you to the appropriate entity based on your residence to ensure proper regulatory protection.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What are the tax implications of using an international broker?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Trading through an international broker can have complex tax implications that vary based on your country of residence. Most countries tax residents on worldwide income regardless of where the broker is located, so you're generally required to report all trading profits. Key considerations include: 1) Potential double taxation if your broker withholds taxes in their jurisdiction, though tax treaties may provide relief; 2) Foreign account reporting requirements, such as FBAR and Form 8938 for US citizens with accounts exceeding certain thresholds; 3) Currency conversion gains/losses, which may be taxable separately from your trading activity; 4) Different tax treatment for various instruments across jurisdictions; and 5) Limited tax documentation from some international brokers, requiring you to maintain detailed personal records. Consult with a tax professional familiar with international investment taxation in your jurisdiction before trading through foreign brokers.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How do deposit and withdrawal options differ with international brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>International brokers typically offer more diverse funding options than domestic brokers, but with varying fees and processing times. Most provide bank wire transfers in multiple currencies, though these can incur significant fees both from the broker and intermediary banks. Many international brokers support local payment methods in their primary markets, such as SEPA transfers in Europe or Faster Payments in the UK. Digital payment options vary widely, with some brokers accepting credit/debit cards, e-wallets like PayPal or Skrill, and increasingly, cryptocurrency deposits. Currency conversion is a critical consideration—some brokers offer multi-currency accounts that hold balances in different currencies, while others automatically convert all deposits to a base currency, potentially incurring conversion fees each time. Withdrawal processing times also vary significantly, from same-day for local transfers to 3-7 business days for international withdrawals.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to access global markets?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended international brokers today, or use our comparison tool to find the perfect global trading platform for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All International Brokers
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