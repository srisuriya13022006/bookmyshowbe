const Show = require('../models/Show');

// Add Show
exports.addShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);
    res.status(201).json(show);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Shows for a Movie
exports.getShows = async (req, res) => {
  try {
    const { movieId } = req.params;
    const shows = await Show.find({ movieId });
    res.json(shows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
