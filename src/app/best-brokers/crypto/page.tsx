import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Cryptocurrency Brokers 2025 | Top-Rated Digital Asset Trading Platforms",
  description: "Compare the best crypto brokers with secure custody, competitive fees, and reliable platforms. Expert-reviewed and ranked for all types of crypto traders.",
};

// Crypto broker data
const topBrokers = [
  {
    id: 1,
    name: "Binance",
    logo: "https://placehold.co/120x60/png?text=Binance",
    rating: 4.7,
    minDeposit: "$N/A",
    spread: "0.1%",
    platforms: ["Binance Web", "Binance Mobile", "Binance Pro"],
    regulation: ["Various"],
    pros: [
      "Extensive cryptocurrency selection",
      "Low trading fees",
      "High liquidity and trading volume"
    ],
    cons: [
      "Complex interface for beginners",
      "Has faced regulatory issues in some countries"
    ],
    url: "/reviews/binance",
    features: {
      lowFees: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 2,
    name: "Coinbase",
    logo: "https://placehold.co/120x60/png?text=Coinbase",
    rating: 4.6,
    minDeposit: "$N/A",
    spread: "0.5%",
    platforms: ["Coinbase", "Coinbase Pro", "Coinbase Mobile"],
    regulation: ["FinCEN", "NYSDFS"],
    pros: [
      "User-friendly interface",
      "Strong security features",
      "Regulated in the US"
    ],
    cons: [
      "Higher fees than some competitors",
      "Limited customer support"
    ],
    url: "/reviews/coinbase",
    features: {
      lowFees: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 3,
    name: "Kraken",
    logo: "https://placehold.co/120x60/png?text=Kraken",
    rating: 4.6,
    minDeposit: "$N/A",
    spread: "0.16%",
    platforms: ["Kraken", "Kraken Pro", "Kraken Mobile"],
    regulation: ["FinCEN", "FCA"],
    pros: [
      "Strong security history",
      "Advanced trading features",
      "Good customer support"
    ],
    cons: [
      "Interface can be complex for beginners",
      "Limited payment options in some regions"
    ],
    url: "/reviews/kraken",
    features: {
      lowFees: true,
      fastExecution: true,
      mobileFriendly: true,
      beginner: false
    }
  },
  {
    id: 4,
    name: "Crypto.com",
    logo: "https://placehold.co/120x60/png?text=Crypto.com",
    rating: 4.5,
    minDeposit: "$N/A",
    spread: "0.4%",
    platforms: ["Crypto.com App", "Crypto.com Exchange"],
    regulation: ["MFSA", "FCA"],
    pros: [
      "Attractive rewards and staking options",
      "Wide range of supported cryptocurrencies",
      "Integrated Visa card options"
    ],
    cons: [
      "Best features require significant CRO token staking",
      "Exchange not available in all regions"
    ],
    url: "/reviews/crypto-com",
    features: {
      lowFees: false,
      fastExecution: true,
      mobileFriendly: true,
      beginner: true
    }
  },
  {
    id: 5,
    name: "eToro",
    logo: "https://placehold.co/120x60/png?text=eToro",
    rating: 4.6,
    minDeposit: "$50",
    spread: "1%",
    platforms: ["eToro Platform", "eToro Mobile"],
    regulation: ["CySEC", "FCA", "ASIC"],
    pros: [
      "Social trading features",
      "User-friendly platform",
      "Wide range of assets beyond crypto"
    ],
    cons: [
      "Higher fees for crypto trading",
      "Not all cryptocurrencies are directly owned"
    ],
    url: "/broker/etoro",
    features: {
      lowFees: false,
      fastExecution: false,
      mobileFriendly: true,
      beginner: true
    }
  }
];

export default function BestCryptoBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Cryptocurrency Brokers
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top crypto brokers with secure storage, competitive fees, and comprehensive trading tools. All platforms thoroughly tested by our expert team.
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
              Security & Regulations
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Cryptocurrency Brokers</h2>

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
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Trading Fee</h4>
                          <p className="font-medium">{broker.spread}</p>
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.lowFees ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.lowFees ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Low Fees</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.fastExecution ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.fastExecution ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Fast Execution</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.mobileFriendly ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.mobileFriendly ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Mobile Friendly</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.beginner ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.beginner ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Good for Beginners</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank Cryptocurrency Brokers</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our cryptocurrency broker rankings are based on extensive testing and analysis across multiple factors. We prioritize brokers with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Security:</strong> Robust security measures including cold storage, two-factor authentication, and insurance policies</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Fee Structure:</strong> Transparent and competitive trading fees, withdrawal fees, and deposit methods</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Coin Selection:</strong> Wide range of supported cryptocurrencies beyond just Bitcoin and Ethereum</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Regulation:</strong> Compliance with relevant regulations and licensing in major jurisdictions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>User Experience:</strong> Intuitive platforms with robust features for both beginners and advanced traders</span>
              </li>
            </ul>
            <p>
              Each crypto broker is regularly re-evaluated to ensure our rankings remain accurate and up-to-date with the rapidly evolving cryptocurrency market.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Security */}
      <section className="mb-16" id="regulations">
        <h2 className="text-3xl font-bold mb-6">Cryptocurrency Security & Regulations</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              When choosing a cryptocurrency broker, security and regulatory compliance are paramount. Key security features to look for include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Cold Storage</h3>
                <p className="text-sm text-muted-foreground">The majority of customer funds should be kept in offline "cold" storage, protected from online threats.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">2FA adds an essential layer of security beyond just username and password protection.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Insurance Policies</h3>
                <p className="text-sm text-muted-foreground">Leading platforms offer insurance on digital assets to protect against theft or security breaches.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Regulatory Compliance</h3>
                <p className="text-sm text-muted-foreground">Look for platforms that comply with regulations in major jurisdictions like FinCEN in the US or FCA in the UK.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Proof of Reserves</h3>
                <p className="text-sm text-muted-foreground">Transparent platforms conduct and publish audits proving they hold the assets they claim to hold.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Whitelisting & Security Controls</h3>
                <p className="text-sm text-muted-foreground">Advanced features like withdrawal address whitelisting and time locks provide additional protection.</p>
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
              Our expert team conducts comprehensive hands-on testing of each crypto broker. We open real accounts, deposit funds, execute trades, test customer service, and evaluate the overall trading experience.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Security Assessment</h3>
                <p className="text-sm text-muted-foreground">We evaluate security measures including cold storage policies, two-factor authentication options, and platform history.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Fee Analysis</h3>
                <p className="text-sm text-muted-foreground">We analyze all applicable fees including trading fees, deposit/withdrawal fees, and any other hidden charges.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Platform Testing</h3>
                <p className="text-sm text-muted-foreground">We test all trading interfaces for ease of use, features, stability, and mobile compatibility.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Cryptocurrency Selection</h3>
                <p className="text-sm text-muted-foreground">We assess the range of available cryptocurrencies, staking options, and additional features like lending or earning.</p>
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
              <CardTitle>What's the difference between a cryptocurrency exchange and a broker?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Crypto exchanges facilitate direct trading between users on an order book, while brokers act as intermediaries, often offering simplified interfaces and additional services. Exchanges typically have lower fees but may be more complex to use, while brokers provide easier entry points for beginners but may charge higher fees or spreads.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How much money do I need to start trading crypto?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Many cryptocurrency platforms have no minimum deposit requirements, allowing you to start with as little as $1-$10. However, transaction fees may make very small trades inefficient. For beginners, starting with $100-$500 provides more flexibility while limiting risk exposure as you learn.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Is cryptocurrency trading safe?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Cryptocurrency trading involves significant risks including price volatility, potential security breaches, and regulatory uncertainty. However, using reputable, regulated platforms with strong security measures reduces many risks. Always use strong passwords, two-factor authentication, and never invest more than you can afford to lose.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to start trading cryptocurrencies?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended crypto brokers today, or use our comparison tool to find the perfect platform for your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Crypto Brokers
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