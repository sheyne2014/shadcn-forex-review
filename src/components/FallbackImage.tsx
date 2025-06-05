"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FallbackImageProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackText?: string;
  priority?: boolean;
  sizes?: string;
}

export function FallbackImage({
  src,
  alt,
  width = 48,
  height = 48,
  className,
  fallbackText,
  priority = false,
  sizes
}: FallbackImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate fallback text from alt text
  const generateFallbackText = (text: string) => {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const displayFallbackText = fallbackText || generateFallbackText(alt);

  // If no src provided or image failed to load, show fallback
  if (!src || imageError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-semibold rounded-lg border border-primary/20",
          className
        )}
        style={{ width, height }}
        title={alt}
      >
        <span className="text-xs">{displayFallbackText}</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)} style={{ width, height }}>
      {isLoading && (
        <div
          className="absolute inset-0 bg-muted animate-pulse rounded-lg"
          style={{ width, height }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-contain transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
        priority={priority}
        sizes={sizes}
        unoptimized={src.includes('clearbit.com') || src.includes('logo.clearbit.com')}
      />
    </div>
  );
}
