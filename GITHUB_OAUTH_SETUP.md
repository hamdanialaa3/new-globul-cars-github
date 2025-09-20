# إعداد GitHub OAuth App
# Setting up GitHub OAuth App

## 🚀 الخطوات:

### 1. إنشاء GitHub OAuth App
1. اذهب إلى: https://github.com/settings/developers
2. اضغط على **"New OAuth App"**
3. املأ البيانات التالية:

```
Application name: Globul Cars Marketplace
Homepage URL: http://localhost:3000 (أو رابط GitHub Pages الخاص بك)
Application description: Bulgarian Car Marketplace using GitHub Services
Authorization callback URL: http://localhost:3000/auth/github/callback
```

### 2. الحصول على Client ID و Client Secret
بعد إنشاء التطبيق، ستحصل على:
- **Client ID**: `Iv1.xxxxxxxxxxxxxxxx`
- **Client Secret**: `ghs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 3. تحديث ملف .env
```bash
# في ملف .env.github
GITHUB_CLIENT_ID=Iv1.xxxxxxxxxxxxxxxx
GITHUB_CLIENT_SECRET=ghs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. إنشاء Personal Access Token
1. اذهب إلى: https://github.com/settings/tokens
2. اضغط على **"Generate new token (classic)"**
3. أعطِ الصلاحيات التالية:
   - ✅ `repo` (للمستودعات)
   - ✅ `workflow` (لـ GitHub Actions)
   - ✅ `gist` (للـ Gists)
   - ✅ `read:org` (للمنظمات)

### 5. تحديث ملف .env مرة أخرى
```bash
# في ملف .env.github
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🔧 استخدام GitHub OAuth في التطبيق

### مثال على React Component:

```javascript
import React, { useEffect } from 'react';

const GitHubLogin = () => {
  const handleLogin = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = 'http://localhost:3000/auth/github/callback';
    const scope = 'user:email,repo';

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
  };

  const handleCallback = async (code) => {
    // إرسال الكود إلى الخادم للحصول على access token
    const response = await fetch('/api/auth/github', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await response.json();
    // حفظ الـ token في localStorage أو context
    localStorage.setItem('github_token', data.access_token);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleCallback(code);
    }
  }, []);

  return (
    <button onClick={handleLogin}>
      تسجيل الدخول بـ GitHub
    </button>
  );
};

export default GitHubLogin;
```

## 📊 API Endpoints المطلوبة

### Backend (Node.js/Express):

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.post('/api/auth/github', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    }, {
      headers: { 'Accept': 'application/json' }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

## 🔒 الأمان

### 1. حماية الـ Webhooks
```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}
```

### 2. التحقق من الصلاحيات
```javascript
// التحقق من أن المستخدم لديه صلاحية الوصول للمستودع
const { data: permissions } = await octokit.repos.getCollaboratorPermissionLevel({
  owner: 'hamdanialaa3',
  repo: 'new-globul-cars-github',
  username: user.login
});
```

## 🎯 المزايا

### ✅ مزايا استخدام GitHub Services:
- **مجاني تماماً** للمشاريع العامة
- **تكامل كامل** مع نظام التحكم في الإصدارات
- **أمان عالي** مع GitHub Security
- **مجتمع كبير** ودعم فني
- **CI/CD مجاني** مع GitHub Actions
- **استضافة مجانية** مع GitHub Pages

### 📈 مقارنة مع Google Services:

| الميزة | Google Cloud | GitHub Services |
|--------|-------------|-----------------|
| التكلفة | مدفوعة | مجانية |
| الإعداد | معقد | بسيط |
| التخصيص | عالي | متوسط |
| الدعم | 24/7 | مجتمع |
| التكامل | محدود | ممتاز |

## 🚀 البدء السريع

1. **اتبع خطوات الإعداد أعلاه**
2. **انسخ ملف `.env.github` إلى `.env`**
3. **شغل التطبيق:**
   ```bash
   npm install @octokit/rest axios
   npm start
   ```
4. **اختبر تسجيل الدخول بـ GitHub**

---

**هل تحتاج مساعدة في إعداد أي من هذه الخطوات؟** 🔧