import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronRight, Check, X } from 'lucide-react';

import { Broker } from '@/lib/database-types';
import { cn, formatCurrency } from '@/lib/utils';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Extend the Broker type to include logo_url which might be added later
type ExtendedBroker = Broker & {
  logo_url: string | null;
  supported_assets: string[] | null;
  match_score?: number;
};

type BrokerCardProps = {
  broker: ExtendedBroker;
  ranking?: number;
  className?: string;
  showRanking?: boolean;
  showRating?: boolean;
  showMinDeposit?: boolean;
  showPros?: boolean;
  showMatchScore?: boolean;
  matchScore?: number;
  prosList?: string[];
  consList?: string[];
};

export function BrokerCard({
  broker,
  ranking,
  className,
  showRanking = false,
  showRating = true,
  showMinDeposit = true,
  showPros = true,
  showMatchScore = false,
  matchScore,
  prosList = ['Low minimum deposit', 'User-friendly platform', 'Fast withdrawals'],
  consList = [],
}: BrokerCardProps) {
  // Helper function to render stars for ratings
  const renderRatingStars = (rating: number | null) => {
    if (rating === null) return null;
    const fullRating = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const isFilled = i < fullRating;
      stars.push(
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            isFilled ? "fill-amber-400 text-amber-400" : "text-gray-300"
          )}
        />
      );
    }

    return (
      <div className="flex items-center gap-0.5">
        {stars}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Use matchScore from props or from broker if available
  const displayMatchScore = matchScore ?? broker.match_score;

  return (
    <Card
      className={cn(
        "overflow-hidden h-full transition-shadow duration-200 hover:shadow-lg bg-card",
        className
      )}>
      {showRanking && ranking !== undefined && (
        <div className="absolute top-0 left-0 bg-primary text-primary-foreground font-bold py-1 px-3 rounded-br-md">
          #{ranking}
        </div>
      )}

      <CardHeader className="space-y-1 pb-2">
        <div className="flex items-center justify-between">
          <div className="relative h-14 w-36">
            {broker.logo_url ? (
              <Image
                src={broker.logo_url}
                alt={`${broker.name} logo`}
                fill
                className="object-contain"
              />
            ) : (
              <div className="h-14 w-36 bg-gray-100 flex items-center justify-center text-gray-400">
                {broker.name}
              </div>
            )}
          </div>

          {showRating && broker.rating && renderRatingStars(broker.rating)}
        </div>

        <CardTitle className="text-xl font-semibold mt-2">
          {broker.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {showMatchScore && displayMatchScore !== undefined && (
          <div className="mb-3 -mt-1">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${displayMatchScore}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">Match Score</span>
              <span className="text-xs font-medium">{displayMatchScore}%</span>
            </div>
          </div>
        )}

        {showMinDeposit && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Min. Deposit</span>
            <span className="font-semibold">{formatCurrency(broker.min_deposit)}</span>
          </div>
        )}

        {broker.trading_fee !== null && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Trading Fee</span>
            <span className="font-semibold">{broker.trading_fee}%</span>
          </div>
        )}

        {broker.supported_assets && broker.supported_assets.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Assets</span>
            <div className="flex flex-wrap justify-end gap-1">
              {broker.supported_assets.map((asset, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {asset}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {showPros && prosList.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Pros</p>
            <ul className="space-y-1">
              {prosList.slice(0, 3).map((pro, index) => (
                <li key={index} className="flex items-center text-xs">
                  <Check className="h-3 w-3 text-green-500 mr-1.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {consList && consList.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Cons</p>
            <ul className="space-y-1">
              {consList.slice(0, 2).map((con, index) => (
                <li key={index} className="flex items-center text-xs">
                  <X className="h-3 w-3 text-red-500 mr-1.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {broker.regulations && (
          <div>
            <Badge variant="outline" className="text-xs">
              {broker.regulations}
            </Badge>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        <Button asChild className="w-full" variant="default" size="sm">
          <Link href={broker.name.toLowerCase() === 'etoro' ? '/broker/etoro' : `/broker/${broker.id}`}>
            Read Review <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}