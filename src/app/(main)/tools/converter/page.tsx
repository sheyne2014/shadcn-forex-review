import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ForexConverterTool } from "@/components/tools/ForexConverterTool";

export const metadata: Metadata = {
  title: "Forex Currency Converter | Forex Tools",
  description: "Real-time forex currency converter for major, minor, and exotic currency pairs. Calculate exchange rates quickly and accurately.",
};

export default function ForexConverterPage() {
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
          Forex Currency Converter
        </h1>
        <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Convert between major world currencies with our real-time exchange rate calculator.
        </p>
      </div>

      <ForexConverterTool />

      <div className="mt-12 space-y-6 text-sm text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">About Currency Conversion</h2>
        <p>
          Exchange rates fluctuate constantly due to various economic factors including inflation rates, interest rates, economic stability, and geopolitical events. 
          Our converter provides indicative rates that are updated regularly, but may differ slightly from the exact rates used by banks and financial institutions.
        </p>
        
        <h3 className="text-lg font-medium text-foreground">Common Currency Pairs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold">Major Pairs</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>EUR/USD (Euro/US Dollar)</li>
              <li>USD/JPY (US Dollar/Japanese Yen)</li>
              <li>GBP/USD (British Pound/US Dollar)</li>
              <li>USD/CHF (US Dollar/Swiss Franc)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Minor Pairs</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>EUR/GBP (Euro/British Pound)</li>
              <li>AUD/CAD (Australian Dollar/Canadian Dollar)</li>
              <li>GBP/JPY (British Pound/Japanese Yen)</li>
              <li>EUR/AUD (Euro/Australian Dollar)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 