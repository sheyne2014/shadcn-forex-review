"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ScrollableComparisonSection({ children }: { children: React.ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 z-10 opacity-80 hover:opacity-100 transition-opacity border border-gray-200 dark:border-gray-700 -ml-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-6 w-6 text-primary" />
      </button>
      
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar max-w-7xl mx-auto px-5"
      >
        {children}
      </div>
      
      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 z-10 opacity-80 hover:opacity-100 transition-opacity border border-gray-200 dark:border-gray-700 -mr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-6 w-6 text-primary" />
      </button>
    </div>
  );
} 