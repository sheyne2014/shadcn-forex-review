import { Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrokerReview } from "@/lib/supabase/broker-client";

interface BrokerReviewListProps {
  reviews: BrokerReview[];
  brokerName: string;
}

// Helper function to format a date string
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Helper function to get the rating distribution
const getRatingDistribution = (reviews: BrokerReview[]) => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach(review => {
    if (review.rating && review.rating >= 1 && review.rating <= 5) {
      distribution[review.rating as keyof typeof distribution]++;
    }
  });
  
  const total = reviews.length;
  
  return {
    distribution,
    percentages: {
      5: total ? Math.round((distribution[5] / total) * 100) : 0,
      4: total ? Math.round((distribution[4] / total) * 100) : 0,
      3: total ? Math.round((distribution[3] / total) * 100) : 0,
      2: total ? Math.round((distribution[2] / total) * 100) : 0,
      1: total ? Math.round((distribution[1] / total) * 100) : 0
    }
  };
};

export function BrokerReviewList({ reviews, brokerName }: BrokerReviewListProps) {
  const { distribution, percentages } = getRatingDistribution(reviews);
  
  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  const averageRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : "0.0";
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>User Reviews</CardTitle>
              <CardDescription>
                What traders are saying about {brokerName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-5">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{review.user_name || "Anonymous User"}</div>
                        <div className="flex items-center">
                          <div className="font-medium mr-2">{review.rating || 0}/5</div>
                          <Star className="h-4 w-4 fill-primary" />
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{review.comment || "No comment provided."}</p>
                      <div className="text-xs text-muted-foreground">
                        {review.created_at ? formatDate(review.created_at) : "No date"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No reviews yet for {brokerName}.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Rating Summary</CardTitle>
              <CardDescription>
                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col items-center mb-6">
                <div className="text-4xl font-bold flex items-center">
                  {averageRating} <Star className="h-6 w-6 ml-1 fill-primary" />
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  Average user rating
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-16 text-sm">5 stars</div>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${percentages[5]}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-right">{distribution[5]}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 text-sm">4 stars</div>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-400 rounded-full" 
                      style={{ width: `${percentages[4]}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-right">{distribution[4]}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 text-sm">3 stars</div>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ width: `${percentages[3]}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-right">{distribution[3]}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 text-sm">2 stars</div>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-400 rounded-full" 
                      style={{ width: `${percentages[2]}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-right">{distribution[2]}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 text-sm">1 star</div>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full" 
                      style={{ width: `${percentages[1]}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-right">{distribution[1]}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 