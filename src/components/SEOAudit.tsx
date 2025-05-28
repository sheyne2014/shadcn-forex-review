"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";

interface SEOIssue {
  type: 'error' | 'warning' | 'success';
  category: string;
  message: string;
  recommendation?: string;
}

interface SEOAuditProps {
  pageUrl?: string;
  pageTitle?: string;
  pageDescription?: string;
  showFullAudit?: boolean;
}

export function SEOAudit({ 
  pageUrl = typeof window !== 'undefined' ? window.location.href : '',
  pageTitle = typeof document !== 'undefined' ? document.title : '',
  pageDescription = '',
  showFullAudit = false 
}: SEOAuditProps) {
  const [issues, setIssues] = useState<SEOIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);

  const runSEOAudit = () => {
    setIsLoading(true);
    const auditIssues: SEOIssue[] = [];

    // Title checks
    if (!pageTitle) {
      auditIssues.push({
        type: 'error',
        category: 'Title',
        message: 'Missing page title',
        recommendation: 'Add a descriptive title tag (50-60 characters)'
      });
    } else if (pageTitle.length > 60) {
      auditIssues.push({
        type: 'warning',
        category: 'Title',
        message: `Title too long (${pageTitle.length} characters)`,
        recommendation: 'Keep title under 60 characters to prevent truncation'
      });
    } else if (pageTitle.length < 30) {
      auditIssues.push({
        type: 'warning',
        category: 'Title',
        message: `Title too short (${pageTitle.length} characters)`,
        recommendation: 'Expand title to 50-60 characters for better SEO'
      });
    } else {
      auditIssues.push({
        type: 'success',
        category: 'Title',
        message: `Title length optimal (${pageTitle.length} characters)`
      });
    }

    // Description checks
    if (!pageDescription) {
      auditIssues.push({
        type: 'error',
        category: 'Description',
        message: 'Missing meta description',
        recommendation: 'Add a compelling meta description (150-160 characters)'
      });
    } else if (pageDescription.length > 160) {
      auditIssues.push({
        type: 'warning',
        category: 'Description',
        message: `Description too long (${pageDescription.length} characters)`,
        recommendation: 'Keep description under 160 characters'
      });
    } else if (pageDescription.length < 120) {
      auditIssues.push({
        type: 'warning',
        category: 'Description',
        message: `Description too short (${pageDescription.length} characters)`,
        recommendation: 'Expand description to 150-160 characters'
      });
    } else {
      auditIssues.push({
        type: 'success',
        category: 'Description',
        message: `Description length optimal (${pageDescription.length} characters)`
      });
    }

    // URL structure checks
    if (pageUrl) {
      if (pageUrl.includes('?')) {
        auditIssues.push({
          type: 'warning',
          category: 'URL',
          message: 'URL contains query parameters',
          recommendation: 'Use clean URLs without query parameters when possible'
        });
      }
      
      if (pageUrl.length > 100) {
        auditIssues.push({
          type: 'warning',
          category: 'URL',
          message: 'URL is very long',
          recommendation: 'Keep URLs concise and descriptive'
        });
      }

      if (pageUrl.includes('https://')) {
        auditIssues.push({
          type: 'success',
          category: 'Security',
          message: 'HTTPS enabled'
        });
      } else {
        auditIssues.push({
          type: 'error',
          category: 'Security',
          message: 'HTTPS not enabled',
          recommendation: 'Enable HTTPS for better security and SEO'
        });
      }
    }

    // Check for structured data
    if (typeof document !== 'undefined') {
      const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
      if (structuredDataScripts.length > 0) {
        auditIssues.push({
          type: 'success',
          category: 'Structured Data',
          message: `${structuredDataScripts.length} structured data schema(s) found`
        });
      } else {
        auditIssues.push({
          type: 'warning',
          category: 'Structured Data',
          message: 'No structured data found',
          recommendation: 'Add JSON-LD structured data for better search visibility'
        });
      }

      // Check for Open Graph tags
      const ogTags = document.querySelectorAll('meta[property^="og:"]');
      if (ogTags.length >= 4) {
        auditIssues.push({
          type: 'success',
          category: 'Social Media',
          message: 'Open Graph tags present'
        });
      } else {
        auditIssues.push({
          type: 'warning',
          category: 'Social Media',
          message: 'Missing or incomplete Open Graph tags',
          recommendation: 'Add og:title, og:description, og:image, og:url tags'
        });
      }

      // Check for canonical tag
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        auditIssues.push({
          type: 'success',
          category: 'Canonical',
          message: 'Canonical URL specified'
        });
      } else {
        auditIssues.push({
          type: 'warning',
          category: 'Canonical',
          message: 'No canonical URL specified',
          recommendation: 'Add canonical link to prevent duplicate content issues'
        });
      }

      // Check for viewport meta tag
      const viewportTag = document.querySelector('meta[name="viewport"]');
      if (viewportTag) {
        auditIssues.push({
          type: 'success',
          category: 'Mobile',
          message: 'Viewport meta tag present'
        });
      } else {
        auditIssues.push({
          type: 'error',
          category: 'Mobile',
          message: 'Missing viewport meta tag',
          recommendation: 'Add viewport meta tag for mobile responsiveness'
        });
      }
    }

    setIssues(auditIssues);
    
    // Calculate score
    const totalChecks = auditIssues.length;
    const successCount = auditIssues.filter(issue => issue.type === 'success').length;
    const warningCount = auditIssues.filter(issue => issue.type === 'warning').length;
    const calculatedScore = Math.round(((successCount + (warningCount * 0.5)) / totalChecks) * 100);
    setScore(calculatedScore);
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (showFullAudit) {
      runSEOAudit();
    }
  }, [showFullAudit, pageTitle, pageDescription, pageUrl]);

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

  if (!showFullAudit) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            SEO Quick Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={runSEOAudit} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Run SEO Audit'
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            SEO Audit Results
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={getScoreBadgeVariant(score)} className={getScoreColor(score)}>
              Score: {score}/100
            </Badge>
            <Button variant="outline" size="sm" onClick={runSEOAudit} disabled={isLoading}>
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map((issue, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
              {issue.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />}
              {issue.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />}
              {issue.type === 'error' && <XCircle className="h-5 w-5 text-red-600 mt-0.5" />}
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {issue.category}
                  </Badge>
                  <span className="font-medium">{issue.message}</span>
                </div>
                {issue.recommendation && (
                  <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
