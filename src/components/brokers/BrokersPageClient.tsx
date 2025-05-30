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
  
  // Create a safer placeholder URL to prevent missing image errors
  const getImageUrl = () => {
    if (!broker.logo_url) {
      return `/images/brokers/placeholder.svg`;
    }
    
    if (broker.logo_url.startsWith('http')) {
      return broker.logo_url;
    }
    
    // If it's a relative path but doesn't exist, use our placeholder
    return `/images/brokers/placeholder.svg`;
  };
  
  return (
    <Link href={`/brokers/${broker.id}`} className="block group">
      <Card className="h-full overflow-hidden bg-white dark:bg-slate-900 border-0 shadow-sm hover:shadow-md transition-all duration-300 ring-1 ring-slate-200/80 dark:ring-slate-800/80 hover:ring-indigo-200 dark:hover:ring-indigo-900">
        {broker.rating && broker.rating >= 4.5 && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-sm py-1">
              <Star className="h-3 w-3 mr-1 fill-white" />
              Top Rated
            </Badge>
          </div>
        )}
        
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-white/0 to-white/10 dark:from-indigo-900/10 dark:via-slate-900/0 dark:to-slate-900/5"></div>
          <div className="flex items-center justify-between p-6 relative">
            <div className="flex flex-col gap-1">
              <div className="h-14 flex items-center">
                <img
                  src={getImageUrl()}
                  alt={`${broker.name} logo`}
                  className="max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = `/images/brokers/placeholder.svg`;
                  }}
                />
              </div>
              <div className="space-y-1 mt-3">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {broker.name}
                </h3>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <Globe className="h-3 w-3 mr-1" />
                  {broker.country || 'Global'} 
                  {broker.regulations && (
                    <>
                      <span className="mx-1.5 text-slate-300 dark:text-slate-600">•</span> 
                      {broker.regulations}
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {broker.rating && (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{broker.rating}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-1.5 w-1.5 ${broker.rating && i < Math.round(broker.rating) ? 'fill-amber-500 text-amber-500' : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
          
        <div className="grid grid-cols-2 gap-px bg-slate-100 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800">
          <div className="py-3 px-4 bg-white dark:bg-slate-900">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Min. Deposit</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {broker.min_deposit ? `$${broker.min_deposit.toLocaleString()}` : 'N/A'}
            </p>
          </div>
          <div className="py-3 px-4 bg-white dark:bg-slate-900">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Trading Fee</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {broker.trading_fee ? `${broker.trading_fee}%` : 'Variable'}
            </p>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Supported Assets</p>
            <div className="flex flex-wrap gap-1.5">
              {formatSupportedAssets(broker.supported_assets).slice(0, 4).map((asset: string, index: number) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs py-0.5 px-2 bg-slate-100 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-0"
                >
                  {asset}
                </Badge>
              ))}
              {formatSupportedAssets(broker.supported_assets).length > 4 && (
                <Badge 
                  variant="secondary" 
                  className="text-xs py-0.5 px-2 bg-slate-100 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-0"
                >
                  +{formatSupportedAssets(broker.supported_assets).length - 4}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
            >
              <span className="font-medium">View Details</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// Loading Skeleton Component
function BrokerCardSkeleton() {
  return (
    <Card className="h-full border-0 bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200/80 dark:ring-slate-800/80 overflow-hidden">
      <div className="p-6 relative bg-gradient-to-b from-slate-50/50 via-white/0 to-white dark:from-slate-800/50 dark:via-slate-900/0 dark:to-slate-900">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-32 mb-2 rounded-lg" />
          <Skeleton className="h-6 w-36 mt-2" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-px bg-slate-100 dark:bg-slate-800">
        <div className="p-4 bg-white dark:bg-slate-900">
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="p-4 bg-white dark:bg-slate-900">
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      
      <div className="p-4">
        <Skeleton className="h-3 w-24 mb-3" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
        
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <BrokerCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Ensure brokers is always an array even if data is missing
  const brokersToDisplay = Array.isArray(brokers) ? brokers : [];

  if (brokersToDisplay.length === 0) {
    return (
      <div className="col-span-full text-center py-16 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="max-w-md mx-auto p-6">
          <div className="w-20 h-20 mx-auto mb-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
            <Search className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
            {categoryName ? `No ${categoryName} brokers found` : 'No brokers found'}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
            {categoryName
              ? `Try adjusting your filters or check back later for ${categoryName.toLowerCase()} brokers.`
              : 'Try adjusting your filters or check back later for more brokers.'
            }
          </p>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80"
          >
            <X className="h-4 w-4 mr-2" /> Clear all filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {brokersToDisplay.map((broker) => (
        <EnhancedBrokerCard
          key={broker.id}
          broker={broker}
          formatSupportedAssets={formatSupportedAssets}
        />
      ))}
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
          setError(error instanceof Error ? error.message : 'Unknown database error');
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section - Modern Design */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-700 dark:from-indigo-900 dark:to-blue-950">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 py-16 md:py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-indigo-100">
              Comparing <span className="text-white">100+ Brokers</span> Across <span className="text-white">7 Asset Classes</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Find Your Ideal Trading Broker
            </h1>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Compare top-rated brokers across forex, crypto, stocks, and more to find the perfect match for your trading style.
            </p>
            <div className="max-w-xl mx-auto relative z-10">
              <BrokerSearchCommand />
              
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/10 py-1.5">
                  <Shield className="h-3 w-3 mr-1" />
                  Regulated Brokers
                </Badge>
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/10 py-1.5">
                  <Star className="h-3 w-3 mr-1" />
                  Expert Reviews
                </Badge>
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/10 py-1.5">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Performance Metrics
                </Badge>
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/10 py-1.5">
                  <Clock className="h-3 w-3 mr-1" />
                  Updated Daily
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Enhanced UI */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="bg-white dark:bg-slate-900 shadow-md rounded-xl p-1.5 w-full lg:w-auto overflow-hidden border border-slate-100 dark:border-slate-800">
              <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full lg:w-auto bg-slate-50/70 dark:bg-slate-800/50 rounded-lg p-0.5">
                <TabsTrigger value="all" className="rounded-md text-xs md:text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">All</TabsTrigger>
                <TabsTrigger value="forex" className="rounded-md text-xs md:text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">Forex</TabsTrigger>
                <TabsTrigger value="crypto" className="rounded-md text-xs md:text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">Crypto</TabsTrigger>
                <TabsTrigger value="stocks" className="rounded-md text-xs md:text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">Stocks</TabsTrigger>
                <TabsTrigger value="commodities" className="rounded-md text-xs md:text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">Commodities</TabsTrigger>
                <TabsTrigger value="etf" className="rounded-md text-xs md:text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">ETF</TabsTrigger>
                <TabsTrigger value="cfd" className="rounded-md text-xs md:text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">CFD</TabsTrigger>
                <TabsTrigger value="options" className="rounded-md text-xs md:text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">Options</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex items-center gap-2">
              <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
                <SelectTrigger className="w-40 md:w-48 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <ArrowUpDown className="h-3.5 w-3.5 mr-2 text-indigo-500" />
                    <SelectValue />
                  </div>
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
                size="icon"
                className="h-10 w-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg shadow-sm"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-4 w-4 text-indigo-500" />
                <span className="sr-only">Filters</span>
                {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f > 0) && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-indigo-500"></span>
                )}
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/70">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {filteredBrokers.length} broker{filteredBrokers.length !== 1 ? 's' : ''}
                {activeTab !== 'all' && <span className="ml-1">in <span className="font-semibold text-indigo-600 dark:text-indigo-400">{activeTab}</span></span>}
              </p>
            </div>
            
            {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f > 0) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearFilters}
                className="h-8 gap-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800/70"
              >
                <X className="h-3 w-3" /> Clear filters
              </Button>
            )}
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