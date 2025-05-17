import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBlogPosts, getBlogCategories, BlogPost, BlogCategory } from "@/lib/supabase/blog-client";
import { ClientImage } from "@/components/ClientImage";

// Default image to use when a blog post image is not found
const DEFAULT_BLOG_IMAGE = "/images/blog/default-blog.svg";

export const metadata: Metadata = {
  title: "Trading Blog & Expert Guides 2025 | BrokerAnalysis | May 2025 Update",
  description: "Expert trading guides, market analysis, and broker reviews for forex, stocks, crypto, commodities, CFDs, options, futures, and more. Updated May 2025.",
  openGraph: {
    title: "Trading Blog & Expert Guides 2025 | BrokerAnalysis | May 2025 Update",
    description: "Expert trading guides, market analysis, and broker reviews for forex, stocks, crypto, commodities, CFDs, options, futures, and more. Updated May 2025.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trading Blog & Expert Guides 2025 | BrokerAnalysis | May 2025 Update",
    description: "Expert trading guides, market analysis, and broker reviews for forex, stocks, crypto, commodities, CFDs, options, futures, and more. Updated May 2025.",
  },
  keywords: ["trading blog", "forex", "stocks", "crypto", "commodities", "CFDs", "options", "futures", "broker reviews", "market analysis", "trading strategies", "May 2025 update"],
  alternates: {
    canonical: "/blog",
  },
};

// Format date for display
function formatDate(dateString?: string) {
  if (!dateString) return "No date";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Function to extract tags from blog post
function getPostTags(post: BlogPost): string[] {
  if (!post.tags) return [];
  
  // If tags is a string, try to parse it as JSON
  if (typeof post.tags === 'string') {
    try {
      return JSON.parse(post.tags);
    } catch (e) {
      return [];
    }
  }
  
  // If tags is already an array, return it
  return Array.isArray(post.tags) ? post.tags : [];
}

export default async function BlogPage() {
  const { data: posts } = await getBlogPosts({ limit: 20 });
  const { data: categories } = await getBlogCategories();

  const popularTags = [
    { name: "Forex", slug: "forex" },
    { name: "Stocks", slug: "stocks" },
    { name: "Crypto", slug: "crypto" },
    { name: "Commodities", slug: "commodities" },
    { name: "CFDs", slug: "cfds" },
    { name: "Options", slug: "options" },
    { name: "Futures", slug: "futures" },
    { name: "Brokers", slug: "brokers" },
    { name: "Strategies", slug: "strategies" },
    { name: "Beginners", slug: "beginners" },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog & Trading Guides 2025</h1>
        <p className="text-xl text-muted-foreground">
          Expert insights, market analysis, and trading guides to help you make informed decisions.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        <Link href="/blog" className="no-underline">
          <Badge variant="outline" className="px-4 py-2 text-base hover:bg-primary hover:text-white cursor-pointer">
            All
          </Badge>
        </Link>
        {categories?.map((category: BlogCategory) => (
          <Link key={category.id} href={`/blog/category/${category.slug}`} className="no-underline">
            <Badge variant="outline" className="px-4 py-2 text-base hover:bg-primary hover:text-white cursor-pointer">
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>
      
      {/* May 2025 Update Notice */}
      <div className="mb-10 p-4 border border-primary/20 bg-primary/5 rounded-lg">
        <div className="flex items-center gap-3">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">New</Badge>
          <h2 className="text-xl font-semibold">May 2025 Update</h2>
        </div>
        <p className="mt-2">
          We've updated all our broker reviews and comparisons with the latest information for May 2025. 
          Our expert analysis now includes new regulatory changes, updated fee structures, 
          and the latest trading technologies adopted by brokers in 2025.
        </p>
      </div>

      {/* Featured Post */}
      {posts && posts.length > 0 && (
        <div className="mb-10">
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="relative h-[300px] md:h-full">
                <ClientImage
                  src={posts[0].image_url || DEFAULT_BLOG_IMAGE}
                  alt={posts[0].title}
                  className="object-cover w-full h-full"
                  fallbackSrc={DEFAULT_BLOG_IMAGE}
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <CardTitle className="text-2xl mb-4">{posts[0].title}</CardTitle>
                  <CardDescription className="text-base mb-4">
                    {posts[0].excerpt || posts[0].content?.substring(0, 150) + "..."}
                  </CardDescription>
                </div>
                <div className="mt-4">
                  <Link href={`/blog/${posts[0].slug}`} className="no-underline">
                    <Button className="w-full md:w-auto">
                      Read Full Article
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Blog Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.slice(1).map((post: BlogPost) => (
          <Card key={post.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48">
              <ClientImage
                src={post.image_url || DEFAULT_BLOG_IMAGE}
                alt={post.title}
                className="object-cover w-full h-full"
                fallbackSrc={DEFAULT_BLOG_IMAGE}
              />
            </div>
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-bold mb-2 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary no-underline text-foreground">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4 flex-grow">
              <p className="text-muted-foreground text-sm line-clamp-3">
                {post.excerpt || post.content?.substring(0, 100) + "..."}
              </p>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'No date'}
              </div>
              <Link href={`/blog/${post.slug}`} className="no-underline">
                <Button variant="outline" size="sm">
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 