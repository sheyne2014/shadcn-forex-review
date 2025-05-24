require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function finalCleanup() {
  console.log('🧹 Final broker cleanup...\n');
  
  try {
    // Remove WeBull Securities (ID: 207ef7cd-7354-48d3-bb00-2f5483134769)
    console.log('Removing WeBull Securities...');
    const { data: webullData, error: webullError } = await supabase
      .from('brokers')
      .delete()
      .eq('id', '207ef7cd-7354-48d3-bb00-2f5483134769')
      .select();
      
    if (webullError) {
      console.error('❌ Error removing WeBull Securities:', webullError);
    } else if (webullData && webullData.length > 0) {
      console.log('✅ WeBull Securities removed successfully');
    } else {
      console.log('⚠️  WeBull Securities not found');
    }

    // Remove Korea Investment & Securities (ID: 6b6e881a-c4a9-4abb-abd8-7ba6861a0c18)
    console.log('Removing Korea Investment & Securities...');
    const { data: koreaData, error: koreaError } = await supabase
      .from('brokers')
      .delete()
      .eq('id', '6b6e881a-c4a9-4abb-abd8-7ba6861a0c18')
      .select();
      
    if (koreaError) {
      console.error('❌ Error removing Korea Investment & Securities:', koreaError);
    } else if (koreaData && koreaData.length > 0) {
      console.log('✅ Korea Investment & Securities removed successfully');
    } else {
      console.log('⚠️  Korea Investment & Securities not found');
    }

    // Verify final count
    console.log('\nVerifying final broker count...');
    const { data: finalBrokers, error: countError } = await supabase
      .from('brokers')
      .select('id, name')
      .order('name');
      
    if (countError) {
      console.error('❌ Error getting final count:', countError);
    } else {
      console.log(`✅ Final broker count: ${finalBrokers.length} brokers`);
      
      // Check if the removed brokers are gone
      const webullExists = finalBrokers.find(b => b.name === 'WeBull Securities');
      const koreaExists = finalBrokers.find(b => b.name === 'Korea Investment & Securities');
      
      if (!webullExists && !koreaExists) {
        console.log('✅ All target brokers successfully removed');
      } else {
        if (webullExists) console.log('⚠️  WeBull Securities still exists');
        if (koreaExists) console.log('⚠️  Korea Investment & Securities still exists');
      }
    }

    console.log('\n✅ Final cleanup completed!');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

finalCleanup();
