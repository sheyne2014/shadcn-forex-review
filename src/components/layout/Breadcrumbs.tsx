"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Function to format paths better
const formatPathName = (path: string): string => {
  // Check if it's a dynamic path with [id] pattern
  if (path.startsWith('[') && path.endsWith(']')) {
    return path.slice(1, -1); // Remove the brackets
  }
  
  // Skip route groups with parentheses
  if (path.startsWith('(') && path.endsWith(')')) {
    return '';
  }
  
  // Replace hyphens and underscores with spaces
  let formattedPath = path.replace(/[-_]/g, ' ');
  
  // Capitalize first letter
  formattedPath = formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);
  
  return formattedPath;
};

const generateBreadcrumbs = (pathname: string) => {
  // Split the pathname by '/' and remove empty strings
  const paths = pathname.split('/').filter(path => path);
  
  // If we're on the homepage, return empty breadcrumbs
  if (paths.length === 0) {
    return [];
  }

  // Generate the breadcrumbs array
  const breadcrumbs = [];
  let currentPath = '';
  
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    
    // Skip route groups (like (main))
    if (path.startsWith('(') && path.endsWith(')')) {
      continue;
    }
    
    currentPath += `/${path}`;
    const name = formatPathName(path);
    
    if (name) { // Only add if it's not an empty string (skipped route group)
      breadcrumbs.push({
        name,
        url: currentPath,
        originalPath: path
      });
    }
  }
  
  return breadcrumbs;
};

// Create friendly names for specific paths
const pathNameMap: Record<string, string> = {
  'tools': 'Tools',
  'compare': 'Comparison Tool',
  'calculator': 'Trading Calculator',
  'quiz': 'Broker Finder Quiz',
  'converter': 'Currency Converter',
  'broker': 'Broker',
  'brokers': 'Brokers',
  'auth': 'Authentication',
  'login': 'Login',
  'signup': 'Sign Up',
  'verify': 'Verification',
  'dashboard': 'Dashboard',
  'id': 'Details',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  // If we're on the homepage or in the dashboard, don't show breadcrumbs
  if (breadcrumbs.length === 0 || pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          
          {breadcrumbs.map((breadcrumb, index) => {
            // Special case for dynamic routes with IDs
            const isDynamicRoute = breadcrumb.originalPath.match(/^\d+$/) || breadcrumb.originalPath === 'id';
            
            // Use mapping for known paths, or the formatted name
            const name = isDynamicRoute 
              ? 'Details' 
              : (pathNameMap[breadcrumb.originalPath.toLowerCase()] || breadcrumb.name);
            
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <BreadcrumbItem key={breadcrumb.url}>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={breadcrumb.url}>{name}</BreadcrumbLink>
                )}
                {!isLast && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
} 