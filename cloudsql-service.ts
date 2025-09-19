// Google Cloud SQL Integration
// Connect to managed SQL database from Google

import { createConnection } from 'mysql2/promise';

export class BulgarianCloudSQLService {
  async connectToDatabase(config: any) {
    const connection = await createConnection(config);
    return connection;
  }
}
