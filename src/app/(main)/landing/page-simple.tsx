"use client"

import { Button } from "@/components/ui/button";
import { ClientSideIcon } from "@/components/ClientSideIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero section */}
      <section className="w-full bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 relative">
              <Badge className="px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 transition-colors">
                <ClientSideIcon name="Sparkles" className="h-3.5 w-3.5 mr-1.5" /> Trusted by traders worldwide
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
                Find the <span className="text-primary relative">
                  Perfect Broker
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/20 -z-10 rounded-full"></span>
                </span> for Your Trading Journey
              </h1>

              <p className="text-xl text-gray-400">
                Expert reviews, side-by-side comparisons, and personalized recommendations to help you make the right choice.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="pulse-on-hover bg-primary hover:bg-primary/90 shadow-lg"
                  asChild
                >
                  <a href="/tools/quiz">
                    <span className="flex items-center">
                      <ClientSideIcon name="Search" className="mr-2 h-4 w-4" /> Find My Broker <ClientSideIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                    </span>
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="hover-glow border-gray-700 text-white"
                  asChild
                >
                  <a href="/tools/compare">
                    <span className="flex items-center">
                      <ClientSideIcon name="ArrowLeftRight" className="mr-2 h-4 w-4" /> Compare Brokers
                    </span>
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative h-[500px] hidden lg:flex items-center justify-center">
              {/* Placeholder for trader image */}
              <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-gray-400">Trader Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We provide comprehensive, unbiased broker reviews to help you make informed trading decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: "BadgeCheck",
                title: 'Comprehensive Reviews',
                description: 'Detailed analysis of trading platforms, fees, features, and user experience',
              },
              {
                icon: "ShieldCheck",
                title: 'Safety First',
                description: 'We only recommend regulated brokers with strong security measures',
              },
              {
                icon: "Trophy",
                title: 'Expert Team',
                description: 'Our analysts have years of experience in the trading industry',
              },
              {
                icon: "Rocket",
                title: 'Up-to-Date Information',
                description: 'We regularly update our reviews to reflect the latest broker offerings',
              }
            ].map((feature) => (
              <Card key={feature.title} className="border-2 bg-card/50 h-full hover:border-primary/30 relative overflow-hidden group">
                <CardHeader className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white dark:bg-black/20 flex items-center justify-center mb-4 shadow-md">
                    <ClientSideIcon name={feature.icon} className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-12">
        <div className="container mx-auto">
          <Card className="bg-primary text-primary-foreground p-8 rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold">Ready to find your perfect broker?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-foreground/90 mb-6">
                Get personalized recommendations based on your trading style, experience level, and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <a href="/tools/quiz">
                    Take the Broker Quiz <ClientSideIcon name="ArrowRight" className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/20" asChild>
                  <a href="/brokers">
                    Browse All Brokers
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}