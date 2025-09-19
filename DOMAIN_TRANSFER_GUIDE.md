# ربط النطاق globul.net بالمشروع الجديد

## المشكلة المكتشفة:
النطاق globul.net مرتبط حالياً بالمشروع السابق "globul-auto" وليس بالمشروع الجديد "studio-448742006-a3493".

## الحلول المتاحة:

### الخيار 1: نقل النطاق إلى المشروع الجديد (الأفضل)
```bash
# في Firebase Console:
1. اذهب إلى https://console.firebase.google.com/
2. اختر المشروع globul-auto
3. اذهب إلى Hosting → Custom domains
4. احذف النطاق globul.net من هناك
5. اذهب إلى المشروع studio-448742006-a3493
6. أضف النطاق globul.net هناك
```

### الخيار 2: استخدام الموقع الجديد المؤقت
يمكنك استخدام الرابط المؤقت حتى تنقل النطاق:
**https://globul-net-ee5ea.web.app**

### الخيار 3: إعادة توجيه DNS
إذا كنت تريد تغيير DNS، إليك السجلات المطلوبة للمشروع الجديد:

```
النوع: CNAME
الاسم: @
القيمة: studio-448742006-a3493.web.app
```

## الخطوات المطلوبة:

1. **احذف النطاق من المشروع السابق:**
   - اذهب إلى Firebase Console
   - اختر مشروع "globul-auto"
   - Hosting → Custom domains → globul.net → Delete

2. **أضف النطاق للمشروع الجديد:**
   - اختر مشروع "studio-448742006-a3493"
   - Hosting → Custom domains → Add custom domain
   - أدخل: globul.net

3. **انتظر انتشار DNS:**
   - قد يستغرق الأمر 24-48 ساعة
   - يمكنك تتبع الحالة في Firebase Console

## الروابط المفيدة:
- **المشروع الجديد:** https://console.firebase.google.com/project/studio-448742006-a3493/hosting
- **المشروع السابق:** https://console.firebase.google.com/project/globul-auto/hosting
- **الموقع المؤقت:** https://globul-net-ee5ea.web.app