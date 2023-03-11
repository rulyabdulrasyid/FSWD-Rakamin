const MovieRepository = require("../repositories/movierepository.js");

class MovieService {
  static findMovies = async (next) => {
    try {
      const data = await MovieRepository.findMovies(next);
      return data;
    } catch (err) {
      next(err);
    }
  };
  static findMoviesById = async (id, next) => {
    try {
      const data = await MovieRepository.findMoviesById(id, next);
      return data;
    } catch (err) {
      next(err);
    }
  };
  static addMovie = async (params, next) => {
    try {
      const data = await MovieRepository.addMovie(params, next);
      return data;
    } catch (err) {
      next(err);
    }
  };
  static deleteMovie = async (id, next) => {
    try {
      const data = await MovieRepository.deleteMovie(id, next);
      return data;
    } catch (err) {
      next(err);
    }
  };
}

module.exports = MovieService;
