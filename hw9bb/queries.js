const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "movies",
  password: "Kuningan123",
  port: 5432,
});

module.exports = pool;
