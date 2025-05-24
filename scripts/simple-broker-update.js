require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateBrokers() {
  console.log('🚀 Starting broker updates...\n');
  
  try {
    // 1. Update TD Ameritrade logo
    console.log('Updating TD Ameritrade logo...');
    const { data: tdData, error: tdError } = await supabase
      .from('brokers')
      .update({ 
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/TD_Ameritrade_Holding_Corporation_logo.svg/320px-TD_Ameritrade_Holding_Corporation_logo.svg.png' 
      })
      .eq('name', 'TD Ameritrade')
      .select();
      
    if (tdError) {
      console.error('❌ Error updating TD Ameritrade:', tdError);
    } else if (tdData && tdData.length > 0) {
      console.log('✅ TD Ameritrade logo updated successfully');
    } else {
      console.log('⚠️  TD Ameritrade not found');
    }

    // 2. Update FXTM logo
    console.log('Updating FXTM logo...');
    const { data: fxtmData, error: fxtmError } = await supabase
      .from('brokers')
      .update({ 
        logo_url: 'https://www.fxtm.com/assets/images/logos/fxtm-logo.svg' 
      })
      .eq('name', 'FXTM')
      .select();
      
    if (fxtmError) {
      console.error('❌ Error updating FXTM:', fxtmError);
    } else if (fxtmData && fxtmData.length > 0) {
      console.log('✅ FXTM logo updated successfully');
    } else {
      console.log('⚠️  FXTM not found');
    }

    // 3. Remove WeBull Securities
    console.log('Removing WeBull Securities...');
    const { data: webullData, error: webullError } = await supabase
      .from('brokers')
      .delete()
      .eq('name', 'WeBull Securities')
      .select();
      
    if (webullError) {
      console.error('❌ Error removing WeBull Securities:', webullError);
    } else if (webullData && webullData.length > 0) {
      console.log('✅ WeBull Securities removed successfully');
    } else {
      console.log('⚠️  WeBull Securities not found');
    }

    // 4. Remove Korea Investment & Securities
    console.log('Removing Korea Investment & Securities...');
    const { data: koreaData, error: koreaError } = await supabase
      .from('brokers')
      .delete()
      .eq('name', 'Korea Investment & Securities')
      .select();
      
    if (koreaError) {
      console.error('❌ Error removing Korea Investment & Securities:', koreaError);
    } else if (koreaData && koreaData.length > 0) {
      console.log('✅ Korea Investment & Securities removed successfully');
    } else {
      console.log('⚠️  Korea Investment & Securities not found');
    }

    console.log('\n✅ Broker updates completed!');
    
  } catch (error) {
    console.error('❌ Error during updates:', error);
  }
}

updateBrokers();
