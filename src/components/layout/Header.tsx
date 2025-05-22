'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, Check, Search, Percent, BarChart3, Globe, BookOpen, Award, DollarSign, Shield, Smartphone, Settings } from 'lucide-react';
import { siteConfig } from '@/config/site';

import { useAuth } from '@/lib/providers/AuthProvider';
import { cn } from '@/lib/utils';
import { BrokerAnalysisWordLogo } from '@/components/BrokerAnalysisWordLogo';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Fix TypeScript interface for the navigation items
interface NavItem {
  label: string;
  href: string;
  children?: NavSection[];
}

interface NavSection {
  heading: string;
  items: NavLink[];
}

interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  {
    label: 'Best Brokers',
    href: '/best-brokers',
    children: [
      {
        heading: 'Find the Perfect Broker',
        items: [
          { label: 'Best Forex Brokers', href: '/best-brokers/forex', icon: <Globe className="h-4 w-4 mr-2" /> },
          { label: 'Best Brokers for Beginners', href: '/best-brokers/beginners', icon: <BookOpen className="h-4 w-4 mr-2" /> },
          { label: 'Low-Cost Brokers', href: '/best-brokers/low-cost', icon: <DollarSign className="h-4 w-4 mr-2" /> },
          { label: 'Best Mobile Trading Apps', href: '/best-brokers/mobile-trading', icon: <Smartphone className="h-4 w-4 mr-2" /> },
          { label: 'Crypto Brokers', href: '/best-brokers/crypto', icon: <BarChart3 className="h-4 w-4 mr-2" /> },
          { label: 'Stock Brokers', href: '/best-brokers/stocks', icon: <BarChart3 className="h-4 w-4 mr-2" /> },
        ]
      },
      {
        heading: 'By Region',
        items: [
          { label: 'Best Brokers in the UK', href: '/best-brokers/uk' },
          { label: 'Best Brokers in the US', href: '/best-brokers/us' },
          { label: 'Best Brokers in Europe', href: '/best-brokers/europe' },
          { label: 'Best Brokers in Australia', href: '/best-brokers/australia' },
          { label: 'Best Brokers in Asia', href: '/best-brokers/asia' },
          { label: 'View All Regions', href: '/best-brokers/regions' },
        ]
      },
    ]
  },
  {
    label: 'Broker Reviews',
    href: '/reviews',
    children: [
      {
        heading: 'Top Broker Reviews',
        items: [
          { label: 'eToro Review', href: '/reviews/etoro' },
          { label: 'XM Review', href: '/reviews/xm' },
          { label: 'IG Review', href: '/reviews/ig' },
          { label: 'Plus500 Review', href: '/reviews/plus500' },
          { label: 'Interactive Brokers Review', href: '/reviews/interactive-brokers' },
          { label: 'See All Reviews', href: '/reviews' },
        ]
      },
      {
        heading: 'Review Categories 2025',
        items: [
          { label: 'Forex Broker Reviews 2025', href: '/reviews/categories/forex' },
          { label: 'CFD Broker Reviews 2025', href: '/reviews/categories/cfd' },
          { label: 'Stock Broker Reviews 2025', href: '/reviews/categories/stocks' },
          { label: 'Crypto Broker Reviews 2025', href: '/reviews/categories/crypto' },
          { label: 'Options Broker Reviews 2025', href: '/reviews/categories/options' },
        ]
      },
    ]
  },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      {
        heading: 'Trading Tools',
        items: [
          { label: 'Broker Comparison', href: '/tools/compare', icon: <BarChart3 className="h-4 w-4 mr-2" /> },
          { label: 'Trading Calculator', href: '/tools/calculator', icon: <Percent className="h-4 w-4 mr-2" /> },
          { label: 'Broker Finder Quiz', href: '/tools/quiz', icon: <Award className="h-4 w-4 mr-2" /> },
          { label: 'Forex Converter', href: '/tools/converter', icon: <DollarSign className="h-4 w-4 mr-2" /> },
          { label: 'Scam Broker Check', href: '/verify', icon: <Shield className="h-4 w-4 mr-2" /> },
        ]
      }
    ]
  },
  {
    label: 'Blog',
    href: '/blog',
    children: [
      {
        heading: 'Latest Topics 2025',
        items: [
          { label: 'Mental Health in Trading 2025', href: '/blog/mental-health-forex-trading-stress-management-mindfulness-2025' },
          { label: 'Carbon-Neutral Brokers 2025', href: '/blog/carbon-neutral-forex-brokers-eco-friendly-green-trading-2025' },
          { label: 'Space Economy & Forex 2025', href: '/blog/space-economy-forex-trading-lunar-asteroid-mining-2025' },
          { label: 'Biometric Security 2025', href: '/blog/biometric-security-forex-trading-fingerprint-facial-authentication-2025' },
          { label: 'VR/AR in Forex 2025', href: '/blog/vr-ar-forex-trading-virtual-reality-immersive-platforms-2025' },
          { label: 'View All Articles', href: '/blog' },
        ]
      },
      {
        heading: 'Blog Categories 2025',
        items: [
          { label: 'Market Analysis 2025', href: '/blog/category/market-analysis' },
          { label: 'Trading Strategies 2025', href: '/blog/category/trading-strategies' },
          { label: 'Trading Technology 2025', href: '/blog/category/trading-technology' },
          { label: 'Regulation Updates 2025', href: '/blog/category/regulation-updates' },
          { label: 'Educational Guides 2025', href: '/blog/category/educational-guides' },
        ]
      }
    ]
  },
  {
    label: 'About Us',
    href: '/about',
    children: [
      {
        heading: '',
        items: [
          { label: 'Who we are', href: '/about' },
          { label: 'Methodology', href: '/methodology' },
          { label: 'Contact', href: '/contact' },
          { label: 'Sign In', href: '/login' },
          { label: 'Admin', href: '/admin', icon: <Settings className="h-4 w-4 mr-2" /> },
        ]
      }
    ]
  },
];

