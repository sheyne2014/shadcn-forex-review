import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

const namedReviews = [
  {
    broker_id: 'b1000000-0000-0000-0000-000000000010',
    rating: 5,
    comment: `Excellent platform for social trading! I've been using eToro for over 2 years now and I'm really impressed with their CopyTrader feature. It's perfect for beginners who want to learn from experienced traders.

Pros: Easy to use interface, great copy trading features, wide range of assets
Cons: Spreads could be tighter, weekend trading not available`,
    user_name: 'Sarah Mitchell',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days ago
  },
  {
    broker_id: 'b1000000-0000-0000-0000-000000000010',
    rating: 4,
    comment: `Good broker overall. The social trading aspect is what drew me to eToro initially. I like being able to see what other successful traders are doing and copy their strategies. The platform is user-friendly and well-regulated.

Pros: Social trading features, user-friendly platform, good regulation (FCA, CySEC)
Cons: Limited advanced charting tools, higher fees compared to some competitors`,
    user_name: 'Michael Chen',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // 8 days ago
  },
  {
    broker_id: 'b1000000-0000-0000-0000-000000000010',
    rating: 4,
    comment: `Been trading with eToro for about 6 months. The copy trading feature is revolutionary - I can follow top traders and automatically copy their trades. Great for learning and making profits while you learn. Customer support is responsive too.

Pros: Innovative copy trading, good customer support, mobile app works well
Cons: Withdrawal fees are a bit high, limited cryptocurrency options`,
    user_name: 'Emma Rodriguez',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    broker_id: 'b1000000-0000-0000-0000-000000000010',
    rating: 5,
    comment: `Outstanding broker! I started as a complete beginner and eToro's social trading platform helped me learn so much. The ability to see other traders' portfolios and copy their strategies is amazing. The platform is intuitive and the educational content is top-notch.

Pros: Perfect for beginners, excellent social features, strong regulation, great educational resources
Cons: Could offer more advanced order types, spreads on some assets could be better`,
    user_name: 'David Thompson',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  }
];

async function addNamedReviews() {
  try {
    console.log('Adding named reviews for eToro...');

    for (const review of namedReviews) {
      console.log(`Adding review from ${review.user_name}...`);
      
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          broker_id: review.broker_id,
          rating: review.rating,
          comment: review.comment,
          user_id: null, // Anonymous but with names
          created_at: review.created_at
        }])
        .select();

      if (error) {
        console.error(`Error adding review from ${review.user_name}:`, error);
      } else {
        console.log(`✅ Successfully added review from ${review.user_name}`);
      }
    }

    console.log('\n✅ All named reviews added successfully!');
    
    // Fetch and display all reviews
    console.log('\nFetching all reviews...');
    const { data: allReviews, error: fetchError } = await supabase
      .from('reviews')
      .select('*')
      .eq('broker_id', 'b1000000-0000-0000-0000-000000000010')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching reviews:', fetchError);
    } else {
      console.log(`\nTotal reviews for eToro: ${allReviews.length}`);
      allReviews.forEach((review, index) => {
        console.log(`${index + 1}. Rating: ${review.rating}/5 - Created: ${new Date(review.created_at).toLocaleDateString()}`);
        console.log(`   Comment: ${review.comment.substring(0, 100)}...`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

addNamedReviews();
