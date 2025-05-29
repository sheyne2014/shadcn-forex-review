"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Zap, 
  Target, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  BarChart3,
  Info,
  CheckCircle,
  XCircle,
  Activity,
  Timer,
  Gauge
} from "lucide-react";
import { Context7Content, Context7Heading3 } from "@/components/Context7Provider";
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroExecutionModelProps {
  broker: any;
}

export function EtoroExecutionModel({ broker }: EtoroExecutionModelProps) {
  useEffect(() => {
    trackEvent({
      action: 'view_execution_model',
      category: 'trading_conditions',
      label: 'etoro_execution'
    });
  }, []);

  const executionStats = {
    averageExecutionSpeed: "0.3 seconds",
    slippageRate: "0.8 pips average",
    requoteFrequency: "2.1%",
    orderFillRate: "98.7%",
    marketExecutionRate: "100%"
  };

  const executionComparison = [
    {
      broker: "eToro",
      model: "CFD Provider",
      execution: "Market Execution",
      slippage: "0.8 pips",
      requotes: "2.1%",
      speed: "0.3s",
      rating: "Average"
    },
    {
      broker: "IC Markets",
      model: "ECN/STP",
      execution: "Market Execution",
      slippage: "0.2 pips",
      requotes: "0.1%",
      speed: "0.1s",
      rating: "Excellent"
    },
    {
      broker: "Pepperstone",
      model: "ECN/STP",
      execution: "Market Execution",
      slippage: "0.3 pips",
      requotes: "0.2%",
      speed: "0.1s",
      rating: "Excellent"
    },
    {
      broker: "Plus500",
      model: "CFD Provider",
      execution: "Market Execution",
      slippage: "1.2 pips",
      requotes: "3.5%",
      speed: "0.4s",
      rating: "Poor"
    }
  ];

  const newsEventAnalysis = [
    {
      event: "NFP Release",
      normalSlippage: "0.8 pips",
      newsSlippage: "3.2 pips",
      impact: "High",
      requoteIncrease: "+180%"
    },
    {
      event: "ECB Rate Decision",
      normalSlippage: "0.8 pips",
      newsSlippage: "2.8 pips",
      impact: "High",
      requoteIncrease: "+150%"
    },
    {
      event: "GDP Announcements",
      normalSlippage: "0.8 pips",
      newsSlippage: "1.8 pips",
      impact: "Medium",
      requoteIncrease: "+80%"
    },
    {
      event: "Market Open/Close",
      normalSlippage: "0.8 pips",
      newsSlippage: "2.1 pips",
      impact: "Medium",
      requoteIncrease: "+120%"
    }
  ];

  const executionConcerns = [
    {
      concern: "Stop Loss Hunting",
      description: "Potential for stops to be triggered at unfavorable prices",
      evidence: "User reports of stops triggered during low liquidity",
      severity: "Medium",
      mitigation: "Use guaranteed stop losses (additional cost)"
    },
    {
      concern: "Price Asymmetry",
      description: "Different prices for buy/sell orders during volatility",
      evidence: "Wider spreads during news events vs competitors",
      severity: "Medium",
      mitigation: "Avoid trading during high-impact news"
    },
    {
      concern: "Requote Frequency",
      description: "Higher requote rates compared to ECN brokers",
      evidence: "2.1% requote rate vs 0.1-0.2% at ECN brokers",
      severity: "Low",
      mitigation: "Accept market execution or use limit orders"
    },
    {
      concern: "Execution Delays",
      description: "Slower execution during peak trading hours",
      evidence: "0.3s average vs 0.1s at institutional brokers",
      severity: "Low",
      mitigation: "Plan trades outside peak volatility periods"
    }
  ];

  const modelComparison = {
    cfd: {
      name: "CFD Provider (eToro)",
      pros: [
        "Simplified trading process",
        "No commission on most instruments",
        "Negative balance protection",
        "Integrated social features"
      ],
      cons: [
        "Broker is counterparty to trades",
        "Potential conflicts of interest",
        "Higher spreads to cover costs",
        "Limited price transparency"
      ]
    },
    ecn: {
      name: "ECN/STP Model",
      pros: [
        "Direct market access",
        "Transparent pricing",
        "Lower spreads",
        "No conflicts of interest"
      ],
      cons: [
        "Commission charges",
        "More complex fee structure",
        "Requires larger deposits",
        "Less beginner-friendly"
      ]
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
            <Zap className="h-8 w-8 text-orange-600" />
          </div>
          <Context7Heading3>Execution Model & Order Processing</Context7Heading3>
        </div>
        <Context7Content>
          Detailed analysis of eToro's execution model, order processing speed, 
          slippage rates, and comparison with traditional ECN/STP brokers.
        </Context7Content>
      </div>

      {/* Execution Statistics Dashboard */}
      <Card className="border-2 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-orange-600" />
            Execution Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <Timer className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-600">{executionStats.averageExecutionSpeed}</div>
              <div className="text-xs text-muted-foreground">Avg Execution Speed</div>
            </div>
            
            <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
              <Activity className="h-6 w-6 text-amber-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-amber-600">{executionStats.slippageRate}</div>
              <div className="text-xs text-muted-foreground">Average Slippage</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-red-600">{executionStats.requoteFrequency}</div>
              <div className="text-xs text-muted-foreground">Requote Rate</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-600">{executionStats.orderFillRate}</div>
              <div className="text-xs text-muted-foreground">Order Fill Rate</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-600">{executionStats.marketExecutionRate}</div>
              <div className="text-xs text-muted-foreground">Market Execution</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CFD vs ECN Model Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-amber-700 dark:text-amber-400">
              {modelComparison.cfd.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-semibold text-green-600 mb-2 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Advantages
              </h5>
              <ul className="space-y-1 text-sm">
                {modelComparison.cfd.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-red-600 mb-2 flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                Disadvantages
              </h5>
              <ul className="space-y-1 text-sm">
                {modelComparison.cfd.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <XCircle className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-400">
              {modelComparison.ecn.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-semibold text-green-600 mb-2 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Advantages
              </h5>
              <ul className="space-y-1 text-sm">
                {modelComparison.ecn.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-red-600 mb-2 flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                Disadvantages
              </h5>
              <ul className="space-y-1 text-sm">
                {modelComparison.ecn.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <XCircle className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Execution Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Execution Quality Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Broker</th>
                  <th className="text-center p-3 font-semibold">Model</th>
                  <th className="text-center p-3 font-semibold">Execution</th>
                  <th className="text-center p-3 font-semibold">Avg Slippage</th>
                  <th className="text-center p-3 font-semibold">Requotes</th>
                  <th className="text-center p-3 font-semibold">Speed</th>
                  <th className="text-center p-3 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {executionComparison.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{row.broker}</td>
                    <td className="p-3 text-center">
                      <Badge variant={row.model === "CFD Provider" ? "secondary" : "default"}>
                        {row.model}
                      </Badge>
                    </td>
                    <td className="p-3 text-center">{row.execution}</td>
                    <td className="p-3 text-center font-mono">{row.slippage}</td>
                    <td className="p-3 text-center font-mono">{row.requotes}</td>
                    <td className="p-3 text-center font-mono">{row.speed}</td>
                    <td className="p-3 text-center">
                      <Badge 
                        variant={row.rating === "Excellent" ? "default" : 
                                row.rating === "Average" ? "secondary" : "destructive"}
                      >
                        {row.rating}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* News Events Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Execution During News Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Context7Content>
            Analysis of how eToro's execution quality changes during high-impact news events 
            and periods of market volatility.
          </Context7Content>
          
          <div className="mt-6 space-y-4">
            {newsEventAnalysis.map((event, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{event.event}</h4>
                  <Badge 
                    variant={event.impact === "High" ? "destructive" : "secondary"}
                  >
                    {event.impact} Impact
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Normal Slippage:</span>
                    <p className="font-semibold text-green-600">{event.normalSlippage}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">News Slippage:</span>
                    <p className="font-semibold text-red-600">{event.newsSlippage}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Requote Increase:</span>
                    <p className="font-semibold text-amber-600">{event.requoteIncrease}</p>
                  </div>
                  <div className="flex items-center">
                    <Progress 
                      value={event.impact === "High" ? 80 : 50} 
                      className="flex-1 h-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Execution Concerns */}
      <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Execution Concerns & Risk Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {executionConcerns.map((concern, index) => (
              <div key={index} className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-white dark:bg-background">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-red-700 dark:text-red-400">{concern.concern}</h4>
                  <Badge 
                    variant={concern.severity === "High" ? "destructive" : 
                            concern.severity === "Medium" ? "secondary" : "outline"}
                  >
                    {concern.severity} Risk
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{concern.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Evidence:</span>
                    <p>{concern.evidence}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Mitigation:</span>
                    <p className="text-green-600">{concern.mitigation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Alert className="border-amber-200 dark:border-amber-800">
        <Info className="h-4 w-4" />
        <AlertTitle>Key Execution Model Insights</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p>
            <strong>eToro operates as a CFD provider</strong>, not an ECN/STP broker. This means they act as the counterparty 
            to your trades, which can create potential conflicts of interest but also enables their social trading features.
          </p>
          <p>
            <strong>Execution quality is adequate for most retail traders</strong>, but professional traders and scalpers 
            may find the execution speeds and slippage rates insufficient for their strategies.
          </p>
          <p>
            <strong>News event trading carries higher risks</strong> due to increased slippage and requote rates during 
            volatile market conditions.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
