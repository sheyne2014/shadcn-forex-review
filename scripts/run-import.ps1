# PowerShell script to run the JavaScript broker import

Write-Host "Starting broker import process..." -ForegroundColor Cyan

# Check if dependencies are installed
if (!(Test-Path node_modules/dotenv) -or !(Test-Path node_modules/@supabase/supabase-js)) {
    Write-Host "Installing required dependencies..." -ForegroundColor Yellow
    npm install dotenv @supabase/supabase-js
}

# Run the import
Write-Host "Running broker import script..." -ForegroundColor Green
node scripts/import-brokers.js

Write-Host "`nImport process completed. Check the output above for results." -ForegroundColor Cyan 