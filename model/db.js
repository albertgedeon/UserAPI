'use strict';

const mysql = require('mysql2/promise');

// create the connection to database
const connectionPool = mysql.createPool({
    host: 'intranet-instance-1.cg5q91fefi2q.us-west-2.rds.amazonaws.com',
    user: 'users',
    password: 'YTkEbUEjY76c2DND',
    database: 'Users',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

module.exports = connectionPool;