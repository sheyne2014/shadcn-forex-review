import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import https from 'https';

// Load environment variables
dotenv.config();

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Function to download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file async
      reject(err);
    });
  });
}

// Function to fix logo conflicts
async function fixLogoConflicts() {
  console.log('🔧 Starting logo conflict resolution...');
  
  try {
    // 1. Download official TD Ameritrade logo
    console.log('📥 Downloading TD Ameritrade official logo...');
    const tdLogoUrl = 'https://download.logo.wine/logo/TD_Ameritrade/TD_Ameritrade-Logo.wine.png';
    const tdLogoPath = path.join(process.cwd(), 'public', 'images', 'brokers', 'td-ameritrade.png');
    
    // Ensure directory exists
    const logoDir = path.dirname(tdLogoPath);
    if (!fs.existsSync(logoDir)) {
      fs.mkdirSync(logoDir, { recursive: true });
    }
    
    await downloadImage(tdLogoUrl, tdLogoPath);
    console.log('✅ TD Ameritrade logo downloaded successfully');
    
    // 2. Download official Charles Schwab logo
    console.log('📥 Downloading Charles Schwab official logo...');
    const schwabLogoUrl = 'https://download.logo.wine/logo/Charles_Schwab_Corporation/Charles_Schwab_Corporation-Logo.wine.png';
    const schwabLogoPath = path.join(process.cwd(), 'public', 'images', 'brokers', 'charles-schwab.png');
    
    await downloadImage(schwabLogoUrl, schwabLogoPath);
    console.log('✅ Charles Schwab logo downloaded successfully');
    
    // 3. Update database with correct logo URLs
    console.log('🔄 Updating database with correct logo URLs...');
    
    // Update TD Ameritrade
    const { data: tdData, error: tdError } = await supabase
      .from('brokers')
      .update({ 
        logo_url: '/images/brokers/td-ameritrade.png'
      })
      .eq('name', 'TD Ameritrade')
      .select();
      
    if (tdError) {
      console.error('❌ Error updating TD Ameritrade:', tdError);
    } else if (tdData && tdData.length > 0) {
      console.log('✅ TD Ameritrade logo URL updated in database');
    } else {
      console.log('⚠️  TD Ameritrade not found in database');
    }
    
    // Update Charles Schwab
    const { data: schwabData, error: schwabError } = await supabase
      .from('brokers')
      .update({ 
        logo_url: '/images/brokers/charles-schwab.png'
      })
      .eq('name', 'Charles Schwab')
      .select();
      
    if (schwabError) {
      console.error('❌ Error updating Charles Schwab:', schwabError);
    } else if (schwabData && schwabData.length > 0) {
      console.log('✅ Charles Schwab logo URL updated in database');
    } else {
      console.log('⚠️  Charles Schwab not found in database');
    }
    
    console.log('🎉 Logo conflict resolution completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in logo conflict resolution:', error);
  }
}

// Run the fix
fixLogoConflicts();
