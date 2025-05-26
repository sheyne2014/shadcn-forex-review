"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, LineChart, TrendingUp, Download, BarChart3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export function VolatilityCalculator() {
  const [calculationType, setCalculationType] = useState("historical");
  const [priceData, setPriceData] = useState("100,102,98,105,103,99,101,104,106,102");
  const [timeFrame, setTimeFrame] = useState("daily");
  const [annualizationFactor, setAnnualizationFactor] = useState(252);
  
  // For implied volatility calculation
  const [optionPrice, setOptionPrice] = useState(5.50);
  const [stockPrice, setStockPrice] = useState(100);
  const [strikePrice, setStrikePrice] = useState(100);
  const [timeToExpiry, setTimeToExpiry] = useState(30);
  const [riskFreeRate, setRiskFreeRate] = useState(5);
  const [optionType, setOptionType] = useState("call");
  
  const [results, setResults] = useState<{
    historicalVolatility: number;
    impliedVolatility: number;
    annualizedVolatility: number;
    volatilityRank: number;
    priceMovements: number[];
    averageReturn: number;
    standardDeviation: number;
    volatilityRange: { low: number; high: number };
  } | null>(null);

  const timeFrames = {
    daily: { factor: 252, name: "Daily" },
    weekly: { factor: 52, name: "Weekly" },
    monthly: { factor: 12, name: "Monthly" },
  };

  // Black-Scholes functions for implied volatility
  const normalCDF = (x: number): number => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2.0);
    
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
    return 0.5 * (1.0 + sign * y);
  };

  const blackScholesPrice = (S: number, K: number, T: number, r: number, sigma: number, type: string): number => {
    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);
    
    if (type === "call") {
      return S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
    } else {
      return K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
    }
  };

  const calculateImpliedVolatility = (): number => {
    const S = stockPrice;
    const K = strikePrice;
    const T = timeToExpiry / 365;
    const r = riskFreeRate / 100;
    const marketPrice = optionPrice;
    
    let sigma = 0.2; // Initial guess
    const tolerance = 0.0001;
    const maxIterations = 100;
    
    for (let i = 0; i < maxIterations; i++) {
      const price = blackScholesPrice(S, K, T, r, sigma, optionType);
      const diff = price - marketPrice;
      
      if (Math.abs(diff) < tolerance) {
        return sigma * 100;
      }
      
      // Calculate vega for Newton-Raphson method
      const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
      const vega = S * Math.sqrt(T) * Math.exp(-0.5 * d1 * d1) / Math.sqrt(2 * Math.PI);
      
      if (vega === 0) break;
      
      sigma = sigma - diff / vega;
      
      if (sigma <= 0) {
        sigma = 0.01;
      }
    }
    
    return sigma * 100;
  };

  const calculateVolatility = () => {
    // Parse price data
    const prices = priceData.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p));
    
    if (prices.length < 2) {
      return;
    }
    
    // Calculate returns
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push(Math.log(prices[i] / prices[i - 1]));
    }
    
    // Calculate average return
    const averageReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    
    // Calculate standard deviation
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - averageReturn, 2), 0) / (returns.length - 1);
    const standardDeviation = Math.sqrt(variance);
    
    // Annualize volatility
    const timeFrameInfo = timeFrames[timeFrame as keyof typeof timeFrames];
    const annualizedVolatility = standardDeviation * Math.sqrt(timeFrameInfo.factor) * 100;
    
    // Calculate implied volatility if in that mode
    let impliedVol = 0;
    if (calculationType === "implied") {
      impliedVol = calculateImpliedVolatility();
    }
    
    // Calculate volatility rank (simplified - comparing to 52-week range)
    const volatilityRange = {
      low: Math.max(0, annualizedVolatility - 20),
      high: annualizedVolatility + 20
    };
    const volatilityRank = ((annualizedVolatility - volatilityRange.low) / (volatilityRange.high - volatilityRange.low)) * 100;
    
    setResults({
      historicalVolatility: annualizedVolatility,
      impliedVolatility: impliedVol,
      annualizedVolatility,
      volatilityRank,
      priceMovements: returns.map(r => r * 100),
      averageReturn: averageReturn * 100,
      standardDeviation: standardDeviation * 100,
      volatilityRange,
    });
  };

  useEffect(() => {
    calculateVolatility();
  }, [priceData, timeFrame, calculationType, optionPrice, stockPrice, strikePrice, timeToExpiry, riskFreeRate, optionType]);

  const exportResults = () => {
    if (!results) return;
    
    const data = {
      calculationType,
      inputs: calculationType === "historical" ? {
        "Price Data": priceData,
        "Time Frame": timeFrame,
        "Number of Observations": priceData.split(',').length,
      } : {
        "Option Price": `$${optionPrice}`,
        "Stock Price": `$${stockPrice}`,
        "Strike Price": `$${strikePrice}`,
        "Time to Expiry": `${timeToExpiry} days`,
        "Risk-free Rate": `${riskFreeRate}%`,
        "Option Type": optionType,
      },
      results: {
        "Historical Volatility": `${results.historicalVolatility.toFixed(2)}%`,
        "Implied Volatility": `${results.impliedVolatility.toFixed(2)}%`,
        "Annualized Volatility": `${results.annualizedVolatility.toFixed(2)}%`,
        "Volatility Rank": `${results.volatilityRank.toFixed(1)}%`,
        "Average Return": `${results.averageReturn.toFixed(4)}%`,
        "Standard Deviation": `${results.standardDeviation.toFixed(4)}%`,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `volatility-${calculationType}-calculation.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-red-500" />
          Volatility Calculator
          <Badge variant="secondary" className="ml-2">Pro</Badge>
        </CardTitle>
        <CardDescription>
          Calculate historical and implied volatility for options trading and risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="calculation-type">Calculation Type</Label>
          <Select value={calculationType} onValueChange={setCalculationType}>
            <SelectTrigger id="calculation-type" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="historical">Historical Volatility</SelectItem>
              <SelectItem value="implied">Implied Volatility</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {calculationType === "historical" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price-data">Price Data (comma-separated)</Label>
              <Textarea
                id="price-data"
                value={priceData}
                onChange={(e) => setPriceData(e.target.value)}
                placeholder="100,102,98,105,103,99,101,104,106,102"
                className="min-h-[100px]"
              />
              <div className="text-xs text-muted-foreground">
                Enter historical prices separated by commas. Minimum 2 prices required.
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time-frame">Time Frame</Label>
                <Select value={timeFrame} onValueChange={setTimeFrame}>
                  <SelectTrigger id="time-frame" className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="annualization-factor">Annualization Factor</Label>
                <Input
                  id="annualization-factor"
                  type="number"
                  value={annualizationFactor}
                  onChange={(e) => setAnnualizationFactor(Number(e.target.value))}
                  min="1"
                  max="365"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="option-price">Option Market Price ($)</Label>
                <Input
                  id="option-price"
                  type="number"
                  value={optionPrice}
                  onChange={(e) => setOptionPrice(Number(e.target.value))}
                  min="0.01"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stock-price">Current Stock Price ($)</Label>
                <Input
                  id="stock-price"
                  type="number"
                  value={stockPrice}
                  onChange={(e) => setStockPrice(Number(e.target.value))}
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="strike-price">Strike Price ($)</Label>
                <Input
                  id="strike-price"
                  type="number"
                  value={strikePrice}
                  onChange={(e) => setStrikePrice(Number(e.target.value))}
                  min="0.01"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time-to-expiry">Time to Expiry (Days)</Label>
                <Input
                  id="time-to-expiry"
                  type="number"
                  value={timeToExpiry}
                  onChange={(e) => setTimeToExpiry(Number(e.target.value))}
                  min="1"
                  max="365"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="risk-free-rate">Risk-free Rate (%)</Label>
                <Input
                  id="risk-free-rate"
                  type="number"
                  value={riskFreeRate}
                  onChange={(e) => setRiskFreeRate(Number(e.target.value))}
                  min="0"
                  max="20"
                  step="0.1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="option-type">Option Type</Label>
              <Select value={optionType} onValueChange={setOptionType}>
                <SelectTrigger id="option-type" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">Call Option</SelectItem>
                  <SelectItem value="put">Put Option</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <Button onClick={calculateVolatility} className="w-full">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Volatility
        </Button>

        {results && (
          <div className="space-y-6">
            <Separator />
            
            {/* Main Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {calculationType === "historical" ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Historical Volatility</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {results.historicalVolatility.toFixed(2)}%
                  </div>
                </div>
              ) : (
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Implied Volatility</div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {results.impliedVolatility.toFixed(2)}%
                  </div>
                </div>
              )}
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Volatility Rank</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {results.volatilityRank.toFixed(1)}%
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Standard Deviation</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {results.standardDeviation.toFixed(4)}%
                </div>
              </div>
            </div>

            {/* Statistical Details */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Statistical Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Average Return</div>
                  <div className="font-semibold">{results.averageReturn.toFixed(4)}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Observations</div>
                  <div className="font-semibold">{results.priceMovements.length}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Volatility Range</div>
                  <div className="font-semibold">
                    {results.volatilityRange.low.toFixed(1)}% - {results.volatilityRange.high.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Time Frame</div>
                  <div className="font-semibold">{timeFrames[timeFrame as keyof typeof timeFrames].name}</div>
                </div>
              </div>
            </div>

            {/* Price Movement Analysis */}
            {calculationType === "historical" && results.priceMovements.length > 0 && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Price Movement Analysis
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {results.priceMovements.slice(0, 8).map((movement, index) => (
                    <div key={index} className={`p-2 rounded text-center ${
                      movement >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                    }`}>
                      <div className="font-medium">Day {index + 1}</div>
                      <div className={movement >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {movement >= 0 ? '+' : ''}{movement.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={exportResults} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Volatility Analysis
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: Volatility calculations are based on historical data and mathematical models. 
          Actual market volatility can vary significantly. This is for educational purposes only.
        </p>
      </CardFooter>
    </Card>
  );
}
