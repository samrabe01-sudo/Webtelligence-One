# Webtelligence Quick Start Script (Windows PowerShell)
# Run this to start both frontend and backend

Write-Host "🚀 Webtelligence Quick Start" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js detected: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if MongoDB is running
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if (-not $mongoProcess) {
    Write-Host "⚠️  MongoDB is not running. Please start MongoDB first." -ForegroundColor Yellow
    Write-Host "   Run: mongod --dbpath C:\data\db" -ForegroundColor Gray
    # Uncomment to auto-start (adjust path):
    # Start-Process mongod -ArgumentList "--dbpath C:\data\db" -WindowStyle Hidden
}

Write-Host ""
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location server

if (-not (Test-Path "node_modules")) {
    npm install
}

Write-Host ""
Write-Host "🔧 Starting backend server..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run dev
}

Write-Host "⏳ Waiting for backend to start..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "🌐 Starting frontend server..." -ForegroundColor Yellow
Set-Location ..\client

# Try to use npx serve or Python
$frontendJob = $null
if (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "Using npx serve..." -ForegroundColor Gray
    $frontendJob = Start-Job -ScriptBlock {
        Set-Location $using:PWD
        npx serve -p 8080
    }
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Using Python HTTP server..." -ForegroundColor Gray
    $frontendJob = Start-Job -ScriptBlock {
        Set-Location $using:PWD
        python -m http.server 8080
    }
} else {
    Write-Host "❌ No suitable HTTP server found. Install Node.js serve or Python." -ForegroundColor Red
    Stop-Job $backendJob
    Remove-Job $backendJob
    exit 1
}

Write-Host ""
Write-Host "✅ Servers are running!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Backend:  http://localhost:4000" -ForegroundColor Cyan
Write-Host "📍 Frontend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "📍 Admin:    http://localhost:4000/admin" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers..." -ForegroundColor Yellow
Write-Host ""

# Show job output
try {
    while ($true) {
        Receive-Job $backendJob
        Receive-Job $frontendJob
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host ""
    Write-Host "🛑 Stopping servers..." -ForegroundColor Red
    Stop-Job $backendJob, $frontendJob
    Remove-Job $backendJob, $frontendJob
    Write-Host "✅ Servers stopped." -ForegroundColor Green
}
