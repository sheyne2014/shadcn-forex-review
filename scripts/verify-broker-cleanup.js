const fs = require('fs');
const path = require('path');

// List of brokers that should be removed from the project
const unwantedBrokers = [
  'LMAX',
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

// Files that were cleaned
const cleanedFiles = [
  'scripts/import-additional-brokers.js',
  'scripts/import-100-more-brokers-supabase.js',
  'scripts/import-100-more-brokers.js',
  'scripts/import-brokers.js',
  'src/scripts/add-missing-brokers.js'
];

// Generated review files that were removed
const removedReviewFiles = [
  'scripts/generated_reviews/LMAX_reviews.json',
  'scripts/generated_reviews/IC_Pro_reviews.json',
  'scripts/generated_reviews/Crypto_com_reviews.json',
  'scripts/generated_reviews/RoboForex_Pro_reviews.json',
  'scripts/generated_reviews/Merrill_reviews.json',
  'scripts/generated_reviews/Korea_Investment___Securities_reviews.json',
  'scripts/generated_reviews/Wells_Fargo_Advisors_reviews.json',
  'scripts/generated_reviews/Dorman_Trading_Pro_reviews.json',
  'scripts/generated_reviews/WeBull_Securities_reviews.json',
  'scripts/generated_reviews/Gate_io_reviews.json',
  'scripts/generated_reviews/Phemex_reviews.json'
];

function searchForBrokerReferences(filePath, brokerNames) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const foundReferences = [];
    
    brokerNames.forEach(brokerName => {
      // Search for various forms of the broker name
      const searchPatterns = [
        brokerName,
        brokerName.replace(/\s+/g, ''),
        brokerName.replace(/\s+/g, '_'),
        brokerName.replace(/\s+/g, '-'),
        brokerName.toLowerCase(),
        brokerName.toLowerCase().replace(/\s+/g, ''),
        brokerName.toLowerCase().replace(/\s+/g, '_'),
        brokerName.toLowerCase().replace(/\s+/g, '-')
      ];
      
      searchPatterns.forEach(pattern => {
        if (content.includes(pattern)) {
          foundReferences.push({
            broker: brokerName,
            pattern: pattern,
            file: filePath
          });
        }
      });
    });
    
    return foundReferences;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dirPath, extensions = ['.js', '.ts', '.tsx', '.jsx', '.json']) {
  const results = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        results.push(...scanDirectory(itemPath, extensions));
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        const references = searchForBrokerReferences(itemPath, unwantedBrokers);
        if (references.length > 0) {
          results.push(...references);
        }
      }
    });
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }
  
  return results;
}

function verifyCleanup() {
  console.log('🔍 Verifying broker cleanup...\n');
  
  // Check if cleaned files exist and verify they don't contain unwanted brokers
  console.log('📁 Checking cleaned files:');
  cleanedFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} - exists`);
      const references = searchForBrokerReferences(file, unwantedBrokers);
      if (references.length > 0) {
        console.log(`⚠️  Still contains references:`);
        references.forEach(ref => {
          console.log(`   - ${ref.broker} (${ref.pattern})`);
        });
      } else {
        console.log(`   ✅ Clean - no unwanted broker references found`);
      }
    } else {
      console.log(`❌ ${file} - does not exist`);
    }
  });
  
  console.log('\n📄 Checking removed review files:');
  removedReviewFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`❌ ${file} - still exists (should be removed)`);
    } else {
      console.log(`✅ ${file} - successfully removed`);
    }
  });
  
  // Scan entire project for any remaining references
  console.log('\n🔍 Scanning entire project for remaining references...');
  const projectRoot = process.cwd();
  const allReferences = scanDirectory(projectRoot);
  
  if (allReferences.length > 0) {
    console.log(`⚠️  Found ${allReferences.length} remaining references:`);
    allReferences.forEach(ref => {
      console.log(`   - ${ref.broker} in ${ref.file} (pattern: ${ref.pattern})`);
    });
  } else {
    console.log('✅ No remaining references found in the project!');
  }
  
  console.log('\n📊 Summary:');
  console.log(`- Unwanted brokers: ${unwantedBrokers.length}`);
  console.log(`- Files cleaned: ${cleanedFiles.length}`);
  console.log(`- Review files removed: ${removedReviewFiles.length}`);
  console.log(`- Remaining references: ${allReferences.length}`);
  
  if (allReferences.length === 0) {
    console.log('\n🎉 Cleanup completed successfully! All unwanted broker references have been removed.');
  } else {
    console.log('\n⚠️  Cleanup incomplete. Please review the remaining references above.');
  }
}

// Run verification
verifyCleanup();
