import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Globe, Award, ShieldCheck, Users, LineChart, BookOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQAccordion } from '@/components/FAQAccordion';
import { CallToAction } from '@/components/CallToAction';

export const metadata: Metadata = {
  title: 'About Us | BrokerAnalysis Forex Reviews 2025',
  description: 'Learn about BrokerAnalysis, your trusted source for forex broker reviews. Meet our team and discover our mission to empower traders in 2025.',
};

export default function AboutPage() {
  return (
    <main className="container max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Who We Are</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          BrokerAnalysis was founded with a simple mission: provide traders with accurate, 
          transparent, and unbiased information about online brokers.
        </p>
      </section>

      {/* Our Mission */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              Our mission is to help traders make informed decisions about which brokers to trust with their investments. 
              The online trading landscape is complex and often confusing, with hundreds of brokers making similar claims.
            </p>
            <p className="mb-4">
              We believe in transparency, objectivity, and thoroughness in all of our reviews and comparisons. 
              Our team conducts extensive research, tests platforms directly, and constantly updates our reviews 
              to ensure the information we provide is accurate and current.
            </p>
            <p>
              Whether you're a beginner looking for your first broker or an experienced trader seeking a 
              specialized platform, we're here to help you navigate the options and find the best match for your needs.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="/images/about/mission.jpg" 
              alt="BrokerAnalysis team analyzing broker data"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16 bg-muted/30 p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <ShieldCheck className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Independence</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We maintain complete editorial independence from the brokers we review, ensuring our assessments are free from external influence.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Globe className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We're fully transparent about how we conduct reviews, collect data, and make money. We believe users deserve to know exactly how we operate.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <LineChart className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We go to great lengths to ensure the accuracy of all information we publish, with rigorous fact-checking processes and regular updates.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-2" />
              <CardTitle>User-First Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Every decision we make is guided by what's best for our users, not what's most profitable or easiest for us.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Award className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We strive for excellence in everything we do, from the quality of our reviews to the usability of our website.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <BookOpen className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We believe in empowering traders through education, providing resources to help build trading knowledge and skills.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <Card className="text-center p-6">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/10">
              <Image 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt="Sarah Johnson - Founder & CEO at BrokerAnalysis"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Sarah Johnson</h3>
            <p className="text-primary font-medium mb-2">Founder & CEO</p>
            <p className="text-sm text-muted-foreground">
              Former investment banker with 15+ years of experience in financial markets. Sarah founded BrokerAnalysis to bring transparency to forex broker reviews and help traders make informed decisions.
            </p>
          </Card>
          
          {/* Team Member 2 */}
          <Card className="text-center p-6">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/10">
              <Image 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="David Chen - Head of Research at BrokerAnalysis"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">David Chen</h3>
            <p className="text-primary font-medium mb-2">Head of Research</p>
            <p className="text-sm text-muted-foreground">
              Previously a senior analyst at a major hedge fund with expertise in broker evaluation. David leads our research team and ensures all broker reviews meet our rigorous standards.
            </p>
          </Card>
          
          {/* Team Member 3 */}
          <Card className="text-center p-6">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/10">
              <Image 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80" 
                alt="Maria Rodriguez - Content Director at BrokerAnalysis"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Maria Rodriguez</h3>
            <p className="text-primary font-medium mb-2">Content Director</p>
            <p className="text-sm text-muted-foreground">
              Financial journalist with a decade of experience covering online trading platforms. Maria oversees our content strategy and ensures all educational materials are accurate and accessible.
            </p>
          </Card>
          
          {/* Team Member 4 */}
          <Card className="text-center p-6">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/10">
              <Image 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt="James Wilson - Technical Analyst at BrokerAnalysis"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">James Wilson</h3>
            <p className="text-primary font-medium mb-2">Technical Analyst</p>
            <p className="text-sm text-muted-foreground">
              Certified trading platform expert who personally tests every broker we review. James evaluates trading platforms, tools, and execution quality for all our broker assessments.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <FAQAccordion items={[
          {
            question: "How does BrokerAnalysis make money?",
            answer: "We maintain transparency in our business model. BrokerAnalysis earns revenue through affiliate commissions when users sign up with brokers through our links. However, this never influences our reviews or ratings. Our editorial team operates independently from our business partnerships."
          },
          {
            question: "Are your broker reviews independent?",
            answer: "Absolutely. We maintain strict editorial independence and our review team has no knowledge of business relationships when conducting evaluations. Our reviews are based on extensive testing, data analysis, and user feedback."
          },
          {
            question: "How often do you update your broker reviews?",
            answer: "We conduct full updates of our broker reviews quarterly. However, we also make immediate adjustments whenever significant changes occur, such as fee structure updates, platform redesigns, or regulatory changes."
          },
          {
            question: "Can brokers pay for better reviews?",
            answer: "No. Our review process is completely independent and can't be influenced by payments or partnerships. Many of our top-rated brokers have no business relationship with us at all."
          },
          {
            question: "How can I suggest a broker for review?",
            answer: "We welcome suggestions! Please use our contact form to recommend brokers you'd like us to review. We evaluate all suggestions and prioritize those with significant user interest."
          }
        ]} />
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Ready to find your perfect broker?"
        description="Use our broker finder tool to get personalized recommendations based on your trading preferences."
        primaryAction={{
          text: "Find My Broker",
          href: "/find-my-broker"
        }}
        secondaryAction={{
          text: "Compare Brokers",
          href: "/compare-brokers"
        }}
      />
    </main>
  );
} 