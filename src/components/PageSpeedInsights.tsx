"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Smartphone, 
  Monitor, 
  AlertTriangle, 
  CheckCircle,
  ExternalLink,
  RefreshCw,
  TrendingUp,
  Clock,
  Eye,
  MousePointer
} from 'lucide-react';

interface PageSpeedData {
  score: number;
  metrics: {
    lcp: { value: number; score: number };
    fid: { value: number; score: number };
    cls: { value: number; score: number };
    fcp: { value: number; score: number };
    si: { value: number; score: number };
    tbt: { value: number; score: number };
  };
  opportunities: Array<{
    title: string;
    description: string;
    savings: number;
    impact: 'high' | 'medium' | 'low';
  }>;
  diagnostics: Array<{
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
  }>;
}

interface PageSpeedInsightsProps {
  defaultUrl?: string;
  autoAnalyze?: boolean;
}

export function PageSpeedInsights({ defaultUrl, autoAnalyze = false }: PageSpeedInsightsProps) {
  const [url, setUrl] = useState(defaultUrl || (typeof window !== 'undefined' ? window.location.href : ''));
  const [mobileData, setMobileData] = useState<PageSpeedData | null>(null);
  const [desktopData, setDesktopData] = useState<PageSpeedData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'mobile' | 'desktop'>('mobile');
  const [error, setError] = useState<string | null>(null);

  const analyzePageSpeed = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    setError(null);

    try {
      // Note: In a real implementation, you would need a backend API to call PageSpeed Insights
      // This is a mock implementation showing the structure
      
      const mockAnalysis = (strategy: 'mobile' | 'desktop'): PageSpeedData => ({
        score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        metrics: {
          lcp: { value: 2.5 + Math.random() * 2, score: Math.floor(Math.random() * 40) + 60 },
          fid: { value: 100 + Math.random() * 200, score: Math.floor(Math.random() * 40) + 60 },
          cls: { value: Math.random() * 0.2, score: Math.floor(Math.random() * 40) + 60 },
          fcp: { value: 1.8 + Math.random() * 1.5, score: Math.floor(Math.random() * 40) + 60 },
          si: { value: 3.0 + Math.random() * 2, score: Math.floor(Math.random() * 40) + 60 },
          tbt: { value: 200 + Math.random() * 300, score: Math.floor(Math.random() * 40) + 60 },
        },
        opportunities: [
          {
            title: 'Optimize images',
            description: 'Properly size images to save cellular data and improve load time',
            savings: 1.2,
            impact: 'high'
          },
          {
            title: 'Eliminate render-blocking resources',
            description: 'Resources are blocking the first paint of your page',
            savings: 0.8,
            impact: 'medium'
          },
          {
            title: 'Minify CSS',
            description: 'Minifying CSS files can reduce network payload sizes',
            savings: 0.3,
            impact: 'low'
          }
        ],
        diagnostics: [
          {
            title: 'Avoid enormous network payloads',
            description: 'Large network payloads cost users real money and are highly correlated with long load times',
            impact: 'medium'
          },
          {
            title: 'Serve images in next-gen formats',
            description: 'Image formats like WebP and AVIF often provide better compression than PNG or JPEG',
            impact: 'medium'
          }
        ]
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setMobileData(mockAnalysis('mobile'));
      setDesktopData(mockAnalysis('desktop'));

    } catch (err) {
      setError('Failed to analyze page speed. Please try again.');
      console.error('PageSpeed analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 50) return 'secondary';
    return 'destructive';
  };

  const getMetricColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatMetricValue = (key: string, value: number) => {
    switch (key) {
      case 'lcp':
      case 'fcp':
      case 'si':
        return `${value.toFixed(1)}s`;
      case 'fid':
      case 'tbt':
        return `${Math.round(value)}ms`;
      case 'cls':
        return value.toFixed(3);
      default:
        return value.toString();
    }
  };

  const getMetricName = (key: string) => {
    const names: Record<string, string> = {
      lcp: 'Largest Contentful Paint',
      fid: 'First Input Delay',
      cls: 'Cumulative Layout Shift',
      fcp: 'First Contentful Paint',
      si: 'Speed Index',
      tbt: 'Total Blocking Time'
    };
    return names[key] || key.toUpperCase();
  };

  const currentData = activeTab === 'mobile' ? mobileData : desktopData;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          PageSpeed Insights
        </CardTitle>
        
        {/* URL Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter URL to analyze..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={analyzePageSpeed} disabled={isAnalyzing || !url}>
            {isAnalyzing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              'Analyze'
            )}
          </Button>
        </div>

        {/* Device Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('mobile')}
            className="flex items-center gap-2"
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </Button>
          <Button
            variant={activeTab === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('desktop')}
            className="flex items-center gap-2"
          >
            <Monitor className="h-4 w-4" />
            Desktop
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {currentData && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(currentData.score)}`}>
                {currentData.score}
              </div>
              <Badge variant={getScoreBadgeVariant(currentData.score)}>
                Performance Score
              </Badge>
            </div>

            {/* Core Web Vitals */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Core Web Vitals
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(currentData.metrics).slice(0, 3).map(([key, metric]) => (
                  <div key={key} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{getMetricName(key)}</span>
                      <div className={`w-3 h-3 rounded-full ${getMetricColor(metric.score)}`} />
                    </div>
                    <div className="text-lg font-bold">{formatMetricValue(key, metric.value)}</div>
                    <Progress value={metric.score} className="mt-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Metrics */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Additional Metrics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(currentData.metrics).slice(3).map(([key, metric]) => (
                  <div key={key} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{getMetricName(key)}</span>
                      <div className={`w-3 h-3 rounded-full ${getMetricColor(metric.score)}`} />
                    </div>
                    <div className="text-lg font-bold">{formatMetricValue(key, metric.value)}</div>
                    <Progress value={metric.score} className="mt-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Opportunities
              </h4>
              <div className="space-y-3">
                {currentData.opportunities.map((opportunity, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium">{opportunity.title}</div>
                        <div className="text-sm text-muted-foreground">{opportunity.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          -{opportunity.savings.toFixed(1)}s
                        </div>
                        <Badge variant={opportunity.impact === 'high' ? 'destructive' : opportunity.impact === 'medium' ? 'secondary' : 'outline'}>
                          {opportunity.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostics */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Diagnostics
              </h4>
              <div className="space-y-3">
                {currentData.diagnostics.map((diagnostic, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{diagnostic.title}</div>
                        <div className="text-sm text-muted-foreground">{diagnostic.description}</div>
                      </div>
                      <Badge variant={diagnostic.impact === 'high' ? 'destructive' : diagnostic.impact === 'medium' ? 'secondary' : 'outline'}>
                        {diagnostic.impact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* External Link */}
            <div className="pt-4 border-t">
              <Button variant="outline" asChild className="w-full">
                <a 
                  href={`https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Full Report on PageSpeed Insights
                </a>
              </Button>
            </div>
          </div>
        )}

        {!currentData && !isAnalyzing && (
          <div className="text-center py-8 text-muted-foreground">
            <Zap className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Enter a URL and click "Analyze" to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
