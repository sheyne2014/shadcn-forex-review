import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/supabase/blog-client";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  // Format the category name from the slug
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${categoryName} Articles | BrokerAnalysis Blog`,
    description: `Explore our ${categoryName.toLowerCase()} articles. Expert insights, guides, and analysis.`,
    openGraph: {
      title: `${categoryName} Articles | BrokerAnalysis Blog`,
      description: `Explore our ${categoryName.toLowerCase()} articles. Expert insights, guides, and analysis.`,
      type: "website",
      url: `/blog/category/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Articles | BrokerAnalysis Blog`,
      description: `Explore our ${categoryName.toLowerCase()} articles. Expert insights, guides, and analysis.`,
    },
  };
}

// Function to format date for display
function formatDate(dateString?: string) {
  if (!dateString) return "No date";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const slug = params.slug;

  // Format the category name from the slug
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // In a real implementation, you would:
  // 1. Get the category ID from the slug
  // 2. Use that ID to filter blog posts

  // For now, we'll just filter by matching the category slug with potential category_id values
  // or just use the slug as our filter criteria
  const { data: blogPosts = [], error } = await getBlogPosts({ 
    limit: 50,
    // If category_id matches slug format in your DB:
    // category_id: slug,
    // Or if you have a separate table with mapping, you'd look up the ID first
    // Otherwise, you might use search to find matching posts:
    search: categoryName
  });

  if (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/blog" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to All Categories
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row justify-between mb-10 items-start md:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{categoryName}</h1>
          <p className="text-muted-foreground mt-2">
            Articles and guides about {categoryName.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts && blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <Link href={post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`} key={post.id} className="group">
              <Card className="h-full hover:shadow-md transition-all">
                {post.image_url && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground space-x-2 mb-2">
                    <span>{formatDate(post.published_at)}</span>
                    {post.reading_time && (
                      <>
                        <span className="inline-block">•</span>
                        <span>{post.reading_time} min read</span>
                      </>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription>
                    {post.excerpt || (post.content ? post.content.substring(0, 120) + '...' : 'No excerpt available')}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1 w-full justify-between group-hover:text-primary transition-colors">
                    Read More <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              We couldn't find any articles in this category. Check back later or browse other categories.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 