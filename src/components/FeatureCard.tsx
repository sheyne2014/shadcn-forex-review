"use client";

import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  variant?: 'default' | 'ghost' | 'outline';
}

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  className,
  iconClassName,
  variant = 'default' 
}: FeatureCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 h-full group",
        variant === 'ghost' && "bg-transparent border-none shadow-none",
        variant === 'outline' && "bg-transparent border-2",
        "hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {variant === 'default' && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <CardHeader className="p-6 pb-2">
        <div 
          className={cn(
            "h-12 w-12 rounded-lg flex items-center justify-center mb-4",
            variant !== 'ghost' ? "bg-primary/10" : "",
            iconClassName
          )}
        >
          <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      
      <CardContent className="p-6 pt-2">
        <p className="text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
} 