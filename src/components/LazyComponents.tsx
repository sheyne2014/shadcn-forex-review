"use client";

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Loading components for better UX
const ComponentSkeleton = () => (
  <Card className="w-full">
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </CardContent>
  </Card>
);

const ChartSkeleton = () => (
  <div className="w-full h-64 bg-muted animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-muted-foreground">Loading chart...</div>
  </div>
);

const FormSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-10 w-24" />
  </div>
);

// Dynamically imported components with loading states
export const LazyBrokerAnalysisWidget = dynamic(
  () => import('@/components/BrokerAnalysisWidget').then(mod => ({ default: mod.BrokerAnalysisWidget })),
  {
    loading: () => <ComponentSkeleton />,
    ssr: false
  }
);

export const LazyTradingCalculator = dynamic(
  () => import('@/components/TradingCalculator').then(mod => ({ default: mod.TradingCalculator })),
  {
    loading: () => <FormSkeleton />,
    ssr: false
  }
);

export const LazyPerformanceChart = dynamic(
  () => import('@/components/PerformanceChart').then(mod => ({ default: mod.PerformanceChart })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

export const LazyRokuAI = dynamic(
  () => import('@/components/RokuAI').then(mod => ({ default: mod.RokuAI })),
  {
    loading: () => (
      <div className="fixed bottom-4 right-4 w-12 h-12 bg-primary rounded-full animate-pulse" />
    ),
    ssr: false
  }
);

export const LazyBrokerComparison = dynamic(
  () => import('@/components/BrokerComparison').then(mod => ({ default: mod.BrokerComparison })),
  {
    loading: () => <ComponentSkeleton />,
    ssr: false
  }
);

export const LazyAdvancedFilters = dynamic(
  () => import('@/components/AdvancedFilters').then(mod => ({ default: mod.AdvancedFilters })),
  {
    loading: () => <FormSkeleton />,
    ssr: false
  }
);

// Wrapper component with Suspense for better error boundaries
interface LazyComponentWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyComponentWrapper({ children, fallback = <ComponentSkeleton /> }: LazyComponentWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

// Hook for lazy loading components based on viewport
export function useLazyLoad(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, isVisible };
}
