import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { ClipboardList, BarChart, Database, LineChart, UserCheck, Repeat, Shield } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQAccordion } from '@/components/FAQAccordion';
import { CallToAction } from '@/components/CallToAction';

export const metadata: Metadata = {
  title: 'BrokerAnalysis Methodology | How We Review Brokers',
  description: 'Learn about our comprehensive broker evaluation methodology, scoring system, and how we ensure accurate, transparent, and unbiased reviews.',
};

export default function MethodologyPage() {
  return (
    <main className="container max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Review Methodology</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Transparent, data-driven, and comprehensive: how we evaluate and rate online brokers.
        </p>
      </section>

      {/* Overview */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="/images/methodology/evaluation.jpg" 
              alt="Data-driven broker evaluation process"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Evaluation Process</h2>
            <p className="mb-4">
              At BrokerAnalysis, we've developed a rigorous, multi-stage evaluation process to ensure our broker 
              reviews are thorough, accurate, and genuinely helpful for traders of all experience levels.
            </p>
            <p className="mb-4">
              Each broker undergoes the same comprehensive assessment, covering 100+ different data points across 
              multiple categories. Our approach combines objective data analysis with hands-on testing by our 
              experienced team of analysts.
            </p>
            <p>
              We regularly update our methodology to reflect changing market conditions, emerging technologies, 
              and evolving trader needs, ensuring our reviews remain relevant and accurate.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="mb-16 bg-muted/30 p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Our 6-Step Review Process</h2>
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mr-4">1</div>
                <h3 className="text-2xl font-bold">Data Collection</h3>
              </div>
              <p>
                We gather comprehensive data directly from broker websites, official documentation, and by reaching out to 
                broker representatives directly. Our data collection covers fees, available markets, platform features, 
                regulatory information, customer service options, and more.
              </p>
            </div>
            <div className="flex justify-center">
              <Database className="h-32 w-32 text-primary opacity-80" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <div className="flex items-center mb-4">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mr-4">2</div>
                <h3 className="text-2xl font-bold">Account Opening & Testing</h3>
              </div>
              <p>
                Our team opens real accounts with each broker and conducts thorough testing of the trading platforms, 
                mobile apps, and features. We execute trades, test order types, evaluate platform stability, 
                and assess overall user experience across different devices.
              </p>
            </div>
            <div className="flex justify-center md:order-1">
              <ClipboardList className="h-32 w-32 text-primary opacity-80" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mr-4">3</div>
                <h3 className="text-2xl font-bold">Customer Service Evaluation</h3>
              </div>
              <p>
                We contact each broker's customer service through all available channels (chat, email, phone) at 
                different times of day and in multiple languages when applicable. We assess response times, 
                knowledge of representatives, and problem-solving capabilities.
              </p>
            </div>
            <div className="flex justify-center">
              <UserCheck className="h-32 w-32 text-primary opacity-80" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <div className="flex items-center mb-4">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mr-4">4</div>
                <h3 className="text-2xl font-bold">Scoring & Analysis</h3>
              </div>
              <p>
                We score each broker across 7 main categories: Fees, Markets & Products, Trading Platforms, 
                Research & Education, Customer Service, Regulation & Security, and Deposit & Withdrawal. 
                Each category is weighted based on its importance to different trader types.
              </p>
            </div>
            <div className="flex justify-center md:order-1">
              <BarChart className="h-32 w-32 text-primary opacity-80" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mr-4">5</div>
                <h3 className="text-2xl font-bold">Security Assessment</h3>
              </div>
              <p>
                We thoroughly evaluate each broker's security measures, regulatory compliance, and company history. 
                This includes assessing encryption standards, fund protection measures, regulatory oversight, 
                company financial stability, and historical track record with customers.
              </p>
            </div>
            <div className="flex justify-center">
              <Shield className="h-32 w-32 text-primary opacity-80" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <div className="flex items-center mb-4">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mr-4">6</div>
                <h3 className="text-2xl font-bold">Continuous Monitoring & Updates</h3>
              </div>
              <p>
                Our work doesn't end after publishing a review. We continuously monitor each broker for 
                changes to their offerings, fees, or services. All reviews are fully updated quarterly, 
                with immediate updates for significant changes.
              </p>
            </div>
            <div className="flex justify-center md:order-1">
              <Repeat className="h-32 w-32 text-primary opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Scoring System */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Scoring System</h2>
        
        <div className="bg-card p-8 rounded-lg border mb-8">
          <h3 className="text-xl font-bold mb-4">Category Weights</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Fees</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Markets & Products</span>
                <span>20%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Trading Platforms</span>
                <span>15%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Research & Education</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Customer Service</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Regulation & Security</span>
                <span>15%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Deposit & Withdrawal</span>
                <span>5%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mb-4">
          Each category contains multiple sub-criteria that we assess individually. For example, 
          in the Fees category, we evaluate trading fees, non-trading fees, fee transparency, and 
          fee competitiveness relative to industry standards.
        </p>
        
        <p className="mb-4">
          We assign scores from 1 to 5 for each sub-criterion, then calculate weighted averages 
          to determine category scores and the overall broker rating.
        </p>
        
        <div className="bg-muted/30 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-bold mb-4">Star Rating System</h3>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-card p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold mb-2">★★★★★</div>
              <div className="font-semibold mb-1">4.5-5.0</div>
              <div className="text-sm text-muted-foreground">Exceptional</div>
            </div>
            <div className="bg-card p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold mb-2">★★★★☆</div>
              <div className="font-semibold mb-1">3.5-4.4</div>
              <div className="text-sm text-muted-foreground">Very Good</div>
            </div>
            <div className="bg-card p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold mb-2">★★★☆☆</div>
              <div className="font-semibold mb-1">2.5-3.4</div>
              <div className="text-sm text-muted-foreground">Good</div>
            </div>
            <div className="bg-card p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold mb-2">★★☆☆☆</div>
              <div className="font-semibold mb-1">1.5-2.4</div>
              <div className="text-sm text-muted-foreground">Fair</div>
            </div>
            <div className="bg-card p-4 rounded-lg border text-center">
              <div className="text-2xl font-bold mb-2">★☆☆☆☆</div>
              <div className="font-semibold mb-1">1.0-1.4</div>
              <div className="text-sm text-muted-foreground">Poor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
            <p className="mb-4">
              We are committed to maintaining the highest standards of integrity and transparency in our review process. 
              Our methodology is designed to provide you with accurate, unbiased information to help you make informed decisions.
            </p>
            <div className="space-y-4 mt-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Editorial Independence</h4>
                  <p className="text-muted-foreground">Our review team operates independently from our business partnerships. Reviewers are not aware of affiliate relationships.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <Repeat className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Regular Updates</h4>
                  <p className="text-muted-foreground">All reviews are fully updated quarterly, with immediate updates for significant changes to broker offerings.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <LineChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Data Transparency</h4>
                  <p className="text-muted-foreground">We provide the raw data behind our assessments, allowing you to evaluate brokers based on your own priorities.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="/images/methodology/commitment.jpg" 
              alt="Our commitment to transparent broker reviews"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <FAQAccordion items={[
          {
            question: "How do you ensure your reviews are unbiased?",
            answer: "Our methodology is designed with objectivity at its core. We use the same evaluation criteria for all brokers, regardless of business relationships. Our review team does not know which brokers have affiliate partnerships with BrokerAnalysis, ensuring their assessments remain completely unbiased."
          },
          {
            question: "Do you test all the brokers you review?",
            answer: "Yes, we open real accounts with every broker we review and conduct extensive hands-on testing. This includes executing trades, testing all platform features, contacting customer service, and going through the deposit and withdrawal processes."
          },
          {
            question: "How often do you update your reviews?",
            answer: "We perform full updates of all broker reviews on a quarterly basis. However, we also make immediate updates whenever significant changes occur to a broker's offerings, fees, platform features, or regulatory status."
          },
          {
            question: "How do you assess broker security and trustworthiness?",
            answer: "We evaluate multiple security factors including regulatory oversight, company history, financial stability, fund protection measures, encryption standards, and historical track record with customers. Brokers with strong regulatory oversight and a clean operational history receive higher security scores."
          },
          {
            question: "Can I suggest improvements to your methodology?",
            answer: "Absolutely! We're always looking to improve our review process. If you have suggestions for criteria we should add or ways to enhance our methodology, please contact us through our feedback form."
          }
        ]} />
      </section>

      {/* Call to Action */}
      <CallToAction
        title="See our methodology in action"
        description="Browse our broker reviews to see how we apply this methodology to evaluate the top trading platforms."
        primaryAction={{
          text: "Read Broker Reviews",
          href: "/reviews"
        }}
        secondaryAction={{
          text: "Compare Brokers",
          href: "/compare-brokers"
        }}
      />
    </main>
  );
} 