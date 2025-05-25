import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRightLeft, TrendingUp, Globe, BarChart3, Clock, Shield } from "lucide-react";
import { EnhancedForexConverterTool } from "@/components/tools/EnhancedForexConverterTool";

export const metadata: Metadata = {
  title: "Professional Currency Converter | Real-time Exchange Rates | 2024",
  description: "Advanced currency converter with real-time exchange rates, historical charts, market analysis, and professional trading tools for 180+ currencies worldwide.",
  keywords: [
    "currency converter",
    "exchange rates",
    "forex converter",
    "real-time rates",
    "currency exchange",
    "foreign exchange",
    "fx rates",
    "currency calculator",
    "money converter",
    "international exchange"
  ],
  openGraph: {
    title: "Professional Currency Converter | Real-time Exchange Rates",
    description: "Convert currencies with real-time rates, historical data, and professional trading insights for 180+ global currencies.",
    type: "website",
  },
};

export default function ForexConverterPage() {
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
            <ArrowRightLeft className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Professional Currency Converter
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Convert between 180+ world currencies with real-time exchange rates, historical data,
          and professional trading insights powered by multiple data sources.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="font-semibold">Real-time Rates</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Live exchange rates updated every minute from multiple financial data providers.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-3">
            <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="font-semibold">Historical Charts</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Interactive charts showing currency trends and historical performance data.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-3">
            <Globe className="h-5 w-5 text-purple-500 mr-2" />
            <h3 className="font-semibold">180+ Currencies</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Support for major, minor, and exotic currency pairs from around the world.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-orange-500 mr-2" />
            <h3 className="font-semibold">Bank-Grade Data</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Professional-grade exchange rates from trusted financial institutions.
          </p>
        </div>
      </div>

      {/* Enhanced Converter Tool */}
      <EnhancedForexConverterTool />

      {/* Market Insights Section */}
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="bg-muted/30 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            Major Currency Pairs
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">EUR/USD</span>
              <span className="text-sm text-muted-foreground">Euro / US Dollar</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">GBP/USD</span>
              <span className="text-sm text-muted-foreground">British Pound / US Dollar</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">USD/JPY</span>
              <span className="text-sm text-muted-foreground">US Dollar / Japanese Yen</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">USD/CHF</span>
              <span className="text-sm text-muted-foreground">US Dollar / Swiss Franc</span>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-500" />
            Emerging Market Currencies
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">USD/CNY</span>
              <span className="text-sm text-muted-foreground">US Dollar / Chinese Yuan</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">USD/INR</span>
              <span className="text-sm text-muted-foreground">US Dollar / Indian Rupee</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">USD/BRL</span>
              <span className="text-sm text-muted-foreground">US Dollar / Brazilian Real</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">USD/ZAR</span>
              <span className="text-sm text-muted-foreground">US Dollar / South African Rand</span>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-16 bg-muted/30 border rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Understanding Exchange Rates</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Market Factors</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Interest Rates:</strong> Central bank policies affect currency strength</li>
              <li>• <strong>Economic Indicators:</strong> GDP, inflation, employment data</li>
              <li>• <strong>Political Stability:</strong> Government policies and elections</li>
              <li>• <strong>Trade Balance:</strong> Import/export ratios between countries</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Trading Sessions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Asian Session:</strong> 00:00 - 09:00 GMT (High JPY activity)</li>
              <li>• <strong>European Session:</strong> 08:00 - 17:00 GMT (High EUR/GBP activity)</li>
              <li>• <strong>American Session:</strong> 13:00 - 22:00 GMT (High USD activity)</li>
              <li>• <strong>Overlap Periods:</strong> Highest volatility and liquidity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-amber-500" />
          Important Disclaimer
        </h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Exchange rates are provided for informational purposes only and may not reflect the exact rates
            available from banks, money transfer services, or other financial institutions.
          </p>
          <p>
            Rates fluctuate constantly throughout the trading day. For actual transactions, please check
            with your financial institution for their current exchange rates and any applicable fees.
          </p>
          <p className="font-medium text-foreground">
            This tool is for educational and planning purposes only. Always verify rates before making
            financial decisions or currency exchanges.
          </p>
        </div>
      </div>
    </div>
  );
}