"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  BarChart3,
  Target,
  AlertTriangle,
  Info,
  Zap,
  Clock,
  PieChart
} from "lucide-react";
import { Context7Content, Context7Heading3 } from "@/components/Context7Provider";
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroCostCalculatorProps {
  broker: any;
}

export function EtoroCostCalculator({ broker }: EtoroCostCalculatorProps) {
  const [traderType, setTraderType] = useState("active");
  const [monthlyTrades, setMonthlyTrades] = useState(50);
  const [averageLotSize, setAverageLotSize] = useState(0.1);
  const [selectedPair, setSelectedPair] = useState("EURUSD");
  const [holdingDays, setHoldingDays] = useState(1);
  const [withdrawalsPerMonth, setWithdrawalsPerMonth] = useState(1);

  useEffect(() => {
    trackEvent({
      action: 'use_cost_calculator',
      category: 'trading_conditions',
      label: 'etoro_calculator'
    });
  }, []);

  const tradingPairs = {
    EURUSD: { spread: 1.0, overnight: 0.0082 },
    GBPUSD: { spread: 1.2, overnight: 0.0089 },
    USDJPY: { spread: 1.1, overnight: 0.0045 },
    AUDUSD: { spread: 1.5, overnight: 0.0067 },
    USDCAD: { spread: 1.3, overnight: 0.0056 }
  };

  const competitorData = {
    etoro: { name: "eToro", spreadMultiplier: 1.0, commission: 0, withdrawal: 5 },
    icmarkets: { name: "IC Markets", spreadMultiplier: 0.3, commission: 3.5, withdrawal: 0 },
    pepperstone: { name: "Pepperstone", spreadMultiplier: 0.4, commission: 3.5, withdrawal: 0 },
    xm: { name: "XM", spreadMultiplier: 0.8, commission: 0, withdrawal: 0 }
  };

  const calculateCosts = () => {
    const pair = tradingPairs[selectedPair as keyof typeof tradingPairs];
    const baseSpread = pair.spread;
    const overnightRate = pair.overnight;

    // Calculate costs for each broker
    const costs = Object.entries(competitorData).map(([key, broker]) => {
      const adjustedSpread = baseSpread * broker.spreadMultiplier;
      const spreadCost = monthlyTrades * averageLotSize * adjustedSpread * 10;
      const commissionCost = monthlyTrades * averageLotSize * broker.commission;
      const overnightCost = monthlyTrades * averageLotSize * 100000 * overnightRate * holdingDays;
      const withdrawalCost = withdrawalsPerMonth * broker.withdrawal;
      
      const totalMonthlyCost = spreadCost + commissionCost + overnightCost + withdrawalCost;
      const annualCost = totalMonthlyCost * 12;

      return {
        broker: broker.name,
        spreadCost,
        commissionCost,
        overnightCost,
        withdrawalCost,
        totalMonthlyCost,
        annualCost
      };
    });

    return costs;
  };

  const costs = calculateCosts();
  const etoroIndex = costs.findIndex(c => c.broker === "eToro");
  const cheapestIndex = costs.reduce((minIndex, cost, index) => 
    cost.totalMonthlyCost < costs[minIndex].totalMonthlyCost ? index : minIndex, 0);

  const traderProfiles = {
    scalper: { trades: 200, lotSize: 0.1, holding: 0.1, description: "High-frequency, small positions" },
    dayTrader: { trades: 100, lotSize: 0.2, holding: 0.5, description: "Intraday trading, medium positions" },
    active: { trades: 50, lotSize: 0.1, holding: 1, description: "Regular trading, mixed timeframes" },
    swing: { trades: 20, lotSize: 0.3, holding: 5, description: "Position trading, larger sizes" },
    casual: { trades: 10, lotSize: 0.05, holding: 2, description: "Occasional trading, small sizes" }
  };

  const handleProfileChange = (profile: string) => {
    setTraderType(profile);
    const profileData = traderProfiles[profile as keyof typeof traderProfiles];
    setMonthlyTrades(profileData.trades);
    setAverageLotSize(profileData.lotSize);
    setHoldingDays(profileData.holding);
  };

  const calculateBreakEven = () => {
    const etoroMonthlyCost = costs[etoroIndex].totalMonthlyCost;
    const cheapestMonthlyCost = costs[cheapestIndex].totalMonthlyCost;
    const extraCost = etoroMonthlyCost - cheapestMonthlyCost;
    
    // Assuming 5% monthly return needed to break even
    const requiredCapital = extraCost / 0.05;
    return { extraCost, requiredCapital };
  };

  const breakEven = calculateBreakEven();

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
            <Calculator className="h-8 w-8 text-green-600" />
          </div>
          <Context7Heading3>Interactive Trading Cost Calculator</Context7Heading3>
        </div>
        <Context7Content>
          Calculate and compare your real trading costs with eToro versus competitors 
          based on your trading style and frequency.
        </Context7Content>
      </div>

      {/* Trading Profile Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Select Your Trading Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(traderProfiles).map(([key, profile]) => (
              <Button
                key={key}
                variant={traderType === key ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-center text-center"
                onClick={() => handleProfileChange(key)}
              >
                <div className="font-semibold capitalize mb-1">{key}</div>
                <div className="text-xs text-muted-foreground">{profile.description}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calculator Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Customize Your Trading Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label>Currency Pair</Label>
              <Select value={selectedPair} onValueChange={setSelectedPair}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(tradingPairs).map(pair => (
                    <SelectItem key={pair} value={pair}>{pair}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Monthly Trades: {monthlyTrades}</Label>
              <Slider
                value={[monthlyTrades]}
                onValueChange={(value) => setMonthlyTrades(value[0])}
                max={300}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Average Lot Size: {averageLotSize}</Label>
              <Slider
                value={[averageLotSize]}
                onValueChange={(value) => setAverageLotSize(value[0])}
                max={2.0}
                min={0.01}
                step={0.01}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Average Holding Days: {holdingDays}</Label>
              <Slider
                value={[holdingDays]}
                onValueChange={(value) => setHoldingDays(value[0])}
                max={30}
                min={0.1}
                step={0.1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Withdrawals/Month: {withdrawalsPerMonth}</Label>
              <Slider
                value={[withdrawalsPerMonth]}
                onValueChange={(value) => setWithdrawalsPerMonth(value[0])}
                max={10}
                min={0}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Comparison Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Monthly Cost Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Broker</th>
                  <th className="text-center p-3 font-semibold">Spreads</th>
                  <th className="text-center p-3 font-semibold">Commission</th>
                  <th className="text-center p-3 font-semibold">Overnight</th>
                  <th className="text-center p-3 font-semibold">Withdrawal</th>
                  <th className="text-center p-3 font-semibold">Total Monthly</th>
                  <th className="text-center p-3 font-semibold">Annual</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((cost, index) => (
                  <tr key={index} className={`border-b hover:bg-muted/50 ${
                    index === etoroIndex ? 'bg-red-50 dark:bg-red-950/20' : 
                    index === cheapestIndex ? 'bg-green-50 dark:bg-green-950/20' : ''
                  }`}>
                    <td className="p-3 font-medium">
                      <div className="flex items-center gap-2">
                        {cost.broker}
                        {index === etoroIndex && <Badge variant="destructive">Current</Badge>}
                        {index === cheapestIndex && <Badge variant="default">Cheapest</Badge>}
                      </div>
                    </td>
                    <td className="p-3 text-center font-mono">${cost.spreadCost.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono">${cost.commissionCost.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono">${cost.overnightCost.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono">${cost.withdrawalCost.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono font-bold">
                      ${cost.totalMonthlyCost.toFixed(2)}
                    </td>
                    <td className="p-3 text-center font-mono font-bold">
                      ${cost.annualCost.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cost Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Extra Monthly Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-2">
              +${breakEven.extraCost.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              Additional cost per month compared to cheapest option
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Break-Even Capital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600 mb-2">
              ${breakEven.requiredCapital.toFixed(0)}
            </div>
            <p className="text-sm text-muted-foreground">
              Capital needed to offset extra costs with 5% monthly returns
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Annual Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ${(breakEven.extraCost * 12).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              Total extra cost per year at current trading frequency
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trading Strategy Impact */}
      <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <PieChart className="h-5 w-5" />
            Trading Strategy Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Cost Breakdown (Monthly)</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Spread Costs:</span>
                  <span className="font-mono">${costs[etoroIndex].spreadCost.toFixed(2)} ({((costs[etoroIndex].spreadCost / costs[etoroIndex].totalMonthlyCost) * 100).toFixed(1)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Overnight Costs:</span>
                  <span className="font-mono">${costs[etoroIndex].overnightCost.toFixed(2)} ({((costs[etoroIndex].overnightCost / costs[etoroIndex].totalMonthlyCost) * 100).toFixed(1)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Withdrawal Fees:</span>
                  <span className="font-mono">${costs[etoroIndex].withdrawalCost.toFixed(2)} ({((costs[etoroIndex].withdrawalCost / costs[etoroIndex].totalMonthlyCost) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Strategy Recommendations</h4>
              <div className="space-y-2 text-sm">
                {monthlyTrades > 100 && (
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <span>High-frequency trading significantly increases costs at eToro</span>
                  </div>
                )}
                {holdingDays > 5 && (
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span>Long-term positions incur substantial overnight financing costs</span>
                  </div>
                )}
                {withdrawalsPerMonth > 2 && (
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <span>Frequent withdrawals add significant costs ($5 per withdrawal)</span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Consider if social trading benefits justify the extra costs</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
