"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, X, Minimize2, Maximize2, ExternalLink, Plus, Search, TrendingUp, Calculator, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import ReactMarkdown from 'react-markdown';
import { RokuAvatar, RokuFAB } from "@/components/ui/roku-avatar";

// Define message types
interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface MessageWithTimestamp extends ChatMessage {
  timestamp: Date;
  isMarkdown?: boolean;
}

// Define suggested queries with icons
interface SuggestedQuery {
  text: string;
  icon: React.ReactNode;
}

// Enhanced suggested queries with professional icons
const SUGGESTED_QUERIES: SuggestedQuery[] = [
  {
    text: "What&rsquo;s the best broker for beginners?",
    icon: <Users className="h-4 w-4 text-blue-500" />
  },
  {
    text: "Compare eToro vs XM",
    icon: <TrendingUp className="h-4 w-4 text-green-500" />
  },
  {
    text: "Show me low-cost brokers",
    icon: <Calculator className="h-4 w-4 text-purple-500" />
  },
  {
    text: "Are these brokers regulated?",
    icon: <Shield className="h-4 w-4 text-orange-500" />
  }
];

// Enhanced discovery topics with categories
const DISCOVERY_TOPICS = [
  "Best forex brokers 2024",
  "Crypto trading platforms",
  "Mobile trading apps",
  "Demo account brokers",
  "High leverage brokers",
  "ECN vs STP brokers",
  "Islamic trading accounts",
  "Copy trading platforms"
];

