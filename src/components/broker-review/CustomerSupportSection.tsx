'use client';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CustomerSupportProps {
  broker: any;
}

export function CustomerSupportSection({ broker }: CustomerSupportProps) {
  const supportChannels = [
    {
      name: "Live Chat",
      availability: "24/7",
      responseTime: "< 1 minute",
      icon: (
        <svg
          className="w-6 h-6"
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
      )
    },
    {
      name: "Email Support",
      availability: "24/7",
      responseTime: "< 24 hours",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      )
    },
    {
      name: "Phone Support",
      availability: "Business hours",
      responseTime: "< 5 minutes",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      )
    }
  ];

  // Ensure languages is always an array
  let languages;
  try {
    if (Array.isArray(broker?.support_languages)) {
      languages = broker.support_languages;
    } else if (typeof broker?.support_languages === 'string') {
      languages = broker.support_languages.split(',').map(lang => lang.trim());
    } else {
      languages = [
        "English",
        "Spanish",
        "German",
        "French",
        "Italian",
        "Arabic"
      ];
    }
  } catch (error) {
    console.error('Error processing languages:', error);
    languages = [
      "English",
      "Spanish",
      "German",
      "French",
      "Italian",
      "Arabic"
    ];
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Support</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {supportChannels.map((channel) => (
          <Card key={channel.name} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                {channel.icon}
              </div>
              <h3 className="text-lg font-semibold">{channel.name}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Availability:</span>
                <span>{channel.availability}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Response Time:</span>
                <span>{channel.responseTime}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Language Support</h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <Badge key={language} variant="secondary">
                {language}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Self-Help Resources</h3>
          <ul className="space-y-2">
            {[
              "Knowledge Base",
              "Video Tutorials",
              "Trading Guides",
              "FAQ Section",
              "Community Forum"
            ].map((resource) => (
              <li key={resource} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
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
                {resource}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Support Quality Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {broker.support_satisfaction || "95%"}
            </div>
            <div className="text-sm text-muted-foreground">
              Customer Satisfaction
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {broker.support_response_time || "< 2min"}
            </div>
            <div className="text-sm text-muted-foreground">
              Average Response Time
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {broker.support_languages_count || languages.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Languages Supported
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">
              Support Availability
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}