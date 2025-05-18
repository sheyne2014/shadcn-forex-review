"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export function OptionsPremiumCalculator() {
  const [optionType, setOptionType] = useState("call");
  const [stockPrice, setStockPrice] = useState(150);
  const [strikePrice, setStrikePrice] = useState(155);
  const [daysToExpiration, setDaysToExpiration] = useState(30);
  const [volatility, setVolatility] = useState(30);
  const [riskFreeRate, setRiskFreeRate] = useState(3);
  const [dividend, setDividend] = useState(0);
  const [premium, setPremium] = useState<number | null>(null);
  const [greeks, setGreeks] = useState<{delta: number, gamma: number, theta: number, vega: number} | null>(null);
  
  // Simplified Black-Scholes calculation for educational purposes
  // Note: This is a basic implementation that doesn't handle all edge cases
  const calculatePremium = () => {
    // Convert percentages to decimals
    const vol = volatility / 100;
    const rate = riskFreeRate / 100;
    const div = dividend / 100;
    
    // Time to expiration in years
    const T = daysToExpiration / 365;
    
    // Calculate d1 and d2
    const d1 = (Math.log(stockPrice / strikePrice) + (rate - div + Math.pow(vol, 2) / 2) * T) / (vol * Math.sqrt(T));
    const d2 = d1 - vol * Math.sqrt(T);
    
    // Normal CDF approximation
    const cdf = (x: number) => {
      const a1 = 0.254829592;
      const a2 = -0.284496736;
      const a3 = 1.421413741;
      const a4 = -1.453152027;
      const a5 = 1.061405429;
      const p = 0.3275911;
      
      const sign = x < 0 ? -1 : 1;
      x = Math.abs(x) / Math.sqrt(2);
      
      const t = 1 / (1 + p * x);
      const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
      
      return 0.5 * (1 + sign * erf);
    };
    
    let calculatedPremium = 0;
    
    if (optionType === "call") {
      calculatedPremium = stockPrice * Math.exp(-div * T) * cdf(d1) - strikePrice * Math.exp(-rate * T) * cdf(d2);
    } else {
      calculatedPremium = strikePrice * Math.exp(-rate * T) * cdf(-d2) - stockPrice * Math.exp(-div * T) * cdf(-d1);
    }
    
    // Calculate Greeks
    const delta = optionType === "call" ? cdf(d1) : cdf(d1) - 1;
    const gamma = Math.exp(-div * T) * cdf(d1) / (stockPrice * vol * Math.sqrt(T));
    const theta = -(stockPrice * vol * Math.exp(-div * T) * cdf(d1)) / (2 * Math.sqrt(T));
    const vega = stockPrice * Math.exp(-div * T) * cdf(d1) * Math.sqrt(T) / 100;
    
    setPremium(calculatedPremium);
    setGreeks({ delta, gamma, theta, vega });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Options Premium Calculator</CardTitle>
        <CardDescription>
          Calculate option premiums and Greeks using the Black-Scholes model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="option-type">Option Type</Label>
            <RadioGroup
              value={optionType}
              onValueChange={setOptionType}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="call" id="option-call" />
                <Label htmlFor="option-call" className="cursor-pointer">Call</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="put" id="option-put" />
                <Label htmlFor="option-put" className="cursor-pointer">Put</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="days-to-expiration">Days to Expiration</Label>
            <Input
              id="days-to-expiration"
              type="number"
              value={daysToExpiration}
              onChange={(e) => setDaysToExpiration(Number(e.target.value))}
              min="1"
              max="1000"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stock-price-options">Stock Price ($)</Label>
            <Input
              id="stock-price-options"
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
        
        <div className="grid grid-cols-3 gap-4">
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
            <Label htmlFor="risk-free-rate">Risk-Free Rate (%)</Label>
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
            <Label htmlFor="dividend">Dividend Yield (%)</Label>
            <Input
              id="dividend"
              type="number"
              value={dividend}
              onChange={(e) => setDividend(Number(e.target.value))}
              min="0"
              max="20"
              step="0.1"
            />
          </div>
        </div>
        
        <Button onClick={calculatePremium} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Option Premium
        </Button>
        
        {premium !== null && greeks !== null && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <div className="grid gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Estimated Option Premium</div>
                <div className="text-2xl font-bold">${premium.toFixed(2)} per share</div>
                <div className="text-md font-medium mt-1">${(premium * 100).toFixed(2)} per contract</div>
              </div>
              
              <Separator className="my-2" />
              
              <div className="text-sm font-medium mb-1">Greeks:</div>
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Delta</div>
                  <div className="font-medium">{greeks.delta.toFixed(4)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Gamma</div>
                  <div className="font-medium">{greeks.gamma.toFixed(4)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Theta</div>
                  <div className="font-medium">{greeks.theta.toFixed(4)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Vega</div>
                  <div className="font-medium">{greeks.vega.toFixed(4)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: This is an educational implementation of the Black-Scholes model. 
          Actual option prices may differ due to market factors. Each contract represents 100 shares.
        </p>
      </CardFooter>
    </Card>
  );
} 