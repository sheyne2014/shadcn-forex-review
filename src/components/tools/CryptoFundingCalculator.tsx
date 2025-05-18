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

export function CryptoFundingCalculator() {
  const [position, setPosition] = useState("long");
  const [crypto, setCrypto] = useState("BTC");
  const [positionSize, setPositionSize] = useState(1);
  const [entryPrice, setEntryPrice] = useState(50000);
  const [fundingRate, setFundingRate] = useState(0.01);
  const [days, setDays] = useState(7);
  const [fundingCost, setFundingCost] = useState<number | null>(null);
  
  // Popular cryptocurrencies with typical funding rates
  const cryptocurrencies = [
    { value: "BTC", label: "Bitcoin (BTC)", rate: 0.01 },
    { value: "ETH", label: "Ethereum (ETH)", rate: 0.01 },
    { value: "SOL", label: "Solana (SOL)", rate: 0.015 },
    { value: "BNB", label: "Binance Coin (BNB)", rate: 0.0075 },
    { value: "XRP", label: "Ripple (XRP)", rate: 0.01 },
    { value: "ADA", label: "Cardano (ADA)", rate: 0.01 },
    { value: "AVAX", label: "Avalanche (AVAX)", rate: 0.0125 },
    { value: "DOGE", label: "Dogecoin (DOGE)", rate: 0.02 }
  ];
  
  const handleCryptoChange = (value: string) => {
    setCrypto(value);
    const selected = cryptocurrencies.find(c => c.value === value);
    if (selected) {
      setFundingRate(selected.rate);
    }
  };
  
  const calculateFundingCost = () => {
    // Funding typically occurs 3 times per day (every 8 hours)
    const fundingEvents = days * 3;
    
    // Position notional value
    const notionalValue = positionSize * entryPrice;
    
    // Funding formula
    // Funding = Notional Value * Funding Rate * (1 or -1 depending on position)
    // Negative for longs if rate is positive, positive for shorts if rate is positive
    const fundingDirection = position === "long" ? -1 : 1;
    const totalFunding = notionalValue * (fundingRate / 100) * fundingEvents * fundingDirection;
    
    setFundingCost(totalFunding);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crypto Funding Rate Calculator</CardTitle>
        <CardDescription>
          Calculate funding costs for perpetual futures contracts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="crypto-funding">Cryptocurrency</Label>
            <Select value={crypto} onValueChange={handleCryptoChange}>
              <SelectTrigger id="crypto-funding">
                <SelectValue placeholder="Select cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                {cryptocurrencies.map((crypto) => (
                  <SelectItem key={crypto.value} value={crypto.value}>
                    {crypto.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position-funding">Position</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger id="position-funding">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="short">Short</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position-size-funding">Position Size ({crypto})</Label>
            <Input
              id="position-size-funding"
              type="number"
              value={positionSize}
              onChange={(e) => setPositionSize(Number(e.target.value))}
              min="0"
              step="0.001"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="entry-price-funding">Entry Price ($)</Label>
            <Input
              id="entry-price-funding"
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              min="0"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="funding-rate">Funding Rate (% per 8h)</Label>
            <div className="relative">
              <Input
                id="funding-rate"
                type="number"
                value={fundingRate}
                onChange={(e) => setFundingRate(Number(e.target.value))}
                min="-10"
                max="10"
                step="0.001"
                className="pl-8"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Percent className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="days-funding">Days to Hold</Label>
            <Input
              id="days-funding"
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              min="1"
            />
          </div>
        </div>
        
        <Button onClick={calculateFundingCost} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Funding Cost/Earnings
        </Button>
        
        {fundingCost !== null && (
          <div className={`mt-4 p-4 rounded-md text-center ${fundingCost >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <div className="text-sm text-muted-foreground">Total Funding</div>
            <div className={`text-2xl font-bold ${fundingCost >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${Math.abs(fundingCost).toFixed(2)}
              {fundingCost >= 0 ? ' (earnings)' : ' (cost)'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              For {days} days ({days * 3} funding events) at {fundingRate}% per 8h
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: Funding rates change frequently based on market conditions and can be positive or negative.
          Positive rates mean longs pay shorts, negative rates mean shorts pay longs.
        </p>
      </CardFooter>
    </Card>
  );
} 