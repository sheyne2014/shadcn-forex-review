"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Calculator,
  BookOpen,
  Search,
  BarChart3,
  Target
} from 'lucide-react';

interface InternalLinkingWidgetProps {
  currentBroker: string;
  className?: string;
}

export function InternalLinkingWidget({ currentBroker, className }: InternalLinkingWidgetProps) {
  const relatedLinks = [
    {
      category: 'Broker Comparisons',
      icon: BarChart3,
      links: [
        {
          title: `${currentBroker} vs IC Markets`,
          href: `/compare/${currentBroker.toLowerCase()}-vs-ic-markets`,
          description: 'Compare social trading vs ECN execution'
        },
        {
          title: `${currentBroker} vs Pepperstone`,
          href: `/compare/${currentBroker.toLowerCase()}-vs-pepperstone`,
          description: 'Social features vs raw spreads comparison'
        },
        {
          title: 'Best Social Trading Brokers',
          href: '/best-brokers/copy-trading',
          description: 'Top platforms for copy trading'
        }
      ]
    },
    {
      category: 'Trading Tools',
      icon: Calculator,
      links: [
        {
          title: 'Broker Comparison Tool',
          href: '/tools/compare',
          description: 'Side-by-side broker comparison'
        },
        {
          title: 'Trading Calculator',
          href: '/tools/calculator',
          description: 'Calculate position sizes and profits'
        },
        {
          title: 'Find My Broker Quiz',
          href: '/find-my-broker',
          description: 'Personalized broker recommendations'
        }
      ]
    },
    {
      category: 'Broker Categories',
      icon: Target,
      links: [
        {
          title: 'Best Brokers for Beginners',
          href: '/best-brokers/beginners',
          description: 'User-friendly platforms for new traders'
        },
        {
          title: 'Best Forex Brokers',
          href: '/best-brokers/forex',
          description: 'Top-rated forex trading platforms'
        },
        {
          title: 'Low-Cost Brokers',
          href: '/best-brokers/low-cost',
          description: 'Brokers with minimal fees'
        }
      ]
    },
    {
      category: 'Educational Resources',
      icon: BookOpen,
      links: [
        {
          title: 'Social Trading Guide',
          href: '/blog/social-trading-guide',
          description: 'Complete guide to copy trading'
        },
        {
          title: 'Forex Trading for Beginners',
          href: '/blog/forex-trading-beginners',
          description: 'Start your trading journey'
        },
        {
          title: 'Risk Management Strategies',
          href: '/blog/risk-management',
          description: 'Protect your trading capital'
        }
      ]
    }
  ];

  return (
    <div className={className}>
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Related Resources & Comparisons
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {relatedLinks.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-3">
              <div className="flex items-center gap-2">
                <category.icon className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">{category.category}</h3>
              </div>
              <div className="grid gap-2">
                {category.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className="group block p-3 rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">
                          {link.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Action Buttons */}
          <div className="pt-4 border-t space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/tools/compare"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                Compare Brokers
              </Link>
              <Link
                href="/find-my-broker"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              >
                Find My Broker
              </Link>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Best Social Trading',
                'Copy Trading Platforms',
                'Beginner Brokers',
                'Low Spread Brokers',
                'Regulated Brokers'
              ].map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
