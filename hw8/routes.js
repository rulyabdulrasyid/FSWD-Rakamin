var express = require("express");
var router = express.Router();
var pool = require("./queries.js");

// find data all film
router.get("/film", (req, res) => {
  pool.query("SELECT * FROM film", (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
});

router.get("/actor", (req, res) => {
  pool.query("SELECT * FROM actor", (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
});

// find film data from id film
router.get("/film/:id", (req, res) => {
  const { id } = req.params;
  const findQueries = `
    SELECT * FROM film WHERE film_id=$1`;
  pool.query(findQueries, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows[0]);
  });
});

// find list of category
router.get("/category", (req, res) => {
  pool.query("SELECT category.name as daftar_category FROM category", (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
});

// find film by category name
router.get("/category/:name", (req, res) => {
  const { name } = req.params;
  const findQueries = `
    SELECT 
    category.name as category, 
      film.film_id as id_film,
      film.title as title_film,
      film.release_year as year     
    from film
    join film_category 
    on film_category.film_id=film.film_id
    join category 
    on category.category_id = film_category.category_id 
    where category.name = '${name}'
    `;
  pool.query(findQueries, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
});

module.exports = router;
