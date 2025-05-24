import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Monitor, Smartphone, Award, CheckCircle, Download } from "lucide-react";

interface PlatformsSectionProps {
  broker: any;
  platformDetails?: {
    platforms: {
      name: string;
      type: string;
      description: string;
      features: string[];
      pros: string[];
      cons: string[];
      imageUrl?: string;
      rating: number;
    }[];
    mobileApps: {
      platform: string;
      features: string[];
      rating: number;
      downloadUrl?: string;
      imageUrl?: string;
    }[];
  };
}

export function PlatformsSection({ 
  broker, 
  platformDetails = {
    platforms: [],
    mobileApps: []
  } 
}: PlatformsSectionProps) {
  // Default platform data if not provided
  const platforms = platformDetails.platforms.length > 0 ? platformDetails.platforms : [
    {
      name: "MetaTrader 4",
      type: "Desktop",
      description: "MetaTrader 4 is one of the most popular trading platforms in the world, known for its charting capabilities and automated trading options through Expert Advisors (EAs).",
      features: [
        "Advanced charting tools with multiple timeframes",
        "Support for automated trading with Expert Advisors",
        "Wide range of technical indicators and drawing tools",
        "Customizable interface",
        "One-click trading"
      ],
      pros: [
        "User-friendly interface",
        "Extensive community support",
        "Reliable performance",
        "Customizable with Expert Advisors"
      ],
      cons: [
        "Dated user interface",
        "Limited asset classes",
        "Basic fundamental analysis tools"
      ],
      imageUrl: "/images/platforms/mt4.jpg",
      rating: 4.5
    },
    {
      name: "MetaTrader 5",
      type: "Desktop",
      description: "MetaTrader 5 is the successor to MT4, offering additional features and improvements such as more timeframes, economic calendar, and a more advanced strategy tester.",
      features: [
        "21 timeframes compared to 9 in MT4",
        "Enhanced strategy tester with multi-currency testing",
        "Depth of Market (DOM) data",
        "Economic calendar integration",
        "Unlimited charts"
      ],
      pros: [
        "More advanced than MT4",
        "Better strategy testing",
        "Support for more asset classes",
        "Improved technical indicators"
      ],
      cons: [
        "Not as widely adopted as MT4",
        "Steeper learning curve",
        "Not backward compatible with MT4 EAs"
      ],
      imageUrl: "/images/platforms/mt5.jpg",
      rating: 4.7
    },
    {
      name: broker.name + " Web Trader",
      type: "Web",
      description: `${broker.name}'s proprietary web trading platform offers a user-friendly interface that can be accessed from any browser without the need to download or install software.`,
      features: [
        "Browser-based with no download required",
        "Real-time charts and technical analysis tools",
        "Integrated news and market analysis",
        "Customizable workspace",
        "Multiple order types"
      ],
      pros: [
        "No installation required",
        "Cross-platform compatibility",
        "Modern user interface",
        "Seamless account management"
      ],
      cons: [
        "Fewer advanced features than desktop platforms",
        "May have performance limitations",
        "Limited customization options"
      ],
      imageUrl: "/images/platforms/webtrader.jpg",
      rating: 4.2
    }
  ];

  // Default mobile app data if not provided
  const mobileApps = platformDetails.mobileApps.length > 0 ? platformDetails.mobileApps : [
    {
      platform: "iOS",
      features: [
        "Real-time price quotes",
        "Full set of trading orders",
        "Interactive charts with multiple timeframes",
        "Technical indicators and drawing tools",
        "Account management features",
        "Push notifications for price alerts and market news"
      ],
      rating: 4.3,
      downloadUrl: "#",
      imageUrl: "/images/platforms/ios-app.jpg"
    },
    {
      platform: "Android",
      features: [
        "Real-time price quotes",
        "Full set of trading orders",
        "Interactive charts with multiple timeframes",
        "Technical indicators and drawing tools",
        "Account management features",
        "Push notifications for price alerts and market news"
      ],
      rating: 4.2,
      downloadUrl: "#",
      imageUrl: "/images/platforms/android-app.jpg"
    }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Trading Platforms</CardTitle>
          <CardDescription>
            Explore the trading platforms offered by {broker.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={platforms[0]?.name.toLowerCase().replace(/\s+/g, "-") || "mt4"} className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              {platforms.map((platform) => (
                <TabsTrigger 
                  key={platform.name} 
                  value={platform.name.toLowerCase().replace(/\s+/g, "-")}
                  className="min-w-[120px]"
                >
                  {platform.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {platforms.map((platform) => (
              <TabsContent 
                key={platform.name}
                value={platform.name.toLowerCase().replace(/\s+/g, "-")}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{platform.type}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span className="ml-1 text-sm font-medium">{platform.rating}/5</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{platform.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2 mb-6">
                      {platform.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-green-600">Pros</h3>
                        <ul className="space-y-1">
                          {platform.pros.map((pro, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-red-600">Cons</h3>
                        <ul className="space-y-1">
                          {platform.cons.map((con, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <span className="text-red-600 font-bold mr-2">-</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Button variant="default">
                      <Download className="mr-2 h-4 w-4" /> Download Platform
                    </Button>
                  </div>
                  
                  <div className="rounded-lg overflow-hidden border">
                    <div className="bg-muted aspect-video flex items-center justify-center">
                      {platform.imageUrl ? (
                        <Image
                          src={platform.imageUrl}
                          alt={`${platform.name} platform screenshot`}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Monitor className="h-16 w-16 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mobile Trading</CardTitle>
            <CardDescription>
              Access the markets on the go with {broker.name}'s mobile apps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mobileApps.map((app, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Smartphone className="h-6 w-6 text-primary mr-2" />
                    <div>
                      <h3 className="font-semibold">{app.platform} App</h3>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span className="ml-1">{app.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={app.downloadUrl || "#"} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </a>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {app.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">&nbsp;</h4>
                    <ul className="space-y-1">
                      {app.features.slice(3, 6).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Comparison</CardTitle>
            <CardDescription>
              Compare the features of different platforms offered by {broker.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium py-2">Feature</th>
                    {platforms.map((platform) => (
                      <th key={platform.name} className="text-center font-medium py-2">
                        {platform.name.replace(broker.name, '').trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Platform Type</td>
                    {platforms.map((platform) => (
                      <td key={platform.name} className="text-center py-2">
                        {platform.type}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Expert Advisors</td>
                    {platforms.map((platform) => (
                      <td key={platform.name} className="text-center py-2">
                        {platform.name.includes('MT4') || platform.name.includes('MT5') ? 
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto" /> : 
                          <span>-</span>
                        }
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Web Access</td>
                    {platforms.map((platform) => (
                      <td key={platform.name} className="text-center py-2">
                        {platform.type === 'Web' ? 
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto" /> : 
                          <span>-</span>
                        }
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Mobile App</td>
                    {platforms.map((platform) => (
                      <td key={platform.name} className="text-center py-2">
                        {platform.name.includes('MT4') || platform.name.includes('MT5') || platform.name.includes('Web') ? 
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto" /> : 
                          <span>-</span>
                        }
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">One-Click Trading</td>
                    {platforms.map((platform) => (
                      <td key={platform.name} className="text-center py-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2">Rating</td>
                    {platforms.map((platform) => (
                      <td key={platform.name} className="text-center py-2">
                        <div className="flex items-center justify-center">
                          <span className="mr-1">{platform.rating}</span>
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Awards</CardTitle>
          <CardDescription>
            Recognition and awards received by {broker.name}'s trading platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full p-4 inline-flex items-center justify-center mb-3">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Best Trading Platform</h3>
              <p className="text-sm text-muted-foreground">Financial Excellence Awards 2024</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full p-4 inline-flex items-center justify-center mb-3">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Best Mobile Trading App</h3>
              <p className="text-sm text-muted-foreground">Forex Broker Awards 2023</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full p-4 inline-flex items-center justify-center mb-3">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Most Innovative Tools</h3>
              <p className="text-sm text-muted-foreground">Global Trading Awards 2024</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-primary/10 rounded-full p-4 inline-flex items-center justify-center mb-3">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Best Platform for Beginners</h3>
              <p className="text-sm text-muted-foreground">Trading Excellence Awards 2023</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 