"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HTMLContentProps {
  content: string;
  className?: string;
}

export function HTMLContent({ content, className }: HTMLContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Process the content after rendering to add any needed enhancements
  useEffect(() => {
    if (contentRef.current) {
      // Process headings for anchor links
      const headings = contentRef.current.querySelectorAll('h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        // Only process headings that don't already have IDs
        if (!heading.id) {
          const text = heading.textContent || '';
          const slug = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          
          heading.id = slug;
        }
        
        // Add scroll margin to all headings for better anchor positioning
        heading.classList.add('scroll-mt-20');
        
        // Add anchor link functionality
        const anchor = document.createElement('a');
        anchor.href = `#${heading.id}`;
        anchor.className = 'ml-2 text-primary opacity-0 hover:opacity-100 transition-opacity';
        anchor.textContent = '#';
        anchor.setAttribute('aria-label', `Link to ${heading.textContent}`);
        
        // Make the heading container relative for anchor positioning
        (heading as HTMLElement).style.position = 'relative';
        heading.appendChild(anchor);
      });
      
      // Process links to open external links in new tabs
      const links = contentRef.current.querySelectorAll('a');
      links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Handle anchor links to ensure smooth scrolling
        if (href && href.startsWith('#')) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              
              // Update URL without reloading the page
              window.history.pushState(null, '', href);
            }
          });
        }
        // Handle external links
        else if (href && (href.startsWith('http') || href.startsWith('https'))) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });
      
      // Process images to add lazy loading
      const images = contentRef.current.querySelectorAll('img');
      images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        
        // Wrap images in a container for styling
        if (img.parentElement?.tagName !== 'DIV') {
          const wrapper = document.createElement('div');
          wrapper.className = 'my-6 overflow-hidden rounded-lg';
          img.parentElement?.insertBefore(wrapper, img);
          wrapper.appendChild(img);
        }
      });
      
      // Check if there's a hash in the URL and scroll to it after processing
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      }
    }
  }, [content]);
  
  return (
    <div 
      ref={contentRef}
      className={cn("prose dark:prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
} 