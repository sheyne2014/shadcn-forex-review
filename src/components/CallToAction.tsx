"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CallToActionProps {
  title: string;
  description?: string;
  primaryAction: {
    text: string;
    href: string;
    icon?: boolean;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  className?: string;
  variant?: 'default' | 'gradient' | 'outline';
  size?: 'default' | 'large' | 'small';
  primaryButtonProps?: Record<string, any>;
  secondaryButtonProps?: Record<string, any>;
}

export function CallToAction({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  variant = 'default',
  size = 'default',
  primaryButtonProps,
  secondaryButtonProps
}: CallToActionProps) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden relative",
        variant === 'default' && "bg-primary text-primary-foreground",
        variant === 'gradient' && "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
        variant === 'outline' && "bg-background border-2 border-muted",
        size === 'small' && "p-6",
        size === 'default' && "p-8 md:p-10",
        size === 'large' && "p-10 md:p-16",
        className
      )}
    >
      {/* Decorative elements for gradient variant */}
      {variant === 'gradient' && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </>
      )}

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 md:space-y-4 md:max-w-2xl">
          <h2
            className={cn(
              size === 'small' && "text-xl md:text-2xl",
              size === 'default' && "text-2xl md:text-3xl",
              size === 'large' && "text-3xl md:text-4xl",
              "font-bold"
            )}
          >
            {title}
          </h2>

          {description && (
            <p
              className={cn(
                variant !== 'default' && variant !== 'gradient' && "text-muted-foreground",
                variant === 'default' || variant === 'gradient' ? "text-primary-foreground/90" : "",
                "text-sm md:text-base"
              )}
            >
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Button
            size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'default'}
            variant={variant === 'outline' ? 'default' : 'secondary'}
            asChild
            {...primaryButtonProps}
          >
            <Link href={primaryAction.href}>
              <span className="flex items-center">
                {primaryAction.text}
                {primaryAction.icon && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </span>
            </Link>
          </Button>

          {secondaryAction && (
            <Button
              size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'default'}
              variant={variant === 'outline' ? 'outline' : 'ghost'}
              asChild
              {...secondaryButtonProps}
            >
              <Link href={secondaryAction.href}>
                <span>{secondaryAction.text}</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}