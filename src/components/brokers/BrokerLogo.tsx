'use client';

import { useState } from 'react';
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
 * SIMPLIFIED BrokerLogo component - directly uses provided URLs without complex fallbacks
 * This ensures our static broker data with correct paths is used reliably
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

  // Extract broker name and id
  const brokerName = typeof broker === 'string' ? broker : broker.name;
  const brokerId = typeof broker === 'string' ? broker.toLowerCase().replace(/\s+/g, '-') :
    broker.id ? broker.id : broker.name.toLowerCase().replace(/\s+/g, '-');

  // Get the logo URL - prioritize provided URL
  const providedLogoUrl = typeof broker !== 'string' ? broker.logo_url : null;
  const logoUrl = providedLogoUrl || `/images/brokers/${brokerId}.png`;

  // Get dimensions based on size
  const dimensions = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
    xl: { width: 64, height: 64 }
  }[size];

  // Debug logging for troubleshooting
  if (typeof window !== 'undefined' && brokerName && ['eToro', 'Plus500', 'Capital.com', 'XM', 'Coinbase'].includes(brokerName)) {
    console.log(`🔍 SIMPLIFIED BrokerLogo Debug for ${brokerName}:`, {
      brokerName,
      brokerId,
      providedLogoUrl,
      logoUrl,
      hasProvidedUrl: !!providedLogoUrl
    });
  }

  // Fallback to initials if image fails
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle error by showing initials
  const handleError = () => {
    if (typeof window !== 'undefined' && brokerName && ['eToro', 'Plus500', 'Capital.com', 'XM', 'Coinbase'].includes(brokerName)) {
      console.log(`❌ Failed to load logo for ${brokerName}: ${logoUrl}`);
    }
    setHasError(true);
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center bg-white dark:bg-gray-800',
        rounded && 'rounded-md',
        withBorder && 'border border-gray-200 dark:border-gray-700',
        className
      )}
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      {hasError ? (
        // Show initials as fallback
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">
          {getInitials(brokerName)}
        </div>
      ) : (
        // Load the image directly
        <Image
          src={logoUrl}
          alt={`${brokerName} logo`}
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain p-1"
          onError={handleError}
          priority={priority}
        />
      )}
    </div>
  );
}
