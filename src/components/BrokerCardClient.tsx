"use client";

import Link from "next/link";
import { ClientSideIcon } from "@/components/ClientSideIcon";
import { cn } from "@/lib/utils";
import { TrustScoreBadge } from "@/components/brokers/TrustScoreBadge";
import { BrokerLogo } from "@/components/brokers/BrokerLogo";

interface BrokerCardClientProps {
  broker: {
    name: string;
    rating: number;
    feature?: string;
    regulations?: string;
    year_founded?: number;
    publicly_traded?: boolean | string;
    id?: string;
    logo_url?: string | null;
  };
  idx: number;
  disableLink?: boolean;
}

export function BrokerCardClient({ broker, idx = 1, disableLink = false }: BrokerCardClientProps) {
  // Format broker name for URL
  const brokerPath = `/broker/${broker.name.toLowerCase().replace(/\s+/g, '-')}`;

  // Calculate trust score
  const trustScore = Math.round(broker.rating * 20); // Convert 5-star rating to /100 score

  const cardContent = (
    <div className="flex flex-col p-2 rounded-md bg-card/50 border border-border/40 hover:bg-primary/5 hover:border-primary/20 transition-all relative z-10 cursor-pointer">
      <div className="flex items-center">
        <div className="mr-3">
          <BrokerLogo
            broker={broker}
            size="md"
            rounded
            withBorder
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{broker.name}</div>
          <div className="flex items-center mt-1">
            <TrustScoreBadge score={trustScore} size="sm" showTooltip={true} />
          </div>
        </div>
        <div className="rounded-full px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium shrink-0 ml-2">
          #{idx}
        </div>
      </div>

      {broker.feature && (
        <div className="mt-2 flex items-center">
          <div className="text-xs bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded-sm inline-flex items-center">
            <ClientSideIcon name="Check" className="h-3 w-3 mr-1" />
            <span>{broker.feature}</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="block">
      {disableLink ? (
        cardContent
      ) : (
        <Link href={brokerPath} className="block">
          {cardContent}
        </Link>
      )}
    </div>
  );
}