'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { BrokerFilters } from "@/components/brokers/AdvancedBrokerFilters";
import { getBrokers, Broker as BrokerClientType } from "@/lib/supabase/broker-client";
import { Broker } from "@/lib/database-types";

// Transform the broker client type to match what BrokerCard expects
type ExtendedBroker = Broker & {
  logo_url: string | null;
  supported_assets: string[] | null;
  match_score?: number;
}

export function BrokersPageClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [brokers, setBrokers] = useState<ExtendedBroker[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Advanced filters state
  const [filters, setFilters] = useState<BrokerFilters>({
    minDeposit: [0],
    maxTradingFee: [5],
    minRating: [0],
    regulations: [],
    countries: [],
    platforms: [],
    accountTypes: [],
    assetTypes: [],
    features: []
  });

  // Fetch all brokers on component mount
  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch a large number of brokers to get all available
        const { data, error: fetchError } = await getBrokers({
          limit: 200,
          page: 1,
          sort_by: sortBy,
          sort_order: sortOrder
        });

        if (fetchError) {
          console.error("Error fetching brokers:", fetchError);
          setError("Failed to load brokers. Please try again later.");
          return;
        }

        // Transform the broker data to match ExtendedBroker interface
        const transformedBrokers: ExtendedBroker[] = (data || []).map((broker: BrokerClientType) => ({
          ...broker,
          slug: broker.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          logo_url: broker.logo_url || null,
          supported_assets: broker.supported_assets || null,
          match_score: undefined,
        } as unknown as ExtendedBroker));
        setBrokers(transformedBrokers);
      } catch (err) {
        console.error("Error in fetchBrokers:", err);
        setError("An unexpected error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrokers();
  }, [sortBy, sortOrder]);

  // Filter and search brokers
  const filteredBrokers = useMemo(() => {
    let filtered = [...brokers];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(broker => {
        const nameMatch = broker.name?.toLowerCase().includes(query);
        const countryMatch = broker.country?.toLowerCase().includes(query);
        return nameMatch || countryMatch;
      });
    }

    return filtered;
  }, [brokers, searchQuery]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilters({
      minDeposit: [0],
      maxTradingFee: [5],
      minRating: [0],
      regulations: [],
      countries: [],
      platforms: [],
      accountTypes: [],
      assetTypes: [],
      features: []
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery.trim()) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-900 dark:to-blue-950">
        <div className="container max-w-7xl mx-auto px-4 py-10 md:py-16 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              <span>Compare </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-300 dark:from-amber-300 dark:to-yellow-200 relative inline-block">
                110+ Forex Brokers
              </span>
              <span> in 2025</span>
            </h1>
            <p className="text-slate-100 dark:text-slate-200 mb-6 text-lg md:text-xl leading-relaxed">
              Find the perfect trading partner with our comprehensive broker comparison tools.
              Search, filter, and compare regulated brokers with real data and expert reviews.
            </p>

            {/* Search Bar in Hero */}
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                type="text"
                placeholder="Search brokers by name, regulation, or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-white/30 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-xl shadow-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              {/* Advanced Filters */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Filters ({getActiveFiltersCount()})
              </Button>

              {/* Sort Options */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="min_deposit">Min Deposit</SelectItem>
                  <SelectItem value="trading_fee">Trading Fee</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "asc" | "desc")}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">High to Low</SelectItem>
                  <SelectItem value="asc">Low to High</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear All Filters */}
              {getActiveFiltersCount() > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear All ({getActiveFiltersCount()})
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {searchQuery ? `Search Results for "${searchQuery}"` : "All Brokers"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {isLoading ? (
                  "Loading brokers..."
                ) : (
                  `Showing ${filteredBrokers.length} of ${brokers.length} brokers`
                )}
              </p>
            </div>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.regulations.map(reg => (
                  <Badge key={reg} variant="secondary" className="gap-1">
                    {reg.toUpperCase()}
                    <button
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          regulations: prev.regulations.filter(r => r !== reg)
                        }));
                      }}
                      className="ml-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {filters.assetTypes.map(asset => (
                  <Badge key={asset} variant="secondary" className="gap-1">
                    {asset}
                    <button
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          assetTypes: prev.assetTypes.filter(a => a !== asset)
                        }));
                      }}
                      className="ml-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">Loading brokers...</p>
            </div>
          </div>
        )}

        {/* Brokers Grid */}
        {!isLoading && !error && (
          <>
            {filteredBrokers.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No brokers found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Try adjusting your search criteria or filters to find more brokers.
                  </p>
                  <Button onClick={clearAllFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBrokers.map((broker, index) => (
                  <div key={broker.id} className="p-4 border rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{broker.name}</h3>
                      {sortBy === "rating" && sortOrder === "desc" && (
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-medium">
                          #{index + 1}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Rating:</span>
                        <span className="font-medium">{broker.rating ? `${broker.rating}/5` : 'N/A'}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Min Deposit:</span>
                        <span className="font-medium">${broker.min_deposit || 0}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Country:</span>
                        <span className="font-medium">{broker.country || 'N/A'}</span>
                      </div>

                      {broker.regulations && (
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Regulation:</span>
                          <span className="font-medium text-green-600 dark:text-green-400">{broker.regulations}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`/broker/${broker.slug || broker.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* SEO Content Section */}
        {!isLoading && !error && (
          <div className="mt-16 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Finding the Right Broker in 2025
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                  Choosing the right broker is a critical decision for traders in 2025. With the financial markets evolving rapidly,
                  brokers have significantly enhanced their offerings with advanced technology, improved platforms, and expanded asset classes.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                      Key Factors to Consider
                    </h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                      <li>• <strong>Regulation:</strong> Ensure your broker is regulated by reputable authorities like FCA, ASIC, or CySEC</li>
                      <li>• <strong>Trading Costs:</strong> Compare spreads, commissions, and overnight fees</li>
                      <li>• <strong>Platform Quality:</strong> Look for reliable, feature-rich trading platforms</li>
                      <li>• <strong>Asset Variety:</strong> Choose brokers offering your preferred markets</li>
                      <li>• <strong>Customer Support:</strong> 24/7 multilingual support is essential</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                      Popular Trading Assets
                    </h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                      <li>• <strong>Forex:</strong> Major, minor, and exotic currency pairs</li>
                      <li>• <strong>Stocks:</strong> Global equities from major exchanges</li>
                      <li>• <strong>Crypto:</strong> Bitcoin, Ethereum, and altcoins</li>
                      <li>• <strong>Commodities:</strong> Gold, oil, and agricultural products</li>
                      <li>• <strong>Indices:</strong> S&P 500, FTSE 100, and more</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 p-6 text-center">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {brokers.length}+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Brokers Listed
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 p-6 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {brokers.filter(b => b.regulations?.toLowerCase().includes('fca')).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  FCA Regulated
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {brokers.filter(b => (b.min_deposit || 0) === 0).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  No Min Deposit
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {brokers.filter(b => b.supported_assets?.includes('Crypto')).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Crypto Trading
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
