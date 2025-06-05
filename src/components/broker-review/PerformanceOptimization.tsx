"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PerformanceOptimizationProps {
  brokerSlug: string;
}

export function PerformanceOptimization({ brokerSlug }: PerformanceOptimizationProps) {
  const router = useRouter();

  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload similar broker pages
      const similarBrokers = ['ic-markets', 'pepperstone', 'avatrade'];
      similarBrokers.forEach(broker => {
        if (broker !== brokerSlug) {
          router.prefetch(`/broker/${broker}`);
        }
      });

      // Preload comparison pages
      router.prefetch('/tools/compare');
      router.prefetch(`/compare/${brokerSlug}-vs-ic-markets`);
      
      // Preload category pages
      router.prefetch('/best-brokers/forex');
      router.prefetch('/best-brokers/beginners');
    };

    // Optimize images loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    // Implement smooth scrolling performance
    const optimizeScrolling = () => {
      let ticking = false;
      
      const updateScrollPosition = () => {
        // Update any scroll-dependent UI elements
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollPosition);
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      
      return () => window.removeEventListener('scroll', onScroll);
    };

    // Initialize optimizations
    const timer = setTimeout(() => {
      preloadCriticalResources();
      optimizeImages();
      const cleanupScroll = optimizeScrolling();
      
      return cleanupScroll;
    }, 1000);

    return () => clearTimeout(timer);
  }, [brokerSlug, router]);

  // Add critical CSS for above-the-fold content
  useEffect(() => {
    const criticalCSS = `
      .hero-section {
        contain: layout style paint;
      }
      
      .image-gallery {
        contain: layout;
      }
      
      .table-of-contents {
        will-change: transform;
      }
      
      .smooth-scroll {
        scroll-behavior: smooth;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .smooth-scroll {
          scroll-behavior: auto;
        }
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render anything visible
}

// Web Vitals tracking
export function trackWebVitals() {
  if (typeof window !== 'undefined') {
    // Track Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
}

// Service Worker registration for caching
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
