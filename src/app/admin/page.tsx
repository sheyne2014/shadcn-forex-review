import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Edit, ExternalLink, Newspaper, Store, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBrokers } from "@/lib/supabase/broker-client";
import { getBlogPosts } from "@/lib/supabase/blog-client";

export const metadata: Metadata = {
  title: "Admin Dashboard | BrokerAnalysis",
  description: "Manage broker listings, blog posts, users and site content",
};

export default async function AdminPage() {
  // Fetch summary data from Supabase
  const { data: brokers = [], error: brokersError } = await getBrokers();
  const { data: blogPosts = [], error: blogPostsError } = await getBlogPosts({});
  
  if (brokersError) {
    console.error("Error fetching brokers:", brokersError);
  }
  
  if (blogPostsError) {
    console.error("Error fetching blog posts:", blogPostsError);
  }
  
  // Mock data for users (would come from Supabase in a real implementation)
  const userCount = 124;
  
  // Calculate stats
  const brokerCount = brokers.length;
  const blogPostCount = blogPosts.length;
  const reviewCount = brokers.reduce((count, broker) => count + (broker.reviews?.length || 0), 0);
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row justify-between mb-10 items-start md:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your site content and data</p>
        </div>
        <Button asChild>
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Open Supabase Dashboard
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Brokers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{brokerCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPostCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" /> Brokers
            </CardTitle>
            <CardDescription>Manage broker listings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Brokers</h3>
              <ul className="space-y-2">
                {brokers.slice(0, 3).map((broker) => (
                  <li key={broker.id} className="flex justify-between items-center">
                    <span className="truncate">{broker.name}</span>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/admin/brokers/${broker.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/brokers">
                Manage Brokers <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5" /> Blog Posts
            </CardTitle>
            <CardDescription>Manage blog content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Posts</h3>
              <ul className="space-y-2">
                {blogPosts.slice(0, 3).map((post) => (
                  <li key={post.id} className="flex justify-between items-center">
                    <span className="truncate">{post.title}</span>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/admin/blog/${post.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/blog">
                Manage Blog Posts <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" /> Users
            </CardTitle>
            <CardDescription>Manage user accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">User Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-medium">{userCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">New (30d)</p>
                  <p className="font-medium">32</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active</p>
                  <p className="font-medium">87</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Admins</p>
                  <p className="font-medium">5</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/users">
                Manage Users <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 