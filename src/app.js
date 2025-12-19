const express = require('express');
//const cors = require('cors');

const app = express();

// 🔥 ENABLE CORS
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',                 // local dev
  'https://bookmyshow-gray-nine.vercel.app' // vercel prod
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests from Postman / curl
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
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
