"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { BrokerCard } from "@/components/brokers/BrokerCard";
import { Broker as SupabaseBrokerRow } from "@/lib/database-types";

// Question types
interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  helpText?: string;
  options: {
    id: string;
    label: string;
    description?: string;
  }[];
}

// Quiz questions
const questions: QuizQuestion[] = [
  {
    id: "experience",
    question: "What is your level of trading experience?",
    description: "Select the option that best matches your experience level",
    helpText: "This helps us match you with brokers that are suitable for your experience level and trading needs.",
    options: [
      { id: "beginner", label: "Beginner - I'm new to trading" },
      { id: "intermediate", label: "Intermediate - I have some experience" },
      { id: "advanced", label: "Advanced - I'm an experienced trader" },
      { id: "professional", label: "Professional - I trade for a living" },
    ],
  },
  {
    id: "assets",
    question: "Which assets are you primarily interested in trading?",
    description: "Select the main asset class you wish to trade",
    helpText: "Different brokers specialize in various asset classes. Your selection helps us find brokers with the best offerings for your interests.",
    options: [
      { id: "forex", label: "Forex - Currency pairs" },
      { id: "stocks", label: "Stocks - Company shares" },
      { id: "crypto", label: "Cryptocurrencies - Bitcoin, Ethereum, etc." },
      { id: "commodities", label: "Commodities - Gold, oil, etc." },
      { id: "indices", label: "Indices - S&P 500, FTSE 100, etc." },
      { id: "bonds", label: "Bonds - Government and corporate" },
      { id: "etfs", label: "ETFs - Exchange-traded funds" },
    ],
  },
  {
    id: "deposit",
    question: "What is your initial deposit amount?",
    description: "Select your planned initial deposit range",
    helpText: "This helps us filter brokers by minimum deposit requirements and find those suitable for your investment level.",
    options: [
      { id: "small", label: "Less than $100" },
      { id: "medium", label: "$100 - $500" },
      { id: "large", label: "$500 - $2,000" },
      { id: "xlarge", label: "$2,000 - $10,000" },
      { id: "xxlarge", label: "More than $10,000" },
    ],
  },
  {
    id: "platform",
    question: "Which trading platform do you prefer?",
    description: "Select your preferred trading platform",
    helpText: "Trading platforms vary in features and complexity. Your preference helps us recommend brokers that offer platforms matching your needs.",
    options: [
      { id: "metatrader4", label: "MetaTrader 4 - Popular and widely used" },
      { id: "metatrader5", label: "MetaTrader 5 - Advanced version with more features" },
      { id: "webtrader", label: "WebTrader - Browser-based platform with no downloads" },
      { id: "ctrader", label: "cTrader - Modern platform with advanced features" },
      { id: "proprietary", label: "Proprietary platforms - Specific to certain brokers" },
      { id: "nopreference", label: "No preference - I'm open to any platform" },
    ],
  },
  {
    id: "frequency",
    question: "How frequently do you plan to trade?",
    description: "Select your expected trading frequency",
    helpText: "Your trading frequency helps us match you with brokers that have appropriate fee structures and features for your activity level.",
    options: [
      { id: "daily", label: "Daily - Multiple trades every day" },
      { id: "weekly", label: "Weekly - A few trades per week" },
      { id: "monthly", label: "Monthly - Several trades per month" },
      { id: "occasionally", label: "Occasionally - Only when opportunities arise" },
      { id: "longterm", label: "Long-term - Buy and hold strategy" },
    ],
  },
  {
    id: "priority",
    question: "What's your top priority when choosing a broker?",
    description: "Select your most important consideration",
    helpText: "Understanding your priorities helps us weight different factors when recommending brokers that align with what matters most to you.",
    options: [
      { id: "lowfees", label: "Low fees and commissions" },
      { id: "regulation", label: "Strong regulation and security" },
      { id: "platform", label: "Advanced platform and tools" },
      { id: "support", label: "Excellent customer support" },
      { id: "education", label: "Educational resources and research" },
      { id: "mobiletrading", label: "Mobile trading capabilities" },
    ],
  },
  {
    id: "location",
    question: "Where are you located?",
    description: "Select your region for regulatory compatibility",
    helpText: "Your location affects which brokers can legally provide services to you based on regional regulations.",
    options: [
      { id: "northamerica", label: "North America" },
      { id: "europe", label: "Europe" },
      { id: "asia", label: "Asia" },
      { id: "oceania", label: "Australia/New Zealand" },
      { id: "middleeast", label: "Middle East" },
      { id: "africa", label: "Africa" },
      { id: "southamerica", label: "South America" },
    ],
  },
];

