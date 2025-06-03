import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/supabase/blog-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Context7Provider } from "@/components/Context7Provider";
import { OptimizedImage } from "@/components/OptimizedImage";
import { format, parseISO } from "date-fns";
import { renderBlogContent } from "@/lib/mdx-blog-adapter";
import { HTMLContent } from "@/components/HTMLContent";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { AuthorProfile } from "@/components/AuthorProfile";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { RelatedPosts } from "@/components/RelatedPosts";
import { TableOfContents } from "@/components/TableOfContents";

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
      console.log(`MDX file not found for slug: ${slug} at path: ${filePath}`);
      return null;
    }
    
    console.log(`Found MDX file for slug: ${slug} at path: ${filePath}`);
    
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter and content
    const { data, content } = matter(fileContent);
    const frontmatter = data as BlogPostFrontmatter;
    
    // Create a blog post object
    const blogPost = {
      title: frontmatter.title,
      content: content,
      slug: slug,
      excerpt: frontmatter.excerpt,
      published_at: frontmatter.date,
      author: frontmatter.author,
      image_url: frontmatter.image,
      reading_time: parseInt(frontmatter.readingTime?.replace(/\D/g, ''), 10) || 10,
      tags: frontmatter.tags,
      description: frontmatter.description,
      keywords: frontmatter.keywords
    };
    
    console.log(`Successfully parsed MDX frontmatter for: ${slug}`, { 
      title: blogPost.title,
      date: blogPost.published_at,
      imageUrl: blogPost.image_url
    });
    
    return blogPost;
  } catch (error) {
    console.error(`Error reading blog post file for slug: ${slug}:`, error);
    return null;
  }
}

// Ensure image URL is valid or use fallback
function getValidImageUrl(imageUrl?: string): string {
  if (!imageUrl) return '/images/blog/default-blog.svg';
  
  // If it's already an absolute URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Make sure relative URLs start with /
  return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
}

// Function to get file-based blog posts list for related posts
async function getFileBasedBlogPosts(): Promise<FileBasedBlogPost[]> {
  try {
    const blogDir = path.join(process.cwd(), 'src/app/blog');
    const files = fs.readdirSync(blogDir);
    
    const mdxFiles = files.filter(file => file.endsWith('.mdx') && !file.startsWith('['));
    
    const posts = mdxFiles.map(file => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const frontmatter = data as BlogPostFrontmatter;
      const slug = file.replace('.mdx', '');
      
      return {
        id: slug,
        title: frontmatter.title,
        content: content,
        slug: slug,
        excerpt: frontmatter.excerpt,
        published_at: frontmatter.date,
        author: frontmatter.author,
        image_url: frontmatter.image,
        reading_time: parseInt(frontmatter.readingTime?.replace(/\D/g, ''), 10) || 10,
        tags: frontmatter.tags
      };
    });
    
    return posts;
  } catch (error) {
    console.error('Error getting file-based blog posts:', error);
    return [];
  }
}

