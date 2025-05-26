"use client";

import { useState, useRef, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface PerformantImageProps extends Omit<ImageProps, 'onError' | 'alt'> {
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
}

/**
 * PerformantImage - Ultra-optimized image component for Core Web Vitals
 *
 * Features:
 * - Intersection Observer for lazy loading
 * - WebP/AVIF format optimization
 * - Blur placeholder generation
 * - Automatic size optimization
 * - Error handling with fallbacks
 * - LCP optimization for above-the-fold images
 */
export function PerformantImage({
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
  priority = false,
  ...props
}: PerformantImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
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
  }, [lazy, priority, isInView]);

  // Preload critical images
  useEffect(() => {
    if (preload && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [preload, src]);

  // Generate blur placeholder
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  // Determine aspect ratio styles
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square": return "aspect-square";
      case "video": return "aspect-video";
      case "portrait": return "aspect-[3/4]";
      case "wide": return "aspect-[16/9]";
      default: return typeof aspectRatio === 'number' ? `aspect-[${aspectRatio}]` : "";
    }
  };

  // Handle image load completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Handle image error
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  // Determine final source
  const finalSrc = error && fallbackSrc ? fallbackSrc : src;

  // Placeholder component
  const Placeholder = () => (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
        "animate-pulse flex items-center justify-center",
        fade && "transition-opacity duration-300"
      )}
    >
      <svg
        className="w-8 h-8 text-gray-400 dark:text-gray-600"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

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
            priority={priority}
            quality={quality}
            sizes={sizes}
            placeholder={showPlaceholder ? "blur" : "empty"}
            blurDataURL={
              showPlaceholder && width && height
                ? generateBlurDataURL(Number(width), Number(height))
                : undefined
            }
            {...props}
          />
        </>
      ) : (
        showPlaceholder && <Placeholder />
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const ImagePresets = {
  hero: {
    priority: true,
    quality: 90,
    sizes: "100vw",
    preload: true,
  },
  card: {
    quality: 80,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  thumbnail: {
    quality: 75,
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
  logo: {
    quality: 90,
    priority: true,
    sizes: "200px",
  },
} as const;

// Hook for optimized image loading
export function useOptimizedImage(src: string, options?: {
  preload?: boolean;
  quality?: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!src || typeof window === 'undefined') return;

    const img = new window.Image();

    img.onload = () => {
      setIsLoaded(true);
      setError(null);
    };

    img.onerror = () => {
      setError('Failed to load image');
      setIsLoaded(false);
    };

    // Add quality parameter if specified
    const optimizedSrc = options?.quality
      ? `${src}?q=${options.quality}`
      : src;

    img.src = optimizedSrc;

    // Preload if requested
    if (options?.preload && typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedSrc;
      document.head.appendChild(link);
    }

  }, [src, options?.quality, options?.preload]);

  return { isLoaded, error };
}
