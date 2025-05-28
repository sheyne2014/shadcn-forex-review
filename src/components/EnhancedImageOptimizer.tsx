"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface EnhancedImageOptimizerProps extends Omit<ImageProps, 'onError' | 'alt'> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  showPlaceholder?: boolean;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "wide" | number;
  fade?: boolean;
  lazy?: boolean;
  preload?: boolean;
  quality?: number;
  sizes?: string;
  webpSrc?: string;
  avifSrc?: string;
  criticalResource?: boolean;
  loadingStrategy?: 'lazy' | 'eager' | 'auto';
}

/**
 * EnhancedImageOptimizer - Advanced image component for optimal Core Web Vitals
 * 
 * Features:
 * - Automatic format detection (AVIF, WebP, fallback)
 * - Intersection Observer for lazy loading
 * - Critical resource prioritization
 * - Adaptive quality based on connection speed
 * - Blur placeholder generation
 * - Error handling with multiple fallbacks
 * - LCP optimization for above-the-fold images
 * - Responsive image sizing
 */
export function EnhancedImageOptimizer({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  containerClassName,
  showPlaceholder = true,
  aspectRatio = "auto",
  fade = true,
  lazy = true,
  preload = false,
  quality = 85,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  webpSrc,
  avifSrc,
  criticalResource = false,
  loadingStrategy = 'auto',
  priority = false,
  ...props
}: EnhancedImageOptimizerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || criticalResource);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast'>('fast');
  const imgRef = useRef<HTMLDivElement>(null);

  // Detect connection speed
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        setConnectionSpeed(['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast');
      }
    }
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || criticalResource || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, criticalResource, isInView]);

  // Preload critical images
  useEffect(() => {
    if (preload || criticalResource) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getBestSrc();
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [preload, criticalResource, src, webpSrc, avifSrc]);

  // Get the best image source based on browser support and connection
  const getBestSrc = useCallback(() => {
    // Check for AVIF support
    if (avifSrc && supportsFormat('image/avif')) {
      return avifSrc;
    }
    
    // Check for WebP support
    if (webpSrc && supportsFormat('image/webp')) {
      return webpSrc;
    }
    
    return src;
  }, [src, webpSrc, avifSrc]);

  // Check if browser supports image format
  const supportsFormat = (format: string): boolean => {
    if (typeof document === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    try {
      return canvas.toDataURL(format).indexOf(`data:${format}`) === 0;
    } catch {
      return false;
    }
  };

  // Adaptive quality based on connection speed
  const getAdaptiveQuality = () => {
    if (connectionSpeed === 'slow') {
      return Math.max(quality - 20, 60);
    }
    return quality;
  };

  // Handle image loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setError(false);
  };

  // Handle image error with fallback chain
  const handleError = () => {
    if (currentSrc === src && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setError(false);
    } else if (currentSrc === webpSrc && src !== webpSrc) {
      setCurrentSrc(src);
      setError(false);
    } else if (currentSrc === avifSrc && (webpSrc || src !== avifSrc)) {
      setCurrentSrc(webpSrc || src);
      setError(false);
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "portrait":
        return "aspect-[3/4]";
      case "wide":
        return "aspect-[16/9]";
      default:
        return typeof aspectRatio === "number" ? `aspect-[${aspectRatio}]` : "";
    }
  };

  // Generate blur data URL for placeholder
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a simple gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }
    
    return canvas.toDataURL();
  };

  // Placeholder component
  const Placeholder = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-muted-foreground/20 border-t-muted-foreground/60 rounded-full animate-spin" />
    </div>
  );

  // Error placeholder
  const ErrorPlaceholder = () => (
    <div className="absolute inset-0 bg-muted flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <div className="w-8 h-8 mx-auto mb-2 opacity-50">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
        <p className="text-xs">Image unavailable</p>
      </div>
    </div>
  );

  // Determine final source
  const finalSrc = error ? (fallbackSrc || src) : getBestSrc();

  // Determine loading strategy
  const shouldLoadEager = criticalResource || priority || loadingStrategy === 'eager';
  const shouldLoadLazy = !shouldLoadEager && (lazy || loadingStrategy === 'lazy');

  return (
    <div
      ref={imgRef}
      className={cn(
        "relative overflow-hidden",
        getAspectRatioClass(),
        containerClassName
      )}
    >
      {isInView ? (
        <>
          {showPlaceholder && isLoading && <Placeholder />}
          {error ? (
            <ErrorPlaceholder />
          ) : (
            <Image
              src={finalSrc}
              alt={alt}
              width={width}
              height={height}
              className={cn(
                "object-cover",
                fade && "transition-opacity duration-300",
                isLoading && fade ? "opacity-0" : "opacity-100",
                className
              )}
              onLoad={handleLoadingComplete}
              onError={handleError}
              priority={shouldLoadEager}
              loading={shouldLoadLazy ? 'lazy' : 'eager'}
              quality={getAdaptiveQuality()}
              sizes={sizes}
              placeholder={showPlaceholder ? "blur" : "empty"}
              blurDataURL={
                showPlaceholder && width && height
                  ? generateBlurDataURL(Number(width), Number(height))
                  : undefined
              }
              {...props}
            />
          )}
        </>
      ) : (
        showPlaceholder && <Placeholder />
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const EnhancedImagePresets = {
  hero: {
    priority: true,
    quality: 90,
    sizes: "100vw",
    preload: true,
    criticalResource: true,
    loadingStrategy: 'eager' as const,
  },
  card: {
    quality: 80,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    loadingStrategy: 'lazy' as const,
  },
  thumbnail: {
    quality: 75,
    sizes: "(max-width: 768px) 50vw, 25vw",
    loadingStrategy: 'lazy' as const,
  },
  logo: {
    quality: 90,
    priority: true,
    sizes: "200px",
    criticalResource: true,
    loadingStrategy: 'eager' as const,
  },
  gallery: {
    quality: 85,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    loadingStrategy: 'lazy' as const,
    fade: true,
  },
} as const;
