// Custom interface to replace NextSeoProps dependency
export interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
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
  twitter?: {
    cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    handle?: string;
    title?: string;
    description?: string;
    image?: string;
  };
}

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

  // Generate Head props from current context
  public getHeadProps(): HeadProps {
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
          keywords: defaultConfig.keywords.join(', '),
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
      keywords: this.config.keywords.join(', '),
      openGraph: this.config.openGraph,
      twitter: {
        cardType: this.config.twitter?.cardType,
        site: this.config.twitter?.site,
        handle: this.config.twitter?.handle,
        title: this.config.twitter?.title,
        description: this.config.twitter?.description,
        image: this.config.twitter?.image,
      },
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

// Context7 content generation interface
interface Context7GenerateOptions {
  maxTokens?: number;
  temperature?: number;
  model?: string;
}

/**
 * Generate content using Context7 MCP server
 */
export async function context7Generate(
  prompt: string,
  options: Context7GenerateOptions = {}
): Promise<string> {
  const { maxTokens = 500, temperature = 0.7, model = 'gpt-4' } = options;

  try {
    // In a real implementation, this would connect to the Context7 MCP server
    // For now, we'll simulate the response or use a fallback

    if (process.env.CONTEXT7_API_KEY) {
      // Use actual Context7 API
      const response = await fetch('https://api.context7.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CONTEXT7_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          max_tokens: maxTokens,
          temperature,
          model
        })
      });

      if (!response.ok) {
        throw new Error(`Context7 API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.content || data.text || '';
    }

    // Fallback to OpenAI API if available
    if (process.env.OPENAI_API_KEY) {
      return await generateWithOpenAI(prompt, options);
    }

    // Fallback to Anthropic Claude if available
    if (process.env.ANTHROPIC_API_KEY) {
      return await generateWithClaude(prompt, options);
    }

    // Last resort: return a template-based response
    return generateFallbackContent(prompt);

  } catch (error) {
    console.error('Context7 generation failed:', error);
    return generateFallbackContent(prompt);
  }
}

/**
 * Generate content using OpenAI API as fallback
 */
async function generateWithOpenAI(prompt: string, options: Context7GenerateOptions): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: options.maxTokens || 500,
      temperature: options.temperature || 0.7
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Generate content using Anthropic Claude API as fallback
 */
async function generateWithClaude(prompt: string, options: Context7GenerateOptions): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: options.maxTokens || 500,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  return data.content?.[0]?.text || '';
}

/**
 * Generate fallback content when APIs are not available
 */
function generateFallbackContent(prompt: string): string {
  // Extract key information from the prompt to generate relevant content
  const brokerMatch = prompt.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:review|broker|trading)/i);
  const brokerName = brokerMatch ? brokerMatch[1] : 'this broker';

  if (prompt.toLowerCase().includes('introduction')) {
    return `${brokerName} has established itself as a notable player in the forex trading industry. With competitive spreads, multiple trading platforms, and comprehensive educational resources, ${brokerName} caters to traders of all experience levels. In this detailed review, we'll examine the key features, trading conditions, and overall value proposition that ${brokerName} offers to forex traders worldwide.`;
  }

  if (prompt.toLowerCase().includes('conclusion')) {
    return `${brokerName} presents a solid option for forex traders seeking a reliable and feature-rich trading environment. With its competitive pricing, robust platform offerings, and commitment to trader education, ${brokerName} has positioned itself well in the competitive forex broker landscape. As with any trading decision, we recommend conducting thorough research and considering your individual trading needs before making a final choice.`;
  }

  if (prompt.toLowerCase().includes('faq') || prompt.includes('?')) {
    return `${brokerName} provides comprehensive support and transparent information to help traders make informed decisions. For the most current and detailed information, we recommend visiting their official website or contacting their customer support team directly.`;
  }

  // Generic section content
  return `${brokerName} offers a comprehensive trading experience with features designed to meet the needs of modern forex traders. The platform combines advanced technology with user-friendly interfaces, making it accessible to both beginners and experienced traders. Key features include competitive spreads, multiple account types, and robust customer support to ensure a smooth trading experience.`;
}