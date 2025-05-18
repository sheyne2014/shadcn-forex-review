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

export function PositionSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(1.1);
  const [stopLoss, setStopLoss] = useState(1.09);
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [positionSize, setPositionSize] = useState<number | null>(null);
  
  const calculatePositionSize = () => {
    // Calculate pips at risk
    const pipsAtRisk = Math.abs((entryPrice - stopLoss) * 10000);
    
    // Calculate dollar risk
    const dollarRisk = accountBalance * (riskPercent / 100);
    
    // Calculate position size in lots
    const standardLotValue = 10; // $10 per pip for 1 standard lot (simplified)
    const calculatedLots = dollarRisk / (pipsAtRisk * standardLotValue);
    
    setPositionSize(calculatedLots);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Position Size Calculator</CardTitle>
        <CardDescription>
          Calculate optimal position size based on your risk tolerance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="account-balance">Account Balance</Label>
            <div className="relative">
              <Input
                id="account-balance"
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(Number(e.target.value))}
                min="0"
                className="pl-8"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                $
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="risk-percent">Risk Percentage</Label>
            <div className="relative">
              <Input
                id="risk-percent"
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
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entry-price-ps">Entry Price</Label>
            <Input
              id="entry-price-ps"
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              step="0.0001"
              min="0.0001"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stop-loss">Stop Loss</Label>
            <Input
              id="stop-loss"
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value))}
              step="0.0001"
              min="0.0001"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="account-currency-ps">Account Currency</Label>
          <Select value={accountCurrency} onValueChange={setAccountCurrency}>
            <SelectTrigger id="account-currency-ps">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={calculatePositionSize} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Position Size
        </Button>
        
        {positionSize !== null && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Recommended Position Size</div>
                <div className="text-2xl font-bold">{positionSize.toFixed(2)} Lots</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Dollar Risk</div>
                <div className="text-2xl font-bold">${(accountBalance * riskPercent / 100).toFixed(2)}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-3 text-center">
              Stop Loss Distance: {Math.abs((entryPrice - stopLoss) * 10000).toFixed(1)} pips
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: This calculator assumes a standard pip value and doesn't account for leverage limitations. Always verify with your broker's specifications.
        </p>
      </CardFooter>
    </Card>
  );
} 