// Extended broker type with features we need for the quiz
interface ExtendedBroker extends SupabaseBrokerRow {
  features?: {
    complexity?: string;
    platforms?: string;
    [key: string]: any;
  };
  available_regions?: string[];
  logo_url: string | null;
  supported_assets: string[] | null;
  match_score?: number;
}

export function BrokerFinderQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [matchedBrokers, setMatchedBrokers] = useState<ExtendedBroker[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [resultsError, setResultsError] = useState<string | null>(null);
  
  const totalSteps = questions.length;
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  const currentQuestion = questions[currentStep];
  
  const handleOptionSelect = (optionId: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    });
  };
  
  // Function to calculate broker match score based on answers
  const calculateMatchScore = (broker: ExtendedBroker, userAnswers: Record<string, string>) => {
    let score = 0;
    let maxScore = 0;
    
    // Experience level match
    if (userAnswers.experience && broker.features?.complexity) {
      maxScore += 20;
      // Map broker's complexity to experience levels
      const complexityToExperience: Record<string, string[]> = {
        'beginner': ['low', 'medium-low'],
        'intermediate': ['medium-low', 'medium', 'medium-high'],
        'advanced': ['medium', 'medium-high', 'high'],
        'professional': ['medium-high', 'high']
      };
      
      // If complexity matches user experience, add points
      if (complexityToExperience[userAnswers.experience]?.includes(broker.features.complexity.toLowerCase())) {
        score += 20;
      }
    }
    
    // Asset class match
    if (userAnswers.assets && broker.supported_assets) {
      maxScore += 25;
      // Map quiz asset choices to broker supported_assets values
      const assetMap: Record<string, string[]> = {
        'forex': ['forex', 'currencies'],
        'stocks': ['stocks', 'equities'],
        'crypto': ['crypto', 'cryptocurrencies', 'bitcoin', 'ethereum'],
        'commodities': ['commodities', 'gold', 'silver', 'oil'],
        'indices': ['indices', 'index'],
        'bonds': ['bonds', 'fixed income'],
        'etfs': ['etfs', 'etf', 'exchange traded funds']
      };
      
      // Check if broker supports the selected asset class
      const selectedAssets = assetMap[userAnswers.assets] || [];
      const brokerAssets = broker.supported_assets.map(a => a.toLowerCase());
      
      if (selectedAssets.some(asset => brokerAssets.some(ba => ba.includes(asset)))) {
        score += 25;
      }
    }
    
    // Deposit amount match
    if (userAnswers.deposit && broker.min_deposit !== null) {
      maxScore += 15;
      
      // Map deposit ranges to values
      const depositRanges: Record<string, number> = {
        'small': 100,
        'medium': 500,
        'large': 2000,
        'xlarge': 10000,
        'xxlarge': 50000
      };
      
      // User selected deposit range is higher than broker's minimum deposit
      if (broker.min_deposit <= (depositRanges[userAnswers.deposit] || 0)) {
        score += 15;
      }
    }
    
    // Platform preference match
    if (userAnswers.platform && broker.features?.platforms) {
      maxScore += 10;
      
      const platforms = broker.features.platforms.toLowerCase();
      const selectedPlatform = userAnswers.platform.toLowerCase();
      
      // If user has no platform preference or broker offers the requested platform
      if (selectedPlatform === 'nopreference' || 
          platforms.includes(selectedPlatform.replace('metatrader', 'mt'))) {
        score += 10;
      }
    }
    
    // Location match
    if (userAnswers.location && broker.available_regions) {
      maxScore += 20;
      
      // Map quiz regions to country/region names
      const regionMap: Record<string, string[]> = {
        'northamerica': ['usa', 'united states', 'canada', 'north america'],
        'europe': ['europe', 'uk', 'united kingdom', 'eu'],
        'asia': ['asia', 'china', 'japan', 'singapore', 'hong kong'],
        'oceania': ['australia', 'new zealand', 'oceania'],
        'middleeast': ['middle east', 'uae', 'dubai'],
        'africa': ['africa', 'south africa'],
        'southamerica': ['south america', 'brazil', 'mexico', 'latin america']
      };
      
      // Check if broker is available in user's region
      const userRegions = regionMap[userAnswers.location] || [];
      const brokerRegions = broker.available_regions.map((r: string) => r.toLowerCase());
      
      if (userRegions.some(region => brokerRegions.some((br: string) => br.includes(region)))) {
        score += 20;
      }
    }
    
    // Return percentage match score or 0 if no matching criteria
    return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  };
  
  const fetchResults = async () => {
    setLoadingResults(true);
    setResultsError(null);
    
    try {
      // Fetch all brokers
      const response = await fetch("/api/brokers");
      
      if (!response.ok) {
        throw new Error("Failed to fetch brokers");
      }
      
      const brokers: ExtendedBroker[] = await response.json();
      
      // Calculate match scores for each broker
      const scoredBrokers: ExtendedBroker[] = brokers.map(broker => ({
        ...broker,
        match_score: calculateMatchScore(broker, answers)
      }));
      
      // Sort by match score
      scoredBrokers.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
      
      // Take top 5 brokers with match score > 30%
      const topMatches = scoredBrokers
        .filter(broker => (broker.match_score || 0) > 30)
        .slice(0, 5);
      
      setMatchedBrokers(topMatches);
    } catch (error: any) {
      console.error("Error fetching quiz results:", error);
      setResultsError(error.message || "An unexpected error occurred.");
      setMatchedBrokers([]);
    }
    
    setLoadingResults(false);
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Time to fetch results based on answers
      setShowResults(true);
      fetchResults();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };
  
  const isOptionSelected = currentQuestion && answers[currentQuestion.id];
  
  if (showResults) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full p-3 mb-2">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Your Broker Matches</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Based on your answers, we've found these brokers that match your trading needs and preferences.
          </p>
        </div>
        
        {loadingResults ? (
          <div className="text-center py-10">
            <p>Loading recommendations...</p>
            <Progress value={50} className="w-1/2 mx-auto mt-4" />
          </div>
        ) : resultsError ? (
          <Card className="bg-destructive/10 border-destructive/30">
            <CardHeader>
              <CardTitle className="text-destructive">Error Loading Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive/80">{resultsError}</p>
              <p className="text-sm text-muted-foreground mt-2">Please try adjusting your answers or try again later.</p>
            </CardContent>
          </Card>
        ) : matchedBrokers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchedBrokers.map((broker) => (
              <div key={broker.id} className="relative">
                {broker.match_score && (
                  <div className="absolute -left-2 top-4 bg-primary text-primary-foreground px-2 py-1 rounded shadow-sm text-sm font-medium z-10">
                    {broker.match_score}% Match
                  </div>
                )}
                <BrokerCard 
                  broker={broker} 
                  showMatchScore={!!broker.match_score}
                  matchScore={broker.match_score}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Exact Matches Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We couldn't find brokers that perfectly match all your criteria. 
                You can try adjusting your answers or browse our full list of reviewed brokers.
              </p>
            </CardContent>
          </Card>
        )}
        
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Not satisfied with these matches?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You can retake the quiz to get different recommendations or browse all brokers to see the full selection.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleRestart} variant="outline">
              Retake Quiz
            </Button>
            <Button asChild>
              <a href="/brokers">Browse All Brokers</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Question {currentStep + 1} of {totalSteps}
        </div>
        <div className="text-sm font-medium">{progress}% Complete</div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <Card className="border-2 border-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
          {currentQuestion.description && (
            <CardDescription className="text-base mt-1">
              {currentQuestion.description}
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent>
          <RadioGroup 
            value={answers[currentQuestion.id] || ""}
            onValueChange={handleOptionSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.id} className="flex">
                <div className="flex items-center space-x-2 bg-muted/50 hover:bg-muted p-4 rounded-lg w-full cursor-pointer">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label 
                    htmlFor={option.id} 
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {option.label}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
          
          {currentQuestion.helpText && (
            <div className="flex items-start gap-3 mt-6 bg-muted/40 p-4 rounded-lg text-sm">
              <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">{currentQuestion.helpText}</p>
            </div>
          )}
        </CardContent>
        
        <Separator />
        
        <CardFooter className="flex justify-between p-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isOptionSelected}
          >
            {currentStep === totalSteps - 1 ? 'See Results' : 'Next'}
            {currentStep === totalSteps - 1 ? null : <ChevronRight className="h-4 w-4 ml-2" />}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground">
        Your answers help us provide personalized broker recommendations. 
        We don't share your information with third parties.
      </div>
    </div>
  );
} 