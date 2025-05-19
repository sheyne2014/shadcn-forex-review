import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trading Community Forum | Discuss Forex, Stocks & Crypto",
  description: "Join our trading community forum to discuss forex, stocks, crypto, and more. Get advice from experienced traders and share your insights.",
};

export default function ForumPage() {
  return (
    <main className="container max-w-6xl py-12">
      <h1 className="text-4xl font-bold mb-6">Trading Community Forum</h1>
      
      <div className="bg-muted/50 p-8 rounded-lg text-center space-y-4">
        <h2 className="text-2xl font-medium">Our community forum is coming soon!</h2>
        <p className="text-muted-foreground">
          We're building a space for traders to connect, share insights, and learn from each other.
        </p>
        <p className="text-muted-foreground">
          Join our newsletter to be notified when the forum launches.
        </p>
        <Button asChild className="mt-4">
          <Link href="/contact">Get Notified</Link>
        </Button>
      </div>
    </main>
  );
} 