import { Metadata } from "next";
import { BrokerCompareSelector } from "@/components/compare/BrokerCompareSelector";
import { BrokerCompareDetails } from "@/components/compare/BrokerCompareDetails";
import { Suspense } from "react";
import { db } from "@/lib/database";

export const metadata: Metadata = {
  title: "Compare Brokers Side by Side | Find Your Best Broker Match",
  description: "Compare trading brokers side by side with our detailed comparison tool. Review fees, platforms, products, and more to find the perfect broker for your needs.",
};

interface SearchParams {
  broker1?: string;
  broker2?: string;
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Get broker1 and broker2 from query parameters, default to first two brokers if not provided
  const broker1Id = searchParams?.broker1;
  const broker2Id = searchParams?.broker2;
  
  // Get list of all available brokers for selection
  const brokers = await db.brokers.getAll();
  
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
  
  const availableBrokers = brokers.length >= 2 ? 
    brokers.map(b => ({ id: b.id, name: b.name })) : 
    fallbackBrokers;
  
  // Set default brokers if not specified in query params
  const defaultBroker1 = broker1Id || availableBrokers[0].id;
  const defaultBroker2 = broker2Id || availableBrokers[1].id;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Compare Brokers Side by Side</h1>
      
      <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-10">
        Select two brokers to compare their features, fees, platforms, and more. 
        Find the perfect trading platform for your investment needs.
      </p>
      
      <BrokerCompareSelector 
        brokers={availableBrokers}
        initialBroker1={defaultBroker1}
        initialBroker2={defaultBroker2}
      />
      
      <Suspense fallback={<div className="my-12 text-center">Loading comparison data...</div>}>
        <BrokerCompareDetails broker1Id={defaultBroker1} broker2Id={defaultBroker2} />
      </Suspense>
    </main>
  );
} 