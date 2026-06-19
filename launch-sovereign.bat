@echo off
cd /d E:\Coding\sovereign-os-v4
start /b bunx next dev
timeout /t 3 /nobreak >nul
start http://localhost:3000
exit