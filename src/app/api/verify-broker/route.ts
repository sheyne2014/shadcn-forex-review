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

// Known trusted brokers
const TRUSTED_BROKERS = [
  'Interactive Brokers', 'Charles Schwab', 'Fidelity', 'TD Ameritrade', 'E*TRADE', 
  'Robinhood', 'Webull', 'eToro', 'Saxo Bank', 'DEGIRO', 'XTB', 'IG',
  'Plus500', 'CMC Markets', 'OANDA', 'Pepperstone', 'FxPro', 'FOREX.com'
];

// Known scam/untrusted brokers
const UNTRUSTED_BROKERS = [
  'FXLeader', 'Trade12', 'Starling Capital', 'OptionRally', 'Umarkets', 'StarTraderFX',
  'OliveFX', 'Trade99', 'CryptoEU', 'EuropeFX', 'Trade245', 'FXGlobe', 'Investous', 'Binatex',
  'BinaryTilt', 'TradeToro', 'Blue Trading', 'FTO Capital', 'GCG24', 'Brokerz', 'CFDStocks',
  'Capital Option', 'ZoomTrader', 'BinaryBook', 'OptionBit', 'OptionStarsGlobal', 'TradeSolid',
  'PrimeCFDs', 'XtraderFX', 'PWRtrade', 'Banc de Binary', 'BigOption'
];

// Regulatory authorities
const REGULATORY_AUTHORITIES = [
  'SEC', 'FCA', 'ASIC', 'CySEC', 'BaFin', 'FINRA', 'FSA', 'CFTC', 'NFA',
  'MAS', 'IIROC', 'ESMA', 'FSCA', 'JFSA', 'CNMV', 'CONSOB', 'DFSA'
];

async function verifyBroker(brokerName: string, includeWarningTerms: boolean = false): Promise<{
  isLegitimate: boolean;
  regulatoryStatus?: string;
  warningFlags: string[];
  regulatoryAuthorities?: string[];
  webResults?: any[];
  isTrustedBroker?: boolean;
  isKnownScam?: boolean;
  trustScore?: number; // 0-100 score
}> {
  try {
    // Check against known trusted/untrusted broker lists
    const isTrustedBroker = TRUSTED_BROKERS.some(broker => 
      brokerName.toLowerCase().includes(broker.toLowerCase()) ||
      broker.toLowerCase().includes(brokerName.toLowerCase())
    );
    
    const isKnownScam = UNTRUSTED_BROKERS.some(broker => 
      brokerName.toLowerCase().includes(broker.toLowerCase()) ||
      broker.toLowerCase().includes(brokerName.toLowerCase())
    );
    
    // Various search queries to gather comprehensive information
    const searchQueries = [
      `${brokerName} forex broker regulation license`,
      `${brokerName} broker review trustworthy`,
      `${brokerName} scam fraud warning blacklist`,
      `${brokerName} broker regulatory authority`,
      `is ${brokerName} a legitimate broker`
    ];
    
    // Gather results from multiple searches
    const allResults: any[] = [];
    const warningFlags: string[] = [];
    let regulatoryStatus: string | undefined;
    let foundRegulators: string[] = [];
    
    // Execute all searches in parallel
    const searchPromises = searchQueries.map(async (query) => {
      try {
        const response = await fetch('https://firecrawl.dev/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            limit: 5
          })
        });
        
        const data = await response.json();
        if (data && Array.isArray(data.results)) {
          allResults.push(...data.results);
        }
      } catch (error) {
        console.error(`Error searching for "${query}":`, error);
      }
    });
    
    // Wait for all searches to complete
    await Promise.all(searchPromises);
    
    // Process the results to extract valuable information
    const warningTerms = ['scam', 'fraud', 'warning', 'blacklist', 'avoid', 'unregulated', 'unlicensed', 'illegal'];
    const positiveTerms = ['regulated', 'licensed', 'authorized', 'legitimate', 'trustworthy', 'reliable'];
    
    let warningPoints = 0;
    let positivePoints = 0;
    
    // Remove duplicates from search results
    const uniqueResults = allResults.filter((result, index, self) => 
      index === self.findIndex((r) => r.url === result.url)
    );
    
    for (const result of uniqueResults) {
      const lowerTitle = result.title?.toLowerCase() || '';
      const lowerDesc = result.snippet?.toLowerCase() || '';
      const lowerContent = lowerTitle + ' ' + lowerDesc;
      
      // Check for warning terms
      for (const term of warningTerms) {
        if (lowerContent.includes(term) && 
            lowerContent.includes(brokerName.toLowerCase())) {
          warningPoints += 2;
          // Only add unique warning flags
          const warningText = `Warning: "${result.title}" - ${result.snippet?.substring(0, 100)}...`;
          if (!warningFlags.some(flag => flag === warningText)) {
            warningFlags.push(warningText);
          }
        }
      }
      
      // Check for positive indicators
      for (const term of positiveTerms) {
        if (lowerContent.includes(term) && 
            lowerContent.includes(brokerName.toLowerCase())) {
          positivePoints += 1;
          
          // Try to extract regulatory status if not already found
          if (!regulatoryStatus && (lowerContent.includes('regul') || lowerContent.includes('licens'))) {
            regulatoryStatus = `${result.title}: ${result.snippet?.substring(0, 150) || 'No details available'}`;
          }
        }
      }
      
      // Check for mentions of regulatory authorities
      for (const authority of REGULATORY_AUTHORITIES) {
        if (lowerContent.includes(authority.toLowerCase()) && 
            lowerContent.includes(brokerName.toLowerCase())) {
          if (!foundRegulators.includes(authority)) {
            foundRegulators.push(authority);
            positivePoints += 2;
          }
        }
      }
    }
    
    // Calculate final legitimacy
    let isLegitimate = false;
    let trustScore = 50; // Start at neutral
    
    // Known trusted broker gets a significant boost
    if (isTrustedBroker) {
      trustScore += 40;
      positivePoints += 5;
    }
    
    // Known scam broker gets a significant penalty
    if (isKnownScam) {
      trustScore -= 40;
      warningPoints += 5;
    }
    
    // Adjust score based on findings
    trustScore += (positivePoints * 3) - (warningPoints * 5);
    
    // Clamp trust score to 0-100 range
    trustScore = Math.max(0, Math.min(100, trustScore));
    
    // Determine final legitimacy
    isLegitimate = trustScore >= 60;
    
    return {
      isLegitimate,
      regulatoryStatus,
      warningFlags,
      regulatoryAuthorities: foundRegulators,
      webResults: uniqueResults.slice(0, 5), // Return top 5 results
      isTrustedBroker,
      isKnownScam,
      trustScore
    };
  } catch (error) {
    console.error('Error in verifyBroker:', error);
    return {
      isLegitimate: false,
      warningFlags: ['Error verifying broker information'],
      trustScore: 0
    };
  }
} 