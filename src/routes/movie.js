const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

router.post('/', movieController.addMovie);
router.get('/', movieController.getMovies);
router.get('/all', movieController.getAllMovies);

module.exports = router;
