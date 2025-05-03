const { Pool } = require('pg');

const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.POSTGRES_USER, // Replace with your PostgreSQL username
    host: process.env.POSTGRES_HOST,          // PostgreSQL host, typically localhost
    database: process.env.POSTGRES_DB,  // Replace with your database name
    password: process.env.POSTGRES_PASSWORD,  // Replace with your PostgreSQL password
    port: 5432,                 // Default PostgreSQL port
  });

module.exports = pool;
