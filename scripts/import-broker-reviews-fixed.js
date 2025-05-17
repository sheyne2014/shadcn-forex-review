// Import Broker Reviews Script
const { createClient } = require('@supabase/supabase-js');

// Get Supabase credentials from command line arguments
const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.error('Usage: node import-broker-reviews-fixed.js <SUPABASE_URL> <SUPABASE_KEY>');
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
  'Chloe Perez', 'Jason Roberts', 'Zoey Turner', 'Justin Phillips', 'Madison Campbell',
  'Brandon Evans', 'Audrey Gray', 'Jeremy Collins', 'Leah Stewart', 'Jose Sanchez',
  'Anna Reed', 'Tyler Morgan', 'Savannah Cook', 'Aaron Bailey', 'Brooklyn Richardson',
  'Kyle Peterson', 'Ella Murphy', 'Adam Rivera', 'Skylar Cooper', 'Zachary Rogers',
  'Scarlett Wood', 'Stephen Parker', 'Claire Barnes', 'Nathan Bell', 'Nora Reed',
  'Sean Howard', 'Lillian Watson', 'Kyle Hughes', 'Maya Brooks', 'Ian Bennett',
  'Kaylee Powell', 'Jesse Foster', 'Aubrey Long', 'Luke Sanders', 'Kennedy Ward',
  'Mark Price', 'Riley James', 'Evan Watson', 'Bella Ross', 'Connor Kelly',
  'Gabriella Brooks', 'Seth Cox', 'Naomi Perry', 'Joel Simmons', 'Madelyn Powell',
  'Jeremiah Henderson', 'Sadie Foster', 'Carlos Coleman', 'Autumn Russell', 'Caleb Flores',
  'Alexa Griffin', 'Spencer Washington', 'Caroline Bryant', 'Jared Barnes', 'Julia Hayes',
  'Colton Reed', 'Lauren Spencer', 'Maxwell Gordon', 'Trinity Fisher', 'Brady Sullivan',
  'Makenzie Warren', 'Marcus Hunter', 'London Harrison', 'Calvin Wells', 'Eva Foster',
  'Oscar Gonzalez', 'Melanie Crawford', 'Damian Marshall', 'Stella Gibson', 'Jonah Grant'
];

