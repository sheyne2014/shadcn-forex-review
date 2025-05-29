"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, X, SlidersHorizontal } from "lucide-react";

export interface BrokerFilters {
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

interface AdvancedBrokerFiltersProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  filters: BrokerFilters;
  onFiltersChange: (filters: BrokerFilters) => void;
  onClearFilters?: () => void;
}

const REGULATIONS = [
  { id: "fca", label: "FCA (UK)" },
  { id: "asic", label: "ASIC (Australia)" },
  { id: "cysec", label: "CySEC (Cyprus)" },
  { id: "esma", label: "ESMA (EU)" },
  { id: "nfa", label: "NFA (US)" },
  { id: "cftc", label: "CFTC (US)" },
  { id: "fsa", label: "FSA (Japan)" },
  { id: "mas", label: "MAS (Singapore)" },
  { id: "finma", label: "FINMA (Switzerland)" },
];

const COUNTRIES = [
  "United Kingdom", "Australia", "Cyprus", "United States", "Germany", 
  "France", "Japan", "Singapore", "Switzerland", "Canada", "Netherlands"
];

const PLATFORMS = [
  "MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView", "ProRealTime", 
  "NinjaTrader", "Custom Platform", "Web Platform", "Mobile App"
];

const ACCOUNT_TYPES = [
  "Standard", "ECN", "STP", "Market Maker", "Prime", "VIP", "Islamic", "Demo"
];

const ASSET_TYPES = [
  "Forex", "Stocks", "Crypto", "Commodities", "Indices", "ETFs", "CFDs", "Options", "Futures"
];

const FEATURES = [
  "Copy Trading", "Social Trading", "Automated Trading", "Mobile Trading", 
  "24/7 Support", "Educational Resources", "Research Tools", "Economic Calendar",
  "News Feed", "Market Analysis", "Risk Management Tools", "Multiple Languages"
];

export function AdvancedBrokerFilters({ 
  open, 
  onOpenChange, 
  filters, 
  onFiltersChange, 
  onClearFilters 
}: AdvancedBrokerFiltersProps) {
  // Use the provided open state if available, otherwise use internal state
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const isOpen = open !== undefined ? open : isOpenInternal;
  const setIsOpen = onOpenChange || setIsOpenInternal;

  const updateFilter = <K extends keyof BrokerFilters>(key: K, value: BrokerFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof BrokerFilters, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as any);
  };

  const handleClearFilters = () => {
    if (onClearFilters) {
      onClearFilters();
    } else {
      // Default clear implementation if onClearFilters is not provided
      onFiltersChange({
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
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.minDeposit[0] > 0) count++;
    if (filters.maxTradingFee[0] < 5) count++;
    if (filters.minRating[0] > 0) count++;
    if (filters.regulations.length > 0) count++;
    if (filters.countries.length > 0) count++;
    if (filters.platforms.length > 0) count++;
    if (filters.accountTypes.length > 0) count++;
    if (filters.assetTypes.length > 0) count++;
    if (filters.features.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 relative">
          <SlidersHorizontal className="h-4 w-4" />
          Advanced Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Advanced Broker Filters</SheetTitle>
          <SheetDescription>
            Refine your search to find the perfect broker for your trading needs.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Deposit Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Minimum Deposit</Label>
            <div className="px-3">
              <Slider
                value={filters.minDeposit}
                onValueChange={(value) => updateFilter('minDeposit', value)}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$0</span>
                <span className="font-medium">${filters.minDeposit[0]}</span>
                <span>$10,000+</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Trading Fee Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Maximum Trading Fee</Label>
            <div className="px-3">
              <Slider
                value={filters.maxTradingFee}
                onValueChange={(value) => updateFilter('maxTradingFee', value)}
                max={5}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span className="font-medium">{filters.maxTradingFee[0]}%</span>
                <span>5%+</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Rating Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Minimum Rating</Label>
            <div className="px-3">
              <Slider
                value={filters.minRating}
                onValueChange={(value) => updateFilter('minRating', value)}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Any</span>
                <span className="font-medium">{filters.minRating[0] > 0 ? `${filters.minRating[0]}★+` : 'Any'}</span>
                <span>5★</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Regulations */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Regulations</Label>
            <div className="grid grid-cols-2 gap-2">
              {REGULATIONS.map((regulation) => (
                <div key={regulation.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={regulation.id}
                    checked={filters.regulations.includes(regulation.id)}
                    onCheckedChange={() => toggleArrayFilter('regulations', regulation.id)}
                  />
                  <Label htmlFor={regulation.id} className="text-sm">
                    {regulation.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Countries */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Countries</Label>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
              {COUNTRIES.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={country}
                    checked={filters.countries.includes(country)}
                    onCheckedChange={() => toggleArrayFilter('countries', country)}
                  />
                  <Label htmlFor={country} className="text-sm">
                    {country}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Trading Platforms */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Trading Platforms</Label>
            <div className="grid grid-cols-1 gap-2">
              {PLATFORMS.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform}
                    checked={filters.platforms.includes(platform)}
                    onCheckedChange={() => toggleArrayFilter('platforms', platform)}
                  />
                  <Label htmlFor={platform} className="text-sm">
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Account Types */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Account Types</Label>
            <div className="grid grid-cols-2 gap-2">
              {ACCOUNT_TYPES.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={filters.accountTypes.includes(type)}
                    onCheckedChange={() => toggleArrayFilter('accountTypes', type)}
                  />
                  <Label htmlFor={type} className="text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Asset Types */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Asset Types</Label>
            <div className="grid grid-cols-2 gap-2">
              {ASSET_TYPES.map((asset) => (
                <div key={asset} className="flex items-center space-x-2">
                  <Checkbox
                    id={asset}
                    checked={filters.assetTypes.includes(asset)}
                    onCheckedChange={() => toggleArrayFilter('assetTypes', asset)}
                  />
                  <Label htmlFor={asset} className="text-sm">
                    {asset}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Features</Label>
            <div className="grid grid-cols-1 gap-2">
              {FEATURES.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={filters.features.includes(feature)}
                    onCheckedChange={() => toggleArrayFilter('features', feature)}
                  />
                  <Label htmlFor={feature} className="text-sm">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}