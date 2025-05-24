import { NextSeoProps } from 'next-seo';

// Context7 configuration for SEO-focused content delivery
export interface Context7Config {
  // Core metadata for the current context
  title: string;
  description: string;
  keywords: string[];

  // Open Graph metadata for social sharing
  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    type?: string;
    locale?: string;
    siteName?: string;
  };

  // Twitter card metadata
  twitter?: {
    cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    handle?: string;
    title?: string;
    description?: string;
    image?: string;
  };

  // Structured data for rich results
  structuredData?: object | object[];

  // Canonical URL
  canonical?: string;

  // Additional metadata
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    httpEquiv?: string;
    content: string;
    key?: string;
  }>;
}

// Context7 tools for generating context-aware content
export class Context7Tool {
  private static instance: Context7Tool;
  private config: Context7Config | null = null;

  private constructor() {}

  public static getInstance(): Context7Tool {
    if (!Context7Tool.instance) {
      Context7Tool.instance = new Context7Tool();
    }
    return Context7Tool.instance;
  }

  // Set the current context configuration
  public setConfig(config: Context7Config): void {
    this.config = config;
  }

  // Get the current context configuration
  public getConfig(): Context7Config | null {
    return this.config;
  }

  // Generate NextSEO compatible props from current context
  public getNextSeoProps(): NextSeoProps {
    if (!this.config) {
      // Instead of throwing an error, attempt to import the default config or return empty values
      try {
        // Import dynamically at runtime to avoid circular dependency
        const defaultConfig = {
          title: 'BrokerAnalysis',
          description: 'Forex broker reviews and comparisons',
          keywords: ['forex', 'broker', 'review']
        };
        
        return {
          title: defaultConfig.title,
          description: defaultConfig.description,
          // Minimal props when no config is available
        };
      } catch (e) {
        console.warn('Context7 configuration not set and default config not available');
        return {
          title: 'Broker Analysis',
          description: 'Trading broker reviews and comparisons',
        };
      }
    }

    return {
      title: this.config.title,
      description: this.config.description,
      canonical: this.config.canonical,
      openGraph: this.config.openGraph,
      twitter: {
        cardType: this.config.twitter?.cardType,
        site: this.config.twitter?.site,
        handle: this.config.twitter?.handle,
      },
      additionalMetaTags: this.config.additionalMetaTags as any,
    };
  }

  // Generate SEO-optimized heading based on context
  public generateHeading(baseHeading: string, _level: 1 | 2 | 3 | 4 | 5 | 6 = 1): string {
    if (!this.config) {
      return baseHeading;
    }

    // Inject relevant keywords if not already present
    const keywords = this.config.keywords.slice(0, 3);
    let enhancedHeading = baseHeading;

    for (const keyword of keywords) {
      if (!baseHeading.toLowerCase().includes(keyword.toLowerCase()) &&
          this.shouldAddKeyword(baseHeading, keyword)) {
        enhancedHeading = this.injectKeyword(baseHeading, keyword);
        break;
      }
    }

    return enhancedHeading;
  }

  // Generate SEO-optimized paragraph based on context
  public generateParagraph(baseParagraph: string): string {
    if (!this.config) {
      return baseParagraph;
    }

    // Enhance with primary keyword if not present
    if (this.config.keywords.length > 0) {
      const primaryKeyword = this.config.keywords[0];

      if (!baseParagraph.toLowerCase().includes(primaryKeyword.toLowerCase()) &&
          this.shouldAddKeyword(baseParagraph, primaryKeyword)) {
        return this.injectKeyword(baseParagraph, primaryKeyword);
      }
    }

    return baseParagraph;
  }

  // Generate JSON-LD structured data
  public generateStructuredData(): string | null {
    if (!this.config || !this.config.structuredData) {
      return null;
    }

    const data = Array.isArray(this.config.structuredData)
      ? this.config.structuredData
      : [this.config.structuredData];

    return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  }

  // Helper method to determine if a keyword should be added
  private shouldAddKeyword(text: string, keyword: string): boolean {
    // Check if text already has similar keywords
    const words = keyword.toLowerCase().split(' ');
    const textLower = text.toLowerCase();

    // Don't add if all words in the keyword are already present
    return !words.every(word => textLower.includes(word));
  }

  // Helper method to inject a keyword naturally into text
  private injectKeyword(text: string, keyword: string): string {
    // Simple injection strategy - append to the end if short text
    if (text.length < 100) {
      return `${text} for ${keyword}`;
    }

    // For longer text, try to insert at a natural breaking point
    const sentences = text.split('. ');
    if (sentences.length > 1) {
      sentences[sentences.length - 2] += ` regarding ${keyword}`;
      return sentences.join('. ');
    }

    // Fallback - insert before last period
    const lastPeriodIndex = text.lastIndexOf('.');
    if (lastPeriodIndex > 0 && lastPeriodIndex < text.length - 1) {
      return `${text.substring(0, lastPeriodIndex)} with ${keyword}${text.substring(lastPeriodIndex)}`;
    }

    // Last resort - append to the end
    return `${text} - Learn more about ${keyword}.`;
  }
}

// Export singleton instance
export const context7 = Context7Tool.getInstance();