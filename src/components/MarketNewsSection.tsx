"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from 'lucide-react';

type NewsItem = {
  title: string;
  url: string;
  source: string;
  publishedDate?: string;
  snippet?: string;
  imageUrl?: string;
};

export function MarketNewsSection() {
  const [activeCategory, setActiveCategory] = useState('forex');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`/api/market-news?category=${activeCategory}&limit=4`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const newsData = await response.json();
        setNews(newsData);
      } catch (err) {
        console.error('Error fetching market news:', err);
        setError('Failed to load market news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Market News & Insights</h2>
        
        <Tabs defaultValue="forex" className="w-full" onValueChange={handleCategoryChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
          </TabsList>
          
          {['forex', 'crypto', 'stocks', 'commodities'].map(category => (
            <TabsContent key={category} value={category}>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="h-[280px]">
                      <CardHeader>
                        <Skeleton className="h-5 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-20 w-full" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-4 w-1/3" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center p-6 bg-red-50 text-red-600 rounded-md">
                  {error}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {news.map((item, index) => (
                    <Card key={index} className="h-full flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                        <CardDescription>{item.source}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="line-clamp-4 text-sm text-muted-foreground">{item.snippet}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          {item.publishedDate || 'Recent'}
                        </div>
                        <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          Read <ExternalLink size={14} />
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
} 