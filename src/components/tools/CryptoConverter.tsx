"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, ArrowRightLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CryptoConverter() {
  const [fromCrypto, setFromCrypto] = useState("BTC");
  const [toCrypto, setToCrypto] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  
  // Cryptocurrencies with approximate exchange rates (to USD)
  const cryptoRates: Record<string, number> = {
    "BTC": 50000,
    "ETH": 3000,
    "USDT": 1,
    "USDC": 1,
    "BNB": 350,
    "SOL": 180,
    "XRP": 0.5,
    "ADA": 0.3,
    "AVAX": 25,
    "DOGE": 0.08,
    "SHIB": 0.00001,
    "DOT": 12,
    "MATIC": 0.8,
    "LINK": 12,
    "USD": 1,
    "EUR": 1.1,
    "GBP": 1.3,
    "JPY": 0.0068,
    "CAD": 0.74,
    "AUD": 0.67,
    "CHF": 1.15
  };
  
  const cryptocurrencies = [
    { value: "BTC", label: "Bitcoin (BTC)" },
    { value: "ETH", label: "Ethereum (ETH)" },
    { value: "USDT", label: "Tether (USDT)" },
    { value: "USDC", label: "USD Coin (USDC)" },
    { value: "BNB", label: "Binance Coin (BNB)" },
    { value: "SOL", label: "Solana (SOL)" },
    { value: "XRP", label: "Ripple (XRP)" },
    { value: "ADA", label: "Cardano (ADA)" },
    { value: "AVAX", label: "Avalanche (AVAX)" },
    { value: "DOGE", label: "Dogecoin (DOGE)" },
    { value: "SHIB", label: "Shiba Inu (SHIB)" },
    { value: "DOT", label: "Polkadot (DOT)" },
    { value: "MATIC", label: "Polygon (MATIC)" },
    { value: "LINK", label: "Chainlink (LINK)" },
    { value: "USD", label: "US Dollar (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "GBP", label: "British Pound (GBP)" },
    { value: "JPY", label: "Japanese Yen (JPY)" },
    { value: "CAD", label: "Canadian Dollar (CAD)" },
    { value: "AUD", label: "Australian Dollar (AUD)" },
    { value: "CHF", label: "Swiss Franc (CHF)" }
  ];
  
  const convertCrypto = () => {
    if (!cryptoRates[fromCrypto] || !cryptoRates[toCrypto]) {
      return;
    }
    
    // Convert to USD first, then to target currency
    const valueInUSD = amount * cryptoRates[fromCrypto];
    const valueInTargetCurrency = valueInUSD / cryptoRates[toCrypto];
    
    setResult(valueInTargetCurrency);
  };
  
  const swapCurrencies = () => {
    const temp = fromCrypto;
    setFromCrypto(toCrypto);
    setToCrypto(temp);
    // Recalculate after swap
    setTimeout(convertCrypto, 100);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crypto Converter</CardTitle>
        <CardDescription>
          Convert between cryptocurrencies and fiat currencies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from-crypto">From</Label>
            <Select value={fromCrypto} onValueChange={setFromCrypto}>
              <SelectTrigger id="from-crypto">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {cryptocurrencies.map((crypto) => (
                  <SelectItem key={`from-${crypto.value}`} value={crypto.value}>
                    {crypto.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="to-crypto">To</Label>
            <Select value={toCrypto} onValueChange={setToCrypto}>
              <SelectTrigger id="to-crypto">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {cryptocurrencies.map((crypto) => (
                  <SelectItem key={`to-${crypto.value}`} value={crypto.value}>
                    {crypto.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="amount-crypto">Amount</Label>
            <Input
              id="amount-crypto"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="0"
              step="0.000001"
            />
          </div>
          
          <div className="pt-6">
            <Button variant="outline" size="icon" onClick={swapCurrencies}>
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="result-crypto">Result</Label>
            <Input
              id="result-crypto"
              type="text"
              value={result !== null ? result.toFixed(8) : ''}
              readOnly
              className="bg-muted"
            />
          </div>
        </div>
        
        <Button onClick={convertCrypto} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Convert
        </Button>
        
        {result !== null && (
          <div className="mt-4 p-4 bg-muted rounded-md text-center">
            <div className="text-sm text-muted-foreground">Conversion Result</div>
            <div className="text-2xl font-bold">
              {amount} {fromCrypto} = {result.toFixed(8)} {toCrypto}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              1 {fromCrypto} = {(cryptoRates[fromCrypto] / cryptoRates[toCrypto]).toFixed(8)} {toCrypto}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: These rates are approximate and for calculation purposes only. Actual market rates may vary.
        </p>
      </CardFooter>
    </Card>
  );
} 