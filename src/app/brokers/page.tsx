import { Metadata } from "next";
import { BrokersPageClient } from "@/components/brokers/BrokersPageClient";

export const metadata: Metadata = {
  title: "Compare All Types of Brokers 2025 | Comprehensive Broker Analysis",
  description: "Compare the best brokers for forex, crypto, stocks, commodities, ETF, CFD, options and more in 2025. Find regulated brokers with competitive fees, advanced trading platforms, and excellent service tailored to your trading needs.",
  openGraph: {
    title: "Compare All Types of Brokers 2025 | Comprehensive Broker Analysis",
    description: "Find the best brokers for your trading style in 2025. Compare fees, platforms, regulation status and more across forex, crypto, stocks, commodities, ETF, CFD, options and more with our data-driven comparison tools.",
    type: "website",
    url: "/brokers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare All Types of Brokers 2025 | Comprehensive Broker Analysis",
    description: "Find the best brokers for your trading style in 2025. Compare fees, platforms, regulation status and more across forex, crypto, stocks, commodities, ETF, CFD, options and more.",
  },
  keywords: ["forex brokers 2025", "crypto brokers 2025", "stock brokers 2025", "CFD brokers 2025", "options brokers 2025", "broker comparison 2025", "regulated brokers 2025", "best trading platforms 2025", "low fee brokers 2025", "broker reviews 2025"],
  alternates: {
    canonical: "/brokers",
  },
};

export default function BrokersPage() {
  return <BrokersPageClient />;
}