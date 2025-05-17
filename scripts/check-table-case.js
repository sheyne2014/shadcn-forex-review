// Check exact table names and case in the database
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('Checking table names and case...');
  
  try {
    // Direct SQL query to get table names with exact case
    const { data, error } = await supabase.rpc('get_table_names');
    
    if (error) {
      console.error('Error querying table names:', error);
      
      // Try an alternative approach
      console.log('Trying alternative approach...');
      
      // Query any table we know exists
      const { data: brokerData, error: brokerError } = await supabase.from('brokers').select('count');
      
      if (brokerError) {
        console.log('Error accessing brokers table:', brokerError);
        console.log('Trying with capital B...');
        
        const { data: capitalized, error: capitalizedError } = await supabase.from('Brokers').select('count');
        
        if (capitalizedError) {
          console.log('Error accessing Brokers table with capital B:', capitalizedError);
        } else {
          console.log('Success! The table name is "Brokers" with capital B');
          console.log(capitalized);
        }
      } else {
        console.log('Success! The table name is "brokers" with lowercase b');
        console.log(brokerData);
      }
      
      // Try reviews table
      console.log('Checking reviews table...');
      const { data: reviewsData, error: reviewsError } = await supabase.from('reviews').select('count');
      
      if (reviewsError) {
        console.log('Error accessing reviews table:', reviewsError);
        console.log('Trying with capital R...');
        
        const { data: capitalized, error: capitalizedError } = await supabase.from('Reviews').select('count');
        
        if (capitalizedError) {
          console.log('Error accessing Reviews table with capital R:', capitalizedError);
        } else {
          console.log('Success! The table name is "Reviews" with capital R');
          console.log(capitalized);
        }
      } else {
        console.log('Success! The table name is "reviews" with lowercase r');
        console.log(reviewsData);
      }
      
      return;
    }
    
    console.log('Tables in the database with exact case:');
    console.log(data);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkTables()
  .then(() => {
    console.log('Check completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 