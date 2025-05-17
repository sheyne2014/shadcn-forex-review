// Generate reviews as JSON files for later import
const fs = require('fs');
const path = require('path');
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

async function generateReviewsJson() {
  console.log('Generating reviews as JSON files...');
  
  try {
    // Create output directory
    const outputDir = path.join(__dirname, 'generated_reviews');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    
    // Get all brokers
    const { data: brokers, error: brokerError } = await supabase
      .from('brokers')
      .select('id, name, rating');
    
    if (brokerError) {
      console.error('Error fetching brokers:', brokerError);
      return;
    }
    
    console.log(`Found ${brokers.length} brokers to generate reviews for`);
    
    // Create a test user for all reviews (or use an existing one)
    let userId;
    
    try {
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
    } catch (userError) {
      console.error('Error getting/creating user:', userError);
      return;
    }
    
    // Generate reviews for each broker
    const allReviews = [];
    
    for (const broker of brokers) {
      // Generate 5 reviews per broker
      const brokerReviews = [];
      
      for (let i = 0; i < 5; i++) {
        // Generate random rating based on broker rating
        const rating = getRandomRating(broker.rating);
        
        // Random reviewer name
        const reviewerName = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
        
        // Generate review text
        const reviewText = `${reviewerName}: ${generateReviewText(broker.name, rating)}`;
        
        // Random date in past 2 years
        const createdAt = getRandomDate();
        
        // Create review object
        const review = {
          broker_id: broker.id,
          user_id: userId,
          rating: rating,
          comment: reviewText,
          created_at: createdAt,
          reviewer_name: reviewerName
        };
        
        brokerReviews.push(review);
        allReviews.push(review);
      }
      
      // Write broker reviews to a separate file
      const brokerFileName = `${broker.name.replace(/[^a-zA-Z0-9]/g, '_')}_reviews.json`;
      fs.writeFileSync(
        path.join(outputDir, brokerFileName),
        JSON.stringify(brokerReviews, null, 2)
      );
      
      console.log(`Generated 5 reviews for ${broker.name}`);
    }
    
    // Write all reviews to a single file
    fs.writeFileSync(
      path.join(outputDir, 'all_reviews.json'),
      JSON.stringify(allReviews, null, 2)
    );
    
    // Write SQL insert statements to a file
    const sqlStatements = allReviews.map(review => {
      return `
INSERT INTO reviews (broker_id, user_id, rating, comment, created_at)
VALUES (
  '${review.broker_id}',
  '${review.user_id}',
  ${review.rating},
  '${review.comment.replace(/'/g, "''")}',
  '${review.created_at}'
);`;
    }).join('\n');
    
    fs.writeFileSync(
      path.join(outputDir, 'insert_reviews.sql'),
      sqlStatements
    );
    
    console.log(`Total reviews generated: ${allReviews.length}`);
    console.log(`Files saved to: ${outputDir}`);
    console.log(`A SQL file with INSERT statements has also been created for manual import.`);
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

generateReviewsJson()
  .then(() => {
    console.log('Review generation completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 