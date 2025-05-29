"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Info,
  BarChart3,
  Zap,
  Globe,
  CreditCard,
  Smartphone
} from "lucide-react";

interface EtoroTradingConditionsProps {
  broker: any;
}

export function EtoroTradingConditions({ broker }: EtoroTradingConditionsProps) {
  const tradingConditions = {
    forex: {
      spreads: "1.0 pips",
      leverage: "1:30",
      commission: "No commission",
      minTrade: "$25",
      execution: "Market execution"
    },
    stocks: {
      spreads: "0.09%",
      leverage: "1:5",
      commission: "0% commission",
      minTrade: "$10",
      execution: "Real stocks"
    },
    crypto: {
      spreads: "0.75%",
      leverage: "1:2",
      commission: "No commission",
      minTrade: "$25",
      execution: "CFD trading"
    }
  };

  const fees = [
    { type: "Deposit", amount: "Free", note: "All deposit methods" },
    { type: "Withdrawal", amount: "$5", note: "Per withdrawal" },
    { type: "Inactivity", amount: "$10/month", note: "After 12 months" },
    { type: "Currency conversion", amount: "50 pips", note: "Non-USD deposits" },
    { type: "Weekend holding", amount: "Variable", note: "Crypto positions only" }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Trading Conditions</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          eToro's trading conditions are designed for retail traders with a focus on simplicity and accessibility 
          rather than institutional-grade execution.
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center border-primary/20">
          <CardContent className="pt-6">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">$50</div>
            <p className="text-sm text-muted-foreground">Min Deposit</p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-primary/20">
          <CardContent className="pt-6">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">1:30</div>
            <p className="text-sm text-muted-foreground">Max Leverage</p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-primary/20">
          <CardContent className="pt-6">
            <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">1.0</div>
            <p className="text-sm text-muted-foreground">Forex Spreads</p>
          </CardContent>
        </Card>
        
        <Card className="text-center border-primary/20">
          <CardContent className="pt-6">
            <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">0%</div>
            <p className="text-sm text-muted-foreground">Stock Commission</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Trading Conditions */}
      <Tabs defaultValue="forex" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
        </TabsList>

        {/* Forex Tab */}
        <TabsContent value="forex" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                Forex Trading Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Spreads from</span>
                    <Badge variant="secondary">{tradingConditions.forex.spreads}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Max Leverage</span>
                    <Badge variant="secondary">{tradingConditions.forex.leverage}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Commission</span>
                    <Badge variant="secondary">{tradingConditions.forex.commission}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Min Trade Size</span>
                    <Badge variant="secondary">{tradingConditions.forex.minTrade}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Execution</span>
                    <Badge variant="secondary">{tradingConditions.forex.execution}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Trading Hours</span>
                    <Badge variant="secondary">24/5</Badge>
                  </div>
                </div>
              </div>

              {/* Forex Spread Comparison */}
              <div className="space-y-4">
                <h4 className="font-semibold">Major Currency Pairs</h4>
                <div className="space-y-3">
                  {[
                    { pair: "EUR/USD", spread: "1.0 pips", rating: 6 },
                    { pair: "GBP/USD", spread: "2.0 pips", rating: 5 },
                    { pair: "USD/JPY", spread: "1.0 pips", rating: 6 },
                    { pair: "AUD/USD", spread: "1.5 pips", rating: 6 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{item.pair}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">{item.spread}</span>
                        <div className="flex items-center gap-1">
                          <Progress value={item.rating * 10} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground">{item.rating}/10</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stocks Tab */}
        <TabsContent value="stocks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Stock Trading Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-700 dark:text-green-400">Zero Commission Stock Trading</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-300">
                  eToro offers commission-free stock trading on major exchanges including NYSE, NASDAQ, and European markets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Real Stocks</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Own the underlying asset</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Receive dividends</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Voting rights (where applicable)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">No leverage on real stocks</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Stock CFDs</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Leverage up to 1:5</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Short selling available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Overnight fees apply</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">No ownership rights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Crypto Tab */}
        <TabsContent value="crypto" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                Cryptocurrency Trading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <span className="font-semibold text-amber-700 dark:text-amber-400">CFD Trading Only</span>
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-300">
                  eToro offers cryptocurrency trading through CFDs only. You don't own the underlying crypto assets.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Popular Cryptocurrencies</h4>
                <div className="space-y-3">
                  {[
                    { crypto: "Bitcoin (BTC)", spread: "0.75%", available: "24/7" },
                    { crypto: "Ethereum (ETH)", spread: "1.90%", available: "24/7" },
                    { crypto: "Ripple (XRP)", spread: "2.45%", available: "24/7" },
                    { crypto: "Litecoin (LTC)", spread: "1.90%", available: "24/7" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{item.crypto}</span>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{item.spread}</Badge>
                        <Badge variant="secondary">{item.available}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fees Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-primary" />
            Fee Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fees.map((fee, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <span className="font-medium">{fee.type}</span>
                  <p className="text-sm text-muted-foreground">{fee.note}</p>
                </div>
                <Badge variant={fee.amount === "Free" ? "secondary" : "outline"} className="text-sm">
                  {fee.amount}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Platform Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2 text-primary" />
            Platform Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Strengths</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Intuitive user interface</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Mobile-first design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Social trading integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">One-click trading</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-amber-600">Limitations</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm">Limited charting tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm">No MT4/MT5 support</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm">Basic technical analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm">No algorithmic trading</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
