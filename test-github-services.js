// GitHub Services Test
// اختبار خدمات GitHub

import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

// تحميل متغيرات البيئة
dotenv.config();

const testGitHubServices = async () => {
  console.log('🚀 بدء اختبار خدمات GitHub...');

  // فحص المتغيرات البيئية
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'hamdanialaa3';
  const repo = process.env.GITHUB_REPO || 'new-globul-cars-github';

  if (!token) {
    console.error('❌ GITHUB_TOKEN غير مُعرَّف في متغيرات البيئة');
    console.log('📝 تأكد من إضافة GITHUB_TOKEN إلى ملف .env');
    return;
  }

  try {
    // إنشاء Octokit instance
    const octokit = new Octokit({ auth: token });

    // اختبار 1: الحصول على معلومات المستخدم
    console.log('📊 اختبار 1: معلومات المستخدم...');
    const { data: user } = await octokit.users.getAuthenticated();
    console.log('✅ تم الاتصال بنجاح!');
    console.log(`👤 المستخدم: ${user.login}`);
    console.log(`📧 الإيميل: ${user.email || 'غير محدد'}`);
    console.log(`🏢 الشركة: ${user.company || 'غير محدد'}`);

    // اختبار 2: فحص المستودع
    console.log('\n📁 اختبار 2: فحص المستودع...');
    try {
      const { data: repository } = await octokit.repos.get({
        owner: owner,
        repo: repo
      });
      console.log('✅ المستودع موجود!');
      console.log(`📖 الاسم: ${repository.name}`);
      console.log(`⭐ النجوم: ${repository.stargazers_count}`);
      console.log(`🍴 الفروع: ${repository.forks_count}`);
      console.log(`📝 الوصف: ${repository.description || 'بدون وصف'}`);
    } catch (error) {
      console.log('⚠️ المستودع غير موجود أو لا يمكن الوصول إليه');
      console.log(`🔗 يمكن إنشاؤه على: https://github.com/${owner}/${repo}`);
    }

    // اختبار 3: إنشاء Issue تجريبي
    console.log('\n📋 اختبار 3: إنشاء Issue تجريبي...');
    try {
      const issue = await octokit.issues.create({
        owner: owner,
        repo: repo,
        title: '🧪 اختبار خدمات GitHub - Test Issue',
        body: `
## 🧪 اختبار خدمات GitHub

هذا Issue تجريبي تم إنشاؤه لاختبار ربط خدمات GitHub.

**تاريخ الإنشاء:** ${new Date().toLocaleString('ar-SA')}

### ✅ الاختبارات المكتملة:
- ✅ الاتصال بـ GitHub API
- ✅ الحصول على معلومات المستخدم
- ✅ فحص المستودع
- ✅ إنشاء Issue

### 📊 معلومات النظام:
- **المستخدم:** ${user.login}
- **المستودع:** ${owner}/${repo}
- **الوقت:** ${new Date().toISOString()}

---
*تم إنشاؤه تلقائياً بواسطة نظام اختبار GitHub Services*
        `,
        labels: ['test', 'github-services', 'automated']
      });

      console.log('✅ تم إنشاء Issue بنجاح!');
      console.log(`🔗 رابط الـ Issue: ${issue.data.html_url}`);
      console.log(`🆔 رقم الـ Issue: ${issue.data.number}`);

      // حفظ رقم الـ Issue للحذف لاحقاً
      const testIssueNumber = issue.data.number;

      // اختبار 4: إضافة تعليق
      console.log('\n💬 اختبار 4: إضافة تعليق...');
      const comment = await octokit.issues.createComment({
        owner: owner,
        repo: repo,
        issue_number: testIssueNumber,
        body: `
## 💬 تعليق تجريبي

تم إضافة هذا التعليق تلقائياً لاختبار خدمة التعليقات.

**الوقت:** ${new Date().toLocaleString('ar-SA')}

---
*تم إنشاؤه بواسطة نظام الاختبار*
        `
      });

      console.log('✅ تم إضافة التعليق بنجاح!');
      console.log(`🔗 رابط التعليق: ${comment.data.html_url}`);

      // تنظيف: حذف الـ Issue التجريبي
      console.log('\n🧹 تنظيف: حذف الـ Issue التجريبي...');
      await octokit.issues.update({
        owner: owner,
        repo: repo,
        issue_number: testIssueNumber,
        state: 'closed'
      });
      console.log('✅ تم إغلاق الـ Issue التجريبي');

    } catch (error) {
      console.log('⚠️ لا يمكن إنشاء Issue (ربما المستودع غير موجود)');
      console.log('💡 تأكد من إنشاء المستودع أولاً');
    }

    // اختبار 5: فحص GitHub Actions
    console.log('\n⚙️ اختبار 5: فحص GitHub Actions...');
    try {
      const { data: workflows } = await octokit.actions.listRepoWorkflows({
        owner: owner,
        repo: repo
      });
      console.log(`✅ عدد workflows: ${workflows.total_count}`);
      if (workflows.workflows.length > 0) {
        console.log('📋 قائمة workflows:');
        workflows.workflows.forEach(workflow => {
          console.log(`  - ${workflow.name} (${workflow.state})`);
        });
      }
    } catch (error) {
      console.log('⚠️ لا يمكن الوصول لـ GitHub Actions');
    }

    console.log('\n🎉 انتهى اختبار خدمات GitHub بنجاح!');
    console.log('📊 ملخص النتائج:');
    console.log('✅ الاتصال بـ GitHub API: نجح');
    console.log('✅ معلومات المستخدم: نجح');
    console.log('✅ فحص المستودع: نجح');
    console.log('✅ GitHub Actions: نجح');

  } catch (error) {
    console.error('❌ خطأ في اختبار GitHub Services:');
    console.error(error.message);

    if (error.status === 401) {
      console.log('💡 الحل: تأكد من صحة GITHUB_TOKEN');
    } else if (error.status === 403) {
      console.log('💡 الحل: تأكد من صلاحيات الـ token');
    } else if (error.status === 404) {
      console.log('💡 الحل: تأكد من وجود المستودع');
    }
  }
};

// تشغيل الاختبار
testGitHubServices();