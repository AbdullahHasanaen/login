const { Pool } = require("pg");

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'PUT YOUR PASSWORD HERE',
    database: 'PUT YOUR DATABASE NAME HERE' 
});

module.exports = pool;