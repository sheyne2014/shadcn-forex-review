"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Eye,
  Heart,
  Share2,
  BarChart3,
  Activity,
  Bell,
  Star,
  ThumbsUp,
  UserPlus,
  Zap,
  Target,
  Info
} from "lucide-react";
import { Context7Content, Context7Heading3 } from "@/components/Context7Provider";
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroSocialFeaturesProps {
  broker: any;
}

// Define proper types for social features
interface SocialFeature {
  name: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  engagement?: Record<string, string | number>;
  transparency?: Record<string, string | number>;
  metrics?: Record<string, string | number>;
  accuracy?: Record<string, string | number>;
}

export function EtoroSocialFeatures({ broker }: EtoroSocialFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState("newsfeed");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      // Safely track event
      if (typeof trackEvent === 'function') {
        trackEvent({
          action: 'view_social_features',
          category: 'social_trading',
          label: 'etoro_social_features'
        });
      }
      setIsLoaded(true);
    } catch (error) {
      console.error("Error tracking event:", error);
      setIsLoaded(true);
    }
  }, []);

  // If component isn't loaded yet, show a simple message
  if (!isLoaded) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Loading Social Features...</h3>
      </div>
    );
  }

  // Simple fallback component for debugging
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
            <Users className="h-8 w-8 text-green-600" />
          </div>
          <Context7Heading3>Social Features & Community Analysis</Context7Heading3>
        </div>
        <Context7Content>
          Comprehensive analysis of eToro's social trading features, community interaction quality, 
          and the value proposition of social elements in trading.
        </Context7Content>
      </div>

      <Card className="border-2 border-green-200 dark:border-green-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>eToro Social Features</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Context7Content>
            Social trading features are currently unavailable. We're working to resolve this issue.
          </Context7Content>
        </CardContent>
      </Card>
    </div>
  );
}
