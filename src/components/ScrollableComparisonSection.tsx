"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollableComparisonSection({ children }: { children: React.ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Show left arrow if scrolled right
    setShowLeftArrow(scrollLeft > 20);
    
    // Show right arrow if there's more content to scroll to
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Attach scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScrollPosition(); // Initial check
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

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
      {/* Left scroll button - only shown if needed */}
      {showLeftArrow && (
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 z-10 opacity-80 hover:opacity-100 transition-opacity border border-gray-200 dark:border-gray-700 -ml-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-primary" />
        </button>
      )}
      
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar max-w-7xl mx-auto px-5 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40"
        aria-label="Scrollable comparison content"
      >
        {children}
      </div>
      
      {/* Right scroll button - only shown if needed */}
      {showRightArrow && (
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 z-10 opacity-80 hover:opacity-100 transition-opacity border border-gray-200 dark:border-gray-700 -mr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-primary" />
        </button>
      )}

      {/* Mobile scroll indicator - only shown on mobile */}
      {isMobile && (
        <div className="flex justify-center mt-4 gap-1.5">
          <div className="h-1.5 w-8 bg-primary/50 rounded-full animate-pulse" 
               aria-hidden="true"></div>
          <div className="h-1.5 w-2 bg-primary/30 rounded-full" 
               aria-hidden="true"></div>
          <div className="h-1.5 w-2 bg-primary/30 rounded-full" 
               aria-hidden="true"></div>
        </div>
      )}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Add custom scrollbar for browsers that support it */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-primary\/20::-webkit-scrollbar-thumb {
          background-color: rgba(var(--primary), 0.2);
          border-radius: 9999px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
        .hover\:scrollbar-thumb-primary\/40:hover::-webkit-scrollbar-thumb {
          background-color: rgba(var(--primary), 0.4);
        }
      `}</style>
    </div>
  );
} 