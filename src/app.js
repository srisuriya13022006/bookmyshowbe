const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('BookMyShow Backend Running');
});
app.use('/api/movies', require('./routes/movie'));
app.use('/api/shows', require('./routes/show'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/seats', require('./routes/seat'));
app.use('/api/payments', require('./routes/payment'));

module.exports = app;
