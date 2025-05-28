"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  Star, 
  Users, 
  Award, 
  CheckCircle, 
  Lock,
  Globe,
  TrendingUp,
  Verified,
  Clock
} from "lucide-react";

interface TrustSignalsProps {
  variant?: 'default' | 'compact' | 'detailed';
  showSecurityBadges?: boolean;
  showTestimonials?: boolean;
  showStats?: boolean;
  showCertifications?: boolean;
  className?: string;
}

export function TrustSignals({
  variant = 'default',
  showSecurityBadges = true,
  showTestimonials = true,
  showStats = true,
  showCertifications = true,
  className
}: TrustSignalsProps) {

  const securityBadges = [
    {
      name: "SSL Secured",
      icon: <Lock className="h-4 w-4" />,
      description: "256-bit SSL encryption",
      verified: true
    },
    {
      name: "GDPR Compliant",
      icon: <Shield className="h-4 w-4" />,
      description: "EU data protection standards",
      verified: true
    },
    {
      name: "SOC 2 Certified",
      icon: <Verified className="h-4 w-4" />,
      description: "Security & availability controls",
      verified: true
    },
    {
      name: "ISO 27001",
      icon: <Award className="h-4 w-4" />,
      description: "Information security management",
      verified: true
    }
  ];

  const testimonials = [
    {
      text: "BrokerAnalysis helped me find the perfect broker for my trading style. Their reviews are thorough and unbiased.",
      author: "Sarah M.",
      role: "Day Trader",
      rating: 5
    },
    {
      text: "The comparison tool saved me hundreds in fees. I wish I had found this site earlier!",
      author: "Michael R.",
      role: "Swing Trader",
      rating: 5
    },
    {
      text: "Excellent resource for broker research. The scam check feature is particularly valuable.",
      author: "Jennifer L.",
      role: "Investment Advisor",
      rating: 5
    }
  ];

  const stats = [
    {
      value: "50,000+",
      label: "Traders Helped",
      icon: <Users className="h-5 w-5" />
    },
    {
      value: "200+",
      label: "Brokers Reviewed",
      icon: <Globe className="h-5 w-5" />
    },
    {
      value: "4.9/5",
      label: "User Rating",
      icon: <Star className="h-5 w-5" />
    },
    {
      value: "5+ Years",
      label: "Experience",
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const certifications = [
    {
      name: "Financial Industry Expert",
      issuer: "CFA Institute",
      year: "2023"
    },
    {
      name: "Trading Platform Specialist",
      issuer: "Financial Markets Association",
      year: "2023"
    },
    {
      name: "Risk Management Certified",
      issuer: "Global Risk Institute",
      year: "2022"
    }
  ];

  if (variant === 'compact') {
    return (
      <div className={cn("flex flex-wrap items-center gap-4", className)}>
        {showStats && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium">4.9/5</span>
              <span className="text-muted-foreground">(2,847 reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-medium">50,000+</span>
              <span className="text-muted-foreground">traders helped</span>
            </div>
          </div>
        )}
        
        {showSecurityBadges && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              SSL Secured
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              GDPR Compliant
            </Badge>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Security Badges */}
      {showSecurityBadges && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Security & Compliance</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {securityBadges.map((badge, index) => (
                <div key={index} className="text-center p-3 border rounded-lg hover:border-primary/50 transition-colors">
                  <div className="flex justify-center mb-2 text-primary">
                    {badge.icon}
                  </div>
                  <div className="font-medium text-sm mb-1">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                  {badge.verified && (
                    <CheckCircle className="h-3 w-3 text-green-500 mx-auto mt-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      {showStats && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Trusted by Traders Worldwide</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testimonials */}
      {showTestimonials && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">What Traders Say</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm mb-3 italic">"{testimonial.text}"</p>
                  <div className="text-xs">
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {showCertifications && variant === 'detailed' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Professional Certifications</h3>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                  </div>
                  <Badge variant="outline">{cert.year}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trust Summary */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why Trust BrokerAnalysis?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Independent reviews with no broker partnerships</li>
                <li>• Rigorous testing methodology for all platforms</li>
                <li>• Regular updates to ensure accuracy</li>
                <li>• Transparent rating criteria and methodology</li>
                <li>• Expert team with 5+ years in financial markets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Preset configurations
export const TrustSignalPresets = {
  header: {
    variant: 'compact' as const,
    showSecurityBadges: true,
    showTestimonials: false,
    showStats: true,
    showCertifications: false,
  },
  
  footer: {
    variant: 'default' as const,
    showSecurityBadges: true,
    showTestimonials: false,
    showStats: true,
    showCertifications: false,
  },
  
  brokerPage: {
    variant: 'detailed' as const,
    showSecurityBadges: true,
    showTestimonials: true,
    showStats: true,
    showCertifications: true,
  },
  
  homepage: {
    variant: 'default' as const,
    showSecurityBadges: true,
    showTestimonials: true,
    showStats: true,
    showCertifications: false,
  }
} as const;
