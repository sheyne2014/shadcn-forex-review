'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrokerLogoProps {
  broker: string | {
    name: string;
    id?: string;
    logo?: string;
    logo_url?: string | null;
  };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  rounded?: boolean;
  withBorder?: boolean;
  priority?: boolean;
}

/**
 * Enhanced BrokerLogo component with improved fallback handling
 * Now prioritizes SVG logos and provides robust fallback handling
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
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  // Extract broker name and id
  const brokerName = typeof broker === 'string' ? broker : broker.name;
  const brokerId = typeof broker === 'string' ? broker.toLowerCase().replace(/\s+/g, '-') :
    broker.id ? broker.id : broker.name.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    // Reset error state when broker changes
    setHasError(false);
    setFallbackAttempted(false);
    
    // Determine logo URL with priority order:
    // 1. Explicitly provided logo property
    // 2. Explicitly provided logo_url property
    // 3. SVG file in public/images/brokers/
    // 4. PNG file in public/images/brokers/
    let url;
    
    if (typeof broker !== 'string' && broker.logo) {
      // Use logo property if available (from BrokerData interface)
      url = broker.logo;
    } else if (typeof broker !== 'string' && broker.logo_url) {
      // Use logo_url property if available (from database)
      url = broker.logo_url;
    } else {
      // Check for SVG file first
      url = `/images/brokers/${brokerId}.svg`;
    }
    
    setLogoUrl(url);
  }, [broker, brokerId]);

  // Get dimensions based on size
  const dimensions = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
    xl: { width: 64, height: 64 }
  }[size];

  // Fallback logic for image loading errors
  const handleImageError = () => {
    if (!fallbackAttempted) {
      // If we're using SVG, try PNG
      if (logoUrl?.endsWith('.svg')) {
        setLogoUrl(`/images/brokers/${brokerId}.png`);
        setFallbackAttempted(true);
      } else if (logoUrl?.includes('images/brokers')) {
        // If we're already using a broker-specific image, try the generic fallback
        setLogoUrl('/images/brokers/generic-broker-logo.png');
        setFallbackAttempted(true);
      } else {
        // If all else fails, show initials
        setHasError(true);
      }
    } else {
      // If we've already tried a fallback, show initials
      setHasError(true);
    }
  };

  // Fallback to initials if image fails
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center bg-white dark:bg-gray-800',
        rounded && 'rounded-md',
        withBorder && 'border border-gray-200 dark:border-gray-700',
        size === 'lg' || size === 'xl' ? 'p-1' : '',
        className
      )}
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      {hasError ? (
        // Show initials as fallback with a nice background
        <div className={cn(
          "w-full h-full flex items-center justify-center rounded-sm bg-primary/10",
          "text-primary font-semibold"
        )}>
          {getInitials(brokerName)}
        </div>
      ) : logoUrl ? (
        // Load the image with error handling
        <Image
          src={logoUrl}
          alt={`${brokerName} logo`}
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain"
          onError={handleImageError}
          priority={priority}
          unoptimized={logoUrl.endsWith('.svg')} // Don't optimize SVGs
        />
      ) : (
        // Loading state or no logo URL
        <div className="text-xs font-semibold text-gray-400 animate-pulse">
          {getInitials(brokerName)}
        </div>
      )}
    </div>
  );
}
