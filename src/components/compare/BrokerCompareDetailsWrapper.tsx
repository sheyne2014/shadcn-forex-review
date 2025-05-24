"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the BrokerCompareDetails component with no SSR
const BrokerCompareDetails = dynamic(
  () => import('./BrokerCompareDetails').then(mod => ({ default: mod.BrokerCompareDetails })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading comparison data...</p>
        </div>
      </div>
    )
  }
);

interface BrokerCompareDetailsWrapperProps {
  brokerIds: string[];
  lastUpdated?: {
    month: string;
    year: string;
  };
}

export function BrokerCompareDetailsWrapper({ brokerIds, lastUpdated }: BrokerCompareDetailsWrapperProps) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading comparison data...</p>
        </div>
      </div>
    }>
      <BrokerCompareDetails 
        brokerIds={brokerIds}
        lastUpdated={lastUpdated}
      />
    </Suspense>
  );
}
