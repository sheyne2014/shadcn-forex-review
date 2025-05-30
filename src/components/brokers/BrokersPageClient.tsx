'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { AdvancedBrokerFilters } from "@/components/brokers/AdvancedBrokerFilters";
import { getBrokers, Broker } from "@/lib/supabase/broker-client";

// Import Lucide icons individually to avoid conflicts
import { ChevronRight } from "lucide-react";
import { Filter } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { Star } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { Shield } from "lucide-react";
import { Globe } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Percent } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Building2 } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { SearchX } from "lucide-react";
import { X } from "lucide-react";

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
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col h-full">
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-5 w-10 rounded-md" />
            <Skeleton className="h-5 w-12 rounded-md" />
          </div>
        </div>
        
        <Skeleton className="h-4 w-3/4 mb-1" />
        <Skeleton className="h-3 w-32 mb-3" />
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
            <Skeleton className="h-3 w-14 mb-0.5" />
            <Skeleton className="h-3 w-10" />
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
            <Skeleton className="h-3 w-14 mb-0.5" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
        
        <Skeleton className="h-3 w-20 mb-2" />
        <div className="flex gap-1">
          <Skeleton className="h-5 w-12 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-10 rounded-md" />
        </div>
      </div>
      
      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
}

// New Enhanced Broker Grid component
interface EnhancedBrokerGridProps {
  brokers: any[];
  categoryName?: string;
  formatSupportedAssets: (assets: string | string[] | null | undefined) => string[];
  isLoading: boolean;
}

