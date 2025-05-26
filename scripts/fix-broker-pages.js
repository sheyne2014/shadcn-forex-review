#!/usr/bin/env node

/**
 * Fix Broker Pages TypeScript Issues
 * 
 * Updates all broker pages to use the correct Next.js 15 params type
 */

import fs from 'fs';
import path from 'path';

const BROKERS_DIR = path.join(process.cwd(), 'src/app/brokers');

// List of broker directories to fix
const brokerDirs = [
  'capital-com',
  'easymarkets', 
  'fxtm',
  'ic-markets',
  'interactive-brokers',
  'oanda',
  'pepperstone',
  'plus500',
  'saxo-bank',
  'startrader',
  'swissquote',
  'tmgm',
  'xm',
  'xtb'
];

function fixBrokerPage(brokerDir) {
  const pagePath = path.join(BROKERS_DIR, brokerDir, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Page not found: ${pagePath}`);
    return;
  }

  try {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Fix the Props type
    content = content.replace(
      /type Props = \{\s*params: \{ slug: string \}\s*\}/g,
      'type Props = {\n  params: Promise<{ slug: string }>\n}'
    );
    
    // Fix generateMetadata function
    content = content.replace(
      /export async function generateMetadata\(\{ params \}: Props\): Promise<Metadata> \{/g,
      'export async function generateMetadata({ params: _ }: Props): Promise<Metadata> {'
    );
    
    // Fix default export function
    content = content.replace(
      /export default async function BrokerReviewPage\(\{ params \}: Props\) \{/g,
      'export default async function BrokerReviewPage({ params: _ }: Props) {'
    );
    
    fs.writeFileSync(pagePath, content);
    console.log(`✅ Fixed: ${brokerDir}/page.tsx`);
    
  } catch (error) {
    console.error(`❌ Error fixing ${brokerDir}/page.tsx:`, error.message);
  }
}

function main() {
  console.log('🔧 Fixing broker page TypeScript issues...\n');
  
  brokerDirs.forEach(brokerDir => {
    fixBrokerPage(brokerDir);
  });
  
  console.log('\n✅ All broker pages fixed!');
}

main();
