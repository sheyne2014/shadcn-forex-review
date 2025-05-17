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
  title: 'About BrokerAnalysis | Who We Are',
  description: 'Learn about BrokerAnalysis, our team, mission and how we help traders find the best brokers through our transparent and objective review methodology.',
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
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
              <Image 
                src="/images/team/member1.jpg" 
                alt="Sarah Johnson - Founder & CEO"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Sarah Johnson</h3>
            <p className="text-primary font-medium">Founder & CEO</p>
            <p className="mt-2 text-muted-foreground">
              Former investment banker with 15+ years of experience in financial markets.
            </p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
              <Image 
                src="/images/team/member2.jpg" 
                alt="David Chen - Head of Research"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">David Chen</h3>
            <p className="text-primary font-medium">Head of Research</p>
            <p className="mt-2 text-muted-foreground">
              Previously a senior analyst at a major hedge fund with expertise in broker evaluation.
            </p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
              <Image 
                src="/images/team/member3.jpg" 
                alt="Maria Rodriguez - Content Director"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Maria Rodriguez</h3>
            <p className="text-primary font-medium">Content Director</p>
            <p className="mt-2 text-muted-foreground">
              Financial journalist with a decade of experience covering online trading platforms.
            </p>
          </div>
          
          {/* Team Member 4 */}
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
              <Image 
                src="/images/team/member4.jpg" 
                alt="James Wilson - Technical Analyst"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">James Wilson</h3>
            <p className="text-primary font-medium">Technical Analyst</p>
            <p className="mt-2 text-muted-foreground">
              Certified trading platform expert who personally tests every broker we review.
            </p>
          </div>
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