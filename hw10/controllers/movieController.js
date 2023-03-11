const MovieService = require("../services/moviesservices.js");

class MoviesController {
  static findMovies = async (req, res, next) => {
    try {
      const data = await MovieService.findMovies(next);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  static findMoviesById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await MovieService.findMoviesById(id, next);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
  static addMovie = async (req, res, next) => {
    try {
      const params = req.body;
      const data = await MovieService.addMovie(params, next);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  };
  // static updateMovie = async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const
  //   } catch (err) {
  //     next(err);
  //   }
  // };
  static deleteMovie = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await MovieService.deleteMovie(id, next);
      if (data) {
        res.status(200).json({ message: "Deleted Successfully" });
        return data;
      } else {
        next({ name: "ErrorNotFound" });
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = MoviesController;
