import { Metadata } from "next";
import { BrokerCompareSelector } from "@/components/compare/BrokerCompareSelector";
import { BrokerCompareDetails } from "@/components/compare/BrokerCompareDetails";
import { Suspense } from "react";
import { db } from "@/lib/database";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Compare Brokers Side by Side | Find Your Best Broker Match",
  description: "Compare up to 5 trading brokers side by side with our detailed comparison tool. Review fees, platforms, products, and more to find the perfect broker for your needs.",
};

interface SearchParams {
  broker1?: string;
  broker2?: string;
  broker3?: string;
  broker4?: string;
  broker5?: string;
}

export default async function ComparePage(
  props: {
    searchParams: Promise<SearchParams>;
  }
) {
  const searchParams = await props.searchParams;
  // Extract broker IDs from query parameters, default to first two brokers if not provided
  const brokerIds = [];

  // Add broker IDs if they exist in the query parameters
  for (let i = 1; i <= 5; i++) {
    const brokerId = searchParams?.[`broker${i}` as keyof SearchParams];
    if (brokerId) {
      brokerIds.push(brokerId);
    }
  }

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

  // Ensure we have at least 2 broker IDs
  if (brokerIds.length < 2) {
    brokerIds.push(...availableBrokers.slice(0, 2 - brokerIds.length).map(b => b.id));
  }

  // Current month and year for the update indicator
  const currentMonth = "May";
  const currentYear = "2025";

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="space-y-4 mb-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold">Compare Brokers Side by Side</h1>
          <Badge variant="outline" className="px-3 py-1.5 text-sm font-medium bg-background/80 backdrop-blur-sm border-primary/20">
            <CalendarClock className="mr-1 h-3.5 w-3.5 text-primary" />
            Last updated: {currentMonth} {currentYear}
          </Badge>
        </div>
        
        <Alert className="bg-card border-primary/10 max-w-3xl mx-auto">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription>
            Our broker comparison tool provides accurate and up-to-date information to help you find the best trading platform. Compare up to 5 brokers at once. All data was verified in {currentMonth} {currentYear}.
          </AlertDescription>
        </Alert>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Select brokers to compare their features, fees, platforms, and more. 
          Find the perfect trading platform for your investment needs.
        </p>
      </div>
      
      <BrokerCompareSelector 
        brokers={availableBrokers}
        initialBroker1={brokerIds[0]}
        initialBroker2={brokerIds[1]}
      />
      
      <Suspense fallback={<div className="my-12 text-center">Loading comparison data...</div>}>
        <BrokerCompareDetails 
          brokerIds={brokerIds}
          lastUpdated={{month: currentMonth, year: currentYear}}
        />
      </Suspense>
    </main>
  );
} 