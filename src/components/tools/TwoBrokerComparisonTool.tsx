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
import { Star, ExternalLink, ArrowRight, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Broker {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  rating?: number;
  min_deposit?: number;
  trading_fee?: number;
  regulations?: string;
  country?: string;
  supported_assets?: string[] | string;
  website_url?: string;
  trading_platforms?: string;
}

interface TwoBrokerComparisonToolProps {
  brokers: Broker[];
}

function TwoBrokerComparisonToolInner({ brokers }: TwoBrokerComparisonToolProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedBroker1, setSelectedBroker1] = useState<string>("");
  const [selectedBroker2, setSelectedBroker2] = useState<string>("");
  const [broker1Data, setBroker1Data] = useState<Broker | null>(null);
  const [broker2Data, setBroker2Data] = useState<Broker | null>(null);
  const [loading, setLoading] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  // Get broker data by ID
  const getBrokerById = (id: string): Broker | null => {
    return brokers.find(broker => broker.id === id) || null;
  };

  // Update broker data when selection changes
  useEffect(() => {
    if (selectedBroker1) {
      setBroker1Data(getBrokerById(selectedBroker1));
    } else {
      setBroker1Data(null);
    }
  }, [selectedBroker1, brokers]);

  useEffect(() => {
    if (selectedBroker2) {
      setBroker2Data(getBrokerById(selectedBroker2));
    } else {
      setBroker2Data(null);
    }
  }, [selectedBroker2, brokers]);

  // Sync with URL parameters (only on client side)
  useEffect(() => {
    if (typeof window !== 'undefined' && searchParams) {
      const broker1 = searchParams.get('broker1');
      const broker2 = searchParams.get('broker2');

      if (broker1 && brokers.find(b => b.id === broker1)) {
        setSelectedBroker1(broker1);
      }
      if (broker2 && brokers.find(b => b.id === broker2)) {
        setSelectedBroker2(broker2);
      }
    }
  }, [searchParams, brokers]);

  // Update URL when selection changes (only on client side)
  const updateUrl = (broker1Id: string, broker2Id: string) => {
    if (typeof window === 'undefined' || !router) return;

    const params = new URLSearchParams();
    if (broker1Id) params.set('broker1', broker1Id);
    if (broker2Id) params.set('broker2', broker2Id);

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(`/tools/compare-two${newUrl}`, { scroll: false });
  };

  // Handle broker selection
  const handleBroker1Change = (value: string) => {
    setSelectedBroker1(value);
    updateUrl(value, selectedBroker2);
  };

  const handleBroker2Change = (value: string) => {
    setSelectedBroker2(value);
    updateUrl(selectedBroker1, value);
  };

  // Generate comparison URL
  const generateComparisonUrl = () => {
    if (!broker1Data || !broker2Data) return;

    const broker1Slug = broker1Data.slug || broker1Data.name.toLowerCase().replace(/\s+/g, '-');
    const broker2Slug = broker2Data.slug || broker2Data.name.toLowerCase().replace(/\s+/g, '-');

    return `/compare/${broker1Slug}-vs-${broker2Slug}`;
  };

  // Copy comparison URL to clipboard
  const copyComparisonUrl = async () => {
    const comparisonUrl = generateComparisonUrl();
    if (!comparisonUrl) return;

    const fullUrl = `${window.location.origin}${comparisonUrl}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setUrlCopied(true);
      toast.success("Comparison URL copied to clipboard!");
      setTimeout(() => setUrlCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy URL");
    }
  };

  // Navigate to detailed comparison
  const navigateToComparison = () => {
    const comparisonUrl = generateComparisonUrl();
    if (comparisonUrl) {
      router.push(comparisonUrl);
    }
  };

  // Format supported assets
  const formatSupportedAssets = (assets: string[] | string | undefined): string => {
    if (!assets) return 'N/A';
    if (typeof assets === 'string') return assets;
    if (Array.isArray(assets)) return assets.join(', ');
    return 'N/A';
  };

  return (
    <div className="space-y-8" suppressHydrationWarning>
      {/* Broker Selection */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-xl">Select Brokers to Compare</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Broker 1 Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                First Broker
              </label>
              <Select value={selectedBroker1} onValueChange={handleBroker1Change}>
                <SelectTrigger className="w-full dark:bg-gray-800 bg-white border-input hover:bg-accent hover:text-accent-foreground shadow-sm">
                  <SelectValue placeholder="Choose first broker..." />
                </SelectTrigger>
                <SelectContent sideOffset={4} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md p-0" style={{ backdropFilter: 'none', opacity: 1, backgroundColor: 'var(--background)' }}>
                  <div className="max-h-80 overflow-y-auto bg-white dark:bg-gray-800 p-1">
                    {brokers
                      .filter(broker => broker.id !== selectedBroker2)
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((broker) => (
                        <SelectItem
                          key={broker.id}
                          value={broker.id}
                          className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 my-1 rounded-md"
                        >
                          <div className="flex items-center gap-3 py-1">
                            {broker.logo_url && (
                              <div className="w-7 h-7 relative flex-shrink-0 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white">
                                <Image
                                  src={broker.logo_url}
                                  alt={broker.name}
                                  fill
                                  className="object-contain p-0.5"
                                />
                              </div>
                            )}
                            <span className="font-medium truncate">{broker.name}</span>
                            {broker.rating && (
                              <span className="text-xs ml-auto bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full flex items-center">
                                <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-0.5" />
                                {broker.rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                  </div>
                </SelectContent>
              </Select>
            </div>

            {/* Broker 2 Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Second Broker
              </label>
              <Select value={selectedBroker2} onValueChange={handleBroker2Change}>
                <SelectTrigger className="w-full dark:bg-gray-800 bg-white border-input hover:bg-accent hover:text-accent-foreground shadow-sm">
                  <SelectValue placeholder="Choose second broker..." />
                </SelectTrigger>
                <SelectContent sideOffset={4} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md p-0" style={{ backdropFilter: 'none', opacity: 1, backgroundColor: 'var(--background)' }}>
                  <div className="max-h-80 overflow-y-auto bg-white dark:bg-gray-800 p-1">
                    {brokers
                      .filter(broker => broker.id !== selectedBroker1)
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((broker) => (
                        <SelectItem
                          key={broker.id}
                          value={broker.id}
                          className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 my-1 rounded-md"
                        >
                          <div className="flex items-center gap-3 py-1">
                            {broker.logo_url && (
                              <div className="w-7 h-7 relative flex-shrink-0 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white">
                                <Image
                                  src={broker.logo_url}
                                  alt={broker.name}
                                  fill
                                  className="object-contain p-0.5"
                                />
                              </div>
                            )}
                            <span className="font-medium truncate">{broker.name}</span>
                            {broker.rating && (
                              <span className="text-xs ml-auto bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full flex items-center">
                                <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-0.5" />
                                {broker.rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          {broker1Data && broker2Data && (
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
              <Button
                onClick={navigateToComparison}
                className="flex-1 bg-primary hover:bg-primary/90"
                size="lg"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Compare Now
              </Button>
              <Button
                onClick={copyComparisonUrl}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                {urlCopied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {urlCopied ? 'Copied!' : 'Copy Link'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Broker Preview Cards */}
      {broker1Data && broker2Data && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Broker 1 Card */}
          <Card className="border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <CardHeader className="pb-3 border-b bg-muted/30">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="px-3">Broker 1</Badge>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(broker1Data.rating || 0)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">
                    {broker1Data.rating?.toFixed(1) || '-'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="relative w-28 h-14 bg-background rounded-md flex items-center justify-center p-2 border overflow-hidden">
                  {broker1Data.logo_url ? (
                    <Image
                      src={broker1Data.logo_url}
                      alt={broker1Data.name}
                      fill
                      className="object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker1Data.name)}&background=random&color=fff&size=64&bold=true&format=png`;
                      }}
                    />
                  ) : (
                    <div className="font-bold text-xs text-center">{broker1Data.name}</div>
                  )}
                </div>
                <CardTitle className="text-lg text-center">{broker1Data.name}</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2.5">
                <div className="flex justify-between items-center py-1 border-b border-dashed border-border/50">
                  <span className="text-muted-foreground text-sm">Min Deposit</span>
                  <span className="font-medium">
                    {broker1Data.min_deposit ? `$${broker1Data.min_deposit}` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-dashed border-border/50">
                  <span className="text-muted-foreground text-sm">Country</span>
                  <span className="font-medium">{broker1Data.country || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-dashed border-border/50">
                  <span className="text-muted-foreground text-sm">Regulation</span>
                  <span className="font-medium text-right max-w-[180px] truncate" title={broker1Data.regulations || 'N/A'}>
                    {broker1Data.regulations || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground text-sm">Assets</span>
                  <span className="font-medium text-right max-w-[180px] truncate" title={formatSupportedAssets(broker1Data.supported_assets)}>
                    {formatSupportedAssets(broker1Data.supported_assets)}
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Button asChild size="sm" className="w-full">
                  <Link href={`/broker/${broker1Data.slug}`}>
                    View Full Review
                  </Link>
                </Button>
                {broker1Data.website_url && (
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={broker1Data.website_url} target="_blank" rel="noopener noreferrer">
                      Visit Website <ExternalLink className="h-3 w-3 ml-1.5" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Broker 2 Card */}
          <Card className="border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <CardHeader className="pb-3 border-b bg-muted/30">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="px-3">Broker 2</Badge>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(broker2Data.rating || 0)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">
                    {broker2Data.rating?.toFixed(1) || '-'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="relative w-28 h-14 bg-background rounded-md flex items-center justify-center p-2 border overflow-hidden">
                  {broker2Data.logo_url ? (
                    <Image
                      src={broker2Data.logo_url}
                      alt={broker2Data.name}
                      fill
                      className="object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker2Data.name)}&background=random&color=fff&size=64&bold=true&format=png`;
                      }}
                    />
                  ) : (
                    <div className="font-bold text-xs text-center">{broker2Data.name}</div>
                  )}
                </div>
                <CardTitle className="text-lg text-center">{broker2Data.name}</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2.5">
                <div className="flex justify-between items-center py-1 border-b border-dashed border-border/50">
                  <span className="text-muted-foreground text-sm">Min Deposit</span>
                  <span className="font-medium">
                    {broker2Data.min_deposit ? `$${broker2Data.min_deposit}` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-dashed border-border/50">
                  <span className="text-muted-foreground text-sm">Country</span>
                  <span className="font-medium">{broker2Data.country || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-dashed border-border/50">
                  <span className="text-muted-foreground text-sm">Regulation</span>
                  <span className="font-medium text-right max-w-[180px] truncate" title={broker2Data.regulations || 'N/A'}>
                    {broker2Data.regulations || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground text-sm">Assets</span>
                  <span className="font-medium text-right max-w-[180px] truncate" title={formatSupportedAssets(broker2Data.supported_assets)}>
                    {formatSupportedAssets(broker2Data.supported_assets)}
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Button asChild size="sm" className="w-full">
                  <Link href={`/broker/${broker2Data.slug}`}>
                    View Full Review
                  </Link>
                </Button>
                {broker2Data.website_url && (
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={broker2Data.website_url} target="_blank" rel="noopener noreferrer">
                      Visit Website <ExternalLink className="h-3 w-3 ml-1.5" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Comparison Table */}
      {broker1Data && broker2Data && (
        <Card className="shadow-sm border">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-xl">Quick Comparison</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Feature</th>
                    <th className="text-center py-3 px-4 font-medium">{broker1Data.name}</th>
                    <th className="text-center py-3 px-4 font-medium">{broker2Data.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 px-4 font-medium text-muted-foreground">Overall Rating</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                        {broker1Data.rating?.toFixed(1) || 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                        {broker2Data.rating?.toFixed(1) || 'N/A'}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-muted-foreground">Minimum Deposit</td>
                    <td className="py-3 px-4 text-center">
                      {broker1Data.min_deposit ? `$${broker1Data.min_deposit}` : 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {broker2Data.min_deposit ? `$${broker2Data.min_deposit}` : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-muted-foreground">Country</td>
                    <td className="py-3 px-4 text-center">{broker1Data.country || 'N/A'}</td>
                    <td className="py-3 px-4 text-center">{broker2Data.country || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-muted-foreground">Regulation</td>
                    <td className="py-3 px-4 text-center">{broker1Data.regulations || 'N/A'}</td>
                    <td className="py-3 px-4 text-center">{broker2Data.regulations || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-muted-foreground">Supported Assets</td>
                    <td className="py-3 px-4 text-center">
                      {formatSupportedAssets(broker1Data.supported_assets)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {formatSupportedAssets(broker2Data.supported_assets)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <Button onClick={navigateToComparison} size="lg" className="w-full sm:w-auto">
                <ArrowRight className="w-4 h-4 mr-2" />
                View Detailed Comparison
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Loading fallback component
function TwoBrokerComparisonToolFallback() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Select Brokers to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading comparison tool...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main export with Suspense wrapper
export function TwoBrokerComparisonTool(props: TwoBrokerComparisonToolProps) {
  return (
    <Suspense fallback={<TwoBrokerComparisonToolFallback />}>
      <TwoBrokerComparisonToolInner {...props} />
    </Suspense>
  );
}
