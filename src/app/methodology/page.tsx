import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { ClipboardList, BarChart, Database, LineChart, UserCheck, Repeat, Shield } from 'lucide-react';
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink, Info } from "lucide-react";

import { FAQAccordion } from '@/components/FAQAccordion';
import { CallToAction } from '@/components/CallToAction';

export const metadata: Metadata = {
  title: 'Our Methodology | How We Review Forex & Trading Brokers',
  description: 'Learn about the comprehensive methodology we use to review and rate brokers. We evaluate factors including regulation, trading costs, platforms, customer service, and more.',
};

export default function MethodologyPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Our Review Methodology</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            How we analyze, test, and rate forex and trading brokers
          </p>
        </div>
        
        <div className="space-y-6">
          <p>
            At {siteConfig.name}, we believe that thorough, unbiased broker reviews require a methodical approach. 
            Our evaluation process combines quantitative metrics with qualitative assessments to provide you with 
            the most comprehensive analysis possible.
          </p>
          
          <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
            <Info className="h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm">
                Our experts spend hundreds of hours testing and evaluating brokers. All reviews are based on 
                first-hand experience with real accounts. We regularly update our reviews to reflect changes 
                in the brokers' offerings and market conditions.
              </p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="process" className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 md:w-[600px] mx-auto">
            <TabsTrigger value="process">Review Process</TabsTrigger>
            <TabsTrigger value="factors">Rating Factors</TabsTrigger>
            <TabsTrigger value="scores">Trust Scores</TabsTrigger>
            <TabsTrigger value="updates">Updates & Ethics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="process" className="space-y-6">
            <h2 className="text-2xl font-bold">Our Review Process</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">1</Badge>
                      Account Creation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We open real accounts with each broker to experience the onboarding process first-hand,
                      including verification requirements and initial deposit process.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">2</Badge>
                      Platform Testing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We thoroughly test trading platforms across desktop, web, and mobile environments,
                      evaluating functionality, reliability, and user experience.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">3</Badge>
                      Costs Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We conduct detailed analysis of all fees, spreads, commissions, overnight financing,
                      and hidden costs across various asset classes.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">4</Badge>
                      Service Evaluation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We test customer service across all available channels, measuring response times, 
                      expertise of staff, and overall support quality.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0">5</Badge>
                    Detailed Documentation & Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We document our findings, assign scores to each category, and calculate the overall 
                    rating. Our expert analysts then write detailed reviews based on the data and their 
                    extensive experience in the industry.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="factors" className="space-y-6">
            <h2 className="text-2xl font-bold">Rating Factors</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Trust & Regulation (25%)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Regulatory status and oversight quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Length of operating history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Client fund protection measures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Company transparency</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Trading Costs (20%)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Spreads compared to industry averages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Commission structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Overnight financing rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Account fees and inactivity charges</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Trading Platforms (20%)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Platform stability and performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Available features and tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>User interface and ease of use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Mobile app quality</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Market Offering (15%)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Range of available markets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Number of tradable instruments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Cryptocurrency offering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Availability of exotic instruments</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Customer Service (10%)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Support channel availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Response time and quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Multilingual support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Technical support capabilities</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Education & Research (10%)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Quality of educational content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Market analysis and research tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Webinars and video content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Demo account functionality</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scores" className="space-y-6">
            <h2 className="text-2xl font-bold">Trust Scores Explained</h2>
            
            <p>
              We calculate a Trust Score from 0-100 for each broker based on multiple factors. This score 
              helps you quickly assess the overall trustworthiness and reliability of a broker.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-green-500">90-100: Excellent</CardTitle>
                  <CardDescription>Highly Trusted</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Top-tier regulatory oversight, extensive history of reliable operation, strong financial 
                    position, robust client fund protection, and exceptional transparency.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-400">
                <CardHeader>
                  <CardTitle className="text-green-400">80-89: Very Good</CardTitle>
                  <CardDescription>Very Trustworthy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Strong regulatory status with respected authorities, established operating history, 
                    good financial stability, and solid client protection measures.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-300">
                <CardHeader>
                  <CardTitle className="text-green-300">70-79: Good</CardTitle>
                  <CardDescription>Trustworthy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Regulated by recognized authorities, several years of operation, adequate financial 
                    standing, and standard client fund protection measures.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-yellow-400">
                <CardHeader>
                  <CardTitle className="text-yellow-400">60-69: Above Average</CardTitle>
                  <CardDescription>Moderately Trustworthy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Regulated but possibly in less stringent jurisdictions, adequate operating history, 
                    and basic client protection measures in place.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-yellow-300">
                <CardHeader>
                  <CardTitle className="text-yellow-300">50-59: Average</CardTitle>
                  <CardDescription>Average Trust</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    May have limited regulatory oversight or registration in tier-2 jurisdictions, shorter
                    operating history, or less transparency about operations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-orange-400">
                <CardHeader>
                  <CardTitle className="text-orange-400">40-49: Below Average</CardTitle>
                  <CardDescription>Exercise Caution</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Minimal regulatory oversight, limited operating history, concerns about company 
                    transparency, or inadequate client fund protection.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-red-400">
                <CardHeader>
                  <CardTitle className="text-red-400">30-39: Poor</CardTitle>
                  <CardDescription>Low Trust</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Weak or questionable regulatory status, very limited operating history, poor company 
                    transparency, or significant red flags in operations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-red-500">0-29: Very Poor</CardTitle>
                  <CardDescription>Not Recommended</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Unregulated, no significant operating history, serious red flags in business practices, 
                    or history of regulatory issues or client complaints.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="updates" className="space-y-6">
            <h2 className="text-2xl font-bold">Reviews Updates & Ethics</h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regular Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We review and update our broker evaluations at least quarterly to ensure accuracy. 
                    Major changes at brokers (pricing, features, regulations) trigger immediate reviews.
                    All reviews display the most recent update date for transparency.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Independence & Ethics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Our reviews are created independently by our expert team. While we may receive 
                      compensation from some brokers when users open accounts through our links, this never 
                      influences our ratings or reviews.
                    </p>
                    
                    <p className="text-muted-foreground">
                      Our editorial integrity is paramount. Our revenue model allows us to provide high-quality, 
                      unbiased reviews while keeping our content free for all users.
                    </p>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm font-medium">Our Commitment to You:</p>
                      <ul className="text-sm mt-2 space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>We never accept payment for favorable reviews</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Our ratings are based on documented testing and evaluation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>We disclose potential conflicts of interest transparently</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>We prioritize accuracy and detail in all our content</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-primary/5 p-8 rounded-lg space-y-6">
          <h2 className="text-2xl font-bold">Have Questions About Our Methodology?</h2>
          <p>
            We're committed to transparency in our review process. If you have questions about how we evaluate 
            brokers or want to suggest improvements to our methodology, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/reviews">
                Browse Broker Reviews
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 