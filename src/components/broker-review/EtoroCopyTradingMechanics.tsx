"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Copy, 
  Users, 
  TrendingUp, 
  Shield,
  Target,
  BarChart3,
  DollarSign,
  Clock,
  Zap,
  Settings,
  AlertTriangle,
  CheckCircle,
  Info,
  Activity
} from "lucide-react";
// Removed Context7 imports due to compatibility issues
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroCopyTradingMechanicsProps {
  broker: any;
}

export function EtoroCopyTradingMechanics({ broker }: EtoroCopyTradingMechanicsProps) {
  const [copyAmount, setCopyAmount] = useState(1000);
  const [riskLevel, setRiskLevel] = useState(6);
  const [maxTrades, setMaxTrades] = useState(10);

  useEffect(() => {
    trackEvent({
      action: 'view_copy_trading_mechanics',
      category: 'social_trading',
      label: 'etoro_copy_mechanics'
    });
  }, []);

  const copyTradingLimits = {
    minimum: 200,
    maximum: 2000000,
    defaultRisk: 6,
    maxCopiedTraders: 100,
    maxAllocationPerTrader: 40
  };

  const algorithmFeatures = [
    {
      feature: "Proportional Copying",
      description: "Trades are copied proportionally to your allocated amount",
      example: "If trader opens $1000 position and you allocated $500, you open $50 position",
      accuracy: "99.8%"
    },
    {
      feature: "Real-Time Execution",
      description: "Trades copied within milliseconds of original execution",
      example: "Average delay: 0.2 seconds from original trade",
      accuracy: "Real-time"
    },
    {
      feature: "Risk Scaling",
      description: "Automatically adjusts position sizes based on your risk settings",
      example: "Risk level 4 = 50% of trader's position size",
      accuracy: "Configurable"
    },
    {
      feature: "Stop Loss Mirroring",
      description: "Copies stop losses and take profits from original trades",
      example: "If trader sets 2% SL, your trade gets proportional SL",
      accuracy: "100%"
    }
  ];

  const riskManagementTools = [
    {
      tool: "Maximum Daily Loss",
      description: "Stop copying if daily loss exceeds threshold",
      setting: "1-20% of copy amount",
      effectiveness: "High"
    },
    {
      tool: "Maximum Open Trades",
      description: "Limit number of simultaneous copied trades",
      setting: "1-100 trades",
      effectiveness: "Medium"
    },
    {
      tool: "Copy Stop Loss",
      description: "Stop copying trader if total loss reaches limit",
      setting: "5-95% of copy amount",
      effectiveness: "High"
    },
    {
      tool: "Take Profit",
      description: "Stop copying when profit target is reached",
      setting: "Custom percentage",
      effectiveness: "Medium"
    }
  ];

  const performanceMetrics = [
    { metric: "Copy Accuracy", value: "99.8%", description: "Trades copied successfully" },
    { metric: "Execution Speed", value: "0.2s", description: "Average copy delay" },
    { metric: "Slippage Rate", value: "0.3 pips", description: "Additional slippage vs original" },
    { metric: "Success Rate", value: "67%", description: "Profitable copy relationships" }
  ];

  const calculateCopySize = (traderPosition: number, allocation: number, riskLevel: number) => {
    const riskMultiplier = riskLevel / 10;
    return (traderPosition * allocation * riskMultiplier) / 100000;
  };

  const copyExample = {
    traderPosition: 100000,
    yourAllocation: copyAmount,
    riskMultiplier: riskLevel / 10,
    resultingPosition: calculateCopySize(100000, copyAmount, riskLevel)
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <Copy className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Copy Trading Mechanics & Algorithm
          </h3>
        </div>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Deep dive into how eToro's copy trading algorithm works, including execution mechanics,
          risk management tools, and performance tracking capabilities.
        </p>
      </div>

      {/* Interactive Copy Calculator */}
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Interactive Copy Trading Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label>Copy Amount: ${copyAmount.toLocaleString()}</Label>
              <Slider
                value={[copyAmount]}
                onValueChange={(value) => setCopyAmount(value[0])}
                max={50000}
                min={200}
                step={100}
                className="mt-2"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Min: $200 | Max: $2,000,000
              </div>
            </div>

            <div>
              <Label>Risk Level: {riskLevel}/10</Label>
              <Slider
                value={[riskLevel]}
                onValueChange={(value) => setRiskLevel(value[0])}
                max={10}
                min={1}
                step={1}
                className="mt-2"
              />
              <div className="text-xs text-muted-foreground mt-1">
                1 = Very Conservative | 10 = Very Aggressive
              </div>
            </div>

            <div>
              <Label>Max Simultaneous Trades: {maxTrades}</Label>
              <Slider
                value={[maxTrades]}
                onValueChange={(value) => setMaxTrades(value[0])}
                max={100}
                min={1}
                step={1}
                className="mt-2"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Limit concurrent copied positions
              </div>
            </div>
          </div>

          {/* Copy Example */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Copy Example</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Trader Opens:</span>
                <p className="font-bold">$100,000 EUR/USD</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Your Allocation:</span>
                <p className="font-bold">${copyAmount.toLocaleString()}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Risk Level:</span>
                <p className="font-bold">{riskLevel}/10 ({(riskLevel * 10)}%)</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Your Position:</span>
                <p className="font-bold text-blue-600">${copyExample.resultingPosition.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Copy Trading Algorithm Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {algorithmFeatures.map((feature, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{feature.feature}</h4>
                  <Badge variant="outline">{feature.accuracy}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-700 dark:text-green-400 text-sm">Example:</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-300">{feature.example}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Copy Trading Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Activity className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600 mb-1">{metric.value}</div>
                <div className="font-medium text-sm mb-1">{metric.metric}</div>
                <div className="text-xs text-muted-foreground">{metric.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Management Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Risk Management Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            eToro provides comprehensive risk management tools to help protect your capital
            when copy trading, allowing you to set multiple safety parameters.
          </p>
          
          <div className="mt-6 space-y-4">
            {riskManagementTools.map((tool, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    {tool.tool}
                  </h4>
                  <Badge 
                    variant={tool.effectiveness === "High" ? "default" : "secondary"}
                  >
                    {tool.effectiveness} Effectiveness
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Setting Range:</span>
                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{tool.setting}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Copy Trading Limits */}
      <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <Target className="h-5 w-5" />
            Copy Trading Limits & Constraints
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white dark:bg-background rounded-lg border">
              <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold">$200 - $2M</div>
              <div className="text-sm text-muted-foreground">Copy Amount Range</div>
            </div>
            
            <div className="text-center p-4 bg-white dark:bg-background rounded-lg border">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold">100 Max</div>
              <div className="text-sm text-muted-foreground">Copied Traders</div>
            </div>
            
            <div className="text-center p-4 bg-white dark:bg-background rounded-lg border">
              <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold">40% Max</div>
              <div className="text-sm text-muted-foreground">Per Trader Allocation</div>
            </div>
          </div>

          <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-amber-600" />
              <span className="font-semibold text-amber-800 dark:text-amber-300">Important Considerations</span>
            </div>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• Copy trading requires minimum $200 allocation per trader</li>
              <li>• Maximum 40% of your copy trading budget can be allocated to one trader</li>
              <li>• Trades are executed during market hours only</li>
              <li>• Some instruments may not be available for copying due to regulations</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
