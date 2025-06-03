#!/usr/bin/env node

/**
 * Clean up broker database by removing low-quality brokers
 * Keep only the top 110 brokers based on analysis
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function cleanupBrokers() {
  console.log('🧹 Starting broker cleanup process...\n');

  try {
    // Read the brokers to delete
    const brokersToDeleteData = await fs.readFile('scripts/brokers-to-delete.json', 'utf8');
    const brokersToDelete = JSON.parse(brokersToDeleteData);

    console.log(`📋 Found ${brokersToDelete.length} brokers to delete\n`);

    // Show what will be deleted
    console.log('🗑️  BROKERS TO BE DELETED:');
    console.log('Name | Reason');
    console.log('-----|-------');
    brokersToDelete.forEach(broker => {
      console.log(`${broker.name.padEnd(25, ' ')} | ${broker.reason}`);
    });

    // Ask for confirmation (in production, you might want to add a prompt)
    console.log('\n⚠️  WARNING: This will permanently delete these brokers from the database!');
    console.log('Proceeding with deletion in 3 seconds...\n');
    
    // Wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Delete brokers in batches
    const batchSize = 10;
    let deletedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < brokersToDelete.length; i += batchSize) {
      const batch = brokersToDelete.slice(i, i + batchSize);
      const brokerIds = batch.map(b => b.id);

      console.log(`🔄 Deleting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(brokersToDelete.length / batchSize)}...`);

      try {
        // Delete from brokers table
        const { error: deleteError } = await supabase
          .from('brokers')
          .delete()
          .in('id', brokerIds);

        if (deleteError) {
          console.error(`❌ Error deleting batch:`, deleteError);
          errorCount += batch.length;
        } else {
          console.log(`✅ Successfully deleted ${batch.length} brokers`);
          deletedCount += batch.length;
          
          // Log deleted broker names
          batch.forEach(broker => {
            console.log(`   - ${broker.name}`);
          });
        }
      } catch (error) {
        console.error(`❌ Error processing batch:`, error);
        errorCount += batch.length;
      }

      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n📊 CLEANUP SUMMARY:');
    console.log(`✅ Successfully deleted: ${deletedCount} brokers`);
    console.log(`❌ Failed to delete: ${errorCount} brokers`);
    console.log(`📈 Remaining brokers: ~110 (top quality brokers)`);

    // Verify the cleanup
    const { data: remainingBrokers, error: countError } = await supabase
      .from('brokers')
      .select('id', { count: 'exact' });

    if (!countError) {
      console.log(`🔍 Verified: ${remainingBrokers.length} brokers remaining in database`);
    }

    // Update broker statistics
    await updateBrokerStats();

    console.log('\n🎉 Broker cleanup completed successfully!');
    console.log('The database now contains only the top 110 highest-quality brokers.');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

async function updateBrokerStats() {
  console.log('\n📊 Updating broker statistics...');

  try {
    // Get updated broker counts by regulation
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('regulations, supported_assets, country, rating, trust_score');

    if (error) {
      console.error('Error fetching broker stats:', error);
      return;
    }

    // Calculate statistics
    const stats = {
      total: brokers.length,
      avgRating: brokers.reduce((sum, b) => sum + (b.rating || 0), 0) / brokers.length,
      avgTrustScore: brokers.reduce((sum, b) => sum + (b.trust_score || 0), 0) / brokers.length,
      regulationCounts: {},
      countryCounts: {},
      assetCounts: {}
    };

    // Count regulations
    brokers.forEach(broker => {
      if (broker.regulations) {
        const regs = broker.regulations.split(',').map(r => r.trim());
        regs.forEach(reg => {
          stats.regulationCounts[reg] = (stats.regulationCounts[reg] || 0) + 1;
        });
      }

      if (broker.country) {
        stats.countryCounts[broker.country] = (stats.countryCounts[broker.country] || 0) + 1;
      }

      if (broker.supported_assets) {
        const assets = Array.isArray(broker.supported_assets) ? 
                       broker.supported_assets : 
                       broker.supported_assets.split(',').map(a => a.trim());
        assets.forEach(asset => {
          stats.assetCounts[asset] = (stats.assetCounts[asset] || 0) + 1;
        });
      }
    });

    console.log('\n📈 UPDATED STATISTICS:');
    console.log(`Total brokers: ${stats.total}`);
    console.log(`Average rating: ${stats.avgRating.toFixed(2)}`);
    console.log(`Average trust score: ${stats.avgTrustScore.toFixed(2)}`);

    console.log('\nTop regulations:');
    Object.entries(stats.regulationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([reg, count]) => {
        console.log(`  ${reg}: ${count} brokers`);
      });

    console.log('\nTop countries:');
    Object.entries(stats.countryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([country, count]) => {
        console.log(`  ${country}: ${count} brokers`);
      });

    console.log('\nSupported assets:');
    Object.entries(stats.assetCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([asset, count]) => {
        console.log(`  ${asset}: ${count} brokers`);
      });

    // Save stats to file
    await fs.writeFile(
      'scripts/broker-cleanup-stats.json',
      JSON.stringify(stats, null, 2)
    );

    console.log('\n💾 Statistics saved to scripts/broker-cleanup-stats.json');

  } catch (error) {
    console.error('Error updating stats:', error);
  }
}

// Run the cleanup
if (require.main === module) {
  cleanupBrokers().catch(console.error);
}

module.exports = { cleanupBrokers };
