"use client";

import { Button } from "@/components/ui/button";

export function LiveChatButton() {
  const handleLiveChatClick = () => {
    // Live chat functionality would go here
    alert("Live chat functionality coming soon!");
  };

  return (
    <Button 
      size="sm" 
      className="w-full" 
      onClick={handleLiveChatClick}
    >
      Start Live Chat
    </Button>
  );
}
