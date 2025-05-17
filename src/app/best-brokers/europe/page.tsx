import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best European Brokers 2025 | Top Trading Platforms for EU Traders",
  description: "Compare the best brokers for European traders with strong EU regulation, competitive fees, and reliable platforms. Expert-reviewed and ranked.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "Degiro",
    logo: "https://placehold.co/120x60/png?text=Degiro",
    rating: 4.9,
    minDeposit: "€0",
    spread: "Low commissions",
    platforms: ["Degiro Platform", "Mobile App"],
    regulation: ["AFM", "DNB", "BaFin", "CONSOB", "CNMV"],
    pros: [
      "Ultra-low fees",
      "Access to global exchanges",
      "No minimum deposit"
    ],
    cons: [
      "Limited research tools",
      "No forex or CFD trading"
    ],
    url: "/reviews/degiro",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 2,
    name: "eToro",
    logo: "https://placehold.co/120x60/png?text=eToro",
    rating: 4.8,
    minDeposit: "€50",
    spread: "Variable by market",
    platforms: ["eToro Platform", "Mobile App"],
    regulation: ["CySEC", "FCA", "ASIC"],
    pros: [
      "Social trading features",
      "User-friendly platform",
      "Wide asset selection"
    ],
    cons: [
      "Higher spreads than some competitors",
      "Withdrawal fees"
    ],
    url: "/reviews/etoro",
    features: {
      lowSpread: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 3,
    name: "XTB",
    logo: "https://placehold.co/120x60/png?text=XTB",
    rating: 4.7,
    minDeposit: "€0",
    spread: "From 0.1 pips",
    platforms: ["xStation 5", "MT4", "Mobile App"],
    regulation: ["KNF", "FCA", "CySEC", "IFSC"],
    pros: [
      "Competitive spreads",
      "No minimum deposit",
      "Excellent educational resources"
    ],
    cons: [
      "Limited product range",
      "Inactivity fees after one year"
    ],
    url: "/reviews/xtb",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 4,
    name: "Saxo Bank",
    logo: "https://placehold.co/120x60/png?text=Saxo",
    rating: 4.6,
    minDeposit: "€500",
    spread: "From 0.4 pips",
    platforms: ["SaxoTraderGO", "SaxoTraderPRO", "Mobile App"],
    regulation: ["Danish FSA", "FCA", "MAS", "ASIC"],
    pros: [
      "Extensive product range",
      "Advanced trading platforms",
      "Excellent research"
    ],
    cons: [
      "Higher minimum deposit",
      "Complex fee structure"
    ],
    url: "/reviews/saxo-bank",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 5,
    name: "IG",
    logo: "https://placehold.co/120x60/png?text=IG",
    rating: 4.5,
    minDeposit: "€250",
    spread: "From 0.6 pips",
    platforms: ["IG Platform", "MT4", "ProRealTime", "L2 Dealer"],
    regulation: ["FCA", "BaFin", "ASIC", "FINMA", "MAS"],
    pros: [
      "Extensive market access",
      "Advanced trading tools",
      "Established reputation"
    ],
    cons: [
      "Higher minimum deposit",
      "Complex platform for beginners"
    ],
    url: "/reviews/ig",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  }
];

