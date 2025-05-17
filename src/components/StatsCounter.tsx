"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

import { LucideIcon } from 'lucide-react';

interface StatsItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: LucideIcon;
  color?: string;
  bgColor?: string;
}

interface StatsCounterProps {
  items: StatsItem[];
  className?: string;
  itemClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
  duration?: number;
  animateOnView?: boolean;
}

export function StatsCounter({
  items,
  className,
  itemClassName,
  valueClassName,
  labelClassName,
  duration = 2000,
  animateOnView = true
}: StatsCounterProps) {
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState<number[]>(Array(items.length).fill(0));
  const containerRef = useRef<HTMLDivElement>(null);

  // Mark component as mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate the counter when in view
  useEffect(() => {
    if (!mounted) return;

    if (!animateOnView) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animateOnView, mounted]);

  // Animate counters
  useEffect(() => {
    if (!inView || !mounted) return;

    const stepDuration = 20; // ms per step
    const steps = duration / stepDuration;

    const timers = items.map((item, index) => {
      const stepValue = item.value / steps;
      let currentStep = 0;

      return setInterval(() => {
        setCounts(prevCounts => {
          const newCounts = [...prevCounts];

          if (currentStep < steps) {
            newCounts[index] = Math.ceil(stepValue * currentStep);
            currentStep++;
          } else {
            newCounts[index] = item.value;
            clearInterval(timers[index]);
          }

          return newCounts;
        });
      }, stepDuration);
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [inView, items, duration, mounted]);

  return (
    <div
      ref={containerRef}
      className={cn("grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8", className)}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "text-center space-y-1",
            itemClassName
          )}
        >
          {item.icon && mounted && (
            <div
              className={cn(
                "mx-auto h-14 w-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-300",
                item.bgColor || "bg-primary/10",
                item.color || "text-primary",
                inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <item.icon className="h-7 w-7" />
            </div>
          )}
          <p
            className={cn(
              "text-3xl md:text-4xl font-bold transition-opacity duration-300",
              mounted && (inView ? "opacity-100" : "opacity-0"),
              valueClassName
            )}
            style={mounted ? { transitionDelay: `${i * 100 + 50}ms` } : undefined}
          >
            {item.prefix}{mounted && inView ? counts[i].toLocaleString() : 0}{item.suffix}
          </p>
          <p
            className={cn(
              "text-sm text-muted-foreground transition-opacity duration-300",
              mounted && (inView ? "opacity-100" : "opacity-0"),
              labelClassName
            )}
            style={mounted ? { transitionDelay: `${i * 100 + 150}ms` } : undefined}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}