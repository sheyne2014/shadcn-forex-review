// Utility functions for server-side rendering safety

export const isServer = typeof window === 'undefined';
export const isBrowser = typeof window !== 'undefined';

// Safe execution wrapper for browser-only code
export function runOnBrowser<T>(fn: () => T, fallback?: T): T | undefined {
  if (isBrowser) {
    try {
      return fn();
    } catch (error) {
      console.error('Browser function execution failed:', error);
      return fallback;
    }
  }
  return fallback;
}

// Safe execution wrapper for server-only code
export function runOnServer<T>(fn: () => T, fallback?: T): T | undefined {
  if (isServer) {
    try {
      return fn();
    } catch (error) {
      console.error('Server function execution failed:', error);
      return fallback;
    }
  }
  return fallback;
}

// Check if a global is available
export function hasGlobal(name: string): boolean {
  try {
    return typeof (globalThis as any)[name] !== 'undefined';
  } catch {
    return false;
  }
}

// Safe global access
export function getGlobal<T>(name: string, fallback?: T): T | undefined {
  try {
    return hasGlobal(name) ? (globalThis as any)[name] : fallback;
  } catch {
    return fallback;
  }
}
