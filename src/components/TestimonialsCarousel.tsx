"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import { cn } from '@/lib/utils';

interface Testimonial {
  content: string;
  name: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(4); // Default value
  const [isHovering, setIsHovering] = useState(false);

  // Calculate the number of pages based on container width and testimonial count
  useEffect(() => {
    const calculatePages = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth;
      const testimonialWidth = 350; // Approximate width of a testimonial card with gap
      const visibleItems = Math.max(1, Math.floor(containerWidth / testimonialWidth));
      const pages = Math.ceil(testimonials.length / visibleItems);
      
      setTotalPages(pages);
    };

    calculatePages();
    window.addEventListener('resize', calculatePages);
    
    return () => {
      window.removeEventListener('resize', calculatePages);
    };
  }, [testimonials.length]);

  // Update current page based on scroll position
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    const page = Math.min(
      totalPages - 1,
      Math.floor(scrollPercentage * totalPages)
    );
    
    setCurrentPage(page);
  };

  // Attach scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [totalPages]);

  const scrollPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -containerRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: containerRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollToPage = (pageIndex: number) => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth - containerRef.current.clientWidth;
      const scrollPosition = (scrollWidth / (totalPages - 1)) * pageIndex;
      
      containerRef.current.scrollTo({ 
        left: pageIndex === totalPages - 1 ? scrollWidth : scrollPosition, 
        behavior: 'smooth' 
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      scrollNext();
    }
  };

  return (
    <div 
      className="relative max-w-7xl mx-auto px-10" 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Testimonials carousel"
    >
      {/* Navigation controls - with improved visibility */}
      <button 
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background hover:bg-muted rounded-full p-2 shadow-md border",
          "transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary",
          currentPage === 0 ? "opacity-40 cursor-not-allowed" : (isHovering ? "opacity-90" : "opacity-60")
        )}
        aria-label="Previous testimonials"
        onClick={scrollPrev}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      {/* Scrollable testimonials container */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        aria-live="polite"
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            content={testimonial.content}
            name={testimonial.name}
            role={testimonial.role}
            rating={testimonial.rating}
            className="h-full min-w-[300px] sm:min-w-[350px] snap-start hover:border-primary/30 hover:shadow-md transition-all"
            aria-hidden={Math.floor(index / Math.ceil(testimonials.length / totalPages)) !== currentPage}
          />
        ))}
      </div>
      
      {/* Right navigation button */}
      <button 
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background hover:bg-muted rounded-full p-2 shadow-md border",
          "transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-primary",
          currentPage === totalPages - 1 ? "opacity-40 cursor-not-allowed" : (isHovering ? "opacity-90" : "opacity-60")
        )}
        aria-label="Next testimonials"
        onClick={scrollNext}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Enhanced indicator dots */}
      <div className="flex justify-center gap-1.5 mt-6" role="tablist" aria-label="Testimonial pages">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button 
            key={i}
            className={cn(
              "transition-all focus:outline-none focus:ring-2 focus:ring-primary",
              currentPage === i
                ? "w-6 h-2 bg-primary rounded-full"
                : "w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-primary/80"
            )}
            aria-label={`Go to testimonial page ${i + 1}`}
            aria-selected={currentPage === i}
            role="tab"
            onClick={() => scrollToPage(i)}
          />
        ))}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 