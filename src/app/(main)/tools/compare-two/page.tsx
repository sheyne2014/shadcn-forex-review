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

      {/* Professional Instructions Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-8 mb-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6 text-center">
            Professional Broker Comparison Guide
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Step-by-Step Instructions
              </h3>
              <ol className="space-y-3 text-blue-700 dark:text-blue-300">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-600 text-white text-sm font-semibold rounded-full mr-3 mt-0.5 shrink-0">1</span>
                  <div>
                    <strong className="block">Select Primary Broker</strong>
                    <span className="text-sm">Choose your first broker from our comprehensive database of regulated trading platforms.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-600 text-white text-sm font-semibold rounded-full mr-3 mt-0.5 shrink-0">2</span>
                  <div>
                    <strong className="block">Select Comparison Broker</strong>
                    <span className="text-sm">Choose a second broker to conduct a comprehensive side-by-side analysis.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-600 text-white text-sm font-semibold rounded-full mr-3 mt-0.5 shrink-0">3</span>
                  <div>
                    <strong className="block">Analyze Key Metrics</strong>
                    <span className="text-sm">Review detailed comparisons of trading costs, regulatory compliance, platform features, and asset availability.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-600 text-white text-sm font-semibold rounded-full mr-3 mt-0.5 shrink-0">4</span>
                  <div>
                    <strong className="block">Generate Detailed Report</strong>
                    <span className="text-sm">Access comprehensive comparison reports and share findings with colleagues or advisors.</span>
                  </div>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Key Comparison Factors
              </h3>
              <div className="space-y-3 text-blue-700 dark:text-blue-300">
                <div className="bg-white/50 dark:bg-blue-900/20 rounded-lg p-3">
                  <strong className="block text-sm font-semibold mb-1">Regulatory Compliance</strong>
                  <span className="text-xs">Verify licensing from tier-1 financial authorities (FCA, ASIC, CySEC, SEC) and client protection schemes.</span>
                </div>
                <div className="bg-white/50 dark:bg-blue-900/20 rounded-lg p-3">
                  <strong className="block text-sm font-semibold mb-1">Trading Costs Structure</strong>
                  <span className="text-xs">Compare spreads, commissions, overnight fees, and hidden charges that impact profitability.</span>
                </div>
                <div className="bg-white/50 dark:bg-blue-900/20 rounded-lg p-3">
                  <strong className="block text-sm font-semibold mb-1">Platform Technology</strong>
                  <span className="text-xs">Evaluate execution speed, order types, charting tools, and mobile application functionality.</span>
                </div>
                <div className="bg-white/50 dark:bg-blue-900/20 rounded-lg p-3">
                  <strong className="block text-sm font-semibold mb-1">Asset Coverage</strong>
                  <span className="text-xs">Assess available markets including forex, stocks, commodities, indices, and cryptocurrency offerings.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-300/50 dark:border-blue-700/50">
            <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
              <strong>Professional Recommendation:</strong> Consider your trading style, capital requirements, and risk tolerance when evaluating brokers.
              Regulatory oversight and fund protection should be primary considerations for institutional and retail traders alike.
            </p>
          </div>
        </div>
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
