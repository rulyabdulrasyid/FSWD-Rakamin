const Movie = require("../models/movie.js");

class MovieRepository {
  static findMovies = async (next) => {
    try {
      const data = await Movie.getMovies(next);
      return data;
    } catch (err) {
      next(err);
    }
  };
  static findMoviesById = async (id, next) => {
    try {
      const data = await Movie.getMoviesById(id, next);
      return data;
    } catch (err) {
      next(err);
    }
  };
  static addMovie = async (params, next) => {
    try {
      const data = await Movie.addMovie(params, next);
      return data;
    } catch (err) {
      next(err);
    }
  };
}

module.exports = MovieRepository;
