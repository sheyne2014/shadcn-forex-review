import { env } from '@/env';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  date?: string;
}

interface WebSearchResponse {
  results: SearchResult[];
  totalResults: number;
  searchTime: number;
}

/**
 * Performs web search using multiple search engines and APIs
 */
export async function webSearch(query: string, options: {
  maxResults?: number;
  dateRange?: 'day' | 'week' | 'month' | 'year';
  site?: string;
} = {}): Promise<WebSearchResponse> {
  const { maxResults = 10, dateRange, site } = options;

  try {
    // Try Google Custom Search API first
    if (process.env.GOOGLE_SEARCH_API_KEY && process.env.GOOGLE_SEARCH_ENGINE_ID) {
      return await googleCustomSearch(query, { maxResults, dateRange, site });
    }

    // Fallback to Bing Search API
    if (process.env.BING_SEARCH_API_KEY) {
      return await bingSearch(query, { maxResults, dateRange, site });
    }

    // Fallback to DuckDuckGo (no API key required)
    return await duckDuckGoSearch(query, { maxResults });

  } catch (error) {
    console.error('Web search failed:', error);
    // Return mock results for development
    return {
      results: [
        {
          title: `${query} - Latest Information`,
          url: 'https://example.com',
          snippet: `Recent information about ${query} and related topics.`
        }
      ],
      totalResults: 1,
      searchTime: 0
    };
  }
}

/**
 * Google Custom Search API implementation
 */
async function googleCustomSearch(query: string, options: {
  maxResults: number;
  dateRange?: string;
  site?: string;
}): Promise<WebSearchResponse> {
  const { maxResults, dateRange, site } = options;

  let searchQuery = query;
  if (site) {
    searchQuery += ` site:${site}`;
  }

  const params = new URLSearchParams({
    key: process.env.GOOGLE_SEARCH_API_KEY!,
    cx: process.env.GOOGLE_SEARCH_ENGINE_ID!,
    q: searchQuery,
    num: Math.min(maxResults, 10).toString(),
  });

  if (dateRange) {
    const dateRestrict = {
      'day': 'd1',
      'week': 'w1',
      'month': 'm1',
      'year': 'y1'
    }[dateRange];
    if (dateRestrict) {
      params.append('dateRestrict', dateRestrict);
    }
  }

  const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Google Search API error: ${data.error?.message || 'Unknown error'}`);
  }

  return {
    results: (data.items || []).map((item: any) => ({
      title: item.title,
      url: item.link,
      snippet: item.snippet,
      date: item.pagemap?.metatags?.[0]?.['article:published_time']
    })),
    totalResults: parseInt(data.searchInformation?.totalResults || '0'),
    searchTime: parseFloat(data.searchInformation?.searchTime || '0')
  };
}

/**
 * Bing Search API implementation
 */
async function bingSearch(query: string, options: {
  maxResults: number;
  dateRange?: string;
  site?: string;
}): Promise<WebSearchResponse> {
  const { maxResults, site } = options;

  let searchQuery = query;
  if (site) {
    searchQuery += ` site:${site}`;
  }

  const response = await fetch('https://api.bing.microsoft.com/v7.0/search', {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_SEARCH_API_KEY!,
    },
    method: 'GET',
    body: new URLSearchParams({
      q: searchQuery,
      count: Math.min(maxResults, 50).toString(),
      responseFilter: 'Webpages',
      textFormat: 'HTML'
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Bing Search API error: ${data.error?.message || 'Unknown error'}`);
  }

  return {
    results: (data.webPages?.value || []).map((item: any) => ({
      title: item.name,
      url: item.url,
      snippet: item.snippet,
      date: item.dateLastCrawled
    })),
    totalResults: data.webPages?.totalEstimatedMatches || 0,
    searchTime: 0
  };
}

/**
 * DuckDuckGo search (fallback, no API key required)
 */
async function duckDuckGoSearch(query: string, options: {
  maxResults: number;
}): Promise<WebSearchResponse> {
  // Note: DuckDuckGo doesn't have an official API, so this is a simplified implementation
  // In production, you might want to use a web scraping service or proxy

  try {
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
    const data = await response.json();

    const results = (data.RelatedTopics || [])
      .filter((topic: any) => topic.FirstURL)
      .slice(0, options.maxResults)
      .map((topic: any) => ({
        title: topic.Text?.split(' - ')[0] || query,
        url: topic.FirstURL,
        snippet: topic.Text || `Information about ${query}`
      }));

    return {
      results,
      totalResults: results.length,
      searchTime: 0
    };
  } catch (error) {
    console.error('DuckDuckGo search failed:', error);
    return {
      results: [],
      totalResults: 0,
      searchTime: 0
    };
  }
}

/**
 * Search for trending topics across all financial markets
 */
