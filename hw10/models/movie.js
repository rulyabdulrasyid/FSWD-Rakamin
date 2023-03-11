const pool = require("../config/config.js");
class Movies {
  static getMovies = async (next) => {
    const findQuery = `SELECT * FROM movies`;
    try {
      const data = await pool.query(findQuery);
      return data.rows;
    } catch (err) {
      next(err);
    }
  };
  static getMoviesById = async (id, next) => {
    const findQuery = `SELECT * FROM movies WHERE id=$1`;
    try {
      const data = await pool.query(findQuery, [id]);
      if (data.rows.length === 0) {
        next({ name: "ErrorNotFound" });
      } else {
        return data.rows;
      }
    } catch (err) {
      next(err);
    }
  };
  static addMovie = async (params, next) => {
    try {
      const { id, title, genres, year } = params;
      const insertQuery = `INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4) RETURNING *`;
      const data = await pool.query(insertQuery, [id, title, genres, year]);
      return data.rows[0];
    } catch (err) {
      next(err);
    }
  };
  static deleteMovie = async (id, next) => {
    try {
      // console.log(id);
      const deleteQuery = `DELETE FROM movies WHERE id=$1`;
      const data = await pool.query(deleteQuery, [id]);
      return data.rows[0];
    } catch (err) {
      next(err);
    }
  };
}

module.exports = Movies;
