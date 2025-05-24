"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Youtube, FileText, CalendarDays, CheckCircle, RefreshCw, AlertTriangle } from "lucide-react";

interface EducationSectionProps {
  broker: any;
  educationalResources?: {
    overview: string;
    rating: number;
    materials: {
      title: string;
      type: string;
      description: string;
      url?: string;
      imageUrl?: string;
    }[];
    courses: {
      title: string;
      level: string;
      description: string;
      topics: string[];
      imageUrl?: string;
    }[];
    webinars: {
      title: string;
      date: string;
      speaker: string;
      description: string;
    }[];
    strengths: string[];
    weaknesses: string[];
  }
}

export function EducationSection({
  broker,
  educationalResources = {
    overview: "",
    rating: 0,
    materials: [],
    courses: [],
    webinars: [],
    strengths: [],
    weaknesses: []
  }
}: EducationSectionProps) {

  // Default overview if not provided
  const overview = educationalResources.overview ||
    `${broker.name} offers a variety of educational resources designed to help traders at different skill levels improve their trading knowledge and skills. The resources include articles, videos, webinars, and comprehensive courses.`;

  // Default rating if not provided
  const rating = educationalResources.rating || 4.2;

  // Default materials if not provided
  const materials = educationalResources.materials.length > 0 ? educationalResources.materials : [
    {
      title: "Forex Trading Guide",
      type: "Article",
      description: "A comprehensive guide to forex trading basics, covering currency pairs, market analysis, and trading strategies.",
      url: "#",
      imageUrl: "/images/education/forex-guide.jpg"
    },
    {
      title: "Technical Analysis Fundamentals",
      type: "Video",
      description: "Learn the essential technical analysis tools and indicators to help you make informed trading decisions.",
      url: "#",
      imageUrl: "/images/education/technical-analysis.jpg"
    },
    {
      title: "Understanding Leverage and Margin",
      type: "Article",
      description: "Discover how leverage and margin work in trading and learn to manage your risk effectively.",
      url: "#",
      imageUrl: "/images/education/leverage.jpg"
    },
    {
      title: "Trading Psychology Mastery",
      type: "eBook",
      description: "Develop the mindset of successful traders and learn to manage emotions in trading.",
      url: "#",
      imageUrl: "/images/education/psychology.jpg"
    }
  ];

  // Default courses if not provided
  const courses = educationalResources.courses.length > 0 ? educationalResources.courses : [
    {
      title: "Forex Trading for Beginners",
      level: "Beginner",
      description: "A comprehensive course for those new to forex trading, covering all the basics you need to get started.",
      topics: [
        "Introduction to forex markets",
        "Currency pairs and quotations",
        "Basic chart analysis",
        "Risk management fundamentals",
        "Creating your first trading plan"
      ],
      imageUrl: "/images/education/beginner-course.jpg"
    },
    {
      title: "Advanced Technical Analysis",
      level: "Intermediate",
      description: "Take your technical analysis skills to the next level with this in-depth course on chart patterns and indicators.",
      topics: [
        "Advanced chart patterns",
        "Multiple timeframe analysis",
        "Custom indicator development",
        "Market correlation studies",
        "Developing systematic trading strategies"
      ],
      imageUrl: "/images/education/advanced-course.jpg"
    },
    {
      title: "Professional Trading Strategies",
      level: "Advanced",
      description: "Learn the strategies used by professional traders to consistently profit in the markets.",
      topics: [
        "Institutional trading methods",
        "Order flow analysis",
        "Intermarket analysis",
        "Portfolio and risk optimization",
        "Algorithmic trading introduction"
      ],
      imageUrl: "/images/education/pro-course.jpg"
    }
  ];

  // Default webinars if not provided
  const webinars = educationalResources.webinars.length > 0 ? educationalResources.webinars : [
    {
      title: "Market Outlook: Q3 2024",
      date: "June 15, 2024",
      speaker: "John Smith, Chief Market Analyst",
      description: "Analysis of current market trends and forecasts for major currency pairs in the coming quarter."
    },
    {
      title: "Mastering Risk Management",
      date: "Weekly, Thursdays",
      speaker: "Sarah Johnson, Trading Coach",
      description: "Weekly session focusing on practical risk management techniques for traders of all levels."
    },
    {
      title: "Trading Psychology: Overcoming Common Mistakes",
      date: "Monthly, Last Friday",
      speaker: "Dr. Michael Brown, Trading Psychologist",
      description: "Monthly workshop addressing the psychological aspects of trading and techniques to improve decision-making."
    }
  ];

  // Default strengths and weaknesses if not provided
  const strengths = educationalResources.strengths.length > 0 ? educationalResources.strengths : [
    "Comprehensive learning materials for all trader levels",
    "Free access to basic educational content",
    "Regular webinars with market experts",
    "Mobile-friendly educational platform"
  ];

  const weaknesses = educationalResources.weaknesses.length > 0 ? educationalResources.weaknesses : [
    "Advanced courses may require premium account",
    "Limited one-on-one coaching options",
    "Some content may not be available in all languages"
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Educational Resources</CardTitle>
              <CardDescription>
                Learning materials and resources offered by {broker.name}
              </CardDescription>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                <span className="ml-1 font-medium">{rating}/5</span>
              </div>
              <Badge variant="outline" className="ml-2">Education Rating</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{overview}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" /> Strengths
              </h3>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" /> Considerations
              </h3>
              <ul className="space-y-2">
                {weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Learning Materials</CardTitle>
              <CardDescription>
                Educational content to improve your trading knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                {materials.map((material, index) => (
                  <div key={index} className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
                    <div className="w-full md:w-1/3 bg-muted h-[180px] md:h-auto flex items-center justify-center">
                      {material.imageUrl ? (
                        <Image
                          src={material.imageUrl}
                          alt={material.title}
                          width={300}
                          height={180}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {material.type === 'Article' && <FileText className="h-12 w-12 text-muted-foreground" />}
                          {material.type === 'Video' && <Youtube className="h-12 w-12 text-muted-foreground" />}
                          {material.type === 'eBook' && <BookOpen className="h-12 w-12 text-muted-foreground" />}
                          <span className="mt-2 text-sm text-muted-foreground">{material.type}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center">
                        <Badge variant="secondary" className="mb-2">
                          {material.type === 'Article' && <FileText className="h-3 w-3 mr-1" />}
                          {material.type === 'Video' && <Youtube className="h-3 w-3 mr-1" />}
                          {material.type === 'eBook' && <BookOpen className="h-3 w-3 mr-1" />}
                          {material.type}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{material.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">{material.description}</p>
                      <Button variant="outline" size="sm" className="self-start">
                        {material.type === 'Article' && "Read Article"}
                        {material.type === 'Video' && "Watch Video"}
                        {material.type === 'eBook' && "Download eBook"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" /> Trading Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Badge variant={
                      course.level === 'Beginner' ? 'default' :
                      course.level === 'Intermediate' ? 'secondary' :
                      'outline'
                    }>
                      {course.level}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                  <Button variant="outline" size="sm" className="w-full">View Course</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2" /> Upcoming Webinars
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {webinars.map((webinar, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-1">{webinar.title}</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{webinar.date}</span>
                    </div>
                    <div className="mt-1">{webinar.speaker}</div>
                  </div>
                  <p className="text-sm mb-3">{webinar.description}</p>
                  <Button variant="outline" size="sm" className="w-full">Register</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Path</CardTitle>
          <CardDescription>
            Recommended learning journey based on your experience level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-9 top-0 bottom-0 w-[1px] bg-muted-foreground/20" />

            <div className="grid grid-cols-1 gap-6">
              <div className="flex">
                <div className="flex flex-col items-center mr-4 z-10">
                  <div className="w-[80px] h-[80px] rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      Step 1
                    </div>
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-xl font-semibold mb-2">Forex Fundamentals</h3>
                  <p className="text-muted-foreground mb-4">Start your journey by understanding the basics of forex markets, currency pairs, and how the forex market works.</p>
                  <div className="bg-card rounded-lg border p-4">
                    <h4 className="font-semibold mb-2">Recommended Resources:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>Forex Trading Guide</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <Youtube className="h-4 w-4 mr-2 text-primary" />
                        <span>Introduction to Forex Trading (Video Series)</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                        <span>Weekly Beginners Webinar</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col items-center mr-4 z-10">
                  <div className="w-[80px] h-[80px] rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      Step 2
                    </div>
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-xl font-semibold mb-2">Technical Analysis</h3>
                  <p className="text-muted-foreground mb-4">Learn how to analyze price charts and use technical indicators to identify potential trading opportunities.</p>
                  <div className="bg-card rounded-lg border p-4">
                    <h4 className="font-semibold mb-2">Recommended Resources:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>Technical Analysis Fundamentals</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <BookOpen className="h-4 w-4 mr-2 text-primary" />
                        <span>Chart Patterns Guide</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <Youtube className="h-4 w-4 mr-2 text-primary" />
                        <span>Technical Indicator Masterclass</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col items-center mr-4 z-10">
                  <div className="w-[80px] h-[80px] rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      Step 3
                    </div>
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
                  <p className="text-muted-foreground mb-4">Develop essential risk management skills to protect your capital and improve your long-term trading results.</p>
                  <div className="bg-card rounded-lg border p-4">
                    <h4 className="font-semibold mb-2">Recommended Resources:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>Understanding Leverage and Margin</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                        <span>Risk Management Workshop</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <BookOpen className="h-4 w-4 mr-2 text-primary" />
                        <span>Position Sizing and Money Management Guide</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}