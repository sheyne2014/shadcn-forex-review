require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function removeFinalBrokers() {
  console.log('🗑️  Removing final unwanted brokers...\n');
  
  try {
    // Remove WeBull Securities by ID
    console.log('Removing WeBull Securities (ID: 207ef7cd-7354-48d3-bb00-2f5483134769)...');
    const { data: webullData, error: webullError } = await supabase
      .from('brokers')
      .delete()
      .eq('id', '207ef7cd-7354-48d3-bb00-2f5483134769')
      .select('id, name');
      
    if (webullError) {
      console.error('❌ Error removing WeBull Securities:', webullError);
    } else if (webullData && webullData.length > 0) {
      console.log(`✅ Successfully removed: ${webullData[0].name}`);
    } else {
      console.log('⚠️  WeBull Securities not found or already removed');
    }

    // Remove Korea Investment & Securities by ID
    console.log('Removing Korea Investment & Securities (ID: 6b6e881a-c4a9-4abb-abd8-7ba6861a0c18)...');
    const { data: koreaData, error: koreaError } = await supabase
      .from('brokers')
      .delete()
      .eq('id', '6b6e881a-c4a9-4abb-abd8-7ba6861a0c18')
      .select('id, name');
      
    if (koreaError) {
      console.error('❌ Error removing Korea Investment & Securities:', koreaError);
    } else if (koreaData && koreaData.length > 0) {
      console.log(`✅ Successfully removed: ${koreaData[0].name}`);
    } else {
      console.log('⚠️  Korea Investment & Securities not found or already removed');
    }

    // Final verification
    console.log('\n📊 Final verification...');
    const { data: finalBrokers, error: countError } = await supabase
      .from('brokers')
      .select('id, name')
      .order('name');
      
    if (countError) {
      console.error('❌ Error getting final count:', countError);
    } else {
      console.log(`✅ Final broker count: ${finalBrokers.length} brokers`);
      
      // Check if the removed brokers are gone
      const webullExists = finalBrokers.find(b => b.id === '207ef7cd-7354-48d3-bb00-2f5483134769');
      const koreaExists = finalBrokers.find(b => b.id === '6b6e881a-c4a9-4abb-abd8-7ba6861a0c18');
      
      if (!webullExists && !koreaExists) {
        console.log('🎉 All target brokers successfully removed!');
        console.log('📈 Brokers listing page is now updated and clean');
      } else {
        if (webullExists) console.log('⚠️  WeBull Securities still exists');
        if (koreaExists) console.log('⚠️  Korea Investment & Securities still exists');
      }
    }

    console.log('\n✅ Broker removal process completed!');
    console.log('🌐 Visit http://localhost:3000/brokers to see the updated listing');
    
  } catch (error) {
    console.error('❌ Error during broker removal:', error);
  }
}

removeFinalBrokers();
