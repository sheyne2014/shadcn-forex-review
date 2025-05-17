"use client";

import Link from "next/link";
import { ClientSideIcon } from "@/components/ClientSideIcon";

interface BrokerCardClientProps {
  broker: {
    name: string;
    rating: number;
    feature?: string;
  };
  idx: number;
}

export function BrokerCardClient({ broker, idx = 1 }: BrokerCardClientProps) {
  // Format broker name for URL
  const brokerPath = `/broker/${broker.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Calculate initials
  const initials = broker.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Pre-calculate star display to avoid client/server mismatch
  const rating = broker.rating || 4.5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  
  // Pre-generate stars array for consistent rendering
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let className = "inline-block h-3 w-3 text-xs ";
    if (i < fullStars) {
      className += "text-amber-500";
    } else if (i === fullStars && halfStar) {
      className += "text-amber-300";
    } else {
      className += "text-muted-foreground/30";
    }
    stars.push(className);
  }

  return (
    <Link href={brokerPath} className="block">
      <div
        className="flex flex-col p-2 rounded-md bg-card/50 border border-border/40 hover:bg-primary/5 hover:border-primary/20 transition-all relative z-10 cursor-pointer"
      >
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary font-semibold">
            {initials}
          </div>
          <div className="flex-1">
            <span className="font-medium hover:underline">{broker.name}</span>
            <div className="flex items-center mt-1 text-amber-500">
              {/* Simple star rating display with pre-calculated classes */}
              {stars.map((className, i) => (
                <span key={i} className={className}>★</span>
              ))}
              <span className="text-xs ml-1 text-muted-foreground">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="rounded-full px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium">
            #{idx}
          </div>
        </div>
        {broker.feature && (
          <div className="mt-2 flex items-center">
            <span className="text-xs bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded-sm inline-flex items-center">
              <ClientSideIcon name="Check" className="h-3 w-3 mr-1" /> {broker.feature}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
} 