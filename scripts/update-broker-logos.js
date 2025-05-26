import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Function to update broker logos
async function updateBrokerLogos() {
  console.log('🔧 Starting broker logo updates...');
  
  try {
    // Logo updates for specific brokers with official logos
    const logoUpdates = [
      {
        name: 'TD Ameritrade',
        logo_url: 'https://logo.clearbit.com/tdameritrade.com'
      },
      {
        name: 'Charles Schwab',
        logo_url: 'https://logo.clearbit.com/schwab.com'
      },
      {
        name: 'BlackBull Markets',
        logo_url: 'https://logo.clearbit.com/blackbull.com'
      },
      {
        name: 'Interactive Brokers',
        logo_url: 'https://logo.clearbit.com/interactivebrokers.com'
      },
      {
        name: 'eToro',
        logo_url: 'https://logo.clearbit.com/etoro.com'
      },
      {
        name: 'XM',
        logo_url: 'https://logo.clearbit.com/xm.com'
      },
      {
        name: 'IC Markets',
        logo_url: 'https://logo.clearbit.com/icmarkets.com'
      },
      {
        name: 'Pepperstone',
        logo_url: 'https://logo.clearbit.com/pepperstone.com'
      },
      {
        name: 'OANDA',
        logo_url: 'https://logo.clearbit.com/oanda.com'
      },
      {
        name: 'Plus500',
        logo_url: 'https://logo.clearbit.com/plus500.com'
      },
      {
        name: 'Capital.com',
        logo_url: 'https://logo.clearbit.com/capital.com'
      },
      {
        name: 'Saxo Bank',
        logo_url: 'https://logo.clearbit.com/saxobank.com'
      },
      {
        name: 'XTB',
        logo_url: 'https://logo.clearbit.com/xtb.com'
      },
      {
        name: 'Binance',
        logo_url: 'https://logo.clearbit.com/binance.com'
      },
      {
        name: 'Coinbase',
        logo_url: 'https://logo.clearbit.com/coinbase.com'
      },
      {
        name: 'Kraken',
        logo_url: 'https://logo.clearbit.com/kraken.com'
      },
      {
        name: 'Gemini',
        logo_url: 'https://logo.clearbit.com/gemini.com'
      }
    ];
    
    // Update each broker's logo
    for (const update of logoUpdates) {
      console.log(`🔄 Updating ${update.name} logo...`);
      
      const { data, error } = await supabase
        .from('brokers')
        .update({ logo_url: update.logo_url })
        .eq('name', update.name)
        .select();
        
      if (error) {
        console.error(`❌ Error updating ${update.name}:`, error);
      } else if (data && data.length > 0) {
        console.log(`✅ ${update.name} logo updated successfully`);
      } else {
        console.log(`⚠️  ${update.name} not found in database`);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('🎉 Broker logo updates completed!');
    
  } catch (error) {
    console.error('❌ Error in broker logo updates:', error);
  }
}

// Run the update
updateBrokerLogos();
