// GitHub Services Integration
// ربط خدمات GitHub

import { Octokit } from '@octokit/rest';

class GitHubServices {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
    this.owner = 'hamdanialaa3';
    this.repo = 'new-globul-cars-github';
  }

  // بديل لـ Firebase Auth - استخدام GitHub OAuth
  async authenticateUser(code) {
    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code
        })
      });

      const data = await response.json();
      return {
        access_token: data.access_token,
        user: await this.getUserProfile(data.access_token)
      };
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  // الحصول على بيانات المستخدم
  async getUserProfile(token) {
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.users.getAuthenticated();
    return {
      id: data.id,
      login: data.login,
      name: data.name,
      email: data.email,
      avatar_url: data.avatar_url
    };
  }

  // بديل لـ Firestore - استخدام GitHub Issues
  async createCarListing(carData) {
    try {
      const issue = await this.octokit.issues.create({
        owner: this.owner,
        repo: this.repo,
        title: `${carData.make} ${carData.model} - ${carData.year}`,
        body: this.formatCarListingBody(carData),
        labels: ['car-listing', carData.make.toLowerCase()]
      });

      return {
        id: issue.data.id,
        number: issue.data.number,
        url: issue.data.html_url,
        ...carData
      };
    } catch (error) {
      console.error('Error creating car listing:', error);
      throw error;
    }
  }

  // البحث عن السيارات
  async searchCarListings(query) {
    try {
      const { data } = await this.octokit.search.issuesAndPullRequests({
        q: `${query} repo:${this.owner}/${this.repo} label:car-listing`,
        sort: 'created',
        order: 'desc'
      });

      return data.items.map(issue => this.parseCarListingFromIssue(issue));
    } catch (error) {
      console.error('Error searching car listings:', error);
      throw error;
    }
  }

  // إضافة تعليق على إعلان سيارة
  async addCommentToListing(issueNumber, comment) {
    try {
      const { data } = await this.octokit.issues.createComment({
        owner: this.owner,
        repo: this.repo,
        issue_number: issueNumber,
        body: comment
      });

      return {
        id: data.id,
        body: data.body,
        user: data.user.login,
        created_at: data.created_at
      };
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // بديل لـ Firebase Storage - استخدام GitHub Releases
  async uploadCarImage(imageFile, carId) {
    try {
      // إنشاء release جديد للسيارة
      const release = await this.octokit.repos.createRelease({
        owner: this.owner,
        repo: this.repo,
        tag_name: `car-${carId}-${Date.now()}`,
        name: `Car ${carId} Images`,
        body: 'Car images upload'
      });

      // رفع الصورة كـ asset
      const asset = await this.octokit.repos.uploadReleaseAsset({
        owner: this.owner,
        repo: this.repo,
        release_id: release.data.id,
        name: imageFile.name,
        data: imageFile
      });

      return {
        url: asset.data.browser_download_url,
        id: asset.data.id,
        name: asset.data.name
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // تنسيق بيانات السيارة للـ Issue
  formatCarListingBody(carData) {
    return `
## 🚗 تفاصيل السيارة

**الماركة:** ${carData.make}
**الموديل:** ${carData.model}
**السنة:** ${carData.year}
**السعر:** ${carData.price} ${carData.currency || 'EUR'}
**اللون:** ${carData.color}
**عدد الكيلومترات:** ${carData.mileage} km
**الوقود:** ${carData.fuelType}
**ناقل الحركة:** ${carData.transmission}

## 📝 الوصف
${carData.description}

## 📞 معلومات الاتصال
**البائع:** ${carData.sellerName}
**الهاتف:** ${carData.phone}
**الإيميل:** ${carData.email}

---
*تم النشر عبر GitHub Services*
    `.trim();
  }

  // تحليل بيانات السيارة من الـ Issue
  parseCarListingFromIssue(issue) {
    const body = issue.body;
    // استخراج البيانات من الـ markdown
    const make = this.extractFromMarkdown(body, '**الماركة:**');
    const model = this.extractFromMarkdown(body, '**الموديل:**');
    const year = this.extractFromMarkdown(body, '**السنة:**');
    const price = this.extractFromMarkdown(body, '**السعر:**');

    return {
      id: issue.id,
      number: issue.number,
      title: issue.title,
      make,
      model,
      year: parseInt(year),
      price,
      description: issue.body,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      url: issue.html_url,
      labels: issue.labels.map(label => label.name)
    };
  }

  // استخراج البيانات من الـ markdown
  extractFromMarkdown(text, pattern) {
    const regex = new RegExp(`${pattern}\\s*(.+?)(?=\\n|\\*\\*)`, 's');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  }

  // إنشاء webhook للتحقق من الأمان (بديل لـ Recaptcha)
  async createWebhook(url, events = ['issues', 'issue_comment']) {
    try {
      const { data } = await this.octokit.repos.createWebhook({
        owner: this.owner,
        repo: this.repo,
        config: {
          url: url,
          content_type: 'json',
          secret: process.env.WEBHOOK_SECRET
        },
        events: events,
        active: true
      });

      return {
        id: data.id,
        url: data.config.url,
        events: data.events
      };
    } catch (error) {
      console.error('Error creating webhook:', error);
      throw error;
    }
  }
}

// مثال الاستخدام
export const githubServices = new GitHubServices(process.env.GITHUB_TOKEN);

export default GitHubServices;