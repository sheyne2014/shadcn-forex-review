/**
 * OptimizedImage Component
 *
 * A wrapper around Next.js Image component that provides:
 * - Proper aspect ratio handling
 * - Responsive sizing
 * - Blur placeholders for better UX during loading
 * - Image quality control
 * - Fallback handling for broken images
 * - Lazy loading with IntersectionObserver
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'alt'> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  showPlaceholder?: boolean;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "wide" | number;
  fade?: boolean;
  lazyLoadingBuffer?: number; // Distance in pixels before the image comes into view that loading begins
  quality?: number; // Image quality
}

/**
 * OptimizedImage component with fallback and loading state
 *
 * This component provides a standardized way to use images with proper optimization,
 * loading placeholders, and fallback options if the main image fails to load.
 */
export function OptimizedImage({
  src,
  fallbackSrc = '/placeholder.svg', // Default fallback to a placeholder image
  alt,
  width,
  height,
  className,
  containerClassName,
  showPlaceholder = true,
  aspectRatio,
  fade = true,
  lazyLoadingBuffer = 200, // Load images 200px before they come into view
  quality = 85, // Higher quality by default
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Determine the final source to use
  const finalSrc = error ? fallbackSrc : src;

  // Set up intersection observer for advanced lazy loading
  useEffect(() => {
    if (!imageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: `${lazyLoadingBuffer}px`,
      }
    );

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, [lazyLoadingBuffer]);

  // Handle image load completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Handle image error
  const handleError = () => {
    setError(true);

    // If using the fallback already or no fallback is provided, keep the loading state visible
    if (finalSrc === fallbackSrc) {
      setIsLoading(false); // Stop showing loading state if fallback also fails
    }
  };

  // Convert aspectRatio to CSS aspect-ratio value
  const getAspectRatioStyle = () => {
    if (!aspectRatio || aspectRatio === "auto") return {};

    const ratioMap = {
      square: "1 / 1",
      video: "16 / 9",
      portrait: "3 / 4",
      wide: "21 / 9"
    };

    if (typeof aspectRatio === "string" && aspectRatio in ratioMap) {
      return { aspectRatio: ratioMap[aspectRatio as keyof typeof ratioMap] };
    }

    if (typeof aspectRatio === "number") {
      return { aspectRatio: aspectRatio.toString() };
    }

    return {};
  };

  return (
    <div
      ref={imageRef}
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={{
        ...(width && height ? { width, height } : {}),
        ...getAspectRatioStyle()
      }}
    >
      {/* Only render the image when it should load (near viewport) */}
      {shouldLoad && (
        <Image
          src={finalSrc}
          alt={alt}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          className={cn(
            fade ? 'transition-opacity duration-300' : '',
            isLoading && fade ? 'opacity-0' : 'opacity-100',
            className
          )}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          quality={quality}
          // Improved image formats support
          {...(typeof width === 'number' && typeof height === 'number' 
            ? { sizes: `(max-width: ${width}px) 100vw, ${width}px` } 
            : {})}
          {...props}
        />
      )}

      {/* Loading placeholder - shown during load or when waiting for intersection */}
      {(isLoading || !shouldLoad) && showPlaceholder && (
        <div
          className={cn(
            "absolute inset-0 bg-muted rounded-md",
            !shouldLoad ? "animate-pulse" : "animate-shimmer"
          )}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}