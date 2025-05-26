"use client";

import { useState, useEffect } from "react";
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

export function TwoBrokerComparisonTool({ brokers }: TwoBrokerComparisonToolProps) {
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

  // Sync with URL parameters
  useEffect(() => {
    if (searchParams) {
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

  // Update URL when selection changes
  const updateUrl = (broker1Id: string, broker2Id: string) => {
    if (!router) return;

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
    <div className="space-y-8">
      {/* Broker Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Select Brokers to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Broker 1 Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">
                First Broker
              </label>
              <Select value={selectedBroker1} onValueChange={handleBroker1Change}>
                <SelectTrigger className="w-full bg-background border-input hover:bg-accent hover:text-accent-foreground">
                  <SelectValue placeholder="Choose first broker..." />
                </SelectTrigger>
                <SelectContent className="bg-background border-border shadow-lg">
                  {brokers
                    .filter(broker => broker.id !== selectedBroker2)
                    .map((broker) => (
                      <SelectItem
                        key={broker.id}
                        value={broker.id}
                        className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          {broker.logo_url && (
                            <div className="w-6 h-6 relative">
                              <Image
                                src={broker.logo_url}
                                alt={broker.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <span>{broker.name}</span>
                          {broker.rating && (
                            <span className="text-xs text-muted-foreground ml-auto">
                              ★ {broker.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Broker 2 Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">
                Second Broker
              </label>
              <Select value={selectedBroker2} onValueChange={handleBroker2Change}>
                <SelectTrigger className="w-full bg-background border-input hover:bg-accent hover:text-accent-foreground">
                  <SelectValue placeholder="Choose second broker..." />
                </SelectTrigger>
                <SelectContent className="bg-background border-border shadow-lg">
                  {brokers
                    .filter(broker => broker.id !== selectedBroker1)
                    .map((broker) => (
                      <SelectItem
                        key={broker.id}
                        value={broker.id}
                        className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          {broker.logo_url && (
                            <div className="w-6 h-6 relative">
                              <Image
                                src={broker.logo_url}
                                alt={broker.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <span>{broker.name}</span>
                          {broker.rating && (
                            <span className="text-xs text-muted-foreground ml-auto">
                              ★ {broker.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          {broker1Data && broker2Data && (
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
              <Button
                onClick={navigateToComparison}
                className="flex-1"
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
        <div className="grid md:grid-cols-2 gap-6">
          {/* Broker 1 Card */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                  1
                </Badge>
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
                <div className="relative w-24 h-12 bg-background rounded-md flex items-center justify-center p-2 border overflow-hidden">
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

            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Deposit:</span>
                  <span className="font-medium">
                    {broker1Data.min_deposit ? `$${broker1Data.min_deposit}` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country:</span>
                  <span className="font-medium">{broker1Data.country || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Regulation:</span>
                  <span className="font-medium text-right">
                    {broker1Data.regulations || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assets:</span>
                  <span className="font-medium text-right">
                    {formatSupportedAssets(broker1Data.supported_assets)}
                  </span>
                </div>
              </div>

              <div className="pt-3 space-y-2">
                <Button asChild size="sm" className="w-full">
                  <Link href={`/broker/${broker1Data.slug}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Review
                  </Link>
                </Button>
                {broker1Data.website_url && (
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={broker1Data.website_url} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Broker 2 Card */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                  2
                </Badge>
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
                <div className="relative w-24 h-12 bg-background rounded-md flex items-center justify-center p-2 border overflow-hidden">
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

            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Deposit:</span>
                  <span className="font-medium">
                    {broker2Data.min_deposit ? `$${broker2Data.min_deposit}` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country:</span>
                  <span className="font-medium">{broker2Data.country || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Regulation:</span>
                  <span className="font-medium text-right">
                    {broker2Data.regulations || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assets:</span>
                  <span className="font-medium text-right">
                    {formatSupportedAssets(broker2Data.supported_assets)}
                  </span>
                </div>
              </div>

              <div className="pt-3 space-y-2">
                <Button asChild size="sm" className="w-full">
                  <Link href={`/broker/${broker2Data.slug}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Review
                  </Link>
                </Button>
                {broker2Data.website_url && (
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={broker2Data.website_url} target="_blank" rel="noopener noreferrer">
                      Visit Website
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Comparison</CardTitle>
          </CardHeader>
          <CardContent>
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
