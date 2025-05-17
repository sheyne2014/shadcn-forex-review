# PowerShell script for setting up database seeding dependencies

Write-Host "Installing dependencies for database seeding..." -ForegroundColor Green

# Install required packages
npm install -D typescript ts-node tsconfig-paths
npm install @modelcontextprotocol/sdk @smithery/sdk

# Check if .env.local exists and contains required variables
if (Test-Path ".env.local") {
    Write-Host "Checking .env.local for required variables..." -ForegroundColor Blue
    
    $envContent = Get-Content ".env.local" -Raw
    
    # Check for Supabase variables
    if (-not ($envContent -match "NEXT_PUBLIC_SUPABASE_URL") -or -not ($envContent -match "NEXT_PUBLIC_SUPABASE_ANON_KEY")) {
        Write-Host "⚠️  Warning: Supabase environment variables missing in .env.local" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Supabase environment variables found" -ForegroundColor Green
    }
    
    # Check for MCP API key
    if (-not ($envContent -match "MCP_API_KEY")) {
        Write-Host "⚠️  Warning: MCP_API_KEY missing in .env.local" -ForegroundColor Yellow
    } else {
        Write-Host "✅ MCP API key found" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  Warning: .env.local file not found. Create this file with required environment variables." -ForegroundColor Yellow
}

# Verify that MCP is properly configured
if (Test-Path "mcp.json") {
    Write-Host "✅ MCP configuration found in mcp.json" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: mcp.json not found. Running MCP tools may fail." -ForegroundColor Yellow
}

Write-Host "`nSetup complete! Now you can run the seed script with:" -ForegroundColor Green
Write-Host "npx ts-node -r tsconfig-paths/register scripts/seed.ts" -ForegroundColor Cyan 