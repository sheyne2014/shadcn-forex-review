import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Best Brokers for Beginners 2025 | Top Trading Platforms for New Traders",
  description: "Compare the best trading platforms for beginner traders with user-friendly interfaces, educational resources, and low minimum deposits. Expert-reviewed and ranked.",
};

// Sample broker data
const topBrokers = [
  {
    id: 1,
    name: "eToro",
    logo: "https://placehold.co/120x60/png?text=eToro",
    rating: 4.9,
    minDeposit: "$50",
    spread: "From 1.0 pips",
    platforms: ["eToro Platform", "eToro Mobile"],
    regulation: ["FCA", "CySEC", "ASIC"],
    pros: [
      "User-friendly interface",
      "Extensive educational resources",
      "Social trading features"
    ],
    cons: [
      "Higher spreads than some competitors",
      "Limited advanced tools",
      "Withdrawal fees"
    ],
    url: "/reviews/etoro",
    features: {
      lowMinDeposit: true,
      educationalResources: true,
      userFriendly: true,
      demoAccount: true
    }
  },
  {
    id: 2,
    name: "Plus500",
    logo: "https://placehold.co/120x60/png?text=Plus500",
    rating: 4.8,
    minDeposit: "$100",
    spread: "From 0.6 pips",
    platforms: ["Plus500 Platform", "Plus500 Mobile"],
    regulation: ["FCA", "CySEC", "ASIC", "MAS"],
    pros: [
      "Intuitive platform",
      "Free demo account with no time limit",
      "24/7 customer support"
    ],
    cons: [
      "Limited educational content",
      "No social trading features",
      "Limited product range"
    ],
    url: "/reviews/plus500",
    features: {
      lowMinDeposit: true,
      educationalResources: false,
      userFriendly: true,
      demoAccount: true
    }
  },
  {
    id: 3,
    name: "AvaTrade",
    logo: "https://placehold.co/120x60/png?text=AvaTrade",
    rating: 4.7,
    minDeposit: "$100",
    spread: "From 0.9 pips",
    platforms: ["AvaTrade GO", "MT4", "MT5"],
    regulation: ["ASIC", "FSCA", "FRSA", "FSA"],
    pros: [
      "Comprehensive educational center",
      "Multiple platform options",
      "Responsive customer service"
    ],
    cons: [
      "Inactivity fees",
      "Higher spreads on some instruments",
      "Limited research tools"
    ],
    url: "/reviews/avatrade",
    features: {
      lowMinDeposit: true,
      educationalResources: true,
      userFriendly: true,
      demoAccount: true
    }
  },
  {
    id: 4,
    name: "TD Ameritrade",
    logo: "https://placehold.co/120x60/png?text=TD",
    rating: 4.6,
    minDeposit: "$0",
    spread: "Commission-based",
    platforms: ["thinkorswim", "TD Ameritrade Mobile"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "No minimum deposit",
      "Extensive educational library",
      "Paper trading functionality"
    ],
    cons: [
      "Platform can be overwhelming for beginners",
      "Higher options contract fees",
      "US-focused"
    ],
    url: "/reviews/td-ameritrade",
    features: {
      lowMinDeposit: true,
      educationalResources: true,
      userFriendly: false,
      demoAccount: true
    }
  },
  {
    id: 5,
    name: "Robinhood",
    logo: "https://placehold.co/120x60/png?text=Robinhood",
    rating: 4.5,
    minDeposit: "$0",
    spread: "Commission-free",
    platforms: ["Robinhood App", "Robinhood Web"],
    regulation: ["SEC", "FINRA"],
    pros: [
      "Commission-free trading",
      "Extremely simple interface",
      "No minimum deposit"
    ],
    cons: [
      "Limited investment offerings",
      "Basic research tools",
      "Limited customer support"
    ],
    url: "/reviews/robinhood",
    features: {
      lowMinDeposit: true,
      educationalResources: false,
      userFriendly: true,
      demoAccount: false
    }
  }
];

