"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, LineChart, TrendingUp, Download, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function CFDCalculator() {
  const [instrumentType, setInstrumentType] = useState("forex");
  const [positionSize, setPositionSize] = useState(10000);
  const [leverage, setLeverage] = useState(100);
  const [entryPrice, setEntryPrice] = useState(1.2000);
  const [exitPrice, setExitPrice] = useState(1.2050);
  const [positionType, setPositionType] = useState("long");
  const [holdingDays, setHoldingDays] = useState(5);
  const [spread, setSpread] = useState(1.5);
  const [commission, setCommission] = useState(0);
  const [swapRate, setSwapRate] = useState(-2.5);
  
  const [results, setResults] = useState<{
    requiredMargin: number;
    grossProfit: number;
    spreadCost: number;
    commissionCost: number;
    swapCost: number;
    netProfit: number;
    returnOnMargin: number;
    totalCosts: number;
    marginUtilization: number;
  } | null>(null);

  const instrumentTypes = {
    forex: { 
      name: "Forex", 
      defaultLeverage: 100, 
      defaultSpread: 1.5, 
      defaultSwap: -2.5,
      pipValue: 1,
      pipSize: 0.0001
    },
    indices: { 
      name: "Stock Indices", 
      defaultLeverage: 20, 
      defaultSpread: 0.5, 
      defaultSwap: -1.8,
      pipValue: 1,
      pipSize: 1
    },
    commodities: { 
      name: "Commodities", 
      defaultLeverage: 10, 
      defaultSpread: 3.0, 
      defaultSwap: -3.2,
      pipValue: 1,
      pipSize: 0.01
    },
    stocks: { 
      name: "Individual Stocks", 
      defaultLeverage: 5, 
      defaultSpread: 0.1, 
      defaultSwap: -4.5,
      pipValue: 1,
      pipSize: 0.01
    },
    crypto: { 
      name: "Cryptocurrencies", 
      defaultLeverage: 2, 
      defaultSpread: 50, 
      defaultSwap: -15.0,
      pipValue: 1,
      pipSize: 1
    },
  };

  const calculateCFD = () => {
    const instrument = instrumentTypes[instrumentType as keyof typeof instrumentTypes];
    
    // Calculate required margin
    const requiredMargin = positionSize / leverage;
    
    // Calculate gross profit/loss
    const priceDifference = positionType === "long" 
      ? exitPrice - entryPrice 
      : entryPrice - exitPrice;
    const grossProfit = (priceDifference / instrument.pipSize) * instrument.pipValue * (positionSize / 10000);
    
    // Calculate spread cost
    const spreadCost = (spread * instrument.pipValue * (positionSize / 10000));
    
    // Calculate commission cost
    const commissionCost = (commission / 100) * positionSize;
    
    // Calculate swap/overnight cost
    const swapCost = (swapRate / 365) * holdingDays * requiredMargin;
    
    // Calculate total costs
    const totalCosts = spreadCost + commissionCost + Math.abs(swapCost);
    
    // Calculate net profit
    const netProfit = grossProfit - totalCosts;
    
    // Calculate return on margin
    const returnOnMargin = (netProfit / requiredMargin) * 100;
    
    // Calculate margin utilization
    const marginUtilization = (requiredMargin / 10000) * 100; // Assuming $10,000 account
    
    setResults({
      requiredMargin,
      grossProfit,
      spreadCost,
      commissionCost,
      swapCost,
      netProfit,
      returnOnMargin,
      totalCosts,
      marginUtilization,
    });
  };

  // Update defaults when instrument type changes
  useEffect(() => {
    const instrument = instrumentTypes[instrumentType as keyof typeof instrumentTypes];
    setLeverage(instrument.defaultLeverage);
    setSpread(instrument.defaultSpread);
    setSwapRate(instrument.defaultSwap);
    
    // Adjust default prices based on instrument
    if (instrumentType === "forex") {
      setEntryPrice(1.2000);
      setExitPrice(1.2050);
    } else if (instrumentType === "indices") {
      setEntryPrice(4000);
      setExitPrice(4020);
    } else if (instrumentType === "commodities") {
      setEntryPrice(1800);
      setExitPrice(1820);
    } else if (instrumentType === "stocks") {
      setEntryPrice(150);
      setExitPrice(152);
    } else if (instrumentType === "crypto") {
      setEntryPrice(45000);
      setExitPrice(46000);
    }
  }, [instrumentType]);

  useEffect(() => {
    calculateCFD();
  }, [instrumentType, positionSize, leverage, entryPrice, exitPrice, positionType, holdingDays, spread, commission, swapRate]);

  const exportResults = () => {
    if (!results) return;
    
    const instrument = instrumentTypes[instrumentType as keyof typeof instrumentTypes];
    const data = {
      tradeDetails: {
        "Instrument Type": instrument.name,
        "Position Size": `$${positionSize.toLocaleString()}`,
        "Leverage": `${leverage}:1`,
        "Entry Price": entryPrice,
        "Exit Price": exitPrice,
        "Position Type": positionType,
        "Holding Period": `${holdingDays} days`,
      },
      costs: {
        "Required Margin": `$${results.requiredMargin.toFixed(2)}`,
        "Spread Cost": `$${results.spreadCost.toFixed(2)}`,
        "Commission": `$${results.commissionCost.toFixed(2)}`,
        "Swap Cost": `$${results.swapCost.toFixed(2)}`,
        "Total Costs": `$${results.totalCosts.toFixed(2)}`,
      },
      results: {
        "Gross Profit": `$${results.grossProfit.toFixed(2)}`,
        "Net Profit": `$${results.netProfit.toFixed(2)}`,
        "Return on Margin": `${results.returnOnMargin.toFixed(2)}%`,
        "Margin Utilization": `${results.marginUtilization.toFixed(2)}%`,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cfd-${instrumentType}-calculation.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-indigo-500" />
          CFD Calculator
          <Badge variant="secondary" className="ml-2">New</Badge>
        </CardTitle>
        <CardDescription>
          Calculate CFD margin requirements, costs, and profit/loss scenarios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instrument-type">Instrument Type</Label>
            <Select value={instrumentType} onValueChange={setInstrumentType}>
              <SelectTrigger id="instrument-type" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(instrumentTypes).map(([key, instrument]) => (
                  <SelectItem key={key} value={key}>
                    {instrument.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position-size">Position Size ($)</Label>
            <Input
              id="position-size"
              type="number"
              value={positionSize}
              onChange={(e) => setPositionSize(Number(e.target.value))}
              min="100"
              step="100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="leverage">Leverage (1:X)</Label>
            <Input
              id="leverage"
              type="number"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              min="1"
              max="500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="entry-price">Entry Price</Label>
            <Input
              id="entry-price"
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              min="0.0001"
              step="0.0001"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exit-price">Exit Price</Label>
            <Input
              id="exit-price"
              type="number"
              value={exitPrice}
              onChange={(e) => setExitPrice(Number(e.target.value))}
              min="0.0001"
              step="0.0001"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position-type">Position Type</Label>
            <Select value={positionType} onValueChange={setPositionType}>
              <SelectTrigger id="position-type" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">Long (Buy)</SelectItem>
                <SelectItem value="short">Short (Sell)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="holding-days">Holding Period (Days)</Label>
            <Input
              id="holding-days"
              type="number"
              value={holdingDays}
              onChange={(e) => setHoldingDays(Number(e.target.value))}
              min="0"
              max="365"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="spread">Spread (pips/points)</Label>
            <Input
              id="spread"
              type="number"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              min="0"
              step="0.1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="commission">Commission (%)</Label>
            <Input
              id="commission"
              type="number"
              value={commission}
              onChange={(e) => setCommission(Number(e.target.value))}
              min="0"
              max="5"
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="swap-rate">Swap Rate (% per year)</Label>
            <Input
              id="swap-rate"
              type="number"
              value={swapRate}
              onChange={(e) => setSwapRate(Number(e.target.value))}
              min="-50"
              max="50"
              step="0.1"
            />
          </div>
        </div>

        <Button onClick={calculateCFD} className="w-full">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate CFD Trade
        </Button>

        {results && (
          <div className="space-y-6">
            <Separator />
            
            {/* Margin and Costs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Required Margin</div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  ${results.requiredMargin.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Total Costs</div>
                <div className="text-xl font-bold text-red-600 dark:text-red-400">
                  ${results.totalCosts.toFixed(2)}
                </div>
              </div>
              
              <div className={`p-4 rounded-lg text-center ${
                results.netProfit >= 0 
                  ? 'bg-green-50 dark:bg-green-900/20' 
                  : 'bg-red-50 dark:bg-red-900/20'
              }`}>
                <div className="text-sm text-muted-foreground">Net Profit</div>
                <div className={`text-xl font-bold ${
                  results.netProfit >= 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  ${results.netProfit.toFixed(2)}
                </div>
              </div>
              
              <div className={`p-4 rounded-lg text-center ${
                results.returnOnMargin >= 0 
                  ? 'bg-green-50 dark:bg-green-900/20' 
                  : 'bg-red-50 dark:bg-red-900/20'
              }`}>
                <div className="text-sm text-muted-foreground">Return on Margin</div>
                <div className={`text-xl font-bold ${
                  results.returnOnMargin >= 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {results.returnOnMargin.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Cost Breakdown
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Spread Cost</div>
                  <div className="font-semibold">${results.spreadCost.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Commission</div>
                  <div className="font-semibold">${results.commissionCost.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Swap Cost</div>
                  <div className="font-semibold">${results.swapCost.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Gross Profit</div>
                  <div className="font-semibold">${results.grossProfit.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Risk Warning */}
            {results.marginUtilization > 50 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-semibold">High Risk Warning</span>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  This position uses {results.marginUtilization.toFixed(1)}% of your account margin. 
                  High leverage increases both potential profits and losses.
                </p>
              </div>
            )}

            <Button onClick={exportResults} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export CFD Analysis
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: CFD trading involves significant risk of loss due to leverage. Costs and conditions vary by broker. 
          This calculator provides estimates for educational purposes only.
        </p>
      </CardFooter>
    </Card>
  );
}
