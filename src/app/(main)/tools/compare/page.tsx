import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrokerData, FeatureItem } from "@/components/BrokerComparisonTable";
import { db } from "@/lib/database";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the BrokerComparisonTool component
const BrokerComparisonTool = dynamic(
  () => import("@/components/tools/BrokerComparisonTool").then(mod => mod.BrokerComparisonTool),
  {
    loading: () => <div className="p-8 text-center">Loading comparison tool...</div>,
    ssr: true
  }
);

export const metadata: Metadata = {
  title: "Broker Comparison Tool | Compare Trading Platforms",
  description: "Compare forex brokers side by side. View fees, features, minimum deposits, and platform details to find the best trading broker for your needs.",
};

async function getBrokerComparisonData() {
  // Fetch brokers with their ratings from our database service
  try {
    const brokers = await db.brokers.getAll();

    if (!brokers || brokers.length === 0) {
      console.error("No brokers found in database");
      return {
        brokers: [],
        features: [],
      };
    }

    // Define feature categories and items
    const features: FeatureItem[] = [
      { name: "Min Deposit", tooltip: "Minimum deposit required to open an account", highlight: true, group: "Account" },
      { name: "Trading Fee", tooltip: "Base trading fee percentage", group: "Trading" },
      { name: "Supported Assets", tooltip: "Types of assets available for trading", highlight: true, group: "Trading" },
      { name: "Country", tooltip: "Country where the broker is based", group: "Company" },
      { name: "Regulations", tooltip: "Regulatory authorities overseeing the broker", highlight: true, group: "Trust" },
    ];

    // Transform broker data to the format expected by the comparison tool
    const formattedBrokers: BrokerData[] = brokers.map((broker) => ({
      id: broker.id,
      name: broker.name,
      logo: broker.logo_url || undefined,
      rating: broker.rating || 0,
      link: `#${broker.id}`, // You can adjust this to a proper link if available
      features: {
        min_deposit: broker.min_deposit ? `$${broker.min_deposit}` : 'N/A',
        trading_fee: broker.trading_fee ? `${broker.trading_fee}%` : 'N/A',
        supported_assets: Array.isArray(broker.supported_assets) ? broker.supported_assets.join(', ') : 'N/A',
        country: broker.country || 'N/A',
        regulations: broker.regulations || 'N/A',
      },
    }));

    return {
      brokers: formattedBrokers,
      features: features,
    };
  } catch (error) {
    console.error("Error fetching brokers:", error);
    return {
      brokers: [],
      features: [],
    };
  }
}

export default async function BrokerComparisonPage() {
  const { brokers, features } = await getBrokerComparisonData();

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="mb-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Tools
        </Link>
      </div>

      <div className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Compare Forex Brokers
        </h1>
        <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Compare trading features, fees, and platforms side by side to find the broker that best fits your needs.
        </p>
      </div>

      <div className="mb-8">
        <Suspense fallback={<div className="p-8 text-center">Loading comparison tool...</div>}>
          <BrokerComparisonTool initialBrokers={brokers} availableFeatures={features} />
        </Suspense>
      </div>

      <div className="mt-12 space-y-6 text-muted-foreground">
        <h2 className="text-2xl font-semibold text-foreground">How to Compare Brokers Effectively</h2>
        <p>
          When comparing forex brokers, consider these key factors to find the best match for your trading style:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Regulation:</strong> Ensure the broker is regulated by reputable authorities like FCA, ASIC, or CySEC.</li>
          <li><strong>Trading Costs:</strong> Compare spreads, commissions, and overnight fees that can impact your profitability.</li>
          <li><strong>Platform Options:</strong> Check if they offer your preferred trading platform (MT4, MT5, cTrader, etc.).</li>
          <li><strong>Account Types:</strong> Look for account options that match your trading capital and style.</li>
          <li><strong>Educational Resources:</strong> Beginners should prioritize brokers with comprehensive learning materials.</li>
        </ul>
        <p>
          Remember that the "best" broker varies based on individual needs. A day trader might prioritize tight spreads, while a long-term investor might focus more on platform stability and research tools.
        </p>
      </div>
    </div>
  );
}