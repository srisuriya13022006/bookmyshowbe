const Seat = require('../models/Seat');
const Booking = require('../models/Booking');

// Lock seats & create booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, showId, seats } = req.body;

    // Check seat availability
    const availableSeats = await Seat.find({
      showId,
      seatNumber: { $in: seats },
      status: 'AVAILABLE'
    });

    if (availableSeats.length !== seats.length) {
      return res.status(400).json({ message: 'Some seats already booked or locked' });
    }

    // Lock seats
    await Seat.updateMany(
      { showId, seatNumber: { $in: seats } },
      {
        status: 'LOCKED',
        lockedBy: userId,
        lockTime: new Date()
      }
    );

    const booking = await Booking.create({
      userId,
      showId,
      seats
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
