import { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Forex Broker Analysis",
  description: "Find answers to common questions about forex brokers, trading platforms, regulations, and how to choose the best broker for your trading needs.",
  keywords: "forex FAQ, broker questions, forex trading questions, best forex brokers, trading account questions",
};

export default function FAQPage() {
  // Define FAQ categories and questions
  const generalFAQs = [
    {
      question: "How do you verify broker information?",
      answer: "We use a combination of manual verification by our team, official regulatory databases, and AI-powered web scraping to ensure all information is accurate and up-to-date. We also regularly review and update broker details as they change."
    },
    {
      question: "Is the scam broker check tool reliable?",
      answer: "Our scam broker check tool uses advanced web intelligence to scan for warning signs and red flags across reliable sources. While highly accurate, we always recommend conducting additional research before investing with any broker."
    },
    {
      question: "How often is the market news updated?",
      answer: "Our market news section is updated throughout each trading day with the latest developments in forex, crypto, stocks, and commodities markets from reliable financial sources."
    },
    {
      question: "Can I leave a review for a broker?",
      answer: "Yes! Registered users can leave detailed reviews for any broker in our database. We verify reviews to ensure they're from genuine traders and maintain high-quality standards."
    },
    {
      question: "How do you rank brokers?",
      answer: "Brokers are ranked based on a combination of factors including user ratings, regulatory status, trading conditions, customer service quality, platform features, and our expert analysis."
    }
  ];

  const tradingFAQs = [
    {
      question: "What is the minimum deposit required to start forex trading?",
      answer: "The minimum deposit varies greatly between brokers, ranging from as low as $5 to $1,000 or more. Many reputable brokers offer accounts starting at $100-$200. We always recommend starting with an amount you're comfortable with and can afford to lose while learning."
    },
    {
      question: "What is the difference between ECN, STP, and Market Maker brokers?",
      answer: "ECN (Electronic Communication Network) brokers connect traders directly to liquidity providers with transparent pricing and no dealing desk intervention. STP (Straight Through Processing) brokers route orders to liquidity providers but may have more control over execution. Market Maker brokers act as the counterparty to your trades, potentially creating conflicts of interest but often offering tighter spreads on major pairs."
    },
    {
      question: "What trading platforms do most brokers offer?",
      answer: "MetaTrader 4 (MT4) and MetaTrader 5 (MT5) remain the most popular platforms offered by brokers. Many brokers also offer their own proprietary platforms, as well as cTrader, TradingView integration, and web/mobile trading solutions. The right platform depends on your trading style, analysis needs, and technical requirements."
    },
    {
      question: "What is leverage and how does it work?",
      answer: "Leverage allows traders to control larger positions with a relatively small amount of capital. For example, with 100:1 leverage, you can control a $100,000 position with just $1,000. While leverage can amplify profits, it also magnifies losses and should be used cautiously. Maximum available leverage varies by broker and jurisdiction due to regulatory restrictions."
    },
    {
      question: "How do I calculate the pip value in forex trading?",
      answer: "For most currency pairs, a pip is the fourth decimal place (0.0001). For pairs with JPY, a pip is the second decimal place (0.01). To calculate the pip value, multiply the position size by the pip amount. For a standard lot (100,000 units) of EUR/USD, one pip equals $10. You can use our pip value calculator in the Tools section for precise calculations."
    }
  ];

  const regulationFAQs = [
    {
      question: "Why is broker regulation important?",
      answer: "Regulation provides a layer of security for traders by ensuring brokers follow strict financial standards, segregate client funds, maintain sufficient capital, and operate with transparency. Regulated brokers are less likely to engage in fraudulent activities and provide more reliable services."
    },
    {
      question: "Which regulatory authorities are most respected?",
      answer: "Some of the most respected regulatory authorities include the UK's Financial Conduct Authority (FCA), the Australian Securities and Investments Commission (ASIC), the Cyprus Securities and Exchange Commission (CySEC), and the U.S. Commodity Futures Trading Commission (CFTC). Each has different rules regarding leverage, bonuses, and trader protections."
    },
    {
      question: "Can I trust offshore regulated brokers?",
      answer: "Offshore regulation (from places like Seychelles, Vanuatu, or St. Vincent and the Grenadines) generally provides less trader protection than tier-1 jurisdictions. While not all offshore brokers are problematic, they often face less regulatory scrutiny. We recommend choosing brokers with regulation from at least one major financial authority."
    },
    {
      question: "What is negative balance protection?",
      answer: "Negative balance protection ensures that traders cannot lose more than the amount deposited in their trading account. This protection is particularly important during extreme market volatility or flash crashes when positions might be closed beyond a trader's stop-loss levels."
    },
    {
      question: "Do all brokers offer deposit insurance?",
      answer: "No. Deposit insurance varies by regulatory jurisdiction. For example, UK-regulated brokers typically offer protection through the Financial Services Compensation Scheme (FSCS) up to £85,000. Always check what insurance or protection is offered by a broker before depositing funds."
    }
  ];

  const accountFAQs = [
    {
      question: "What types of trading accounts do brokers typically offer?",
      answer: "Most brokers offer several account types, including: Standard accounts with wider spreads but no commissions; ECN/Raw spread accounts with tighter spreads but additional commissions; Professional accounts with better conditions for high-volume traders; Islamic/Swap-free accounts that comply with Sharia law; and Demo accounts for practice trading without risking real money."
    },
    {
      question: "How do I withdraw funds from my trading account?",
      answer: "Withdrawal processes vary by broker, but typically involve logging into your account, navigating to the withdrawal section, selecting your preferred payment method, and entering the amount. Withdrawals usually process within 1-5 business days, with e-wallets being fastest. Most brokers require verification before your first withdrawal."
    },
    {
      question: "What is a demo account and should I use one?",
      answer: "A demo account allows you to practice trading with virtual money in real market conditions. We strongly recommend all traders, especially beginners, use a demo account before trading with real money. This helps you understand the platform, test strategies, and get comfortable with trading mechanics without financial risk."
    },
    {
      question: "What documents are required for account verification?",
      answer: "Most brokers require proof of identity (passport, driver's license, or ID card), proof of address (utility bill or bank statement less than 3-6 months old), and sometimes additional verification for certain payment methods. This verification process, known as KYC (Know Your Customer), is a regulatory requirement to prevent fraud and money laundering."
    },
    {
      question: "Can I have multiple accounts with different brokers?",
      answer: "Yes, many traders maintain accounts with several brokers to take advantage of different strengths, spreads, or platform offerings. This also provides redundancy in case of technical issues with one broker. However, managing multiple accounts requires more attention and organization."
    }
  ];

  const tradingCostsFAQs = [
    {
      question: "What are spreads and how do they affect my trading?",
      answer: "The spread is the difference between the bid (sell) and ask (buy) price of a currency pair. It represents a primary cost of trading and is usually measured in pips. Tighter spreads reduce your trading costs, especially for short-term traders and scalpers who make many trades."
    },
    {
      question: "What is swap/overnight fee and how is it calculated?",
      answer: "Swap or overnight fees are charged when positions are held open overnight. They reflect the interest rate differential between the two currencies in the pair. Depending on interest rates and position direction (buy/sell), swaps can be either positive (you receive) or negative (you pay). Swap rates vary by broker and are typically higher on Wednesday to account for the weekend."
    },
    {
      question: "Do all brokers charge commissions?",
      answer: "No, not all brokers charge commissions. Market Maker brokers typically offer commission-free trading but have wider spreads. ECN/STP brokers often offer tighter raw spreads but charge commissions per lot traded. The total trading cost combines both spread and commission."
    },
    {
      question: "Are there any hidden fees I should watch out for?",
      answer: "Potential hidden fees may include: inactivity fees for dormant accounts; deposit/withdrawal fees depending on payment method; currency conversion fees when depositing in a different currency than your account; and additional charges for premium services. Always read the broker's fee schedule carefully."
    },
    {
      question: "What is slippage and how can it affect my trades?",
      answer: "Slippage occurs when an order executes at a different price than requested, usually during high volatility or market gaps. Positive slippage benefits the trader, while negative slippage increases costs. Quality of execution and broker technology significantly impact slippage levels."
    }
  ];

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about forex brokers, trading accounts, and more
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">About Broker Analysis</h2>
          <FAQAccordion items={generalFAQs} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Trading Basics</h2>
          <FAQAccordion items={tradingFAQs} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Broker Regulation</h2>
          <FAQAccordion items={regulationFAQs} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Trading Accounts</h2>
          <FAQAccordion items={accountFAQs} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Trading Costs</h2>
          <FAQAccordion items={tradingCostsFAQs} />
        </section>
      </div>

      <div className="mt-12 pt-8 border-t text-center">
        <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
        <p className="text-muted-foreground mb-6">
          If you couldn't find the answer you were looking for, feel free to contact our support team.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
} 