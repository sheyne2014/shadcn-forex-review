"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Calculator,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Target,
  ArrowUpDown,
  Timer
} from "lucide-react";
// Removed Context7 imports due to compatibility issues
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroSpreadAnalysisProps {
  broker: any;
}

export function EtoroSpreadAnalysis({ broker }: EtoroSpreadAnalysisProps) {
  const [selectedPair, setSelectedPair] = useState("EURUSD");
  const [positionSize, setPositionSize] = useState(1.0);

  useEffect(() => {
    trackEvent({
      action: 'view_spread_analysis',
      category: 'trading_conditions',
      label: 'etoro_spreads'
    });
  }, []);

  const spreadComparison = [
    {
      pair: "EUR/USD",
      etoro: 1.0,
      icmarkets: 0.3,
      pepperstone: 0.4,
      xm: 0.8,
      plus500: 1.2,
      ig: 0.6,
      rating: "Poor"
    },
    {
      pair: "GBP/USD",
      etoro: 1.2,
      icmarkets: 0.4,
      pepperstone: 0.5,
      xm: 1.0,
      plus500: 1.5,
      ig: 0.8,
      rating: "Poor"
    },
    {
      pair: "USD/JPY",
      etoro: 1.1,
      icmarkets: 0.3,
      pepperstone: 0.4,
      xm: 0.9,
      plus500: 1.3,
      ig: 0.7,
      rating: "Poor"
    },
    {
      pair: "AUD/USD",
      etoro: 1.5,
      icmarkets: 0.4,
      pepperstone: 0.5,
      xm: 1.2,
      plus500: 1.8,
      ig: 0.9,
      rating: "Poor"
    },
    {
      pair: "USD/CAD",
      etoro: 1.3,
      icmarkets: 0.5,
      pepperstone: 0.6,
      xm: 1.1,
      plus500: 1.6,
      ig: 0.8,
      rating: "Poor"
    }
  ];

  const calculateTradingCost = (spread: number, lotSize: number) => {
    return spread * lotSize * 10; // Standard calculation for major pairs
  };

  const getSpreadRating = (etoroSpread: number, competitorAvg: number) => {
    const ratio = etoroSpread / competitorAvg;
    if (ratio <= 1.2) return { rating: "Good", color: "green" };
    if (ratio <= 2.0) return { rating: "Average", color: "yellow" };
    return { rating: "Poor", color: "red" };
  };

  const marketConditions = [
    {
      condition: "Normal Market Hours",
      etoroSpread: "1.0 pips",
      competitorAvg: "0.4 pips",
      difference: "+150%",
      impact: "High"
    },
    {
      condition: "News Events",
      etoroSpread: "3-5 pips",
      competitorAvg: "1-2 pips",
      difference: "+200%",
      impact: "Very High"
    },
    {
      condition: "Weekend Gaps",
      etoroSpread: "5-10 pips",
      competitorAvg: "2-4 pips",
      difference: "+150%",
      impact: "Extreme"
    },
    {
      condition: "Low Liquidity",
      etoroSpread: "2-4 pips",
      competitorAvg: "0.8-1.5 pips",
      difference: "+167%",
      impact: "High"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Spread Analysis & Cost Comparison
          </h3>
        </div>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Comprehensive analysis of eToro's spreads compared to major competitors,
          with real trading cost examples and market condition impacts.
        </p>
      </div>

      {/* Spread Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Major Currency Pairs Spread Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Currency Pair</th>
                  <th className="text-center p-3 font-semibold text-red-600">eToro</th>
                  <th className="text-center p-3 font-semibold">IC Markets</th>
                  <th className="text-center p-3 font-semibold">Pepperstone</th>
                  <th className="text-center p-3 font-semibold">XM</th>
                  <th className="text-center p-3 font-semibold">Plus500</th>
                  <th className="text-center p-3 font-semibold">IG</th>
                  <th className="text-center p-3 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {spreadComparison.map((row, index) => {
                  const competitorAvg = (row.icmarkets + row.pepperstone + row.xm + row.plus500 + row.ig) / 5;
                  const rating = getSpreadRating(row.etoro, competitorAvg);
                  
                  return (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{row.pair}</td>
                      <td className="p-3 text-center">
                        <Badge variant="destructive">{row.etoro} pips</Badge>
                      </td>
                      <td className="p-3 text-center">{row.icmarkets} pips</td>
                      <td className="p-3 text-center">{row.pepperstone} pips</td>
                      <td className="p-3 text-center">{row.xm} pips</td>
                      <td className="p-3 text-center">{row.plus500} pips</td>
                      <td className="p-3 text-center">{row.ig} pips</td>
                      <td className="p-3 text-center">
                        <Badge variant={rating.color === "red" ? "destructive" : rating.color === "yellow" ? "secondary" : "default"}>
                          {rating.rating}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Real Trading Cost Examples */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-amber-600" />
            Real Trading Cost Examples
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Understanding the real cost impact of eToro's spreads with practical trading examples.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Standard Lot (1.0) EUR/USD Trade</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <span className="font-medium">eToro Cost:</span>
                  <span className="font-bold text-red-600">$10.00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <span className="font-medium">IC Markets Cost:</span>
                  <span className="font-bold text-green-600">$3.00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <span className="font-medium">Extra Cost:</span>
                  <span className="font-bold text-amber-600">+$7.00 (+233%)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Mini Lot (0.1) GBP/USD Trade</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <span className="font-medium">eToro Cost:</span>
                  <span className="font-bold text-red-600">$1.20</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <span className="font-medium">Pepperstone Cost:</span>
                  <span className="font-bold text-green-600">$0.50</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <span className="font-medium">Extra Cost:</span>
                  <span className="font-bold text-amber-600">+$0.70 (+140%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trading Cost Analysis */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-lg mb-4 text-blue-700 dark:text-blue-400">
              Monthly Trading Cost Analysis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">$300</div>
                <div className="text-sm text-muted-foreground">eToro (100 trades/month)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$120</div>
                <div className="text-sm text-muted-foreground">ECN Broker Average</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">+$180</div>
                <div className="text-sm text-muted-foreground">Extra Monthly Cost</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Conditions Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Spread Behavior Under Different Market Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketConditions.map((condition, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{condition.condition}</h4>
                  <Badge 
                    variant={condition.impact === "Extreme" ? "destructive" : 
                            condition.impact === "Very High" ? "destructive" :
                            condition.impact === "High" ? "secondary" : "outline"}
                  >
                    {condition.impact} Impact
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">eToro Spread:</span>
                    <p className="font-semibold text-red-600">{condition.etoroSpread}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Competitor Avg:</span>
                    <p className="font-semibold text-green-600">{condition.competitorAvg}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Difference:</span>
                    <p className="font-semibold text-amber-600">{condition.difference}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {condition.impact === "Extreme" ? (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    ) : condition.impact === "Very High" ? (
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    ) : (
                      <Info className="h-4 w-4 text-amber-600" />
                    )}
                    <span className="text-xs text-muted-foreground">Cost Impact</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <Target className="h-5 w-5" />
            Key Spread Analysis Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h5 className="font-semibold text-amber-700 dark:text-amber-400">Why eToro's Spreads Are Higher</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ArrowUpDown className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Funds social trading infrastructure and features</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpDown className="h-3 w-3 text-amber-600 mt-1" />
                  <span>CFD model vs direct market access</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpDown className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Retail-focused business model</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpDown className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Marketing and user acquisition costs</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-semibold text-amber-700 dark:text-amber-400">Impact on Trading Strategies</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Timer className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Scalping becomes unprofitable due to high spreads</span>
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Day trading requires larger profit targets</span>
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Swing trading and position trading more suitable</span>
                </li>
                <li className="flex items-start gap-2">
                  <Timer className="h-3 w-3 text-amber-600 mt-1" />
                  <span>Copy trading may offset higher costs for beginners</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
