const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node_complete',
  password: 'banco10!TOP'
});

module.exports = pool.promise();
