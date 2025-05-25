import { Metadata } from "next";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, Search } from "lucide-react";
import { BrokerSearchCommand } from "@/components/brokers/BrokerSearchCommand";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBrokers, getBrokerCategories, Broker } from "@/lib/supabase/broker-client";

export const metadata: Metadata = {
  title: "Compare All Types of Brokers | BrokerAnalysis",
  description: "Compare the best brokers for forex, crypto, stocks, commodities, ETF, CFD, options and more. Find regulated brokers with low fees, great trading conditions, and excellent service.",
  openGraph: {
    title: "Compare All Types of Brokers | BrokerAnalysis",
    description: "Find the best brokers for your trading style. Compare fees, platforms, regulation status and more across forex, crypto, stocks, commodities, ETF, CFD, options and more.",
    type: "website",
    url: "/brokers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare All Types of Brokers | BrokerAnalysis",
    description: "Find the best brokers for your trading style. Compare fees, platforms, regulation status and more across forex, crypto, stocks, commodities, ETF, CFD, options and more.",
  },
  keywords: ["forex brokers", "crypto brokers", "stock brokers", "commodities brokers", "ETF brokers", "CFD brokers", "options brokers", "broker comparison", "trading", "regulated brokers", "low fee brokers"],
  alternates: {
    canonical: "/brokers",
  },
};

