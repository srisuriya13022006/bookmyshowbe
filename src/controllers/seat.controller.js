const Seat = require('../models/Seat');

// Initialize seats for a show
exports.initSeats = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    const seatDocs = seats.map(seatNumber => ({
      showId,
      seatNumber
    }));

    await Seat.insertMany(seatDocs);

    res.status(201).json({ message: 'Seats initialized successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get seats for a show
exports.getSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const seats = await Seat.find({ showId });
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

