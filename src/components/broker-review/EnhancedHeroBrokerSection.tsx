"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  Shield, 
  Users, 
  TrendingUp, 
  ExternalLink,
  Building2,
  Calendar,
  Globe,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Broker {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  description: string;
  min_deposit: number;
  max_leverage: string;
  regulations: string;
  trading_platforms: string;
  spreads_from: string;
  account_types: string[];
  country: string;
  established: string;
  overall_rating: number;
  website_url: string;
  pros: string[];
  cons: string[];
  feature: string;
}

interface EnhancedHeroBrokerSectionProps {
  broker: Broker;
  className?: string;
}

export function EnhancedHeroBrokerSection({ broker, className }: EnhancedHeroBrokerSectionProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-5 w-5",
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <section id="hero" className={cn("scroll-mt-20", className)}>
      {/* Hero Background with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 border">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Broker Information */}
            <div className="space-y-6">
              {/* Broker Logo and Basic Info */}
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 lg:h-20 lg:w-20 rounded-xl overflow-hidden bg-white p-2 shadow-lg">
                  <Image
                    src={broker.logo_url}
                    alt={`${broker.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 64px, 80px"
                  />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    {broker.name} Review 2025
                  </h1>
                  <p className="text-lg text-muted-foreground mt-1">
                    {broker.feature}
                  </p>
                </div>
              </div>

              {/* Rating and Key Metrics */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(broker.overall_rating)}</div>
                  <span className="font-semibold text-lg">{broker.overall_rating}/5</span>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  30M+ Users
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Multi-Regulated
                </Badge>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {broker.description}
              </p>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Min Deposit</p>
                  <p className="font-semibold text-lg">${broker.min_deposit}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Max Leverage</p>
                  <p className="font-semibold text-lg">{broker.max_leverage}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Spreads From</p>
                  <p className="font-semibold text-lg">{broker.spreads_from}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Established</p>
                  <p className="font-semibold text-lg">{broker.established}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={broker.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit {broker.name}
                </a>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => document.getElementById('detailed-fees')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <TrendingUp className="h-4 w-4" />
                  View Fees & Trading Conditions
                </Button>
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="space-y-6">
              {/* Company Info Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Headquarters</p>
                      <p className="font-medium">{broker.country}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Founded</p>
                      <p className="font-medium">{broker.established}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Regulation</p>
                      <p className="font-medium">{broker.regulations}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Platform</p>
                      <p className="font-medium">{broker.trading_platforms}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Highlights */}
              <Card className="border-2 border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Award className="h-5 w-5" />
                    Key Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {broker.pros.slice(0, 4).map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Regulatory Badges */}
              <div className="flex flex-wrap gap-2">
                {broker.regulations.split(', ').map((regulation) => (
                  <Badge key={regulation} variant="outline" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {regulation}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Bar */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: 'Overview', id: 'executive-summary' },
            { label: 'Social Trading', id: 'social-trading' },
            { label: 'Platform', id: 'platform-technology' },
            { label: 'Costs', id: 'detailed-fees' },
            { label: 'Reviews', id: 'reviews' },
            { label: 'Verdict', id: 'expert-verdict' },
          ].map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
