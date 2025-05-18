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

export function SwapCalculator() {
  const [positionType, setPositionType] = useState("buy");
  const [instrument, setInstrument] = useState("EURUSD");
  const [lotSize, setLotSize] = useState(1);
  const [days, setDays] = useState(1);
  const [swapRate, setSwapRate] = useState(positionType === "buy" ? -2.5 : 0.5); // Different rates for buy/sell
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [swapCost, setSwapCost] = useState<number | null>(null);
  
  // Currency pairs with different swap rates
  const instruments = [
    { value: "EURUSD", label: "EUR/USD", buy: -2.5, sell: 0.5, category: "Major Forex" },
    { value: "GBPUSD", label: "GBP/USD", buy: -3.2, sell: 0.3, category: "Major Forex" },
    { value: "USDJPY", label: "USD/JPY", buy: 0.3, sell: -3.0, category: "Major Forex" },
    { value: "AUDUSD", label: "AUD/USD", buy: 0.2, sell: -3.5, category: "Major Forex" },
    { value: "USDCHF", label: "USD/CHF", buy: -1.8, sell: -0.7, category: "Major Forex" },
    { value: "USDCAD", label: "USD/CAD", buy: 0.1, sell: -2.9, category: "Major Forex" },
    { value: "NZDUSD", label: "NZD/USD", buy: 0.4, sell: -3.2, category: "Major Forex" },
    { value: "EURGBP", label: "EUR/GBP", buy: -1.9, sell: -0.5, category: "Minor Forex" },
    { value: "EURJPY", label: "EUR/JPY", buy: -2.1, sell: 0.3, category: "Minor Forex" },
    { value: "GBPJPY", label: "GBP/JPY", buy: -3.6, sell: 0.1, category: "Minor Forex" },
    { value: "EURCHF", label: "EUR/CHF", buy: -3.0, sell: -0.9, category: "Minor Forex" },
    { value: "XAUUSD", label: "Gold (XAU/USD)", buy: -5.2, sell: -1.5, category: "Metal" },
    { value: "XAGUSD", label: "Silver (XAG/USD)", buy: -4.3, sell: -1.2, category: "Metal" },
    { value: "USCRUDE", label: "US Crude Oil", buy: -4.8, sell: -2.1, category: "Energy" },
  ];
  
  // Update swap rate when instrument or position type changes
  const handleInstrumentChange = (value: string) => {
    setInstrument(value);
    const selectedInstrument = instruments.find(i => i.value === value);
    if (selectedInstrument) {
      setSwapRate(positionType === "buy" ? selectedInstrument.buy : selectedInstrument.sell);
    }
  };
  
  const handlePositionTypeChange = (value: string) => {
    setPositionType(value);
    const selectedInstrument = instruments.find(i => i.value === instrument);
    if (selectedInstrument) {
      setSwapRate(value === "buy" ? selectedInstrument.buy : selectedInstrument.sell);
    }
  };
  
  const calculateSwapCost = () => {
    // Standard formula: Swap Cost = Lot Size * Swap Rate * Days
    // For Wednesdays (Triple Swap): Swap Cost = Lot Size * Swap Rate * 3
    
    // Simplified calculation without calendar specifics
    let totalDays = days;
    
    // Check if days are more than a week to account for triple swap on Wednesday
    if (days >= 7) {
      const weeks = Math.floor(days / 7);
      totalDays = days + (weeks * 2); // Add 2 extra days per week for triple swap
    }
    
    const cost = lotSize * swapRate * totalDays;
    setSwapCost(cost);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Swap/Rollover Calculator</CardTitle>
        <CardDescription>
          Calculate overnight funding costs for forex and CFD positions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instrument-swap">Instrument</Label>
            <Select value={instrument} onValueChange={handleInstrumentChange}>
              <SelectTrigger id="instrument-swap">
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
            <Label htmlFor="position-type-swap">Position Type</Label>
            <Select value={positionType} onValueChange={handlePositionTypeChange}>
              <SelectTrigger id="position-type-swap">
                <SelectValue placeholder="Select position type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy (Long)</SelectItem>
                <SelectItem value="sell">Sell (Short)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lot-size-swap">Lot Size</Label>
            <Input
              id="lot-size-swap"
              type="number"
              value={lotSize}
              onChange={(e) => setLotSize(Number(e.target.value))}
              step="0.01"
              min="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="days">Days to Hold</Label>
            <Input
              id="days"
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              min="1"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="swap-rate">Swap Rate (points per lot)</Label>
            <Input
              id="swap-rate"
              type="number"
              value={swapRate}
              onChange={(e) => setSwapRate(Number(e.target.value))}
              step="0.1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="account-currency-swap">Account Currency</Label>
            <Select value={accountCurrency} onValueChange={setAccountCurrency}>
              <SelectTrigger id="account-currency-swap">
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
        </div>
        
        <Button onClick={calculateSwapCost} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Swap Cost
        </Button>
        
        {swapCost !== null && (
          <div className={`mt-4 p-4 rounded-md text-center ${swapCost >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <div className="text-sm text-muted-foreground">Total Swap Cost/Earnings</div>
            <div className={`text-2xl font-bold ${swapCost >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {accountCurrency} {Math.abs(swapCost).toFixed(2)}
              {swapCost >= 0 ? ' (profit)' : ' (cost)'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              For {days} days with {positionType === "buy" ? "long" : "short"} position
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: Swap rates vary between brokers and change frequently. Triple swap typically applies on Wednesdays.
          Always check your broker&apos;s current rates.
        </p>
      </CardFooter>
    </Card>
  );
} 