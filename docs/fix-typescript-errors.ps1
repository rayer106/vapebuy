# ========================================
#   Vape Store - TypeScript 错误修复脚本
# ========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TypeScript 错误修复工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查 .next 目录是否存在
if (Test-Path ".next") {
    Write-Host "[1/3] 清理 .next 缓存目录..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ .next 目录已删除" -ForegroundColor Green
} else {
    Write-Host "[1/3] .next 目录不存在，跳过" -ForegroundColor Gray
}

Write-Host ""

# 2. 提示用户重启 TypeScript 服务器
Write-Host "[2/3] 请在 VSCode 中执行以下操作：" -ForegroundColor Yellow
Write-Host "   1. 按 Ctrl + Shift + P" -ForegroundColor White
Write-Host "   2. 输入: TypeScript: Restart TS Server" -ForegroundColor White
Write-Host "   3. 按 Enter 确认" -ForegroundColor White
Write-Host ""
Write-Host "   或者使用快捷键重新加载窗口：" -ForegroundColor White
Write-Host "   Ctrl + Shift + P -> Developer: Reload Window" -ForegroundColor White

Write-Host ""

# 3. 验证文件完整性
Write-Host "[3/3] 验证类型文件完整性..." -ForegroundColor Yellow

$files = @(
    "src\types\index.ts",
    "src\types\product.ts",
    "src\types\navigation.ts",
    "src\types\form.ts",
    "src\types\common.ts",
    "src\types\layout.ts",
    "src\types\route.ts"
)

$allExist = $true
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file (缺失)" -ForegroundColor Red
        $allExist = $false
    }
}

Write-Host ""

if ($allExist) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  所有类型文件都存在！" -ForegroundColor Green
    Write-Host "  请重启 TypeScript 服务器以消除错误提示" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  部分文件缺失，请检查文件恢复情况" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
}

Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
