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
import { Search, Star, MapPin, Shield, ChevronRight } from "lucide-react";
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
        className="justify-between text-sm text-muted-foreground w-full relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/30 dark:border-slate-700/50 shadow-md hover:shadow-lg hover:bg-white/95 dark:hover:bg-slate-800/95 transition-all rounded-xl group"
      >
        <div className="flex items-center">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-lg mr-3">
            <Search className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-slate-600 dark:text-slate-300">Search brokers by name, country, or features...</span>
        </div>
        <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded border border-white/20 dark:border-slate-700/40 bg-white/30 dark:bg-slate-800/50 px-1.5 font-mono text-[10px] font-medium text-slate-600 dark:text-slate-400 opacity-100 md:flex backdrop-blur-sm">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="border-b border-slate-200 dark:border-slate-800 px-3 py-3 flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <CommandInput
              placeholder="Search brokers by name, country, features..."
              value={query}
              onValueChange={setQuery}
              className="border-0 shadow-none focus:ring-0 h-auto p-0 text-base"
            />
          </div>
          <CommandList className="max-h-[400px] overflow-y-auto">
            <div className="scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 p-2">
              <CommandEmpty>
                {isLoading ? (
                  <div className="py-12 flex flex-col items-center justify-center text-sm">
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-600 border-r-transparent animate-spin mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Searching brokers...</p>
                  </div>
                ) : (
                  <div className="py-16 flex flex-col items-center text-sm">
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-4 mb-4">
                      <Search className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="font-medium text-slate-800 dark:text-slate-200 text-lg mb-2">No brokers found</p>
                    <p className="text-slate-500 dark:text-slate-400 text-center max-w-xs">Try searching for a broker name, country, regulation, or trading feature</p>
                  </div>
                )}
              </CommandEmpty>
              {results.length > 0 && (
                <CommandGroup heading="Brokers">
                  {results.map((broker) => (
                    <CommandItem
                      key={broker.id}
                      onSelect={() => handleBrokerSelect(broker)}
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/70 rounded-lg mb-1"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900 dark:text-slate-100">{broker.name}</span>
                          {broker.rating && (
                            <div className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded-md">
                              <Star className="h-3 w-3 fill-amber-500 mr-0.5" />
                              {broker.rating}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          {broker.country && (
                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                              <MapPin className="h-3 w-3" />
                              <span>{broker.country}</span>
                            </div>
                          )}
                          {broker.regulations && (
                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                              <Shield className="h-3 w-3" />
                              <span className="truncate max-w-[120px]">{broker.regulations}</span>
                            </div>
                          )}
                        </div>
                        
                        {broker.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                            {broker.description}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 opacity-70" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {webResults.length > 0 && (
                <>
                  <CommandSeparator className="my-2 bg-slate-200 dark:bg-slate-700" />
                  <CommandGroup heading="Web Results">
                    {webResults.map((broker) => (
                      <CommandItem
                        key={broker.id}
                        onSelect={() => handleBrokerSelect(broker)}
                        className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/70 rounded-lg py-2.5 px-3"
                      >
                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-1 rounded-md">
                          <Search className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">{broker.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </div>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}