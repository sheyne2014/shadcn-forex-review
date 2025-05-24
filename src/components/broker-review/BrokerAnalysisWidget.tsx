"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Trophy,
  Users,
  TrendingUp,
  Zap,
  ChevronRight,
  CheckCircle,
  XCircle,
  LineChart,
  BarChart,
  CandlestickChart,
  Timer,
  Code,
  AlertTriangle
} from "lucide-react";
import {
  analyzeBroker,
  generatePersonalizedRecommendation,
  type BrokerAnalysisResult
} from "@/lib/broker-analysis";
import { useMemo } from "react";

interface BrokerAnalysisWidgetProps {
  broker: any;
  userPreferences?: {
    experienceLevel?: "beginner" | "intermediate" | "advanced";
    tradingStyle?: "day trading" | "scalping" | "swing trading" | "position trading" | "algorithmic trading";
    accountSize?: "small" | "medium" | "large";
    riskTolerance?: "low" | "medium" | "high";
  };
}

export function BrokerAnalysisWidget({
  broker,
  userPreferences
}: BrokerAnalysisWidgetProps) {
  // Safely handle broker data
  if (!broker || typeof broker !== 'object') {
    return (
      <Card className="p-6">
        <div className="flex items-center text-amber-600 gap-2">
          <AlertTriangle className="h-5 w-5" />
          <p>Unable to analyze broker data. Broker information is missing or invalid.</p>
        </div>
      </Card>
    );
  }

  // Safely analyze broker data using useMemo to prevent unnecessary recalculations
  const analysis = useMemo(() => {
    try {
      return analyzeBroker(broker);
    } catch (error) {
      console.error('Error analyzing broker:', error);
      return {
        tradingStrategyFit: {
          dayTrading: 50,
          scalping: 50,
          swingTrading: 50,
          positionTrading: 50,
          algorithmicTrading: 50,
          recommendedFor: ["Day Trading", "Swing Trading"],
          notRecommendedFor: []
        },
        experienceLevelFit: {
          beginner: 50,
          intermediate: 60,
          advanced: 50,
          recommendedLevel: "intermediate"
        },
        strengthsWeaknesses: {
          strengths: ["Standard trading conditions", "Multiple platform options", "Customer support"],
          weaknesses: ["Limited educational materials", "Standard fee structure"]
        },
        costAnalysis: {
          overallCost: "medium" as const,
          spreadCost: "Standard variable spreads",
          commissionCost: "Standard commission structure",
          swapCost: "Standard overnight fees",
          costSummary: `${broker.name || "This broker"} offers standard trading costs within industry averages.`
        },
        platformQuality: {
          score: 70,
          stability: 70,
          features: 70,
          userExperience: 70,
          mobileFunctionality: 70,
          summary: `${broker.name || "This broker"} offers standard trading platforms with good reliability and features.`
        }
      } as BrokerAnalysisResult;
    }
  }, [broker]);

  // Safely generate personalized recommendation
  const recommendation = useMemo(() => {
    if (!userPreferences) return null;

    try {
      return generatePersonalizedRecommendation(broker, userPreferences);
    } catch (error) {
      console.error('Error generating recommendation:', error);
      return null;
    }
  }, [broker, userPreferences]);

  // Get strategy icons
  const getStrategyIcon = (strategy: string) => {
    switch(strategy.toLowerCase()) {
      case "day trading":
        return <BarChart3 className="h-5 w-5" />;
      case "scalping":
        return <Timer className="h-5 w-5" />;
      case "swing trading":
        return <LineChart className="h-5 w-5" />;
      case "position trading":
        return <CandlestickChart className="h-5 w-5" />;
      case "algorithmic trading":
        return <Code className="h-5 w-5" />;
      default:
        return <TrendingUp className="h-5 w-5" />;
    }
  };

  // Strategy data
  const strategies = [
    { name: "Day Trading", score: analysis.tradingStrategyFit.dayTrading, icon: <BarChart3 className="h-4 w-4" /> },
    { name: "Scalping", score: analysis.tradingStrategyFit.scalping, icon: <Timer className="h-4 w-4" /> },
    { name: "Swing Trading", score: analysis.tradingStrategyFit.swingTrading, icon: <LineChart className="h-4 w-4" /> },
    { name: "Position Trading", score: analysis.tradingStrategyFit.positionTrading, icon: <CandlestickChart className="h-4 w-4" /> },
    { name: "Algorithmic Trading", score: analysis.tradingStrategyFit.algorithmicTrading, icon: <Code className="h-4 w-4" /> }
  ];

  // Experience level data
  const experienceLevels = [
    { name: "Beginner", score: analysis.experienceLevelFit.beginner },
    { name: "Intermediate", score: analysis.experienceLevelFit.intermediate },
    { name: "Advanced", score: analysis.experienceLevelFit.advanced }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" /> Broker Analysis
        </CardTitle>
        <CardDescription>
          In-depth analysis of {broker.name || "broker"} trading conditions and suitability
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="strategy">
          <TabsList className="w-full justify-around rounded-none border-b grid grid-cols-3">
            <TabsTrigger value="strategy" className="rounded-none font-medium">Strategy Fit</TabsTrigger>
            <TabsTrigger value="experience" className="rounded-none font-medium">Trader Level</TabsTrigger>
            <TabsTrigger value="costs" className="rounded-none font-medium">Cost Analysis</TabsTrigger>
          </TabsList>

          {/* Trading Strategy Tab */}
          <TabsContent value="strategy" className="px-6 py-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold flex items-center mb-4">
                  <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                  Recommended Trading Strategies
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {analysis.tradingStrategyFit.recommendedFor.map((strategy, i) => (
                    <div key={i} className="flex items-center p-3 border rounded-md bg-muted/20">
                      <div className="mr-3 p-2 rounded-full bg-green-100">
                        {getStrategyIcon(strategy)}
                      </div>
                      <div>
                        <p className="font-medium">{strategy}</p>
                        <p className="text-sm text-muted-foreground">
                          {strategy === "Day Trading" && "Short-term positions within a single day"}
                          {strategy === "Scalping" && "Ultra-short-term trades capturing small price movements"}
                          {strategy === "Swing Trading" && "Medium-term trades lasting several days to weeks"}
                          {strategy === "Position Trading" && "Long-term trades based on fundamental factors"}
                          {strategy === "Algorithmic Trading" && "Automated trading using algorithms and expert advisors"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {analysis.tradingStrategyFit.notRecommendedFor.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Less suitable for:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.tradingStrategyFit.notRecommendedFor.map((strategy, i) => (
                        <Badge key={i} variant="outline" className="flex items-center">
                          <XCircle className="h-3 w-3 mr-1 text-red-500" />
                          {strategy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Strategy Compatibility:</h4>
                  {strategies.map((strategy, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {strategy.icon}
                          <span className="ml-2 text-sm">{strategy.name}</span>
                        </div>
                        <span className="text-sm font-medium">{strategy.score}%</span>
                      </div>
                      <Progress value={strategy.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Experience Level Tab */}
          <TabsContent value="experience" className="px-6 py-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold flex items-center mb-4">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  Trader Experience Level
                </h3>

                <div className="bg-muted/20 p-4 rounded-md border mb-6">
                  <p className="font-medium mb-1">Best suited for: <Badge>{analysis.experienceLevelFit.recommendedLevel}</Badge> traders</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.experienceLevelFit.recommendedLevel === "beginner" &&
                      `${broker.name || "This broker"} offers a user-friendly environment with educational resources and reasonable trading conditions suitable for those new to forex trading.`}
                    {analysis.experienceLevelFit.recommendedLevel === "intermediate" &&
                      `${broker.name || "This broker"} provides a good balance of advanced features and reasonable trading conditions suitable for traders with some market experience.`}
                    {analysis.experienceLevelFit.recommendedLevel === "advanced" &&
                      `${broker.name || "This broker"} offers sophisticated trading tools, competitive conditions, and advanced platform features ideal for experienced traders.`}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Experience Level Compatibility:</h4>
                  {experienceLevels.map((level, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{level.name}</span>
                        <span className="text-sm font-medium">{level.score}%</span>
                      </div>
                      <Progress value={level.score} className="h-2" />
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
                    <div className="p-3 border rounded-md">
                      <p className="text-sm font-medium mb-1">Beginner</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li className="flex items-start">
                          <ChevronRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          {broker.min_deposit && Number(broker.min_deposit) <= 100
                            ? `Low min deposit ($${broker.min_deposit})`
                            : "Standard deposit requirements"}
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          {broker.educational_resources
                            ? "Educational resources available"
                            : "Limited learning materials"}
                        </li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-md">
                      <p className="text-sm font-medium mb-1">Intermediate</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li className="flex items-start">
                          <ChevronRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          {broker.trading_platforms && (
                            broker.trading_platforms.toLowerCase().includes('mt4') ||
                            broker.trading_platforms.toLowerCase().includes('mt5')
                          )
                            ? "Industry-standard platforms"
                            : "Trading platform variety"}
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          {broker.max_leverage
                            ? `Flexible leverage options (${broker.max_leverage})`
                            : "Standard leverage options"}
                        </li>
                      </ul>
                    </div>

                    <div className="p-3 border rounded-md">
                      <p className="text-sm font-medium mb-1">Advanced</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li className="flex items-start">
                          <ChevronRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          {broker.trading_platforms && (
                            broker.trading_platforms.toLowerCase().includes('mt5') ||
                            broker.trading_platforms.toLowerCase().includes('ctrader')
                          )
                            ? "Advanced platform capabilities"
                            : "Standard trading tools"}
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                          {broker.max_leverage && parseInt((broker.max_leverage+"").replace(/\D/g, '')) >= 300
                            ? `High leverage options (${broker.max_leverage})`
                            : "Standard trading conditions"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Cost Analysis Tab */}
          <TabsContent value="costs" className="px-6 py-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold flex items-center mb-4">
                  <Zap className="h-5 w-5 text-purple-500 mr-2" />
                  Trading Cost Analysis
                </h3>

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-muted/30 mb-2">
                    <Badge className={`text-lg font-medium capitalize ${
                      analysis.costAnalysis.overallCost === "very low" || analysis.costAnalysis.overallCost === "low"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : analysis.costAnalysis.overallCost === "medium"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                    }`}>
                      {analysis.costAnalysis.overallCost}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">Overall Trading Costs</p>
                </div>

                <div className="p-4 border rounded-md mb-6">
                  <p className="text-sm">{analysis.costAnalysis.costSummary}</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3">
                      <p className="text-sm font-medium mb-1">Spread Costs</p>
                      <p className="text-sm text-muted-foreground">{analysis.costAnalysis.spreadCost}</p>
                    </div>

                    <div className="border rounded-md p-3">
                      <p className="text-sm font-medium mb-1">Commission</p>
                      <p className="text-sm text-muted-foreground">{analysis.costAnalysis.commissionCost}</p>
                    </div>

                    <div className="border rounded-md p-3">
                      <p className="text-sm font-medium mb-1">Swap/Overnight Fees</p>
                      <p className="text-sm text-muted-foreground">{analysis.costAnalysis.swapCost}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Cost Impact by Trading Style:</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <Timer className="h-4 w-4 mr-1" /> Scalping
                      </div>
                      <Badge variant="outline" className={
                        analysis.costAnalysis.overallCost === "very low" || analysis.costAnalysis.overallCost === "low"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : analysis.costAnalysis.overallCost === "medium"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                      }>
                        {analysis.costAnalysis.overallCost === "very low" || analysis.costAnalysis.overallCost === "low"
                          ? "High Impact"
                          : analysis.costAnalysis.overallCost === "medium"
                            ? "Medium Impact"
                            : "Low Impact"}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-1" /> Day Trading
                      </div>
                      <Badge variant="outline" className={
                        analysis.costAnalysis.overallCost === "very low" || analysis.costAnalysis.overallCost === "low"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : analysis.costAnalysis.overallCost === "medium"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                      }>
                        {analysis.costAnalysis.overallCost === "very low" || analysis.costAnalysis.overallCost === "low"
                          ? "High Impact"
                          : analysis.costAnalysis.overallCost === "medium"
                            ? "Medium Impact"
                            : "Low Impact"}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <LineChart className="h-4 w-4 mr-1" /> Swing Trading
                      </div>
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                        Medium Impact
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <CandlestickChart className="h-4 w-4 mr-1" /> Position Trading
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        Low Impact
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Personalized recommendation section if user preferences are provided */}
        {recommendation && (
          <div className="px-6 py-4 border-t">
            <h3 className="font-semibold flex items-center mb-3">
              <Users className="h-5 w-5 text-green-500 mr-2" />
              Personalized Recommendation
            </h3>
            <div className={`p-4 rounded-md ${
              recommendation.matchLevel === "excellent" ? "bg-green-50 border-green-200" :
              recommendation.matchLevel === "good" ? "bg-blue-50 border-blue-200" :
              recommendation.matchLevel === "decent" ? "bg-amber-50 border-amber-200" :
              "bg-muted/20 border"
            }`}>
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium">{recommendation.matchLevel.charAt(0).toUpperCase() + recommendation.matchLevel.slice(1)} Match</p>
                <Badge className={`${
                  recommendation.matchLevel === "excellent" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                  recommendation.matchLevel === "good" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                  recommendation.matchLevel === "decent" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" :
                  "bg-muted hover:bg-muted"
                }`}>
                  {recommendation.matchScore}% compatibility
                </Badge>
              </div>
              <p className="text-sm mb-3">{recommendation.recommendation}</p>
              {recommendation.reasons.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-1">Key considerations:</p>
                  <ul className="text-xs space-y-1">
                    {recommendation.reasons.map((reason, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-green-600" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}