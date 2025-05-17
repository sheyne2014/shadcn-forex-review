import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Page Not Found | " + siteConfig.name,
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <>
      <StructuredData
        type="website"
        data={{
          name: "Page Not Found",
          description: "The page you're looking for doesn't exist or has been moved."
        }}
      />
      <div className="container flex flex-col items-center justify-center min-h-[80vh] text-center py-20">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
          <Search className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">404 - Page Not Found</h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. The page may have been moved or deleted.
        </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/brokers">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Browse Brokers
          </Link>
        </Button>
      </div>
    </div>
    </>
  );
}

