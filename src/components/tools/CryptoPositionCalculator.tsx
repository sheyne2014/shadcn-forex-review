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

export function CryptoPositionCalculator() {
  const [cryptoPrice, setCryptoPrice] = useState(50000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [accountBalance, setAccountBalance] = useState(10000);
  const [stopLossPercent, setStopLossPercent] = useState(5);
  const [leverage, setLeverage] = useState(1);
  const [crypto, setCrypto] = useState("BTC");
  const [positionSize, setPositionSize] = useState<number | null>(null);
  
  // Popular cryptocurrencies
  const cryptocurrencies = [
    { value: "BTC", label: "Bitcoin (BTC)" },
    { value: "ETH", label: "Ethereum (ETH)" },
    { value: "USDT", label: "Tether (USDT)" },
    { value: "BNB", label: "Binance Coin (BNB)" },
    { value: "SOL", label: "Solana (SOL)" },
    { value: "XRP", label: "Ripple (XRP)" },
    { value: "ADA", label: "Cardano (ADA)" },
    { value: "AVAX", label: "Avalanche (AVAX)" },
    { value: "DOGE", label: "Dogecoin (DOGE)" },
    { value: "DOT", label: "Polkadot (DOT)" },
    { value: "SHIB", label: "Shiba Inu (SHIB)" },
    { value: "MATIC", label: "Polygon (MATIC)" },
    { value: "LINK", label: "Chainlink (LINK)" }
  ];
  
  const calculatePositionSize = () => {
    // Calculate dollar risk amount
    const dollarRisk = accountBalance * (riskPercent / 100);
    
    // Calculate stop loss in dollar terms
    const stopLossAmount = cryptoPrice * (stopLossPercent / 100);
    
    // Calculate position size
    const positionSizeUnits = (dollarRisk / stopLossAmount) * leverage;
    
    // Calculate position size in dollars
    const positionSizeDollars = positionSizeUnits * cryptoPrice;
    
    setPositionSize(positionSizeUnits);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crypto Position Size Calculator</CardTitle>
        <CardDescription>
          Calculate optimal position size for cryptocurrency trading based on risk management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="crypto">Cryptocurrency</Label>
            <Select value={crypto} onValueChange={setCrypto}>
              <SelectTrigger id="crypto">
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
            <Label htmlFor="crypto-price">Current Price ($)</Label>
            <Input
              id="crypto-price"
              type="number"
              value={cryptoPrice}
              onChange={(e) => setCryptoPrice(Number(e.target.value))}
              min="0"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="account-balance-crypto">Account Balance ($)</Label>
            <Input
              id="account-balance-crypto"
              type="number"
              value={accountBalance}
              onChange={(e) => setAccountBalance(Number(e.target.value))}
              min="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="risk-percent-crypto">Risk Percentage</Label>
            <div className="relative">
              <Input
                id="risk-percent-crypto"
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
            <Label htmlFor="stop-loss-percent">Stop Loss Percentage</Label>
            <div className="relative">
              <Input
                id="stop-loss-percent"
                type="number"
                value={stopLossPercent}
                onChange={(e) => setStopLossPercent(Number(e.target.value))}
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
          
          <div className="space-y-2">
            <Label htmlFor="leverage-crypto">Leverage (optional)</Label>
            <div className="relative">
              <Input
                id="leverage-crypto"
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
        
        <Button onClick={calculatePositionSize} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Position Size
        </Button>
        
        {positionSize !== null && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <div className="grid gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Recommended Position Size</div>
                <div className="text-2xl font-bold">{positionSize.toFixed(6)} {crypto}</div>
                <div className="text-md font-medium mt-1">(${(positionSize * cryptoPrice).toFixed(2)})</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="text-muted-foreground">Dollar Risk</div>
                  <div className="font-medium">${(accountBalance * riskPercent / 100).toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Stop Loss</div>
                  <div className="font-medium">${(cryptoPrice * (1 - stopLossPercent / 100)).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: Cryptocurrency markets are highly volatile. Always use stop losses and consider lower risk percentages.
        </p>
      </CardFooter>
    </Card>
  );
} 