@echo off
setlocal EnableExtensions

cd /d "%~dp0\.."

if "%PORT%"=="" set "PORT=8080"
set "MODE=php"

:parse_args
if "%~1"=="" goto run
if /I "%~1"=="--go" set "MODE=go" & shift & goto parse_args
if /I "%~1"=="--binary" set "MODE=go" & shift & goto parse_args
if /I "%~1"=="-h" goto usage
if /I "%~1"=="--help" goto usage
echo Unknown option: %~1
goto usage

:usage
echo Usage: scripts\start.bat [--go]
echo.
echo   --go, --binary   Run the Go standalone server
echo.
echo Environment: PORT (default 8080)
exit /b 1

:run
if /I "%MODE%"=="php" goto start_php
goto start_go

:start_php
where php >nul 2>&1
if errorlevel 1 (
  echo Error: PHP is not installed. Use scripts\start.bat --go instead.
  exit /b 1
)
echo Starting PHP dev server at http://localhost:%PORT%
echo Press Ctrl+C to stop.
php -S localhost:%PORT% -t "%CD%"
exit /b %ERRORLEVEL%

:start_go
if exist "dist\o-i-creator-windows-amd64.exe" (
  echo Starting Go binary at http://127.0.0.1:%PORT%
  echo Press Ctrl+C to stop.
  set "PORT=%PORT%"
  "dist\o-i-creator-windows-amd64.exe"
  exit /b %ERRORLEVEL%
)

where go >nul 2>&1
if errorlevel 1 (
  echo Error: Go is not installed and dist\o-i-creator-windows-amd64.exe was not found.
  echo Build one with: scripts\build-all.bat
  exit /b 1
)

if not exist "static\index.html" (
  echo Generating static export...
  where php >nul 2>&1
  if errorlevel 1 (
    echo Error: PHP CLI is required to run make static.
    exit /b 1
  )
  make static
  if errorlevel 1 exit /b %ERRORLEVEL%
)

echo Starting Go server at http://127.0.0.1:%PORT%
echo Press Ctrl+C to stop.
set "PORT=%PORT%"
go run .
exit /b %ERRORLEVEL%
