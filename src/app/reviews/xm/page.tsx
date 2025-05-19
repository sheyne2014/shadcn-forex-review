import { Metadata } from "next";
import BrokerDetailedReview from "@/components/brokers/BrokerDetailedReview";

export const metadata: Metadata = {
  title: "XM Review 2025 | Expert Analysis of Fees, Platforms & Trading Conditions",
  description: "Comprehensive XM review. Discover trading fees, available markets, platform features, research tools, and customer service quality. Updated for 2025.",
  keywords: ["XM review", "XM trading fees", "XM platforms", "forex broker review", "CFD trading", "MT4 broker", "MT5 broker", "low deposit broker"],
  openGraph: {
    title: "XM Review 2025 | Expert Analysis of Fees, Platforms & Trading Conditions",
    description: "Comprehensive XM review. Discover trading fees, available markets, platform features, research tools, and customer service quality. Updated for 2025.",
    url: "https://brokeranalysis.com/reviews/xm",
    type: "article",
  },
};

export default function XMReviewPage() {
  // XM review data
  const reviewData = {
    name: "XM",
    logo: "https://placehold.co/300x150/png?text=XM",
    description: "XM is a multi-regulated forex and CFD broker established in 2009. With low minimum deposits, numerous trading platforms, and extensive educational content, XM has positioned itself as an accessible broker for traders of all experience levels. The broker serves clients in over 190 countries and offers trading in forex, commodities, indices, stocks, and cryptocurrencies.",
    yearFounded: "2009",
    headquarters: "Limassol, Cyprus",
    regulation: ["CySEC", "ASIC", "IFSC"],
    overallRating: 4.7,
    url: "https://www.xm.com",
    
    scores: [
      { category: "Fees", score: 4.5, maxScore: 5 },
      { category: "Platforms & Tools", score: 4.7, maxScore: 5 },
      { category: "Research", score: 4.6, maxScore: 5 },
      { category: "Education", score: 4.9, maxScore: 5 },
      { category: "Customer Support", score: 4.8, maxScore: 5 },
      { category: "Deposit & Withdrawal", score: 4.7, maxScore: 5 },
    ],
    
    pros: [
      { text: "Very low minimum deposit ($5)" },
      { text: "Excellent educational resources for beginners" },
      { text: "Trading in microLots available" },
      { text: "No deposit fees" },
      { text: "Multi-language customer support" },
      { text: "Responsive mobile trading apps" },
    ],
    
    cons: [
      { text: "Higher spreads than some competitors" },
      { text: "US clients not accepted" },
      { text: "Limited range of instruments compared to larger brokers" },
      { text: "No proprietary trading platform" },
    ],
    
    featureRatings: [
      { name: "Pricing & Fees", rating: 4.5, description: "Good pricing structure but spreads not the tightest in the industry" },
      { name: "Trading Platforms", rating: 4.7, description: "Solid offering with MT4 and MT5 but no proprietary platform" },
      { name: "Mobile Trading", rating: 4.7, description: "Well-designed mobile apps with most desktop features" },
      { name: "Range of Markets", rating: 4.5, description: "Decent but not the most comprehensive selection" },
      { name: "Research Tools", rating: 4.6, description: "Quality research with regular market analysis" },
      { name: "Educational Resources", rating: 4.9, description: "Outstanding educational resources for all trader levels" },
      { name: "Customer Support", rating: 4.8, description: "Responsive 24/5 support in multiple languages" },
      { name: "Deposit & Withdrawal", rating: 4.7, description: "Fast and free for most methods" },
    ],
    
    fees: [
      { category: "Forex Spreads", value: "From 1.0 pips", notes: "Standard account; lower on other account types" },
      { category: "Stock CFD Fees", value: "From 0.1%", notes: "Commission per trade" },
      { category: "Commodity CFD Spreads", value: "From 1.0 points", notes: "Varies by instrument" },
      { category: "Index CFD Spreads", value: "From 1.0 points", notes: "Varies by index" },
      { category: "Crypto CFD Spreads", value: "From 2.0%", notes: "Higher spreads compared to other assets" },
    ],
    
    minDeposit: "$5",
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "Neteller", "Skrill", "UnionPay", "Local Payment Methods"],
    withdrawalMethods: ["Bank Transfer", "Credit/Debit Card", "Neteller", "Skrill", "UnionPay"],
    withdrawalFee: "$0 for most methods",
    inactivityFee: "$15/month after 90 days of inactivity",
    
    assetClasses: [
      { name: "Forex", isAvailable: true, details: "57 currency pairs" },
      { name: "Stocks CFDs", isAvailable: true, details: "Over 350 stocks from global markets" },
      { name: "Indices CFDs", isAvailable: true, details: "19 major global indices" },
      { name: "Commodity CFDs", isAvailable: true, details: "Gold, silver, oil, and natural gas" },
      { name: "Cryptocurrencies", isAvailable: true, details: "5 major cryptocurrencies" },
      { name: "Bonds", isAvailable: false, details: "Not available for trading" },
      { name: "ETFs", isAvailable: false, details: "Not available for trading" },
      { name: "Futures", isAvailable: false, details: "Not available for trading" },
      { name: "Options", isAvailable: false, details: "Not available for trading" },
    ],
    
    platforms: [
      { name: "MetaTrader 4", isAvailable: true, details: "Desktop, web, and mobile versions" },
      { name: "MetaTrader 5", isAvailable: true, details: "Desktop, web, and mobile versions" },
      { name: "WebTrader", isAvailable: true, details: "Browser-based trading" },
      { name: "Mobile Apps", isAvailable: true, details: "iOS and Android apps available" },
      { name: "XM Trading Terminal", isAvailable: true, details: "Enhanced proprietary platform integration" },
      { name: "API Trading", isAvailable: false, details: "Not available" },
      { name: "Proprietary Platform", isAvailable: false, details: "Not available" },
    ],
    
    tradingFeatures: [
      { name: "One-Click Trading", isAvailable: true, details: "Available on MT4/MT5" },
      { name: "Automated Trading", isAvailable: true, details: "Support for EAs on MT4/MT5" },
      { name: "Social Trading", isAvailable: false, details: "Not directly offered" },
      { name: "Copy Trading", isAvailable: false, details: "Not directly offered" },
      { name: "Demo Account", isAvailable: true, details: "Unlimited demo account access" },
      { name: "Negative Balance Protection", isAvailable: true, details: "Available for all retail clients" },
      { name: "Guaranteed Stop Loss", isAvailable: false, details: "Not available" },
      { name: "Trailing Stop", isAvailable: true, details: "Available on all platforms" },
    ],
    
    researchFeatures: [
      { name: "Trading Ideas", isAvailable: true, details: "Regular market analysis and trading ideas" },
      { name: "News Feed", isAvailable: true, details: "Real-time market news" },
      { name: "Economic Calendar", isAvailable: true, details: "Comprehensive economic events calendar" },
      { name: "Advanced Charts", isAvailable: true, details: "Multiple timeframes and technical indicators" },
      { name: "Market Analysis", isAvailable: true, details: "Daily and weekly market analysis" },
      { name: "Trade Calculator", isAvailable: true, details: "Risk management calculator" },
      { name: "Autochartist", isAvailable: false, details: "Not available" },
      { name: "Trading Central", isAvailable: true, details: "Technical analysis and signals" },
    ],
    
    educationResources: [
      { name: "Video Tutorials", isAvailable: true, details: "Extensive video library" },
      { name: "Webinars", isAvailable: true, details: "Regular live and recorded webinars" },
      { name: "Trading Guides", isAvailable: true, details: "Comprehensive trading guides" },
      { name: "Trading Glossary", isAvailable: true, details: "Detailed financial terminology" },
      { name: "Trading Courses", isAvailable: true, details: "Structured courses for all levels" },
      { name: "Trading Forum", isAvailable: false, details: "No community forum" },
      { name: "One-on-One Training", isAvailable: true, details: "Available for certain account types" },
      { name: "Demo Account", isAvailable: true, details: "Unlimited demo account access" },
    ],
    
    customerSupport: [
      { name: "Live Chat", isAvailable: true, details: "24/5 availability" },
      { name: "Email Support", isAvailable: true, details: "Typically responds within 24 hours" },
      { name: "Phone Support", isAvailable: true, details: "24/5 via multiple global numbers" },
      { name: "Multilingual Support", isAvailable: true, details: "Support in 30+ languages" },
      { name: "FAQ Section", isAvailable: true, details: "Comprehensive help center" },
      { name: "Video Guides", isAvailable: true, details: "Platform tutorials and guides" },
    ],
    
    accountOpening: "Usually same day, within hours",
    depositTime: "Instant for most methods, 1-3 days for bank transfers",
    withdrawalTime: "24-48 hours processing plus payment provider time",
  };

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <BrokerDetailedReview {...reviewData} />
    </div>
  );
} 