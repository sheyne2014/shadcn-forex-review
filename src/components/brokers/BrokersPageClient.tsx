'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, Search, X, SlidersHorizontal, Star, TrendingUp, Shield, Globe, Clock, ArrowUpDown } from "lucide-react";
import { BrokerSearchCommand } from "@/components/brokers/BrokerSearchCommand";
import { AdvancedBrokerFilters } from "@/components/brokers/AdvancedBrokerFilters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBrokers, getBrokerCategories, Broker } from "@/lib/supabase/broker-client";

interface FilterState {
  minDeposit: number[];
  maxTradingFee: number[];
  minRating: number[];
  regulations: string[];
  countries: string[];
  platforms: string[];
  accountTypes: string[];
  assetTypes: string[];
  features: string[];
}

type SortOption = 'rating' | 'name' | 'min_deposit' | 'trading_fee';
type SortOrder = 'asc' | 'desc';

// Enhanced Broker Card Component
function EnhancedBrokerCard({ broker, formatSupportedAssets }: {
  broker: Broker,
  formatSupportedAssets: (supportedAssets: string | string[] | null | undefined) => string[]
}) {
  const trustScore = broker.rating ? Math.round(broker.rating * 20) : 0;
  
  return (
    <Link href={`/brokers/${broker.id}`} className="group block">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-4">
            <div className="relative">
              <div className="h-16 w-40 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center rounded-lg overflow-hidden shadow-sm">
                <img
                  src={broker.logo_url || `https://placehold.co/150x60/e2e8f0/64748b?text=${encodeURIComponent(broker.name)}`}
                  alt={`${broker.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {broker.rating && broker.rating >= 4.5 && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Top Rated
                </div>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge 
                variant={broker.rating && broker.rating >= 4.5 ? "default" : broker.rating && broker.rating >= 4 ? "secondary" : "outline"}
                className="font-medium"
              >
                {broker.rating ? (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {broker.rating}
                  </div>
                ) : 'Not Rated'}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>{trustScore}% Trust</span>
              </div>
            </div>
          </div>
          
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200 font-bold">
            {broker.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {broker.country || 'Global'} • {broker.regulations || 'Unregulated'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Min. Deposit
              </p>
              <p className="font-bold text-lg">
                {broker.min_deposit ? `$${broker.min_deposit.toLocaleString()}` : 'N/A'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Trading Fee
              </p>
              <p className="font-bold text-lg">
                {broker.trading_fee ? `${broker.trading_fee}%` : 'Variable'}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Trading Assets:</p>
            <div className="flex flex-wrap gap-1">
              {formatSupportedAssets(broker.supported_assets).slice(0, 4).map((asset: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs font-medium">
                  {asset}
                </Badge>
              ))}
              {formatSupportedAssets(broker.supported_assets).length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{formatSupportedAssets(broker.supported_assets).length - 4} more
                </Badge>
              )}
            </div>
          </div>
          
          {broker.features && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Key Features:</p>
              <div className="flex flex-wrap gap-1">
                {broker.features.slice(0, 2).map((feature: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 font-medium"
          >
            View Details 
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

// Loading Skeleton Component
function BrokerCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="h-16 w-40 rounded-lg" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="pb-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-14" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  );
}

// Enhanced BrokerGrid Component
function EnhancedBrokerGrid({ 
  brokers, 
  categoryName, 
  formatSupportedAssets, 
  isLoading 
}: {
  brokers: Broker[],
  categoryName?: string,
  formatSupportedAssets: (supportedAssets: string | string[] | null | undefined) => string[],
  isLoading?: boolean
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <BrokerCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {brokers.length > 0 ? (
        brokers.map((broker) => (
          <EnhancedBrokerCard
            key={broker.id}
            broker={broker}
            formatSupportedAssets={formatSupportedAssets}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {categoryName ? `No ${categoryName} brokers found` : 'No brokers found'}
            </h3>
            <p className="text-muted-foreground">
              {categoryName
                ? `Try adjusting your filters or check back later for ${categoryName.toLowerCase()} brokers.`
                : 'Try adjusting your filters or check back later for more brokers.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function BrokersPageClient() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    minDeposit: [0],
    maxTradingFee: [100],
    minRating: [0],
    regulations: [],
    countries: [],
    platforms: [],
    accountTypes: [],
    assetTypes: [],
    features: []
  });

  // Fetch brokers data
  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await getBrokers({
          limit: 100,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        if (error) {
          setError(error.message);
        } else {
          setBrokers(data || []);
        }
      } catch (err) {
        setError('Failed to fetch brokers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrokers();
  }, [sortBy, sortOrder]);

  // Helper function to format supported_assets
  const formatSupportedAssets = (supportedAssets: string | string[] | null | undefined) => {
    if (!supportedAssets) return [];

    if (typeof supportedAssets === 'string') {
      try {
        return JSON.parse(supportedAssets);
      } catch {
        return supportedAssets.split(',').map(asset => asset.trim());
      }
    }
    return supportedAssets;
  };

  // Helper function to get brokers by category
  const getBrokersByCategory = (categoryName: string) => {
    return brokers.filter(broker => {
      if (!broker.supported_assets) return false;

      const categoryLower = categoryName.toLowerCase();
      const parsedAssets = formatSupportedAssets(broker.supported_assets);

      return parsedAssets.some((asset: string) => {
        if (typeof asset !== 'string') return false;
        const assetLower = asset.toLowerCase();

        // Enhanced category matching
        const categoryMatches = {
          forex: ['forex', 'fx', 'currencies'],
          crypto: ['crypto', 'cryptocurrency', 'cryptocurrencies', 'bitcoin', 'ethereum', 'altcoins'],
          stocks: ['stocks', 'equities', 'shares'],
          etf: ['etf', 'etfs', 'exchange traded funds'],
          cfd: ['cfd', 'cfds', 'contracts for difference'],
          commodities: ['commodities', 'metals', 'gold', 'silver', 'oil'],
          options: ['options', 'binary options']
        };

        const matches = categoryMatches[categoryLower as keyof typeof categoryMatches] || [categoryLower];
        return matches.some(match => assetLower.includes(match));
      });
    });
  };

  // Apply filters to brokers
  const filteredBrokers = useMemo(() => {
    let filtered = activeTab === 'all' ? brokers : getBrokersByCategory(activeTab);

    // Apply filters
    filtered = filtered.filter(broker => {
      if (broker.min_deposit && broker.min_deposit < filters.minDeposit[0]) return false;
      if (broker.trading_fee && broker.trading_fee > filters.maxTradingFee[0]) return false;
      if (broker.rating && broker.rating < filters.minRating[0]) return false;
      
      if (filters.regulations.length > 0) {
        if (!broker.regulations || !filters.regulations.some(reg => 
          broker.regulations?.toLowerCase().includes(reg.toLowerCase())
        )) return false;
      }
      
      if (filters.countries.length > 0) {
        if (!broker.country || !filters.countries.includes(broker.country)) return false;
      }

      return true;
    });

    return filtered;
  }, [brokers, activeTab, filters]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      minDeposit: [0],
      maxTradingFee: [100],
      minRating: [0],
      regulations: [],
      countries: [],
      platforms: [],
      accountTypes: [],
      assetTypes: [],
      features: []
    });
  };

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split('-') as [SortOption, SortOrder];
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  if (error) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Error Loading Brokers</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="container max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Trading Broker
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Compare top-rated brokers across forex, crypto, stocks, and more. 
              Make informed decisions with our comprehensive analysis.
            </p>
            <div className="max-w-2xl mx-auto">
              <BrokerSearchCommand />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full lg:w-auto">
              <TabsTrigger value="all" className="text-xs lg:text-sm">All</TabsTrigger>
              <TabsTrigger value="forex" className="text-xs lg:text-sm">Forex</TabsTrigger>
              <TabsTrigger value="crypto" className="text-xs lg:text-sm">Crypto</TabsTrigger>
              <TabsTrigger value="stocks" className="text-xs lg:text-sm">Stocks</TabsTrigger>
              <TabsTrigger value="commodities" className="text-xs lg:text-sm">Commodities</TabsTrigger>
              <TabsTrigger value="etf" className="text-xs lg:text-sm">ETF</TabsTrigger>
              <TabsTrigger value="cfd" className="text-xs lg:text-sm">CFD</TabsTrigger>
              <TabsTrigger value="options" className="text-xs lg:text-sm">Options</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating-desc">Highest Rated</SelectItem>
                  <SelectItem value="rating-asc">Lowest Rated</SelectItem>
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                  <SelectItem value="min_deposit-asc">Lowest Deposit</SelectItem>
                  <SelectItem value="min_deposit-desc">Highest Deposit</SelectItem>
                  <SelectItem value="trading_fee-asc">Lowest Fees</SelectItem>
                  <SelectItem value="trading_fee-desc">Highest Fees</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f > 0) && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    !
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredBrokers.length} broker{filteredBrokers.length !== 1 ? 's' : ''}
              {activeTab !== 'all' && ` in ${activeTab}`}
            </p>
          </div>

          {/* Tab Contents */}
          <TabsContent value="all" className="mt-0">
            <EnhancedBrokerGrid
              brokers={filteredBrokers}
              formatSupportedAssets={formatSupportedAssets}
              isLoading={isLoading}
            />
          </TabsContent>

          {['forex', 'crypto', 'stocks', 'commodities', 'etf', 'cfd', 'options'].map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <EnhancedBrokerGrid
                brokers={filteredBrokers}
                categoryName={category.charAt(0).toUpperCase() + category.slice(1)}
                formatSupportedAssets={formatSupportedAssets}
                isLoading={isLoading}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Advanced Filters */}
        <AdvancedBrokerFilters
          open={showFilters}
          onOpenChange={setShowFilters}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": brokers.map((broker, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "FinancialService",
                "name": broker.name,
                "image": broker.logo_url,
                "description": `${broker.name} is a broker offering various trading instruments including ${formatSupportedAssets(broker.supported_assets).join(', ')}. Regulated by ${broker.regulations}.`,
                "review": {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": broker.rating,
                    "bestRating": "5"
                  }
                }
              }
            }))
          })
        }}
      />
    </div>
  );
}