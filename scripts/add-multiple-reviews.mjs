// Add multiple named reviews for eToro
const reviews = [
  {
    broker_id: 'b1000000-0000-0000-0000-000000000010',
    rating: 4,
    comment: 'Good broker overall. The social trading aspect is what drew me to eToro initially. I like being able to see what other successful traders are doing and copy their strategies.',
    user_name: 'Michael Chen',
    pros: 'Social trading features, user-friendly platform, good regulation (FCA, CySEC)',
    cons: 'Limited advanced charting tools, higher fees compared to some competitors'
  },
  {
    broker_id: 'b1000000-0000-0000-0000-000000000010',
    rating: 4,
    comment: 'Been trading with eToro for about 6 months. The copy trading feature is revolutionary - I can follow top traders and automatically copy their trades.',
    user_name: 'Emma Rodriguez',
    pros: 'Innovative copy trading, good customer support, mobile app works well',
    cons: 'Withdrawal fees are a bit high, limited cryptocurrency options'
  },
  {
    broker_id: 'b1000000-0000-0000-0000-000000000010',
    rating: 5,
    comment: 'Outstanding broker! I started as a complete beginner and eToro\'s social trading platform helped me learn so much. The ability to see other traders\' portfolios is amazing.',
    user_name: 'David Thompson',
    pros: 'Perfect for beginners, excellent social features, strong regulation, great educational resources',
    cons: 'Could offer more advanced order types, spreads on some assets could be better'
  }
];

async function addMultipleReviews() {
  try {
    console.log('Adding multiple named reviews...');

    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      console.log(`\nSubmitting review ${i + 1}/3 from ${review.user_name}...`);
      
      const response = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ Review from ${review.user_name} submitted successfully!`);
      } else {
        console.error(`❌ Error submitting review from ${review.user_name}:`, data);
      }

      // Wait a bit between submissions
      if (i < reviews.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('\n✅ All reviews submitted!');
    
    // Fetch and display all reviews
    console.log('\nFetching all reviews...');
    const getResponse = await fetch('http://localhost:3001/api/reviews?broker_id=b1000000-0000-0000-0000-000000000010');
    const getData = await getResponse.json();
    
    if (getData.success) {
      console.log(`\nTotal reviews: ${getData.reviews.length}`);
      getData.reviews.forEach((review, index) => {
        // Parse user name from comment
        const userMatch = review.comment.match(/^\[USER:([^\]]+)\]/);
        const userName = userMatch ? userMatch[1] : 'Anonymous';
        console.log(`${index + 1}. ${userName} - ${review.rating}/5 stars`);
      });
    }

  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

addMultipleReviews();
