"use client";

import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  role?: string;
  company?: string;
  image?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  className?: string;
  isVerified?: boolean;
}

export function TestimonialCard({
  name,
  role,
  company,
  image,
  rating,
  content,
  isVerified = false,
  className
}: TestimonialCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg border-2 group",
      className
    )}>
      {/* Subtle gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="p-6 relative z-10">
        <div className="flex items-start gap-4">
          {image ? (
            <div className="relative h-12 w-12 rounded-full overflow-hidden border border-muted">
              <Image
                src={image}
                alt={name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {name.substring(0, 2).toUpperCase()}
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium flex items-center">
                  {name}
                  {isVerified && (
                    <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </h4>
                {(role || company) && (
                  <p className="text-xs text-muted-foreground">
                    {role}{role && company ? ' at ' : ''}{company}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={cn(
                      "mx-0.5",
                      i < rating ? "fill-amber-400 text-amber-400" : "fill-muted/20 text-muted/20"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 text-sm leading-relaxed">
              "{content}"
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}