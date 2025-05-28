#!/usr/bin/env tsx

/**
 * SEO Improvements Validation Script
 * Validates all implemented SEO improvements across broker pages
 */

import fs from 'fs/promises';
import path from 'path';

interface ValidationResult {
  page: string;
  hasOptimizedTitle: boolean;
  hasSchema: boolean;
  hasNavigation: boolean;
  hasOptimizedImages: boolean;
  hasInternalLinks: boolean;
  titleLength: number;
  issues: string[];
  score: number;
}

/**
 * Validate a single broker page
 */
async function validateBrokerPage(slug: string): Promise<ValidationResult> {
  const pagePath = path.join(process.cwd(), 'src/app/broker', slug, 'page.tsx');
  const result: ValidationResult = {
    page: slug,
    hasOptimizedTitle: false,
    hasSchema: false,
    hasNavigation: false,
    hasOptimizedImages: false,
    hasInternalLinks: false,
    titleLength: 0,
    issues: [],
    score: 0
  };

  try {
    const content = await fs.readFile(pagePath, 'utf-8');

    // Check for enhanced template usage
    if (content.includes('EnhancedBrokerPageTemplate')) {
      result.hasOptimizedTitle = true;
      result.hasSchema = true;
      result.hasNavigation = true;
      result.hasOptimizedImages = true;
      result.hasInternalLinks = true;
    } else {
      // Check individual components
      result.hasOptimizedTitle = content.includes('generateEnhancedBrokerMetadata') || 
                                 content.includes('generateBrokerMetadata');
      result.hasSchema = content.includes('application/ld+json') || 
                        content.includes('@type": "Review');
      result.hasNavigation = content.includes('BrokerPageNavigation');
      result.hasOptimizedImages = content.includes('OptimizedBrokerImage') || 
                                 content.includes('BrokerLogo');
      result.hasInternalLinks = content.includes('BrokerInternalLinks');
    }

    // Extract title length
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch) {
      result.titleLength = titleMatch[1].length;
      if (result.titleLength > 60) {
        result.issues.push(`Title too long: ${result.titleLength} characters`);
      }
    } else {
      result.issues.push('No title found');
    }

    // Check for common issues
    if (!result.hasOptimizedTitle) {
      result.issues.push('Missing optimized title generation');
    }
    if (!result.hasSchema) {
      result.issues.push('Missing schema markup');
    }
    if (!result.hasNavigation) {
      result.issues.push('Missing enhanced navigation');
    }
    if (!result.hasOptimizedImages) {
      result.issues.push('Missing optimized image components');
    }
    if (!result.hasInternalLinks) {
      result.issues.push('Missing internal linking');
    }

    // Calculate score
    const checks = [
      result.hasOptimizedTitle,
      result.hasSchema,
      result.hasNavigation,
      result.hasOptimizedImages,
      result.hasInternalLinks
    ];
    result.score = (checks.filter(Boolean).length / checks.length) * 100;

  } catch (error) {
    result.issues.push(`Error reading file: ${error}`);
  }

  return result;
}

/**
 * Get all broker page slugs
 */
