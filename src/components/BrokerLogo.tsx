"use client";

import { FallbackImage } from './FallbackImage';
import { cn } from '@/lib/utils';

interface BrokerLogoProps {
  brokerName: string;
  logoUrl?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  priority?: boolean;
}

const sizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  xl: { width: 96, height: 96 }
};

export function BrokerLogo({
  brokerName,
  logoUrl,
  size = 'md',
  className,
  priority = false
}: BrokerLogoProps) {
  const { width, height } = sizeMap[size];

  // Generate fallback logo URL based on broker name
  const generateFallbackLogoUrl = (name: string) => {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    
    // Try multiple fallback sources
    const fallbackSources = [
      `/images/brokers/${cleanName}.png`,
      `/images/brokers/${cleanName}.svg`,
      `/images/brokers/${cleanName}.jpg`,
      `/broker-logos-simple/${cleanName}_existing.png`,
      `/broker-logos-simple/${cleanName}_clearbit.png`,
      `https://logo.clearbit.com/${cleanName}.com`,
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${width}&background=4F46E5&color=ffffff&format=png`
    ];
    
    return fallbackSources;
  };

  // Use provided logo URL or try fallback sources
  let finalLogoUrl = logoUrl;
  
  if (!finalLogoUrl) {
    const fallbackUrls = generateFallbackLogoUrl(brokerName);
    finalLogoUrl = fallbackUrls[0]; // Start with the first fallback
  }

  return (
    <FallbackImage
      src={finalLogoUrl}
      alt={`${brokerName} logo`}
      width={width}
      height={height}
      className={cn("rounded-lg", className)}
      fallbackText={brokerName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('')}
      priority={priority}
      sizes={`${width}px`}
    />
  );
}
