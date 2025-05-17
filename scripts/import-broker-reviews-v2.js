// Import Broker Reviews Script (Version 2)
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from command line arguments
const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.error('Usage: node import-broker-reviews-v2.js <SUPABASE_URL> <SUPABASE_KEY>');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to generate a random date in the last 2 years
function getRandomDate() {
  const now = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(now.getFullYear() - 2);
  
  return new Date(
    twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime())
  ).toISOString();
}

// List of real-sounding names for reviews
const reviewerNames = [
  'James Wilson', 'Emma Thompson', 'Michael Brown', 'Olivia Garcia', 'Robert Martinez',
  'Sophia Lee', 'William Anderson', 'Isabella Taylor', 'David Johnson', 'Charlotte Lewis',
  'John Smith', 'Jennifer Davis', 'Christopher Rodriguez', 'Mia Miller', 'Matthew Wilson',
  'Abigail Jackson', 'Daniel White', 'Emily Martinez', 'Andrew Thomas', 'Sofia Hernandez',
  'Joseph Moore', 'Elizabeth Clark', 'Ryan Lewis', 'Victoria Young', 'Nicholas Allen',
  'Samantha Hill', 'Anthony Walker', 'Natalie Wright', 'Joshua Green', 'Grace King',
  'Kevin Baker', 'Lily Adams', 'Brian Nelson', 'Hannah Carter', 'Jonathan Mitchell',
  'Chloe Perez', 'Jason Roberts', 'Zoey Turner', 'Justin Phillips', 'Madison Campbell'
];

// Generate review text based on rating 
function generateReviewText(brokerName, rating, brokerAssets = []) {
  const positiveComments = [
    `I've been using ${brokerName} for over a year now and I'm very satisfied with their services.`,
    `${brokerName} offers excellent customer support and a user-friendly platform.`,
    `My experience with ${brokerName} has been fantastic - quick executions and responsive support.`,
    `Really impressed with ${brokerName}'s reliability and transparency.`,
    `${brokerName} has been a great choice for my trading needs. Highly recommended!`
  ];
  
  const neutralComments = [
    `${brokerName} is decent overall, though there's room for improvement.`,
    `I've had a mixed experience with ${brokerName} - some good features, some that need work.`,
    `${brokerName} is about average compared to other brokers I've used.`,
    `My experience with ${brokerName} has been okay, neither great nor terrible.`,
    `${brokerName} gets the job done, but doesn't really stand out from competitors.`
  ];
  
  const negativeComments = [
    `I've had several issues with ${brokerName}'s platform and customer service.`,
    `Unfortunately, ${brokerName} didn't meet my expectations in terms of reliability.`,
    `I've experienced frequent technical problems with ${brokerName}.`,
    `${brokerName}'s customer support is disappointingly slow to respond.`,
    `I'm considering switching from ${brokerName} due to persistent issues.`
  ];
  
  let reviewText = '';
  if (rating >= 4) {
    reviewText = positiveComments[Math.floor(Math.random() * positiveComments.length)];
    reviewText += ` I particularly like their ${Math.random() > 0.5 ? 'mobile app' : 'trading platform'}.`;
    reviewText += ` Overall, I would recommend this broker to other traders.`;
  } else if (rating >= 3) {
    reviewText = neutralComments[Math.floor(Math.random() * neutralComments.length)];
    reviewText += ` Their ${Math.random() > 0.5 ? 'customer support' : 'platform stability'} could use some improvement.`;
    reviewText += ` They're not bad, but there's definitely room for improvement.`;
  } else {
    reviewText = negativeComments[Math.floor(Math.random() * negativeComments.length)];
    reviewText += ` I was particularly disappointed with their ${Math.random() > 0.5 ? 'fees' : 'execution speed'}.`;
    reviewText += ` I hope they improve their services, but for now, I'd suggest looking elsewhere.`;
  }
  
  return reviewText;
}

// Random rating function (provides a rating close to the broker's overall rating)
function getRandomRating(brokerRating) {
  // Calculate min and max possible ratings (within 1.0 of broker rating)
  let minRating = Math.max(1, brokerRating - 1.0);
  let maxRating = Math.min(5, brokerRating + 1.0);
  
  // Generate random rating in range
  let rating = minRating + Math.random() * (maxRating - minRating);
  
  // Round to nearest 0.5
  return Math.round(rating * 2) / 2;
}

