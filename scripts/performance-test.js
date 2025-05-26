#!/usr/bin/env node

/**
 * Performance Testing Script
 * 
 * Tests website performance and generates optimization recommendations
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PERFORMANCE_THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
  bundleSize: 250000, // 250KB
  imageSize: 100000,  // 100KB
};

class PerformanceTester {
  constructor() {
    this.results = {
      bundleAnalysis: {},
      imageOptimization: {},
      codeQuality: {},
      recommendations: [],
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Performance Analysis...\n');

    try {
      await this.analyzeBundleSize();
      await this.analyzeImages();
      await this.analyzeCodeQuality();
      await this.generateRecommendations();
      await this.generateReport();
    } catch (error) {
      console.error('❌ Performance analysis failed:', error.message);
      process.exit(1);
    }
  }

  async analyzeBundleSize() {
    console.log('📦 Analyzing bundle size...');

    try {
      // Build the project
      execSync('npm run build', { stdio: 'pipe' });

      // Check if .next directory exists
      const nextDir = path.join(process.cwd(), '.next');
      if (!fs.existsSync(nextDir)) {
        throw new Error('.next directory not found. Build may have failed.');
      }

      // Analyze bundle sizes
      const staticDir = path.join(nextDir, 'static');
      if (fs.existsSync(staticDir)) {
        const chunks = this.getBundleInfo(staticDir);
        this.results.bundleAnalysis = chunks;

        // Check for large bundles
        const largeBundles = chunks.filter(chunk => chunk.size > PERFORMANCE_THRESHOLDS.bundleSize);
        if (largeBundles.length > 0) {
          this.results.recommendations.push({
            type: 'bundle',
            severity: 'high',
            message: `Large bundles detected: ${largeBundles.map(b => b.name).join(', ')}`,
            suggestion: 'Consider code splitting and dynamic imports'
          });
        }

        console.log(`✅ Bundle analysis complete. Found ${chunks.length} chunks.`);
      }
    } catch (error) {
      console.log(`⚠️  Bundle analysis failed: ${error.message}`);
    }
  }

  getBundleInfo(staticDir) {
    const chunks = [];
    
    const scanDirectory = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          scanDirectory(itemPath);
        } else if (item.endsWith('.js') || item.endsWith('.css')) {
          chunks.push({
            name: item,
            size: stat.size,
            path: itemPath
          });
        }
      });
    };

    scanDirectory(staticDir);
    return chunks.sort((a, b) => b.size - a.size);
  }

  async analyzeImages() {
    console.log('🖼️  Analyzing images...');

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
    const publicDir = path.join(process.cwd(), 'public');
    const srcDir = path.join(process.cwd(), 'src');
    
    const images = [];
    
    // Scan public directory
    if (fs.existsSync(publicDir)) {
      this.scanForImages(publicDir, imageExtensions, images);
    }
    
    // Scan src directory
    if (fs.existsSync(srcDir)) {
      this.scanForImages(srcDir, imageExtensions, images);
    }

    // Analyze image sizes
    const largeImages = images.filter(img => img.size > PERFORMANCE_THRESHOLDS.imageSize);
    const unoptimizedImages = images.filter(img => 
      !img.name.includes('.webp') && !img.name.includes('.avif') && 
      (img.name.includes('.jpg') || img.name.includes('.png'))
    );

    this.results.imageOptimization = {
      total: images.length,
      large: largeImages.length,
      unoptimized: unoptimizedImages.length,
      images: images.slice(0, 10) // Top 10 largest
    };

    if (largeImages.length > 0) {
      this.results.recommendations.push({
        type: 'image',
        severity: 'medium',
        message: `${largeImages.length} large images found`,
        suggestion: 'Optimize images using next/image with quality settings'
      });
    }

    if (unoptimizedImages.length > 0) {
      this.results.recommendations.push({
        type: 'image',
        severity: 'medium',
        message: `${unoptimizedImages.length} unoptimized images found`,
        suggestion: 'Convert images to WebP/AVIF format'
      });
    }

    console.log(`✅ Image analysis complete. Found ${images.length} images.`);
  }

  scanForImages(dir, extensions, images) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('.')) {
        this.scanForImages(itemPath, extensions, images);
      } else if (extensions.some(ext => item.toLowerCase().endsWith(ext))) {
        images.push({
          name: item,
          size: stat.size,
          path: itemPath
        });
      }
    });
  }

  async analyzeCodeQuality() {
    console.log('🔍 Analyzing code quality...');

    const srcDir = path.join(process.cwd(), 'src');
    const issues = {
      unusedImports: 0,
      largeComponents: 0,
      missingMemo: 0,
      inlineStyles: 0
    };

    if (fs.existsSync(srcDir)) {
      this.scanCodeQuality(srcDir, issues);
    }

    this.results.codeQuality = issues;

    if (issues.unusedImports > 0) {
      this.results.recommendations.push({
        type: 'code',
        severity: 'low',
        message: `${issues.unusedImports} files with potential unused imports`,
        suggestion: 'Remove unused imports to reduce bundle size'
      });
    }

    if (issues.largeComponents > 0) {
      this.results.recommendations.push({
        type: 'code',
        severity: 'medium',
        message: `${issues.largeComponents} large components found`,
        suggestion: 'Consider splitting large components'
      });
    }

    console.log('✅ Code quality analysis complete.');
  }

  scanCodeQuality(dir, issues) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('.')) {
        this.scanCodeQuality(itemPath, issues);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        const content = fs.readFileSync(itemPath, 'utf8');
        const lines = content.split('\n');
        
        // Check for large components (>200 lines)
        if (lines.length > 200) {
          issues.largeComponents++;
        }
        
        // Check for potential unused imports (basic check)
        const importLines = lines.filter(line => line.trim().startsWith('import'));
        const unusedImports = importLines.filter(line => {
          const match = line.match(/import\s+{([^}]+)}/);
          if (match) {
            const imports = match[1].split(',').map(s => s.trim());
            return imports.some(imp => !content.includes(imp.replace(/\s+as\s+\w+/, '')));
          }
          return false;
        });
        
        if (unusedImports.length > 0) {
          issues.unusedImports++;
        }
        
        // Check for inline styles
        if (content.includes('style={{')) {
          issues.inlineStyles++;
        }
      }
    });
  }

  async generateRecommendations() {
    console.log('💡 Generating recommendations...');

    // Add general recommendations
    this.results.recommendations.push({
      type: 'general',
      severity: 'info',
      message: 'Enable gzip/brotli compression',
      suggestion: 'Configure your server to compress static assets'
    });

    this.results.recommendations.push({
      type: 'general',
      severity: 'info',
      message: 'Implement service worker for caching',
      suggestion: 'Add a service worker to cache static resources'
    });

    console.log(`✅ Generated ${this.results.recommendations.length} recommendations.`);
  }

  async generateReport() {
    console.log('\n📊 Performance Analysis Report\n');
    console.log('=' .repeat(50));

    // Bundle Analysis
    console.log('\n📦 Bundle Analysis:');
    if (this.results.bundleAnalysis.length > 0) {
      console.log(`   Total chunks: ${this.results.bundleAnalysis.length}`);
      console.log('   Largest chunks:');
      this.results.bundleAnalysis.slice(0, 5).forEach((chunk, i) => {
        const sizeKB = (chunk.size / 1024).toFixed(1);
        console.log(`   ${i + 1}. ${chunk.name}: ${sizeKB}KB`);
      });
    } else {
      console.log('   No bundle data available');
    }

    // Image Analysis
    console.log('\n🖼️  Image Analysis:');
    console.log(`   Total images: ${this.results.imageOptimization.total || 0}`);
    console.log(`   Large images: ${this.results.imageOptimization.large || 0}`);
    console.log(`   Unoptimized: ${this.results.imageOptimization.unoptimized || 0}`);

    // Code Quality
    console.log('\n🔍 Code Quality:');
    console.log(`   Large components: ${this.results.codeQuality.largeComponents || 0}`);
    console.log(`   Potential unused imports: ${this.results.codeQuality.unusedImports || 0}`);
    console.log(`   Inline styles: ${this.results.codeQuality.inlineStyles || 0}`);

    // Recommendations
    console.log('\n💡 Recommendations:');
    if (this.results.recommendations.length > 0) {
      this.results.recommendations.forEach((rec, i) => {
        const severity = rec.severity.toUpperCase();
        const icon = rec.severity === 'high' ? '🔴' : rec.severity === 'medium' ? '🟡' : '🔵';
        console.log(`   ${icon} [${severity}] ${rec.message}`);
        console.log(`      → ${rec.suggestion}`);
      });
    } else {
      console.log('   🎉 No issues found!');
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Performance analysis complete!\n');

    // Save report to file
    const reportPath = path.join(process.cwd(), 'performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`📄 Detailed report saved to: ${reportPath}`);
  }
}

// Run the performance test
const tester = new PerformanceTester();
tester.runAllTests().catch(console.error);
