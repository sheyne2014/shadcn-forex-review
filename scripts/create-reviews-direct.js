// Create reviews for confirmed broker IDs
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// List of confirmed broker IDs and names from the check-brokers.js output
const confirmedBrokers = [
  { id: 'fc045eb3-73e9-4fbb-b751-2cc048f91bb7', name: 'XM', rating: 4 },
  { id: '805f65c5-3911-448e-8800-0143bbbb2a0f', name: 'eToro', rating: 4 },
  { id: 'bd9f30a2-e461-4c8b-a818-08b3dfeb15ef', name: 'IG', rating: 5 },
  { id: '0c23917a-0ef0-482e-a47b-1172ad5a8a58', name: 'Exness', rating: 4 },
  { id: '50caffd3-e9b9-492c-af84-53944111fb0b', name: 'BlackBull Markets', rating: 4 },
  { id: '960419e3-5605-4ae2-8874-1b5b866151b8', name: 'FXTM', rating: 4 },
  { id: 'c42628ea-bbf9-4d80-be65-b217a423b6cb', name: 'OCTA', rating: 3 },
  { id: '728300eb-9d09-4ee6-9efd-0fe64f3956d1', name: 'Capital.com', rating: 5 },
  { id: 'ee2758ed-5ef8-4edc-b06e-972fee340d00', name: 'Vantage', rating: 4 },
  { id: '2b0f13cf-5469-40d6-a96b-75585dc43222', name: 'FxPro', rating: 4 }
];

// List of real-sounding names for reviews
const reviewerNames = [
  'James Wilson', 'Emma Thompson', 'Michael Brown', 'Olivia Garcia', 'Robert Martinez',
  'Sophia Lee', 'William Anderson', 'Isabella Taylor', 'David Johnson', 'Charlotte Lewis',
  'John Smith', 'Jennifer Davis', 'Christopher Rodriguez', 'Mia Miller', 'Matthew Wilson'
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
  // Simpler review generation 
  const positiveTexts = [
    `I've been using ${brokerName} for over a year and have been very pleased with their service. The trading platform is reliable and customer support is excellent.`,
    `${brokerName} has consistently provided a top-notch trading experience. Fast executions and great customer service.`,
    `My experience with ${brokerName} has been excellent. Their platform is user-friendly and their fees are competitive.`,
    `I highly recommend ${brokerName} for their reliable platform and responsive support team.`,
    `${brokerName} offers a great trading experience with low spreads and fast execution. Very satisfied!`
  ];
  
  const neutralTexts = [
    `${brokerName} is decent overall. The platform works well most of the time, but their customer service could be improved.`,
    `My experience with ${brokerName} has been average. They offer standard features but nothing exceptional.`,
    `${brokerName} gets the job done, but there are some areas where they could improve, particularly with their mobile app.`,
    `I've had a mixed experience with ${brokerName}. Some features are good, others need work.`,
    `${brokerName} is okay. Not the best, not the worst. Their platform is reliable but fees are average.`
  ];
  
  const negativeTexts = [
    `I've had issues with ${brokerName}'s platform reliability. Too many outages during important market events.`,
    `Customer service at ${brokerName} has been disappointing. Long wait times and unhelpful responses.`,
    `${brokerName}'s fees are higher than advertised and their platform lacks important features.`,
    `I've experienced too many technical issues with ${brokerName} and am looking for alternatives.`,
    `${brokerName} needs to improve their withdrawal process and platform stability. Not recommended.`
  ];
  
  if (rating >= 4) {
    return positiveTexts[Math.floor(Math.random() * positiveTexts.length)];
  } else if (rating >= 3) {
    return neutralTexts[Math.floor(Math.random() * neutralTexts.length)];
  } else {
    return negativeTexts[Math.floor(Math.random() * negativeTexts.length)];
  }
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

async function createReviews() {
  console.log('Starting review creation for confirmed brokers...');
  
  // First, create a test user for all reviews
  console.log('Creating a test user for reviews...');
  
  const testEmail = `reviewer${Math.floor(Math.random() * 10000)}@example.com`;
  
  try {
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
      process.exit(1);
    }
    
    console.log(`Created user with email ${testEmail} and ID ${user.id}`);
    
    // Process each confirmed broker
    let totalReviewsAdded = 0;
    
    for (const broker of confirmedBrokers) {
      console.log(`Creating reviews for ${broker.name}...`);
      
      // Create 5 reviews per broker
      for (let i = 0; i < 5; i++) {
        // Generate random rating based on broker rating
        const rating = getRandomRating(broker.rating);
        
        // Random reviewer name
        const reviewerName = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
        
        // Generate review text
        const reviewText = `${reviewerName}: ${generateReviewText(broker.name, rating)}`;
        
        // Random date in past 2 years
        const createdAt = getRandomDate();
        
        // Create review
        const { data: review, error: reviewError } = await supabase
          .from('reviews')
          .insert({
            broker_id: broker.id,
            user_id: user.id,
            rating: rating,
            comment: reviewText,
            created_at: createdAt
          })
          .select();
        
        if (reviewError) {
          console.error(`Error creating review for ${broker.name}:`, reviewError);
          continue;
        }
        
        totalReviewsAdded++;
        console.log(`Added review #${i+1} for ${broker.name} with rating ${rating}`);
      }
    }
    
    console.log(`Successfully added ${totalReviewsAdded} reviews for ${confirmedBrokers.length} brokers`);
    
    // Verify reviews were added
    const { data: finalCount, error: countError } = await supabase
      .from('reviews')
      .select('count');
    
    if (!countError) {
      console.log(`Final review count in database: ${finalCount[0].count}`);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

createReviews()
  .then(() => {
    console.log('Review creation completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 