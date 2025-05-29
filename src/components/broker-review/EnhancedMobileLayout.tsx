"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronUp, 
  Menu, 
  X, 
  Star, 
  TrendingUp, 
  Users, 
  Shield,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedMobileLayoutProps {
  children: React.ReactNode;
  broker: any;
}

export function EnhancedMobileLayout({ children, broker }: EnhancedMobileLayoutProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "overview", label: "Overview", icon: Star },
    { id: "social-trading", label: "Social Trading", icon: Users },
    { id: "trading-conditions", label: "Trading", icon: TrendingUp },
    { id: "platforms", label: "Platforms", icon: Monitor },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "faq", label: "FAQ", icon: Shield }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Update active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
        offset: document.getElementById(section.id)?.offsetTop || 0
      }));

      const currentSection = sectionElements
        .filter(section => section.element)
        .find(section => {
          const rect = section.element!.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Enhanced Mobile Navigation */}
      <div className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {broker?.name?.charAt(0) || "B"}
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-sm">{broker?.name || "Broker"} Review</h1>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="text-xs text-muted-foreground">
                  {broker?.overall_rating || "4.5"}/5
                </span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border/50 shadow-lg">
            <div className="p-4 space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => scrollToSection(section.id)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {section.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
        <Card className="w-48 shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 text-sm">Quick Navigation</h3>
            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => scrollToSection(section.id)}
                  >
                    <Icon className="h-3 w-3 mr-2" />
                    {section.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Enhanced Responsive Design */}
      <div className="container mx-auto px-4 py-6 lg:pl-64">
        {/* Responsive Design Indicators (Development Only) */}
        <div className="fixed bottom-4 left-4 z-50 lg:hidden">
          <div className="flex gap-1">
            <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
              <Smartphone className="h-3 w-3 mr-1 sm:hidden" />
              <Tablet className="h-3 w-3 mr-1 hidden sm:block md:hidden" />
              <Monitor className="h-3 w-3 mr-1 hidden md:block lg:hidden" />
              <span className="text-xs">
                <span className="sm:hidden">Mobile</span>
                <span className="hidden sm:block md:hidden">Tablet</span>
                <span className="hidden md:block lg:hidden">Desktop</span>
              </span>
            </Badge>
          </div>
        </div>

        {/* Enhanced Content Wrapper */}
        <div className="space-y-8 lg:space-y-12">
          {children}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            size="sm"
            className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        )}

        {/* Quick CTA Button for Mobile */}
        <div className="lg:hidden">
          <Button
            asChild
            className="rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-green-600 hover:bg-green-700"
          >
            <a href={broker?.website_url || "#"} target="_blank" rel="noopener noreferrer">
              Visit {broker?.name || "Broker"}
            </a>
          </Button>
        </div>
      </div>

      {/* Enhanced Mobile-First Styles */}
      <style jsx global>{`
        /* Smooth scrolling for all browsers */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced mobile touch targets */
        @media (max-width: 768px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Improved readability on mobile */
        @media (max-width: 640px) {
          .prose p {
            font-size: 16px;
            line-height: 1.6;
          }
          
          .prose h1, .prose h2, .prose h3 {
            line-height: 1.3;
          }
        }

        /* Enhanced focus states for accessibility */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
        }

        /* Smooth transitions for interactive elements */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }

        /* Enhanced card hover effects */
        .hover\\:shadow-lg:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }

        /* Improved mobile scrolling */
        .overflow-x-auto {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--muted-foreground)) transparent;
        }

        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background-color: hsl(var(--muted-foreground));
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
