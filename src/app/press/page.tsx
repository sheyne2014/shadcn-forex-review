import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Download, Mail, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Press & Media | BrokerAnalysis",
  description: "Press releases, media assets, and contact information for media inquiries about BrokerAnalysis and our trading broker comparison platform.",
};

export default function PressPage() {
  return (
    <main className="container max-w-6xl py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Press & Media</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Resources for journalists, bloggers, and media professionals covering BrokerAnalysis
          and the trading industry.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-12">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Media Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              For press inquiries, interview requests, and other media-related questions,
              please contact our media relations team.
            </p>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:press@brokeranalysis.com" className="text-primary hover:underline">
                press@brokeranalysis.com
              </a>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Press Releases</h2>
      <div className="space-y-6 mb-12">
        {[
          {
            title: "BrokerAnalysis Launches New Comparison Tool for Forex Traders",
            date: "May 15, 2025",
            summary: "BrokerAnalysis introduces a comprehensive broker comparison tool that helps forex traders find the best platform for their trading needs based on fees, features, and user reviews.",
          },
          {
            title: "BrokerAnalysis Report: 30% of Traders Prioritize Mobile Trading Features",
            date: "April 20, 2025",
            summary: "A new study by BrokerAnalysis reveals that mobile trading capabilities are now among the top three priorities for nearly a third of active traders.",
          },
          {
            title: "BrokerAnalysis Expands Coverage to Include Cryptocurrency Brokers",
            date: "March 5, 2025",
            summary: "BrokerAnalysis adds comprehensive reviews and comparisons of cryptocurrency brokers to its platform, responding to growing demand from traders.",
          },
        ].map((release, index) => (
          <div key={index} className="border rounded-lg p-6">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{release.date}</span>
            </div>
            <h3 className="text-xl font-medium mb-3">{release.title}</h3>
            <p className="text-muted-foreground mb-4">{release.summary}</p>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              Read Full Release
            </Button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Media Kit</h2>
      <div className="border-2 rounded-lg p-6 mb-12">
        <p className="mb-4">
          Download our media kit for logos, executive photos, product screenshots, and other assets.
        </p>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Media Kit (ZIP)
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Coverage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            source: "Financial Times",
            title: "How Comparison Sites Are Changing the Broker Selection Process",
            date: "June 2, 2025",
          },
          {
            source: "Bloomberg",
            title: "BrokerAnalysis Data Shows Shift in Trader Preferences",
            date: "May 17, 2025",
          },
          {
            source: "Investopedia",
            title: "Top 10 Forex Broker Comparison Tools in 2025",
            date: "April 25, 2025",
          },
          {
            source: "CNBC",
            title: "New Tools Help Traders Navigate Complex Broker Landscape",
            date: "March 30, 2025",
          },
        ].map((article, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="text-sm text-muted-foreground">{article.source}</div>
              <CardTitle className="text-lg">{article.title}</CardTitle>
            </CardHeader>
            <CardFooter className="border-t pt-4 flex justify-between items-center">
              <div className="text-xs text-muted-foreground">{article.date}</div>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ExternalLink className="h-3.5 w-3.5" />
                Read Article
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
} 