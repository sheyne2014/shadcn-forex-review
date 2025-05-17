"use client";

import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';

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
      const scrollWidth = containerRef.current.scrollWidth;
      const pages = 4; // Approximately how many "pages" of testimonials we have
      containerRef.current.scrollTo({ 
        left: (scrollWidth / pages) * pageIndex, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-10">
      {/* Left navigation arrow */}
      <button 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background hover:bg-muted rounded-full p-2 shadow-md border"
        aria-label="Previous testimonials"
        onClick={scrollPrev}
      >
        <ChevronRight className="h-6 w-6 rotate-180" />
      </button>
      
      {/* Scrollable testimonials container */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            content={testimonial.content}
            name={testimonial.name}
            role={testimonial.role}
            rating={testimonial.rating}
            className="h-full min-w-[300px] sm:min-w-[350px] snap-start hover:border-primary/30 hover:shadow-md transition-all"
          />
        ))}
      </div>
      
      {/* Right navigation arrow */}
      <button 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background hover:bg-muted rounded-full p-2 shadow-md border"
        aria-label="Next testimonials"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicator dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <button 
            key={i}
            className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-primary/80 transition-colors"
            aria-label={`Go to testimonial page ${i + 1}`}
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