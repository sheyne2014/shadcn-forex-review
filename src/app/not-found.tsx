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

export default function NotFoundPage() {
  return (
    <>
      <StructuredData
        type="website"
        data={{
          name: "Page Not Found",
          description: "The page you're looking for doesn't exist or has been moved."
        }}
      />
      <div className="container flex flex-col items-center justify-center min-h-[70vh] py-16 text-center">
        <div className="space-y-6 max-w-md mx-auto">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved,
            deleted, or never existed in the first place.
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/reviews">Browse Broker Reviews</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

