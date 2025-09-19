# دليل ربط الدومين globul.net مع Firebase Hosting

## خطوات ربط الدومين:

1. اذهب إلى Firebase Console (https://console.firebase.google.com)
2. اختر مشروعك (globul-cars)
3. اذهب إلى Hosting > Add custom domain
4. أدخل الدومين: globul.net
5. انسخ سجلات DNS التي ستظهر لك
6. اذهب إلى مزود الدومين (مثل GoDaddy أو Namecheap)
7. أضف السجلات التالية في إعدادات DNS:
   - Type: A, Name: @, Value: [IP من Firebase]
   - Type: CNAME, Name: www, Value: [Domain من Firebase]
8. انتظر 24-48 ساعة حتى يتم التحقق من الدومين
9. نشر الموقع عبر Firebase CLI:
   ```
   firebase deploy --only hosting
   ```

## ملاحظات:
- تأكد من أن الدومين غير مرتبط بأي خدمة أخرى
- إذا كان الدومين يستخدم HTTPS، سيتم تفعيله تلقائيًا عبر Firebase
- يمكنك ربط الدومين مع Google Cloud أيضًا إذا أردت