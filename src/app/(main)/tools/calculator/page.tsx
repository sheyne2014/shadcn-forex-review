import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator, TrendingUp, Shield, BarChart3 } from "lucide-react";
import { TradingCalculatorTool } from "@/components/tools/TradingCalculatorTool";

export const metadata: Metadata = {
  title: "Professional Trading Calculators | Risk Management Tools | 2024",
  description: "Advanced trading calculators for Forex, Stocks, Crypto, Options & CFDs. Calculate position size, pip value, margin requirements, profit/loss scenarios with professional-grade accuracy.",
  keywords: [
    "trading calculator",
    "position size calculator",
    "pip value calculator",
    "forex calculator",
    "stock calculator",
    "crypto calculator",
    "options calculator",
    "margin calculator",
    "risk management",
    "trading tools"
  ],
  openGraph: {
    title: "Professional Trading Calculators | Risk Management Tools",
    description: "Advanced trading calculators for all markets. Professional-grade tools for position sizing, risk management, and profit/loss analysis.",
    type: "website",
  },
};

export default function TradingCalculatorPage() {
  return (
      <div className="container max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="mb-8">
          <Link href="/tools" className="flex items-center text-muted-foreground text-sm hover:text-primary transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to all tools
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Professional Trading Calculators
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive suite of professional-grade trading calculators for all major markets.
            Make informed trading decisions with accurate risk management and position sizing tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="font-semibold">Real-time Calculations</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Instant calculations with live market data integration for accurate results across all trading instruments.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-semibold">Risk Management</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced position sizing and risk assessment tools to protect your capital and optimize returns.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <BarChart3 className="h-5 w-5 text-purple-500 mr-2" />
              <h3 className="font-semibold">Multi-Asset Support</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Specialized calculators for Forex, Stocks, Crypto, Options, CFDs, and ETFs with market-specific features.
            </p>
          </div>
        </div>

        {/* Calculator Tool */}
        <TradingCalculatorTool />

        {/* Disclaimer */}
        <div className="mt-16 bg-muted/30 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-amber-500" />
            Important Disclaimer
          </h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              These calculators are for educational and informational purposes only. They provide estimates based on
              the inputs provided and should not be considered as financial advice or guarantees of trading results.
            </p>
            <p>
              Always verify calculations with your broker, as market conditions, spreads, commissions, and other
              factors may vary. Trading involves substantial risk of loss and is not suitable for all investors.
            </p>
            <p className="font-medium text-foreground">
              Never risk more than you can afford to lose. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
  );
}