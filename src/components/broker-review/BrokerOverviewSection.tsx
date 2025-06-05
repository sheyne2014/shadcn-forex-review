import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface BrokerOverviewSectionProps {
  broker: any;
  brokerAnalysis?: {
    overview: string;
    strengths: string;
    considerations: string;
    suitableFor: string[];
    notSuitableFor: string[];
  };
  prosCons?: {
    pros: string[];
    cons: string[];
  };
  headline?: string;
}

export function BrokerOverviewSection({
  broker,
  prosCons = {
    pros: [],
    cons: []
  },
  headline
}: BrokerOverviewSectionProps) {
  // Safely handle missing broker data
  if (!broker || typeof broker !== 'object') {
    return (
      <Card className="p-6">
        <div className="flex items-center text-amber-600 gap-2">
          <AlertTriangle className="h-5 w-5" />
          <p>Unable to display overview. Broker information is missing or invalid.</p>
        </div>
      </Card>
    );
  }

  // Default pros and cons if not provided
  const pros = prosCons.pros.length > 0 ? prosCons.pros : [
    "Regulated by top-tier authorities",
    "Wide range of trading instruments",
    "Advanced trading platforms"
  ];

  const cons = prosCons.cons.length > 0 ? prosCons.cons : [
    "Limited educational resources",
    "Customer support can be slow",
    "Higher fees for some instruments"
  ];



  return (
    <div className="space-y-8">
      {/* Main Overview */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          {headline || `${broker.name} Overview`}
        </h2>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg mb-4">
            {broker.description || `${broker.name} is a forex broker offering a range of tradable instruments, competitive pricing, and modern trading platforms. This review provides a detailed look at their services, platforms, and trading conditions to help you determine if they're the right broker for your needs.`}
          </p>
          {broker.summary && (
            <div className="mt-4 mb-6">
              {broker.summary.split('\n').map((paragraph: string, i: number) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros Card */}
        <Card>
          <CardHeader className="pb-3 sm:pb-3 p-4 sm:p-6">
            <CardTitle className="flex items-center text-green-600 text-base sm:text-lg">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Advantages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <ul className="space-y-2">
              {pros.map((pro: string, i: number) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Cons Card */}
        <Card>
          <CardHeader className="pb-3 sm:pb-3 p-4 sm:p-6">
            <CardTitle className="flex items-center text-red-600 text-base sm:text-lg">
              <XCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Disadvantages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <ul className="space-y-2">
              {cons.map((con: string, i: number) => (
                <li key={i} className="flex items-start">
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Key Information Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" /> Key Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="regulation">
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 rounded-none border-b">
              <TabsTrigger value="regulation" className="text-xs sm:text-sm">Regulation</TabsTrigger>
              <TabsTrigger value="accounts" className="text-xs sm:text-sm">Account Types</TabsTrigger>
              <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
              <TabsTrigger value="support" className="text-xs sm:text-sm">Support</TabsTrigger>
            </TabsList>

            {/* Regulation Tab */}
            <TabsContent value="regulation" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Regulatory Information</h3>
                <p>
                  {broker.regulations
                    ? `${broker.name} is regulated by ${broker.regulations}, ensuring client fund safety and adherence to financial standards.`
                    : `${broker.name}'s regulatory information is not fully available. We recommend checking the broker's website for up-to-date regulatory details.`}
                </p>

                {broker.regulations && (
                  <div className="flex flex-col space-y-2 mt-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <span>Segregated client funds</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <span>Negative balance protection</span>
                    </div>
                    {broker.investor_compensation && (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        <span>Investor compensation: {broker.investor_compensation}</span>
                      </div>
                    )}
                  </div>
                )}

                {broker.regulations_details && (
                  <div className="mt-4">
                    <p>{broker.regulations_details}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Account Types Tab */}
            <TabsContent value="accounts" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Types</h3>
                {broker.account_types ? (
                  <div>
                    <p className="mb-4">{broker.name} offers the following account types:</p>
                    <ul className="space-y-2">
                      {(typeof broker.account_types === 'string'
                        ? broker.account_types.split(',')
                        : Array.isArray(broker.account_types)
                          ? broker.account_types
                          : ["Standard", "Professional"]).map((account: string, i: number) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          <span>{account.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>
                    {broker.name} offers multiple account types, typically including Standard and Professional accounts.
                    Visit the official website for detailed account information and features.
                  </p>
                )}

                {broker.demo_account !== false && (
                  <div className="mt-4">
                    <h4 className="text-base font-medium mb-2">Demo Account</h4>
                    <p>A free demo account is available to practice trading with virtual funds in a risk-free environment.</p>

                    <Button variant="outline" className="mt-3" asChild>
                      <a href={broker.website_url || "#"} target="_blank" rel="noopener noreferrer">
                        Open Demo Account
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Markets</h4>
                    <ul className="space-y-1">
                      {(broker.instruments
                        ? (typeof broker.instruments === 'string'
                            ? broker.instruments.split(',')
                            : broker.instruments)
                        : ["Forex", "CFDs", "Commodities", "Indices", "Stocks"]
                      ).slice(0, 5).map((instrument: string, i: number) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          <span>{instrument.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Trading Tools</h4>
                    <ul className="space-y-1">
                      {(broker.trading_tools
                        ? (typeof broker.trading_tools === 'string'
                            ? broker.trading_tools.split(',')
                            : broker.trading_tools)
                        : ["Economic Calendar", "Trading Signals", "Market Analysis", "VPS Hosting"]
                      ).slice(0, 5).map((tool: string, i: number) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          <span>{tool.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {broker.unique_features && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Unique Features</h4>
                    <p>{broker.unique_features}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Customer Support</h3>
                <p>
                  {broker.support
                    ? broker.support
                    : `${broker.name} offers customer support through multiple channels to assist traders with any questions or issues.`}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {/* Support Channels */}
                  <div>
                    <h4 className="font-medium mb-2">Support Channels</h4>
                    <ul className="space-y-1">
                      {(broker.support_channels
                        ? (typeof broker.support_channels === 'string'
                            ? broker.support_channels.split(',')
                            : broker.support_channels)
                        : ["Email", "Live Chat", "Phone", "Contact Form"]
                      ).map((channel: string, i: number) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          <span>{channel.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Support Hours */}
                  <div>
                    <h4 className="font-medium mb-2">Support Hours</h4>
                    <p>{broker.support_hours || "24/5 during trading days"}</p>

                    {broker.support_languages && (
                      <div className="mt-3">
                        <h4 className="font-medium mb-1">Languages</h4>
                        <p>{broker.support_languages}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}