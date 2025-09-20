# GitHub Services Integration Guide
# دليل ربط خدمات GitHub

## 📋 نظرة عامة
هذا الدليل يوضح كيفية استخدام خدمات GitHub كبدائل أو مكملة لخدمات Google Cloud و Firebase.

## 🔄 مقارنة الخدمات

| Google Service | GitHub Alternative | الاستخدام |
|----------------|-------------------|-----------|
| Firebase Auth | GitHub OAuth | مصادقة المستخدمين |
| Firestore | GitHub Issues/Discussions | تخزين البيانات والمناقشات |
| Firebase Storage | GitHub Releases | تخزين الملفات والإصدارات |
| Cloud Functions | GitHub Actions | الوظائف التلقائية |
| BigQuery | GitHub Codespaces | تحليل البيانات |
| Google Maps | GitHub GeoJSON | الخرائط والموقع |
| Recaptcha | GitHub Webhooks | التحقق من الأمان |

## 🚀 إعداد GitHub CLI

### 1. تثبيت GitHub CLI
```bash
# Windows (PowerShell)
winget install --id GitHub.cli

# أو تحميل من: https://cli.github.com/
```

### 2. المصادقة
```bash
gh auth login
```

### 3. إنشاء Personal Access Token
1. اذهب إلى: https://github.com/settings/tokens
2. أنشئ token جديد مع الصلاحيات:
   - ✅ `repo` (للمستودعات)
   - ✅ `workflow` (لـ GitHub Actions)
   - ✅ `gist` (للـ Gists)

## 📊 استخدام خدمات GitHub

### 1. GitHub Actions (بديل لـ Cloud Functions)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: |
          npm install
          npm run build
          # نشر التطبيق
```

### 2. GitHub Pages (بديل لـ Firebase Hosting)
```yaml
# .github/workflows/pages.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Build
        run: |
          npm install
          npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./build
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3. GitHub Issues (بديل لـ Firestore)
```javascript
// استخدام GitHub API لإدارة البيانات
const createIssue = async (title, body) => {
  const response = await fetch('https://api.github.com/repos/owner/repo/issues', {
    method: 'POST',
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  });
  return response.json();
};
```

### 4. GitHub Packages (بديل لـ Firebase Storage)
```yaml
# نشر حزم npm
name: Publish Package
on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 🔧 إعداد المشروع

### 1. إنشاء مستودع GitHub
```bash
# إنشاء مستودع جديد
gh repo create new-globul-cars-github --public --description "Bulgarian Car Marketplace with GitHub Services"

# رفع الكود
git remote add origin https://github.com/hamdanialaa3/new-globul-cars-github.git
git push -u origin main
```

### 2. إعداد GitHub Pages
```bash
# تفعيل GitHub Pages
gh repo edit --enable-pages --pages-source "docs"
```

### 3. إعداد GitHub Actions
```bash
# إنشاء مجلد workflows
mkdir -p .github/workflows
```

## 📈 المزايا والعيوب

### ✅ مزايا GitHub Services:
- **مجاني** للمشاريع العامة
- **تكامل كامل** مع Git
- **أمان عالي** مع GitHub Security
- **مجتمع كبير** ودعم فني
- **CI/CD مجاني** مع GitHub Actions

### ❌ عيوب GitHub Services:
- **قيود على المشاريع الخاصة**
- **معدل طلبات محدود** في API
- **أقل مرونة** من Google Cloud
- **لا يدعم جميع المناطق الجغرافية**

## 🎯 التوصيات

### للمشاريع الصغيرة والمتوسطة:
- **استخدم GitHub Pages** للاستضافة
- **GitHub Actions** للأتمتة
- **GitHub Issues** لإدارة البيانات البسيطة

### للمشاريع الكبيرة:
- **استمر في استخدام Google Cloud** للأداء العالي
- **استخدم GitHub** للتحكم في الإصدارات والـ CI/CD

## 🔗 روابط مفيدة

- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [GitHub API Documentation](https://docs.github.com/en/rest)

---

**هل تريد إعداد أي من هذه الخدمات؟** 🚀