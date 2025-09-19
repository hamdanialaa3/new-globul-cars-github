# إعداد النطاقات المخصصة للمشروع الجديد

## المشكلة الحالية:
- النطاق `www.globul.net` يشير إلى Firebase لكنه غير مرتبط بأي موقع محدد
- النطاق `globul.net` مرتبط بالمشروع السابق

## الحل: ربط النطاقات عبر Firebase Console

### الخطوة 1: حذف النطاقات من المشروع السابق
1. اذهب إلى: https://console.firebase.google.com/project/globul-auto/hosting
2. اضغط على **Custom domains**
3. احذف النطاق `globul.net` إذا كان موجوداً

### الخطوة 2: إضافة النطاقات للمشروع الجديد
1. اذهب إلى: https://console.firebase.google.com/project/studio-448742006-a3493/hosting
2. اضغط على **Add custom domain**
3. أدخل النطاق: `globul.net`
4. اختر الموقع: `globul-net-ee5ea` (أو أي موقع تفضله)
5. اضغط **Continue**

### الخطوة 3: إضافة النطاق الفرعي www
1. في نفس الصفحة، اضغط **Add another domain**
2. أدخل النطاق: `www.globul.net`
3. اختر نفس الموقع: `globul-net-ee5ea`
4. اضغط **Continue**

### الخطوة 4: تحديث سجلات DNS
بعد إضافة النطاقات، ستحصل على سجلات DNS تحتاج إلى إضافتها:

#### للنطاق globul.net:
```
النوع: CNAME
الاسم: @
القيمة: globul-net-ee5ea.web.app
```

#### للنطاق www.globul.net:
```
النوع: CNAME
الاسم: www
القيمة: globul-net-ee5ea.web.app
```

### الخطوة 5: انتظار التحقق
- انتظر 24-48 ساعة لانتشار DNS
- يمكنك تتبع حالة التحقق في Firebase Console

## البدائل المتاحة:

### البديل 1: استخدام الموقع الرئيسي
يمكنك ربط النطاقات بالموقع الرئيسي بدلاً من globul-net-ee5ea:
- الموقع: `studio-448742006-a3493`
- الرابط: https://studio-448742006-a3493.web.app

### البديل 2: إعادة توجيه www إلى النطاق الرئيسي
إذا كان globul.net يعمل، يمكنك إعداد إعادة توجيه من www.globul.net إلى globul.net

## الروابط المفيدة:
- **Firebase Console (المشروع الجديد):** https://console.firebase.google.com/project/studio-448742006-a3493/hosting
- **Firebase Console (المشروع القديم):** https://console.firebase.google.com/project/globul-auto/hosting
- **الموقع المؤقت:** https://globul-net-ee5ea.web.app

## نصائح:
- تأكد من أن DNS معد بشكل صحيح قبل البدء
- احتفظ بنسخة من سجلات DNS الحالية قبل التغيير
- يمكنك التحقق من حالة DNS باستخدام أدوات مثل: https://dnschecker.org