import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { brokerName, includeWarningTerms } = await request.json();

    if (!brokerName) {
      return NextResponse.json({ error: 'Broker name is required' }, { status: 400 });
    }

    const verificationResults = await verifyBroker(brokerName, includeWarningTerms);

    return NextResponse.json(verificationResults);
  } catch (error) {
    console.error('Error verifying broker:', error);
    return NextResponse.json({ error: 'Failed to verify broker' }, { status: 500 });
  }
}

async function verifyBroker(brokerName: string, includeWarningTerms: boolean = false): Promise<{
  isLegitimate: boolean;
  regulatoryStatus?: string;
  warningFlags: string[];
}> {
  try {
    // Search query parameters
    const searchQuery = includeWarningTerms 
      ? `${brokerName} forex broker (scam OR fraud OR warning OR blacklist)`
      : `${brokerName} forex broker regulation license`;

    // Using FireCrawl search to find verification information
    const response = await fetch('https://firecrawl.dev/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: 10
      })
    });
    
    const data = await response.json();
    
    const warningFlags: string[] = [];
    let regulatoryStatus: string | undefined;
    let isLegitimate = true; // Default to assuming it's legitimate
    
    // Extract information from search results
    if (data && Array.isArray(data.results)) {
      // Check for warning flags in titles and descriptions
      const warningTerms = ['scam', 'fraud', 'warning', 'blacklist', 'avoid'];
      const regTerms = ['regulated', 'regulation', 'license', 'authorized'];
      
      for (const result of data.results) {
        // Check for warning flags
        const lowerTitle = result.title?.toLowerCase() || '';
        const lowerDesc = result.snippet?.toLowerCase() || '';
        
        for (const term of warningTerms) {
          if ((lowerTitle.includes(term) || lowerDesc.includes(term)) && 
              lowerTitle.includes(brokerName.toLowerCase())) {
            warningFlags.push(`Warning found: "${result.title}"`);
            isLegitimate = false;
          }
        }
        
        // Check for regulatory information
        for (const term of regTerms) {
          if ((lowerTitle.includes(term) || lowerDesc.includes(term)) && 
              lowerTitle.includes(brokerName.toLowerCase())) {
            regulatoryStatus = result.snippet || result.title;
            break;
          }
        }
      }
      
      // If no warning flags but we were looking for them, consider it more legitimate
      if (includeWarningTerms && warningFlags.length === 0) {
        isLegitimate = true;
      }
    }
    
    return {
      isLegitimate,
      regulatoryStatus,
      warningFlags
    };
  } catch (error) {
    console.error('Error in verifyBroker:', error);
    return {
      isLegitimate: false,
      warningFlags: ['Error verifying broker information']
    };
  }
} 