"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ArrowRightLeft } from "lucide-react";
import { useState, useEffect } from "react";

interface BrokerComparisonCardProps {
  broker1: {
    id: string;
    name: string;
  };
  broker2: {
    id: string;
    name: string;
  };
  category: string;
  views?: string;
}

export function BrokerComparisonCard({ broker1, broker2, category, views = "1K+" }: BrokerComparisonCardProps) {
  // State for broker logo images
  const [broker1Img, setBroker1Img] = useState<string | null>(null);
  const [broker2Img, setBroker2Img] = useState<string | null>(null);
  
  // Generate fallback logo if the broker doesn't have a standard domain
  const getFallbackLogo = (brokerName: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(brokerName)}&background=random&color=fff&size=64&bold=true&format=png`;
  };
  
  // Set logo URLs using useEffect to avoid hydration mismatch
  useEffect(() => {
    // Generate logo URLs based on broker IDs using clearbit
    setBroker1Img(`https://logo.clearbit.com/${broker1.id.replace(/-/g, '')}.com`);
    setBroker2Img(`https://logo.clearbit.com/${broker2.id.replace(/-/g, '')}.com`);
  }, [broker1.id, broker2.id]);

  return (
    <Link
      href={`/compare/${broker1.id}-vs-${broker2.id}`}
      className="block h-full"
    >
      <Card className="hover:shadow-md transition-all text-center border-2 h-full hover:border-primary/30">
        <CardHeader className="pb-2">
          <Badge variant="secondary" className="mb-2 mx-auto">{category}</Badge>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-muted/20 border">
              {broker1Img && (
                <Image
                  src={broker1Img}
                  alt={broker1.name}
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                  onError={() => setBroker1Img(getFallbackLogo(broker1.name))}
                />
              )}
              {!broker1Img && (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                  {broker1.name.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-muted-foreground font-bold">vs</span>
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-muted/20 border">
              {broker2Img && (
                <Image
                  src={broker2Img}
                  alt={broker2.name}
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                  onError={() => setBroker2Img(getFallbackLogo(broker2.name))}
                />
              )}
              {!broker2Img && (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                  {broker2.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
          <CardTitle className="text-lg flex items-center justify-center">
            <span>{broker1.name}</span>
            <span className="mx-2 text-muted-foreground">vs</span>
            <span>{broker2.name}</span>
          </CardTitle>
          <Badge variant="outline" className="mx-auto mt-1 flex items-center">
            <Eye className="h-3 w-3 mr-1" /> {views} views
          </Badge>
        </CardHeader>
        <CardFooter className="pt-2 pb-4">
          <div className="w-full text-center flex justify-between items-center text-sm font-medium text-muted-foreground">
            <span>Compare Side by Side</span>
            <ArrowRightLeft className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}