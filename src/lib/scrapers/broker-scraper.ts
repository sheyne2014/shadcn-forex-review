import { Database } from "../database-types";
import { createClient } from "@supabase/supabase-js";

type BrokerScraperResult = {
  name: string;
  logoUrl?: string;
  minDeposit?: number;
  tradingFee?: number;
  regulations?: string;
  supportedAssets?: string[];
  country?: string;
  rating?: number;
};

export async function scrapeBrokerInfo(brokerName: string): Promise<BrokerScraperResult | null> {
  try {
    // First attempt to search for the broker
    const searchResults = await fetchBrokerSearchResults(brokerName);
    
    if (!searchResults || searchResults.length === 0) {
      return null;
    }
    
    // Get the most relevant URL (first result)
    const url = searchResults[0];
    
    // Scrape the broker page
    const brokerData = await scrapeBrokerPage(url);
    
    return brokerData;
  } catch (error) {
    console.error("Error scraping broker info:", error);
    return null;
  }
}

async function fetchBrokerSearchResults(brokerName: string): Promise<string[]> {
  try {
    // Use firecrawl search to get broker websites
    const response = await fetch('/api/search-broker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `${brokerName} forex broker official site` })
    });
    
    const data = await response.json();
    return data.urls || [];
  } catch (error) {
    console.error("Error searching for broker:", error);
    return [];
  }
}

async function scrapeBrokerPage(url: string): Promise<BrokerScraperResult> {
  try {
    // Use firecrawl scrape to get broker details
    const response = await fetch('/api/scrape-broker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    const data = await response.json();
    
    // Parse the scraped data to extract broker information
    return parseBrokerData(data.content, url);
  } catch (error) {
    console.error("Error scraping broker page:", error);
    return { name: extractBrokerNameFromUrl(url) };
  }
}

function extractBrokerNameFromUrl(url: string): string {
  // Extract domain name without TLD as broker name
  try {
    const domain = new URL(url).hostname;
    const parts = domain.split('.');
    // Remove www. prefix if present
    if (parts[0] === 'www') {
      return parts[1];
    }
    return parts[0];
  } catch {
    return "Unknown Broker";
  }
}

function parseBrokerData(content: string, url: string): BrokerScraperResult {
  // Default result with broker name extracted from URL
  const result: BrokerScraperResult = {
    name: extractBrokerNameFromUrl(url)
  };
  
  // Extract logo URL (usually an image in the header)
  const logoMatch = content.match(/<img[^>]*(?:logo|brand)[^>]*src=["']([^"']+)["']/i);
  if (logoMatch) {
    result.logoUrl = new URL(logoMatch[1], url).toString();
  }
  
  // Try to extract minimum deposit
  const minDepositMatch = content.match(/(?:minimum|min)(?:\s+)deposit(?:[:\s]+)(?:\$|€|£)?([0-9,]+)/i);
  if (minDepositMatch) {
    result.minDeposit = parseFloat(minDepositMatch[1].replace(/,/g, ''));
  }
  
  // Try to extract trading fees
  const tradingFeeMatch = content.match(/(?:trading|spread)(?:\s+)fee(?:[:\s]+)(?:\$|€|£)?([0-9.,]+)/i);
  if (tradingFeeMatch) {
    result.tradingFee = parseFloat(tradingFeeMatch[1]);
  }
  
  // Try to extract regulations
  const regulationMatch = content.match(/(?:regulated|regulation|license)(?:[:\s]+)([A-Z]{3,}(?:(?:,|and|\s)+[A-Z]{3,})*)/i);
  if (regulationMatch) {
    result.regulations = regulationMatch[1];
  }
  
  // Try to extract supported assets
  const assetsMatch = content.match(/(?:supported|available)(?:\s+)(?:assets|markets|instruments)(?:[:\s]+)([^<.]+)/i);
  if (assetsMatch) {
    result.supportedAssets = assetsMatch[1]
      .split(/,|\sand\s/)
      .map(asset => asset.trim())
      .filter(asset => asset.length > 0);
  }
  
  return result;
}

export async function verifyBrokerLegitimacy(brokerName: string): Promise<{
  isLegitimate: boolean;
  regulatoryStatus?: string;
  warningFlags?: string[];
}> {
  try {
    // Search for the broker name + "scam" or "warning"
    const response = await fetch('/api/verify-broker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        brokerName,
        includeWarningTerms: true 
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying broker legitimacy:", error);
    return { 
      isLegitimate: false,
      warningFlags: ["Unable to verify - system error"]
    };
  }
} 