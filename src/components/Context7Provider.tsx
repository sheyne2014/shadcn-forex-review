'use client';

import React, { ReactNode, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { context7, Context7Config } from '@/lib/context7';
import { defaultContext7Config, ensureContext7Config } from '@/lib/context7-config';

interface Context7ProviderProps {
  config?: Context7Config;
  children: ReactNode;
}

export function Context7Provider({ config, children }: Context7ProviderProps) {
  useEffect(() => {
    // Ensure we always have a valid configuration
    const validConfig = ensureContext7Config(config);
    
    // Set the context configuration when the component mounts
    context7.setConfig(validConfig);
    
    // Clean up on unmount
    return () => {
      // Reset context to default config instead of empty values
      context7.setConfig(defaultContext7Config);
    };
  }, [config]);

  // Initialize with default config to prevent the "configuration not set" error
  if (!context7.getConfig()) {
    context7.setConfig(defaultContext7Config);
  }

  // Generate structured data if available
  const structuredData = context7.generateStructuredData();

  return (
    <>
      <NextSeo {...context7.getNextSeoProps()} />
      {structuredData && (
        <div dangerouslySetInnerHTML={{ __html: structuredData }} />
      )}
      {children}
    </>
  );
}

// A simpler version that generates optimized content
export function Context7Content({ 
  children, 
  as: Component = 'div',
  type = 'paragraph'
}: { 
  children: string; 
  as?: React.ElementType;
  type?: 'heading' | 'paragraph';
}) {
  // Initialize with default config if needed
  const config = context7.getConfig() || defaultContext7Config;
  
  const optimizedContent = type === 'heading' 
    ? context7.generateHeading(children)
    : context7.generateParagraph(children);
    
  return <Component>{optimizedContent}</Component>;
}

// Specialized heading components
export function Context7Heading1({ children }: { children: string }) {
  return <Context7Content as="h1" type="heading">{children}</Context7Content>;
}

export function Context7Heading2({ children }: { children: string }) {
  return <Context7Content as="h2" type="heading">{children}</Context7Content>;
}

export function Context7Heading3({ children }: { children: string }) {
  return <Context7Content as="h3" type="heading">{children}</Context7Content>;
}

export function Context7Paragraph({ children }: { children: string }) {
  return <Context7Content as="p" type="paragraph">{children}</Context7Content>;
} 