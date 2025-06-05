"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PerformanceMetrics {
  pageLoadTime: number;
  databaseQueries: number;
  imageErrors: number;
  jsErrors: number;
  memoryUsage?: number;
  connectionStatus: 'connected' | 'disconnected' | 'slow';
}

export function PerformanceDebugger() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: 0,
    databaseQueries: 0,
    imageErrors: 0,
    jsErrors: 0,
    connectionStatus: 'connected'
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    // Track page load time
    const startTime = performance.now();
    
    const updateMetrics = () => {
      const loadTime = performance.now() - startTime;
      setMetrics(prev => ({
        ...prev,
        pageLoadTime: Math.round(loadTime)
      }));
    };

    // Track when page is fully loaded
    if (document.readyState === 'complete') {
      updateMetrics();
    } else {
      window.addEventListener('load', updateMetrics);
    }

    // Track JavaScript errors
    const errorHandler = (event: ErrorEvent) => {
      setMetrics(prev => ({
        ...prev,
        jsErrors: prev.jsErrors + 1
      }));
      console.warn('JS Error tracked:', event.error);
    };

    // Track image errors
    const imageErrorHandler = (event: Event) => {
      if (event.target instanceof HTMLImageElement) {
        setMetrics(prev => ({
          ...prev,
          imageErrors: prev.imageErrors + 1
        }));
        console.warn('Image error tracked:', event.target.src);
      }
    };

    // Track database query performance
    const originalFetch = window.fetch;
    let queryCount = 0;
    
    window.fetch = async (...args) => {
      const url = args[0]?.toString() || '';
      if (url.includes('supabase') || url.includes('/api/')) {
        queryCount++;
        setMetrics(prev => ({
          ...prev,
          databaseQueries: queryCount
        }));
      }
      return originalFetch(...args);
    };

    // Monitor memory usage if available
    if ('memory' in performance) {
      const updateMemory = () => {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024)
        }));
      };
      
      const memoryInterval = setInterval(updateMemory, 5000);
      
      return () => {
        clearInterval(memoryInterval);
        window.removeEventListener('load', updateMetrics);
        window.removeEventListener('error', errorHandler);
        document.removeEventListener('error', imageErrorHandler, true);
        window.fetch = originalFetch;
      };
    }

    window.addEventListener('error', errorHandler);
    document.addEventListener('error', imageErrorHandler, true);

    return () => {
      window.removeEventListener('load', updateMetrics);
      window.removeEventListener('error', errorHandler);
      document.removeEventListener('error', imageErrorHandler, true);
      window.fetch = originalFetch;
    };
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {/* Toggle button */}
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white"
        size="sm"
      >
        Debug
      </Button>

      {/* Debug panel */}
      {isVisible && (
        <Card className="fixed bottom-16 right-4 z-50 w-80 bg-background/95 backdrop-blur-sm border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              Performance Debug
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Page Load:</span>
              <Badge variant={metrics.pageLoadTime > 3000 ? "destructive" : "secondary"}>
                {metrics.pageLoadTime}ms
              </Badge>
            </div>
            
            <div className="flex justify-between">
              <span>DB Queries:</span>
              <Badge variant={metrics.databaseQueries > 10 ? "destructive" : "secondary"}>
                {metrics.databaseQueries}
              </Badge>
            </div>
            
            <div className="flex justify-between">
              <span>Image Errors:</span>
              <Badge variant={metrics.imageErrors > 0 ? "destructive" : "secondary"}>
                {metrics.imageErrors}
              </Badge>
            </div>
            
            <div className="flex justify-between">
              <span>JS Errors:</span>
              <Badge variant={metrics.jsErrors > 0 ? "destructive" : "secondary"}>
                {metrics.jsErrors}
              </Badge>
            </div>
            
            {metrics.memoryUsage && (
              <div className="flex justify-between">
                <span>Memory:</span>
                <Badge variant={metrics.memoryUsage > 100 ? "destructive" : "secondary"}>
                  {metrics.memoryUsage}MB
                </Badge>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Connection:</span>
              <Badge variant={
                metrics.connectionStatus === 'connected' ? "secondary" :
                metrics.connectionStatus === 'slow' ? "outline" : "destructive"
              }>
                {metrics.connectionStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
