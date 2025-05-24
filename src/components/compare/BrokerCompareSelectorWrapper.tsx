"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the BrokerCompareSelector component with no SSR
const BrokerCompareSelector = dynamic(
  () => import('./BrokerCompareSelector').then(mod => ({ default: mod.BrokerCompareSelector })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-background border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Select Brokers to Compare</h2>
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
}

interface BrokerCompareSelectorWrapperProps {
  brokers: Broker[];
  initialBroker1: string;
  initialBroker2: string;
}

export function BrokerCompareSelectorWrapper({ 
  brokers, 
  initialBroker1, 
  initialBroker2 
}: BrokerCompareSelectorWrapperProps) {
  return (
    <Suspense fallback={
      <div className="bg-background border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Select Brokers to Compare</h2>
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading comparison tool...</p>
        </div>
      </div>
    }>
      <BrokerCompareSelector 
        brokers={brokers}
        initialBroker1={initialBroker1}
        initialBroker2={initialBroker2}
      />
    </Suspense>
  );
}
