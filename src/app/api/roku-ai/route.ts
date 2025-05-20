import { NextResponse } from "next/server";
import {
  searchBlogPosts,
  searchPages,
  searchBrokers,
  searchTools,
  searchFAQs
} from "@/lib/supabase/roku-client";

// Chat message types
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Request body type
interface RequestBody {
  message: string;
  history: ChatMessage[];
  searchWeb?: boolean;
  restrictToSite?: boolean;
  siteUrl?: string;
}

// Content types
interface PageContent {
  id: string;
  url: string;
  title: string;
  content: string;
  type: string;
  excerpt?: string;
  tags?: string;
  description?: string;
  category?: string;
  rating?: number;
  pros?: string[];
  cons?: string[];
}

// Web search result type
interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
}

// Database item types
interface BlogPost {
  id: string;
  url: string;
  title: string;
  content: string;
  excerpt?: string;
  tags?: string;
  published_at?: string;
}

interface Page {
  id: string;
  url: string;
  title: string;
  content: string;
  meta_description?: string;
  last_updated?: string;
}

interface Broker {
  id: string;
  url?: string;
  name: string;
  description: string;
  features?: any;
  pros?: string[];
  cons?: string[];
  rating?: number;
}

interface Tool {
  id: string;
  url?: string;
  name: string;
  description: string;
  category?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Simple web search mock function - in production, replace with real API
async function performWebSearch(query: string, restrictToSite: boolean = false, siteUrl: string = ''): Promise<WebSearchResult[]> {
  // This is a placeholder for a real search API integration
  // In a production environment, integrate with Google Custom Search, Bing API, etc.
  
  // Simulated website pages - in production, these would come from a real search API
  const simulatedPages = [
    {
      title: "Best Forex Brokers for Beginners",
      url: "/guides/best-forex-brokers-for-beginners",
      content: "Comprehensive guide to the top forex brokers suitable for beginners with low minimum deposits and educational resources."
    },
    {
      title: "Forex Trading Strategies Guide",
      url: "/guides/forex-trading-strategies",
      content: "Learn about different forex trading strategies including day trading, swing trading, and position trading approaches."
    },
    {
      title: "How to Choose a Reliable Forex Broker",
      url: "/guides/how-to-choose-forex-broker",
      content: "Factors to consider when selecting a forex broker including regulation, fees, platforms, and customer support."
    },
    {
      title: "Forex Risk Management Calculator",
      url: "/tools/risk-calculator",
      content: "Use our risk management calculator to determine appropriate position sizes and stop-loss levels for your forex trades."
    },
    {
      title: "Forex Broker Comparison Tool",
      url: "/tools/broker-comparison",
      content: "Compare features, fees, and offerings of popular forex brokers side by side."
    }
  ];
  
  // Filter results based on query terms
  const queryTerms = query.toLowerCase().split(/\s+/);
  let results = simulatedPages.filter(page => {
    return queryTerms.some(term => 
      page.title.toLowerCase().includes(term) || 
      page.content.toLowerCase().includes(term)
    );
  });
  
  // Convert to search result format
  return results.map(page => ({
    title: page.title,
    url: page.url,
    snippet: page.content
  }));
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body: RequestBody = await request.json();
    const { message, searchWeb, restrictToSite, siteUrl } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({
        error: 'Invalid request. Message is required.'
      }, { status: 400 });
    }

