"use client";

import { useEffect } from 'react';
import { initPerformanceMonitoring, PerformanceOptimizer } from '@/lib/performance';

/**
 * PerformanceMonitor - Client-side performance monitoring component
 *
 * Features:
 * - Core Web Vitals tracking
 * - Resource preloading
 * - Connection quality detection
 * - Memory usage monitoring
 * - Automatic optimizations
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring (async)
    initPerformanceMonitoring().catch(error => {
      console.warn('Performance monitoring initialization failed:', error);
    });

    // Preload critical resources based on connection quality
    const connectionQuality = PerformanceOptimizer.getConnectionQuality();

    if (connectionQuality === 'fast' || connectionQuality === 'good') {
      // Preload critical fonts
      PerformanceOptimizer.preloadResource('/fonts/figtree-variable.woff2', 'font', 'font/woff2');

      // Preload critical images
      PerformanceOptimizer.preloadResource('/images/hero-bg.webp', 'image');

      // Prefetch likely next pages
      PerformanceOptimizer.prefetchPage('/brokers');
      PerformanceOptimizer.prefetchPage('/tools/compare');
    }

    // Monitor memory usage in development
    if (process.env.NODE_ENV === 'development') {
      const memoryInterval = setInterval(() => {
        const memory = PerformanceOptimizer.getMemoryUsage();
        if (memory && memory.used > 100) { // Alert if using more than 100MB
          console.warn('High memory usage detected:', memory);
        }
      }, 30000); // Check every 30 seconds

      return () => clearInterval(memoryInterval);
    }
  }, []);

  // This component doesn't render anything
  return null;
}

/**
 * ResourcePreloader - Preload critical resources
 */
interface ResourcePreloaderProps {
  resources: Array<{
    href: string;
    as: 'font' | 'image' | 'script' | 'style';
    type?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
  }>;
}

export function ResourcePreloader({ resources }: ResourcePreloaderProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    resources.forEach(({ href, as, type, crossOrigin }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      if (crossOrigin) link.crossOrigin = crossOrigin;

      document.head.appendChild(link);
    });
  }, [resources]);

  return null;
}

/**
 * ConnectionOptimizer - Optimize based on connection quality
 */
export function ConnectionOptimizer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const connectionQuality = PerformanceOptimizer.getConnectionQuality();

    // Add connection quality class to body for CSS optimizations
    document.body.classList.add(`connection-${connectionQuality}`);

    // Adjust image quality based on connection
    const images = document.querySelectorAll('img[data-adaptive]');
    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (src && src.includes('?')) {
        let quality = 85; // Default quality

        switch (connectionQuality) {
          case 'very-slow':
            quality = 60;
            break;
          case 'slow':
            quality = 70;
            break;
          case 'good':
            quality = 80;
            break;
          case 'fast':
            quality = 90;
            break;
        }

        const newSrc = src.replace(/q=\d+/, `q=${quality}`);
        img.setAttribute('src', newSrc);
      }
    });

    return () => {
      document.body.classList.remove(`connection-${connectionQuality}`);
    };
  }, []);

  return null;
}

/**
 * PerformanceReporter - Report performance metrics
 */
export function PerformanceReporter() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Report performance metrics after page load
    const reportMetrics = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        if (navigation) {
          const metrics = {
            pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
            firstByte: navigation.responseStart - navigation.fetchStart,
            domInteractive: navigation.domInteractive - navigation.fetchStart,
          };

          // Log metrics in development
          if (process.env.NODE_ENV === 'development') {
            console.log('Performance Metrics:', metrics);
          }

          // Send to analytics in production
          if (process.env.NODE_ENV === 'production' && (window as any).gtag) {
            (window as any).gtag('event', 'page_load_time', {
              value: Math.round(metrics.pageLoadTime),
              custom_parameter: 'performance_monitoring'
            });
          }
        }
      }
    };

    // Report after page is fully loaded
    if (document.readyState === 'complete') {
      setTimeout(reportMetrics, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(reportMetrics, 1000);
      });
    }
  }, []);

  return null;
}

/**
 * CriticalResourceLoader - Load critical resources with priority
 */
interface CriticalResourceLoaderProps {
  fonts?: readonly string[];
  images?: readonly string[];
  scripts?: readonly string[];
}

export function CriticalResourceLoader({ fonts = [], images = [], scripts = [] }: CriticalResourceLoaderProps) {
  useEffect(() => {
    // Load critical fonts
    fonts.forEach(fontUrl => {
      PerformanceOptimizer.preloadResource(fontUrl, 'font', 'font/woff2');
    });

    // Load critical images
    images.forEach(imageUrl => {
      PerformanceOptimizer.preloadResource(imageUrl, 'image');
    });

    // Load critical scripts
    scripts.forEach(scriptUrl => {
      PerformanceOptimizer.preloadResource(scriptUrl, 'script');
    });
  }, [fonts, images, scripts]);

  return null;
}

// Global performance configuration
export const PerformanceConfig = {
  // Critical resources to preload
  criticalFonts: [
    '/fonts/figtree-variable.woff2',
  ],
  criticalImages: [
    '/images/hero-bg.webp',
    '/images/logo.svg',
  ],
  criticalScripts: [],

  // Pages to prefetch
  prefetchPages: [
    '/brokers',
    '/tools/compare',
    '/tools/calculator',
    '/blog',
  ],

  // Performance thresholds
  thresholds: {
    memoryWarning: 100, // MB
    loadTimeWarning: 3000, // ms
    imageQualityByConnection: {
      'very-slow': 60,
      'slow': 70,
      'good': 80,
      'fast': 90,
    },
  },
} as const;
