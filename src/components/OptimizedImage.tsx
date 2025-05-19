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
import Image from "next/image";
import { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type ObjectFitType = "fill" | "contain" | "cover" | "none" | "scale-down";

interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "wide" | number;
  backgroundEffect?: "blur" | "pulse" | "none";
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  withBorder?: boolean | "light" | "dark";
  containerClassName?: string;
  fade?: boolean;
  objectFit?: ObjectFitType;
}

/**
 * Generates a simple color-based data URL for image placeholders
 */
function generatePlaceholderDataUrl(width = 100, height = 100): string {
  // Light gray placeholder that's easy on the eyes
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${width}" height="${height}" fill="#f1f1f1" />
     </svg>`
  ).toString('base64')}`;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallbackSrc = "/images/fallback-image.jpg",
  aspectRatio = "auto",
  backgroundEffect = "blur",
  rounded = false,
  withBorder = false,
  containerClassName,
  fade = true,
  className,
  placeholder = "blur",
  objectFit: customObjectFit,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  
  // Set a proper blurDataURL if not provided
  const imageProps = props.blurDataURL
    ? props
    : { ...props, blurDataURL: generatePlaceholderDataUrl() };

  // Create object-fit class based on aspectRatio
  const getAspectRatioClass = () => {
    if (typeof aspectRatio === "number") {
      // Custom aspect ratio
      return {
        aspectRatio: aspectRatio.toString(),
        objectFit: (customObjectFit || "cover") as ObjectFitType,
      };
    }

    switch (aspectRatio) {
      case "square":
        return {
          aspectRatio: "1/1",
          objectFit: (customObjectFit || "cover") as ObjectFitType,
        };
      case "video":
        return {
          aspectRatio: "16/9",
          objectFit: (customObjectFit || "cover") as ObjectFitType,
        };
      case "portrait":
        return {
          aspectRatio: "3/4",
          objectFit: (customObjectFit || "cover") as ObjectFitType,
        };
      case "wide":
        return {
          aspectRatio: "21/9",
          objectFit: (customObjectFit || "cover") as ObjectFitType,
        };
      default:
        return {
          aspectRatio: "auto",
          objectFit: (customObjectFit || "cover") as ObjectFitType,
        };
    }
  };
  
  // Get rounded corner classes
  const getRoundedClass = () => {
    if (!rounded) return "";
    if (rounded === true || rounded === "md") return "rounded-md";
    return `rounded-${rounded}`;
  };
  
  // Get border classes
  const getBorderClass = () => {
    if (!withBorder) return "";
    if (withBorder === "light") return "border border-gray-100";
    if (withBorder === "dark") return "border border-gray-800";
    return "border border-gray-200";
  };
  
  // Get background class
  const getBackgroundClass = () => {
    if (backgroundEffect === "none") return "";
    if (backgroundEffect === "pulse") return isLoading ? "animate-pulse bg-muted/50" : "";
    return isLoading ? "bg-muted/50" : "";
  };

  // Handle image loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Handle image error with retry logic
  const handleError = () => {
    if (retryCount < maxRetries) {
      // Retry loading the original image
      setRetryCount(prevCount => prevCount + 1);
    } else {
      // After max retries, use the fallback
      setHasError(true);
    }
  };

  // Combine all style properties
  const aspectRatioStyles = getAspectRatioClass();
  
  return (
    <div 
      className={cn(
        "overflow-hidden", 
        getRoundedClass(),
        getBorderClass(),
        getBackgroundClass(),
        containerClassName
      )}
      style={{ aspectRatio: aspectRatioStyles.aspectRatio }}
    >
      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          fade && isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        style={{
          objectFit: aspectRatioStyles.objectFit,
        }}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        placeholder={placeholder}
        {...imageProps}
      />
    </div>
  );
} 