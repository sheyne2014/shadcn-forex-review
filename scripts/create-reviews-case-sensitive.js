// Create reviews with case-sensitive table names
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Get first broker ID dynamically
async function getFirstBrokerId() {
  const { data, error } = await supabase
    .from('brokers')
    .select('id, name')
    .limit(1)
    .single();
  
  if (error) {
    console.error('Error finding a broker:', error);
    return null;
  }
  
  return { id: data.id, name: data.name };
}

// Test creating a review with different table name cases
async function testReviewCreation() {
  console.log('Testing review creation with different table case sensitivity...');
  
  try {
    // Create a test user
    const testEmail = `reviewer${Math.floor(Math.random() * 10000)}@example.com`;
    
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email: testEmail,
        password_hash: 'test_hash',
        is_admin: false
      })
      .select()
      .single();
    
    if (userError) {
      console.error('Error creating test user:', userError);
      return;
    }
    
    console.log(`Created user with email ${testEmail} and ID ${user.id}`);
    
    // Get a broker
    const broker = await getFirstBrokerId();
    
    if (!broker) {
      console.error('Could not find a broker. Exiting.');
      return;
    }
    
    console.log(`Using broker: ${broker.name} (${broker.id})`);
    
    // Try to create a review directly with a single broker
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert({
        broker_id: broker.id,
        user_id: user.id,
        rating: 4,
        comment: 'Test review for table case sensitivity check',
        created_at: new Date().toISOString()
      })
      .select();
    
    if (reviewError) {
      console.error('Error creating review with lowercase "reviews":', reviewError);
      
      // Try with uppercase "Reviews"
      console.log('Trying with uppercase "Reviews"...');
      const { data: capitalReview, error: capitalError } = await supabase
        .from('Reviews')
        .insert({
          broker_id: broker.id,
          user_id: user.id,
          rating: 4,
          comment: 'Test review with uppercase table name',
          created_at: new Date().toISOString()
        })
        .select();
      
      if (capitalError) {
        console.error('Error with uppercase "Reviews":', capitalError);
      } else {
        console.log('Success with uppercase "Reviews":', capitalReview);
      }
      
      // Try modifying the broker table name
      console.log('Trying with uppercase "Brokers" in the broker_id field...');
      
      // Here we're just testing the error message format
      const alternativeBrokerId = broker.id.replace(/-/g, ''); // Just to make it invalid
      
      const { data: modifiedBroker, error: modifiedError } = await supabase
        .from('reviews')
        .insert({
          broker_id: alternativeBrokerId,
          user_id: user.id,
          rating: 4,
          comment: 'Test review with modified broker ID',
          created_at: new Date().toISOString()
        })
        .select();
      
      if (modifiedError) {
        console.log('Error with modified broker ID:');
        console.log(modifiedError);
        
        // Analyze the error message
        if (modifiedError.message.includes('Brokers')) {
          console.log('The error message mentions "Brokers" with capital B!');
          console.log('This suggests the foreign key constraint is referring to a table named "Brokers".');
        }
      } else {
        console.log('Success with modified broker ID (unexpected):', modifiedBroker);
      }
    } else {
      console.log('Success creating review with lowercase "reviews":', review);
    }
    
    // Create a simple batch of reviews for actual brokers
    if (reviewError) {
      console.log('\nTrying a simplified approach with 5 brokers...');
      
      // Get 5 actual broker IDs from the database
      const { data: actualBrokers, error: brokersError } = await supabase
        .from('brokers')
        .select('id, name')
        .limit(5);
      
      if (brokersError) {
        console.error('Error getting actual brokers:', brokersError);
        return;
      }
      
      console.log(`Found ${actualBrokers.length} brokers for simplified review creation`);
      
      // Try to create one review per broker
      for (const broker of actualBrokers) {
        try {
          // Create just one review with manual UUIDs
          const { error: simpleError } = await supabase
            .from('reviews')
            .insert({
              broker_id: broker.id,
              user_id: user.id,
              rating: 4,
              comment: `Simple test review for ${broker.name}`,
              created_at: new Date().toISOString()
            });
          
          if (simpleError) {
            console.error(`Error adding review for ${broker.name}:`, simpleError.message);
          } else {
            console.log(`Successfully added review for ${broker.name}`);
          }
        } catch (e) {
          console.error(`Exception adding review for ${broker.name}:`, e);
        }
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testReviewCreation()
  .then(() => {
    console.log('Test completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 