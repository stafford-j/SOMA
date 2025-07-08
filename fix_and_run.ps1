Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Autonomi MVP - Fix Database Lock and Run" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Checking for any running Autonomi processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*colony*" -or $_.ProcessName -like "*autonomi*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Host "Process cleanup completed." -ForegroundColor Green

Write-Host ""
Write-Host "Step 2: Attempting to clear database lock file..." -ForegroundColor Yellow
$lockFile = "$env:APPDATA\colony\graph.db\LOCK"
if (Test-Path $lockFile) {
    Write-Host "Found LOCK file, attempting to remove..." -ForegroundColor Yellow
    try {
        Remove-Item $lockFile -Force
        Write-Host "✅ LOCK file successfully removed" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  LOCK file still exists - it may be in use by another process" -ForegroundColor Red
        Write-Host "   This is normal if the app is currently running" -ForegroundColor Red
    }
} else {
    Write-Host "✅ No LOCK file found - database is available" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 3: Starting Autonomi MVP with Alphanet (testnet)..." -ForegroundColor Yellow
Write-Host ""
Write-Host "🔧 Network Configuration:" -ForegroundColor Cyan
Write-Host "   - Switched from mainnet to Alphanet (testnet)" -ForegroundColor White
Write-Host "   - Better stability and connectivity" -ForegroundColor White
Write-Host "   - Same functionality, just testing network" -ForegroundColor White
Write-Host ""

npm run tauri dev

Write-Host ""
Write-Host "Application closed." -ForegroundColor Yellow
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")