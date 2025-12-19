const express = require('express');
const cors = require('cors');

const app = express();

// 🔥 ENABLE CORS
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movie'));
app.use('/api/shows', require('./routes/show'));
app.use('/api/seats', require('./routes/seat'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/payments', require('./routes/payment'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.send('BookMyShow Backend Running');
});

module.exports = app;
