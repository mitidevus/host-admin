// get the client
const mysql = require('mysql2/promise');
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = require("../config/")

const db = { connection: null };

(async () => {
  // create the connection to database
  db.connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  });
  console.log('Database connected!');
})();

module.exports = db;