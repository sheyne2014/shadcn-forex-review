import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrokerLogo } from "@/components/brokers/BrokerLogo";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Forex Broker Reviews 2025 | Expert Analysis & Comparison",
  description: "Detailed and unbiased forex broker reviews based on our expert analysis. Compare trading platforms, fees, features, and regulation status.",
};

// List of featured broker reviews
const featuredReviews = [
  {
    name: "eToro",
    slug: "broker/etoro",
    description: "Popular social trading platform with a wide range of assets including forex, stocks, and crypto.",
    logoUrl: "/broker-logos-simple/etoro_clearbit.png",
    rating: 4.7,
  },
  {
    name: "XM",
    slug: "xm",
    description: "Established forex and CFD broker with competitive spreads and good trading conditions.",
    logoUrl: "/broker-logos-simple/xm_clearbit.png",
    rating: 4.6,
  },
  {
    name: "IC Markets",
    slug: "ic-markets",
    description: "Leading ECN broker with low latency execution and tight spreads for forex traders.",
    logoUrl: "/broker-logos-simple/ic_markets_clearbit.png",
    rating: 4.8,
  },
  {
    name: "Pepperstone",
    slug: "pepperstone",
    description: "Award-winning forex and CFD broker with fast execution and excellent customer service.",
    logoUrl: "/broker-logos-simple/pepperstone_clearbit.png",
    rating: 4.7,
  },
  {
    name: "FXCM",
    slug: "fxcm",
    description: "Global forex broker offering advanced trading tools and educational resources.",
    logoUrl: "/broker-logos-simple/fxcm_clearbit.png",
    rating: 4.5,
  },
];

// Render star rating component
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

export default function ReviewsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Forex Broker Reviews</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive, unbiased reviews of the top forex and trading brokers in 2025
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((review) => (
            <Card key={review.slug} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex-shrink-0">
                  <BrokerLogo
                    broker={{
                      name: review.name,
                      logo_url: review.logoUrl
                    }}
                    size="lg"
                    rounded
                    withBorder
                  />
                </div>
                <div>
                  <CardTitle className="text-xl">{review.name}</CardTitle>
                  <StarRating rating={review.rating} />
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{review.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/reviews/${review.slug}`} className="flex items-center justify-between">
                    <span>Read Full Review</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="space-y-8 mt-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Review Categories</h2>
            <p className="text-muted-foreground mt-2">Browse reviews by broker type</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Forex Brokers", slug: "forex" },
              { name: "CFD Brokers", slug: "cfd" },
              { name: "Stock Brokers", slug: "stocks" },
              { name: "Crypto Brokers", slug: "crypto" },
              { name: "Options Brokers", slug: "options" },
            ].map((category) => (
              <Button
                key={category.slug}
                variant="outline"
                className="h-auto py-4 justify-start"
                asChild
              >
                <Link href={`/best-brokers/${category.slug}`}>
                  {category.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Our Review Methodology</h2>
          <p className="mb-4">
            Our broker reviews are conducted through a rigorous evaluation process that examines multiple factors including:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <Badge className="mt-1 mr-2">✓</Badge>
              <span>Regulation and security measures</span>
            </li>
            <li className="flex items-start">
              <Badge className="mt-1 mr-2">✓</Badge>
              <span>Trading costs and fee structures</span>
            </li>
            <li className="flex items-start">
              <Badge className="mt-1 mr-2">✓</Badge>
              <span>Trading platform functionality and user experience</span>
            </li>
            <li className="flex items-start">
              <Badge className="mt-1 mr-2">✓</Badge>
              <span>Customer service quality and responsiveness</span>
            </li>
            <li className="flex items-start">
              <Badge className="mt-1 mr-2">✓</Badge>
              <span>Range of available markets and instruments</span>
            </li>
          </ul>
          <Button asChild>
            <Link href="/methodology">Learn About Our Methodology</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}