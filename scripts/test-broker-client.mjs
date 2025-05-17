import { createClient } from '@supabase/supabase-js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase URL or service role key in environment variables.');
  process.exit(1);
}

// Create Supabase client (same as in broker-client.ts)
const supabaseBrokerClient = createClient(supabaseUrl, supabaseServiceKey);

// Reimplement the getBrokers function from broker-client.ts to test it
async function getBrokers({
  limit = 10,
  page = 1,
  category_id,
  country,
  min_rating,
  sort_by = "rating",
  sort_order = "desc"
} = {}) {
  try {
    console.log('Calling getBrokers with params:', { limit, page, category_id, country, min_rating, sort_by, sort_order });
    
    let query = supabaseBrokerClient
      .from('brokers')
      .select('*')
      .order(sort_by, { ascending: sort_order === 'asc' })
      .range((page - 1) * limit, page * limit - 1);

    // Apply filters if provided
    if (min_rating) {
      query = query.gte('rating', min_rating);
    }

    if (country) {
      query = query.eq('country', country);
    }

    // Log the query details
    console.log('Query details:', query);

    const { data, error, count } = await query;
    
    // Log the raw response
    console.log('Raw response data:', data);
    console.log('Error:', error);
    console.log('Count:', count);

    return { data, error, count };
  } catch (error) {
    console.error("Error getting brokers:", error);
    return { data: [], error };
  }
}

async function testBrokerClient() {
  try {
    console.log('Testing broker client getBrokers function...');
    
    // Test with the same parameters as in the page.tsx file
    const { data: brokers = [], error: brokersError } = await getBrokers({
      limit: 100,
      sort_by: "rating",
      sort_order: "desc"
    });

    if (brokersError) {
      console.error("Error fetching brokers:", brokersError);
      return;
    }

    console.log(`Fetched ${brokers?.length || 0} brokers from Supabase`);
    
    if (brokers && brokers.length > 0) {
      console.log('First broker:', brokers[0]);
    } else {
      console.log('No brokers returned from the function');
      
      // Let's try a direct query to see if there's any difference
      console.log('\nTrying direct query as fallback:');
      const { data: directData, error: directError } = await supabaseBrokerClient
        .from('brokers')
        .select('*')
        .limit(5);
        
      if (directError) {
        console.error('Direct query error:', directError);
      } else {
        console.log(`Direct query returned ${directData?.length || 0} brokers`);
        if (directData && directData.length > 0) {
          console.log('First broker from direct query:', directData[0]);
        }
      }
    }
    
    // Check environment variables
    console.log('\nEnvironment variables check:');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Defined' : 'Not defined');
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Defined' : 'Not defined');
    console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Defined' : 'Not defined');
    
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

testBrokerClient(); 