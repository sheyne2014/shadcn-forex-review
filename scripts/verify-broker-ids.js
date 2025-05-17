// Verify broker IDs in the database
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Our list of broker IDs from previous check
const brokerIds = [
  'fc045eb3-73e9-4fbb-b751-2cc048f91bb7',  // XM
  '805f65c5-3911-448e-8800-0143bbbb2a0f',  // eToro
  'bd9f30a2-e461-4c8b-a818-08b3dfeb15ef',  // IG
  '0c23917a-0ef0-482e-a47b-1172ad5a8a58',  // Exness
  '50caffd3-e9b9-492c-af84-53944111fb0b',  // BlackBull Markets
  '960419e3-5605-4ae2-8874-1b5b866151b8',  // FXTM
  'c42628ea-bbf9-4d80-be65-b217a423b6cb',  // OCTA
  '728300eb-9d09-4ee6-9efd-0fe64f3956d1',  // Capital.com
  'ee2758ed-5ef8-4edc-b06e-972fee340d00',  // Vantage
  '2b0f13cf-5469-40d6-a96b-75585dc43222'   // FxPro
];

async function verifyBrokerIds() {
  console.log('Verifying broker IDs...');
  
  try {
    // Get total broker count
    const { data: totalCount, error: countError } = await supabase
      .from('brokers')
      .select('count');
    
    if (countError) {
      console.error('Error getting total count:', countError);
      return;
    }
    
    console.log(`Total brokers in database: ${totalCount[0].count}`);
    
    // Get the first few actual broker IDs from the database
    const { data: actualBrokers, error: brokerError } = await supabase
      .from('brokers')
      .select('id, name')
      .limit(5);
    
    if (brokerError) {
      console.error('Error getting actual brokers:', brokerError);
      return;
    }
    
    console.log('First 5 actual brokers in database:');
    actualBrokers.forEach(broker => {
      console.log(`- ${broker.name} (${broker.id})`);
    });
    
    // Check each of our broker IDs
    console.log('\nChecking our broker IDs one by one:');
    
    for (const brokerId of brokerIds) {
      const { data, error } = await supabase
        .from('brokers')
        .select('name')
        .eq('id', brokerId)
        .single();
      
      if (error) {
        console.log(`❌ Broker ID ${brokerId} not found: ${error.message}`);
      } else {
        console.log(`✅ Broker ID ${brokerId} exists: ${data.name}`);
      }
    }
    
    // Check the reviews foreign key constraint 
    console.log('\nChecking reviews table constraints:');
    const { data: constraints, error: constraintError } = await supabase
      .rpc('get_foreign_keys', { table_name: 'reviews' });
    
    if (constraintError) {
      console.error('Error getting constraints:', constraintError);
      // Try an alternative approach
      console.log('Error info:', constraintError);
    } else {
      console.log('Foreign key constraints for reviews table:');
      console.log(constraints);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

verifyBrokerIds()
  .then(() => {
    console.log('\nVerification completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 