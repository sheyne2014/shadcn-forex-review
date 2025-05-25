// Test review submission API
const testReview = {
  broker_id: 'b1000000-0000-0000-0000-000000000010',
  rating: 5,
  comment: 'Great broker! Love the social trading features.',
  user_name: 'John Doe',
  user_email: 'john@example.com',
  pros: 'Easy to use, great copy trading features',
  cons: 'Could have lower fees'
};

async function testReviewAPI() {
  try {
    console.log('Testing review submission API...');
    
    // Test POST request
    const response = await fetch('http://localhost:3001/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testReview),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Review submitted successfully!');
      console.log('Response:', data);
      
      // Test GET request to fetch reviews
      console.log('\nTesting review fetching...');
      const getResponse = await fetch(`http://localhost:3001/api/reviews?broker_id=${testReview.broker_id}`);
      const getData = await getResponse.json();
      
      if (getResponse.ok) {
        console.log('✅ Reviews fetched successfully!');
        console.log(`Found ${getData.reviews.length} reviews`);
        if (getData.reviews.length > 0) {
          console.log('Latest review:', getData.reviews[0]);
        }
      } else {
        console.error('❌ Error fetching reviews:', getData);
      }
      
    } else {
      console.error('❌ Error submitting review:', data);
    }

  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

testReviewAPI();
