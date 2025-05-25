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

  // Comprehensive website knowledge base for intelligent routing
  const WEBSITE_KNOWLEDGE = {
    // Main navigation pages
    mainPages: [
      { title: "Homepage", url: "/landing", keywords: ["home", "main", "start", "welcome"] },
      { title: "Best Brokers", url: "/best-brokers", keywords: ["best", "top", "recommended", "brokers"] },
      { title: "Broker Comparison", url: "/tools/compare", keywords: ["compare", "comparison", "vs", "versus"] },
      { title: "Trading Tools", url: "/tools", keywords: ["tools", "calculator", "converter", "quiz"] },
      { title: "FAQ", url: "/faq", keywords: ["faq", "questions", "help", "support"] },
      { title: "About Us", url: "/about", keywords: ["about", "company", "team", "contact"] }
    ],

    // Broker categories
    brokerCategories: [
      { title: "Best Forex Brokers", url: "/best-brokers/forex", keywords: ["forex", "fx", "currency", "foreign exchange"] },
      { title: "Best Brokers for Beginners", url: "/best-brokers/beginners", keywords: ["beginner", "new", "starter", "novice", "first time"] },
      { title: "Low-Cost Brokers", url: "/best-brokers/low-cost", keywords: ["low cost", "cheap", "affordable", "low fees", "commission free"] },
      { title: "Crypto Brokers", url: "/best-brokers/crypto", keywords: ["crypto", "cryptocurrency", "bitcoin", "ethereum", "digital currency"] },
      { title: "Stock Brokers", url: "/best-brokers/stocks", keywords: ["stocks", "shares", "equity", "stock market"] },
      { title: "CFD Brokers", url: "/best-brokers/cfd", keywords: ["cfd", "contract for difference", "derivatives"] },
      { title: "Day Trading Brokers", url: "/best-brokers/day-trading", keywords: ["day trading", "scalping", "short term"] },
      { title: "Swing Trading Brokers", url: "/best-brokers/swing-trading", keywords: ["swing trading", "medium term", "position trading"] },
      { title: "Mobile Trading Apps", url: "/best-brokers/mobile-trading", keywords: ["mobile", "app", "smartphone", "tablet"] },
      { title: "High Leverage Brokers", url: "/best-brokers/high-leverage", keywords: ["leverage", "margin", "high leverage"] },
      { title: "ECN Brokers", url: "/best-brokers/ecn", keywords: ["ecn", "electronic communication network", "direct market access"] },
      { title: "Islamic Brokers", url: "/best-brokers/islamic", keywords: ["islamic", "sharia", "swap free", "halal"] },
      { title: "Professional Brokers", url: "/best-brokers/professional", keywords: ["professional", "advanced", "institutional"] },
      { title: "Demo Account Brokers", url: "/best-brokers/demo-accounts", keywords: ["demo", "practice", "trial", "test account"] }
    ],

    // Individual broker pages
    brokers: [
      { title: "eToro Review", url: "/broker/805f65c5-3911-448e-8800-0143bbbb2a0f", keywords: ["etoro", "social trading", "copy trading"] },
      { title: "XM Review", url: "/brokers/xm", keywords: ["xm", "xm group", "xm global"] },
      { title: "IC Markets Review", url: "/brokers/ic-markets", keywords: ["ic markets", "ic", "raw spread"] },
      { title: "Pepperstone Review", url: "/brokers/pepperstone", keywords: ["pepperstone", "razor"] },
      { title: "OANDA Review", url: "/brokers/oanda", keywords: ["oanda", "oanda corporation"] },
      { title: "Interactive Brokers Review", url: "/brokers/interactive-brokers", keywords: ["interactive brokers", "ibkr", "ib"] },
      { title: "Plus500 Review", url: "/brokers/plus500", keywords: ["plus500", "plus 500"] },
      { title: "Capital.com Review", url: "/brokers/capital-com", keywords: ["capital.com", "capital", "capitalcom"] },
      { title: "Saxo Bank Review", url: "/brokers/saxo-bank", keywords: ["saxo", "saxo bank"] },
      { title: "Swissquote Review", url: "/brokers/swissquote", keywords: ["swissquote", "swiss"] },
      { title: "FXTM Review", url: "/brokers/fxtm", keywords: ["fxtm", "forextime"] },
      { title: "Exness Review", url: "/brokers/exness", keywords: ["exness"] },
      { title: "Axi Review", url: "/brokers/axi", keywords: ["axi", "axitrader"] },
      { title: "EasyMarkets Review", url: "/brokers/easymarkets", keywords: ["easymarkets", "easy markets"] },
      { title: "TMGM Review", url: "/brokers/tmgm", keywords: ["tmgm", "trademax"] },
      { title: "XTB Review", url: "/brokers/xtb", keywords: ["xtb", "x-trade brokers"] },
      { title: "StarTrader Review", url: "/brokers/startrader", keywords: ["startrader", "star trader"] }
    ],

    // Trading tools
    tools: [
      { title: "Broker Comparison Tool", url: "/tools/compare", keywords: ["compare", "comparison", "side by side", "vs"] },
      { title: "Trading Calculator", url: "/tools/calculator", keywords: ["calculator", "calculate", "pip", "profit", "loss"] },
      { title: "Currency Converter", url: "/tools/converter", keywords: ["converter", "convert", "currency", "exchange rate"] },
      { title: "Broker Finder Quiz", url: "/tools/quiz", keywords: ["quiz", "finder", "find broker", "questionnaire"] },
      { title: "Scam Check Tool", url: "/tools/scam-check", keywords: ["scam", "verify", "check", "legitimate", "fraud"] }
    ],

    // Regional pages
    regions: [
      { title: "Best Brokers in UK", url: "/best-brokers/uk", keywords: ["uk", "united kingdom", "britain", "british"] },
      { title: "Best Brokers in US", url: "/best-brokers/us", keywords: ["us", "usa", "united states", "america", "american"] },
      { title: "Best Brokers in Europe", url: "/best-brokers/europe", keywords: ["europe", "european", "eu"] },
      { title: "Best Brokers in Australia", url: "/best-brokers/australia", keywords: ["australia", "australian", "aussie"] },
      { title: "Best Brokers in Canada", url: "/best-brokers/canada", keywords: ["canada", "canadian"] },
      { title: "Best Brokers in Asia", url: "/best-brokers/asia", keywords: ["asia", "asian"] },
      { title: "Best Brokers in Singapore", url: "/best-brokers/singapore", keywords: ["singapore"] },
      { title: "Best Brokers in India", url: "/best-brokers/india", keywords: ["india", "indian"] }
    ]
  };

  // Intelligent page matching using the knowledge base
  const queryTerms = query.toLowerCase().split(/\s+/);
  const allPages = [
    ...WEBSITE_KNOWLEDGE.mainPages,
    ...WEBSITE_KNOWLEDGE.brokerCategories,
    ...WEBSITE_KNOWLEDGE.brokers,
    ...WEBSITE_KNOWLEDGE.tools,
    ...WEBSITE_KNOWLEDGE.regions
  ];

  // Score pages based on keyword matches
  const scoredPages = allPages.map(page => {
    let score = 0;
    const titleLower = page.title.toLowerCase();

    // Check for exact matches in title (highest score)
    queryTerms.forEach(term => {
      if (titleLower.includes(term)) score += 10;
    });

    // Check for keyword matches
    page.keywords.forEach(keyword => {
      queryTerms.forEach(term => {
        if (keyword.includes(term) || term.includes(keyword)) score += 5;
      });
    });

    return { ...page, score };
  });

  // Filter and sort by score
  const results = scoredPages
    .filter(page => page.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Convert to search result format
  return results.map(page => ({
    title: page.title,
    url: page.url,
    snippet: `${page.title} - Find detailed information and reviews.`
  }));
}

