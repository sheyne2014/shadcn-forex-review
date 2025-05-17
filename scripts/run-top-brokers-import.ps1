# PowerShell script to run the top 100 brokers import

Write-Host "Starting top 100 brokers import process..." -ForegroundColor Cyan

# Check if dependencies are installed
if (!(Test-Path node_modules/@modelcontextprotocol/sdk) -or !(Test-Path node_modules/@supabase/supabase-js)) {
    Write-Host "Installing required dependencies..." -ForegroundColor Yellow
    npm install @modelcontextprotocol/sdk @supabase/supabase-js dotenv
}

# Run the import
Write-Host "Running top brokers import script..." -ForegroundColor Green
node scripts/import-top-brokers.js

Write-Host "`nImport process completed. Check the output above for results." -ForegroundColor Cyan 