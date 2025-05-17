import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScamBrokerCheckWidget } from "@/components/ScamBrokerCheckWidget"; // Adjusted path based on initial listing

export const metadata: Metadata = {
  title: "Scam Broker Check | Verify Your Broker's Legitimacy",
  description: "Use our free tool to check if a forex broker is potentially a scam or has been flagged for suspicious activities. Protect your investments.",
};

export default function ScamCheckPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 md:py-16">
      <div className="mb-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Tools
        </Link>
      </div>

      <div className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Scam Broker Check
        </h1>
        <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Enter a broker's name or website to check against our database of known scams and warnings.
        </p>
      </div>

      <ScamBrokerCheckWidget />
      
      <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg text-amber-700">
        <h3 className="font-semibold mb-2">Important Disclaimer</h3>
        <p className="text-sm">
          This tool provides information based on publicly available data and user reports. 
          While we strive for accuracy, we cannot guarantee the legitimacy of any broker. 
          Always conduct thorough due diligence and consult with financial advisors before investing. 
          This check is a helpful starting point, not a definitive judgment.
        </p>
      </div>
    </div>
  );
} 