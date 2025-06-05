"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  AlertTriangle,
  ExternalLink,
  Shield,
  DollarSign,
  BarChart4,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface BrokerDetails {
  id: string;
  name: string;
  slug?: string;
  logo_url?: string;
  overall_rating?: number | string;
  min_deposit?: number | string; // Updated to accept string or number
  max_leverage?: string;
  spreads_from?: string;
  regulations?: string;
  trading_platforms?: string;
  pros?: string[];
  key_feature?: string;
  website_url?: string;
}

interface SimilarBrokersSectionProps {
  brokers: BrokerDetails[];
  currentBroker: string;
  onCompare?: (brokerId: string) => void;
}

export function SimilarBrokersSection({
  brokers,
  currentBroker
}: SimilarBrokersSectionProps) {
  // Safely handle empty brokers array
  if (!brokers || brokers.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center text-muted-foreground gap-2 py-8">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <p>No similar brokers available for comparison</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Function to get a random "better than" feature
  const getBetterThanFeature = (broker: BrokerDetails, index: number): string => {
    // Safe parsing of leverage value with error handling
    const getLeverageValue = (leverageStr?: string): number => {
      if (!leverageStr || typeof leverageStr !== 'string') return 0;

      try {
        if (leverageStr.includes(':')) {
          const parts = leverageStr.split(':');
          return parseInt(parts[1]) || 0;
        }
        return parseInt(leverageStr.replace(/\D/g, '')) || 0;
      } catch {
        return 0;
      }
    };

    // Safe parsing of spread value with error handling
    const getSpreadValue = (spreadStr?: string): number => {
      if (!spreadStr || typeof spreadStr !== 'string') return 0;

      try {
        return parseFloat(spreadStr) || 0;
      } catch {
        return 0;
      }
    };

    // Helper function to convert min_deposit to number for comparison
    const getDepositValue = (deposit?: string | number): number => {
      if (typeof deposit === 'number') return deposit;
      if (!deposit || typeof deposit !== 'string') return 0;

      try {
        return parseInt(deposit.replace(/\D/g, '')) || 0;
      } catch {
        return 0;
      }
    };

    // Generate feature highlights based on broker data
    const features = [
      broker.min_deposit && getDepositValue(broker.min_deposit) < 100 ? "Lower minimum deposit" : "",
      broker.max_leverage && getLeverageValue(broker.max_leverage) > 400 ? "Higher maximum leverage" : "",
      broker.spreads_from && getSpreadValue(broker.spreads_from) < 1.0 ? "Tighter spreads from " + broker.spreads_from : "",
      broker.regulations ? `Regulated by ${broker.regulations.split(",")[0]}` : "",
      broker.trading_platforms && broker.trading_platforms.includes("MT5") ? "MetaTrader 5 support" : "",
      broker.trading_platforms && broker.trading_platforms.includes("cTrader") ? "cTrader platform available" : "",
      broker.pros && broker.pros.length > 0 ? broker.pros[0] : ""
    ].filter(Boolean);

    // Return a feature based on broker index to ensure variety, or fallback to default
    if (features.length === 0) {
      return broker.key_feature || "Competitive trading conditions";
    }

    return features[index % features.length];
  };

  // Safe initials generation function
  const getBrokerInitials = (name?: string): string => {
    if (!name) return "";

    try {
      // Get initials from first letters of each word
      const initials = name.split(' ')
        .filter(word => word.length > 0)
        .map(word => word[0])
        .join('');

      // If we couldn't get initials, return first 3 chars
      return initials || name.substring(0, 3) || "";
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Similar Brokers</h2>
          <p className="text-muted-foreground">Compare alternatives to {currentBroker} with similar features and services</p>
        </div>
        <Link
          href="/tools/compare"
          className="text-sm font-medium bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground px-4 py-2 rounded-md transition-colors flex items-center self-start"
        >
          View full comparison tool <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {brokers.map((broker, index) => (
          <Card
            key={broker.id}
            className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-all border-border/60 hover:border-primary/30"
          >
            {/* Card header with logo and rating */}
            <div className="border-b p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="relative h-16 w-36 bg-white rounded-md border flex items-center justify-center p-1">
                  {broker.logo_url ? (
                    <Image
                      src={broker.logo_url}
                      alt={`${broker.name} logo`}
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="text-xl font-semibold text-center">
                      {getBrokerInitials(broker.name)}
                    </div>
                  )}
                </div>

                <div className="flex items-center bg-muted/50 px-3 py-1.5 rounded-full">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1.5" />
                  <span className="font-medium text-base">
                    {typeof broker.overall_rating === 'number'
                      ? broker.overall_rating.toFixed(1)
                      : broker.overall_rating || "4.0"}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-xl mb-2">{broker.name}</h3>

              {/* Better than feature */}
              <div className="mt-2 flex items-center text-green-600 text-sm bg-green-50 dark:bg-green-950/30 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="font-medium">{getBetterThanFeature(broker, index)}</span>
              </div>
            </div>

            {/* Card content with key trading info */}
            <CardContent className="p-5 flex-grow flex flex-col justify-between">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col bg-muted/30 p-3 rounded-md">
                    <span className="text-muted-foreground text-xs flex items-center mb-1">
                      <DollarSign className="h-3.5 w-3.5 mr-1.5" />
                      Min. Deposit
                    </span>
                    <span className="font-medium text-base">
                      {broker.min_deposit ? `$${typeof broker.min_deposit === 'string' ? broker.min_deposit : broker.min_deposit}` : "Varies"}
                    </span>
                  </div>

                  <div className="flex flex-col bg-muted/30 p-3 rounded-md">
                    <span className="text-muted-foreground text-xs flex items-center mb-1">
                      <BarChart4 className="h-3.5 w-3.5 mr-1.5" />
                      Spreads From
                    </span>
                    <span className="font-medium text-base">
                      {broker.spreads_from || "Variable"}
                    </span>
                  </div>

                  <div className="flex flex-col bg-muted/30 p-3 rounded-md">
                    <span className="text-muted-foreground text-xs flex items-center mb-1">
                      <Shield className="h-3.5 w-3.5 mr-1.5" />
                      Regulation
                    </span>
                    <span className="font-medium text-base truncate" title={broker.regulations || "Unknown"}>
                      {broker.regulations
                        ? broker.regulations.split(',')[0] + (broker.regulations.includes(',') ? '...' : '')
                        : "Unknown"}
                    </span>
                  </div>

                  <div className="flex flex-col bg-muted/30 p-3 rounded-md">
                    <span className="text-muted-foreground text-xs flex items-center mb-1">
                      <BarChart4 className="h-3.5 w-3.5 mr-1.5" />
                      Leverage
                    </span>
                    <span className="font-medium text-base">
                      {broker.max_leverage || "Standard"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <Link
                  href={`/broker/${broker.id.toLowerCase()}`}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full shadow-sm group-hover:shadow-md transition-all"
                >
                  <span className="flex items-center justify-center w-full">
                    View Full Review
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <div className="flex gap-2">
                  {broker.website_url && (
                    <a
                      href={broker.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 flex-1 gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </a>
                  )}

                  <Link
                    href={`/compare/${currentBroker.toLowerCase()}-vs-${broker.id.toLowerCase()}`}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 flex-1"
                  >
                    Compare
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}