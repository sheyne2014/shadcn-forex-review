"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCw, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define popular currencies
const popularCurrencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
];

// Define cache storage type
type RateCache = {
  from: string;
  to: string;
  rate: number;
  timestamp: string;
};

export function ForexConverterTool() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(100);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [usingCache, setUsingCache] = useState(false);

  // Function to save to cache
  const saveToCache = (from: string, to: string, rate: number) => {
    try {
      const cacheData: RateCache = {
        from,
        to,
        rate,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(`rate_${from}_${to}`, JSON.stringify(cacheData));
    } catch (err) {
      console.error("Error saving to cache:", err);
    }
  };

  // Function to get from cache
  const getFromCache = (from: string, to: string): RateCache | null => {
    try {
      const cacheItem = localStorage.getItem(`rate_${from}_${to}`);
      if (!cacheItem) return null;

      const cacheData = JSON.parse(cacheItem) as RateCache;
      
      // Check if cache is older than 1 hour (3600000 ms)
      const cacheTime = new Date(cacheData.timestamp).getTime();
      const currentTime = new Date().getTime();
      
      if (currentTime - cacheTime > 3600000) {
        return null; // Cache expired
      }
      
      return cacheData;
    } catch (err) {
      console.error("Error reading from cache:", err);
      return null;
    }
  };

  // Function to fetch exchange rates
  const fetchExchangeRate = async () => {
    setError(null);
    setIsLoading(true);
    setUsingCache(false);
    
    try {
      // Try to get from cache first
      const cachedData = getFromCache(fromCurrency, toCurrency);
      
      if (cachedData) {
        setExchangeRate(cachedData.rate);
        setConvertedAmount(amount * cachedData.rate);
        setLastUpdated(new Date(cachedData.timestamp).toLocaleString());
        setUsingCache(true);
        setIsLoading(false);
        return;
      }
      
      // If not in cache, fetch from API
      // First try Open Exchange Rates API
      try {
        const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY || 'fallback_key';
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.rates && data.rates[toCurrency]) {
          const rate = data.rates[toCurrency];
          setExchangeRate(rate);
          setConvertedAmount(amount * rate);
          setLastUpdated(new Date().toLocaleString());
          
          // Save to cache
          saveToCache(fromCurrency, toCurrency, rate);
        } else {
          throw new Error("Rate not available for selected currency");
        }
      } catch (primaryError) {
        // If first API fails, try backup API
        console.error("Primary API failed:", primaryError);
        
        // Try backup API: ExchangeRate-API
        const backupResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        
        if (!backupResponse.ok) {
          throw new Error(`Backup API request failed with status: ${backupResponse.status}`);
        }
        
        const backupData = await backupResponse.json();
        
        if (backupData.rates && backupData.rates[toCurrency]) {
          const rate = backupData.rates[toCurrency];
          setExchangeRate(rate);
          setConvertedAmount(amount * rate);
          setLastUpdated(new Date().toLocaleString() + " (backup API)");
          
          // Save to cache
          saveToCache(fromCurrency, toCurrency, rate);
        } else {
          throw new Error("Rate not available from backup API");
        }
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch exchange rates");
      
      // Fallback to approximate rates for common pairs
      const fallbackRates: Record<string, Record<string, number>> = {
        "USD": { "EUR": 0.92, "GBP": 0.79, "JPY": 150.5, "AUD": 1.52, "CAD": 1.36 },
        "EUR": { "USD": 1.09, "GBP": 0.86, "JPY": 163.7, "AUD": 1.65, "CAD": 1.48 },
        "GBP": { "USD": 1.27, "EUR": 1.16, "JPY": 190.5, "AUD": 1.92, "CAD": 1.72 }
      };
      
      if (fallbackRates[fromCurrency]?.[toCurrency]) {
        const fallbackRate = fallbackRates[fromCurrency][toCurrency];
        setExchangeRate(fallbackRate);
        setConvertedAmount(amount * fallbackRate);
        setLastUpdated(new Date().toLocaleString() + " (estimated)");
        setUsingCache(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Calculate conversion whenever amount or rate changes
  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount(amount * exchangeRate);
    }
  }, [amount, exchangeRate]);

  // Fetch exchange rate on initial load and when currencies change
  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>
          Convert between world currencies using real-time exchange rates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Amount input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="text-lg"
            min={0}
            aria-label="Amount to convert"
          />
        </div>

        {/* Currency selection */}
        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
          {/* From currency */}
          <div className="space-y-2">
            <Label htmlFor="from-currency">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="bg-background" id="from-currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                <SelectGroup>
                  <SelectLabel>Popular Currencies</SelectLabel>
                  {popularCurrencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Swap button */}
          <Button
            variant="outline"
            size="icon"
            className="mt-6"
            onClick={swapCurrencies}
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          {/* To currency */}
          <div className="space-y-2">
            <Label htmlFor="to-currency">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="bg-background" id="to-currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                <SelectGroup>
                  <SelectLabel>Popular Currencies</SelectLabel>
                  {popularCurrencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result */}
        <div className="mt-6 p-4 bg-muted rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Converted Amount</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchExchangeRate}
              disabled={isLoading}
              className="h-8"
              aria-label="Refresh exchange rate"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <div className="text-2xl font-bold">
            {convertedAmount !== null
              ? `${popularCurrencies.find(c => c.code === toCurrency)?.symbol || ''} ${convertedAmount.toFixed(4)}`
              : "Calculating..."}
          </div>
          <div className="text-xs text-muted-foreground mt-2 flex justify-between">
            <span>Exchange Rate: 1 {fromCurrency} = {exchangeRate !== null ? exchangeRate.toFixed(6) : '...'} {toCurrency}</span>
            {usingCache && <span className="text-primary">(cached)</span>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        {lastUpdated ? (
          <div className="w-full flex justify-between">
            <span>Last updated: {lastUpdated}</span>
            {error && <span>Using fallback data</span>}
          </div>
        ) : (
          <span>Fetching latest rates...</span>
        )}
      </CardFooter>
    </Card>
  );
} 