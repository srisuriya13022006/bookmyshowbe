const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const Seat = require('../models/Seat');

exports.makePayment = async (req, res) => {
  try {
    const { bookingId, amount, status } = req.body;

    // Save payment
    await Payment.create({ bookingId, amount, status });

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (status === 'SUCCESS') {
      // Book seats permanently
      await Seat.updateMany(
        {
          showId: booking.showId,
          seatNumber: { $in: booking.seats }
        },
        { status: 'BOOKED' }
      );

      booking.status = 'CONFIRMED';
      await booking.save();

      return res.json({ message: 'Payment successful, booking confirmed' });
    }

    // Payment failed → release seats
    await Seat.updateMany(
      {
        showId: booking.showId,
        seatNumber: { $in: booking.seats }
      },
      {
        status: 'AVAILABLE',
        lockedBy: null,
        lockTime: null
      }
    );

    res.json({ message: 'Payment failed, seats released' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
