"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCw } from "lucide-react";
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

export function ForexConverterTool() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(100);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Function to fetch exchange rates
  const fetchExchangeRate = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, you would use an API like:
      // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      // const data = await response.json();
      // const rate = data.rates[toCurrency];
      
      // For demo purposes, we'll simulate an API call with random rates
      // This should be replaced with actual API calls in production
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Random rate between 0.5 and 2 (just for demo)
      const mockRate = (Math.random() * 1.5 + 0.5).toFixed(6);
      setExchangeRate(parseFloat(mockRate));
      setConvertedAmount(amount * parseFloat(mockRate));
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
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
        {/* Amount input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="text-lg"
            min={0}
          />
        </div>

        {/* Currency selection */}
        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
          {/* From currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
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
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          {/* To currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
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
          <div className="text-xs text-muted-foreground mt-2">
            <span>Exchange Rate: 1 {fromCurrency} = {exchangeRate !== null ? exchangeRate.toFixed(6) : '...'} {toCurrency}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        {lastUpdated ? (
          <div className="w-full flex justify-between">
            <span>Last updated: {lastUpdated}</span>
            <span>*Demo mode with simulated rates</span>
          </div>
        ) : (
          <span>Fetching latest rates...</span>
        )}
      </CardFooter>
    </Card>
  );
} 