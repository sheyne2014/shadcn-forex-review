"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Building2,
  Calculator,
  Users,
  Mail,
  ArrowLeft,
  ExternalLink,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BrokerPageNavigationProps {
  currentBroker?: string;
  className?: string;
}

export function BrokerPageNavigation({ currentBroker, className }: BrokerPageNavigationProps) {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  // Prevent hydration mismatch by only showing navigation after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const navigationItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      description: "Back to homepage"
    },
    {
      href: "/about",
      label: "About",
      icon: Users,
      description: "About BrokerAnalysis"
    },
    {
      href: "/#essential-tools",
      label: "Tools",
      icon: Calculator,
      description: "Trading calculators & tools"
    },
    {
      href: "/brokers",
      label: "Brokers",
      icon: Building2,
      description: "All broker reviews"
    },
    {
      href: "/contact",
      label: "Contact",
      icon: Mail,
      description: "Get in touch"
    }
  ];

  return (
    <nav className={cn("bg-muted/30 border-b border-border/50", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Main Navigation */}
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isHydrated && (
                (item.href.startsWith('/#') ? pathname === '/' : pathname === item.href) ||
                (item.href === "/brokers" && pathname.startsWith("/broker"))
              );

              // Handle anchor links differently to prevent hydration issues
              if (item.href.startsWith('/#')) {
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.location.href = item.href;
                      }
                    }}
                    className={cn(
                      "flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              }

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center gap-2 text-sm",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Current Broker Badge */}
          {currentBroker && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden md:flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Reviewing: {currentBroker}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

/**
 * Internal linking component for broker pages
 * Helps with SEO by providing contextual internal links
 */
interface BrokerInternalLinksProps {
  currentBroker: string;
  brokerSlug: string;
  className?: string;
}

export function BrokerInternalLinks({
  currentBroker,
  brokerSlug,
  className
}: BrokerInternalLinksProps) {
  // Related broker suggestions based on common patterns
  const getRelatedBrokers = (slug: string) => {
    const brokerSuggestions: Record<string, string[]> = {
      "xtb": ["etoro", "xm", "ic-markets"],
      "etoro": ["xtb", "plus500", "avatrade"],
      "xm": ["xtb", "fxpro", "hotforex"],
      "ic-markets": ["xtb", "pepperstone", "fp-markets"],
      "plus500": ["etoro", "avatrade", "trading-212"],
      "oanda": ["fxcm", "forex-com", "saxo-bank"],
      "interactive-brokers": ["td-ameritrade", "charles-schwab", "fidelity"],
      "pepperstone": ["ic-markets", "fp-markets", "axi"],
      "fxpro": ["xm", "hotforex", "fxtm"],
      "avatrade": ["etoro", "plus500", "fxpro"]
    };

    return brokerSuggestions[slug] || ["etoro", "xm", "ic-markets"];
  };

  const relatedBrokers = getRelatedBrokers(brokerSlug);

  const toolLinks = [
    {
      href: "/tools/compare",
      label: "Broker Comparison Tool",
      description: `Compare ${currentBroker} with other brokers`,
      icon: BarChart3
    },
    {
      href: "/tools/calculator",
      label: "Trading Calculator",
      description: "Calculate position sizes and risk",
      icon: Calculator
    }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Related Tools */}
      <div className="bg-muted/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Related Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolLinks.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href}>
                <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors group">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {tool.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tool.description}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Related Broker Reviews */}
      <div className="bg-muted/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Related Broker Reviews
        </h3>
        <div className="space-y-3">
          {relatedBrokers.map((slug) => {
            const brokerName = slug.split('-').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');

            return (
              <Link key={slug} href={`/brokers/${slug}`}>
                <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors group">
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {brokerName} Review
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Compare with {currentBroker}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <Link href="/brokers">
            <Button variant="outline" className="w-full">
              <Building2 className="h-4 w-4 mr-2" />
              View All Broker Reviews
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Breadcrumb navigation component
 */
interface BrokerBreadcrumbsProps {
  brokerName: string;
  brokerSlug: string;
  className?: string;
}

export function BrokerBreadcrumbs({
  brokerName,
  brokerSlug,
  className
}: BrokerBreadcrumbsProps) {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm text-muted-foreground", className)}>
      <Link href="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link href="/brokers" className="hover:text-primary transition-colors">
        Brokers
      </Link>
      <span>/</span>
      <Link href={`/brokers/${brokerSlug}`} className="text-foreground font-medium">
        {brokerName} Review
      </Link>
    </nav>
  );
}
