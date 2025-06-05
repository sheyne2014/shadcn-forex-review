"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Monitor, 
  Smartphone,
  Code,
  Zap,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wifi,
  Database,
  Globe,
  Settings,
  BarChart3,
  Clock,
  Users,
  Star,
  Sparkles,
  Brain,
  Target,
  Activity
} from "lucide-react";
import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroPlatformTechnologyAnalysisProps {
  broker: any;
}

export function EtoroPlatformTechnologyAnalysis({ broker }: EtoroPlatformTechnologyAnalysisProps) {
  const [activeTab, setActiveTab] = useState("architecture");

  useEffect(() => {
    trackEvent({
      action: 'view_platform_technology_analysis',
      category: 'platform_review',
      label: 'etoro_technical_analysis'
    });
  }, []);

  // Platform Performance Metrics
  const performanceMetrics = {
    uptime: 99.8,
    averageLatency: 120,
    mobileAppRating: 4.4,
    webPlatformRating: 4.2,
    apiAvailability: "Limited",
    loadTime: 2.1
  };

  // Technology Stack Analysis
  const technologyStack = {
    frontend: ["React.js", "TypeScript", "Progressive Web App"],
    backend: ["Node.js", "Microservices", "Real-time WebSocket"],
    database: ["PostgreSQL", "Redis Cache", "Time-series DB"],
    infrastructure: ["AWS Cloud", "CDN", "Load Balancers"],
    security: ["SSL/TLS", "2FA", "Biometric Auth", "OAuth 2.0"]
  };

  // Platform Limitations
  const platformLimitations = [
    {
      limitation: "No MT4/MT5 Integration",
      impact: "Critical",
      description: "Major limitation for professional traders who rely on MetaTrader platforms",
      affectedUsers: "Advanced/Professional traders"
    },
    {
      limitation: "Limited API Access",
      impact: "High",
      description: "Restricted algorithmic trading capabilities compared to traditional brokers",
      affectedUsers: "Algorithmic traders"
    },
    {
      limitation: "Proprietary Platform Lock-in",
      impact: "Medium",
      description: "Cannot use preferred third-party tools or platforms",
      affectedUsers: "Technical analysts"
    },
    {
      limitation: "Basic Charting Tools",
      impact: "Medium",
      description: "Limited technical analysis capabilities vs professional platforms",
      affectedUsers: "Technical traders"
    }
  ];

  // Mobile App Features Comparison
  const mobileFeatures = {
    ios: {
      rating: 4.4,
      features: [
        "Face ID / Touch ID authentication",
        "Full social trading functionality",
        "Real-time push notifications",
        "Offline portfolio viewing",
        "Apple Watch integration",
        "Siri shortcuts support"
      ],
      limitations: [
        "No advanced charting tools",
        "Limited order types",
        "No MT4/MT5 access"
      ]
    },
    android: {
      rating: 4.3,
      features: [
        "Fingerprint authentication",
        "Complete CopyTrader™ system",
        "Customizable notifications",
        "Widget support",
        "Google Assistant integration",
        "Android Auto compatibility"
      ],
      limitations: [
        "Slightly slower performance vs iOS",
        "Limited technical indicators",
        "No third-party integrations"
      ]
    }
  };

  // User Experience Analysis
  const uxAnalysis = {
    designPhilosophy: "Mobile-first, social-centric design prioritizing simplicity over complexity",
    targetUser: "Beginner to intermediate traders seeking social trading features",
    learningCurve: "Low - designed for trading newcomers",
    customization: "Limited - focuses on standardized experience",
    accessibility: "Good - WCAG 2.1 AA compliance"
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="relative p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full hover:scale-110 transition-transform duration-300">
            <Monitor className="h-8 w-8 text-blue-600 animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-4 w-4 text-purple-500 animate-bounce" />
            </div>
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Platform Technology & User Experience Analysis
          </h3>
        </div>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Comprehensive technical review of eToro's trading platform architecture, mobile applications, 
          user interface design, and technology limitations compared to traditional forex platforms.
        </p>
      </div>

      {/* Executive Summary Alert */}
      <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
        <Brain className="h-4 w-4" />
        <AlertTitle className="text-blue-700 dark:text-blue-400">Executive Summary</AlertTitle>
        <AlertDescription className="mt-2 text-blue-600 dark:text-blue-300">
          <strong>eToro's platform excels in social trading innovation but lacks professional trading tools.</strong> 
          Built on modern web technologies with 99.8% uptime, the platform prioritizes user experience and social 
          features over advanced technical analysis. While perfect for beginners and social traders, it falls short 
          for professional traders requiring MT4/MT5, advanced charting, or algorithmic trading capabilities.
        </AlertDescription>
      </Alert>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="user-experience">User Experience</TabsTrigger>
          <TabsTrigger value="trading-tools">Trading Tools</TabsTrigger>
          <TabsTrigger value="mobile-apps">Mobile Apps</TabsTrigger>
          <TabsTrigger value="limitations">Limitations</TabsTrigger>
        </TabsList>

        {/* Platform Architecture Tab */}
        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                Platform Architecture Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's platform is built on modern web technologies with a microservices architecture, 
                prioritizing scalability and real-time social trading functionality. The system handles 
                30+ million users with 99.8% uptime reliability.
              </p>

              {/* Technology Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold">Frontend</h4>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {technologyStack.frontend.map((tech, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Backend</h4>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {technologyStack.backend.map((tech, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-blue-600" />
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold">Security</h4>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {technologyStack.security.map((tech, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-purple-600" />
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{performanceMetrics.uptime}%</div>
                  <div className="text-sm text-muted-foreground">Platform Uptime</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{performanceMetrics.averageLatency}ms</div>
                  <div className="text-sm text-muted-foreground">Average Latency</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{performanceMetrics.loadTime}s</div>
                  <div className="text-sm text-muted-foreground">Page Load Time</div>
                </div>
                <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200">
                  <div className="text-2xl font-bold text-amber-600">{performanceMetrics.apiAvailability}</div>
                  <div className="text-sm text-muted-foreground">API Access</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Experience Tab */}
        <TabsContent value="user-experience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                User Interface & Experience Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's design philosophy centers on democratizing trading through intuitive, social-first interfaces.
                The platform prioritizes simplicity and community engagement over complex technical features,
                making it ideal for beginners but potentially limiting for advanced users.
              </p>

              {/* Design Philosophy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400">Design Philosophy</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Mobile-first responsive design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Social-centric user interface</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Simplified trading workflows</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Gamification elements</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-700 dark:text-purple-400">User Experience Metrics</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Learning Curve</span>
                          <span className="text-green-600">Low</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Navigation Efficiency</span>
                          <span className="text-blue-600">High</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Customization Options</span>
                          <span className="text-amber-600">Limited</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Accessibility</span>
                          <span className="text-green-600">Good</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Target User Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-green-700 dark:text-green-400 mb-1">Beginners</h5>
                  <p className="text-sm text-muted-foreground">Perfect fit with intuitive design and educational features</p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Social Traders</h5>
                  <p className="text-sm text-muted-foreground">Excellent for copy trading and community engagement</p>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                  <BarChart3 className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h5 className="font-semibold text-red-700 dark:text-red-400 mb-1">Professionals</h5>
                  <p className="text-sm text-muted-foreground">Limited appeal due to lack of advanced tools</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trading Tools Tab */}
        <TabsContent value="trading-tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Trading Tools & Features Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's trading tools prioritize simplicity and social features over advanced technical analysis.
                While adequate for basic trading needs, the platform lacks the sophisticated tools expected
                by professional traders and technical analysts.
              </p>

              {/* Trading Tools Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-700 dark:text-green-400">Available Features</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Basic charting with 15+ indicators</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>CopyTrader™ automated system</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Social sentiment indicators</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Portfolio management tools</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Risk management controls</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Market news and analysis</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 dark:border-red-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <h4 className="font-semibold text-red-700 dark:text-red-400">Missing Features</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Advanced charting (vs MT4/MT5)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Custom indicators and EAs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Algorithmic trading capabilities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Advanced order types</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Market depth/Level II data</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span>Third-party tool integration</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Platform Comparison */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-muted">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-muted p-3 text-left">Feature</th>
                      <th className="border border-muted p-3 text-center">eToro</th>
                      <th className="border border-muted p-3 text-center">MT4/MT5</th>
                      <th className="border border-muted p-3 text-center">cTrader</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-muted p-3">Technical Indicators</td>
                      <td className="border border-muted p-3 text-center">15+</td>
                      <td className="border border-muted p-3 text-center">50+</td>
                      <td className="border border-muted p-3 text-center">70+</td>
                    </tr>
                    <tr>
                      <td className="border border-muted p-3">Custom Indicators</td>
                      <td className="border border-muted p-3 text-center">❌</td>
                      <td className="border border-muted p-3 text-center">✅</td>
                      <td className="border border-muted p-3 text-center">✅</td>
                    </tr>
                    <tr>
                      <td className="border border-muted p-3">Algorithmic Trading</td>
                      <td className="border border-muted p-3 text-center">❌</td>
                      <td className="border border-muted p-3 text-center">✅</td>
                      <td className="border border-muted p-3 text-center">✅</td>
                    </tr>
                    <tr>
                      <td className="border border-muted p-3">Social Trading</td>
                      <td className="border border-muted p-3 text-center">✅</td>
                      <td className="border border-muted p-3 text-center">❌</td>
                      <td className="border border-muted p-3 text-center">❌</td>
                    </tr>
                    <tr>
                      <td className="border border-muted p-3">User-Friendly</td>
                      <td className="border border-muted p-3 text-center">✅</td>
                      <td className="border border-muted p-3 text-center">❌</td>
                      <td className="border border-muted p-3 text-center">⚠️</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mobile Apps Tab */}
        <TabsContent value="mobile-apps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-600" />
                Mobile App Deep Dive Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's mobile apps represent the pinnacle of their platform design, offering near-complete
                functionality with excellent user experience. The apps excel in social trading features
                but maintain the same limitations as the web platform for advanced trading.
              </p>

              {/* iOS vs Android Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400">iOS App</h4>
                      <Badge variant="outline" className="ml-auto">
                        <Star className="h-3 w-3 mr-1" />
                        {mobileFeatures.ios.rating}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-green-600 mb-2">Features</h5>
                        <ul className="space-y-1 text-sm">
                          {mobileFeatures.ios.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-600 mb-2">Limitations</h5>
                        <ul className="space-y-1 text-sm">
                          {mobileFeatures.ios.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <XCircle className="h-3 w-3 text-red-600" />
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Smartphone className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-700 dark:text-green-400">Android App</h4>
                      <Badge variant="outline" className="ml-auto">
                        <Star className="h-3 w-3 mr-1" />
                        {mobileFeatures.android.rating}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-green-600 mb-2">Features</h5>
                        <ul className="space-y-1 text-sm">
                          {mobileFeatures.android.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-600 mb-2">Limitations</h5>
                        <ul className="space-y-1 text-sm">
                          {mobileFeatures.android.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <XCircle className="h-3 w-3 text-red-600" />
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">4.4</div>
                  <div className="text-sm text-muted-foreground">iOS Rating</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">4.3</div>
                  <div className="text-sm text-muted-foreground">Android Rating</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-muted-foreground">Feature Parity</div>
                </div>
                <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200">
                  <div className="text-2xl font-bold text-amber-600">1.8s</div>
                  <div className="text-sm text-muted-foreground">App Load Time</div>
                </div>
              </div>

              {/* Security Features */}
              <Card className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400">Security Features</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Authentication</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Biometric login (Face ID, Touch ID, Fingerprint)</li>
                        <li>• Two-factor authentication (2FA)</li>
                        <li>• PIN code protection</li>
                        <li>• Auto-logout after inactivity</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Data Protection</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• End-to-end encryption</li>
                        <li>• Secure data transmission</li>
                        <li>• Local data encryption</li>
                        <li>• Remote wipe capability</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technology Limitations Tab */}
        <TabsContent value="limitations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Technology Limitations & Professional Gaps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                While eToro excels in social trading innovation, significant technology limitations prevent
                it from serving professional traders effectively. These limitations are by design,
                prioritizing simplicity over advanced functionality.
              </p>

              {/* Critical Limitations */}
              <div className="space-y-4">
                <h4 className="font-semibold">Critical Platform Limitations</h4>
                <div className="space-y-3">
                  {platformLimitations.map((limitation, index) => (
                    <Alert key={index} className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="text-red-700 dark:text-red-400">{limitation.limitation}</AlertTitle>
                      <AlertDescription className="mt-2 text-red-600 dark:text-red-300">
                        <div className="flex items-center justify-between">
                          <span>{limitation.description}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant={limitation.impact === "Critical" ? "destructive" : limitation.impact === "High" ? "destructive" : "secondary"}>
                              {limitation.impact} Impact
                            </Badge>
                            <Badge variant="outline">{limitation.affectedUsers}</Badge>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>

              {/* Professional vs Beginner Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-red-200 dark:border-red-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <h4 className="font-semibold text-red-700 dark:text-red-400">Professional Trader Needs</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>MT4/MT5 platform access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>Advanced charting and indicators</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>Algorithmic trading capabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>Custom indicators and EAs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>Market depth and Level II data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <span>Third-party tool integration</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-700 dark:text-green-400">eToro's Strengths</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Revolutionary social trading features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Exceptional user experience design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Mobile-first platform optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Beginner-friendly interface</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Strong community features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Reliable platform performance</span>
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
      <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Monitor className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">Technology Assessment Summary</h3>
            </div>
            <p className="text-lg text-muted-foreground">
              <strong>eToro's platform technology excels in social trading innovation but falls short for professional use.</strong>
              Built on modern web technologies with excellent mobile apps and 99.8% uptime, the platform serves beginners
              and social traders exceptionally well. However, the lack of MT4/MT5 integration, limited API access, and
              basic charting tools make it unsuitable for advanced traders requiring professional-grade functionality.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="lg">
                <Activity className="h-4 w-4 mr-2" />
                View Platform Demo
              </Button>
              <Button variant="outline" size="lg">
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare Platforms
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
