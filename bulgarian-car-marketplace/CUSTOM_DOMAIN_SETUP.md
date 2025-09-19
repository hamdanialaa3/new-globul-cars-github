# دليل إعداد النطاق المخصص - Custom Domain Setup Guide

## إعداد نطاق مخصص لسوق السيارات البلغاري

### الخطوة 1: التحقق من ملكية النطاق
قبل البدء، تأكد من أن لديك:
- ✅ نطاق مسجل (مثل: globulcars.bg)
- ✅ إمكانية الوصول إلى إعدادات DNS للنطاق
- ✅ النطاق غير مستخدم في خدمة استضافة أخرى

### الخطوة 2: الدخول إلى Firebase Console

1. **افتح Firebase Console**:
   ```
   https://console.firebase.google.com
   ```

2. **اختر المشروع**:
   - اختر مشروع "New Globul Cars FG"
   - أو المشروع بالمعرف: `studio-448742006-a3493`

3. **انتقل إلى Hosting**:
   - في القائمة الجانبية، انقر على "Hosting"
   - ستجد قسم "Custom domains"

### الخطوة 3: إضافة النطاق المخصص

1. **انقر على "Add custom domain"**
2. **أدخل اسم النطاق**:
   ```
   globulcars.bg
   ```
   أو أي نطاق آخر تفضله

3. **اختر نوع الإعداد**:
   - إذا كان النطاق جديد: اختر "Add domain"
   - إذا كان النطاق موجود: اختر "Migrate domain"

### الخطوة 4: إعداد سجلات DNS

بعد إضافة النطاق، ستحصل على تعليمات لإعداد سجلات DNS. إليك الأنواع الشائعة:

#### لنطاق رئيسي (مثل: globulcars.bg)

**أضف سجل A:**
```
Type: A
Name: @
Value: 199.36.158.100
```

**أضف سجل TXT للتحقق:**
```
Type: TXT
Name: @
Value: firebase=studio-448742006-a3493
```

#### لنطاق فرعي (مثل: www.globulcars.bg)

**أضف سجل CNAME:**
```
Type: CNAME
Name: www
Value: studio-448742006-a3493.web.app
```

### الخطوة 5: التحقق من الإعداد

1. **انتظر انتشار DNS**:
   - قد يستغرق 24-48 ساعة
   - يمكنك تتبع حالة النطاق في Firebase Console

2. **تحقق من الشهادة SSL**:
   - Firebase يوفر شهادة SSL مجانية تلقائياً
   - ستكون جاهزة عند اكتمال إعداد DNS

### الخطوة 6: إعادة توجيه النطاق

#### إعداد إعادة التوجيه من www إلى النطاق الرئيسي:

في إعدادات DNS، أضف:
```
Type: CNAME
Name: www
Value: globulcars.bg
```

### خطوات استكشاف الأخطاء

#### إذا لم يعمل النطاق:

1. **تحقق من سجلات DNS**:
   ```bash
   nslookup globulcars.bg
   ```

2. **تحقق من حالة النطاق في Firebase**:
   - Firebase Console → Hosting → Custom domains

3. **مسح DNS Cache**:
   ```bash
   ipconfig /flushdns  # Windows
   ```

#### رسائل خطأ شائعة:

- **"Domain not verified"**: تحقق من سجل TXT
- **"SSL certificate pending"**: انتظر 24 ساعة
- **"Domain already in use"**: النطاق مستخدم في خدمة أخرى

### إعداد متقدم

#### إعداد نطاقات متعددة:
يمكنك إضافة عدة نطاقات:
- globulcars.bg (الرئيسي)
- www.globulcars.bg (الفرعي)
- cars.globulcars.bg (للإعلانات)

#### إعداد CDN:
Firebase Hosting يوفر CDN تلقائياً لجميع النطاقات المخصصة.

### التحقق من النجاح

بعد إعداد النطاق:

1. **افتح المتصفح**:
   ```
   https://globulcars.bg
   ```

2. **تحقق من**:
   - ✅ يفتح الموقع بدون أخطاء
   - ✅ شهادة SSL صالحة (قفل أخضر)
   - ✅ جميع الروابط تعمل
   - ✅ لوحة المدير تعمل على `/admin`

### دعم إضافي

إذا واجهت مشاكل:
- تحقق من [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting/custom-domain)
- استخدم [DNS Checker Tools](https://dnschecker.org)
- اتصل بدعم Firebase

---

**🎉 تهانينا! موقعك الآن جاهز مع نطاق مخصص!**