"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CoreWebVitalsOptimizer } from '@/components/CoreWebVitalsOptimizer';
import { PageSpeedInsights } from '@/components/PageSpeedInsights';
import { MobileResponsivenessOptimizer } from '@/components/MobileResponsivenessOptimizer';
import { SEOAudit } from '@/components/SEOAudit';
import { 
  Zap, 
  Smartphone, 
  Search, 
  TrendingUp,
  Monitor,
  Globe,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function PerformanceDashboard() {
  const [overallScore, setOverallScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runFullAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate comprehensive analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setOverallScore(Math.floor(Math.random() * 30) + 70); // Random score 70-100
    setIsAnalyzing(false);
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Performance Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your website's performance, SEO, and user experience
            </p>
          </div>
          <div className="flex items-center gap-4">
            {overallScore > 0 && (
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}/100
                </div>
                <Badge variant={getScoreBadgeVariant(overallScore)} className="text-xs">
                  Overall Score
                </Badge>
              </div>
            )}
            <Button onClick={runFullAnalysis} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run Full Analysis
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">Core Web Vitals</div>
                  <div className="text-sm text-muted-foreground">Performance metrics</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">Mobile Ready</div>
                  <div className="text-sm text-muted-foreground">Responsive design</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">SEO Optimized</div>
                  <div className="text-sm text-muted-foreground">Search visibility</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">Global CDN</div>
                  <div className="text-sm text-muted-foreground">Fast worldwide</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="core-vitals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="core-vitals" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Core Web Vitals
          </TabsTrigger>
          <TabsTrigger value="pagespeed" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            PageSpeed
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="core-vitals">
          <CoreWebVitalsOptimizer />
        </TabsContent>

        <TabsContent value="pagespeed">
          <PageSpeedInsights autoAnalyze={true} />
        </TabsContent>

        <TabsContent value="mobile">
          <MobileResponsivenessOptimizer />
        </TabsContent>

        <TabsContent value="seo">
          <SEOAudit showFullAudit={true} />
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Performance Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                High Priority
              </h4>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Optimize Images</div>
                  <div className="text-sm text-muted-foreground">
                    Implement WebP format and lazy loading for better LCP
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Minify JavaScript</div>
                  <div className="text-sm text-muted-foreground">
                    Reduce bundle size and eliminate unused code
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Enable Compression</div>
                  <div className="text-sm text-muted-foreground">
                    Use Gzip/Brotli compression for faster loading
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Medium Priority
              </h4>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Implement Caching</div>
                  <div className="text-sm text-muted-foreground">
                    Add browser and CDN caching strategies
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Optimize Fonts</div>
                  <div className="text-sm text-muted-foreground">
                    Use font-display: swap and preload critical fonts
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Code Splitting</div>
                  <div className="text-sm text-muted-foreground">
                    Implement dynamic imports for better performance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guide */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h4>Next Steps for Optimization:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Run PageSpeed Insights analysis to identify specific issues</li>
              <li>Implement image optimization with WebP format and lazy loading</li>
              <li>Verify mobile responsiveness across different devices</li>
              <li>Check SEO elements including meta tags and structured data</li>
              <li>Submit updated sitemap to Google Search Console</li>
              <li>Monitor Core Web Vitals in Google Search Console</li>
              <li>Set up performance monitoring and alerts</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
