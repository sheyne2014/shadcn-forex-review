"use client";

import React, { Component, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, Database } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
}

export class DatabaseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('DatabaseErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      // Check if it's a database-related error
      const isDatabaseError = this.state.error?.message?.includes('Database') ||
                             this.state.error?.message?.includes('timeout') ||
                             this.state.error?.message?.includes('connection') ||
                             this.state.error?.message?.includes('Supabase');

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {isDatabaseError 
                ? "We're experiencing database connectivity issues. Please try again."
                : "Something went wrong. Please try refreshing the page."
              }
            </AlertDescription>
          </Alert>

          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                {isDatabaseError ? 'Database Connection Error' : 'Application Error'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={this.handleRetry} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again {this.state.retryCount > 0 && `(${this.state.retryCount})`}
                </Button>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline" 
                  size="sm"
                >
                  Refresh Page
                </Button>
              </div>

              {this.props.showDetails && process.env.NODE_ENV === 'development' && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="bg-muted p-3 rounded text-xs font-mono overflow-auto max-h-40">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error?.message}
                    </div>
                    <div className="mb-2">
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap text-xs">
                        {this.state.error?.stack}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="whitespace-pre-wrap text-xs">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {isDatabaseError && (
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Possible causes:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Temporary network connectivity issues</li>
                    <li>Database server maintenance</li>
                    <li>High server load causing timeouts</li>
                    <li>Configuration issues</li>
                  </ul>
                  <p className="text-xs">
                    If the problem persists, please contact support.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
