import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrokerCompareSelector } from "@/components/compare/BrokerCompareSelector";
import { BrokerCompareDetails } from "@/components/compare/BrokerCompareDetails";
import { Suspense } from "react";
import { db } from "@/lib/database";

export async function generateMetadata({ 
  params 
}: { 
  params: { brokers: string[] } 
}): Promise<Metadata> {
  // Format should be /compare/broker1-vs-broker2
  const brokers = params?.brokers || [];
  if (brokers.length !== 1) {
    return {
      title: "Compare Brokers | Invalid URL Format",
      description: "Compare trading brokers side by side with our detailed comparison tool."
    };
  }

  const parts = brokers[0].split('-vs-');
  if (parts.length !== 2) {
    return {
      title: "Compare Brokers | Invalid URL Format",
      description: "Compare trading brokers side by side with our detailed comparison tool."
    };
  }

  // Get broker names for the title
  const broker1Id = parts[0];
  const broker2Id = parts[1];
  
  // Try to get broker names from database
  let broker1Name = broker1Id.replace(/-/g, ' ');
  let broker2Name = broker2Id.replace(/-/g, ' ');
  
  try {
    const brokers = await db.brokers.getAll();
    const broker1 = brokers.find(b => b.id === broker1Id);
    const broker2 = brokers.find(b => b.id === broker2Id);
    
    if (broker1) broker1Name = broker1.name;
    if (broker2) broker2Name = broker2.name;
  } catch (error) {
    console.error('Error fetching broker names for metadata:', error);
  }
  
  return {
    title: `${broker1Name} vs ${broker2Name} | Detailed Broker Comparison`,
    description: `Compare ${broker1Name} and ${broker2Name} side by side. See which broker offers better fees, platforms, markets, and customer service for your trading needs.`,
  };
}

export default async function CompareBrokersPage({ 
  params 
}: { 
  params: { brokers: string[] } 
}) {
  // Format should be /compare/broker1-vs-broker2
  const brokers = params?.brokers || [];
  if (brokers.length !== 1) {
    notFound();
  }

  const parts = brokers[0].split('-vs-');
  if (parts.length !== 2) {
    notFound();
  }

  const broker1Id = parts[0];
  const broker2Id = parts[1];
  
  // Get list of all available brokers for selection
  const brokersData = await db.brokers.getAll();
  
  // If we don't have at least 2 brokers from the database, use a fallback list
  const fallbackBrokers = [
    { id: "interactive-brokers", name: "Interactive Brokers" },
    { id: "xtb", name: "XTB" },
    { id: "oanda", name: "OANDA" },
    { id: "ic-markets", name: "IC Markets" },
    { id: "pepperstone", name: "Pepperstone" },
    { id: "xm", name: "XM" },
    { id: "saxo-bank", name: "Saxo Bank" },
    { id: "axi", name: "AXI" },
    { id: "swissquote", name: "Swissquote" },
    { id: "startrader", name: "StarTrader" },
  ];
  
  const availableBrokers = brokersData.length >= 2 ? 
    brokersData.map(b => ({ id: b.id, name: b.name })) : 
    fallbackBrokers;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Compare Brokers Side by Side</h1>
      
      <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-10">
        Compare features, fees, platforms, and more to find the perfect trading platform for your investment needs.
      </p>
      
      <BrokerCompareSelector 
        brokers={availableBrokers}
        initialBroker1={broker1Id}
        initialBroker2={broker2Id}
      />
      
      <Suspense fallback={<div className="my-12 text-center">Loading comparison data...</div>}>
        <BrokerCompareDetails broker1Id={broker1Id} broker2Id={broker2Id} />
      </Suspense>
    </main>
  );
} 