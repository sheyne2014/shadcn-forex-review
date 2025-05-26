'use client';

import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
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

  // Get SEO props for manual Head implementation
  const seoProps = context7.getHeadProps();

  return (
    <>
      <Head>
        {seoProps.title && <title>{seoProps.title}</title>}
        {seoProps.description && <meta name="description" content={seoProps.description} />}
        {seoProps.keywords && <meta name="keywords" content={seoProps.keywords} />}

        {/* Open Graph tags */}
        {seoProps.openGraph?.title && <meta property="og:title" content={seoProps.openGraph.title} />}
        {seoProps.openGraph?.description && <meta property="og:description" content={seoProps.openGraph.description} />}
        {seoProps.openGraph?.type && <meta property="og:type" content={seoProps.openGraph.type} />}
        {seoProps.openGraph?.siteName && <meta property="og:site_name" content={seoProps.openGraph.siteName} />}
        {seoProps.openGraph?.images?.map((image: { url: string; width?: number; height?: number; alt?: string }, index: number) => (
          <React.Fragment key={index}>
            <meta property="og:image" content={image.url} />
            {image.width && <meta property="og:image:width" content={image.width.toString()} />}
            {image.height && <meta property="og:image:height" content={image.height.toString()} />}
            {image.alt && <meta property="og:image:alt" content={image.alt} />}
          </React.Fragment>
        ))}

        {/* Twitter Card tags */}
        {seoProps.twitter?.cardType && <meta name="twitter:card" content={seoProps.twitter.cardType} />}
        {seoProps.twitter?.site && <meta name="twitter:site" content={seoProps.twitter.site} />}
        {seoProps.twitter?.title && <meta name="twitter:title" content={seoProps.twitter.title} />}
        {seoProps.twitter?.description && <meta name="twitter:description" content={seoProps.twitter.description} />}
        {seoProps.twitter?.image && <meta name="twitter:image" content={seoProps.twitter.image} />}
      </Head>
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
  if (!context7.getConfig()) {
    context7.setConfig(defaultContext7Config);
  }

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