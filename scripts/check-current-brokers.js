require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Environment check:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Not set');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'Set' : 'Not set');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Not set');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'Set' : 'Not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBrokers() {
  try {
    console.log('Checking brokers in database...');

    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('id, name, logo_url, rating, min_deposit, country, regulations')
      .order('name');

    if (error) {
      console.error('Error fetching brokers:', error);
      return;
    }

    console.log(`\nFound ${brokers.length} brokers in database:\n`);

    // Group brokers by name to find duplicates
    const brokerGroups = {};
    brokers.forEach(broker => {
      const key = broker.name.toLowerCase().trim();
      if (!brokerGroups[key]) {
        brokerGroups[key] = [];
      }
      brokerGroups[key].push(broker);
    });

    // Find duplicates
    const duplicates = Object.entries(brokerGroups).filter(([name, brokers]) => brokers.length > 1);

    console.log('=== DUPLICATE ANALYSIS ===\n');
    console.log(`Found ${duplicates.length} duplicate broker groups:\n`);

    duplicates.forEach(([name, brokers]) => {
      console.log(`--- DUPLICATE: ${name.toUpperCase()} ---`);
      brokers.forEach((broker, index) => {
        console.log(`  ${index + 1}. ID: ${broker.id}`);
        console.log(`     Name: ${broker.name}`);
        console.log(`     Logo: ${broker.logo_url || 'No logo'}`);
        console.log(`     Rating: ${broker.rating || 'No rating'}`);
        console.log(`     Min Deposit: ${broker.min_deposit || 'No min deposit'}`);
        console.log(`     Country: ${broker.country || 'No country'}`);
        console.log(`     Regulations: ${broker.regulations || 'No regulations'}`);
        console.log('');
      });
    });

    console.log('\n=== ALL BROKERS ===\n');
    brokers.forEach((broker, index) => {
      console.log(`${index + 1}. ${broker.name} (ID: ${broker.id})`);
    });

    // Check for specific brokers we want to update/remove
    const brokersToRemove = [
      'Global FX Broker',
      'Trade Pro',
      'IC Pro',
      'Crypto.com',
      'RoboForex Pro',
      'Merrill',
      'Korea Investment',
      'Wells Fargo Advisors',
      'Dorman Trading Pro',
      'Phernex',
      'Webull Securities',
      'Gate.io'
    ];

    const logoUpdates = ['TD Ameritrade', 'FXTM'];

    console.log('=== ANALYSIS ===\n');

    console.log('Brokers to remove:');
    brokersToRemove.forEach(name => {
      const found = brokers.find(b => b.name === name);
      if (found) {
        console.log(`✓ Found: ${name} (ID: ${found.id})`);
      } else {
        console.log(`✗ Not found: ${name}`);
      }
    });

    console.log('\nBrokers needing logo updates:');
    logoUpdates.forEach(name => {
      const found = brokers.find(b => b.name === name);
      if (found) {
        console.log(`✓ Found: ${name} (ID: ${found.id})`);
        console.log(`  Current logo: ${found.logo_url || 'None'}`);
      } else {
        console.log(`✗ Not found: ${name}`);
      }
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

checkBrokers();
