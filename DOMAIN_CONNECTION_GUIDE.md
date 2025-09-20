# 🌐 دليل ربط الدومين globul.net بالمشروع الجديد

## 📋 الخطوات المطلوبة:

### 1. اذهب إلى Firebase Console
**الرابط:** https://console.firebase.google.com/project/studio-448742006-a3493/hosting

### 2. إضافة الدومين المخصص
- اضغط على **"Add custom domain"**
- أدخل: `globul.net`
- اختر الموقع: **globul-cars-prod** (الإنتاج)
- اضغط **"Continue"**

### 3. انسخ سجلات DNS
ستظهر لك سجلات DNS مثل:
```
Type: A
Name: @
Value: [عنوان IP من Firebase]

Type: CNAME
Name: www
Value: globul-cars-prod.web.app
```

### 4. أضف السجلات في لوحة تحكم الدومين
- اذهب إلى مزود الدومين الخاص بك
- احذف السجلات القديمة
- أضف السجلات الجديدة من Firebase
- انتظر 24-48 ساعة لانتشار DNS

## 🔍 التحقق من الربط
بعد إضافة السجلات، يمكنك التحقق من:
- https://dnschecker.org - أدخل globul.net
- Firebase Console - ستظهر حالة التحقق

## 📞 المساعدة
إذا واجهت مشاكل:
1. تأكد من نسخ السجلات الصحيحة
2. تحقق من عدم وجود سجلات قديمة
3. انتظر وقت كافي لانتشار DNS

---
**تاريخ الإنشاء:** 20 سبتمبر 2025