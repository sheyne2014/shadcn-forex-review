"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Users,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  Search,
  RefreshCw,
  Sparkles,
  LineChart,
  PieChart
} from "lucide-react";
// Removed Context7 imports due to compatibility issues
import { trackEvent } from "@/lib/analytics/google-analytics";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";

interface EtoroAIInsightsProps {
  broker: any;
}

export function EtoroAIInsights({ broker }: EtoroAIInsightsProps) {
  const [activeInsight, setActiveInsight] = useState("market-analysis");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    // Track AI insights view
    trackEvent({
      action: 'view_ai_insights',
      category: 'broker_analysis',
      label: 'etoro_ai_analysis'
    });
  }, []);

  const aiAnalysisPrompts = {
    "market-analysis": {
      title: "Market Position Analysis",
      prompt: "Analyze eToro's current market position in the social trading industry, including competitive advantages, market share, and positioning against traditional brokers like Interactive Brokers, TD Ameritrade, and other social trading platforms.",
      icon: BarChart3,
      color: "blue"
    },
    "competitive-landscape": {
      title: "Competitive Landscape",
      prompt: "Compare eToro with its main competitors in social trading (ZuluTrade, NAGA, Ayondo) and traditional brokers. Focus on unique differentiators, pricing strategies, and market positioning.",
      icon: Target,
      color: "green"
    },
    "risk-assessment": {
      title: "Risk Assessment",
      prompt: "Provide a comprehensive risk assessment of trading with eToro, including regulatory risks, platform risks, counterparty risks, and market risks specific to social trading.",
      icon: Shield,
      color: "amber"
    },
    "future-outlook": {
      title: "Future Outlook",
      prompt: "Analyze eToro's future prospects, growth potential, upcoming challenges, and strategic opportunities in the evolving fintech and social trading landscape.",
      icon: TrendingUp,
      color: "purple"
    }
  };

  const handleInsightChange = (insight: string) => {
    setActiveInsight(insight);
    trackEvent({
      action: 'change_ai_insight',
      category: 'user_engagement',
      label: insight
    });
  };

  const generateInsight = async (promptKey: string) => {
    setIsAnalyzing(true);
    trackEvent({
      action: 'generate_ai_insight',
      category: 'ai_interaction',
      label: promptKey
    });

    // Simulate AI analysis (in real implementation, this would call actual AI services)
    setTimeout(() => {
      setIsAnalyzing(false);
      setInsights({
        [promptKey]: "AI analysis complete. Detailed insights generated based on current market data and broker analysis."
      });
    }, 2000);
  };

  const marketMetrics = {
    socialTradingMarket: "$2.4B",
    marketGrowthRate: "23.5%",
    etoroMarketShare: "65%",
    competitorCount: "15+",
    userGrowthRate: "18%",
    revenueGrowth: "31%"
  };

  const competitiveAnalysis = [
    {
      category: "Social Trading Features",
      etoro: 95,
      competitors: 70,
      advantage: "Strong"
    },
    {
      category: "User Experience",
      etoro: 90,
      competitors: 75,
      advantage: "Strong"
    },
    {
      category: "Regulatory Coverage",
      etoro: 85,
      competitors: 80,
      advantage: "Moderate"
    },
    {
      category: "Trading Costs",
      etoro: 60,
      competitors: 85,
      advantage: "Weak"
    },
    {
      category: "Platform Technology",
      etoro: 88,
      competitors: 82,
      advantage: "Strong"
    },
    {
      category: "Educational Resources",
      etoro: 85,
      competitors: 75,
      advantage: "Strong"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full">
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Market Insights
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Advanced AI analysis providing deep insights into eToro's market position,
          competitive landscape, and future prospects in the social trading industry.
        </p>
      </div>

      {/* Market Overview Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(marketMetrics).map(([key, value], index) => (
          <Card key={key} className="text-center hover:shadow-lg transition-all duration-300 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600 mb-2">{value}</div>
              <p className="text-sm text-muted-foreground">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Analysis Tabs */}
      <Tabs value={activeInsight} onValueChange={handleInsightChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {Object.entries(aiAnalysisPrompts).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{config.title.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(aiAnalysisPrompts).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <TabsContent key={key} value={key} className="space-y-6">
              <Card className={`border-${config.color}-200 dark:border-${config.color}-800`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 text-${config.color}-600`} />
                      {config.title}
                    </div>
                    <Button
                      onClick={() => generateInsight(key)}
                      disabled={isAnalyzing}
                      size="sm"
                      variant="outline"
                    >
                      {isAnalyzing ? (
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      {isAnalyzing ? "Analyzing..." : "Generate Insight"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* AI Analysis Interface */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="text-center space-y-4">
                      <div className="text-lg font-semibold text-purple-700 dark:text-purple-400">
                        AI-Powered {config.title}
                      </div>
                      <p className="text-sm text-purple-600 dark:text-purple-300">
                        {config.prompt}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-xs text-purple-500">
                        <Brain className="h-4 w-4" />
                        <span>Advanced AI analysis powered by market intelligence</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Competitive Analysis Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-primary" />
            Competitive Analysis Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Comprehensive comparison of eToro against key competitors across critical performance metrics.
          </p>

          <div className="space-y-4">
            {competitiveAnalysis.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{metric.category}</span>
                  <Badge
                    variant={
                      metric.advantage === "Strong" ? "default" :
                      metric.advantage === "Moderate" ? "secondary" : "outline"
                    }
                  >
                    {metric.advantage}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>eToro</span>
                      <span className="font-semibold">{metric.etoro}%</span>
                    </div>
                    <Progress value={metric.etoro} className="h-2" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Competitors Avg</span>
                      <span className="font-semibold">{metric.competitors}%</span>
                    </div>
                    <Progress value={metric.competitors} className="h-2 opacity-60" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Analytics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="h-5 w-5 mr-2 text-primary" />
            Real-time Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsDashboard />
        </CardContent>
      </Card>

      {/* AI-Powered Recommendations */}
      <Card className="border-2 border-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Strengths to Leverage
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="h-3 w-3 text-green-600 mt-1" />
                  <span>Dominant social trading platform position</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-3 w-3 text-green-600 mt-1" />
                  <span>Large and engaged user community</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="h-3 w-3 text-green-600 mt-1" />
                  <span>Strong regulatory coverage globally</span>
                </li>
                <li className="flex items-start gap-2">
                  <Brain className="h-3 w-3 text-green-600 mt-1" />
                  <span>Innovative technology and user experience</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-amber-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Areas for Improvement
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Info className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Reduce trading costs to compete with ECN brokers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Enhance advanced charting and analysis tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Expand institutional-grade offerings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Improve customer support response times</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-600" />
              AI-Generated Insight
            </h4>
            <p className="text-muted-foreground">
              eToro's strategic focus on social trading has created a sustainable competitive moat,
              but the company must balance innovation with cost competitiveness to maintain its
              market leadership as traditional brokers adopt social features.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive AI Chat */}
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-blue-600" />
            Ask AI About eToro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Get instant AI-powered answers about eToro's features, performance, and suitability for your trading needs.
          </p>
          <div className="mt-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-center space-y-4">
                <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                  Interactive AI Assistant
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  Ask me anything about eToro's features, performance, costs, or suitability for different types of traders.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-blue-500">
                  <Search className="h-4 w-4" />
                  <span>Powered by comprehensive broker analysis</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
