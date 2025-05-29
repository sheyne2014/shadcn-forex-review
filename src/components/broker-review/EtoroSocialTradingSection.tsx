"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Copy, 
  TrendingUp, 
  Star, 
  Shield, 
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  Award,
  Target,
  DollarSign,
  Clock,
  CheckCircle,
  Info
} from "lucide-react";

interface EtoroSocialTradingSectionProps {
  broker: any;
}

export function EtoroSocialTradingSection({ broker }: EtoroSocialTradingSectionProps) {
  const popularInvestors = [
    {
      name: "JeppeKirkBonde",
      return: "+127.45%",
      risk: 4,
      copiers: "12,847",
      assets: "Stocks, Crypto",
      badge: "Popular Investor"
    },
    {
      name: "Olivier_Danvel",
      return: "+89.23%",
      risk: 6,
      copiers: "8,932",
      assets: "Forex, Commodities",
      badge: "Champion"
    },
    {
      name: "Wesl3y",
      return: "+156.78%",
      risk: 7,
      copiers: "15,234",
      assets: "Tech Stocks",
      badge: "Popular Investor"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Social Trading Revolution</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          eToro's social trading platform transforms investing by allowing you to follow, learn from, and automatically copy 
          the trades of successful investors from around the world.
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">30M+</div>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">140+</div>
            <p className="text-sm text-muted-foreground">Countries</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">$1B+</div>
            <p className="text-sm text-muted-foreground">Copied Monthly</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </CardContent>
        </Card>
      </div>

      {/* Social Trading Features */}
      <Tabs defaultValue="copytrader" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="copytrader">CopyTrader</TabsTrigger>
          <TabsTrigger value="popular">Popular Investors</TabsTrigger>
          <TabsTrigger value="copyportfolios">CopyPortfolios</TabsTrigger>
          <TabsTrigger value="social-feed">Social Feed</TabsTrigger>
        </TabsList>

        {/* CopyTrader Tab */}
        <TabsContent value="copytrader" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Copy className="h-5 w-5 mr-2 text-primary" />
                CopyTrader Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's flagship CopyTrader feature allows you to automatically replicate the trades of successful investors 
                in real-time, proportionally to your investment amount.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    How It Works
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary mt-0.5">1</div>
                      <span>Browse and analyze Popular Investors' performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary mt-0.5">2</div>
                      <span>Set your copy amount ($200 minimum)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary mt-0.5">3</div>
                      <span>All future trades are automatically copied</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary mt-0.5">4</div>
                      <span>Monitor performance and adjust as needed</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center">
                    <Target className="h-4 w-4 mr-2 text-blue-600" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>No trading experience required</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Transparent performance history</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Risk management tools included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Stop copying anytime</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Popular Investors Tab */}
        <TabsContent value="popular" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                Popular Investor Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's Popular Investor Program rewards successful traders who share their strategies and attract copiers, 
                creating a win-win ecosystem for both investors and followers.
              </p>

              <div className="space-y-4">
                {popularInvestors.map((investor, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold">
                            {investor.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{investor.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {investor.badge}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{investor.assets}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-green-600">{investor.return}</div>
                            <div className="text-xs text-muted-foreground">12M Return</div>
                          </div>
                          <div>
                            <div className="flex items-center justify-center gap-1">
                              <div className="text-lg font-bold">{investor.risk}</div>
                              <div className="flex">
                                {[...Array(10)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1 h-3 mx-0.5 ${
                                      i < investor.risk ? 'bg-red-500' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">Risk Score</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">{investor.copiers}</div>
                            <div className="text-xs text-muted-foreground">Copiers</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CopyPortfolios Tab */}
        <TabsContent value="copyportfolios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                CopyPortfolios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                CopyPortfolios are thematic investment strategies that bundle together top-performing traders, 
                popular stocks, or market trends under a single investment product.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-4">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold">Top Trader</h4>
                      <p className="text-sm text-muted-foreground">
                        Bundles of the best-performing Popular Investors
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 dark:border-green-800">
                  <CardContent className="pt-4">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold">Market</h4>
                      <p className="text-sm text-muted-foreground">
                        Themed portfolios based on market trends and sectors
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-800">
                  <CardContent className="pt-4">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                        <BarChart3 className="h-6 w-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold">Partner</h4>
                      <p className="text-sm text-muted-foreground">
                        Professionally managed portfolios by eToro partners
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Feed Tab */}
        <TabsContent value="social-feed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                Social Trading Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                eToro's social feed creates a Twitter-like experience for trading, where users share insights, 
                discuss market trends, and learn from each other's experiences.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Feed Features</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Real-time trading updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Market discussions and insights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Like and comment on posts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Follow favorite traders</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Learning Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Learn from experienced traders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Stay updated on market sentiment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Discover new trading opportunities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Build trading confidence</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Risk Warning */}
      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-semibold text-amber-800 dark:text-amber-400">Important Risk Disclosure</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Past performance is not an indication of future results. Copy trading involves risk. 
                The value of your investments may go up or down. Your capital is at risk. 
                eToro (Europe) Ltd. is regulated by the Cyprus Securities and Exchange Commission.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
