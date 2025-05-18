"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProfitLossCalculator() {
  const [positionType, setPositionType] = useState("buy");
  const [entryPrice, setEntryPrice] = useState(1.1);
  const [exitPrice, setExitPrice] = useState(1.15);
  const [lotSize, setLotSize] = useState(0.1);
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [quoteCurrency, setQuoteCurrency] = useState("USD");
  const [profitLoss, setProfitLoss] = useState<number | null>(null);
  
  const calculateProfitLoss = () => {
    const direction = positionType === "buy" ? 1 : -1;
    const priceDifference = (exitPrice - entryPrice) * direction;
    
    // Standard calculation for major pairs where quote is the same as account currency
    const pipsDifference = priceDifference * 10000;
    const profitLossValue = lotSize * 100000 * priceDifference;
    
    setProfitLoss(profitLossValue);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit/Loss Calculator</CardTitle>
        <CardDescription>
          Calculate potential profit or loss for your forex trades
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position-type">Position Type</Label>
            <Select value={positionType} onValueChange={setPositionType}>
              <SelectTrigger id="position-type">
                <SelectValue placeholder="Select position type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy (Long)</SelectItem>
                <SelectItem value="sell">Sell (Short)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lot-size-pl">Lot Size</Label>
            <Input
              id="lot-size-pl"
              type="number"
              value={lotSize}
              onChange={(e) => setLotSize(Number(e.target.value))}
              step="0.01"
              min="0.01"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entry-price">Entry Price</Label>
            <Input
              id="entry-price"
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              step="0.0001"
              min="0.0001"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exit-price">Exit Price</Label>
            <Input
              id="exit-price"
              type="number"
              value={exitPrice}
              onChange={(e) => setExitPrice(Number(e.target.value))}
              step="0.0001"
              min="0.0001"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="base-currency-pl">Base Currency</Label>
            <Select value={baseCurrency} onValueChange={setBaseCurrency}>
              <SelectTrigger id="base-currency-pl">
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
          
          <div className="space-y-2">
            <Label htmlFor="quote-currency-pl">Quote Currency</Label>
            <Select value={quoteCurrency} onValueChange={setQuoteCurrency}>
              <SelectTrigger id="quote-currency-pl">
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
          
          <div className="space-y-2">
            <Label htmlFor="account-currency-pl">Account Currency</Label>
            <Select value={accountCurrency} onValueChange={setAccountCurrency}>
              <SelectTrigger id="account-currency-pl">
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
        </div>
        
        <Button onClick={calculateProfitLoss} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Profit/Loss
        </Button>
        
        {profitLoss !== null && (
          <div className={`mt-4 p-4 rounded-md text-center ${profitLoss >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <div className="text-sm text-muted-foreground">Profit/Loss</div>
            <div className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {accountCurrency} {profitLoss.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.abs((exitPrice - entryPrice) * 10000).toFixed(1)} pips {profitLoss >= 0 ? 'profit' : 'loss'}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 