"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { supabaseBrokerClient } from "@/lib/supabase/broker-client";

interface BrokerReviewFormProps {
  brokerId: string;
  brokerName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BrokerReviewForm({ brokerId, brokerName, onSuccess, onCancel }: BrokerReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      // Check if Supabase client is available
      if (!supabaseBrokerClient) {
        throw new Error("Database connection is not available. Please try again later.");
      }

      // Create a new review in Supabase
      const { data, error } = await supabaseBrokerClient
        .from('reviews')
        .insert([
          {
            broker_id: brokerId,
            rating,
            comment,
            user_name: name || "Anonymous",
            user_email: email || undefined
          }
        ])
        .select();
      
      if (error) {
        throw error;
      }
      
      // Refresh the broker details to show the new review
      router.refresh();
      
      // Reset form
      setRating(0);
      setName("");
      setEmail("");
      setComment("");
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error("Error submitting review:", err);
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <CardDescription>
          Share your experience with {brokerName} to help other traders
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Your Rating</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 ? `${rating} stars` : "Select rating"}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Your Name (Optional)</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Your Email (Optional, will not be published)</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this broker..."
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          
          {error && (
            <div className="text-sm text-red-500">{error}</div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 