"use client";

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Ensure we're mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleItem = (index: number) => {
    if (!mounted) return;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div 
          key={index}
          className={cn(
            "border rounded-lg overflow-hidden transition-all duration-200",
            mounted && openIndex === index ? "shadow-md border-primary/30" : "hover:border-primary/20"
          )}
        >
          <button
            onClick={() => toggleItem(index)}
            className="flex items-center justify-between w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-lg"
            aria-expanded={mounted && openIndex === index}
            disabled={!mounted}
          >
            <span className="font-medium text-lg">{item.question}</span>
            <ChevronDown 
              className={cn(
                "h-5 w-5 text-primary transition-transform duration-300",
                mounted && openIndex === index ? "transform rotate-180" : ""
              )} 
            />
          </button>
          
          <div 
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              mounted && openIndex === index ? "max-h-96" : "max-h-0"
            )}
          >
            <div className="p-4 pt-0 text-muted-foreground">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 