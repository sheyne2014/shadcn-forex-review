#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Starting Bundle Analysis...\n');

// Function to get file size in MB
function getFileSizeInMB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / (1024 * 1024)).toFixed(2);
  } catch (error) {
    return 'N/A';
  }
}

// Function to analyze package.json dependencies
function analyzeDependencies() {
  console.log('📦 Analyzing Dependencies...');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};
  
  console.log(`Total Dependencies: ${Object.keys(dependencies).length}`);
  console.log(`Dev Dependencies: ${Object.keys(devDependencies).length}`);
  
  // Large dependencies to watch out for
  const largeDependencies = [
    '@radix-ui',
    'framer-motion',
    'next',
    'react',
    'lucide-react',
    '@supabase',
    'tailwindcss'
  ];
  
  console.log('\n🔍 Key Dependencies:');
  largeDependencies.forEach(dep => {
    const exactMatch = dependencies[dep];
    if (exactMatch) {
      console.log(`  ✓ ${dep}: ${exactMatch}`);
    } else {
      // Check for partial matches
      const partialMatches = Object.keys(dependencies).filter(key => key.includes(dep));
      if (partialMatches.length > 0) {
        partialMatches.forEach(match => {
          console.log(`  ✓ ${match}: ${dependencies[match]}`);
        });
      }
    }
  });
}

// Function to analyze build output
function analyzeBuildOutput() {
  console.log('\n🏗️  Build Analysis...');
  
  try {
    // Check if .next directory exists
    const nextDir = '.next';
    if (!fs.existsSync(nextDir)) {
      console.log('❌ No build found. Running build first...');
      console.log('⏳ Building application...');
      execSync('npm run build', { stdio: 'inherit' });
    }
    
    // Analyze static files
    const staticDir = path.join(nextDir, 'static');
    if (fs.existsSync(staticDir)) {
      console.log('\n📊 Static Assets:');
      
      // Check chunks directory
      const chunksDir = path.join(staticDir, 'chunks');
      if (fs.existsSync(chunksDir)) {
        const chunks = fs.readdirSync(chunksDir)
          .filter(file => file.endsWith('.js'))
          .map(file => ({
            name: file,
            size: getFileSizeInMB(path.join(chunksDir, file))
          }))
          .sort((a, b) => parseFloat(b.size) - parseFloat(a.size))
          .slice(0, 10); // Top 10 largest chunks
        
        console.log('  Top 10 Largest Chunks:');
        chunks.forEach(chunk => {
          console.log(`    ${chunk.name}: ${chunk.size} MB`);
        });
      }
      
      // Check CSS files
      const cssDir = path.join(staticDir, 'css');
      if (fs.existsSync(cssDir)) {
        const cssFiles = fs.readdirSync(cssDir)
          .filter(file => file.endsWith('.css'))
          .map(file => ({
            name: file,
            size: getFileSizeInMB(path.join(cssDir, file))
          }));
        
        if (cssFiles.length > 0) {
          console.log('\n  CSS Files:');
          cssFiles.forEach(file => {
            console.log(`    ${file.name}: ${file.size} MB`);
          });
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error analyzing build:', error.message);
  }
}

// Function to check for potential optimizations
function suggestOptimizations() {
  console.log('\n💡 Optimization Suggestions:');
  
  const suggestions = [
    {
      check: () => {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        return Object.keys(packageJson.dependencies).filter(dep => dep.startsWith('@radix-ui')).length;
      },
      message: (count) => `Consider tree-shaking Radix UI components (${count} packages found)`
    },
    {
      check: () => {
        try {
          const nextConfig = fs.readFileSync('next.config.js', 'utf8');
          return !nextConfig.includes('experimental: { optimizeCss: true }');
        } catch {
          return false;
        }
      },
      message: () => 'Enable CSS optimization in next.config.js'
    },
    {
      check: () => {
        try {
          const nextConfig = fs.readFileSync('next.config.js', 'utf8');
          return !nextConfig.includes('swcMinify: true');
        } catch {
          return false;
        }
      },
      message: () => 'Enable SWC minification for better performance'
    },
    {
      check: () => {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        return packageJson.dependencies['framer-motion'];
      },
      message: () => 'Consider lazy loading Framer Motion animations'
    }
  ];
  
  suggestions.forEach((suggestion, index) => {
    const result = suggestion.check();
    if (result) {
      console.log(`  ${index + 1}. ${suggestion.message(result)}`);
    }
  });
}

// Function to analyze component imports
function analyzeComponentImports() {
  console.log('\n🧩 Component Import Analysis...');
  
  try {
    // Find all TypeScript/JavaScript files
    const findFiles = (dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) => {
      let files = [];
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          files = files.concat(findFiles(fullPath, extensions));
        } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
      
      return files;
    };
    
    const sourceFiles = findFiles('src');
    let totalImports = 0;
    let heavyImports = [];
    
    sourceFiles.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const imports = content.match(/import.*from.*['"`].*['"`]/g) || [];
        totalImports += imports.length;
        
        // Check for potentially heavy imports
        imports.forEach(importLine => {
          if (importLine.includes('framer-motion') || 
              importLine.includes('@radix-ui') ||
              importLine.includes('lucide-react')) {
            heavyImports.push({
              file: file.replace(process.cwd(), ''),
              import: importLine.trim()
            });
          }
        });
      } catch (error) {
        // Skip files that can't be read
      }
    });
    
    console.log(`  Total source files: ${sourceFiles.length}`);
    console.log(`  Total imports: ${totalImports}`);
    console.log(`  Heavy imports found: ${heavyImports.length}`);
    
    if (heavyImports.length > 0) {
      console.log('\n  Heavy imports (first 5):');
      heavyImports.slice(0, 5).forEach(item => {
        console.log(`    ${item.file}: ${item.import}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error analyzing imports:', error.message);
  }
}

// Main execution
async function main() {
  try {
    analyzeDependencies();
    analyzeComponentImports();
    analyzeBuildOutput();
    suggestOptimizations();
    
    console.log('\n✅ Bundle analysis complete!');
    console.log('\n📋 Next Steps:');
    console.log('  1. Review large chunks and consider code splitting');
    console.log('  2. Implement suggested optimizations');
    console.log('  3. Use dynamic imports for heavy components');
    console.log('  4. Consider removing unused dependencies');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    process.exit(1);
  }
}

main();
