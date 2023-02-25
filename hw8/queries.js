const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dvdrental",
  password: "Kuningan123",
  port: 5432,
});

// console.log(pool);
module.exports = pool;
