"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Search } from "lucide-react";

type BrokerSearchResult = {
  id: string;
  name: string;
  country?: string;
  regulations?: string;
  isWebResult?: boolean;
  url?: string;
};

export function BrokerSearchCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BrokerSearchResult[]>([]);
  const [webResults, setWebResults] = useState<BrokerSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const searchBrokers = async () => {
      if (query.length < 2) {
        setResults([]);
        setWebResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // In a real implementation this would call the API endpoint
        // For now we'll simulate the results
        
        // Simulated delay to mimic API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Sample broker data
        const brokerData: BrokerSearchResult[] = [
          { id: "1", name: "XYZ Trading", country: "UK", regulations: "FCA, ASIC" },
          { id: "2", name: "Alpha Markets", country: "AU", regulations: "ASIC" },
          { id: "3", name: "Global Prime", country: "CY", regulations: "CySEC" },
          { id: "4", name: "Trade Pro", country: "US", regulations: "NFA, CFTC" }
        ].filter(broker => 
          broker.name.toLowerCase().includes(query.toLowerCase()) ||
          broker.country?.toLowerCase().includes(query.toLowerCase()) ||
          broker.regulations?.toLowerCase().includes(query.toLowerCase())
        );
        
        setResults(brokerData);
        
        // Simulated web results using the FireCrawl scraper
        if (brokerData.length < 2) {
          const webData = [
            { 
              id: "web-1", 
              name: `${query.charAt(0).toUpperCase() + query.slice(1)} Broker`, 
              isWebResult: true,
              url: `https://example.com/${query}`
            },
            { 
              id: "web-2", 
              name: `Best ${query.charAt(0).toUpperCase() + query.slice(1)} Trading`, 
              isWebResult: true,
              url: `https://trading-example.com/${query}`
            }
          ];
          setWebResults(webData);
        } else {
          setWebResults([]);
        }
      } catch (error) {
        console.error("Error searching brokers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(searchBrokers, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleBrokerSelect = (broker: BrokerSearchResult) => {
    setOpen(false);
    if (broker.isWebResult && broker.url) {
      // In a real app, this would potentially add the broker to the system
      // For now, we'll just log the action
      console.log("Selected web broker:", broker);
      window.open(broker.url, "_blank");
    } else {
      router.push(`/broker/${broker.id}`);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="justify-start text-sm text-muted-foreground w-full md:w-auto relative"
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search brokers...</span>
        <kbd className="ml-4 pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search brokers..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {isLoading ? (
              <div className="py-6 text-center text-sm">Searching...</div>
            ) : (
              <div className="py-6 text-center text-sm">No brokers found.</div>
            )}
          </CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="Database Brokers">
              {results.map((broker) => (
                <CommandItem
                  key={broker.id}
                  onSelect={() => handleBrokerSelect(broker)}
                >
                  <span>{broker.name}</span>
                  {broker.country && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {broker.country} • {broker.regulations}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          {webResults.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Web Results">
                {webResults.map((broker) => (
                  <CommandItem
                    key={broker.id}
                    onSelect={() => handleBrokerSelect(broker)}
                  >
                    <span>{broker.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      Web result
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
} 