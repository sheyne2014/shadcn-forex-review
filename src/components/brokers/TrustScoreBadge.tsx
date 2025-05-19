"use client";

import { useState } from "react";
import { Shield, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getTrustScoreDescription, getTrustScoreColor } from "@/lib/trust-score";

interface TrustScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showDescription?: boolean;
  showTooltip?: boolean;
}

export function TrustScoreBadge({ 
  score, 
  size = "md", 
  showDescription = false,
  showTooltip = true
}: TrustScoreBadgeProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  
  // Format the score
  const formattedScore = Math.round(score);
  const description = getTrustScoreDescription(score);
  const color = getTrustScoreColor(score);
  
  // Size configurations
  const sizeConfig = {
    sm: {
      paddingX: "px-2",
      paddingY: "py-1",
      fontSize: "text-xs",
      iconSize: "h-3 w-3",
      gap: "gap-1",
    },
    md: {
      paddingX: "px-3",
      paddingY: "py-1.5",
      fontSize: "text-sm",
      iconSize: "h-4 w-4",
      gap: "gap-1.5",
    },
    lg: {
      paddingX: "px-4",
      paddingY: "py-2",
      fontSize: "text-base",
      iconSize: "h-5 w-5",
      gap: "gap-2",
    },
  };
  
  const { paddingX, paddingY, fontSize, iconSize, gap } = sizeConfig[size];
  
  // Generate badge styles based on the score
  const badgeStyles = {
    backgroundColor: `rgba(${color.startsWith('#') 
      ? `${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}`
      : color === 'green' ? '0, 128, 0' : '0, 0, 0'
    }, 0.1)`,
    color: color,
    borderColor: `rgba(${color.startsWith('#') 
      ? `${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}`
      : color === 'green' ? '0, 128, 0' : '0, 0, 0'
    }, 0.3)`,
  };
  
  // Badge content
  const content = (
    <div className={`flex items-center ${gap}`}>
      <Shield className={iconSize} />
      <span className="font-semibold">{formattedScore}</span>
      {showDescription && (
        <span className="ml-1 font-normal">{description}</span>
      )}
    </div>
  );
  
  // Tooltip content
  const tooltipContent = (
    <div className="w-64 p-2">
      <h4 className="font-semibold mb-2">Trust Score: {formattedScore}/100</h4>
      <p className="text-sm mb-2">Rating: {description}</p>
      <Progress value={formattedScore} className="h-2 mb-3" />
      <p className="text-xs text-muted-foreground">
        Trust Score is calculated based on regulatory oversight, years in business, 
        fund protection measures, and transparency.
      </p>
    </div>
  );
  
  // Return the badge with optional tooltip
  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline"
              className={`inline-flex items-center ${paddingX} ${paddingY} ${fontSize} border cursor-help`}
              style={badgeStyles}
            >
              {content}
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="top" className="z-50">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  // Return without tooltip
  return (
    <Badge 
      variant="outline"
      className={`inline-flex items-center ${paddingX} ${paddingY} ${fontSize} border`}
      style={badgeStyles}
    >
      {content}
    </Badge>
  );
} 