    // Extract search terms from message (words with 3+ characters)
    const searchTerms = message
      .toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 3);

    // Generate default response for very short queries
    if (searchTerms.length === 0) {
      return NextResponse.json({
        response: "Could you provide more details? I need a bit more information to give you a helpful answer."
      });
    }

    // Search for relevant content in parallel
    let relevantContent: PageContent[] = [];
    let webSearchResults: WebSearchResult[] = [];

    try {
      // Create an array to hold all search promises
      const searchPromises: Promise<any>[] = [];
      
      // Add database search promises
      const blogPromise = searchBlogPosts(searchTerms);
      const pagePromise = searchPages(searchTerms);
      const brokerPromise = searchBrokers(searchTerms);
      const toolPromise = searchTools(searchTerms);
      const faqPromise = searchFAQs(searchTerms);
      
      searchPromises.push(blogPromise, pagePromise, brokerPromise, toolPromise, faqPromise);
      
      // Add web search if enabled
      let webSearchPromise: Promise<WebSearchResult[]> | null = null;
      if (searchWeb) {
        webSearchPromise = performWebSearch(message, restrictToSite || false, siteUrl || '');
        searchPromises.push(webSearchPromise);
      }

      // Wait for all promises to resolve
      const results = await Promise.all(searchPromises);
      
      const [blogData, pageData, brokerData, toolData, faqData] = results;
      
      // If web search was performed, get the results
      if (searchWeb && webSearchPromise) {
        const webResults = await webSearchPromise;
        webSearchResults = webResults;
      }

      // Format and combine blog posts
      if (blogData && blogData.length > 0) {
        relevantContent = [
          ...relevantContent,
          ...blogData.map((item: BlogPost) => ({
            id: item.id,
            url: item.url,
            title: item.title,
            content: item.content,
            type: 'blog',
            excerpt: item.excerpt || '',
            tags: item.tags || ''
          }))
        ];
      }

      // Format and combine pages
      if (pageData && pageData.length > 0) {
        relevantContent = [
          ...relevantContent,
          ...pageData.map((item: Page) => ({
            id: item.id,
            url: item.url,
            title: item.title,
            content: item.content,
            type: 'page',
            description: item.meta_description || ''
          }))
        ];
      }

      // Format and combine brokers
      if (brokerData && brokerData.length > 0) {
        relevantContent = [
          ...relevantContent,
          ...brokerData.map((item: Broker) => ({
            id: item.id,
            url: item.url || `/brokers/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
            title: item.name,
            content: item.description,
            type: 'broker',
            rating: item.rating || 0,
            pros: item.pros || [],
            cons: item.cons || []
          }))
        ];
      }

      // Format and combine tools
      if (toolData && toolData.length > 0) {
        relevantContent = [
          ...relevantContent,
          ...toolData.map((item: Tool) => ({
            id: item.id,
            url: item.url || `/tools/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
            title: item.name,
            content: item.description,
            type: 'tool',
            category: item.category || ''
          }))
        ];
      }

      // Format and combine FAQs
      if (faqData && faqData.length > 0) {
        relevantContent = [
          ...relevantContent,
          ...faqData.map((item: FAQ) => ({
            id: item.id,
            url: `/faq#${item.id}`,
            title: item.question,
            content: item.answer,
            type: 'faq',
            category: item.category || ''
          }))
        ];
      }
    } catch (searchError) {
      console.error('Error searching for content:', searchError);
      // Continue with empty content rather than failing completely
    }

    // Generate response based on available content
    let aiResponse = "I don't have specific information about that. Try asking about forex brokers, trading strategies, or market analysis.";

    if (relevantContent.length > 0 || webSearchResults.length > 0) {
      // Sort content by relevance (improved implementation)
      relevantContent.sort((a, b) => {
        // Count how many search terms appear in each content
        const aMatches = searchTerms.filter(term => {
          let matches = 0;
          if (a.title?.toLowerCase().includes(term)) matches++;
          if (a.content?.toLowerCase().includes(term)) matches++;
          if (a.excerpt?.toLowerCase().includes(term)) matches++;
          if (a.tags?.toLowerCase().includes(term)) matches++;
          if (a.description?.toLowerCase().includes(term)) matches++;
          if (a.category?.toLowerCase().includes(term)) matches++;
          return matches > 0;
        }).length;

        const bMatches = searchTerms.filter(term => {
          let matches = 0;
          if (b.title?.toLowerCase().includes(term)) matches++;
          if (b.content?.toLowerCase().includes(term)) matches++;
          if (b.excerpt?.toLowerCase().includes(term)) matches++;
          if (b.tags?.toLowerCase().includes(term)) matches++;
          if (b.description?.toLowerCase().includes(term)) matches++;
          if (b.category?.toLowerCase().includes(term)) matches++;
          return matches > 0;
        }).length;

        // Prioritize exact matches in title
        const aExactTitleMatch = searchTerms.some(term => a.title?.toLowerCase() === term);
        const bExactTitleMatch = searchTerms.some(term => b.title?.toLowerCase() === term);

        if (aExactTitleMatch && !bExactTitleMatch) return -1;
        if (!aExactTitleMatch && bExactTitleMatch) return 1;

        // Then sort by match count
        return bMatches - aMatches;
      });

      // Limit to top 5 most relevant results
      const topResults = relevantContent.slice(0, 5);

      // Group results by type for better organization
      const groupedResults: Record<string, PageContent[]> = {};

      topResults.forEach(item => {
        if (!groupedResults[item.type]) {
          groupedResults[item.type] = [];
        }
        groupedResults[item.type].push(item);
      });

      // Create a more informative response with grouped links
      let linkSections = '';

      // Type labels for better readability
      const typeLabels: Record<string, string> = {
        'blog': 'Blog Articles',
        'page': 'Website Pages',
        'broker': 'Forex Brokers',
        'tool': 'Trading Tools',
        'faq': 'Frequently Asked Questions'
      };

      Object.entries(groupedResults).forEach(([type, items]) => {
        if (items.length > 0) {
          linkSections += `\n### ${typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1)}\n\n`;

          items.forEach(item => {
            linkSections += `- [${item.title}](${item.url})`;

            // Add additional context based on content type
            if (type === 'broker' && item.rating) {
              linkSections += ` - Rating: ${item.rating}/10`;
            } else if (type === 'blog' && item.excerpt) {
              linkSections += `\n  ${item.excerpt.substring(0, 100)}...`;
            } else if (type === 'tool' && item.category) {
              linkSections += ` (${item.category})`;
            }

            linkSections += '\n';
          });

          linkSections += '\n';
        }
      });

      // Add web search results if available
      if (webSearchResults.length > 0) {
        linkSections += `\n### Web Search Results\n\n`;
        webSearchResults.slice(0, 3).forEach(result => {
          linkSections += `- [${result.title}](${result.url})\n  ${result.snippet.substring(0, 100)}...\n`;
        });
        linkSections += '\n';
      }

      aiResponse = `Here are some resources that might help answer your question:
${linkSections}
Would you like more specific information about any of these topics? You can ask me to explain more about a particular item.`;
    } else {
      // Provide a more helpful response when no content is found
      aiResponse = `I don't have specific information about "${message}" in our database. 

Here are some topics I can help you with:
- Information about specific forex brokers (e.g., "Tell me about eToro")
- Comparison between brokers (e.g., "Compare XM and IG")
- Trading strategies and analysis (e.g., "What is scalping in forex?")
- Beginner trading guides (e.g., "How to start forex trading")
- Broker selection advice (e.g., "Best brokers for beginners")
- Trading tools and calculators (e.g., "How to use the risk calculator")

You might also want to check:
- Broker Finder Quiz: Find your ideal broker based on your preferences
- Comparison Tool: Side-by-side broker feature comparison
- Latest Reviews: Up-to-date broker reviews and ratings`;
    }

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('Error in ROKU AI API route:', error);
    return NextResponse.json(
      { response: "I'm having trouble processing your request right now. Please try again in a moment." },
      { status: 200 } // Return 200 with error message instead of 500 for better UX
    );
  }
}