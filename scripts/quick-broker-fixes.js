const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Main function to apply quick fixes
async function quickBrokerFixes() {
  console.log('🔧 Applying quick broker fixes...');
  
  try {
    // 1. Fix TD Ameritrade and Charles Schwab logos
    console.log('🎨 Fixing TD Ameritrade and Charles Schwab logos...');
    
    const logoFixes = [
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
    
    for (const fix of logoFixes) {
      const { data, error } = await supabase
        .from('brokers')
        .update({ logo_url: fix.logo_url })
        .eq('name', fix.name)
        .select();
      
      if (error) {
        console.error(`❌ Error updating ${fix.name}:`, error.message);
      } else if (data && data.length > 0) {
        console.log(`✅ Updated ${fix.name} logo`);
      } else {
        console.log(`⚠️  ${fix.name} not found in database`);
      }
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // 2. Check and add BlackBull Markets if missing
    console.log('\n🎯 Checking BlackBull Markets...');
    
    const { data: blackbullCheck, error: checkError } = await supabase
      .from('brokers')
      .select('*')
      .eq('name', 'BlackBull Markets');
    
    if (checkError) {
      console.error('❌ Error checking BlackBull Markets:', checkError.message);
    } else if (blackbullCheck && blackbullCheck.length > 0) {
      console.log(`✅ BlackBull Markets found: ${blackbullCheck[0].id}`);
      
      // Update rating and logo if needed
      const updates = {};
      if (blackbullCheck[0].rating !== 4.8) updates.rating = 4.8;
      if (blackbullCheck[0].logo_url !== 'https://logo.clearbit.com/blackbull.com') {
        updates.logo_url = 'https://logo.clearbit.com/blackbull.com';
      }
      
      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from('brokers')
          .update(updates)
          .eq('id', blackbullCheck[0].id);
        
        if (updateError) {
          console.error('❌ Error updating BlackBull Markets:', updateError.message);
        } else {
          console.log('✅ BlackBull Markets updated');
        }
      }
    } else {
      console.log('⚠️  BlackBull Markets not found - adding it...');
      
      const { error: insertError } = await supabase
        .from('brokers')
        .insert({
          name: 'BlackBull Markets',
          logo_url: 'https://logo.clearbit.com/blackbull.com',
          min_deposit: 200,
          trading_fee: 0.0,
          regulations: 'FMA, FSA, ASIC, FCA',
          supported_assets: ['Forex', 'CFDs', 'Stocks', 'Crypto', 'Commodities'],
          country: 'New Zealand',
          rating: 4.8,
          website_url: 'https://blackbull.com',
          max_leverage: '1:500',
          trading_platforms: 'MT4, MT5, BlackBull CopyTrader, TradingView',
          spread_from: '0.0 pips',
          headquarters: 'Auckland, New Zealand',
          year_founded: '2014'
        });
      
      if (insertError) {
        console.error('❌ Error adding BlackBull Markets:', insertError.message);
      } else {
        console.log('✅ BlackBull Markets added successfully');
      }
    }
    
    // 3. Remove obvious duplicates
    console.log('\n🧹 Removing obvious duplicates...');
    
    const duplicateNames = ['Tradovate Futures', 'Capital.com', 'Bitfinex', 'Upstox', 'Mirae Asset'];
    
    for (const name of duplicateNames) {
      const { data: duplicates, error: dupError } = await supabase
        .from('brokers')
        .select('*')
        .eq('name', name)
        .order('created_at', { ascending: true });
      
      if (dupError) {
        console.error(`❌ Error checking duplicates for ${name}:`, dupError.message);
        continue;
      }
      
      if (duplicates && duplicates.length > 1) {
        console.log(`Found ${duplicates.length} duplicates for ${name}`);
        
        // Keep the first one, remove the rest
        const toRemove = duplicates.slice(1);
        
        for (const duplicate of toRemove) {
          const { error: deleteError } = await supabase
            .from('brokers')
            .delete()
            .eq('id', duplicate.id);
          
          if (deleteError) {
            console.error(`❌ Error removing duplicate ${duplicate.id}:`, deleteError.message);
          } else {
            console.log(`✅ Removed duplicate ${name} (${duplicate.id})`);
          }
        }
      }
    }
    
    console.log('\n🎉 Quick broker fixes completed!');
    
  } catch (error) {
    console.error('❌ Error in quick fixes:', error);
  }
}

// Run the fixes
quickBrokerFixes();