// Intelligent response generation function
function generateIntelligentResponse(
  message: string,
  relevantContent: PageContent[],
  webSearchResults: WebSearchResult[],
  searchTerms: string[]
): string {
  const messageLower = message.toLowerCase();

  // Define response patterns for common queries
  const responsePatterns = [
    {
      patterns: ["best broker", "top broker", "recommend broker", "which broker"],
      response: "I'd be happy to help you find the best broker! Here are some great options based on your needs:"
    },
    {
      patterns: ["compare", "vs", "versus", "difference between"],
      response: "Great question! Let me help you compare these options. Here's what I found:"
    },
    {
      patterns: ["beginner", "new to trading", "start trading", "first time"],
      response: "Perfect! I love helping new traders get started. Here are the best resources for beginners:"
    },
    {
      patterns: ["fees", "cost", "commission", "spread", "cheap"],
      response: "Cost is definitely important when choosing a broker. Here are some low-cost options and fee information:"
    },
    {
      patterns: ["demo", "practice", "trial", "test"],
      response: "Practice makes perfect! Here are brokers with excellent demo accounts:"
    },
    {
      patterns: ["mobile", "app", "smartphone", "tablet"],
      response: "Mobile trading is essential these days! Here are the best mobile trading platforms:"
    },
    {
      patterns: ["regulation", "regulated", "safe", "secure", "legitimate"],
      response: "Safety first! Here are well-regulated and secure brokers:"
    },
    {
      patterns: ["forex", "fx", "currency", "foreign exchange"],
      response: "Forex trading is exciting! Here are the top forex brokers and resources:"
    },
    {
      patterns: ["crypto", "bitcoin", "ethereum", "cryptocurrency"],
      response: "Crypto trading is booming! Here are the best crypto brokers and information:"
    },
    {
      patterns: ["calculator", "calculate", "pip", "profit", "loss"],
      response: "Let me help you with trading calculations! Here are our useful tools:"
    }
  ];

  // Find matching response pattern
  let contextualResponse = "Here's what I found to help answer your question:";
  for (const pattern of responsePatterns) {
    if (pattern.patterns.some(p => messageLower.includes(p))) {
      contextualResponse = pattern.response;
      break;
    }
  }

  return contextualResponse;
}

