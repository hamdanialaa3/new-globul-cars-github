// Google Cloud Pub/Sub Integration for Bulgarian Car Marketplace

import { pubsubClient } from './firebase-config';

export class BulgarianPubSubService {
  // Publish message to a specific topic
  async publishMessage(topicName: string, data: any): Promise<string> {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    const messageId = await pubsubClient.topic(topicName).publish(dataBuffer);
    return messageId;
  }

  // Subscribe to topic and receive messages
  subscribeToTopic(subscriptionName: string, callback: (message: any) => void) {
    const subscription = pubsubClient.subscription(subscriptionName);
    subscription.on('message', (message) => {
      callback(JSON.parse(message.data.toString()));
      message.ack();
    });
  }
}

// Usage example
// const pubsubService = new BulgarianPubSubService();
// await pubsubService.publishMessage('new-car-topic', { carId: 123, name: 'New Car' });
