// Script to delete specific brokers from the database
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// List of brokers to delete (case-insensitive partial matches)
const brokersToDelete = [
  'pepperstone pro',
  'thinkorswim pro',
  'nomura',
  'xyz broker',
  'nubank invest',
  'zerodha pro',
  'zerodha',
  'xp invest',
  'saxo investor',
  'tradovte',
  'upstox pro',

  'crypto exchange',
  'optionshouse pro',
  'optionshouse',
  'optimus futures pro',
  'options trader'
];

async function deleteBrokers() {
  try {
    console.log('Fetching brokers from database...');

    // Get all brokers
    const { data: brokers, error: fetchError } = await supabase
      .from('brokers')
      .select('id, name');

    if (fetchError) {
      throw new Error(`Error fetching brokers: ${fetchError.message}`);
    }

    if (!brokers || brokers.length === 0) {
      console.log('No brokers found in the database.');
      return;
    }

    console.log(`Found ${brokers.length} brokers in the database.`);

    // Find brokers to delete based on name matches
    const brokersToDeleteIds = [];
    const brokersToDeleteNames = [];

    for (const broker of brokers) {
      for (const nameToDelete of brokersToDelete) {
        if (broker.name.toLowerCase().includes(nameToDelete.toLowerCase())) {
          brokersToDeleteIds.push(broker.id);
          brokersToDeleteNames.push(broker.name);
          break;
        }
      }
    }

    if (brokersToDeleteIds.length === 0) {
      console.log('No matching brokers found to delete.');
      return;
    }

    console.log(`Found ${brokersToDeleteIds.length} brokers to delete:`);
    brokersToDeleteNames.forEach(name => console.log(`- ${name}`));

    // Delete broker_categories junction table entries first
    console.log('Deleting broker category associations...');
    const { error: junctionError } = await supabase
      .from('broker_categories')
      .delete()
      .in('broker_id', brokersToDeleteIds);

    if (junctionError) {
      console.warn(`Warning: Error deleting broker categories: ${junctionError.message}`);
    }

    // Delete reviews associated with these brokers
    console.log('Deleting broker reviews...');
    const { error: reviewsError } = await supabase
      .from('reviews')
      .delete()
      .in('broker_id', brokersToDeleteIds);

    if (reviewsError) {
      console.warn(`Warning: Error deleting broker reviews: ${reviewsError.message}`);
    }

    // Delete the brokers
    console.log('Deleting brokers...');
    const { error: deleteError } = await supabase
      .from('brokers')
      .delete()
      .in('id', brokersToDeleteIds);

    if (deleteError) {
      throw new Error(`Error deleting brokers: ${deleteError.message}`);
    }

    console.log(`Successfully deleted ${brokersToDeleteIds.length} brokers.`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the function
deleteBrokers();
