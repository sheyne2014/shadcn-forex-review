"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star, ThumbsUp, MessageSquare, AlertTriangle, Shield, Flag, HelpCircle, Filter } from "lucide-react";

interface ReviewsSectionProps {
  broker: any;
  reviews?: {
    id: string;
    user_name?: string;
    rating: number;
    comment?: string;
    created_at: string;
    verified_purchase?: boolean;
    helpful_count?: number;
    platform?: string;
    trading_experience?: string;
    pros?: string;
    cons?: string;
  }[];
}

export function ReviewsSection({
  broker,
  reviews = []
}: ReviewsSectionProps) {
  const [filter, setFilter] = useState("all");

  // Calculate average rating if reviews are provided
  const calculateAverageRating = () => {
    if (reviews.length === 0) return broker.rating || 4.5;

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Calculate rating distribution if reviews are provided
  const calculateRatingDistribution = () => {
    if (reviews.length === 0) {
      // Default distribution if no reviews
      return {
        5: 70,
        4: 20,
        3: 5,
        2: 3,
        1: 2
      };
    }

    const distribution: {[key: number]: number} = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    reviews.forEach(review => {
      const rating = Math.round(review.rating);
      if (rating >= 1 && rating <= 5) {
        distribution[rating]++;
      }
    });

    // Convert to percentages
    const total = reviews.length;
    Object.keys(distribution).forEach(key => {
      const numKey = parseInt(key);
      distribution[numKey] = Math.round((distribution[numKey] / total) * 100);
    });

    return distribution;
  };

  const averageRating = calculateAverageRating();
  const ratingDistribution = calculateRatingDistribution();

  // Filter reviews based on selected filter
  const filteredReviews = () => {
    if (filter === "all") return reviews;
    if (filter === "positive") return reviews.filter(review => review.rating >= 4);
    if (filter === "negative") return reviews.filter(review => review.rating <= 2);
    if (filter === "neutral") return reviews.filter(review => review.rating === 3);
    if (filter === "verified") return reviews.filter(review => review.verified_purchase);
    return reviews;
  };

  // Generate stars for rating display
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`}
      />
    ));
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Default empty state message
  const emptyReviewsMessage = (
    <div className="text-center py-12">
      <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Be the first to share your experience with {broker.name}.
      </p>
      <Button>
        Write a Review
      </Button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>User Reviews</CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  className="text-sm bg-transparent border-none outline-none cursor-pointer"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Reviews</option>
                  <option value="positive">Positive Only</option>
                  <option value="negative">Negative Only</option>
                  <option value="neutral">Neutral Only</option>
                  <option value="verified">Verified Users</option>
                </select>
              </div>
            </div>
            <CardDescription>
              Trader experiences with {broker.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reviews.length === 0 ? (
              emptyReviewsMessage
            ) : (
              <div className="space-y-6">
                {filteredReviews().map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>{(review.user_name || 'User').charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center">
                            {review.user_name || "Anonymous Trader"}
                            {review.verified_purchase && (
                              <Badge variant="outline" className="ml-2 py-0 text-xs">
                                <Shield className="h-3 w-3 mr-1" /> Verified
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {review.trading_experience || "Forex Trader"}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatDate(review.created_at)}
                        </div>
                      </div>
                    </div>

                    {review.comment && (
                      <p className="text-sm mb-4">{review.comment}</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {review.pros && (
                        <div className="bg-muted/30 rounded-md p-3">
                          <div className="font-medium text-sm mb-1">Pros</div>
                          <p className="text-xs text-muted-foreground">{review.pros}</p>
                        </div>
                      )}
                      {review.cons && (
                        <div className="bg-muted/30 rounded-md p-3">
                          <div className="font-medium text-sm mb-1">Cons</div>
                          <p className="text-xs text-muted-foreground">{review.cons}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful {review.helpful_count ? `(${review.helpful_count})` : ""}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Comment
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Flag className="h-4 w-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            {reviews.length > 5 && (
              <Button variant="outline" className="w-full">
                View All Reviews
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>
              Share your experience with {broker.name} to help other traders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="rating" className="block mb-2">Your Rating</Label>
                <RadioGroup defaultValue="4" className="flex space-x-2" id="rating">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex flex-col items-center">
                      <RadioGroupItem
                        value={value.toString()}
                        id={`rating-${value}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`rating-${value}`}
                        className="cursor-pointer p-2 rounded-full hover:bg-muted"
                      >
                        <Star className={`h-8 w-8 hover:fill-amber-500 hover:text-amber-500 ${value <= 4 ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`} />
                      </Label>
                      <span className="text-xs">{value}</span>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="review" className="block mb-2">Your Review</Label>
                <Textarea
                  id="review"
                  placeholder={`What was your experience trading with ${broker.name}?`}
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pros" className="block mb-2">Pros</Label>
                  <Textarea
                    id="pros"
                    placeholder="What did you like about this broker?"
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="cons" className="block mb-2">Cons</Label>
                  <Textarea
                    id="cons"
                    placeholder="What could be improved?"
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Rating Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="text-5xl font-bold flex items-center mb-2">
                {averageRating} <Star className="h-8 w-8 ml-1 fill-amber-500 text-amber-500" />
              </div>
              <p className="text-muted-foreground text-sm">
                Based on {reviews.length || broker.review_count || 0} reviews
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-12 text-right text-sm">5 stars</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${ratingDistribution[5]}%` }}></div>
                </div>
                <div className="w-12 text-sm">{ratingDistribution[5]}%</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 text-right text-sm">4 stars</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: `${ratingDistribution[4]}%` }}></div>
                </div>
                <div className="w-12 text-sm">{ratingDistribution[4]}%</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 text-right text-sm">3 stars</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${ratingDistribution[3]}%` }}></div>
                </div>
                <div className="w-12 text-sm">{ratingDistribution[3]}%</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 text-right text-sm">2 stars</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: `${ratingDistribution[2]}%` }}></div>
                </div>
                <div className="w-12 text-sm">{ratingDistribution[2]}%</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 text-right text-sm">1 star</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${ratingDistribution[1]}%` }}></div>
                </div>
                <div className="w-12 text-sm">{ratingDistribution[1]}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verified Reviews</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-start mb-4">
              <Shield className="h-10 w-10 text-primary mt-1 mr-3" />
              <div>
                <h3 className="font-medium mb-1">Review Verification</h3>
                <p className="text-sm text-muted-foreground">
                  We verify users who have provided proof of trading with {broker.name} for higher reliability.
                </p>
              </div>
            </div>

            <div className="flex items-start mt-6">
              <AlertTriangle className="h-10 w-10 text-amber-500 mt-1 mr-3" />
              <div>
                <h3 className="font-medium mb-1">Report Suspicious Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  If you encounter suspicious reviews, please report them. We take review integrity seriously.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                  <span className="text-xs font-semibold text-primary">1</span>
                </div>
                <span>Share your personal trading experience</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                  <span className="text-xs font-semibold text-primary">2</span>
                </div>
                <span>Be specific with details (platforms, assets, fees)</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                  <span className="text-xs font-semibold text-primary">3</span>
                </div>
                <span>Mention both positives and negatives</span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                  <span className="text-xs font-semibold text-primary">4</span>
                </div>
                <span>Keep it civil and constructive</span>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 rounded-full p-1 mr-2 mt-0.5">
                  <span className="text-xs font-semibold text-red-600">✕</span>
                </div>
                <span>Avoid offensive language or personal attacks</span>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 rounded-full p-1 mr-2 mt-0.5">
                  <span className="text-xs font-semibold text-red-600">✕</span>
                </div>
                <span>Don't include contact information or links</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Badge component (simplified version for this context)
function Badge({ variant = "default", className = "", children, ...props }: any) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold
      ${variant === "default" ? "bg-primary text-primary-foreground" :
        variant === "secondary" ? "bg-secondary text-secondary-foreground" :
        variant === "destructive" ? "bg-destructive text-destructive-foreground" :
        "bg-transparent border-muted-foreground/30 text-foreground"}
      ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}