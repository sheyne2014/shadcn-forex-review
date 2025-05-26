#!/usr/bin/env node

/**
 * Comprehensive SEO Audit Script for BrokerAnalysis
 * Analyzes and reports on SEO implementation across the website
 * Enhanced for 2025 search engine requirements
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class SEOAuditor {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      issues: []
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const colorMap = {
      success: colors.green,
      error: colors.red,
      warning: colors.yellow,
      info: colors.blue
    };
    
    console.log(`${colorMap[type] || colors.reset}[${timestamp}] ${message}${colors.reset}`);
  }

  pass(message) {
    this.results.passed++;
    this.log(`✅ ${message}`, 'success');
  }

  fail(message, details = '') {
    this.results.failed++;
    this.results.issues.push({ type: 'error', message, details });
    this.log(`❌ ${message}`, 'error');
    if (details) this.log(`   ${details}`, 'error');
  }

  warn(message, details = '') {
    this.results.warnings++;
    this.results.issues.push({ type: 'warning', message, details });
    this.log(`⚠️  ${message}`, 'warning');
    if (details) this.log(`   ${details}`, 'warning');
  }

  // Check if file exists
  fileExists(filePath) {
    return fs.existsSync(path.join(process.cwd(), filePath));
  }

  // Read file content
  readFile(filePath) {
    try {
      return fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
    } catch (error) {
      return null;
    }
  }

  // Audit SEO utilities
  auditSEOUtils() {
    this.log('\n🔍 Auditing SEO Utilities...', 'info');
    
    if (this.fileExists('src/lib/seo-utils.ts')) {
      this.pass('SEO utilities file exists');
      
      const content = this.readFile('src/lib/seo-utils.ts');
      if (content) {
        // Check for essential functions
        const requiredFunctions = [
          'getBrokerSeo',
          'generateBrokerSchema',
          'generateFAQSchema',
          'generateBreadcrumbSchema'
        ];
        
        requiredFunctions.forEach(func => {
          if (content.includes(`export function ${func}`) || content.includes(`function ${func}`)) {
            this.pass(`${func} function implemented`);
          } else {
            this.fail(`Missing ${func} function`);
          }
        });

        // Check for enhanced features
        if (content.includes('TRADING_KEYWORDS')) {
          this.pass('Enhanced keyword database implemented');
        } else {
          this.warn('Consider adding enhanced keyword database');
        }

        if (content.includes('currentYear')) {
          this.pass('Dynamic year implementation found');
        } else {
          this.warn('Consider adding dynamic year for freshness');
        }
      }
    } else {
      this.fail('SEO utilities file missing', 'Create src/lib/seo-utils.ts');
    }
  }

  // Audit sitemap configuration
  auditSitemap() {
    this.log('\n🗺️  Auditing Sitemap Configuration...', 'info');
    
    if (this.fileExists('src/app/sitemap.ts')) {
      this.pass('Sitemap file exists');
      
      const content = this.readFile('src/app/sitemap.ts');
      if (content) {
        // Check for comprehensive coverage
        const requiredSections = [
          'staticPages',
          'toolPages',
          'brokerCategoryPages',
          'blogPages'
        ];
        
        requiredSections.forEach(section => {
          if (content.includes(section)) {
            this.pass(`${section} section implemented`);
          } else {
            this.warn(`Consider adding ${section} section`);
          }
        });

        // Check for dynamic broker pages
        if (content.includes('generateBrokerPages') || content.includes('individualBrokerPages')) {
          this.pass('Dynamic broker pages implemented');
        } else {
          this.fail('Missing dynamic broker pages generation');
        }

        // Check for proper priorities
        if (content.includes('priority:')) {
          this.pass('SEO priorities configured');
        } else {
          this.warn('Consider adding SEO priorities');
        }
      }
    } else {
      this.fail('Sitemap file missing', 'Create src/app/sitemap.ts');
    }
  }

  // Audit robots.txt configuration
  auditRobots() {
    this.log('\n🤖 Auditing Robots.txt Configuration...', 'info');
    
    if (this.fileExists('src/app/robots.ts')) {
      this.pass('Robots.txt file exists');
      
      const content = this.readFile('src/app/robots.ts');
      if (content) {
        // Check for proper disallow rules
        const criticalDisallows = ['/api/', '/admin/', '/_next/'];
        criticalDisallows.forEach(rule => {
          if (content.includes(rule)) {
            this.pass(`${rule} properly disallowed`);
          } else {
            this.warn(`Consider disallowing ${rule}`);
          }
        });

        // Check for sitemap reference
        if (content.includes('sitemap:')) {
          this.pass('Sitemap reference included');
        } else {
          this.fail('Missing sitemap reference');
        }

        // Check for crawl delay
        if (content.includes('crawlDelay')) {
          this.pass('Crawl delay configured');
        } else {
          this.warn('Consider adding crawl delay for server protection');
        }
      }
    } else {
      this.fail('Robots.txt file missing', 'Create src/app/robots.ts');
    }
  }

  // Audit metadata implementation
  auditMetadata() {
    this.log('\n📄 Auditing Metadata Implementation...', 'info');
    
    if (this.fileExists('src/app/layout.tsx')) {
      this.pass('Root layout file exists');
      
      const content = this.readFile('src/app/layout.tsx');
      if (content) {
        // Check for essential metadata
        const requiredMeta = [
          'title',
          'description',
          'keywords',
          'openGraph',
          'twitter',
          'robots'
        ];
        
        requiredMeta.forEach(meta => {
          if (content.includes(meta)) {
            this.pass(`${meta} metadata configured`);
          } else {
            this.fail(`Missing ${meta} metadata`);
          }
        });

        // Check for verification tokens
        if (content.includes('verification')) {
          this.pass('Search engine verification configured');
        } else {
          this.warn('Consider adding search engine verification');
        }
      }
    } else {
      this.fail('Root layout file missing');
    }
  }

  // Audit performance configuration
  auditPerformance() {
    this.log('\n⚡ Auditing Performance Configuration...', 'info');
    
    // Check Next.js config
    if (this.fileExists('next.config.js')) {
      this.pass('Next.js config exists');
      
      const content = this.readFile('next.config.js');
      if (content) {
        // Check for performance optimizations
        const performanceFeatures = [
          'swcMinify',
          'images',
          'headers',
          'compress'
        ];
        
        performanceFeatures.forEach(feature => {
          if (content.includes(feature)) {
            this.pass(`${feature} optimization configured`);
          } else {
            this.warn(`Consider adding ${feature} optimization`);
          }
        });
      }
    } else {
      this.warn('Next.js config missing');
    }

    // Check for performance monitoring
    if (this.fileExists('src/lib/performance.ts')) {
      this.pass('Performance monitoring implemented');
    } else {
      this.warn('Consider adding performance monitoring');
    }
  }

  // Audit broker pages structure
  auditBrokerPages() {
    this.log('\n🏢 Auditing Broker Pages Structure...', 'info');
    
    // Check for dynamic broker routing
    if (this.fileExists('src/app/broker/[id]/page.tsx') || this.fileExists('src/app/brokers/[slug]/page.tsx')) {
      this.pass('Dynamic broker routing implemented');
    } else {
      this.fail('Missing dynamic broker routing');
    }

    // Check for broker templates
    if (this.fileExists('src/lib/broker-templates.ts')) {
      this.pass('Broker templates system exists');
    } else {
      this.warn('Consider implementing broker templates system');
    }

    // Check for structured data components
    if (this.fileExists('src/components/StructuredData.tsx')) {
      this.pass('Structured data component exists');
    } else {
      this.warn('Consider adding structured data component');
    }
  }

  // Generate comprehensive report
  generateReport() {
    this.log('\n📊 SEO Audit Report', 'info');
    this.log('='.repeat(50), 'info');
    
    const total = this.results.passed + this.results.failed + this.results.warnings;
    const score = Math.round((this.results.passed / total) * 100);
    
    this.log(`\n${colors.bold}Overall SEO Score: ${score}%${colors.reset}`, 'info');
    this.log(`✅ Passed: ${this.results.passed}`, 'success');
    this.log(`❌ Failed: ${this.results.failed}`, 'error');
    this.log(`⚠️  Warnings: ${this.results.warnings}`, 'warning');

    if (this.results.issues.length > 0) {
      this.log('\n🔧 Issues to Address:', 'info');
      this.results.issues.forEach((issue, index) => {
        const icon = issue.type === 'error' ? '❌' : '⚠️';
        this.log(`${index + 1}. ${icon} ${issue.message}`, issue.type);
        if (issue.details) {
          this.log(`   ${issue.details}`, issue.type);
        }
      });
    }

    // Recommendations
    this.log('\n💡 SEO Recommendations for 2025:', 'info');
    this.log('• Implement Core Web Vitals monitoring', 'info');
    this.log('• Add comprehensive structured data schemas', 'info');
    this.log('• Optimize for mobile-first indexing', 'info');
    this.log('• Implement progressive web app features', 'info');
    this.log('• Add international SEO with hreflang tags', 'info');
    this.log('• Optimize for voice search and AI assistants', 'info');

    return score;
  }

  // Run complete audit
  async runAudit() {
    this.log(`${colors.bold}🚀 Starting Comprehensive SEO Audit...${colors.reset}`, 'info');
    
    this.auditSEOUtils();
    this.auditSitemap();
    this.auditRobots();
    this.auditMetadata();
    this.auditPerformance();
    this.auditBrokerPages();
    
    const score = this.generateReport();
    
    if (score >= 80) {
      this.log(`\n🎉 Excellent SEO implementation! Score: ${score}%`, 'success');
    } else if (score >= 60) {
      this.log(`\n👍 Good SEO foundation. Score: ${score}%`, 'warning');
    } else {
      this.log(`\n🔧 SEO needs improvement. Score: ${score}%`, 'error');
    }

    return score;
  }
}

// Run the audit
if (require.main === module) {
  const auditor = new SEOAuditor();
  auditor.runAudit().then(score => {
    process.exit(score >= 60 ? 0 : 1);
  }).catch(error => {
    console.error('Audit failed:', error);
    process.exit(1);
  });
}

module.exports = SEOAuditor;
