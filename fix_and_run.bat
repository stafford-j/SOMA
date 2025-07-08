@echo off
echo.
echo ========================================
echo  Autonomi MVP - Fix Database Lock and Run
echo ========================================
echo.

echo Step 1: Checking for any running Autonomi processes...
taskkill /f /im "colony-app.exe" 2>nul
taskkill /f /im "autonomi-mvp.exe" 2>nul
echo Process cleanup completed.

echo.
echo Step 2: Attempting to clear database lock file...
if exist "%APPDATA%\colony\graph.db\LOCK" (
    echo Found LOCK file, attempting to remove...
    del "%APPDATA%\colony\graph.db\LOCK" 2>nul
    if %errorlevel% equ 0 (
        echo ✅ LOCK file successfully removed
    ) else (
        echo ⚠️  LOCK file still exists - it may be in use by another process
        echo    This is normal if the app is currently running
    )
) else (
    echo ✅ No LOCK file found - database is available
)

echo.
echo Step 3: Starting Autonomi MVP with Alphanet (testnet)...
echo.
echo 🔧 Network Configuration:
echo    - Switched from mainnet to Alphanet (testnet)
echo    - Better stability and connectivity
echo    - Same functionality, just testing network
echo.

npm run tauri dev

echo.
echo Application closed.
pause