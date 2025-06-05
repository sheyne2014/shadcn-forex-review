"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Award,
  Star,
  TrendingUp,
  Shield,
  Users,
  BookOpen,
  Zap,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Globe,
  BarChart3,
  Target,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Info,
  Lightbulb
} from "lucide-react";
import Link from "next/link";
// Removed Context7 imports due to compatibility issues
import { trackEvent } from "@/lib/analytics/google-analytics";
import Image from "next/image";

interface EtoroExpertVerdictProps {
  broker: any;
}

export function EtoroExpertVerdict({ broker }: EtoroExpertVerdictProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    trackEvent('etoro_expert_verdict_viewed', {
      broker_name: broker?.name || 'eToro'
    });
  }, [broker]);

  // Overall score breakdown
  const scores = {
    platformTechnology: 8.0,
    tradingCosts: 6.0,
    regulationSafety: 9.0,
    customerService: 5.0,
    educationalResources: 8.0,
    socialTradingFeatures: 9.0
  };

  // Calculate overall score (average of all scores)
  const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;

  return (
    <div className="space-y-8">
      {/* Expert Verdict Header */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <Award className="h-7 w-7 text-primary" />
              Final Expert Verdict & Recommendations
            </CardTitle>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Star className="h-4 w-4 mr-1 fill-yellow-500 text-yellow-500" />
              {overallScore.toFixed(1)}/10
            </Badge>
          </div>
          <CardDescription className="text-base mt-2">
            Our comprehensive analysis of eToro's platform, costs, features, and service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Expert Introduction */}
          <div className="text-lg leading-relaxed">
            <p className="text-muted-foreground">
              After thorough testing and analysis of eToro's platform, we've compiled our expert verdict on this pioneering social trading broker.
              Our assessment covers all critical aspects of the trading experience, from platform technology to customer service,
              providing you with a clear picture of eToro's strengths and limitations to help you make an informed decision.
            </p>
          </div>

          {/* Score Breakdown Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Overall Score Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Platform Technology */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Platform Technology</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {scores.platformTechnology}/10
                  </Badge>
                </div>
                <Progress value={scores.platformTechnology * 10} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Intuitive interface with excellent mobile app, but lacks desktop application and advanced charting tools professional traders need.
                </p>
              </div>

              {/* Trading Costs */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Trading Costs</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {scores.tradingCosts}/10
                  </Badge>
                </div>
                <Progress value={scores.tradingCosts * 10} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Higher spreads than specialized forex brokers (1.0+ pips for EUR/USD), though commission-free model is transparent with no hidden fees.
                </p>
              </div>

              {/* Regulation & Safety */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">Regulation & Safety</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {scores.regulationSafety}/10
                  </Badge>
                </div>
                <Progress value={scores.regulationSafety * 10} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Excellent regulatory coverage with FCA, CySEC, and ASIC oversight. Client funds are segregated and held in tier-1 banks.
                </p>
              </div>

              {/* Customer Service */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">Customer Service</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {scores.customerService}/10
                  </Badge>
                </div>
                <Progress value={scores.customerService * 10} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Slow response times (up to 14 days in some cases) with inconsistent quality and reliance on automated replies.
                </p>
              </div>

              {/* Educational Resources */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Educational Resources</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {scores.educationalResources}/10
                  </Badge>
                </div>
                <Progress value={scores.educationalResources * 10} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Comprehensive Academy with courses, webinars, and tutorials suitable for all levels, particularly strong for beginners.
                </p>
              </div>

              {/* Social Trading Features */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-red-500" />
                    <span className="font-medium">Social Trading Features</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {scores.socialTradingFeatures}/10
                  </Badge>
                </div>
                <Progress value={scores.socialTradingFeatures * 10} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Industry-leading copy trading functionality with a 30M+ user community and innovative social features.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Comparison */}
          <div className="mt-8">
            <div className="relative h-64 w-full rounded-lg overflow-hidden border">
              <Image 
                src="/images/etoro-platform-comparison.jpg" 
                alt="eToro Platform Comparison" 
                fill 
                className="object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
                <p className="text-white text-sm">eToro's social trading dashboard compared to traditional trading platforms</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Suited For & Not Recommended For */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="bg-green-50 dark:bg-green-950/20">
            <CardTitle className="text-green-700 dark:text-green-400 flex items-center">
              <ThumbsUp className="h-5 w-5 mr-2" />
              Best Suited For
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2">
              {[
                "Complete beginners wanting to learn from others",
                "Social traders interested in copy trading",
                "Casual traders with small accounts",
                "Users preferring mobile-first experience",
                "Traders interested in cryptocurrency CFDs"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="bg-red-50 dark:bg-red-950/20">
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center">
              <ThumbsDown className="h-5 w-5 mr-2" />
              Not Recommended For
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2">
              {[
                "Professional traders needing advanced tools",
                "Scalpers requiring tight spreads",
                "Algorithmic traders needing API access",
                "Traders requiring MT4/MT5 platforms",
                "High-volume traders sensitive to costs"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Positioning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary" />
            Competitive Positioning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <div className="font-medium mb-2 flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  vs IC Markets
                </div>
                <p className="text-sm">Higher costs but significantly easier for beginners. IC Markets offers tighter spreads (from 0.3 pips) but lacks social trading features.</p>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="font-medium mb-2 flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  vs Plus500
                </div>
                <p className="text-sm">Similar CFD-based model but with superior social features. Plus500 offers a proprietary platform with comparable spreads but no copy trading.</p>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="font-medium mb-2 flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  vs XTB
                </div>
                <p className="text-sm">Different focus (social vs traditional). XTB offers better trading conditions and MT4 access but can't match eToro's social ecosystem.</p>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="font-medium mb-2 flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  vs Pepperstone
                </div>
                <p className="text-sm">Much higher costs but unique features. Pepperstone excels with institutional-grade execution and tight spreads (from 0.4 pips) but lacks social trading.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Outlook */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-primary" />
            Future Outlook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-blue-50/50 dark:bg-blue-950/20">
                <div className="font-medium mb-2">Platform Development Trajectory</div>
                <p className="text-sm">eToro continues to enhance its mobile-first approach, with ongoing improvements to the user interface and social features. However, there are no signs of developing a desktop application or adding MT4/MT5 support.</p>
              </div>

              <div className="p-4 rounded-lg border bg-purple-50/50 dark:bg-purple-950/20">
                <div className="font-medium mb-2">Regulatory Expansion Plans</div>
                <p className="text-sm">eToro is working to strengthen its regulatory position globally, with particular focus on expanding its US operations. Recent regulatory challenges with crypto assets (SEC settlement) may impact future cryptocurrency offerings.</p>
              </div>

              <div className="p-4 rounded-lg border bg-green-50/50 dark:bg-green-950/20">
                <div className="font-medium mb-2">Cost Competitiveness Improvements</div>
                <p className="text-sm">While eToro has shown no indication of reducing its forex spreads to compete with ECN brokers, it continues to maintain competitive stock and ETF offerings with zero-commission trading.</p>
              </div>

              <div className="p-4 rounded-lg border bg-amber-50/50 dark:bg-amber-950/20">
                <div className="font-medium mb-2">Professional Trader Feature Additions</div>
                <p className="text-sm">eToro has announced financial education partnerships in 2024, suggesting a continued focus on beginner-friendly features rather than professional trading tools. Advanced charting and algorithmic trading capabilities remain unlikely additions.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Honest Conclusion */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2 text-primary" />
            Honest Conclusion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="bg-primary/5 border-primary/20">
            <AlertDescription className="text-lg font-medium">
              "eToro succeeds as a social trading platform but fails as a traditional forex broker. The high spreads are justified only if you value the social features. For serious forex trading, consider alternatives."
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Final Recommendation */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Final Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            <strong>Choose eToro if:</strong> You're a beginner looking to learn through copy trading, have a smaller account size (under $10,000), or prioritize ease of use over trading costs. eToro's social trading ecosystem is unmatched and provides unique value for those looking to learn from successful traders.
          </p>
          <p className="text-lg leading-relaxed">
            <strong>Consider alternatives if:</strong> You're an experienced trader focused on cost efficiency, need advanced technical tools, or require the MetaTrader platform. For serious forex trading with tight spreads, look to IC Markets or Pepperstone. For algorithmic trading, XTB offers better API access and MT4 integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button asChild className="flex-1">
              <Link href={broker.website_url || "https://www.etoro.com"} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Visit eToro
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" className="flex-1">
              <BarChart3 className="h-4 w-4 mr-2" />
              Compare Alternatives
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}