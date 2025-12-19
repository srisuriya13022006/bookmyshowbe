const Show = require('../models/Show');
const Seat = require('../models/Seat');

// ✅ GET shows by movie
exports.getShowsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const shows = await Show.find({ movieId });
    res.json(shows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ ADD show + auto-generate seats
exports.addShow = async (req, res) => {
  try {
    const { movieId, theater, time, totalSeats } = req.body;

    if (!movieId || !theater || !time || !totalSeats) {
      return res.status(400).json({ message: 'Invalid show data' });
    }

    // 1️⃣ Create show
    const show = await Show.create({
      movieId,
      theater,
      time,
      totalSeats
    });

    // 2️⃣ Auto-generate seats
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push({
        showId: show._id,
        seatNumber: `A${i}`,
        status: 'AVAILABLE'
      });
    }

    await Seat.insertMany(seats);

    res.status(201).json({
      message: 'Show created and seats initialized',
      showId: show._id
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
