import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Asia Brokers 2025 | Top Trading Platforms for Asian Markets",
  description: "Compare the best Asia trading brokers with reliable regulation, competitive fees, and customized platforms. Expert-reviewed and ranked for traders across Asian markets.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IB",
    rating: 4.9,
    minDeposit: "$2,000",
    spread: "Commission-based",
    platforms: ["IBKR Trader Workstation", "IBKR Mobile", "API"],
    regulation: ["US SEC", "MAS", "SFC", "SEBI", "JFSA"],
    pros: [
      "Extensive market access across Asian exchanges",
      "Advanced trading platforms",
      "Strong regulatory protection"
    ],
    cons: [
      "Higher minimum deposit requirement",
      "Complex platform for beginners",
      "Inactivity fees may apply"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 2,
    name: "Saxo Markets",
    logo: "https://placehold.co/120x60/png?text=Saxo",
    rating: 4.8,
    minDeposit: "$2,000",
    spread: "From 0.6 pips",
    platforms: ["SaxoTraderGO", "SaxoTraderPRO"],
    regulation: ["MAS", "ASIC", "FCA", "JFSA"],
    pros: [
      "Excellent research tools",
      "Wide range of Asian markets",
      "Customized regional offerings"
    ],
    cons: [
      "Higher minimum deposit",
      "Premium pricing structure"
    ],
    url: "/reviews/saxo-markets",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 3,
    name: "IG Markets",
    logo: "https://placehold.co/120x60/png?text=IG",
    rating: 4.7,
    minDeposit: "$250",
    spread: "From 0.6 pips",
    platforms: ["IG Platform", "MT4", "ProRealTime"],
    regulation: ["MAS", "ASIC", "FCA", "JFSA"],
    pros: [
      "Strong presence across Asia",
      "Multiple regulatory frameworks",
      "Excellent educational resources"
    ],
    cons: [
      "Higher spreads for some Asian instruments",
      "Limited cryptocurrency offerings in some regions"
    ],
    url: "/reviews/ig-markets",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 4,
    name: "Oanda",
    logo: "https://placehold.co/120x60/png?text=Oanda",
    rating: 4.6,
    minDeposit: "$0",
    spread: "From 1.0 pips",
    platforms: ["Oanda Trade", "MT4", "MT5", "TradingView"],
    regulation: ["MAS", "ASIC", "CFTC", "FCA"],
    pros: [
      "No minimum deposit requirement",
      "User-friendly platforms",
      "Strong educational content for Asian markets"
    ],
    cons: [
      "Higher spreads compared to some competitors",
      "Limited product range in certain Asian countries"
    ],
    url: "/reviews/oanda",
    features: {
      lowSpread: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 5,
    name: "Tiger Brokers",
    logo: "https://placehold.co/120x60/png?text=Tiger",
    rating: 4.5,
    minDeposit: "$100",
    spread: "Commission-based",
    platforms: ["Tiger Trade"],
    regulation: ["MAS", "SFC", "SEC"],
    pros: [
      "Specialized in Asian markets",
      "Low commissions",
      "Multi-language support"
    ],
    cons: [
      "Limited historical presence compared to established brokers",
      "Fewer research tools than premium competitors"
    ],
    url: "/reviews/tiger-brokers",
    features: {
      lowSpread: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestAsiaBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers in Asia
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top regulated brokers serving Asian markets with competitive fees, reliable trading platforms, and specialized regional offerings. All platforms thoroughly tested by our expert team.
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
              Asian Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Asia Brokers</h2>
        
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
        <h2 className="text-3xl font-bold mb-8">Asia Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank Asia Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Framework</CardTitle>
              <CardDescription>We prioritize brokers with strong regional regulation across Asian markets.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>All recommended brokers must be properly regulated by respected authorities such as the Monetary Authority of Singapore (MAS), Securities and Futures Commission (SFC) in Hong Kong, Financial Services Agency (JFSA) in Japan, or Securities and Exchange Board of India (SEBI). Multi-jurisdictional regulation is viewed favorably.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trading Costs</CardTitle>
              <CardDescription>We analyze the complete cost structure including spreads, commissions, and account fees.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We conduct detailed analyses of each broker's fee structure, including typical spreads on popular Asian currency pairs and local indices, commissions, overnight charges, and additional account fees. Our rankings favor brokers offering competitive and transparent pricing structures appropriate for Asian markets.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Regional Access</CardTitle>
              <CardDescription>We evaluate access to local Asian exchanges and markets.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Top brokers serving Asian clients should provide access to major regional exchanges including Tokyo, Hong Kong, Shanghai, Shenzhen, Singapore, and other key markets. We assess the breadth of available instruments, including local stocks, indices, and currency pairs.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Localization</CardTitle>
              <CardDescription>We assess platform localization, language support, and cultural adaptations.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Quality brokers serving Asian markets should offer localized services including native language support, local payment methods, and customer service hours that align with Asian time zones. We give higher ratings to brokers that demonstrate cultural awareness and regional customization.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Asian Regulations Section */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-8">Understanding Asian Broker Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Trading with well-regulated brokers in Asia provides essential protections:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Varied Regulatory Frameworks</h3>
                <p>Asian markets operate under diverse regulatory frameworks. Respected authorities include the Monetary Authority of Singapore (MAS), Japan's Financial Services Agency (JFSA), Hong Kong's Securities and Futures Commission (SFC), and the Securities and Exchange Board of India (SEBI).</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Client Money Protection</h3>
                <p>Properly regulated Asian brokers must segregate client funds from operational accounts. The level of protection varies by jurisdiction, with Singapore and Hong Kong typically offering more robust frameworks.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Investor Compensation Schemes</h3>
                <p>Some Asian jurisdictions maintain investor compensation funds. For example, Hong Kong's Investor Compensation Fund protects clients up to HK$500,000, while Singapore's scheme covers up to S$100,000 under specific conditions.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Cross-Border Considerations</h3>
                <p>When trading across Asian borders, understand which regulatory authority has jurisdiction. Many traders prefer brokers with multiple regional licenses to ensure compliant access to various Asian markets.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Asian Market Insights Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Asian Trading Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Emerging Market Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Asia's emerging markets offer significant growth potential. Countries like Vietnam, Indonesia, and the Philippines are experiencing rapid economic expansion, creating opportunities for retail traders. Look for brokers providing access to these emerging exchanges alongside established markets in Japan, China, and Hong Kong.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Currency Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Asian currency pairs offer unique trading opportunities due to regional economic developments and trade relations. Pairs like USD/JPY, USD/SGD, USD/CNH, and crosses like EUR/JPY deserve attention. Quality brokers should offer competitive spreads on these regional currency pairs and provide relevant analysis.</p>
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
                <span className="font-bold">Account Creation:</span> We open real accounts with each broker to evaluate the onboarding process, including KYC procedures and account funding options available to Asian clients.
              </li>
              <li>
                <span className="font-bold">Regional Platform Testing:</span> Our team conducts multiple trades on each platform, assessing execution speed, slippage, and overall reliability when trading Asian instruments during local market hours.
              </li>
              <li>
                <span className="font-bold">Localized Customer Service:</span> We contact each broker's support team through multiple channels in different Asian languages to evaluate response times, knowledge, and helpfulness.
              </li>
              <li>
                <span className="font-bold">Regulatory Verification:</span> We verify each broker's regulatory status directly with relevant Asian authorities and assess their history of compliance in each jurisdiction.
              </li>
              <li>
                <span className="font-bold">Regional Cost Analysis:</span> We conduct detailed analyses of trading costs specific to Asian markets, including spread comparisons during Asian trading hours.
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
              <CardTitle>Which regulatory bodies should I look for when choosing an Asian broker?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Key Asian regulatory authorities include Singapore's Monetary Authority of Singapore (MAS), Hong Kong's Securities and Futures Commission (SFC), Japan's Financial Services Agency (JFSA), and India's Securities and Exchange Board (SEBI). Brokers regulated by multiple authorities typically offer more comprehensive protection and wider market access.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Are there specific payment methods I should look for with Asian brokers?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Quality brokers serving Asian markets should offer localized payment options such as local bank transfers, regional payment systems like Alipay or PayNow, and popular regional credit cards. Availability of local currency accounts (SGD, HKD, JPY, etc.) is also important to avoid excessive currency conversion fees.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How do capital controls in some Asian countries affect trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Several Asian countries maintain capital controls that can impact funding and withdrawals. These restrictions vary significantly by country—China has strict controls, while Singapore has minimal restrictions. Select brokers familiar with navigating these regulations in your specific country, as they can offer compliant funding solutions and documentation guidance.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What trading hours should I consider for Asian markets?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Asian markets operate across multiple time zones, with major exchanges like Tokyo (JST), Hong Kong/Singapore (HKT/SGT), and Mumbai (IST) having different trading hours. Quality brokers should provide clear information about market hours and offer extended trading where available. Consider how these hours align with your schedule, particularly if you're trading from a different time zone.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start trading with an Asian broker?</CardTitle>
            <CardDescription>Compare the top platforms and open an account in minutes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top Asia Brokers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 