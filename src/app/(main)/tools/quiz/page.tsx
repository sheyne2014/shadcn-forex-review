import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrokerFinderQuiz } from "@/components/quiz/BrokerFinderQuiz";

export const metadata: Metadata = {
  title: "Broker Finder Quiz | Find Your Ideal Forex Broker",
  description: "Answer a few simple questions to get personalized forex broker recommendations tailored to your trading style, experience, and preferences.",
};

export default function BrokerQuizPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-10 md:py-16">
      <div className="mb-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Tools
        </Link>
      </div>
      
      <div className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Find Your Perfect Broker
        </h1>
        <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Not sure where to start? Our quiz helps you narrow down the options based on what matters most to you.
        </p>
      </div>

      <BrokerFinderQuiz />

      {/* Optional: Add a section to browse all brokers or comparison tool */}
      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">Alternatively, you can explore brokers yourself:</p>
        <div className="flex gap-4 justify-center">
          <Link href="/best-brokers" className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            View Top Rated Brokers
          </Link>
          <Link href="/tools/compare" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
            Compare Brokers Tool
          </Link>
        </div>
      </div>
    </div>
  );
} 