export async function searchTrendingTopics(category?: string): Promise<string[]> {
  const topicCategories = {
    forex: [
      'forex trading strategies 2025',
      'best currency pairs to trade',
      'forex market analysis today',
      'EUR/USD forecast 2025',
      'forex trading psychology',
      'forex risk management',
      'forex scalping strategies',
      'forex swing trading',
      'major currency pairs analysis',
      'forex economic calendar impact'
    ],
    stocks: [
      'best stocks to buy 2025',
      'stock market analysis today',
      'dividend investing strategies',
      'growth vs value stocks',
      'stock market predictions 2025',
      'how to analyze stocks',
      'stock trading for beginners',
      'blue chip stocks 2025',
      'penny stocks to watch',
      'stock market volatility analysis'
    ],
    crypto: [
      'cryptocurrency market analysis 2025',
      'best crypto to invest 2025',
      'Bitcoin price prediction',
      'Ethereum vs Bitcoin comparison',
      'DeFi investing strategies',
      'crypto trading strategies',
      'altcoin analysis 2025',
      'crypto market trends',
      'blockchain technology impact',
      'crypto regulation updates'
    ],
    options: [
      'options trading strategies 2025',
      'call vs put options explained',
      'options trading for beginners',
      'covered call strategies',
      'options Greeks explained',
      'iron condor strategy',
      'options expiration strategies',
      'volatility trading with options',
      'options vs stocks comparison',
      'weekly options strategies'
    ],
    cfd: [
      'CFD trading strategies',
      'CFD vs stocks comparison',
      'CFD trading risks explained',
      'best CFD brokers 2025',
      'CFD margin requirements',
      'CFD trading psychology',
      'commodity CFD trading',
      'index CFD strategies',
      'CFD leverage explained',
      'CFD trading platforms comparison'
    ],
    etf: [
      'best ETFs to buy 2025',
      'ETF vs mutual funds',
      'dividend ETF strategies',
      'sector ETF analysis',
      'international ETF investing',
      'ETF portfolio diversification',
      'low cost ETF investing',
      'thematic ETF trends 2025',
      'bond ETF strategies',
      'ETF tax efficiency'
    ],
    trading: [
      'day trading strategies 2025',
      'swing trading vs day trading',
      'technical analysis patterns',
      'trading psychology tips',
      'risk management strategies',
      'trading platform comparison',
      'algorithmic trading basics',
      'social trading platforms',
      'trading journal importance',
      'market sentiment analysis'
    ],
    investing: [
      'investment strategies 2025',
      'passive vs active investing',
      'portfolio diversification tips',
      'retirement investing strategies',
      'ESG investing trends',
      'value investing principles',
      'growth investing strategies',
      'international investing guide',
      'tax efficient investing',
      'robo advisor comparison'
    ]
  };

  if (category && topicCategories[category as keyof typeof topicCategories]) {
    return topicCategories[category as keyof typeof topicCategories];
  }

  // Return mixed topics from all categories
  const allTopics = Object.values(topicCategories).flat();
  return shuffleArray(allTopics).slice(0, 20);
}

/**
 * Get trending questions for specific financial topics
 */
export async function getTrendingQuestions(topic: string): Promise<string[]> {
  const searchQueries = [
    `${topic} questions 2025`,
    `how to ${topic}`,
    `${topic} for beginners`,
    `${topic} vs`,
    `best ${topic} strategies`,
    `${topic} tips and tricks`,
    `${topic} mistakes to avoid`,
    `${topic} analysis methods`
  ];

  const allQuestions: string[] = [];

  for (const query of searchQueries.slice(0, 3)) { // Limit to 3 searches to avoid rate limits
    try {
      const results = await webSearch(query, { maxResults: 5, dateRange: 'month' });
      const questions = extractQuestionsFromResults(results.results);
      allQuestions.push(...questions);
    } catch (error) {
      console.error(`Failed to search for ${query}:`, error);
    }
  }

  return [...new Set(allQuestions)].slice(0, 10);
}

/**
 * Search for current market trends and news
 */
export async function searchMarketTrends(category: string): Promise<{
  trends: string[];
  news: string[];
  questions: string[];
}> {
  const trendSearches = [
    `${category} market trends 2025`,
    `${category} news today`,
    `${category} analysis this week`
  ];

  const trends: string[] = [];
  const news: string[] = [];
  const questions: string[] = [];

  for (const searchQuery of trendSearches) {
    try {
      const results = await webSearch(searchQuery, {
        maxResults: 5,
        dateRange: 'week'
      });

      results.results.forEach(result => {
        if (result.title.toLowerCase().includes('trend')) {
          trends.push(result.title);
        } else if (result.title.toLowerCase().includes('news') ||
                   result.title.toLowerCase().includes('update')) {
          news.push(result.title);
        }
      });

      const extractedQuestions = extractQuestionsFromResults(results.results);
      questions.push(...extractedQuestions);

    } catch (error) {
      console.error(`Failed to search market trends for ${searchQuery}:`, error);
    }
  }

  return {
    trends: [...new Set(trends)].slice(0, 5),
    news: [...new Set(news)].slice(0, 5),
    questions: [...new Set(questions)].slice(0, 10)
  };
}

/**
 * Utility function to shuffle array
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Extract questions from search results
 */
export function extractQuestionsFromResults(results: SearchResult[]): string[] {
  const questions: string[] = [];

  results.forEach(result => {
    const text = `${result.title} ${result.snippet}`;

    // Look for question patterns
    const questionPatterns = [
      /\b(what|how|why|when|where|which|who|is|are|can|should|will|would|could|do|does|did)\b[^.!?]*\?/gi,
      /\b(best|top|better|worst|compare|vs|versus)\b[^.!?]*(?=\s|$)/gi
    ];

    questionPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        questions.push(...matches.map(q => q.trim()));
      }
    });
  });

  // Remove duplicates and return top questions
  return [...new Set(questions)].slice(0, 10);
}

export type { SearchResult, WebSearchResponse };
