"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Image as ImageIcon, 
  Smartphone, 
  Monitor, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  TrendingUp
} from 'lucide-react';

interface CoreWebVitalsData {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
  inp?: number;
}

interface PerformanceIssue {
  type: 'critical' | 'warning' | 'info';
  category: string;
  message: string;
  recommendation: string;
  impact: 'high' | 'medium' | 'low';
}

export function CoreWebVitalsOptimizer() {
  const [vitals, setVitals] = useState<CoreWebVitalsData | null>(null);
  const [issues, setIssues] = useState<PerformanceIssue[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState(0);

  const analyzePerformance = async () => {
    setIsAnalyzing(true);
    const performanceIssues: PerformanceIssue[] = [];

    try {
      // Analyze images
      const images = document.querySelectorAll('img');
      let unoptimizedImages = 0;
      let largeImages = 0;

      images.forEach((img) => {
        // Check for missing lazy loading
        if (!img.hasAttribute('loading') && !img.hasAttribute('data-priority')) {
          unoptimizedImages++;
        }

        // Check for large images
        if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
          largeImages++;
        }
      });

      if (unoptimizedImages > 0) {
        performanceIssues.push({
          type: 'warning',
          category: 'Images',
          message: `${unoptimizedImages} images without lazy loading`,
          recommendation: 'Add loading="lazy" to images below the fold',
          impact: 'medium'
        });
      }

      if (largeImages > 0) {
        performanceIssues.push({
          type: 'critical',
          category: 'Images',
          message: `${largeImages} oversized images detected`,
          recommendation: 'Optimize images to appropriate dimensions and use WebP format',
          impact: 'high'
        });
      }

      // Analyze render-blocking resources
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      const scripts = document.querySelectorAll('script[src]:not([async]):not([defer])');

      if (stylesheets.length > 3) {
        performanceIssues.push({
          type: 'warning',
          category: 'CSS',
          message: `${stylesheets.length} stylesheets detected`,
          recommendation: 'Consider inlining critical CSS and lazy loading non-critical styles',
          impact: 'medium'
        });
      }

      if (scripts.length > 0) {
        performanceIssues.push({
          type: 'critical',
          category: 'JavaScript',
          message: `${scripts.length} render-blocking scripts`,
          recommendation: 'Add async or defer attributes to non-critical scripts',
          impact: 'high'
        });
      }

      // Check for Core Web Vitals
      if ('web-vitals' in window || typeof window !== 'undefined') {
        try {
          const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
          
          const vitalsData: Partial<CoreWebVitalsData> = {};

          onLCP((metric) => {
            vitalsData.lcp = metric.value;
            if (metric.value > 2500) {
              performanceIssues.push({
                type: 'critical',
                category: 'LCP',
                message: `LCP is ${Math.round(metric.value)}ms (should be < 2500ms)`,
                recommendation: 'Optimize largest contentful paint by preloading critical images and reducing server response time',
                impact: 'high'
              });
            }
          });

          onCLS((metric) => {
            vitalsData.cls = metric.value;
            if (metric.value > 0.1) {
              performanceIssues.push({
                type: 'critical',
                category: 'CLS',
                message: `CLS is ${metric.value.toFixed(3)} (should be < 0.1)`,
                recommendation: 'Add explicit dimensions to images and avoid inserting content above existing content',
                impact: 'high'
              });
            }
          });

          onFCP((metric) => {
            vitalsData.fcp = metric.value;
            if (metric.value > 1800) {
              performanceIssues.push({
                type: 'warning',
                category: 'FCP',
                message: `FCP is ${Math.round(metric.value)}ms (should be < 1800ms)`,
                recommendation: 'Optimize critical rendering path and reduce render-blocking resources',
                impact: 'medium'
              });
            }
          });

          onTTFB((metric) => {
            vitalsData.ttfb = metric.value;
            if (metric.value > 800) {
              performanceIssues.push({
                type: 'warning',
                category: 'TTFB',
                message: `TTFB is ${Math.round(metric.value)}ms (should be < 800ms)`,
                recommendation: 'Optimize server response time and consider using a CDN',
                impact: 'medium'
              });
            }
          });

          onINP((metric) => {
            vitalsData.inp = metric.value;
            if (metric.value > 200) {
              performanceIssues.push({
                type: 'warning',
                category: 'INP',
                message: `INP is ${Math.round(metric.value)}ms (should be < 200ms)`,
                recommendation: 'Optimize JavaScript execution and reduce main thread blocking',
                impact: 'medium'
              });
            }
          });

          setVitals(vitalsData as CoreWebVitalsData);
        } catch (error) {
          console.warn('Web Vitals analysis failed:', error);
        }
      }

      // Check mobile responsiveness
      const viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        performanceIssues.push({
          type: 'critical',
          category: 'Mobile',
          message: 'Missing viewport meta tag',
          recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
          impact: 'high'
        });
      }

      // Check for HTTPS
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        performanceIssues.push({
          type: 'critical',
          category: 'Security',
          message: 'Site not served over HTTPS',
          recommendation: 'Enable HTTPS for better security and SEO',
          impact: 'high'
        });
      }

      setIssues(performanceIssues);

      // Calculate performance score
      const totalIssues = performanceIssues.length;
      const criticalIssues = performanceIssues.filter(issue => issue.type === 'critical').length;
      const warningIssues = performanceIssues.filter(issue => issue.type === 'warning').length;
      
      let calculatedScore = 100;
      calculatedScore -= (criticalIssues * 20);
      calculatedScore -= (warningIssues * 10);
      calculatedScore = Math.max(0, calculatedScore);
      
      setScore(calculatedScore);

    } catch (error) {
      console.error('Performance analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    // Auto-analyze on component mount
    const timer = setTimeout(analyzePerformance, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'destructive';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Core Web Vitals Optimizer
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={getScoreBadgeVariant(score)} className={getScoreColor(score)}>
              Score: {score}/100
            </Badge>
            <Button variant="outline" size="sm" onClick={analyzePerformance} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Core Web Vitals Display */}
        {vitals && (
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Core Web Vitals
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium">LCP</div>
                <div className={vitals.lcp > 2500 ? 'text-red-600' : vitals.lcp > 1800 ? 'text-yellow-600' : 'text-green-600'}>
                  {Math.round(vitals.lcp)}ms
                </div>
              </div>
              <div>
                <div className="font-medium">CLS</div>
                <div className={vitals.cls > 0.1 ? 'text-red-600' : vitals.cls > 0.05 ? 'text-yellow-600' : 'text-green-600'}>
                  {vitals.cls.toFixed(3)}
                </div>
              </div>
              <div>
                <div className="font-medium">FCP</div>
                <div className={vitals.fcp > 1800 ? 'text-red-600' : vitals.fcp > 1200 ? 'text-yellow-600' : 'text-green-600'}>
                  {Math.round(vitals.fcp)}ms
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Issues */}
        <div className="space-y-3">
          {issues.length === 0 && !isAnalyzing ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p>No performance issues detected!</p>
            </div>
          ) : (
            issues.map((issue, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                {getIssueIcon(issue.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {issue.category}
                    </Badge>
                    <Badge variant={issue.impact === 'high' ? 'destructive' : issue.impact === 'medium' ? 'secondary' : 'outline'} className="text-xs">
                      {issue.impact} impact
                    </Badge>
                  </div>
                  <div className="font-medium mb-1">{issue.message}</div>
                  <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-semibold mb-3">Quick Optimizations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="justify-start">
              <ImageIcon className="h-4 w-4 mr-2" />
              Optimize Images
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Smartphone className="h-4 w-4 mr-2" />
              Test Mobile Performance
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
