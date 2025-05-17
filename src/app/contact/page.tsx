import React from 'react';
import { Metadata } from 'next';
import { Mail, MessageSquare, Phone, MapPin, Clock, AlertCircle } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'Contact BrokerAnalysis | Get in Touch',
  description: 'Have questions about online brokers? Contact our team for personalized assistance or to provide feedback on our broker reviews and comparisons.',
};

export default function ContactPage() {
  return (
    <main className="container max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions or feedback? We're here to help you navigate the world of online brokers.
        </p>
      </section>

      {/* Contact Methods */}
      <section className="mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email */}
          <Card>
            <CardHeader className="pb-2">
              <Mail className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Email Us</CardTitle>
              <CardDescription>We aim to respond within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">General Inquiries:</p>
              <a href="mailto:info@brokeranalysis.com" className="text-primary hover:underline">
                info@brokeranalysis.com
              </a>
              
              <p className="font-medium mt-3">Partnership Opportunities:</p>
              <a href="mailto:partners@brokeranalysis.com" className="text-primary hover:underline">
                partners@brokeranalysis.com
              </a>
              
              <p className="font-medium mt-3">Press Inquiries:</p>
              <a href="mailto:press@brokeranalysis.com" className="text-primary hover:underline">
                press@brokeranalysis.com
              </a>
            </CardContent>
          </Card>
          
          {/* Live Chat */}
          <Card>
            <CardHeader className="pb-2">
              <MessageSquare className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Get immediate assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Our live chat support is available to help you with immediate questions and broker recommendations.
              </p>
              <Button className="w-full">
                Start Chat
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                Live chat hours: Monday-Friday, 9am-6pm EST
              </p>
            </CardContent>
          </Card>
          
          {/* Phone */}
          <Card>
            <CardHeader className="pb-2">
              <Phone className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Call Us</CardTitle>
              <CardDescription>Speak with our team directly</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Customer Support:</p>
              <a href="tel:+18001234567" className="text-primary hover:underline">
                +1 (800) 123-4567
              </a>
              
              <div className="flex items-center mt-4 text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Mon-Fri: 9am-6pm EST</span>
              </div>
              
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>International callers: +1 (212) 555-1234</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
            <p className="mb-6">
              Whether you have a question about a specific broker, want to suggest improvements to our site, 
              or need assistance finding the right trading platform, we're here to help.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Quick Response</h4>
                  <p className="text-muted-foreground">We aim to respond to all inquiries within 24 business hours.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Broker Issues</h4>
                  <p className="text-muted-foreground">Having problems with a broker? Our team can help provide guidance and resources.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Feedback Welcome</h4>
                  <p className="text-muted-foreground">We value your input on our reviews, comparisons, and overall site experience.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-lg border">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="Enter your email address" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="What's your message about?" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Please provide as much detail as possible..."
                  rows={5}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="mb-16 bg-muted/30 p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Offices</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* New York */}
          <div className="bg-background p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-2">New York</h3>
            <p className="text-muted-foreground mb-4">Headquarters</p>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <p>350 Fifth Avenue, 21st Floor, New York, NY 10118</p>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <p>+1 (212) 555-1234</p>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <p>nyc@brokeranalysis.com</p>
              </div>
            </div>
          </div>
          
          {/* London */}
          <div className="bg-background p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-2">London</h3>
            <p className="text-muted-foreground mb-4">European Office</p>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <p>30 St Mary Axe, London EC3A 8BF, United Kingdom</p>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <p>+44 20 7123 4567</p>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <p>london@brokeranalysis.com</p>
              </div>
            </div>
          </div>
          
          {/* Singapore */}
          <div className="bg-background p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-2">Singapore</h3>
            <p className="text-muted-foreground mb-4">Asia-Pacific Office</p>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <p>1 Raffles Place, #20-61, Tower 2, Singapore 048616</p>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <p>+65 6123 4567</p>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <p>singapore@brokeranalysis.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <FAQAccordion items={[
          {
            question: "How quickly can I expect a response to my inquiry?",
            answer: "We strive to respond to all inquiries within 24 business hours. For urgent matters, we recommend using our live chat feature during business hours (Monday-Friday, 9am-6pm EST) for the fastest response."
          },
          {
            question: "Can you help me with a specific broker issue?",
            answer: "While we don't have direct control over broker operations, we can provide guidance, information about industry standards, and help you understand the appropriate channels for resolving issues with specific brokers."
          },
          {
            question: "How can I report inaccurate information in a review?",
            answer: "We take accuracy very seriously. If you've spotted an error in one of our reviews, please email us at feedback@brokeranalysis.com with the subject line 'Review Correction' and provide specific details about the inaccuracy. We'll investigate promptly."
          },
          {
            question: "Do you offer consulting services for traders?",
            answer: "We don't currently offer individual consulting services. Our mission is to provide comprehensive, unbiased information that empowers you to make your own trading decisions. However, our extensive guides, reviews, and comparison tools are designed to answer most trading-related questions."
          },
          {
            question: "I'm a broker. How can I get listed on your site?",
            answer: "We review brokers based on our independent assessment of market significance and user interest. If you'd like your broker to be considered for review, please contact us at partners@brokeranalysis.com with details about your brokerage. Note that we maintain strict editorial independence, and all brokers undergo the same rigorous review process."
          }
        ]} />
      </section>
    </main>
  );
} 