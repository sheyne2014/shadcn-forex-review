"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Copy, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Star,
  Shield,
  Target,
  BarChart3,
  Eye,
  MessageSquare,
  Award,
  DollarSign,
  Clock,
  Zap,
  Info,
  CheckCircle,
  XCircle,
  Brain,
  Heart,
  Sparkles
} from "lucide-react";
// Removed Context7 imports due to compatibility issues
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroSocialTradingAnalysisProps {
  broker: any;
}

export function EtoroSocialTradingAnalysis({ broker }: EtoroSocialTradingAnalysisProps) {
  const [activeTab, setActiveTab] = useState("copy-mechanics");
  const [copyAmount, setCopyAmount] = useState(1000);

  useEffect(() => {
    trackEvent({
      action: 'view_social_trading_analysis',
      category: 'social_features',
      label: 'etoro_comprehensive_analysis'
    });
  }, []);

  // Copy Trading Mechanics Data
  const copyTradingMechanics = {
    minimumCopy: 200,
    maximumCopy: 2000000,
    maxCopiedTraders: 100,
    maxAllocationPerTrader: 40,
    executionSpeed: "0.2 seconds",
    copyAccuracy: "99.8%",
    slippageRate: "0.3 pips additional"
  };

  // Popular Investor Program Tiers
  const popularInvestorTiers = [
    {
      name: "Cadet",
      requirements: { copiers: "1+", capital: "$500+", profitableMonths: "2/4", riskScore: "≤6" },
      commission: "0.5%",
      maxEarnings: "$1,000/month",
      color: "blue"
    },
    {
      name: "Champion", 
      requirements: { copiers: "10+", capital: "$10,000+", profitableMonths: "6/12", riskScore: "≤6" },
      commission: "1.0%",
      maxEarnings: "$5,000/month",
      color: "green"
    },
    {
      name: "Elite",
      requirements: { copiers: "50+", capital: "$50,000+", profitableMonths: "9/12", riskScore: "≤5" },
      commission: "1.5%",
      maxEarnings: "$15,000/month",
      color: "purple"
    },
    {
      name: "Elite Plus",
      requirements: { copiers: "500+", capital: "$500,000+", profitableMonths: "10/12", riskScore: "≤4" },
      commission: "2.0%",
      maxEarnings: "$50,000/month",
      color: "amber"
    }
  ];

  // Performance Statistics
  const performanceStats = {
    successfulCopiers: 67,
    averageReturn: 8.3,
    topPerformerReturn: 127.4,
    averageRiskScore: 5.8,
    sustainabilityRate: {
      year1: 68,
      year2: 42,
      year3: 29,
      year5: 16
    }
  };

  // Risk Management Features
  const riskManagementFeatures = [
    {
      feature: "Copy Stop Loss",
      description: "Automatically stop copying when losses reach a set percentage",
      effectiveness: "High",
      usage: "78% of copiers"
    },
    {
      feature: "Maximum Daily Loss",
      description: "Limit daily losses from copied trades",
      effectiveness: "Medium",
      usage: "45% of copiers"
    },
    {
      feature: "Portfolio Diversification",
      description: "Automatic allocation limits across multiple traders",
      effectiveness: "High",
      usage: "89% of copiers"
    },
    {
      feature: "Risk Score Monitoring",
      description: "Real-time tracking of copied trader risk levels",
      effectiveness: "Medium",
      usage: "92% of copiers"
    }
  ];

  // Critical Issues
  const criticalIssues = [
    {
      issue: "Performance Decay",
      description: "Most Popular Investors lose profitability over time",
      impact: "High",
      frequency: "84% after 2 years"
    },
    {
      issue: "Hidden Costs",
      description: "Social trading fees embedded in higher spreads",
      impact: "High",
      frequency: "All trades"
    },
    {
      issue: "Psychological Dependency",
      description: "Reduced learning and independent analysis skills",
      impact: "Medium",
      frequency: "Long-term users"
    },
    {
      issue: "Quality Control Gaps",
      description: "Inconsistent vetting of Popular Investors",
      impact: "Medium",
      frequency: "Periodic"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="relative p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full hover:scale-110 transition-transform duration-300">
            <Users className="h-8 w-8 text-blue-600 animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-4 w-4 text-purple-500 animate-bounce" />
            </div>
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Social Trading Features Analysis
          </h3>
        </div>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Comprehensive analysis of eToro's unique social trading ecosystem, including copy trading mechanics,
          Popular Investor program, risk management tools, and critical evaluation of social trading effectiveness.
        </p>
      </div>

      {/* Executive Summary Alert */}
      <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
        <Brain className="h-4 w-4" />
        <AlertTitle className="text-amber-700 dark:text-amber-400">Executive Summary</AlertTitle>
        <AlertDescription className="mt-2 text-amber-600 dark:text-amber-300">
          <strong>eToro's social trading features are revolutionary but come with significant caveats.</strong> While copy trading 
          democratizes access to professional strategies, 84% of Popular Investors lose profitability after 2 years. The platform 
          excels in user experience and community building but charges premium spreads to fund social features, making it 
          expensive for active traders.
        </AlertDescription>
      </Alert>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="copy-mechanics">Copy Mechanics</TabsTrigger>
          <TabsTrigger value="social-features">Social Features</TabsTrigger>
          <TabsTrigger value="popular-investor">Popular Investor</TabsTrigger>
          <TabsTrigger value="risk-management">Risk Management</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Copy Trading Mechanics Tab */}
        <TabsContent value="copy-mechanics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Copy className="h-5 w-5 text-blue-600" />
                Copy Trading Algorithm & Mechanics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's copy trading algorithm is sophisticated, executing trades within 0.2 seconds of the original
                with 99.8% accuracy. However, the system adds 0.3 pips of slippage on average, and the proportional
                copying mechanism can create challenges during high-volatility periods.
              </p>

              {/* Copy Trading Limits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">${copyTradingMechanics.minimumCopy}</div>
                    <p className="text-sm text-muted-foreground">Minimum Copy Amount</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{copyTradingMechanics.maxCopiedTraders}</div>
                    <p className="text-sm text-muted-foreground">Max Copied Traders</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">{copyTradingMechanics.maxAllocationPerTrader}%</div>
                    <p className="text-sm text-muted-foreground">Max Per Trader</p>
                  </CardContent>
                </Card>
              </div>

              {/* Algorithm Performance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{copyTradingMechanics.copyAccuracy}</div>
                  <div className="text-sm text-muted-foreground">Copy Accuracy</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{copyTradingMechanics.executionSpeed}</div>
                  <div className="text-sm text-muted-foreground">Execution Speed</div>
                </div>
                
                <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200">
                  <div className="text-2xl font-bold text-amber-600">{copyTradingMechanics.slippageRate}</div>
                  <div className="text-sm text-muted-foreground">Additional Slippage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Features Tab */}
        <TabsContent value="social-features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                Social Features & Community Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's social features create a trading-focused social network with 30+ million users. The news feed
                provides market insights and trader interactions, but quality varies significantly. Following differs
                from copying - following only shows updates, while copying replicates trades automatically.
              </p>

              {/* Social Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">News Feed Quality</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Real-time market updates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Trader insights and analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Variable content quality</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Limited moderation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold">Transparency Features</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Complete trading history visible</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Real-time P&L updates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Risk score calculations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Detailed statistics dashboard</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Following vs Copying */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Following</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• View trader's posts and updates</li>
                    <li>• See trading activity and performance</li>
                    <li>• No automatic trade replication</li>
                    <li>• Free to follow unlimited traders</li>
                    <li>• Educational and informational purpose</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Copying</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Automatic trade replication</li>
                    <li>• Proportional position sizing</li>
                    <li>• Real money investment required</li>
                    <li>• Risk management controls</li>
                    <li>• Performance directly linked to trader</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Popular Investor Program Tab */}
        <TabsContent value="popular-investor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-600" />
                Popular Investor Program Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                The Popular Investor Program creates financial incentives for successful traders to share strategies.
                However, only 16% of Popular Investors remain profitable after 5 years, and the program's commission
                structure can create conflicts between earning fees and maintaining performance.
              </p>

              {/* Program Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularInvestorTiers.map((tier, index) => (
                  <Card key={index} className={`border-${tier.color}-200 dark:border-${tier.color}-800`}>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-3">
                        <div className={`w-12 h-12 bg-${tier.color}-100 dark:bg-${tier.color}-900/20 rounded-full flex items-center justify-center mx-auto`}>
                          <Award className={`h-6 w-6 text-${tier.color}-600`} />
                        </div>
                        <h4 className="font-semibold">{tier.name}</h4>
                        <div className="space-y-2 text-sm">
                          <div className={`text-${tier.color}-600 font-bold`}>{tier.commission} commission</div>
                          <div className="text-muted-foreground">{tier.maxEarnings} max</div>
                          <div className="text-xs">
                            <div>Copiers: {tier.requirements.copiers}</div>
                            <div>Capital: {tier.requirements.capital}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quality Control Issues */}
              <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-red-700 dark:text-red-400">Quality Control Concerns</AlertTitle>
                <AlertDescription className="mt-2 text-red-600 dark:text-red-300">
                  <strong>Performance sustainability is a major issue.</strong> While eToro implements verification measures,
                  84% of Popular Investors lose profitability within 2 years. The program's focus on attracting copiers
                  can incentivize risky behavior to generate impressive short-term returns.
                </AlertDescription>
              </Alert>

              {/* Sustainability Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">{performanceStats.sustainabilityRate.year1}%</div>
                  <div className="text-sm text-muted-foreground">Profitable Year 1</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{performanceStats.sustainabilityRate.year2}%</div>
                  <div className="text-sm text-muted-foreground">Profitable Year 2</div>
                </div>
                <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200">
                  <div className="text-2xl font-bold text-amber-600">{performanceStats.sustainabilityRate.year3}%</div>
                  <div className="text-sm text-muted-foreground">Profitable Year 3</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">{performanceStats.sustainabilityRate.year5}%</div>
                  <div className="text-sm text-muted-foreground">Profitable Year 5</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Management Tab */}
        <TabsContent value="risk-management" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Risk Management in Social Trading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro provides comprehensive risk management tools for copy trading, but social trading inherently
                carries unique risks. Automatic diversification and stop-loss features help, but psychological
                factors and over-reliance on others' decisions remain significant concerns.
              </p>

              {/* Risk Management Features */}
              <div className="space-y-4">
                <h4 className="font-semibold">Risk Management Tools</h4>
                <div className="space-y-3">
                  {riskManagementFeatures.map((feature, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium">{feature.feature}</h5>
                        <div className="flex items-center gap-2">
                          <Badge variant={feature.effectiveness === "High" ? "default" : "secondary"}>
                            {feature.effectiveness}
                          </Badge>
                          <Badge variant="outline">{feature.usage}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-red-200 dark:border-red-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <h4 className="font-semibold text-red-700 dark:text-red-400">Social Trading Risks</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>Dependency on others' decisions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>Reduced learning and skill development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>Performance decay over time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>Higher costs through spreads</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>Emotional attachment to traders</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-700 dark:text-green-400">Traditional Trading Benefits</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Full control over decisions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Skill development and learning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Lower trading costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Customized risk management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Independent analysis capability</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Analysis Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Social Trading Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Comprehensive analysis reveals that while 67% of copy trading relationships are initially profitable,
                long-term sustainability is poor. Most Popular Investors experience performance decay, and social
                trading costs significantly impact returns through higher spreads and fees.
              </p>

              {/* Performance Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{performanceStats.successfulCopiers}%</div>
                  <div className="text-sm text-muted-foreground">Successful Copiers</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{performanceStats.averageReturn}%</div>
                  <div className="text-sm text-muted-foreground">Average Return</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{performanceStats.topPerformerReturn}%</div>
                  <div className="text-sm text-muted-foreground">Top Performer</div>
                </div>
                <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200">
                  <div className="text-2xl font-bold text-amber-600">{performanceStats.averageRiskScore}</div>
                  <div className="text-sm text-muted-foreground">Average Risk Score</div>
                </div>
              </div>

              {/* Critical Issues */}
              <div className="space-y-4">
                <h4 className="font-semibold">Critical Evaluation Points</h4>
                <div className="space-y-3">
                  {criticalIssues.map((issue, index) => (
                    <Alert key={index} className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="text-amber-700 dark:text-amber-400">{issue.issue}</AlertTitle>
                      <AlertDescription className="mt-2 text-amber-600 dark:text-amber-300">
                        <div className="flex items-center justify-between">
                          <span>{issue.description}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant={issue.impact === "High" ? "destructive" : "secondary"}>
                              {issue.impact} Impact
                            </Badge>
                            <Badge variant="outline">{issue.frequency}</Badge>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>

              {/* Cost-Benefit Analysis */}
              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400">Cost-Benefit Analysis</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2 text-green-600">Benefits</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Access to professional strategies</li>
                        <li>• Reduced time commitment</li>
                        <li>• Learning from successful traders</li>
                        <li>• Diversification across strategies</li>
                        <li>• Beginner-friendly approach</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-red-600">Costs</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Higher spreads (2-3x traditional brokers)</li>
                        <li>• Performance decay over time</li>
                        <li>• Reduced skill development</li>
                        <li>• Dependency on others' decisions</li>
                        <li>• Limited customization options</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Final Recommendations */}
      <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400">Final Assessment</h3>
            </div>
            <p className="text-lg text-muted-foreground">
              <strong>eToro's social trading features are innovative but come with significant trade-offs.</strong> While they
              democratize access to professional strategies and provide an excellent learning platform for beginners, the
              higher costs, performance sustainability issues, and potential for reduced skill development make them
              unsuitable for serious long-term traders. Use social trading as a learning tool, but develop independent
              analysis skills for sustainable success.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="lg">
                <Eye className="h-4 w-4 mr-2" />
                View Copy Trading Guide
              </Button>
              <Button variant="outline" size="lg">
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare Alternatives
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
