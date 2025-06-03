"use client";

import { useState } from "react";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeyTakeawaysProps {
  points: string[] | string | any;
  className?: string;
}

export function KeyTakeaways({ points, className }: KeyTakeawaysProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Parse and normalize points to an array of strings
  const parsePoints = (): string[] => {
    if (!points) return [];
    
    // If already an array, use it
    if (Array.isArray(points)) {
      return points.map(p => String(p));
    }
    
    // If it's a string, try to parse it as JSON
    if (typeof points === 'string') {
      try {
        // Check if it looks like a JSON array
        if (points.trim().startsWith('[') && points.trim().endsWith(']')) {
          const parsed = JSON.parse(points);
          if (Array.isArray(parsed)) {
            return parsed.map(p => String(p));
          }
        }
        // Otherwise treat as a single point
        return [points];
      } catch (e) {
        return [points];
      }
    }
    
    // For unknown formats, convert to string and use as single point
    return [String(points)];
  };
  
  const pointsArray = parsePoints();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Don't render if no points
  if (pointsArray.length === 0) {
    return null;
  }

  return (
    <div className={cn("my-6 rounded-lg border bg-muted/20 p-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold flex items-center">
          <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          Key Takeaways
        </h3>
        {pointsArray.length > 3 && (
          <button 
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-controls="key-takeaways-content"
            className="text-sm text-muted-foreground hover:text-primary flex items-center"
          >
            {expanded ? "Collapse" : "Expand"} 
            <ArrowDown className={cn("h-4 w-4 ml-1 transition-transform", expanded ? "rotate-180" : "")} />
          </button>
        )}
      </div>
      
      <div 
        id="key-takeaways-content"
        className={cn(
          "space-y-2 transition-all duration-300 relative",
          expanded ? "max-h-[1000px] opacity-100" : pointsArray.length > 3 ? "max-h-32 overflow-hidden opacity-90" : ""
        )}
      >
        <ul className="space-y-2 pl-0">
          {pointsArray.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        
        {!expanded && pointsArray.length > 3 && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>
    </div>
  );
}

export default KeyTakeaways; 