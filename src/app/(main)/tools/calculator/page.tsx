import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TradingCalculatorTool } from "@/components/tools/TradingCalculatorTool";

export const metadata: Metadata = {
  title: "Trading Calculators | Forex Tools",
  description: "Access various trading calculators including pip value, margin, profit/loss, and more to help with your forex trading decisions.",
};

export default function TradingCalculatorPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 md:py-16">
      <div className="mb-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Tools
        </Link>
      </div>

      <div className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Trading Calculators
        </h1>
        <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Powerful calculators to help you make informed trading decisions and manage risk effectively.
        </p>
      </div>

      <TradingCalculatorTool />

      <div className="mt-12 space-y-6 text-sm text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">Using Trading Calculators Effectively</h2>
        <p>
          Forex trading requires precise calculations to manage risk and maximize profit potential. Use these calculators to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Determine accurate position sizes</strong> based on your account balance and risk tolerance</li>
          <li><strong>Calculate potential profit or loss</strong> before entering a trade</li>
          <li><strong>Understand pip values</strong> in your account currency for any trading pair</li>
          <li><strong>Manage risk consistently</strong> across different trading instruments</li>
        </ul>
        
        <h3 className="text-lg font-medium text-foreground mt-6">Risk Management Tips</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Never risk more than 1-2% of your trading account on a single trade</li>
          <li>Always use stop-loss orders to limit potential losses</li>
          <li>Consider the impact of leverage on your risk exposure</li>
          <li>Factor in spread costs and commissions when calculating potential profits</li>
        </ul>
      </div>
    </div>
  );
} 