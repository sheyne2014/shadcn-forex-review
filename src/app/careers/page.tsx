import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Users, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Careers | Join Our Team of Trading Experts",
  description: "Join our team of trading and fintech experts. View open positions and career opportunities at BrokerAnalysis.",
};

export default function CareersPage() {
  return (
    <main className="container max-w-6xl py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're building the world's most comprehensive trading and broker analysis platform. Join our talented team and help shape the future of trading.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Our Culture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We believe in fostering an environment of innovation, collaboration, and continuous learning. Our team is made up of passionate individuals who are experts in trading, technology, and finance.
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Growth Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We offer competitive compensation, flexible working arrangements, professional development opportunities, and a chance to work on impactful projects in the fintech space.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="border-2 p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-bold mb-6">Current Openings</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Senior Forex Analyst</h3>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Full-time</span>
            </div>
            <p className="text-muted-foreground my-2">
              We're looking for an experienced forex analyst to join our research team and provide in-depth broker analysis.
            </p>
            <Button variant="outline" size="sm">View Position</Button>
          </div>
          
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Frontend Developer</h3>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Remote</span>
            </div>
            <p className="text-muted-foreground my-2">
              Join our development team to build beautiful, responsive, and accessible UI components for our platform.
            </p>
            <Button variant="outline" size="sm">View Position</Button>
          </div>
          
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Content Marketing Specialist</h3>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Part-time</span>
            </div>
            <p className="text-muted-foreground my-2">
              Create engaging, SEO-optimized content related to trading, brokers, and financial markets.
            </p>
            <Button variant="outline" size="sm">View Position</Button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Don't see the right position?</h2>
        <p className="text-muted-foreground mb-6">
          We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file.
        </p>
        <Button asChild>
          <Link href="/contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Us
          </Link>
        </Button>
      </div>
    </main>
  );
} 