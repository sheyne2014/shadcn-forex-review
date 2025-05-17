import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Indian Brokers 2025 | Top SEBI-Regulated Trading Platforms",
  description: "Compare the best brokers for Indian traders with strong SEBI regulation, competitive fees, and reliable platforms. Expert-reviewed and ranked.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "Zerodha",
    logo: "https://placehold.co/120x60/png?text=Zerodha",
    rating: 4.9,
    minDeposit: "₹0",
    spread: "Flat ₹20 per order",
    platforms: ["Kite", "Kite Mobile", "Console"],
    regulation: ["SEBI", "NSE", "BSE", "MCX"],
    pros: [
      "Minimal brokerage fees",
      "User-friendly platforms",
      "Excellent educational resources"
    ],
    cons: [
      "Limited research tools",
      "Basic customer support"
    ],
    url: "/reviews/zerodha",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 2,
    name: "ICICI Direct",
    logo: "https://placehold.co/120x60/png?text=ICICI",
    rating: 4.8,
    minDeposit: "₹0",
    spread: "Percentage-based",
    platforms: ["ICICI Direct", "ICICI Mobile Trading"],
    regulation: ["SEBI", "NSE", "BSE", "MCX"],
    pros: [
      "3-in-1 Account integration",
      "Strong research team",
      "Comprehensive product offerings"
    ],
    cons: [
      "Higher brokerage fees",
      "Complex platform for beginners"
    ],
    url: "/reviews/icici-direct",
    features: {
      lowSpread: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 3,
    name: "Upstox",
    logo: "https://placehold.co/120x60/png?text=Upstox",
    rating: 4.7,
    minDeposit: "₹0",
    spread: "Flat ₹20 per order",
    platforms: ["Upstox Pro", "Upstox Mobile"],
    regulation: ["SEBI", "NSE", "BSE", "MCX"],
    pros: [
      "Low brokerage fees",
      "Intuitive trading platforms",
      "Paperless account opening"
    ],
    cons: [
      "Limited educational content",
      "Occasional platform issues"
    ],
    url: "/reviews/upstox",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 4,
    name: "Angel One",
    logo: "https://placehold.co/120x60/png?text=Angel",
    rating: 4.6,
    minDeposit: "₹0",
    spread: "Flat fee plans available",
    platforms: ["Angel Broking", "Angel BEE", "SpeedPro"],
    regulation: ["SEBI", "NSE", "BSE", "MCX"],
    pros: [
      "Robust research and advisory",
      "Multiple pricing plans",
      "Strong mobile platform"
    ],
    cons: [
      "Higher charges on some plans",
      "Customer service can be slow"
    ],
    url: "/reviews/angel-one",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 5,
    name: "5paisa",
    logo: "https://placehold.co/120x60/png?text=5paisa",
    rating: 4.5,
    minDeposit: "₹0",
    spread: "Flat ₹20 per order",
    platforms: ["5paisa Trade Station", "5paisa Mobile"],
    regulation: ["SEBI", "NSE", "BSE", "MCX"],
    pros: [
      "Low brokerage fees",
      "Easy account opening",
      "Good for beginners"
    ],
    cons: [
      "Limited research tools",
      "Basic trading platform"
    ],
    url: "/reviews/5paisa",
    features: {
      lowSpread: true,
      fastExecution: false,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestIndiaBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers in India
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top SEBI-regulated Indian brokers with competitive fees, excellent trading platforms, and comprehensive tools. All platforms thoroughly tested by our expert team.
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
              Indian Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Indian Brokers</h2>
        
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
        <h2 className="text-3xl font-bold mb-8">Indian Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank Indian Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>We prioritize brokers with strong SEBI regulation and exchange memberships.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>All brokers we recommend must be fully regulated by the Securities and Exchange Board of India (SEBI) and be members of major exchanges like NSE, BSE, and MCX. We verify their compliance history and ensure they maintain the required capital adequacy standards to protect investor interests.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Brokerage Fees</CardTitle>
              <CardDescription>We analyze the complete cost structure including commissions and account charges.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We conduct detailed analyses of each broker's fee structure, including flat-fee vs. percentage-based models, intraday and delivery charges, derivatives trading costs, and any additional charges like account maintenance or depository participant (DP) fees. Our rankings favor brokers offering transparent and competitive pricing.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Technology</CardTitle>
              <CardDescription>We evaluate the quality, reliability, and features of trading platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our team tests each platform's execution speed, stability, charting tools, available indicators, and overall user experience. We place strong emphasis on mobile trading capabilities, given the high mobile usage among Indian traders. Platform uptime during peak market hours is carefully assessed.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Research & Education</CardTitle>
              <CardDescription>We assess the quality and depth of market research and educational resources.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Top Indian brokers should offer comprehensive educational content for traders of all levels, alongside quality market research, technical analysis tools, and fundamental research. We give higher ratings to brokers that provide research specifically tailored to Indian markets and sectors.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Indian Regulations Section */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-8">Understanding Indian Broker Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Trading with a SEBI-regulated broker provides significant protections for Indian traders:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Securities and Exchange Board of India (SEBI)</h3>
                <p>SEBI is the primary regulatory authority for securities and commodity markets in India. SEBI-regulated brokers must adhere to strict operational guidelines, maintain proper capital adequacy, and follow client money handling procedures. SEBI also enforces various investor protection measures and market integrity rules.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Exchange Memberships</h3>
                <p>Legitimate Indian brokers must be registered members of key exchanges like the National Stock Exchange (NSE), Bombay Stock Exchange (BSE), and Multi Commodity Exchange (MCX). These exchanges have their own compliance requirements that member brokers must follow.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Investor Protection Fund</h3>
                <p>Indian stock exchanges maintain Investor Protection Funds to provide compensation to investors in case of broker defaults. These funds cover losses up to certain limits if a broker becomes insolvent or fails to meet settlement obligations.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Know Your Customer (KYC) Requirements</h3>
                <p>Indian regulations mandate stringent KYC procedures before opening a trading account. This includes identity verification, address proof, PAN card details, and Aadhaar verification. These measures help prevent fraud and ensure proper accountability in the financial system.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Indian Market Insights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Indian Trading Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Retail Participation Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p>India has seen unprecedented growth in retail trading participation in recent years, with millions of new demat accounts being opened annually. This surge is fueled by increased smartphone penetration, simplified KYC processes, and the rise of discount brokers. Look for brokers with robust infrastructure that can handle this growing demand without service disruptions.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Considerations for Indian Traders</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Indian traders must navigate various tax implications including Securities Transaction Tax (STT), Capital Gains Tax, and GST on brokerage services. Short-term capital gains (holding period less than 1 year) are taxed at 15% for equity, while long-term gains above ₹1 lakh are taxed at 10%. Some brokers offer tax reporting features to help traders efficiently manage their tax obligations.</p>
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
                <span className="font-bold">Account Creation:</span> We open real accounts with each broker to evaluate the onboarding process, including KYC procedures, documentation requirements, and account activation time.
              </li>
              <li>
                <span className="font-bold">Platform Testing:</span> Our team conducts multiple trades on each platform, with a focus on NSE and BSE equities, F&O, and commodity segments, to assess execution speed, reliability, and features during Indian market hours.
              </li>
              <li>
                <span className="font-bold">Customer Service:</span> We contact each broker's support team through multiple channels to evaluate response times, knowledge, and helpfulness, with particular attention to regional language support where available.
              </li>
              <li>
                <span className="font-bold">Regulatory Verification:</span> We verify each broker's regulatory status directly with SEBI and relevant exchanges, examining their compliance history and any regulatory actions against them.
              </li>
              <li>
                <span className="font-bold">Cost Analysis:</span> We conduct detailed analyses of all trading and non-trading fees, testing various transaction scenarios to understand the true cost impact on different types of traders.
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
              <CardTitle>What is the difference between discount and full-service brokers in India?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Discount brokers like Zerodha and Upstox offer significantly lower brokerage fees (typically flat rates per order) but provide limited advisory services. Full-service brokers like ICICI Direct and HDFC Securities charge higher fees (often percentage-based) but offer comprehensive research, personalized advice, relationship manager support, and physical branch networks. For active, self-directed traders, discount brokers usually offer better value.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What documents are required to open a trading account in India?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>To open a trading account in India, you need a PAN card, Aadhaar card for verification, proof of address (utility bill, passport, etc.), passport-sized photographs, and a bank account statement or canceled cheque. Most brokers now offer paperless account opening using eKYC with Aadhaar verification, which significantly speeds up the process. Additionally, you need to complete an in-person verification (IPV), which can often be done via video conferencing.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How are trading profits taxed in India?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>In India, equity trading profits are taxed differently based on holding period. For equity shares and equity-oriented mutual funds held less than 12 months, Short-Term Capital Gains (STCG) tax of 15% applies if STT is paid. For holdings beyond 12 months, Long-Term Capital Gains (LTCG) tax of 10% applies on gains exceeding ₹1 lakh per financial year. For derivatives and intraday trading, profits are typically considered business income and taxed according to your income tax slab.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Can NRIs trade in the Indian stock market?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Yes, Non-Resident Indians (NRIs) can trade in the Indian stock market through special NRI trading accounts. These include Non-Resident External (NRE) accounts or Non-Resident Ordinary (NRO) accounts. NRIs need to complete specific documentation, including Foreign Account Tax Compliance Act (FATCA) declarations. However, NRIs face certain restrictions—they cannot trade in currency derivatives or agricultural commodities, and there are remittance limits governed by FEMA (Foreign Exchange Management Act) regulations.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start trading with an Indian broker?</CardTitle>
            <CardDescription>Compare the top platforms and open an account in minutes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top Indian Brokers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 