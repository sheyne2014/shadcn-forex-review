import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts, BlogPost } from "@/lib/supabase/blog-client";
import { ClientImage } from "@/components/ClientImage";
import { formatDate } from "@/lib/utils";
import { isMDXContent } from "@/lib/mdx-blog-adapter";
import { KeyTakeaways } from "@/components/mdx/KeyTakeaways";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Default image to use when a blog post image is not found
const DEFAULT_BLOG_IMAGE = "/images/blog/default-blog.svg";

export const metadata = {
  title: "Trading Blog & Expert Guides 2025 | BrokerAnalysis",
  description: "Expert forex trading insights, market analysis, and in-depth guides to help you make informed trading decisions in 2025.",
};

// Interface for frontmatter in MDX files
interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  featured: boolean;
  image: string;
  readingTime: string;
  keywords: string;
  excerpt: string;
  tags: string[];
}

// Function to get all MDX blog posts from the filesystem
async function getFileBasedBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogDir = path.join(process.cwd(), 'src/app/blog');
    
    // Get all .mdx files
    const mdxFiles = fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.mdx'));
    
    // Parse each file and extract frontmatter
    const posts = mdxFiles.map(file => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const frontmatter = data as BlogPostFrontmatter;
      
      // Get slug from filename
      const slug = file.replace(/\.mdx$/, '');
      
      // Create a blog post object
      return {
        id: slug, // Use slug as ID
        title: frontmatter.title,
        content: content,
        slug: slug,
        excerpt: frontmatter.excerpt,
        published_at: frontmatter.date,
        author: frontmatter.author,
        image_url: frontmatter.image,
        reading_time: parseInt(frontmatter.readingTime?.replace(/\D/g, ''), 10) || 10,
        tags: frontmatter.tags,
        category: frontmatter.category,
        featured: frontmatter.featured
      } as BlogPost;
    });
    
    return posts;
  } catch (error) {
    console.error('Error reading blog posts from filesystem:', error);
    return [];
  }
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

// Helper function to extract and render KeyTakeaways properly
function parseKeyTakeaways(content: string): React.ReactNode {
  if (!content) return content;

  // Check if content contains KeyTakeaways
  const keyTakeawaysRegex = /<KeyTakeaways\s+points={\[([^}]+)\]}/;
  const match = content.match(keyTakeawaysRegex);

  if (!match) return content;

  try {
    // Extract the points from the KeyTakeaways component
    const pointsString = match[1].trim();
    // Clean up the string to make it valid JSON
    const cleanedPoints = pointsString.split(',')
      .map(point => point.trim().replace(/^"|"$/g, '').trim())
      .filter(point => point.length > 0);

    // Return the KeyTakeaways component with the extracted points
    return <KeyTakeaways points={cleanedPoints} />;
  } catch (error) {
    console.error('Error parsing KeyTakeaways:', error);
    return content;
  }
}

export default async function BlogPage() {
  // Get blog posts from database
  const { data: dbPosts } = await getAllBlogPosts();
  
  // Get blog posts from filesystem
  const filePosts = await getFileBasedBlogPosts();
  
  console.log('File-based blog posts found:', filePosts.map(p => p.slug));
  
  // Combine posts from both sources
  const allPosts = [...(dbPosts || []), ...filePosts];
  
  // Remove duplicates (if a post exists in both DB and filesystem)
  const uniquePosts = allPosts.filter((post, index, self) => 
    index === self.findIndex((p) => p.slug === post.slug)
  );

  // Sort by published_at date if available
  const sortedPosts = uniquePosts.sort((a, b) => {
    if (a.published_at && b.published_at) {
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    }
    return 0;
  });

  const featuredPost = sortedPosts[0];
  const regularPosts = sortedPosts.slice(1);

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Blog & Trading Guides 2025</h1>
        <p className="text-muted-foreground text-lg">
          Expert insights, market analysis, and trading guides to help you make informed decisions.
        </p>
      </div>

      <div className="flex items-center mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary"
        >
          All
        </Link>
      </div>

      {/* Direct link to our new blog post */}
      <div className="mb-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <h3 className="font-semibold text-lg">New Post!</h3>
        <p className="mb-2">Check out our comprehensive guide to regulated brokers in 2025:</p>
        <Link 
          href="/blog/regulated-brokers-guide-2025" 
          className="text-primary hover:underline font-medium"
        >
          Regulated Brokers Guide 2025: Ensuring Safe and Compliant Trading
        </Link>
      </div>

      <div className="mb-12 p-6 rounded-xl bg-muted/30 border">
        <div className="mb-4">
          <span className="inline-block mb-2 text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
            New
          </span>
          <h2 className="text-2xl font-bold">May 2025 Update</h2>
        </div>
        <p className="text-muted-foreground mb-0">
          We've updated all our broker reviews and comparisons with the latest information for May 2025. 
          Our expert analysis now includes new regulatory changes, updated fee structures, and the latest 
          trading technologies adopted by brokers in 2025.
        </p>
      </div>

      {featuredPost && (
        <div className="mb-16 p-6 rounded-xl bg-card shadow-sm border">
          <div>
            <h2 className="text-2xl font-bold mb-2">{featuredPost.title}</h2>
            <div className="prose dark:prose-invert max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed mb-4">
              {isMDXContent(featuredPost.excerpt || "") 
                ? parseKeyTakeaways(featuredPost.excerpt || "") 
                : <p>{featuredPost.excerpt}</p>}
            </div>
          </div>
          <Button asChild>
            <Link href={`/blog/${featuredPost.slug}`} className="mt-2">
              Read Full Article
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48">
              <ClientImage
                src={post.image_url || DEFAULT_BLOG_IMAGE}
                alt={post.title}
                className="object-cover w-full h-full"
                fallbackSrc={DEFAULT_BLOG_IMAGE}
              />
            </div>
            <CardHeader className="pt-5 pb-2">
              <Link href={`/blog/${post.slug}`} className="no-underline">
                <CardTitle className="text-xl hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="py-4 flex-grow">
              <div className="prose dark:prose-invert max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed mb-4 line-clamp-3">
                {isMDXContent(post.excerpt || "") 
                  ? parseKeyTakeaways(post.excerpt || "") 
                  : <p>{post.excerpt}</p>}
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {post.published_at ? formatDate(post.published_at) : ""}
              </span>
              <Link href={`/blog/${post.slug}`} className="text-primary hover:underline text-sm">
                <Button variant="ghost" size="sm">Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
} 