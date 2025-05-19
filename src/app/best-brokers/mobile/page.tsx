import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Mobile Trading Platforms 2025 | Top Mobile Trading Apps",
  description: "Compare the best mobile trading apps with advanced features, ease of use, and reliable execution. Expert-reviewed and ranked for on-the-go traders.",
};

// Mobile broker data
const topBrokers = [
  {
    id: 1,
    name: "E*TRADE",
    logo: "https://placehold.co/120x60/png?text=ETRADE",
    rating: 4.8,
    minDeposit: "$0",
    tradingFees: "$0 for stocks/ETFs",
    platforms: ["Power E*TRADE Mobile", "E*TRADE Web", "Power E*TRADE"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Feature-rich mobile app",
      "Excellent charting capabilities",
      "Robust research tools"
    ],
    cons: [
      "Higher options contract fees",
      "Multiple apps may confuse users"
    ],
    url: "/reviews/etrade",
    features: {
      advancedCharts: true,
      optionsTools: true,
      biometricLogin: true,
      watchlists: true
    }
  },
  {
    id: 2,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD+Ameritrade",
    rating: 4.8,
    minDeposit: "$0",
    tradingFees: "$0 for stocks/ETFs",
    platforms: ["thinkorswim Mobile", "TD Ameritrade Mobile", "thinkorswim Desktop"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Professional-grade mobile platform",
      "Advanced technical analysis",
      "Multi-leg options trading"
    ],
    cons: [
      "Steep learning curve",
      "Two separate mobile apps"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      advancedCharts: true,
      optionsTools: true,
      biometricLogin: true,
      watchlists: true
    }
  },
  {
    id: 3,
    name: "Interactive Brokers",
    logo: "https://placehold.co/120x60/png?text=IBKR",
    rating: 4.7,
    minDeposit: "$0",
    tradingFees: "Variable, very competitive",
    platforms: ["IBKR Mobile", "Trader Workstation", "Client Portal"],
    regulation: ["SEC", "FINRA", "FCA"],
    pros: [
      "Global market access",
      "Advanced order types",
      "Comprehensive functionality"
    ],
    cons: [
      "Complex interface",
      "Not ideal for beginners"
    ],
    url: "/reviews/interactive-brokers",
    features: {
      advancedCharts: true,
      optionsTools: true,
      biometricLogin: true,
      watchlists: true
    }
  },
  {
    id: 4,
    name: "Robinhood",
    logo: "https://placehold.co/120x60/png?text=Robinhood",
    rating: 4.5,
    minDeposit: "$0",
    tradingFees: "$0 for stocks/ETFs/options",
    platforms: ["Robinhood Mobile App", "Robinhood Web"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Clean, intuitive interface",
      "Quick trade execution",
      "Seamless account funding"
    ],
    cons: [
      "Limited research tools",
      "Basic charting capabilities"
    ],
    url: "/reviews/robinhood",
    features: {
      advancedCharts: false,
      optionsTools: false,
      biometricLogin: true,
      watchlists: true
    }
  },
  {
    id: 5,
    name: "Webull",
    logo: "https://placehold.co/120x60/png?text=Webull",
    rating: 4.6,
    minDeposit: "$0",
    tradingFees: "$0 for stocks/ETFs/options",
    platforms: ["Webull Mobile", "Webull Desktop", "Web Platform"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Advanced charting on mobile",
      "Extended trading hours",
      "Free level 2 market data"
    ],
    cons: [
      "Less intuitive for beginners",
      "Limited investment product range"
    ],
    url: "/reviews/webull",
    features: {
      advancedCharts: true,
      optionsTools: true,
      biometricLogin: true,
      watchlists: true
    }
  }
];

export default function BestMobileTradingPlatformsPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Mobile Trading Platforms
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top mobile trading apps with advanced features, ease of use, and reliable execution. All platforms thoroughly tested by our expert team for on-the-go traders.
        </p>
      </div>
      
      {/* Quick Navigation */}
      <div className="bg-muted/30 p-6 rounded-lg mb-12">
        <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="#comparison">
            <Button variant="outline" className="w-full justify-start">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Platform Comparison
            </Button>
          </Link>
          <Link href="#how-we-rank">
            <Button variant="outline" className="w-full justify-start">
              <Info className="mr-2 h-4 w-4" />
              How We Rank
            </Button>
          </Link>
          <Link href="#security">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Security
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Mobile Trading Apps</h2>
        
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
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.advancedCharts ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.advancedCharts ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Advanced Charts</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.optionsTools ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.optionsTools ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Options Tools</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.biometricLogin ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.biometricLogin ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Biometric Login</span>
                        </div>
                        <div className={`p-3 rounded-lg border flex items-center ${broker.features.watchlists ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 'bg-muted/30'}`}>
                          <CheckCircle2 className={`h-5 w-5 mr-2 ${broker.features.watchlists ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Customizable Watchlists</span>
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
        <h2 className="text-3xl font-bold mb-6">How We Rank Mobile Trading Platforms</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our mobile trading platform rankings are based on extensive testing across multiple factors. We prioritize platforms with:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Usability:</strong> Intuitive navigation, clean design, and easy trade execution process optimized for touch screens</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Feature Parity:</strong> Access to most features available on desktop platforms without significant limitations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Charts & Analysis:</strong> High-quality mobile charting with multiple timeframes, indicators, and drawing tools</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Performance:</strong> Fast loading times, stable operation, and minimal crashes or freezes during market hours</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span><strong>Security:</strong> Strong authentication options including biometric login, device verification, and encryption</span>
              </li>
            </ul>
            <p>
              Each mobile platform is tested on both iOS and Android devices to ensure consistent performance and functionality across operating systems.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Security */}
      <section className="mb-16" id="security">
        <h2 className="text-3xl font-bold mb-6">Mobile Trading Security</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              Security is particularly important for mobile trading apps. Here are key security features to look for:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Biometric Authentication</h3>
                <p className="text-sm text-muted-foreground">The best mobile trading apps support fingerprint and facial recognition, making login both secure and convenient.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Additional security layer requiring a second verification method beyond your password for sensitive operations.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Automatic Logout</h3>
                <p className="text-sm text-muted-foreground">Apps should automatically log you out after a period of inactivity to prevent unauthorized access if your device is lost.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Data Encryption</h3>
                <p className="text-sm text-muted-foreground">All data transmitted between your mobile device and the broker's servers should be encrypted using industry-standard protocols.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Device Verification</h3>
                <p className="text-sm text-muted-foreground">Top trading apps verify new devices attempting to access your account, sending alerts or requiring additional verification.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">Trade Confirmations</h3>
                <p className="text-sm text-muted-foreground">Secure mobile platforms require verification or PIN entry for trades above certain thresholds to prevent costly mistakes.</p>
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
              Our expert team conducts rigorous hands-on testing of each mobile trading app across multiple devices and real-world scenarios. We test both everyday and advanced functionality.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Real-World Usage Testing</h3>
                <p className="text-sm text-muted-foreground">We evaluate mobile apps during market hours with real accounts, testing trade execution, order modification, and position monitoring.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Connectivity Testing</h3>
                <p className="text-sm text-muted-foreground">We test apps under various network conditions including Wi-Fi, 5G, 4G, and during transitions between networks to ensure reliability.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">Feature Evaluation</h3>
                <p className="text-sm text-muted-foreground">We compare the mobile app's functionality against its desktop counterpart, identifying any missing features or limitations.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-bold mb-1">User Experience Assessment</h3>
                <p className="text-sm text-muted-foreground">We evaluate navigation flow, touch responsiveness, readability, and overall ergonomics of the mobile trading experience.</p>
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
              <CardTitle>Are mobile trading apps as powerful as desktop platforms?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Modern mobile trading apps have closed the gap significantly with desktop platforms, with many offering nearly identical functionality. Top-tier mobile apps now provide advanced charting with multiple indicators, complex order types, portfolio analytics, and comprehensive research tools. However, some limitations remain due to screen size constraints, such as reduced multi-window capabilities and less detailed technical analysis. The best mobile apps address these limitations through responsive design and optimized interfaces. For most traders, today's premium mobile apps can handle 90-95% of trading activities, with only the most advanced functions requiring a desktop platform.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Is it safe to trade using public Wi-Fi networks?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Trading on public Wi-Fi networks carries significant security risks and should generally be avoided. Public networks are vulnerable to various attacks including "man-in-the-middle" interceptions where hackers can potentially access your trading credentials or data. If you must trade while away from secure networks, use your mobile carrier's data connection instead, which offers better security than public Wi-Fi. For situations where public Wi-Fi is your only option, employ a reputable VPN (Virtual Private Network) service to encrypt your connection. Additionally, ensure your mobile trading app uses two-factor authentication and never save your login credentials on public or shared devices.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What should I do if my phone with my trading app is lost or stolen?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>If your phone with your trading app is lost or stolen, take immediate action: 1) Log into your brokerage account from another device and change your password immediately. 2) Contact your broker's customer service to report the situation and potentially freeze your account temporarily. 3) Use your broker's website to revoke access for the lost device if they offer this feature. 4) Use your phone carrier's services to remotely lock or wipe your device. 5) Monitor your trading account for any unauthorized activity. To prepare for this situation in advance, ensure your trading app requires biometric authentication or a PIN/password to open, enable two-factor authentication, and never store login credentials in easily accessible locations on your device.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to trade on the go?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Open an account with one of our recommended mobile trading platforms today, or use our comparison tool to find the perfect mobile app for your trading style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tools/compare">
              Compare All Mobile Platforms
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