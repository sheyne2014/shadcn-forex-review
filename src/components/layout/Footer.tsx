import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrokerAnalysisWordLogo } from '@/components/BrokerAnalysisWordLogo';

const footerLinks = [
  {
    title: 'Find Brokers',
    links: [
      { label: 'Best Brokers', href: '/best-brokers' },
      { label: 'For Beginners', href: '/best-brokers/beginners' },
      { label: 'Forex Brokers', href: '/best-brokers/forex' },
      { label: 'Stock Brokers', href: '/best-brokers/stocks' },
      { label: 'Crypto Brokers', href: '/best-brokers/crypto' },
      { label: 'Compare Brokers', href: '/compare' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Broker Comparison', href: '/compare' },
      { label: 'Trading Calculator', href: '/tools/calculator' },
      { label: 'Broker Finder Quiz', href: '/find-my-broker' },
      { label: 'Forex Converter', href: '/tools/converter' },
      { label: 'Scam Broker Check', href: '/verify' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Methodology', href: '/methodology' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Guides', href: '/blog/guides' },
      { label: 'News', href: '/blog/news' },
      { label: 'Forum', href: '/forum' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container max-w-7xl mx-auto py-12 md:py-16 px-4">
        {/* Main footer content - with logo/subscribe on left and links on right */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Logo and newsletter - left side on desktop */}
          <div className="lg:w-1/3 space-y-8">
            <div>
              <Link href="/" className="mb-6 inline-block">
                <BrokerAnalysisWordLogo className="h-8 w-auto" />
              </Link>
              
              <p className="text-muted-foreground text-sm mt-4">
                Expert reviews and comparisons of the best trading brokers. Find the right platform for your needs.
              </p>
            </div>
            
            <div className="w-full">
              <h3 className="font-medium mb-3">Subscribe to our newsletter</h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>

            <div className="flex space-x-5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a 
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            
            <div>
              <a 
                href="mailto:contact@brokeranalysis.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@brokeranalysis.com
              </a>
            </div>
          </div>
          
          {/* Links - right side on desktop */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
              {footerLinks.map((group) => (
                <div key={group.title}>
                  <h3 className="font-medium mb-4">{group.title}</h3>
                  <ul className="space-y-3 text-sm">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t">
        <div className="container max-w-7xl mx-auto py-6 px-4 flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-xs text-muted-foreground">
            © {currentYear} BrokerAnalysis. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 