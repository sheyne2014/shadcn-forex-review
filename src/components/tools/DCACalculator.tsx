"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Bitcoin, TrendingUp, Download, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function DCACalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(100);
  const [frequency, setFrequency] = useState("weekly");
  const [cryptocurrency, setCryptocurrency] = useState("bitcoin");
  const [startingPrice, setStartingPrice] = useState(45000);
  const [currentPrice, setCurrentPrice] = useState(50000);
  const [timeHorizon, setTimeHorizon] = useState(12); // months
  const [priceVolatility, setPriceVolatility] = useState(15); // percentage
  
  const [results, setResults] = useState<{
    totalInvested: number;
    totalCoins: number;
    currentValue: number;
    averageCost: number;
    totalReturn: number;
    returnPercentage: number;
    numberOfPurchases: number;
    monthlyBreakdown: Array<{
      month: number;
      invested: number;
      coins: number;
      value: number;
      avgCost: number;
    }>;
  } | null>(null);

  const frequencies = {
    daily: { multiplier: 30, label: "Daily" },
    weekly: { multiplier: 4.33, label: "Weekly" },
    biweekly: { multiplier: 2.17, label: "Bi-weekly" },
    monthly: { multiplier: 1, label: "Monthly" },
  };

  const cryptocurrencies = {
    bitcoin: { symbol: "BTC", name: "Bitcoin" },
    ethereum: { symbol: "ETH", name: "Ethereum" },
    cardano: { symbol: "ADA", name: "Cardano" },
    solana: { symbol: "SOL", name: "Solana" },
    polygon: { symbol: "MATIC", name: "Polygon" },
    chainlink: { symbol: "LINK", name: "Chainlink" },
  };

  const calculateDCA = () => {
    const freq = frequencies[frequency as keyof typeof frequencies];
    const purchasesPerMonth = freq.multiplier;
    const totalPurchases = Math.floor(timeHorizon * purchasesPerMonth);
    const investmentPerPurchase = investmentAmount / purchasesPerMonth;
    
    let totalInvested = 0;
    let totalCoins = 0;
    const monthlyBreakdown = [];
    
    // Simulate price movements with volatility
    for (let month = 1; month <= timeHorizon; month++) {
      let monthlyInvested = 0;
      let monthlyCoins = 0;
      
      for (let purchase = 1; purchase <= purchasesPerMonth; purchase++) {
        // Simulate price with random volatility
        const priceVariation = (Math.random() - 0.5) * 2 * (priceVolatility / 100);
        const progressRatio = ((month - 1) * purchasesPerMonth + purchase) / totalPurchases;
        const basePrice = startingPrice + (currentPrice - startingPrice) * progressRatio;
        const simulatedPrice = basePrice * (1 + priceVariation);
        
        const coinsAcquired = investmentPerPurchase / simulatedPrice;
        
        totalInvested += investmentPerPurchase;
        totalCoins += coinsAcquired;
        monthlyInvested += investmentPerPurchase;
        monthlyCoins += coinsAcquired;
      }
      
      const averageCost = totalInvested / totalCoins;
      const currentValue = totalCoins * currentPrice;
      
      monthlyBreakdown.push({
        month,
        invested: Math.round(monthlyInvested),
        coins: parseFloat(monthlyCoins.toFixed(8)),
        value: Math.round(currentValue),
        avgCost: Math.round(averageCost),
      });
    }
    
    const finalValue = totalCoins * currentPrice;
    const totalReturn = finalValue - totalInvested;
    const returnPercentage = (totalReturn / totalInvested) * 100;
    const averageCost = totalInvested / totalCoins;
    
    setResults({
      totalInvested: Math.round(totalInvested),
      totalCoins: parseFloat(totalCoins.toFixed(8)),
      currentValue: Math.round(finalValue),
      averageCost: Math.round(averageCost),
      totalReturn: Math.round(totalReturn),
      returnPercentage: parseFloat(returnPercentage.toFixed(2)),
      numberOfPurchases: totalPurchases,
      monthlyBreakdown,
    });
  };

  useEffect(() => {
    calculateDCA();
  }, [investmentAmount, frequency, cryptocurrency, startingPrice, currentPrice, timeHorizon, priceVolatility]);

  const exportResults = () => {
    if (!results) return;
    
    const crypto = cryptocurrencies[cryptocurrency as keyof typeof cryptocurrencies];
    const data = {
      strategy: {
        "Investment Amount": `$${investmentAmount}/${frequency}`,
        "Cryptocurrency": `${crypto.name} (${crypto.symbol})`,
        "Time Horizon": `${timeHorizon} months`,
        "Starting Price": `$${startingPrice}`,
        "Current Price": `$${currentPrice}`,
        "Total Purchases": results.numberOfPurchases,
      },
      results: {
        "Total Invested": `$${results.totalInvested.toLocaleString()}`,
        "Total Coins": `${results.totalCoins} ${crypto.symbol}`,
        "Current Value": `$${results.currentValue.toLocaleString()}`,
        "Average Cost": `$${results.averageCost}`,
        "Total Return": `$${results.totalReturn.toLocaleString()}`,
        "Return Percentage": `${results.returnPercentage}%`,
      },
      monthlyBreakdown: results.monthlyBreakdown,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dca-${cryptocurrency}-calculation.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedCrypto = cryptocurrencies[cryptocurrency as keyof typeof cryptocurrencies];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bitcoin className="h-5 w-5 text-orange-500" />
          DCA Calculator
          <Badge variant="secondary" className="ml-2">New</Badge>
        </CardTitle>
        <CardDescription>
          Calculate Dollar-Cost Averaging strategy returns for cryptocurrency investments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="investment-amount">Investment Amount ($)</Label>
            <Input
              id="investment-amount"
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              min="1"
              step="10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="frequency">Investment Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger id="frequency" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
            <Select value={cryptocurrency} onValueChange={setCryptocurrency}>
              <SelectTrigger id="cryptocurrency" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(cryptocurrencies).map(([key, crypto]) => (
                  <SelectItem key={key} value={key}>
                    {crypto.name} ({crypto.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time-horizon">Time Horizon (Months)</Label>
            <Input
              id="time-horizon"
              type="number"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(Number(e.target.value))}
              min="1"
              max="60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="starting-price">Starting Price ($)</Label>
            <Input
              id="starting-price"
              type="number"
              value={startingPrice}
              onChange={(e) => setStartingPrice(Number(e.target.value))}
              min="0.01"
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="current-price">Current Price ($)</Label>
            <Input
              id="current-price"
              type="number"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(Number(e.target.value))}
              min="0.01"
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price-volatility">Price Volatility (%)</Label>
            <Input
              id="price-volatility"
              type="number"
              value={priceVolatility}
              onChange={(e) => setPriceVolatility(Number(e.target.value))}
              min="1"
              max="50"
              step="1"
            />
          </div>
        </div>

        <Button onClick={calculateDCA} className="w-full">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate DCA Strategy
        </Button>

        {results && (
          <div className="space-y-6">
            <Separator />
            
            {/* Summary Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Total Invested</div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  ${results.totalInvested.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Total {selectedCrypto.symbol}</div>
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {results.totalCoins}
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Current Value</div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  ${results.currentValue.toLocaleString()}
                </div>
              </div>
              
              <div className={`p-4 rounded-lg text-center ${
                results.returnPercentage >= 0 
                  ? 'bg-green-50 dark:bg-green-900/20' 
                  : 'bg-red-50 dark:bg-red-900/20'
              }`}>
                <div className="text-sm text-muted-foreground">Total Return</div>
                <div className={`text-xl font-bold ${
                  results.returnPercentage >= 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {results.returnPercentage >= 0 ? '+' : ''}{results.returnPercentage}%
                </div>
              </div>
            </div>

            {/* Strategy Details */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Strategy Details
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Average Cost</div>
                  <div className="font-semibold">${results.averageCost}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Total Purchases</div>
                  <div className="font-semibold">{results.numberOfPurchases}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Investment per {frequency}</div>
                  <div className="font-semibold">${investmentAmount}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Duration</div>
                  <div className="font-semibold">{timeHorizon} months</div>
                </div>
              </div>
            </div>

            {/* Monthly Progress */}
            <div className="bg-muted/30 p-4 rounded-lg max-h-60 overflow-y-auto">
              <h4 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Monthly Progress
              </h4>
              <div className="space-y-2">
                {results.monthlyBreakdown.slice(-6).map((month) => (
                  <div key={month.month} className="flex justify-between items-center text-sm border-b pb-2">
                    <span className="font-medium">Month {month.month}</span>
                    <div className="text-right">
                      <div className="font-semibold">${month.value.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        +{month.coins} {selectedCrypto.symbol}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={exportResults} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export DCA Results
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: This calculator uses simulated price movements and historical volatility. 
          Actual cryptocurrency prices are highly volatile and unpredictable. This is for educational purposes only.
        </p>
      </CardFooter>
    </Card>
  );
}
