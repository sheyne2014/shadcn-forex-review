import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SimpleTestPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/blog" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Setting Effective Forex Trading Goals in 2025: A Static Test Page
          </h1>
          <div className="flex items-center text-sm text-muted-foreground space-x-2 mb-4">
            <span>May 17, 2025</span>
            <span className="inline-block">•</span>
            <span>16 min read</span>
          </div>
          <p className="text-xl text-muted-foreground">
            This is a simple test page to debug the issue with the dynamic route parameter: {params.slug}
          </p>
        </header>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2>Test Content</h2>
          <p>
            This is a static test page to isolate any issues with the dynamic routing in Next.js.
          </p>
        </div>
      </article>
    </div>
  );
} 