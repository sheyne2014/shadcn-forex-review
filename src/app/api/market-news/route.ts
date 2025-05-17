import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') || 'forex';
    const limit = Number(url.searchParams.get('limit')) || 5;

    const newsResults = await getMarketNews(category, limit);

    return NextResponse.json(newsResults);
  } catch (error) {
    console.error('Error fetching market news:', error);
    return NextResponse.json({ error: 'Failed to fetch market news' }, { status: 500 });
  }
}

type NewsItem = {
  title: string;
  url: string;
  source: string;
  publishedDate?: string;
  snippet?: string;
  imageUrl?: string;
};

async function getMarketNews(category: string, limit: number): Promise<NewsItem[]> {
  try {
    // Determine search query based on category
    let searchQuery = 'forex market news';
    switch (category.toLowerCase()) {
      case 'crypto':
        searchQuery = 'cryptocurrency market news';
        break;
      case 'stocks':
        searchQuery = 'stock market news';
        break;
      case 'commodities':
        searchQuery = 'commodities market news';
        break;
      default:
        searchQuery = 'forex market news';
    }

    // Using FireCrawl search to find latest market news
    const response = await fetch('https://firecrawl.dev/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: limit + 5, // Fetch extra to filter by relevance
        tbs: 'qdr:d' // Limit to results from the past day
      })
    });
    
    const data = await response.json();
    
    const newsItems: NewsItem[] = [];
    
    if (data && Array.isArray(data.results)) {
      // Process search results to extract news articles
      for (const result of data.results) {
        if (newsItems.length >= limit) break;
        
        // Skip non-news sources
        const lowerUrl = result.url?.toLowerCase() || '';
        if (!lowerUrl.includes('news') && 
            !lowerUrl.includes('blog') && 
            !lowerUrl.includes('article')) {
          continue;
        }
        
        const newsItem: NewsItem = {
          title: result.title || 'Untitled News',
          url: result.url,
          source: extractSourceFromUrl(result.url),
          snippet: result.snippet || '',
        };
        
        // Try to extract a date from the snippet or title
        const dateMatch = (result.snippet || result.title || '').match(
          /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}\b/i
        );
        if (dateMatch) {
          newsItem.publishedDate = dateMatch[0];
        }
        
        newsItems.push(newsItem);
      }
    }
    
    return newsItems.slice(0, limit);
  } catch (error) {
    console.error('Error in getMarketNews:', error);
    return [];
  }
}

function extractSourceFromUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    // Remove www. prefix and get the domain name
    return domain.replace(/^www\./, '');
  } catch {
    return 'Unknown Source';
  }
} 