"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, TrendingUp } from 'lucide-react';
import { trackVisitSite, trackBrokerReferral } from '@/lib/analytics/google-analytics';
import { cn } from '@/lib/utils';

interface VisitSiteButtonProps {
  brokerName: string;
  brokerUrl: string;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  trackingData?: {
    referralValue?: number;
    currency?: string;
    source?: string;
    campaign?: string;
  };
  children?: React.ReactNode;
}

export function VisitSiteButton({
  brokerName,
  brokerUrl,
  className,
  variant = 'default',
  size = 'default',
  showIcon = true,
  trackingData = {},
  children
}: VisitSiteButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleVisitSite = () => {
    // Prevent double-clicking
    if (isClicked) return;
    setIsClicked(true);

    // Get current page location for tracking
    const pageLocation = typeof window !== 'undefined' ? window.location.href : '';
    
    // Track the visit site event
    trackVisitSite(brokerName, brokerUrl, pageLocation);

    // Track referral value if provided
    if (trackingData.referralValue) {
      trackBrokerReferral(
        brokerName, 
        trackingData.referralValue, 
        trackingData.currency || 'USD'
      );
    }

    // Add UTM parameters for tracking
    const url = new URL(brokerUrl);
    url.searchParams.set('utm_source', 'brokeranalysis');
    url.searchParams.set('utm_medium', 'referral');
    url.searchParams.set('utm_campaign', trackingData.campaign || 'broker_review');
    url.searchParams.set('utm_content', `visit_site_${brokerName.toLowerCase().replace(/\s+/g, '_')}`);
    
    // Add custom tracking parameters
    if (trackingData.source) {
      url.searchParams.set('ref_source', trackingData.source);
    }
    url.searchParams.set('ref_broker', brokerName);
    url.searchParams.set('ref_timestamp', Date.now().toString());

    // Open in new tab
    window.open(url.toString(), '_blank', 'noopener,noreferrer');

    // Reset click state after a delay
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <Button
      onClick={handleVisitSite}
      variant={variant}
      size={size}
      className={cn(
        "transition-all duration-200",
        isClicked && "scale-95 opacity-80",
        className
      )}
      disabled={isClicked}
    >
      {children || (
        <>
          {isClicked ? (
            <>
              <TrendingUp className={cn("h-4 w-4", showIcon && "mr-2")} />
              Opening...
            </>
          ) : (
            <>
              {showIcon && <ExternalLink className="h-4 w-4 mr-2" />}
              Visit Site
            </>
          )}
        </>
      )}
    </Button>
  );
}

// Preset configurations for different contexts
export const VisitSiteButtonPresets = {
  heroSection: {
    variant: 'default' as const,
    size: 'lg' as const,
    className: "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl",
    trackingData: {
      source: 'hero_section',
      referralValue: 50
    }
  },
  
  brokerCard: {
    variant: 'outline' as const,
    size: 'default' as const,
    className: "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    trackingData: {
      source: 'broker_card',
      referralValue: 25
    }
  },
  
  comparisonTable: {
    variant: 'secondary' as const,
    size: 'sm' as const,
    trackingData: {
      source: 'comparison_table',
      referralValue: 30
    }
  },
  
  reviewPage: {
    variant: 'default' as const,
    size: 'lg' as const,
    className: "w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl",
    trackingData: {
      source: 'review_page',
      referralValue: 75,
      campaign: 'detailed_review'
    }
  },
  
  sidebar: {
    variant: 'outline' as const,
    size: 'sm' as const,
    className: "w-full",
    trackingData: {
      source: 'sidebar',
      referralValue: 20
    }
  }
} as const;
