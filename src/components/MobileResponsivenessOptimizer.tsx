"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  RefreshCw,
  Eye,
  Touch,
  Zap
} from 'lucide-react';

interface ResponsivenessIssue {
  type: 'critical' | 'warning' | 'info';
  category: string;
  message: string;
  recommendation: string;
  element?: string;
}

interface ViewportTest {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
  passed: boolean;
  issues: string[];
}

export function MobileResponsivenessOptimizer() {
  const [issues, setIssues] = useState<ResponsivenessIssue[]>([]);
  const [viewportTests, setViewportTests] = useState<ViewportTest[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState(0);
  const [currentViewport, setCurrentViewport] = useState('desktop');

  const viewports = [
    { name: 'Mobile Portrait', width: 375, height: 667, icon: <Smartphone className="h-4 w-4" /> },
    { name: 'Mobile Landscape', width: 667, height: 375, icon: <Smartphone className="h-4 w-4 rotate-90" /> },
    { name: 'Tablet Portrait', width: 768, height: 1024, icon: <Tablet className="h-4 w-4" /> },
    { name: 'Tablet Landscape', width: 1024, height: 768, icon: <Tablet className="h-4 w-4 rotate-90" /> },
    { name: 'Desktop', width: 1920, height: 1080, icon: <Monitor className="h-4 w-4" /> },
  ];

  const analyzeResponsiveness = async () => {
    setIsAnalyzing(true);
    const responsiveIssues: ResponsivenessIssue[] = [];
    const testResults: ViewportTest[] = [];

    try {
      // Check viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        responsiveIssues.push({
          type: 'critical',
          category: 'Viewport',
          message: 'Missing viewport meta tag',
          recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the head',
        });
      } else {
        const content = viewportMeta.getAttribute('content');
        if (!content?.includes('width=device-width')) {
          responsiveIssues.push({
            type: 'warning',
            category: 'Viewport',
            message: 'Viewport meta tag missing width=device-width',
            recommendation: 'Update viewport meta tag to include width=device-width',
          });
        }
      }

      // Check for horizontal scrolling
      if (document.body.scrollWidth > window.innerWidth) {
        responsiveIssues.push({
          type: 'critical',
          category: 'Layout',
          message: 'Horizontal scrolling detected',
          recommendation: 'Fix elements that extend beyond viewport width',
        });
      }

      // Check for fixed widths
      const elementsWithFixedWidth = document.querySelectorAll('[style*="width:"][style*="px"]');
      if (elementsWithFixedWidth.length > 0) {
        responsiveIssues.push({
          type: 'warning',
          category: 'Layout',
          message: `${elementsWithFixedWidth.length} elements with fixed pixel widths`,
          recommendation: 'Use relative units (%, rem, em) instead of fixed pixel widths',
        });
      }

      // Check touch targets
      const buttons = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
      let smallTouchTargets = 0;
      
      buttons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          smallTouchTargets++;
        }
      });

      if (smallTouchTargets > 0) {
        responsiveIssues.push({
          type: 'warning',
          category: 'Touch Targets',
          message: `${smallTouchTargets} touch targets smaller than 44px`,
          recommendation: 'Ensure touch targets are at least 44x44px for better mobile usability',
        });
      }

      // Check font sizes
      const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
      let smallTextElements = 0;

      textElements.forEach((element) => {
        const computedStyle = window.getComputedStyle(element);
        const fontSize = parseFloat(computedStyle.fontSize);
        if (fontSize < 16) {
          smallTextElements++;
        }
      });

      if (smallTextElements > textElements.length * 0.3) {
        responsiveIssues.push({
          type: 'warning',
          category: 'Typography',
          message: 'Many text elements have small font sizes',
          recommendation: 'Use minimum 16px font size for body text on mobile devices',
        });
      }

      // Test different viewports
      for (const viewport of viewports) {
        const issues: string[] = [];
        let passed = true;

        // Simulate viewport (this is a simplified test)
        if (viewport.width < 768) {
          // Mobile checks
          if (document.querySelector('.hidden-mobile')) {
            issues.push('Important content hidden on mobile');
            passed = false;
          }
          
          // Check for mobile navigation
          const mobileNav = document.querySelector('[data-mobile-nav], .mobile-menu, .hamburger');
          if (!mobileNav) {
            issues.push('No mobile navigation detected');
            passed = false;
          }
        }

        testResults.push({
          name: viewport.name,
          width: viewport.width,
          height: viewport.height,
          icon: viewport.icon,
          passed,
          issues,
        });
      }

      // Check for responsive images
      const images = document.querySelectorAll('img');
      let unresponsiveImages = 0;

      images.forEach((img) => {
        if (!img.hasAttribute('sizes') && !img.style.maxWidth && !img.style.width?.includes('%')) {
          unresponsiveImages++;
        }
      });

      if (unresponsiveImages > 0) {
        responsiveIssues.push({
          type: 'warning',
          category: 'Images',
          message: `${unresponsiveImages} images may not be responsive`,
          recommendation: 'Add sizes attribute or use CSS max-width: 100% for responsive images',
        });
      }

      // Check for CSS Grid/Flexbox usage
      const hasModernLayout = document.querySelector('[style*="display: grid"], [style*="display: flex"], .grid, .flex');
      if (!hasModernLayout) {
        responsiveIssues.push({
          type: 'info',
          category: 'Layout',
          message: 'Consider using CSS Grid or Flexbox for better responsive layouts',
          recommendation: 'Implement modern CSS layout methods for improved responsiveness',
        });
      }

      setIssues(responsiveIssues);
      setViewportTests(testResults);

      // Calculate score
      const totalChecks = responsiveIssues.length + testResults.length;
      const passedChecks = testResults.filter(test => test.passed).length;
      const criticalIssues = responsiveIssues.filter(issue => issue.type === 'critical').length;
      const warningIssues = responsiveIssues.filter(issue => issue.type === 'warning').length;

      let calculatedScore = 100;
      calculatedScore -= (criticalIssues * 25);
      calculatedScore -= (warningIssues * 10);
      calculatedScore += (passedChecks * 5);
      calculatedScore = Math.max(0, Math.min(100, calculatedScore));

      setScore(calculatedScore);

    } catch (error) {
      console.error('Responsiveness analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    // Auto-analyze on component mount
    const timer = setTimeout(analyzeResponsiveness, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
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
            <Smartphone className="h-5 w-5 text-primary" />
            Mobile Responsiveness Optimizer
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={getScoreBadgeVariant(score)} className={getScoreColor(score)}>
              Score: {score}/100
            </Badge>
            <Button variant="outline" size="sm" onClick={analyzeResponsiveness} disabled={isAnalyzing}>
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
        {/* Viewport Tests */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Viewport Compatibility
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {viewportTests.map((test, index) => (
              <div key={index} className={`p-3 rounded-lg border ${test.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {test.icon}
                  <span className="font-medium text-sm">{test.name}</span>
                  {test.passed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {test.width} × {test.height}px
                </div>
                {test.issues.length > 0 && (
                  <div className="mt-2 text-xs text-red-600">
                    {test.issues.map((issue, i) => (
                      <div key={i}>• {issue}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Responsiveness Issues */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Touch className="h-4 w-4" />
            Responsiveness Issues
          </h4>
          {issues.length === 0 && !isAnalyzing ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p>No responsiveness issues detected!</p>
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
              <Smartphone className="h-4 w-4 mr-2" />
              Test Mobile Layout
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Zap className="h-4 w-4 mr-2" />
              Optimize Touch Targets
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
