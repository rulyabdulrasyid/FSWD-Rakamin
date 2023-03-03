var express = require("express");
var router = express.Router();
var pool = require("./queries.js");

// TABEL USERS
// Find all users

router.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
});

// Get users by spesifik Id
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const findQueries = `SELECT * FROM users where id=$1`;
  pool.query(findQueries, [id], (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows[0]);
  });
});

// Post users
router.post("/users", (req, res) => {
  //   console.log(req.body);
  const { email, gender, password, role } = req.body;
  const insertQuery = `
    INSERT INTO users (email, gender, password, role) values
    ($1, $2, $3, $4)
    `;
  pool.query(insertQuery, [email, gender, password, role], (err, response) => {
    if (err) throw err;
    res.status(201).json({ message: "New user added", location: "/users/" });
  });
});

// Put users
router.put("/users/:email", (req, res) => {
  const { email } = req.params;
  const { id, gender, password, role } = req.body;

  //   console.log(id);
  //   console.log(req.body);
  const updateQuery = `
    UPDATE users 
    SET id = $1,
        gender = $2,
        password = $3,
        role = $4
    WHERE email = $5
    `;
  pool.query(updateQuery, [id, gender, password, role, email], (err, response) => {
    if (err) throw err;
    res.status(200).json({ massage: "User update", location: "/users/" + req.params.email });
  });
});

module.exports = router;
