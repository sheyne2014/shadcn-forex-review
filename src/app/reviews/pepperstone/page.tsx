import { Metadata } from "next";
import BrokerDetailedReview from "@/components/brokers/BrokerDetailedReview";

export const metadata: Metadata = {
  title: "Pepperstone Review 2025 | Expert Analysis of Fees, Platforms & More",
  description: "Comprehensive Pepperstone review. Discover trading fees, available markets, platform features, research tools, and customer service quality. Updated for 2025.",
  keywords: ["Pepperstone review", "Pepperstone trading fees", "Pepperstone platforms", "forex broker review", "CFD trading", "MT4 broker", "MT5 broker", "cTrader broker"],
  openGraph: {
    title: "Pepperstone Review 2025 | Expert Analysis of Fees, Platforms & More",
    description: "Comprehensive Pepperstone review. Discover trading fees, available markets, platform features, research tools, and customer service quality. Updated for 2025.",
    url: "https://brokeranalysis.com/reviews/pepperstone",
    type: "article",
  },
};

export default function PepperstoneReviewPage() {
  // Pepperstone review data
  const reviewData = {
    name: "Pepperstone",
    logo: "https://placehold.co/300x150/png?text=Pepperstone",
    description: "Pepperstone is an Australian-based forex and CFD broker founded in 2010. Known for its award-winning customer service, fast execution speeds, and competitive pricing, Pepperstone has become a popular choice among both beginning and experienced traders. The broker offers a wide range of markets including forex, indices, commodities, and cryptocurrencies.",
    yearFounded: "2010",
    headquarters: "Melbourne, Australia",
    regulation: ["FCA", "ASIC", "CySEC", "DFSA", "SCB"],
    overallRating: 4.8,
    url: "https://www.pepperstone.com",
    
    scores: [
      { category: "Fees", score: 4.7, maxScore: 5 },
      { category: "Platforms & Tools", score: 4.9, maxScore: 5 },
      { category: "Research", score: 4.6, maxScore: 5 },
      { category: "Education", score: 4.5, maxScore: 5 },
      { category: "Customer Support", score: 4.9, maxScore: 5 },
      { category: "Deposit & Withdrawal", score: 4.7, maxScore: 5 },
    ],
    
    pros: [
      { text: "Excellent execution speed with minimal slippage" },
      { text: "Multiple platform options including MT4, MT5, and cTrader" },
      { text: "Competitive spreads starting from 0.0 pips" },
      { text: "Award-winning customer service" },
      { text: "No minimum deposit requirement (Standard account)" },
      { text: "Transparent fee structure" },
    ],
    
    cons: [
      { text: "Higher minimum deposit for Razor accounts ($200)" },
      { text: "Limited product range compared to some competitors" },
      { text: "No proprietary trading platform" },
      { text: "US clients not accepted" },
    ],
    
    featureRatings: [
      { name: "Pricing & Fees", rating: 4.7, description: "Very competitive pricing with low spreads and reasonable commissions" },
      { name: "Trading Platforms", rating: 4.9, description: "Excellent platform selection with MT4, MT5, and cTrader" },
      { name: "Mobile Trading", rating: 4.8, description: "High-quality mobile trading via platform apps" },
      { name: "Range of Markets", rating: 4.6, description: "Good selection of markets but not the most extensive" },
      { name: "Research Tools", rating: 4.6, description: "Quality research with TradingCentral and AutoChartist" },
      { name: "Educational Resources", rating: 4.5, description: "Comprehensive educational materials for all levels" },
      { name: "Customer Support", rating: 4.9, description: "Award-winning, responsive support across multiple channels" },
      { name: "Deposit & Withdrawal", rating: 4.7, description: "Fast processing with multiple payment methods" },
    ],
    
    fees: [
      { category: "Forex Spreads", value: "From 0.0 pips", notes: "Plus $3.50 commission per side for Razor accounts" },
      { category: "Stock CFD Fees", value: "From 0.02% (min. $10)", notes: "Commission per trade" },
      { category: "Commodity CFD Spreads", value: "From 0.3 points", notes: "Varies by instrument" },
      { category: "Index CFD Spreads", value: "From 0.5 points", notes: "Varies by index" },
      { category: "Crypto CFD Spreads", value: "From 1.0%", notes: "Higher spreads compared to traditional assets" },
    ],
    
    minDeposit: "$200 (Razor Account) / $0 (Standard Account)",
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Neteller", "Skrill", "POLi"],
    withdrawalMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Neteller", "Skrill"],
    withdrawalFee: "$0 for most methods",
    inactivityFee: "$10/month after 12 months of inactivity",
    
    assetClasses: [
      { name: "Forex", isAvailable: true, details: "60+ currency pairs" },
      { name: "Stocks CFDs", isAvailable: true, details: "Over 1,000 global stocks" },
      { name: "Indices CFDs", isAvailable: true, details: "21 major global indices" },
      { name: "Commodity CFDs", isAvailable: true, details: "Gold, silver, oil, and other commodities" },
      { name: "Cryptocurrencies", isAvailable: true, details: "Bitcoin, Ethereum, and other major cryptocurrencies" },
      { name: "Bonds", isAvailable: false, details: "Not available for trading" },
      { name: "ETFs", isAvailable: false, details: "Not available for trading" },
      { name: "Futures", isAvailable: false, details: "Not available for trading" },
      { name: "Options", isAvailable: false, details: "Not available for trading" },
    ],
    
    platforms: [
      { name: "MetaTrader 4", isAvailable: true, details: "Full-featured desktop, web, and mobile versions" },
      { name: "MetaTrader 5", isAvailable: true, details: "Advanced platform with additional features and timeframes" },
      { name: "cTrader", isAvailable: true, details: "Advanced platform with depth of market and cAlgo" },
      { name: "TradingView", isAvailable: true, details: "Integration with advanced charting platform" },
      { name: "WebTrader", isAvailable: true, details: "Browser-based trading for MT4/MT5" },
      { name: "Mobile Apps", isAvailable: true, details: "iOS and Android apps for all platforms" },
      { name: "API Trading", isAvailable: true, details: "FIX API available for institutional clients" },
    ],
    
    tradingFeatures: [
      { name: "One-Click Trading", isAvailable: true, details: "Fast execution with a single click" },
      { name: "Automated Trading", isAvailable: true, details: "Support for EAs, cBots and algos" },
      { name: "Social Trading", isAvailable: true, details: "Via third-party integrations" },
      { name: "Copy Trading", isAvailable: true, details: "DupliTrade and other solutions available" },
      { name: "Demo Account", isAvailable: true, details: "Unlimited demo account access" },
      { name: "Negative Balance Protection", isAvailable: true, details: "Available for all retail clients" },
      { name: "Guaranteed Stop Loss", isAvailable: true, details: "Available with additional fee" },
      { name: "Trailing Stop", isAvailable: true, details: "Available on all platforms" },
    ],
    
    researchFeatures: [
      { name: "Trading Ideas", isAvailable: true, details: "Daily market analysis and trading ideas" },
      { name: "News Feed", isAvailable: true, details: "Real-time market news" },
      { name: "Economic Calendar", isAvailable: true, details: "Comprehensive economic events calendar" },
      { name: "Advanced Charts", isAvailable: true, details: "Multiple timeframes and 50+ indicators" },
      { name: "Market Analysis", isAvailable: true, details: "Regular market updates and analysis" },
      { name: "Trade Calculator", isAvailable: true, details: "For risk and position sizing" },
      { name: "Autochartist", isAvailable: true, details: "Pattern recognition tools" },
      { name: "Trading Central", isAvailable: true, details: "Technical analysis and trading signals" },
    ],
    
    educationResources: [
      { name: "Video Tutorials", isAvailable: true, details: "Comprehensive video library" },
      { name: "Webinars", isAvailable: true, details: "Regular live and recorded webinars" },
      { name: "Trading Guides", isAvailable: true, details: "Detailed guides on various trading topics" },
      { name: "Trading Glossary", isAvailable: true, details: "Comprehensive trading terminology" },
      { name: "Trading Courses", isAvailable: true, details: "Structured courses for different levels" },
      { name: "Trading Forum", isAvailable: false, details: "No community forum" },
      { name: "One-on-One Training", isAvailable: true, details: "Available for certain account types" },
      { name: "Demo Account", isAvailable: true, details: "Unlimited demo account access" },
    ],
    
    customerSupport: [
      { name: "Live Chat", isAvailable: true, details: "24/5 availability" },
      { name: "Email Support", isAvailable: true, details: "Typically responds within hours" },
      { name: "Phone Support", isAvailable: true, details: "24/5 via global offices" },
      { name: "Multilingual Support", isAvailable: true, details: "Support in 30+ languages" },
      { name: "FAQ Section", isAvailable: true, details: "Comprehensive help center" },
      { name: "Video Guides", isAvailable: true, details: "Platform tutorials and guides" },
    ],
    
    accountOpening: "Same day for most clients, typically within hours",
    depositTime: "Instant for cards and e-wallets, 1-2 days for bank transfers",
    withdrawalTime: "Same-day processing plus payment provider time (1-3 business days)",
  };

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <BrokerDetailedReview {...reviewData} />
    </div>
  );
} 