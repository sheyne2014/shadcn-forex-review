"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getBrokerBySlug, BrokerDetails } from "@/lib/brokers";

interface Broker {
  id: string;
  name: string;
}

interface BrokerCompareSelectorProps {
  brokers: Broker[];
  initialBroker1: string;
  initialBroker2: string;
}

function BrokerCompareSelectorInner({
  brokers,
  initialBroker1,
  initialBroker2,
}: BrokerCompareSelectorProps) {
  // All hooks must be called at the top level
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([
    initialBroker1,
    initialBroker2,
  ]);
  const [selectedBrokerDetails, setSelectedBrokerDetails] = useState<(BrokerDetails | null)[]>([]);
  const [loading, setLoading] = useState(false);

  // Early return if hooks are not available (SSR context)
  if (!router || !searchParams) {
    return (
      <div className="bg-background border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Select Brokers to Compare</h2>
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading comparison tool...</p>
        </div>
      </div>
    );
  }

  // Update URL when selection changes
  const updateUrl = (newBrokers: string[]) => {
    // Filter out empty strings
    const validBrokers = newBrokers.filter(b => b);

    // Create new URL params
    const params = new URLSearchParams();
    validBrokers.forEach((broker, index) => {
      params.set(`broker${index + 1}`, broker);
    });

    // Navigate to new URL
    if (router) {
      router.push(`/compare?${params.toString()}`);
    }
  };

  // Handle broker selection change
  const handleBrokerChange = (value: string, index: number) => {
    const newBrokers = [...selectedBrokers];
    newBrokers[index] = value;
    setSelectedBrokers(newBrokers);
    updateUrl(newBrokers);
  };



  // Load broker details when selection changes
  useEffect(() => {
    const loadBrokerDetails = async () => {
      if (selectedBrokers.length === 0) {
        setSelectedBrokerDetails([]);
        return;
      }

      setLoading(true);
      try {
        const details = await Promise.all(
          selectedBrokers.map(async (brokerId) => {
            if (!brokerId) return null;
            return await getBrokerBySlug(brokerId);
          })
        );

        setSelectedBrokerDetails(details);
      } catch (error) {
        console.error("Error loading broker details:", error);
        setSelectedBrokerDetails([]);
      } finally {
        setLoading(false);
      }
    };

    loadBrokerDetails();
  }, [selectedBrokers]);

  // Sync with URL params on initial load
  useEffect(() => {
    if (!searchParams) return;

    const params = new URLSearchParams(searchParams.toString());

    // Get broker parameters (only broker1 and broker2 for 2-broker comparison)
    const brokerParams: string[] = [];
    for (let i = 1; i <= 2; i++) {
      const param = params.get(`broker${i}`);
      if (param) {
        brokerParams.push(param);
      }
    }

    // Update selected brokers if we have valid params
    if (brokerParams.length === 2) {
      setSelectedBrokers(brokerParams);
    }
  }, [searchParams]);

  return (
    <div className="space-y-8">
      {/* Broker Selection */}
      <div className="bg-background border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Select Brokers to Compare</h2>

        <div className="space-y-4">
          {/* Broker selection fields */}
          {selectedBrokers.map((brokerId, index) => (
            <div key={`broker-selector-${index}-${brokerId || 'empty'}`} className="flex items-center gap-3">
              <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                {index + 1}
              </Badge>

              <Select value={brokerId} onValueChange={(value) => handleBrokerChange(value, index)}>
                <SelectTrigger className="flex-1 bg-white dark:bg-gray-800 border-input">
                  <SelectValue placeholder="Select a broker" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50" sideOffset={4}>
                  {brokers.map((broker) => (
                    <SelectItem
                      key={broker.id}
                      value={broker.id}
                      disabled={selectedBrokers.includes(broker.id) && selectedBrokers.indexOf(broker.id) !== index}
                      className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 cursor-pointer"
                    >
                      {broker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


            </div>
          ))}

          {/* Informational text */}
          <p className="text-xs text-muted-foreground mt-4">
            Compare 2 brokers side-by-side to find the best match for your trading needs.
            Select different brokers to update the comparison.
          </p>
        </div>
      </div>

      {/* Broker Information Cards */}
      {selectedBrokerDetails.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedBrokerDetails.map((broker, index) => {
            if (!broker) return null;

            return (
              <Card key={`broker-card-${broker.id}-${index}`} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="w-6 h-6 rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={`star-${broker.id}-${i}`}
                          className={`h-4 w-4 ${i < Math.floor(broker.overall_rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}
                        />
                      ))}
                      <span className="text-sm font-medium ml-1">
                        {broker.overall_rating?.toFixed(1) || '-'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-y-2 flex-col">
                    <div className="relative w-24 h-12 bg-background rounded-md flex items-center justify-center p-2 border overflow-hidden">
                      {broker.logo_url ? (
                        <Image
                          src={broker.logo_url}
                          alt={broker.name}
                          fill
                          className="object-contain p-1"
                          onError={(e) => {
                            // @ts-expect-error - Event target type assertion needed for fallback image
                            e.target.onerror = null;
                            // @ts-expect-error - Event target type assertion needed for fallback image
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&background=random&color=fff&size=64&bold=true&format=png`;
                          }}
                        />
                      ) : (
                        <div className="font-bold text-xs text-center">{broker.name}</div>
                      )}
                    </div>
                    <CardTitle className="text-lg text-center">{broker.name}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min Deposit:</span>
                      <span className="font-medium">
                        {broker.min_deposit ? `$${broker.min_deposit}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Regulation:</span>
                      <span className="font-medium text-right">
                        {broker.regulations || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platforms:</span>
                      <span className="font-medium text-right">
                        {broker.trading_platforms || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 space-y-2">
                    <Button asChild size="sm" className="w-full">
                      <Link href={`/broker/${broker.slug}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Full Review
                      </Link>
                    </Button>
                    {broker.website_url && (
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={broker.website_url} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading broker information...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Loading fallback component
function BrokerCompareSelectorFallback() {
  return (
    <div className="bg-background border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Select Brokers to Compare</h2>
      <div className="text-center py-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading comparison tool...</p>
      </div>
    </div>
  );
}

// Main export with Suspense wrapper
export function BrokerCompareSelector(props: BrokerCompareSelectorProps) {
  return (
    <Suspense fallback={<BrokerCompareSelectorFallback />}>
      <BrokerCompareSelectorInner {...props} />
    </Suspense>
  );
}