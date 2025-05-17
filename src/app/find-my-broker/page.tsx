import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrokerFinderQuiz } from "@/components/quiz/BrokerFinderQuiz";

export const metadata: Metadata = {
  title: "Find My Broker 2025 | BrokerAnalysis | May 2025 Update",
  description: "Answer a few questions to get personalized broker recommendations based on your trading style and preferences. Updated May 2025.",
  openGraph: {
    title: "Find My Broker 2025 | BrokerAnalysis | May 2025 Update",
    description: "Answer a few questions to get personalized broker recommendations based on your trading style and preferences. Updated May 2025.",
    type: "website",
    url: "/find-my-broker",
  },
  keywords: ["find my broker", "broker finder", "forex broker quiz", "broker recommendation tool", "trading quiz", "2025 brokers", "May 2025"],
};

export default function FindMyBrokerPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="max-w-3xl mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Find Your Perfect Broker</h1>
          <p className="text-xl text-muted-foreground">
            Answer a few questions to get personalized broker recommendations based on your trading style and preferences.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <BrokerFinderQuiz />
      </div>
    </div>
  );
} 