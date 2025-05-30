import { Metadata } from "next";
import Link from "next/link";
import { getBrokers } from "@/lib/supabase/broker-client";
import { TwoBrokerComparisonToolWrapper } from "@/components/tools/TwoBrokerComparisonToolWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Compare Two Brokers Side-by-Side | Trading Platform Comparison Tool",
  description: "Compare exactly 2 trading brokers side by side. Select any two brokers to analyze fees, features, platforms, regulation, and more to find the best trading platform for your needs.",
  keywords: [
    "broker comparison",
    "compare two brokers",
    "trading platform comparison",
    "broker vs broker",
    "side by side comparison",
    "forex broker comparison",
    "stock broker comparison",
    "crypto broker comparison"
  ],
};

async function getBrokerComparisonData() {
  try {
    // Fetch all brokers from the database
    const { data: brokers = [], error: brokersError } = await getBrokers({
      limit: 200, // Get more brokers for selection
      sort_by: "rating",
      sort_order: "desc"
    });

    if (brokersError) {
      console.error("Error fetching brokers:", brokersError);
      return { brokers: [] };
    }

    // Transform broker data for the comparison tool
    const formattedBrokers = brokers?.map((broker) => ({
      id: broker.id,
      name: broker.name,
      slug: broker.slug || broker.name.toLowerCase().replace(/\s+/g, '-'),
      logo_url: broker.logo_url,
      rating: broker.rating || 0,
      min_deposit: broker.min_deposit,
      trading_fee: broker.trading_fee,
      regulations: broker.regulations,
      country: broker.country,
      supported_assets: broker.supported_assets,
      website_url: broker.website_url,
      trading_platforms: broker.trading_platforms,
    })) || [];

    return {
      brokers: formattedBrokers,
    };
  } catch (error) {
    console.error("Error fetching brokers:", error);
    return {
      brokers: [],
    };
  }
}

export default async function CompareTwoBrokersPage() {
  const { brokers } = await getBrokerComparisonData();

  return (
    <div className="container mx-auto px-4 py-10 md:py-12 compare-two-page">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-1">/</span>
          <Link href="/tools" className="hover:text-foreground transition-colors">
            Tools
          </Link>
          <span className="mx-1">/</span>
          <span className="text-foreground font-medium">Compare Two Brokers</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Compare Two Brokers Side-by-Side
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select any two trading brokers to compare their features, fees, platforms, and regulations.
        </p>
      </div>

      {/* How It Works Section */}
      <Card className="bg-card mb-8 border shadow-sm">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Badge className="h-8 w-8 rounded-full text-lg font-semibold">1</Badge>
              </div>
              <h3 className="font-medium mb-2">Select First Broker</h3>
              <p className="text-sm text-muted-foreground">Choose your primary broker from our database</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Badge className="h-8 w-8 rounded-full text-lg font-semibold">2</Badge>
              </div>
              <h3 className="font-medium mb-2">Select Second Broker</h3>
              <p className="text-sm text-muted-foreground">Choose another broker to compare with</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Badge className="h-8 w-8 rounded-full text-lg font-semibold">3</Badge>
              </div>
              <h3 className="font-medium mb-2">Compare Key Metrics</h3>
              <p className="text-sm text-muted-foreground">Review detailed comparison of trading costs and features</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Badge className="h-8 w-8 rounded-full text-lg font-semibold">4</Badge>
              </div>
              <h3 className="font-medium mb-2">Make Informed Decision</h3>
              <p className="text-sm text-muted-foreground">Choose the broker that best fits your trading needs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Tool */}
      <div className="mb-12">
        <TwoBrokerComparisonToolWrapper brokers={brokers} />
      </div>

      {/* Key Comparison Factors */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Key Comparison Factors</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border shadow-sm h-full">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <h3 className="font-semibold mb-2">Trading Costs</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4 mt-1">
                  <li>Spreads and commissions</li>
                  <li>Overnight financing</li>
                  <li>Deposit/withdrawal fees</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border shadow-sm h-full">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <h3 className="font-semibold mb-2">Regulation & Safety</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4 mt-1">
                  <li>Regulatory oversight</li>
                  <li>Client fund protection</li>
                  <li>Company reputation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border shadow-sm h-full">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <h3 className="font-semibold mb-2">Trading Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4 mt-1">
                  <li>Available markets</li>
                  <li>Leverage options</li>
                  <li>Order types & execution</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border shadow-sm h-full">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <h3 className="font-semibold mb-2">Platform & Support</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4 mt-1">
                  <li>Trading platforms</li>
                  <li>Mobile app functionality</li>
                  <li>Customer support</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>For the best trading experience, consider your specific trading style, capital requirements, and risk tolerance.</p>
          <p>Always prioritize regulated brokers with strong fund protection measures.</p>
        </div>
      </div>
    </div>
  );
}
