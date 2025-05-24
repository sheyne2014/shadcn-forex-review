'use client';

import { BrokerComparisonWidget } from '@/components/broker-review/BrokerComparisonWidget';

interface BrokerComparisonWidgetWrapperProps {
  primaryBroker: any;
  comparisonBrokers: any[];
}

export function BrokerComparisonWidgetWrapper({
  primaryBroker,
  comparisonBrokers
}: BrokerComparisonWidgetWrapperProps) {
  const handleAddBroker = () => {
    console.log("Add broker clicked");
    // Implement broker addition logic here
  };

  return (
    <BrokerComparisonWidget
      primaryBroker={primaryBroker}
      comparisonBrokers={comparisonBrokers}
      onAddBroker={handleAddBroker}
    />
  );
} 