// Generate intelligent fallback response with relevant suggestions
function generateFallbackResponse(message: string, searchTerms: string[]): string {
  const messageLower = message.toLowerCase();

  // Suggest relevant pages based on query intent
  let suggestions: string[] = [];

  // Broker-related queries
  if (messageLower.includes('broker') || messageLower.includes('trading')) {
    suggestions.push(
      "🏆 [Best Forex Brokers](/best-brokers/forex) - Top-rated brokers for forex trading",
      "🔍 [Broker Comparison Tool](/tools/compare) - Compare brokers side by side",
      "📝 [Broker Reviews](/brokers) - Detailed broker reviews and ratings"
    );
  }

  // Beginner-related queries
  if (messageLower.includes('beginner') || messageLower.includes('start') || messageLower.includes('new')) {
    suggestions.push(
      "🚀 [Best Brokers for Beginners](/best-brokers/beginners) - Perfect for new traders",
      "📚 [Trading Guides](/blog) - Learn the basics of trading",
      "🎯 [Broker Finder Quiz](/tools/quiz) - Find your ideal broker"
    );
  }

  // Cost-related queries
  if (messageLower.includes('fee') || messageLower.includes('cost') || messageLower.includes('cheap')) {
    suggestions.push(
      "💰 [Low-Cost Brokers](/best-brokers/low-cost) - Affordable trading options",
      "📊 [Trading Calculator](/tools/calculator) - Calculate trading costs"
    );
  }

  // Tool-related queries
  if (messageLower.includes('tool') || messageLower.includes('calculator') || messageLower.includes('convert')) {
    suggestions.push(
      "🛠️ [Trading Tools](/tools) - All our helpful trading tools",
      "📱 [Currency Converter](/tools/converter) - Convert currencies instantly",
      "🧮 [Trading Calculator](/tools/calculator) - Calculate profits and losses"
    );
  }

  // If no specific suggestions, provide general ones
  if (suggestions.length === 0) {
    suggestions = [
      "🏆 [Best Brokers](/best-brokers) - Find top-rated brokers",
      "🔍 [Broker Comparison](/tools/compare) - Compare brokers easily",
      "🎯 [Broker Finder Quiz](/tools/quiz) - Discover your perfect broker",
      "📚 [Trading Guides](/blog) - Learn trading strategies",
      "❓ [FAQ](/faq) - Common questions answered"
    ];
  }

  const suggestionText = suggestions.slice(0, 4).join('\n');

  return `I'd love to help you with "${message}"! While I search for more specific information, here are some great resources that might be exactly what you're looking for:

${suggestionText}

💡 **Quick tip**: Try asking me about specific brokers (like "Tell me about eToro"), trading topics, or use phrases like "best broker for beginners" for more targeted results!

Is there anything specific about trading or brokers you'd like to know more about?`;
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

    // Enhanced AI response generation with intelligent routing
    let aiResponse = generateIntelligentResponse(message, relevantContent, webSearchResults, searchTerms);

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
      // Enhanced fallback response with intelligent suggestions
      aiResponse = generateFallbackResponse(message, searchTerms);
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