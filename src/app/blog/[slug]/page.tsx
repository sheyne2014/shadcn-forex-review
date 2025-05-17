import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug } from "@/lib/supabase/blog-client";
import styles from "../blog-content.module.css";
import { marked } from "marked";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Default image to use when a blog post image is not found
const DEFAULT_BLOG_IMAGE = "/images/blog/default-blog.svg";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

interface FAQ {
  question: string;
  answer: string;
}

interface KeyTakeaway {
  text: string;
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  // Properly handle Next.js async context
  const { slug } = params;
  
  const { data: post } = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found."
    };
  }

  return {
    title: `${post.title} | BrokerAnalysis Blog`,
    description: post.excerpt || post.content?.substring(0, 160) || "Read this blog post about forex trading.",
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160) || "Read this blog post about forex trading.",
      type: "article",
      url: `/blog/${post.slug}`,
      images: post.image_url ? [{ url: post.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160) || "Read this blog post about forex trading.",
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

// Function to render markdown content
function renderMarkdown(content: string): string {
  try {
    return marked(content);
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return content;
  }
}

// Example Key Takeaways - in production, these would come from the database or content
const defaultKeyTakeaways: KeyTakeaway[] = [
  {
    text: "Effective forex trading goals must be specific, measurable, achievable, relevant, and time-bound (SMART) to drive meaningful progress"
  },
  {
    text: "Process-oriented goals (like maintaining trading discipline) typically lead to better long-term results than purely outcome-based goals (like specific profit targets)"
  },
  {
    text: "Successful traders create a hierarchy of goals spanning daily, weekly, monthly, quarterly, and yearly timeframes"
  },
  {
    text: "Regular review and adjustment of trading objectives is essential as market conditions evolve and trading skills develop"
  },
  {
    text: "The most effective trading goals balance ambition with realism, considering your experience level, available capital, and time commitment"
  }
];

// Example FAQs - in production, these would come from the database or content
const defaultFAQs: FAQ[] = [
  {
    question: "What is forex trading?",
    answer: "Forex trading involves buying and selling currencies on the foreign exchange market with the aim of making a profit. It's the largest and most liquid financial market in the world, with trillions of dollars traded daily."
  },
  {
    question: "How do I start trading forex?",
    answer: "To start trading forex, you need to open an account with a reputable forex broker, deposit funds, understand basic forex concepts, develop a trading strategy, and practice with a demo account before risking real money."
  },
  {
    question: "What is leverage in forex trading?",
    answer: "Leverage in forex trading allows you to control a large position with a relatively small amount of capital. For example, with 100:1 leverage, you can control $100,000 in currency with just $1,000. While leverage can amplify profits, it also increases potential losses."
  },
  {
    question: "What are the major currency pairs?",
    answer: "The major currency pairs include EUR/USD (Euro/US Dollar), USD/JPY (US Dollar/Japanese Yen), GBP/USD (British Pound/US Dollar), and USD/CHF (US Dollar/Swiss Franc). These pairs are the most traded and typically have the lowest spreads."
  },
  {
    question: "How much money do I need to start forex trading?",
    answer: "You can start forex trading with as little as $100 with some brokers, though it's recommended to start with at least $500-$1,000 to give your account enough cushion to withstand losses and maintain proper risk management."
  }
];

export default async function BlogPostPage(
  { params }: BlogPostPageProps
) {
  // Properly handle Next.js async context
  const { slug } = params;
  
  const { data: post, error } = await getBlogPostBySlug(slug);

  if (error || !post) {
    console.error("Error fetching blog post:", error);
    notFound();
  }

  // Calculate reading time if it's not provided (optional)
  const readingTime = post.reading_time || 
    Math.ceil((post.content?.split(/\s+/)?.length || 0) / 200);
    
  // Render content as HTML if it's markdown
  const renderedContent = post.content ? renderMarkdown(post.content) : '';

  // Use post FAQs if available, otherwise use default FAQs
  const faqs = post.faqs || defaultFAQs;
  
  // Use post Key Takeaways if available, otherwise use default Key Takeaways
  const keyTakeaways = post.key_takeaways || defaultKeyTakeaways;

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
          <div className="w-full h-[400px] overflow-hidden rounded-lg mb-8">
            <img 
              src={post.image_url || DEFAULT_BLOG_IMAGE} 
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = DEFAULT_BLOG_IMAGE;
              }}
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground space-x-2 mb-4">
            <span>{formatDate(post.published_at)}</span>
            <span className="inline-block">•</span>
            <span>{readingTime} min read</span>
          </div>
          {post.excerpt && (
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
          )}
        </header>
        
        {/* Key Takeaways Section */}
        <div className={styles.keyTakeaways}>
          <h2>Key Takeaways</h2>
          <ul>
            {keyTakeaways.map((takeaway: KeyTakeaway, index: number) => (
              <li key={index}>{takeaway.text}</li>
            ))}
          </ul>
        </div>

        {/* Render blog content with our custom styles */}
        <div 
          className={styles.blogContent}
          dangerouslySetInnerHTML={{ __html: renderedContent }} 
        />
        
        {/* FAQs Section */}
        <div className={`${styles.faqAccordion} mt-16`}>
          <h2 id="frequently-asked-questions" className={styles.faqTitle}>Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full mt-6">
            {faqs.map((faq: FAQ, index: number) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-b border-border py-2">
                <AccordionTrigger className="font-medium text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </article>

      <div className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        {/* Related posts would go here - would require additional data fetching */}
        <p className="text-muted-foreground">More related content coming soon...</p>
      </div>
    </div>
  );
} 