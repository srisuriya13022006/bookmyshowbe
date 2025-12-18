const express = require('express');
const router = express.Router();
const showController = require('../controllers/show.controller');

router.post('/', showController.addShow);
router.get('/:movieId', showController.getShows);

module.exports = router;
