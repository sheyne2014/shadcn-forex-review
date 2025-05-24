"use client";

import { useState, useMemo, useEffect } from "react";
import { Filter, X, Star, Search, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrokerData, FeatureItem, BrokerComparisonTable } from "@/components/BrokerComparisonTable"; // Import the actual table
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BrokerComparisonToolProps {
  initialBrokers: BrokerData[];
  availableFeatures: FeatureItem[]; // These are the features defined on the page, sourced from DB
}

export function BrokerComparisonTool({ initialBrokers, availableFeatures }: BrokerComparisonToolProps) {
  const [selectedBrokerIds, setSelectedBrokerIds] = useState<string[]>(
    initialBrokers.slice(0, Math.min(initialBrokers.length, 2)).map(b => b.id)
  );
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>(
    availableFeatures.filter(f => f.highlight || f.group === "Trading Conditions").map(f => f.id || "").filter(id => id !== "") // Default selected features
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBrokers, setFilteredBrokers] = useState<BrokerData[]>(initialBrokers);
  const [searchDialogOpen, setSearchDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Create a unique list of feature groups from availableFeatures
  const featureGroups = useMemo(() => {
    const groups: { id: string, name: string }[] = [];
    const groupIds = new Set<string>();
    availableFeatures.forEach(feature => {
      if (feature.group && !groupIds.has(feature.group)) {
        groupIds.add(feature.group);
        // Assuming group id can be used as name, or you might need a mapping
        groups.push({ id: feature.group, name: feature.group });
      }
    });
    return groups;
  }, [availableFeatures]);

  // Filter brokers to display based on selection
  const brokersToDisplay = useMemo(() =>
    initialBrokers.filter(broker => selectedBrokerIds.includes(broker.id)),
    [initialBrokers, selectedBrokerIds]
  );

  // Filter features to display based on selection
  const featuresToDisplay = useMemo(() => {
    // Only include features that are selected in the dropdown
    return availableFeatures.filter(feature =>
      feature.id && selectedFeatureIds.includes(feature.id)
    );
  }, [availableFeatures, selectedFeatureIds]);

  // Memoize the comparison table to prevent unnecessary re-renders
  const MemoizedComparisonTable = useMemo(() => {
    if (brokersToDisplay.length === 0) return null;

    if (isLoading) {
      return (
        <div className="border rounded-lg overflow-hidden shadow-sm p-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading comparison data...</p>
          </div>
        </div>
      );
    }

    // Only pass the selected features to the comparison table
    return (
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <BrokerComparisonTable brokers={brokersToDisplay} features={featuresToDisplay} />
      </div>
    );
  }, [brokersToDisplay, featuresToDisplay, isLoading]);

  const toggleBroker = (id: string) => {
    setSelectedBrokerIds(prev =>
      prev.includes(id) ? prev.filter(brokerId => brokerId !== id) :
      [...prev, id].slice(0, 7) // Limit to 7 brokers
    );
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatureIds(prev =>
      prev.includes(id) ? prev.filter(featureId => featureId !== id) : [...prev, id]
    );
  };

  const toggleFeatureGroup = (groupId: string) => {
    const groupFeatureIds = availableFeatures
      .filter(feature => feature.group === groupId)
      .map(feature => feature.id || "")
      .filter(id => id); // Filter out empty IDs

    const allSelected = groupFeatureIds.every(id => selectedFeatureIds.includes(id));

    if (allSelected) {
      // If all are selected, remove all from this group
      setSelectedFeatureIds(prev => prev.filter(id => !groupFeatureIds.includes(id)));
    } else {
      // If not all selected, add all from this group
      setSelectedFeatureIds(prev => [
        ...prev,
        ...groupFeatureIds.filter(id => !prev.includes(id)),
      ]);
    }
  };

  const resetFilters = () => {
    // Reset broker selection to the first 2 brokers
    setSelectedBrokerIds(initialBrokers.slice(0, Math.min(initialBrokers.length, 2)).map(b => b.id));

    // Reset feature selection to highlighted features and Trading features
    // Only include features with valid IDs
    setSelectedFeatureIds(
      availableFeatures
        .filter(f => (f.highlight || f.group === "Trading") && f.id)
        .map(f => f.id || "")
        .filter(id => id)
    );

    // Reset search
    setSearchQuery("");
    setFilteredBrokers(initialBrokers);
  };

  // Filter brokers based on search query with debounce
  useEffect(() => {
    // Debounce search to avoid filtering on every keystroke
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setFilteredBrokers(initialBrokers);
        return;
      }

      const query = searchQuery.toLowerCase();
      try {
        const filtered = initialBrokers.filter(broker => {
          // Check broker name
          if (broker.name.toLowerCase().includes(query)) return true;

          // Safely check country
          const country = broker.features.country;
          if (country && String(country).toLowerCase().includes(query)) return true;

          // Safely check regulations
          const regulations = broker.features.regulations;
          if (regulations && String(regulations).toLowerCase().includes(query)) return true;

          // Additional checks for other common fields
          const description = broker.features.description;
          if (description && String(description).toLowerCase().includes(query)) return true;

          return false;
        });

        setFilteredBrokers(filtered);
      } catch (error) {
        console.error("Error filtering brokers:", error);
        // Fallback to simple name filtering if there's an error
        const safeFiltered = initialBrokers.filter(broker =>
          broker.name.toLowerCase().includes(query)
        );
        setFilteredBrokers(safeFiltered);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, initialBrokers]);

  // Handle adding a broker from search results
  const addBrokerFromSearch = (broker: BrokerData) => {
    if (!selectedBrokerIds.includes(broker.id) && selectedBrokerIds.length < 7) {
      setSelectedBrokerIds(prev => [...prev, broker.id].slice(0, 7));
    }
    setSearchDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Instructions section */}
      <div className="bg-muted/20 p-6 rounded-lg border border-muted">
        <h2 className="text-xl font-semibold mb-3">How to Use the Broker Comparison Tool</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-medium">
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">1</div>
              <span>Select Brokers</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Use the "Search Brokers" button to find specific brokers or select from the dropdown menu. You can compare up to 7 brokers at once.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-medium">
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">2</div>
              <span>Choose Features</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Select which features you want to compare using the Features dropdown. Group features by category for easier comparison.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-medium">
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">3</div>
              <span>Analyze Results</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Review the comparison table to see how brokers stack up against each other. Hover over info icons for additional details.
            </p>
          </div>
        </div>
      </div>

      {/* Control section for selecting brokers and features */}
      <div className="flex flex-wrap gap-4 items-center p-5 bg-muted/30 rounded-lg border border-border/50">
        {/* Search broker button */}
        <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Search Brokers
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-background">
            <DialogHeader>
              <DialogTitle>Search Brokers</DialogTitle>
              <DialogDescription>
                Search for brokers by name, country, or regulations to add to comparison
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2 py-4">
              <div className="grid flex-1 gap-4">
                <Input
                  placeholder="Search brokers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <div className="max-h-[300px] overflow-y-auto bg-background">
                  {filteredBrokers.length > 0 ? (
                    <div className="space-y-2">
                      {filteredBrokers.map((broker) => (
                        <div
                          key={broker.id}
                          className={`flex items-center justify-between p-3 rounded-md border ${
                            selectedBrokerIds.includes(broker.id) ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <div className="font-medium">{broker.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                                {broker.rating.toFixed(1)}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addBrokerFromSearch(broker)}
                            disabled={selectedBrokerIds.includes(broker.id) || selectedBrokerIds.length >= 7}
                          >
                            <Plus className="h-4 w-4" />
                            {selectedBrokerIds.includes(broker.id) ? 'Added' : 'Add'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No brokers found matching your search
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Broker selection dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Brokers ({selectedBrokerIds.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-background !bg-background" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuLabel>Select Brokers (max 7)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="h-[300px] bg-background !bg-background">
              <DropdownMenuGroup>
                {initialBrokers.map((broker) => (
                  <DropdownMenuItem
                    key={broker.id}
                    className="flex items-center gap-2 cursor-pointer bg-background hover:bg-muted"
                    onSelect={(e) => { e.preventDefault(); toggleBroker(broker.id); }}
                  >
                    <div
                      key={`broker-div-${broker.id}`}
                      className="flex items-center gap-2 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBroker(broker.id);
                      }}
                    >
                      <Checkbox
                        id={`broker-select-${broker.id}`}
                        checked={selectedBrokerIds.includes(broker.id)}
                        disabled={!selectedBrokerIds.includes(broker.id) && selectedBrokerIds.length >= 7}
                        onCheckedChange={() => toggleBroker(broker.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <label
                        htmlFor={`broker-select-${broker.id}`}
                        className="flex-1 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {broker.name}
                      </label>
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                        {broker.rating.toFixed(1)}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Feature selection dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Features ({selectedFeatureIds.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-background !bg-background" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuLabel>Select Features to Compare</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2 text-xs text-muted-foreground bg-background !bg-background">
              Only selected features will appear in the comparison table
            </div>
            <DropdownMenuSeparator />
            <ScrollArea className="h-[300px] bg-background !bg-background">
              {featureGroups.map((group) => {
                // Get all valid feature IDs in this group
                const groupFeatureIds = availableFeatures
                  .filter(feature => feature.group === group.id && feature.id)
                  .map(feature => feature.id || "");

                // Check if all features in this group are selected
                const allSelected = groupFeatureIds.length > 0 &&
                  groupFeatureIds.every(id => selectedFeatureIds.includes(id));

                // Check if some features in this group are selected
                const someSelected = groupFeatureIds.some(id => selectedFeatureIds.includes(id));

                return (
                  <div key={group.id} className="px-2 py-1.5 bg-background !bg-background">
                    <div className="flex items-center gap-2 mb-1 bg-background !bg-background">
                      <div
                        key={`group-div-${group.id}`}
                        className="flex items-center gap-2 w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFeatureGroup(group.id);
                        }}
                      >
                        <Checkbox
                          id={`group-select-${group.id}`}
                          checked={allSelected}
                          className={someSelected && !allSelected ? "data-[state=checked]:bg-primary/50" : ""}
                          onCheckedChange={() => toggleFeatureGroup(group.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <label
                          htmlFor={`group-select-${group.id}`}
                          className={`font-medium text-sm cursor-pointer ${someSelected ? "text-primary" : ""}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {group.name} ({groupFeatureIds.length})
                        </label>
                      </div>
                    </div>
                    <div className="ml-6 border-l pl-3 space-y-0.5 bg-background !bg-background">
                      {availableFeatures
                        .filter(feature => feature.group === group.id)
                        .map((feature) => (
                          <div
                            key={feature.id}
                            className={`flex items-center gap-2 py-0.5 bg-background !bg-background hover:bg-muted rounded-sm ${
                              feature.id && selectedFeatureIds.includes(feature.id) ? "bg-muted/50" : ""
                            }`}
                          >
                            <div
                              key={`feature-div-${feature.id || `feature-${feature.name}`}`}
                              className="flex items-center gap-2 w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                feature.id && toggleFeature(feature.id);
                              }}
                            >
                              <Checkbox
                                id={`feature-select-${feature.id}`}
                                checked={feature.id ? selectedFeatureIds.includes(feature.id) : false}
                                onCheckedChange={() => feature.id && toggleFeature(feature.id)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <label
                                htmlFor={`feature-select-${feature.id}`}
                                className={`text-sm cursor-pointer ${feature.id && selectedFeatureIds.includes(feature.id) ? "font-medium" : ""}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {feature.name}
                              </label>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" onClick={resetFilters}>
          <X className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>

      {/* Selected brokers summary */}
      {brokersToDisplay.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium mr-2">Selected brokers:</span>
          {brokersToDisplay.map(broker => (
            <div key={broker.id} className="bg-muted/50 border border-border/50 rounded-full px-3 py-1 text-sm flex items-center gap-1">
              {broker.name}
              <button
                onClick={() => toggleBroker(broker.id)}
                className="ml-1 text-muted-foreground hover:text-foreground"
                aria-label={`Remove ${broker.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pass the filtered data to the actual table component */}
      {brokersToDisplay.length > 0 ? (
        MemoizedComparisonTable
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
          <div className="text-lg font-medium mb-2">No brokers selected</div>
          <p className="text-muted-foreground mb-4">Select brokers to start comparing their features</p>
          <Button onClick={() => setSearchDialogOpen(true)}>
            <Search className="mr-2 h-4 w-4" />
            Search Brokers
          </Button>
        </div>
      )}

      <div className="text-sm text-muted-foreground bg-muted/20 p-5 rounded-lg border border-border/50">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div key="info-content">
            <p className="font-medium text-foreground mb-1">Important Information</p>
            <p>
              Information is updated regularly but may not reflect recent changes.
              Please verify details on brokers' official websites before making trading decisions.
            </p>
            <p className="mt-2">
              The comparison tool is designed to help you make informed decisions, but your specific trading needs may vary.
              Consider factors like your trading style, investment goals, and risk tolerance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}