export default function BestBeginnerBrokersPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Updated January 2025</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers for Beginners
        </h1>
        <p className="text-xl text-muted-foreground">
          Compare the top trading platforms for new traders with user-friendly interfaces, comprehensive educational resources, and low minimum deposits. All platforms thoroughly tested by our expert team.
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
        <h2 className="text-3xl font-bold mb-8">Top 5 Brokers for Beginners</h2>
        
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
                          <h4 className="text-sm font-medium text-center mb-2">Low Min. Deposit</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.lowMinDeposit ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.lowMinDeposit ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Educational Resources</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.educationalResources ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.educationalResources ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">User-Friendly</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.userFriendly ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.userFriendly ? '✓' : '✗'}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium text-center mb-2">Demo Account</h4>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${broker.features.demoAccount ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {broker.features.demoAccount ? '✓' : '✗'}
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
        <h2 className="text-3xl font-bold mb-8">Beginner Broker Comparison</h2>
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
        <h2 className="text-3xl font-bold mb-8">How We Rank Brokers for Beginners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>User Experience</CardTitle>
              <CardDescription>We prioritize brokers with intuitive platforms and clear navigation.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>For beginning traders, the user experience is paramount. We carefully evaluate each platform's interface, assessing how intuitive the navigation is, how clearly information is presented, and whether key functions are easily accessible. Platforms that minimize jargon and provide contextual help score highest in our rankings.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Educational Resources</CardTitle>
              <CardDescription>We evaluate the quality and accessibility of learning materials.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Quality educational content is essential for new traders. We assess each broker's library of educational resources, including video tutorials, webinars, glossaries, and interactive courses. We give higher ratings to brokers that offer structured learning paths tailored to complete beginners, with clear explanations of trading fundamentals.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Customer Support</CardTitle>
              <CardDescription>We test the responsiveness and helpfulness of support channels.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Beginners often need assistance, so we thoroughly test each broker's customer support. We evaluate response times across multiple channels (chat, email, phone), the knowledge level of support staff, and the availability of support during different time zones. Brokers offering dedicated support for new traders receive higher scores.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Low Entry Barriers</CardTitle>
              <CardDescription>We assess minimum deposits, demo accounts, and account opening processes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We favor brokers that make it easy to get started with low minimum deposits, simplified account opening procedures, and unlimited demo accounts. The ability to practice with virtual funds without time restrictions is particularly valuable for beginners still developing their trading strategies.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="mb-16" id="features">
        <h2 className="text-3xl font-bold mb-8">Key Features for Beginning Traders</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">When choosing a broker as a beginner, these features are particularly important:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Demo Accounts</h3>
                <p>Practice accounts that simulate real trading without financial risk are invaluable for beginners. The best brokers offer demo accounts with virtual funds that closely mirror real market conditions, allowing new traders to practice strategies and become familiar with the platform without risking real money.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Educational Content</h3>
                <p>Comprehensive learning resources can significantly accelerate your development as a trader. Look for brokers offering structured courses, video tutorials, webinars, and market analysis explained in beginner-friendly terms. The best platforms for beginners integrate educational content directly into the trading experience.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Simplified Trading Platforms</h3>
                <p>Overly complex platforms can be overwhelming for beginners. The best brokers for new traders offer streamlined interfaces with essential features prominently displayed, clear buy/sell buttons, and intuitive chart controls. Some platforms offer specific beginner modes that limit advanced features until you're ready for them.</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-1">Responsive Customer Support</h3>
                <p>As a beginner, you'll likely have questions that need prompt answers. Top brokers for new traders offer multi-channel support with extended hours, minimal wait times, and support staff trained to explain concepts in accessible language without assuming prior knowledge.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Common Mistakes Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Common Beginner Trading Mistakes to Avoid</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Starting Without Education</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Many beginners dive into trading without understanding market basics, leading to costly mistakes. Take time to learn fundamental concepts like order types, market analysis, and risk management before risking real money. Use demo accounts extensively and treat them as a learning tool rather than rushing to live trading.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Improper Position Sizing</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Beginners often risk too much on individual trades. A good rule of thumb is never to risk more than 1-2% of your trading capital on a single position. This approach helps preserve your capital through inevitable losing trades and gives you time to develop your skills without being forced out of the market by large losses.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Methodology Section */}
      <section className="mb-16" id="methodology">
        <h2 className="text-3xl font-bold mb-8">Our Testing Methodology</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Our broker evaluations for beginners involve specialized testing:</p>
            
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <span className="font-bold">Beginner User Testing:</span> We recruit testers with no prior trading experience to evaluate how intuitive each platform is for absolute beginners, measuring time to complete basic tasks and confusion points.
              </li>
              <li>
                <span className="font-bold">Educational Content Assessment:</span> Our team reviews the complete library of educational materials, evaluating comprehensiveness, clarity, accuracy, and how well they build knowledge from basic to advanced concepts.
              </li>
              <li>
                <span className="font-bold">Support Evaluation:</span> We conduct multiple support inquiries posing typical beginner questions at different times to evaluate response speed, accuracy, and how well concepts are explained without jargon.
              </li>
              <li>
                <span className="font-bold">Demo Account Testing:</span> We thoroughly test demo accounts for realism, limitations, and how well they integrate with educational features. We verify whether practices learned in demo trading can be seamlessly applied to live trading.
              </li>
              <li>
                <span className="font-bold">Cost Impact Analysis:</span> We analyze how various fees impact small account balances typical of beginning traders, including hidden costs that might not be apparent until you start trading regularly.
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
              <CardTitle>How much money should I start with as a beginner trader?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>While some brokers allow you to start with as little as $50-$100, a practical minimum is around $500-$1,000 to provide adequate flexibility while learning. This amount allows you to take multiple small positions and withstand some losses during your learning phase. However, never invest money you can't afford to lose. If $500 feels too risky, continue practicing with a demo account until you've saved more or gained confidence.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Should I start with stocks, forex, or another market as a beginner?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For most beginners, starting with a small number of large-cap stocks or major ETFs provides the best learning experience. These instruments tend to be less volatile than forex or cryptocurrencies, giving you time to make decisions and learn from market movements. Focus on understanding one market well before diversifying. The best approach is often to trade instruments from companies or sectors you already understand from your personal or professional experience.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How long should I use a demo account before trading with real money?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>There's no fixed timeline, but you should use a demo account until you can consistently follow your trading plan and show profitability over at least 2-3 months. Even after transitioning to a live account, consider keeping your demo account active for testing new strategies. Many successful traders suggest only switching to live trading when you can explain your trading strategy to someone else and have a clear risk management system in place.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What's the difference between educational content from brokers versus paid courses?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Broker-provided education is generally sufficient for learning platform features and basic trading concepts. The quality varies significantly between brokers, with some offering comprehensive, structured courses and others providing only basic materials. Paid courses may offer more specialized knowledge or trading strategies, but be wary of expensive programs promising unrealistic returns. Start with your broker's free resources and supplement with free content from reputable sources before considering paid courses.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-primary/5 border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start your trading journey?</CardTitle>
            <CardDescription>Compare the top platforms for beginners and open an account in minutes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="#comparison">
                View Top Brokers for Beginners
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 