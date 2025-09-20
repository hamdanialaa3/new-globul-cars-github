// Google Speech-to-Text & Text-to-Speech Integration

import { speechClient, ttsClient } from './firebase-config';

export class BulgarianSpeechService {
  async speechToText(audioFile: string, languageCode: string = 'bg-BG') {
    const [response] = await speechClient.recognize({
      audio: { content: audioFile },
      config: { languageCode },
    });
    return response.results?.map(r => r.alternatives?.[0]?.transcript).join(' ') || '';
  }

  async textToSpeech(text: string, languageCode: string = 'bg-BG') {
    const [response] = await ttsClient.synthesizeSpeech({
      input: { text },
      voice: { languageCode },
      audioConfig: { audioEncoding: 'MP3' },
    });
    return response.audioContent;
  }
}
