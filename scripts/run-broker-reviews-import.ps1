# Run broker reviews import script

# Prompt for Supabase credentials
$supabaseUrl = Read-Host -Prompt "Enter your Supabase URL"
$supabaseKey = Read-Host -Prompt "Enter your Supabase service role key"

if (-not $supabaseUrl -or -not $supabaseKey) {
    Write-Host "Error: Both Supabase URL and key are required." -ForegroundColor Red
    exit 1
}

Write-Host "Starting import of broker reviews..." -ForegroundColor Green

# Navigate to project root directory (if not already there)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Split-Path -Parent $scriptDir)

# Run the import script with credentials
node scripts/import-broker-reviews-fixed.js $supabaseUrl $supabaseKey

Write-Host "Broker reviews import complete!" -ForegroundColor Green 