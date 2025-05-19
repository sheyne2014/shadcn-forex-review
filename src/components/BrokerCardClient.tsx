"use client";

import Link from "next/link";
import Image from "next/image";
import { ClientSideIcon } from "@/components/ClientSideIcon";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TrustScoreBadge } from "@/components/brokers/TrustScoreBadge";
import { calculateTrustScore } from "@/lib/trust-score";

interface BrokerCardClientProps {
  broker: {
    name: string;
    rating: number;
    feature?: string;
    regulations?: string;
    year_founded?: number;
    publicly_traded?: boolean | string;
  };
  idx: number;
}

export function BrokerCardClient({ broker, idx = 1 }: BrokerCardClientProps) {
  const [logoError, setLogoError] = useState(false);
  
  // Format broker name for URL
  const brokerPath = `/broker/${broker.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Format broker ID for logo
  const brokerId = broker.name.toLowerCase().replace(/\s+/g, '-');
  
  // Logo URL using clearbit - remove any trailing .com from brokerId to prevent double .com
  const domain = brokerId.replace(/-/g, '').replace(/\.com$/, '');
  const logoUrl = `https://logo.clearbit.com/${domain}.com`;
  
  // Calculate initials for fallback
  const initials = broker.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Calculate trust score
  const trustScore = Math.round(broker.rating * 20); // Convert 5-star rating to /100 score
  
  // Pre-calculate star display to avoid client/server mismatch (keeping this for backward compatibility)
  const rating = broker.rating || 4.5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  
  // Pre-generate stars array for consistent rendering
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let starType = "text-muted-foreground/30";
    if (i < fullStars) {
      starType = "text-amber-500";
    } else if (i === fullStars && halfStar) {
      starType = "text-amber-300";
    }
    stars.push(starType);
  }

  // Fallback logo with user initials if the broker doesn't have a standard domain
  const getFallbackLogo = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&background=random&color=fff&size=64&bold=true&format=png`;
  };

  return (
    <div className="block">
      <div className="flex flex-col p-2 rounded-md bg-card/50 border border-border/40 hover:bg-primary/5 hover:border-primary/20 transition-all relative z-10 cursor-pointer">
        <Link href={brokerPath} className="block">
          <div className="flex items-center">
            <div className="relative h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary font-semibold overflow-hidden border">
              {logoError ? (
                <span>{initials}</span>
              ) : (
                <Image
                  src={logoUrl}
                  alt={broker.name}
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                  onError={(e) => {
                    // First try the fallback API
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = getFallbackLogo();
                    // If that also fails, show initials
                    target.onerror = () => {
                      setLogoError(true);
                    };
                  }}
                />
              )}
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
        </Link>
        {broker.feature && (
          <div className="mt-2 flex items-center">
            <div className="text-xs bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded-sm inline-flex items-center">
              <ClientSideIcon name="Check" className="h-3 w-3 mr-1" />
              <span>{broker.feature}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 