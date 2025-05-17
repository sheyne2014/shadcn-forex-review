"use client";

import { useState, useEffect, useMemo } from 'react';
import { cn } from "@/lib/utils";

interface HeroAnimationProps {
  className?: string;
}

export function HeroAnimation({ className }: HeroAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Generate consistent floating element properties
  const floatingElements = useMemo(() => {
    // Use a seeded approach for consistent values
    return Array.from({ length: 10 }).map((_, i) => {
      // Use index as seed for pseudo-random but consistent values
      const seed = (i + 1) * 123;
      const width = (seed % 80) + 40;
      const height = ((seed * 2) % 80) + 40;
      const left = ((seed * 3) % 80);
      const top = ((seed * 4) % 80);
      const duration = ((seed % 10) + 10);

      return { width, height, left, top, duration, delay: i * 0.2 };
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Render a static placeholder until mounted
  if (!mounted) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-muted/20",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
      </div>
    );
  }

  // We're now using the same styles for both modes

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl HeroAnimation",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent z-10" />

      {/* Floating elements */}
      <div className="absolute inset-0 z-0">
        {floatingElements.map((el, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full backdrop-blur-md",
              "bg-primary/30", // Use same opacity for both modes
              "opacity-0 transition-opacity duration-1000",
              isVisible ? "opacity-100 hero-float-element" : "opacity-0"
            )}
            style={{
              width: `${el.width}px`,
              height: `${el.height}px`,
              left: `${el.left}%`,
              top: `${el.top}%`,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Chart lines */}
      <svg
        className="absolute inset-0 z-20 w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
      >
        <path
          d="M0 450 L100 400 L200 420 L300 380 L400 320 L500 340 L600 280 L700 220 L800 260"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            isVisible ? "hero-dash-animation" : ""
          )}
          strokeDasharray="2000"
          strokeDashoffset="2000"
        />
      </svg>
    </div>
  );
}