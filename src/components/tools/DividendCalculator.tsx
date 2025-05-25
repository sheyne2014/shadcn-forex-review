"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign, TrendingUp, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function DividendCalculator() {
  const [stockPrice, setStockPrice] = useState(100);
  const [dividendPerShare, setDividendPerShare] = useState(2.5);
  const [sharesOwned, setSharesOwned] = useState(100);
  const [dividendFrequency, setDividendFrequency] = useState("quarterly");
  const [reinvestDividends, setReinvestDividends] = useState("yes");
  const [yearsToProject, setYearsToProject] = useState(10);
  const [dividendGrowthRate, setDividendGrowthRate] = useState(5);
  
  const [results, setResults] = useState<{
    currentYield: number;
    annualIncome: number;
    monthlyIncome: number;
    totalInvestment: number;
    projectedValue: number;
    projectedIncome: number;
    totalReturn: number;
  } | null>(null);

  const frequencyMultiplier = {
    monthly: 12,
    quarterly: 4,
    semiannual: 2,
    annual: 1,
  };

  const calculateDividends = () => {
    const frequency = frequencyMultiplier[dividendFrequency as keyof typeof frequencyMultiplier];
    const annualDividend = dividendPerShare * frequency;
    const currentYield = (annualDividend / stockPrice) * 100;
    const annualIncome = annualDividend * sharesOwned;
    const monthlyIncome = annualIncome / 12;
    const totalInvestment = stockPrice * sharesOwned;

    // Project future value with dividend growth and reinvestment
    let projectedShares = sharesOwned;
    let projectedDividendPerShare = dividendPerShare;
    let projectedValue = totalInvestment;
    
    if (reinvestDividends === "yes") {
      // Compound calculation with reinvestment
      for (let year = 1; year <= yearsToProject; year++) {
        projectedDividendPerShare *= (1 + dividendGrowthRate / 100);
        const yearlyDividend = projectedDividendPerShare * frequency * projectedShares;
        const newShares = yearlyDividend / (stockPrice * Math.pow(1.07, year)); // Assume 7% stock price growth
        projectedShares += newShares;
      }
      projectedValue = projectedShares * stockPrice * Math.pow(1.07, yearsToProject);
    } else {
      // Without reinvestment
      projectedDividendPerShare *= Math.pow(1 + dividendGrowthRate / 100, yearsToProject);
      projectedValue = totalInvestment * Math.pow(1.07, yearsToProject);
    }

    const projectedIncome = projectedDividendPerShare * frequency * projectedShares;
    const totalReturn = ((projectedValue - totalInvestment) / totalInvestment) * 100;

    setResults({
      currentYield,
      annualIncome,
      monthlyIncome,
      totalInvestment,
      projectedValue,
      projectedIncome,
      totalReturn,
    });
  };

  useEffect(() => {
    calculateDividends();
  }, [stockPrice, dividendPerShare, sharesOwned, dividendFrequency, reinvestDividends, yearsToProject, dividendGrowthRate]);

  const exportResults = () => {
    if (!results) return;
    
    const data = {
      "Stock Price": `$${stockPrice}`,
      "Dividend Per Share": `$${dividendPerShare}`,
      "Shares Owned": sharesOwned,
      "Dividend Frequency": dividendFrequency,
      "Current Yield": `${results.currentYield.toFixed(2)}%`,
      "Annual Income": `$${results.annualIncome.toFixed(2)}`,
      "Monthly Income": `$${results.monthlyIncome.toFixed(2)}`,
      "Total Investment": `$${results.totalInvestment.toFixed(2)}`,
      "Projected Value (10 years)": `$${results.projectedValue.toFixed(2)}`,
      "Projected Annual Income": `$${results.projectedIncome.toFixed(2)}`,
      "Total Return": `${results.totalReturn.toFixed(2)}%`,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dividend-calculation.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          Dividend Yield Calculator
          <Badge variant="secondary" className="ml-2">New</Badge>
        </CardTitle>
        <CardDescription>
          Calculate dividend yields, income projections, and total returns with reinvestment options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stock-price">Stock Price ($)</Label>
            <Input
              id="stock-price"
              type="number"
              value={stockPrice}
              onChange={(e) => setStockPrice(Number(e.target.value))}
              min="0.01"
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dividend-per-share">Dividend Per Share ($)</Label>
            <Input
              id="dividend-per-share"
              type="number"
              value={dividendPerShare}
              onChange={(e) => setDividendPerShare(Number(e.target.value))}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="shares-owned">Shares Owned</Label>
            <Input
              id="shares-owned"
              type="number"
              value={sharesOwned}
              onChange={(e) => setSharesOwned(Number(e.target.value))}
              min="1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dividend-frequency">Dividend Frequency</Label>
            <Select value={dividendFrequency} onValueChange={setDividendFrequency}>
              <SelectTrigger id="dividend-frequency" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="semiannual">Semi-Annual</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reinvest-dividends">Reinvest Dividends</Label>
            <Select value={reinvestDividends} onValueChange={setReinvestDividends}>
              <SelectTrigger id="reinvest-dividends" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="years-to-project">Years to Project</Label>
            <Input
              id="years-to-project"
              type="number"
              value={yearsToProject}
              onChange={(e) => setYearsToProject(Number(e.target.value))}
              min="1"
              max="50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dividend-growth-rate">Dividend Growth Rate (%)</Label>
            <Input
              id="dividend-growth-rate"
              type="number"
              value={dividendGrowthRate}
              onChange={(e) => setDividendGrowthRate(Number(e.target.value))}
              min="0"
              max="20"
              step="0.1"
            />
          </div>
        </div>

        <Button onClick={calculateDividends} className="w-full">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Dividend Returns
        </Button>

        {results && (
          <div className="space-y-4">
            <Separator />
            
            {/* Current Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Current Yield</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {results.currentYield.toFixed(2)}%
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Annual Income</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${results.annualIncome.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Monthly Income</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ${results.monthlyIncome.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Projected Results */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                {yearsToProject}-Year Projection
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Projected Portfolio Value</div>
                  <div className="font-semibold text-lg">${results.projectedValue.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Projected Annual Income</div>
                  <div className="font-semibold text-lg">${results.projectedIncome.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Total Return</div>
                  <div className={`font-semibold text-lg ${results.totalReturn >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {results.totalReturn.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={exportResults} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Results
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: Projections assume historical dividend growth rates and stock price appreciation. 
          Actual results may vary significantly. This is for educational purposes only.
        </p>
      </CardFooter>
    </Card>
  );
}
