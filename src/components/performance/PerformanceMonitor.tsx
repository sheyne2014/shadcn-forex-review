"use client";

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

interface PerformanceMonitorProps {
  reportTo?: string; // Optional endpoint to report metrics
  debug?: boolean;
}

type NavigationType = "navigate" | "reload" | "back-forward" | "back-forward-cache" | "prerender" | "restore";

interface EnhancedMetric extends Metric {
  rating: 'good' | 'needs-improvement' | 'poor';
  navigationType: NavigationType;
}

const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  switch (name) {
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
    default:
      return 'needs-improvement';
  }
};

const formatMetric = (metric: Metric): EnhancedMetric => ({
  ...metric,
  value: Math.round(metric.value * 10) / 10,
  rating: getRating(metric.name, metric.value),
  navigationType: (metric.navigationType || 'navigate') as NavigationType
});

export function PerformanceMonitor({ reportTo, debug = false }: PerformanceMonitorProps) {
  useEffect(() => {
    const reportMetric = (metric: EnhancedMetric) => {
      // Log to console if debug is enabled
      if (debug) {
        console.log(`%c${metric.name}`, `color: ${
          metric.rating === 'good' ? 'green' : 
          metric.rating === 'needs-improvement' ? 'orange' : 
          'red'
        }`, metric);
      }

      // Report to analytics if endpoint is provided
      if (reportTo) {
        fetch(reportTo, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            ...metric,
            url: window.location.href,
            userAgent: navigator.userAgent,
          }),
        }).catch(err => {
          if (debug) console.error('Failed to report metric:', err);
        });
      }
    };

    // Monitor Core Web Vitals
    onCLS(metric => reportMetric(formatMetric(metric)));
    onLCP(metric => reportMetric(formatMetric(metric)));
    onFCP(metric => reportMetric(formatMetric(metric)));
    onTTFB(metric => reportMetric(formatMetric(metric)));

    // Monitor Resource Timing
    const observeResourceTiming = () => {
      const resources = performance.getEntriesByType('resource');
      const resourceMetrics = resources.map(resource => ({
        name: 'Resource',
        value: resource.duration,
        url: resource.name,
        initiatorType: resource.initiatorType,
        rating: resource.duration < 1000 ? 'good' : 
                resource.duration < 2000 ? 'needs-improvement' : 'poor'
      }));

      if (debug) {
        console.group('Resource Timing');
        resourceMetrics.forEach(metric => console.log(metric));
        console.groupEnd();
      }
    };

    // Monitor Memory Usage if available
    const observeMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedHeap = memory.usedJSHeapSize / 1048576; // Convert to MB
        const memoryMetric = {
          name: 'Memory',
          value: usedHeap,
          rating: usedHeap < 50 ? 'good' : 
                  usedHeap < 100 ? 'needs-improvement' : 'poor',
          limit: memory.jsHeapSizeLimit / 1048576
        };

        if (debug) {
          console.log('%cMemory Usage', `color: ${
            memoryMetric.rating === 'good' ? 'green' : 
            memoryMetric.rating === 'needs-improvement' ? 'orange' : 
            'red'
          }`, memoryMetric);
        }
      }
    };

    // Set up periodic monitoring
    const monitoringInterval = setInterval(() => {
      observeResourceTiming();
      observeMemoryUsage();
    }, 10000); // Every 10 seconds

    return () => clearInterval(monitoringInterval);
  }, [debug, reportTo]);

  // Component doesn't render anything visually
  return null;
}