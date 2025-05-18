"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, X, Minimize2, Maximize2, MessagesSquare, Sparkles, ExternalLink } from "lucide-react";
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

// Define suggested queries
const SUGGESTED_QUERIES = [
  "What are the best forex brokers for beginners?",
  "How do I compare different brokers?",
  "What trading platforms are recommended?",
  "Tell me about forex trading strategies",
  "What are the latest market trends?",
  "How do I verify if a broker is legitimate?"
];

export function RokuAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<MessageWithTimestamp[]>([
    {
      role: "assistant",
      content: "👋 Hello! I'm ROKU AI, your friendly assistant for all things related to forex trading, brokers, and market analysis.",
      timestamp: new Date(),
      isMarkdown: false
    },
    {
      role: "system",
      content: "Here are some things you can ask me about:",
      timestamp: new Date(),
      isMarkdown: false
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

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
            }))
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();

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
        content: "👋 Hello! I'm ROKU AI, your friendly assistant for all things related to forex trading, brokers, and market analysis.",
        timestamp: new Date(),
        isMarkdown: false
      },
      {
        role: "system",
        content: "Here are some things you can ask me about:",
        timestamp: new Date(),
        isMarkdown: false
      }
    ]);
    setShowSuggestions(true);
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
                className="text-gray-300 hover:text-white underline decoration-dotted"
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all bg-gray-700 hover:bg-gray-600"
              >
                <MessagesSquare className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Ask ROKU AI for help</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div className="flex flex-col items-end">
          {isMinimized ? (
            <Card className="w-[350px] shadow-xl mb-2 overflow-hidden">
              <div className="p-3 flex items-center justify-between bg-gray-700 text-gray-50">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 bg-gray-200">
                    <Bot className="h-3 w-3 text-gray-700" />
                  </Avatar>
                  <span className="text-sm font-medium">ROKU AI</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={toggleMinimized} className="h-6 w-6 text-gray-50 hover:bg-gray-600">
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6 text-gray-50 hover:bg-gray-600">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="w-[400px] h-[550px] shadow-xl flex flex-col">
              <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 border-b bg-gray-700 text-gray-50">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-gray-200">
                    <Bot className="h-4 w-4 text-gray-700" />
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">ROKU AI Assistant</CardTitle>
                    <CardDescription className="text-gray-300/80 text-xs">Your forex trading knowledge companion</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={resetChat} className="h-8 w-8 text-gray-50 hover:bg-gray-600">
                          <Sparkles className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Start a new conversation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={toggleMinimized} className="h-8 w-8 text-gray-50 hover:bg-gray-600">
                          <Minimize2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Minimize</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-gray-50 hover:bg-gray-600">
                          <X className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Close</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 overflow-hidden" ref={chatContainerRef}>
                <ScrollArea className="h-full px-4 py-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                          message.role === "user"
                            ? "ml-auto bg-gray-700 text-gray-50 w-max max-w-[80%]"
                            : message.role === "system"
                            ? "bg-muted/50 w-full"
                            : "bg-muted w-max max-w-[80%]"
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
                          <div className="flex flex-wrap gap-2 mt-2">
                            {SUGGESTED_QUERIES.map((query, i) => (
                              <Button
                                key={i}
                                variant="outline"
                                size="sm"
                                className="text-xs py-1 h-auto"
                                onClick={() => handleSuggestedQuery(query)}
                              >
                                {query}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce"></div>
                          <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-3 border-t">
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
                    placeholder="Ask me anything about forex trading..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="submit"
                          size="icon"
                          disabled={isLoading || !inputValue.trim()}
                          className="bg-gray-700 hover:bg-gray-600"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>Send message</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </form>
              </CardFooter>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}