// Generate review text based on rating and broker type
function generateReviewText(brokerName, rating, brokerAssets) {
  // Determine tone based on rating
  let tone = 'negative';
  if (rating >= 4.5) {
    tone = 'extremely positive';
  } else if (rating >= 4) {
    tone = 'very positive';
  } else if (rating >= 3.5) {
    tone = 'positive';
  } else if (rating >= 3) {
    tone = 'neutral';
  } else if (rating >= 2) {
    tone = 'negative';
  }

  // Determine broker type to customize review
  const isForex = brokerAssets && brokerAssets.includes('Forex');
  const isStock = brokerAssets && (brokerAssets.includes('Stocks') || brokerAssets.includes('ETFs'));
  const isCrypto = brokerAssets && (brokerAssets.includes('Bitcoin') || brokerAssets.includes('Ethereum') || brokerAssets.includes('Crypto') || brokerAssets.includes('Cryptocurrency'));
  const isCFD = brokerAssets && brokerAssets.includes('CFDs');
  const isOptions = brokerAssets && brokerAssets.includes('Options');
  const isFutures = brokerAssets && brokerAssets.includes('Futures');

  // Template phrases by type and tone
  const templates = {
    // Common phrases (general)
    common: {
      positive: [
        `I've been using ${brokerName} for a while now and I'm very satisfied with their services.`,
        `${brokerName} offers excellent customer support and a user-friendly platform.`,
        `My experience with ${brokerName} has been fantastic - quick executions and responsive support.`,
        `Really impressed with ${brokerName}'s reliability and transparency.`,
        `${brokerName} has been a great choice for my trading needs. Highly recommended!`
      ],
      neutral: [
        `${brokerName} is decent overall, though there's room for improvement.`,
        `I've had a mixed experience with ${brokerName} - some good features, some that need work.`,
        `${brokerName} is about average compared to other brokers I've used.`,
        `My experience with ${brokerName} has been okay, neither great nor terrible.`,
        `${brokerName} gets the job done, but doesn't really stand out from competitors.`
      ],
      negative: [
        `I've had several issues with ${brokerName}'s platform and customer service.`,
        `Unfortunately, ${brokerName} didn't meet my expectations in terms of reliability.`,
        `I've experienced frequent technical problems with ${brokerName}.`,
        `${brokerName}'s customer support is disappointingly slow to respond.`,
        `I'm considering switching from ${brokerName} due to persistent issues.`
      ]
    },
    // Forex specific phrases
    forex: {
      positive: [
        `Their spreads are among the tightest I've seen in the forex market.`,
        `Very impressed with their forex execution speed and lack of slippage.`,
        `Their forex analysis tools are comprehensive and extremely helpful.`,
        `Great selection of currency pairs with reasonable leverage options.`
      ],
      neutral: [
        `Forex spreads are average, nothing special compared to competitors.`,
        `Their forex trading platform works fine most of the time.`,
        `Decent selection of currency pairs, but limited exotic options.`
      ],
      negative: [
        `The spreads widen significantly during volatile market conditions.`,
        `I've experienced several requotes when trading major forex pairs.`,
        `Their forex leverage options are too restrictive.`
      ]
    },
    // Stock specific phrases
    stock: {
      positive: [
        `Great selection of stocks and ETFs with competitive fees.`,
        `Their stock research tools and market news are excellent.`,
        `Zero commission stock trading is a major plus.`,
        `Dividend reinvestment program works flawlessly.`
      ],
      neutral: [
        `Stock trading fees are reasonable but not the lowest in the industry.`,
        `Decent selection of stocks, though international options are limited.`,
        `Stock research tools are adequate but not exceptional.`
      ],
      negative: [
        `Limited stock selection compared to specialized stock brokers.`,
        `High fees for international stock trading.`,
        `Their stock research tools lack depth and real-time updates.`
      ]
    },
    // Crypto specific phrases
    crypto: {
      positive: [
        `Impressive selection of cryptocurrencies beyond just the major ones.`,
        `Very competitive fees for crypto trading.`,
        `Their crypto wallet is secure and easy to use.`,
        `Great crypto staking options with good returns.`
      ],
      neutral: [
        `Decent crypto selection but fees could be lower.`,
        `Cryptocurrency trading works fine but the interface could be more intuitive.`,
        `Average crypto withdrawal times compared to dedicated exchanges.`
      ],
      negative: [
        `Limited cryptocurrency selection compared to specialized exchanges.`,
        `Crypto withdrawal fees are too high.`,
        `Experienced delays with crypto deposits and withdrawals.`
      ]
    },
    // CFD specific phrases
    cfd: {
      positive: [
        `Excellent range of CFD instruments with tight spreads.`,
        `Their risk management tools for CFD trading are top-notch.`,
        `CFD execution is fast with minimal slippage.`
      ],
      neutral: [
        `Standard CFD offering with average spreads.`,
        `CFD trading platform is functional but nothing special.`,
        `Reasonable margin requirements for CFDs.`
      ],
      negative: [
        `CFD spreads widen too much during market volatility.`,
        `Overnight fees for CFDs are higher than competitors.`,
        `Limited CFD risk management tools.`
      ]
    },
    // Options specific phrases
    options: {
      positive: [
        `Great options trading platform with useful analysis tools.`,
        `Low fees for options trading compared to competitors.`,
        `Excellent options chain visualization and strategy building tools.`
      ],
      neutral: [
        `Basic options trading features that get the job done.`,
        `Options fees are standard for the industry.`,
        `Adequate options strategy tools but nothing groundbreaking.`
      ],
      negative: [
        `Limited options trading tools compared to specialized brokers.`,
        `Options fees are on the high side.`,
        `The options trading platform lacks advanced features.`
      ]
    },
    // Futures specific phrases
    futures: {
      positive: [
        `Great selection of futures contracts with low commissions.`,
        `Their futures trading platform has excellent charting capabilities.`,
        `Very competitive margin requirements for futures trading.`
      ],
      neutral: [
        `Standard futures offering with average fees.`,
        `Futures trading platform is adequate but could be improved.`,
        `Basic futures analysis tools that get the job done.`
      ],
      negative: [
        `Limited futures contract selection.`,
        `Futures commissions are higher than specialized brokers.`,
        `Experienced execution delays with futures orders.`
      ]
    },
    // Conclusion phrases
    conclusion: {
      positive: [
        `Overall, I'm very happy with my choice and plan to continue using their services.`,
        `I would definitely recommend ${brokerName} to other traders.`,
        `Five stars from me - they've exceeded my expectations.`,
        `One of the best brokers I've used in my trading journey.`
      ],
      neutral: [
        `Overall, they're an okay choice if you can work around the limitations.`,
        `I might continue using them, but I'm also looking at alternatives.`,
        `They're not bad, but there's definitely room for improvement.`
      ],
      negative: [
        `I'm actively looking for a better alternative to switch to.`,
        `Cannot recommend based on my experience so far.`,
        `I hope they improve their services, but for now, I'd suggest looking elsewhere.`
      ]
    }
  };

  // Select appropriate tone templates
  let toneKey = 'negative';
  if (rating >= 4) {
    toneKey = 'positive';
  } else if (rating >= 3) {
    toneKey = 'neutral';
  }

  // Build review from template parts
  let reviewText = templates.common[toneKey][Math.floor(Math.random() * templates.common[toneKey].length)];
  
  // Add asset-specific comments
  let specializations = [];
  
  if (isForex && templates.forex[toneKey]) {
    specializations.push(templates.forex[toneKey][Math.floor(Math.random() * templates.forex[toneKey].length)]);
  }
  
  if (isStock && templates.stock[toneKey]) {
    specializations.push(templates.stock[toneKey][Math.floor(Math.random() * templates.stock[toneKey].length)]);
  }
  
  if (isCrypto && templates.crypto[toneKey]) {
    specializations.push(templates.crypto[toneKey][Math.floor(Math.random() * templates.crypto[toneKey].length)]);
  }
  
  if (isCFD && templates.cfd[toneKey]) {
    specializations.push(templates.cfd[toneKey][Math.floor(Math.random() * templates.cfd[toneKey].length)]);
  }
  
  if (isOptions && templates.options[toneKey]) {
    specializations.push(templates.options[toneKey][Math.floor(Math.random() * templates.options[toneKey].length)]);
  }
  
  if (isFutures && templates.futures[toneKey]) {
    specializations.push(templates.futures[toneKey][Math.floor(Math.random() * templates.futures[toneKey].length)]);
  }
  
  // Add 1-2 random specialization comments
  if (specializations.length > 0) {
    // Shuffle and take 1-2 specializations
    specializations.sort(() => Math.random() - 0.5);
    const numSpecializations = Math.min(specializations.length, Math.random() < 0.5 ? 1 : 2);
    for (let i = 0; i < numSpecializations; i++) {
      reviewText += ' ' + specializations[i];
    }
  }
  
  // Add conclusion
  reviewText += ' ' + templates.conclusion[toneKey][Math.floor(Math.random() * templates.conclusion[toneKey].length)];
  
  return reviewText;
}

