"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, X, Minimize2, Maximize2, MessagesSquare, Sparkles, ExternalLink, Plus, Search } from "lucide-react";
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
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ReactMarkdown from 'react-markdown';

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

// Define suggested queries
const SUGGESTED_QUERIES: SuggestedQuery[] = [
  { 
    text: "What are the fees at IBKR?", 
    icon: <span className="text-amber-500 text-xl">💰</span> 
  },
  { 
    text: "Does Lightyear pay interest on uninvested cash?", 
    icon: <span className="text-amber-500 text-xl">⚡</span> 
  },
  { 
    text: "What is the best broker for beginners?", 
    icon: <span className="text-amber-500 text-xl">🚀</span> 
  }
];

// Additional topics for discovery
const DISCOVERY_TOPICS = [
  "Best forex brokers",
  "Trading platforms comparison",
  "Forex trading strategies",
  "Market analysis tools",
  "Broker verification tips",
  "Investment planning"
];

export function RokuAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [messages, setMessages] = useState<MessageWithTimestamp[]>([
    {
      role: "assistant",
      content: "👋 Hey there! I'm Roku, your personal AI assistant. Think of me as your shortcut to all things investing and brokerage. I'm here to help you find your perfect broker or answer any questions you have.",
      timestamp: new Date(),
      isMarkdown: false
    },
    {
      role: "system",
      content: "How can I help you today? You can ask me anything or check out these popular questions:",
      timestamp: new Date(),
      isMarkdown: false
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingDots, setThinkingDots] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [viewMode, setViewMode] = useState<"chat" | "discover">("chat");
  const theme = "dark"; // Hardcoded dark theme

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
        content: "👋 Hey there! I'm Roku, your personal AI assistant. Think of me as your shortcut to all things investing and brokerage. I'm here to help you find your perfect broker or answer any questions you have.",
        timestamp: new Date(),
        isMarkdown: false
      },
      {
        role: "system",
        content: "How can I help you today? You can ask me anything or check out these popular questions:",
        timestamp: new Date(),
        isMarkdown: false
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
          <Button
            onClick={() => setIsOpen(true)}
            size="icon"
            className="h-[72px] w-[72px] rounded-lg shadow-lg hover:shadow-xl transition-all bg-purple-500/90 dark:bg-purple-600/90 border border-purple-400/20 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <span className="text-2xl font-bold text-white">AI</span>
            <span className="text-xs text-white/80 mt-1">Roku</span>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold animate-bounce-in animate-pulse-notification">
                {notificationCount}
              </span>
            )}
          </Button>
          
          {notificationCount > 0 && (
            <div className="absolute right-full mr-3 bottom-3/4 transform translate-y-1/2 bg-card border border-border rounded-lg shadow-lg p-3 w-[180px] h-[180px] flex items-center justify-center text-sm animate-fade-in">
              <p className="text-center">Hey there! Not sure where to start? I can help you find the best broker, compare options, or answer any questions.</p>
              <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-card border-t border-r border-border rotate-45"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-end">
          {isMinimized ? (
            <Card className="w-[350px] shadow-xl mb-2 overflow-hidden">
              <div className="p-3 flex items-center justify-between bg-purple-600 text-white">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 bg-gradient-to-br from-purple-400 to-indigo-600">
                    <Bot className="h-3 w-3 text-white" />
                  </Avatar>
                  <span className="text-sm font-medium">ROKU AI</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={toggleMinimized} className="h-6 w-6 text-white hover:bg-purple-700">
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6 text-white hover:bg-purple-700">
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
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-400 to-indigo-600">
                        <Bot className="h-4 w-4 text-white" />
                      </Avatar>
                      <CardTitle className="text-base flex items-center">
                        Roku AI <span className="ml-1 text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">BETA</span>
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm mt-3">
                      Meet Roku, your AI guide to investing. Backed by BrokerChooser's trusted expertise, Roku uses advanced AI to provide personalized help and answers.
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
                                  <div className="flex flex-wrap gap-3 mt-3">
                                    {SUGGESTED_QUERIES.map((query, i) => (
                                      <div 
                                        key={i}
                                        className="flex-1 min-w-[150px] bg-background border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors"
                                        onClick={() => handleSuggestedQuery(query.text)}
                                      >
                                        <div className="mb-1">{query.icon}</div>
                                        <div className="text-sm font-medium">{query.text}</div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                            {/* Thinking indicator - shows before AI response comes in */}
                            {isThinking && (
                              <div className="flex w-full max-w-full flex-col gap-2 rounded-lg px-4 py-3 text-sm bg-card text-card-foreground border animate-fade-in">
                                <div className="flex items-center">
                                  <div className="bg-muted p-2 rounded-full mr-2">
                                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                                  </div>
                                  <p className="text-muted-foreground">
                                    Thinking
                                    <span className="inline-block w-6 text-center">
                                      {".".repeat(thinkingDots)}
                                    </span>
                                  </p>
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
                        <div className="w-full text-xs text-center mt-2 text-muted-foreground">
                          Powered by AI with data from our extensive broker database.
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