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
import { searchBrokers } from "@/lib/supabase/roku-client";
import { getBrokers } from "@/lib/supabase/broker-client";

type BrokerSearchResult = {
  id: string;
  name: string;
  country?: string;
  regulations?: string;
  rating?: number;
  description?: string;
  features?: string;
  pros?: string;
  cons?: string;
  url?: string;
  isWebResult?: boolean;
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
    const performSearch = async () => {
      if (query.length < 2) {
        setResults([]);
        setWebResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // Search using the real API
        const searchTerms = query.split(' ').filter(term => term.length > 1);
        
        // First try the roku-client search which searches in name, description, features, pros, cons
        const rokuResults = await searchBrokers(searchTerms);
        
        // Also search the main brokers table for additional results
        const { data: brokerResults } = await getBrokers({
          limit: 10,
          sort_by: "rating",
          sort_order: "desc"
        });
        
        // Filter broker results by query
        const filteredBrokers = brokerResults?.filter(broker => {
          const searchText = `${broker.name} ${broker.country} ${broker.regulations} ${broker.description || ''}`.toLowerCase();
          return searchTerms.some(term => searchText.includes(term.toLowerCase()));
        }) || [];
        
        // Combine and deduplicate results
        const combinedResults = [...rokuResults, ...filteredBrokers];
        const uniqueResults = combinedResults.filter((broker, index, self) => 
          index === self.findIndex(b => b.id === broker.id)
        );
        
        setResults(uniqueResults.slice(0, 8)); // Limit to 8 results
        
        // If we have few results, suggest web search
        if (uniqueResults.length < 3) {
          const webData = [
            { 
              id: "web-1", 
              name: `Search "${query}" on the web`, 
              isWebResult: true,
              url: `https://www.google.com/search?q=${encodeURIComponent(query + ' broker review')}`
            }
          ];
          setWebResults(webData);
        } else {
          setWebResults([]);
        }
      } catch (error) {
        console.error("Error searching brokers:", error);
        setResults([]);
        setWebResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(performSearch, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleBrokerSelect = (broker: BrokerSearchResult) => {
    setOpen(false);
    if (broker.isWebResult && broker.url) {
      window.open(broker.url, "_blank");
    } else {
      // Check if broker has a URL slug or use ID
      const brokerPath = broker.url ? `/brokers/${broker.url.replace(/^https?:\/\/[^\/]+\//, '')}` : `/broker/${broker.id}`;
      router.push(brokerPath);
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
            <CommandGroup heading="Brokers">
              {results.map((broker) => (
                <CommandItem
                  key={broker.id}
                  onSelect={() => handleBrokerSelect(broker)}
                  className="flex items-center justify-between p-3"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{broker.name}</span>
                    {broker.country && (
                      <span className="text-xs text-muted-foreground">
                        {broker.country} • {broker.regulations}
                      </span>
                    )}
                    {broker.description && (
                      <span className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {broker.description}
                      </span>
                    )}
                  </div>
                  {broker.rating && (
                    <div className="text-xs font-medium text-yellow-600">
                      ★ {broker.rating}
                    </div>
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