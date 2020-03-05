const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: '2kWxjYNlSN',
    database: '2kWxjYNlSN',
    password: 'oq2U89Ci2w'
});

module.exports = pool.promise();