const express = require("express");
const router = express.Router();
const MoviesController = require("../controllers/movieController.js");

router.get("/", MoviesController.findMovies);
router.get("/:id", MoviesController.findMoviesById);
router.post("/", MoviesController.addMovie);

module.exports = router;
