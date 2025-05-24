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
      .select('id, name, logo_url')
      .order('name');

    if (error) {
      console.error('Error fetching brokers:', error);
      return;
    }

    console.log(`\nFound ${brokers.length} brokers in database:\n`);

    brokers.forEach((broker, index) => {
      console.log(`${index + 1}. ${broker.name}`);
      console.log(`   ID: ${broker.id}`);
      console.log(`   Logo: ${broker.logo_url || 'No logo'}`);
      console.log('');
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
