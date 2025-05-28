"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer, 
  ExternalLink, 
  HelpCircle,
  Download,
  RefreshCw
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics/google-analytics';

interface AnalyticsData {
  visitSiteClicks: number;
  quizCompletions: number;
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
  topBrokers: Array<{
    name: string;
    clicks: number;
    conversions: number;
  }>;
  quizMetrics: {
    started: number;
    completed: number;
    averageTime: number;
    completionRate: number;
  };
  recentEvents: Array<{
    timestamp: string;
    event: string;
    broker?: string;
    value?: number;
  }>;
}

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock data - In production, this would fetch from Google Analytics API
  const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      visitSiteClicks: 1247,
      quizCompletions: 89,
      pageViews: 5432,
      uniqueVisitors: 3210,
      conversionRate: 12.5,
      topBrokers: [
        { name: 'eToro', clicks: 342, conversions: 45 },
        { name: 'XM', clicks: 298, conversions: 38 },
        { name: 'IG', clicks: 267, conversions: 32 },
        { name: 'Plus500', clicks: 189, conversions: 24 },
        { name: 'Interactive Brokers', clicks: 151, conversions: 19 }
      ],
      quizMetrics: {
        started: 156,
        completed: 89,
        averageTime: 245,
        completionRate: 57.1
      },
      recentEvents: [
        { timestamp: '2024-01-15T10:30:00Z', event: 'visit_site', broker: 'eToro', value: 1 },
        { timestamp: '2024-01-15T10:25:00Z', event: 'quiz_completed', value: 1 },
        { timestamp: '2024-01-15T10:20:00Z', event: 'visit_site', broker: 'XM', value: 1 },
        { timestamp: '2024-01-15T10:15:00Z', event: 'broker_comparison', value: 1 },
        { timestamp: '2024-01-15T10:10:00Z', event: 'visit_site', broker: 'IG', value: 1 }
      ]
    };
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to load analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = async () => {
    trackEvent({
      action: 'analytics_refresh',
      category: 'admin_action',
      label: 'dashboard_refresh'
    });
    
    const data = await fetchAnalyticsData();
    setAnalyticsData(data);
    setLastUpdated(new Date());
  };

  const exportData = () => {
    trackEvent({
      action: 'analytics_export',
      category: 'admin_action',
      label: 'dashboard_export'
    });
    
    // In production, this would export actual analytics data
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading || !analyticsData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Visit Site Clicks</p>
                <p className="text-2xl font-bold">{analyticsData.visitSiteClicks.toLocaleString()}</p>
              </div>
              <ExternalLink className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% vs last week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quiz Completions</p>
                <p className="text-2xl font-bold">{analyticsData.quizCompletions}</p>
              </div>
              <HelpCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {analyticsData.quizMetrics.completionRate.toFixed(1)}% completion rate
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold">{analyticsData.pageViews.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {analyticsData.uniqueVisitors.toLocaleString()} unique visitors
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{analyticsData.conversionRate}%</p>
              </div>
              <MousePointer className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1% vs last month
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="brokers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="brokers">Top Brokers</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Analytics</TabsTrigger>
          <TabsTrigger value="events">Recent Events</TabsTrigger>
        </TabsList>

        <TabsContent value="brokers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Brokers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topBrokers.map((broker, index) => (
                  <div key={broker.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{broker.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {((broker.conversions / broker.clicks) * 100).toFixed(1)}% conversion rate
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{broker.clicks} clicks</p>
                      <p className="text-sm text-green-600">{broker.conversions} conversions</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Started</span>
                  <span className="font-medium">{analyticsData.quizMetrics.started}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span className="font-medium">{analyticsData.quizMetrics.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate</span>
                  <span className="font-medium">{analyticsData.quizMetrics.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Time</span>
                  <span className="font-medium">{Math.floor(analyticsData.quizMetrics.averageTime / 60)}m {analyticsData.quizMetrics.averageTime % 60}s</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.recentEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium capitalize">{event.event.replace('_', ' ')}</p>
                      {event.broker && (
                        <p className="text-sm text-muted-foreground">{event.broker}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