export function Header() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if a nav item is active
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <header className="site-header sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center" aria-label="Go to homepage">
              <BrokerAnalysisWordLogo className="h-8 w-auto" />
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavItems.map((item) => item.children ? (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger className={cn(
                      isActive(item.href) && "text-primary"
                    )}>
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div
                        className={cn(
                          "grid gap-3 p-4 bg-popover",
                          item.label === 'About Us' ? "w-[200px]" : "w-[600px] md:w-[750px] md:grid-cols-2"
                        )}
                      >
                        {item.children.map((section, idx) => (
                          <div key={idx} className="p-3">
                            {section.heading && (
                              <h4 className="mb-3 text-sm font-medium leading-none text-primary">{section.heading}</h4>
                            )}
                            <ul className="space-y-2">
                              {section.items.map((subItem) => (
                                <li key={subItem.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={subItem.href}
                                      className={cn(
                                        "block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                        isActive(subItem.href) && "bg-accent"
                                      )}
                                    >
                                      <div className="text-sm font-medium leading-none flex items-center">
                                        {subItem.icon && subItem.icon}
                                        {subItem.label}
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild className={cn(
                      navigationMenuTriggerStyle(),
                      isActive(item.href) && "text-primary"
                    )}>
                      <Link href={item.href}>
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex-1 flex justify-end items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/find-my-broker" className="flex items-center gap-1">
                <Search className="h-4 w-4" />
                Find My Broker
              </Link>
            </Button>
            <Button variant="destructive" size="sm" asChild className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              <Link href="/verify" className="flex items-center gap-1">
                <Check className="h-4 w-4" />
                Scam Check
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    My Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/reviews">My Reviews</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link href="/" className="flex items-center" aria-label="Go to homepage">
            <BrokerAnalysisWordLogo className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t site-header bg-background" role="navigation" aria-label="Mobile navigation">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {mainNavItems.map((item) => item.children ? (
                <div key={item.href} className="space-y-2">
                  <div className="font-medium">{item.label}</div>
                  <div className="space-y-4 pl-4 border-l-2">
                    {item.children.map((section, idx) => (
                      <div key={idx} className="space-y-2">
                        {section.heading && (
                          <h5 className="text-sm font-medium text-primary">{section.heading}</h5>
                        )}
                        <div className="pl-2 space-y-2">
                          {section.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "flex items-center text-sm",
                                isActive(subItem.href) ? "text-primary font-medium" : "text-muted-foreground"
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.icon && subItem.icon}
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block",
                    isActive(item.href) ? "text-primary font-medium" : "text-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/find-my-broker" className="flex items-center justify-center gap-1">
                  <Search className="h-4 w-4" />
                  Find My Broker
                </Link>
              </Button>

              <Button variant="destructive" size="sm" asChild className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
                <Link href="/verify" className="flex items-center justify-center gap-1">
                  <Check className="h-4 w-4" />
                  Scam Check
                </Link>
              </Button>

              {user ? (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                  </Button>
                  <Button variant="ghost" className="flex items-center justify-center gap-2" onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild>
                    <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}