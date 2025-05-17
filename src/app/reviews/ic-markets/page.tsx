import { Metadata } from "next";
import BrokerDetailedReview from "@/components/brokers/BrokerDetailedReview";

export const metadata: Metadata = {
  title: "IC Markets Review 2025 | Expert Analysis of Fees, Platforms & More",
  description: "Comprehensive IC Markets review. Discover trading fees, available markets, platform features, research tools, and customer service quality. Updated for 2025.",
  keywords: ["IC Markets review", "IC Markets trading fees", "IC Markets platforms", "forex broker review", "CFD trading", "MT4 broker", "MT5 broker", "cTrader broker"],
  openGraph: {
    title: "IC Markets Review 2025 | Expert Analysis of Fees, Platforms & More",
    description: "Comprehensive IC Markets review. Discover trading fees, available markets, platform features, research tools, and customer service quality. Updated for 2025.",
    url: "https://brokeranalysis.com/reviews/ic-markets",
    type: "article",
  },
};

export default function ICMarketsReviewPage() {
  // IC Markets review data
  const reviewData = {
    name: "IC Markets",
    logo: "https://placehold.co/300x150/png?text=IC+Markets",
    description: "IC Markets is an Australian-based forex and CFD broker established in 2007. The broker offers traders access to multiple markets including forex, indices, commodities, cryptocurrencies, and more. Known for its tight spreads, fast execution, and wide range of trading platforms, IC Markets is particularly popular among algorithmic traders and those who value low-latency execution.",
    yearFounded: "2007",
    headquarters: "Sydney, Australia",
    regulation: ["ASIC", "CySEC", "FSA"],
    overallRating: 4.9,
    url: "https://www.icmarkets.com",
    
    scores: [
      { category: "Fees", score: 4.8, maxScore: 5 },
      { category: "Platforms & Tools", score: 4.9, maxScore: 5 },
      { category: "Research", score: 4.5, maxScore: 5 },
      { category: "Education", score: 4.2, maxScore: 5 },
      { category: "Customer Support", score: 4.7, maxScore: 5 },
      { category: "Deposit & Withdrawal", score: 4.8, maxScore: 5 },
    ],
    
    pros: [
      { text: "Ultra-low spreads starting from 0.0 pips" },
      { text: "Fast execution with minimal slippage" },
      { text: "Multiple platform options including MT4, MT5, and cTrader" },
      { text: "Wide range of tradable instruments" },
      { text: "Raw spread accounts with low commissions" },
      { text: "No dealing desk intervention" },
    ],
    
    cons: [
      { text: "Limited educational resources for beginners" },
      { text: "No proprietary trading platform" },
      { text: "Research content could be more comprehensive" },
      { text: "Phone support not available 24/7" },
    ],
    
    featureRatings: [
      { name: "Pricing & Fees", rating: 4.9, description: "Excellent pricing with low spreads and competitive commissions" },
      { name: "Trading Platforms", rating: 4.9, description: "Multiple high-quality platforms with advanced features" },
      { name: "Mobile Trading", rating: 4.8, description: "Excellent mobile apps via MT4, MT5, and cTrader" },
      { name: "Range of Markets", rating: 4.8, description: "Extensive selection of tradable instruments across multiple asset classes" },
      { name: "Research Tools", rating: 4.5, description: "Good research capabilities but could offer more in-depth analysis" },
      { name: "Educational Resources", rating: 4.2, description: "Decent but not extensive; better suited for experienced traders" },
      { name: "Customer Support", rating: 4.7, description: "Responsive and knowledgeable across multiple channels" },
      { name: "Deposit & Withdrawal", rating: 4.8, description: "Fast processing with multiple payment methods" },
    ],
    
    fees: [
      { category: "Forex Spreads", value: "From 0.0 pips", notes: "Plus $3.50 commission per side for Raw Spread accounts" },
      { category: "Stock CFD Fees", value: "From 0.10%", notes: "Commission per trade" },
      { category: "Commodity CFD Spreads", value: "From 0.3 points", notes: "Varies by instrument" },
      { category: "Index CFD Spreads", value: "From 0.4 points", notes: "Varies by index" },
      { category: "Crypto CFD Spreads", value: "From 0.5%", notes: "Higher spreads compared to traditional assets" },
    ],
    
    minDeposit: "$200",
    depositMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Neteller", "Skrill", "Bitcoin", "UnionPay"],
    withdrawalMethods: ["Bank Transfer", "Credit/Debit Card", "PayPal", "Neteller", "Skrill", "Bitcoin"],
    withdrawalFee: "$0 for most methods",
    inactivityFee: "$12/month after 12 months of inactivity",
    
    assetClasses: [
      { name: "Forex", isAvailable: true, details: "Over 65 currency pairs" },
      { name: "Stocks CFDs", isAvailable: true, details: "Over 120 global stocks" },
      { name: "Indices CFDs", isAvailable: true, details: "19 major global indices" },
      { name: "Commodity CFDs", isAvailable: true, details: "Oil, gold, silver, and other metals" },
      { name: "Cryptocurrencies", isAvailable: true, details: "Bitcoin, Ethereum, and other major cryptocurrencies" },
      { name: "Bonds", isAvailable: true, details: "Government and corporate bonds" },
      { name: "ETFs", isAvailable: false, details: "Not available for trading" },
      { name: "Futures", isAvailable: false, details: "Not available for trading" },
      { name: "Options", isAvailable: false, details: "Not available for trading" },
    ],
    
    platforms: [
      { name: "MetaTrader 4", isAvailable: true, details: "Full-featured desktop, web, and mobile versions" },
      { name: "MetaTrader 5", isAvailable: true, details: "Latest version with advanced features and improved charts" },
      { name: "cTrader", isAvailable: true, details: "Advanced platform with level 2 pricing and enhanced execution" },
      { name: "WebTrader", isAvailable: true, details: "Browser-based trading without downloads" },
      { name: "Mobile Apps", isAvailable: true, details: "iOS and Android apps for all platforms" },
      { name: "API Trading", isAvailable: true, details: "FIX API available for algorithmic traders" },
    ],
    
    tradingFeatures: [
      { name: "One-Click Trading", isAvailable: true, details: "Fast execution with a single click" },
      { name: "Automated Trading", isAvailable: true, details: "Support for EAs and algos on MT4/MT5/cTrader" },
      { name: "Social Trading", isAvailable: true, details: "Via Myfxbook and ZuluTrade integration" },
      { name: "Copy Trading", isAvailable: true, details: "Available through cTrader Copy" },
      { name: "Demo Account", isAvailable: true, details: "Unlimited demo account access" },
      { name: "Negative Balance Protection", isAvailable: true, details: "Available for retail clients" },
      { name: "Guaranteed Stop Loss", isAvailable: false, details: "Not available" },
      { name: "Trailing Stop", isAvailable: true, details: "Available on all platforms" },
    ],
    
    researchFeatures: [
      { name: "Trading Ideas", isAvailable: true, details: "Regular market analysis and trading ideas" },
      { name: "News Feed", isAvailable: true, details: "Real-time news via platforms" },
      { name: "Economic Calendar", isAvailable: true, details: "Comprehensive economic events calendar" },
      { name: "Advanced Charts", isAvailable: true, details: "Multiple timeframes and indicators" },
      { name: "Market Analysis", isAvailable: true, details: "Daily and weekly market analysis" },
      { name: "Trade Calculator", isAvailable: true, details: "For position sizing and risk management" },
      { name: "Autochartist", isAvailable: true, details: "Pattern recognition tools available" },
      { name: "Trading Central", isAvailable: false, details: "Not available" },
    ],
    
    educationResources: [
      { name: "Video Tutorials", isAvailable: true, details: "Platform guides and trading tips" },
      { name: "Webinars", isAvailable: true, details: "Regular webinars on various trading topics" },
      { name: "Trading Guides", isAvailable: true, details: "PDF guides and articles" },
      { name: "Trading Glossary", isAvailable: true, details: "Comprehensive trading terminology" },
      { name: "Trading Courses", isAvailable: false, details: "No structured courses available" },
      { name: "Trading Forum", isAvailable: false, details: "No community forum" },
      { name: "One-on-One Training", isAvailable: false, details: "Not offered directly by the broker" },
      { name: "Demo Account", isAvailable: true, details: "Unlimited demo account access" },
    ],
    
    customerSupport: [
      { name: "Live Chat", isAvailable: true, details: "24/5 availability" },
      { name: "Email Support", isAvailable: true, details: "Typical response within 24 hours" },
      { name: "Phone Support", isAvailable: true, details: "Available during business hours" },
      { name: "Multilingual Support", isAvailable: true, details: "Support in 15+ languages" },
      { name: "FAQ Section", isAvailable: true, details: "Comprehensive help center" },
      { name: "Video Guides", isAvailable: true, details: "Platform tutorials and guides" },
    ],
    
    accountOpening: "Same day for most clients, may take 1-2 days in some cases",
    depositTime: "Instant for cards and e-wallets, 1-3 days for bank transfers",
    withdrawalTime: "24 hours processing plus payment provider time (1-5 business days)",
  };

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <BrokerDetailedReview {...reviewData} />
    </div>
  );
} 