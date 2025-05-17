"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { MessagesSquare } from 'lucide-react';

// Dynamically import RokuAI with client-side rendering only
const RokuAI = dynamic(() => import('./RokuAI').then(mod => ({ default: mod.RokuAI })), {
  ssr: false,
  loading: () => null
});

export function RokuAIWrapper() {
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (hasError) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setHasError(false)}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90"
        >
          <MessagesSquare className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  if (!mounted) {
    return null;
  }

  return (
    <ErrorBoundary onError={() => setHasError(true)}>
      <RokuAI />
    </ErrorBoundary>
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