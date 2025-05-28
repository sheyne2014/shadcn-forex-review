"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VisitSiteButton, VisitSiteButtonPresets } from '@/components/analytics/VisitSiteButton';
import { BrokerFinderQuizWithAnalytics } from '@/components/quiz/BrokerFinderQuizWithAnalytics';
import { 
  trackEvent, 
  trackBrokerComparison, 
  trackSearch, 
  trackNewsletterSignup,
  trackDownload,
  trackSocialShare 
} from '@/lib/analytics/google-analytics';
import { 
  TestTube, 
  MousePointer, 
  HelpCircle, 
  Search, 
  Mail, 
  Download, 
  Share2,
  BarChart3,
  CheckCircle
} from 'lucide-react';

export function AnalyticsTestPage() {
  const [eventLog, setEventLog] = useState<string[]>([]);

  const logEvent = (eventName: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog(prev => [`${timestamp}: ${eventName}`, ...prev.slice(0, 9)]);
  };

  const testCustomEvent = () => {
    trackEvent({
      action: 'test_button_click',
      category: 'testing',
      label: 'analytics_test_page',
      value: 1,
      custom_parameters: {
        test_type: 'manual_trigger',
        page_location: window.location.href
      }
    });
    logEvent('Custom Event Tracked');
  };

  const testBrokerComparison = () => {
    trackBrokerComparison('eToro', 'XM', 'side_by_side');
    logEvent('Broker Comparison Tracked');
  };

  const testSearch = () => {
    trackSearch('best forex brokers', 'site_search', 25);
    logEvent('Search Event Tracked');
  };

  const testNewsletterSignup = () => {
    trackNewsletterSignup('analytics_test_page');
    logEvent('Newsletter Signup Tracked');
  };

  const testDownload = () => {
    trackDownload('broker_guide.pdf', 'pdf', 'analytics_test_page');
    logEvent('Download Event Tracked');
  };

  const testSocialShare = () => {
    trackSocialShare('twitter', 'broker_review', 'eToro Review 2024');
    logEvent('Social Share Tracked');
  };

  const mockBrokers = [
    {
      name: 'eToro',
      url: 'https://etoro.com',
      preset: VisitSiteButtonPresets.heroSection
    },
    {
      name: 'XM',
      url: 'https://xm.com',
      preset: VisitSiteButtonPresets.brokerCard
    },
    {
      name: 'IG',
      url: 'https://ig.com',
      preset: VisitSiteButtonPresets.comparisonTable
    },
    {
      name: 'Plus500',
      url: 'https://plus500.com',
      preset: VisitSiteButtonPresets.reviewPage
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <TestTube className="h-8 w-8" />
          Google Analytics Test Page
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          This page tests all Google Analytics event tracking implementations. 
          Open your browser's developer tools and check the Network tab for gtag events, 
          or use Google Analytics DebugView to see events in real-time.
        </p>
        <Badge variant="outline" className="text-sm">
          <CheckCircle className="h-4 w-4 mr-1" />
          Analytics Provider Active
        </Badge>
      </div>

      {/* Event Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Recent Events Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {eventLog.length > 0 ? (
              eventLog.map((event, index) => (
                <div key={index} className="text-sm p-2 bg-muted rounded font-mono">
                  {event}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No events tracked yet. Click the buttons below to test analytics.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Visit Site Button Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="h-5 w-5" />
            Visit Site Button Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockBrokers.map((broker) => (
              <div key={broker.name} className="space-y-2">
                <h4 className="font-medium text-sm">{broker.name}</h4>
                <VisitSiteButton
                  brokerName={broker.name}
                  brokerUrl={broker.url}
                  {...broker.preset}
                  trackingData={{
                    ...broker.preset.trackingData,
                    source: 'analytics_test_page'
                  }}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Each button tracks visit_site events with different configurations and referral values.
          </p>
        </CardContent>
      </Card>

      {/* Quiz Analytics Test */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Quiz Analytics Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BrokerFinderQuizWithAnalytics
            onComplete={(results) => {
              logEvent(`Quiz Completed - ${results.recommendedBrokers.length} brokers recommended`);
            }}
          />
          <p className="text-xs text-muted-foreground mt-4">
            This quiz tracks start, step, completion, and abandonment events with detailed analytics.
          </p>
        </CardContent>
      </Card>

      {/* Manual Event Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Event Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button onClick={testCustomEvent} variant="outline" className="flex flex-col h-auto p-4">
              <TestTube className="h-6 w-6 mb-2" />
              <span className="text-xs">Custom Event</span>
            </Button>
            
            <Button onClick={testBrokerComparison} variant="outline" className="flex flex-col h-auto p-4">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span className="text-xs">Comparison</span>
            </Button>
            
            <Button onClick={testSearch} variant="outline" className="flex flex-col h-auto p-4">
              <Search className="h-6 w-6 mb-2" />
              <span className="text-xs">Search</span>
            </Button>
            
            <Button onClick={testNewsletterSignup} variant="outline" className="flex flex-col h-auto p-4">
              <Mail className="h-6 w-6 mb-2" />
              <span className="text-xs">Newsletter</span>
            </Button>
            
            <Button onClick={testDownload} variant="outline" className="flex flex-col h-auto p-4">
              <Download className="h-6 w-6 mb-2" />
              <span className="text-xs">Download</span>
            </Button>
            
            <Button onClick={testSocialShare} variant="outline" className="flex flex-col h-auto p-4">
              <Share2 className="h-6 w-6 mb-2" />
              <span className="text-xs">Social Share</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Debug Information */}
      <Card>
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Environment</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>Node ENV: {process.env.NODE_ENV}</li>
                <li>GA ID: {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'Not set'}</li>
                <li>Analytics: {typeof window !== 'undefined' && window.gtag ? 'Loaded' : 'Not loaded'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">How to Verify</h4>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• Open browser DevTools → Network tab</li>
                <li>• Filter by "google-analytics" or "gtag"</li>
                <li>• Click buttons to see network requests</li>
                <li>• Use GA4 DebugView for real-time events</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
