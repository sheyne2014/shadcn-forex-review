"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Calculator, 
  Users, 
  Zap, 
  Eye, 
  TrendingUp,
  DollarSign,
  Target,
  AlertTriangle
} from "lucide-react";
import { Context7Content, Context7Heading2 } from "@/components/Context7Provider";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { trackEvent } from "@/lib/analytics/google-analytics";
import { EtoroSpreadAnalysis } from "./EtoroSpreadAnalysis";
import { EtoroHiddenCosts } from "./EtoroHiddenCosts";
import { EtoroAccountTypes } from "./EtoroAccountTypes";
import { EtoroExecutionModel } from "./EtoroExecutionModel";
import { EtoroCostCalculator } from "./EtoroCostCalculator";

interface EtoroTradingConditionsAnalysisProps {
  broker: any;
}

export function EtoroTradingConditionsAnalysis({ broker }: EtoroTradingConditionsAnalysisProps) {
  const [activeTab, setActiveTab] = useState("spreads");

  useEffect(() => {
    trackEvent({
      action: 'view_trading_conditions_analysis',
      category: 'broker_analysis',
      label: 'etoro_comprehensive_analysis'
    });
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    trackEvent({
      action: 'tab_change',
      category: 'user_engagement',
      label: `trading_conditions_${tab}`
    });
  };

  const analysisOverview = {
    overallRating: 6.5,
    spreadRating: 4.0,
    costRating: 5.5,
    executionRating: 7.0,
    accountRating: 8.0,
    transparencyRating: 7.5
  };

  const keyInsights = [
    {
      title: "Higher Spreads Fund Social Features",
      description: "eToro's spreads are 2-3x higher than ECN brokers to fund social trading infrastructure",
      impact: "High",
      icon: TrendingUp
    },
    {
      title: "Hidden Costs Add Up Quickly",
      description: "$5 withdrawal fees and overnight financing can significantly impact profitability",
      impact: "Medium",
      icon: Eye
    },
    {
      title: "CFD Model Creates Conflicts",
      description: "As counterparty to trades, eToro's interests may not always align with traders",
      impact: "Medium",
      icon: AlertTriangle
    },
    {
      title: "Account Types Vary by Region",
      description: "Leverage and conditions differ significantly based on regulatory jurisdiction",
      impact: "High",
      icon: Users
    }
  ];

  return (
    <>
      <PerformanceMonitor />
      <div className="space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <Context7Heading2>Trading Conditions & Cost Analysis</Context7Heading2>
          </div>
          <Context7Content>
            Comprehensive analysis of eToro's trading conditions, costs, and execution model 
            with detailed comparisons and real-world examples.
          </Context7Content>
        </div>

        {/* Analysis Overview Dashboard */}
        <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Trading Conditions Overview
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {analysisOverview.overallRating}/10
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{analysisOverview.spreadRating}</div>
                <div className="text-xs text-muted-foreground">Spreads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">{analysisOverview.costRating}</div>
                <div className="text-xs text-muted-foreground">Hidden Costs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{analysisOverview.executionRating}</div>
                <div className="text-xs text-muted-foreground">Execution</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{analysisOverview.accountRating}</div>
                <div className="text-xs text-muted-foreground">Account Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{analysisOverview.transparencyRating}</div>
                <div className="text-xs text-muted-foreground">Transparency</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge 
                          variant={insight.impact === "High" ? "destructive" : "secondary"}
                        >
                          {insight.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="spreads" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Spreads</span>
            </TabsTrigger>
            <TabsTrigger value="hidden-costs" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Hidden Costs</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="execution" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Execution</span>
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Calculator</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="spreads" className="mt-8">
            <EtoroSpreadAnalysis broker={broker} />
          </TabsContent>

          <TabsContent value="hidden-costs" className="mt-8">
            <EtoroHiddenCosts broker={broker} />
          </TabsContent>

          <TabsContent value="accounts" className="mt-8">
            <EtoroAccountTypes broker={broker} />
          </TabsContent>

          <TabsContent value="execution" className="mt-8">
            <EtoroExecutionModel broker={broker} />
          </TabsContent>

          <TabsContent value="calculator" className="mt-8">
            <EtoroCostCalculator broker={broker} />
          </TabsContent>
        </Tabs>

        {/* Summary & Recommendations */}
        <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <DollarSign className="h-5 w-5" />
              Cost Analysis Summary & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Context7Content>
              eToro's trading conditions reflect its positioning as a social trading platform rather than 
              a traditional low-cost broker. While costs are higher, the unique social features may justify 
              the premium for certain trader types.
            </Context7Content>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600">When eToro Makes Sense</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                    <span>Beginner traders learning through copy trading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                    <span>Casual traders making &lt;20 trades per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                    <span>Investors focused on long-term positions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                    <span>Traders valuing social features over low costs</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-red-600">When to Consider Alternatives</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
                    <span>Scalpers and high-frequency traders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
                    <span>Traders making &gt;100 trades per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
                    <span>Professional traders requiring tight spreads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
                    <span>Cost-sensitive traders prioritizing low fees</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <h5 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                Bottom Line
              </h5>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                eToro's trading costs are 2-3x higher than traditional brokers, but the social trading 
                ecosystem provides unique value that may justify the premium for beginners and social traders. 
                Active traders should carefully calculate whether the extra costs align with their trading goals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
