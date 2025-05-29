"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Monitor, AlertTriangle } from "lucide-react";

interface Viewport {
  width: number;
  height: number;
  devicePixelRatio: number;
  isTouch: boolean;
}

interface ResponsivenessIssue {
  element: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
}

export function MobileResponsivenessOptimizer() {
  const [viewport, setViewport] = useState<Viewport>({
    width: 0,
    height: 0,
    devicePixelRatio: 1,
    isTouch: false
  });

  const [issues, setIssues] = useState<ResponsivenessIssue[]>([]);

  useEffect(() => {
    // Initialize viewport data
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        isTouch: 'ontouchstart' in window
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    // Check for common mobile responsiveness issues
    const checkResponsiveness = () => {
      const newIssues: ResponsivenessIssue[] = [];

      // Check viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        newIssues.push({
          element: 'Viewport Meta',
          issue: 'Missing viewport meta tag',
          severity: 'high'
        });
      }

      // Check touch targets
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          newIssues.push({
            element: el.tagName.toLowerCase(),
            issue: 'Touch target too small (should be at least 44x44px)',
            severity: 'medium'
          });
        }
      });

      // Check font sizes
      document.querySelectorAll('p, span, div').forEach((el) => {
        const fontSize = window.getComputedStyle(el).fontSize;
        if (parseInt(fontSize) < 16) {
          newIssues.push({
            element: el.tagName.toLowerCase(),
            issue: 'Font size too small for mobile (should be at least 16px)',
            severity: 'medium'
          });
        }
      });

      // Check horizontal scrolling
      const bodyWidth = document.body.offsetWidth;
      const windowWidth = window.innerWidth;
      if (bodyWidth > windowWidth) {
        newIssues.push({
          element: 'body',
          issue: 'Horizontal scrolling detected',
          severity: 'high'
        });
      }

      setIssues(newIssues);
    };

    // Run checks after a short delay to ensure content is loaded
    const timeout = setTimeout(checkResponsiveness, 1000);

    return () => {
      window.removeEventListener('resize', updateViewport);
      clearTimeout(timeout);
    };
  }, []);

  const getDeviceType = () => {
    if (viewport.width < 768) return 'Mobile';
    if (viewport.width < 1024) return 'Tablet';
    return 'Desktop';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {viewport.width < 768 ? (
            <Smartphone className="h-5 w-5" />
          ) : (
            <Monitor className="h-5 w-5" />
          )}
          Mobile Responsiveness Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Viewport Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-1">Device Type</p>
              <Badge variant="outline">{getDeviceType()}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Screen Size</p>
              <Badge variant="outline">{viewport.width}x{viewport.height}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Pixel Ratio</p>
              <Badge variant="outline">{viewport.devicePixelRatio}x</Badge>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Touch Support</p>
              <Badge variant={viewport.isTouch ? "default" : "secondary"}>
                {viewport.isTouch ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>

          {/* Responsiveness Issues */}
          {issues.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                Detected Issues
              </h4>
              <div className="space-y-2">
                {issues.map((issue, index) => (
                  <div key={index} className="text-sm border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{issue.element}</span>
                      <Badge variant={
                        issue.severity === 'high' ? "destructive" :
                        issue.severity === 'medium' ? "secondary" :
                        "default"
                      }>
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{issue.issue}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}