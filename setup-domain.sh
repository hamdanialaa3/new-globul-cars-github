#!/bin/bash

# سكريبت ربط الدومين globul.net مع مشروع Bulgarian Car Marketplace
# يجب تشغيل هذا السكريبت بعد إعداد DNS

echo "🚀 بدء عملية ربط الدومين globul.net..."

# التحقق من تسجيل الدخول
echo "📝 التحقق من تسجيل الدخول Firebase..."
firebase login:list

# عرض المشاريع المتاحة
echo "📋 عرض المشاريع المتاحة..."
firebase projects:list

# التحقق من الموقع الحالي
echo "🌐 التحقق من المواقع المنشورة..."
firebase hosting:sites:list

# تعليمات ربط الدومين
echo ""
echo "📖 لربط الدومين المخصص، اتبع الخطوات التالية:"
echo "1. اذهب إلى Firebase Console:"
echo "   https://console.firebase.google.com/project/studio-448742006-a3493/hosting"
echo ""
echo "2. اضغط على 'Add custom domain'"
echo ""
echo "3. أدخل الدومين: globul.net"
echo ""
echo "4. اختر الموقع: globul-cars-prod"
echo ""
echo "5. انسخ سجلات DNS وأضفها في إعدادات الدومين"
echo ""
echo "6. انتظر التحقق من الدومين (قد يستغرق 24-48 ساعة)"
echo ""
echo "🔗 رابط الموقع الحالي: https://globul-cars-prod.web.app"
echo "🎯 الدومين المطلوب: https://globul.net"
echo ""
echo "✅ انتهت العملية! تحقق من Firebase Console لإكمال ربط الدومين."