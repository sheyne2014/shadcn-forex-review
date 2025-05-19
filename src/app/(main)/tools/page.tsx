import { Metadata } from "next";
import { PipCalculator } from "@/components/calculators/PipCalculator";
import { Calculator, ArrowRight, BarChart, Percent, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forex Trading Calculators & Tools",
  description: "Use our free forex trading calculators and tools to improve your trading decisions. Calculate pip values, position sizing, profit/loss, and more.",
};

export default function ToolsPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-10 text-center">
        <Badge variant="outline" className="mb-3">Trading Tools</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Forex Trading Calculators
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Our free forex trading calculators help you make more informed trading decisions. 
          Calculate pip values, position sizing, profit/loss, and risk management metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <section className="mb-10">
          <PipCalculator />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calculator className="mr-2 h-5 w-5 text-primary" />
            Other Trading Calculators
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* These are placeholders for future calculators */}
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-primary" />
                  Position Size Calculator
                </CardTitle>
                <CardDescription>
                  Calculate the optimal position size based on your risk tolerance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Determine the right position size for your trades based on account size, 
                  risk percentage, and stop loss distance.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="secondary">Coming Soon</Badge>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Margin Calculator
                </CardTitle>
                <CardDescription>
                  Calculate required margin for your forex positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find out how much margin is required to open and maintain positions 
                  based on leverage and position size.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="secondary">Coming Soon</Badge>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Profit/Loss Calculator
                </CardTitle>
                <CardDescription>
                  Calculate potential profits or losses before trading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Estimate your potential profits or losses based on entry price, 
                  exit price, and position size.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="secondary">Coming Soon</Badge>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-10">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Compare Broker Fees and Spreads</CardTitle>
              <CardDescription>
                Use our broker comparison tool to find the lowest trading costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Trading costs can significantly impact your profitability. Our broker comparison 
                tool helps you find brokers with the lowest spreads, commissions, and fees.
              </p>
              <Button asChild>
                <Link href="/compare">
                  Compare Brokers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Why Use Trading Calculators?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
                <p className="text-muted-foreground">
                  Properly calculate position sizes and pip values to ensure you're never 
                  risking more than your predetermined risk tolerance per trade.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Trading Strategy</h3>
                <p className="text-muted-foreground">
                  Use calculators to evaluate potential trade setups, determine optimal 
                  entry and exit points, and analyze risk-to-reward ratios.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 