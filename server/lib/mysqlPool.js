/* mysqlPool.js 
 * Reusable MySQL connection pool for making queries throughout the rest of
 * the app. 
 */

const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE || 'workorderproject',
    user: process.env.MYSQL_USER || 'user',
    password: process.env.MYSQL_PASSWORD || 'hunter2'
});

module.exports = mysqlPool;