// Define metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Properly type and extract the slug parameter
  const slug = params.slug;
  
  // First try to get post from filesystem
  const filePost = await getFileBasedBlogPost(slug);
  
  // If found in filesystem, use it for metadata
  if (filePost) {
    return {
      title: filePost.title,
      description: filePost.description || filePost.excerpt || filePost.content.substring(0, 160),
      openGraph: {
        title: filePost.title,
        description: filePost.description || filePost.excerpt || filePost.content.substring(0, 160),
        type: "article",
        publishedTime: filePost.published_at,
        images: filePost.image_url ? [{ url: filePost.image_url }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: filePost.title,
        description: filePost.description || filePost.excerpt || filePost.content.substring(0, 160),
        images: filePost.image_url ? [filePost.image_url] : undefined,
      },
    };
  }
  
  // If not found in filesystem, try to get from database
  try {
    const { data: dbPost } = await getBlogPostBySlug(slug);
    
    if (!dbPost) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found."
      };
    }

    return {
      title: dbPost.title,
      description: dbPost.excerpt || dbPost.content?.substring(0, 160),
      openGraph: {
        title: dbPost.title,
        description: dbPost.excerpt || dbPost.content?.substring(0, 160),
        type: "article",
        publishedTime: dbPost.published_at,
        images: dbPost.image_url ? [{ url: dbPost.image_url }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: dbPost.title,
        description: dbPost.excerpt || dbPost.content?.substring(0, 160),
        images: dbPost.image_url ? [dbPost.image_url] : undefined,
      },
    };
  } catch (error) {
    console.error('Error fetching blog post metadata:', error);
    return {
      title: "Blog Post Error",
      description: "There was an error loading this blog post."
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  // Properly type and extract the slug parameter
  const slug = params.slug;
  
  try {
    // First try to get the post from the filesystem as a priority
    const filePost = await getFileBasedBlogPost(slug);
    
    // If found in filesystem, render it
    if (filePost) {
      // Format date if available
      const formattedDate = filePost.published_at 
        ? new Date(filePost.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : null;

      // Process image URL to ensure it's valid
      const validImageUrl = getValidImageUrl(filePost.image_url);

      // Create Context7 configuration for SEO
      const context7Config = {
        title: filePost.title,
        description: filePost.description || filePost.excerpt || filePost.content.substring(0, 160) || "",
        keywords: filePost.tags ? (typeof filePost.tags === 'string' ? JSON.parse(filePost.tags) : filePost.tags) : [],
        openGraph: {
          title: filePost.title,
          description: filePost.description || filePost.excerpt || filePost.content.substring(0, 160),
          images: validImageUrl ? [{ url: validImageUrl }] : undefined,
          type: "article",
        },
      };

      // Render blog content or fallback to direct HTML rendering
      const renderedContent = () => {
        try {
          // Add an id to match the BlogPost interface
          const postWithId = {
            ...filePost,
            id: filePost.slug // Use slug as ID
          };
          return renderBlogContent(postWithId);
        } catch (error) {
          console.error('Error rendering blog content with MDX adapter:', error);
          // Fallback to direct HTML rendering
          return <HTMLContent content={filePost.content || ''} />;
        }
      };

      // Get related posts
      const allPosts = await getFileBasedBlogPosts();
      
      // Create author bio data
      const authorBio = {
        name: filePost.author || "BrokerAnalysis Team",
        bio: "Financial markets specialist with over a decade of experience in broker analysis and regulatory compliance.",
        title: "Senior Financial Analyst",
        image: "/images/team/analyst-avatar.svg" // Use SVG avatar
      };

      return (
        <Context7Provider config={context7Config}>
          <div className="container max-w-6xl mx-auto px-4 py-10">
            <div className="mb-8">
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog" className="flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>

            <article className="prose dark:prose-invert max-w-none">
              <header className="mb-10 not-prose">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  {filePost.title}
                </h1>
                
                {(formattedDate || filePost.reading_time) && (
                  <div className="flex items-center text-sm text-muted-foreground space-x-2 mb-6">
                    {formattedDate && <span className="font-medium">{formattedDate}</span>}
                    {formattedDate && filePost.reading_time && <span className="inline-block">•</span>}
                    {filePost.reading_time && <span>{filePost.reading_time} min read</span>}
                  </div>
                )}
                
                {filePost.excerpt && (
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {filePost.excerpt}
                  </p>
                )}
                
                {filePost.image_url && (
                  <div className="mt-6 mb-10 overflow-hidden rounded-xl border border-border shadow-sm">
                    <OptimizedImage
                      src={validImageUrl}
                      alt={filePost.title}
                      width={1200}
                      height={630}
                      className="w-full object-cover"
                      priority
                    />
                  </div>
                )}
              </header>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <div className="col-span-1 hidden lg:block">
                  <div className="sticky top-20">
                    <TableOfContents />
                  </div>
                </div>
                
                <div className="col-span-1 lg:col-span-3">
                  <div className="mdx-content prose dark:prose-invert 
                    prose-headings:font-bold 
                    prose-headings:tracking-tight 
                    prose-headings:mb-6 
                    prose-headings:mt-10 
                    prose-h2:text-3xl 
                    prose-h3:text-2xl 
                    prose-h4:text-xl
                    prose-h5:text-lg
                    prose-p:leading-relaxed 
                    prose-p:text-base 
                    prose-p:my-6 
                    prose-p:text-muted-foreground
                    prose-a:text-primary 
                    prose-a:no-underline 
                    prose-a:font-medium 
                    hover:prose-a:underline 
                    prose-blockquote:border-l-primary 
                    prose-blockquote:bg-muted/40 
                    prose-blockquote:py-2
                    prose-blockquote:px-6 
                    prose-blockquote:not-italic 
                    prose-blockquote:rounded-sm 
                    prose-blockquote:my-8 
                    prose-code:bg-muted 
                    prose-code:px-1 
                    prose-code:py-0.5 
                    prose-code:rounded-sm 
                    prose-code:text-sm 
                    prose-pre:bg-muted/50 
                    prose-pre:border 
                    prose-pre:border-border 
                    prose-pre:rounded-md 
                    prose-pre:p-4 
                    prose-pre:my-6 
                    prose-pre:overflow-auto
                    prose-img:rounded-md 
                    prose-img:shadow-sm 
                    prose-img:border 
                    prose-img:border-border 
                    prose-img:my-8 
                    prose-li:my-2 
                    prose-table:border-collapse 
                    prose-table:overflow-hidden 
                    prose-table:rounded-md 
                    prose-thead:bg-muted/50 
                    prose-th:p-3 
                    prose-th:text-left 
                    prose-th:font-medium 
                    prose-td:p-3 
                    prose-td:border-t 
                    prose-td:border-border 
                    prose-ol:pl-6
                    prose-ul:pl-6
                    prose-ul:list-disc
                    prose-ol:list-decimal
                    prose-hr:my-8
                    prose-hr:border-border
                    prose-strong:font-semibold
                    prose-strong:text-foreground
                    max-w-none">
                    {renderedContent()}
                  </div>
                  
                  <div className="mt-10 pt-8 border-t">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                      <h3 className="text-lg font-semibold">Share this article</h3>
                      <SocialShareButtons title={filePost.title} />
                    </div>
                    
                    <AuthorProfile 
                      name={authorBio.name}
                      bio={authorBio.bio}
                      title={authorBio.title}
                      image={authorBio.image}
                    />
                    
                    <RelatedPosts posts={allPosts} currentPostSlug={slug} />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </Context7Provider>
      );
    }

    // If not found in filesystem, try to get from database
    const { data: dbPost } = await getBlogPostBySlug(slug);
    
    // Handle case where post is not found in either location
    if (!dbPost) {
      notFound();
    }

    // Process image URL for database post
    const validDbImageUrl = getValidImageUrl(dbPost.image_url);

    // Continue with database post rendering
    // Format date if available
    const formattedDate = dbPost.published_at 
      ? format(parseISO(dbPost.published_at), 'MMMM d, yyyy')
      : null;

    // Create Context7 configuration for SEO
    const context7Config = {
      title: dbPost.title,
      description: dbPost.excerpt || dbPost.content?.substring(0, 160) || "",
      keywords: dbPost.tags ? (typeof dbPost.tags === 'string' ? JSON.parse(dbPost.tags) : dbPost.tags) : [],
      openGraph: {
        title: dbPost.title,
        description: dbPost.excerpt || dbPost.content?.substring(0, 160),
        images: validDbImageUrl ? [{ url: validDbImageUrl }] : undefined,
        type: "article",
      },
    };

    // Render blog content or fallback to direct HTML rendering
    const renderedContent = () => {
      try {
        return renderBlogContent(dbPost);
      } catch (error) {
        console.error('Error rendering blog content with MDX adapter:', error);
        // Fallback to direct HTML rendering
        return <HTMLContent content={dbPost.content || ''} />;
      }
    };

    // Get related posts for database posts
    const { data: relatedDbPosts } = await getBlogPosts({ limit: 4 });
    const filteredRelatedPosts = relatedDbPosts?.filter(post => post.slug !== slug) || [];
    
    // Create author bio data for db post
    const dbAuthorBio = {
      name: dbPost.author || "BrokerAnalysis Team",
      bio: "Financial markets specialist with over a decade of experience in broker analysis and regulatory compliance.",
      title: "Senior Financial Analyst",
      image: "/images/team/analyst-avatar.svg" // Use SVG avatar
    };

    return (
      <Context7Provider config={context7Config}>
        <div className="container max-w-6xl mx-auto px-4 py-10">
          <div className="mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog" className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <article className="prose dark:prose-invert max-w-none">
            <header className="mb-10 not-prose">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                {dbPost.title}
              </h1>
              
              {(formattedDate || dbPost.reading_time) && (
                <div className="flex items-center text-sm text-muted-foreground space-x-2 mb-6">
                  {formattedDate && <span className="font-medium">{formattedDate}</span>}
                  {formattedDate && dbPost.reading_time && <span className="inline-block">•</span>}
                  {dbPost.reading_time && <span>{dbPost.reading_time} min read</span>}
                </div>
              )}
              
              {dbPost.excerpt && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {dbPost.excerpt}
                </p>
              )}
              
              {dbPost.image_url && (
                <div className="mt-6 mb-10 overflow-hidden rounded-xl border border-border shadow-sm">
                  <OptimizedImage
                    src={validDbImageUrl}
                    alt={dbPost.title}
                    width={1200}
                    height={630}
                    className="w-full object-cover"
                    priority
                  />
                </div>
              )}
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              <div className="col-span-1 hidden lg:block">
                <div className="sticky top-20">
                  <TableOfContents />
                </div>
              </div>
              
              <div className="col-span-1 lg:col-span-3">
                <div className="mdx-content prose dark:prose-invert 
                  prose-headings:font-bold 
                  prose-headings:tracking-tight 
                  prose-headings:mb-6 
                  prose-headings:mt-10 
                  prose-h2:text-3xl 
                  prose-h3:text-2xl 
                  prose-h4:text-xl
                  prose-h5:text-lg
                  prose-p:leading-relaxed 
                  prose-p:text-base 
                  prose-p:my-6 
                  prose-p:text-muted-foreground
                  prose-a:text-primary 
                  prose-a:no-underline 
                  prose-a:font-medium 
                  hover:prose-a:underline 
                  prose-blockquote:border-l-primary 
                  prose-blockquote:bg-muted/40 
                  prose-blockquote:py-2
                  prose-blockquote:px-6 
                  prose-blockquote:not-italic 
                  prose-blockquote:rounded-sm 
                  prose-blockquote:my-8 
                  prose-code:bg-muted 
                  prose-code:px-1 
                  prose-code:py-0.5 
                  prose-code:rounded-sm 
                  prose-code:text-sm 
                  prose-pre:bg-muted/50 
                  prose-pre:border 
                  prose-pre:border-border 
                  prose-pre:rounded-md 
                  prose-pre:p-4 
                  prose-pre:my-6 
                  prose-pre:overflow-auto
                  prose-img:rounded-md 
                  prose-img:shadow-sm 
                  prose-img:border 
                  prose-img:border-border 
                  prose-img:my-8 
                  prose-li:my-2 
                  prose-table:border-collapse 
                  prose-table:overflow-hidden 
                  prose-table:rounded-md 
                  prose-thead:bg-muted/50 
                  prose-th:p-3 
                  prose-th:text-left 
                  prose-th:font-medium 
                  prose-td:p-3 
                  prose-td:border-t 
                  prose-td:border-border 
                  prose-ol:pl-6
                  prose-ul:pl-6
                  prose-ul:list-disc
                  prose-ol:list-decimal
                  prose-hr:my-8
                  prose-hr:border-border
                  prose-strong:font-semibold
                  prose-strong:text-foreground
                  max-w-none">
                  {renderedContent()}
                </div>
                
                <div className="mt-10 pt-8 border-t">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <h3 className="text-lg font-semibold">Share this article</h3>
                    <SocialShareButtons title={dbPost.title} />
                  </div>
                  
                  <AuthorProfile 
                    name={dbAuthorBio.name}
                    bio={dbAuthorBio.bio}
                    title={dbAuthorBio.title}
                    image={dbAuthorBio.image}
                  />
                  
                  <RelatedPosts posts={filteredRelatedPosts} currentPostSlug={slug} />
                </div>
              </div>
            </div>
          </article>
        </div>
      </Context7Provider>
    );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    // Return a simple error page
    return (
      <div className="container max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Error Loading Blog Post</h1>
        <p className="text-muted-foreground">
          There was an error loading this blog post. Please try again later.
        </p>
        <Button variant="outline" size="sm" className="mt-6" asChild>
          <Link href="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }
} 