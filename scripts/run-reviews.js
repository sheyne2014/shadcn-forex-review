// Run broker reviews import script
const { spawn } = require('child_process');
const path = require('path');

// Supabase credentials 
const supabaseUrl = 'https://imndrogsolkrupmuzikd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbmRyb2dzb2xrcnVwbXV6aWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjkyMiwiZXhwIjoyMDU4ODYyOTIyfQ.HfXVNcxF7sqOsaclotpm8vR8lF_tGk-WGZvQik-8GRM';

console.log('Starting broker reviews import...');

// Path to the import script
const scriptPath = path.join(__dirname, 'import-broker-reviews-int-rating.js');

// Spawn the process
const importProcess = spawn('node', [scriptPath, supabaseUrl, supabaseKey], {
  stdio: 'inherit'
});

importProcess.on('close', (code) => {
  console.log(`Import process exited with code ${code}`);
}); 