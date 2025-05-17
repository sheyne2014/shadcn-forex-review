// Create multiple reviews for all brokers
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// List of real-sounding names for reviews
const reviewerNames = [
  'James Wilson', 'Emma Thompson', 'Michael Brown', 'Olivia Garcia', 'Robert Martinez',
  'Sophia Lee', 'William Anderson', 'Isabella Taylor', 'David Johnson', 'Charlotte Lewis',
  'John Smith', 'Jennifer Davis', 'Christopher Rodriguez', 'Mia Miller', 'Matthew Wilson',
  'Abigail Jackson', 'Daniel White', 'Emily Martinez', 'Andrew Thomas', 'Sofia Hernandez'
];

// Function to generate a random date in the last 2 years
function getRandomDate() {
  const now = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(now.getFullYear() - 2);
  
  return new Date(
    twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime())
  ).toISOString();
}

// Generate review text
function generateReviewText(brokerName, rating) {
  // General positive comments
  const positiveTexts = [
    `I've been using ${brokerName} for over a year and have been very pleased with their service. The trading platform is reliable and customer support is excellent.`,
    `${brokerName} has consistently provided a top-notch trading experience. Fast executions and great customer service.`,
    `My experience with ${brokerName} has been excellent. Their platform is user-friendly and their fees are competitive.`,
    `I highly recommend ${brokerName} for their reliable platform and responsive support team.`,
    `${brokerName} offers a great trading experience with low spreads and fast execution. Very satisfied!`,
    `${brokerName} offers excellent spreads and their trading platform is very reliable.`,
    `I trade with ${brokerName} and their execution speed is impressive. No slippage issues.`,
    `${brokerName}'s selection of instruments is comprehensive and their educational resources are helpful.`,
    `${brokerName} has a great selection of assets and their research tools are top-notch.`,
    `${brokerName}'s trading interface is intuitive and they offer good security features.`
  ];
  
  // General neutral comments
  const neutralTexts = [
    `${brokerName} is decent overall. The platform works well most of the time, but their customer service could be improved.`,
    `My experience with ${brokerName} has been average. They offer standard features but nothing exceptional.`,
    `${brokerName} gets the job done, but there are some areas where they could improve, particularly with their mobile app.`,
    `I've had a mixed experience with ${brokerName}. Some features are good, others need work.`,
    `${brokerName} is okay. Not the best, not the worst. Their platform is reliable but fees are average.`
  ];
  
  // General negative comments
  const negativeTexts = [
    `I've had issues with ${brokerName}'s platform reliability. Too many outages during important market events.`,
    `Customer service at ${brokerName} has been disappointing. Long wait times and unhelpful responses.`,
    `${brokerName}'s fees are higher than advertised and their platform lacks important features.`,
    `I've experienced too many technical issues with ${brokerName} and am looking for alternatives.`,
    `${brokerName} needs to improve their withdrawal process and platform stability. Not recommended.`
  ];
  
  // Select comment pool based on rating
  let commentPool;
  if (rating >= 4) {
    commentPool = positiveTexts;
  } else if (rating >= 3) {
    commentPool = neutralTexts;
  } else {
    commentPool = negativeTexts;
  }
  
  // Return a random comment from the selected pool
  return commentPool[Math.floor(Math.random() * commentPool.length)];
}

// Random integer rating function
function getRandomRating(brokerRating) {
  // Convert broker rating to integer if it's a decimal
  const baseBrokerRating = Math.round(brokerRating || 4);
  
  // Generate rating with weighted randomness (favoring the broker's base rating)
  const weights = {
    [-2]: 0.05,  // 5% chance of rating 2 stars lower
    [-1]: 0.15,  // 15% chance of rating 1 star lower
    [0]: 0.60,   // 60% chance of same rating
    [1]: 0.15,   // 15% chance of rating 1 star higher
    [2]: 0.05    // 5% chance of rating 2 stars higher
  };
  
  // Select a random offset based on weights
  const random = Math.random();
  let cumulativeProbability = 0;
  let selectedOffset = 0;
  
  for (const [offset, probability] of Object.entries(weights)) {
    cumulativeProbability += probability;
    if (random <= cumulativeProbability) {
      selectedOffset = parseInt(offset);
      break;
    }
  }
  
  // Calculate final rating and ensure it's between 1 and 5
  const rating = Math.max(1, Math.min(5, baseBrokerRating + selectedOffset));
  
  // Return as integer
  return rating;
}

async function createMultipleReviews() {
  console.log('Starting to create multiple reviews for all brokers...');
  
  try {
    // Get all brokers
    console.log('Fetching all brokers...');
    const { data: brokers, error: brokerError } = await supabase
      .from('brokers')
      .select('id, name, rating');
    
    if (brokerError) {
      console.error('Error fetching brokers:', brokerError);
      return;
    }
    
    console.log(`Found ${brokers.length} brokers to add reviews for`);
    
    // Get or create a user
    console.log('Setting up user for reviews...');
    
    let userId;
    
    // Try to get an existing user
    const { data: existingUsers, error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (usersError || !existingUsers || existingUsers.length === 0) {
      // Create a new user
      const testEmail = `reviewer${Math.floor(Math.random() * 10000)}@example.com`;
      
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
    
    // Process each broker
    let totalReviewsAdded = 0;
    let reviewsPerBroker = 5; // Set number of reviews per broker
    
    for (const broker of brokers) {
      console.log(`Creating reviews for ${broker.name}...`);
      const brokerReviews = [];
      
      // Generate reviews for this broker
      for (let i = 0; i < reviewsPerBroker; i++) {
        // Generate random rating based on broker rating
        const rating = getRandomRating(broker.rating);
        
        // Random reviewer name
        const reviewerName = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
        
        // Generate review text
        const reviewText = generateReviewText(broker.name, rating);
        
        // Random date in past 2 years
        const createdAt = getRandomDate();
        
        // Create review object
        const review = {
          broker_id: broker.id,
          user_id: userId,
          rating: rating,
          comment: `${reviewerName}: ${reviewText}`,
          created_at: createdAt
        };
        
        brokerReviews.push(review);
      }
      
      // Insert reviews in batch
      console.log(`Inserting ${brokerReviews.length} reviews for ${broker.name}...`);
      const { data: insertedReviews, error: insertError } = await supabase
        .from('reviews')
        .insert(brokerReviews)
        .select();
      
      if (insertError) {
        console.error(`Error adding reviews for ${broker.name}:`, insertError);
      } else {
        console.log(`Successfully added ${insertedReviews.length} reviews for ${broker.name}`);
        totalReviewsAdded += insertedReviews.length;
      }
    }
    
    console.log(`Total reviews added: ${totalReviewsAdded}`);
    
    // Verify final count
    const { data: finalCount, error: countError } = await supabase
      .from('reviews')
      .select('count');
    
    if (!countError) {
      console.log(`Final review count in database: ${finalCount[0].count}`);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createMultipleReviews()
  .then(() => {
    console.log('Review creation completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 