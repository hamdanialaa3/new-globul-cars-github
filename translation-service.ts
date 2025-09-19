// Google Translation API Integration for Bulgarian Car Marketplace

import { v2 as Translate } from '@google-cloud/translate';

const projectId = process.env.GCLOUD_PROJECT_ID || 'your-gcp-project-id';
const translate = new Translate.Translate({ projectId });

export class BulgarianTranslationService {
  // Translate text
  async translateText(text: string, target: string = 'en'): Promise<string> {
    const [translation] = await translate.translate(text, target);
    return translation;
  }
}

// Usage example
// const translationService = new BulgarianTranslationService();
// const translated = await translationService.translateText('Здравей', 'en');
