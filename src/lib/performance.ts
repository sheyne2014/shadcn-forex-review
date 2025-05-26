/**
 * Performance monitoring and Core Web Vitals optimization
 * Enhanced for 2025 SEO requirements and user experience
 */

// Performance thresholds based on Google's Core Web Vitals (2025 standards)
const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay (deprecated)
  INP: { good: 200, needsImprovement: 500 },   // Interaction to Next Paint (new)
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
};

/**
 * Initialize Core Web Vitals monitoring
 * Sends metrics to analytics for SEO performance tracking
 */
export async function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  try {
    // Dynamically import web-vitals to avoid SSR issues
    const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');

    // Monitor Core Web Vitals (including new INP metric)
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);  // New 2025 metric (replaces FID)
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

    // Monitor custom performance metrics
    monitorPageLoadTime();
    monitorResourceLoading();
    monitorNavigationTiming();
  } catch (error) {
    console.warn('Failed to initialize performance monitoring:', error);
  }
}

/**
 * Send performance metrics to analytics
 */
function sendToAnalytics(metric: any) {
  const { name, value, rating } = metric;

  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: rating,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true,
    });
  }

  // Send to Vercel Analytics
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', 'Core Web Vitals', {
      metric: name,
      value: value,
      rating: rating,
    });
  }

  // Log performance issues for debugging
  if (rating === 'poor') {
    console.warn(`Poor ${name} performance detected:`, {
      value,
      threshold: getThreshold(name),
      rating,
    });
  }
}

/**
 * Get performance threshold for a metric
 */
function getThreshold(metricName: string) {
  switch (metricName) {
    case 'LCP': return PERFORMANCE_THRESHOLDS.LCP;
    case 'FID': return PERFORMANCE_THRESHOLDS.FID;
    case 'CLS': return PERFORMANCE_THRESHOLDS.CLS;
    case 'FCP': return PERFORMANCE_THRESHOLDS.FCP;
    case 'TTFB': return PERFORMANCE_THRESHOLDS.TTFB;
    default: return null;
  }
}

/**
 * Monitor page load time for SEO insights
 */
function monitorPageLoadTime() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    if (navigation) {
      const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;

      // Track page load metrics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_load_time', {
          event_category: 'Performance',
          value: Math.round(pageLoadTime),
          custom_parameter_1: Math.round(domContentLoaded),
        });
      }
    }
  });
}

/**
 * Monitor resource loading for optimization insights
 */
function monitorResourceLoading() {
  if (typeof window === 'undefined') return;

  // Monitor slow-loading resources
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 1000) { // Resources taking more than 1 second
        console.warn('Slow resource detected:', {
          name: entry.name,
          duration: entry.duration,
          type: (entry as any).initiatorType,
        });
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
}

/**
 * Monitor navigation timing for SEO performance
 */
function monitorNavigationTiming() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    if (navigation) {
      const metrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        ssl: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,
        ttfb: navigation.responseStart - navigation.fetchStart,
        download: navigation.responseEnd - navigation.responseStart,
        dom: navigation.domContentLoadedEventEnd - navigation.responseEnd,
        load: navigation.loadEventEnd - navigation.domContentLoadedEventEnd,
      };

      // Log performance breakdown for optimization
      console.log('Navigation timing breakdown:', metrics);
    }
  });
}

/**
 * Optimize images for better Core Web Vitals
 */
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return;

  // Add loading="lazy" to images below the fold
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach((img, index) => {
    if (index > 2) { // First 3 images load eagerly
      img.setAttribute('loading', 'lazy');
    }
  });

  // Preload critical images
  const criticalImages = document.querySelectorAll('img[data-priority="high"]');
  criticalImages.forEach((img) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img.getAttribute('src') || '';
    document.head.appendChild(link);
  });
}

/**
 * Optimize fonts for better performance
 */
export function optimizeFontLoading() {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const criticalFonts = [
    '/fonts/figtree-variable.woff2',
  ];

  criticalFonts.forEach((fontUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = fontUrl;
    document.head.appendChild(link);
  });
}

/**
 * Monitor and optimize Cumulative Layout Shift
 */
export function optimizeLayoutShift() {
  if (typeof window === 'undefined') return;

  // Add explicit dimensions to images without them
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    imgElement.addEventListener('load', () => {
      if (!imgElement.getAttribute('width') && !imgElement.getAttribute('height')) {
        imgElement.setAttribute('width', imgElement.naturalWidth.toString());
        imgElement.setAttribute('height', imgElement.naturalHeight.toString());
      }
    });
  });

  // Reserve space for dynamic content
  const dynamicContainers = document.querySelectorAll('[data-dynamic-content]');
  dynamicContainers.forEach((container) => {
    const minHeight = container.getAttribute('data-min-height');
    if (minHeight) {
      (container as HTMLElement).style.minHeight = minHeight;
    }
  });
}

/**
 * Performance optimization utilities for SEO
 */
export const PerformanceUtils = {
  // Debounce function for performance optimization
  debounce: (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle: (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function executedFunction(...args: any[]) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Intersection Observer for lazy loading
  createIntersectionObserver: (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return null;
    }
    return new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    });
  },
};

/**
 * Advanced performance optimization utilities
 */
export const PerformanceOptimizer = {
  // Debounce function for performance-critical operations
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate = false
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Throttle function for scroll/resize events
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Preload critical resources
  preloadResource: (href: string, as: string, type?: string) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    if (as === 'font') link.crossOrigin = 'anonymous';

    document.head.appendChild(link);
  },

  // Prefetch next page resources
  prefetchPage: (url: string) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  },

  // Optimize images with WebP/AVIF support detection
  getOptimizedImageFormat: (): 'avif' | 'webp' | 'jpg' => {
    if (typeof window === 'undefined') return 'jpg';

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    // Check AVIF support
    if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
      return 'avif';
    }

    // Check WebP support
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      return 'webp';
    }

    return 'jpg';
  },

  // Memory usage monitoring
  getMemoryUsage: () => {
    if (typeof window === 'undefined' || !('performance' in window)) return null;

    const memory = (performance as any).memory;
    if (!memory) return null;

    return {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
    };
  },

  // Connection quality detection
  getConnectionQuality: () => {
    if (typeof window === 'undefined') return 'unknown';

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (!connection) return 'unknown';

    const { effectiveType, downlink, rtt } = connection;

    if (effectiveType === '4g' && downlink > 10) return 'fast';
    if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 1.5)) return 'good';
    if (effectiveType === '3g') return 'slow';
    return 'very-slow';
  },
};

// Note: Performance monitoring should be initialized manually in components
// to avoid SSR issues. Use initPerformanceMonitoring() in useEffect hooks.
