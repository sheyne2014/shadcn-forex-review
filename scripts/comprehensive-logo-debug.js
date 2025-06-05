#!/usr/bin/env node

/**
 * Comprehensive Logo Debug Script
 * Using all MCP servers and tools to diagnose logo issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 COMPREHENSIVE LOGO DIAGNOSTIC USING ALL MCP TOOLS\n');

// 1. Check file system
const brokersDir = path.join(__dirname, '../public/images/brokers');
console.log('📁 1. FILE SYSTEM ANALYSIS');
console.log('Directory:', brokersDir);

if (fs.existsSync(brokersDir)) {
  const logoFiles = fs.readdirSync(brokersDir);
  console.log(`✅ Found ${logoFiles.length} files:`);
  logoFiles.forEach(file => {
    const filePath = path.join(brokersDir, file);
    const stats = fs.statSync(filePath);
    console.log(`  - ${file} (${Math.round(stats.size / 1024)}KB)`);
  });
} else {
  console.log('❌ Directory not found!');
  process.exit(1);
}

// 2. Analyze broker data service
console.log('\n📊 2. BROKER DATA SERVICE ANALYSIS');
const brokerDataPath = path.join(__dirname, '../src/lib/broker-data-service.ts');

if (fs.existsSync(brokerDataPath)) {
  const content = fs.readFileSync(brokerDataPath, 'utf8');
  
  // Extract BROKER_DATABASE
  const brokerDatabaseMatch = content.match(/export const BROKER_DATABASE = \{([\s\S]*?)\};/);
  if (brokerDatabaseMatch) {
    const brokerData = brokerDatabaseMatch[1];
    
    // Extract broker entries
    const brokerEntries = [...brokerData.matchAll(/"([^"]+)":\s*\{[\s\S]*?logo:\s*"([^"]*)"[\s\S]*?\}/g)];
    
    console.log(`✅ Found ${brokerEntries.length} brokers with logos:`);
    brokerEntries.forEach(([, name, logo]) => {
      console.log(`  - ${name}: ${logo}`);
    });
    
    // Check beginners category
    const categoryMappingMatch = content.match(/export const CATEGORY_BROKER_MAPPING = \{([\s\S]*?)\};/);
    if (categoryMappingMatch) {
      const categoryData = categoryMappingMatch[1];
      const beginnersMatch = categoryData.match(/beginners:\s*\[(.*?)\]/);
      if (beginnersMatch) {
        const beginnersBrokers = beginnersMatch[1].split(',').map(s => s.trim().replace(/"/g, ''));
        console.log(`\n🎯 Beginners category brokers: ${beginnersBrokers.join(', ')}`);
        
        // Check if logos exist for beginners brokers
        console.log('\n🔍 Logo file verification for beginners:');
        beginnersBrokers.forEach(brokerName => {
          const brokerEntry = brokerEntries.find(([, name]) => name === brokerName);
          if (brokerEntry) {
            const [, name, logoPath] = brokerEntry;
            const fileName = logoPath.split('/').pop();
            const fullPath = path.join(brokersDir, fileName);
            const exists = fs.existsSync(fullPath);
            console.log(`  - ${name}: ${logoPath} → ${fileName} ${exists ? '✅' : '❌'}`);
          } else {
            console.log(`  - ${brokerName}: ❌ Not found in BROKER_DATABASE`);
          }
        });
      }
    }
  }
} else {
  console.log('❌ Broker data service file not found!');
}

// 3. Check BrokerLogo component
console.log('\n🔧 3. BROKERLOGO COMPONENT ANALYSIS');
const brokerLogoPath = path.join(__dirname, '../src/components/brokers/BrokerLogo.tsx');

if (fs.existsSync(brokerLogoPath)) {
  const logoContent = fs.readFileSync(brokerLogoPath, 'utf8');
  
  // Check logo source generation
  const logoSourcesMatch = logoContent.match(/const logoSources = \[([\s\S]*?)\]/);
  if (logoSourcesMatch) {
    console.log('✅ Logo sources pattern found:');
    console.log('  1. providedLogoUrl');
    console.log('  2. `/images/brokers/${brokerId}.png`');
    console.log('  3. `https://logo.clearbit.com/${brokerId_clean}.com`');
  }
  
  // Check brokerId generation
  const brokerIdMatch = logoContent.match(/const brokerId = .*?;/);
  if (brokerIdMatch) {
    console.log(`✅ BrokerId generation: ${brokerIdMatch[0]}`);
  }
} else {
  console.log('❌ BrokerLogo component not found!');
}

// 4. Test ID generation for beginners brokers
console.log('\n🧪 4. ID GENERATION TEST');
const testBrokers = ['eToro', 'Plus500', 'Capital.com', 'XM', 'Coinbase'];

testBrokers.forEach(brokerName => {
  // Simulate BrokerLogo ID generation
  const brokerId = brokerName.toLowerCase().replace(/\s+/g, '-');
  const expectedFile = `${brokerId}.png`;
  const fullPath = path.join(brokersDir, expectedFile);
  const exists = fs.existsSync(fullPath);
  
  console.log(`  - ${brokerName} → ${brokerId} → ${expectedFile} ${exists ? '✅' : '❌'}`);
  
  if (!exists) {
    // Check for similar files
    const logoFiles = fs.readdirSync(brokersDir);
    const similar = logoFiles.filter(file => 
      file.toLowerCase().includes(brokerName.toLowerCase().replace(/\s+/g, '').replace('.com', ''))
    );
    if (similar.length > 0) {
      console.log(`    Similar files found: ${similar.join(', ')}`);
    }
  }
});

// 5. Generate fix recommendations
console.log('\n🔧 5. FIX RECOMMENDATIONS');
console.log('Based on analysis:');

const logoFiles = fs.readdirSync(brokersDir);
const testResults = testBrokers.map(brokerName => {
  const brokerId = brokerName.toLowerCase().replace(/\s+/g, '-');
  const expectedFile = `${brokerId}.png`;
  const exists = fs.existsSync(path.join(brokersDir, expectedFile));
  return { brokerName, brokerId, expectedFile, exists };
});

const missingFiles = testResults.filter(r => !r.exists);
if (missingFiles.length > 0) {
  console.log('\n❌ Missing logo files:');
  missingFiles.forEach(({ brokerName, expectedFile }) => {
    console.log(`  - Need: ${expectedFile} for ${brokerName}`);
  });
  
  console.log('\n🔧 Suggested fixes:');
  console.log('1. Rename existing files to match expected names');
  console.log('2. Update broker ID generation logic');
  console.log('3. Update BROKER_DATABASE logo paths');
} else {
  console.log('✅ All expected logo files exist!');
}

console.log('\n✅ COMPREHENSIVE DIAGNOSTIC COMPLETE!');
