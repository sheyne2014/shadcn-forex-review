"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Star, Users, Calculator, Search } from "lucide-react";

interface InternalLinkingWidgetProps {
  currentPage?: string;
  category?: string;
  brokerName?: string;
  showRelatedBrokers?: boolean;
  showRelatedTools?: boolean;
  showRelatedCategories?: boolean;
}

export function InternalLinkingWidget({
  currentPage = '',
  category = '',
  brokerName = '',
  showRelatedBrokers = true,
  showRelatedTools = true,
  showRelatedCategories = true
}: InternalLinkingWidgetProps) {

  // Related broker links based on current context
  const getRelatedBrokers = () => {
    const allBrokers = [
      { name: 'eToro', slug: 'etoro', category: 'Social Trading', rating: 4.7 },
      { name: 'Interactive Brokers', slug: 'interactive-brokers', category: 'Professional', rating: 4.8 },
      { name: 'XTB', slug: 'xtb', category: 'Stocks & Forex', rating: 4.7 },
      { name: 'OANDA', slug: 'oanda', category: 'Forex', rating: 4.6 },
      { name: 'Pepperstone', slug: 'pepperstone', category: 'Forex', rating: 4.7 },
      { name: 'IC Markets', slug: 'ic-markets', category: 'ECN', rating: 4.8 },
      { name: 'Plus500', slug: 'plus500', category: 'CFD', rating: 4.5 },
      { name: 'Capital.com', slug: 'capital-com', category: 'Beginner', rating: 4.6 },
      { name: 'Saxo Bank', slug: 'saxo-bank', category: 'Premium', rating: 4.7 },
      { name: 'XM', slug: 'xm', category: 'Forex', rating: 4.6 }
    ];

    // Filter out current broker and return 4 related ones
    return allBrokers
      .filter(broker => broker.slug !== brokerName?.toLowerCase())
      .slice(0, 4);
  };

  // Related tools based on current page context
  const getRelatedTools = () => {
    const tools = [
      {
        name: 'Broker Comparison Tool',
        href: '/tools/compare',
        description: 'Compare brokers side by side',
        icon: <ArrowRight className="h-4 w-4" />
      },
      {
        name: 'Trading Calculator',
        href: '/tools/calculator',
        description: 'Calculate pip values and margins',
        icon: <Calculator className="h-4 w-4" />
      },
      {
        name: 'Broker Finder Quiz',
        href: '/tools/quiz',
        description: 'Find your perfect broker',
        icon: <Search className="h-4 w-4" />
      },
      {
        name: 'Forex Converter',
        href: '/tools/converter',
        description: 'Real-time currency conversion',
        icon: <TrendingUp className="h-4 w-4" />
      }
    ];

    return tools.slice(0, 3);
  };

  // Related categories based on current context
  const getRelatedCategories = () => {
    const categories = [
      { name: 'Best Forex Brokers', href: '/best-brokers/forex', count: '50+' },
      { name: 'Best for Beginners', href: '/best-brokers/beginners', count: '25+' },
      { name: 'Low-Cost Brokers', href: '/best-brokers/low-cost', count: '30+' },
      { name: 'Crypto Brokers', href: '/best-brokers/crypto', count: '40+' },
      { name: 'Stock Brokers', href: '/best-brokers/stocks', count: '35+' },
      { name: 'Mobile Trading', href: '/best-brokers/mobile-trading', count: '45+' }
    ];

    // Filter out current category
    return categories
      .filter(cat => !currentPage.includes(cat.href))
      .slice(0, 4);
  };

  // Popular comparisons
  const getPopularComparisons = () => {
    return [
      { brokers: 'eToro vs Plus500', href: '/compare/etoro-vs-plus500' },
      { brokers: 'XTB vs Interactive Brokers', href: '/compare/xtb-vs-interactive-brokers' },
      { brokers: 'OANDA vs Pepperstone', href: '/compare/oanda-vs-pepperstone' },
      { brokers: 'IC Markets vs XM', href: '/compare/ic-markets-vs-xm' }
    ];
  };

  return (
    <div className="space-y-6">
      {/* Related Brokers */}
      {showRelatedBrokers && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-primary" />
              Related Brokers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getRelatedBrokers().map((broker) => (
                <Link
                  key={broker.slug}
                  href={`/broker/${broker.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors group"
                >
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {broker.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {broker.category} • ⭐ {broker.rating}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Link
                href="/brokers"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all brokers <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Tools */}
      {showRelatedTools && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5 text-primary" />
              Trading Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getRelatedTools().map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {tool.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tool.description}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Categories */}
      {showRelatedCategories && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Broker Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {getRelatedCategories().map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors group"
                >
                  <div className="font-medium group-hover:text-primary transition-colors">
                    {category.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Link
                href="/best-brokers"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all categories <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Comparisons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Popular Comparisons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {getPopularComparisons().map((comparison) => (
              <Link
                key={comparison.href}
                href={comparison.href}
                className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors group"
              >
                <div className="font-medium group-hover:text-primary transition-colors">
                  {comparison.brokers}
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t">
            <Link
              href="/tools/compare"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Compare any brokers <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
