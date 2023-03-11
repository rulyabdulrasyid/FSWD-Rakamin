const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dbhw10",
  password: "Kuningan123",
  port: 5432,
});

module.exports = pool;
