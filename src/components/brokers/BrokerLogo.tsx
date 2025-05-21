'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrokerLogoProps {
  broker: string | {
    name: string;
    id?: string;
    logo_url?: string | null;
  };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  rounded?: boolean;
  withBorder?: boolean;
  priority?: boolean;
}

/**
 * A standardized component for displaying broker logos with proper fallbacks
 * 
 * @param broker - Either a broker string ID or a broker object with name and optional logo_url
 * @param size - Size of the logo: sm (24px), md (32px), lg (48px), xl (64px)
 * @param className - Additional CSS classes
 * @param rounded - Whether to use rounded corners
 * @param withBorder - Whether to add a border
 * @param priority - Whether to prioritize loading (for important logos above the fold)
 */
export function BrokerLogo({ 
  broker,
  size = 'md', 
  className,
  rounded = false,
  withBorder = false,
  priority = false
}: BrokerLogoProps) {
  const [hasError, setHasError] = useState(false);
  const [loadingFirstSource, setLoadingFirstSource] = useState(true);
  
  // Extract broker name and id
  const brokerName = typeof broker === 'string' ? broker : broker.name;
  const brokerId = typeof broker === 'string' ? broker.toLowerCase().replace(/\s+/g, '-') : 
    broker.id ? broker.id : broker.name.toLowerCase().replace(/\s+/g, '-');
  
  // Get the logo URL if provided directly
  const providedLogoUrl = typeof broker !== 'string' ? broker.logo_url : null;
  
  // Get dimensions based on size
  const dimensions = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
    xl: { width: 64, height: 64 }
  }[size];

  // Get container dimensions (slightly larger to account for padding)
  const containerDimensions = {
    sm: { width: 28, height: 28 },
    md: { width: 36, height: 36 },
    lg: { width: 56, height: 56 },
    xl: { width: 72, height: 72 }
  }[size];

  // Try our sources in this order:
  // 1. Explicitly provided logo_url
  // 2. Our optimized local broker logos
  // 3. Clearbit API as fallback
  // 4. Initials as ultimate fallback
  
  // Format broker ID for domain lookup
  const brokerId_clean = brokerId.replace(/-/g, '').replace(/\.com$/i, '');
  
  // Generate the sources in priority order
  const logoSources = [
    providedLogoUrl,
    `/images/brokers/${brokerId}.png`,
    `https://logo.clearbit.com/${brokerId_clean}.com`
  ].filter(Boolean) as string[];
  
  // Track current source index
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const currentSource = logoSources[currentSourceIndex];

  // Fallback to initials if all sources fail
  const initials = brokerName
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Handle error by trying the next source
  const handleError = () => {
    if (currentSourceIndex < logoSources.length - 1) {
      setCurrentSourceIndex(prevIndex => prevIndex + 1);
    } else {
      setHasError(true);
    }
  };

  // When source changes, reset loading state
  useEffect(() => {
    setLoadingFirstSource(true);
  }, [currentSource]);

  return (
    <div 
      className={cn(
        "flex items-center justify-center bg-white dark:bg-gray-800 relative",
        withBorder && "border", 
        rounded && "rounded-md",
        className
      )}
      style={{ 
        width: containerDimensions.width, 
        height: containerDimensions.height,
      }}
    >
      {hasError ? (
        // Show initials as fallback
        <div className="w-full h-full flex items-center justify-center text-primary font-medium">
          {initials}
        </div>
      ) : (
        // Try loading the image
        <Image
          src={currentSource}
          alt={`${brokerName} logo`}
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain p-1"
          onLoad={() => setLoadingFirstSource(false)}
          onError={handleError}
          priority={priority}
        />
      )}

      {/* Loading skeleton */}
      {loadingFirstSource && !hasError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 animate-pulse rounded-md"></div>
      )}
    </div>
  );
} 