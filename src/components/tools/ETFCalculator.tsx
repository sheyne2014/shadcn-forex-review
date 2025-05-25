"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, PieChart, TrendingUp, Download, Plus, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface ETFHolding {
  id: string;
  name: string;
  allocation: number;
  expenseRatio: number;
  expectedReturn: number;
}

export function ETFCalculator() {
  const [portfolioValue, setPortfolioValue] = useState(50000);
  const [investmentHorizon, setInvestmentHorizon] = useState(10); // years
  const [rebalanceFrequency, setRebalanceFrequency] = useState("quarterly");
  const [etfHoldings, setEtfHoldings] = useState<ETFHolding[]>([
    { id: "1", name: "S&P 500 ETF", allocation: 60, expenseRatio: 0.03, expectedReturn: 10 },
    { id: "2", name: "International ETF", allocation: 25, expenseRatio: 0.05, expectedReturn: 8 },
    { id: "3", name: "Bond ETF", allocation: 15, expenseRatio: 0.04, expectedReturn: 4 },
  ]);
  
  const [results, setResults] = useState<{
    totalExpenseRatio: number;
    annualExpenseCost: number;
    totalExpenseCost: number;
    portfolioReturn: number;
    finalValue: number;
    netReturn: number;
    costImpact: number;
    rebalancingCost: number;
    allocationBreakdown: Array<{
      name: string;
      allocation: number;
      value: number;
      annualCost: number;
    }>;
  } | null>(null);

  const rebalanceFrequencies = {
    monthly: { frequency: 12, cost: 0.1 },
    quarterly: { frequency: 4, cost: 0.05 },
    semiannually: { frequency: 2, cost: 0.03 },
    annually: { frequency: 1, cost: 0.02 },
  };

  const addETF = () => {
    const newETF: ETFHolding = {
      id: Date.now().toString(),
      name: "New ETF",
      allocation: 0,
      expenseRatio: 0.05,
      expectedReturn: 8,
    };
    setEtfHoldings([...etfHoldings, newETF]);
  };

  const removeETF = (id: string) => {
    if (etfHoldings.length > 1) {
      setEtfHoldings(etfHoldings.filter(etf => etf.id !== id));
    }
  };

  const updateETF = (id: string, field: keyof ETFHolding, value: string | number) => {
    setEtfHoldings(etfHoldings.map(etf => 
      etf.id === id ? { ...etf, [field]: value } : etf
    ));
  };

  const calculateETF = () => {
    // Normalize allocations to 100%
    const totalAllocation = etfHoldings.reduce((sum, etf) => sum + etf.allocation, 0);
    const normalizedHoldings = etfHoldings.map(etf => ({
      ...etf,
      normalizedAllocation: totalAllocation > 0 ? (etf.allocation / totalAllocation) * 100 : 0
    }));

    // Calculate weighted expense ratio
    const totalExpenseRatio = normalizedHoldings.reduce((sum, etf) => 
      sum + (etf.normalizedAllocation / 100) * etf.expenseRatio, 0
    );

    // Calculate weighted expected return
    const portfolioReturn = normalizedHoldings.reduce((sum, etf) => 
      sum + (etf.normalizedAllocation / 100) * etf.expectedReturn, 0
    );

    // Calculate annual costs
    const annualExpenseCost = portfolioValue * (totalExpenseRatio / 100);
    
    // Calculate rebalancing costs
    const rebalanceInfo = rebalanceFrequencies[rebalanceFrequency as keyof typeof rebalanceFrequencies];
    const rebalancingCost = portfolioValue * (rebalanceInfo.cost / 100) * rebalanceInfo.frequency * investmentHorizon;

    // Calculate total expense cost over investment horizon
    const totalExpenseCost = annualExpenseCost * investmentHorizon + rebalancingCost;

    // Calculate final value with and without expenses
    const grossFinalValue = portfolioValue * Math.pow(1 + portfolioReturn / 100, investmentHorizon);
    const netReturn = portfolioReturn - totalExpenseRatio;
    const finalValue = portfolioValue * Math.pow(1 + netReturn / 100, investmentHorizon);

    // Calculate cost impact
    const costImpact = grossFinalValue - finalValue;

    // Calculate allocation breakdown
    const allocationBreakdown = normalizedHoldings.map(etf => ({
      name: etf.name,
      allocation: etf.normalizedAllocation,
      value: portfolioValue * (etf.normalizedAllocation / 100),
      annualCost: portfolioValue * (etf.normalizedAllocation / 100) * (etf.expenseRatio / 100),
    }));

    setResults({
      totalExpenseRatio,
      annualExpenseCost,
      totalExpenseCost,
      portfolioReturn,
      finalValue,
      netReturn,
      costImpact,
      rebalancingCost,
      allocationBreakdown,
    });
  };

  useEffect(() => {
    calculateETF();
  }, [portfolioValue, investmentHorizon, rebalanceFrequency, etfHoldings]);

  const exportResults = () => {
    if (!results) return;
    
    const data = {
      portfolioDetails: {
        "Portfolio Value": `$${portfolioValue.toLocaleString()}`,
        "Investment Horizon": `${investmentHorizon} years`,
        "Rebalance Frequency": rebalanceFrequency,
        "Number of ETFs": etfHoldings.length,
      },
      costs: {
        "Weighted Expense Ratio": `${results.totalExpenseRatio.toFixed(3)}%`,
        "Annual Expense Cost": `$${results.annualExpenseCost.toFixed(2)}`,
        "Total Expense Cost": `$${results.totalExpenseCost.toFixed(2)}`,
        "Rebalancing Cost": `$${results.rebalancingCost.toFixed(2)}`,
      },
      returns: {
        "Expected Portfolio Return": `${results.portfolioReturn.toFixed(2)}%`,
        "Net Return (After Fees)": `${results.netReturn.toFixed(2)}%`,
        "Final Portfolio Value": `$${results.finalValue.toLocaleString()}`,
        "Cost Impact": `$${results.costImpact.toFixed(2)}`,
      },
      holdings: results.allocationBreakdown,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'etf-portfolio-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalAllocation = etfHoldings.reduce((sum, etf) => sum + etf.allocation, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-blue-500" />
          ETF Portfolio Calculator
          <Badge variant="secondary" className="ml-2">New</Badge>
        </CardTitle>
        <CardDescription>
          Analyze ETF portfolio costs, allocation, and long-term impact of expense ratios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="portfolio-value">Portfolio Value ($)</Label>
            <Input
              id="portfolio-value"
              type="number"
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(Number(e.target.value))}
              min="1000"
              step="1000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="investment-horizon">Investment Horizon (Years)</Label>
            <Input
              id="investment-horizon"
              type="number"
              value={investmentHorizon}
              onChange={(e) => setInvestmentHorizon(Number(e.target.value))}
              min="1"
              max="50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rebalance-frequency">Rebalance Frequency</Label>
            <Select value={rebalanceFrequency} onValueChange={setRebalanceFrequency}>
              <SelectTrigger id="rebalance-frequency" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="semiannually">Semi-Annually</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ETF Holdings */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">ETF Holdings</h4>
            <Button onClick={addETF} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add ETF
            </Button>
          </div>
          
          {/* Allocation Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Allocation</span>
              <span className={totalAllocation === 100 ? 'text-green-600' : 'text-amber-600'}>
                {totalAllocation.toFixed(1)}%
              </span>
            </div>
            <Progress value={Math.min(totalAllocation, 100)} className="h-2" />
          </div>

          <div className="space-y-3">
            {etfHoldings.map((etf, index) => (
              <div key={etf.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 p-3 border rounded-lg">
                <div className="space-y-1">
                  <Label className="text-xs">ETF Name</Label>
                  <Input
                    value={etf.name}
                    onChange={(e) => updateETF(etf.id, 'name', e.target.value)}
                    placeholder="ETF Name"
                    className="h-8"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Allocation (%)</Label>
                  <Input
                    type="number"
                    value={etf.allocation}
                    onChange={(e) => updateETF(etf.id, 'allocation', Number(e.target.value))}
                    min="0"
                    max="100"
                    step="0.1"
                    className="h-8"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Expense Ratio (%)</Label>
                  <Input
                    type="number"
                    value={etf.expenseRatio}
                    onChange={(e) => updateETF(etf.id, 'expenseRatio', Number(e.target.value))}
                    min="0"
                    max="5"
                    step="0.01"
                    className="h-8"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Expected Return (%)</Label>
                  <Input
                    type="number"
                    value={etf.expectedReturn}
                    onChange={(e) => updateETF(etf.id, 'expectedReturn', Number(e.target.value))}
                    min="0"
                    max="30"
                    step="0.1"
                    className="h-8"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Value</Label>
                  <div className="h-8 flex items-center text-sm font-medium">
                    ${((portfolioValue * etf.allocation) / totalAllocation || 0).toLocaleString()}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Action</Label>
                  <Button
                    onClick={() => removeETF(etf.id)}
                    size="sm"
                    variant="outline"
                    className="h-8"
                    disabled={etfHoldings.length <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={calculateETF} className="w-full">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate ETF Portfolio
        </Button>

        {results && (
          <div className="space-y-6">
            <Separator />
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Weighted Expense Ratio</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {results.totalExpenseRatio.toFixed(3)}%
                </div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Annual Cost</div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  ${results.annualExpenseCost.toFixed(0)}
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Expected Return</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {results.portfolioReturn.toFixed(2)}%
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Final Value</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ${results.finalValue.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Cost Impact Analysis */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Cost Impact Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Total Expense Cost</div>
                  <div className="font-semibold text-lg">${results.totalExpenseCost.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Rebalancing Cost</div>
                  <div className="font-semibold text-lg">${results.rebalancingCost.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Net Return</div>
                  <div className="font-semibold text-lg">{results.netReturn.toFixed(2)}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Cost Impact</div>
                  <div className="font-semibold text-lg text-red-600">${results.costImpact.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Allocation Breakdown */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Portfolio Allocation</h4>
              <div className="space-y-3">
                {results.allocationBreakdown.map((holding, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-medium">{holding.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ${holding.value.toLocaleString()} • Annual cost: ${holding.annualCost.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{holding.allocation.toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={exportResults} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Portfolio Analysis
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: This calculator provides estimates based on historical data and assumptions. 
          Actual returns and costs may vary. Consider consulting with a financial advisor for personalized advice.
        </p>
      </CardFooter>
    </Card>
  );
}
