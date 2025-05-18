"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Percent } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StockPositionCalculator() {
  const [stockPrice, setStockPrice] = useState(150);
  const [accountBalance, setAccountBalance] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [stopLossPercent, setStopLossPercent] = useState(5);
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [positionSize, setPositionSize] = useState<number | null>(null);
  const [notionalValue, setNotionalValue] = useState<number | null>(null);
  
  // Popular stock symbols
  const stocks = [
    { value: "AAPL", label: "Apple Inc. (AAPL)" },
    { value: "MSFT", label: "Microsoft Corp. (MSFT)" },
    { value: "AMZN", label: "Amazon.com Inc. (AMZN)" },
    { value: "GOOGL", label: "Alphabet Inc. (GOOGL)" },
    { value: "META", label: "Meta Platforms Inc. (META)" },
    { value: "TSLA", label: "Tesla Inc. (TSLA)" },
    { value: "NVDA", label: "NVIDIA Corp. (NVDA)" },
    { value: "JPM", label: "JPMorgan Chase & Co. (JPM)" },
    { value: "BAC", label: "Bank of America Corp. (BAC)" },
    { value: "V", label: "Visa Inc. (V)" },
    { value: "WMT", label: "Walmart Inc. (WMT)" },
    { value: "DIS", label: "Walt Disney Co. (DIS)" },
    { value: "PFE", label: "Pfizer Inc. (PFE)" },
    { value: "XOM", label: "Exxon Mobil Corp. (XOM)" },
    { value: "BABA", label: "Alibaba Group Holding Ltd. (BABA)" }
  ];
  
  const calculatePositionSize = () => {
    // Calculate dollar risk amount
    const dollarRisk = accountBalance * (riskPercent / 100);
    
    // Calculate stop loss amount per share
    const stopLossAmount = stockPrice * (stopLossPercent / 100);
    
    // Calculate number of shares
    const shares = Math.floor(dollarRisk / stopLossAmount);
    
    // Calculate notional value
    const calculatedNotionalValue = shares * stockPrice;
    
    setPositionSize(shares);
    setNotionalValue(calculatedNotionalValue);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Position Size Calculator</CardTitle>
        <CardDescription>
          Calculate optimal position size for stock trading based on risk management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stock-symbol">Stock Symbol</Label>
            <Select value={stockSymbol} onValueChange={setStockSymbol}>
              <SelectTrigger id="stock-symbol">
                <SelectValue placeholder="Select stock" />
              </SelectTrigger>
              <SelectContent>
                {stocks.map((stock) => (
                  <SelectItem key={stock.value} value={stock.value}>
                    {stock.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stock-price">Current Price ($)</Label>
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
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="account-balance-stock">Account Balance ($)</Label>
            <Input
              id="account-balance-stock"
              type="number"
              value={accountBalance}
              onChange={(e) => setAccountBalance(Number(e.target.value))}
              min="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="risk-percent-stock">Risk Percentage</Label>
            <div className="relative">
              <Input
                id="risk-percent-stock"
                type="number"
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                min="0"
                max="100"
                step="0.1"
                className="pl-8"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Percent className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stop-loss-percent-stock">Stop Loss Percentage</Label>
          <div className="relative">
            <Input
              id="stop-loss-percent-stock"
              type="number"
              value={stopLossPercent}
              onChange={(e) => setStopLossPercent(Number(e.target.value))}
              min="0.1"
              max="100"
              step="0.1"
              className="pl-8"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Percent className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <Button onClick={calculatePositionSize} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Position Size
        </Button>
        
        {positionSize !== null && notionalValue !== null && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <div className="grid gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Recommended Position Size</div>
                <div className="text-2xl font-bold">{positionSize} shares of {stockSymbol}</div>
                <div className="text-md font-medium mt-1">(${notionalValue.toFixed(2)} total value)</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="text-muted-foreground">Dollar Risk</div>
                  <div className="font-medium">${(accountBalance * riskPercent / 100).toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Stop Loss Price</div>
                  <div className="font-medium">${(stockPrice * (1 - stopLossPercent / 100)).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: This calculator provides position sizing based on risk management principles. Consider commissions, 
          liquidity, and volatility when placing actual trades.
        </p>
      </CardFooter>
    </Card>
  );
} 