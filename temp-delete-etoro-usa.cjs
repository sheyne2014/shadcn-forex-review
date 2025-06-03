require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteEtoroUSA() {
  try {
    console.log('🗑️  DELETING REMAINING ETORO USA ENTRY\n');
    
    const { error } = await supabase
      .from('brokers')
      .delete()
      .eq('id', 'd9e11333-f08d-49d3-8ebe-f73f319cc7fb');
    
    if (error) {
      console.error('Error deleting eToro USA:', error);
    } else {
      console.log('✅ Successfully deleted eToro USA from database');
    }
    
    // Final verification
    const { data: finalCheck, error: finalError } = await supabase
      .from('brokers')
      .select('id, name')
      .or('name.ilike.%etoro usa%,name.ilike.%etoro-usa%,name.eq.eToro USA');
    
    if (finalError) {
      console.error('Error in final verification:', finalError);
      return;
    }
    
    if (finalCheck.length === 0) {
      console.log('✅ VERIFICATION PASSED: eToro USA completely removed from database');
    } else {
      console.log(`❌ VERIFICATION FAILED: ${finalCheck.length} eToro USA entries still exist`);
      finalCheck.forEach(broker => {
        console.log(`  - ${broker.name} (ID: ${broker.id})`);
      });
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the deletion
deleteEtoroUSA(); 