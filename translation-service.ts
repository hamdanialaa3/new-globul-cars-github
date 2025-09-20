// Google Translation API Integration for Bulgarian Car Marketplace

import { translateClient } from './firebase-config';

export class BulgarianTranslationService {
  // Translate text
  async translateText(text: string, target: string = 'en'): Promise<string> {
    const [translation] = await translateClient.translate(text, target);
    return translation;
  }
}

// Usage example
// const translationService = new BulgarianTranslationService();
// const translated = await translationService.translateText('Здравей', 'en');