// Broker Card Component
function BrokerCard({ broker, formatSupportedAssets }: {
  broker: Broker,
  formatSupportedAssets: (supportedAssets: string | string[] | null | undefined) => string[]
}) {
  return (
                <Link href={`/broker/${broker.id}`} key={broker.id} className="group">
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="h-16 w-40 bg-muted flex items-center justify-center rounded overflow-hidden">
                          <img
                            src={broker.logo_url || `https://placehold.co/150x60?text=${encodeURIComponent(broker.name)}`}
                            alt={`${broker.name} logo`}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <Badge variant={broker.rating && broker.rating >= 4.5 ? "default" : broker.rating && broker.rating >= 4 ? "secondary" : "outline"}>
                          {broker.rating ? `${broker.rating} ★` : 'Not Rated'}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4 text-xl group-hover:text-primary transition-colors">
                        {broker.name}
                      </CardTitle>
                      <CardDescription>
                        {broker.country || 'Global'} • {broker.regulations || 'N/A'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Min. Deposit</p>
                          <p className="font-medium">${broker.min_deposit || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Trading Fee</p>
                          <p className="font-medium">{broker.trading_fee ? `${broker.trading_fee}%` : 'N/A'}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Assets:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
              {formatSupportedAssets(broker.supported_assets).map((asset: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {asset}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="ghost" size="sm" className="gap-1 w-full justify-between group-hover:text-primary transition-colors">
                        View Details <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
  );
}

// BrokerGrid Component
function BrokerGrid({ brokers, categoryName, formatSupportedAssets }: {
  brokers: Broker[],
  categoryName?: string,
  formatSupportedAssets: (supportedAssets: string | string[] | null | undefined) => string[]
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {brokers.length > 0 ? (
        brokers.map((broker) => (
          <BrokerCard
            key={broker.id}
            broker={broker}
            formatSupportedAssets={formatSupportedAssets}
          />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
          <h3 className="text-xl font-semibold mb-2">
            {categoryName ? `No ${categoryName} brokers found` : 'No brokers found'}
          </h3>
          <p className="text-muted-foreground">
            {categoryName
              ? `${categoryName} brokers will appear here once they are added to the database.`
              : 'Brokers will appear here once they are added to the database.'
            }
          </p>
              </div>
            )}
          </div>
  );
}

export default async function BrokersPage() {
  // Fetch brokers and categories from Supabase
  const { data: brokers = [], error: brokersError } = await getBrokers({
    limit: 100, // Increased limit to get more brokers
    sort_by: "rating",
    sort_order: "desc"
  });

  if (brokersError) {
    console.error("Error fetching brokers:", brokersError);
  }

  // Log broker data to help with debugging
  console.log(`Fetched ${brokers?.length || 0} brokers from Supabase`);
  if (brokers && brokers.length > 0) {
    console.log("First broker data:", JSON.stringify(brokers[0], null, 2));

    // Check categories that will actually have brokers
    console.log("Brokers by category:");
    ["Forex", "Crypto", "Stocks", "ETF", "CFD", "Commodities", "Options"].forEach(category => {
      const matchingBrokers = brokers.filter(broker => {
        if (!broker.supported_assets) return false;

        if (Array.isArray(broker.supported_assets)) {
          return broker.supported_assets.some((asset: string) =>
            typeof asset === 'string' && asset.toLowerCase() === category.toLowerCase()
          );
        }
        return false;
      });

      console.log(`- ${category}: ${matchingBrokers.length} brokers`);
      if (matchingBrokers.length > 0) {
        console.log(`  First match: ${matchingBrokers[0].name} with assets: ${JSON.stringify(matchingBrokers[0].supported_assets)}`);
      }
    });
  }

  // Get broker categories
  const { data: categories = [], error: categoriesError } = await getBrokerCategories();

  if (categoriesError) {
    console.error("Error fetching broker categories:", categoriesError);
  }

  // Helper function to get brokers by category
  const getBrokersByCategory = (categoryName: string) => {
    // Filter brokers based on supported_assets
    return brokers?.filter(broker => {
      if (!broker.supported_assets) return false;

      // Make the category check case-insensitive
      const categoryLower = categoryName.toLowerCase();

      // Handle different formats of supported_assets
      const parsedAssets = (() => {
        if (typeof broker.supported_assets === 'string') {
          try {
            // Try to parse JSON string
            return JSON.parse(broker.supported_assets as string);
          } catch {
            // If not valid JSON, try comma-separated string
            return (broker.supported_assets as string).split(',').map(a => a.trim());
          }
        } else if (Array.isArray(broker.supported_assets)) {
          return broker.supported_assets;
        }
        return [];
      })();

      // Case-insensitive match for more reliable filtering
      const hasMatch = parsedAssets.some((asset: string) => {
        if (typeof asset !== 'string') return false;

        // Normalize asset names to improve matching
        const assetLower = asset.toLowerCase();

        if (categoryLower === 'forex' && (assetLower === 'forex' || assetLower === 'fx')) {
          return true;
        }

        if (categoryLower === 'crypto' && (
          assetLower === 'crypto' ||
          assetLower === 'cryptocurrency' ||
          assetLower === 'cryptocurrencies' ||
          assetLower === 'bitcoin' ||
          assetLower === 'ethereum' ||
          assetLower === 'altcoins'
        )) {
          return true;
        }

        if (categoryLower === 'stocks' && (assetLower === 'stocks' || assetLower === 'equities')) {
          return true;
        }

        if (categoryLower === 'etf' && (assetLower === 'etf' || assetLower === 'etfs')) {
          return true;
        }

        if (categoryLower === 'cfd' && (assetLower === 'cfd' || assetLower === 'cfds')) {
          return true;
        }

        if (categoryLower === 'commodities' && (
          assetLower === 'commodities' ||
          assetLower === 'metals' ||
          assetLower === 'gold' ||
          assetLower === 'silver'
        )) {
          return true;
        }

        if (categoryLower === 'options' && assetLower === 'options') {
          return true;
        }

        // Direct match
        return assetLower === categoryLower;
      });

      // Log matches for debugging
      if (hasMatch) {
        console.log(`Match found for ${categoryName}: ${broker.name} with assets: ${JSON.stringify(broker.supported_assets)}`);
      }

      return hasMatch;
    }) || [];
  };

  // Helper function to format supported_assets
  const formatSupportedAssets = (supportedAssets: string | string[] | null | undefined) => {
    if (!supportedAssets) return [];

    if (typeof supportedAssets === 'string') {
      try {
        return JSON.parse(supportedAssets);
      } catch {
        return supportedAssets.split(',').map(asset => asset.trim());
      }
    }
    return supportedAssets;
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row justify-between mb-10 items-start md:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">All Brokers</h1>
          <p className="text-muted-foreground mt-2">Compare and find the best brokers for your trading needs</p>
        </div>
        <div className="w-full md:w-auto">
          <BrokerSearchCommand />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="all">All Brokers</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
            <TabsTrigger value="etf">ETF</TabsTrigger>
            <TabsTrigger value="cfd">CFD</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <TabsContent value="all" className="mt-0">
          <BrokerGrid
            brokers={brokers || []}
            formatSupportedAssets={formatSupportedAssets}
          />
        </TabsContent>

        {/* Forex tab */}
        <TabsContent value="forex" className="mt-0">
          <BrokerGrid
            brokers={getBrokersByCategory("Forex")}
            categoryName="Forex"
            formatSupportedAssets={formatSupportedAssets}
          />
        </TabsContent>

        {/* Crypto tab */}
        <TabsContent value="crypto" className="mt-0">
          <BrokerGrid
            brokers={getBrokersByCategory("Crypto")}
            categoryName="Crypto"
            formatSupportedAssets={formatSupportedAssets}
          />
        </TabsContent>

        {/* Stocks tab */}
        <TabsContent value="stocks" className="mt-0">
          <BrokerGrid
            brokers={getBrokersByCategory("Stocks")}
            categoryName="Stock"
            formatSupportedAssets={formatSupportedAssets}
          />
        </TabsContent>

        {/* Commodities tab */}
        <TabsContent value="commodities" className="mt-0">
          <BrokerGrid
            brokers={getBrokersByCategory("Commodities")}
            categoryName="Commodity"
            formatSupportedAssets={formatSupportedAssets}
          />
        </TabsContent>

        {/* ETF tab */}
        <TabsContent value="etf" className="mt-0">
          <BrokerGrid
            brokers={getBrokersByCategory("ETF")}
            categoryName="ETF"
            formatSupportedAssets={formatSupportedAssets}
          />
        </TabsContent>

        {/* CFD tab */}
        <TabsContent value="cfd" className="mt-0">
          <BrokerGrid
            brokers={getBrokersByCategory("CFD")}
            categoryName="CFD"
            formatSupportedAssets={formatSupportedAssets}
          />
        </TabsContent>

        {/* Options tab */}
        <TabsContent value="options" className="mt-0">
          <BrokerGrid
            brokers={getBrokersByCategory("Options")}
            categoryName="Options"
            formatSupportedAssets={formatSupportedAssets}
          />
        </TabsContent>
      </Tabs>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": brokers?.map((broker, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "FinancialService",
                "name": broker.name,
                "image": broker.logo_url,
                "description": `${broker.name} is a broker offering various trading instruments including ${formatSupportedAssets(broker.supported_assets).join(', ')}. Regulated by ${broker.regulations}.`,
                "review": {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": broker.rating,
                    "bestRating": "5"
                  }
                }
              }
            })) || []
          })
        }}
      />
    </div>
  );
}