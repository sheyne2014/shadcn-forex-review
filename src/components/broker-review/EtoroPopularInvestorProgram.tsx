"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  Star, 
  TrendingUp, 
  Users,
  DollarSign,
  Shield,
  Target,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Award,
  Clock,
  Zap,
  Eye
} from "lucide-react";
import { Context7Content, Context7Heading3 } from "@/components/Context7Provider";
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroPopularInvestorProgramProps {
  broker: any;
}

export function EtoroPopularInvestorProgram({ broker }: EtoroPopularInvestorProgramProps) {
  const [selectedTier, setSelectedTier] = useState("cadet");

  useEffect(() => {
    trackEvent({
      action: 'view_popular_investor_program',
      category: 'social_trading',
      label: 'etoro_popular_investor'
    });
  }, []);

  const programTiers = {
    cadet: {
      name: "Cadet",
      icon: Users,
      requirements: {
        copiers: "1+",
        copyingCapital: "$500+",
        profitableMonths: "2 of last 4",
        riskScore: "≤6",
        minEquity: "$1,000"
      },
      benefits: {
        commission: "0.5%",
        maxCommission: "$1,000/month",
        features: ["Basic analytics", "Copier notifications"]
      },
      color: "blue"
    },
    champion: {
      name: "Champion",
      icon: Award,
      requirements: {
        copiers: "10+",
        copyingCapital: "$10,000+",
        profitableMonths: "6 of last 12",
        riskScore: "≤6",
        minEquity: "$5,000"
      },
      benefits: {
        commission: "1.0%",
        maxCommission: "$5,000/month",
        features: ["Advanced analytics", "Priority support", "Marketing support"]
      },
      color: "green"
    },
    elite: {
      name: "Elite",
      icon: Crown,
      requirements: {
        copiers: "50+",
        copyingCapital: "$50,000+",
        profitableMonths: "9 of last 12",
        riskScore: "≤5",
        minEquity: "$10,000"
      },
      benefits: {
        commission: "1.5%",
        maxCommission: "$15,000/month",
        features: ["Premium analytics", "Dedicated support", "Media opportunities", "Higher visibility"]
      },
      color: "purple"
    },
    eliteplus: {
      name: "Elite Plus",
      icon: Star,
      requirements: {
        copiers: "500+",
        copyingCapital: "$500,000+",
        profitableMonths: "10 of last 12",
        riskScore: "≤4",
        minEquity: "$25,000"
      },
      benefits: {
        commission: "2.0%",
        maxCommission: "$50,000/month",
        features: ["Full analytics suite", "Personal account manager", "Custom marketing", "VIP events"]
      },
      color: "amber"
    }
  };

  const qualityControlMeasures = [
    {
      measure: "Performance Verification",
      description: "All trading history verified and audited monthly",
      effectiveness: "High",
      frequency: "Monthly"
    },
    {
      measure: "Risk Assessment",
      description: "Continuous monitoring of risk scores and drawdowns",
      effectiveness: "High",
      frequency: "Real-time"
    },
    {
      measure: "Compliance Checks",
      description: "Regular review of trading practices and communications",
      effectiveness: "Medium",
      frequency: "Quarterly"
    },
    {
      measure: "Copier Feedback",
      description: "Monitoring copier satisfaction and complaint resolution",
      effectiveness: "Medium",
      frequency: "Ongoing"
    }
  ];

  const topPerformerStats = [
    {
      category: "Average Annual Return",
      value: "12.5%",
      benchmark: "S&P 500: 10.5%",
      note: "Top 10% of Popular Investors"
    },
    {
      category: "Maximum Drawdown",
      value: "18.3%",
      benchmark: "Market Average: 25%",
      note: "Better risk management"
    },
    {
      category: "Win Rate",
      value: "64%",
      benchmark: "Retail Average: 45%",
      note: "Higher success rate"
    },
    {
      category: "Average Hold Time",
      value: "45 days",
      benchmark: "Retail Average: 12 days",
      note: "More strategic approach"
    }
  ];

  const sustainabilityAnalysis = {
    yearOne: { performers: 1000, stillActive: 850, profitable: 680 },
    yearTwo: { performers: 850, stillActive: 650, profitable: 420 },
    yearThree: { performers: 650, stillActive: 480, profitable: 290 },
    yearFive: { performers: 480, stillActive: 320, profitable: 160 }
  };

  const commissionCalculator = (tier: string, copyingCapital: number) => {
    const rates = {
      cadet: 0.005,
      champion: 0.01,
      elite: 0.015,
      eliteplus: 0.02
    };
    
    const maxCommissions = {
      cadet: 1000,
      champion: 5000,
      elite: 15000,
      eliteplus: 50000
    };

    const monthlyCommission = copyingCapital * rates[tier as keyof typeof rates];
    return Math.min(monthlyCommission, maxCommissions[tier as keyof typeof maxCommissions]);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
            <Crown className="h-8 w-8 text-purple-600" />
          </div>
          <Context7Heading3>Popular Investor Program Analysis</Context7Heading3>
        </div>
        <Context7Content>
          Comprehensive analysis of eToro's Popular Investor program, including requirements, 
          commission structure, quality control measures, and long-term sustainability data.
        </Context7Content>
      </div>

      {/* Program Tiers Overview */}
      <Tabs value={selectedTier} onValueChange={setSelectedTier} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cadet">Cadet</TabsTrigger>
          <TabsTrigger value="champion">Champion</TabsTrigger>
          <TabsTrigger value="elite">Elite</TabsTrigger>
          <TabsTrigger value="eliteplus">Elite Plus</TabsTrigger>
        </TabsList>

        {Object.entries(programTiers).map(([key, tier]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <Card className={`border-2 border-${tier.color}-200 dark:border-${tier.color}-800`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${tier.color}-100 dark:bg-${tier.color}-900/20 rounded-lg`}>
                      <tier.icon className={`h-6 w-6 text-${tier.color}-600`} />
                    </div>
                    <CardTitle className="text-xl">{tier.name} Popular Investor</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {tier.benefits.commission} Commission
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-600" />
                      Requirements
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(tier.requirements).map(([req, value]) => (
                        <div key={req} className="flex justify-between text-sm">
                          <span className="capitalize text-muted-foreground">
                            {req.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      Benefits & Commission
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Commission Rate:</span>
                        <span className="font-medium">{tier.benefits.commission}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Max Monthly:</span>
                        <span className="font-medium">{tier.benefits.maxCommission}</span>
                      </div>
                      <div className="mt-3">
                        <span className="text-sm font-medium text-muted-foreground">Features:</span>
                        <ul className="mt-1 space-y-1">
                          {tier.benefits.features.map((feature, idx) => (
                            <li key={idx} className="text-sm flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Commission Calculator */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                    Monthly Commission Calculator
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">$100K Copying Capital:</span>
                      <p className="font-bold text-blue-600">
                        ${commissionCalculator(key, 100000).toLocaleString()}/month
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">$500K Copying Capital:</span>
                      <p className="font-bold text-blue-600">
                        ${commissionCalculator(key, 500000).toLocaleString()}/month
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">$1M Copying Capital:</span>
                      <p className="font-bold text-blue-600">
                        ${commissionCalculator(key, 1000000).toLocaleString()}/month
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quality Control Measures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Quality Control & Vetting Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Context7Content>
            eToro implements multiple quality control measures to ensure Popular Investors 
            maintain high standards and protect copier interests.
          </Context7Content>
          
          <div className="mt-6 space-y-4">
            {qualityControlMeasures.map((measure, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{measure.measure}</h4>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={measure.effectiveness === "High" ? "default" : "secondary"}
                    >
                      {measure.effectiveness}
                    </Badge>
                    <Badge variant="outline">{measure.frequency}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{measure.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performer Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Top Performer Statistics & Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topPerformerStats.map((stat, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{stat.category}</h4>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Popular Investors:</span>
                    <span className="font-bold text-green-600">{stat.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Benchmark:</span>
                    <span className="font-medium">{stat.benchmark}</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{stat.note}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Analysis */}
      <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <Clock className="h-5 w-5" />
            Long-Term Sustainability Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Context7Content>
            Analysis of Popular Investor program sustainability over time, showing retention 
            and profitability rates for a cohort of 1,000 initial participants.
          </Context7Content>

          <div className="space-y-4">
            {Object.entries(sustainabilityAnalysis).map(([year, data]) => (
              <div key={year} className="p-4 bg-white dark:bg-background rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold capitalize">{year.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <Badge variant="outline">{((data.profitable / data.performers) * 100).toFixed(1)}% Profitable</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold">{data.performers}</div>
                    <div className="text-muted-foreground">Total Performers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{data.stillActive}</div>
                    <div className="text-muted-foreground">Still Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{data.profitable}</div>
                    <div className="text-muted-foreground">Profitable</div>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Retention Rate:</span>
                    <span>{((data.stillActive / data.performers) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(data.stillActive / data.performers) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span className="font-semibold text-amber-800 dark:text-amber-300">Key Insights</span>
            </div>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• Only 16% of Popular Investors remain profitable after 5 years</li>
              <li>• 33% retention rate after 5 years indicates high attrition</li>
              <li>• Performance tends to decline as copying capital increases</li>
              <li>• Most successful traders focus on long-term strategies</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
