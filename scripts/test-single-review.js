// Test adding a single review after the Brokers table issue is resolved
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function testAddSingleReview() {
  console.log('Testing adding a single review...');
  
  try {
    // First, get an existing broker
    console.log('Fetching a broker...');
    const { data: broker, error: brokerError } = await supabase
      .from('brokers')
      .select('id, name')
      .limit(1)
      .single();
    
    if (brokerError) {
      console.error('Error fetching broker:', brokerError);
      return;
    }
    
    console.log(`Found broker: ${broker.name} (${broker.id})`);
    
    // Next, get or create a user
    console.log('Getting or creating a user...');
    
    let userId;
    
    // Try to get an existing user
    const { data: existingUsers, error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (usersError || !existingUsers || existingUsers.length === 0) {
      // Create a new user
      const testEmail = `test_reviewer${Math.floor(Math.random() * 10000)}@example.com`;
      
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          email: testEmail,
          password_hash: 'test_hash',
          is_admin: false
        })
        .select()
        .single();
      
      if (userError) {
        console.error('Error creating user:', userError);
        return;
      }
      
      userId = newUser.id;
      console.log(`Created new user with ID: ${userId}`);
    } else {
      userId = existingUsers[0].id;
      console.log(`Using existing user with ID: ${userId}`);
    }
    
    // Now, attempt to add a review
    console.log('Attempting to add a review...');
    
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert({
        broker_id: broker.id,
        user_id: userId,
        rating: 5,  // Integer rating
        comment: `Test review for ${broker.name} after resolving the Brokers table issue`,
        created_at: new Date().toISOString()
      })
      .select();
    
    if (reviewError) {
      console.error('Error adding review:', reviewError);
      console.log('Error details:', reviewError.details);
      
      if (reviewError.message.includes('foreign key constraint')) {
        console.log('We still have a foreign key constraint issue.');
        console.log('Checking for existing reviews...');
        
        const { data: reviewCount, error: countError } = await supabase
          .from('reviews')
          .select('count');
        
        if (!countError) {
          console.log(`Current review count: ${reviewCount[0].count}`);
        }
      }
    } else {
      console.log('Success! Review added:', review);
      
      // Verify by fetching reviews for this broker
      const { data: brokerReviews, error: listError } = await supabase
        .from('reviews')
        .select('*')
        .eq('broker_id', broker.id);
      
      if (!listError) {
        console.log(`Found ${brokerReviews.length} reviews for ${broker.name}`);
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testAddSingleReview()
  .then(() => {
    console.log('Test completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 