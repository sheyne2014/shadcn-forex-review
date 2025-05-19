import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Shield, Check, ExternalLink } from "lucide-react";
import { ScamBrokerCheckWidget } from "@/components/ScamBrokerCheckWidget";
import { siteConfig } from "@/config/site";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

export const metadata: Metadata = {
  title: `Scam Broker Check | Verify Broker Legitimacy | ${siteConfig.name}`,
  description: "Use our advanced tool to check if a forex or trading broker is potentially a scam or has been flagged for suspicious activities. Automatically searches the web and checks against known scam brokers. Protect your investments.",
};

export default function ScamCheckPage() {
  return (
    <div className="mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
      {/* Back Navigation */}
      <div className="mb-6 sm:mb-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Tools
        </Link>
      </div>

      {/* Main content */}
      <ScamBrokerCheckWidget />
      
      {/* Articles section with improved design */}
      <div className="mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
          <span className="relative">
            <span className="relative z-10">Helpful Resources</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-0"></span>
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* First article */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">How to choose a safe broker: a detailed guide</h3>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4">
                The most critical factor in choosing a safe broker is verifying their regulatory status and checking for particular warning signs.
              </p>
              <Link 
                href="/blog/how-to-choose-safe-broker" 
                className="inline-flex items-center text-sm text-primary font-medium hover:underline"
              >
                Learn more <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
          
          {/* Second article */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">Investor protection schemes around the world</h3>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4">
                Investor protection schemes, established by governments or industry organizations, aim to protect investors from potential broker failures or fraud.
              </p>
              <Link 
                href="/blog/investor-protection-schemes" 
                className="inline-flex items-center text-sm text-primary font-medium hover:underline"
              >
                Learn more <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
          
          {/* Third article */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">Forex trading scams - an expert guide to avoiding fraud</h3>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4">
                In forex trading scam? How to avoid falling victim to forex trading scams? Read this article to spot the red flags and protect yourself from fraud.
              </p>
              <Link 
                href="/blog/avoid-forex-scams" 
                className="inline-flex items-center text-sm text-primary font-medium hover:underline"
              >
                Learn more <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Known Scam Brokers Section with improved design */}
      <div className="mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
          <span className="relative">
            <span className="relative z-10">Known Scam Brokers</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-red-100 -z-0"></span>
          </span>
        </h2>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100">
          <div className="p-4 sm:p-6 bg-red-50 border-b border-red-100">
            <div className="flex items-start">
              <div className="mr-3 sm:mr-4 mt-1">
                <div className="bg-red-100 p-1.5 sm:p-2 rounded-full">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-red-800 mb-1">Warning: Forex, Stocks, Crypto, CFD, Options & Futures Scam Brokers</h3>
                <p className="text-xs sm:text-sm text-red-700 mb-0">
                  This list is updated regularly based on public warnings, regulatory blacklists, and user reports. 
                  If you see a broker here, avoid them and report any suspicious activity.
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-h-80 sm:max-h-96 overflow-y-auto p-3 sm:p-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-xs sm:text-sm">
              {[
                'FXLeader', 'Trade12', 'Starling Capital', 'OptionRally', 'Umarkets', 'StarTraderFX', 'Tradestation Global Scam',
                'OliveFX', 'Trade99', 'CryptoEU', 'EuropeFX', 'Trade245', 'FXGlobe', 'Investous', 'Binatex',
                'BinaryTilt', 'TradeToro', 'Blue Trading', 'FTO Capital', 'GCG24', 'Brokerz', 'CFDStocks',
                'Capital Option', 'ZoomTrader', 'BinaryBook', 'OptionBit', 'OptionStarsGlobal', 'TradeSolid',
                'PrimeCFDs', 'XtraderFX', 'PWRtrade', 'Banc de Binary', 'BigOption', 'OptionRally', 'BeeOptions',
                'RBOptions', 'BinaryOnline', 'BinaryMate', 'Option888', 'OptionFM', 'OptionKing', 'OptionRidge',
                'OptionStars', 'OptionWeb', 'TitanTrade', 'TR Binary Options', 'TropicalTrade', 'TRX Markets',
                'UFX', 'VantageFX (clone)', 'Wealth Recovery International', 'WMOption', 'ZoomTrader',
                'TradeStation Global (impostor site)', 'StarTrader (impostor site)', 'CryptoPoint', 'BitFXMarkets',
                'FXGTrade', 'FXGen', 'FXG Invest', 'FXG Markets', 'FXG Option', 'FXG Pro', 'FXG Trade',
                'FXG24', 'FXGTrade', 'FXGTrading', 'FXGTrader', 'FXGTraders', 'FXGTradingPro', 'FXGTradingProFX',
                'FXGTradingProFXG', 'FXGTradingProFXG24', 'FXGTradingProFXGTrader', 'FXGTradingProFXGTraders',
                'FXGTradingProFXGTrading', 'FXGTradingProFXGTradingPro', 'FXGTradingProFXGTradingProFX',
                'PocketOption', 'PocketOptionFX', 'FX Pockets', 'FXOption', 'CryptoTrader365', 'BinaryMaster',
                'ForexProfit', 'InvestXCV', 'CryptexBTCOption', 'CFD24Market', 'FXProOption', 'Finary',
                'GlobalTrade24', 'StoxMarket', 'Algo-Trading', 'AMarkets (clone)', 'BelforFX', 'CentoBot',
                'COINPRO', 'CryptoBO', 'CT-Trade', 'EUFXBANK', 'FiatVisions', 'FP Markets (scam clone)',
                'FTO Capital', 'Go4Rex', 'Gold Sonata', 'IG Markets Pro', 'LimpidMarkets', 'MTCore Limited',
                'N1CM', 'OCG', 'Ruizean Asset Management', 'SageTrade', 'Stoc-X', 'TitanFX', 'UBCFX', 'VirtualCrossFX'
              ].map((broker, idx) => (
                <li key={idx} className="flex items-center px-2 py-1.5 sm:px-3 sm:py-2 border border-red-100 rounded-md bg-white hover:bg-red-50 transition-colors">
                  <AlertTriangle className="h-3 w-3 text-red-500 mr-1.5 sm:mr-2 flex-shrink-0" />
                  <span className="text-gray-800 truncate">{broker}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-3 sm:p-4 bg-red-50 border-t border-red-100 text-center">
            <ScrollToTopButton />
          </div>
        </div>
      </div>
      
      {/* Is forex legal section with improved design */}
      <div className="mt-12 sm:mt-16 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
          <div className="p-4 sm:p-6 bg-blue-50 border-b border-blue-100">
            <div className="flex items-start">
              <div className="mr-3 sm:mr-4 mt-1">
                <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-blue-800 mb-1">Is forex legal? How to avoid forex scams?</h3>
                <p className="text-xs sm:text-sm text-blue-700 mb-0">
                  Forex trading is a legitimate form of investment. However, because it involves high risk and sometimes complex financial instruments, 
                  scammers often target forex traders to scam them by claiming unrealistic returns or using other deceptive practices.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="mb-4">
              <h4 className="font-semibold mb-2">How to identify legitimate brokers:</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-gray-700">
                <li>Check for proper regulation (SEC, FCA, ASIC, CySEC, etc.)</li>
                <li>Verify the broker's history and reputation</li>
                <li>Look for transparent fee structures</li>
                <li>Test their customer support</li>
                <li>Start with a small deposit to verify withdrawals work</li>
              </ul>
            </div>
            
            <div className="text-center">
              <Link 
                href="/blog/avoid-forex-scams" 
                className="inline-flex items-center text-sm text-primary font-medium hover:underline"
              >
                Read our complete guide to avoiding forex scams <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Important Disclaimer with improved design */}
      <div className="mb-12 sm:mb-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
          <div className="p-4 sm:p-6">
            <h3 className="font-bold text-amber-800 flex items-center text-base sm:text-lg">
              <Shield className="inline-block h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" /> Important Disclaimer
            </h3>
            <p className="text-xs sm:text-sm text-amber-700 mt-2">
              This tool provides information based on publicly available data and user reports. 
              While we strive for accuracy, we cannot guarantee the legitimacy of any broker. 
              Always conduct thorough due diligence and consult with financial advisors before investing. 
              This check is a helpful starting point, not a definitive judgment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 