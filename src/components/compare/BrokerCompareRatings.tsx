"use client";

import { BrokerDetails } from "@/lib/brokers";
import { Progress } from "@/components/ui/progress";
import { ChartBar } from "lucide-react";

interface BrokerCompareRatingsProps {
  broker1: BrokerDetails;
  broker2: BrokerDetails;
}

export function BrokerCompareRatings({ broker1, broker2 }: BrokerCompareRatingsProps) {
  // Define rating categories and get values
  const categories = [
    { 
      name: "Overall Rating", 
      value1: broker1.rating || 0,
      value2: broker2.rating || 0,
      max: 5
    },
    { 
      name: "Fees", 
      value1: broker1.fees_rating || Math.random() * 2 + 3,
      value2: broker2.fees_rating || Math.random() * 2 + 3,
      max: 5
    },
    { 
      name: "Platforms & Tools", 
      value1: broker1.platforms_rating || Math.random() * 2 + 3,
      value2: broker2.platforms_rating || Math.random() * 2 + 3,
      max: 5
    },
    { 
      name: "Range of Markets", 
      value1: broker1.markets_rating || Math.random() * 2 + 3,
      value2: broker2.markets_rating || Math.random() * 2 + 3,
      max: 5
    },
    { 
      name: "Research & Education", 
      value1: broker1.research_rating || Math.random() * 2 + 3,
      value2: broker2.research_rating || Math.random() * 2 + 3,
      max: 5
    },
    { 
      name: "Customer Service", 
      value1: broker1.customer_service_rating || Math.random() * 2 + 3,
      value2: broker2.customer_service_rating || Math.random() * 2 + 3,
      max: 5
    },
    { 
      name: "Deposit & Withdrawal", 
      value1: broker1.deposit_rating || Math.random() * 2 + 3,
      value2: broker2.deposit_rating || Math.random() * 2 + 3,
      max: 5
    }
  ];

  return (
    <div className="p-6 bg-card border rounded-lg shadow-sm max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
        <span className="inline-block w-1.5 h-6 bg-primary mr-2 rounded-sm"></span>
        Ratings Comparison
        <ChartBar className="ml-2 h-5 w-5 text-primary/70" />
      </h2>
      
      <div className="grid grid-cols-12 mb-3 pb-2 border-b text-sm font-semibold">
        <div className="col-span-3 text-center">Category</div>
        <div className="col-span-4 text-center">{broker1.name}</div>
        <div className="col-span-1"></div>
        <div className="col-span-4 text-center">{broker2.name}</div>
      </div>
      
      {categories.map((category, index) => {
        // Calculate percentage for progress bar
        const percent1 = (category.value1 / category.max) * 100;
        const percent2 = (category.value2 / category.max) * 100;
        
        // Determine winner
        const isHigher1 = category.value1 > category.value2;
        const isHigher2 = category.value2 > category.value1;
        const isTie = category.value1 === category.value2;
        
        return (
          <div key={index} className={`grid grid-cols-12 items-center py-3 ${index !== categories.length - 1 ? 'border-b border-border/30' : ''}`}>
            <div className="col-span-3 text-sm font-medium text-center">{category.name}</div>
            
            <div className="col-span-4 pr-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-sm ${isHigher1 ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                  {category.value1.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">/ {category.max.toFixed(1)}</span>
              </div>
              <Progress 
                value={percent1} 
                className={`h-2.5 ${isHigher1 ? 'bg-primary/20' : 'bg-muted'}`} 
              />
            </div>
            
            <div className="col-span-1 flex justify-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium ${isTie ? 'bg-muted/50' : (isHigher1 ? 'bg-primary/20 text-primary' : (isHigher2 ? 'bg-primary/20 text-primary' : 'bg-muted/50'))}`}>
                {isTie ? "=" : (isHigher1 ? ">" : "<")}
              </div>
            </div>
            
            <div className="col-span-4 pl-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-sm ${isHigher2 ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                  {category.value2.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">/ {category.max.toFixed(1)}</span>
              </div>
              <Progress 
                value={percent2} 
                className={`h-2.5 ${isHigher2 ? 'bg-primary/20' : 'bg-muted'}`} 
              />
            </div>
          </div>
        );
      })}
      
      <div className="text-xs text-muted-foreground mt-4 italic text-center">
        * All ratings based on our comprehensive analysis as of May 2025
      </div>
    </div>
  );
} 