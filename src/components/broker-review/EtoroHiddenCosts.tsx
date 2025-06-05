"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator, 
  DollarSign, 
  Clock, 
  CreditCard,
  AlertTriangle,
  Info,
  TrendingDown,
  Calendar,
  Globe,
  Zap,
  Eye,
  Target
} from "lucide-react";
// Removed Context7 imports due to compatibility issues
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroHiddenCostsProps {
  broker: any;
}

export function EtoroHiddenCosts({ broker }: EtoroHiddenCostsProps) {
  const [accountBalance, setAccountBalance] = useState(10000);
  const [monthlyTrades, setMonthlyTrades] = useState(50);
  const [withdrawalsPerMonth, setWithdrawalsPerMonth] = useState(2);
  const [inactivityMonths, setInactivityMonths] = useState(0);

  useEffect(() => {
    trackEvent({
      action: 'view_hidden_costs',
      category: 'trading_conditions',
      label: 'etoro_costs_calculator'
    });
  }, []);

  const hiddenCosts = [
    {
      type: "Withdrawal Fee",
      amount: "$5",
      frequency: "Per withdrawal",
      description: "Fixed fee charged for each withdrawal regardless of amount",
      impact: "High",
      calculation: "Monthly cost = Number of withdrawals × $5"
    },
    {
      type: "Inactivity Fee",
      amount: "$10",
      frequency: "Monthly (after 12 months)",
      description: "Charged monthly if no login for 12+ months",
      impact: "Medium",
      calculation: "Annual cost = $120 if inactive"
    },
    {
      type: "Currency Conversion",
      amount: "50 pips",
      frequency: "Per non-USD deposit",
      description: "Hidden spread on currency conversion",
      impact: "Medium",
      calculation: "Cost = Deposit amount × 0.5%"
    },
    {
      type: "Weekend Crypto Holding",
      amount: "Variable",
      frequency: "Weekend positions",
      description: "Additional fees for crypto CFD positions held over weekends",
      impact: "High",
      calculation: "Typically 0.1-0.5% of position value"
    },
    {
      type: "Overnight Financing",
      amount: "Variable",
      frequency: "Daily (leveraged positions)",
      description: "Daily swap fees for leveraged positions held overnight",
      impact: "Very High",
      calculation: "Position size × overnight rate × days held"
    }
  ];

  const overnightRates = [
    { instrument: "EUR/USD", longRate: -0.0082, shortRate: -0.0032 },
    { instrument: "GBP/USD", longRate: -0.0089, shortRate: -0.0021 },
    { instrument: "USD/JPY", longRate: -0.0045, shortRate: -0.0078 },
    { instrument: "Bitcoin CFD", longRate: -0.0274, shortRate: -0.0274 },
    { instrument: "Apple Stock CFD", longRate: -0.0089, shortRate: -0.0089 }
  ];

  const calculateMonthlyCosts = () => {
    const withdrawalCosts = withdrawalsPerMonth * 5;
    const inactivityCosts = inactivityMonths > 0 ? 10 : 0;
    const estimatedOvernightCosts = monthlyTrades * 2.5; // Rough estimate
    
    return {
      withdrawal: withdrawalCosts,
      inactivity: inactivityCosts,
      overnight: estimatedOvernightCosts,
      total: withdrawalCosts + inactivityCosts + estimatedOvernightCosts
    };
  };

  const monthlyCosts = calculateMonthlyCosts();

  const calculateOvernightCost = (positionSize: number, rate: number, days: number) => {
    return positionSize * Math.abs(rate) * days;
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
            <Eye className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Hidden Costs & Fee Analysis
          </h3>
        </div>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Comprehensive breakdown of eToro's hidden costs and fees that impact your trading profitability
          beyond the advertised spreads.
        </p>
      </div>

      {/* Interactive Cost Calculator */}
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            Interactive Hidden Costs Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="balance">Account Balance ($)</Label>
                <Input
                  id="balance"
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Monthly Trades: {monthlyTrades}</Label>
                <Slider
                  value={[monthlyTrades]}
                  onValueChange={(value) => setMonthlyTrades(value[0])}
                  max={200}
                  min={1}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Withdrawals per Month: {withdrawalsPerMonth}</Label>
                <Slider
                  value={[withdrawalsPerMonth]}
                  onValueChange={(value) => setWithdrawalsPerMonth(value[0])}
                  max={10}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Inactivity Months: {inactivityMonths}</Label>
                <Slider
                  value={[inactivityMonths]}
                  onValueChange={(value) => setInactivityMonths(value[0])}
                  max={12}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Cost Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-red-600">${monthlyCosts.withdrawal}</div>
              <div className="text-xs text-muted-foreground">Withdrawal Fees</div>
            </div>
            
            <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-amber-600">${monthlyCosts.inactivity}</div>
              <div className="text-xs text-muted-foreground">Inactivity Fees</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <TrendingDown className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-600">${monthlyCosts.overnight}</div>
              <div className="text-xs text-muted-foreground">Est. Overnight Costs</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-950/20 rounded-lg border-2 border-gray-300 dark:border-gray-700">
              <Target className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-600">${monthlyCosts.total}</div>
              <div className="text-xs text-muted-foreground">Total Monthly</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden Costs Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Complete Hidden Costs Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hiddenCosts.map((cost, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                    <h4 className="font-semibold">{cost.type}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">{cost.amount}</Badge>
                    <Badge 
                      variant={cost.impact === "Very High" ? "destructive" : 
                              cost.impact === "High" ? "destructive" :
                              cost.impact === "Medium" ? "secondary" : "outline"}
                    >
                      {cost.impact}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Frequency:</span>
                    <p>{cost.frequency}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Description:</span>
                    <p>{cost.description}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Calculation:</span>
                    <p className="font-mono text-xs">{cost.calculation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overnight Financing Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Overnight Financing Rates (Daily)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Overnight financing costs for leveraged positions held beyond market close.
            These costs can significantly impact profitability for swing traders and position holders.
          </p>
          
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Instrument</th>
                  <th className="text-center p-3 font-semibold">Long Position Rate</th>
                  <th className="text-center p-3 font-semibold">Short Position Rate</th>
                  <th className="text-center p-3 font-semibold">Daily Cost ($10k position)</th>
                </tr>
              </thead>
              <tbody>
                {overnightRates.map((rate, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{rate.instrument}</td>
                    <td className="p-3 text-center">
                      <span className={rate.longRate < 0 ? "text-red-600" : "text-green-600"}>
                        {(rate.longRate * 100).toFixed(3)}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={rate.shortRate < 0 ? "text-red-600" : "text-green-600"}>
                        {(rate.shortRate * 100).toFixed(3)}%
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono">
                      ${calculateOvernightCost(10000, Math.max(Math.abs(rate.longRate), Math.abs(rate.shortRate)), 1).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Overnight Cost Examples */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <h5 className="font-semibold text-red-700 dark:text-red-400 mb-2">High Cost Example</h5>
              <p className="text-sm text-red-600 dark:text-red-300">
                Bitcoin CFD position of $50,000 held for 30 days costs approximately 
                <span className="font-bold"> $411 in overnight fees</span> (2.74% annual rate).
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <h5 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Forex Example</h5>
              <p className="text-sm text-amber-600 dark:text-amber-300">
                EUR/USD position of $100,000 held for 7 days costs approximately 
                <span className="font-bold"> $57 in overnight fees</span> (0.82% annual rate).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Comparison with Competitors */}
      <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <Globe className="h-5 w-5" />
            Hidden Costs vs Competitors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h5 className="font-semibold mb-2">eToro</h5>
              <div className="space-y-1 text-sm">
                <div>Withdrawal: $5</div>
                <div>Inactivity: $10/month</div>
                <div>Conversion: 50 pips</div>
                <div className="font-bold text-red-600">High Cost</div>
              </div>
            </div>
            
            <div className="text-center">
              <h5 className="font-semibold mb-2">IC Markets</h5>
              <div className="space-y-1 text-sm">
                <div>Withdrawal: Free</div>
                <div>Inactivity: $5/month</div>
                <div>Conversion: 25 pips</div>
                <div className="font-bold text-green-600">Low Cost</div>
              </div>
            </div>
            
            <div className="text-center">
              <h5 className="font-semibold mb-2">XM</h5>
              <div className="space-y-1 text-sm">
                <div>Withdrawal: Free</div>
                <div>Inactivity: $5/month</div>
                <div>Conversion: 30 pips</div>
                <div className="font-bold text-green-600">Low Cost</div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <h5 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
              Annual Hidden Cost Impact
            </h5>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              An active trader with $25,000 account making 2 withdrawals monthly could pay 
              <span className="font-bold"> $120+ annually in hidden fees</span> at eToro, 
              compared to <span className="font-bold">$60 or less</span> at traditional brokers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
