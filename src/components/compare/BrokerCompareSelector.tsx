"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  initialBroker2,
}: BrokerCompareSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Support up to 5 brokers
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([
    initialBroker1,
    initialBroker2,
  ]);
  
  // Update URL when selection changes
  const updateUrl = (newBrokers: string[]) => {
    // Filter out empty strings
    const validBrokers = newBrokers.filter(b => b);
    
    // Create new URL params
    const params = new URLSearchParams();
    validBrokers.forEach((broker, index) => {
      params.set(`broker${index + 1}`, broker);
    });
    
    // Navigate to new URL
    router.push(`/compare?${params.toString()}`);
  };
  
  // Handle broker selection change
  const handleBrokerChange = (value: string, index: number) => {
    const newBrokers = [...selectedBrokers];
    newBrokers[index] = value;
    setSelectedBrokers(newBrokers);
    updateUrl(newBrokers);
  };
  
  // Handle adding a new broker slot
  const addBroker = () => {
    if (selectedBrokers.length < 5) {
      // Find a broker that isn't already selected
      const availableBrokers = brokers.filter(
        broker => !selectedBrokers.includes(broker.id)
      );
      
      const newBrokerId = availableBrokers.length > 0 
        ? availableBrokers[0].id 
        : "";
      
      const newBrokers = [...selectedBrokers, newBrokerId];
      setSelectedBrokers(newBrokers);
      updateUrl(newBrokers);
    }
  };
  
  // Handle removing a broker
  const removeBroker = (index: number) => {
    if (selectedBrokers.length <= 2) {
      // Don't allow fewer than 2 brokers
      return;
    }
    
    const newBrokers = selectedBrokers.filter((_, i) => i !== index);
    setSelectedBrokers(newBrokers);
    updateUrl(newBrokers);
  };
  
  // Sync with URL params on initial load
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Get all broker parameters (broker1, broker2, broker3, etc.)
    const brokerParams: string[] = [];
    for (let i = 1; i <= 5; i++) {
      const param = params.get(`broker${i}`);
      if (param) {
        brokerParams.push(param);
      }
    }
    
    // Update selected brokers if we have valid params
    if (brokerParams.length >= 2) {
      setSelectedBrokers(brokerParams);
    }
  }, [searchParams]);
  
  return (
    <div className="bg-card border rounded-lg p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4">Select Brokers to Compare</h2>
      
      <div className="space-y-4">
        {/* Broker selection fields */}
        {selectedBrokers.map((brokerId, index) => (
          <div key={index} className="flex items-center gap-3">
            <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              {index + 1}
            </Badge>
            
            <Select value={brokerId} onValueChange={(value) => handleBrokerChange(value, index)}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a broker" />
              </SelectTrigger>
              <SelectContent>
                {brokers.map((broker) => (
                  <SelectItem 
                    key={broker.id} 
                    value={broker.id}
                    disabled={selectedBrokers.includes(broker.id) && selectedBrokers.indexOf(broker.id) !== index}
                  >
                    {broker.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {index >= 2 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeBroker(index)}
                className="shrink-0"
                aria-label={`Remove ${brokers.find(b => b.id === brokerId)?.name || 'broker'}`}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
        {/* Add broker button */}
        {selectedBrokers.length < 5 && (
          <Button
            variant="outline"
            size="sm"
            onClick={addBroker}
            className="mt-3"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Another Broker
          </Button>
        )}
        
        {/* Informational text */}
        <p className="text-xs text-muted-foreground mt-4">
          Compare up to 5 brokers side-by-side to find the best match for your trading needs.
          Select different brokers to update the comparison.
        </p>
      </div>
    </div>
  );
} 