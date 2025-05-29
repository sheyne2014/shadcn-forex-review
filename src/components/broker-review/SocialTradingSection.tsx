import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface SocialTradingProps {
  broker: any;
}

export function SocialTradingSection({ broker }: SocialTradingProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Social Trading Features</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Copy Trading</h3>
          </div>
          <p className="text-muted-foreground">
            Automatically copy the trades of successful traders. Perfect for beginners
            looking to learn from experienced traders.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Auto Copy</Badge>
            <Badge variant="outline">Risk Management</Badge>
            <Badge variant="outline">Performance Tracking</Badge>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Social Network</h3>
          </div>
          <p className="text-muted-foreground">
            Connect with other traders, share strategies, and discuss market trends
            in a vibrant trading community.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">News Feed</Badge>
            <Badge variant="outline">Market Analysis</Badge>
            <Badge variant="outline">Trade Sharing</Badge>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">
              {broker.social_traders_count || "1M+"}
            </div>
            <div className="text-sm text-muted-foreground">Active Social Traders</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">
              {broker.copy_trading_success_rate || "85%"}
            </div>
            <div className="text-sm text-muted-foreground">Copy Trading Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">
              {broker.popular_traders_count || "10K+"}
            </div>
            <div className="text-sm text-muted-foreground">Popular Traders</div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Getting Started</h3>
          <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
            <li>Create and verify your account</li>
            <li>Browse popular traders and their performance</li>
            <li>Select traders to copy based on your preferences</li>
            <li>Set your copy trading budget and risk parameters</li>
            <li>Monitor and adjust your copying settings</li>
          </ol>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Risk Management</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Set maximum investment per copied trader
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Stop-loss and take-profit controls
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Automated risk management tools
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}