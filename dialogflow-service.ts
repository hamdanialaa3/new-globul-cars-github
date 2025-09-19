// Google Dialogflow Integration
// Build intelligent chatbot

import { SessionsClient } from '@google-cloud/dialogflow';

export class BulgarianDialogflowService {
  private client = new SessionsClient();

  async detectIntent(projectId: string, sessionId: string, text: string, languageCode: string = 'bg') {
    const sessionPath = this.client.projectAgentSessionPath(projectId, sessionId);
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode,
        },
      },
    };
    const responses = await this.client.detectIntent(request);
    return responses[0].queryResult;
  }
}
