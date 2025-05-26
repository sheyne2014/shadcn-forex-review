import { Metadata } from "next";
import Link from "next/link";
import { getBrokers } from "@/lib/supabase/broker-client";
import { TwoBrokerComparisonTool } from "@/components/tools/TwoBrokerComparisonTool";

export const metadata: Metadata = {
  title: "Compare Two Brokers Side-by-Side | Trading Platform Comparison Tool",
  description: "Compare exactly 2 trading brokers side by side. Select any two brokers to analyze fees, features, platforms, regulation, and more to find the best trading platform for your needs.",
  keywords: [
    "broker comparison",
    "compare two brokers",
    "trading platform comparison",
    "broker vs broker",
    "side by side comparison",
    "forex broker comparison",
    "stock broker comparison",
    "crypto broker comparison"
  ],
};

async function getBrokerComparisonData() {
  try {
    // Fetch all brokers from the database
    const { data: brokers = [], error: brokersError } = await getBrokers({
      limit: 200, // Get more brokers for selection
      sort_by: "rating",
      sort_order: "desc"
    });

    if (brokersError) {
      console.error("Error fetching brokers:", brokersError);
      return { brokers: [] };
    }

    // Transform broker data for the comparison tool
    const formattedBrokers = brokers.map((broker) => ({
      id: broker.id,
      name: broker.name,
      slug: broker.slug || broker.name.toLowerCase().replace(/\s+/g, '-'),
      logo_url: broker.logo_url,
      rating: broker.rating || 0,
      min_deposit: broker.min_deposit,
      trading_fee: broker.trading_fee,
      regulations: broker.regulations,
      country: broker.country,
      supported_assets: broker.supported_assets,
      website_url: broker.website_url,
      trading_platforms: broker.trading_platforms,
    }));

    return {
      brokers: formattedBrokers,
    };
  } catch (error) {
    console.error("Error fetching brokers:", error);
    return {
      brokers: [],
    };
  }
}

export default async function CompareTwoBrokersPage() {
  const { brokers } = await getBrokerComparisonData();

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-1">/</span>
          <Link href="/tools" className="hover:text-foreground transition-colors">
            Tools
          </Link>
          <span className="mx-1">/</span>
          <span className="text-foreground font-medium">Compare Two Brokers</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Compare Two Brokers Side-by-Side
        </h1>
        <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Select any two trading brokers to compare their features, fees, platforms, and regulations. 
          Make an informed decision with our detailed side-by-side analysis.
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          How to Use This Comparison Tool
        </h2>
        <ul className="space-y-2 text-blue-800 dark:text-blue-200">
          <li className="flex items-start">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">1</span>
            <span>Select your first broker from the dropdown menu below</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">2</span>
            <span>Choose a second broker to compare against</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">3</span>
            <span>Review the detailed side-by-side comparison of features, fees, and regulations</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0">4</span>
            <span>Click "Compare Now" to generate a shareable comparison URL</span>
          </li>
        </ul>
      </div>

      {/* Comparison Tool */}
      <TwoBrokerComparisonTool brokers={brokers} />

      {/* Additional Information */}
      <div className="mt-16 space-y-6 text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">Why Compare Brokers?</h2>
        <p>
          Choosing the right trading broker is crucial for your trading success. Different brokers offer varying features, 
          fee structures, and trading conditions that can significantly impact your profitability and trading experience.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8">Key Factors to Consider</h3>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Trading Costs</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Spreads and commissions</li>
              <li>Overnight financing fees</li>
              <li>Deposit and withdrawal fees</li>
              <li>Inactivity fees</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Regulation & Safety</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Regulatory oversight</li>
              <li>Client fund protection</li>
              <li>Compensation schemes</li>
              <li>Company reputation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Trading Features</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Available markets and instruments</li>
              <li>Leverage and margin requirements</li>
              <li>Order types and execution</li>
              <li>Trading tools and analysis</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Platform & Support</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Trading platform options</li>
              <li>Mobile app functionality</li>
              <li>Customer support quality</li>
              <li>Educational resources</li>
            </ul>
          </div>
        </div>
        
        <p className="mt-6">
          Use our comparison tool to evaluate these factors side-by-side and make an informed decision 
          based on your specific trading needs and preferences.
        </p>
      </div>
    </div>
  );
}
