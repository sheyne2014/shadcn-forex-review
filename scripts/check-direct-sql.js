// Run direct SQL queries to check table structure
const { createClient } = require('@supabase/supabase-js');

// Supabase credentials
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function runDirectQueries() {
  console.log('Running direct SQL queries to check database structure...');
  
  try {
    // Get list of tables
    console.log('Querying for list of tables...');
    const { data: tables, error: tablesError } = await supabase.rpc('query', {
      sql_query: `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
      `
    });
    
    if (tablesError) {
      console.error('Error querying tables:', tablesError);
      
      // Try simpler direct query
      console.log('Trying simpler direct query...');
      try {
        // Create a test review using direct SQL
        const { data: insertResult, error: insertError } = await supabase.rpc('query', {
          sql_query: `
            INSERT INTO reviews (broker_id, user_id, rating, comment, created_at)
            VALUES ('fc045eb3-73e9-4fbb-b751-2cc048f91bb7', 
                   (SELECT id FROM users LIMIT 1), 
                   4, 
                   'Direct SQL test review',
                   current_timestamp)
            RETURNING id;
          `
        });
        
        if (insertError) {
          console.error('Error inserting review via direct SQL:', insertError);
          
          // Try to understand the error message
          if (insertError.message.includes('foreign key')) {
            console.log('This is a foreign key issue. Checking the exact constraint name...');
            
            const { data: constraintResult, error: constraintError } = await supabase.rpc('query', {
              sql_query: `
                SELECT constraint_name, table_name, column_name, referenced_table_name, referenced_column_name
                FROM information_schema.key_column_usage
                JOIN information_schema.table_constraints 
                ON information_schema.key_column_usage.constraint_name = information_schema.table_constraints.constraint_name
                WHERE information_schema.key_column_usage.table_name = 'reviews'
                AND information_schema.table_constraints.constraint_type = 'FOREIGN KEY';
              `
            });
            
            if (constraintError) {
              console.error('Error querying constraints:', constraintError);
            } else {
              console.log('Foreign key constraints:', constraintResult);
            }
          }
        } else {
          console.log('Successfully inserted a review via direct SQL:', insertResult);
        }
      } catch (directError) {
        console.error('Error with direct SQL query:', directError);
      }
    } else {
      console.log('Tables in the database:');
      console.log(tables);
      
      // Check reviews table structure
      console.log('\nChecking reviews table structure...');
      const { data: reviewsStructure, error: structureError } = await supabase.rpc('query', {
        sql_query: `
          SELECT column_name, data_type, is_nullable
          FROM information_schema.columns
          WHERE table_name = 'reviews'
          ORDER BY ordinal_position;
        `
      });
      
      if (structureError) {
        console.error('Error querying reviews structure:', structureError);
      } else {
        console.log('Reviews table structure:');
        console.log(reviewsStructure);
      }
      
      // Check foreign key constraints
      console.log('\nChecking foreign key constraints...');
      const { data: constraints, error: constraintsError } = await supabase.rpc('query', {
        sql_query: `
          SELECT
            tc.constraint_name,
            tc.table_name,
            kcu.column_name,
            ccu.table_name AS referenced_table_name,
            ccu.column_name AS referenced_column_name
          FROM
            information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
            JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
          WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'reviews';
        `
      });
      
      if (constraintsError) {
        console.error('Error querying constraints:', constraintsError);
      } else {
        console.log('Foreign key constraints:');
        console.log(constraints);
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

runDirectQueries()
  .then(() => {
    console.log('\nQuery completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 