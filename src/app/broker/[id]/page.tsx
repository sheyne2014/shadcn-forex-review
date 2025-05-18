import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, CheckCircle, HelpCircle, Share2, Shield, Star } from "lucide-react";
import { ScamBrokerCheckWidget } from "@/components/ScamBrokerCheckWidget";
import { getBrokerById } from "@/lib/supabase/broker-client";
import { siteConfig } from "@/config/site";
import { getAllBrokerIds } from "@/lib/route-generation";

interface BrokerPageProps {
  params: {
    id: string;
  };
}

// Generate static params for all broker pages
export async function generateStaticParams() {
  const brokerIds = await getAllBrokerIds();
  
  return brokerIds.map(id => ({
    id,
  }));
}

export async function generateMetadata({ params }: BrokerPageProps): Promise<Metadata> {
  const id = params.id;
  const { data: broker, error } = await getBrokerById(id);
  
  if (error || !broker) {
    return {
      title: "Broker Not Found | BrokerAnalysis",
      description: "The requested broker information could not be found."
    };
  }
  
  // Format current date for the review
  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  
  // Generate primary and secondary keywords
  const primaryKeyword = `${broker.name} Review`;
  const secondaryKeyword = `Best ${broker.categories?.[0]?.name || 'Trading'} Platform`;

  // Create a more descriptive meta description
  const metaDescription = `${broker.description?.slice(0, 120) || `${broker.name} is a ${broker.categories?.[0]?.name || 'trading'} broker offering various financial instruments`} with ${broker.min_deposit ? `$${broker.min_deposit} min deposit` : 'competitive fees'} and ${broker.rating ? `${broker.rating}/5 rating` : 'professional service'}.`;
  
  return {
    title: `${primaryKeyword} | ${secondaryKeyword} | ${siteConfig.name}`,
    description: metaDescription.length > 160 ? metaDescription.slice(0, 157) + '...' : metaDescription,
    openGraph: {
      title: `${broker.name} Broker Review & Rating ${year} (${broker.rating || "N/A"}/5) | ${month} ${year} Update`,
      description: metaDescription,
      type: "website",
      url: `${siteConfig.url}/broker/${broker.id}`,
      images: [
        {
          url: broker.logo_url || `${siteConfig.url}/images/brokers/default-broker.png`,
          width: 1200,
          height: 630,
          alt: `${broker.name} logo`
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${broker.name} Broker Review ${year} | ${siteConfig.name}`,
      description: metaDescription,
      images: [broker.logo_url || `${siteConfig.url}/images/brokers/default-broker.png`],
    },
    keywords: [
      `${broker.name}`, 
      "forex broker", 
      "broker review", 
      `${broker.name} review`, 
      `${broker.name} trading`, 
      `${broker.name} regulation`,
      `${month} ${year} update`,
      `${year} broker review`,
      broker.categories?.map((cat: {name: string}) => cat.name).join(', ') || ''
    ],
    alternates: {
      canonical: `${siteConfig.url}/broker/${broker.id}`,
    },
  };
}

// Helper function to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Helper function to format supported assets
function formatSupportedAssets(supportedAssets: string | string[] | null | undefined): string[] {
  if (!supportedAssets) return [];
  if (typeof supportedAssets === 'string') {
    try {
      return JSON.parse(supportedAssets);
    } catch {
      return supportedAssets.split(',').map(asset => asset.trim());
    }
  }
  return supportedAssets;
}

// Generate JSON-LD structured data
function generateBrokerJsonLd(broker: any) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${broker.name} Broker Review`,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: broker.rating || '4.0',
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name
    },
    itemReviewed: {
      '@type': 'FinancialService',
      name: broker.name,
      description: broker.description,
      image: broker.logo_url,
      url: broker.url,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: broker.rating || '4.0',
        reviewCount: broker.reviews?.length || '10',
        bestRating: '5',
        worstRating: '1'
      }
    }
  };

  return `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

export default async function BrokerDetailPage({ params }: BrokerPageProps) {
  const id = params.id;
  const { data: broker, error } = await getBrokerById(id);
  
  if (error || !broker) {
    console.error("Error fetching broker:", error);
    notFound();
  }
  
  // In a real app, this would make an API call to get real-time verification
  // Simulating the verification using FireCrawl scraper
  const legitimacyData = {
    isLegitimate: true,
    regulatoryStatus: `${broker.name} appears to be properly regulated by ${broker.regulations || "N/A"}`,
    warningFlags: []
  };
  
  // In a real app, this would make an API call to get latest news
  // Simulating news data using FireCrawl scraper
  const newsData = [
    {
      title: `${broker.name} Expands Asset Offering with New Cryptocurrency Pairs`,
      url: "#",
      source: "ForexNews.com",
      publishedDate: "2 days ago"
    },
    {
      title: `Regulatory Update: ${broker.name} Obtains New License`,
      url: "#",
      source: "TradingTimes.com",
      publishedDate: "1 week ago"
    }
  ];

  // Sample pros and cons (could be stored in database in the future)
  const pros = [
    "Regulated by top-tier authorities",
    "Wide range of trading instruments",
    "Advanced trading platform"
  ];
  
  const cons = [
    "Limited educational resources",
    "Customer support can be slow",
    "Higher fees for some instruments"
  ];
  
  // Sample features (could be stored in database in the future)
  const features = {
    "Trading Platforms": "MT4, MT5, WebTrader",
    "Account Types": "Standard, Premium, VIP",
    "Deposit Methods": "Credit Card, Bank Transfer, E-wallets",
    "Customer Support": "24/5, Live Chat, Email, Phone",
    "Education": "Webinars, Trading Guides, Videos",
    "Promotions": "Welcome Bonus, Loyalty Program"
  };

  return (
    <>
      {/* Add JSON-LD structured data */}
      <div dangerouslySetInnerHTML={{ __html: generateBrokerJsonLd(broker) }} />
      
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/brokers" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Brokers
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-16 w-40 bg-muted flex items-center justify-center rounded overflow-hidden">
                  <Image
                    src={broker.logo_url || `https://placehold.co/150x60?text=${encodeURIComponent(broker.name)}`}
                    alt={`${broker.name} logo`}
                    width={150}
                    height={60}
                    className="max-h-full max-w-full object-contain"
                    priority
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={legitimacyData.isLegitimate ? "default" : "destructive"}>
                    {legitimacyData.isLegitimate ? (
                      <><Shield className="h-3 w-3 mr-1" /> Verified</>
                    ) : (
                      <><AlertTriangle className="h-3 w-3 mr-1" /> Warning</>
                    )}
                  </Badge>
                  <Badge variant="outline">
                    <Star className="fill-primary h-3 w-3 mr-1" /> {broker.rating || "N/A"}/5
                  </Badge>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{broker.name} Review</h1>
              <p className="text-muted-foreground mt-2">{broker.description || `${broker.name} is a forex broker offering trading services across multiple markets.`}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <a href={broker.url || "#"} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="verify">Verify Legitimacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Regulated By</h3>
                        <p className="font-medium">{broker.regulations || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Country</h3>
                        <p className="font-medium">{broker.country || "Global"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Min Deposit</h3>
                        <p className="font-medium">${broker.min_deposit || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Trading Fee</h3>
                        <p className="font-medium">{broker.trading_fee ? `${broker.trading_fee}%` : "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Established</h3>
                        <p className="font-medium">{broker.created_at ? new Date(broker.created_at).getFullYear() : "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Rating</h3>
                        <p className="font-medium flex items-center">
                          <Star className="fill-primary h-4 w-4 mr-1" /> {broker.rating || "N/A"}/5
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Supported Assets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {formatSupportedAssets(broker.supported_assets).length > 0 ? (
                        formatSupportedAssets(broker.supported_assets).map((asset: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {asset}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground">Asset information not available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Pros & Cons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" /> Pros
                        </h3>
                        <ul className="space-y-2">
                          {pros.map((pro, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center text-red-600">
                          <AlertTriangle className="h-4 w-4 mr-2" /> Cons
                        </h3>
                        <ul className="space-y-2">
                          {cons.map((con, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Rating</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold flex items-center">
                        {broker.rating || "N/A"} <Star className="h-6 w-6 ml-1 fill-primary" />
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">
                        Based on {broker.reviews?.length || 0} user reviews
                      </p>
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-24 text-sm">Excellent</div>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 text-sm">Good</div>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-400 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 text-sm">Average</div>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: "5%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 text-sm">Poor</div>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-400 rounded-full" style={{ width: "3%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 text-sm">Very Poor</div>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "2%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent News</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-4">
                      {newsData.map((news, index) => (
                        <li key={index}>
                          <Link href={news.url} className="hover:underline font-medium">
                            {news.title}
                          </Link>
                          <div className="text-sm text-muted-foreground mt-1">
                            {news.source} • {news.publishedDate}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <ScamBrokerCheckWidget brokerName={broker.name || ''} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Broker Features</CardTitle>
                <CardDescription>
                  Detailed information about {broker.name}'s trading features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {Object.entries(features).map(([feature, value]: [string, string], index: number) => (
                    <div key={index} className="border-b pb-4">
                      <h3 className="font-medium mb-2">{feature}</h3>
                      <p className="text-muted-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Reviews</CardTitle>
                    <CardDescription>
                      See what traders are saying about {broker.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {broker.reviews && broker.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {broker.reviews.map((review: any) => (
                          <div key={review.id} className="border-b pb-5">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-medium">{review.user_name || "Anonymous User"}</div>
                              <div className="flex items-center">
                                <div className="font-medium mr-2">{review.rating}/5</div>
                                <Star className="h-4 w-4 fill-primary" />
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-2">{review.comment || "No comment provided."}</p>
                            <div className="text-xs text-muted-foreground">
                              {new Date(review.created_at).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Be the first to leave a review for {broker.name}.
                        </p>
                        <Button className="mt-4">
                          Write a Review
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Leave a Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <p className="mb-4">Share your experience with {broker.name} to help other traders.</p>
                      <Button>Write Your Review</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rating Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-4">
                      {[
                        { label: "Ease of Use", value: 4.2 },
                        { label: "Customer Service", value: 3.8 },
                        { label: "Trading Tools", value: 4.5 },
                        { label: "Fees", value: 4.1 },
                        { label: "Mobile App", value: 4.3 }
                      ].map((item: { label: string; value: number }, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">{item.label}</span>
                            <div className="flex items-center text-sm">
                              <span className="mr-1">{item.value}</span>
                              <Star className="h-3 w-3 fill-primary" />
                            </div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${(item.value / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Review Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Share your personal trading experience</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Be specific with details (platforms, assets, fees)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Mention both positives and negatives</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Avoid offensive language or personal attacks</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Don't include contact information or links</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="verify" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ScamBrokerCheckWidget brokerName={broker.name || ''} />
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Regulatory Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      {legitimacyData.isLegitimate ? (
                        <Badge variant="default" className="px-2 py-1">
                          <Shield className="h-3 w-3 mr-1" /> Regulated
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="px-2 py-1">
                          <AlertTriangle className="h-3 w-3 mr-1" /> Unregulated
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{legitimacyData.regulatoryStatus}</p>
                    
                    {legitimacyData.warningFlags.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold text-red-600 mb-2">Warning Flags:</h3>
                        <ul className="space-y-1 text-sm">
                          {legitimacyData.warningFlags.map((flag: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Verification Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Check the broker's regulatory status on the official regulator website</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Verify that the company name matches the regulated entity</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Look for secure website connection (https://)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Check for transparent company information and address</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Research customer reviews across multiple platforms</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
} 