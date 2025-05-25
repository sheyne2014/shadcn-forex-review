import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function findMissingBrokerPages() {
  try {
    console.log('🔍 Finding brokers without review pages...\n');

    // Get all brokers from database
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('id, name, rating, min_deposit, supported_assets, country')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching brokers:', error);
      return;
    }

    console.log(`📊 Found ${brokers.length} brokers in database\n`);

    // Get existing broker page directories
    const brokerPagesDir = path.join(process.cwd(), 'src', 'app', 'broker');
    const existingPages = fs.readdirSync(brokerPagesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name !== '[id]')
      .map(dirent => dirent.name);

    console.log(`📁 Found ${existingPages.length} existing broker pages:`);
    existingPages.forEach(page => console.log(`   - ${page}`));

    // Function to convert broker name to slug
    function nameToSlug(name) {
      return name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim();
    }

    // Find brokers without pages
    const brokersWithoutPages = brokers.filter(broker => {
      const expectedSlug = nameToSlug(broker.name);
      return !existingPages.includes(expectedSlug);
    });

    console.log(`\n🚫 Found ${brokersWithoutPages.length} brokers WITHOUT review pages:\n`);

    if (brokersWithoutPages.length === 0) {
      console.log('✅ All brokers have review pages!');
      return;
    }

    // Group by asset type for better organization
    const brokersByAsset = {
      forex: [],
      crypto: [],
      stocks: [],
      mixed: [],
      other: []
    };

    brokersWithoutPages.forEach(broker => {
      const assets = broker.supported_assets || [];
      const assetStr = assets.join(',').toLowerCase();
      
      if (assetStr.includes('bitcoin') || assetStr.includes('ethereum') || assetStr.includes('crypto')) {
        brokersByAsset.crypto.push(broker);
      } else if (assetStr.includes('forex') && !assetStr.includes('stocks')) {
        brokersByAsset.forex.push(broker);
      } else if (assetStr.includes('stocks') && !assetStr.includes('forex')) {
        brokersByAsset.stocks.push(broker);
      } else if (assets.length > 2) {
        brokersByAsset.mixed.push(broker);
      } else {
        brokersByAsset.other.push(broker);
      }
    });

    // Display results by category
    Object.entries(brokersByAsset).forEach(([category, brokers]) => {
      if (brokers.length > 0) {
        console.log(`\n📈 ${category.toUpperCase()} BROKERS (${brokers.length}):`);
        brokers.forEach((broker, index) => {
          const slug = nameToSlug(broker.name);
          const assets = broker.supported_assets ? broker.supported_assets.join(', ') : 'N/A';
          console.log(`   ${index + 1}. ${broker.name} (${broker.rating}⭐) - ${broker.country}`);
          console.log(`      Slug: ${slug}`);
          console.log(`      Assets: ${assets}`);
          console.log(`      Min Deposit: $${broker.min_deposit}`);
          console.log('');
        });
      }
    });

    // Suggest next batch
    console.log('\n🎯 SUGGESTED BATCH 5 (Top 5 missing brokers by rating):');
    const topMissing = brokersWithoutPages
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    topMissing.forEach((broker, index) => {
      const slug = nameToSlug(broker.name);
      const assets = broker.supported_assets ? broker.supported_assets.join(', ') : 'N/A';
      console.log(`   ${index + 1}. ${broker.name} (${broker.rating}⭐)`);
      console.log(`      Slug: ${slug}`);
      console.log(`      Assets: ${assets}`);
      console.log(`      Country: ${broker.country}`);
      console.log('');
    });

    console.log('\n📋 SUMMARY:');
    console.log(`   - Total brokers in database: ${brokers.length}`);
    console.log(`   - Brokers with pages: ${existingPages.length}`);
    console.log(`   - Brokers without pages: ${brokersWithoutPages.length}`);
    console.log(`   - Completion rate: ${Math.round((existingPages.length / brokers.length) * 100)}%`);

  } catch (error) {
    console.error('Error:', error);
  }
}

findMissingBrokerPages();
