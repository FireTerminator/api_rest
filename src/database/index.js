
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vem_bebidas',
  password: '0000',
  port: 5432,
});

pool.connect();
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  //pool.end();
  });

module.exports = pool;
