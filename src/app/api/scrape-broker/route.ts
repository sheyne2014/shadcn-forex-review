import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const content = await scrapeBrokerWebsite(url);

    return NextResponse.json({
      content,
      url
    });
  } catch (error) {
    console.error('Error scraping broker website:', error);
    return NextResponse.json({ error: 'Failed to scrape broker website' }, { status: 500 });
  }
}

async function scrapeBrokerWebsite(url: string): Promise<string> {
  try {
    // Using FireCrawl's scrape API to get website content
    const response = await fetch('https://firecrawl.dev/api/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        formats: ['markdown', 'html'],
        onlyMainContent: true
      })
    });
    
    const data = await response.json();
    
    if (data && data.markdown) {
      return data.markdown;
    } else if (data && data.html) {
      return data.html;
    }
    
    return '';
  } catch (error) {
    console.error('Error in scrapeBrokerWebsite:', error);
    return '';
  }
} 