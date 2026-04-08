@echo off
setlocal
cd /d "%~dp0\.."

where go >nul 2>nul
if errorlevel 1 (
  echo Install Go from https://go.dev/dl/ and ensure go is on PATH.
  exit /b 1
)
where php >nul 2>nul
if errorlevel 1 (
  echo Install PHP CLI and ensure php is on PATH.
  exit /b 1
)

if not exist "static\assets" mkdir static\assets
xcopy /E /I /Y assets\* static\assets\ >nul
php scripts\export-static.php
if errorlevel 1 exit /b 1

if not exist dist mkdir dist

set CGO_ENABLED=0
set GOOS=linux
set GOARCH=amd64
go build -trimpath -ldflags="-s -w" -o dist\o-i-creator-linux-amd64 .
if errorlevel 1 exit /b 1

set GOOS=windows
set GOARCH=amd64
go build -trimpath -ldflags="-s -w" -o dist\o-i-creator-windows-amd64.exe .
if errorlevel 1 exit /b 1

echo.
echo Built: dist\o-i-creator-linux-amd64
echo Built: dist\o-i-creator-windows-amd64.exe
