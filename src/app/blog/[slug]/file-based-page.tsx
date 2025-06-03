import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import { Context7Provider } from "@/components/Context7Provider";
import { OptimizedImage } from "@/components/OptimizedImage";
import { renderBlogContent } from "@/lib/mdx-blog-adapter";
import { HTMLContent } from "@/components/HTMLContent";
import matter from 'gray-matter';

type Props = {
  params: {
    slug: string;
  };
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

interface FileBasedBlogPost {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  published_at?: string;
  author?: string;
  image_url?: string;
  reading_time?: number;
  tags?: string[] | string;
  description?: string;
  keywords?: string;
}

// Function to get blog post from filesystem
async function getFileBasedBlogPost(slug: string): Promise<FileBasedBlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), 'src/app/blog', `${slug}.mdx`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter and content
    const { data, content } = matter(fileContent);
    const frontmatter = data as BlogPostFrontmatter;
    
    // Create a blog post object
    return {
      title: frontmatter.title,
      content: content,
      slug: slug,
      excerpt: frontmatter.excerpt,
      published_at: frontmatter.date,
      author: frontmatter.author,
      image_url: frontmatter.image,
      reading_time: parseInt(frontmatter.readingTime.replace(/\D/g, ''), 10),
      tags: frontmatter.tags,
      description: frontmatter.description,
      keywords: frontmatter.keywords
    };
  } catch (error) {
    console.error('Error reading blog post file:', error);
    return null;
  }
}

// Define metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug);
  const post = await getFileBasedBlogPost(slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found."
    };
  }

  return {
    title: post.title,
    description: post.description || post.excerpt || post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt || post.content.substring(0, 160),
      type: "article",
      publishedTime: post.published_at,
      images: post.image_url ? [{ url: post.image_url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.excerpt || post.content.substring(0, 160),
      images: post.image_url ? [post.image_url] : undefined,
    },
  };
}

export default async function FileBasedBlogPostPage({ params }: Props) {
  const slug = await Promise.resolve(params.slug);
  const post = await getFileBasedBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  // Format date if available
  const formattedDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  // Create Context7 configuration for SEO
  const context7Config = {
    title: post.title,
    description: post.description || post.excerpt || post.content.substring(0, 160) || "",
    keywords: post.tags ? (typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags) : [],
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt || post.content.substring(0, 160),
      images: post.image_url ? [{ url: post.image_url }] : undefined,
      type: "article",
    },
  };

  // Render blog content or fallback to direct HTML rendering
  const renderedContent = () => {
    try {
      // Add an id to match the BlogPost interface
      const postWithId = {
        ...post,
        id: post.slug // Use slug as ID
      };
      return renderBlogContent(postWithId);
    } catch (error) {
      console.error('Error rendering blog content with MDX adapter:', error);
      // Fallback to direct HTML rendering
      return <HTMLContent content={post.content || ''} />;
    }
  };

  return (
    <Context7Provider config={context7Config}>
      <div className="container max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/blog" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-8 not-prose">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            
            {(formattedDate || post.reading_time) && (
              <div className="flex items-center text-sm text-muted-foreground space-x-2 mb-4">
                {formattedDate && <span>{formattedDate}</span>}
                {formattedDate && post.reading_time && <span className="inline-block">•</span>}
                {post.reading_time && <span>{post.reading_time} min read</span>}
              </div>
            )}
            
            {post.excerpt && (
              <p className="text-xl text-muted-foreground">
                {post.excerpt}
              </p>
            )}
            
            {post.image_url && (
              <div className="mt-6 mb-8 overflow-hidden rounded-xl">
                <OptimizedImage
                  src={post.image_url}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="w-full object-cover"
                  priority
                />
              </div>
            )}
          </header>
          
          <div className="prose dark:prose-invert max-w-none">
            {renderedContent()}
          </div>
        </article>
      </div>
    </Context7Provider>
  );
} 