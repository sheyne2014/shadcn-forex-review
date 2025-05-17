import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrokerVerificationTool } from "@/components/verify/BrokerVerificationTool";

export const metadata: Metadata = {
  title: "Verify Broker Regulation | BrokerAnalysis",
  description: "Verify broker regulation status directly from official regulatory authorities using our automated verification tool.",
  openGraph: {
    title: "Verify Broker Regulation Status | BrokerAnalysis",
    description: "Check if a forex broker is properly regulated using our automated verification tool that checks official regulatory databases.",
    type: "website",
    url: "/verify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Broker Regulation Status | BrokerAnalysis",
    description: "Check if a forex broker is properly regulated using our automated verification tool.",
  },
  keywords: ["verify broker", "broker regulation", "regulation check", "forex broker verification", "regulatory status"],
};

export default function VerifyPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Verify Broker Regulation</h1>
          <p className="text-xl text-muted-foreground">
            Check if a broker is properly regulated by verifying their status directly from official regulatory databases.
          </p>
        </div>
      </div>
      
      <BrokerVerificationTool />
      
      <div className="mt-16 border-t pt-10">
        <h2 className="text-2xl font-bold mb-6">Why Verify Broker Regulation?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Protection Matters</h3>
            <p className="text-muted-foreground">
              Regulated brokers must adhere to strict financial standards, including capital requirements
              and client fund segregation. These measures protect your investments in case the broker 
              faces financial difficulties.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Avoid Scams</h3>
            <p className="text-muted-foreground">
              Many fraudulent brokers claim to be regulated when they are not. Our verification tool checks 
              directly with regulatory bodies like FCA, ASIC, CySEC, and others to confirm a broker's 
              regulatory status.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Dispute Resolution</h3>
            <p className="text-muted-foreground">
              Regulated brokers are subject to oversight and must provide fair dispute resolution processes.
              If issues arise, you'll have recourse through the regulatory authority.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Transparent Business Practices</h3>
            <p className="text-muted-foreground">
              Regulation requires brokers to maintain transparent business practices, fair pricing,
              and honest marketing. This creates a more level playing field for traders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 