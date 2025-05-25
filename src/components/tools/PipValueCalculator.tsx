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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PipValueCalculator() {
  const [lotSize, setLotSize] = useState(0.1);
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [quoteCurrency, setQuoteCurrency] = useState("USD");
  const [rate, setRate] = useState(1.1);
  const [pipValue, setPipValue] = useState(0);

  const calculatePipValue = () => {
    let value = 0;
    const contractSize = 100000; // Standard lot size

    // Determine pip size based on currency pair
    let pipSize = 0.0001; // Standard pip size
    if (quoteCurrency === "JPY") {
      pipSize = 0.01; // JPY pairs use 0.01 as pip size
    }

    if (quoteCurrency === accountCurrency) {
      // Direct quote: Account currency is the quote currency
      value = lotSize * contractSize * pipSize;
    } else if (baseCurrency === accountCurrency) {
      // Indirect quote: Account currency is the base currency
      value = (lotSize * contractSize * pipSize) / rate;
    } else {
      // Cross rate: Need conversion to account currency
      // This is simplified - in reality, you'd need the conversion rate
      value = lotSize * contractSize * pipSize;

      // Apply basic conversion estimates for common currencies
      if (accountCurrency === "EUR" && quoteCurrency === "USD") {
        value = value * 0.85; // Approximate EUR/USD rate
      } else if (accountCurrency === "GBP" && quoteCurrency === "USD") {
        value = value * 0.75; // Approximate GBP/USD rate
      } else if (accountCurrency === "USD" && quoteCurrency === "EUR") {
        value = value * 1.18; // Approximate USD/EUR rate
      }
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
              <SelectTrigger id="account-currency" className="bg-background">
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="base-currency">Base Currency</Label>
            <Select value={baseCurrency} onValueChange={setBaseCurrency}>
              <SelectTrigger id="base-currency" className="bg-background">
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
            <Label htmlFor="quote-currency">Quote Currency</Label>
            <Select value={quoteCurrency} onValueChange={setQuoteCurrency}>
              <SelectTrigger id="quote-currency" className="bg-background">
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
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg text-center border">
              <div className="text-sm text-muted-foreground">Pip Value</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {accountCurrency} {pipValue.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                per pip movement for {lotSize} lot{lotSize !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-muted-foreground">10 Pips</div>
                <div className="font-semibold">{accountCurrency} {(pipValue * 10).toFixed(2)}</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="text-muted-foreground">100 Pips</div>
                <div className="font-semibold">{accountCurrency} {(pipValue * 100).toFixed(2)}</div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
              <strong>Currency Pair:</strong> {baseCurrency}/{quoteCurrency} |
              <strong> Exchange Rate:</strong> {rate} |
              <strong> Pip Size:</strong> {quoteCurrency === "JPY" ? "0.01" : "0.0001"}
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