// Main function to import reviews
async function importBrokerReviews() {
  console.log('🚀 Starting import of broker reviews (v2)...');
  console.log(`Using Supabase URL: ${supabaseUrl.substring(0, 15)}...`);
  
  try {
    // First, check if the reviews table exists
    try {
      const { data: reviewCheck, error: reviewCheckError } = await supabase
        .from('reviews')
        .select('count');
      
      if (reviewCheckError) {
        console.error('⚠️ Error checking reviews table:', reviewCheckError);
        console.error('This script requires the reviews table to exist in your Supabase instance.');
        process.exit(1);
      }
      
      console.log(`✅ Reviews table exists. Current review count: ${reviewCheck[0].count}`);
    } catch (tableCheckError) {
      console.error('⚠️ Error checking reviews table:', tableCheckError);
      process.exit(1);
    }
    
    // Get all brokers
    const { data: brokers, error: brokerError } = await supabase
      .from('brokers')
      .select('*');
    
    if (brokerError) {
      console.error('❌ Error fetching brokers:', brokerError);
      process.exit(1);
    }
    
    console.log(`✅ Found ${brokers.length} brokers to add reviews for`);
    
    if (brokers.length === 0) {
      console.error('⚠️ No brokers found in the database. Please import brokers first.');
      process.exit(1);
    }
    
    let totalReviewsAdded = 0;
    let userIds = [];
    
    // Create users for reviews (3 users - will be randomly assigned to reviews)
    console.log('Creating review user accounts...');
    
    for (let i = 0; i < 3; i++) {
      const randomName = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
      const emailName = randomName.toLowerCase().replace(/\s+/g, '.') + Math.floor(Math.random() * 1000) + '@example.com';
      
      try {
        const { data: newUser, error: userError } = await supabase
          .from('users')
          .insert({
            email: emailName,
            password_hash: 'placeholder_hash', // This is just a placeholder
            is_admin: false
          })
          .select()
          .single();
        
        if (userError) {
          console.warn(`⚠️ Warning: Failed to create user ${emailName}:`, userError.message);
          continue;
        }
        
        userIds.push(newUser.id);
        console.log(`✅ Created reviewer user: ${emailName}`);
      } catch (userCreateError) {
        console.warn(`⚠️ Warning: Exception creating user ${emailName}:`, userCreateError.message);
      }
    }
    
    // If we couldn't create any users, use a fallback approach
    if (userIds.length === 0) {
      console.warn('⚠️ Warning: Could not create any new users. Checking for existing users...');
      
      try {
        const { data: existingUsers, error: existingUserError } = await supabase
          .from('users')
          .select('id')
          .limit(3);
        
        if (existingUserError || !existingUsers || existingUsers.length === 0) {
          console.error('❌ Could not find or create any users for reviews.');
          process.exit(1);
        }
        
        userIds = existingUsers.map(user => user.id);
        console.log(`✅ Found ${userIds.length} existing users to use for reviews`);
      } catch (fallbackError) {
        console.error('❌ Error finding existing users:', fallbackError);
        process.exit(1);
      }
    }
    
    // Process each broker
    for (const broker of brokers) {
      try {
        // Generate 5 reviews per broker (minimum)
        const reviewCount = 5;
        console.log(`Generating ${reviewCount} reviews for ${broker.name}...`);
        
        let brokerReviewsAdded = 0;
        
        for (let i = 0; i < reviewCount; i++) {
          // Assign a random user from our created users
          const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
          
          // Generate a rating - should be close to broker's overall rating
          const rating = getRandomRating(broker.rating || 4);
          
          // Assign random reviewer name from our list
          const reviewerName = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
          
          // Generate review content with reviewer name included
          const reviewText = `${reviewerName}: ${generateReviewText(broker.name, rating, broker.supported_assets)}`;
          
          // Create a random date in the past 2 years
          const createdAt = getRandomDate();
          
          try {
            // Add the review to the database
            const { data: review, error: reviewError } = await supabase
              .from('reviews')
              .insert({
                broker_id: broker.id,
                user_id: randomUserId,
                rating: rating,
                comment: reviewText,
                created_at: createdAt
              })
              .select();
            
            if (reviewError) {
              console.warn(`⚠️ Warning: Error adding review for ${broker.name}:`, reviewError.message);
              continue;
            }
            
            totalReviewsAdded++;
            brokerReviewsAdded++;
            
            if (totalReviewsAdded % 10 === 0) {
              console.log(`Added ${totalReviewsAdded} reviews so far...`);
            }
          } catch (reviewInsertError) {
            console.warn(`⚠️ Warning: Exception adding review for ${broker.name}:`, reviewInsertError.message);
          }
        }
        
        console.log(`Added ${brokerReviewsAdded} reviews for ${broker.name}`);
      } catch (brokerProcessError) {
        console.warn(`⚠️ Warning: Error processing broker ${broker.name}:`, brokerProcessError.message);
      }
    }
    
    if (totalReviewsAdded > 0) {
      console.log(`✅ Successfully added ${totalReviewsAdded} reviews for ${brokers.length} brokers`);
    } else {
      console.error('❌ Failed to add any reviews.');
    }
    
    // Verify reviews were added
    try {
      const { data: finalCount, error: countError } = await supabase
        .from('reviews')
        .select('count');
      
      if (!countError) {
        console.log(`Final review count in database: ${finalCount[0].count}`);
      }
    } catch (countError) {
      console.warn('⚠️ Warning: Could not get final review count');
    }
    
  } catch (error) {
    console.error('❌ Error importing reviews:', error);
    process.exit(1);
  }
}

// Run the import function
importBrokerReviews()
  .then(() => {
    console.log('Broker reviews import completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during broker reviews import:', error);
    process.exit(1);
  }); 