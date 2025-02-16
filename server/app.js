const express = require('express');
require('express-async-errors');

require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const hotelRoute = require('./routes/hotelRoute');
const roomRouter = require('./routes/roomRoute');
const reservationRouter = require('./routes/reservationRoute');
const pagination = require('./routes/pagination');
const facilities = require('./routes/facilitiesRoute');
// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/hotel', hotelRoute);
app.use('/api/v1/room', roomRouter);
app.use('/api/v1/reservation', reservationRouter);
app.use('/api/v1/pagination', pagination);
app.use('/api/v1/facilities', facilities);

app.use((err, req, res, next) => {
  res.status(err.statusCode);
  res.json({ error: err.message });
});

const port = process.env.BE_PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