async function getBrokerSlugs(): Promise<string[]> {
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
 * Main validation function
 */
async function main() {
  console.log('🔍 Validating SEO Improvements Across Broker Pages...\n');

  const slugs = await getBrokerSlugs();
  console.log(`📊 Found ${slugs.length} broker pages to validate\n`);

  const results: ValidationResult[] = [];
  
  for (const slug of slugs) {
    console.log(`🔍 Validating ${slug}...`);
    const result = await validateBrokerPage(slug);
    results.push(result);
  }

  // Generate summary report
  console.log('\n📋 VALIDATION SUMMARY\n');
  console.log('='.repeat(80));

  const totalPages = results.length;
  const fullyOptimized = results.filter(r => r.score === 100).length;
  const partiallyOptimized = results.filter(r => r.score > 0 && r.score < 100).length;
  const notOptimized = results.filter(r => r.score === 0).length;

  console.log(`Total Pages: ${totalPages}`);
  console.log(`Fully Optimized (100%): ${fullyOptimized}`);
  console.log(`Partially Optimized: ${partiallyOptimized}`);
  console.log(`Not Optimized: ${notOptimized}`);
  console.log(`Average Score: ${(results.reduce((sum, r) => sum + r.score, 0) / totalPages).toFixed(1)}%`);

  // Feature adoption rates
  console.log('\n📈 FEATURE ADOPTION RATES\n');
  console.log('='.repeat(80));
  
  const features = [
    { name: 'Optimized Titles', count: results.filter(r => r.hasOptimizedTitle).length },
    { name: 'Schema Markup', count: results.filter(r => r.hasSchema).length },
    { name: 'Enhanced Navigation', count: results.filter(r => r.hasNavigation).length },
    { name: 'Optimized Images', count: results.filter(r => r.hasOptimizedImages).length },
    { name: 'Internal Links', count: results.filter(r => r.hasInternalLinks).length }
  ];

  features.forEach(feature => {
    const percentage = ((feature.count / totalPages) * 100).toFixed(1);
    console.log(`${feature.name}: ${feature.count}/${totalPages} (${percentage}%)`);
  });

  // Top performers
  console.log('\n🏆 TOP PERFORMING PAGES\n');
  console.log('='.repeat(80));
  
  const topPerformers = results
    .filter(r => r.score === 100)
    .sort((a, b) => a.page.localeCompare(b.page))
    .slice(0, 10);

  if (topPerformers.length > 0) {
    topPerformers.forEach(result => {
      console.log(`✅ ${result.page} - Score: ${result.score}%`);
    });
  } else {
    console.log('No pages with 100% score found.');
  }

  // Pages needing attention
  console.log('\n⚠️  PAGES NEEDING ATTENTION\n');
  console.log('='.repeat(80));
  
  const needsAttention = results
    .filter(r => r.score < 100)
    .sort((a, b) => a.score - b.score)
    .slice(0, 10);

  needsAttention.forEach(result => {
    console.log(`❌ ${result.page} - Score: ${result.score}%`);
    if (result.issues.length > 0) {
      result.issues.forEach(issue => {
        console.log(`   • ${issue}`);
      });
    }
    console.log('');
  });

  // Title length analysis
  console.log('\n📏 TITLE LENGTH ANALYSIS\n');
  console.log('='.repeat(80));
  
  const titlesWithLength = results.filter(r => r.titleLength > 0);
  const averageLength = titlesWithLength.reduce((sum, r) => sum + r.titleLength, 0) / titlesWithLength.length;
  const longTitles = titlesWithLength.filter(r => r.titleLength > 60);
  
  console.log(`Average Title Length: ${averageLength.toFixed(1)} characters`);
  console.log(`Titles Over 60 Characters: ${longTitles.length}/${titlesWithLength.length}`);
  
  if (longTitles.length > 0) {
    console.log('\nLong Titles:');
    longTitles.forEach(result => {
      console.log(`  • ${result.page}: ${result.titleLength} characters`);
    });
  }

  // Save detailed results
  const reportPath = path.join(process.cwd(), 'seo-validation-report.json');
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📊 Detailed report saved to: ${reportPath}`);

  // Recommendations
  console.log('\n💡 RECOMMENDATIONS\n');
  console.log('='.repeat(80));
  
  if (fullyOptimized < totalPages) {
    console.log('1. Apply EnhancedBrokerPageTemplate to remaining pages');
    console.log('2. Run systematic update using update-all-broker-pages.ts script');
    console.log('3. Validate schema markup with Google Rich Results Test');
  }
  
  if (longTitles.length > 0) {
    console.log('4. Optimize title lengths to stay under 60 characters');
  }
  
  console.log('5. Monitor search performance after implementation');
  console.log('6. Set up automated SEO monitoring for ongoing validation');

  console.log('\n✅ Validation Complete!');
}

// Run the validation
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main, validateBrokerPage, getBrokerSlugs };
