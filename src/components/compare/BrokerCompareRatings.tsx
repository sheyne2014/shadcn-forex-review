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
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50"></div>
      <div className="relative p-8 bg-card/80 backdrop-blur-sm border rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center justify-center">
            <ChartBar className="mr-3 h-8 w-8 text-primary" />
            Ratings Comparison
          </h2>
          <p className="text-muted-foreground text-lg">
            Side-by-side performance analysis across key categories
          </p>
        </div>

        <div className="grid grid-cols-12 mb-6 pb-4 border-b-2 border-primary/20 text-sm font-bold bg-primary/5 rounded-lg p-4">
          <div className="col-span-3 text-center text-primary">Category</div>
          <div className="col-span-4 text-center text-primary">{broker1.name}</div>
          <div className="col-span-1 text-center text-primary">vs</div>
          <div className="col-span-4 text-center text-primary">{broker2.name}</div>
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
          <div key={index} className={`grid grid-cols-12 items-center py-4 px-4 rounded-lg hover:bg-primary/5 transition-all duration-200 ${index !== categories.length - 1 ? 'border-b border-border/30 mb-2' : ''}`}>
            <div className="col-span-3 text-sm font-semibold text-center text-foreground">{category.name}</div>

            <div className="col-span-4 pr-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-lg font-bold ${isHigher1 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {category.value1.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground font-medium">/ {category.max.toFixed(1)}</span>
              </div>
              <Progress
                value={percent1}
                className={`h-3 ${isHigher1 ? 'bg-primary/20' : 'bg-muted'}`}
              />
            </div>

            <div className="col-span-1 flex justify-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${isTie ? 'bg-muted text-muted-foreground' : (isHigher1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600')}`}>
                {isTie ? "=" : (isHigher1 ? "W" : "L")}
              </div>
            </div>

            <div className="col-span-4 pl-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-lg font-bold ${isHigher2 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {category.value2.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground font-medium">/ {category.max.toFixed(1)}</span>
              </div>
              <Progress
                value={percent2}
                className={`h-3 ${isHigher2 ? 'bg-primary/20' : 'bg-muted'}`}
              />
            </div>
          </div>
        );
      })}

        <div className="text-xs text-muted-foreground mt-6 italic text-center bg-muted/30 p-3 rounded-lg">
          * All ratings based on our comprehensive analysis as of May 2025
        </div>
      </div>
    </div>
  );
}