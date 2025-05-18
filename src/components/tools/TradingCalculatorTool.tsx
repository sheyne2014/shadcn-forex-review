"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export function TradingCalculatorTool() {
  return (
    <Tabs defaultValue="pip-value" className="w-full">
      <TabsList className="flex flex-wrap justify-start mb-2 gap-2">
        <div className="bg-muted/30 p-1 rounded-md mb-2 mr-4">
          <span className="text-xs font-medium px-2">Forex & CFD</span>
        </div>
        <TabsTrigger value="pip-value" className="data-[state=active]:bg-primary">Pip Value</TabsTrigger>
        <TabsTrigger value="profit-loss" className="data-[state=active]:bg-primary">Profit/Loss</TabsTrigger>
        <TabsTrigger value="position-size" className="data-[state=active]:bg-primary">Position Size</TabsTrigger>
        <TabsTrigger value="margin" className="data-[state=active]:bg-primary">Margin</TabsTrigger>
        <TabsTrigger value="swap" className="data-[state=active]:bg-primary">Swap</TabsTrigger>
        
        <div className="bg-muted/30 p-1 rounded-md mb-2 mr-4 mt-2">
          <span className="text-xs font-medium px-2">Crypto</span>
        </div>
        <TabsTrigger value="crypto-position" className="data-[state=active]:bg-primary">Position Size</TabsTrigger>
        <TabsTrigger value="crypto-funding" className="data-[state=active]:bg-primary">Funding</TabsTrigger>
        <TabsTrigger value="crypto-converter" className="data-[state=active]:bg-primary">Converter</TabsTrigger>
        
        <div className="bg-muted/30 p-1 rounded-md mb-2 mr-4 mt-2">
          <span className="text-xs font-medium px-2">Other Markets</span>
        </div>
        <TabsTrigger value="stock-position" className="data-[state=active]:bg-primary">Stock Position</TabsTrigger>
        <TabsTrigger value="futures-margin" className="data-[state=active]:bg-primary">Futures Margin</TabsTrigger>
        <TabsTrigger value="options-premium" className="data-[state=active]:bg-primary">Options Premium</TabsTrigger>
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
      
      <TabsContent value="margin">
        <MarginCalculator />
      </TabsContent>
      
      <TabsContent value="swap">
        <SwapCalculator />
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
      
      <TabsContent value="futures-margin">
        <FuturesMarginCalculator />
      </TabsContent>
      
      <TabsContent value="options-premium">
        <OptionsPremiumCalculator />
      </TabsContent>
    </Tabs>
  );
} 