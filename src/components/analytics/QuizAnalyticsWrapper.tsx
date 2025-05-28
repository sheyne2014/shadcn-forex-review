"use client";

import { useEffect, useState, useRef } from 'react';
import { trackQuizInteraction, trackQuizCompletion, trackEvent } from '@/lib/analytics/google-analytics';

interface QuizAnalyticsWrapperProps {
  children: React.ReactNode;
  quizType?: string;
  quizId?: string;
}

interface QuizStep {
  questionNumber: number;
  question: string;
  answer: string;
  timestamp: number;
}

export function QuizAnalyticsWrapper({ 
  children, 
  quizType = 'broker_finder',
  quizId = 'default'
}: QuizAnalyticsWrapperProps) {
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [quizSteps, setQuizSteps] = useState<QuizStep[]>([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  // Track quiz start
  const handleQuizStart = () => {
    const startTime = Date.now();
    setQuizStartTime(startTime);
    setIsQuizActive(true);
    setCurrentStep(1);

    trackQuizInteraction('quiz_started', 1, undefined, quizType);
    
    // Track as engagement event
    trackEvent({
      action: 'quiz_engagement',
      category: 'user_engagement',
      label: 'quiz_started',
      user_action: 'quiz_start',
      page_category: 'quiz',
      custom_parameters: {
        quiz_type: quizType,
        quiz_id: quizId,
        start_timestamp: startTime
      }
    });
  };

  // Track quiz step/question interaction
  const handleQuizStep = (questionNumber: number, question: string, answer: string) => {
    const timestamp = Date.now();
    const step: QuizStep = {
      questionNumber,
      question,
      answer,
      timestamp
    };

    setQuizSteps(prev => [...prev, step]);
    setCurrentStep(questionNumber + 1);

    // Track individual question interaction
    trackQuizInteraction('question_answered', questionNumber, answer, quizType);

    // Track detailed step analytics
    trackEvent({
      action: 'quiz_step',
      category: 'user_engagement',
      label: `question_${questionNumber}`,
      value: questionNumber,
      user_action: 'question_answered',
      page_category: 'quiz',
      custom_parameters: {
        quiz_type: quizType,
        quiz_id: quizId,
        question_number: questionNumber,
        question_text: question,
        answer: answer,
        step_timestamp: timestamp,
        time_on_question: quizSteps.length > 0 ? timestamp - quizSteps[quizSteps.length - 1].timestamp : 0
      }
    });
  };

  // Track quiz completion
  const handleQuizCompletion = (results: any) => {
    if (!quizStartTime) return;

    const completionTime = Date.now();
    const totalTime = completionTime - quizStartTime;
    const timeSpentSeconds = Math.round(totalTime / 1000);

    // Track completion
    trackQuizCompletion(quizType, results, timeSpentSeconds);

    // Track detailed completion analytics
    trackEvent({
      action: 'quiz_completed',
      category: 'conversion',
      label: quizType,
      value: timeSpentSeconds,
      user_action: 'quiz_completion',
      page_category: 'quiz',
      custom_parameters: {
        quiz_type: quizType,
        quiz_id: quizId,
        total_questions: quizSteps.length,
        time_spent_seconds: timeSpentSeconds,
        completion_rate: 100,
        recommended_brokers: results.recommendedBrokers?.length || 0,
        user_profile: results.userProfile || {},
        quiz_results: results,
        completion_timestamp: completionTime
      }
    });

    // Reset quiz state
    setIsQuizActive(false);
    setQuizStartTime(null);
    setCurrentStep(0);
    setQuizSteps([]);
  };

  // Track quiz abandonment
  const handleQuizAbandonment = () => {
    if (!quizStartTime || !isQuizActive) return;

    const abandonmentTime = Date.now();
    const timeSpent = Math.round((abandonmentTime - quizStartTime) / 1000);
    const completionRate = Math.round((currentStep / (currentStep + 1)) * 100);

    trackEvent({
      action: 'quiz_abandoned',
      category: 'user_engagement',
      label: quizType,
      value: timeSpent,
      user_action: 'quiz_abandonment',
      page_category: 'quiz',
      custom_parameters: {
        quiz_type: quizType,
        quiz_id: quizId,
        questions_answered: quizSteps.length,
        current_step: currentStep,
        time_spent_seconds: timeSpent,
        completion_rate: completionRate,
        abandonment_point: `question_${currentStep}`,
        abandonment_timestamp: abandonmentTime
      }
    });

    // Reset quiz state
    setIsQuizActive(false);
    setQuizStartTime(null);
    setCurrentStep(0);
    setQuizSteps([]);
  };

  // Track quiz navigation (back/forward)
  const handleQuizNavigation = (direction: 'back' | 'forward', fromStep: number, toStep: number) => {
    trackEvent({
      action: 'quiz_navigation',
      category: 'user_engagement',
      label: direction,
      user_action: 'quiz_navigation',
      page_category: 'quiz',
      custom_parameters: {
        quiz_type: quizType,
        quiz_id: quizId,
        navigation_direction: direction,
        from_step: fromStep,
        to_step: toStep,
        timestamp: Date.now()
      }
    });
  };

  // Track page visibility changes to detect abandonment
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isQuizActive) {
        // User switched tabs/minimized - potential abandonment
        trackEvent({
          action: 'quiz_visibility_change',
          category: 'user_engagement',
          label: 'tab_hidden',
          user_action: 'tab_switch',
          page_category: 'quiz',
          custom_parameters: {
            quiz_type: quizType,
            quiz_id: quizId,
            current_step: currentStep,
            visibility_state: 'hidden'
          }
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isQuizActive, currentStep, quizType, quizId]);

  // Track beforeunload for abandonment detection
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isQuizActive) {
        handleQuizAbandonment();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isQuizActive]);

  // Provide analytics functions to child components via context
  const analyticsContext = {
    onQuizStart: handleQuizStart,
    onQuizStep: handleQuizStep,
    onQuizCompletion: handleQuizCompletion,
    onQuizAbandonment: handleQuizAbandonment,
    onQuizNavigation: handleQuizNavigation,
    quizState: {
      isActive: isQuizActive,
      currentStep,
      totalSteps: quizSteps.length,
      startTime: quizStartTime,
      timeElapsed: quizStartTime ? Date.now() - quizStartTime : 0
    }
  };

  return (
    <div ref={quizRef} data-quiz-analytics={quizType}>
      {/* Clone children and pass analytics context */}
      {typeof children === 'function' 
        ? children(analyticsContext)
        : children
      }
    </div>
  );
}

// Hook for accessing quiz analytics in child components
export function useQuizAnalytics() {
  // This would typically use React Context, but for simplicity we'll return the tracking functions
  return {
    trackQuizStart: (quizType: string) => trackQuizInteraction('quiz_started', 1, undefined, quizType),
    trackQuizStep: (questionNumber: number, answer: string, quizType: string) => 
      trackQuizInteraction('question_answered', questionNumber, answer, quizType),
    trackQuizCompletion: (quizType: string, results: any, timeSpent: number) => 
      trackQuizCompletion(quizType, results, timeSpent),
    trackQuizAbandonment: (quizType: string, step: number, timeSpent: number) => 
      trackEvent({
        action: 'quiz_abandoned',
        category: 'user_engagement',
        label: quizType,
        value: timeSpent,
        custom_parameters: { abandonment_step: step }
      })
  };
}
