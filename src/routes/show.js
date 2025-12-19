const express = require('express');
const router = express.Router();
const showController = require('../controllers/show.controller');

router.get('/:movieId', showController.getShowsByMovie);
router.post('/', showController.addShow);

module.exports = router;
