import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// List of brokers to add
const brokersToAdd = [
  {
    name: "50K Global",
    logo_url: "https://broker-analysis.com/images/brokers/50k-global.png",
    min_deposit: 50,
    trading_fee: 0.6,
    regulations: "FSA, ASIC",
    supported_assets: ["Forex", "CFDs", "Crypto"],
    country: "Seychelles",
    rating: 4.3
  },


];

// Function to add brokers
async function addBrokers() {
  console.log('Starting to add missing brokers...');

  for (const broker of brokersToAdd) {
    try {
      // Check if broker already exists
      const { data: existingBrokers, error: searchError } = await supabase
        .from('brokers')
        .select('*')
        .ilike('name', `%${broker.name}%`);

      if (searchError) {
        console.error(`Error searching for broker ${broker.name}:`, searchError);
        continue;
      }

      if (existingBrokers && existingBrokers.length > 0) {
        console.log(`Broker "${broker.name}" already exists, skipping.`);
        continue;
      }

      // Insert the new broker
      const { data, error } = await supabase
        .from('brokers')
        .insert({
          name: broker.name,
          logo_url: broker.logo_url,
          min_deposit: broker.min_deposit,
          trading_fee: broker.trading_fee,
          regulations: broker.regulations,
          supported_assets: broker.supported_assets,
          country: broker.country,
          rating: broker.rating
        })
        .select();

      if (error) {
        console.error(`Error adding broker ${broker.name}:`, error);
      } else {
        console.log(`Successfully added broker: ${broker.name}`);
      }
    } catch (error) {
      console.error(`Unexpected error adding broker ${broker.name}:`, error);
    }
  }

  console.log('Finished adding brokers.');
}

// Run the function
addBrokers().catch(console.error);