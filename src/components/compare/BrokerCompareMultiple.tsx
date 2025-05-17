"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Check, 
  X, 
  Star, 
  Plus, 
  Minus, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BrokerData {
  id: string;
  name: string;
  logo_url?: string;
  rating?: number;
  min_deposit?: number;
  trading_fee?: number;
  supported_assets?: string[];
  trading_platforms?: string;
  regulations?: string;
  country?: string;
  foundation_year?: number;
  popularity?: string;
  // Other optional properties
  [key: string]: any;
}

interface BrokerCompareMultipleProps {
  brokers: BrokerData[];
}

export function BrokerCompareMultiple({ brokers }: BrokerCompareMultipleProps) {
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>(
    brokers.slice(0, 4).map(b => b.id)
  );
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("fees");
  const [sortBy, setSortBy] = useState<string>("rating");

  const filteredBrokers = brokers.filter(broker => 
    selectedBrokers.includes(broker.id)
  );

  // Sort the filtered brokers based on the selected sort criteria
  const sortedBrokers = [...filteredBrokers].sort((a, b) => {
    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === "name") {
      return (a.name || "").localeCompare(b.name || "");
    }
    if (sortBy === "min_deposit") {
      return (a.min_deposit || 0) - (b.min_deposit || 0);
    }
    if (sortBy === "trading_fee") {
      return (a.trading_fee || 0) - (b.trading_fee || 0);
    }
    return 0;
  });

  // Add or remove a broker from the comparison
  const toggleBroker = (brokerId: string) => {
    if (selectedBrokers.includes(brokerId)) {
      setSelectedBrokers(selectedBrokers.filter(id => id !== brokerId));
    } else {
      if (selectedBrokers.length < 5) {
        setSelectedBrokers([...selectedBrokers, brokerId]);
      }
    }
  };

  // Check if a broker is selected
  const isBrokerSelected = (brokerId: string) => {
    return selectedBrokers.includes(brokerId);
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Helper to format values or display a dash
  const formatValue = (value: any, prefix: string = "", suffix: string = "") => {
    if (value === undefined || value === null) return "-";
    return `${prefix}${value}${suffix}`;
  };

  // Visual indicator for yes/no values
  const renderYesNo = (value: boolean | string | undefined | null) => {
    const isYes = value === true || value === "yes" || value === "Yes";
    const isNo = value === false || value === "no" || value === "No";
    
    if (isYes) return <Check className="h-5 w-5 text-green-500 mx-auto" />;
    if (isNo) return <X className="h-5 w-5 text-red-500 mx-auto" />;
    return <span className="text-muted-foreground text-center block">-</span>;
  };

  // Format regulations text
  const formatRegulations = (regulations: string | undefined) => {
    if (!regulations) return "Not specified";
    return regulations.split(',').map((r: string) => r.trim()).join(', ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedBrokers.length} of {brokers.length} brokers selected
            </span>
            <Badge variant="outline" className="ml-2">
              Max: 5
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-3 items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter Brokers
          </Button>
          
          <div className="relative min-w-[180px]">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="rating">Overall Rating</SelectItem>
                  <SelectItem value="name">Broker Name</SelectItem>
                  <SelectItem value="min_deposit">Min Deposit</SelectItem>
                  <SelectItem value="trading_fee">Trading Fee</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-muted/20 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-3">Select brokers to compare (max 5):</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {brokers.map((broker) => (
              <div 
                key={broker.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  isBrokerSelected(broker.id) 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/30'
                }`}
                onClick={() => toggleBroker(broker.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">{broker.name}</div>
                  {isBrokerSelected(broker.id) ? (
                    <Minus className="h-4 w-4 text-primary" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
                  {broker.rating?.toFixed(1) || '-'}/5
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Broker cards row */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 min-w-[900px]">
          <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
            {/* Empty header cell */}
            <div className="p-3"></div>
            
            {/* Broker headers */}
            {sortedBrokers.map((broker) => (
              <div key={broker.id} className="p-3 border-b border-l text-center">
                <div className="relative h-16 w-full mb-2 flex items-center justify-center">
                  {broker.logo_url ? (
                    <Image
                      src={broker.logo_url}
                      alt={broker.name}
                      width={120}
                      height={60}
                      className="object-contain max-h-16"
                      style={{ objectFit: 'contain' }}
                      onError={(e) => {
                        // @ts-ignore
                        e.target.onerror = null;
                        // @ts-ignore
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&background=random&color=fff&size=128&bold=true&format=png`;
                      }}
                    />
                  ) : (
                    <div className="font-bold text-lg">{broker.name}</div>
                  )}
                </div>
                <div className="font-medium">{broker.name}</div>
                <div className="flex items-center justify-center mt-2 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={`${broker.id}-star-${i}`}
                      className={`h-4 w-4 ${
                        i < Math.floor(broker.rating || 0)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">
                    {broker.rating?.toFixed(1) || '-'}
                  </span>
                </div>
                <Button asChild size="sm" className="w-full mb-2">
                  <Link href={`/broker/${broker.id}`}>Visit Broker</Link>
                </Button>
                <Link 
                  href={`/reviews/${broker.id}`} 
                  className="text-sm text-primary block hover:underline"
                >
                  Read Review
                </Link>
              </div>
            ))}
          </div>
          
          {/* Fees Section */}
          <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
            <div 
              className="p-4 font-bold text-lg bg-muted/20 border-b border-r cursor-pointer"
              onClick={() => toggleSection("fees")}
            >
              <div className="flex items-center justify-between">
                <span>Fees</span>
                {expandedSection === "fees" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </div>
            
            {sortedBrokers.map((broker) => (
              <div key={`${broker.id}-fees-header`} className="p-4 border-b border-l bg-muted/20">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-medium text-lg">
                      {broker.fee_score || formatValue(((5 - (broker.trading_fee || 0) * 1000) / 5 * 4).toFixed(1))}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {expandedSection === "fees" && (
            <>
              {/* Fees Details */}
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    <span>Stock trading fee</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Fee for trading U.S. stocks</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-stock-fee`} className="p-4 border-b border-l text-center">
                    <div>{formatValue(broker.trading_fee, "$")}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    <span>Forex spread</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Average EUR/USD spread</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-forex`} className="p-4 border-b border-l text-center">
                    <div>{broker.forex_spread || formatValue(Math.random().toFixed(1), "", " pips")}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Inactivity fee</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-inactivity`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.inactivity_fee)}
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Withdrawal fee</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-withdrawal`} className="p-4 border-b border-l text-center">
                    <div>
                      {formatValue(broker.withdrawal_fee || 0, "$")}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Deposit fee</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-deposit`} className="p-4 border-b border-l text-center">
                    <div>
                      {formatValue(broker.deposit_fee || 0, "$")}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Safety Section */}
          <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
            <div 
              className="p-4 font-bold text-lg bg-muted/20 border-b border-r cursor-pointer"
              onClick={() => toggleSection("safety")}
            >
              <div className="flex items-center justify-between">
                <span>Safety</span>
                {expandedSection === "safety" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </div>
            
            {sortedBrokers.map((broker) => (
              <div key={`${broker.id}-safety-header`} className="p-4 border-b border-l bg-muted/20"></div>
            ))}
          </div>
          
          {expandedSection === "safety" && (
            <>
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Regulators</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-regulators`} className="p-4 border-b border-l">
                    <div className="text-sm">{formatRegulations(broker.regulations)}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Country of regulation</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-country`} className="p-4 border-b border-l text-center">
                    <div>{broker.country || "-"}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Foundation year</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-year`} className="p-4 border-b border-l text-center">
                    <div>{broker.foundation_year ? `year ${broker.foundation_year}` : "-"}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Investor protection</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-protection`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.investor_protection || true)}
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Deposit and Withdrawal Section */}
          <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
            <div 
              className="p-4 font-bold text-lg bg-muted/20 border-b border-r cursor-pointer"
              onClick={() => toggleSection("deposit")}
            >
              <div className="flex items-center justify-between">
                <span>Deposit and Withdrawal</span>
                {expandedSection === "deposit" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </div>
            
            {sortedBrokers.map((broker) => (
              <div key={`${broker.id}-deposit-header`} className="p-4 border-b border-l bg-muted/20"></div>
            ))}
          </div>
          
          {expandedSection === "deposit" && (
            <>
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Minimum deposit</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-min-deposit`} className="p-4 border-b border-l text-center">
                    <div>{formatValue(broker.min_deposit, "$")}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Bank transfer deposit</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-bank-deposit`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.bank_transfer_deposit || true)}
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Credit/debit card deposit</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-card-deposit`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.card_deposit || true)}
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Electronic wallet deposit</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-ewallet-deposit`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.ewallet_deposit)}
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Markets Section */}
          <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
            <div 
              className="p-4 font-bold text-lg bg-muted/20 border-b border-r cursor-pointer"
              onClick={() => toggleSection("markets")}
            >
              <div className="flex items-center justify-between">
                <span>Markets and Products</span>
                {expandedSection === "markets" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </div>
            
            {sortedBrokers.map((broker) => (
              <div key={`${broker.id}-markets-header`} className="p-4 border-b border-l bg-muted/20"></div>
            ))}
          </div>
          
          {expandedSection === "markets" && (
            <>
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Assets offered</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-assets`} className="p-4 border-b border-l">
                    <div className="text-sm">
                      {broker.supported_assets 
                        ? broker.supported_assets.join(", ") 
                        : "-"}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Forex</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-forex-offered`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.supported_assets?.includes("Forex"))}
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Stocks</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-stocks-offered`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.supported_assets?.includes("Stocks"))}
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Crypto</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-crypto-offered`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.supported_assets?.includes("Crypto"))}
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Options</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-options-offered`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.supported_assets?.includes("Options"))}
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Platform Section */}
          <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
            <div 
              className="p-4 font-bold text-lg bg-muted/20 border-b border-r cursor-pointer"
              onClick={() => toggleSection("platform")}
            >
              <div className="flex items-center justify-between">
                <span>Platform and Experience</span>
                {expandedSection === "platform" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </div>
            
            {sortedBrokers.map((broker) => (
              <div key={`${broker.id}-platform-header`} className="p-4 border-b border-l bg-muted/20"></div>
            ))}
          </div>
          
          {expandedSection === "platform" && (
            <>
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Trading platforms</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-platforms`} className="p-4 border-b border-l">
                    <div className="text-sm">{broker.trading_platforms || "-"}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Mobile app</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-mobile`} className="p-4 border-b border-l text-center">
                    {renderYesNo(true)}
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>Web platform</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-web`} className="p-4 border-b border-l text-center">
                    {renderYesNo(true)}
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>MetaTrader 4</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-mt4`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.trading_platforms?.includes("MT4"))}
                  </div>
                ))}
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
                <div className="p-4 border-b">
                  <span>MetaTrader 5</span>
                </div>
                
                {sortedBrokers.map((broker) => (
                  <div key={`${broker.id}-mt5`} className="p-4 border-b border-l text-center">
                    {renderYesNo(broker.trading_platforms?.includes("MT5"))}
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Read Reviews Section */}
          <div className="grid" style={{ gridTemplateColumns: `2fr repeat(${sortedBrokers.length}, 1fr)` }}>
            <div className="p-4 border-b"></div>
            
            {sortedBrokers.map((broker) => (
              <div key={`${broker.id}-review-link`} className="p-4 border-b border-l">
                <Link 
                  href={`/reviews/${broker.id}`} 
                  className="flex items-center justify-center text-primary hover:underline"
                >
                  Read review <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 