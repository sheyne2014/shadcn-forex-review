"use client";

import { Button } from "@/components/ui/button";

export function ScrollToTopButton() {
  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  return (
    <Button
      variant="outline"
      className="border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800 text-xs sm:text-sm py-1.5 h-auto"
      onClick={handleScrollToTop}
    >
      Check if your broker is on this list
    </Button>
  );
}