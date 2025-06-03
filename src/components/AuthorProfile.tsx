"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface AuthorProfileProps {
  name: string;
  bio?: string;
  image?: string;
  title?: string;
}

export function AuthorProfile({ name, bio, image, title }: AuthorProfileProps) {
  // Convert name to initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="my-8 overflow-hidden border border-border bg-card/50">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-16 w-16 border">
            {image ? (
              <AvatarImage src={image} alt={name} />
            ) : (
              <AvatarFallback className="text-lg font-medium">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            {title && <p className="text-sm text-muted-foreground">{title}</p>}
            {bio && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {bio}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 