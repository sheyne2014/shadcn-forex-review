# Run script to import 100 more brokers
Write-Host "Starting import of 100 more brokers script..." -ForegroundColor Green

# Navigate to project root directory (if not already there)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Split-Path -Parent $scriptDir)

# Run the import script
node scripts/import-100-more-brokers.js

Write-Host "100 more brokers import script complete!" -ForegroundColor Green 