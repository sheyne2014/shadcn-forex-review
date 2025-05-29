import { Metadata } from "next";
import { BrokersPageClient } from "@/components/brokers/BrokersPageClient";

export const metadata: Metadata = {
  title: "Compare All Types of Brokers | BrokerAnalysis",
  description: "Compare the best brokers for forex, crypto, stocks, commodities, ETF, CFD, options and more. Find regulated brokers with low fees, great trading conditions, and excellent service.",
  openGraph: {
    title: "Compare All Types of Brokers | BrokerAnalysis",
    description: "Find the best brokers for your trading style. Compare fees, platforms, regulation status and more across forex, crypto, stocks, commodities, ETF, CFD, options and more.",
    type: "website",
    url: "/brokers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare All Types of Brokers | BrokerAnalysis",
    description: "Find the best brokers for your trading style. Compare fees, platforms, regulation status and more across forex, crypto, stocks, commodities, ETF, CFD, options and more.",
  },
  keywords: ["forex brokers", "crypto brokers", "stock brokers", "commodities brokers", "ETF brokers", "CFD brokers", "options brokers", "broker comparison", "trading", "regulated brokers", "low fee brokers"],
  alternates: {
    canonical: "/brokers",
  },
};



export default async function BrokersPage() {
  return <BrokersPageClient />;
}