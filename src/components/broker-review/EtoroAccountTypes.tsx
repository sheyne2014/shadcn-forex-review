"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Crown, 
  Shield, 
  DollarSign,
  TrendingUp,
  Globe,
  AlertTriangle,
  CheckCircle,
  Info,
  Target,
  BarChart3,
  Zap
} from "lucide-react";
// Removed Context7 imports due to compatibility issues
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroAccountTypesProps {
  broker: any;
}

export function EtoroAccountTypes({ broker }: EtoroAccountTypesProps) {
  const [selectedRegion, setSelectedRegion] = useState("EU");

  useEffect(() => {
    trackEvent({
      action: 'view_account_types',
      category: 'trading_conditions',
      label: 'etoro_accounts'
    });
  }, []);

  const accountTypes = [
    {
      type: "Retail Account",
      icon: Users,
      minDeposit: "$50",
      leverage: "1:30 (EU) / 1:400 (Non-EU)",
      features: [
        "Social trading and copy trading",
        "All available instruments",
        "Standard customer support",
        "Educational resources",
        "Mobile and web platform access"
      ],
      limitations: [
        "ESMA leverage restrictions (EU)",
        "Standard spreads",
        "No priority support",
        "Limited risk management tools"
      ],
      suitability: "Beginner to intermediate traders",
      protection: "Negative balance protection",
      marginCall: "50%",
      stopOut: "20%"
    },
    {
      type: "Professional Account",
      icon: Crown,
      minDeposit: "$50",
      leverage: "1:400 (EU) / 1:400 (Non-EU)",
      features: [
        "Higher leverage (up to 1:400)",
        "All retail account features",
        "Priority customer support",
        "Advanced risk management",
        "Professional trading tools"
      ],
      limitations: [
        "No negative balance protection",
        "Higher risk exposure",
        "Strict eligibility requirements",
        "Quarterly assessments required"
      ],
      suitability: "Experienced professional traders",
      protection: "No negative balance protection",
      marginCall: "100%",
      stopOut: "50%"
    },
    {
      type: "Islamic Account",
      icon: Shield,
      minDeposit: "$1,000",
      leverage: "1:30 (EU) / 1:400 (Non-EU)",
      features: [
        "Sharia-compliant trading",
        "No overnight swap fees",
        "Halal trading instruments only",
        "Islamic finance principles",
        "Dedicated Islamic support"
      ],
      limitations: [
        "Limited instrument selection",
        "Higher minimum deposit",
        "Verification of Islamic faith required",
        "No interest-based products"
      ],
      suitability: "Muslim traders seeking Sharia compliance",
      protection: "Negative balance protection",
      marginCall: "50%",
      stopOut: "20%"
    }
  ];

  const regionalRequirements = {
    EU: {
      minDeposit: "$50",
      maxLeverage: "1:30",
      protection: "ICF up to €20,000",
      regulator: "CySEC",
      restrictions: "ESMA regulations apply"
    },
    UK: {
      minDeposit: "$50",
      maxLeverage: "1:30",
      protection: "FSCS up to £85,000",
      regulator: "FCA",
      restrictions: "FCA regulations apply"
    },
    AU: {
      minDeposit: "$200",
      maxLeverage: "1:30",
      protection: "Limited compensation",
      regulator: "ASIC",
      restrictions: "ASIC regulations apply"
    },
    US: {
      minDeposit: "$50",
      maxLeverage: "No leverage",
      protection: "SIPC up to $500,000",
      regulator: "FINRA",
      restrictions: "Stocks and ETFs only"
    },
    International: {
      minDeposit: "$50",
      maxLeverage: "1:400",
      protection: "Varies by jurisdiction",
      regulator: "Multiple",
      restrictions: "Varies by location"
    }
  };

  const professionalCriteria = [
    {
      requirement: "Trading Experience",
      criteria: "Minimum 1 year of relevant experience",
      verification: "Trading history and documentation"
    },
    {
      requirement: "Portfolio Size",
      criteria: "Financial portfolio exceeding €500,000",
      verification: "Bank statements and asset verification"
    },
    {
      requirement: "Trading Frequency",
      criteria: "10+ trades per quarter in relevant markets",
      verification: "Trading records and activity logs"
    },
    {
      requirement: "Professional Role",
      criteria: "Work in financial sector for 1+ years",
      verification: "Employment verification and credentials"
    }
  ];

  const leverageComparison = [
    { instrument: "Major Forex", retail: "1:30", professional: "1:400", impact: "High" },
    { instrument: "Minor Forex", retail: "1:20", professional: "1:400", impact: "Very High" },
    { instrument: "Gold", retail: "1:20", professional: "1:400", impact: "Very High" },
    { instrument: "Major Indices", retail: "1:20", professional: "1:400", impact: "Very High" },
    { instrument: "Individual Stocks", retail: "1:5", professional: "1:20", impact: "High" },
    { instrument: "Cryptocurrencies", retail: "1:2", professional: "1:5", impact: "Medium" }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-3xl font-bold">Account Types & Trading Conditions</h3>
        </div>
        <p className="text-lg text-muted-foreground">
          Comprehensive comparison of eToro's account types, regional requirements,
          and leverage conditions across different jurisdictions.
        </p>
      </div>

      {/* Regional Requirements Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Regional Requirements & Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedRegion} onValueChange={setSelectedRegion} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="EU">EU</TabsTrigger>
              <TabsTrigger value="UK">UK</TabsTrigger>
              <TabsTrigger value="AU">Australia</TabsTrigger>
              <TabsTrigger value="US">USA</TabsTrigger>
              <TabsTrigger value="International">International</TabsTrigger>
            </TabsList>

            {Object.entries(regionalRequirements).map(([region, requirements]) => (
              <TabsContent key={region} value={region} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600 mb-2" />
                    <h4 className="font-semibold">Minimum Deposit</h4>
                    <p className="text-lg font-bold text-blue-600">{requirements.minDeposit}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
                    <h4 className="font-semibold">Max Leverage</h4>
                    <p className="text-lg font-bold text-green-600">{requirements.maxLeverage}</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600 mb-2" />
                    <h4 className="font-semibold">Protection</h4>
                    <p className="text-sm font-medium text-purple-600">{requirements.protection}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Regulatory Information</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Regulated by <span className="font-semibold">{requirements.regulator}</span>. 
                    {requirements.restrictions}
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Account Types Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {accountTypes.map((account, index) => {
          const Icon = account.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{account.type}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Min Deposit:</span>
                    <p className="font-semibold">{account.minDeposit}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Leverage:</span>
                    <p className="font-semibold">{account.leverage}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Margin Call:</span>
                    <p className="font-semibold">{account.marginCall}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Stop Out:</span>
                    <p className="font-semibold">{account.stopOut}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-green-600 mb-2 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Features
                  </h5>
                  <ul className="space-y-1 text-sm">
                    {account.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-amber-600 mb-2 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Limitations
                  </h5>
                  <ul className="space-y-1 text-sm">
                    {account.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-amber-600 mt-1 flex-shrink-0" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground mb-1">Best suited for:</div>
                  <div className="text-sm font-medium">{account.suitability}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Professional Account Criteria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-600" />
            Professional Account Eligibility Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            To qualify for a Professional account with higher leverage, traders must meet at least
            two of the following criteria and undergo quarterly assessments.
          </p>
          
          <div className="mt-6 space-y-4">
            {professionalCriteria.map((criteria, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{criteria.requirement}</h4>
                  <Badge variant="outline">Required</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Criteria:</span>
                    <p>{criteria.criteria}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Verification:</span>
                    <p>{criteria.verification}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span className="font-semibold text-amber-700 dark:text-amber-400">Important Notice</span>
            </div>
            <p className="text-sm text-amber-600 dark:text-amber-300">
              Professional accounts lose negative balance protection and investor compensation scheme coverage. 
              Traders must meet ongoing criteria and undergo quarterly assessments to maintain professional status.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Leverage Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Leverage Comparison: Retail vs Professional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Instrument</th>
                  <th className="text-center p-3 font-semibold">Retail Account</th>
                  <th className="text-center p-3 font-semibold">Professional Account</th>
                  <th className="text-center p-3 font-semibold">Impact</th>
                </tr>
              </thead>
              <tbody>
                {leverageComparison.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{row.instrument}</td>
                    <td className="p-3 text-center">
                      <Badge variant="secondary">{row.retail}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant="default">{row.professional}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge 
                        variant={row.impact === "Very High" ? "destructive" : 
                                row.impact === "High" ? "secondary" : "outline"}
                      >
                        {row.impact}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Margin Requirements */}
      <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <Target className="h-5 w-5" />
            Margin Call & Stop Out Levels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Understanding eToro's margin requirements is crucial for risk management and avoiding forced position closures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Retail Accounts</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <span className="font-medium">Margin Call Level:</span>
                  <Badge variant="secondary">50%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <span className="font-medium">Stop Out Level:</span>
                  <Badge variant="destructive">20%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Positions automatically closed when equity falls to 20% of required margin.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Professional Accounts</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <span className="font-medium">Margin Call Level:</span>
                  <Badge variant="secondary">100%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <span className="font-medium">Stop Out Level:</span>
                  <Badge variant="destructive">50%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Higher requirements due to increased leverage and no negative balance protection.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
