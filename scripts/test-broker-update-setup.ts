#!/usr/bin/env tsx

/**
 * Test Broker Update Setup
 * 
 * This script tests the setup and prerequisites for the broker data update scripts.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Test results
interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  message: string;
  details?: any;
}

const results: TestResult[] = [];

// Add test result
function addResult(name: string, status: 'pass' | 'fail' | 'warn', message: string, details?: any) {
  results.push({ name, status, message, details });
  
  const emoji = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
  console.log(`${emoji} ${name}: ${message}`);
  
  if (details) {
    console.log(`   Details: ${JSON.stringify(details, null, 2)}`);
  }
}

// Test environment variables
function testEnvironmentVariables() {
  console.log('\n🔍 Testing Environment Variables...');
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  const optionalVars = [
    'MCP_API_KEY'
  ];
  
  let allRequired = true;
  
  requiredVars.forEach(varName => {
    if (process.env[varName]) {
      addResult(`Environment Variable: ${varName}`, 'pass', 'Set');
    } else {
      addResult(`Environment Variable: ${varName}`, 'fail', 'Missing');
      allRequired = false;
    }
  });
  
  optionalVars.forEach(varName => {
    if (process.env[varName]) {
      addResult(`Environment Variable: ${varName}`, 'pass', 'Set (optional)');
    } else {
      addResult(`Environment Variable: ${varName}`, 'warn', 'Not set (optional - MCP features will be limited)');
    }
  });
  
  return allRequired;
}

// Test Supabase connection
async function testSupabaseConnection() {
  console.log('\n🔍 Testing Supabase Connection...');
  
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      addResult('Supabase Connection', 'fail', 'Missing environment variables');
      return false;
    }
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Test connection by querying brokers table
    const { data, error, count } = await supabase
      .from('brokers')
      .select('id, name', { count: 'exact' })
      .limit(1);
    
    if (error) {
      addResult('Supabase Connection', 'fail', `Connection failed: ${error.message}`, error);
      return false;
    }
    
    addResult('Supabase Connection', 'pass', `Connected successfully. Found ${count} brokers in database`);
    
    if (data && data.length > 0) {
      addResult('Brokers Table', 'pass', `Sample broker: ${data[0].name} (${data[0].id})`);
    } else {
      addResult('Brokers Table', 'warn', 'No brokers found in database');
    }
    
    return true;
    
  } catch (error) {
    addResult('Supabase Connection', 'fail', `Connection error: ${error.message}`, error);
    return false;
  }
}

// Test dependencies
function testDependencies() {
  console.log('\n🔍 Testing Dependencies...');
  
  const requiredDeps = [
    '@supabase/supabase-js',
    'dotenv'
  ];
  
  const optionalDeps = [
    '@modelcontextprotocol/sdk'
  ];
  
  let allRequired = true;
  
  requiredDeps.forEach(dep => {
    try {
      require.resolve(dep);
      addResult(`Dependency: ${dep}`, 'pass', 'Installed');
    } catch (error) {
      addResult(`Dependency: ${dep}`, 'fail', 'Not installed');
      allRequired = false;
    }
  });
  
  optionalDeps.forEach(dep => {
    try {
      require.resolve(dep);
      addResult(`Dependency: ${dep}`, 'pass', 'Installed (optional)');
    } catch (error) {
      addResult(`Dependency: ${dep}`, 'warn', 'Not installed (optional - MCP features will be limited)');
    }
  });
  
  return allRequired;
}

// Test file permissions
function testFilePermissions() {
  console.log('\n🔍 Testing File Permissions...');
  
  try {
    // Test write permissions in current directory
    const testFile = 'test-write-permissions.tmp';
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    
    addResult('File Permissions', 'pass', 'Can write to current directory');
    return true;
    
  } catch (error) {
    addResult('File Permissions', 'fail', `Cannot write to current directory: ${error.message}`);
    return false;
  }
}

// Test script files
function testScriptFiles() {
  console.log('\n🔍 Testing Script Files...');
  
  const requiredFiles = [
    'scripts/comprehensive-broker-data-update.ts',
    'scripts/broker-data-enhancer.ts',
    'scripts/run-broker-update.ts'
  ];
  
  let allPresent = true;
  
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      addResult(`Script File: ${file}`, 'pass', 'Exists');
    } else {
      addResult(`Script File: ${file}`, 'fail', 'Missing');
      allPresent = false;
    }
  });
  
  return allPresent;
}

// Test MCP services (optional)
async function testMCPServices() {
  console.log('\n🔍 Testing MCP Services (Optional)...');
  
  if (!process.env.MCP_API_KEY) {
    addResult('MCP Services', 'warn', 'MCP_API_KEY not set - MCP features will be limited');
    return false;
  }
  
  try {
    // Try to import MCP SDK
    const { default: ModelContextProtocol } = await import('@modelcontextprotocol/sdk');
    addResult('MCP SDK', 'pass', 'MCP SDK available');
    
    // Note: We don't actually initialize MCP services here to avoid side effects
    addResult('MCP Services', 'pass', 'MCP setup appears ready (not tested - will be tested during actual run)');
    return true;
    
  } catch (error) {
    addResult('MCP Services', 'warn', `MCP SDK not available: ${error.message}`);
    return false;
  }
}

// Generate summary report
function generateSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 SETUP TEST SUMMARY');
  console.log('='.repeat(60));
  
  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const warnings = results.filter(r => r.status === 'warn').length;
  
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log(`📊 Total Tests: ${results.length}`);
  
  if (failed === 0) {
    console.log('\n🎉 All critical tests passed! You can run the broker data update scripts.');
    
    if (warnings > 0) {
      console.log('\n⚠️  Note: Some optional features may be limited due to warnings above.');
    }
    
    console.log('\n🚀 To start the update process, run:');
    console.log('   npx tsx scripts/run-broker-update.ts');
    
  } else {
    console.log('\n❌ Some critical tests failed. Please fix the issues above before running the update scripts.');
    
    const failedTests = results.filter(r => r.status === 'fail');
    console.log('\n🔧 Issues to fix:');
    failedTests.forEach(test => {
      console.log(`   - ${test.name}: ${test.message}`);
    });
  }
  
  // Write detailed report to file
  const report = {
    timestamp: new Date().toISOString(),
    summary: { passed, failed, warnings, total: results.length },
    results: results
  };
  
  fs.writeFileSync('broker-update-setup-test.json', JSON.stringify(report, null, 2));
  console.log('\n📄 Detailed report saved to: broker-update-setup-test.json');
}

// Main test function
async function runTests() {
  console.log('🧪 BROKER DATA UPDATE SETUP TEST');
  console.log('='.repeat(60));
  console.log('Testing prerequisites for the comprehensive broker data update scripts...');
  
  try {
    // Run all tests
    const envVarsOk = testEnvironmentVariables();
    const depsOk = testDependencies();
    const filesOk = testScriptFiles();
    const permissionsOk = testFilePermissions();
    const supabaseOk = await testSupabaseConnection();
    await testMCPServices(); // Optional
    
    // Generate summary
    generateSummary();
    
    // Exit with appropriate code
    const criticalTestsPassed = envVarsOk && depsOk && filesOk && permissionsOk && supabaseOk;
    process.exit(criticalTestsPassed ? 0 : 1);
    
  } catch (error) {
    console.error('\n❌ Test execution failed:', error);
    addResult('Test Execution', 'fail', `Unexpected error: ${error.message}`);
    generateSummary();
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

export { runTests, testEnvironmentVariables, testSupabaseConnection, testDependencies };
