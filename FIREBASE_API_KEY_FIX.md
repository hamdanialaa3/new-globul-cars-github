# 🔑 إصلاح خطأ Firebase API Key

## المشكلة:
خطأ `Firebase: Error (auth/invalid-api-key)` يعني أن مفتاح API غير صحيح.

## الحل:

### الخطوة 1: الحصول على المفتاح الصحيح
1. اذهب إلى: https://console.firebase.google.com/project/studio-448742006-a3493/overview
2. اضغط على **"Project settings"** (أيقونة الترس)
3. اذهب إلى تبويب **"General"**
4. في قسم **"Your apps"**، اضغط على أيقونة الويب (</>)
5. انسخ **"API key"** من قسم **"SDK setup and configuration"**

### الخطوة 2: تحديث ملف .env
بعد الحصول على المفتاح الصحيح، حدث هذا السطر في ملف `.env`:

```env
REACT_APP_FIREBASE_API_KEY=[المفتاح_الصحيح_هنا]
```

### الخطوة 3: إعادة تشغيل الخادم
```bash
# أوقف الخادم بـ Ctrl+C
# ثم أعد تشغيله
npm start
```

## 🔍 التحقق من صحة المفتاح:

### المفتاح الصحيح يجب أن:
- يبدأ بـ `AIzaSy`
- يكون طوله حوالي 39 حرف
- لا يحتوي على مسافات

### مثال على مفتاح صحيح:
```
AIzaSyCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## 📄 الملفات المحدثة:
- ✅ `firebase-config.ts` - محدث ليستخدم `REACT_APP_*`
- ✅ `bulgarian-config.ts` - محدث ليستخدم `REACT_APP_*`

## 🚀 بعد الإصلاح:
بعد تحديث المفتاح وإعادة تشغيل الخادم، ستختفي رسالة الخطأ وستعمل Firebase بشكل طبيعي.

## 📞 تحتاج مساعدة؟
إذا كنت تواجه صعوبة في العثور على المفتاح، أخبرني وسأساعدك!