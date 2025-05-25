#!/usr/bin/env node

/**
 * Debug script to understand broker data structure issues
 * This script will help identify why logos aren't showing on individual category pages
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Debugging Broker Data Structure Issues...\n');

// Check if broker logos exist
const brokersDir = path.join(__dirname, '../public/images/brokers');
console.log('📁 Checking broker logos directory:', brokersDir);

if (fs.existsSync(brokersDir)) {
  const logoFiles = fs.readdirSync(brokersDir);
  console.log('✅ Found', logoFiles.length, 'logo files:');
  logoFiles.forEach(file => {
    console.log('  -', file);
  });
} else {
  console.log('❌ Broker logos directory not found!');
}

console.log('\n📊 Analyzing broker data structure...');

// Read the broker data service file
const brokerDataPath = path.join(__dirname, '../src/lib/broker-data-service.ts');
if (fs.existsSync(brokerDataPath)) {
  const content = fs.readFileSync(brokerDataPath, 'utf8');
  
  // Extract broker names from BROKER_DATABASE
  const brokerDatabaseMatch = content.match(/export const BROKER_DATABASE = \{([\s\S]*?)\};/);
  if (brokerDatabaseMatch) {
    const brokerData = brokerDatabaseMatch[1];
    const brokerNames = [...brokerData.matchAll(/"([^"]+)":\s*\{/g)].map(match => match[1]);
    
    console.log('✅ Found', brokerNames.length, 'brokers in BROKER_DATABASE:');
    brokerNames.forEach(name => {
      console.log('  -', name);
    });
    
    // Check category mappings
    const categoryMappingMatch = content.match(/export const CATEGORY_BROKER_MAPPING = \{([\s\S]*?)\};/);
    if (categoryMappingMatch) {
      const categoryData = categoryMappingMatch[1];
      const beginnersBrokers = categoryData.match(/beginners:\s*\[(.*?)\]/);
      if (beginnersBrokers) {
        console.log('\n🎯 Beginners category brokers:', beginnersBrokers[1]);
      }
    }
  }
} else {
  console.log('❌ Broker data service file not found!');
}

console.log('\n🔧 Recommendations:');
console.log('1. Ensure all broker logos exist in /public/images/brokers/');
console.log('2. Check that broker IDs match logo filenames');
console.log('3. Verify BrokerLogo component is receiving correct data structure');
console.log('4. Test fallback mechanisms in BrokerLogo component');

console.log('\n✅ Debug analysis complete!');
