// Google Speech-to-Text & Text-to-Speech Integration

import { SpeechClient } from '@google-cloud/speech';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export class BulgarianSpeechService {
  private readonly speechClient = new SpeechClient();
  private readonly ttsClient = new TextToSpeechClient();

  async speechToText(audioFile: string, languageCode: string = 'bg-BG') {
    const [response] = await this.speechClient.recognize({
      audio: { content: audioFile },
      config: { languageCode },
    });
    return response.results?.map(r => r.alternatives?.[0]?.transcript).join(' ') || '';
  }

  async textToSpeech(text: string, languageCode: string = 'bg-BG') {
    const [response] = await this.ttsClient.synthesizeSpeech({
      input: { text },
      voice: { languageCode },
      audioConfig: { audioEncoding: 'MP3' },
    });
    return response.audioContent;
  }
}
