"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeftRight } from "lucide-react";

interface Broker {
  id: string;
  name: string;
}

interface BrokerCompareSelectorProps {
  brokers: Broker[];
  initialBroker1: string;
  initialBroker2: string;
}

export function BrokerCompareSelector({ 
  brokers, 
  initialBroker1, 
  initialBroker2 
}: BrokerCompareSelectorProps) {
  const [broker1, setBroker1] = useState(initialBroker1);
  const [broker2, setBroker2] = useState(initialBroker2);
  const router = useRouter();
  const pathname = usePathname();

  // Update the comparison when brokers change
  const updateComparison = () => {
    // Navigate to the comparison page with the selected brokers
    router.push(`/compare/${broker1}-vs-${broker2}`);
  };

  // Swap the two brokers
  const swapBrokers = () => {
    setBroker1(broker2);
    setBroker2(broker1);
    
    // After state update, trigger navigation
    setTimeout(() => {
      router.push(`/compare/${broker2}-vs-${broker1}`);
    }, 0);
  };

  return (
    <div className="bg-card p-6 rounded-lg border mb-10">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-auto flex-1">
          <label className="block text-sm font-medium mb-1">First Broker</label>
          <Select value={broker1} onValueChange={setBroker1}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a broker" />
            </SelectTrigger>
            <SelectContent>
              {brokers.map((broker) => (
                <SelectItem 
                  key={`first-${broker.id}`} 
                  value={broker.id}
                  disabled={broker.id === broker2}
                >
                  {broker.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-6 md:mt-0">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={swapBrokers}
            aria-label="Swap brokers"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="w-full md:w-auto flex-1">
          <label className="block text-sm font-medium mb-1">Second Broker</label>
          <Select value={broker2} onValueChange={setBroker2}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a broker" />
            </SelectTrigger>
            <SelectContent>
              {brokers.map((broker) => (
                <SelectItem 
                  key={`second-${broker.id}`} 
                  value={broker.id}
                  disabled={broker.id === broker1}
                >
                  {broker.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto mt-4 md:mt-6">
          <Button onClick={updateComparison} className="w-full md:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Update Comparison
          </Button>
        </div>
      </div>
    </div>
  );
} 