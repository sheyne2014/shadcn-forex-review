"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

interface OptimizedBrokerImageProps {
  src?: string;
  alt?: string;
  brokerName: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  imageType?: "logo" | "screenshot" | "platform" | "chart";
  fallbackIcon?: boolean;
}

/**
 * Optimized image component for broker pages with proper alt text and fallbacks
 * Ensures all images have descriptive alt text for accessibility and SEO
 */
export function OptimizedBrokerImage({
  src,
  alt,
  brokerName,
  width = 200,
  height = 100,
  className,
  priority = false,
  imageType = "logo",
  fallbackIcon = true
}: OptimizedBrokerImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate descriptive alt text based on image type
  const generateAltText = () => {
    if (alt) return alt;
    
    switch (imageType) {
      case "logo":
        return `${brokerName} broker logo`;
      case "screenshot":
        return `${brokerName} trading platform screenshot`;
      case "platform":
        return `${brokerName} trading platform interface`;
      case "chart":
        return `${brokerName} trading charts and analysis tools`;
      default:
        return `${brokerName} broker image`;
    }
  };

  const altText = generateAltText();

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  // Handle image load success
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Fallback component when image fails to load
  const ImageFallback = () => (
    <div 
      className={cn(
        "flex items-center justify-center bg-muted border border-border rounded-md",
        className
      )}
      style={{ width, height }}
    >
      {fallbackIcon ? (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Building2 className="h-8 w-8" />
          <span className="text-xs font-medium text-center px-2">
            {brokerName}
          </span>
        </div>
      ) : (
        <span className="text-sm font-medium text-muted-foreground text-center px-2">
          {brokerName}
        </span>
      )}
    </div>
  );

  // Show fallback if no src or image error
  if (!src || imageError) {
    return <ImageFallback />;
  }

  return (
    <div className="relative">
      {/* Loading placeholder */}
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 bg-muted animate-pulse rounded-md",
            className
          )}
          style={{ width, height }}
        />
      )}
      
      <Image
        src={src}
        alt={altText}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "object-contain transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onError={handleImageError}
        onLoad={handleImageLoad}
        // Add loading attribute for better performance
        loading={priority ? "eager" : "lazy"}
        // Add sizes for responsive images
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

/**
 * Specialized component for broker logos with consistent sizing
 */
interface BrokerLogoProps {
  src?: string;
  brokerName: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

export function BrokerLogo({ 
  src, 
  brokerName, 
  size = "md", 
  className,
  priority = false 
}: BrokerLogoProps) {
  const sizeMap = {
    sm: { width: 80, height: 40 },
    md: { width: 120, height: 60 },
    lg: { width: 160, height: 80 },
    xl: { width: 200, height: 100 }
  };

  const dimensions = sizeMap[size];

  return (
    <OptimizedBrokerImage
      src={src}
      brokerName={brokerName}
      width={dimensions.width}
      height={dimensions.height}
      imageType="logo"
      priority={priority}
      className={cn("rounded-md", className)}
      fallbackIcon={true}
    />
  );
}

/**
 * Component for platform screenshots with proper alt text
 */
interface PlatformScreenshotProps {
  src?: string;
  brokerName: string;
  platformName?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function PlatformScreenshot({
  src,
  brokerName,
  platformName,
  className,
  width = 600,
  height = 400
}: PlatformScreenshotProps) {
  const altText = platformName 
    ? `${brokerName} ${platformName} trading platform screenshot`
    : `${brokerName} trading platform screenshot`;

  return (
    <OptimizedBrokerImage
      src={src}
      alt={altText}
      brokerName={brokerName}
      width={width}
      height={height}
      imageType="screenshot"
      className={cn("rounded-lg border border-border", className)}
      fallbackIcon={false}
    />
  );
}

/**
 * Utility function to validate and optimize image URLs
 */
export function optimizeImageUrl(url?: string, brokerName?: string): string | undefined {
  if (!url) return undefined;
  
  // Handle relative URLs
  if (url.startsWith('/')) {
    return url;
  }
  
  // Handle external URLs - add proxy or CDN if needed
  if (url.startsWith('http')) {
    return url;
  }
  
  // Handle broker-specific image paths
  if (brokerName && !url.includes('/')) {
    return `/images/brokers/${url}`;
  }
  
  return url;
}

/**
 * Hook to preload critical broker images
 */
export function usePreloadBrokerImages(images: string[]) {
  if (typeof window !== 'undefined') {
    images.forEach(src => {
      if (src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
    });
  }
}