export default function BestEuropeBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers in Europe
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top European brokers with ESMA-compliant platforms, multilingual support, and comprehensive trading tools for traders across the EU.
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
              EU Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 European Brokers</h2>
        
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
        <h2 className="text-3xl font-bold mb-8">European Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank European Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>We prioritize brokers with strong EU regulation and customer protection measures.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>All brokers we recommend must be fully regulated by at least one major European financial authority such as CySEC, FCA (pre-Brexit), BaFin, AMF, or other national regulators operating under ESMA guidelines. We verify that brokers comply with MiFID II requirements, including negative balance protection and leverage restrictions.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trading Costs</CardTitle>
              <CardDescription>We analyze the complete cost structure including spreads, commissions, and account fees.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We conduct detailed analyses of each broker's fee structure, including typical spreads on popular currency pairs, commissions, swaps, and any additional account fees. We examine costs in both euro-denominated accounts and other currency options available to European clients.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Platform Capabilities</CardTitle>
              <CardDescription>We evaluate the quality, reliability, and features of trading platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our team tests each platform's execution speed, stability, charting tools, available indicators, and overall user experience. We consider both desktop and mobile platforms, with special attention to multilingual support for European traders from different countries.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Multilingual Support</CardTitle>
              <CardDescription>We assess the availability of local language service and resources.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Top European brokers should offer customer support, educational content, and trading platforms in multiple EU languages. We give higher ratings to brokers that provide comprehensive localization, including phone support in major European languages.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* EU Regulations Section */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-8">Understanding European Broker Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Trading with an EU-regulated broker provides significant protections for European traders:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">European Securities and Markets Authority (ESMA)</h3>
                <p>ESMA sets standards that all EU financial regulators must follow. Key protections include leverage limits on CFDs (30:1 for major forex pairs, lower for other instruments), negative balance protection, standardized risk warnings, and restrictions on marketing bonuses.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Markets in Financial Instruments Directive (MiFID II)</h3>
                <p>MiFID II regulations enforce strict transparency requirements, best execution policies, and investor protection measures. EU brokers must provide detailed information about costs, risks, and maintain clear audit trails of all transactions.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Client Money Segregation</h3>
                <p>EU regulations require brokers to keep client funds in segregated accounts, separate from the company's operational funds, ensuring your money is protected if the broker faces financial difficulties.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Investor Compensation Schemes</h3>
                <p>European brokers must participate in national investor compensation schemes, which typically provide protection up to €20,000 (varies by country) if a regulated broker becomes insolvent.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* European Market Insights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">European Trading Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Border Banking Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p>European traders benefit from SEPA (Single Euro Payments Area) integration, which enables fast and free EUR transfers between accounts in different EU countries. This allows traders to fund accounts with EU-regulated brokers based in any member state with minimal friction or cost.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Considerations Across Europe</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tax treatment of trading income varies significantly across European countries. Some nations like Germany apply a flat tax rate on capital gains, while others like France have progressive rates. Several European brokers offer tax-reporting tools designed specifically for different national requirements.</p>
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
                <span className="font-bold">Account Creation:</span> We open real accounts with each broker to evaluate the onboarding process, including KYC procedures and account funding options.
              </li>
              <li>
                <span className="font-bold">Platform Testing:</span> Our team conducts multiple trades on each platform, assessing execution speed, slippage, and overall reliability under various market conditions.
              </li>
              <li>
                <span className="font-bold">Multilingual Support Assessment:</span> We contact each broker's support team in multiple European languages to evaluate response times, knowledge, and helpfulness.
              </li>
              <li>
                <span className="font-bold">Regulatory Verification:</span> We verify each broker's regulatory status directly with the relevant European financial authorities and assess their history of compliance.
              </li>
              <li>
                <span className="font-bold">Cost Analysis:</span> We conduct detailed analyses of all trading and non-trading fees, including spread comparisons during different market conditions.
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
              <CardTitle>How do leverage restrictions affect European traders?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>ESMA regulations limit leverage for retail traders to protect consumers from excessive risk. Maximum leverage is capped at 30:1 for major forex pairs, 20:1 for minor forex pairs, gold, and major indices, 10:1 for commodities other than gold and non-major equity indices, 5:1 for individual equities, and 2:1 for cryptocurrencies. Professional clients can access higher leverage by qualifying under specific criteria regarding trading experience, portfolio size, and financial industry knowledge.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Can European traders access brokers from any EU country?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Yes, under EU passporting rules, a broker regulated in one EU member state can offer services to clients throughout the European Economic Area (EEA). This means a trader in Spain, for example, can use a broker regulated by the Cyprus Securities and Exchange Commission (CySEC) with the same protections as if the broker were directly regulated in Spain.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How has Brexit affected European traders using UK brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Brexit has complicated the relationship between UK brokers and EU clients. UK brokers must now obtain separate authorizations in EU countries or establish EU-regulated entities to continue serving European clients with full regulatory protections. Many larger brokers have established EU subsidiaries (often in Cyprus, Germany, or Ireland) to maintain seamless service to European clients, while some smaller firms have had to exit the European market.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What payment methods are commonly available with European brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>European brokers typically offer a wide range of payment options including SEPA transfers, credit/debit cards, and various electronic payment methods. Many also support regional payment systems popular in specific European countries, such as Sofort for German clients, iDEAL for Dutch clients, or Trustly for Nordic customers. Some brokers also offer multi-currency accounts, allowing clients to deposit and maintain balances in EUR, GBP, USD, and other currencies.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start trading with a European broker?</CardTitle>
            <CardDescription>Compare the top platforms and open an account in minutes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top European Brokers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 