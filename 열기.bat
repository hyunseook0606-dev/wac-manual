@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  WAC 전자 메뉴얼 실행 중...
echo  주소가 터미널에 표시됩니다. (보통 http://127.0.0.1:5175/)
echo.
npm run dev -- --host 127.0.0.1 --port 5175
