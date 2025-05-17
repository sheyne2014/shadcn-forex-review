"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calculator, Percent, ArrowRightLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TradingCalculatorTool() {
  return (
    <Tabs defaultValue="pip-value" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="pip-value">Pip Value</TabsTrigger>
        <TabsTrigger value="profit-loss">Profit/Loss</TabsTrigger>
        <TabsTrigger value="position-size">Position Size</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pip-value">
        <PipValueCalculator />
      </TabsContent>
      
      <TabsContent value="profit-loss">
        <ProfitLossCalculator />
      </TabsContent>
      
      <TabsContent value="position-size">
        <PositionSizeCalculator />
      </TabsContent>
    </Tabs>
  );
}

// Pip Value Calculator
function PipValueCalculator() {
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

// Profit/Loss Calculator
function ProfitLossCalculator() {
  const [positionType, setPositionType] = useState("buy");
  const [entryPrice, setEntryPrice] = useState(1.1);
  const [exitPrice, setExitPrice] = useState(1.15);
  const [lotSize, setLotSize] = useState(0.1);
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [quoteCurrency, setQuoteCurrency] = useState("USD");
  const [profitLoss, setProfitLoss] = useState<number | null>(null);
  
  const calculateProfitLoss = () => {
    const direction = positionType === "buy" ? 1 : -1;
    const priceDifference = (exitPrice - entryPrice) * direction;
    
    // Standard calculation for major pairs where quote is the same as account currency
    const pipsDifference = priceDifference * 10000;
    const profitLossValue = lotSize * 100000 * priceDifference;
    
    setProfitLoss(profitLossValue);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit/Loss Calculator</CardTitle>
        <CardDescription>
          Calculate potential profit or loss for your forex trades
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position-type">Position Type</Label>
            <Select value={positionType} onValueChange={setPositionType}>
              <SelectTrigger id="position-type">
                <SelectValue placeholder="Select position type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy (Long)</SelectItem>
                <SelectItem value="sell">Sell (Short)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lot-size-pl">Lot Size</Label>
            <Input
              id="lot-size-pl"
              type="number"
              value={lotSize}
              onChange={(e) => setLotSize(Number(e.target.value))}
              step="0.01"
              min="0.01"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entry-price">Entry Price</Label>
            <Input
              id="entry-price"
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              step="0.0001"
              min="0.0001"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exit-price">Exit Price</Label>
            <Input
              id="exit-price"
              type="number"
              value={exitPrice}
              onChange={(e) => setExitPrice(Number(e.target.value))}
              step="0.0001"
              min="0.0001"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="base-currency-pl">Base Currency</Label>
            <Select value={baseCurrency} onValueChange={setBaseCurrency}>
              <SelectTrigger id="base-currency-pl">
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
            <Label htmlFor="quote-currency-pl">Quote Currency</Label>
            <Select value={quoteCurrency} onValueChange={setQuoteCurrency}>
              <SelectTrigger id="quote-currency-pl">
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
            <Label htmlFor="account-currency-pl">Account Currency</Label>
            <Select value={accountCurrency} onValueChange={setAccountCurrency}>
              <SelectTrigger id="account-currency-pl">
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
        
        <Button onClick={calculateProfitLoss} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Profit/Loss
        </Button>
        
        {profitLoss !== null && (
          <div className={`mt-4 p-4 rounded-md text-center ${profitLoss >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <div className="text-sm text-muted-foreground">Profit/Loss</div>
            <div className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {accountCurrency} {profitLoss.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.abs((exitPrice - entryPrice) * 10000).toFixed(1)} pips {profitLoss >= 0 ? 'profit' : 'loss'}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Position Size Calculator
function PositionSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(1.1);
  const [stopLoss, setStopLoss] = useState(1.09);
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [positionSize, setPositionSize] = useState<number | null>(null);
  
  const calculatePositionSize = () => {
    // Calculate pips at risk
    const pipsAtRisk = Math.abs((entryPrice - stopLoss) * 10000);
    
    // Calculate dollar risk
    const dollarRisk = accountBalance * (riskPercent / 100);
    
    // Calculate position size in lots
    const standardLotValue = 10; // $10 per pip for 1 standard lot (simplified)
    const calculatedLots = dollarRisk / (pipsAtRisk * standardLotValue);
    
    setPositionSize(calculatedLots);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Position Size Calculator</CardTitle>
        <CardDescription>
          Calculate optimal position size based on your risk tolerance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="account-balance">Account Balance</Label>
            <div className="relative">
              <Input
                id="account-balance"
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(Number(e.target.value))}
                min="0"
                className="pl-8"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                $
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="risk-percent">Risk Percentage</Label>
            <div className="relative">
              <Input
                id="risk-percent"
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
            <Label htmlFor="entry-price-ps">Entry Price</Label>
            <Input
              id="entry-price-ps"
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              step="0.0001"
              min="0.0001"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stop-loss">Stop Loss</Label>
            <Input
              id="stop-loss"
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value))}
              step="0.0001"
              min="0.0001"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="account-currency-ps">Account Currency</Label>
          <Select value={accountCurrency} onValueChange={setAccountCurrency}>
            <SelectTrigger id="account-currency-ps">
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
        
        <Button onClick={calculatePositionSize} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Position Size
        </Button>
        
        {positionSize !== null && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Recommended Position Size</div>
                <div className="text-2xl font-bold">{positionSize.toFixed(2)} Lots</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Dollar Risk</div>
                <div className="text-2xl font-bold">${(accountBalance * riskPercent / 100).toFixed(2)}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-3 text-center">
              Stop Loss Distance: {Math.abs((entryPrice - stopLoss) * 10000).toFixed(1)} pips
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: This calculator assumes a standard pip value and doesn't account for leverage limitations. Always verify with your broker's specifications.
        </p>
      </CardFooter>
    </Card>
  );
} 