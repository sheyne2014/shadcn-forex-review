"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  TrendingUp,
  Globe,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Award,
  Shield,
  BarChart3,
  Lightbulb,
  Target,
  Zap,
  CheckCircle,
  Info,
  ExternalLink,
  ArrowRight,
  Briefcase,
  PieChart,
  LineChart
} from "lucide-react";

import { trackEvent } from "@/lib/analytics/google-analytics";

interface EtoroCompanyBackgroundProps {
  broker?: any;
}

export function EtoroCompanyBackground({ broker }: EtoroCompanyBackgroundProps) {
  const [activeTab, setActiveTab] = useState("history");

  // Company milestones and key data
  const companyMilestones = [
    {
      year: "2007",
      title: "Foundation",
      description: "Founded in Tel Aviv by brothers Yoni and Ronen Assia, along with David Ring",
      icon: Lightbulb,
      color: "text-blue-600"
    },
    {
      year: "2010",
      title: "Social Trading Launch",
      description: "Pioneered the concept of social trading with OpenBook platform",
      icon: Users,
      color: "text-green-600"
    },
    {
      year: "2013",
      title: "Global Expansion",
      description: "Expanded to multiple jurisdictions and launched mobile app",
      icon: Globe,
      color: "text-purple-600"
    },
    {
      year: "2018",
      title: "US Market Entry",
      description: "Launched eToro USA with crypto trading capabilities",
      icon: MapPin,
      color: "text-orange-600"
    },
    {
      year: "2021",
      title: "Public Listing",
      description: "Went public via SPAC merger, valued at $10.4 billion",
      icon: TrendingUp,
      color: "text-red-600"
    },
    {
      year: "2024",
      title: "30M+ Users",
      description: "Reached over 30 million registered users globally",
      icon: Award,
      color: "text-indigo-600"
    }
  ];

  const businessMetrics = [
    {
      label: "Global Users",
      value: "30+ Million",
      growth: "+15% YoY",
      icon: Users,
      color: "text-blue-600"
    },
    {
      label: "Assets Under Management",
      value: "$8.2 Billion",
      growth: "+22% YoY",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      label: "Countries Served",
      value: "100+",
      growth: "Expanding",
      icon: Globe,
      color: "text-purple-600"
    },
    {
      label: "Employees",
      value: "1,500+",
      growth: "+25% YoY",
      icon: Briefcase,
      color: "text-orange-600"
    }
  ];

  const keyExecutives = [
    {
      name: "Yoni Assia",
      position: "CEO & Co-Founder",
      background: "Visionary leader who pioneered social trading concept",
      experience: "17+ years in fintech"
    },
    {
      name: "Ronen Assia",
      position: "Co-Founder",
      background: "Technology expert and product development leader",
      experience: "15+ years in tech"
    },
    {
      name: "Oded Hermoni",
      position: "Chief Investment Officer",
      background: "Former Goldman Sachs executive",
      experience: "20+ years in investment banking"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          Company Background & Business Model
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          From a Tel Aviv startup to a global fintech leader: The remarkable journey of eToro's transformation
          of retail trading through social innovation and technological excellence.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history">Company History</TabsTrigger>
          <TabsTrigger value="business">Business Model</TabsTrigger>
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
          <TabsTrigger value="financials">Financial Position</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          {/* Founding Story */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                The Genesis of Social Trading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                eToro was founded in 2007 in Tel Aviv, Israel, by brothers <strong>Yoni and Ronen Assia</strong> along with
                <strong> David Ring</strong>. The company emerged from a simple yet revolutionary idea: democratize financial
                markets by making trading accessible, transparent, and social. The founders recognized that traditional
                trading was complex, intimidating, and dominated by institutional players, leaving retail investors at a
                significant disadvantage.
              </p>
              <p className="text-base leading-relaxed">
                Initially launched as a financial trading platform, eToro underwent a fundamental transformation in 2010
                when it introduced the world's first social trading network, <strong>OpenBook</strong>. This groundbreaking
                platform allowed users to see, follow, and automatically copy the trades of successful investors,
                effectively turning trading into a social experience similar to Facebook or Twitter.
              </p>
              <p className="text-base leading-relaxed">
                The concept was revolutionary: instead of relying solely on complex charts and analysis, novice traders
                could learn from and mirror the strategies of experienced investors. This "wisdom of crowds" approach
                democratized access to sophisticated trading strategies and created a new paradigm in retail investing.
              </p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Key Milestones & Evolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {companyMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <milestone.icon className={`h-6 w-6 ${milestone.color}`} />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="font-semibold">
                          {milestone.year}
                        </Badge>
                        <h3 className="font-semibold text-lg">{milestone.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          {/* Business Model Overview */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Revolutionary Business Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                eToro operates on a unique <strong>social trading business model</strong> that fundamentally differs from
                traditional brokers. Rather than simply providing trading tools, eToro has created a comprehensive
                social investment ecosystem that combines elements of social media, education, and financial services.
              </p>
              <p className="text-base leading-relaxed">
                The platform generates revenue through multiple streams: <strong>spread markups</strong> on trades,
                <strong>overnight financing fees</strong>, <strong>withdrawal fees</strong>, and <strong>currency conversion charges</strong>.
                Unlike traditional brokers that rely heavily on commissions, eToro's model is built around volume and
                user engagement, aligning their success with user activity and satisfaction.
              </p>
              <p className="text-base leading-relaxed">
                The social aspect creates powerful network effects: as more successful traders join the platform,
                it attracts more followers, which in turn attracts more traders seeking to build their reputation.
                This creates a self-reinforcing cycle that has been key to eToro's explosive growth.
              </p>
            </CardContent>
          </Card>

          {/* Revenue Streams */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Revenue Streams & Monetization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Primary Revenue Sources</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Spread Revenue</span>
                      <Badge variant="default">~65%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Overnight Fees</span>
                      <Badge variant="secondary">~20%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Other Fees</span>
                      <Badge variant="outline">~15%</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Strategic Advantages</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Network effects drive organic user acquisition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Social features increase user engagement and retention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Diversified revenue streams reduce dependency risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Technology platform scales efficiently</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Position */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Market Position & Competitive Advantages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                eToro has established itself as the <strong>undisputed leader in social trading</strong>, commanding
                approximately 60% of the global social trading market. The company's first-mover advantage in social
                trading has created significant barriers to entry and established a strong competitive moat.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {businessMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                    <metric.icon className={`h-8 w-8 mx-auto mb-2 ${metric.color}`} />
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {metric.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leadership" className="space-y-6">
          {/* Leadership Team */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Executive Leadership Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {keyExecutives.map((executive, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{executive.name}</h3>
                      <p className="text-primary font-medium mb-2">{executive.position}</p>
                      <p className="text-muted-foreground text-sm mb-2">{executive.background}</p>
                      <Badge variant="outline" className="text-xs">
                        {executive.experience}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Culture */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Company Culture & Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                eToro's corporate culture is built around <strong>innovation, transparency, and democratization</strong>
                of financial markets. The company maintains a startup mentality despite its size, encouraging
                experimentation and rapid iteration. Their Tel Aviv headquarters serves as the innovation hub,
                while offices in London, Cyprus, and other locations focus on regulatory compliance and market expansion.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Core Values</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Democratize finance for everyone</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Transparency in all operations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Innovation-first mindset</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Community-driven development</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Global Presence</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>Tel Aviv - Global HQ & Innovation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>London - European Operations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>Cyprus - Regulatory Hub</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>New York - US Operations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-6">
          {/* Financial Performance */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Financial Performance & Stability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                As a publicly traded company (NASDAQ: ETRO), eToro maintains strong financial transparency and
                has demonstrated consistent growth across key metrics. The company went public in 2021 through
                a SPAC merger with FinTech Acquisition Corp V, achieving a valuation of <strong>$10.4 billion</strong>.
              </p>
              <p className="text-base leading-relaxed">
                eToro's financial model benefits from high operating leverage, where increased user activity
                directly translates to higher revenues without proportional increases in costs. The platform's
                technology infrastructure scales efficiently, allowing the company to serve millions of users
                with relatively modest operational expenses.
              </p>
            </CardContent>
          </Card>

          {/* Key Financial Metrics */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Key Financial Indicators (2023)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">$730M</div>
                  <div className="text-sm text-green-600">Annual Revenue</div>
                  <Badge variant="outline" className="mt-2 text-xs border-green-300">
                    +18% YoY
                  </Badge>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">30M+</div>
                  <div className="text-sm text-blue-600">Registered Users</div>
                  <Badge variant="outline" className="mt-2 text-xs border-blue-300">
                    +15% YoY
                  </Badge>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <PieChart className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">$8.2B</div>
                  <div className="text-sm text-purple-600">Assets Under Management</div>
                  <Badge variant="outline" className="mt-2 text-xs border-purple-300">
                    +22% YoY
                  </Badge>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">100+</div>
                  <div className="text-sm text-orange-600">Countries Served</div>
                  <Badge variant="outline" className="mt-2 text-xs border-orange-300">
                    Expanding
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Outlook */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Strategic Outlook & Growth Initiatives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                eToro's strategic roadmap focuses on <strong>geographic expansion</strong>, <strong>product diversification</strong>,
                and <strong>technological innovation</strong>. The company is actively pursuing licenses in new jurisdictions
                while expanding its product offerings beyond traditional trading to include cryptocurrency services,
                investment portfolios, and financial education.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Growth Drivers</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Expansion into emerging markets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Enhanced cryptocurrency offerings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>AI-powered trading insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Institutional client services</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Investment Focus</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Technology infrastructure scaling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Regulatory compliance expansion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>User experience enhancement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Strategic partnerships & acquisitions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
