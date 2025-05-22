"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  currentBroker,
  onCompare
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Similar Brokers</h2>
        <Link href="/compare" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          View comparison tool
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brokers.map((broker, index) => (
          <Card key={broker.id} className="flex flex-col h-full overflow-hidden group hover:shadow-md transition-all">
            {/* Card header with logo and rating */}
            <div className="border-b p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="relative h-12 w-28 bg-white rounded-md border flex items-center justify-center p-1">
                  {broker.logo_url ? (
                    <Image
                      src={broker.logo_url}
                      alt={`${broker.name} logo`}
                      fill
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="text-lg font-semibold text-center">
                      {getBrokerInitials(broker.name)}
                    </div>
                  )}
                </div>

                <div className="flex items-center bg-muted px-2 py-1 rounded">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">
                    {typeof broker.overall_rating === 'number'
                      ? broker.overall_rating.toFixed(1)
                      : broker.overall_rating || "4.0"}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-lg">{broker.name}</h3>

              {/* Better than feature */}
              <div className="mt-2 flex items-center text-green-600 text-sm">
                <CheckCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
                <span>{getBetterThanFeature(broker, index)}</span>
              </div>
            </div>

            {/* Card content with key trading info */}
            <CardContent className="p-4 flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Min. Deposit
                    </span>
                    <span className="font-medium">
                      {broker.min_deposit ? `$${typeof broker.min_deposit === 'string' ? broker.min_deposit : broker.min_deposit}` : "Varies"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs flex items-center">
                      <BarChart4 className="h-3 w-3 mr-1" />
                      Spreads From
                    </span>
                    <span className="font-medium">
                      {broker.spreads_from || "Variable"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Regulation
                    </span>
                    <span className="font-medium truncate" title={broker.regulations || "Unknown"}>
                      {broker.regulations
                        ? broker.regulations.split(',')[0] + (broker.regulations.includes(',') ? '...' : '')
                        : "Unknown"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">
                      Leverage
                    </span>
                    <span className="font-medium">
                      {broker.max_leverage || "Standard"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 space-y-3">
                <Button variant="outline" className="w-full group-hover:bg-primary/5 transition-colors" asChild>
                  <Link href={broker.name.toLowerCase() === 'etoro' ? '/broker/etoro' : (broker.slug ? `/broker/${broker.slug}` : `/broker/${broker.id}`)}>
                    <span className="flex items-center justify-center w-full">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>

                <div className="flex gap-2">
                  {broker.website_url && (
                    <Button variant="ghost" size="sm" className="flex-1 text-xs" asChild>
                      <Link href={broker.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Visit
                      </Link>
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => onCompare && onCompare(broker.id)}
                  >
                    Compare
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}