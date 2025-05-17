# PowerShell script to run the broker import

Write-Host "Starting broker import process..." -ForegroundColor Cyan

# Check if dependencies are installed
if (!(Test-Path node_modules/@modelcontextprotocol/sdk) -or !(Test-Path node_modules/@smithery/sdk)) {
    Write-Host "Installing required dependencies..." -ForegroundColor Yellow
    npm install @modelcontextprotocol/sdk @smithery/sdk
}

# Run the import
Write-Host "Running broker import script..." -ForegroundColor Green
npx ts-node -r tsconfig-paths/register scripts/import-brokers.ts

Write-Host "`nImport process completed. Check the output above for results." -ForegroundColor Cyan 