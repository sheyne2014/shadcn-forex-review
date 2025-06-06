"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProfitLossCalculator() {
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
              <SelectTrigger id="position-type" className="bg-background">
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
              <SelectTrigger id="base-currency-pl" className="bg-background">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Major Currencies</SelectLabel>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                  <SelectItem value="JPY">JPY (Japanese Yen)</SelectItem>
                  <SelectItem value="CHF">CHF (Swiss Franc)</SelectItem>
                  <SelectItem value="AUD">AUD (Australian Dollar)</SelectItem>
                  <SelectItem value="CAD">CAD (Canadian Dollar)</SelectItem>
                  <SelectItem value="NZD">NZD (New Zealand Dollar)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Minor & Exotic</SelectLabel>
                  <SelectItem value="SGD">SGD (Singapore Dollar)</SelectItem>
                  <SelectItem value="HKD">HKD (Hong Kong Dollar)</SelectItem>
                  <SelectItem value="SEK">SEK (Swedish Krona)</SelectItem>
                  <SelectItem value="NOK">NOK (Norwegian Krone)</SelectItem>
                  <SelectItem value="DKK">DKK (Danish Krone)</SelectItem>
                  <SelectItem value="PLN">PLN (Polish Zloty)</SelectItem>
                  <SelectItem value="ZAR">ZAR (South African Rand)</SelectItem>
                  <SelectItem value="MXN">MXN (Mexican Peso)</SelectItem>
                  <SelectItem value="TRY">TRY (Turkish Lira)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Metals</SelectLabel>
                  <SelectItem value="XAU">XAU (Gold)</SelectItem>
                  <SelectItem value="XAG">XAG (Silver)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-currency-pl">Quote Currency</Label>
            <Select value={quoteCurrency} onValueChange={setQuoteCurrency}>
              <SelectTrigger id="quote-currency-pl" className="bg-background">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Major Currencies</SelectLabel>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                  <SelectItem value="JPY">JPY (Japanese Yen)</SelectItem>
                  <SelectItem value="CHF">CHF (Swiss Franc)</SelectItem>
                  <SelectItem value="AUD">AUD (Australian Dollar)</SelectItem>
                  <SelectItem value="CAD">CAD (Canadian Dollar)</SelectItem>
                  <SelectItem value="NZD">NZD (New Zealand Dollar)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Minor & Exotic</SelectLabel>
                  <SelectItem value="SGD">SGD (Singapore Dollar)</SelectItem>
                  <SelectItem value="HKD">HKD (Hong Kong Dollar)</SelectItem>
                  <SelectItem value="SEK">SEK (Swedish Krona)</SelectItem>
                  <SelectItem value="NOK">NOK (Norwegian Krone)</SelectItem>
                  <SelectItem value="DKK">DKK (Danish Krone)</SelectItem>
                  <SelectItem value="PLN">PLN (Polish Zloty)</SelectItem>
                  <SelectItem value="ZAR">ZAR (South African Rand)</SelectItem>
                  <SelectItem value="MXN">MXN (Mexican Peso)</SelectItem>
                  <SelectItem value="TRY">TRY (Turkish Lira)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-currency-pl">Account Currency</Label>
            <Select value={accountCurrency} onValueChange={setAccountCurrency}>
              <SelectTrigger id="account-currency-pl" className="bg-background">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Main Currencies</SelectLabel>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                  <SelectItem value="JPY">JPY (Japanese Yen)</SelectItem>
                  <SelectItem value="CHF">CHF (Swiss Franc)</SelectItem>
                  <SelectItem value="AUD">AUD (Australian Dollar)</SelectItem>
                  <SelectItem value="CAD">CAD (Canadian Dollar)</SelectItem>
                  <SelectItem value="NZD">NZD (New Zealand Dollar)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Additional Currencies</SelectLabel>
                  <SelectItem value="SGD">SGD (Singapore Dollar)</SelectItem>
                  <SelectItem value="HKD">HKD (Hong Kong Dollar)</SelectItem>
                  <SelectItem value="SEK">SEK (Swedish Krona)</SelectItem>
                  <SelectItem value="NOK">NOK (Norwegian Krone)</SelectItem>
                  <SelectItem value="DKK">DKK (Danish Krone)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculateProfitLoss} className="w-full mt-4">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Profit/Loss
        </Button>

        {profitLoss !== null && (
          <div className="mt-4 space-y-4">
            <div className={`p-4 rounded-lg text-center border ${
              profitLoss >= 0
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
                : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-200 dark:border-red-800'
            }`}>
              <div className="text-sm text-muted-foreground">
                {profitLoss >= 0 ? 'Profit' : 'Loss'}
              </div>
              <div className={`text-3xl font-bold ${
                profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {profitLoss >= 0 ? '+' : ''}{accountCurrency} {profitLoss.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                for {lotSize} lot{lotSize !== 1 ? 's' : ''} • {Math.abs(entryPrice - exitPrice).toFixed(5)} price movement
              </div>
            </div>

            {/* Additional Analysis */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-muted-foreground">Pips Gained/Lost</div>
                <div className="font-semibold">
                  {profitLoss >= 0 ? '+' : ''}{Math.abs((exitPrice - entryPrice) * 10000).toFixed(1)} pips
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-muted-foreground">Position Type</div>
                <div className="font-semibold capitalize">{positionType}</div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
              <strong>Trade Details:</strong> {positionType.toUpperCase()} {baseCurrency}/{quoteCurrency} |
              <strong> Entry:</strong> {entryPrice} |
              <strong> Exit:</strong> {exitPrice} |
              <strong> Size:</strong> {lotSize} lots
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}