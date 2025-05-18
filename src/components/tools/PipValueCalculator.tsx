"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

export function PipValueCalculator() {
  const [lotSize, setLotSize] = useState(0.1);
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [quoteCurrency, setQuoteCurrency] = useState("USD");
  const [rate, setRate] = useState(1.1);
  const [pipValue, setPipValue] = useState(0);

  const calculatePipValue = () => {
    let value = 0;
    
    if (quoteCurrency === accountCurrency) {
      // Direct quote
      value = lotSize * 100000 * 0.0001;
    } else if (baseCurrency === accountCurrency) {
      // Indirect quote
      value = lotSize * 100000 * 0.0001 / rate;
    } else {
      // Cross rate (simplified)
      value = lotSize * 100000 * 0.0001; // We'd need a conversion rate here in real app
    }
    
    setPipValue(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pip Value Calculator</CardTitle>
        <CardDescription>
          Calculate the value of a pip for your position size
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lot-size">Lot Size</Label>
            <Input
              id="lot-size"
              type="number"
              value={lotSize}
              onChange={(e) => setLotSize(Number(e.target.value))}
              step="0.01"
              min="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="account-currency">Account Currency</Label>
            <Select value={accountCurrency} onValueChange={setAccountCurrency}>
              <SelectTrigger id="account-currency">
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
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="base-currency">Base Currency</Label>
            <Select value={baseCurrency} onValueChange={setBaseCurrency}>
              <SelectTrigger id="base-currency">
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
            <Label htmlFor="quote-currency">Quote Currency</Label>
            <Select value={quoteCurrency} onValueChange={setQuoteCurrency}>
              <SelectTrigger id="quote-currency">
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
        
        <div className="space-y-2">
          <Label htmlFor="exchange-rate">Exchange Rate</Label>
          <Input
            id="exchange-rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            step="0.0001"
            min="0.0001"
          />
        </div>
        
        <Button onClick={calculatePipValue} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Pip Value
        </Button>
        
        {pipValue > 0 && (
          <div className="mt-4 p-4 bg-muted rounded-md text-center">
            <div className="text-sm text-muted-foreground">Pip Value</div>
            <div className="text-2xl font-bold">
              {accountCurrency} {pipValue.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              per pip movement
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: For JPY pairs, the pip value is calculated differently (0.01 increments).
        </p>
      </CardFooter>
    </Card>
  );
} 