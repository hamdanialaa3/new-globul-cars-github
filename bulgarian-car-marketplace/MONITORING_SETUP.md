# دليل إعداد المراقبة والتنبيهات - Monitoring & Alerts Setup Guide

## إعداد مراقبة شاملة لسوق السيارات البلغاري

### الخطوة 1: تفعيل Google Analytics

#### 1.1 الدخول إلى Firebase Console
```
https://console.firebase.google.com
```
اختر مشروع "New Globul Cars FG"

#### 1.2 تفعيل Analytics
1. **انتقل إلى "Analytics"**
2. **انقر على "Enable Google Analytics"**
3. **اختر أو أنشئ حساب Analytics**
4. **قبول الشروط والأحكام**

#### 1.3 ربط Analytics بالتطبيق
التطبيق مُعد بالفعل للعمل مع Analytics:
- ✅ معرف القياس: `G-ENC064NX05`
- ✅ تتبع الصفحات مُفعل
- ✅ تتبع الأحداث مُعد

### الخطوة 2: إعداد Crashlytics (للتطبيقات المحمولة)

#### 2.1 تفعيل Crashlytics
1. **في Firebase Console → Crashlytics**
2. **انقر على "Get started"**
3. **اتبع التعليمات لإضافة SDK**

#### 2.2 مراقبة الأخطاء
- يراقب Crashlytics تلقائياً:
  - أخطاء JavaScript
  - أخطاء الشبكة
  - مشاكل الأداء

### الخطوة 3: إعداد مراقبة الأداء

#### 3.1 تفعيل Performance Monitoring
1. **Firebase Console → Performance**
2. **انقر على "Get started"**
3. **SDK مُضمن بالفعل في التطبيق**

#### 3.2 المقاييس المراقبة
- ⏱️ سرعة تحميل الصفحات
- 📊 استجابة API
- 🔄 أداء قاعدة البيانات
- 📱 أداء التطبيق على الأجهزة

### الخطوة 4: إعداد التنبيهات

#### 4.1 إعداد تنبيهات الأخطاء
1. **Firebase Console → Functions**
2. **انتقل إلى "Alerts"**
3. **أضف تنبيهات ل**:
   - معدل الأخطاء > 5%
   - وقت الاستجابة > 3 ثواني
   - استخدام CPU > 80%

#### 4.2 تنبيهات الاستخدام
- مراقبة استخدام Firestore
- مراقبة استخدام Storage
- مراقبة استخدام Functions

### الخطوة 5: مراقبة الوقت الفعلي

#### 5.1 لوحة التحكم الرئيسية
```
Firebase Console → Project Overview
```
ستجد:
- 📈 عدد المستخدمين النشطين
- 🚨 الأخطاء الحديثة
- 📊 استخدام الموارد
- 💰 التكاليف

#### 5.2 مراقبة Hosting
```
Firebase Console → Hosting
```
- حالة النشر
- سرعة التحميل
- استخدام النطاق الترددي

### الخطوة 6: إعداد تقارير مخصصة

#### 6.1 في Google Analytics
1. **انتقل إلى Analytics Console**
2. **أنشئ تقارير مخصصة ل**:
   - سلوك المستخدمين
   - مصادر الزيارات
   - معدلات التحويل
   - أداء الصفحات

#### 6.2 مقاييس مخصصة
```javascript
// في التطبيق - تتبع أحداث مخصصة
import { logEvent } from 'firebase/analytics';

logEvent(analytics, 'car_viewed', {
  car_id: carId,
  car_brand: brand,
  user_location: location
});
```

### الخطوة 7: مراقبة الأمان

#### 7.1 مراجعة قواعد الأمان
```bash
# التحقق من قواعد Firestore
firebase deploy --only firestore:rules --dry-run

# التحقق من قواعد Storage
firebase deploy --only storage --dry-run
```

#### 7.2 مراقبة الوصول
- مراجعة سجلات الوصول في Firebase Console
- إعداد تنبيهات للوصول غير المصرح به
- مراقبة استخدام API

### الخطوة 8: إعداد النسخ الاحتياطي

#### 8.1 نسخ احتياطي للبيانات
1. **Firestore → Import/Export**
2. **جدولة النسخ الاحتياطي الأسبوعي**
3. **حفظ النسخ في Cloud Storage**

#### 8.2 نسخ احتياطي للكود
```bash
# إعداد GitHub Actions للنسخ الاحتياطي
name: Backup
on:
  schedule:
    - cron: '0 2 * * 1'  # كل يوم اثنين الساعة 2 صباحاً
```

### الخطوة 9: إعداد التنبيهات المخصصة

#### 9.1 تنبيهات الأعمال
```javascript
// مراقبة المبيعات
if (salesThisMonth < targetSales) {
  sendAlert('Low sales detected');
}
```

#### 9.2 تنبيهات تقنية
- مراقبة وقت التشغيل
- مراقبة استخدام الذاكرة
- مراقبة معدل الخطأ

### الخطوة 10: لوحة مراقبة مخصصة

#### 10.1 إنشاء لوحة في Analytics
1. **Analytics Console → Customization → Dashboards**
2. **أضف المقاييس المهمة**:
   - عدد المستخدمين
   - معدل الارتداد
   - متوسط وقت الجلسة
   - معدلات التحويل

#### 10.2 تكامل مع أدوات خارجية
- **Slack**: للتنبيهات
- **Discord**: للإشعارات
- **Email**: للتقارير الأسبوعية

### أدوات المراقبة المتقدمة

#### Firebase Extensions
```bash
# تثبيت ملحقات مفيدة
firebase ext:install firestore-bigquery-export
firebase ext:install firestore-send-email
```

#### Cloud Monitoring
1. **انتقل إلى Google Cloud Console**
2. **Cloud Monitoring → Dashboards**
3. **إنشاء لوحات مراقبة مخصصة**

### خطوات استكشاف الأخطاء

#### مشاكل شائعة وحلولها:

1. **Analytics لا يعمل**:
   - تحقق من معرف القياس
   - تأكد من تفعيل Analytics في Console

2. **التنبيهات لا تصل**:
   - تحقق من إعدادات البريد الإلكتروني
   - تأكد من تفعيل التنبيهات

3. **بيانات غير دقيقة**:
   - تحقق من تتبع الأحداث
   - راجع إعدادات المنطقة الزمنية

### تقارير دورية

#### تقرير يومي
- عدد المستخدمين الجدد
- الأخطاء المسجلة
- أداء الموقع

#### تقرير أسبوعي
- إحصائيات المبيعات
- سلوك المستخدمين
- مشاكل الأداء

#### تقرير شهري
- اتجاهات النمو
- مقارنة مع الأشهر السابقة
- توصيات للتحسين

### دعم ومساعدة

- 📚 [Firebase Documentation](https://firebase.google.com/docs)
- 🎯 [Analytics Help Center](https://support.google.com/analytics)
- 💬 [Firebase Community](https://firebase.google.com/community)
- 📧 [Firebase Support](https://firebase.google.com/support)

---

**🎯 نظام المراقبة الخاص بك جاهز الآن!**

ستحصل على:
- 📊 تحليلات مفصلة للمستخدمين
- 🚨 تنبيهات فورية للمشاكل
- 📈 مراقبة الأداء في الوقت الفعلي
- 🔒 مراقبة الأمان والوصول
- 💾 نسخ احتياطي تلقائي