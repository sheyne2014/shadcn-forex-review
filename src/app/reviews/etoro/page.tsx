import { Metadata } from "next";
import BrokerDetailedReview from "@/components/brokers/BrokerDetailedReview";

export const metadata: Metadata = {
  title: "eToro Review 2025 | Expert Analysis of Social Trading Platform & Fees",
  description: "Comprehensive eToro review. Discover trading fees, available markets, platform features, copy trading, and customer service quality. Updated for 2025.",
  keywords: ["eToro review", "eToro trading fees", "eToro platforms", "social trading", "copy trading", "forex broker review", "CFD trading", "cryptocurrency trading"],
  openGraph: {
    title: "eToro Review 2025 | Expert Analysis of Social Trading Platform & Fees",
    description: "Comprehensive eToro review. Discover trading fees, available markets, platform features, copy trading, and customer service quality. Updated for 2025.",
    url: "https://brokeranalysis.com/reviews/etoro",
    type: "article",
  },
};

export default function EToroReviewPage() {
  // eToro review data
  const reviewData = {
    name: "eToro",
    logo: "https://placehold.co/300x150/png?text=eToro",
    description: "eToro is a multi-asset investment platform established in 2007. It pioneered social trading, allowing users to copy successful traders automatically. Beyond forex and CFDs, eToro offers direct stock investing, cryptocurrency trading, and portfolio management solutions. The platform combines trading tools with social networking features, making it especially appealing to beginners and social-minded investors.",
    yearFounded: "2007",
    headquarters: "Limassol, Cyprus",
    regulation: ["FCA", "CySEC", "ASIC"],
    overallRating: 4.5,
    url: "https://www.etoro.com",
    
    scores: [
      { category: "Fees", score: 4.2, maxScore: 5 },
      { category: "Platforms & Tools", score: 4.6, maxScore: 5 },
      { category: "Research", score: 4.3, maxScore: 5 },
      { category: "Education", score: 4.7, maxScore: 5 },
      { category: "Customer Support", score: 4.3, maxScore: 5 },
      { category: "Deposit & Withdrawal", score: 4.4, maxScore: 5 },
    ],
    
    pros: [
      { text: "Industry-leading social and copy trading features" },
      { text: "User-friendly platform ideal for beginners" },
      { text: "Commission-free stock trading" },
      { text: "Wide range of assets including stocks, crypto, and forex" },
      { text: "Innovative CopyPortfolios for thematic investing" },
      { text: "Active trading community and social features" },
    ],
    
    cons: [
      { text: "Higher forex and CFD spreads compared to competitors" },
      { text: "Withdrawal and inactivity fees" },
      { text: "Limited technical analysis tools for advanced traders" },
      { text: "Non-USD deposits incur conversion fees" },
      { text: "Limited customization options for the platform" },
    ],
    
    featureRatings: [
      { name: "Pricing & Fees", rating: 4.2, description: "Reasonable overall pricing but higher forex spreads" },
      { name: "Trading Platform", rating: 4.6, description: "Intuitive proprietary platform with social features" },
      { name: "Mobile Trading", rating: 4.7, description: "Excellent mobile app with all key features" },
      { name: "Range of Markets", rating: 4.8, description: "Impressive selection across multiple asset classes" },
      { name: "Research Tools", rating: 4.3, description: "Good fundamental analysis but limited technicals" },
      { name: "Educational Resources", rating: 4.7, description: "Extensive learning materials for beginners" },
      { name: "Copy Trading", rating: 4.9, description: "Industry-leading copy trading functionality" },
      { name: "Customer Support", rating: 4.3, description: "Good but can be slow during peak times" },
    ],
    
    fees: [
      { category: "Forex Spreads", value: "From 1.0 pips", notes: "Higher than some specialized forex brokers" },
      { category: "Stock CFD Fees", value: "0.2% per side", notes: "Minimum $5" },
      { category: "Stock Trading", value: "0% commission", notes: "No commission for real stock trading" },
      { category: "Crypto Fees", value: "1.0% per trade", notes: "Plus spread" },
      { category: "Index CFD Spreads", value: "From 0.75 points", notes: "Varies by index" },
      { category: "Commodity CFD Spreads", value: "From 2.0 points", notes: "Varies by instrument" },
    ],
    
    minDeposit: "$50",
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Neteller", "Skrill", "Rapid Transfer", "iDEAL"],
    withdrawalMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Neteller", "Skrill"],
    withdrawalFee: "$5 per withdrawal",
    inactivityFee: "$10/month after 12 months of inactivity",
    
    assetClasses: [
      { name: "Forex", isAvailable: true, details: "49 currency pairs" },
      { name: "Stocks", isAvailable: true, details: "Over 2,000 global stocks with direct ownership" },
      { name: "Stocks CFDs", isAvailable: true, details: "Available for leveraged trading" },
      { name: "Indices CFDs", isAvailable: true, details: "17 major global indices" },
      { name: "Commodity CFDs", isAvailable: true, details: "Gold, silver, oil, and other commodities" },
      { name: "Cryptocurrencies", isAvailable: true, details: "Over 120 cryptocurrencies with direct ownership" },
      { name: "ETFs", isAvailable: true, details: "Over 250 ETFs available" },
      { name: "CopyPortfolios", isAvailable: true, details: "Thematic investment strategies" },
      { name: "Futures", isAvailable: false, details: "Not available for trading" },
      { name: "Options", isAvailable: false, details: "Not available for trading" },
    ],
    
    platforms: [
      { name: "eToro Platform", isAvailable: true, details: "Proprietary web-based platform" },
      { name: "eToro Mobile App", isAvailable: true, details: "iOS and Android apps with full functionality" },
      { name: "MetaTrader 4", isAvailable: false, details: "Not available" },
      { name: "MetaTrader 5", isAvailable: false, details: "Not available" },
      { name: "Copy Trading", isAvailable: true, details: "Integrated into main platform" },
      { name: "API Trading", isAvailable: false, details: "Not available for retail clients" },
    ],
    
    tradingFeatures: [
      { name: "One-Click Trading", isAvailable: true, details: "Available on all platforms" },
      { name: "Copy Trading", isAvailable: true, details: "Core platform feature" },
      { name: "Social Trading", isAvailable: true, details: "News feed, comments, and social interactions" },
      { name: "Automated Trading", isAvailable: false, details: "Not supported except via copy trading" },
      { name: "Demo Account", isAvailable: true, details: "$100,000 virtual portfolio" },
      { name: "Negative Balance Protection", isAvailable: true, details: "Available for all retail clients" },
      { name: "Guaranteed Stop Loss", isAvailable: true, details: "Available with additional fee" },
      { name: "Trailing Stop", isAvailable: true, details: "Available on all instruments" },
    ],
    
    researchFeatures: [
      { name: "Trading Ideas", isAvailable: true, details: "Community-generated and analyst ideas" },
      { name: "News Feed", isAvailable: true, details: "Integrated social and market news" },
      { name: "Economic Calendar", isAvailable: true, details: "Basic economic events calendar" },
      { name: "Advanced Charts", isAvailable: true, details: "ProCharts with technical indicators" },
      { name: "Market Analysis", isAvailable: true, details: "Daily market updates and analysis" },
      { name: "Sentiment Indicator", isAvailable: true, details: "Shows percentage of users buying/selling" },
      { name: "Research Reports", isAvailable: true, details: "Market analysis and reports" },
      { name: "Risk Management Tools", isAvailable: true, details: "Portfolio analysis and risk scoring" },
    ],
    
    educationResources: [
      { name: "Video Tutorials", isAvailable: true, details: "Comprehensive video library" },
      { name: "Webinars", isAvailable: true, details: "Regular live and recorded webinars" },
      { name: "Trading Guides", isAvailable: true, details: "Educational articles and guides" },
      { name: "Trading Courses", isAvailable: true, details: "Structured courses for beginners to advanced" },
      { name: "Trading Academy", isAvailable: true, details: "Comprehensive learning center" },
      { name: "Trading Glossary", isAvailable: true, details: "Financial terminology dictionary" },
      { name: "Trading Forum", isAvailable: true, details: "Community discussions via social feed" },
      { name: "Demo Account", isAvailable: true, details: "$100,000 virtual portfolio" },
    ],
    
    customerSupport: [
      { name: "Live Chat", isAvailable: true, details: "Available during market hours" },
      { name: "Email Support", isAvailable: true, details: "Response typically within 24 hours" },
      { name: "Phone Support", isAvailable: true, details: "Limited availability" },
      { name: "Multilingual Support", isAvailable: true, details: "Support in 20+ languages" },
      { name: "FAQ Section", isAvailable: true, details: "Extensive help center" },
      { name: "Video Guides", isAvailable: true, details: "Platform tutorials and guides" },
      { name: "Community Support", isAvailable: true, details: "Community forums and discussions" },
    ],
    
    accountOpening: "Same day for most clients, KYC verification required",
    depositTime: "Instant for most methods, 1-3 days for bank transfers",
    withdrawalTime: "1-3 business days processing plus payment provider time",
  };

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <BrokerDetailedReview {...reviewData} />
    </div>
  );
} 