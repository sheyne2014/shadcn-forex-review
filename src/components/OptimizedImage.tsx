/**
 * OptimizedImage Component
 *
 * A wrapper around Next.js Image component that provides:
 * - Proper aspect ratio handling
 * - Responsive sizing
 * - Blur placeholders for better UX during loading
 * - Image quality control
 * - Fallback handling for broken images
 */

"use client";

import { useState } from "react";
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
}

/**
 * OptimizedImage component with fallback and loading state
 *
 * This component provides a standardized way to use images with proper optimization,
 * loading placeholders, and fallback options if the main image fails to load.
 */
export function OptimizedImage({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  containerClassName,
  showPlaceholder = true,
  aspectRatio,
  fade,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Determine the final source to use
  const finalSrc = error && fallbackSrc ? fallbackSrc : src;

  // Handle image load completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Handle image error
  const handleError = () => {
    setError(true);

    // If no fallback is provided, keep the loading state visible
    if (!fallbackSrc) {
      setIsLoading(true);
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
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={{
        ...(width && height ? { width, height } : {}),
        ...getAspectRatioStyle()
      }}
    >
      {/* Main image */}
      <Image
        src={finalSrc}
        alt={alt}
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : undefined}
        className={cn(
          fade !== false ? 'transition-opacity duration-300' : '',
          isLoading && fade !== false ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        {...props}
      />

      {/* Loading placeholder */}
      {isLoading && showPlaceholder && (
        <div
          className="absolute inset-0 bg-muted animate-pulse rounded-md"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}