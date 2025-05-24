'use client';

import { SimilarBrokersSection } from '@/components/broker-review/SimilarBrokersSection';

interface SimilarBrokersSectionWrapperProps {
  brokers: any[];
  currentBroker: string;
}

export function SimilarBrokersSectionWrapper({
  brokers,
  currentBroker
}: SimilarBrokersSectionWrapperProps) {
  const handleCompare = (brokerId: string) => {
    console.log("Compare with:", brokerId);
    // Implement comparison logic here
    window.open(`/compare/${currentBroker.toLowerCase()}-vs-${brokerId}`, '_blank');
  };

  return (
    <SimilarBrokersSection
      brokers={brokers}
      currentBroker={currentBroker}
      onCompare={handleCompare}
    />
  );
} 