const EnhancedBrokerGrid = ({ 
  brokers, 
  categoryName, 
  formatSupportedAssets,
  isLoading
}: EnhancedBrokerGridProps) => {
  // If loading, show skeleton cards
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <BrokerCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // If no brokers found
  if (brokers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="mb-4 bg-slate-100 dark:bg-slate-800 p-3 rounded-full">
          <SearchX className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No brokers found</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-4">
          We couldn't find any brokers matching your criteria. Try adjusting your filters or search query.
        </p>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.location.reload()}>
          <RefreshCw className="h-3.5 w-3.5" />
          Reset filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {brokers.map((broker) => {
        const brokerAssets = formatSupportedAssets(broker.supported_assets || broker.assets);
        const extraAssetsCount = brokerAssets.length > 3 ? brokerAssets.length - 3 : 0;
        const displayedAssets = brokerAssets.slice(0, 3);
        
        // Prepare logo URL with fallback
        const logoUrl = broker.logo || broker.logo_url || "/images/brokers/placeholder.svg";
        
        return (
          <Link 
            href={`/brokers/${broker.id}`} 
            key={broker.id}
            className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-200 hover:shadow-md group hover:border-indigo-200 dark:hover:border-indigo-800 flex flex-col h-full"
          >
            <div className="flex flex-col flex-1">
              <div className="p-4 flex-1">
                {/* Top row: Logo, Rating */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-white border border-slate-100 dark:border-slate-700 flex items-center justify-center">
                      <img 
                        src={logoUrl} 
                        alt={`${broker.name} logo`} 
                        className="max-h-8 max-w-8 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/brokers/placeholder.svg";
                        }}
                      />
                    </div>
                    {broker.top_rated && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 rounded-full border border-amber-100 dark:border-amber-900/50 whitespace-nowrap">Top Rated</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-xs font-medium bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded-md border border-slate-100 dark:border-slate-700">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-0.5" />
                      {broker.rating ? broker.rating.toFixed(1) : "N/A"}
                    </div>
                    <div className="flex items-center text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/50 whitespace-nowrap">
                      <Shield className="h-2.5 w-2.5 mr-0.5" />
                      <span>{broker.trust_score || "N/A"}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Broker name and location */}
                <h3 className="text-sm font-semibold mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">{broker.name}</h3>
                <div className="flex items-center text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                  <Globe className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{broker.country && `${broker.country} • `}{broker.regulation || broker.regulations || "Regulation info not available"}</span>
                </div>
                
                {/* Min deposit and trading fee */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center mb-0.5">
                      <CreditCard className="h-3 w-3 mr-1 flex-shrink-0" />
                      Min. Deposit
                    </p>
                    <p className="text-xs font-medium truncate">{broker.min_deposit ? `$${broker.min_deposit}` : "N/A"}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center mb-0.5">
                      <Percent className="h-3 w-3 mr-1 flex-shrink-0" />
                      Trading Fee
                    </p>
                    <p className="text-xs font-medium truncate">{broker.trading_fee ? `${broker.trading_fee}%` : "Variable"}</p>
                  </div>
                </div>
                
                {/* Trading assets */}
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1.5">Trading Assets:</p>
                  <div className="flex flex-wrap gap-1">
                    {displayedAssets.map((asset, index) => (
                      <span 
                        key={index} 
                        className="text-[10px] font-medium px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200/50 dark:border-slate-700/50"
                      >
                        {asset}
                      </span>
                    ))}
                    {extraAssetsCount > 0 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                        +{extraAssetsCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Button */}
              <div className="p-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                <Button size="sm" className="w-full justify-between group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/30 dark:group-hover:text-indigo-400 transition-colors h-8" variant="outline">
                  <span className="text-xs">View Details</span>
                  <ChevronRight className="h-3 w-3 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

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
        // Simulate API delay for development
        setTimeout(() => {
          // Use only the brokers we have logos for
          const mockBrokers: Broker[] = [
            {
              id: 'broker-1',
              name: "IC Markets",
              logo_url: "/images/brokers/ic-markets.png",
              rating: 4.7,
              trust_score: 92,
              country: "Australia",
              regulations: "ASIC, FCA, CySEC",
              min_deposit: 200,
              trading_fee: 0.2,
              top_rated: true,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-2',
              name: "Pepperstone",
              logo_url: "/images/brokers/pepperstone.png",
              rating: 4.5,
              trust_score: 90,
              country: "UK",
              regulations: "ASIC, FCA, CySEC, DFSA",
              min_deposit: 200,
              trading_fee: 0.1,
              top_rated: true,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks"],
            },
            {
              id: 'broker-3',
              name: "XM",
              logo_url: "/images/brokers/xm.png",
              rating: 4.3,
              trust_score: 85,
              country: "Cyprus",
              regulations: "CySEC, IFSC",
              min_deposit: 5,
              trading_fee: 1.7,
              top_rated: true,
              supported_assets: ["Forex", "Indices", "Metals", "Energies"],
            },
            {
              id: 'broker-4',
              name: "OANDA",
              logo_url: "/images/brokers/oanda.png",
              rating: 4.4,
              trust_score: 88,
              country: "US",
              regulations: "FCA, ASIC, CFTC",
              min_deposit: 0,
              trading_fee: 1.2,
              top_rated: true,
              supported_assets: ["Forex", "Indices", "Commodities", "Bonds"],
            },
            {
              id: 'broker-5',
              name: "Interactive Brokers",
              logo_url: "/images/brokers/interactive-brokers.png",
              rating: 4.6,
              trust_score: 95,
              country: "US",
              regulations: "SEC, FCA, CFTC",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: true,
              supported_assets: ["Stocks", "Forex", "Options", "Futures", "Bonds", "Funds"],
            },
            {
              id: 'broker-6',
              name: "Plus500",
              logo_url: "/images/brokers/plus500.png",
              rating: 4.2,
              trust_score: 83,
              country: "Israel",
              regulations: "FCA, CySEC, ASIC",
              min_deposit: 100,
              trading_fee: 0.1,
              top_rated: false,
              supported_assets: ["Forex", "Crypto", "Commodities", "Indices", "Stocks"],
            },
            {
              id: 'broker-7',
              name: "eToro",
              logo_url: "/images/brokers/etoro.png",
              rating: 4.1,
              trust_score: 82,
              country: "Cyprus",
              regulations: "FCA, CySEC, ASIC",
              min_deposit: 50,
              trading_fee: 1.0,
              top_rated: false,
              supported_assets: ["Stocks", "Crypto", "Forex", "Commodities", "ETFs"],
            },
            {
              id: 'broker-8',
              name: "Binance",
              logo_url: "/images/brokers/binance.png",
              rating: 4.4,
              trust_score: 80,
              country: "Global",
              regulations: "Various",
              min_deposit: 0,
              trading_fee: 0.1,
              top_rated: false,
              supported_assets: ["Bitcoin", "Ethereum", "Altcoins", "Stablecoins"],
            },
            {
              id: 'broker-9',
              name: "Coinbase",
              logo_url: "/images/brokers/coinbase.png",
              rating: 4.2,
              trust_score: 85,
              country: "US",
              regulations: "SEC, CFTC",
              min_deposit: 0,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Bitcoin", "Ethereum", "Altcoins", "Stablecoins"],
            },
            {
              id: 'broker-10',
              name: "Kraken",
              logo_url: "/images/brokers/kraken.png",
              rating: 4.3,
              trust_score: 87,
              country: "US",
              regulations: "FCA, ASIC",
              min_deposit: 0,
              trading_fee: 0.2,
              top_rated: false,
              supported_assets: ["Bitcoin", "Ethereum", "Altcoins", "Forex"],
            },
            {
              id: 'broker-11',
              name: "Capital.com",
              logo_url: "/images/brokers/capital-com.png",
              rating: 4.0,
              trust_score: 79,
              country: "UK",
              regulations: "FCA, CySEC, ASIC",
              min_deposit: 20,
              trading_fee: 0.8,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto", "Stocks"],
            },
            {
              id: 'broker-12',
              name: "XTB",
              logo_url: "/images/brokers/xtb.png",
              rating: 4.1,
              trust_score: 81,
              country: "Poland",
              regulations: "KNF, FCA, CySEC",
              min_deposit: 0,
              trading_fee: 0.07,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "ETFs"],
            },
            {
              id: 'broker-13',
              name: "FXCM",
              logo_url: "/images/brokers/fxcm.png",
              rating: 3.9,
              trust_score: 75,
              country: "UK",
              regulations: "FCA",
              min_deposit: 50,
              trading_fee: 0.4,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities"],
            },
            {
              id: 'broker-14',
              name: "Crypto.com",
              logo_url: "/images/brokers/crypto-com.png",
              rating: 4.0,
              trust_score: 78,
              country: "Hong Kong",
              regulations: "Various",
              min_deposit: 0,
              trading_fee: 0.4,
              top_rated: false,
              supported_assets: ["Bitcoin", "Ethereum", "Altcoins", "Stablecoins"],
            },
            {
              id: 'broker-15',
              name: "Gemini",
              logo_url: "/images/brokers/gemini.png", 
              rating: 4.1,
              trust_score: 82,
              country: "US",
              regulations: "NYDFS",
              min_deposit: 0,
              trading_fee: 0.35,
              top_rated: false,
              supported_assets: ["Bitcoin", "Ethereum", "Altcoins", "Stablecoins"],
            },
            {
              id: 'broker-16',
              name: "Saxo Bank",
              logo_url: "/images/brokers/saxo-bank.png",
              rating: 4.5,
              trust_score: 91,
              country: "Denmark",
              regulations: "FCA, ASIC, MAS",
              min_deposit: 500,
              trading_fee: 0.1,
              top_rated: false,
              supported_assets: ["Forex", "Stocks", "Bonds", "ETFs", "Futures", "Options"],
            },
            {
              id: 'broker-17',
              name: "Swissquote",
              logo_url: "/images/brokers/swissquote.svg",
              rating: 4.3,
              trust_score: 89,
              country: "Switzerland",
              regulations: "FINMA, FCA",
              min_deposit: 1000,
              trading_fee: 0.25,
              top_rated: false,
              supported_assets: ["Forex", "Stocks", "Commodities", "Indices", "Crypto"],
            },
            {
              id: 'broker-18',
              name: "TD Ameritrade",
              logo_url: "/images/brokers/td-ameritrade.svg",
              rating: 4.6,
              trust_score: 93,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Options", "Futures", "Forex", "Bonds"],
            },
            {
              id: 'broker-19',
              name: "TradeStation Global",
              logo_url: "/images/brokers/tradestation-global.svg",
              rating: 4.2,
              trust_score: 84,
              country: "UK",
              regulations: "FCA",
              min_deposit: 100,
              trading_fee: 0.3,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Options", "Futures", "Crypto"],
            },
            {
              id: 'broker-20',
              name: "Axi",
              logo_url: "/images/brokers/axi.svg",
              rating: 3.8,
              trust_score: 74,
              country: "Australia",
              regulations: "ASIC, FCA, DFSA",
              min_deposit: 200,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-21',
              name: "StarTrader",
              logo_url: "/images/brokers/startrader.svg",
              rating: 3.7,
              trust_score: 72,
              country: "UK",
              regulations: "FCA",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities"],
            },
            {
              id: 'broker-22',
              name: "DeGiro",
              logo_url: "/images/brokers/degiro.svg",
              rating: 4.4,
              trust_score: 86,
              country: "Netherlands",
              regulations: "AFM, DNB",
              min_deposit: 0,
              trading_fee: 0.15,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Bonds", "Options", "Futures"],
            },
            {
              id: 'broker-23',
              name: "Tradovate Futures",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.2,
              trust_score: 84,
              country: "US",
              regulations: "CFTC, NFA",
              min_deposit: 500,
              trading_fee: 0.25,
              top_rated: false,
              supported_assets: ["Futures", "Commodities", "Indices"],
            },
            {
              id: 'broker-24',
              name: "HotForex ECN",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.1,
              trust_score: 82,
              country: "Cyprus",
              regulations: "CySEC, FCA, FSCA",
              min_deposit: 200,
              trading_fee: 0.4,
              top_rated: false,
              supported_assets: ["Forex", "Metals", "Energies", "Indices", "Crypto"],
            },
            {
              id: 'broker-25',
              name: "Forex.com",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.3,
              trust_score: 86,
              country: "US",
              regulations: "CFTC, FCA, ASIC",
              min_deposit: 100,
              trading_fee: 0.8,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-26',
              name: "HYCM",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "UK",
              regulations: "FCA, CySEC, DFSA",
              min_deposit: 100,
              trading_fee: 1.2,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks"],
            },
            {
              id: 'broker-27',
              name: "Monex",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "Japan",
              regulations: "FINRA, SIPC, FSA",
              min_deposit: 1000,
              trading_fee: 0.15,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Bonds", "Forex"],
            },
            {
              id: 'broker-28',
              name: "FXTM",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.1,
              trust_score: 83,
              country: "Cyprus",
              regulations: "CySEC, FCA, FSCA",
              min_deposit: 10,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "ETFs"],
            },
            {
              id: 'broker-29',
              name: "Huobi",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 79,
              country: "Seychelles",
              regulations: "Various",
              min_deposit: 0,
              trading_fee: 0.2,
              top_rated: false,
              supported_assets: ["Bitcoin", "Ethereum", "Altcoins", "Stablecoins", "Tokens"],
            },
            {
              id: 'broker-30',
              name: "ATFX",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 77,
              country: "UK",
              regulations: "FCA, CySEC, FSCA",
              min_deposit: 500,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-31',
              name: "FXOpen",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "UK",
              regulations: "FCA, ASIC",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Crypto", "Indices", "Commodities"],
            },
            {
              id: 'broker-32',
              name: "Dukascopy",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.2,
              trust_score: 84,
              country: "Switzerland",
              regulations: "FINMA, JFSA, CFTC",
              min_deposit: 100,
              trading_fee: 0.8,
              top_rated: false,
              supported_assets: ["Forex", "CFDs", "Crypto", "Metals"],
            },
            {
              id: 'broker-33',
              name: "BlackBull Markets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "New Zealand",
              regulations: "FMA, FSA",
              min_deposit: 200,
              trading_fee: 0.7,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-34',
              name: "Merrill Edge",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.4,
              trust_score: 88,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Options", "Bonds", "Mutual Funds"],
            },
            {
              id: 'broker-35',
              name: "Trading 212",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.2,
              trust_score: 84,
              country: "UK",
              regulations: "FCA, FSC",
              min_deposit: 1,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Forex", "Commodities", "Crypto"],
            },
            {
              id: 'broker-36',
              name: "M1 Finance",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.3,
              trust_score: 86,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 100,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Bonds", "Pies"],
            },
            {
              id: 'broker-37',
              name: "Kotak Securities",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "India",
              regulations: "SEBI",
              min_deposit: 0,
              trading_fee: 0.1,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "IPOs", "Mutual Funds"],
            },
            {
              id: 'broker-38',
              name: "Optimus Futures",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "US",
              regulations: "CFTC, NFA",
              min_deposit: 500,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Futures", "Commodities", "Indices", "Metals"],
            },
            {
              id: 'broker-39',
              name: "ThinkMarkets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.1,
              trust_score: 82,
              country: "Australia",
              regulations: "ASIC, FCA",
              min_deposit: 250,
              trading_fee: 0.4,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-40',
              name: "AMarkets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "Saint Vincent",
              regulations: "VFSC",
              min_deposit: 100,
              trading_fee: 0.7,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Stocks", "Commodities", "Crypto"],
            },
            {
              id: 'broker-41',
              name: "FTX.US",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "US",
              regulations: "FinCEN",
              min_deposit: 0,
              trading_fee: 0.1,
              top_rated: false,
              supported_assets: ["Bitcoin", "Ethereum", "Altcoins", "Tokens"],
            },
            {
              id: 'broker-42',
              name: "OCTA",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.7,
              trust_score: 74,
              country: "Saint Vincent",
              regulations: "FSA",
              min_deposit: 100,
              trading_fee: 0.8,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Metals", "Energies"],
            },
            {
              id: 'broker-43',
              name: "FBS",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "Belize",
              regulations: "IFSC, CySEC",
              min_deposit: 5,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Metals", "Energies", "Indices", "Stocks"],
            },
            {
              id: 'broker-44',
              name: "GO Markets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "Australia",
              regulations: "ASIC, VFSC",
              min_deposit: 200,
              trading_fee: 0.7,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-45',
              name: "HFM",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "Cyprus",
              regulations: "CySEC, FCA, DFSA",
              min_deposit: 5,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Stocks", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-46',
              name: "Moneta Markets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "Australia",
              regulations: "ASIC",
              min_deposit: 50,
              trading_fee: 0.4,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "Crypto"],
            },
            {
              id: 'broker-47',
              name: "Liquid",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "Japan",
              regulations: "JFSA",
              min_deposit: 0,
              trading_fee: 0.1,
              top_rated: false,
              supported_assets: ["Bitcoin", "Ethereum", "Altcoins", "Stablecoins"],
            },
            {
              id: 'broker-48',
              name: "Phemex",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "Singapore",
              regulations: "Various",
              min_deposit: 0,
              trading_fee: 0.1,
              top_rated: false,
              supported_assets: ["Bitcoin", "Ethereum", "Altcoins", "Stablecoins", "Futures"],
            },
            {
              id: 'broker-49',
              name: "FxPrimus",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "Cyprus",
              regulations: "CySEC, FSCA",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks"],
            },
            {
              id: 'broker-50',
              name: "Bittrex",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "US",
              regulations: "FinCEN",
              min_deposit: 0,
              trading_fee: 0.25,
              top_rated: false,
              supported_assets: ["Bitcoin", "Ethereum", "Altcoins", "Tokens"],
            },
            {
              id: 'broker-51',
              name: "Dough Finance",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.7,
              trust_score: 74,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "Options", "ETFs"],
            },
            {
              id: 'broker-52',
              name: "eToro USA",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "US",
              regulations: "FinCEN, FINRA",
              min_deposit: 50,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Crypto"],
            },
            {
              id: 'broker-53',
              name: "ICM Capital",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "UK",
              regulations: "FCA",
              min_deposit: 200,
              trading_fee: 0.7,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "Crypto"],
            },
            {
              id: 'broker-54',
              name: "Just2Trade",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.7,
              trust_score: 74,
              country: "Cyprus",
              regulations: "CySEC",
              min_deposit: 100,
              trading_fee: 0.03,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Options", "Futures", "Forex"],
            },
            {
              id: 'broker-55',
              name: "M4Markets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "Seychelles",
              regulations: "FSA, CySEC",
              min_deposit: 100,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Metals", "Energies"],
            },
            {
              id: 'broker-56',
              name: "SMC Global",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.7,
              trust_score: 74,
              country: "India",
              regulations: "SEBI",
              min_deposit: 0,
              trading_fee: 0.25,
              top_rated: false,
              supported_assets: ["Stocks", "Futures", "Options", "Commodities"],
            },
            {
              id: 'broker-57',
              name: "SMC Global Pro",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "India",
              regulations: "SEBI",
              min_deposit: 1000,
              trading_fee: 0.15,
              top_rated: false,
              supported_assets: ["Stocks", "Futures", "Options", "Commodities"],
            },
            {
              id: 'broker-58',
              name: "Tradier",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "Options", "ETFs"],
            },
            {
              id: 'broker-59',
              name: "Vantagepoint AI",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.7,
              trust_score: 74,
              country: "US",
              regulations: "Various",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Forex", "Futures", "Crypto"],
            },
            {
              id: 'broker-60',
              name: "NinjaTrader",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.2,
              trust_score: 84,
              country: "US",
              regulations: "NFA, CFTC",
              min_deposit: 400,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Futures", "Forex", "Options"],
            },
            {
              id: 'broker-61',
              name: "Robinhood",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.1,
              trust_score: 82,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Options", "Crypto"],
            },
            {
              id: 'broker-62',
              name: "Webull",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Options", "Crypto"],
            },
            {
              id: 'broker-63',
              name: "SoFi Invest",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Crypto"],
            },
            {
              id: 'broker-64',
              name: "Public.com",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Crypto", "Art", "Collectibles"],
            },
            {
              id: 'broker-65',
              name: "Moomoo",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Options"],
            },
            {
              id: 'broker-66',
              name: "Charles Schwab",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.5,
              trust_score: 90,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Mutual Funds", "Options", "Bonds"],
            },
            {
              id: 'broker-67',
              name: "Fidelity",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.6,
              trust_score: 92,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Mutual Funds", "Options", "Bonds"],
            },
            {
              id: 'broker-68',
              name: "E*TRADE",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.4,
              trust_score: 88,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Mutual Funds", "Options", "Bonds"],
            },
            {
              id: 'broker-69',
              name: "Vanguard",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.3,
              trust_score: 86,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Mutual Funds", "Options", "Bonds"],
            },
            {
              id: 'broker-70',
              name: "Ally Invest",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.1,
              trust_score: 82,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Options", "Bonds", "Mutual Funds"],
            },
            {
              id: 'broker-71',
              name: "Tastyworks",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.2,
              trust_score: 84,
              country: "US",
              regulations: "SEC, FINRA",
              min_deposit: 0,
              trading_fee: 1,
              top_rated: false,
              supported_assets: ["Stocks", "Options", "Futures", "Micro Futures"],
            },
            {
              id: 'broker-72',
              name: "Tiger Brokers",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "Singapore",
              regulations: "MAS, SEC",
              min_deposit: 0,
              trading_fee: 0.005,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Options", "Futures", "Warrants"],
            },
            {
              id: 'broker-73',
              name: "FUTU (Moomoo)",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "Hong Kong",
              regulations: "SFC, MAS, SEC",
              min_deposit: 0,
              trading_fee: 0.99,
              top_rated: false,
              supported_assets: ["Stocks", "ETFs", "Options", "Warrants"],
            },
            {
              id: 'broker-74',
              name: "IG",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.3,
              trust_score: 86,
              country: "UK",
              regulations: "FCA, ASIC, FSCA",
              min_deposit: 250,
              trading_fee: 0.1,
              top_rated: false,
              supported_assets: ["Forex", "CFDs", "Stocks", "Options", "Crypto"],
            },
            {
              id: 'broker-75',
              name: "CMC Markets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.2,
              trust_score: 84,
              country: "UK",
              regulations: "FCA, ASIC, MAS",
              min_deposit: 0,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Commodities", "Indices", "Crypto", "Shares"],
            },
            {
              id: 'broker-76',
              name: "City Index",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "UK",
              regulations: "FCA, ASIC, MAS",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto", "Shares"],
            },
            {
              id: 'broker-77',
              name: "FXDD",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "Malta",
              regulations: "MFSA",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Metals", "Indices", "Energies"],
            },
            {
              id: 'broker-78',
              name: "Alpari",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "Mauritius",
              regulations: "FSC",
              min_deposit: 100,
              trading_fee: 0.4,
              top_rated: false,
              supported_assets: ["Forex", "Metals", "Energies", "Indices", "Crypto"],
            },
            {
              id: 'broker-79',
              name: "FP Markets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.1,
              trust_score: 82,
              country: "Australia",
              regulations: "ASIC, CySEC",
              min_deposit: 100,
              trading_fee: 0.0,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "Crypto"],
            },
            {
              id: 'broker-80',
              name: "Libertex",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "Cyprus",
              regulations: "CySEC",
              min_deposit: 10,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Forex", "Stocks", "Indices", "Commodities", "ETFs", "Crypto"],
            },
            {
              id: 'broker-81',
              name: "Eightcap",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "Australia",
              regulations: "ASIC, VFSC",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-82',
              name: "BDSwiss",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "Cyprus",
              regulations: "CySEC, FSC, FSCA",
              min_deposit: 100,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto", "Stocks"],
            },
            {
              id: 'broker-83',
              name: "ACY Securities",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.7,
              trust_score: 74,
              country: "Australia",
              regulations: "ASIC, VFSC",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-84',
              name: "Fullerton Markets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.6,
              trust_score: 72,
              country: "Saint Vincent",
              regulations: "VFSC",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Metals"],
            },
            {
              id: 'broker-85',
              name: "FTMO",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.2,
              trust_score: 84,
              country: "Czech Republic",
              regulations: "Various",
              min_deposit: 155,
              trading_fee: 0,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-86',
              name: "Darwinex",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "UK",
              regulations: "FCA",
              min_deposit: 500,
              trading_fee: 0.7,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "ETFs"],
            },
            {
              id: 'broker-87',
              name: "Exness",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.1,
              trust_score: 82,
              country: "Cyprus",
              regulations: "CySEC, FCA, FSCA",
              min_deposit: 1,
              trading_fee: 0.7,
              top_rated: false,
              supported_assets: ["Forex", "Metals", "Energies", "Indices", "Crypto"],
            },
            {
              id: 'broker-88',
              name: "Admiral Markets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.2,
              trust_score: 84,
              country: "UK",
              regulations: "FCA, CySEC, ASIC",
              min_deposit: 100,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "Bonds", "ETFs"],
            },
            {
              id: 'broker-89',
              name: "Vantage",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "Australia",
              regulations: "ASIC, FCA, VFSC",
              min_deposit: 200,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-90',
              name: "Tickmill",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.1,
              trust_score: 82,
              country: "UK",
              regulations: "FCA, CySEC, FSA",
              min_deposit: 100,
              trading_fee: 0.4,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Bonds"],
            },
            {
              id: 'broker-91',
              name: "NAGA",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "Cyprus",
              regulations: "CySEC",
              min_deposit: 250,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Stocks", "Indices", "Commodities", "ETFs", "Crypto"],
            },
            {
              id: 'broker-92',
              name: "Markets.com",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "Cyprus",
              regulations: "CySEC, FCA, ASIC",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Stocks", "Indices", "Commodities", "ETFs"],
            },
            {
              id: 'broker-93',
              name: "VT Markets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "Australia",
              regulations: "ASIC",
              min_deposit: 200,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-94',
              name: "LMAX",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.2,
              trust_score: 84,
              country: "UK",
              regulations: "FCA",
              min_deposit: 10000,
              trading_fee: 0.3,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-95',
              name: "Spreadex",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "UK",
              regulations: "FCA",
              min_deposit: 0,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "Bonds"],
            },
            {
              id: 'broker-96',
              name: "CoreSpreads",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "UK",
              regulations: "FCA",
              min_deposit: 100,
              trading_fee: 0.4,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks"],
            },
            {
              id: 'broker-97',
              name: "ETX Capital",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "UK",
              regulations: "FCA",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "ETFs"],
            },
            {
              id: 'broker-98',
              name: "EagleFX",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.7,
              trust_score: 74,
              country: "Dominica",
              regulations: "Various",
              min_deposit: 10,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Crypto"],
            },
            {
              id: 'broker-99',
              name: "Zulutrade",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "Greece",
              regulations: "FCA, CySEC",
              min_deposit: 200,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks"],
            },
            {
              id: 'broker-100',
              name: "Avatrade",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.1,
              trust_score: 82,
              country: "Ireland",
              regulations: "Central Bank of Ireland, ASIC, FSCA",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "ETFs", "Crypto"],
            },
            {
              id: 'broker-101',
              name: "FXFlat",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "Germany",
              regulations: "BaFin",
              min_deposit: 500,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "ETFs"],
            },
            {
              id: 'broker-102',
              name: "ActivTrades",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "UK",
              regulations: "FCA, CSSF",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "ETFs"],
            },
            {
              id: 'broker-103',
              name: "HYCM",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.9,
              trust_score: 78,
              country: "UK",
              regulations: "FCA, CySEC, DFSA",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "Crypto"],
            },
            {
              id: 'broker-104',
              name: "RoboForex",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.8,
              trust_score: 76,
              country: "Belize",
              regulations: "IFSC",
              min_deposit: 10,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "ETFs", "Crypto"],
            },
            {
              id: 'broker-105',
              name: "Orbex",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.7,
              trust_score: 74,
              country: "Cyprus",
              regulations: "CySEC",
              min_deposit: 200,
              trading_fee: 0.7,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Metals"],
            },
            {
              id: 'broker-106',
              name: "IFC Markets",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 3.7,
              trust_score: 74,
              country: "BVI",
              regulations: "FSC",
              min_deposit: 100,
              trading_fee: 0.6,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "ETFs"],
            },
            {
              id: 'broker-107',
              name: "FXPro",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.2,
              trust_score: 84,
              country: "UK",
              regulations: "FCA, CySEC, FSCA, SCB",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Stocks", "Crypto"],
            },
            {
              id: 'broker-108',
              name: "OANDA Japan",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.3,
              trust_score: 86,
              country: "Japan",
              regulations: "FSA",
              min_deposit: 0,
              trading_fee: 0.9,
              top_rated: false,
              supported_assets: ["Forex", "Indices", "Commodities", "Metals"],
            },
            {
              id: 'broker-109',
              name: "Rakuten Securities",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.1,
              trust_score: 82,
              country: "Japan",
              regulations: "FSA",
              min_deposit: 100,
              trading_fee: 0.5,
              top_rated: false,
              supported_assets: ["Forex", "Stocks", "ETFs", "Bonds"],
            },
            {
              id: 'broker-110',
              name: "GMO Click Securities",
              logo_url: "/images/brokers/placeholder.svg",
              rating: 4.0,
              trust_score: 80,
              country: "Japan",
              regulations: "FSA",
              min_deposit: 0,
              trading_fee: 0.4,
              top_rated: false,
              supported_assets: ["Forex", "CFDs", "Stocks", "Options"],
            },
          ];
          setBrokers(mockBrokers);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to fetch brokers');
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
      {/* Hero Section - Enhanced Design */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-900 dark:to-blue-950">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute -top-40 -right-40 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-6xl mx-auto px-4 py-10 md:py-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              <span>Compare </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-300 dark:from-amber-300 dark:to-yellow-200 relative inline-block">
                110+ Forex Brokers
              </span>
            </h1>
            <p className="text-slate-100 dark:text-slate-200 mb-4 text-sm md:text-base leading-relaxed">
              Find the perfect trading partner with our comprehensive broker comparison tools. 
              Make informed decisions with real data.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Enhanced UI */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
            <div className="bg-white dark:bg-slate-900 shadow-sm rounded-lg p-1 w-full lg:w-auto overflow-hidden border border-slate-100 dark:border-slate-800">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 w-full lg:w-auto bg-slate-50/70 dark:bg-slate-800/50 rounded-lg p-0.5 gap-0.5">
                <TabsTrigger value="all" className="rounded-md text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm py-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="forex" className="rounded-md text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm py-1">
                  Forex
                </TabsTrigger>
                <TabsTrigger value="crypto" className="rounded-md text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm py-1">
                  Crypto
                </TabsTrigger>
                <TabsTrigger value="stocks" className="rounded-md text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm py-1">
                  Stocks
                </TabsTrigger>
                <TabsTrigger value="commodities" className="rounded-md text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm py-1">
                  Commodities
                </TabsTrigger>
                <TabsTrigger value="etf" className="rounded-md text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm py-1">
                  ETFs
                </TabsTrigger>
                <TabsTrigger value="cfd" className="rounded-md text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm py-1">
                  CFDs
                </TabsTrigger>
                <TabsTrigger value="options" className="rounded-md text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm py-1">
                  Options
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select 
                defaultValue="rating-desc" 
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-[160px] h-9 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating-desc">Highest Rated</SelectItem>
                  <SelectItem value="min_deposit-asc">Lowest Min. Deposit</SelectItem>
                  <SelectItem value="trading_fee-asc">Lowest Trading Fee</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 relative h-9"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="text-xs">Filters</span>
                {Object.values(filters).some(f => f && (Array.isArray(f) ? f.length > 0 : true)) && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">!</span>
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-medium text-slate-700 dark:text-slate-300">{filteredBrokers.length}</span> brokers
            </p>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                className="flex items-center gap-1 h-8"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-3 w-3" />
                <span className="text-xs">Advanced Filters</span>
              </Button>
              
              {Object.values(filters).some(f => f && (Array.isArray(f) ? f.length > 0 : true)) && (
                <Button
                  variant="outline"
                  size="sm" 
                  className="flex items-center gap-1 h-8"
                  onClick={clearFilters}
                >
                  <X className="h-3 w-3" />
                  <span className="text-xs">Clear Filters</span>
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="all">
            <EnhancedBrokerGrid 
              brokers={filteredBrokers} 
              formatSupportedAssets={formatSupportedAssets}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="forex">
            <EnhancedBrokerGrid 
              brokers={filteredBrokers} 
              categoryName="Forex"
              formatSupportedAssets={formatSupportedAssets}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="crypto">
            <EnhancedBrokerGrid 
              brokers={filteredBrokers} 
              categoryName="Crypto"
              formatSupportedAssets={formatSupportedAssets}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="stocks">
            <EnhancedBrokerGrid 
              brokers={filteredBrokers} 
              categoryName="Stocks"
              formatSupportedAssets={formatSupportedAssets}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="commodities">
            <EnhancedBrokerGrid 
              brokers={filteredBrokers} 
              categoryName="Commodities"
              formatSupportedAssets={formatSupportedAssets}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="etf">
            <EnhancedBrokerGrid 
              brokers={filteredBrokers} 
              categoryName="ETF"
              formatSupportedAssets={formatSupportedAssets}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="cfd">
            <EnhancedBrokerGrid 
              brokers={filteredBrokers} 
              categoryName="CFD"
              formatSupportedAssets={formatSupportedAssets}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="options">
            <EnhancedBrokerGrid 
              brokers={filteredBrokers} 
              categoryName="Options"
              formatSupportedAssets={formatSupportedAssets}
              isLoading={isLoading}
            />
          </TabsContent>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 dark:border-indigo-900 rounded-full animate-ping opacity-75"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-600 dark:border-t-indigo-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-slate-500 dark:text-slate-400">Loading the best brokers for you...</p>
            </div>
          )}
        </Tabs>

        <Button 
          variant="secondary" 
          className="mt-8 mb-6 flex items-center gap-2"
          onClick={() => setShowFilters(true)}
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>

        {/* Why Compare Brokers Section */}
        <div className="mb-10 bg-white dark:bg-slate-900 shadow-sm rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Why Compare Brokers?</h2>
          </div>
          
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 flex items-start gap-2">
              <div className="rounded-full bg-blue-50 dark:bg-blue-950/50 p-1.5 w-7 h-7 flex items-center justify-center mt-0.5">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-0.5 text-slate-900 dark:text-slate-200">Safety & Regulation</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Choose regulated brokers to protect your funds</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 flex items-start gap-2">
              <div className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 p-1.5 w-7 h-7 flex items-center justify-center mt-0.5">
                <Percent className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-0.5 text-slate-900 dark:text-slate-200">Lower Costs</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Compare fees and commissions for better profits</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 flex items-start gap-2">
              <div className="rounded-full bg-purple-50 dark:bg-purple-950/50 p-1.5 w-7 h-7 flex items-center justify-center mt-0.5">
                <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-0.5 text-slate-900 dark:text-slate-200">Better Tools</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Access advanced platforms and analysis features</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 flex items-start gap-2">
              <div className="rounded-full bg-amber-50 dark:bg-amber-950/50 p-1.5 w-7 h-7 flex items-center justify-center mt-0.5">
                <Globe className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-0.5 text-slate-900 dark:text-slate-200">More Markets</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Trade diverse assets across multiple markets</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <AdvancedBrokerFilters
        open={showFilters}
        onOpenChange={setShowFilters}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={clearFilters}
      />

      {/* SEO Content - Simplified */}
      <div className="container max-w-5xl mx-auto px-4 mb-10">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Finding The Right Broker</h2>
          <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-xs">
            <p>Choosing the right broker is critical for any trader. Our comparison tool helps you evaluate key factors:</p>
            <ul className="columns-2 sm:columns-3 gap-4 space-y-1 text-xs pl-5">
              <li>Regulation & Safety</li>
              <li>Trading Costs & Fees</li>
              <li>Available Markets</li>
              <li>Platform Features</li>
              <li>Account Options</li>
              <li>Customer Support</li>
            </ul>
            <p className="mt-2">Take time to research multiple brokers before making your decision. The right broker should align with your trading style and goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}