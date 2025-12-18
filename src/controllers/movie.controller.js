const Movie = require('../models/Movie');

// Add Movie
exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Movies by City
exports.getMovies = async (req, res) => {
  try {
    const { city } = req.query;
    const movies = await Movie.find({ city });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
