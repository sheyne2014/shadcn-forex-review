"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuizAnalyticsWrapper, useQuizAnalytics } from '@/components/analytics/QuizAnalyticsWrapper';
import { trackEvent } from '@/lib/analytics/google-analytics';
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    value: string;
  }[];
}

interface QuizResult {
  recommendedBrokers: string[];
  userProfile: {
    experienceLevel: string;
    tradingStyle: string;
    riskTolerance: string;
    accountSize: string;
  };
  matchScore: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'experience',
    question: 'What is your trading experience level?',
    options: [
      { id: 'beginner', text: 'Beginner (0-1 years)', value: 'beginner' },
      { id: 'intermediate', text: 'Intermediate (1-3 years)', value: 'intermediate' },
      { id: 'advanced', text: 'Advanced (3+ years)', value: 'advanced' },
      { id: 'professional', text: 'Professional trader', value: 'professional' }
    ]
  },
  {
    id: 'trading_style',
    question: 'What is your preferred trading style?',
    options: [
      { id: 'scalping', text: 'Scalping (seconds to minutes)', value: 'scalping' },
      { id: 'day_trading', text: 'Day Trading (intraday)', value: 'day_trading' },
      { id: 'swing_trading', text: 'Swing Trading (days to weeks)', value: 'swing_trading' },
      { id: 'position_trading', text: 'Position Trading (weeks to months)', value: 'position_trading' }
    ]
  },
  {
    id: 'risk_tolerance',
    question: 'What is your risk tolerance?',
    options: [
      { id: 'conservative', text: 'Conservative (Low risk)', value: 'conservative' },
      { id: 'moderate', text: 'Moderate (Medium risk)', value: 'moderate' },
      { id: 'aggressive', text: 'Aggressive (High risk)', value: 'aggressive' },
      { id: 'very_aggressive', text: 'Very Aggressive (Very high risk)', value: 'very_aggressive' }
    ]
  },
  {
    id: 'account_size',
    question: 'What is your initial account size?',
    options: [
      { id: 'small', text: 'Under $1,000', value: 'small' },
      { id: 'medium', text: '$1,000 - $10,000', value: 'medium' },
      { id: 'large', text: '$10,000 - $50,000', value: 'large' },
      { id: 'very_large', text: 'Over $50,000', value: 'very_large' }
    ]
  },
  {
    id: 'markets',
    question: 'Which markets are you most interested in?',
    options: [
      { id: 'forex', text: 'Forex (Currency pairs)', value: 'forex' },
      { id: 'stocks', text: 'Stocks & ETFs', value: 'stocks' },
      { id: 'crypto', text: 'Cryptocurrencies', value: 'crypto' },
      { id: 'commodities', text: 'Commodities & CFDs', value: 'commodities' }
    ]
  }
];

interface BrokerFinderQuizProps {
  onComplete?: (results: QuizResult) => void;
  className?: string;
}

function BrokerFinderQuizContent({ onComplete, className }: BrokerFinderQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const analytics = useQuizAnalytics();

  // Start quiz tracking
  useEffect(() => {
    const startTime = Date.now();
    setQuizStartTime(startTime);
    analytics.trackQuizStart('broker_finder');
    
    // Track quiz page view
    trackEvent({
      action: 'quiz_page_view',
      category: 'user_engagement',
      label: 'broker_finder_quiz',
      page_category: 'quiz'
    });
  }, []);

  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    // Track the answer
    analytics.trackQuizStep(currentQuestion + 1, answer, 'broker_finder');

    // Auto-advance to next question
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Quiz completed
      completeQuiz(newAnswers);
    }
  };

  const completeQuiz = (finalAnswers: Record<string, string>) => {
    if (!quizStartTime) return;

    const timeSpent = Math.round((Date.now() - quizStartTime) / 1000);
    
    // Generate mock results based on answers
    const mockResults: QuizResult = {
      recommendedBrokers: ['eToro', 'XM', 'IG'],
      userProfile: {
        experienceLevel: finalAnswers.experience || 'beginner',
        tradingStyle: finalAnswers.trading_style || 'day_trading',
        riskTolerance: finalAnswers.risk_tolerance || 'moderate',
        accountSize: finalAnswers.account_size || 'medium'
      },
      matchScore: 85
    };

    setResults(mockResults);
    setIsCompleted(true);

    // Track completion
    analytics.trackQuizCompletion('broker_finder', mockResults, timeSpent);

    // Call parent callback
    if (onComplete) {
      onComplete(mockResults);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setResults(null);
    setQuizStartTime(Date.now());
    
    // Track quiz reset
    trackEvent({
      action: 'quiz_reset',
      category: 'user_engagement',
      label: 'broker_finder_quiz',
      page_category: 'quiz'
    });
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      
      // Track navigation
      trackEvent({
        action: 'quiz_navigation',
        category: 'user_engagement',
        label: 'previous_question',
        custom_parameters: {
          from_question: currentQuestion + 1,
          to_question: currentQuestion
        }
      });
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (isCompleted && results) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-center text-green-600">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{results.matchScore}%</div>
            <p className="text-muted-foreground">Match Score</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Recommended Brokers:</h3>
            <div className="space-y-2">
              {results.recommendedBrokers.map((broker, index) => (
                <div key={broker} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">#{index + 1} {broker}</span>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
            <Button className="flex-1">
              View All Brokers
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <CardTitle className="text-lg">{currentQ.question}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {currentQ.options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="w-full justify-start text-left h-auto p-4 hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleAnswer(currentQ.id, option.value)}
            >
              {option.text}
            </Button>
          ))}
        </div>

        {currentQuestion > 0 && (
          <div className="flex justify-start pt-4">
            <Button variant="ghost" onClick={goToPreviousQuestion}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function BrokerFinderQuizWithAnalytics(props: BrokerFinderQuizProps) {
  return (
    <QuizAnalyticsWrapper quizType="broker_finder" quizId="main_quiz">
      <BrokerFinderQuizContent {...props} />
    </QuizAnalyticsWrapper>
  );
}
