/**
 * Skip to Content Link
 * 
 * An accessibility feature that allows keyboard users to skip the navigation
 * and jump directly to the main content of the page.
 * This component is visually hidden until focused.
 */

"use client";

import { useEffect, useState } from "react";

export function SkipToContent() {
  const [mounted, setMounted] = useState(false);
  
  // Use useEffect to ensure the component only runs on the client
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Only render on client-side to avoid hydration issues
  if (!mounted) return null;
  
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      Skip to content
    </a>
  );
} 