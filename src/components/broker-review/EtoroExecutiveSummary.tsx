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
          <div className="text-lg leading-relaxed space-y-4">
            <p>
              <strong>eToro isn't your traditional forex broker—it's a social trading revolution.</strong> While most brokers focus on spreads and leverage, eToro has fundamentally reimagined trading by creating the world's largest social trading network with over 30 million users. This Cyprus-regulated fintech pioneer transforms novice traders into informed investors through revolutionary copy trading technology that democratizes access to successful trading strategies.
            </p>
            <p>
              Founded in 2007, eToro has evolved from a simple trading platform into a comprehensive social trading ecosystem where beginners can automatically replicate the strategies of top-performing traders. Unlike traditional forex brokers that leave you to navigate markets alone, eToro provides a community-driven approach where every trade becomes a learning opportunity and every successful trader becomes a potential mentor.
              However, this social trading focus comes with trade-offs: higher spreads than traditional ECN brokers and
              a CFD-based model that may not suit professional forex traders seeking institutional-grade execution.
            </p>
          </div>

          {/* Key Differentiators with Enhanced Magic UI */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">What Sets eToro Apart from Traditional Forex Brokers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <Copy className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Copy Trading Pioneer</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically replicate strategies of top traders with full transparency and risk management
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Social Network</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    30M+ user community with feeds, discussions, and collaborative learning
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold">Beginner-Focused</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Simplified interface designed for retail traders, not institutional professionals
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold">Multi-Asset Hub</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Stocks, crypto, commodities, forex, and ETFs in one unified platform
                  </p>
                </CardContent>
              </Card>
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
            <strong>eToro earns a solid 4.5/5 rating</strong> as a social trading platform, not a traditional forex broker.
            Our scoring reflects its unique position: <strong>9.5/10 for social trading innovation</strong>, <strong>9.0/10 for user experience</strong>,
            <strong>8.5/10 for regulatory coverage</strong>, but only <strong>6.5/10 for trading costs</strong> due to higher spreads.
            eToro excels at democratizing trading through copy trading but isn't suitable for professional traders seeking institutional-grade execution.
          </p>

          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Bottom Line:</strong> Choose eToro if you're a beginner seeking social learning and copy trading.
              Avoid if you need tight spreads, MetaTrader, or professional trading tools.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={broker.website_url || "https://www.etoro.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1 gap-2"
            >
              <Globe className="h-4 w-4" />
              Visit eToro
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/tools/compare"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1 gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Compare Alternatives
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
