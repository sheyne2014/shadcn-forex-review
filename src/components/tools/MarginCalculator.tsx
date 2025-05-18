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

export function MarginCalculator() {
  const [lotSize, setLotSize] = useState(1);
  const [leverage, setLeverage] = useState(100);
  const [instrument, setInstrument] = useState("EURUSD");
  const [price, setPrice] = useState(1.1);
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [requiredMargin, setRequiredMargin] = useState<number | null>(null);
  
  // Predefined list of popular forex pairs and other instruments
  const instruments = [
    { value: "EURUSD", label: "EUR/USD", category: "Major Forex" },
    { value: "GBPUSD", label: "GBP/USD", category: "Major Forex" },
    { value: "USDJPY", label: "USD/JPY", category: "Major Forex" },
    { value: "AUDUSD", label: "AUD/USD", category: "Major Forex" },
    { value: "USDCHF", label: "USD/CHF", category: "Major Forex" },
    { value: "USDCAD", label: "USD/CAD", category: "Major Forex" },
    { value: "NZDUSD", label: "NZD/USD", category: "Major Forex" },
    { value: "EURGBP", label: "EUR/GBP", category: "Minor Forex" },
    { value: "EURJPY", label: "EUR/JPY", category: "Minor Forex" },
    { value: "GBPJPY", label: "GBP/JPY", category: "Minor Forex" },
    { value: "EURCHF", label: "EUR/CHF", category: "Minor Forex" },
    { value: "USDSGD", label: "USD/SGD", category: "Exotic Forex" },
    { value: "USDZAR", label: "USD/ZAR", category: "Exotic Forex" },
    { value: "USDMXN", label: "USD/MXN", category: "Exotic Forex" },
    { value: "XAUUSD", label: "Gold (XAU/USD)", category: "Metal" },
    { value: "XAGUSD", label: "Silver (XAG/USD)", category: "Metal" },
    { value: "USCRUDE", label: "US Crude Oil", category: "Energy" },
    { value: "US30", label: "Dow Jones 30", category: "Index" },
    { value: "SPX500", label: "S&P 500", category: "Index" },
    { value: "NASDAQ", label: "NASDAQ", category: "Index" },
    { value: "UK100", label: "FTSE 100", category: "Index" },
    { value: "GER40", label: "DAX 40", category: "Index" },
  ];
  
  const calculateRequiredMargin = () => {
    // Standard formula for required margin
    // Required Margin = (Lot Size × Contract Size × Price) / Leverage
    
    // Using standard Forex lot size of 100,000
    const contractSize = 100000;
    
    // For JPY pairs or Indices, adjust calculation
    let adjustedPrice = price;
    if (instrument.includes("JPY") || ["US30", "SPX500", "NASDAQ", "UK100", "GER40"].includes(instrument)) {
      adjustedPrice = price / 100; // Simplified adjustment
    }
    
    const margin = (lotSize * contractSize * adjustedPrice) / leverage;
    
    setRequiredMargin(margin);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Margin Calculator</CardTitle>
        <CardDescription>
          Calculate required margin for forex and CFD positions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instrument">Instrument</Label>
            <Select value={instrument} onValueChange={setInstrument}>
              <SelectTrigger id="instrument">
                <SelectValue placeholder="Select instrument" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                {Object.entries(
                  instruments.reduce((acc, instrument) => {
                    if (!acc[instrument.category]) {
                      acc[instrument.category] = [];
                    }
                    acc[instrument.category].push(instrument);
                    return acc;
                  }, {} as Record<string, typeof instruments>)
                ).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="text-xs font-semibold text-muted-foreground py-1 px-2 bg-muted/50">{category}</h4>
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Current Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              step="0.0001"
              min="0.0001"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lot-size-margin">Lot Size</Label>
            <Input
              id="lot-size-margin"
              type="number"
              value={lotSize}
              onChange={(e) => setLotSize(Number(e.target.value))}
              step="0.01"
              min="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="leverage">Leverage</Label>
            <div className="relative">
              <Input
                id="leverage"
                type="number"
                value={leverage}
                onChange={(e) => setLeverage(Number(e.target.value))}
                min="1"
                className="pl-8"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                1:
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="account-currency-margin">Account Currency</Label>
          <Select value={accountCurrency} onValueChange={setAccountCurrency}>
            <SelectTrigger id="account-currency-margin">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
              <SelectItem value="CHF">CHF</SelectItem>
              <SelectItem value="NZD">NZD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={calculateRequiredMargin} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Required Margin
        </Button>
        
        {requiredMargin !== null && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <div className="grid gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Required Margin</div>
                <div className="text-2xl font-bold">{accountCurrency} {requiredMargin.toFixed(2)}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="text-muted-foreground">Leverage</div>
                  <div className="font-medium">1:{leverage}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Margin Percentage</div>
                  <div className="font-medium">{(100 / leverage).toFixed(2)}%</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: Margin requirements may vary between brokers and can change based on market conditions. Always verify with your broker.
        </p>
      </CardFooter>
    </Card>
  );
} 