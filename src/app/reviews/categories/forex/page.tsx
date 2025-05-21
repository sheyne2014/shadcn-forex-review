import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Forex Broker Reviews 2025 | Expert Analysis",
  description: "In-depth reviews of the top forex brokers for 2025. Compare platforms, trading conditions, fees, and features to find the best forex broker for your needs.",
};

// Forex brokers to review
const forexBrokers = [
  {
    name: "XM",
    slug: "xm",
    description: "Established forex broker with competitive spreads from 0.0 pips and leverage up to 1:1000.",
    logoUrl: "/broker-logos-simple/xm_clearbit.png",
    rating: 4.6,
    minDeposit: 5,
    typicalSpread: 1.1,
  },
  {
    name: "eToro",
    slug: "etoro",
    description: "Popular social trading platform with copy trading features and access to multiple markets.",
    logoUrl: "/broker-logos-simple/etoro_clearbit.png",
    rating: 4.7,
    minDeposit: 50,
    typicalSpread: 3.0, 
  },
  {
    name: "IC Markets",
    slug: "ic-markets",
    description: "Leading ECN broker with ultra-low spreads and raw pricing for professional traders.",
    logoUrl: "/broker-logos-simple/ic_markets_clearbit.png", 
    rating: 4.8,
    minDeposit: 200,
    typicalSpread: 0.6,
  },
  {
    name: "Pepperstone",
    slug: "pepperstone",
    description: "Award-winning forex broker with razor-sharp spreads and fast execution speeds.",
    logoUrl: "/broker-logos-simple/pepperstone_clearbit.png",
    rating: 4.7,
    minDeposit: 200,
    typicalSpread: 0.8,
  },
  {
    name: "FXCM",
    slug: "fxcm",
    description: "Global forex broker offering competitive spreads and advanced trading tools.",
    logoUrl: "/broker-logos-simple/fxcm_clearbit.png",
    rating: 4.5,
    minDeposit: 50,
    typicalSpread: 1.3,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      <div className="flex">
        {Array(5).fill(0).map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-200"
            } ${i === Math.floor(rating) && rating % 1 > 0 ? "text-amber-400 fill-amber-400" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <span className="ml-2 text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ForexReviewsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Forex Broker Reviews 2025</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              In-depth, unbiased reviews of the top forex brokers with expert analysis
            </p>
          </div>

          <div className="bg-muted p-6 rounded-lg">
            <p>
              Our forex broker reviews are based on extensive testing and research. We evaluate each broker on multiple factors including
              trading conditions, platform features, customer service, and regulatory compliance. All information is updated as of May 2025.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {forexBrokers.map((broker, index) => (
            <Card key={broker.slug} className="overflow-hidden">
              <div className="grid md:grid-cols-[1fr_3fr] gap-6">
                <div className="p-6 bg-muted/30 flex flex-col items-center justify-center border-r">
                  <div className="w-24 h-24 relative flex-shrink-0 border rounded-md overflow-hidden bg-white p-2 mb-3">
                    <Image 
                      src={broker.logoUrl} 
                      alt={`${broker.name} logo`} 
                      fill
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&background=random&color=fff&size=48&bold=true`;
                      }}
                    />
                  </div>
                  <StarRating rating={broker.rating} />
                  <Badge variant="outline" className="mt-2">#{index + 1}</Badge>
                </div>
                
                <div className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{broker.name} Review</CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-0 space-y-4">
                    <p>{broker.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted p-3 rounded-md text-center">
                        <div className="text-sm text-muted-foreground">Min. Deposit</div>
                        <div className="font-medium">${broker.minDeposit}</div>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-center">
                        <div className="text-sm text-muted-foreground">Spread From</div>
                        <div className="font-medium">{broker.typicalSpread} pips</div>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-center">
                        <div className="text-sm text-muted-foreground">Regulated</div>
                        <div className="font-medium">Yes</div>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-center">
                        <div className="text-sm text-muted-foreground">Rating</div>
                        <div className="font-medium">{broker.rating} / 5</div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="px-0 flex justify-between">
                    <Button asChild>
                      <Link href={`/reviews/${broker.slug}`} className="flex items-center">
                        <span>Read Full Review</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/broker/${broker.slug}`}>Visit Broker</Link>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-muted p-8 rounded-lg space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">How We Rate Forex Brokers</h2>
            <p className="text-muted-foreground mt-2">
              Our comprehensive methodology ensures fair and accurate reviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Trading Costs</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-1">✓</Badge>
                  <span>Spreads analysis across major pairs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-1">✓</Badge>
                  <span>Commission structure evaluation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-1">✓</Badge>
                  <span>Overnight financing rates</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Trading Platforms</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-1">✓</Badge>
                  <span>Ease of use and functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-1">✓</Badge>
                  <span>Available trading tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-1">✓</Badge>
                  <span>Mobile app performance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button asChild>
              <Link href="/methodology">Learn More About Our Rating Methodology</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 