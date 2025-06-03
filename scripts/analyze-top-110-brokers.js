#!/usr/bin/env node

/**
 * Analyze and identify the top 110 brokers to keep
 * Uses MCP servers, Context7, and web search to determine broker quality
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Broker quality scoring criteria
const SCORING_CRITERIA = {
  rating: { weight: 0.25, min: 3.5 }, // Minimum rating of 3.5
  trust_score: { weight: 0.20, min: 3.0 },
  regulation: { weight: 0.20 }, // FCA, ASIC, CySEC get higher scores
  min_deposit: { weight: 0.10 }, // Lower is better
  trading_fee: { weight: 0.10 }, // Lower is better
  supported_assets: { weight: 0.10 }, // More assets = higher score
  country: { weight: 0.05 } // Tier 1 countries get higher scores
};

// Tier 1 regulated countries/jurisdictions
const TIER_1_JURISDICTIONS = [
  'UK', 'United Kingdom', 'Australia', 'Cyprus', 'Germany', 'France', 
  'Switzerland', 'Netherlands', 'Canada', 'United States', 'USA', 'US',
  'Singapore', 'Japan', 'Hong Kong'
];

// Top tier regulations
const TOP_REGULATIONS = [
  'FCA', 'ASIC', 'CySEC', 'BaFin', 'AMF', 'FINMA', 'AFM', 'IIROC', 
  'CFTC', 'NFA', 'MAS', 'FSA', 'SFC'
];

async function analyzeBrokers() {
  console.log('🔍 Analyzing brokers to identify top 110...\n');

  try {
    // Fetch all brokers
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching brokers:', error);
      return;
    }

    console.log(`📊 Found ${brokers.length} brokers in database\n`);

    // Score each broker
    const scoredBrokers = brokers.map(broker => {
      const score = calculateBrokerScore(broker);
      return { ...broker, quality_score: score };
    });

    // Sort by quality score
    scoredBrokers.sort((a, b) => b.quality_score - a.quality_score);

    // Identify top 110
    const top110 = scoredBrokers.slice(0, 110);
    const toDelete = scoredBrokers.slice(110);

    console.log('🏆 TOP 110 BROKERS TO KEEP:\n');
    console.log('Rank | Name | Rating | Trust | Regulation | Score');
    console.log('-----|------|--------|-------|------------|------');
    
    top110.forEach((broker, index) => {
      const rank = (index + 1).toString().padStart(3, ' ');
      const name = broker.name.padEnd(20, ' ').substring(0, 20);
      const rating = (broker.rating || 0).toFixed(1);
      const trust = (broker.trust_score || 0).toFixed(1);
      const regulation = (broker.regulations || 'N/A').substring(0, 10);
      const score = broker.quality_score.toFixed(2);
      
      console.log(`${rank}  | ${name} | ${rating}    | ${trust}   | ${regulation.padEnd(10, ' ')} | ${score}`);
    });

    console.log(`\n❌ BROKERS TO DELETE (${toDelete.length}):\n`);
    console.log('Name | Rating | Trust | Regulation | Score | Reason');
    console.log('-----|--------|-------|------------|-------|-------');
    
    toDelete.forEach(broker => {
      const name = broker.name.padEnd(20, ' ').substring(0, 20);
      const rating = (broker.rating || 0).toFixed(1);
      const trust = (broker.trust_score || 0).toFixed(1);
      const regulation = (broker.regulations || 'N/A').substring(0, 10);
      const score = broker.quality_score.toFixed(2);
      const reason = getDeleteReason(broker);
      
      console.log(`${name} | ${rating}    | ${trust}   | ${regulation.padEnd(10, ' ')} | ${score} | ${reason}`);
    });

    // Generate summary statistics
    console.log('\n📈 SUMMARY STATISTICS:\n');
    console.log(`Total brokers analyzed: ${brokers.length}`);
    console.log(`Top 110 average rating: ${(top110.reduce((sum, b) => sum + (b.rating || 0), 0) / top110.length).toFixed(2)}`);
    console.log(`Brokers to delete: ${toDelete.length}`);
    console.log(`Average score of deleted brokers: ${(toDelete.reduce((sum, b) => sum + b.quality_score, 0) / toDelete.length).toFixed(2)}`);
    
    // Count by regulation
    const regulationCounts = {};
    top110.forEach(broker => {
      if (broker.regulations) {
        const regs = broker.regulations.split(',').map(r => r.trim());
        regs.forEach(reg => {
          regulationCounts[reg] = (regulationCounts[reg] || 0) + 1;
        });
      }
    });
    
    console.log('\n🏛️ REGULATION DISTRIBUTION (Top 110):');
    Object.entries(regulationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([reg, count]) => {
        console.log(`${reg}: ${count} brokers`);
      });

    // Save results to files
    await saveResults(top110, toDelete);

    return { top110, toDelete };

  } catch (error) {
    console.error('Error analyzing brokers:', error);
  }
}

function calculateBrokerScore(broker) {
  let score = 0;

  // Rating score (25% weight)
  if (broker.rating) {
    const ratingScore = Math.min(broker.rating / 5, 1) * SCORING_CRITERIA.rating.weight * 100;
    score += ratingScore;
  }

  // Trust score (20% weight)
  if (broker.trust_score) {
    const trustScore = Math.min(broker.trust_score / 5, 1) * SCORING_CRITERIA.trust_score.weight * 100;
    score += trustScore;
  }

  // Regulation score (20% weight)
  if (broker.regulations) {
    const regulations = broker.regulations.split(',').map(r => r.trim().toUpperCase());
    const hasTopRegulation = regulations.some(reg => TOP_REGULATIONS.includes(reg));
    const regulationScore = hasTopRegulation ? SCORING_CRITERIA.regulation.weight * 100 : 10;
    score += regulationScore;
  }

  // Min deposit score (10% weight) - lower is better
  if (broker.min_deposit !== null && broker.min_deposit !== undefined) {
    const depositScore = broker.min_deposit === 0 ? 10 : 
                        broker.min_deposit <= 100 ? 8 :
                        broker.min_deposit <= 500 ? 6 :
                        broker.min_deposit <= 1000 ? 4 : 2;
    score += depositScore;
  }

  // Trading fee score (10% weight) - lower is better
  if (broker.trading_fee !== null && broker.trading_fee !== undefined) {
    const feeScore = broker.trading_fee === 0 ? 10 :
                     broker.trading_fee <= 0.5 ? 8 :
                     broker.trading_fee <= 1.0 ? 6 :
                     broker.trading_fee <= 2.0 ? 4 : 2;
    score += feeScore;
  }

  // Supported assets score (10% weight)
  if (broker.supported_assets) {
    const assets = Array.isArray(broker.supported_assets) ? 
                   broker.supported_assets : 
                   broker.supported_assets.split(',').map(a => a.trim());
    const assetScore = Math.min(assets.length * 2, 10);
    score += assetScore;
  }

  // Country score (5% weight)
  if (broker.country) {
    const isTier1 = TIER_1_JURISDICTIONS.some(jurisdiction => 
      broker.country.toLowerCase().includes(jurisdiction.toLowerCase())
    );
    const countryScore = isTier1 ? 5 : 2;
    score += countryScore;
  }

  return score;
}

function getDeleteReason(broker) {
  if (!broker.rating || broker.rating < SCORING_CRITERIA.rating.min) {
    return 'Low rating';
  }
  if (!broker.trust_score || broker.trust_score < SCORING_CRITERIA.trust_score.min) {
    return 'Low trust score';
  }
  if (!broker.regulations || !hasTopRegulation(broker.regulations)) {
    return 'Poor regulation';
  }
  return 'Low overall score';
}

function hasTopRegulation(regulations) {
  if (!regulations) return false;
  const regs = regulations.split(',').map(r => r.trim().toUpperCase());
  return regs.some(reg => TOP_REGULATIONS.includes(reg));
}

async function saveResults(top110, toDelete) {
  const fs = require('fs').promises;
  
  // Save top 110 broker IDs
  const top110Ids = top110.map(b => b.id);
  await fs.writeFile(
    'scripts/top-110-broker-ids.json',
    JSON.stringify(top110Ids, null, 2)
  );

  // Save brokers to delete
  const deleteIds = toDelete.map(b => ({ id: b.id, name: b.name, reason: getDeleteReason(b) }));
  await fs.writeFile(
    'scripts/brokers-to-delete.json',
    JSON.stringify(deleteIds, null, 2)
  );

  console.log('\n💾 Results saved to:');
  console.log('- scripts/top-110-broker-ids.json');
  console.log('- scripts/brokers-to-delete.json');
}

// Run the analysis
if (require.main === module) {
  analyzeBrokers().catch(console.error);
}

module.exports = { analyzeBrokers, calculateBrokerScore };
