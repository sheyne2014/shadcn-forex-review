import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Edit, FilePlus, Search, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getBrokers } from "@/lib/supabase/broker-client";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Broker Management | Admin Dashboard | BrokerAnalysis",
  description: "Manage broker listings, ratings, and data",
};

export default async function BrokersAdminPage() {
  // Fetch brokers from Supabase
  const { data: brokers = [], error } = await getBrokers({ limit: 50 });
  
  if (error) {
    console.error("Error fetching brokers:", error);
  }
  
  // Helper function to format assets
  const formatSupportedAssets = (supportedAssets: string | string[] | null | undefined): string[] => {
    if (!supportedAssets) return [];
    if (typeof supportedAssets === 'string') {
      try {
        return JSON.parse(supportedAssets);
      } catch {
        return supportedAssets.split(',').map(asset => asset.trim());
      }
    }
    return supportedAssets;
  };
  
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Broker Management</h1>
          <p className="text-muted-foreground mt-2">Create, edit, and delete broker listings</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search brokers..."
              className="w-full md:w-[300px] pl-8"
            />
          </div>
          <Button asChild>
            <Link href="/admin/brokers/new" className="flex items-center gap-2">
              <FilePlus className="h-4 w-4" />
              New Broker
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Broker Listings</CardTitle>
          <CardDescription>
            Showing {brokers.length} brokers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Min. Deposit</TableHead>
                <TableHead>Assets</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brokers.length > 0 ? (
                brokers.map(broker => (
                  <TableRow key={broker.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {broker.logo_url && (
                          <div className="h-8 w-8 bg-muted flex items-center justify-center rounded overflow-hidden">
                            <img 
                              src={broker.logo_url} 
                              alt={`${broker.name} logo`} 
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        )}
                        {broker.name}
                      </div>
                    </TableCell>
                    <TableCell>{broker.country || "Global"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {broker.rating ? (
                          <>
                            {broker.rating} <Star className="h-3 w-3 fill-primary ml-1" />
                          </>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </TableCell>
                    <TableCell>${broker.min_deposit || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {formatSupportedAssets(broker.supported_assets).slice(0, 3).map((asset, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {asset}
                          </Badge>
                        ))}
                        {formatSupportedAssets(broker.supported_assets).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{formatSupportedAssets(broker.supported_assets).length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/brokers/${broker.id}`}>
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
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No brokers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Broker listings are stored in Supabase. Changes may take a few seconds to reflect in the frontend.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 