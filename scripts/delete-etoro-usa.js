require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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
    console.log('🗑️  DELETING ETORO USA\n');
    
    // Step 1: Delete from database
    console.log('🔍 Step 1: Searching for eToro USA in database...');
    
    const { data: etoroUSABrokers, error: searchError } = await supabase
      .from('brokers')
      .select('id, name')
      .or('name.ilike.%etoro usa%,name.ilike.%etoro-usa%,name.eq.eToro USA');
    
    if (searchError) {
      console.error('Error searching for eToro USA:', searchError);
      return;
    }
    
    if (etoroUSABrokers.length === 0) {
      console.log('✅ No eToro USA entries found in database');
    } else {
      console.log(`Found ${etoroUSABrokers.length} eToro USA entries:`);
      etoroUSABrokers.forEach(broker => {
        console.log(`  - ${broker.name} (ID: ${broker.id})`);
      });
      
      // Delete each entry
      for (const broker of etoroUSABrokers) {
        console.log(`🗑️  Deleting ${broker.name}...`);
        const { error: deleteError } = await supabase
          .from('brokers')
          .delete()
          .eq('id', broker.id);
        
        if (deleteError) {
          console.error(`❌ Error deleting ${broker.id}:`, deleteError);
        } else {
          console.log(`✅ Successfully deleted ${broker.name}`);
        }
      }
    }
    
    // Step 2: Delete broker page directory
    console.log('\n🗂️  Step 2: Removing eToro USA page directory...');
    
    const etoroUSADir = path.join(process.cwd(), 'src/app/broker/etoro-usa');
    
    if (fs.existsSync(etoroUSADir)) {
      console.log(`Found directory: ${etoroUSADir}`);
      
      // Remove the directory and all its contents
      fs.rmSync(etoroUSADir, { recursive: true, force: true });
      console.log('✅ Successfully removed eToro USA directory');
    } else {
      console.log('✅ eToro USA directory not found (already removed)');
    }
    
    // Step 3: Check for any references in other files
    console.log('\n🔍 Step 3: Checking for references in other files...');
    
    const filesToCheck = [
      'src/lib/broker-data-service.ts',
      'src/app/best-brokers/page.tsx',
      'FINAL_ROLLOUT_SUMMARY.md',
      'FINAL_SYSTEMATIC_ROLLOUT_STATUS.md'
    ];
    
    let referencesFound = false;
    
    filesToCheck.forEach(filePath => {
      const fullPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.toLowerCase().includes('etoro usa') || content.includes('etoro-usa')) {
          console.log(`⚠️  Found reference in: ${filePath}`);
          referencesFound = true;
        }
      }
    });
    
    if (!referencesFound) {
      console.log('✅ No references found in checked files');
    }
    
    // Step 4: Final verification
    console.log('\n🔍 Step 4: Final verification...');
    
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
    
    console.log('\n🎉 ETORO USA DELETION COMPLETED!');
    console.log('\n📋 SUMMARY:');
    console.log(`   - Database entries removed: ${etoroUSABrokers.length}`);
    console.log(`   - Directory removed: ${fs.existsSync(etoroUSADir) ? 'No' : 'Yes'}`);
    console.log(`   - References found: ${referencesFound ? 'Yes (check manually)' : 'No'}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Visit http://localhost:3000/brokers to verify removal');
    console.log('   2. Check that eToro USA no longer appears in broker lists');
    console.log('   3. Verify /broker/etoro-usa returns 404');
    
  } catch (error) {
    console.error('❌ Error in eToro USA deletion:', error);
  }
}

// Run the deletion
deleteEtoroUSA();
