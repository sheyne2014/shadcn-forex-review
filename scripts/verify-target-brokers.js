require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyTargetBrokers() {
  console.log('🔍 Verifying target brokers...\n');
  
  try {
    // Check for WeBull Securities
    console.log('Checking for WeBull Securities...');
    const { data: webullData, error: webullError } = await supabase
      .from('brokers')
      .select('*')
      .eq('name', 'WeBull Securities');
      
    if (webullError) {
      console.error('❌ Error checking WeBull Securities:', webullError);
    } else {
      console.log(`Found ${webullData.length} WeBull Securities entries:`);
      webullData.forEach(broker => {
        console.log(`- ID: ${broker.id}, Name: ${broker.name}`);
      });
    }

    // Check for Korea Investment & Securities
    console.log('\nChecking for Korea Investment & Securities...');
    const { data: koreaData, error: koreaError } = await supabase
      .from('brokers')
      .select('*')
      .eq('name', 'Korea Investment & Securities');
      
    if (koreaError) {
      console.error('❌ Error checking Korea Investment & Securities:', koreaError);
    } else {
      console.log(`Found ${koreaData.length} Korea Investment & Securities entries:`);
      koreaData.forEach(broker => {
        console.log(`- ID: ${broker.id}, Name: ${broker.name}`);
      });
    }

    // Check for TD Ameritrade
    console.log('\nChecking for TD Ameritrade...');
    const { data: tdData, error: tdError } = await supabase
      .from('brokers')
      .select('*')
      .eq('name', 'TD Ameritrade');
      
    if (tdError) {
      console.error('❌ Error checking TD Ameritrade:', tdError);
    } else {
      console.log(`Found ${tdData.length} TD Ameritrade entries:`);
      tdData.forEach(broker => {
        console.log(`- ID: ${broker.id}, Name: ${broker.name}, Logo: ${broker.logo_url}`);
      });
    }

    // Check for FXTM
    console.log('\nChecking for FXTM...');
    const { data: fxtmData, error: fxtmError } = await supabase
      .from('brokers')
      .select('*')
      .eq('name', 'FXTM');
      
    if (fxtmError) {
      console.error('❌ Error checking FXTM:', fxtmError);
    } else {
      console.log(`Found ${fxtmData.length} FXTM entries:`);
      fxtmData.forEach(broker => {
        console.log(`- ID: ${broker.id}, Name: ${broker.name}, Logo: ${broker.logo_url}`);
      });
    }

    console.log('\n✅ Verification completed!');
    
  } catch (error) {
    console.error('❌ Error during verification:', error);
  }
}

verifyTargetBrokers();
