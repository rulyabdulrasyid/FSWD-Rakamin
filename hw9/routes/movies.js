const express = require("express");
const router = express.Router();
const pool = require("../queries.js");
const { authorization } = require("../middlewares/auth.js");

// Get all movies =>>>>> 100 movies
router.get("/movies", (req, res, next) => {
  console.log(req.loggedUser);
  const query = `SELECT * FROM movies order by movies.id`;
  pool.query(query, (err, result) => {
    if (err) next(err);
    res.status(200).json(result.rows);
  });
});

// Get movies by spesifik id

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  const query = `SELECT * FROM movies where id=$1`;
  pool.query(query, [id], (err, result) => {
    if (err) next(err);
    if (result.rows.length === 0) {
      next({ name: "ErrorNotFound" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});

// Post movies
router.post("/movies", authorization, (req, res, next) => {
  const { id, title, genres, year } = req.body;
  const insertQuery = `INSERT INTO movies (id, title, genres, year) values ($1, $2, $3, $4)`;
  pool.query(insertQuery, [id, title, genres, year], (err, response) => {
    if (err) next(err);
    res.status(201).json({ message: "New Movies Added" });
  });
});

// Put Movies
router.put("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, genres, year } = req.body;
  const updateQuery = `UPDATE movies SET title=$1, genres=$2, year=$3 WHERE id=$4`;
  pool.query(updateQuery, [title, genres, year, id], (err, response) => {
    if (err) next(err);
    res.status(200).json({ message: "Movie Update", location: "/movies/" + req.params.id });
  });
});

// Delete Movies
router.delete("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  // Find object movie
  // Kalo keteu delete
  // Kalo ga ketemu error not found
  const findMovie = `SELECT * FROM movies WHERE id=$1`;
  pool.query(findMovie, [id], (err, response) => {
    if (err) next(err);
    // Kalo ada response ===> delete
    if (response.rows[0]) {
      // DELETE
      const deleteQuery = `DELETE FROM movies WHERE id=$1`;
      pool.query(deleteQuery, [id], (err, response) => {
        if (err) next(err);
        res.status(200).json({ message: "Movie Deleted" });
      });
    } else {
      // Kalo ga ada ====> error not found
      res.status(404).json({ message: "ErrorNotFound" });
    }
  });
});

module.exports = router;
