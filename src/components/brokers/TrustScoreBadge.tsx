"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrustScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showTooltip?: boolean;
  className?: string;
}

/**
 * A badge displaying a broker's trust score visually
 * 
 * @param score - Trust score (out of 100)
 * @param size - Size of the badge component
 * @param showLabel - Whether to show the score text
 * @param showTooltip - Whether to show the explanatory tooltip
 */
export function TrustScoreBadge({ 
  score,
  size = 'md',
  showLabel = true,
  showTooltip = false,
  className
}: TrustScoreBadgeProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Calculate rating label
  let ratingLabel = 'Poor';
  let colorClass = 'bg-red-500';
  
  if (score >= 90) {
    ratingLabel = 'Excellent';
    colorClass = 'bg-green-500';
  } else if (score >= 80) {
    ratingLabel = 'Very Good';
    colorClass = 'bg-green-400';
  } else if (score >= 70) {
    ratingLabel = 'Good';
    colorClass = 'bg-green-300';
  } else if (score >= 60) {
    ratingLabel = 'Above Average';
    colorClass = 'bg-yellow-400';
  } else if (score >= 50) {
    ratingLabel = 'Average';
    colorClass = 'bg-yellow-300';
  } else if (score >= 40) {
    ratingLabel = 'Below Average';
    colorClass = 'bg-orange-400';
  } else if (score >= 30) {
    ratingLabel = 'Poor';
    colorClass = 'bg-red-400';
  } else {
    ratingLabel = 'Very Poor';
    colorClass = 'bg-red-500';
  }
  
  // Determine the dimensions based on size
  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-2.5'
  };
  
  const paddingClass = {
    sm: 'py-0',
    md: 'py-0.5',
    lg: 'py-1'
  };
  
  const textSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  const badge = (
    <div className={cn(
      "flex items-center gap-2", 
      paddingClass[size],
      className
    )}>
      <div className="flex-1 flex items-center">
        <div className={cn("w-16 bg-muted rounded-full overflow-hidden", heights[size])}>
          <div 
            className={cn("h-full rounded-full", colorClass)}
            style={{ width: `${Math.max(5, score)}%` }}
          />
        </div>
      </div>
      
      {showLabel && (
        <div className={cn(
          "font-medium", 
          textSizeClass[size]
        )}>
          {score}
        </div>
      )}
    </div>
  );
  
  if (!showTooltip) {
    return badge;
  }
  
  // If tooltip should be shown, wrap in tooltip component
  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
        <TooltipTrigger 
          asChild 
          onClick={() => setTooltipOpen(true)}
          aria-label={`Trust Score: ${score} (${ratingLabel})`}
        >
          {badge}
        </TooltipTrigger>
        <TooltipContent side="right" align="start" className="max-w-xs">
          <div className="space-y-1">
            <div className="font-semibold">Trust Score: {ratingLabel}</div>
            <p className="text-xs text-muted-foreground">
              Based on regulatory status, company history, transparency, and customer feedback.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 