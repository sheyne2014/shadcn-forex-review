// Debug broker reviews import
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from command line arguments
const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.error('Usage: node debug-broker-reviews.js <SUPABASE_URL> <SUPABASE_KEY>');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function debugReviewImport() {
  console.log('🔍 Starting debug of broker reviews import...');
  
  try {
    // Check if brokers exist
    const { data: brokers, error: brokerError } = await supabase
      .from('brokers')
      .select('count');
    
    if (brokerError) {
      console.error('❌ Error accessing brokers table:', brokerError);
      return;
    }
    
    console.log(`Broker count in database: ${brokers[0].count}`);
    
    if (brokers[0].count === 0) {
      console.error('❌ No brokers found in database. Please add brokers first.');
      return;
    }
    
    // Check if reviews table exists and is accessible
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('count');
    
    if (reviewsError) {
      console.error('❌ Error accessing reviews table:', reviewsError);
      console.error('This might indicate the table doesn\'t exist or there are permission issues.');
      return;
    }
    
    console.log(`Current review count in database: ${reviews[0].count}`);
    
    // Check if we can create a test user
    try {
      const { data: testUser, error: userError } = await supabase
        .from('users')
        .insert({
          email: 'test.user' + Math.floor(Math.random() * 10000) + '@example.com',
          password_hash: 'debug_test_hash',
          is_admin: false
        })
        .select()
        .single();
      
      if (userError) {
        console.error('❌ Error creating test user:', userError);
        console.error('This might indicate issues with user permissions or constraints.');
        return;
      }
      
      console.log('✅ Successfully created test user');
      
      // Test inserting a review
      const { data: brokerSample } = await supabase
        .from('brokers')
        .select('id, name')
        .limit(1)
        .single();
      
      if (!brokerSample) {
        console.error('❌ Failed to get a sample broker for testing.');
        return;
      }
      
      console.log(`Testing review creation with broker: ${brokerSample.name}`);
      
      const { data: testReview, error: reviewError } = await supabase
        .from('reviews')
        .insert({
          broker_id: brokerSample.id,
          user_id: testUser.id,
          rating: 4.5,
          comment: 'This is a test review for debugging purposes.',
          created_at: new Date().toISOString()
        })
        .select();
      
      if (reviewError) {
        console.error('❌ Error inserting test review:', reviewError);
        
        // Check reviews table schema
        console.log('Checking reviews table schema...');
        
        // Use system metadata to check table structure
        const { data: columnsData, error: columnsError } = await supabase
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable')
          .eq('table_name', 'reviews');
        
        if (columnsError) {
          console.log('Cannot check table schema:', columnsError);
        } else {
          console.log('Reviews table schema:');
          console.log(columnsData);
        }
        
        return;
      }
      
      console.log('✅ Successfully inserted test review');
      console.log('The original script should work. There might be silent errors or issues with the review generation logic.');
      
      // Cleanup test data
      await supabase.from('reviews').delete().eq('id', testReview[0].id);
      await supabase.from('users').delete().eq('id', testUser.id);
      console.log('✅ Cleaned up test data');
      
    } catch (error) {
      console.error('❌ Unexpected error during testing:', error);
    }
    
  } catch (error) {
    console.error('❌ Error during debug:', error);
  }
}

debugReviewImport()
  .then(() => {
    console.log('Debug complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during debugging:', error);
    process.exit(1);
  }); 