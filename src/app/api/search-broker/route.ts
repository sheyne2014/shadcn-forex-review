import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    // Call the FireCrawl search API to find broker information
    const searchResults = await searchBrokerInfo(query);

    return NextResponse.json({
      urls: searchResults
    });
  } catch (error) {
    console.error('Error searching for broker:', error);
    return NextResponse.json({ error: 'Failed to search for broker' }, { status: 500 });
  }
}

async function searchBrokerInfo(query: string): Promise<string[]> {
  try {
    // Using async/await syntax with the MCP FireCrawl search function
    const result = await fetch('https://firecrawl.dev/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        limit: 5
      })
    });
    
    const data = await result.json();
    
    // Extract URLs from search results
    if (data && Array.isArray(data.results)) {
      return data.results.map((item: any) => item.url).filter(Boolean);
    }
    
    return [];
  } catch (error) {
    console.error('Error in searchBrokerInfo:', error);
    return [];
  }
} 