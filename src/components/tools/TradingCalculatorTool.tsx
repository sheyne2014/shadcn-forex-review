"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  Calculator,
  PieChart,
  BarChart3,
  Target,
  Bitcoin,
  Activity,
  Percent,
  Shield
} from "lucide-react";

// Import our calculator components
import { StockPositionCalculator } from "./StockPositionCalculator";
import { FuturesMarginCalculator } from "./FuturesMarginCalculator";
import { OptionsPremiumCalculator } from "./OptionsPremiumCalculator";
import { CryptoPositionCalculator } from "./CryptoPositionCalculator";
import { CryptoFundingCalculator } from "./CryptoFundingCalculator";
import { CryptoConverter } from "./CryptoConverter";
import { PipValueCalculator } from "./PipValueCalculator";
import { ProfitLossCalculator } from "./ProfitLossCalculator";
import { PositionSizeCalculator } from "./PositionSizeCalculator";
import { MarginCalculator } from "./MarginCalculator";
import { SwapCalculator } from "./SwapCalculator";

// Import new enhanced calculators
import { DividendCalculator } from "./DividendCalculator";
import { CompoundInterestCalculator } from "./CompoundInterestCalculator";
import { DCACalculator } from "./DCACalculator";
import { StakingCalculator } from "./StakingCalculator";
import { OptionsGreeksCalculator } from "./OptionsGreeksCalculator";
import { CFDCalculator } from "./CFDCalculator";
import { ETFCalculator } from "./ETFCalculator";
import { VolatilityCalculator } from "./VolatilityCalculator";

interface CalculatorCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  calculators: {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    isNew?: boolean;
    isPro?: boolean;
  }[];
}

const calculatorCategories: CalculatorCategory[] = [
  {
    id: "forex",
    name: "Forex & CFDs",
    icon: TrendingUp,
    color: "text-green-500",
    calculators: [
      {
        id: "pip-value",
        name: "Pip Value",
        description: "Calculate pip value for any currency pair",
        icon: Target,
      },
      {
        id: "position-size",
        name: "Position Size",
        description: "Optimal position sizing based on risk",
        icon: Calculator,
      },
      {
        id: "profit-loss",
        name: "Profit/Loss",
        description: "Calculate potential profits and losses",
        icon: BarChart3,
      },
      {
        id: "margin",
        name: "Margin",
        description: "Required margin calculations",
        icon: Shield,
      },
      {
        id: "swap",
        name: "Swap",
        description: "Overnight swap cost calculations",
        icon: Percent,
      },
      {
        id: "cfd",
        name: "CFD Calculator",
        description: "CFD margin and overnight fees",
        icon: BarChart3,
        isNew: true,
      },
    ],
  },
  {
    id: "stocks",
    name: "Stocks & ETFs",
    icon: BarChart3,
    color: "text-blue-500",
    calculators: [
      {
        id: "stock-position",
        name: "Stock Position",
        description: "Stock position sizing calculator",
        icon: PieChart,
      },
      {
        id: "dividend",
        name: "Dividend Yield",
        description: "Calculate dividend yields and income",
        icon: TrendingUp,
        isNew: true,
      },
      {
        id: "compound-interest",
        name: "Compound Interest",
        description: "Long-term investment growth calculator",
        icon: Calculator,
        isNew: true,
      },
      {
        id: "etf",
        name: "ETF Calculator",
        description: "ETF expense ratios and allocation",
        icon: PieChart,
        isNew: true,
      },
    ],
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    icon: Bitcoin,
    color: "text-orange-500",
    calculators: [
      {
        id: "crypto-position",
        name: "Crypto Position",
        description: "Crypto position sizing with leverage",
        icon: Bitcoin,
      },
      {
        id: "crypto-funding",
        name: "Funding Rate",
        description: "Perpetual futures funding costs",
        icon: Percent,
      },
      {
        id: "crypto-converter",
        name: "Converter",
        description: "Cryptocurrency conversion tool",
        icon: Activity,
      },
      {
        id: "dca",
        name: "DCA Calculator",
        description: "Dollar-cost averaging strategy",
        icon: TrendingUp,
        isNew: true,
      },
      {
        id: "staking",
        name: "Staking Rewards",
        description: "Calculate staking yields and rewards",
        icon: Percent,
        isNew: true,
      },
    ],
  },
  {
    id: "options",
    name: "Options & Derivatives",
    icon: Activity,
    color: "text-purple-500",
    calculators: [
      {
        id: "options-premium",
        name: "Options Premium",
        description: "Black-Scholes option pricing",
        icon: Calculator,
      },
      {
        id: "options-greeks",
        name: "Options Greeks",
        description: "Delta, Gamma, Theta, Vega calculations",
        icon: Activity,
        isNew: true,
        isPro: true,
      },
      {
        id: "volatility",
        name: "Volatility",
        description: "Implied and historical volatility",
        icon: BarChart3,
        isNew: true,
        isPro: true,
      },
      {
        id: "futures-margin",
        name: "Futures Margin",
        description: "Futures margin requirements",
        icon: Shield,
      },
    ],
  },
];

