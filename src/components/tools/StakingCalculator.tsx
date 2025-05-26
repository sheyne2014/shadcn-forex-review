"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Coins, TrendingUp, Download, Percent } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function StakingCalculator() {
  const [stakingAmount, setStakingAmount] = useState(1000);
  const [cryptocurrency, setCryptocurrency] = useState("ethereum");
  const [stakingAPY, setStakingAPY] = useState(5.2);
  const [stakingPeriod, setStakingPeriod] = useState(12); // months
  const [compoundFrequency, setCompoundFrequency] = useState("daily");
  const [tokenPrice, setTokenPrice] = useState(2000);
  const [priceAppreciation, setPriceAppreciation] = useState(10); // annual %
  const [validatorFee, setValidatorFee] = useState(10); // percentage

  const [results, setResults] = useState<{
    totalRewards: number;
    totalValue: number;
    effectiveAPY: number;
    monthlyRewards: number;
    tokensEarned: number;
    priceAppreciationGains: number;
    netAPY: number;
    monthlyBreakdown: Array<{
      month: number;
      rewards: number;
      totalTokens: number;
      value: number;
    }>;
  } | null>(null);

  const cryptocurrencies = {
    ethereum: { symbol: "ETH", name: "Ethereum", defaultAPY: 5.2 },
    cardano: { symbol: "ADA", name: "Cardano", defaultAPY: 4.8 },
    solana: { symbol: "SOL", name: "Solana", defaultAPY: 7.1 },
    polkadot: { symbol: "DOT", name: "Polkadot", defaultAPY: 12.5 },
    cosmos: { symbol: "ATOM", name: "Cosmos", defaultAPY: 19.3 },
    tezos: { symbol: "XTZ", name: "Tezos", defaultAPY: 6.0 },
  };

  const compoundFrequencies = {
    daily: 365,
    weekly: 52,
    monthly: 12,
    quarterly: 4,
    annually: 1,
  };

  const calculateStaking = () => {
    const initialTokens = stakingAmount / tokenPrice;
    const netAPY = (stakingAPY * (100 - validatorFee)) / 100; // After validator fees
    const compoundingPeriods = compoundFrequencies[compoundFrequency as keyof typeof compoundFrequencies];
    const years = stakingPeriod / 12;

    // Calculate compound staking rewards
    const finalTokens = initialTokens * Math.pow(1 + netAPY / 100 / compoundingPeriods, compoundingPeriods * years);
    const tokensEarned = finalTokens - initialTokens;

    // Calculate price appreciation
    const finalTokenPrice = tokenPrice * Math.pow(1 + priceAppreciation / 100, years);
    const priceAppreciationGains = initialTokens * (finalTokenPrice - tokenPrice);

    // Calculate total value
    const totalValue = finalTokens * finalTokenPrice;
    const totalRewards = tokensEarned * finalTokenPrice;

    // Calculate effective APY (including price appreciation)
    const totalReturn = totalValue - stakingAmount;
    const effectiveAPY = (Math.pow(totalValue / stakingAmount, 1 / years) - 1) * 100;

    // Monthly breakdown
    const monthlyBreakdown: Array<{
      month: number;
      rewards: number;
      totalTokens: number;
      value: number;
    }> = [];
    let currentTokens = initialTokens;
    let previousTokens = initialTokens;

    for (let month = 1; month <= stakingPeriod; month++) {
      const monthlyGrowthRate = netAPY / 100 / 12;
      currentTokens *= (1 + monthlyGrowthRate);
      const monthRewards: number = currentTokens - previousTokens;
      const currentPrice = tokenPrice * Math.pow(1 + priceAppreciation / 100, month / 12);

      monthlyBreakdown.push({
        month,
        rewards: monthRewards * currentPrice,
        totalTokens: currentTokens,
        value: currentTokens * currentPrice,
      });

      previousTokens = currentTokens;
    }

    const monthlyRewards = totalRewards / stakingPeriod;

    setResults({
      totalRewards,
      totalValue,
      effectiveAPY,
      monthlyRewards,
      tokensEarned,
      priceAppreciationGains,
      netAPY,
      monthlyBreakdown,
    });
  };

  useEffect(() => {
    calculateStaking();
  }, [stakingAmount, cryptocurrency, stakingAPY, stakingPeriod, compoundFrequency, tokenPrice, priceAppreciation, validatorFee]);

  // Update APY when cryptocurrency changes
  useEffect(() => {
    const crypto = cryptocurrencies[cryptocurrency as keyof typeof cryptocurrencies];
    if (crypto) {
      setStakingAPY(crypto.defaultAPY);
    }
  }, [cryptocurrency]);

  const exportResults = () => {
    if (!results) return;

    const crypto = cryptocurrencies[cryptocurrency as keyof typeof cryptocurrencies];
    const data = {
      stakingDetails: {
        "Cryptocurrency": `${crypto.name} (${crypto.symbol})`,
        "Staking Amount": `$${stakingAmount.toLocaleString()}`,
        "Staking APY": `${stakingAPY}%`,
        "Staking Period": `${stakingPeriod} months`,
        "Token Price": `$${tokenPrice}`,
        "Validator Fee": `${validatorFee}%`,
        "Net APY": `${results.netAPY.toFixed(2)}%`,
      },
      results: {
        "Total Rewards": `$${results.totalRewards.toLocaleString()}`,
        "Total Value": `$${results.totalValue.toLocaleString()}`,
        "Effective APY": `${results.effectiveAPY.toFixed(2)}%`,
        "Tokens Earned": `${results.tokensEarned.toFixed(6)} ${crypto.symbol}`,
        "Monthly Rewards": `$${results.monthlyRewards.toFixed(2)}`,
      },
      monthlyBreakdown: results.monthlyBreakdown,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `staking-${cryptocurrency}-calculation.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedCrypto = cryptocurrencies[cryptocurrency as keyof typeof cryptocurrencies];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-purple-500" />
          Staking Rewards Calculator
          <Badge variant="secondary" className="ml-2">New</Badge>
        </CardTitle>
        <CardDescription>
          Calculate staking rewards and yields for proof-of-stake cryptocurrencies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="staking-amount">Staking Amount ($)</Label>
            <Input
              id="staking-amount"
              type="number"
              value={stakingAmount}
              onChange={(e) => setStakingAmount(Number(e.target.value))}
              min="1"
              step="100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
            <Select value={cryptocurrency} onValueChange={setCryptocurrency}>
              <SelectTrigger id="cryptocurrency" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(cryptocurrencies).map(([key, crypto]) => (
                  <SelectItem key={key} value={key}>
                    {crypto.name} ({crypto.symbol}) - {crypto.defaultAPY}% APY
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="staking-apy">Staking APY (%)</Label>
            <Input
              id="staking-apy"
              type="number"
              value={stakingAPY}
              onChange={(e) => setStakingAPY(Number(e.target.value))}
              min="0"
              max="50"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="staking-period">Staking Period (Months)</Label>
            <Input
              id="staking-period"
              type="number"
              value={stakingPeriod}
              onChange={(e) => setStakingPeriod(Number(e.target.value))}
              min="1"
              max="60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compound-frequency">Compound Frequency</Label>
            <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
              <SelectTrigger id="compound-frequency" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="token-price">Token Price ($)</Label>
            <Input
              id="token-price"
              type="number"
              value={tokenPrice}
              onChange={(e) => setTokenPrice(Number(e.target.value))}
              min="0.01"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price-appreciation">Annual Price Appreciation (%)</Label>
            <Input
              id="price-appreciation"
              type="number"
              value={priceAppreciation}
              onChange={(e) => setPriceAppreciation(Number(e.target.value))}
              min="-50"
              max="100"
              step="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="validator-fee">Validator Fee (%)</Label>
            <Input
              id="validator-fee"
              type="number"
              value={validatorFee}
              onChange={(e) => setValidatorFee(Number(e.target.value))}
              min="0"
              max="25"
              step="0.5"
            />
          </div>
        </div>

        <Button onClick={calculateStaking} className="w-full">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Staking Rewards
        </Button>

        {results && (
          <div className="space-y-6">
            <Separator />

            {/* Summary Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Total Rewards</div>
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  ${results.totalRewards.toLocaleString()}
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Total Value</div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  ${results.totalValue.toLocaleString()}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Effective APY</div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {results.effectiveAPY.toFixed(2)}%
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Monthly Rewards</div>
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  ${results.monthlyRewards.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center">
                <Percent className="h-4 w-4 mr-2" />
                Staking Details
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Tokens Earned</div>
                  <div className="font-semibold">{results.tokensEarned.toFixed(6)} {selectedCrypto.symbol}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Net APY</div>
                  <div className="font-semibold">{results.netAPY.toFixed(2)}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Price Gains</div>
                  <div className="font-semibold">${results.priceAppreciationGains.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Validator Fee</div>
                  <div className="font-semibold">{validatorFee}%</div>
                </div>
              </div>
            </div>

            {/* Monthly Progress */}
            <div className="bg-muted/30 p-4 rounded-lg max-h-60 overflow-y-auto">
              <h4 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Monthly Progress
              </h4>
              <div className="space-y-2">
                {results.monthlyBreakdown.slice(-6).map((month) => (
                  <div key={month.month} className="flex justify-between items-center text-sm border-b pb-2">
                    <span className="font-medium">Month {month.month}</span>
                    <div className="text-right">
                      <div className="font-semibold">${month.value.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {month.totalTokens.toFixed(4)} {selectedCrypto.symbol}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={exportResults} variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Staking Results
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        <p>
          Note: Staking rewards and APY rates can vary significantly based on network conditions,
          validator performance, and market factors. This calculator provides estimates for educational purposes only.
        </p>
      </CardFooter>
    </Card>
  );
}
