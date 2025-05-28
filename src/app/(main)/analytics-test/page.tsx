import { Metadata } from 'next';
import { AnalyticsTestPage } from '@/components/analytics/AnalyticsTestPage';

export const metadata: Metadata = {
  title: 'Analytics Test - BrokerAnalysis',
  description: 'Test Google Analytics implementation with event tracking',
  robots: {
    index: false,
    follow: false
  }
};

export default function AnalyticsTest() {
  return <AnalyticsTestPage />;
}
