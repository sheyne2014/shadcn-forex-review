"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, PiggyBank, Download } from "lucide-react";
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

export function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualInterestRate, setAnnualInterestRate] = useState(7);
  const [compoundingFrequency, setCompoundingFrequency] = useState("monthly");
  const [timeHorizon, setTimeHorizon] = useState(20);
  const [contributionIncrease, setContributionIncrease] = useState(3);
  
  const [results, setResults] = useState<{
    finalAmount: number;
    totalContributions: number;
    totalInterest: number;
    monthlyBreakdown: Array<{
      year: number;
      balance: number;
      contributions: number;
      interest: number;
    }>;
  } | null>(null);

  const compoundingFrequencies = {
    daily: 365,
    weekly: 52,
    monthly: 12,
    quarterly: 4,
    semiannually: 2,
    annually: 1,
  };

  const calculateCompoundInterest = () => {
    const n = compoundingFrequencies[compoundingFrequency as keyof typeof compoundingFrequencies];
    const r = annualInterestRate / 100;
    const t = timeHorizon;
    
    let balance = initialAmount;
    let totalContributions = initialAmount;
    let currentMonthlyContribution = monthlyContribution;
    const monthlyBreakdown = [];
    
    for (let year = 1; year <= t; year++) {
      const startBalance = balance;
      const startContributions = totalContributions;
      
      // Calculate compound interest for the year with monthly contributions
      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution
        balance += currentMonthlyContribution;
        totalContributions += currentMonthlyContribution;
        
        // Apply compound interest
        balance *= Math.pow(1 + r / n, n / 12);
      }
      
      // Increase monthly contribution by inflation/growth rate
      currentMonthlyContribution *= (1 + contributionIncrease / 100);
      
      monthlyBreakdown.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions - startContributions),
        interest: Math.round(balance - totalContributions),
      });
    }
    
    const finalAmount = balance;
    const totalInterest = finalAmount - totalContributions;
    
    setResults({
      finalAmount,
      totalContributions,
      totalInterest,
      monthlyBreakdown,
    });
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [initialAmount, monthlyContribution, annualInterestRate, compoundingFrequency, timeHorizon, contributionIncrease]);

  const exportResults = () => {
    if (!results) return;
    
    const data = {
      summary: {
        "Initial Amount": `$${initialAmount.toLocaleString()}`,
        "Monthly Contribution": `$${monthlyContribution.toLocaleString()}`,
        "Annual Interest Rate": `${annualInterestRate}%`,
        "Time Horizon": `${timeHorizon} years`,
        "Final Amount": `$${results.finalAmount.toLocaleString()}`,
        "Total Contributions": `$${results.totalContributions.toLocaleString()}`,
        "Total Interest Earned": `$${results.totalInterest.toLocaleString()}`,
      },
      yearlyBreakdown: results.monthlyBreakdown,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compound-interest-calculation.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-blue-500" />
          Compound Interest Calculator
          <Badge variant="secondary" className="ml-2">New</Badge>
        </CardTitle>
        <CardDescription>
          Calculate long-term investment growth with compound interest and regular contributions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initial-amount">Initial Investment ($)</Label>
            <Input
              id="initial-amount"
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              min="0"
              step="100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monthly-contribution">Monthly Contribution ($)</Label>
            <Input
              id="monthly-contribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              min="0"
              step="50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="annual-rate">Annual Interest Rate (%)</Label>
            <Input
              id="annual-rate"
              type="number"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
              min="0"
              max="30"
              step="0.1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="compounding-frequency">Compounding Frequency</Label>
            <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
              <SelectTrigger id="compounding-frequency" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="semiannually">Semi-Annually</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
            <Input
              id="time-horizon"
              type="number"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(Number(e.target.value))}
              min="1"
              max="50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contribution-increase">Annual Contribution Increase (%)</Label>
            <Input
              id="contribution-increase"
              type="number"
              value={contributionIncrease}
              onChange={(e) => setContributionIncrease(Number(e.target.value))}
              min="0"
              max="10"
              step="0.1"
            />
          </div>
        </div>

        <Button onClick={calculateCompoundInterest} className="w-full">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Compound Growth
        </Button>

        {results && (
          <div className="space-y-6">
            <Separator />
            
            {/* Summary Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Final Amount</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${results.finalAmount.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Total Contributions</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${results.totalContributions.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Interest Earned</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ${results.totalInterest.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Growth Visualization */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Growth Breakdown
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Contributions vs Interest</span>
                  <span>{((results.totalInterest / results.finalAmount) * 100).toFixed(1)}% from interest</span>
                </div>
                <Progress 
                  value={(results.totalContributions / results.finalAmount) * 100} 
                  className="h-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Contributions: ${results.totalContributions.toLocaleString()}</span>
                  <span>Interest: ${results.totalInterest.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Yearly Breakdown */}
            <div className="bg-muted/30 p-4 rounded-lg max-h-60 overflow-y-auto">
              <h4 className="font-semibold mb-3">Yearly Breakdown</h4>
              <div className="space-y-2">
                {results.monthlyBreakdown.slice(-5).map((year) => (
                  <div key={year.year} className="flex justify-between items-center text-sm border-b pb-2">
                    <span className="font-medium">Year {year.year}</span>
                    <div className="text-right">
                      <div className="font-semibold">${year.balance.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        +${year.interest.toLocaleString()} interest
                      </div>
                    </div>
                  </div>
                ))}
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
          Note: This calculator assumes consistent returns and contributions. Actual investment returns 
          may vary significantly due to market volatility. This is for educational purposes only.
        </p>
      </CardFooter>
    </Card>
  );
}
