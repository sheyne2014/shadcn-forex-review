const fs = require('fs');
const path = require('path');

// List of brokers that should be deleted from static files
const deletedBrokers = [
  'Angel One',
  'AMP Futures', 
  'Ally Invest',
  '50K Global',
  'Test Stock Broker',
  'Global FX',
  'Test Forex Broker', 
  'Test Crypto Broker',
  'Groww',
  'ATFX Connect',
  'Stock Trader',
  'Angel Broking',
  'Avenue Securities',
  'LCG'
];

// Files that were cleaned
const cleanedFiles = [
  'broker-logos/logo-search-results.json',
  'scripts/ensure-test-brokers.mjs',
  'broker-logos-simple/logo-results-batch-1.json',
  'broker-logos-simple/logo-results-batch-16.json',
  'broker-logos-simple/logo-results-batch-19.json',
  'broker-logos/logo-results-batch-1.json',
  'broker-logos/logo-results-final.json',
  'broker-logos-simple/logo-results-batch-5.json',
  'broker-logos-simple/logo-results-final.json',
  'broker-logos/logo-results-batch-5.json',
  'broker-logos/logo-report.html',
  'broker-logos-simple/logo-report.html',
  'scripts/import-100-more-brokers.js',
  'scripts/populate-db.mjs',
  'scripts/delete-brokers.js'
];

// Review files that were removed
const removedReviewFiles = [
  'scripts/generated_reviews/Angel_One_reviews.json',
  'scripts/generated_reviews/50K_Global_reviews.json',
  'scripts/generated_reviews/AMP_Futures_reviews.json',
  'scripts/generated_reviews/ATFX_Connect_reviews.json',
  'scripts/generated_reviews/Ally_Invest_reviews.json',
  'scripts/generated_reviews/Angel_Broking_reviews.json',
  'scripts/generated_reviews/Avenue_Securities_Pro_reviews.json',
  'scripts/generated_reviews/Avenue_Securities_reviews.json',
  'scripts/generated_reviews/Groww_Stocks_reviews.json',
  'scripts/generated_reviews/Groww_reviews.json',
  'scripts/generated_reviews/LCG_Pro_reviews.json',
  'scripts/generated_reviews/LCG_reviews.json'
];

// Scripts that were removed
const removedScripts = [
  'scripts/delete-specified-brokers.js',
  'src/app/admin/delete-brokers/page.tsx',
  'src/app/api/delete-brokers/route.ts',
  'scripts/execute-deletion.js',
  'delete-brokers-simple.js',
  'scripts/delete-brokers.sql'
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
    return [];
  }
}

function scanDirectory(dirPath, excludeDirs = ['node_modules', '.git', '.next', 'dist', 'build']) {
  let allReferences = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !excludeDirs.includes(item)) {
        allReferences = allReferences.concat(scanDirectory(fullPath, excludeDirs));
      } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.json') || item.endsWith('.html') || item.endsWith('.mjs') || item.endsWith('.ts') || item.endsWith('.tsx'))) {
        const references = searchForBrokerReferences(fullPath, deletedBrokers);
        allReferences = allReferences.concat(references);
      }
    }
  } catch (error) {
    // Skip directories we can't read
  }
  
  return allReferences;
}

console.log('🔍 Verifying broker deletion from static files...\n');

console.log('📄 Checking cleaned files:');
cleanedFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - exists and was cleaned`);
  } else {
    console.log(`❌ ${file} - file not found`);
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

console.log('\n📄 Checking removed script files:');
removedScripts.forEach(file => {
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
  console.log('✅ No remaining references found in static files!');
}

console.log('\n🎉 Broker deletion verification completed!');
console.log('\n📋 Summary:');
console.log(`   - Targeted brokers: ${deletedBrokers.length}`);
console.log(`   - Cleaned files: ${cleanedFiles.length}`);
console.log(`   - Removed review files: ${removedReviewFiles.length}`);
console.log(`   - Removed script files: ${removedScripts.length}`);
console.log(`   - Remaining references: ${allReferences.length}`);
