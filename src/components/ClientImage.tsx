'use client';

import { useState } from 'react';
import { OptimizedImage } from './OptimizedImage';

interface ClientImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "wide" | number;
}

export function ClientImage({ 
  src, 
  alt, 
  fallbackSrc = "/images/fallback-image.svg", 
  className,
  width = 800,
  height = 600,
  aspectRatio = "auto"
}: ClientImageProps) {
  // Let the OptimizedImage component handle all the image loading logic
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fallbackSrc={fallbackSrc}
      className={className}
      width={width}
      height={height}
      aspectRatio={aspectRatio}
      fade={true}
      priority={false}
    />
  );
} 