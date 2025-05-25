// Test review submission with named user
const testReview = {
  broker_id: 'b1000000-0000-0000-0000-000000000010',
  rating: 5,
  comment: 'Excellent platform for social trading! I\'ve been using eToro for over 2 years now and I\'m really impressed with their CopyTrader feature.',
  user_name: 'Sarah Mitchell',
  user_email: 'sarah@example.com',
  pros: 'Easy to use interface, great copy trading features, wide range of assets',
  cons: 'Spreads could be tighter, weekend trading not available'
};

async function testNamedReview() {
  try {
    console.log('Testing named review submission...');
    
    const response = await fetch('http://localhost:3001/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testReview),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Named review submitted successfully!');
      console.log('Response:', data);
      
      // Fetch reviews to see the result
      console.log('\nFetching reviews...');
      const getResponse = await fetch(`http://localhost:3001/api/reviews?broker_id=${testReview.broker_id}`);
      const getData = await getResponse.json();
      
      if (getData.success) {
        console.log(`Found ${getData.reviews.length} reviews`);
        if (getData.reviews.length > 0) {
          console.log('\nLatest review:');
          console.log('Comment:', getData.reviews[0].comment);
        }
      }
      
    } else {
      console.error('❌ Error submitting review:', data);
    }

  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

testNamedReview();
