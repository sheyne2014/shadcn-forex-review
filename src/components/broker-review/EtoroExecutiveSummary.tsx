"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Star,
  Users,
  TrendingUp,
  Shield,
  Award,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Copy,
  BarChart3,
  Globe,
  Target,
  Zap,
  DollarSign,
  Info
} from "lucide-react";
import Link from "next/link";
import { Context7Content, Context7Heading2 } from "@/components/Context7Provider";
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroExecutiveSummaryProps {
  broker: any;
}

export function EtoroExecutiveSummary({ broker }: EtoroExecutiveSummaryProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    trackEvent('etoro_executive_summary_viewed', {
      broker_name: broker?.name || 'eToro'
    });
  }, [broker]);

  const overallScore = 4.5;
  const scores = {
    socialTrading: 9.5,
    userExperience: 9.0,
    regulation: 8.5,
    costs: 6.5,
    platforms: 8.0,
    education: 8.5
  };

  return (
    <div className="space-y-8">
      {/* Executive Summary Header */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <Award className="h-7 w-7 text-primary" />
              Executive Summary
            </CardTitle>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Star className="h-4 w-4 mr-1 fill-yellow-500 text-yellow-500" />
              {overallScore}/5
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hook Opening with Context7 Enhancement */}
          <div className="text-lg leading-relaxed">
            <Context7Content type="paragraph">
              eToro isn't just another forex broker—it's the world's largest social trading network that has fundamentally
              transformed how retail traders approach the markets. Founded in 2007 in Tel Aviv, this Cyprus-regulated
              fintech pioneer has redefined trading by merging social networking with financial markets, creating an
              ecosystem where beginners can learn from experienced traders through revolutionary copy trading technology.
            </Context7Content>
            <Context7Content type="paragraph">
              With over 30 million users across 140+ countries, eToro has pioneered social trading, allowing traders to
              copy successful investors automatically while building diversified portfolios across multiple asset classes.
              However, this social trading focus comes with trade-offs: higher spreads than traditional ECN brokers and
              a CFD-based model that may not suit professional forex traders seeking institutional-grade execution.
            </Context7Content>
          </div>

          {/* Key Differentiators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Copy className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-700 dark:text-green-400">Social Trading Pioneer</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-300">
                Revolutionary CopyTrader feature with 30M+ user community
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-700 dark:text-blue-400">Beginner-Friendly</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Intuitive platform designed for new traders
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-700 dark:text-purple-400">Multi-Regulated</span>
              </div>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                FCA, CySEC, ASIC regulatory coverage
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              Primary Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Revolutionary Social Trading</p>
                  <p className="text-sm text-muted-foreground">Copy successful traders automatically with transparent performance history</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Massive User Base</p>
                  <p className="text-sm text-muted-foreground">30+ million users provide extensive social proof and trading insights</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Zero Commission Stocks</p>
                  <p className="text-sm text-muted-foreground">Commission-free stock trading on major exchanges</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Comprehensive Education</p>
                  <p className="text-sm text-muted-foreground">Extensive learning resources and trading academy</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Considerations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-amber-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Key Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Higher Forex Spreads</p>
                  <p className="text-sm text-muted-foreground">Spreads from 1.0 pips, higher than ECN brokers</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">No MetaTrader Support</p>
                  <p className="text-sm text-muted-foreground">Proprietary platform only, no MT4/MT5</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Withdrawal Fees</p>
                  <p className="text-sm text-muted-foreground">$5 withdrawal fee applies to all withdrawals</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">CFD-Focused</p>
                  <p className="text-sm text-muted-foreground">Primarily CFD trading, not spot forex</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Performance Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(scores).map(([category, score]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-semibold">{score}/10</span>
                </div>
                <Progress value={score * 10} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Who Should Use eToro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="bg-green-50 dark:bg-green-950/20">
            <CardTitle className="text-green-700 dark:text-green-400 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Best Suited For
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2">
              {[
                "Beginner traders seeking social learning",
                "Investors interested in copy trading",
                "Multi-asset portfolio builders",
                "Mobile-first traders",
                "Social trading enthusiasts"
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
              <AlertTriangle className="h-5 w-5 mr-2" />
              Not Ideal For
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2">
              {[
                "Professional scalpers and day traders",
                "Traders requiring tight spreads",
                "MetaTrader platform users",
                "High-frequency trading strategies",
                "Institutional-grade execution needs"
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

      {/* Final Verdict */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Final Verdict
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            <strong>eToro earns a solid 4.5/5 rating</strong> for its revolutionary approach to social trading and exceptional user experience.
            While not suitable for professional traders seeking tight spreads, eToro excels as a social trading platform that democratizes
            access to financial markets through innovative copy trading features.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link href={broker.website_url || "https://www.etoro.com"} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Visit eToro
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              Compare Alternatives
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
