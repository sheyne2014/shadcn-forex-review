"use client";

import { Button } from "@/components/ui/button";
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail, 
  Link as LinkIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

export function SocialShareButtons({ 
  title, 
  url, 
  className 
}: SocialShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    // Set the URL when the component mounts in the browser
    setCurrentUrl(url || window.location.href);
  }, [url]);

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(
      () => {
        toast.success("Link copied to clipboard");
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy link");
      }
    );
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareUrls.twitter, "_blank")}
        title="Share on Twitter"
        className="h-9 w-9 rounded-full"
      >
        <Twitter className="h-4 w-4" />
        <span className="sr-only">Share on Twitter</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareUrls.facebook, "_blank")}
        title="Share on Facebook"
        className="h-9 w-9 rounded-full"
      >
        <Facebook className="h-4 w-4" />
        <span className="sr-only">Share on Facebook</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareUrls.linkedin, "_blank")}
        title="Share on LinkedIn"
        className="h-9 w-9 rounded-full"
      >
        <Linkedin className="h-4 w-4" />
        <span className="sr-only">Share on LinkedIn</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(shareUrls.email, "_blank")}
        title="Share via Email"
        className="h-9 w-9 rounded-full"
      >
        <Mail className="h-4 w-4" />
        <span className="sr-only">Share via Email</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        title="Copy Link"
        className="h-9 w-9 rounded-full"
      >
        <LinkIcon className="h-4 w-4" />
        <span className="sr-only">Copy Link</span>
      </Button>
    </div>
  );
} 