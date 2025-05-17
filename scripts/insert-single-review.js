// Insert a single review with detailed logging
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from command line arguments
const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.error('Usage: node insert-single-review.js <SUPABASE_URL> <SUPABASE_KEY>');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function insertSingleReview() {
  console.log('Starting single review insert process...');
  console.log(`Using Supabase URL: ${supabaseUrl.substring(0, 15)}...`);
  console.log(`Key provided: ${supabaseKey ? 'Yes' : 'No'}`);
  
  try {
    // Step 1: Create a test user
    console.log('Step 1: Creating test user...');
    const testEmail = `test.review.user${Math.floor(Math.random() * 10000)}@example.com`;
    console.log(`Using test email: ${testEmail}`);
    
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email: testEmail,
        password_hash: 'test_password_hash',
        is_admin: false
      })
      .select()
      .single();
    
    if (userError) {
      console.error('Error creating test user:', userError);
      return;
    }
    
    console.log('✅ Test user created with ID:', user.id);
    
    // Step 2: Find a broker
    console.log('Step 2: Finding a broker...');
    const { data: broker, error: brokerError } = await supabase
      .from('brokers')
      .select('id, name')
      .limit(1)
      .single();
    
    if (brokerError) {
      console.error('Error finding broker:', brokerError);
      return;
    }
    
    console.log(`✅ Found broker: ${broker.name} (ID: ${broker.id})`);
    
    // Step 3: Insert review
    console.log('Step 3: Inserting review...');
    const reviewData = {
      broker_id: broker.id,
      user_id: user.id,
      rating: 4.5,
      comment: 'Michael Brown: This is a test review. I found this broker to be very reliable with great customer service. The platform is user-friendly and executions are fast. Overall, I would recommend this broker to other traders.',
      created_at: new Date().toISOString()
    };
    
    console.log('Review data to insert:', JSON.stringify(reviewData, null, 2));
    
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select();
    
    if (reviewError) {
      console.error('Error inserting review:', reviewError);
      
      // Try to get table schema
      console.log('Checking reviews table schema...');
      try {
        const { error: schemaError } = await supabase.rpc('get_table_def', { table_name: 'reviews' });
        if (schemaError) {
          console.error('Error getting schema:', schemaError);
        }
      } catch (e) {
        console.error('Exception checking schema:', e);
      }
      
      return;
    }
    
    console.log('✅ Review inserted successfully:', review);
    console.log('Review ID:', review[0].id);
    
    // Test that we can retrieve the review
    console.log('Step 4: Verifying review was saved...');
    const { data: verifyReview, error: verifyError } = await supabase
      .from('reviews')
      .select('id, broker_id, user_id, rating, comment, created_at')
      .eq('id', review[0].id)
      .single();
    
    if (verifyError) {
      console.error('Error verifying review:', verifyError);
      return;
    }
    
    console.log('✅ Successfully verified review is in database');
    console.log(verifyReview);
    
    console.log('Process completed successfully!');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

insertSingleReview()
  .then(() => {
    console.log('Script completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 