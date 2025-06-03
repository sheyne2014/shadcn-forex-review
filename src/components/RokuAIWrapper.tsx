"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { MessagesSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dynamically import RokuAI with client-side rendering only and delayed loading
const RokuAI = dynamic(
  () => 
    import('./RokuAI')
      .then(mod => ({ default: mod.RokuAI }))
      .catch(err => {
        console.error("Failed to load RokuAI component:", err);
        return { default: () => null }; // Return empty component on error
      }),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-20 right-4 w-80 sm:w-96 h-[500px] rounded-lg border shadow-lg bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading ROKU AI...</p>
        </div>
      </div>
    )
  }
);

export function RokuAIWrapper() {
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Track if user has interacted with the page
  const [userInteracted, setUserInteracted] = useState(false);

  // Only render on client side
  useEffect(() => {
    setMounted(true);
    
    // Track user interaction after 3 seconds on the page
    const timer = setTimeout(() => {
      const handleUserInteraction = () => {
        setUserInteracted(true);
        // Clean up event listeners after capturing interaction
        window.removeEventListener('scroll', handleUserInteraction);
        window.removeEventListener('mousemove', handleUserInteraction);
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('touchstart', handleUserInteraction);
      };
      
      window.addEventListener('scroll', handleUserInteraction);
      window.addEventListener('mousemove', handleUserInteraction);
      window.addEventListener('click', handleUserInteraction);
      window.addEventListener('touchstart', handleUserInteraction);
      
      return () => {
        window.removeEventListener('scroll', handleUserInteraction);
        window.removeEventListener('mousemove', handleUserInteraction);
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('touchstart', handleUserInteraction);
      };
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Pre-load the component after user interaction but don't show it yet
  useEffect(() => {
    if (userInteracted && !isComponentLoaded && !hasError) {
      // Delay pre-loading to prioritize important content first
      const timer = setTimeout(() => {
        setIsComponentLoaded(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [userInteracted, isComponentLoaded, hasError]);

  // Handle opening the chat
  const handleToggleChat = () => {
    if (!isComponentLoaded && !isOpen) {
      // If not pre-loaded yet, load it now
      setIsComponentLoaded(true);
    }
    setIsOpen(prev => !prev);
  };

  // Chat button animation on mount
  useEffect(() => {
    if (mounted && buttonRef.current) {
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.classList.add('animate-bounce');
          setTimeout(() => {
            if (buttonRef.current) {
              buttonRef.current.classList.remove('animate-bounce');
            }
          }, 1000);
        }
      }, 5000);
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          ref={buttonRef}
          onClick={handleToggleChat}
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all",
            hasError ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90",
            isOpen ? "rotate-90" : "rotate-0",
            "transition-transform duration-300"
          )}
          aria-label={isOpen ? "Close ROKU AI chat" : "Open ROKU AI chat"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessagesSquare className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Only render the AI component when needed */}
      {(isComponentLoaded || isOpen) && isOpen && !hasError && (
        <ErrorBoundary onError={() => setHasError(true)}>
          <div className="fixed z-40 bottom-20 right-4 transition-all duration-300 ease-in-out scale-100 origin-bottom-right">
            <RokuAI />
          </div>
        </ErrorBoundary>
      )}
    </>
  );
}

// Simple error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error in RokuAI component:", error, errorInfo);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}