// Mock implementation of MCP client
import { env } from "@/env";

// Type for chat history
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Mock MCP client class
export class MCP {
  private apiKey: string;

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey;
  }

  async run(model: string, options: any) {
    console.log(`Mock MCP client running ${model} with options:`, options);
    return {
      choices: [
        {
          message: {
            content: "This is a mock response from the MCP client. The actual integration is disabled in production builds."
          }
        }
      ]
    };
  }
}

// Create an instance of MCP client with our API key
export const mcpClient = new MCP({
  apiKey: env.MCP_API_KEY || "",
});

// Function to get answers from MCP based on context and user query
export async function getContextualAnswer(query: string, history: ChatMessage[], context: string) {
  try {
    const messages = [
      {
        role: "system",
        content: `You are ROKU AI, a helpful assistant for a forex trading and broker review website. 
        Use the provided context to answer questions about forex trading, brokers, and related topics.
        Always try to refer users to relevant links on the website when appropriate.
        If you don't know something, say so rather than making up information.
        
        Here's some context about the website and relevant content:
        ${context}`,
      },
      // Convert chat history to the format expected by the MCP API
      ...history.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      {
        role: "user",
        content: query,
      },
    ];

    const response = await mcpClient.run(
      "chat",
      {
        messages,
        max_tokens: 1000,
      }
    );

    // Extract and return the response content
    if (response.choices && response.choices[0]?.message?.content) {
      return response.choices[0].message.content;
    }
    
    throw new Error("No valid response from MCP API");
    
  } catch (error) {
    console.error("Error getting response from MCP:", error);
    return "I'm having trouble processing your request right now. Please try again later.";
  }
} 