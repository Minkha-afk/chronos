const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost',          // PostgreSQL host, typically localhost
    database: 'chronos',  // Replace with your database name
    password: 'munu',  // Replace with your PostgreSQL password
    port: 5432,                 // Default PostgreSQL port
  });

module.exports = pool;