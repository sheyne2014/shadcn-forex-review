import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Broker } from "@/lib/supabase/broker-client";

interface BrokerInfoCardProps {
  broker: Broker;
  showLink?: boolean;
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

export function BrokerInfoCard({ broker, showLink = true }: BrokerInfoCardProps) {
  const formattedAssets = formatSupportedAssets(broker.supported_assets);

  const cardContent = (
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
            {formattedAssets.length > 0 ? (
              formattedAssets.map((asset: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {asset}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">Information not available</span>
            )}
          </div>
        </div>
      </CardContent>
      {showLink && (
        <CardFooter className="pt-0">
          <Button variant="ghost" size="sm" className="gap-1 w-full justify-between group-hover:text-primary transition-colors">
            View Details <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );

  if (showLink) {
    return (
      <Link href={`/broker/${broker.id}`} className="group">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}