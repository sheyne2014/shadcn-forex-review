"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { initGA, trackPageView, GA_MEASUREMENT_ID } from '@/lib/analytics/google-analytics';

interface GoogleAnalyticsProviderProps {
  children: React.ReactNode;
}

export function GoogleAnalyticsProvider({ children }: GoogleAnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  // Don't render GA in development or if no measurement ID
  if (process.env.NODE_ENV === 'development' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return <>{children}</>;
  }

  return (
    <>
      {/* Google Analytics Scripts */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          initGA();
        }}
      />
      
      {/* Initialize GA with enhanced configuration */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              allow_google_signals: true,
              allow_ad_personalization_signals: true,
              cookie_flags: 'SameSite=None;Secure',
              custom_map: {
                'custom_parameter_1': 'broker_name',
                'custom_parameter_2': 'user_action',
                'custom_parameter_3': 'page_category'
              }
            });

            // Enhanced measurement events
            gtag('config', '${GA_MEASUREMENT_ID}', {
              enhanced_measurement: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true
              }
            });

            // Custom events for broker platform
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_category: 'broker_platform'
            });
          `
        }}
      />

      {children}
    </>
  );
}

// Hook for easy GA access in components
export function useGoogleAnalytics() {
  return {
    trackPageView,
    trackEvent: (eventName: string, parameters: Record<string, any>) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
      }
    },
    trackConversion: (conversionId: string, parameters: Record<string, any> = {}) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: conversionId,
          ...parameters
        });
      }
    }
  };
}
