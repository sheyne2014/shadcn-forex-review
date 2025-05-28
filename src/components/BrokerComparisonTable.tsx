"use client";

import { useMemo } from "react";
import { Check, X, Info } from 'lucide-react';
import { cn } from "@/lib/utils";
import { BrokerLogo } from "@/components/brokers/BrokerLogo";
import { useInView } from "react-intersection-observer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { VisitSiteButton, VisitSiteButtonPresets } from "@/components/analytics/VisitSiteButton";

// Types for comparison table
export interface FeatureItem {
  name: string;
  tooltip?: string;
  highlight?: boolean;
  group?: string;
  id?: string;
}

export interface BrokerFeatures {
  [key: string]: boolean | string | number | null | undefined;
}

export interface BrokerData {
  id: string;
  name: string;
  logo?: string;
  rating: number;
  features: BrokerFeatures;
  link?: string;
  badge?: string;
}

interface BrokerComparisonTableProps {
  brokers: BrokerData[];
  features: FeatureItem[];
  className?: string;
}

export function BrokerComparisonTable({
  brokers,
  features,
  className
}: BrokerComparisonTableProps) {
  // Use react-intersection-observer for better performance
  const { ref: tableRef } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Use the brokers prop directly instead of virtualizing
  // This ensures that the table always shows the brokers selected by the parent component
  const visibleBrokers = useMemo(() => {
    // Always show all brokers passed from parent component
    return brokers;
  }, [brokers]);
  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <div className="flex">
          {Array(5).fill(0).map((_, i) => (
            <svg
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-200",
                i === Math.floor(rating) && rating % 1 > 0 ? "text-amber-400 fill-amber-400" : ""
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Group features by their group property
  const groupedFeatures = useMemo(() => {
    const groups: Record<string, FeatureItem[]> = {};

    features.forEach(feature => {
      const group = feature.group || 'General';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(feature);
    });

    return groups;
  }, [features]);

  // Function to render a feature value with visual enhancements
  const renderEnhancedValue = (value: boolean | string | number | null | undefined, _feature: FeatureItem) => {
    // For boolean values, add more context
    if (typeof value === 'boolean') {
      return (
        <div className={cn(
          "flex flex-col items-center justify-center",
          value ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
        )}
        aria-label={value ? "Yes" : "No"}
        >
          {value ? (
            <>
              <Check className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs mt-1">Yes</span>
            </>
          ) : (
            <>
              <X className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs mt-1">No</span>
            </>
          )}
        </div>
      );
    }

    // For null, undefined, or empty string values
    if (value === null || value === undefined || value === '' || value === 'N/A' || value === 'Not specified') {
      return <span className="text-muted-foreground text-sm">Not specified</span>;
    }

    // For numeric values, add visual indicators
    if (typeof value === 'number' || !isNaN(Number(value))) {
      // If it's a rating-like value (between 0-10)
      if ((typeof value === 'number' && value >= 0 && value <= 10) ||
          (typeof value === 'string' && Number(value) >= 0 && Number(value) <= 10)) {
        const numValue = typeof value === 'number' ? value : Number(value);
        return (
          <div className="flex flex-col items-center">
            <div className="w-full bg-muted rounded-full h-2 mb-1">
              <div
                className={cn(
                  "h-2 rounded-full",
                  numValue >= 7 ? "bg-green-500" :
                  numValue >= 4 ? "bg-amber-500" :
                  "bg-red-500"
                )}
                style={{ width: `${(numValue / 10) * 100}%` }}
              ></div>
            </div>
            <span>{value}</span>
          </div>
        );
      }
    }

    // For string values that might be money-related
    if (typeof value === 'string' && (value.includes('$') || value.includes('€'))) {
      return <span className="font-medium">{value}</span>;
    }

    // Default rendering
    return value;
  };

  return (
    <div ref={tableRef} className={cn("overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0", className)}>
      <TooltipProvider>
        <div className="min-w-[800px]"> {/* Force minimum width to ensure scrollability on mobile */}
          <Table className="border-collapse w-full">
            <caption className="sr-only">Broker Comparison Table - Compare features across different brokers</caption>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[240px] font-semibold sticky left-0 bg-muted/50 z-10" scope="col">Broker</TableHead>
                {features.map((feature, index) => (
                  <TableHead
                    key={feature.id || `feature-${index}-${feature.name}`}
                    className={cn(
                      "text-center font-semibold",
                      feature.highlight && "bg-primary/5"
                    )}
                    scope="col"
                  >
                    <div className="flex items-center justify-center gap-1">
                      {feature.name}
                      {feature.tooltip && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" aria-label={`Info about ${feature.name}`} />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            {feature.tooltip}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-center font-semibold sticky right-0 bg-muted/50 z-10" scope="col">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleBrokers.map((broker) => (
                <TableRow key={broker.id} className="hover:bg-muted/30 group">
                  <TableCell className="font-medium py-5 sticky left-0 bg-background group-hover:bg-muted/30 z-10">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <BrokerLogo
                          broker={broker}
                          size="lg"
                          rounded
                          withBorder
                          priority={false}
                        />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <div className="flex flex-col mb-1">
                          <span className="text-base font-semibold text-foreground">{broker.name}</span>
                          {broker.badge && (
                            <Badge variant="outline" className="text-xs py-0 mt-1 w-fit">
                              {broker.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1.5">
                          {renderRating(broker.rating)}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {features.map((feature, index) => (
                    <TableCell
                      key={`${broker.id}-${feature.id || `feature-${index}-${feature.name}`}`}
                      className={cn(
                        "text-center",
                        feature.highlight && "bg-primary/5 group-hover:bg-muted/50"
                      )}
                    >
                      {renderEnhancedValue(broker.features[feature.id || feature.name.toLowerCase().replace(/ /g, '_')], feature)}
                    </TableCell>
                  ))}

                  <TableCell className="text-center sticky right-0 bg-background group-hover:bg-muted/30 z-10">
                    {broker.link ? (
                      <VisitSiteButton
                        brokerName={broker.name}
                        brokerUrl={broker.link}
                        {...VisitSiteButtonPresets.comparisonTable}
                      />
                    ) : (
                      <Button size="sm" className="bg-primary hover:bg-primary/90" disabled>
                        Visit Site
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TooltipProvider>

      {/* Feature group legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        {Object.entries(groupedFeatures).map(([group, features], index) => (
          <div key={`group-${index}-${group}`} className="bg-muted/20 rounded-md p-2 border border-border/50">
            <div className="font-medium text-sm mb-1">{group}</div>
            <div className="text-xs text-muted-foreground">
              {(features as FeatureItem[]).length} feature{(features as FeatureItem[]).length !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}