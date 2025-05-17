import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Edit, FilePlus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getBlogPosts } from "@/lib/supabase/blog-client";

export const metadata: Metadata = {
  title: "Blog Management | Admin Dashboard | BrokerAnalysis",
  description: "Manage blog posts and categories",
};

// Helper function to format a date string
function formatDate(dateString?: string) {
  if (!dateString) return "Not published";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Helper function to truncate text
function truncateText(text?: string, maxLength = 50) {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

export default async function BlogAdminPage() {
  // Fetch blog posts from Supabase
  const { data: blogPosts = [], error } = await getBlogPosts({ limit: 50 });
  
  if (error) {
    console.error("Error fetching blog posts:", error);
  }
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row justify-between mb-10 items-start md:items-center">
        <div>
          <div className="mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground mt-2">Create, edit, and delete blog posts</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="w-full md:w-[300px] pl-8"
            />
          </div>
          <Button asChild>
            <Link href="/admin/blog/new" className="flex items-center gap-2">
              <FilePlus className="h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>
            Showing {blogPosts.length} posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Excerpt</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.length > 0 ? (
                blogPosts.map(post => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{formatDate(post.published_at)}</TableCell>
                    <TableCell>{truncateText(post.excerpt || post.content)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/blog/${post.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No blog posts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Blog posts are stored in Supabase. Changes may take a few seconds to reflect in the frontend.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 