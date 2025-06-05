"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  title: string;
  level: number;
  estimatedTime?: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Find active section
      const sections = items.map(item => {
        const element = document.getElementById(item.id);
        return {
          id: item.id,
          offsetTop: element?.offsetTop || 0,
        };
      });

      const currentSection = sections
        .filter(section => section.offsetTop <= scrollPosition)
        .pop();

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const totalReadTime = items.reduce((total, item) => {
    const time = parseInt(item.estimatedTime || '2');
    return total + time;
  }, 0);

  return (
    <div className={cn("w-full", className)}>
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Table of Contents</CardTitle>
            </div>

          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Est. reading time: {totalReadTime} min</span>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <nav className="space-y-1">
            {items.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left h-auto py-2 px-3 transition-all duration-200",
                    item.level === 1 && "font-semibold",
                    item.level === 2 && "pl-6 text-sm",
                    item.level === 3 && "pl-9 text-xs",
                    activeSection === item.id && "bg-primary/10 text-primary border-l-2 border-primary"
                  )}
                  onClick={() => scrollToSection(item.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{item.title}</span>
                    {item.estimatedTime && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.estimatedTime}m
                      </Badge>
                    )}
                  </div>
                </Button>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t">
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Click any section to jump there</p>
                <p>• Scroll progress is tracked automatically</p>
                <p>• This menu becomes sticky when scrolling</p>
              </div>
            </div>
          </CardContent>
      </Card>
    </div>
  );
}

// Hook to generate TOC items from page structure
export function useTableOfContents() {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    const generateTOC = () => {
      const items: TOCItem[] = [
        { id: 'hero', title: 'eToro Overview', level: 1, estimatedTime: '2' },
        { id: 'executive-summary', title: 'Executive Summary', level: 1, estimatedTime: '3' },
        { id: 'company-background', title: 'Company Background', level: 1, estimatedTime: '4' },
        { id: 'regulation-safety', title: 'Regulation & Safety', level: 1, estimatedTime: '5' },
        { id: 'social-trading', title: 'Social Trading Features', level: 1, estimatedTime: '6' },
        { id: 'platform-technology', title: 'Platform & Technology', level: 1, estimatedTime: '4' },
        { id: 'customer-service', title: 'Customer Service', level: 1, estimatedTime: '3' },
        { id: 'trading-conditions', title: 'Trading Conditions', level: 1, estimatedTime: '5' },
        { id: 'platforms', title: 'Trading Platforms', level: 1, estimatedTime: '3' },
        { id: 'reviews', title: 'User Reviews', level: 1, estimatedTime: '2' },
        { id: 'analysis', title: 'Broker Analysis', level: 1, estimatedTime: '4' },
        { id: 'expert-verdict', title: 'Expert Verdict', level: 1, estimatedTime: '3' },
        { id: 'similar', title: 'Similar Brokers', level: 1, estimatedTime: '2' },
        { id: 'faq', title: 'Frequently Asked Questions', level: 1, estimatedTime: '3' },
      ];
      setTocItems(items);
    };

    generateTOC();
  }, []);

  return tocItems;
}
