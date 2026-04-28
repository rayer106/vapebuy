@echo off
echo ========================================
echo   Vape Store - 自动化测试脚本
echo ========================================
echo.

REM 检查开发服务器是否运行
echo [1/6] 检查开发服务器状态...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 开发服务器未运行，请先执行: npm run dev
    exit /b 1
)
echo ✅ 开发服务器正常运行

echo.
echo [2/6] 测试首页...
curl -s http://localhost:3000/en | findstr "Best Vape Store" >nul
if %errorlevel% equ 0 (
    echo ✅ 首页加载成功
) else (
    echo ❌ 首页加载失败
)

echo.
echo [3/6] 测试产品列表页...
curl -s http://localhost:3000/en/products | findstr "Products" >nul
if %errorlevel% equ 0 (
    echo ✅ 产品列表页加载成功
) else (
    echo ❌ 产品列表页加载失败
)

echo.
echo [4/6] 测试产品详情页...
curl -s http://localhost:3000/en/products/fumot-12k | findstr "Vape ABC 12K" >nul
if %errorlevel% equ 0 (
    echo ✅ 产品详情页加载成功
) else (
    echo ❌ 产品详情页加载失败
)

echo.
echo [5/6] 测试 Sitemap...
curl -s http://localhost:3000/sitemap.xml | findstr "urlset" >nul
if %errorlevel% equ 0 (
    echo ✅ Sitemap 可访问
) else (
    echo ❌ Sitemap 访问失败
)

echo.
echo [6/6] 测试 Robots.txt...
curl -s http://localhost:3000/robots.txt | findstr "User-agent" >nul
if %errorlevel% equ 0 (
    echo ✅ Robots.txt 可访问
) else (
    echo ❌ Robots.txt 访问失败
)

echo.
echo ========================================
echo   测试完成！
echo ========================================
