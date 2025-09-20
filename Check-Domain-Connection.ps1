# PowerShell Script للتحقق من ربط الدومين
# استخدم هذا السكريبت بعد إضافة سجلات DNS

Write-Host "🔍 التحقق من ربط الدومين globul.net..." -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Yellow

# التحقق من DNS
Write-Host "`n📡 التحقق من سجلات DNS:" -ForegroundColor Green
try {
    $dnsResult = Resolve-DnsName globul.net -Type A
    Write-Host "✅ سجل A موجود:" -ForegroundColor Green
    $dnsResult | Format-Table -AutoSize
} catch {
    Write-Host "❌ خطأ في سجل A: $($_.Exception.Message)" -ForegroundColor Red
}

try {
    $cnameResult = Resolve-DnsName www.globul.net -Type CNAME
    Write-Host "✅ سجل CNAME موجود:" -ForegroundColor Green
    $cnameResult | Format-Table -AutoSize
} catch {
    Write-Host "❌ خطأ في سجل CNAME: $($_.Exception.Message)" -ForegroundColor Red
}

# التحقق من الاتصال بالموقع
Write-Host "`n🌐 التحقق من الاتصال بالموقع:" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "https://globul.net" -TimeoutSec 10
    Write-Host "✅ الموقع متاح - Status Code: $($response.StatusCode)" -ForegroundColor Green

    # التحقق من محتوى الموقع
    if ($response.Content -match "Bulgarian Car Marketplace") {
        Write-Host "✅ المحتوى صحيح - Bulgarian Car Marketplace" -ForegroundColor Green
    } else {
        Write-Host "⚠️ المحتوى قد يكون مختلفاً" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ خطأ في الاتصال: $($_.Exception.Message)" -ForegroundColor Red
}

# معلومات إضافية
Write-Host "`n📋 معلومات مهمة:" -ForegroundColor Cyan
Write-Host "- إذا لم يظهر المشروع الجديد، انتظر 24-48 ساعة" -ForegroundColor White
Write-Host "- تأكد من حذف السجلات القديمة من DNS" -ForegroundColor White
Write-Host "- تحقق من Firebase Console لحالة التحقق" -ForegroundColor White

Write-Host "`n🔗 روابط مفيدة:" -ForegroundColor Cyan
Write-Host "- Firebase Console: https://console.firebase.google.com/project/studio-448742006-a3493/hosting" -ForegroundColor White
Write-Host "- DNS Checker: https://dnschecker.org" -ForegroundColor White
Write-Host "- المشروع الجديد: https://globul-cars-prod.web.app" -ForegroundColor White

Write-Host "`n✅ انتهى التحقق!" -ForegroundColor Green