/**
 * Performance monitoring service for production
 */

import { reportPerformanceIssue } from './error-reporting';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  url: string;
  userAgent: string;
  extra?: Record<string, any>;
}

interface PerformanceThresholds {
  pageLoadTime: number;
  databaseQueryTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  bundleSize: number;
}

class PerformanceMonitoringService {
  private metrics: PerformanceMetric[] = [];
  private thresholds: PerformanceThresholds;
  private enabled: boolean;

  constructor() {
    this.enabled = typeof window !== 'undefined';
    this.thresholds = {
      pageLoadTime: 3000,      // 3 seconds
      databaseQueryTime: 1000, // 1 second
      apiResponseTime: 2000,   // 2 seconds
      memoryUsage: 100,        // 100MB
      bundleSize: 1000000,     // 1MB
    };

    if (this.enabled) {
      this.setupPerformanceObservers();
      this.monitorPageLoad();
      this.monitorMemoryUsage();
    }
  }

  private setupPerformanceObservers() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('lcp', lastEntry.startTime, {
          element: (lastEntry as any).element?.tagName
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordMetric('fid', (entry as any).processingStart - entry.startTime, {
            eventType: (entry as any).name
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let clsValue = 0;
        entries.forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        this.recordMetric('cls', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const navEntry = entry as PerformanceNavigationTiming;
          this.recordMetric('ttfb', navEntry.responseStart - navEntry.requestStart);
          this.recordMetric('domContentLoaded', navEntry.domContentLoadedEventEnd - navEntry.navigationStart);
          this.recordMetric('loadComplete', navEntry.loadEventEnd - navEntry.navigationStart);
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
    }
  }

  private monitorPageLoad() {
    if (document.readyState === 'complete') {
      this.measurePageLoad();
    } else {
      window.addEventListener('load', () => this.measurePageLoad());
    }
  }

  private measurePageLoad() {
    const loadTime = performance.now();
    this.recordMetric('pageLoadTime', loadTime);
    
    if (loadTime > this.thresholds.pageLoadTime) {
      reportPerformanceIssue('pageLoadTime', loadTime, this.thresholds.pageLoadTime);
    }
  }

  private monitorMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const usedMB = memory.usedJSHeapSize / 1024 / 1024;
        this.recordMetric('memoryUsage', usedMB);
        
        if (usedMB > this.thresholds.memoryUsage) {
          reportPerformanceIssue('memoryUsage', usedMB, this.thresholds.memoryUsage);
        }
      }, 30000); // Check every 30 seconds
    }
  }

  recordMetric(name: string, value: number, extra?: Record<string, any>) {
    if (!this.enabled) return;

    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      extra
    };

    this.metrics.push(metric);

    // Keep only last 100 metrics to prevent memory leaks
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Log significant metrics
    if (this.shouldLogMetric(name, value)) {
      console.log(`Performance metric: ${name} = ${value.toFixed(2)}ms`);
    }
  }

  private shouldLogMetric(name: string, value: number): boolean {
    const significantMetrics = ['lcp', 'fid', 'cls', 'pageLoadTime'];
    return significantMetrics.includes(name) || value > 1000;
  }

  // Database query monitoring
  monitorDatabaseQuery<T>(queryName: string, queryPromise: Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    return queryPromise
      .then((result) => {
        const duration = performance.now() - startTime;
        this.recordMetric('databaseQuery', duration, { queryName, success: true });
        
        if (duration > this.thresholds.databaseQueryTime) {
          reportPerformanceIssue('databaseQueryTime', duration, this.thresholds.databaseQueryTime);
        }
        
        return result;
      })
      .catch((error) => {
        const duration = performance.now() - startTime;
        this.recordMetric('databaseQuery', duration, { queryName, success: false, error: error.message });
        throw error;
      });
  }

  // API call monitoring
  monitorAPICall<T>(endpoint: string, apiPromise: Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    return apiPromise
      .then((result) => {
        const duration = performance.now() - startTime;
        this.recordMetric('apiCall', duration, { endpoint, success: true });
        
        if (duration > this.thresholds.apiResponseTime) {
          reportPerformanceIssue('apiResponseTime', duration, this.thresholds.apiResponseTime);
        }
        
        return result;
      })
      .catch((error) => {
        const duration = performance.now() - startTime;
        this.recordMetric('apiCall', duration, { endpoint, success: false, error: error.message });
        throw error;
      });
  }

  // Get performance summary
  getPerformanceSummary() {
    const summary: Record<string, { avg: number; max: number; count: number }> = {};
    
    this.metrics.forEach((metric) => {
      if (!summary[metric.name]) {
        summary[metric.name] = { avg: 0, max: 0, count: 0 };
      }
      
      summary[metric.name].count++;
      summary[metric.name].max = Math.max(summary[metric.name].max, metric.value);
      summary[metric.name].avg = (summary[metric.name].avg * (summary[metric.name].count - 1) + metric.value) / summary[metric.name].count;
    });
    
    return summary;
  }

  // Send metrics to analytics service
  async sendMetrics() {
    if (this.metrics.length === 0) return;

    try {
      await fetch('/api/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metrics: this.metrics,
          summary: this.getPerformanceSummary()
        })
      });
      
      // Clear sent metrics
      this.metrics = [];
    } catch (error) {
      console.warn('Failed to send performance metrics:', error);
    }
  }
}

// Global instance
export const performanceMonitoring = new PerformanceMonitoringService();

// Convenience functions
export const recordMetric = (name: string, value: number, extra?: Record<string, any>) => {
  performanceMonitoring.recordMetric(name, value, extra);
};

export const monitorDatabaseQuery = <T>(queryName: string, queryPromise: Promise<T>): Promise<T> => {
  return performanceMonitoring.monitorDatabaseQuery(queryName, queryPromise);
};

export const monitorAPICall = <T>(endpoint: string, apiPromise: Promise<T>): Promise<T> => {
  return performanceMonitoring.monitorAPICall(endpoint, apiPromise);
};

// React hook for performance monitoring
export function usePerformanceMonitoring() {
  return {
    recordMetric,
    monitorDatabaseQuery,
    monitorAPICall,
    getPerformanceSummary: () => performanceMonitoring.getPerformanceSummary()
  };
}
