// Test utility to verify broker mapping is working correctly
export function testBrokerMapping() {
  const REAL_BROKER_DATA = {
    // Forex brokers
    forex: ["eToro", "XM", "IC Markets", "Pepperstone", "OANDA", "Interactive Brokers", "Plus500"],
    
    // Beginner-friendly brokers
    beginners: ["eToro", "Plus500", "Capital.com", "XM", "FXTM", "EasyMarkets"],
    
    // Low-cost brokers
    "low-cost": ["IC Markets", "Pepperstone", "XTB", "Interactive Brokers", "Saxo Bank"],
    
    // Mobile trading
    "mobile-trading": ["eToro", "Plus500", "Capital.com", "XM", "FXTM"],
    
    // Crypto brokers
    crypto: ["eToro", "Plus500", "Capital.com", "XTB", "Interactive Brokers"],
    
    // Stock brokers
    stocks: ["Interactive Brokers", "Saxo Bank", "XTB", "eToro", "Plus500"],
    
    // CFD brokers
    cfd: ["Plus500", "Capital.com", "XTB", "eToro", "IC Markets"],
    
    // Regional brokers
    uk: ["Interactive Brokers", "Saxo Bank", "XTB", "eToro", "Plus500"],
    us: ["Interactive Brokers", "XTB", "eToro", "Plus500", "Saxo Bank"],
    europe: ["Saxo Bank", "XTB", "eToro", "Plus500", "Interactive Brokers"],
    australia: ["Pepperstone", "IC Markets", "Axi", "Interactive Brokers", "Saxo Bank"],
    
    // Experience levels
    "day-trading": ["IC Markets", "Pepperstone", "XM", "FXTM", "Axi"],
    "swing-trading": ["eToro", "XM", "FXTM", "Interactive Brokers", "Saxo Bank"],
    professional: ["Interactive Brokers", "Saxo Bank", "IC Markets", "Pepperstone", "XTB"],
  };

  function getTopBrokersForCategory(categoryTitle: string): string[] {
    // Extract category key from title
    const categoryKey = categoryTitle.toLowerCase()
      .replace('best ', '')
      .replace(' brokers', '')
      .replace(' 2025', '')
      .replace('brokers for ', '')
      .replace('brokers in the ', '')
      .replace('brokers in ', '')
      .replace(' platforms', '')
      .replace(' trading', '')
      .replace(' accounts', '')
      .trim();

    console.log(`Testing category: "${categoryTitle}" -> key: "${categoryKey}"`);

    // Try direct mapping first
    if (REAL_BROKER_DATA[categoryKey as keyof typeof REAL_BROKER_DATA]) {
      const result = REAL_BROKER_DATA[categoryKey as keyof typeof REAL_BROKER_DATA].slice(0, 3);
      console.log(`Direct match found: ${result.join(', ')}`);
      return result;
    }

    // Try alternative mappings
    const alternativeKeys: { [key: string]: keyof typeof REAL_BROKER_DATA } = {
      'mobile trading platforms': 'mobile-trading',
      'low-cost': 'low-cost',
      'day traders': 'day-trading',
      'swing traders': 'swing-trading',
      'professionals': 'professional',
    };

    for (const [altKey, mappedKey] of Object.entries(alternativeKeys)) {
      if (categoryKey.includes(altKey) || altKey.includes(categoryKey)) {
        const result = REAL_BROKER_DATA[mappedKey].slice(0, 3);
        console.log(`Alternative match found (${altKey} -> ${mappedKey}): ${result.join(', ')}`);
        return result;
      }
    }

    // Final fallback: return top forex brokers
    const result = REAL_BROKER_DATA.forex.slice(0, 3);
    console.log(`Fallback to forex: ${result.join(', ')}`);
    return result;
  }

  // Test various category titles
  const testCategories = [
    "Best Forex Brokers 2025",
    "Best Brokers for Beginners 2025",
    "Best Low-Cost Brokers 2025",
    "Best Mobile Trading Platforms 2025",
    "Best Crypto Brokers 2025",
    "Best Stock Brokers 2025",
    "Best CFD Brokers 2025",
    "Best Brokers in the UK 2025",
    "Best Brokers in the US 2025",
    "Best Brokers for Day Traders 2025",
    "Best Brokers for Swing Traders 2025",
    "Best Brokers for Professionals 2025"
  ];

  console.log("=== Testing Broker Mapping ===");
  testCategories.forEach(category => {
    console.log(`\n--- ${category} ---`);
    getTopBrokersForCategory(category);
  });
  console.log("\n=== Test Complete ===");
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testBrokerMapping = testBrokerMapping;
}
