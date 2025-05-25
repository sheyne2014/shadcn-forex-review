"use client";

import dynamic from "next/dynamic";
import { BrokerData, FeatureItem } from "@/components/BrokerComparisonTable";

// Dynamically import the BrokerComparisonTool component
const BrokerComparisonTool = dynamic(
  () => import("@/components/tools/BrokerComparisonTool").then(mod => mod.BrokerComparisonTool),
  {
    loading: () => <div className="p-8 text-center">Loading comparison tool...</div>,
    ssr: false
  }
);

interface BrokerComparisonWrapperProps {
  initialBrokers: BrokerData[];
  availableFeatures: FeatureItem[];
}

export function BrokerComparisonWrapper({ initialBrokers, availableFeatures }: BrokerComparisonWrapperProps) {
  return <BrokerComparisonTool initialBrokers={initialBrokers} availableFeatures={availableFeatures} />;
}
