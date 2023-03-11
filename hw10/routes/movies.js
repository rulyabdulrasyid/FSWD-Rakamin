const express = require("express");
const router = express.Router();
const MoviesController = require("../controllers/movieController.js");

router.get("/", MoviesController.findMovies);
router.get("/:id", MoviesController.findMoviesById);
router.post("/", MoviesController.addMovie);
// router.put("/:id", MoviesController.updateMovie);
router.delete("/:id", MoviesController.deleteMovie);
module.exports = router;
