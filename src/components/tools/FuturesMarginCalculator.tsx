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

export function FuturesMarginCalculator() {
  const [contract, setContract] = useState("ES");
  const [price, setPrice] = useState(4500);
  const [contracts, setContracts] = useState(1);
  const [initialMargin, setInitialMargin] = useState<number | null>(null);
  const [maintenanceMargin, setMaintenanceMargin] = useState<number | null>(null);
  
  // Popular futures contracts with their specifications
  const futuresContracts = [
    { 
      value: "ES", 
      label: "E-mini S&P 500 (ES)", 
      multiplier: 50, 
      initialMarginPercent: 5, 
      maintenanceMarginPercent: 4.5,
      category: "Equity Index"
    },
    { 
      value: "NQ", 
      label: "E-mini NASDAQ-100 (NQ)", 
      multiplier: 20, 
      initialMarginPercent: 5.5, 
      maintenanceMarginPercent: 5,
      category: "Equity Index"
    },
    { 
      value: "YM", 
      label: "E-mini Dow Jones (YM)", 
      multiplier: 5, 
      initialMarginPercent: 5, 
      maintenanceMarginPercent: 4.5,
      category: "Equity Index"
    },
    { 
      value: "RTY", 
      label: "E-mini Russell 2000 (RTY)", 
      multiplier: 50, 
      initialMarginPercent: 5, 
      maintenanceMarginPercent: 4.5,
      category: "Equity Index"
    },
    { 
      value: "CL", 
      label: "Crude Oil (CL)", 
      multiplier: 1000, 
      initialMarginPercent: 6, 
      maintenanceMarginPercent: 5,
      category: "Energy"
    },
    { 
      value: "GC", 
      label: "Gold (GC)", 
      multiplier: 100, 
      initialMarginPercent: 5, 
      maintenanceMarginPercent: 4.5,
      category: "Metals"
    },
    { 
      value: "SI", 
      label: "Silver (SI)", 
      multiplier: 5000, 
      initialMarginPercent: 7, 
      maintenanceMarginPercent: 6,
      category: "Metals"
    },
    { 
      value: "ZB", 
      label: "U.S. Treasury Bond (ZB)", 
      multiplier: 1000, 
      initialMarginPercent: 3, 
      maintenanceMarginPercent: 2.5,
      category: "Interest Rates"
    },
    { 
      value: "6E", 
      label: "Euro FX (6E)", 
      multiplier: 125000, 
      initialMarginPercent: 2.5, 
      maintenanceMarginPercent: 2,
      category: "Currencies"
    },
    { 
      value: "6J", 
      label: "Japanese Yen (6J)", 
      multiplier: 12500000, 
      initialMarginPercent: 2.5, 
      maintenanceMarginPercent: 2,
      category: "Currencies"
    },
    { 
      value: "ZC", 
      label: "Corn (ZC)", 
      multiplier: 50, 
      initialMarginPercent: 5, 
      maintenanceMarginPercent: 4,
      category: "Agriculture"
    }
  ];
  
  const calculateMargin = () => {
    const selectedContract = futuresContracts.find(c => c.value === contract);
    
    if (!selectedContract) return;
    
    const contractValue = price * selectedContract.multiplier;
    const calculatedInitialMargin = contractValue * (selectedContract.initialMarginPercent / 100) * contracts;
    const calculatedMaintenanceMargin = contractValue * (selectedContract.maintenanceMarginPercent / 100) * contracts;
    
    setInitialMargin(calculatedInitialMargin);
    setMaintenanceMargin(calculatedMaintenanceMargin);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Futures Margin Calculator</CardTitle>
        <CardDescription>
          Calculate initial and maintenance margin requirements for futures contracts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="futures-contract">Futures Contract</Label>
          <Select value={contract} onValueChange={setContract}>
            <SelectTrigger id="futures-contract">
              <SelectValue placeholder="Select futures contract" />
            </SelectTrigger>
            <SelectContent className="max-h-[400px]">
              {Object.entries(
                futuresContracts.reduce((acc, contract) => {
                  if (!acc[contract.category]) {
                    acc[contract.category] = [];
                  }
                  acc[contract.category].push(contract);
                  return acc;
                }, {} as Record<string, typeof futuresContracts>)
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
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="futures-price">Current Price</Label>
            <Input
              id="futures-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min="0.01"
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contracts">Number of Contracts</Label>
            <Input
              id="contracts"
              type="number"
              value={contracts}
              onChange={(e) => setContracts(Number(e.target.value))}
              min="1"
              step="1"
            />
          </div>
        </div>
        
        <Button onClick={calculateMargin} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Margin Requirements
        </Button>
        
        {initialMargin !== null && maintenanceMargin !== null && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground">Initial Margin</div>
                  <div className="text-2xl font-bold">${initialMargin.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Maintenance Margin</div>
                  <div className="text-2xl font-bold">${maintenanceMargin.toFixed(2)}</div>
                </div>
              </div>
              <div className="text-center text-xs text-muted-foreground mt-1">
                <p>
                  Contract Value: ${(price * (futuresContracts.find(c => c.value === contract)?.multiplier || 0)).toFixed(2)} per contract
                </p>
                <p className="mt-1">
                  Margin Call Level: ${(initialMargin - maintenanceMargin).toFixed(2)} drawdown
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: Margin requirements vary by broker and can change based on market volatility. 
          Always verify with your broker&apos;s current specifications.
        </p>
      </CardFooter>
    </Card>
  );
} 