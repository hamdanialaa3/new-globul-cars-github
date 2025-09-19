# دليل ربط جميع خدمات Google Cloud بحساب globul.net.m@gmail.com

## خطوات الربط الفعلي (اتبعها بالترتيب):

### 1. إنشاء مشروع Google Cloud
- اذهب إلى https://console.cloud.google.com
- سجل دخولك بحساب globul.net.m@gmail.com
- أنشئ مشروع جديد باسم "globul-cars"
- احفظ Project ID (مثل: globul-cars-12345)

### 2. تفعيل الخدمات المطلوبة
- في Google Cloud Console، اذهب إلى "APIs & Services" > "Library"
- فعّل الخدمات التالية:
  - Firebase (Auth, Firestore, Storage, Functions, Hosting)
  - Cloud KMS
  - Maps Platform
  - Apigee
  - BigQuery
  - Cloud SQL
  - Cloud Tasks
  - Dataflow
  - Dialogflow
  - Speech-to-Text
  - Text-to-Speech
  - Translation
  - Recaptcha Enterprise
  - Cloud Run
  - App Engine
  - Pub/Sub

### 3. إنشاء مفاتيح الخدمة
- اذهب إلى "APIs & Services" > "Credentials"
- أنشئ "Service Account" جديد باسم "globul-service-account"
- أعطِه الصلاحيات المطلوبة (Editor أو Owner)
- أنشئ مفتاح JSON ونزّله
- ضع الملف في مجلد `secrets/service-account.json`

### 4. إعداد Firebase
- اذهب إلى https://console.firebase.google.com
- اربط المشروع الذي أنشأته في Google Cloud
- فعّل Authentication, Firestore, Storage, Functions, Hosting
- احصل على مفاتيح Firebase من Project Settings

### 5. إعداد قاعدة البيانات Cloud SQL
- في Google Cloud Console، اذهب إلى Cloud SQL
- أنشئ قاعدة بيانات MySQL جديدة
- احفظ اسم المستخدم، كلمة المرور، وعنوان IP
- فعّل الاتصال العام (Public IP)

### 6. إعداد Google Maps
- في Google Cloud Console، اذهب إلى Maps Platform
- أنشئ مفتاح API جديد
- فعّل الخدمات المطلوبة (Maps, Places)

### 7. إعداد GitHub Actions
- اذهب إلى مستودعك على GitHub (hamdanialaa3/new-globul-cars)
- اذهب إلى Settings > Secrets and variables > Actions
- أضف الأسرار التالية:
  - FIREBASE_TOKEN: احصل عليه من Firebase CLI
  - GOOGLE_CREDENTIALS: محتوى ملف service-account.json

### 8. ربط الدومين
- اتبع الخطوات في ملف DOMAIN_SETUP.md
- أضف سجلات DNS في مزود الدومين

### 9. اختبار الربط
- شغّل `node test-sql.js` لاختبار قاعدة البيانات
- شغّل `firebase deploy` لاختبار Firebase
- ارفع الكود إلى GitHub لاختبار GitHub Actions

## ملاحظات مهمة:
- تأكد من إضافة جميع القيم الفعلية في ملف .env
- لا تشارك ملف service-account.json مع أحد
- إذا واجهت مشاكل، تحقق من الصلاحيات والمفاتيح
- جميع الخدمات مرتبطة بمشروع واحد في Google Cloud لتسهيل الإدارة