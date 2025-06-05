/**
 * Error reporting service for production monitoring
 */

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  extra?: Record<string, any>;
}

interface ErrorReportingConfig {
  enabled: boolean;
  endpoint?: string;
  apiKey?: string;
  environment: string;
  maxReports: number;
  reportInterval: number;
}

class ErrorReportingService {
  private config: ErrorReportingConfig;
  private reportQueue: ErrorReport[] = [];
  private reportTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<ErrorReportingConfig> = {}) {
    this.config = {
      enabled: process.env.NODE_ENV === 'production',
      endpoint: process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT,
      apiKey: process.env.ERROR_REPORTING_API_KEY,
      environment: process.env.NODE_ENV || 'development',
      maxReports: 50,
      reportInterval: 30000, // 30 seconds
      ...config
    };

    if (this.config.enabled && typeof window !== 'undefined') {
      this.setupGlobalErrorHandlers();
      this.startReportTimer();
    }
  }

  private setupGlobalErrorHandlers() {
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.captureException(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureException(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        { type: 'unhandledrejection' }
      );
    });

    // Handle React error boundaries (if using React)
    if (typeof window !== 'undefined' && 'React' in window) {
      const originalConsoleError = console.error;
      console.error = (...args) => {
        // Check if this is a React error boundary error
        if (args[0] && typeof args[0] === 'string' && args[0].includes('React')) {
          this.captureException(new Error(args.join(' ')), {
            type: 'react-error-boundary',
            args: args
          });
        }
        originalConsoleError.apply(console, args);
      };
    }
  }

  private startReportTimer() {
    this.reportTimer = setInterval(() => {
      this.flushReports();
    }, this.config.reportInterval);
  }

  captureException(error: Error, extra: Record<string, any> = {}) {
    if (!this.config.enabled) {
      console.warn('Error captured (reporting disabled):', error);
      return;
    }

    const report: ErrorReport = {
      message: error.message,
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      timestamp: new Date().toISOString(),
      extra
    };

    // Add session/user info if available
    if (typeof window !== 'undefined') {
      report.sessionId = this.getSessionId();
      report.userId = this.getUserId();
    }

    this.reportQueue.push(report);

    // If queue is full, flush immediately
    if (this.reportQueue.length >= this.config.maxReports) {
      this.flushReports();
    }

    // Log to console in development
    if (this.config.environment === 'development') {
      console.error('Error captured:', error, extra);
    }
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', extra: Record<string, any> = {}) {
    this.captureException(new Error(message), { level, ...extra });
  }

  private async flushReports() {
    if (this.reportQueue.length === 0) return;

    const reports = [...this.reportQueue];
    this.reportQueue = [];

    try {
      await this.sendReports(reports);
    } catch (error) {
      console.warn('Failed to send error reports:', error);
      // Re-queue reports if sending failed (up to max limit)
      this.reportQueue = [...reports.slice(-this.config.maxReports / 2), ...this.reportQueue];
    }
  }

  private async sendReports(reports: ErrorReport[]) {
    if (!this.config.endpoint) {
      // Fallback: send to our own API endpoint
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reports })
      });
      return;
    }

    // Send to external service (e.g., Sentry, LogRocket, etc.)
    await fetch(this.config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.config.apiKey ? `Bearer ${this.config.apiKey}` : '',
      },
      body: JSON.stringify({
        environment: this.config.environment,
        reports
      })
    });
  }

  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server';
    
    let sessionId = sessionStorage.getItem('error-reporting-session-id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('error-reporting-session-id', sessionId);
    }
    return sessionId;
  }

  private getUserId(): string | undefined {
    if (typeof window === 'undefined') return undefined;
    
    // Try to get user ID from various sources
    const sources = [
      () => localStorage.getItem('user-id'),
      () => sessionStorage.getItem('user-id'),
      () => document.cookie.match(/user-id=([^;]+)/)?.[1],
    ];

    for (const source of sources) {
      try {
        const userId = source();
        if (userId) return userId;
      } catch {
        // Ignore errors from accessing storage
      }
    }

    return undefined;
  }

  // Manual error reporting methods
  reportDatabaseError(error: Error, query?: string, params?: any) {
    this.captureException(error, {
      type: 'database-error',
      query,
      params
    });
  }

  reportAPIError(error: Error, endpoint: string, method: string, status?: number) {
    this.captureException(error, {
      type: 'api-error',
      endpoint,
      method,
      status
    });
  }

  reportPerformanceIssue(metric: string, value: number, threshold: number) {
    this.captureMessage(`Performance issue: ${metric}`, 'warning', {
      type: 'performance-issue',
      metric,
      value,
      threshold
    });
  }

  // Cleanup
  destroy() {
    if (this.reportTimer) {
      clearInterval(this.reportTimer);
      this.reportTimer = null;
    }
    this.flushReports();
  }
}

// Global instance
export const errorReporting = new ErrorReportingService();

// Convenience functions
export const captureException = (error: Error, extra?: Record<string, any>) => {
  errorReporting.captureException(error, extra);
};

export const captureMessage = (message: string, level?: 'info' | 'warning' | 'error', extra?: Record<string, any>) => {
  errorReporting.captureMessage(message, level, extra);
};

export const reportDatabaseError = (error: Error, query?: string, params?: any) => {
  errorReporting.reportDatabaseError(error, query, params);
};

export const reportAPIError = (error: Error, endpoint: string, method: string, status?: number) => {
  errorReporting.reportAPIError(error, endpoint, method, status);
};

export const reportPerformanceIssue = (metric: string, value: number, threshold: number) => {
  errorReporting.reportPerformanceIssue(metric, value, threshold);
};

// React hook for error reporting
export function useErrorReporting() {
  return {
    captureException,
    captureMessage,
    reportDatabaseError,
    reportAPIError,
    reportPerformanceIssue
  };
}
