var express = require("express");
var router = express.Router();
var pool = require("./queries.js");

// Find all user
router.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
});

module.exports = router;
