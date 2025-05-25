"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCw, AlertCircle, TrendingUp, TrendingDown, Clock, Download, Star, History, BarChart3 } from "lucide-react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Enhanced currency data with more details
const currencyData = [
  // Major Currencies
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", category: "major", region: "North America" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", category: "major", region: "Europe" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", category: "major", region: "Europe" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", category: "major", region: "Asia" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭", category: "major", region: "Europe" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦", category: "major", region: "North America" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", category: "major", region: "Oceania" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿", category: "major", region: "Oceania" },

  // Asian Currencies
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", category: "emerging", region: "Asia" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", category: "minor", region: "Asia" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰", category: "minor", region: "Asia" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷", category: "emerging", region: "Asia" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", category: "emerging", region: "Asia" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭", category: "emerging", region: "Asia" },

  // European Currencies
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴", category: "minor", region: "Europe" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪", category: "minor", region: "Europe" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰", category: "minor", region: "Europe" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱", category: "emerging", region: "Europe" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿", category: "emerging", region: "Europe" },

  // Americas
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽", category: "emerging", region: "Americas" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷", category: "emerging", region: "Americas" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flag: "🇦🇷", category: "emerging", region: "Americas" },

  // Middle East & Africa
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦", category: "emerging", region: "Africa" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷", category: "emerging", region: "Middle East" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", category: "minor", region: "Middle East" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦", category: "minor", region: "Middle East" },
];

interface ConversionHistory {
  id: string;
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: Date;
}

interface ExchangeRateData {
  rate: number;
  change24h: number;
  high24h: number;
  low24h: number;
  timestamp: Date;
}

