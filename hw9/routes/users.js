const express = require("express");
const router = express.Router();
const pool = require("../queries.js");

// Find all users =====> 100 users
router.get("/users", (req, res, next) => {
  const query = `SELECT * FROM users order by users.id`;
  pool.query(query, (err, results) => {
    if (err) next(err);
    res.status(200).json(results.rows);
  });
});

// Get users by spesifik Id
router.get("/users/:id", (req, res, next) => {
  const { id } = req.params;
  const query = `SELECT * FROM users where id=$1`;
  pool.query(query, [id], (err, result) => {
    if (err) next(err);
    if (result.rows.length === 0) {
      next({ name: "ErrorNotFound" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});

// Post users
router.post("/users", (req, res, next) => {
  const { id, email, gender, password, role } = req.body;
  const insertQuery = `
    INSERT INTO users (id, email, gender, password, role) values ($1, $2, $3, $4, $5)`;
  pool.query(insertQuery, [id, email, gender, password, role], (err, response) => {
    if (err) next(err);
    res.status(201).json({ message: "New User Added" });
  });
});

// Put users
router.put("/users/:id", (req, res, next) => {
  const { id } = req.params;
  const { email, gender, password, role } = req.body;
  const updateQuery = `UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5`;
  pool.query(updateQuery, [email, gender, password, role, id], (err, response) => {
    if (err) next(err);
    res.status(200).json({ massage: "User update", location: "/movies/" + req.params.id });
  });
});

// Delete Users
router.delete("/users/:id", (req, res, next) => {
  const { id } = req.params;
  const findUser = `SELECT * FROM users WHERE id=$1`;
  pool.query(findUser, [id], (err, response) => {
    if (err) next(err);
    if (response.rows[0]) {
      const deleteQuery = `DELETE FROM users WHERE id=$1`;
      pool.query(deleteQuery, [id], (err, response) => {
        if (err) next(err);
        res.status(200).json({ message: "User Deleted" });
      });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  });
});
module.exports = router;
