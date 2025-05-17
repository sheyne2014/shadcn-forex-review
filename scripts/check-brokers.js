// Check brokers in the database
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBrokers() {
  console.log('Checking brokers in the database...');
  
  try {
    // Check if brokers exist
    const { data: brokers, error: brokerError } = await supabase
      .from('brokers')
      .select('id, name')
      .limit(10);
    
    if (brokerError) {
      console.error('Error accessing brokers table:', brokerError);
      return;
    }
    
    console.log(`Found ${brokers.length} brokers:`);
    brokers.forEach(broker => {
      console.log(`- ${broker.name} (ID: ${broker.id})`);
    });
    
    // Check if tables exist
    console.log('\nChecking database tables...');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tablesError) {
      console.error('Error checking tables:', tablesError);
      return;
    }
    
    console.log('Tables in the database:');
    tables.forEach(table => {
      console.log(`- ${table.table_name}`);
    });
    
    // Check reviews table structure
    console.log('\nChecking reviews table structure...');
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'reviews');
    
    if (columnsError) {
      console.error('Error checking reviews columns:', columnsError);
      return;
    }
    
    console.log('Reviews table columns:');
    columns.forEach(column => {
      console.log(`- ${column.column_name} (${column.data_type})`);
    });
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkBrokers()
  .then(() => {
    console.log('\nCheck completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 