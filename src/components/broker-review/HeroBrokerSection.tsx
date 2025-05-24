import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, ExternalLink, Shield, Info, AlertTriangle, Calendar, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface HeroBrokerSectionProps {
  broker: any;
  legitimacyData?: {
    isLegitimate: boolean;
    regulatoryStatus: string;
    warningFlags: string[];
  };
}

export function HeroBrokerSection({ broker, legitimacyData }: HeroBrokerSectionProps) {
  // Safely handle missing broker data
  if (!broker || typeof broker !== 'object') {
    return (
      <div className="bg-muted p-6 rounded-lg">
        <div className="flex items-center text-amber-600 gap-2">
          <AlertTriangle className="h-5 w-5" />
          <p>Broker information is missing or invalid.</p>
        </div>
      </div>
    );
  }

  // Format dates for display
  const publishedDate = broker.published_date
    ? formatDate(new Date(broker.published_date))
    : null;

  const lastUpdatedDate = broker.last_updated
    ? formatDate(new Date(broker.last_updated))
    : formatDate(new Date());

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background z-0 h-64 rounded-lg" />

      <div className="relative z-10 pt-8 pb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo and basic info */}
          <div className="flex items-center gap-6">
            {/* Broker logo */}
            <div className="relative h-20 w-20 md:h-24 md:w-24 bg-white rounded-lg border shadow-sm flex items-center justify-center p-2">
              {broker.logo_url ? (
                <Image
                  src={broker.logo_url}
                  alt={`${broker.name} logo`}
                  fill
                  className="object-contain p-1"
                />
              ) : (
                <div className="text-2xl font-bold text-center">
                  {broker.name?.split(' ').map((word: string) => word[0]).join('') || "FB"}
                </div>
              )}
            </div>

            {/* Broker name and basic info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {broker.name || "Forex Broker"} Review
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                {/* Regulation badge if available */}
                {broker.regulations && (
                  <Badge
                    variant={legitimacyData?.isLegitimate ? "secondary" : "outline"}
                    className="flex items-center gap-1"
                  >
                    <Shield className="h-3 w-3" />
                    Regulated by {broker.regulations}
                  </Badge>
                )}

                {/* Country badge if available */}
                {broker.country && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {broker.country}
                  </Badge>
                )}

                {/* Established date if available */}
                {broker.established && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Est. {broker.established}
                  </Badge>
                )}
              </div>

              {/* Last updated info */}
              <div className="text-sm text-muted-foreground">
                Updated: {lastUpdatedDate}
                {publishedDate && ` • First published: ${publishedDate}`}
              </div>
            </div>
          </div>

          {/* Rating and CTA buttons */}
          <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            {/* Rating display */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-1">
                      <div className="text-2xl font-bold">
                        {typeof broker.overall_rating === 'number'
                          ? broker.overall_rating.toFixed(1)
                          : broker.overall_rating || "4.0"}
                      </div>
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Our overall rating based on trading conditions, platforms, and service quality</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm text-muted-foreground sm:mt-1">Overall Rating</span>

              {/* Action buttons - shown inline on mobile */}
              <div className="flex gap-2 sm:hidden ml-auto">
                {broker.website_url && (
                  <Button asChild size="sm" className="flex gap-1">
                    <Link href={broker.website_url} target="_blank" rel="noopener noreferrer">
                      Visit <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Action buttons - hidden on mobile, shown on larger screens */}
            <div className="hidden sm:flex gap-2">
              {broker.website_url && (
                <Button asChild className="flex gap-1">
                  <Link href={broker.website_url} target="_blank" rel="noopener noreferrer">
                    Visit Broker <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Quick facts cards - scrollable on mobile */}
        <div className="mt-6 sm:mt-8">
          <div className="sm:hidden overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {/* Min Deposit */}
              <Card className="w-[160px]">
                <CardContent className="p-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Min. Deposit</span>
                    <span className="text-lg font-semibold mt-1">
                      {broker.min_deposit ? `$${broker.min_deposit}` : "Varies"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Spreads */}
              <Card className="w-[160px]">
                <CardContent className="p-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Spreads From</span>
                    <span className="text-lg font-semibold mt-1">
                      {broker.spreads_from || "Variable"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Leverage */}
              <Card className="w-[160px]">
                <CardContent className="p-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Max Leverage</span>
                    <span className="text-lg font-semibold mt-1">
                      {broker.max_leverage || "Standard"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Platforms */}
              <Card className="w-[160px]">
                <CardContent className="p-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Platforms</span>
                    <span className="text-lg font-semibold mt-1">
                      {broker.trading_platforms ? (
                        broker.trading_platforms.split(',').length > 1
                          ? `${broker.trading_platforms.split(',')[0].trim()} & More`
                          : broker.trading_platforms
                      ) : "Multiple"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Desktop grid layout */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Min Deposit */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Min. Deposit</span>
                  <span className="text-xl font-semibold mt-1">
                    {broker.min_deposit ? `$${broker.min_deposit}` : "Varies"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Spreads */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Spreads From</span>
                  <span className="text-xl font-semibold mt-1">
                    {broker.spreads_from || "Variable"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Leverage */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Max Leverage</span>
                  <span className="text-xl font-semibold mt-1">
                    {broker.max_leverage || "Standard"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Platforms */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Platforms</span>
                  <span className="text-xl font-semibold mt-1">
                    {broker.trading_platforms ? (
                      broker.trading_platforms.split(',').length > 1
                        ? `${broker.trading_platforms.split(',')[0].trim()} & More`
                        : broker.trading_platforms
                    ) : "Multiple"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Display warning flags if present */}
        {legitimacyData && legitimacyData.warningFlags && legitimacyData.warningFlags.length > 0 && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800">Caution</p>
                <ul className="mt-1 text-sm text-amber-700">
                  {legitimacyData.warningFlags.map((flag, index) => (
                    <li key={index}>{flag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}