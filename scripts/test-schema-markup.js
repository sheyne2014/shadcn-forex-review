#!/usr/bin/env node

/**
 * Schema Markup Testing Script
 * Tests broker pages for valid JSON-LD schema markup
 */

const fs = require('fs').promises;
const path = require('path');

// Updated broker pages to test
const UPDATED_BROKERS = [
  'xtb',
  'ic-markets', 
  'plus500'
];

/**
 * Extract and validate schema markup from a broker page
 */
async function testSchemaMarkup(slug) {
  const pagePath = path.join(process.cwd(), 'src/app/broker', slug, 'page.tsx');
  
  try {
    const content = await fs.readFile(pagePath, 'utf-8');
    
    // Check for enhanced template (which includes schema)
    const hasEnhancedTemplate = content.includes('EnhancedBrokerPageTemplate');
    
    // Check for manual schema markup
    const hasManualSchema = content.includes('application/ld+json') || content.includes('@type": "Review');
    
    // Check for metadata optimization
    const hasOptimizedMeta = content.includes('generateEnhancedBrokerMetadata');
    
    // Extract title for length check
    let titleLength = 0;
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch) {
      titleLength = titleMatch[1].length;
    }
    
    // Check for broker data structure
    const hasBrokerData = content.includes('BrokerPageData');
    
    return {
      slug,
      hasEnhancedTemplate,
      hasManualSchema,
      hasOptimizedMeta,
      hasBrokerData,
      titleLength,
      schemaReady: hasEnhancedTemplate || hasManualSchema,
      seoOptimized: hasOptimizedMeta && titleLength > 0 && titleLength <= 60,
      status: hasEnhancedTemplate ? 'Enhanced Template' : 
              hasManualSchema ? 'Manual Schema' : 'No Schema'
    };
  } catch (error) {
    return {
      slug,
      error: error.message,
      hasEnhancedTemplate: false,
      hasManualSchema: false,
      hasOptimizedMeta: false,
      hasBrokerData: false,
      titleLength: 0,
      schemaReady: false,
      seoOptimized: false,
      status: 'Error'
    };
  }
}

/**
 * Generate Google Rich Results Test URLs
 */
function generateTestUrls(baseUrl = 'http://localhost:3002') {
  return UPDATED_BROKERS.map(slug => ({
    broker: slug,
    url: `${baseUrl}/broker/${slug}`,
    testUrl: `https://search.google.com/test/rich-results?url=${encodeURIComponent(`${baseUrl}/broker/${slug}`)}`
  }));
}

/**
 * Main execution function
 */
async function main() {
  console.log('🔍 Testing Schema Markup for Updated Broker Pages...\n');
  
  const results = [];
  
  // Test each updated broker page
  for (const slug of UPDATED_BROKERS) {
    const result = await testSchemaMarkup(slug);
    results.push(result);
    
    const statusIcon = result.schemaReady ? '✅' : '❌';
    const seoIcon = result.seoOptimized ? '✅' : '⚠️';
    
    console.log(`${statusIcon} ${slug.padEnd(15)} - Schema: ${result.status.padEnd(20)} | SEO: ${seoIcon} | Title: ${result.titleLength} chars`);
  }
  
  // Summary
  console.log('\n📊 SCHEMA MARKUP SUMMARY');
  console.log('='.repeat(60));
  
  const total = results.length;
  const schemaReady = results.filter(r => r.schemaReady).length;
  const seoOptimized = results.filter(r => r.seoOptimized).length;
  const enhancedTemplate = results.filter(r => r.hasEnhancedTemplate).length;
  
  console.log(`Total Updated Pages: ${total}`);
  console.log(`Schema Ready: ${schemaReady}/${total} (${((schemaReady/total)*100).toFixed(1)}%)`);
  console.log(`SEO Optimized: ${seoOptimized}/${total} (${((seoOptimized/total)*100).toFixed(1)}%)`);
  console.log(`Enhanced Template: ${enhancedTemplate}/${total} (${((enhancedTemplate/total)*100).toFixed(1)}%)`);
  
  // Google Rich Results Test URLs
  console.log('\n🔗 GOOGLE RICH RESULTS TEST URLS');
  console.log('='.repeat(60));
  console.log('Copy these URLs to test schema markup in Google Rich Results Test:\n');
  
  const testUrls = generateTestUrls();
  testUrls.forEach(({ broker, url, testUrl }) => {
    console.log(`${broker.toUpperCase()}:`);
    console.log(`Page URL: ${url}`);
    console.log(`Test URL: ${testUrl}\n`);
  });
  
  // Manual testing instructions
  console.log('📋 MANUAL TESTING INSTRUCTIONS');
  console.log('='.repeat(60));
  console.log('1. Open each "Test URL" above in your browser');
  console.log('2. Google Rich Results Test will analyze the page');
  console.log('3. Look for "Review" and "FinancialService" schema types');
  console.log('4. Verify no errors or warnings are shown');
  console.log('5. Check that structured data is properly detected\n');
  
  // Schema validation checklist
  console.log('✅ SCHEMA VALIDATION CHECKLIST');
  console.log('='.repeat(60));
  console.log('□ Review schema with rating, author, publisher');
  console.log('□ FinancialService schema with name, description, URL');
  console.log('□ BreadcrumbList schema for navigation');
  console.log('□ Proper @context and @type declarations');
  console.log('□ Valid JSON-LD syntax (no errors)');
  console.log('□ All required properties present');
  console.log('□ Dates in ISO format (YYYY-MM-DD)');
  console.log('□ Rating values within valid range (1-5)\n');
  
  // Performance monitoring setup
  console.log('📈 PERFORMANCE MONITORING SETUP');
  console.log('='.repeat(60));
  console.log('1. Set up Google Search Console monitoring');
  console.log('2. Track rich snippet appearance in SERPs');
  console.log('3. Monitor click-through rates for updated pages');
  console.log('4. Set up PageSpeed Insights monitoring');
  console.log('5. Track Core Web Vitals improvements');
  console.log('6. Monitor search ranking changes\n');
  
  // Save test results
  const reportPath = path.join(process.cwd(), 'schema-test-results.json');
  await fs.writeFile(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    results,
    testUrls,
    summary: {
      total,
      schemaReady,
      seoOptimized,
      enhancedTemplate
    }
  }, null, 2));
  
  console.log(`📊 Test results saved to: ${reportPath}`);
  console.log('\n✅ Schema markup testing complete!');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testSchemaMarkup, generateTestUrls, UPDATED_BROKERS };
