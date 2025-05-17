# Run Supabase broker import script with credentials

# Prompt for Supabase credentials
$supabaseUrl = Read-Host -Prompt "Enter your Supabase URL"
$supabaseKey = Read-Host -Prompt "Enter your Supabase service role key"

if (-not $supabaseUrl -or -not $supabaseKey) {
    Write-Host "Error: Both Supabase URL and key are required." -ForegroundColor Red
    exit 1
}

Write-Host "Starting import of 100 more brokers..." -ForegroundColor Green

# Run the import script with credentials
node import-100-more-brokers-supabase.js $supabaseUrl $supabaseKey

Write-Host "Import script complete!" -ForegroundColor Green 