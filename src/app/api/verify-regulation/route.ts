import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { brokerName, regulatorWebsite } = await request.json();

    if (!brokerName || !regulatorWebsite) {
      return NextResponse.json({ error: 'Broker name and regulator website are required' }, { status: 400 });
    }

    // Determine which regulatory authority we're checking
    // Different regulators have different search interfaces
    const regulatorInfo = getRegulatorInfo(regulatorWebsite);
    
    if (!regulatorInfo) {
      return NextResponse.json({ error: 'Unsupported regulator website' }, { status: 400 });
    }
    
    // Perform the regulation check using Playwright
    const verificationResult = await verifyRegulation(brokerName, regulatorInfo);
    
    return NextResponse.json(verificationResult);
  } catch (error) {
    console.error('Error verifying regulation:', error);
    return NextResponse.json({ error: 'Failed to verify regulation status' }, { status: 500 });
  }
}

// Helper to identify regulator information
function getRegulatorInfo(regulatorUrl: string): {
  name: string;
  url: string;
  searchUrl: string;
  searchFieldSelector: string;
  resultSelector: string;
} | null {
  const regulators = [
    {
      name: 'FCA (UK)',
      url: 'fca.org.uk',
      searchUrl: 'https://register.fca.org.uk/s/search?predefined=CONSUMER',
      searchFieldSelector: 'input[id*="search"]',
      resultSelector: '.search-results'
    },
    {
      name: 'CySEC (Cyprus)',
      url: 'cysec.gov.cy',
      searchUrl: 'https://www.cysec.gov.cy/en-GB/entities/investment-firms/cypriot/',
      searchFieldSelector: 'input[type="search"]',
      resultSelector: '.dataTables_wrapper'
    },
    {
      name: 'ASIC (Australia)',
      url: 'asic.gov.au',
      searchUrl: 'https://connectonline.asic.gov.au/',
      searchFieldSelector: 'input[name="searchText"]',
      resultSelector: '.search-results'
    }
  ];
  
  const regulator = regulators.find(r => regulatorUrl.includes(r.url));
  return regulator || null;
}

// Function to verify regulation using Playwright
async function verifyRegulation(brokerName: string, regulatorInfo: any): Promise<{
  verified: boolean;
  regulationDetails?: string;
  screenshot?: string;
}> {
  try {
    // Playwright would be used to navigate to the regulator website, search for the broker
    // and capture the results. In this API route, we'll mock the browser automation process.
    
    // In a real implementation, you would:
    // 1. Launch a browser with Playwright
    // 2. Go to the regulator's search page
    // 3. Enter the broker name in the search field
    // 4. Submit the search form
    // 5. Wait for results to load
    // 6. Extract regulation information
    // 7. Take a screenshot for evidence
    
    // Mock response for demonstration
    const mockVerificationResult = {
      verified: Math.random() > 0.3, // Randomly return true or false for demo purposes
      regulationDetails: Math.random() > 0.3 
        ? `${brokerName} is registered with ${regulatorInfo.name} with license number XXX-123456.`
        : `No record found for ${brokerName} on ${regulatorInfo.name}.`,
      screenshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="  // Sample base64 image data
    };
    
    return mockVerificationResult;
  } catch (error) {
    console.error('Error in automated regulation verification:', error);
    return {
      verified: false,
      regulationDetails: `Error verifying regulation status: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
} 