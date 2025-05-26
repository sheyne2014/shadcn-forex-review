"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the TwoBrokerComparisonTool component with no SSR
const TwoBrokerComparisonTool = dynamic(
  () => import("@/components/tools/TwoBrokerComparisonTool").then(mod => ({ default: mod.TwoBrokerComparisonTool })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-8">
        {/* Loading state for broker selection */}
        <div className="bg-background border rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Brokers to Compare</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">First Broker</div>
                <div className="h-9 bg-muted rounded-md animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">Second Broker</div>
                <div className="h-9 bg-muted rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading state for comparison content */}
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading comparison tool...</p>
        </div>
      </div>
    )
  }
);

interface Broker {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  rating?: number;
  min_deposit?: number;
  trading_fee?: string;
  regulations?: string;
  country?: string;
  supported_assets?: string[];
  website_url?: string;
  trading_platforms?: string[];
}

interface TwoBrokerComparisonToolWrapperProps {
  brokers: Broker[];
}

export function TwoBrokerComparisonToolWrapper({ brokers }: TwoBrokerComparisonToolWrapperProps) {
  return (
    <Suspense fallback={
      <div className="space-y-8">
        {/* Loading state for broker selection */}
        <div className="bg-background border rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Brokers to Compare</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">First Broker</div>
                <div className="h-9 bg-muted rounded-md animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">Second Broker</div>
                <div className="h-9 bg-muted rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading state for comparison content */}
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading comparison tool...</p>
        </div>
      </div>
    }>
      <TwoBrokerComparisonTool brokers={brokers} />
    </Suspense>
  );
}
