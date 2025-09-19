// Google Cloud Tasks Integration for Bulgarian Car Marketplace

import { CloudTasksClient } from '@google-cloud/tasks';

const client = new CloudTasksClient();

export class BulgarianCloudTasksService {
  // Create new task
  async createTask({ project, queue, location, url, payload }: {
    project: string,
    queue: string,
    location: string,
    url: string,
    payload: any
  }): Promise<any> {
    const parent = client.queuePath(project, location, queue);
    const task = {
      httpRequest: {
  httpMethod: 'POST' as const,
        url,
        body: Buffer.from(JSON.stringify(payload)).toString('base64'),
        headers: { 'Content-Type': 'application/json' },
      },
    };
  const [response] = await client.createTask({ parent, task });
  return response;
  }
}

// Usage example
// const tasksService = new BulgarianCloudTasksService();
// await tasksService.createTask({ project: 'your-gcp-project-id', queue: 'default', location: 'europe-west1', url: 'https://your-app.com/task', payload: { carId: 123 } });
