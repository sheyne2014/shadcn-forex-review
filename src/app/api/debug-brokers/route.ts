import { NextResponse } from "next/server";
import { getBrokers } from "@/lib/supabase/broker-client";

export async function GET() {
  try {
    console.log("Debug API: Fetching brokers data");
    
    // Try to fetch brokers with the same parameters as the page
    const { data: brokers = [], error: brokersError } = await getBrokers({
      limit: 100,
      sort_by: "rating",
      sort_order: "desc"
    });

    if (brokersError) {
      console.error("Debug API: Error fetching brokers:", brokersError);
      return NextResponse.json({
        success: false,
        error: brokersError,
        message: "Failed to fetch brokers data"
      }, { status: 500 });
    }

    // Ensure brokers is never null (use empty array as fallback)
    const brokersData = brokers || [];
    
    console.log(`Debug API: Fetched ${brokersData.length} brokers`);
    
    // Return basic data for diagnosis
    return NextResponse.json({
      success: true,
      count: brokersData.length,
      firstBroker: brokersData.length > 0 ? {
        id: brokersData[0].id,
        name: brokersData[0].name,
        supported_assets: brokersData[0].supported_assets,
        supportedAssetsType: typeof brokersData[0].supported_assets,
        isArray: Array.isArray(brokersData[0].supported_assets)
      } : null,
      // Add sample of brokers for each category
      categories: {
        forex: brokersData.filter(b => 
          Array.isArray(b.supported_assets) && 
          b.supported_assets.some((asset: string) => 
            asset.toLowerCase() === "forex"
          )
        ).length,
        crypto: brokersData.filter(b => 
          Array.isArray(b.supported_assets) && 
          b.supported_assets.some((asset: string) => 
            asset.toLowerCase() === "crypto"
          )
        ).length,
        stocks: brokersData.filter(b => 
          Array.isArray(b.supported_assets) && 
          b.supported_assets.some((asset: string) => 
            asset.toLowerCase() === "stocks"
          )
        ).length
      }
    });
  } catch (error) {
    console.error("Debug API: Unexpected error:", error);
    return NextResponse.json({
      success: false,
      error: String(error),
      message: "An unexpected error occurred"
    }, { status: 500 });
  }
} 