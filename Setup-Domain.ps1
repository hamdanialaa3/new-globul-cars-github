# سكريبت ربط الدومين globul.net مع مشروع Bulgarian Car Marketplace
# Setup-Domain.ps1

Write-Host "🚀 بدء عملية ربط الدومين globul.net..." -ForegroundColor Green

# التحقق من Firebase CLI
try {
    $firebaseVersion = firebase --version
    Write-Host "✅ Firebase CLI مثبت: $firebaseVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Firebase CLI غير مثبت. يرجى تثبيته أولاً." -ForegroundColor Red
    exit 1
}

# التحقق من تسجيل الدخول
Write-Host "`n📝 التحقق من تسجيل الدخول Firebase..." -ForegroundColor Yellow
firebase login:list

# عرض المشاريع المتاحة
Write-Host "`n📋 عرض المشاريع المتاحة..." -ForegroundColor Yellow
firebase projects:list

# التحقق من الموقع الحالي
Write-Host "`n🌐 التحقق من المواقع المنشورة..." -ForegroundColor Yellow
firebase hosting:sites:list

# تعليمات ربط الدومين
Write-Host "`n📖 لربط الدومين المخصص، اتبع الخطوات التالية:" -ForegroundColor Cyan
Write-Host "1. اذهب إلى Firebase Console:" -ForegroundColor White
Write-Host "   https://console.firebase.google.com/project/studio-448742006-a3493/hosting" -ForegroundColor Blue

Write-Host "`n2. اضغط على 'Add custom domain'" -ForegroundColor White

Write-Host "`n3. أدخل الدومين: globul.net" -ForegroundColor White

Write-Host "`n4. اختر الموقع: globul-cars-prod" -ForegroundColor White

Write-Host "`n5. انسخ سجلات DNS وأضفها في إعدادات الدومين" -ForegroundColor White

Write-Host "`n6. انتظر التحقق من الدومين (قد يستغرق 24-48 ساعة)" -ForegroundColor White

Write-Host "`n🔗 رابط الموقع الحالي: https://globul-cars-prod.web.app" -ForegroundColor Green
Write-Host "🎯 الدومين المطلوب: https://globul.net" -ForegroundColor Green

Write-Host "`n✅ انتهت العملية! تحقق من Firebase Console لإكمال ربط الدومين." -ForegroundColor Green

# فتح Firebase Console في المتصفح
$response = Read-Host "`nهل تريد فتح Firebase Console الآن؟ (y/n)"
if ($response -eq "y" -or $response -eq "Y") {
    Start-Process "https://console.firebase.google.com/project/studio-448742006-a3493/hosting"
    Write-Host "✅ تم فتح Firebase Console في المتصفح." -ForegroundColor Green
}