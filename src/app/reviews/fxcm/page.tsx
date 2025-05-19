import { Metadata } from "next";
import BrokerDetailedReview from "@/components/brokers/BrokerDetailedReview";

export const metadata: Metadata = {
  title: "FXCM Review 2025 | Expert Analysis of Trading Platforms, Fees & Services",
  description: "Comprehensive FXCM review. Discover trading fees, available markets, platform features, research tools, and customer service quality. Updated for 2025.",
  keywords: ["FXCM review", "FXCM trading fees", "FXCM platforms", "forex broker review", "CFD trading", "Trading Station", "MT4 broker"],
  openGraph: {
    title: "FXCM Review 2025 | Expert Analysis of Trading Platforms, Fees & Services",
    description: "Comprehensive FXCM review. Discover trading fees, available markets, platform features, research tools, and customer service quality. Updated for 2025.",
    url: "https://brokeranalysis.com/reviews/fxcm",
    type: "article",
  },
};

export default function FXCMReviewPage() {
  // FXCM review data
  const reviewData = {
    name: "FXCM",
    logo: "https://placehold.co/300x150/png?text=FXCM",
    description: "FXCM (Forex Capital Markets) is a leading retail forex broker established in 1999. The broker offers forex and CFD trading through its proprietary Trading Station platform, as well as MetaTrader 4. Known for its competitive spreads, quality execution, and extensive research tools, FXCM provides traders with access to forex, indices, commodities, and cryptocurrency markets.",
    yearFounded: "1999",
    headquarters: "London, UK",
    regulation: ["FCA", "ASIC"],
    overallRating: 4.6,
    url: "https://www.fxcm.com",
    
    scores: [
      { category: "Fees", score: 4.5, maxScore: 5 },
      { category: "Platforms & Tools", score: 4.8, maxScore: 5 },
      { category: "Research", score: 4.7, maxScore: 5 },
      { category: "Education", score: 4.4, maxScore: 5 },
      { category: "Customer Support", score: 4.5, maxScore: 5 },
      { category: "Deposit & Withdrawal", score: 4.6, maxScore: 5 },
    ],
    
    pros: [
      { text: "Proprietary Trading Station platform with advanced features" },
      { text: "Low minimum deposit ($50)" },
      { text: "Quality market research and trading signals" },
      { text: "Active Trader program for high-volume clients" },
      { text: "Transparent pricing model" },
      { text: "Social and copy trading via ZuluTrade" },
    ],
    
    cons: [
      { text: "Higher spreads than some competitors" },
      { text: "US traders not accepted" },
      { text: "Limited range of tradable assets compared to some competitors" },
      { text: "No 24/7 customer support" },
    ],
    
    featureRatings: [
      { name: "Pricing & Fees", rating: 4.5, description: "Competitive pricing but not the lowest in the industry" },
      { name: "Trading Platforms", rating: 4.8, description: "Excellent proprietary platform plus MT4" },
      { name: "Mobile Trading", rating: 4.7, description: "Well-designed mobile apps with good functionality" },
      { name: "Range of Markets", rating: 4.4, description: "Good but less extensive than some competitors" },
      { name: "Research Tools", rating: 4.7, description: "High-quality research and trading tools" },
      { name: "Educational Resources", rating: 4.4, description: "Good but not as comprehensive as some brokers" },
      { name: "Customer Support", rating: 4.5, description: "Responsive but limited hours" },
      { name: "Deposit & Withdrawal", rating: 4.6, description: "Efficient with multiple payment methods" },
    ],
    
    fees: [
      { category: "Forex Spreads", value: "From 1.3 pips", notes: "Standard account; lower for Active Trader" },
      { category: "Stock CFD Fees", value: "From 0.08%", notes: "Per side" },
      { category: "Commodity CFD Spreads", value: "From 0.3 points", notes: "Varies by instrument" },
      { category: "Index CFD Spreads", value: "From 0.4 points", notes: "Varies by index" },
      { category: "Crypto CFD Spreads", value: "From 1.5%", notes: "Bitcoin and other major cryptocurrencies" },
    ],
    
    minDeposit: "$50",
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "Neteller", "Skrill", "UnionPay"],
    withdrawalMethods: ["Bank Transfer", "Credit/Debit Card", "Neteller", "Skrill"],
    withdrawalFee: "$0 for most methods",
    inactivityFee: "$50/year after 12 months of inactivity",
    
    assetClasses: [
      { name: "Forex", isAvailable: true, details: "39 currency pairs" },
      { name: "Stocks CFDs", isAvailable: true, details: "Major US and international stocks" },
      { name: "Indices CFDs", isAvailable: true, details: "8 major global indices" },
      { name: "Commodity CFDs", isAvailable: true, details: "Gold, silver, oil, and natural gas" },
      { name: "Cryptocurrencies", isAvailable: true, details: "Bitcoin, Ethereum, Litecoin, Ripple, and Bitcoin Cash" },
      { name: "Bonds", isAvailable: false, details: "Not available for trading" },
      { name: "ETFs", isAvailable: false, details: "Not available for trading" },
      { name: "Futures", isAvailable: false, details: "Not available for trading" },
      { name: "Options", isAvailable: false, details: "Not available for trading" },
    ],
    
    platforms: [
      { name: "Trading Station", isAvailable: true, details: "Proprietary platform with advanced features" },
      { name: "MetaTrader 4", isAvailable: true, details: "Desktop, web, and mobile versions" },
      { name: "ZuluTrade", isAvailable: true, details: "Social and copy trading platform" },
      { name: "WebTrader", isAvailable: true, details: "Browser-based version of Trading Station" },
      { name: "TradingView", isAvailable: true, details: "Integration with advanced charting platform" },
      { name: "Mobile Apps", isAvailable: true, details: "iOS and Android apps for all platforms" },
      { name: "API Trading", isAvailable: true, details: "FIX API available for algorithmic traders" },
    ],
    
    tradingFeatures: [
      { name: "One-Click Trading", isAvailable: true, details: "Available on all platforms" },
      { name: "Automated Trading", isAvailable: true, details: "Support for EAs on MT4 and custom strategies" },
      { name: "Social Trading", isAvailable: true, details: "Via ZuluTrade integration" },
      { name: "Copy Trading", isAvailable: true, details: "Via ZuluTrade" },
      { name: "Demo Account", isAvailable: true, details: "Unlimited demo account access" },
      { name: "Negative Balance Protection", isAvailable: true, details: "Available for retail clients" },
      { name: "Guaranteed Stop Loss", isAvailable: false, details: "Not available" },
      { name: "Trailing Stop", isAvailable: true, details: "Available on all platforms" },
    ],
    
    researchFeatures: [
      { name: "Trading Ideas", isAvailable: true, details: "Daily market analysis and trading ideas" },
      { name: "News Feed", isAvailable: true, details: "Real-time market news via partners" },
      { name: "Economic Calendar", isAvailable: true, details: "Comprehensive economic events calendar" },
      { name: "Advanced Charts", isAvailable: true, details: "Multiple timeframes and indicators" },
      { name: "Market Analysis", isAvailable: true, details: "Regular market updates and analysis" },
      { name: "Trade Calculator", isAvailable: true, details: "For position sizing and risk management" },
      { name: "Trading Signals", isAvailable: true, details: "Real-time signals and pattern recognition" },
      { name: "Trading Central", isAvailable: false, details: "Not available" },
    ],
    
    educationResources: [
      { name: "Video Tutorials", isAvailable: true, details: "Platform guides and trading tips" },
      { name: "Webinars", isAvailable: true, details: "Regular live and recorded webinars" },
      { name: "Trading Guides", isAvailable: true, details: "PDF guides and articles" },
      { name: "Trading Glossary", isAvailable: true, details: "Comprehensive trading terminology" },
      { name: "Trading Courses", isAvailable: true, details: "Multi-level educational courses" },
      { name: "Trading Forum", isAvailable: false, details: "No community forum" },
      { name: "One-on-One Training", isAvailable: false, details: "Not offered" },
      { name: "Demo Account", isAvailable: true, details: "Unlimited demo account access" },
    ],
    
    customerSupport: [
      { name: "Live Chat", isAvailable: true, details: "Available during market hours" },
      { name: "Email Support", isAvailable: true, details: "24-hour response time" },
      { name: "Phone Support", isAvailable: true, details: "Available during business hours" },
      { name: "Multilingual Support", isAvailable: true, details: "Support in 15+ languages" },
      { name: "FAQ Section", isAvailable: true, details: "Comprehensive help center" },
      { name: "Video Guides", isAvailable: true, details: "Platform tutorials and guides" },
    ],
    
    accountOpening: "Same day for most clients, typically 1-2 days",
    depositTime: "Instant for cards and e-wallets, 1-3 days for bank transfers",
    withdrawalTime: "24-48 hours processing plus payment provider time",
  };

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <BrokerDetailedReview {...reviewData} />
    </div>
  );
} 