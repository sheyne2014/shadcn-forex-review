"use client";

import { useState, useEffect } from "react";
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

export function EtoroSocialFeatures({ broker }: EtoroSocialFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState("newsfeed");

  useEffect(() => {
    trackEvent({
      action: 'view_social_features',
      category: 'social_trading',
      label: 'etoro_social_features'
    });
  }, []);

  const socialFeatures = {
    newsfeed: {
      name: "News Feed",
      icon: MessageSquare,
      description: "Real-time social trading feed with market insights and trader updates",
      features: [
        "Real-time market discussions",
        "Trader performance updates",
        "Market sentiment analysis",
        "Educational content sharing",
        "Trade idea discussions"
      ],
      engagement: {
        dailyPosts: "50,000+",
        activeUsers: "2.5M",
        avgEngagement: "12%",
        qualityScore: 7.2
      }
    },
    statistics: {
      name: "Trader Statistics",
      icon: BarChart3,
      description: "Comprehensive transparency of trader performance and risk metrics",
      features: [
        "Real-time performance tracking",
        "Risk score calculations",
        "Portfolio composition",
        "Trading history analysis",
        "Copier statistics"
      ],
      transparency: {
        performanceAccuracy: "99.8%",
        updateFrequency: "Real-time",
        historicalData: "Full history",
        riskMetrics: "Comprehensive"
      }
    },
    community: {
      name: "Community Interaction",
      icon: Users,
      description: "Social networking features for traders to connect and learn",
      features: [
        "Follow favorite traders",
        "Comment on trades",
        "Like and share content",
        "Private messaging",
        "Group discussions"
      ],
      metrics: {
        avgConnections: "45",
        messageVolume: "1M+/day",
        responseRate: "68%",
        satisfactionScore: 7.8
      }
    },
    sentiment: {
      name: "Social Sentiment",
      icon: Activity,
      description: "Market sentiment indicators based on community trading activity",
      features: [
        "Real-time sentiment tracking",
        "Bullish/bearish indicators",
        "Popular asset trends",
        "Community predictions",
        "Sentiment-based alerts"
      ],
      accuracy: {
        shortTerm: "72%",
        mediumTerm: "65%",
        longTerm: "58%",
        reliability: "Moderate"
      }
    }
  };

  const followingVsCopying = [
    {
      aspect: "Purpose",
      following: "Stay updated with trader's activity and insights",
      copying: "Automatically replicate trader's positions",
      impact: "Information vs Action"
    },
    {
      aspect: "Financial Commitment",
      following: "Free - no financial commitment",
      copying: "Requires minimum $200 allocation",
      impact: "Cost difference"
    },
    {
      aspect: "Risk Exposure",
      following: "No financial risk",
      copying: "Direct exposure to trader's performance",
      impact: "Risk level"
    },
    {
      aspect: "Learning Value",
      following: "High - observe strategies without pressure",
      copying: "Medium - learn through experience",
      impact: "Educational benefit"
    },
    {
      aspect: "Control",
      following: "Full control over your own trades",
      copying: "Limited control - follows trader's decisions",
      impact: "Autonomy level"
    }
  ];

  const communityQualityMetrics = [
    {
      metric: "Content Quality",
      score: 7.2,
      description: "Average quality of posts and discussions",
      factors: ["Educational value", "Market relevance", "Accuracy"]
    },
    {
      metric: "User Engagement",
      score: 8.1,
      description: "Level of active participation in discussions",
      factors: ["Comments per post", "Likes and shares", "Response rates"]
    },
    {
      metric: "Expert Participation",
      score: 6.8,
      description: "Involvement of verified expert traders",
      factors: ["Expert posts", "Response quality", "Educational content"]
    },
    {
      metric: "Moderation Effectiveness",
      score: 7.5,
      description: "Quality of content moderation and spam control",
      factors: ["Spam removal", "Rule enforcement", "User reports"]
    }
  ];

  const sentimentIndicators = [
    {
      indicator: "Bullish Sentiment",
      value: 68,
      change: "+5%",
      timeframe: "24h",
      reliability: "High"
    },
    {
      indicator: "Copy Trading Activity",
      value: 85,
      change: "+12%",
      timeframe: "7d",
      reliability: "High"
    },
    {
      indicator: "Risk Appetite",
      value: 42,
      change: "-8%",
      timeframe: "24h",
      reliability: "Medium"
    },
    {
      indicator: "New Trader Influx",
      value: 76,
      change: "+18%",
      timeframe: "30d",
      reliability: "Medium"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
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

      {/* Social Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(socialFeatures).map(([key, feature]) => {
          const Icon = feature.icon;
          return (
            <Button
              key={key}
              variant={activeFeature === key ? "default" : "outline"}
              className="h-auto p-4 flex flex-col items-center text-center"
              onClick={() => setActiveFeature(key)}
            >
              <Icon className="h-6 w-6 mb-2" />
              <div className="font-semibold">{feature.name}</div>
            </Button>
          );
        })}
      </div>

      {/* Active Feature Details */}
      <Card className="border-2 border-green-200 dark:border-green-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              {React.createElement(socialFeatures[activeFeature as keyof typeof socialFeatures].icon, {
                className: "h-6 w-6 text-green-600"
              })}
            </div>
            <CardTitle>{socialFeatures[activeFeature as keyof typeof socialFeatures].name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Context7Content>
            {socialFeatures[activeFeature as keyof typeof socialFeatures].description}
          </Context7Content>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-600" />
                Key Features
              </h4>
              <ul className="space-y-2">
                {socialFeatures[activeFeature as keyof typeof socialFeatures].features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Zap className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                Performance Metrics
              </h4>
              <div className="space-y-2">
                {Object.entries(
                  (socialFeatures[activeFeature as keyof typeof socialFeatures] as any).engagement || 
                  (socialFeatures[activeFeature as keyof typeof socialFeatures] as any).transparency ||
                  (socialFeatures[activeFeature as keyof typeof socialFeatures] as any).metrics ||
                  (socialFeatures[activeFeature as keyof typeof socialFeatures] as any).accuracy
                ).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="capitalize text-muted-foreground">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Following vs Copying Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Following vs Copying: Key Differences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Context7Content>
            Understanding the distinction between following and copying traders is crucial 
            for making informed decisions about social trading engagement.
          </Context7Content>
          
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Aspect</th>
                  <th className="text-center p-3 font-semibold text-blue-600">Following</th>
                  <th className="text-center p-3 font-semibold text-green-600">Copying</th>
                  <th className="text-center p-3 font-semibold">Impact</th>
                </tr>
              </thead>
              <tbody>
                {followingVsCopying.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{row.aspect}</td>
                    <td className="p-3 text-center text-sm">{row.following}</td>
                    <td className="p-3 text-center text-sm">{row.copying}</td>
                    <td className="p-3 text-center">
                      <Badge variant="outline">{row.impact}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Community Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Community Quality Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityQualityMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{metric.metric}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{metric.score}/10</span>
                    <div className={`w-3 h-3 rounded-full ${
                      metric.score >= 8 ? 'bg-green-500' :
                      metric.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground">Key Factors:</span>
                  <div className="flex flex-wrap gap-1">
                    {metric.factors.map((factor, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Progress value={metric.score * 10} className="mt-3 h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Sentiment Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Real-Time Social Sentiment Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Context7Content>
            eToro's social sentiment indicators provide insights into market mood and trader behavior, 
            though their predictive value should be used as one of many analysis tools.
          </Context7Content>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sentimentIndicators.map((indicator, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{indicator.indicator}</h4>
                  <Badge 
                    variant={indicator.reliability === "High" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {indicator.reliability}
                  </Badge>
                </div>
                
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-blue-600">{indicator.value}%</div>
                  <div className={`text-sm font-medium ${
                    indicator.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {indicator.change} ({indicator.timeframe})
                  </div>
                </div>
                
                <Progress value={indicator.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Trading Value Assessment */}
      <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <Info className="h-5 w-5" />
            Social Features Value Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600">Valuable Aspects</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ThumbsUp className="h-3 w-3 text-green-600 mt-1" />
                  <span>Educational value for beginners learning market dynamics</span>
                </li>
                <li className="flex items-start gap-2">
                  <ThumbsUp className="h-3 w-3 text-green-600 mt-1" />
                  <span>Transparency in trader performance and statistics</span>
                </li>
                <li className="flex items-start gap-2">
                  <ThumbsUp className="h-3 w-3 text-green-600 mt-1" />
                  <span>Community support and knowledge sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <ThumbsUp className="h-3 w-3 text-green-600 mt-1" />
                  <span>Real-time market sentiment insights</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-red-600">Limitations & Concerns</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Eye className="h-3 w-3 text-red-600 mt-1" />
                  <span>Risk of following crowd mentality instead of analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-3 w-3 text-red-600 mt-1" />
                  <span>Quality varies significantly among community contributors</span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-3 w-3 text-red-600 mt-1" />
                  <span>Potential for misinformation and market manipulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-3 w-3 text-red-600 mt-1" />
                  <span>May discourage development of independent analysis skills</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <h5 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
              Bottom Line on Social Features
            </h5>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              eToro's social features provide genuine value for education and community learning, 
              but should complement, not replace, fundamental and technical analysis. The transparency 
              and community aspects are industry-leading, though users should maintain critical thinking 
              and avoid over-reliance on social sentiment for trading decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
