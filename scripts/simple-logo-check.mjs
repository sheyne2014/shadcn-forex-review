import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  console.log('URL:', supabaseUrl ? 'Found' : 'Missing');
  console.log('Key:', supabaseKey ? 'Found' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to check if a logo URL is a placeholder
function isPlaceholderLogo(logoUrl) {
  if (!logoUrl) return true;
  
  const placeholderPatterns = [
    'placehold.co',
    'ui-avatars.com',
    'placeholder',
    'fallback',
    'generic-broker-logo',
    'example.com',
    'localhost'
  ];
  
  return placeholderPatterns.some(pattern => logoUrl.includes(pattern));
}

async function checkBrokerLogos() {
  console.log('🔍 Checking broker logos...\n');
  
  try {
    // Fetch all brokers from database
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('id, name, logo_url')
      .order('name')
      .limit(10); // Limit to first 10 for testing
    
    if (error) {
      console.error('❌ Error fetching brokers:', error);
      return;
    }
    
    console.log(`📊 Found ${brokers.length} brokers (showing first 10)\n`);
    
    let needsUpdate = 0;
    let hasValidLogo = 0;
    
    // Check each broker
    for (const broker of brokers) {
      const needsLogoUpdate = isPlaceholderLogo(broker.logo_url);
      
      if (needsLogoUpdate) {
        console.log(`❌ ${broker.name}: Needs logo update (${broker.logo_url || 'No logo'})`);
        needsUpdate++;
      } else {
        console.log(`✅ ${broker.name}: Has valid logo (${broker.logo_url})`);
        hasValidLogo++;
      }
    }
    
    console.log('\n📊 SUMMARY:');
    console.log(`✅ Brokers with valid logos: ${hasValidLogo}`);
    console.log(`❌ Brokers needing logo updates: ${needsUpdate}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the check
checkBrokerLogos();
