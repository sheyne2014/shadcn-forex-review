import { NextResponse } from "next/server";
import { db } from "@/lib/database";

export async function GET() {
  try {
    // Get all brokers from the database
    const brokers = await db.brokers.getAll();
    
    // Get categories for each broker to include in the response
    const brokersWithCategories = await Promise.all(
      brokers.map(async (broker) => {
        const categories = await db.brokerCategories.getCategoriesForBroker(broker.id);
        
        // Map categories to string arrays for supported_assets
        const supportedAssets = categories
          .filter(cat => 
            cat.name.toLowerCase().includes('forex') ||
            cat.name.toLowerCase().includes('stocks') ||
            cat.name.toLowerCase().includes('crypto') ||
            cat.name.toLowerCase().includes('options') ||
            cat.name.toLowerCase().includes('etf') ||
            cat.name.toLowerCase().includes('indices') ||
            cat.name.toLowerCase().includes('commodities') ||
            cat.name.toLowerCase().includes('bonds')
          )
          .map(cat => cat.name.replace(/^best\s+/i, '').replace(/\s+brokers$/i, ''));
        
        // Create a features object based on broker's attributes
        const features = {
          platforms: broker.trading_platforms || '',
          complexity: broker.rating ? 
            broker.rating >= 4.5 ? 'high' : 
            broker.rating >= 3.5 ? 'medium' : 'low' 
            : 'medium',
        };
        
        // Map regions based on country or regulation information
        const availableRegions = [];
        
        if (broker.country) {
          availableRegions.push(broker.country);
        }
        
        if (broker.regulations) {
          if (broker.regulations.toLowerCase().includes('fca')) availableRegions.push('UK', 'Europe');
          if (broker.regulations.toLowerCase().includes('asic')) availableRegions.push('Australia', 'Oceania');
          if (broker.regulations.toLowerCase().includes('cftc') || broker.regulations.toLowerCase().includes('nfa')) availableRegions.push('USA', 'North America');
          if (broker.regulations.toLowerCase().includes('fsca')) availableRegions.push('South Africa', 'Africa');
          if (broker.regulations.toLowerCase().includes('jfsa')) availableRegions.push('Japan', 'Asia');
          if (broker.regulations.toLowerCase().includes('mas')) availableRegions.push('Singapore', 'Asia');
          if (broker.regulations.toLowerCase().includes('dfsa')) availableRegions.push('UAE', 'Middle East');
        }
        
        return {
          ...broker,
          supported_assets: supportedAssets.length > 0 ? supportedAssets : ['forex'],
          features,
          available_regions: availableRegions.length > 0 ? availableRegions : ['Global'],
        };
      })
    );
    
    return NextResponse.json(brokersWithCategories);
  } catch (error) {
    console.error("Error fetching brokers:", error);
    return NextResponse.json(
      { error: "Failed to fetch brokers" },
      { status: 500 }
    );
  }
} 