"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";

interface Post {
  title: string;
  slug: string;
  excerpt?: string;
  published_at?: string;
  image_url?: string;
  reading_time?: number;
}

interface RelatedPostsProps {
  posts: Post[];
  currentPostSlug: string;
}

export function RelatedPosts({ posts, currentPostSlug }: RelatedPostsProps) {
  // Filter out the current post and limit to 3 related posts
  const filteredPosts = posts
    .filter((post) => post.slug !== currentPostSlug)
    .slice(0, 3);

  if (filteredPosts.length === 0) {
    return null;
  }

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <RelatedPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

function RelatedPostCard({ post }: { post: Post }) {
  // Format date if available
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          {post.image_url ? (
            <OptimizedImage
              src={post.image_url}
              alt={post.title}
              width={400}
              height={240}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>
        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold line-clamp-2 text-lg mb-2">{post.title}</h3>
          {post.excerpt && (
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
              {post.excerpt}
            </p>
          )}
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex items-center text-xs text-muted-foreground">
          {formattedDate && <span className="mr-2">{formattedDate}</span>}
          {post.reading_time && (
            <>
              {formattedDate && <span className="mx-1">•</span>}
              <span>{post.reading_time} min read</span>
            </>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
} 