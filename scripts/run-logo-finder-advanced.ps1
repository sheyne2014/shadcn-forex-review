# PowerShell script to run the advanced broker logo finder

# Load environment variables from .env file
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match "^\s*([^#][^=]+)=(.*)$") {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value)
        }
    }
}

# Check if Supabase environment variables are set
if (-not $env:NEXT_PUBLIC_SUPABASE_URL -or -not $env:NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    Write-Error "Supabase environment variables are not set. Please check your .env file."
    exit 1
}

# Run the advanced logo finder script
Write-Host "Starting advanced broker logo finder..."
node scripts/find-broker-logos-advanced.js

# Check if the script ran successfully
if ($LASTEXITCODE -eq 0) {
    Write-Host "Advanced broker logo finder completed successfully."
} else {
    Write-Error "Advanced broker logo finder failed with exit code $LASTEXITCODE."
}
