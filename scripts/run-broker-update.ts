#!/usr/bin/env tsx

/**
 * Broker Data Update Runner
 *
 * Simple execution script to run the comprehensive broker data update
 * with command line options and safety checks.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask user for confirmation
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Display banner
function displayBanner() {
  console.log('');
  console.log('🚀 ===============================================');
  console.log('   COMPREHENSIVE BROKER DATA UPDATE SCRIPT');
  console.log('   ===============================================');
  console.log('');
  console.log('   This script will:');
  console.log('   ✅ Replace hardcoded eToro template data');
  console.log('   ✅ Fetch real broker-specific information');
  console.log('   ✅ Update trading conditions, fees, platforms');
  console.log('   ✅ Find missing logos and platform images');
  console.log('   ✅ Use MCP servers and web search capabilities');
  console.log('   ✅ Create backups and provide rollback options');
  console.log('');
  console.log('   Data Sources:');
  console.log('   📡 MCP Servers (Context7, Puppeteer, YFinance)');
  console.log('   🔍 Claude AI web search capabilities');
  console.log('   🌐 Official broker websites');
  console.log('   🖼️  Image search for logos and screenshots');
  console.log('');
  console.log('⚠️  WARNING: This will modify broker data in the database!');
  console.log('   A backup will be created before any changes.');
  console.log('');
}

// Check prerequisites
async function checkPrerequisites() {
  console.log('🔍 Checking prerequisites...');

  const checks = [
    {
      name: 'Environment variables',
      check: () => {
        const required = [
          'NEXT_PUBLIC_SUPABASE_URL',
          'SUPABASE_SERVICE_ROLE_KEY'
        ];

        const missing = required.filter(env => !process.env[env]);
        if (missing.length > 0) {
          throw new Error(`Missing environment variables: ${missing.join(', ')}`);
        }
        return true;
      }
    },
    {
      name: 'Supabase connection',
      check: async () => {
        try {
          const { createClient } = await import('@supabase/supabase-js');
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          );

          const { data, error } = await supabase.from('brokers').select('count').limit(1);
          if (error) throw error;
          return true;
        } catch (error) {
          throw new Error(`Supabase connection failed: ${error.message}`);
        }
      }
    },
    {
      name: 'Required dependencies',
      check: () => {
        const required = ['@supabase/supabase-js', 'dotenv'];
        for (const dep of required) {
          try {
            require.resolve(dep);
          } catch (error) {
            throw new Error(`Missing dependency: ${dep}`);
          }
        }
        return true;
      }
    }
  ];

  for (const check of checks) {
    try {
      console.log(`  ⏳ ${check.name}...`);
      await check.check();
      console.log(`  ✅ ${check.name} - OK`);
    } catch (error) {
      console.log(`  ❌ ${check.name} - FAILED`);
      console.log(`     ${error.message}`);
      return false;
    }
  }

  console.log('✅ All prerequisites met!');
  return true;
}

// Display options menu
async function displayOptionsMenu() {
  console.log('');
  console.log('📋 UPDATE OPTIONS:');
  console.log('');
  console.log('1. 🔄 Full Update (All brokers, all data sources)');
  console.log('2. 🎯 Selective Update (Choose specific brokers)');
  console.log('3. 🖼️  Images Only (Find missing logos and screenshots)');
  console.log('4. 📊 Data Validation (Check existing data quality)');
  console.log('5. 🔙 Rollback (Restore from backup)');
  console.log('6. ❌ Cancel');
  console.log('');

  const choice = await askQuestion('Select an option (1-6): ');
  return choice.trim();
}

// Execute the selected option
async function executeOption(option: string) {
  switch (option) {
    case '1':
      await runFullUpdate();
      break;
    case '2':
      await runSelectiveUpdate();
      break;
    case '3':
      await runImagesOnlyUpdate();
      break;
    case '4':
      await runDataValidation();
      break;
    case '5':
      await runRollback();
      break;
    case '6':
      console.log('❌ Update cancelled by user.');
      break;
    default:
      console.log('❌ Invalid option selected.');
  }
}

// Run full update
async function runFullUpdate() {
  console.log('');
  console.log('🔄 FULL UPDATE SELECTED');
  console.log('This will update ALL brokers with data from ALL sources.');
  console.log('');

  const confirm = await askQuestion('Are you sure you want to proceed? (yes/no): ');
  if (confirm.toLowerCase() !== 'yes') {
    console.log('❌ Update cancelled.');
    return;
  }

  console.log('');
  console.log('🚀 Starting full broker data update...');

  try {
    // Run the comprehensive update script
    execSync('npx tsx scripts/comprehensive-broker-data-update.ts', {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    console.log('✅ Full update completed successfully!');
  } catch (error) {
    console.log('❌ Update failed:', error.message);
  }
}

// Run selective update
async function runSelectiveUpdate() {
  console.log('');
  console.log('🎯 SELECTIVE UPDATE SELECTED');
  console.log('You can choose specific brokers to update.');
  console.log('');

  // This would show a list of brokers and allow selection
  console.log('📋 Available brokers:');
  console.log('(This feature will show a list of brokers from the database)');
  console.log('');

  const brokerIds = await askQuestion('Enter broker IDs (comma-separated) or "all": ');

  if (brokerIds.toLowerCase() === 'all') {
    await runFullUpdate();
    return;
  }

  console.log(`🚀 Starting selective update for brokers: ${brokerIds}`);

  try {
    // Run the update script with specific broker IDs
    execSync(`npx tsx scripts/comprehensive-broker-data-update.ts --brokers="${brokerIds}"`, {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    console.log('✅ Selective update completed successfully!');
  } catch (error) {
    console.log('❌ Update failed:', error.message);
  }
}

// Run images only update
async function runImagesOnlyUpdate() {
  console.log('');
  console.log('🖼️  IMAGES ONLY UPDATE SELECTED');
  console.log('This will search for missing logos and platform screenshots.');
  console.log('');

  const confirm = await askQuestion('Proceed with image search? (yes/no): ');
  if (confirm.toLowerCase() !== 'yes') {
    console.log('❌ Update cancelled.');
    return;
  }

  console.log('🚀 Starting image search and update...');

  try {
    execSync('npx tsx scripts/comprehensive-broker-data-update.ts --images-only', {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    console.log('✅ Image update completed successfully!');
  } catch (error) {
    console.log('❌ Image update failed:', error.message);
  }
}

// Run data validation
async function runDataValidation() {
  console.log('');
  console.log('📊 DATA VALIDATION SELECTED');
  console.log('This will check the quality and completeness of existing broker data.');
  console.log('');

  console.log('🚀 Starting data validation...');

  try {
    execSync('npx tsx scripts/comprehensive-broker-data-update.ts --validate-only', {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    console.log('✅ Data validation completed successfully!');
  } catch (error) {
    console.log('❌ Data validation failed:', error.message);
  }
}

// Run rollback
async function runRollback() {
  console.log('');
  console.log('🔙 ROLLBACK SELECTED');
  console.log('This will restore broker data from a backup file.');
  console.log('');

  // List available backup files
  const backupFiles = fs.readdirSync('.')
    .filter(file => file.startsWith('broker-backup-') && file.endsWith('.json'))
    .sort()
    .reverse(); // Most recent first

  if (backupFiles.length === 0) {
    console.log('❌ No backup files found.');
    return;
  }

  console.log('📁 Available backup files:');
  backupFiles.forEach((file, index) => {
    const stats = fs.statSync(file);
    console.log(`${index + 1}. ${file} (${stats.mtime.toISOString()})`);
  });
  console.log('');

  const choice = await askQuestion('Select backup file number: ');
  const selectedFile = backupFiles[parseInt(choice) - 1];

  if (!selectedFile) {
    console.log('❌ Invalid selection.');
    return;
  }

  const confirm = await askQuestion(`Restore from ${selectedFile}? This will overwrite current data! (yes/no): `);
  if (confirm.toLowerCase() !== 'yes') {
    console.log('❌ Rollback cancelled.');
    return;
  }

  console.log(`🚀 Starting rollback from ${selectedFile}...`);

  try {
    execSync(`npx tsx scripts/comprehensive-broker-data-update.ts --rollback="${selectedFile}"`, {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    console.log('✅ Rollback completed successfully!');
  } catch (error) {
    console.log('❌ Rollback failed:', error.message);
  }
}

// Main execution
async function main() {
  try {
    displayBanner();

    // Check prerequisites
    const prerequisitesPassed = await checkPrerequisites();
    if (!prerequisitesPassed) {
      console.log('❌ Prerequisites not met. Please fix the issues above and try again.');
      process.exit(1);
    }

    // Display options and get user choice
    const option = await displayOptionsMenu();

    // Execute the selected option
    await executeOption(option);

  } catch (error) {
    console.log('❌ Script execution failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}
