"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Activity, TrendingUp, Download, Target } from "lucide-react";
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

export function OptionsGreeksCalculator() {
  const [stockPrice, setStockPrice] = useState(100);
  const [strikePrice, setStrikePrice] = useState(100);
  const [timeToExpiry, setTimeToExpiry] = useState(30); // days
  const [volatility, setVolatility] = useState(25); // percentage
  const [riskFreeRate, setRiskFreeRate] = useState(5); // percentage
  const [optionType, setOptionType] = useState("call");
  const [dividendYield, setDividendYield] = useState(0); // percentage
  
  const [results, setResults] = useState<{
    optionPrice: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
    intrinsicValue: number;
    timeValue: number;
    moneyness: string;
    breakeven: number;
  } | null>(null);

  // Black-Scholes calculation functions
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

  const normalPDF = (x: number): number => {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  };

  const calculateBlackScholes = () => {
    const S = stockPrice; // Current stock price
    const K = strikePrice; // Strike price
    const T = timeToExpiry / 365; // Time to expiry in years
    const r = riskFreeRate / 100; // Risk-free rate
    const sigma = volatility / 100; // Volatility
    const q = dividendYield / 100; // Dividend yield
    
    // Calculate d1 and d2
    const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);
    
    // Calculate option price
    let optionPrice: number;
    let delta: number;
    
    if (optionType === "call") {
      optionPrice = S * Math.exp(-q * T) * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
      delta = Math.exp(-q * T) * normalCDF(d1);
    } else {
      optionPrice = K * Math.exp(-r * T) * normalCDF(-d2) - S * Math.exp(-q * T) * normalCDF(-d1);
      delta = Math.exp(-q * T) * (normalCDF(d1) - 1);
    }
    
    // Calculate Greeks
    const gamma = Math.exp(-q * T) * normalPDF(d1) / (S * sigma * Math.sqrt(T));
    const theta = optionType === "call" 
      ? (-S * Math.exp(-q * T) * normalPDF(d1) * sigma / (2 * Math.sqrt(T)) 
         - r * K * Math.exp(-r * T) * normalCDF(d2) 
         + q * S * Math.exp(-q * T) * normalCDF(d1)) / 365
      : (-S * Math.exp(-q * T) * normalPDF(d1) * sigma / (2 * Math.sqrt(T)) 
         + r * K * Math.exp(-r * T) * normalCDF(-d2) 
         - q * S * Math.exp(-q * T) * normalCDF(-d1)) / 365;
    
    const vega = S * Math.exp(-q * T) * normalPDF(d1) * Math.sqrt(T) / 100;
    
    const rho = optionType === "call"
      ? K * T * Math.exp(-r * T) * normalCDF(d2) / 100
      : -K * T * Math.exp(-r * T) * normalCDF(-d2) / 100;
    
    // Calculate intrinsic and time value
    const intrinsicValue = optionType === "call" 
      ? Math.max(S - K, 0) 
      : Math.max(K - S, 0);
    const timeValue = optionPrice - intrinsicValue;
    
    // Determine moneyness
    let moneyness: string;
    if (optionType === "call") {
      if (S > K) moneyness = "In-the-Money";
      else if (S < K) moneyness = "Out-of-the-Money";
      else moneyness = "At-the-Money";
    } else {
      if (S < K) moneyness = "In-the-Money";
      else if (S > K) moneyness = "Out-of-the-Money";
      else moneyness = "At-the-Money";
    }
    
    // Calculate breakeven
    const breakeven = optionType === "call" ? K + optionPrice : K - optionPrice;
    
    setResults({
      optionPrice,
      delta,
      gamma,
      theta,
      vega,
      rho,
      intrinsicValue,
      timeValue,
      moneyness,
      breakeven,
    });
  };

  useEffect(() => {
    calculateBlackScholes();
  }, [stockPrice, strikePrice, timeToExpiry, volatility, riskFreeRate, optionType, dividendYield]);

  const exportResults = () => {
    if (!results) return;
    
    const data = {
      inputs: {
        "Stock Price": `$${stockPrice}`,
        "Strike Price": `$${strikePrice}`,
        "Time to Expiry": `${timeToExpiry} days`,
        "Volatility": `${volatility}%`,
        "Risk-free Rate": `${riskFreeRate}%`,
        "Option Type": optionType,
        "Dividend Yield": `${dividendYield}%`,
      },
      results: {
        "Option Price": `$${results.optionPrice.toFixed(2)}`,
        "Delta": results.delta.toFixed(4),
        "Gamma": results.gamma.toFixed(4),
        "Theta": `$${results.theta.toFixed(2)}`,
        "Vega": `$${results.vega.toFixed(2)}`,
        "Rho": `$${results.rho.toFixed(2)}`,
        "Intrinsic Value": `$${results.intrinsicValue.toFixed(2)}`,
        "Time Value": `$${results.timeValue.toFixed(2)}`,
        "Moneyness": results.moneyness,
        "Breakeven": `$${results.breakeven.toFixed(2)}`,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `options-greeks-${optionType}-calculation.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-500" />
          Options Greeks Calculator
          <Badge variant="secondary" className="ml-2">Pro</Badge>
        </CardTitle>
        <CardDescription>
          Calculate option prices and Greeks using the Black-Scholes model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <Label htmlFor="volatility">Implied Volatility (%)</Label>
            <Input
              id="volatility"
              type="number"
              value={volatility}
              onChange={(e) => setVolatility(Number(e.target.value))}
              min="1"
              max="200"
              step="0.1"
            />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          
          <div className="space-y-2">
            <Label htmlFor="dividend-yield">Dividend Yield (%)</Label>
            <Input
              id="dividend-yield"
              type="number"
              value={dividendYield}
              onChange={(e) => setDividendYield(Number(e.target.value))}
              min="0"
              max="10"
              step="0.1"
            />
          </div>
        </div>

        <Button onClick={calculateBlackScholes} className="w-full">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Options Greeks
        </Button>

        {results && (
          <div className="space-y-6">
            <Separator />
            
            {/* Option Price and Moneyness */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Option Price</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${results.optionPrice.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Intrinsic Value</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${results.intrinsicValue.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Time Value</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ${results.timeValue.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Greeks */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                The Greeks
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Delta</span>
                    <span className="font-semibold">{results.delta.toFixed(4)}</span>
                  </div>
                  <Progress value={Math.abs(results.delta) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">Price sensitivity</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Gamma</span>
                    <span className="font-semibold">{results.gamma.toFixed(4)}</span>
                  </div>
                  <Progress value={Math.min(results.gamma * 1000, 100)} className="h-2" />
                  <div className="text-xs text-muted-foreground">Delta sensitivity</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Theta</span>
                    <span className="font-semibold">${results.theta.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Time decay per day</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Vega</span>
                    <span className="font-semibold">${results.vega.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Volatility sensitivity</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rho</span>
                    <span className="font-semibold">${results.rho.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Interest rate sensitivity</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Moneyness</span>
                    <span className="font-semibold">{results.moneyness}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Option status</div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Additional Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Breakeven Price</div>
                  <div className="font-semibold text-lg">${results.breakeven.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Days to Expiry</div>
                  <div className="font-semibold text-lg">{timeToExpiry} days</div>
                </div>
              </div>
            </div>

            <Button onClick={exportResults} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Greeks Analysis
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: This calculator uses the Black-Scholes model which assumes constant volatility and interest rates. 
          Real market conditions may vary significantly. This is for educational purposes only.
        </p>
      </CardFooter>
    </Card>
  );
}
