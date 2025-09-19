const mysql = require('mysql2/promise');

class BulgarianCloudSQLService {
  async connectToDatabase(config) {
    const connection = await mysql.createConnection(config);
    return connection;
  }
}

module.exports = { BulgarianCloudSQLService };
const { BulgarianCloudSQLService } = require('./links/cloudsql-service');

const sqlService = new BulgarianCloudSQLService();

async function connectToCloudSQL() {
  const conn = await sqlService.connectToDatabase({
    host: 'globul_auto_IP',
    user: 'hamdanialaa3',
    password: 'Alaa1983',
    database: 'DB_globul'
  });

  const [rows] = await conn.query('SELECT * FROM cars');
  console.log(rows);

  await conn.end();
}

connectToCloudSQL().catch(console.error);