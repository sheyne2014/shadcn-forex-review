# PowerShell script to run the simplified broker import

Write-Host "Starting simplified broker import process..." -ForegroundColor Cyan

# Check if dependencies are installed
if (!(Test-Path node_modules/dotenv) -or !(Test-Path node_modules/@supabase/supabase-js)) {
    Write-Host "Installing required dependencies..." -ForegroundColor Yellow
    npm install dotenv @supabase/supabase-js
}

# Run the import
Write-Host "Running simplified broker import script..." -ForegroundColor Green
node scripts/import-simple.js

Write-Host "`nImport process completed. Check the output above for results." -ForegroundColor Cyan 