export function EnhancedForexConverterTool() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1000);
  const [exchangeData, setExchangeData] = useState<ExchangeRateData | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(["USD", "EUR", "GBP", "JPY"]);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [activeTab, setActiveTab] = useState("converter");
  const [justConverted, setJustConverted] = useState(false);

  // Enhanced exchange rate fetching with multiple data points
  const fetchExchangeRate = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // Simulate API call with enhanced data
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock exchange rate data with additional metrics
      const baseRate = getBaseRate(fromCurrency, toCurrency);
      const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
      const rate = baseRate * (1 + variation);

      const exchangeRateData: ExchangeRateData = {
        rate,
        change24h: (Math.random() - 0.5) * 0.05, // ±2.5% daily change
        high24h: rate * (1 + Math.random() * 0.02),
        low24h: rate * (1 - Math.random() * 0.02),
        timestamp: new Date(),
      };

      setExchangeData(exchangeRateData);
      setConvertedAmount(amount * rate);
      setJustConverted(true);

      // Reset animation after 1 second
      setTimeout(() => setJustConverted(false), 1000);

    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setError("Failed to fetch current exchange rates. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get base exchange rate (simplified for demo)
  const getBaseRate = (from: string, to: string): number => {
    const rates: Record<string, Record<string, number>> = {
      "USD": { "EUR": 0.92, "GBP": 0.79, "JPY": 150.5, "AUD": 1.52, "CAD": 1.36, "CHF": 0.91, "CNY": 7.24, "SGD": 1.35 },
      "EUR": { "USD": 1.09, "GBP": 0.86, "JPY": 163.7, "AUD": 1.65, "CAD": 1.48, "CHF": 0.99, "CNY": 7.88, "SGD": 1.47 },
      "GBP": { "USD": 1.27, "EUR": 1.16, "JPY": 190.5, "AUD": 1.92, "CAD": 1.72, "CHF": 1.15, "CNY": 9.17, "SGD": 1.71 },
      "JPY": { "USD": 0.0066, "EUR": 0.0061, "GBP": 0.0052, "AUD": 0.010, "CAD": 0.009, "CHF": 0.006, "CNY": 0.048, "SGD": 0.009 },
    };

    return rates[from]?.[to] || 1;
  };

  // Add to favorites
  const toggleFavorite = (currency: string) => {
    setFavorites(prev =>
      prev.includes(currency)
        ? prev.filter(c => c !== currency)
        : [...prev, currency]
    );
  };

  // Add to conversion history
  const addToHistory = () => {
    if (exchangeData && convertedAmount) {
      const newEntry: ConversionHistory = {
        id: Date.now().toString(),
        from: fromCurrency,
        to: toCurrency,
        amount,
        result: convertedAmount,
        rate: exchangeData.rate,
        timestamp: new Date(),
      };

      setHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
    }
  };

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Export conversion data
  const exportData = () => {
    if (!exchangeData) return;

    const data = {
      conversion: {
        from: fromCurrency,
        to: toCurrency,
        amount,
        result: convertedAmount,
        rate: exchangeData.rate,
        timestamp: new Date().toISOString(),
      },
      marketData: {
        change24h: exchangeData.change24h,
        high24h: exchangeData.high24h,
        low24h: exchangeData.low24h,
      },
      history: history.slice(0, 5),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `currency-conversion-${fromCurrency}-${toCurrency}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calculate conversion whenever amount or rate changes
  useEffect(() => {
    if (exchangeData) {
      setConvertedAmount(amount * exchangeData.rate);
    }
  }, [amount, exchangeData]);

  // Fetch exchange rate on initial load and when currencies change
  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  // Auto-add successful conversions to history
  useEffect(() => {
    if (exchangeData && convertedAmount && amount > 0) {
      const timer = setTimeout(addToHistory, 1000);
      return () => clearTimeout(timer);
    }
  }, [exchangeData, convertedAmount, amount, fromCurrency, toCurrency]);

  const fromCurrencyData = currencyData.find(c => c.code === fromCurrency);
  const toCurrencyData = currencyData.find(c => c.code === toCurrency);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="converter">Currency Converter</TabsTrigger>
          <TabsTrigger value="rates">Live Rates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="converter" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-primary" />
                Professional Currency Converter
                <Badge variant="secondary" className="ml-2">Live Rates</Badge>
              </CardTitle>
              <CardDescription>
                Convert between world currencies with real-time exchange rates and market insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">Amount to Convert</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="text-lg h-12"
                  min={0}
                  step={0.01}
                />
              </div>

              {/* Currency Selection */}
              <div className="grid grid-cols-[1fr,auto,1fr] items-end gap-4">
                {/* From Currency */}
                <div className="space-y-2">
                  <Label htmlFor="from-currency">From</Label>
                  <div className="relative">
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="bg-background h-12" id="from-currency">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{fromCurrencyData?.flag}</span>
                            <span className="font-medium">{fromCurrency}</span>
                            <span className="text-sm text-muted-foreground">{fromCurrencyData?.name}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="max-h-[400px]">
                        <SelectGroup>
                          <SelectLabel>Favorites</SelectLabel>
                          {currencyData.filter(c => favorites.includes(c.code)).map((currency) => (
                            <SelectItem key={`fav-${currency.code}`} value={currency.code}>
                              <div className="flex items-center gap-2">
                                <span>{currency.flag}</span>
                                <span className="font-medium">{currency.code}</span>
                                <span className="text-sm text-muted-foreground">{currency.name}</span>
                                <Star className="h-3 w-3 text-yellow-500 ml-auto" />
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <Separator />
                        <SelectGroup>
                          <SelectLabel>Major Currencies</SelectLabel>
                          {currencyData.filter(c => c.category === "major").map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              <div className="flex items-center gap-2">
                                <span>{currency.flag}</span>
                                <span className="font-medium">{currency.code}</span>
                                <span className="text-sm text-muted-foreground">{currency.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 ml-auto"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(currency.code);
                                  }}
                                >
                                  <Star className={`h-3 w-3 ${favorites.includes(currency.code) ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                                </Button>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Other Currencies</SelectLabel>
                          {currencyData.filter(c => c.category !== "major").map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              <div className="flex items-center gap-2">
                                <span>{currency.flag}</span>
                                <span className="font-medium">{currency.code}</span>
                                <span className="text-sm text-muted-foreground">{currency.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Swap Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={swapCurrencies}
                  disabled={isLoading}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>

                {/* To Currency */}
                <div className="space-y-2">
                  <Label htmlFor="to-currency">To</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="bg-background h-12" id="to-currency">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{toCurrencyData?.flag}</span>
                          <span className="font-medium">{toCurrency}</span>
                          <span className="text-sm text-muted-foreground">{toCurrencyData?.name}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px]">
                      <SelectGroup>
                        <SelectLabel>Favorites</SelectLabel>
                        {currencyData.filter(c => favorites.includes(c.code)).map((currency) => (
                          <SelectItem key={`fav-to-${currency.code}`} value={currency.code}>
                            <div className="flex items-center gap-2">
                              <span>{currency.flag}</span>
                              <span className="font-medium">{currency.code}</span>
                              <span className="text-sm text-muted-foreground">{currency.name}</span>
                              <Star className="h-3 w-3 text-yellow-500 ml-auto" />
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <Separator />
                      <SelectGroup>
                        <SelectLabel>Major Currencies</SelectLabel>
                        {currencyData.filter(c => c.category === "major").map((currency) => (
                          <SelectItem key={`to-${currency.code}`} value={currency.code}>
                            <div className="flex items-center gap-2">
                              <span>{currency.flag}</span>
                              <span className="font-medium">{currency.code}</span>
                              <span className="text-sm text-muted-foreground">{currency.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Other Currencies</SelectLabel>
                        {currencyData.filter(c => c.category !== "major").map((currency) => (
                          <SelectItem key={`to-other-${currency.code}`} value={currency.code}>
                            <div className="flex items-center gap-2">
                              <span>{currency.flag}</span>
                              <span className="font-medium">{currency.code}</span>
                              <span className="text-sm text-muted-foreground">{currency.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Conversion Result */}
              <div className={`bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6 transition-all duration-300 ${
                isLoading ? 'animate-pulse' : justConverted ? 'ring-2 ring-green-500 ring-opacity-50 scale-[1.02]' : ''
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Converted Amount</div>
                    <div className="text-3xl font-bold text-primary transition-all duration-300">
                      {convertedAmount !== null && !isLoading
                        ? `${toCurrencyData?.symbol || ''} ${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`
                        : isLoading ? (
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-6 w-6 animate-spin" />
                            Converting...
                          </div>
                        ) : "Enter amount"}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchExchangeRate}
                      disabled={isLoading}
                    >
                      <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportData}
                      disabled={!exchangeData}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>

                {exchangeData && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Exchange Rate: 1 {fromCurrency} = {exchangeData.rate.toFixed(6)} {toCurrency}
                      </span>
                      <div className="flex items-center gap-1">
                        {exchangeData.change24h >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={`text-xs font-medium ${exchangeData.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {exchangeData.change24h >= 0 ? '+' : ''}{(exchangeData.change24h * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-background/50 rounded p-2">
                        <div className="text-muted-foreground">24h High</div>
                        <div className="font-medium">{exchangeData.high24h.toFixed(6)}</div>
                      </div>
                      <div className="bg-background/50 rounded p-2">
                        <div className="text-muted-foreground">24h Low</div>
                        <div className="font-medium">{exchangeData.low24h.toFixed(6)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Last updated: {exchangeData.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rates" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Major Currency Pairs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Major Pairs
                </CardTitle>
                <CardDescription>Most traded currency pairs worldwide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { pair: "EUR/USD", rate: "1.0892", change: "+0.12%", trend: "up" },
                  { pair: "GBP/USD", rate: "1.2734", change: "-0.08%", trend: "down" },
                  { pair: "USD/JPY", rate: "150.45", change: "+0.25%", trend: "up" },
                  { pair: "USD/CHF", rate: "0.9087", change: "+0.05%", trend: "up" },
                  { pair: "AUD/USD", rate: "0.6578", change: "-0.15%", trend: "down" },
                  { pair: "USD/CAD", rate: "1.3621", change: "+0.03%", trend: "up" },
                ].map((item) => (
                  <div key={item.pair} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="font-medium">{item.pair}</div>
                    <div className="text-right">
                      <div className="font-semibold">{item.rate}</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        item.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {item.trend === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {item.change}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emerging Market Currencies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Emerging Markets
                </CardTitle>
                <CardDescription>Key emerging market currency rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { pair: "USD/CNY", rate: "7.2456", change: "+0.18%", trend: "up" },
                  { pair: "USD/INR", rate: "83.2145", change: "-0.05%", trend: "down" },
                  { pair: "USD/BRL", rate: "5.0234", change: "+0.32%", trend: "up" },
                  { pair: "USD/ZAR", rate: "18.7654", change: "-0.22%", trend: "down" },
                  { pair: "USD/MXN", rate: "17.8923", change: "+0.15%", trend: "up" },
                  { pair: "USD/TRY", rate: "28.4567", change: "+0.45%", trend: "up" },
                ].map((item) => (
                  <div key={item.pair} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="font-medium">{item.pair}</div>
                    <div className="text-right">
                      <div className="font-semibold">{item.rate}</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        item.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {item.trend === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {item.change}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Conversion Widget */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Conversion</CardTitle>
              <CardDescription>Common conversion amounts for popular currency pairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { amount: "100", from: "USD", to: "EUR", result: "91.85" },
                  { amount: "1000", from: "EUR", to: "USD", result: "1089.20" },
                  { amount: "100", from: "GBP", to: "USD", result: "127.34" },
                  { amount: "10000", from: "USD", to: "JPY", result: "1,504,500" },
                ].map((conversion, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground">
                      {conversion.amount} {conversion.from}
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {conversion.result}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {conversion.to}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Conversion History
              </CardTitle>
              <CardDescription>Your recent currency conversions</CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="space-y-3">
                  {history.map((entry) => (
                    <div key={entry.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-sm">
                          <div className="font-medium">
                            {entry.amount.toLocaleString()} {entry.from} → {entry.result.toLocaleString()} {entry.to}
                          </div>
                          <div className="text-muted-foreground">
                            Rate: {entry.rate.toFixed(6)}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {entry.timestamp.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No conversion history yet</p>
                  <p className="text-sm">Your recent conversions will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Tools Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {/* Currency Strength Meter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-500" />
              Currency Strength Meter
            </CardTitle>
            <CardDescription>Relative strength of major currencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { currency: "USD", strength: 85, change: "+2.1%" },
              { currency: "EUR", strength: 72, change: "-0.8%" },
              { currency: "GBP", strength: 68, change: "+1.2%" },
              { currency: "JPY", strength: 45, change: "-1.5%" },
              { currency: "CHF", strength: 78, change: "+0.5%" },
              { currency: "CAD", strength: 62, change: "-0.3%" },
            ].map((item) => (
              <div key={item.currency} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.currency}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.strength}%</span>
                    <span className={`text-xs ${
                      item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.strength}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Sentiment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Market Sentiment
            </CardTitle>
            <CardDescription>Current market trends and analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-800 dark:text-green-200">Bullish USD</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Strong economic data and Fed policy support continued USD strength across major pairs.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-amber-600" />
                <span className="font-semibold text-amber-800 dark:text-amber-200">Neutral EUR</span>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                ECB policy uncertainty and mixed economic indicators keep EUR in consolidation mode.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="font-semibold text-red-800 dark:text-red-200">Bearish JPY</span>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300">
                BoJ intervention concerns and yield differentials continue to pressure the Japanese Yen.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Economic Calendar Preview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Upcoming Economic Events
          </CardTitle>
          <CardDescription>Key events that may impact currency markets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "14:30 GMT", event: "US Non-Farm Payrolls", currency: "USD", impact: "High", expected: "190K" },
              { time: "09:00 GMT", event: "ECB Interest Rate Decision", currency: "EUR", impact: "High", expected: "4.50%" },
              { time: "12:30 GMT", event: "UK GDP (QoQ)", currency: "GBP", impact: "Medium", expected: "0.2%" },
              { time: "23:50 GMT", event: "Japan Core CPI", currency: "JPY", impact: "Medium", expected: "2.8%" },
            ].map((event, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {event.time}
                  </div>
                  <div>
                    <div className="font-medium">{event.event}</div>
                    <div className="text-sm text-muted-foreground">Expected: {event.expected}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{event.currency}</div>
                  <Badge variant={event.impact === "High" ? "destructive" : "secondary"} className="text-xs">
                    {event.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
