"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  TrendingUp,
  Globe,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Award,
  Shield,
  BarChart3,
  Lightbulb,
  Target,
  Zap,
  CheckCircle,
  Info,
  ExternalLink,
  ArrowRight,
  Briefcase,
  PieChart,
  LineChart
} from "lucide-react";
import { Context7Content, Context7Heading1 } from "@/components/Context7Provider";
import { RokuAIWrapper } from "@/components/RokuAIWrapper";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroCompanyBackgroundProps {
  broker: any;
}

export function EtoroCompanyBackground({ broker }: EtoroCompanyBackgroundProps) {
  const [activeTab, setActiveTab] = useState("origins");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Track component view
    trackEvent({
      action: 'view_company_background',
      category: 'broker_analysis',
      label: 'etoro_deep_dive'
    });
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    trackEvent({
      action: 'tab_change',
      category: 'user_engagement',
      label: `company_background_${tab}`
    });
  };

  const companyMetrics = {
    founded: "2007",
    headquarters: "Limassol, Cyprus",
    employees: "1,500+",
    users: "30M+",
    countries: "140+",
    valuation: "$8.1B",
    revenue2023: "$1.2B",
    assets: "$10B+"
  };

  const milestones = [
    { year: "2007", event: "Founded in Tel Aviv by Yoni Assia, Ronen Assia, and David Ring", impact: "high" },
    { year: "2010", event: "Launched OpenBook social trading platform", impact: "high" },
    { year: "2011", event: "Introduced CopyTrader feature", impact: "high" },
    { year: "2013", event: "Reached 3 million users", impact: "medium" },
    { year: "2015", event: "Expanded to cryptocurrency trading", impact: "high" },
    { year: "2018", event: "Launched in the United States", impact: "high" },
    { year: "2021", event: "Went public via SPAC merger", impact: "high" },
    { year: "2023", event: "Reached 30+ million users globally", impact: "medium" }
  ];

  const revenueStreams = [
    { source: "Spreads", percentage: 65, description: "Primary revenue from bid-ask spreads" },
    { source: "Overnight Fees", percentage: 20, description: "Fees for holding leveraged positions overnight" },
    { source: "Withdrawal Fees", percentage: 8, description: "$5 fee per withdrawal" },
    { source: "Currency Conversion", percentage: 5, description: "50 pips on non-USD deposits" },
    { source: "Premium Features", percentage: 2, description: "Advanced analytics and tools" }
  ];

  return (
    <>
      <PerformanceMonitor />
      <div className="space-y-8">
        {/* Section Header with Context7 Enhancement */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <Context7Heading1>Company Background & Business Model Deep Dive</Context7Heading1>
          </div>
          <Context7Content type="paragraph">
            Explore eToro's journey from a Tel Aviv startup to a global fintech giant,
            understanding the business model that powers the world's largest social trading platform.
          </Context7Content>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(companyMetrics).map(([key, value], index) => (
            <Card key={key} className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">{value}</div>
                <p className="text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="origins">Origins & Evolution</TabsTrigger>
            <TabsTrigger value="business-model">Business Model</TabsTrigger>
            <TabsTrigger value="financial">Financial Strength</TabsTrigger>
            <TabsTrigger value="future">Future Direction</TabsTrigger>
          </TabsList>

          {/* Origins & Evolution Tab */}
          <TabsContent value="origins" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                  Company Origins & Founding Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-slate max-w-none">
                  <Context7Content>
                    eToro was founded in 2007 in Tel Aviv, Israel, by three visionary entrepreneurs:
                    Yoni Assia (CEO), Ronen Assia, and David Ring. The company emerged from a simple
                    yet revolutionary idea: to democratize trading by making financial markets accessible
                    to everyone, regardless of their experience level or financial background.
                  </Context7Content>

                  <Context7Content>
                    The founding team recognized that traditional trading platforms were complex,
                    intimidating, and designed primarily for professional traders. They envisioned
                    a platform that would combine the power of social networking with financial trading,
                    allowing users to learn from each other and share trading strategies in real-time.
                  </Context7Content>
                </div>

                {/* Company Timeline */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Key Milestones</h4>
                  <div className="space-y-3">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-shrink-0">
                          <Badge variant={milestone.impact === "high" ? "default" : "secondary"}>
                            {milestone.year}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{milestone.event}</p>
                        </div>
                        <div className="flex-shrink-0">
                          {milestone.impact === "high" && (
                            <Award className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Geographic Expansion */}
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Global Expansion Strategy</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Key Markets</h5>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            Europe (Cyprus HQ) - 2012
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            Australia - 2014
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            United Kingdom - 2013
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            United States - 2018
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Regulatory Approach</h5>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <Shield className="h-3 w-3 text-blue-600" />
                            FCA (UK) - Tier 1 regulation
                          </li>
                          <li className="flex items-center gap-2">
                            <Shield className="h-3 w-3 text-blue-600" />
                            CySEC (Cyprus) - EU passporting
                          </li>
                          <li className="flex items-center gap-2">
                            <Shield className="h-3 w-3 text-blue-600" />
                            ASIC (Australia) - APAC coverage
                          </li>
                          <li className="flex items-center gap-2">
                            <Shield className="h-3 w-3 text-blue-600" />
                            FINRA (US) - Limited services
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Model Tab */}
          <TabsContent value="business-model" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  Revenue Model Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Context7Content>
                  eToro operates on a spread-based revenue model, fundamentally different from traditional
                  commission-based brokers. This model allows them to offer "commission-free" trading
                  while generating revenue through wider bid-ask spreads and additional fees.
                </Context7Content>

                {/* Revenue Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Revenue Stream Breakdown</h4>
                  <div className="space-y-3">
                    {revenueStreams.map((stream, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{stream.source}</span>
                          <Badge variant="outline">{stream.percentage}%</Badge>
                        </div>
                        <Progress value={stream.percentage} className="h-2" />
                        <p className="text-sm text-muted-foreground">{stream.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Model Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-green-200 dark:border-green-800">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">
                        Why Higher Spreads?
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Funds social trading infrastructure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Supports CopyTrader technology</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Enables Popular Investor payments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Maintains user-friendly platform</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">
                        Social Trading Monetization
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <span>More users = more trading volume</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <span>Copy trading increases activity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <span>Network effects drive growth</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <span>Viral user acquisition</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Strength Tab */}
          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Financial Strength & Stability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Context7Content>
                  eToro has demonstrated strong financial performance and stability, backed by significant
                  funding rounds and a successful public listing. The company's financial strength provides
                  confidence in its ability to protect client funds and continue operations.
                </Context7Content>

                {/* Financial Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">$8.1B</div>
                      <p className="text-sm text-muted-foreground">Market Valuation</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">$1.2B</div>
                      <p className="text-sm text-muted-foreground">2023 Revenue</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">$10B+</div>
                      <p className="text-sm text-muted-foreground">Assets Under Management</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Client Protection */}
                <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-700 dark:text-green-400">Client Fund Protection</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Segregation Practices</h5>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            Client funds held separately
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            Tier 1 bank custody
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            Daily reconciliation
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Insurance Coverage</h5>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            FSCS protection (UK): £85,000
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            ICF protection (EU): €20,000
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            SIPC protection (US): $500,000
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Future Direction Tab */}
          <TabsContent value="future" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Future Direction & Strategic Initiatives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Context7Content>
                  eToro continues to evolve and expand its platform, focusing on new markets,
                  innovative products, and technological advancement. The company's strategic
                  roadmap emphasizes sustainable growth and market leadership in social trading.
                </Context7Content>

                {/* Strategic Initiatives */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold">Market Expansion</h4>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-blue-600" />
                          <span>Enhanced US market presence</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-blue-600" />
                          <span>Asian market penetration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-blue-600" />
                          <span>Latin American expansion</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-blue-600" />
                          <span>Regulatory approvals</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 dark:border-purple-800">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="h-5 w-5 text-purple-600" />
                        <h4 className="font-semibold">Product Innovation</h4>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-purple-600" />
                          <span>AI-powered trading insights</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-purple-600" />
                          <span>Enhanced mobile experience</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-purple-600" />
                          <span>Institutional products</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-purple-600" />
                          <span>DeFi integration</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* RokuAI Integration for Future Insights */}
                <Card className="border-amber-200 dark:border-amber-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="h-5 w-5 text-amber-600" />
                      <h4 className="font-semibold">AI-Powered Analysis</h4>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="text-center space-y-4">
                        <div className="text-lg font-semibold text-amber-700 dark:text-amber-400">
                          AI-Powered Future Analysis
                        </div>
                        <p className="text-sm text-amber-600 dark:text-amber-300">
                          Advanced AI analysis of eToro's strategic positioning and future prospects in the evolving social trading landscape.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-amber-500">
                          <Briefcase className="h-4 w-4" />
                          <span>Powered by advanced market intelligence</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">Ready to Experience Social Trading?</h3>
              <Context7Content>
                Join over 30 million users who trust eToro for their trading and investment needs.
                Start with a free demo account and explore the world's leading social trading platform.
              </Context7Content>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <a href={broker.website_url || "https://www.etoro.com"} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit eToro
                  </a>
                </Button>
                <Button variant="outline" size="lg">
                  <LineChart className="h-4 w-4 mr-2" />
                  Compare Alternatives
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
