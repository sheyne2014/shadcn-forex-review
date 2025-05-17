# Debug broker reviews import issue

# Prompt for Supabase credentials
$supabaseUrl = Read-Host -Prompt "Enter your Supabase URL"
$supabaseKey = Read-Host -Prompt "Enter your Supabase service role key"

if (-not $supabaseUrl -or -not $supabaseKey) {
    Write-Host "Error: Both Supabase URL and key are required." -ForegroundColor Red
    exit 1
}

Write-Host "Running diagnostic tests for Supabase broker reviews..." -ForegroundColor Green

# Navigate to project root directory (if not already there)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Split-Path -Parent $scriptDir)

Write-Host "`n========== STEP 1: Checking Database ==========`n" -ForegroundColor Cyan
node scripts/debug-broker-reviews.js $supabaseUrl $supabaseKey

Write-Host "`n========== STEP 2: Testing Single Review Insert ==========`n" -ForegroundColor Cyan
node scripts/insert-single-review.js $supabaseUrl $supabaseKey

Write-Host "`n========== Diagnostic Tests Complete ==========`n" -ForegroundColor Green

$fix = Read-Host -Prompt "Would you like to attempt to run the full review import script again with debug logging? (y/n)"
if ($fix -eq "y") {
    Write-Host "Running full import with verbose logging..." -ForegroundColor Yellow
    
    # Create a temporary fixed version with more logging
    $originalContent = Get-Content -Path "scripts/import-broker-reviews-fixed.js" -Raw
    $fixedContent = $originalContent -replace "console.error\(`"Error adding review for", "console.error(`"VERBOSE ERROR: Error adding review for"
    $fixedContent = $fixedContent -replace "process.exit\(1\);", "console.error('Exiting with error', error); process.exit(1);"
    $fixedContent | Set-Content -Path "scripts/import-broker-reviews-debug.js"
    
    # Run the debug version
    node scripts/import-broker-reviews-debug.js $supabaseUrl $supabaseKey
    
    # Clean up
    Remove-Item -Path "scripts/import-broker-reviews-debug.js"
}

Write-Host "Debug process complete!" -ForegroundColor Green 