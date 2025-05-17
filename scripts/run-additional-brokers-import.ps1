# Run script to import additional top brokers
Write-Host "Starting additional brokers import script..." -ForegroundColor Green

# Navigate to project root directory (if not already there)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Split-Path -Parent $scriptDir)

# Run the import script
node scripts/import-additional-brokers.js

Write-Host "Additional brokers import script complete!" -ForegroundColor Green 