export function RokuAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [messages, setMessages] = useState<MessageWithTimestamp[]>([
    {
      role: "assistant",
      content: "👋 **Welcome! I'm Roku, your intelligent trading assistant.**\n\nI'm here to help you navigate the world of forex and trading with confidence. Whether you're looking for the perfect broker, need trading guidance, or want to compare platforms, I've got you covered with expert insights and personalized recommendations.",
      timestamp: new Date(),
      isMarkdown: true
    },
    {
      role: "system",
      content: "**What can I help you with today?** Try asking me about brokers, trading strategies, or check out these popular questions:",
      timestamp: new Date(),
      isMarkdown: true
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingDots, setThinkingDots] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [viewMode, setViewMode] = useState<"chat" | "discover">("chat");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Clear notification when opening the chat
  useEffect(() => {
    if (isOpen) {
      setNotificationCount(0);
    }
  }, [isOpen]);

  // Thinking animation effect
  useEffect(() => {
    let thinkingInterval: NodeJS.Timeout;
    if (isThinking) {
      thinkingInterval = setInterval(() => {
        setThinkingDots(prev => prev < 3 ? prev + 1 : 1);
      }, 500);
    }

    return () => {
      if (thinkingInterval) clearInterval(thinkingInterval);
    };
  }, [isThinking]);

  // Handle suggested query click
  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
    setShowSuggestions(false);
    handleSend(query);
  };

  const handleSend = async (manualQuery?: string) => {
    const query = manualQuery || inputValue;
    if (!query.trim()) return;

    // Hide suggestions after first query
    setShowSuggestions(false);

    // Add user message
    const userMessage: MessageWithTimestamp = {
      role: "user",
      content: query.trim(),
      timestamp: new Date(),
      isMarkdown: false
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsThinking(true);

    // Add thinking delay to simulate more thoughtful responses
    const thinkingTime = Math.max(1500, Math.min(query.length * 100, 4000));

    try {
      // Send the message to API route
      const response = await fetch("/api/roku-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages
            .filter(m => m.role !== "system") // Filter out system messages
            .map(m => ({
              role: m.role === "system" ? "assistant" : m.role,
              content: m.content
            })),
          searchWeb: true, // Enable web search
          restrictToSite: true, // Restrict to the site
          siteUrl: window.location.hostname, // Get the current site URL
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();

      // Add a delay to simulate thinking
      await new Promise(resolve => setTimeout(resolve, thinkingTime));

      // Add AI response with markdown support
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
          isMarkdown: true
        },
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Add a delay to simulate thinking
      await new Promise(resolve => setTimeout(resolve, thinkingTime));

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble processing your request right now. Please try again later.",
          timestamp: new Date(),
          isMarkdown: false
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  // Toggle between minimized and full view
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  // Reset chat to initial state
  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "👋 **Welcome! I'm Roku, your intelligent trading assistant.**\n\nI'm here to help you navigate the world of forex and trading with confidence. Whether you're looking for the perfect broker, need trading guidance, or want to compare platforms, I've got you covered with expert insights and personalized recommendations.",
        timestamp: new Date(),
        isMarkdown: true
      },
      {
        role: "system",
        content: "**What can I help you with today?** Try asking me about brokers, trading strategies, or check out these popular questions:",
        timestamp: new Date(),
        isMarkdown: true
      }
    ]);
    setShowSuggestions(true);
    setViewMode("chat");
  };

  // Render markdown content with special handling for links
  const renderMarkdown = (content: string) => {
    return (
      <ReactMarkdown
        components={{
          a: ({ ...props }) => (
            <span className="inline-flex items-center">
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline decoration-dotted"
              >
                {props.children}
              </a>
              <ExternalLink className="h-3 w-3 ml-1" />
            </span>
          ),
          p: ({ ...props }) => (
            <p {...props} className="mb-2" />
          ),
          ul: ({ ...props }) => (
            <ul {...props} className="list-disc pl-4 mb-2" />
          ),
          li: ({ ...props }) => (
            <li {...props} className="mb-1" />
          ),
          // Ensure proper handling of all markdown elements
          h3: ({ ...props }) => (
            <h3 {...props} className="text-base font-medium mt-3 mb-2" />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  // Switch to discovery mode
  const toggleDiscoverMode = () => {
    setViewMode(viewMode === "chat" ? "discover" : "chat");
  };

  // Start a new chat
  const startNewChat = () => {
    resetChat();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <div className="relative">
          <RokuFAB
            onClick={() => setIsOpen(true)}
            notificationCount={notificationCount}
          />

          {notificationCount > 0 && (
            <div className="absolute right-full mr-4 bottom-1/2 transform translate-y-1/2 bg-card border border-border rounded-xl shadow-xl p-4 w-[220px] animate-fade-in">
              <div className="flex items-start gap-3">
                <RokuAvatar size="sm" variant="professional" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">👋 Hi there!</p>
                  <p className="text-xs text-muted-foreground">
                    Need help finding the perfect broker or have trading questions? I'm here to guide you!
                  </p>
                </div>
              </div>
              <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-card border-t border-r border-border rotate-45"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-end">
          {isMinimized ? (
            <Card className="w-[350px] shadow-xl mb-2 overflow-hidden">
              <div className="p-3 flex items-center justify-between bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white">
                <div className="flex items-center gap-3">
                  <RokuAvatar size="sm" variant="professional" />
                  <div>
                    <span className="text-sm font-bold">ROKU AI</span>
                    <p className="text-xs text-white/80">Your Trading Assistant</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={toggleMinimized} className="h-6 w-6 text-white hover:bg-white/20">
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6 text-white hover:bg-white/20">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="flex flex-col w-[95vw] md:w-[90vw] lg:w-[80vw] xl:w-[1080px] max-h-[90vh] shadow-xl animate-fade-in bg-background">
              <div className="flex flex-col md:flex-row h-[600px] md:h-[700px]">
                {/* Left sidebar */}
                <Card className="w-full md:w-[250px] h-auto md:h-full flex flex-col border-r bg-background">
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                      <RokuAvatar size="lg" variant="professional" />
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                            ROKU AI
                          </span>
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full font-medium">
                            BETA
                          </span>
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your Trading Assistant
                        </p>
                      </div>
                    </div>
                    <CardDescription className="text-sm mt-3 leading-relaxed">
                      Powered by advanced AI and backed by comprehensive broker data, I provide personalized trading guidance and expert recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 flex-1 bg-background">
                    <Button
                      variant="outline"
                      className="w-full justify-start mb-2"
                      onClick={startNewChat}
                    >
                      <Plus className="h-4 w-4 mr-2" /> New chat
                    </Button>
                    <Button
                      variant={viewMode === "discover" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={toggleDiscoverMode}
                    >
                      <Search className="h-4 w-4 mr-2" /> Discover
                    </Button>
                  </CardContent>
                </Card>

                {/* Main content area */}
                <Card className="w-full md:flex-1 h-full flex flex-col bg-background">
                  {viewMode === "chat" ? (
                    <>
                      <CardHeader className="p-4 border-b bg-background">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <CardTitle className="text-base">Chat with Roku AI</CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={toggleMinimized} className="h-8 w-8 md:flex hidden">
                              <Minimize2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 p-0 overflow-hidden bg-background" ref={chatContainerRef}>
                        <ScrollArea className="h-full p-4">
                          <div className="space-y-4">
                            {messages.map((message, index) => (
                              <div
                                key={index}
                                className={cn(
                                  "flex flex-col gap-2 rounded-lg px-4 py-3 text-sm animate-fade-in",
                                  message.role === "user"
                                    ? "ml-auto bg-primary text-primary-foreground w-max max-w-[80%]"
                                    : message.role === "system"
                                    ? "bg-muted/30 w-full"
                                    : "bg-card text-card-foreground w-full border"
                                )}
                              >
                                {message.isMarkdown ? (
                                  <div className="prose prose-sm dark:prose-invert max-w-none overflow-hidden">
                                    {renderMarkdown(message.content)}
                                  </div>
                                ) : (
                                  <div>{message.content}</div>
                                )}

                                {/* Show suggested queries after system message */}
                                {message.role === "system" && showSuggestions && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                    {SUGGESTED_QUERIES.map((query, i) => (
                                      <div
                                        key={i}
                                        className="group bg-gradient-to-br from-background to-muted/30 border rounded-xl p-4 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                                        onClick={() => handleSuggestedQuery(query.text)}
                                      >
                                        <div className="flex items-start gap-3">
                                          <div className="p-2 rounded-lg bg-background border group-hover:border-primary/30 transition-colors">
                                            {query.icon}
                                          </div>
                                          <div className="flex-1">
                                            <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                              {query.text}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                            {/* Enhanced thinking indicator */}
                            {isThinking && (
                              <div className="flex w-full max-w-full flex-col gap-2 rounded-xl px-4 py-4 text-sm bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200/50 dark:border-blue-800/50 animate-fade-in">
                                <div className="flex items-center gap-3">
                                  <RokuAvatar size="sm" variant="animated" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                      Analyzing your request
                                      <span className="inline-block w-8 text-center">
                                        {".".repeat(thinkingDots)}
                                      </span>
                                    </p>
                                    <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">
                                      Searching through broker data and market insights
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            {/* Loading indicator - simple dots */}
                            {isLoading && !isThinking && (
                              <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-card text-card-foreground border animate-fade-in">
                                <div className="flex space-x-1">
                                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                </div>
                              </div>
                            )}
                            <div ref={messagesEndRef} />
                          </div>

                          {showSuggestions && (
                            <div className="mt-8 border-t pt-4">
                              <h3 className="text-sm font-medium mb-3">Discover more topics</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {DISCOVERY_TOPICS.slice(0, 6).map((topic, i) => (
                                  <Button
                                    key={i}
                                    variant="outline"
                                    size="sm"
                                    className="justify-start text-xs"
                                    onClick={() => handleSuggestedQuery(topic)}
                                  >
                                    {topic}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </ScrollArea>
                      </CardContent>

                      <CardFooter className="p-3 border-t bg-background">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                          }}
                          className="flex w-full items-center space-x-2"
                        >
                          <Input
                            ref={inputRef}
                            type="text"
                            placeholder="How can I help? I'm all ears!"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1"
                            disabled={isLoading}
                          />
                          <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || !inputValue.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                        <div className="w-full text-xs text-center mt-3 text-muted-foreground">
                          <div className="flex items-center justify-center gap-2">
                            <RokuAvatar size="sm" variant="professional" />
                            <span>Powered by advanced AI • Backed by comprehensive broker data</span>
                          </div>
                        </div>
                      </CardFooter>
                    </>
                  ) : (
                    // Discovery Mode
                    <>
                      <CardHeader className="p-4 border-b bg-background">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">Discover Topics</CardTitle>
                          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardDescription>Explore popular investing and trading topics</CardDescription>
                      </CardHeader>

                      <CardContent className="flex-1 p-4 overflow-auto bg-background">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <h3 className="font-medium mb-3">Popular Broker Questions</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {SUGGESTED_QUERIES.map((query, i) => (
                                <Button
                                  key={i}
                                  variant="outline"
                                  className="justify-start h-auto py-3 px-4"
                                  onClick={() => {
                                    setViewMode("chat");
                                    handleSuggestedQuery(query.text);
                                  }}
                                >
                                  <div className="mr-3">{query.icon}</div>
                                  <span>{query.text}</span>
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium mb-3">Trading Topics</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {DISCOVERY_TOPICS.map((topic, i) => (
                                <Button
                                  key={i}
                                  variant="outline"
                                  className="justify-start"
                                  onClick={() => {
                                    setViewMode("chat");
                                    handleSuggestedQuery(topic);
                                  }}
                                >
                                  <Search className="h-4 w-4 mr-2" />
                                  {topic}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}