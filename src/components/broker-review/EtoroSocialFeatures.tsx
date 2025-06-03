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
  const [activeFeature, setActiveFeature] = useState("copytrading");
  const [isLoaded, setIsLoaded] = useState(false);

  // Define social features
  const socialFeatures: SocialFeature[] = [
    {
      name: "CopyTrading",
      icon: Users,
      description: "eToro's flagship feature allows you to automatically copy the trades of successful investors in real-time, with full control over your investment amount and risk settings.",
      features: [
        "Automatically replicate trades of successful investors",
        "Copy multiple traders simultaneously",
        "Set maximum investment per copy",
        "View detailed performance metrics",
        "Stop copying at any time"
      ],
      transparency: {
        "Performance History": "24+ months",
        "Risk Score Visibility": "Yes",
        "Profit/Loss Display": "Real-time",
        "Trade History Access": "Complete"
      }
    },
    {
      name: "Social Feed",
      icon: MessageSquare,
      description: "eToro's social feed works like a trading-focused social network, where users can share insights, discuss markets, and interact with other traders from around the world.",
      features: [
        "Post market insights and analysis",
        "Follow top traders and influencers",
        "Comment on and like trading ideas",
        "Share charts and market data",
        "Get real-time market updates"
      ],
      engagement: {
        "Active Users": "30M+",
        "Daily Posts": "100K+",
        "Avg. Response Time": "5-10 min",
        "Languages Supported": "20+"
      }
    },
    {
      name: "Popular Investor Program",
      icon: Star,
      description: "eToro's Popular Investor Program rewards successful traders who gain followers and allow others to copy their trades, creating a win-win ecosystem for skilled traders and those learning.",
      features: [
        "Earn monthly payments based on assets under management",
        "Receive performance-based rewards",
        "Build your reputation as a trusted trader",
        "Access exclusive educational resources",
        "Potential to earn a full-time income from trading"
      ],
      metrics: {
        "Max Monthly Income": "$10,000+",
        "Tiers": "4 (Cadet to Elite)",
        "Min. Copiers Required": "Varies by tier",
        "Performance Criteria": "Risk score, gain, time"
      }
    },
    {
      name: "Smart Portfolios",
      icon: BarChart3,
      description: "eToro's Smart Portfolios (formerly CopyPortfolios) are professionally managed thematic investment strategies that give you exposure to specific market segments or trading strategies.",
      features: [
        "Thematic investing across markets and assets",
        "Professionally managed by eToro's investment team",
        "Automatic rebalancing and optimization",
        "Lower minimum investment than traditional funds",
        "No management fees (spreads only)"
      ],
      accuracy: {
        "Rebalancing Frequency": "Quarterly",
        "Min. Investment": "$1,000",
        "Management Fee": "0% (only spreads)",
        "Strategy Types": "Market, Trader, Partner"
      }
    }
  ];

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

  // Find the active feature
  const currentFeature = socialFeatures.find(f => f.name.toLowerCase() === activeFeature) || socialFeatures[0];

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
          <div className="flex overflow-x-auto pb-2 gap-2">
            {socialFeatures.map((feature) => {
              const IconComponent = feature.icon;
              const isActive = feature.name.toLowerCase() === activeFeature;
              return (
                <Button 
                  key={feature.name}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFeature(feature.name.toLowerCase())}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <IconComponent className="h-4 w-4" />
                  {feature.name}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">{currentFeature.name}</h3>
              <p className="text-muted-foreground mb-4">{currentFeature.description}</p>
              
              <h4 className="font-medium mb-2">Key Features</h4>
              <ul className="space-y-2">
                {currentFeature.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Zap className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.etoro.com/trading/social-trading" target="_blank" rel="noopener noreferrer">
                    Learn more
                  </a>
                </Button>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium mb-3">Performance Metrics</h4>
              
              {currentFeature.transparency && (
                <div className="space-y-2 mb-4">
                  <h5 className="text-sm font-medium">Transparency</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(currentFeature.transparency).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-muted-foreground">{key}: </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentFeature.engagement && (
                <div className="space-y-2 mb-4">
                  <h5 className="text-sm font-medium">Engagement</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(currentFeature.engagement).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-muted-foreground">{key}: </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentFeature.metrics && (
                <div className="space-y-2 mb-4">
                  <h5 className="text-sm font-medium">Program Details</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(currentFeature.metrics).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-muted-foreground">{key}: </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentFeature.accuracy && (
                <div className="space-y-2 mb-4">
                  <h5 className="text-sm font-medium">Portfolio Details</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(currentFeature.accuracy).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-muted-foreground">{key}: </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
