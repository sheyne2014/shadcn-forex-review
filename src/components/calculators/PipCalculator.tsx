"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, InfoIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Currency pair data with pip values
const CURRENCY_PAIRS = [
  { value: "EUR/USD", label: "EUR/USD", pipDecimal: 4, pipValue: 10 },
  { value: "GBP/USD", label: "GBP/USD", pipDecimal: 4, pipValue: 10 },
  { value: "USD/JPY", label: "USD/JPY", pipDecimal: 2, pipValue: 9.29 },
  { value: "USD/CHF", label: "USD/CHF", pipDecimal: 4, pipValue: 10.05 },
  { value: "USD/CAD", label: "USD/CAD", pipDecimal: 4, pipValue: 7.58 },
  { value: "AUD/USD", label: "AUD/USD", pipDecimal: 4, pipValue: 10 },
  { value: "NZD/USD", label: "NZD/USD", pipDecimal: 4, pipValue: 10 },
  { value: "EUR/GBP", label: "EUR/GBP", pipDecimal: 4, pipValue: 13.19 },
  { value: "EUR/JPY", label: "EUR/JPY", pipDecimal: 2, pipValue: 9.29 },
  { value: "GBP/JPY", label: "GBP/JPY", pipDecimal: 2, pipValue: 9.29 },
];

// Available lot sizes
const LOT_SIZES = [
  { value: "0.01", label: "Micro (0.01)" },
  { value: "0.1", label: "Mini (0.1)" },
  { value: "1", label: "Standard (1.0)" },
  { value: "10", label: "Large (10.0)" },
  { value: "100", label: "Institutional (100.0)" },
];

// Account currency options
const ACCOUNT_CURRENCIES = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
];

export function PipCalculator() {
  // Form state
  const [pair, setPair] = useState("EUR/USD");
  const [lotSize, setLotSize] = useState("1");
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [pips, setPips] = useState("10");
  const [customLotSize, setCustomLotSize] = useState("");
  const [isCustomLot, setIsCustomLot] = useState(false);
  
  // Results
  const [pipValue, setPipValue] = useState<number | null>(null);
  const [totalValue, setTotalValue] = useState<number | null>(null);
  
  // Calculate pip value when inputs change
  useEffect(() => {
    calculatePipValue();
  }, [pair, lotSize, customLotSize, accountCurrency, pips, isCustomLot]);
  
  const calculatePipValue = () => {
    // Find the currency pair data
    const currencyPair = CURRENCY_PAIRS.find(cp => cp.value === pair);
    
    if (!currencyPair) return;
    
    // Get the lot size value
    let actualLotSize = parseFloat(isCustomLot ? customLotSize : lotSize);
    
    // Validate inputs
    if (isNaN(actualLotSize) || actualLotSize <= 0) {
      setPipValue(null);
      setTotalValue(null);
      return;
    }
    
    // Calculate the pip value for a standard lot
    let pipValuePerStandardLot = currencyPair.pipValue;
    
    // Adjust for non-USD account currencies if needed
    // This is a simplified version - in a real calculator, you'd need real-time FX rates
    if (accountCurrency !== "USD") {
      // Adjust pip value based on account currency (simplified)
      if (accountCurrency === "EUR") pipValuePerStandardLot *= 1.1; // Sample EUR/USD rate
      if (accountCurrency === "GBP") pipValuePerStandardLot *= 1.25; // Sample GBP/USD rate
      if (accountCurrency === "AUD") pipValuePerStandardLot *= 0.65; // Sample AUD/USD rate
      if (accountCurrency === "JPY") pipValuePerStandardLot *= 0.0069; // Sample USD/JPY rate
      if (accountCurrency === "CAD") pipValuePerStandardLot *= 0.74; // Sample USD/CAD rate
    }
    
    // Calculate the pip value for the selected lot size
    const calculatedPipValue = pipValuePerStandardLot * actualLotSize;
    setPipValue(calculatedPipValue);
    
    // Calculate the total value based on number of pips
    const pipsCount = parseFloat(pips);
    if (!isNaN(pipsCount)) {
      setTotalValue(calculatedPipValue * pipsCount);
    } else {
      setTotalValue(null);
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-card border-b pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <CardTitle>Pip Value Calculator</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  This calculator helps you determine the value of pips in your account currency based on your position size. 
                  Essential for proper risk management in forex trading.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>
          Calculate the value of each pip for your forex trades
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="standard">Standard Options</TabsTrigger>
            <TabsTrigger value="advanced">Custom Lot Size</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pair">Currency Pair</Label>
                <Select value={pair} onValueChange={setPair}>
                  <SelectTrigger id="pair">
                    <SelectValue placeholder="Select currency pair" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCY_PAIRS.map((currencyPair) => (
                      <SelectItem key={currencyPair.value} value={currencyPair.value}>
                        {currencyPair.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="lotSize">Lot Size</Label>
                <Select value={lotSize} onValueChange={(value) => {
                  setLotSize(value);
                  setIsCustomLot(false);
                }}>
                  <SelectTrigger id="lotSize">
                    <SelectValue placeholder="Select lot size" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOT_SIZES.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pair-advanced">Currency Pair</Label>
                <Select value={pair} onValueChange={setPair}>
                  <SelectTrigger id="pair-advanced">
                    <SelectValue placeholder="Select currency pair" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCY_PAIRS.map((currencyPair) => (
                      <SelectItem key={currencyPair.value} value={currencyPair.value}>
                        {currencyPair.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="customLotSize">Custom Lot Size</Label>
                <Input
                  id="customLotSize"
                  placeholder="Enter lot size (e.g., 0.25)"
                  value={customLotSize}
                  onChange={(e) => {
                    setCustomLotSize(e.target.value);
                    setIsCustomLot(true);
                  }}
                />
              </div>
            </div>
          </TabsContent>
          
          <div className="grid gap-4 mt-6">
            <div className="grid gap-2">
              <Label htmlFor="accountCurrency">Account Currency</Label>
              <Select value={accountCurrency} onValueChange={setAccountCurrency}>
                <SelectTrigger id="accountCurrency">
                  <SelectValue placeholder="Select account currency" />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNT_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="pips">Number of Pips</Label>
              <Input
                id="pips"
                placeholder="Enter number of pips"
                value={pips}
                onChange={(e) => setPips(e.target.value)}
              />
            </div>
          </div>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex flex-col border-t pt-6">
        <div className="w-full grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm font-medium text-muted-foreground mb-1">Pip Value</p>
              <p className="text-2xl font-bold">
                {pipValue !== null ? `${accountCurrency} ${pipValue.toFixed(2)}` : 'N/A'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                per pip movement
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm font-medium text-muted-foreground mb-1">Total P/L</p>
              <p className={`text-2xl font-bold ${totalValue && totalValue > 0 ? 'text-green-500' : totalValue && totalValue < 0 ? 'text-red-500' : ''}`}>
                {totalValue !== null ? `${accountCurrency} ${totalValue.toFixed(2)}` : 'N/A'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                for {pips || '0'} pips
              </p>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground pt-2">
            Note: This calculator provides estimates based on standard pip values. Actual values may vary slightly depending on your broker and current market conditions.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
} 