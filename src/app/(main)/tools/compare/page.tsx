import { Metadata } from "next";
import Link from "next/link";
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

    // We'll use the broker data directly in the formattedBrokers mapping

    // Define feature categories and items
    const features: FeatureItem[] = [
      // General Information
      { id: "country", name: "Country", tooltip: "Country where the broker is headquartered", group: "General Information" },
      { id: "regulations", name: "Regulations", tooltip: "Regulatory bodies overseeing the broker", highlight: true, group: "General Information" },
      { id: "year_founded", name: "Year Founded", tooltip: "Year the broker was established", group: "General Information" },
      { id: "company_size", name: "Company Size", tooltip: "Number of employees or company size category", group: "General Information" },

      // Trading Conditions
      { id: "min_deposit", name: "Min Deposit", tooltip: "Minimum deposit required to open an account", highlight: true, group: "Trading Conditions" },
      { id: "trading_fee", name: "Trading Fee", tooltip: "Standard trading fee or commission", highlight: true, group: "Trading Conditions" },
      { id: "spreads", name: "Spreads", tooltip: "Average spread ranges for major pairs", group: "Trading Conditions" },
      { id: "leverage", name: "Leverage", tooltip: "Maximum leverage offered", group: "Trading Conditions" },
      { id: "supported_assets", name: "Supported Assets", tooltip: "Types of assets available for trading", highlight: true, group: "Trading Conditions" },
      { id: "execution_type", name: "Execution Type", tooltip: "Market execution, instant execution, etc.", group: "Trading Conditions" },
      { id: "scalping_allowed", name: "Scalping Allowed", tooltip: "Whether scalping trading strategy is permitted", group: "Trading Conditions" },
      { id: "hedging_allowed", name: "Hedging Allowed", tooltip: "Whether hedging positions is permitted", group: "Trading Conditions" },

      // Platforms & Tools
      { id: "platforms", name: "Platforms", tooltip: "Trading platforms available", group: "Platforms & Tools" },
      { id: "mobile_app", name: "Mobile App", tooltip: "Mobile trading application availability", group: "Platforms & Tools" },
      { id: "web_platform", name: "Web Platform", tooltip: "Availability of web-based trading platform", group: "Platforms & Tools" },
      { id: "api_trading", name: "API Trading", tooltip: "Support for API trading and integration", group: "Platforms & Tools" },
      { id: "social_trading", name: "Social Trading", tooltip: "Availability of copy/social trading features", group: "Platforms & Tools" },
      { id: "trading_tools", name: "Trading Tools", tooltip: "Additional trading tools and indicators provided", group: "Platforms & Tools" },

      // Account Features
      { id: "account_types", name: "Account Types", tooltip: "Types of trading accounts offered", group: "Account Features" },
      { id: "demo_account", name: "Demo Account", tooltip: "Availability of demo accounts for practice", group: "Account Features" },
      { id: "islamic_account", name: "Islamic Account", tooltip: "Availability of swap-free Islamic accounts", group: "Account Features" },
      { id: "managed_accounts", name: "Managed Accounts", tooltip: "Availability of professionally managed accounts", group: "Account Features" },
      { id: "account_currency", name: "Account Currency", tooltip: "Base currencies available for accounts", group: "Account Features" },

      // Deposits & Withdrawals
      { id: "deposit_methods", name: "Deposit Methods", tooltip: "Available methods for depositing funds", group: "Deposits & Withdrawals" },
      { id: "withdrawal_methods", name: "Withdrawal Methods", tooltip: "Available methods for withdrawing funds", group: "Deposits & Withdrawals" },
      { id: "deposit_fees", name: "Deposit Fees", tooltip: "Fees charged for deposits", group: "Deposits & Withdrawals" },
      { id: "withdrawal_fees", name: "Withdrawal Fees", tooltip: "Fees charged for withdrawals", group: "Deposits & Withdrawals" },
      { id: "withdrawal_time", name: "Withdrawal Time", tooltip: "Average processing time for withdrawals", group: "Deposits & Withdrawals" },

      // Regulations & Security
      { id: "regulatory_bodies", name: "Regulatory Bodies", tooltip: "Specific regulatory authorities overseeing the broker", group: "Regulations & Security" },
      { id: "investor_compensation", name: "Investor Compensation", tooltip: "Investor compensation scheme details", group: "Regulations & Security" },
      { id: "segregated_funds", name: "Segregated Funds", tooltip: "Whether client funds are kept segregated", group: "Regulations & Security" },
      { id: "negative_balance_protection", name: "Negative Balance Protection", tooltip: "Whether negative balance protection is offered", group: "Regulations & Security" },

      // Support & Service
      { id: "customer_support", name: "Customer Support", tooltip: "Customer support channels and hours", group: "Support & Service" },
      { id: "languages_supported", name: "Languages Supported", tooltip: "Languages supported by customer service", group: "Support & Service" },
      { id: "support_hours", name: "Support Hours", tooltip: "Hours during which support is available", group: "Support & Service" },

      // Educational Resources
      { id: "education", name: "Education", tooltip: "Educational resources provided", group: "Educational Resources" },
      { id: "webinars", name: "Webinars", tooltip: "Availability of educational webinars", group: "Educational Resources" },
      { id: "trading_guides", name: "Trading Guides", tooltip: "Availability of trading guides and tutorials", group: "Educational Resources" },
      { id: "market_analysis", name: "Market Analysis", tooltip: "Provision of market analysis and research", group: "Educational Resources" },

      // Mobile Trading
      { id: "ios_app", name: "iOS App", tooltip: "Availability of iOS trading application", group: "Mobile Trading" },
      { id: "android_app", name: "Android App", tooltip: "Availability of Android trading application", group: "Mobile Trading" },
      { id: "mobile_features", name: "Mobile Features", tooltip: "Special features available on mobile platforms", group: "Mobile Trading" },

      // Performance & Execution
      { id: "execution_speed", name: "Execution Speed", tooltip: "Average order execution speed", group: "Performance & Execution" },
      { id: "slippage_policy", name: "Slippage Policy", tooltip: "Broker's policy on price slippage", group: "Performance & Execution" },
      { id: "server_reliability", name: "Server Reliability", tooltip: "Reliability of trading servers", group: "Performance & Execution" }
    ];

    // Transform broker data to the format expected by the comparison tool
    const formattedBrokers: BrokerData[] = brokers.map((broker) => ({
      id: broker.id,
      name: broker.name,
      logo: broker.logo_url || undefined,
      rating: broker.rating || 0,
      link: `/broker/${broker.id.toLowerCase()}`, // Link to broker review page
      features: {
        // Use only the properties available in the broker object
        // General Information
        country: broker.country || 'N/A',
        regulations: broker.regulations || 'N/A',
        "Year Founded": 'N/A', // Placeholder for future data
        "Company Size": 'N/A', // Placeholder for future data

        // Trading Conditions
        "Min Deposit": broker.min_deposit ? `$${broker.min_deposit}` : 'N/A',
        "Trading Fee": broker.trading_fee ? `${broker.trading_fee}%` : 'N/A',
        "Spreads": 'Variable', // Placeholder for future data
        "Leverage": 'Up to 1:500', // Placeholder for future data
        "Supported Assets": Array.isArray(broker.supported_assets) ? broker.supported_assets.join(', ') : 'N/A',

        // Platforms & Tools
        "Platforms": 'MT4, MT5, WebTrader', // Placeholder for future data
        "Mobile App": 'Available', // Placeholder for future data
        "Web Platform": 'Available', // Placeholder for future data

        // Account Features
        "Account Types": 'Standard, ECN, VIP', // Placeholder for future data
        "Demo Account": 'Available', // Placeholder for future data

        // Deposits & Withdrawals
        "Deposit Methods": 'Credit Card, Bank Transfer, E-Wallets', // Placeholder for future data
        "Withdrawal Methods": 'Credit Card, Bank Transfer, E-Wallets', // Placeholder for future data

        // Educational Resources
        "Education": 'Available', // Placeholder for future data
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
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-1">/</span>
          <Link href="/tools" className="hover:text-foreground transition-colors">
            Tools
          </Link>
          <span className="mx-1">/</span>
          <span className="text-foreground font-medium">Compare</span>
        </nav>
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