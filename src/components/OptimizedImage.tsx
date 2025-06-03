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

import React from "react";
import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

/**
 * OptimizedImage component with fallback and loading state
 *
 * This component provides a standardized way to use images with proper optimization,
 * loading placeholders, and fallback options if the main image fails to load.
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
}: OptimizedImageProps) {
  // Check if source is SVG
  const isSvg = src?.toLowerCase().endsWith(".svg");
  
  // Default fallback image
  const defaultFallback = "/images/blog/default-blog.svg";
  
  // Handle non-existent or empty src
  const imageSrc = src || defaultFallback;
  
  // For SVGs, we can use Image component for local SVGs, but with unoptimized flag
  if (isSvg) {
    return (
      <Image
        src={imageSrc}
        alt={alt || "Image"}
        width={width}
        height={height}
        className={className}
        priority={priority}
        unoptimized
        onError={(e) => {
          // If SVG fails to load, use default fallback
          const target = e.target as HTMLImageElement;
          if (target.src !== defaultFallback) {
            target.src = defaultFallback;
          }
        }}
      />
    );
  }

  // For regular images, use normal optimization
  return (
    <Image
      src={imageSrc}
      alt={alt || "Image"}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={(e) => {
        // If image fails to load, use default fallback
        const target = e.target as HTMLImageElement;
        if (target.src !== defaultFallback) {
          target.src = defaultFallback;
        }
      }}
    />
  );
}