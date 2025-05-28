#!/usr/bin/env node

/**
 * Batch Update Brokers Script
 * Updates multiple broker pages to use the enhanced template
 */

const fs = require('fs').promises;
const path = require('path');

// Current batch of brokers to update
const CURRENT_BATCH = [
  'oanda',
  'interactive-brokers', 
  'fxpro',
  'xm',
  'avatrade'
];

/**
 * Check if a broker directory exists
 */
async function checkBrokerExists(slug) {
  const brokerPath = path.join(process.cwd(), 'src/app/broker', slug);
  try {
    await fs.access(brokerPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all available broker directories
 */
async function getAvailableBrokers() {
  const brokerDir = path.join(process.cwd(), 'src/app/broker');
  
  try {
    const entries = await fs.readdir(brokerDir, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(name => !name.startsWith('['));
  } catch (error) {
    console.error('Error scanning broker directory:', error);
    return [];
  }
}

/**
 * Check if a broker page uses enhanced template
 */
async function checkEnhancedTemplate(slug) {
  const pagePath = path.join(process.cwd(), 'src/app/broker', slug, 'page.tsx');
  
  try {
    const content = await fs.readFile(pagePath, 'utf-8');
    return content.includes('EnhancedBrokerPageTemplate');
  } catch {
    return false;
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🔍 Checking Batch Update Status...\n');
  
  // Get all available brokers
  const allBrokers = await getAvailableBrokers();
  console.log(`📊 Found ${allBrokers.length} total broker directories\n`);
  
  // Check current batch status
  console.log('📋 CURRENT BATCH STATUS');
  console.log('='.repeat(50));
  
  const batchResults = [];
  
  for (const slug of CURRENT_BATCH) {
    const exists = await checkBrokerExists(slug);
    const hasEnhanced = exists ? await checkEnhancedTemplate(slug) : false;
    
    batchResults.push({
      slug,
      exists,
      hasEnhanced,
      status: hasEnhanced ? '✅ Enhanced' : exists ? '🔄 Needs Update' : '❌ Missing'
    });
    
    console.log(`${batchResults[batchResults.length - 1].status.padEnd(15)} ${slug}`);
  }
  
  // Check already updated brokers
  console.log('\n✅ ALREADY UPDATED BROKERS');
  console.log('='.repeat(50));
  
  const updatedBrokers = [];
  const knownUpdated = ['xtb', 'ic-markets', 'plus500', 'etoro-usa', 'pepperstone'];
  
  for (const slug of knownUpdated) {
    const exists = await checkBrokerExists(slug);
    const hasEnhanced = exists ? await checkEnhancedTemplate(slug) : false;
    
    if (hasEnhanced) {
      updatedBrokers.push(slug);
      console.log(`✅ ${slug}`);
    }
  }
  
  // Find alternative brokers for missing ones
  console.log('\n🔍 ALTERNATIVE BROKERS AVAILABLE');
  console.log('='.repeat(50));
  
  const missingFromBatch = batchResults.filter(b => !b.exists).map(b => b.slug);
  const availableAlternatives = allBrokers.filter(broker => 
    !knownUpdated.includes(broker) && 
    !CURRENT_BATCH.includes(broker)
  ).slice(0, 10);
  
  console.log('Missing from batch:', missingFromBatch.join(', '));
  console.log('Available alternatives:', availableAlternatives.join(', '));
  
  // Summary
  console.log('\n📊 SUMMARY');
  console.log('='.repeat(50));
  
  const totalUpdated = updatedBrokers.length;
  const batchExists = batchResults.filter(b => b.exists).length;
  const batchNeedsUpdate = batchResults.filter(b => b.exists && !b.hasEnhanced).length;
  
  console.log(`Total Updated: ${totalUpdated}`);
  console.log(`Current Batch Exists: ${batchExists}/${CURRENT_BATCH.length}`);
  console.log(`Current Batch Needs Update: ${batchNeedsUpdate}`);
  console.log(`Available Alternatives: ${availableAlternatives.length}`);
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS');
  console.log('='.repeat(50));
  
  if (batchNeedsUpdate > 0) {
    console.log('1. Update existing brokers in current batch');
    batchResults.filter(b => b.exists && !b.hasEnhanced).forEach(b => {
      console.log(`   • Update ${b.slug}`);
    });
  }
  
  if (missingFromBatch.length > 0) {
    console.log('2. Use alternative brokers for missing ones:');
    missingFromBatch.forEach((missing, index) => {
      if (availableAlternatives[index]) {
        console.log(`   • Replace ${missing} with ${availableAlternatives[index]}`);
      }
    });
  }
  
  console.log('3. Continue with systematic rollout');
  console.log('4. Test updated pages with Google Rich Results Test');
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    totalBrokers: allBrokers.length,
    updatedBrokers,
    currentBatch: batchResults,
    availableAlternatives,
    summary: {
      totalUpdated,
      batchExists,
      batchNeedsUpdate
    }
  };
  
  const reportPath = path.join(process.cwd(), 'batch-update-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📊 Report saved to: ${reportPath}`);
  
  console.log('\n✅ Batch status check complete!');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkBrokerExists, checkEnhancedTemplate, getAvailableBrokers };
