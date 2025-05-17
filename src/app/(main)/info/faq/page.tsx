import { Metadata } from "next";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Find answers to common questions about forex trading, choosing brokers, and using our platform.",
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground">
          Get answers to common questions about trading and choosing the right broker. If you can\\'t find your answer here, feel free to contact us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl mx-auto">
        <FAQAccordion
          items={[
            {
              question: "What should I look for in a broker?",
              answer:
                "When choosing a broker, consider regulatory compliance, trading fees, available markets, platform usability, customer support, and educational resources.",
            },
            {
              question: "How do I know if a broker is safe?",
              answer:
                "Look for regulation from respected authorities like FCA, ASIC, CySEC, or SEC. Also check for segregated client funds and investor protection schemes.",
            },
            {
              question: "What are the typical fees involved in forex trading?",
              answer: "Common fees include spreads (the difference between bid and ask prices), commissions per trade, overnight financing (swap rates), and potentially inactivity or withdrawal fees. Always check a broker\\'s fee schedule."
            }
          ]}
        />

        <FAQAccordion
          items={[
            {
              question: "What\\'s the difference between ECN and Market Maker brokers?",
              answer:
                "ECN brokers connect traders directly to liquidity providers, offering transparent pricing. Market Makers take the opposite side of trades, potentially leading to conflicts of interest but sometimes simpler fee structures.",
            },
            {
              question: "How much money do I need to start trading?",
              answer:
                "This varies greatly by broker. Some brokers offer accounts with no minimum deposit or very low amounts (e.g., $10-$100), while others may require $500, $1,000, or more.",
            },
            {
              question: "Can I trade forex on my mobile device?",
              answer: "Yes, most modern forex brokers offer mobile trading apps for iOS and Android devices, allowing you to manage trades, view charts, and access your account on the go."
            }
          ]}
        />
      </div>
      
      {/* Optional: Add a section for further help or contact */}
      {/* 
      <div className="text-center mt-16">
        <p className="text-lg text-muted-foreground mb-4">Still have questions?</p>
        <Button asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
      */}
    </div>
  );
} 