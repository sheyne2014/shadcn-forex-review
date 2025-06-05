import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Prism } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, Terminal } from 'lucide-react';

/**
 * Determines if a string might be MDX content
 */
export function isMDXContent(content: string): boolean {
  if (!content) return false;
  
  // Check for common MDX patterns
  const mdxPatterns = [
    /<[A-Z][A-Za-z0-9]+(\.|\s|\/>|>)/,  // React component usage
    /import\s+.*\s+from\s+["'].*["']/,  // import statements
    /export\s+default/,                 // export default
    /{[\s]*\/\*.*\*\/[\s]*}/,           // JSX comments
    /<KeyTakeaways/,                    // Our custom components
    /<FAQAccordion/                     // Our custom components
  ];

  // Return true if any MDX patterns are found
  return mdxPatterns.some(pattern => pattern.test(content));
}

/**
 * Convert MDX-like content to HTML
 */
export function convertToHTML(content: string): string {
  if (!content) return '';

  let htmlContent = content;
  
  // Remove frontmatter if present
  htmlContent = htmlContent.replace(/^---[\s\S]*?---/, '').trim();
  
  // Process KeyTakeaways component
  htmlContent = htmlContent.replace(
    /<KeyTakeaways\s+points=\{([\s\S]*?)\}\s*\/>/g,
    (_, pointsStr) => {
      try {
        // Try to extract points without parsing JSON
        const points: string[] = [];
        
        // Extract text inside quotes
        const pointMatches = pointsStr.match(/"([^"]*)"/g) || [];
        pointMatches.forEach((point: string) => {
          // Remove the quotes
          const cleanPoint = point.replace(/^"|"$/g, '');
          if (cleanPoint.trim()) {
            points.push(cleanPoint);
          }
        });
        
        // Generate HTML for key takeaways
        if (points.length === 0) return '';
        
        return `
          <div class="my-6 rounded-lg border bg-muted/20 p-4">
            <h3 class="text-lg font-semibold mb-4">Key Takeaways</h3>
            <ul class="space-y-2 pl-0">
              ${points.map(point => `
                <li class="flex items-start gap-2 text-sm">
                  <span class="shrink-0 mt-0.5">•</span>
                  <span>${point}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      } catch (error) {
        console.error('Error converting KeyTakeaways to HTML:', error);
        return '';
      }
    }
  );
  
  // Process FAQAccordion component
  htmlContent = htmlContent.replace(
    /<FAQAccordion\s+items=\{([\s\S]*?)\}\s*\/>/g,
    () => {
      try {
        return `
          <div class="my-8 space-y-4" id="faq">
            <h3 class="text-xl font-semibold">Frequently Asked Questions</h3>
            <div class="space-y-4">
              <!-- FAQ items would go here -->
            </div>
          </div>
        `;
      } catch (error) {
        console.error('Error converting FAQAccordion to HTML:', error);
        return '';
      }
    }
  );
  
  // Enhance Table of Contents formatting
  htmlContent = htmlContent.replace(
    /## Table of Contents\s*([\s\S]*?)(?=##)/g,
    (_, tocContent) => {
      return `
        <div class="my-8 p-4 bg-muted/10 rounded-lg">
          <h2 class="text-xl font-semibold mb-4">Table of Contents</h2>
          <nav class="space-y-1">
            <ul class="list-disc pl-5 space-y-1">
              ${tocContent.replace(/-\s*\[(.*?)\]\(#(.*?)\)/g, '<li><a href="#$2" class="text-primary hover:underline">$1</a></li>')}
            </ul>
          </nav>
        </div>
      `;
    }
  );
  
  // Add anchor links to headings and ensure proper ID formatting
  htmlContent = htmlContent.replace(
    /## (.*?) \{#(.*?)\}/g,
    '<h2 id="$2" class="scroll-mt-20">$1</h2>'
  );
  
  // Process regular headings without explicit IDs
  htmlContent = htmlContent.replace(
    /## ([^{#]*?)(?=\n|$)/g,
    (_, title) => {
      const id = title.trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<h2 id="${id}" class="scroll-mt-20">${title.trim()}</h2>`;
    }
  );
  
  return htmlContent;
}

interface KeyTakeawaysProps {
  points: string[];
}

// Custom component for key takeaways
function KeyTakeaways({ points }: KeyTakeawaysProps) {
  return (
    <Card className="my-8 bg-primary/5 border border-primary/20 shadow-sm">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <InfoIcon className="h-5 w-5 text-primary" />
          Key Takeaways
        </h3>
        <ul className="space-y-3 pl-6 list-disc marker:text-primary">
          {points.map((point, index) => (
            <li key={index} className="text-sm md:text-base leading-relaxed text-muted-foreground">
              {point}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Custom component for FAQ accordions
function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border rounded-md px-1 shadow-sm">
            <AccordionTrigger className="text-base md:text-lg font-medium py-4 px-4 hover:no-underline data-[state=open]:text-primary">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5 pt-1">
              <div 
                dangerouslySetInnerHTML={{ __html: item.answer }} 
                className="prose prose-sm prose-p:my-3 prose-p:leading-relaxed prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-muted-foreground prose-li:my-2 prose-strong:text-foreground prose-strong:font-medium max-w-none" 
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

// Alert components
function InfoAlert({ children, title = "Information" }: { children: React.ReactNode; title?: string }) {
  return (
    <Alert className="my-6 border-info/30 bg-info/10">
      <InfoIcon className="h-4 w-4 text-info" />
      <AlertTitle className="text-info font-medium">{title}</AlertTitle>
      <AlertDescription className="text-info-foreground mt-1">{children}</AlertDescription>
    </Alert>
  );
}

function WarningAlert({ children, title = "Warning" }: { children: React.ReactNode; title?: string }) {
  return (
    <Alert className="my-6 border-warning/30 bg-warning/10">
      <AlertTriangleIcon className="h-4 w-4 text-warning" />
      <AlertTitle className="text-warning font-medium">{title}</AlertTitle>
      <AlertDescription className="text-warning-foreground mt-1">{children}</AlertDescription>
    </Alert>
  );
}

function SuccessAlert({ children, title = "Success" }: { children: React.ReactNode; title?: string }) {
  return (
    <Alert className="my-6 border-success/30 bg-success/10">
      <CheckCircleIcon className="h-4 w-4 text-success" />
      <AlertTitle className="text-success font-medium">{title}</AlertTitle>
      <AlertDescription className="text-success-foreground mt-1">{children}</AlertDescription>
    </Alert>
  );
}

// Image component with optimization
function BlogImage({ src, alt, width = 800, height = 500 }: { src: string; alt: string; width?: number; height?: number }) {
  return (
    <div className="my-8 overflow-hidden rounded-md border border-border shadow-sm">
      <Image 
        src={src} 
        alt={alt || "Blog image"} 
        width={width} 
        height={height} 
        className="w-full object-cover"
        quality={90}
      />
      {alt && <p className="text-center text-sm text-muted-foreground py-2 px-3 bg-muted/30 border-t border-border">{alt}</p>}
    </div>
  );
}

// Code block component with syntax highlighting
function CodeBlock({ className, children }: { className?: string; children: string }) {
  // Extract language from className (format: "language-javascript")
  const language = className ? className.replace('language-', '') : 'text';
  
  return (
    <div className="my-6 rounded-md overflow-hidden border border-border">
      <div className="bg-muted px-4 py-2 text-xs font-mono border-b border-border flex items-center gap-2">
        <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
        <span>{language}</span>
      </div>
      <Prism
        language={language}
        style={tomorrow}
        showLineNumbers
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          fontSize: '0.9rem',
          lineHeight: 1.5,
          borderRadius: 0,
          background: 'var(--muted)',
        }}
      >
        {children}
      </Prism>
    </div>
  );
}

// Enhanced heading components
function H2({ children }: { children: React.ReactNode }) {
  // Convert heading text to ID for linking
  const id = children?.toString()
    ?.toLowerCase()
    ?.replace(/\s+/g, '-')
    ?.replace(/[^\w-]/g, '')
    || "";
  
  return (
    <h2 id={id} className="group relative scroll-mt-20">
      <a href={`#${id}`} className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-muted-foreground">#</span>
      </a>
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  const id = children?.toString()
    ?.toLowerCase()
    ?.replace(/\s+/g, '-')
    ?.replace(/[^\w-]/g, '')
    || "";
  
  return (
    <h3 id={id} className="group relative scroll-mt-20">
      <a href={`#${id}`} className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-muted-foreground">#</span>
      </a>
      {children}
    </h3>
  );
}

// Table components
const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="my-8 overflow-x-auto rounded-md border border-border shadow-sm">
    <Table className="w-full">{children}</Table>
  </div>
);

// Custom components map for MDX
const components = {
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: ({ className, children }: { className?: string; children: string }) => {
    // If it's a code block (with language class), use CodeBlock
    if (className?.startsWith('language-')) {
      return <CodeBlock className={className}>{children}</CodeBlock>;
    }
    // Else it's an inline code, use default styling
    return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
  },
  img: BlogImage,
  Image: BlogImage,
  h2: H2,
  h3: H3,
  KeyTakeaways,
  FAQAccordion,
  InfoAlert,
  WarningAlert,
  SuccessAlert,
  table: TableWrapper,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: ({ children }: { children: React.ReactNode }) => <TableHead className="font-medium">{children}</TableHead>,
  td: ({ children }: { children: React.ReactNode }) => <TableCell className="p-3 align-middle">{children}</TableCell>,
  p: ({ children }: { children: React.ReactNode }) => <p className="leading-relaxed text-muted-foreground my-6">{children}</p>,
  ul: ({ children }: { children: React.ReactNode }) => <ul className="my-6 pl-6 list-disc marker:text-muted-foreground">{children}</ul>,
  ol: ({ children }: { children: React.ReactNode }) => <ol className="my-6 pl-6 list-decimal">{children}</ol>,
  li: ({ children }: { children: React.ReactNode }) => <li className="my-2 text-muted-foreground">{children}</li>,
  strong: ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-foreground">{children}</strong>,
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-primary font-medium hover:underline" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary pl-4 py-1 my-6 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
};

interface BlogPost {
  id: string;
  title: string;
  content: string;
  // Other blog post properties...
}

export function renderBlogContent(post: BlogPost) {
  try {
    return (
      <div className="mdx-content">
        <MDXRemote source={post.content || ''} components={components} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering MDX content:', error);
    // Fallback to plain HTML if MDX rendering fails
    return (
      <div className="mdx-content">
        <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
      </div>
    );
  }
} 