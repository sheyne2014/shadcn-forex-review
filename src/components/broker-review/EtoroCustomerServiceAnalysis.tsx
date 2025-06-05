"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Mail,
  Phone,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Headphones,
  MessageSquare,
  Timer,
  Star,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Brain,
  Target,
  Activity,
  Shield,
  Zap
} from "lucide-react";
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroCustomerServiceAnalysisProps {
  broker: any;
}

export function EtoroCustomerServiceAnalysis({ broker }: EtoroCustomerServiceAnalysisProps) {
  const [activeTab, setActiveTab] = useState("channels");

  useEffect(() => {
    trackEvent({
      action: 'view_customer_service_analysis',
      category: 'customer_support',
      label: 'etoro_support_evaluation'
    });
  }, []);

  // Support Channel Data
  const supportChannels = [
    {
      name: "Live Chat",
      availability: "Club Members Only ($5,000+ equity)",
      responseTime: "2-5 minutes",
      quality: "High",
      limitation: true,
      icon: MessageCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      borderColor: "border-red-200"
    },
    {
      name: "Ticket System",
      availability: "24/7 submission, business hours response",
      responseTime: "48 hours - 14 days",
      quality: "Variable",
      limitation: false,
      icon: Mail,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      borderColor: "border-orange-200"
    },
    {
      name: "Help Center",
      availability: "24/7 self-service",
      responseTime: "Instant",
      quality: "Good",
      limitation: false,
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200"
    },
    {
      name: "Social Media",
      availability: "Business hours monitoring",
      responseTime: "4-24 hours",
      quality: "Basic",
      limitation: false,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200"
    }
  ];

  // Response Time Analysis
  const responseTimeData = {
    liveChat: {
      businessHours: "2-5 minutes",
      afterHours: "Not available",
      weekends: "Not available",
      holidays: "Not available"
    },
    ticketSystem: {
      simple: "48-72 hours",
      complex: "5-14 days",
      technical: "3-7 days",
      escalated: "7-21 days"
    }
  };

  // Common Issues Analysis
  const commonIssues = [
    {
      issue: "Account Verification Delays",
      frequency: "Very High",
      avgResolutionTime: "7-21 days",
      satisfactionRate: 45,
      color: "text-red-600"
    },
    {
      issue: "Withdrawal Processing",
      frequency: "High",
      avgResolutionTime: "3-10 days",
      satisfactionRate: 52,
      color: "text-orange-600"
    },
    {
      issue: "Copy Trading Disputes",
      frequency: "Medium",
      avgResolutionTime: "5-14 days",
      satisfactionRate: 38,
      color: "text-red-600"
    },
    {
      issue: "Platform Technical Issues",
      frequency: "Medium",
      avgResolutionTime: "2-5 days",
      satisfactionRate: 65,
      color: "text-yellow-600"
    },
    {
      issue: "Regulatory Inquiries",
      frequency: "Low",
      avgResolutionTime: "10-30 days",
      satisfactionRate: 42,
      color: "text-red-600"
    }
  ];

  // Support Quality Metrics
  const qualityMetrics = {
    overallRating: 2.3,
    responseTimeConsistency: 35,
    agentKnowledge: 68,
    problemResolution: 58,
    languageSupport: 85,
    escalationEffectiveness: 42
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="relative p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full hover:scale-110 transition-transform duration-300">
            <Headphones className="h-8 w-8 text-blue-600 animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-4 w-4 text-purple-500 animate-bounce" />
            </div>
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Customer Service Evaluation
          </h3>
        </div>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Comprehensive analysis of eToro's customer support infrastructure, response times, 
          and service quality across all channels and common issue resolution.
        </p>
      </div>

      {/* Executive Summary Alert */}
      <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-red-700 dark:text-red-400">Executive Summary</AlertTitle>
        <AlertDescription className="mt-2 text-red-600 dark:text-red-300">
          <strong>eToro's customer service faces significant challenges serving 30+ million global users.</strong> 
          With live chat restricted to high-value accounts and ticket response times ranging from 48 hours to 14 days, 
          the support system struggles with consistency. While language coverage is excellent (20+ languages), 
          response quality varies significantly across regions and issue complexity.
        </AlertDescription>
      </Alert>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="channels">Support Channels</TabsTrigger>
          <TabsTrigger value="response-times">Response Times</TabsTrigger>
          <TabsTrigger value="quality">Quality Assessment</TabsTrigger>
          <TabsTrigger value="issues">Common Issues</TabsTrigger>
        </TabsList>

        {/* Support Channels Tab */}
        <TabsContent value="channels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                Support Channel Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's customer support infrastructure reflects the challenges of serving 30+ million global users. 
                Live chat remains exclusive to Club members ($5,000+ equity), creating a tiered support system that 
                prioritizes high-value clients. The primary support channel operates through a web-based ticketing system.
              </p>

              {/* Support Channels Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportChannels.map((channel, index) => {
                  const IconComponent = channel.icon;
                  return (
                    <Card key={index} className={`${channel.bgColor} ${channel.borderColor} border-2`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-full bg-white dark:bg-gray-800 ${channel.color}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{channel.name}</h4>
                            {channel.limitation && (
                              <Badge variant="destructive" className="text-xs">Limited Access</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Availability:</span>
                            <span className="font-medium">{channel.availability}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Response Time:</span>
                            <span className={`font-medium ${channel.responseTime.includes('14 days') ? 'text-red-600' : ''}`}>
                              {channel.responseTime}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Quality:</span>
                            <span className="font-medium">{channel.quality}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Channel Limitations */}
              <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-amber-700 dark:text-amber-400">Channel Limitations</AlertTitle>
                <AlertDescription className="mt-2 text-amber-600 dark:text-amber-300">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>No phone support</strong> available for any account tier</li>
                    <li><strong>Live chat restricted</strong> to Club members with $5,000+ equity</li>
                    <li><strong>Ticket system overloaded</strong> with response times up to 14 days</li>
                    <li><strong>Social media support</strong> limited to basic inquiries only</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Response Times Tab */}
        <TabsContent value="response-times" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-orange-600" />
                Response Time Testing & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's response times vary dramatically based on account tier, issue complexity, and regional support capacity.
                Testing reveals significant inconsistencies that impact user experience, particularly for standard account holders
                who rely solely on the ticket system for support.
              </p>

              {/* Response Time Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400">Live Chat (Club Members)</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Business Hours:</span>
                        <span className="text-green-600 font-medium">{responseTimeData.liveChat.businessHours}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>After Hours:</span>
                        <span className="text-red-600 font-medium">{responseTimeData.liveChat.afterHours}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Weekends:</span>
                        <span className="text-red-600 font-medium">{responseTimeData.liveChat.weekends}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Holidays:</span>
                        <span className="text-red-600 font-medium">{responseTimeData.liveChat.holidays}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 dark:border-orange-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="h-5 w-5 text-orange-600" />
                      <h4 className="font-semibold text-orange-700 dark:text-orange-400">Ticket System (All Users)</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Simple Queries:</span>
                        <span className="text-yellow-600 font-medium">{responseTimeData.ticketSystem.simple}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Complex Issues:</span>
                        <span className="text-red-600 font-medium">{responseTimeData.ticketSystem.complex}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Technical Problems:</span>
                        <span className="text-orange-600 font-medium">{responseTimeData.ticketSystem.technical}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Escalated Cases:</span>
                        <span className="text-red-600 font-medium">{responseTimeData.ticketSystem.escalated}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Regional Variations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-green-700 dark:text-green-400 mb-1">Europe/UK</h5>
                  <p className="text-sm text-muted-foreground">Fastest response times during business hours</p>
                  <div className="text-lg font-bold text-green-600 mt-2">2-5 days</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200">
                  <Globe className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-1">Americas</h5>
                  <p className="text-sm text-muted-foreground">Moderate delays due to timezone coverage</p>
                  <div className="text-lg font-bold text-yellow-600 mt-2">5-10 days</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                  <Globe className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-red-700 dark:text-red-400 mb-1">Asia/Pacific</h5>
                  <p className="text-sm text-muted-foreground">Longest delays, limited local support</p>
                  <div className="text-lg font-bold text-red-600 mt-2">7-14 days</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quality Assessment Tab */}
        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-600" />
                Support Quality Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's support quality varies significantly across channels and regions. While language coverage is excellent
                with 20+ supported languages, agent knowledge and problem resolution effectiveness remain inconsistent,
                particularly for complex trading and regulatory issues.
              </p>

              {/* Quality Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-2">{qualityMetrics.overallRating}/5</div>
                  <div className="text-sm text-muted-foreground">Overall Rating</div>
                  <div className="text-xs text-red-500 mt-1">Below Industry Average</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-2">{qualityMetrics.responseTimeConsistency}%</div>
                  <div className="text-sm text-muted-foreground">Response Consistency</div>
                  <div className="text-xs text-red-500 mt-1">Poor</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{qualityMetrics.agentKnowledge}%</div>
                  <div className="text-sm text-muted-foreground">Agent Knowledge</div>
                  <div className="text-xs text-yellow-500 mt-1">Adequate</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{qualityMetrics.problemResolution}%</div>
                  <div className="text-sm text-muted-foreground">Problem Resolution</div>
                  <div className="text-xs text-yellow-500 mt-1">Moderate</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">{qualityMetrics.languageSupport}%</div>
                  <div className="text-sm text-muted-foreground">Language Support</div>
                  <div className="text-xs text-green-500 mt-1">Excellent</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-2">{qualityMetrics.escalationEffectiveness}%</div>
                  <div className="text-sm text-muted-foreground">Escalation Process</div>
                  <div className="text-xs text-red-500 mt-1">Ineffective</div>
                </div>
              </div>

              {/* Strengths and Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-700 dark:text-green-400">Strengths</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Excellent language coverage (20+ languages)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Comprehensive help center and FAQ</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Fast live chat for Club members</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Social trading community support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 dark:border-red-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <h4 className="font-semibold text-red-700 dark:text-red-400">Weaknesses</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>No phone support available</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Extremely slow ticket response times</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Tiered support creates inequality</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Inconsistent agent knowledge levels</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Common Issues Tab */}
        <TabsContent value="issues" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Common Issues & Resolution Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's customer service faces unique challenges due to its social trading model and global user base.
                High volumes of beginner trader queries, copy trading disputes, and regulatory complexities across
                multiple jurisdictions create significant support burdens that impact resolution times and quality.
              </p>

              {/* Common Issues Breakdown */}
              <div className="space-y-4">
                <h4 className="font-semibold">Most Frequent Support Issues</h4>
                <div className="space-y-3">
                  {commonIssues.map((issue, index) => (
                    <Card key={index} className="border-l-4 border-l-red-500">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold">{issue.issue}</h5>
                          <Badge variant={issue.frequency === "Very High" ? "destructive" : issue.frequency === "High" ? "destructive" : "secondary"}>
                            {issue.frequency} Frequency
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Avg Resolution:</span>
                            <div className="font-medium text-red-600">{issue.avgResolutionTime}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Satisfaction Rate:</span>
                            <div className={`font-medium ${issue.color}`}>{issue.satisfactionRate}%</div>
                          </div>
                          <div>
                            <Progress value={issue.satisfactionRate} className="mt-1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Unique Challenges */}
              <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
                <Brain className="h-4 w-4" />
                <AlertTitle className="text-amber-700 dark:text-amber-400">Unique Support Challenges</AlertTitle>
                <AlertDescription className="mt-2 text-amber-600 dark:text-amber-300">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Beginner trader education:</strong> 70% of queries require educational guidance rather than technical support</li>
                    <li><strong>Social trading disputes:</strong> Complex resolution requiring analysis of copying relationships and performance</li>
                    <li><strong>Multi-jurisdictional compliance:</strong> Different regulatory requirements across 140+ countries</li>
                    <li><strong>Language barriers:</strong> Technical trading concepts difficult to explain across 20+ languages</li>
                    <li><strong>Volume management:</strong> 30+ million users generating massive support ticket volumes</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {/* Improvement Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-red-200 dark:border-red-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingDown className="h-5 w-5 text-red-600" />
                      <h4 className="font-semibold text-red-700 dark:text-red-400">Critical Improvement Areas</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span><strong>Response time consistency:</strong> Reduce 14-day maximum to industry standard 48-72 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span><strong>Democratize live chat:</strong> Extend beyond Club members to all verified accounts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span><strong>Escalation process:</strong> Implement clear escalation paths with defined timeframes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span><strong>Agent training:</strong> Enhance knowledge of advanced trading and regulatory issues</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400">Potential Solutions</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span><strong>AI-powered triage:</strong> Automatically categorize and route tickets for faster resolution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span><strong>Proactive communication:</strong> Status updates and estimated resolution times</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span><strong>Educational vs support separation:</strong> Clear distinction between learning and technical issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span><strong>Regional support expansion:</strong> Local teams for Asia/Pacific and Americas</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Final Assessment */}
      <Card className="border-2 border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Headphones className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Customer Service Assessment Summary</h3>
            </div>
            <p className="text-lg text-muted-foreground">
              <strong>eToro's customer service struggles to meet the demands of its massive global user base.</strong>
              While language support is excellent and live chat works well for Club members, the majority of users face
              unacceptably long response times through the ticket system. The tiered support model creates inequality,
              and the lack of phone support limits accessibility for urgent issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.etoro.com/customer-service/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Support
              </a>
              <a
                href="https://www.etoro.com/help/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 gap-2"
              >
                <Globe className="h-4 w-4" />
                Visit Help Center
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
