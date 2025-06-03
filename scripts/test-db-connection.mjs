import { createClient } from '@supabase/supabase-js';

// Hardcode the credentials for testing
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyODY5MjIsImV4cCI6MjA1ODg2MjkyMn0.sk4slxLQmxCpcmTz_6X-yE6ybZ8eaX4ItUasm_ZVH-k';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  try {
    // Test basic connection
    const { data: brokers, error } = await supabase
      .from('brokers')
      .select('id, name, logo_url')
      .limit(5);
    
    if (error) {
      console.error('❌ Database error:', error);
      return;
    }
    
    console.log(`✅ Successfully connected! Found ${brokers.length} brokers (showing first 5):\n`);
    
    brokers.forEach(broker => {
      console.log(`- ${broker.name}: ${broker.logo_url || 'No logo'}`);
    });
    
  } catch (error) {
    console.error('❌ Connection error:', error);
  }
}

testConnection();
