import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TradingCalculatorTool } from "@/components/tools/TradingCalculatorTool";

export const metadata: Metadata = {
  title: "Advanced Trading Calculators | Full Market Suite | Forex, Stocks, Crypto, Metals & More",
  description: "All-in-one trading calculator suite for multiple markets including Forex, Crypto, Metals, Indices, Options and Futures. Calculate pip value, position size, profit/loss, margin, swap costs and more.",
};

export default function TradingCalculatorPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-10 md:py-16">
      <div className="mb-8">
        <Link href="/tools" className="flex items-center text-muted-foreground text-sm hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all tools
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Trading Calculators</h1>
        <p className="text-lg text-muted-foreground">
          Our comprehensive suite of trading calculators covers all major markets including Forex, Stocks, 
          Cryptocurrencies, Futures, and Options. Use these tools to make informed trading decisions.
        </p>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg mb-8">
        <h2 className="text-lg font-medium mb-2">New Market Additions</h2>
        <p className="text-muted-foreground mb-2">
          We've expanded our calculator suite to include specialized tools for:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
          <li>Stock Position Calculator - For equity traders</li>
          <li>Futures Margin Calculator - With extensive contract categories</li>
          <li>Options Premium Calculator - Using Black-Scholes model with Greeks</li>
          <li>Crypto Funding Rate Calculator - For perpetual futures contracts</li>
          <li>Crypto Position Size Calculator - Optimized for cryptocurrency volatility</li>
        </ul>
      </div>
      
      <TradingCalculatorTool />
      
      <div className="mt-12 text-center">
        <h3 className="text-lg font-medium mb-2">About Our Calculators</h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          These calculators are for educational purposes only. Always verify calculations with your broker, 
          as specifications, costs, and market conditions may change. Risk management is a crucial aspect 
          of trading. Never risk more than you can afford to lose.
        </p>
      </div>
    </div>
  );
} 