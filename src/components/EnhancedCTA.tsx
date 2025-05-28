"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";

interface EnhancedCTAProps {
  title: string;
  description?: string;
  primaryAction: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  className?: string;
  variant?: 'default' | 'gradient' | 'outline' | 'premium' | 'urgent';
  size?: 'small' | 'default' | 'large';
  badge?: string;
  testimonial?: {
    text: string;
    author: string;
  };
  features?: readonly string[];
  urgency?: boolean;
  trustSignals?: boolean;
}

export function EnhancedCTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  variant = 'default',
  size = 'default',
  badge,
  testimonial,
  features,
  urgency = false,
  trustSignals = false
}: EnhancedCTAProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return "bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-2xl";
      case 'premium':
        return "bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white shadow-2xl";
      case 'urgent':
        return "bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white shadow-2xl animate-pulse";
      case 'outline':
        return "bg-background border-2 border-primary/20 hover:border-primary/40 shadow-lg";
      default:
        return "bg-primary text-primary-foreground shadow-xl";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return "p-6";
      case 'large':
        return "p-10 md:p-16";
      default:
        return "p-8 md:p-12";
    }
  };

  const getPrimaryButtonStyles = () => {
    switch (variant) {
      case 'gradient':
      case 'premium':
      case 'urgent':
        return "bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold";
      case 'outline':
        return "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold";
      default:
        return "bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold";
    }
  };

  const getSecondaryButtonStyles = () => {
    switch (variant) {
      case 'gradient':
      case 'premium':
      case 'urgent':
        return "bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm";
      case 'outline':
        return "bg-transparent hover:bg-muted text-foreground border-muted-foreground/20";
      default:
        return "bg-white/10 hover:bg-white/20 text-primary-foreground border-white/20";
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden relative",
        getVariantStyles(),
        getSizeStyles(),
        className
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {variant === 'premium' && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600" />
      )}

      <div className="relative z-10">
        {/* Badge */}
        {badge && (
          <div className="mb-4">
            <Badge
              className={cn(
                "px-3 py-1 text-sm font-medium",
                variant === 'outline' ? "bg-primary/10 text-primary" : "bg-white/20 text-white"
              )}
            >
              {urgency && <Zap className="h-3 w-3 mr-1" />}
              {badge}
            </Badge>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-4 mb-6">
          <h2 className={cn(
            "font-bold leading-tight",
            size === 'small' ? "text-xl" : size === 'large' ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
          )}>
            {title}
          </h2>

          {description && (
            <p className={cn(
              "opacity-90 leading-relaxed",
              size === 'small' ? "text-sm" : "text-lg"
            )}>
              {description}
            </p>
          )}

          {/* Features List */}
          {features && features.length > 0 && (
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm opacity-90">
                  <div className={cn(
                    "w-4 h-4 rounded-full flex items-center justify-center",
                    variant === 'outline' ? "bg-primary/20" : "bg-white/20"
                  )}>
                    <ArrowRight className="w-2 h-2" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          )}

          {/* Testimonial */}
          {testimonial && (
            <div className={cn(
              "p-4 rounded-lg border-l-4",
              variant === 'outline' ? "bg-muted/50 border-primary" : "bg-white/10 border-white/30"
            )}>
              <p className="text-sm italic mb-2">"{testimonial.text}"</p>
              <p className="text-xs opacity-75">— {testimonial.author}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button
            size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'default'}
            className={getPrimaryButtonStyles()}
            asChild
          >
            <Link href={primaryAction.href} className="flex items-center justify-center gap-2">
              {primaryAction.icon}
              {primaryAction.text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          {secondaryAction && (
            <Button
              size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'default'}
              variant="outline"
              className={getSecondaryButtonStyles()}
              asChild
            >
              <Link href={secondaryAction.href} className="flex items-center justify-center gap-2">
                {secondaryAction.icon}
                {secondaryAction.text}
              </Link>
            </Button>
          )}
        </div>

        {/* Trust Signals */}
        {trustSignals && (
          <div className="flex flex-wrap items-center gap-4 text-xs opacity-75">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Secure & Regulated</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>Trusted by 50,000+ traders</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>Expert verified</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Preset CTA configurations (without JSX for SSR compatibility)
export const CTAPresets = {
  brokerFinder: {
    title: "Find Your Perfect Broker in 60 Seconds",
    description: "Answer a few questions and get personalized broker recommendations based on your trading style and needs.",
    primaryAction: {
      text: "Start Quiz",
      href: "/tools/quiz"
    },
    secondaryAction: {
      text: "Browse All Brokers",
      href: "/brokers"
    },
    variant: 'gradient' as const,
    badge: "Most Popular",
    features: [
      "Personalized recommendations",
      "Compare top-rated brokers",
      "Expert analysis included"
    ] as const,
    trustSignals: true
  },

  scamCheck: {
    title: "Protect Yourself from Broker Scams",
    description: "Verify if a broker is legitimate before depositing your money. Our database tracks known scam brokers.",
    primaryAction: {
      text: "Check Broker Safety",
      href: "/verify"
    },
    variant: 'urgent' as const,
    badge: "Security Alert",
    urgency: true,
    features: [
      "Real-time scam database",
      "Regulation verification",
      "User reports & warnings"
    ] as const
  },

  comparison: {
    title: "Compare Brokers Side by Side",
    description: "Get detailed comparisons of trading fees, features, and conditions to make informed decisions.",
    primaryAction: {
      text: "Compare Now",
      href: "/tools/compare"
    },
    variant: 'premium' as const,
    badge: "Pro Tool",
    features: [
      "Detailed fee analysis",
      "Feature comparison",
      "Expert ratings"
    ] as const
  }
} as const;
