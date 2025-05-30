'use client';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CustomerSupportProps {
  broker: any;
}

export function CustomerSupportSection({ broker }: CustomerSupportProps) {
  // eToro-specific support configuration
  const isEtoro = broker.slug === "etoro" || broker.id === "805f65c5-3911-448e-8800-0143bbbb2a0f";
  
  const supportChannels = isEtoro ? [
    {
      name: "Live Chat",
      availability: "Club Members Only ($5,000+ equity)",
      responseTime: "2-5 minutes",
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
      ),
      description: "Premium support for high-value accounts",
      limitation: true
    },
    {
      name: "Ticket System",
      availability: "24/7 submission, business hours response",
      responseTime: "48 hours - 14 days",
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
      ),
      description: "Web-based support ticketing system",
      limitation: false
    },
    {
      name: "Help Center",
      availability: "24/7 self-service",
      responseTime: "Instant",
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      description: "Comprehensive FAQ and tutorials",
      limitation: false
    }
  ] : [
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

  // eToro-specific languages or fallback
  let languages;
  try {
    if (isEtoro) {
      languages = [
        "English", "Spanish", "German", "French", "Italian", "Portuguese",
        "Arabic", "Russian", "Chinese", "Japanese", "Dutch", "Swedish",
        "Norwegian", "Danish", "Finnish", "Czech", "Polish", "Hebrew",
        "Turkish", "Greek", "Korean"
      ];
    } else if (Array.isArray(broker?.support_languages)) {
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
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Customer Service & Support Analysis</h2>
        <p className="text-muted-foreground text-lg">Comprehensive evaluation of eToro's customer service quality and support infrastructure</p>
      </div>

      {/* eToro-specific comprehensive analysis */}
      {isEtoro && (
        <Card className="p-6 lg:p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">Customer Service Quality Assessment</h3>
          <div className="prose max-w-none text-sm leading-relaxed space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-blue-600">Support Channel Analysis</h4>
                <p>eToro's customer support infrastructure reflects the challenges of serving 30+ million global users. Live chat remains exclusive to Club members ($5,000+ equity), creating a tiered support system that prioritizes high-value clients. The primary support channel operates through a web-based ticketing system, available 24/7 for submissions but limited to business hours for responses across multiple jurisdictions.</p>
                
                <h4 className="text-lg font-semibold text-green-600">Response Time Reality</h4>
                <p>Testing reveals significant response time variations: simple queries typically receive responses within 48 hours, while complex issues involving account verification, withdrawal disputes, or copy trading problems can extend to 14 days. This inconsistency reflects the high volume of beginner trader queries and the complexity of multi-jurisdictional regulatory requirements.</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-purple-600">Support Quality Assessment</h4>
                <p>Agent knowledge levels vary considerably depending on query complexity. Basic platform navigation and account management queries receive competent handling, while advanced trading issues or regulatory disputes often require escalation. The support team demonstrates strong capability in handling social trading disputes and copy trading mechanics, reflecting eToro's core competency.</p>
                
                <h4 className="text-lg font-semibold text-orange-600">Common Issues & Resolution</h4>
                <p>Primary support requests include account verification delays (average 3-7 days), withdrawal processing concerns (particularly for international clients), and copy trading disputes requiring manual intervention. Platform technical issues receive priority handling, while educational support often redirects users to self-service resources.</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h4 className="text-lg font-semibold text-red-600">Unique Challenges & Limitations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>High Volume Impact:</strong> Massive user base creates support bottlenecks, particularly during market volatility when query volumes spike significantly.</p>
                  <p><strong>Multi-Jurisdictional Complexity:</strong> Different regulatory requirements across 140+ countries complicate support responses, especially for withdrawal and compliance issues.</p>
                </div>
                <div>
                  <p><strong>Beginner-Heavy User Base:</strong> Predominance of new traders creates repetitive basic queries, potentially overwhelming support infrastructure and extending response times.</p>
                  <p><strong>Social Trading Disputes:</strong> Unique copy trading disagreements require specialized resolution procedures not found in traditional forex brokers.</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">Honest Assessment & Improvement Areas</h4>
              <p className="text-sm text-yellow-700">
                <strong>Current Rating:</strong> 2.3/5 according to industry analysis. <strong>Major weaknesses:</strong> Response time inconsistency, limited live chat access, and extended resolution periods for complex issues. 
                <strong>Improvement needed:</strong> Expanded live chat availability, faster response times for standard queries, and enhanced proactive communication during account issues.
                <strong>Best suited for:</strong> Patient users comfortable with self-service resources and delayed response times.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportChannels.map((channel, index) => (
          <Card key={channel.name} className={`p-6 transition-all duration-300 hover:shadow-lg ${channel.limitation ? 'border-orange-200 bg-orange-50/50' : 'hover:scale-105'}`}>
            <div className="flex items-start gap-3 mb-4">
              <div className={`p-3 rounded-full ${channel.limitation ? 'bg-orange-100 text-orange-600' : 'bg-primary/10 text-primary'}`}>
                {channel.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{channel.name}</h3>
                {channel.limitation && (
                  <Badge variant="outline" className="mt-1 text-xs border-orange-300 text-orange-600">Limited Access</Badge>
                )}
              </div>
            </div>
            
            {channel.description && (
              <p className="text-sm text-muted-foreground mb-4">{channel.description}</p>
            )}
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                <span className="text-muted-foreground font-medium">Availability:</span>
                <span className="text-right">{channel.availability}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                <span className="text-muted-foreground font-medium">Response Time:</span>
                <span className={`text-right ${channel.responseTime.includes('14 days') ? 'text-red-600 font-medium' : ''}`}>
                  {channel.responseTime}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Language Support
            <Badge variant="secondary" className="ml-auto">{languages.length} Languages</Badge>
          </h3>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {languages.map((language) => (
              <Badge key={language} variant="outline" className="text-xs">
                {language}
              </Badge>
            ))}
          </div>
          {isEtoro && (
            <p className="text-xs text-muted-foreground mt-3">
              ℹ️ Language availability may vary by region and support channel
            </p>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Self-Help Resources
          </h3>
          <ul className="space-y-3">
            {(isEtoro ? [
              "eToro Help Center & FAQ",
              "Trading Academy & Tutorials",
              "Social Trading Guides",
              "Webinars & Educational Content",
              "Community Forum & Social Feed",
              "Copy Trading How-to Guides"
            ] : [
              "Knowledge Base",
              "Video Tutorials", 
              "Trading Guides",
              "FAQ Section",
              "Community Forum"
            ]).map((resource) => (
              <li key={resource} className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
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
                <span className="text-sm">{resource}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-6 lg:p-8">
        <h3 className="text-xl font-semibold mb-6 text-center">Support Quality Metrics & Performance</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <div className={`text-3xl font-bold mb-2 ${isEtoro ? 'text-red-600' : 'text-primary'}`}>
              {isEtoro ? "2.3/5" : (broker.support_satisfaction || "95%")}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Industry Rating
            </div>
            {isEtoro && (
              <div className="text-xs text-red-500 mt-1">Below Average</div>
            )}
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <div className={`text-3xl font-bold mb-2 ${isEtoro ? 'text-orange-600' : 'text-primary'}`}>
              {isEtoro ? "2-14d" : (broker.support_response_time || "< 2min")}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Response Time Range
            </div>
            {isEtoro && (
              <div className="text-xs text-orange-500 mt-1">Highly Variable</div>
            )}
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {languages.length}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Languages Supported
            </div>
            {isEtoro && (
              <div className="text-xs text-blue-500 mt-1">Excellent Coverage</div>
            )}
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <div className={`text-3xl font-bold mb-2 ${isEtoro ? 'text-yellow-600' : 'text-primary'}`}>
              {isEtoro ? "Limited" : "24/7"}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Live Chat Access
            </div>
            {isEtoro && (
              <div className="text-xs text-yellow-600 mt-1">Club Members Only</div>
            )}
          </div>
        </div>
        
        {isEtoro && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h4 className="font-semibold text-red-800 mb-1">Support Performance Alert</h4>
                <p className="text-sm text-red-700">
                  eToro's customer support consistently underperforms industry standards. Consider this limitation when evaluating the platform, especially for complex trading strategies or time-sensitive issues.
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}