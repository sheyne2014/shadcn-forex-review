// Verify that reviews were successfully added
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyReviews() {
  console.log('Verifying reviews in the database...');
  
  try {
    // Get total review count
    const { data: totalCount, error: countError } = await supabase
      .from('reviews')
      .select('count');
    
    if (countError) {
      console.error('Error getting total review count:', countError);
      return;
    }
    
    console.log(`Total reviews in database: ${totalCount[0].count}`);
    
    // Sample review data from a few brokers
    const sampleBrokers = ['XM', 'eToro', 'Binance', 'Fidelity', 'Robinhood'];
    
    for (const brokerName of sampleBrokers) {
      console.log(`\nChecking reviews for ${brokerName}...`);
      
      // First get the broker ID
      const { data: broker, error: brokerError } = await supabase
        .from('brokers')
        .select('id')
        .ilike('name', brokerName)
        .single();
      
      if (brokerError) {
        console.error(`Error finding broker ${brokerName}:`, brokerError);
        continue;
      }
      
      // Get reviews for this broker
      const { data: reviews, error: reviewError } = await supabase
        .from('reviews')
        .select('*')
        .eq('broker_id', broker.id);
      
      if (reviewError) {
        console.error(`Error getting reviews for ${brokerName}:`, reviewError);
        continue;
      }
      
      console.log(`Found ${reviews.length} reviews for ${brokerName}`);
      
      if (reviews.length > 0) {
        // Display 2 sample reviews
        console.log('Sample reviews:');
        for (let i = 0; i < Math.min(2, reviews.length); i++) {
          const review = reviews[i];
          console.log(`- Rating: ${review.rating} | ${review.comment.substring(0, 100)}...`);
        }
        
        // Calculate average rating
        const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        console.log(`Average rating: ${avgRating.toFixed(1)} / 5`);
      }
    }
    
    // Check distribution of ratings
    console.log('\nChecking distribution of ratings...');
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    const { data: allRatings, error: ratingsError } = await supabase
      .from('reviews')
      .select('rating');
    
    if (ratingsError) {
      console.error('Error getting ratings:', ratingsError);
    } else {
      allRatings.forEach(r => {
        if (ratingCounts[r.rating] !== undefined) {
          ratingCounts[r.rating]++;
        }
      });
      
      console.log('Rating distribution:');
      for (const [rating, count] of Object.entries(ratingCounts)) {
        const percentage = ((count / allRatings.length) * 100).toFixed(1);
        console.log(`${rating} star: ${count} reviews (${percentage}%)`);
      }
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

verifyReviews()
  .then(() => {
    console.log('\nVerification completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 