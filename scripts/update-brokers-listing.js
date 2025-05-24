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
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Brokers to remove from the listing (based on actual database analysis)
const brokersToRemove = [
  'WeBull Securities',  // Found in database
  'Korea Investment & Securities'  // Found in database
];

// Logo updates for specific brokers (using better official logos)
const logoUpdates = {
  'TD Ameritrade': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/TD_Ameritrade_Holding_Corporation_logo.svg/320px-TD_Ameritrade_Holding_Corporation_logo.svg.png',
  'FXTM': 'https://www.fxtm.com/assets/images/logos/fxtm-logo.svg'
};

async function getCurrentBrokers() {
  console.log('Fetching current brokers from database...');

  const { data: brokers, error } = await supabase
    .from('brokers')
    .select('id, name, logo_url')
    .order('name');

  if (error) {
    console.error('Error fetching brokers:', error);
    return [];
  }

  console.log(`Found ${brokers.length} brokers in database:`);
  brokers.forEach(broker => {
    console.log(`- ${broker.name} (ID: ${broker.id})`);
  });

  return brokers;
}

async function updateBrokerLogos() {
  console.log('\n=== Updating Broker Logos ===');

  for (const [brokerName, logoUrl] of Object.entries(logoUpdates)) {
    console.log(`Updating logo for ${brokerName}...`);

    const { data, error } = await supabase
      .from('brokers')
      .update({ logo_url: logoUrl })
      .eq('name', brokerName)
      .select();

    if (error) {
      console.error(`Error updating logo for ${brokerName}:`, error);
    } else if (data && data.length > 0) {
      console.log(`✅ Successfully updated logo for ${brokerName}`);
    } else {
      console.log(`⚠️  No broker found with name: ${brokerName}`);
    }
  }
}

async function removeBrokers() {
  console.log('\n=== Removing Unwanted Brokers ===');

  for (const brokerName of brokersToRemove) {
    console.log(`Removing ${brokerName}...`);

    const { data, error } = await supabase
      .from('brokers')
      .delete()
      .eq('name', brokerName)
      .select();

    if (error) {
      console.error(`Error removing ${brokerName}:`, error);
    } else if (data && data.length > 0) {
      console.log(`✅ Successfully removed ${brokerName}`);
    } else {
      console.log(`⚠️  No broker found with name: ${brokerName}`);
    }
  }
}

async function verifyChanges() {
  console.log('\n=== Verifying Changes ===');

  const brokers = await getCurrentBrokers();

  // Check if removed brokers are gone
  const remainingUnwantedBrokers = brokers.filter(broker =>
    brokersToRemove.includes(broker.name)
  );

  if (remainingUnwantedBrokers.length > 0) {
    console.log('⚠️  Some brokers were not removed:');
    remainingUnwantedBrokers.forEach(broker => {
      console.log(`- ${broker.name}`);
    });
  } else {
    console.log('✅ All unwanted brokers have been removed');
  }

  // Check logo updates
  for (const [brokerName, expectedLogoUrl] of Object.entries(logoUpdates)) {
    const broker = brokers.find(b => b.name === brokerName);
    if (broker) {
      if (broker.logo_url === expectedLogoUrl) {
        console.log(`✅ Logo updated correctly for ${brokerName}`);
      } else {
        console.log(`⚠️  Logo not updated for ${brokerName}. Current: ${broker.logo_url}`);
      }
    } else {
      console.log(`⚠️  Broker ${brokerName} not found for logo verification`);
    }
  }
}

async function main() {
  try {
    console.log('🚀 Starting broker listing updates...\n');

    // Show current state
    await getCurrentBrokers();

    // Update logos
    await updateBrokerLogos();

    // Remove unwanted brokers
    await removeBrokers();

    // Verify changes
    await verifyChanges();

    console.log('\n✅ Broker listing updates completed!');

  } catch (error) {
    console.error('❌ Error during broker updates:', error);
    process.exit(1);
  }
}

// Run the script
main();