export function TradingCalculatorTool() {
  const [activeCategory, setActiveCategory] = useState("forex");
  const [activeCalculator, setActiveCalculator] = useState("pip-value");

  const currentCategory = calculatorCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {calculatorCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                activeCategory === category.id
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => {
                setActiveCategory(category.id);
                setActiveCalculator(category.calculators[0].id);
              }}
            >
              <CardContent className="p-4 text-center">
                <Icon className={`h-8 w-8 mx-auto mb-2 ${category.color}`} />
                <h3 className="font-semibold text-sm">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.calculators.length} tools
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Calculator Selection */}
      {currentCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCategory.calculators.map((calculator) => {
            const Icon = calculator.icon;
            return (
              <Card
                key={calculator.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  activeCalculator === calculator.id
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-muted/30'
                }`}
                onClick={() => setActiveCalculator(calculator.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Icon className="h-6 w-6 text-primary" />
                    <div className="flex gap-1">
                      {calculator.isNew && (
                        <Badge variant="secondary" className="text-xs">New</Badge>
                      )}
                      {calculator.isPro && (
                        <Badge variant="outline" className="text-xs">Pro</Badge>
                      )}
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{calculator.name}</h4>
                  <p className="text-xs text-muted-foreground">{calculator.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Calculator Content */}
      <div className="mt-8">
        <Tabs value={activeCalculator} onValueChange={setActiveCalculator} className="w-full">
          <TabsContent value="pip-value">
            <PipValueCalculator />
          </TabsContent>

          <TabsContent value="profit-loss">
            <ProfitLossCalculator />
          </TabsContent>

          <TabsContent value="position-size">
            <PositionSizeCalculator />
          </TabsContent>

          <TabsContent value="margin">
            <MarginCalculator />
          </TabsContent>

          <TabsContent value="swap">
            <SwapCalculator />
          </TabsContent>

          <TabsContent value="cfd">
            <CFDCalculator />
          </TabsContent>

          <TabsContent value="crypto-position">
            <CryptoPositionCalculator />
          </TabsContent>

          <TabsContent value="crypto-funding">
            <CryptoFundingCalculator />
          </TabsContent>

          <TabsContent value="crypto-converter">
            <CryptoConverter />
          </TabsContent>

          <TabsContent value="stock-position">
            <StockPositionCalculator />
          </TabsContent>

          <TabsContent value="dividend">
            <DividendCalculator />
          </TabsContent>

          <TabsContent value="compound-interest">
            <CompoundInterestCalculator />
          </TabsContent>

          <TabsContent value="etf">
            <ETFCalculator />
          </TabsContent>

          <TabsContent value="dca">
            <DCACalculator />
          </TabsContent>

          <TabsContent value="staking">
            <StakingCalculator />
          </TabsContent>

          <TabsContent value="futures-margin">
            <FuturesMarginCalculator />
          </TabsContent>

          <TabsContent value="options-premium">
            <OptionsPremiumCalculator />
          </TabsContent>

          <TabsContent value="options-greeks">
            <OptionsGreeksCalculator />
          </TabsContent>

          <TabsContent value="volatility">
            <VolatilityCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}