// Random rating function (provides a rating close to the broker's overall rating)
function getRandomRating(brokerRating) {
  // Calculate min and max possible ratings (within 1.5 of broker rating)
  let minRating = Math.max(1, brokerRating - 1.5);
  let maxRating = Math.min(5, brokerRating + 1.5);
  
  // Most ratings will be within 0.5 of broker rating
  if (Math.random() < 0.7) {
    minRating = Math.max(1, brokerRating - 0.5);
    maxRating = Math.min(5, brokerRating + 0.5);
  }
  
  // Generate random rating in range
  let rating = minRating + Math.random() * (maxRating - minRating);
  
  // Round to nearest 0.5
  return Math.round(rating * 2) / 2;
}

// Main function to import reviews
async function importBrokerReviews() {
  console.log('🚀 Starting import of broker reviews...');
  
  try {
    // Get all brokers
    const { data: brokers, error: brokerError } = await supabase
      .from('brokers')
      .select('*');
    
    if (brokerError) throw brokerError;
    
    console.log(`✅ Found ${brokers.length} brokers to add reviews for`);
    
    let totalReviewsAdded = 0;
    
    // Create fake users for reviews (5 users - will be randomly assigned to reviews)
    const users = [];
    for (let i = 0; i < 5; i++) {
      const randomName = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
      const emailName = randomName.toLowerCase().replace(' ', '.') + Math.floor(Math.random() * 100) + '@example.com';
      
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
        console.error(`Error creating user: ${userError.message}`);
        continue;
      }
      
      users.push(newUser);
      console.log(`Created reviewer user: ${newUser.email}`);
    }
    
    if (users.length === 0) {
      console.error('Failed to create any reviewer users. Exiting.');
      process.exit(1);
    }
    
    // Process each broker
    for (const broker of brokers) {
      // Generate 5-10 reviews per broker
      const reviewCount = Math.floor(Math.random() * 6) + 5; // 5-10 reviews
      console.log(`Generating ${reviewCount} reviews for ${broker.name}...`);
      
      for (let i = 0; i < reviewCount; i++) {
        // Assign a random user from our created users
        const randomUser = users[Math.floor(Math.random() * users.length)];
        
        // Generate a rating - should be close to broker's overall rating
        const rating = getRandomRating(broker.rating);
        
        // Assign random reviewer name from our list
        const reviewerName = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
        
        // Generate review content with reviewer name included
        const reviewText = `${reviewerName}: ${generateReviewText(broker.name, rating, broker.supported_assets)}`;
        
        // Create a random date in the past 2 years
        const createdAt = getRandomDate();
        
        try {
          // Add the review to the database
          const { data: review, error } = await supabase
            .from('reviews')
            .insert({
              broker_id: broker.id,
              user_id: randomUser.id,
              rating: rating,
              comment: reviewText,
              created_at: createdAt
            })
            .select();
          
          if (error) {
            console.error(`Error adding review for ${broker.name}:`, error);
            continue;
          }
          
          totalReviewsAdded++;
          
          if (totalReviewsAdded % 10 === 0) {
            console.log(`Added ${totalReviewsAdded} reviews so far...`);
          }
        } catch (insertError) {
          console.error(`Exception adding review for ${broker.name}:`, insertError);
        }
      }
    }
    
    console.log(`✅ Successfully added ${totalReviewsAdded} reviews for ${brokers.length} brokers`);
  } catch (error) {
    console.error('❌ Error importing reviews:', error);
    process.exit(1);
  }
}

// Run the import function
importBrokerReviews()
  .then(() => {
    console.log('Broker reviews import completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during broker reviews import:', error);
    process.exit(1);
  }); 