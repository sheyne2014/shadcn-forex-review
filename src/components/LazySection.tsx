"use client";

import { useState, useEffect, useRef, ReactNode, Suspense } from 'react';
import { cn } from '@/lib/utils';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  fadeIn?: boolean;
  slideIn?: boolean;
  minHeight?: string;
}

/**
 * LazySection - Optimized lazy loading component for sections
 * 
 * Features:
 * - Intersection Observer API
 * - Configurable thresholds and margins
 * - Animation support (fade/slide)
 * - Minimum height to prevent layout shift
 * - Delay support for staggered loading
 */
export function LazySection({
  children,
  fallback,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  delay = 0,
  fadeIn = true,
  slideIn = false,
  minHeight = 'auto',
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasTriggered(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasTriggered(true);
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, hasTriggered, delay]);

  const animationClasses = cn(
    fadeIn && 'transition-opacity duration-700',
    slideIn && 'transition-transform duration-700',
    isVisible
      ? 'opacity-100 transform translate-y-0'
      : cn(
          fadeIn && 'opacity-0',
          slideIn && 'transform translate-y-8'
        )
  );

  return (
    <div
      ref={ref}
      className={cn(animationClasses, className)}
      style={{ minHeight }}
    >
      {isVisible ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback || (
          <div 
            className="w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"
            style={{ minHeight: minHeight !== 'auto' ? minHeight : '200px' }}
          />
        )
      )}
    </div>
  );
}

/**
 * LazyComponent - Dynamic import wrapper with loading states
 */
interface LazyComponentProps {
  importFn: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: ReactNode;
  props?: Record<string, any>;
  className?: string;
  errorBoundary?: boolean;
}

export function LazyComponent({
  importFn,
  fallback,
  props = {},
  className,
  errorBoundary = true,
}: LazyComponentProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    importFn()
      .then((module) => {
        if (mounted) {
          setComponent(() => module.default);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [importFn]);

  if (loading) {
    return (
      <div className={className}>
        {fallback || (
          <div className="flex items-center justify-center p-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  if (error) {
    if (errorBoundary) {
      return (
        <div className={cn("p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20", className)}>
          <p className="text-red-600 dark:text-red-400">Failed to load component</p>
        </div>
      );
    }
    throw error;
  }

  if (!Component) {
    return null;
  }

  return (
    <div className={className}>
      <Component {...props} />
    </div>
  );
}

/**
 * LazyGrid - Optimized grid with staggered loading
 */
interface LazyGridProps {
  children: ReactNode[];
  columns?: number;
  gap?: string;
  staggerDelay?: number;
  className?: string;
}

export function LazyGrid({
  children,
  columns = 3,
  gap = '1rem',
  staggerDelay = 100,
  className,
}: LazyGridProps) {
  return (
    <div
      className={cn("grid", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children.map((child, index) => (
        <LazySection
          key={index}
          delay={index * staggerDelay}
          fadeIn
          slideIn
        >
          {child}
        </LazySection>
      ))}
    </div>
  );
}

/**
 * Performance monitoring hook for lazy loading
 */
export function useLazyLoadingMetrics() {
  const [metrics, setMetrics] = useState({
    totalSections: 0,
    loadedSections: 0,
    averageLoadTime: 0,
  });

  const trackSectionLoad = (loadTime: number) => {
    setMetrics(prev => ({
      totalSections: prev.totalSections + 1,
      loadedSections: prev.loadedSections + 1,
      averageLoadTime: (prev.averageLoadTime * (prev.loadedSections - 1) + loadTime) / prev.loadedSections,
    }));
  };

  return { metrics, trackSectionLoad };
}

/**
 * Presets for common lazy loading scenarios
 */
export const LazyPresets = {
  hero: {
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
    fadeIn: true,
    slideIn: false,
  },
  card: {
    threshold: 0.2,
    rootMargin: '50px',
    triggerOnce: true,
    fadeIn: true,
    slideIn: true,
  },
  footer: {
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
    fadeIn: true,
    slideIn: false,
  },
  sidebar: {
    threshold: 0.3,
    rootMargin: '20px',
    triggerOnce: false,
    fadeIn: true,
    slideIn: false,
  },
} as const;
