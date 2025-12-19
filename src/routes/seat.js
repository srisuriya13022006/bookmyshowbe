const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seat.controller');

router.post('/init', seatController.initSeats);
router.get('/:showId', seatController.getSeats);

module.exports = router;
