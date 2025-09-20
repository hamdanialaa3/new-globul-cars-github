# PowerShell Script لتشخيص وحل مشاكل الخادم
# Server Diagnostics and Fix Script

Write-Host "🔧 تشخيص وحل مشاكل الخادم - Bulgarian Car Marketplace" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Yellow

# متغيرات
$projectPath = "c:\Users\hamda\Desktop\New Globul Cars\bulgarian-car-marketplace"
$buildPath = "$projectPath\build"
$port3000 = 3000
$port3001 = 3001

# دالة للتحقق من العمليات الجارية
function Check-RunningProcesses {
    Write-Host "`n🔍 التحقق من العمليات الجارية:" -ForegroundColor Green

    # البحث عن عمليات Node.js
    $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
    if ($nodeProcesses) {
        Write-Host "✅ عمليات Node.js الجارية:" -ForegroundColor Green
        $nodeProcesses | Format-Table -Property Id, ProcessName, StartTime, CPU
    } else {
        Write-Host "❌ لا توجد عمليات Node.js جارية" -ForegroundColor Red
    }

    # البحث عن عمليات Python
    $pythonProcesses = Get-Process -Name "python" -ErrorAction SilentlyContinue
    if ($pythonProcesses) {
        Write-Host "✅ عمليات Python الجارية:" -ForegroundColor Green
        $pythonProcesses | Format-Table -Property Id, ProcessName, StartTime, CPU
    } else {
        Write-Host "❌ لا توجد عمليات Python جارية" -ForegroundColor Red
    }
}

# دالة للتحقق من المنافذ
function Check-Ports {
    Write-Host "`n🌐 التحقق من المنافذ:" -ForegroundColor Green

    # التحقق من المنفذ 3000
    $port3000Status = Test-NetConnection -ComputerName localhost -Port $port3000 -WarningAction SilentlyContinue
    if ($port3000Status.TcpTestSucceeded) {
        Write-Host "✅ المنفذ 3000 مفتوح (React Dev Server)" -ForegroundColor Green
    } else {
        Write-Host "❌ المنفذ 3000 مغلق" -ForegroundColor Red
    }

    # التحقق من المنفذ 3001
    $port3001Status = Test-NetConnection -ComputerName localhost -Port $port3001 -WarningAction SilentlyContinue
    if ($port3001Status.TcpTestSucceeded) {
        Write-Host "✅ المنفذ 3001 مفتوح (Python HTTP Server)" -ForegroundColor Green
    } else {
        Write-Host "❌ المنفذ 3001 مغلق" -ForegroundColor Red
    }
}

# دالة للتحقق من الملفات
function Check-Files {
    Write-Host "`n📁 التحقق من الملفات:" -ForegroundColor Green

    if (Test-Path $projectPath) {
        Write-Host "✅ مجلد المشروع موجود: $projectPath" -ForegroundColor Green
    } else {
        Write-Host "❌ مجلد المشروع غير موجود: $projectPath" -ForegroundColor Red
        return
    }

    if (Test-Path "$projectPath\package.json") {
        Write-Host "✅ ملف package.json موجود" -ForegroundColor Green
    } else {
        Write-Host "❌ ملف package.json غير موجود" -ForegroundColor Red
    }

    if (Test-Path "$projectPath\src\App.tsx") {
        Write-Host "✅ ملف App.tsx موجود" -ForegroundColor Green
    } else {
        Write-Host "❌ ملف App.tsx غير موجود" -ForegroundColor Red
    }

    if (Test-Path $buildPath) {
        Write-Host "✅ مجلد البناء موجود: $buildPath" -ForegroundColor Green
    } else {
        Write-Host "❌ مجلد البناء غير موجود: $buildPath" -ForegroundColor Red
    }
}

# دالة لتشغيل الخادم
function Start-Server {
    Write-Host "`n🚀 بدء تشغيل الخادم:" -ForegroundColor Green

    # إيقاف العمليات السابقة
    Write-Host "إيقاف العمليات السابقة..." -ForegroundColor Yellow
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Get-Process -Name "python" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

    # بناء المشروع
    Write-Host "بناء المشروع..." -ForegroundColor Yellow
    Set-Location $projectPath
    & npm run build

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ البناء نجح" -ForegroundColor Green

        # تشغيل خادم Python
        Write-Host "تشغيل خادم Python على المنفذ 3001..." -ForegroundColor Yellow
        Start-Process -FilePath "python" -ArgumentList "-m http.server $port3001" -WorkingDirectory $buildPath -NoNewWindow

        # انتظار قليل
        Start-Sleep -Seconds 2

        # التحقق من الخادم
        $serverStatus = Test-NetConnection -ComputerName localhost -Port $port3001 -WarningAction SilentlyContinue
        if ($serverStatus.TcpTestSucceeded) {
            Write-Host "✅ الخادم يعمل بنجاح على: http://localhost:$port3001" -ForegroundColor Green
            Start-Process "http://localhost:$port3001"
        } else {
            Write-Host "❌ فشل في تشغيل الخادم" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ فشل في البناء" -ForegroundColor Red
    }
}

# دالة لإعادة التشغيل الكامل
function Restart-All {
    Write-Host "`n🔄 إعادة التشغيل الكامل:" -ForegroundColor Green

    # إيقاف جميع العمليات
    Write-Host "إيقاف جميع العمليات..." -ForegroundColor Yellow
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Get-Process -Name "python" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

    # تنظيف
    Write-Host "تنظيف الملفات المؤقتة..." -ForegroundColor Yellow
    if (Test-Path "$projectPath\node_modules\.cache") {
        Remove-Item "$projectPath\node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue
    }

    # إعادة التثبيت
    Write-Host "إعادة تثبيت التبعيات..." -ForegroundColor Yellow
    Set-Location $projectPath
    & npm install

    # إعادة البناء والتشغيل
    Start-Server
}

# القائمة الرئيسية
function Show-Menu {
    Write-Host "`n📋 القائمة الرئيسية:" -ForegroundColor Cyan
    Write-Host "1. تشخيص المشاكل" -ForegroundColor White
    Write-Host "2. التحقق من المنافذ" -ForegroundColor White
    Write-Host "3. التحقق من الملفات" -ForegroundColor White
    Write-Host "4. تشغيل الخادم" -ForegroundColor White
    Write-Host "5. إعادة التشغيل الكامل" -ForegroundColor White
    Write-Host "6. فتح الموقع في المتصفح" -ForegroundColor White
    Write-Host "0. خروج" -ForegroundColor White
    Write-Host ""

    $choice = Read-Host "اختر الخيار (0-6)"

    switch ($choice) {
        "1" { Check-RunningProcesses; Check-Ports; Check-Files }
        "2" { Check-Ports }
        "3" { Check-Files }
        "4" { Start-Server }
        "5" { Restart-All }
        "6" {
            $url = Read-Host "أدخل الرابط (مثال: http://localhost:3001)"
            if ($url) {
                Start-Process $url
            }
        }
        "0" { return }
        default { Write-Host "❌ خيار غير صحيح" -ForegroundColor Red }
    }

    if ($choice -ne "0") {
        Show-Menu
    }
}

# بدء التشخيص
Check-RunningProcesses
Check-Ports
Check-Files

# عرض القائمة
Show-Menu

Write-Host "`n✅ انتهى التشخيص!" -ForegroundColor Green