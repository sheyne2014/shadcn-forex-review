// Check if reviews exist for eToro
async function checkReviews() {
  try {
    console.log('Checking reviews for eToro...');
    
    const response = await fetch('http://localhost:3001/api/reviews?broker_id=b1000000-0000-0000-0000-000000000010');
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Reviews fetched successfully!');
      console.log(`Found ${data.reviews.length} reviews`);
      
      if (data.reviews.length > 0) {
        console.log('\nReviews:');
        data.reviews.forEach((review, index) => {
          console.log(`${index + 1}. Rating: ${review.rating}/5`);
          console.log(`   Comment: ${review.comment}`);
          console.log(`   Created: ${review.created_at}`);
          console.log('');
        });
      } else {
        console.log('No reviews found yet.');
      }
    } else {
      console.error('❌ Error fetching reviews:', data);
    }

  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

checkReviews();
