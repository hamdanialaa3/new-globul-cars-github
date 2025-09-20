// Google Dialogflow Integration
// Build intelligent chatbot

import { dialogflowClient } from './firebase-config';

export class BulgarianDialogflowService {
  async detectIntent(projectId: string, sessionId: string, text: string, languageCode: string = 'bg') {
    const sessionPath = dialogflowClient.projectAgentSessionPath(projectId, sessionId);
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode,
        },
      },
    };
    const responses = await dialogflowClient.detectIntent(request);
    return responses[0].queryResult;
  }
}
