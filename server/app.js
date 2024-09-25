const express = require('express');
require('express-async-errors');

require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
const authRouter = require('./routes/authRoute');

// Routes
app.use('/api/v1/auth', authRouter);

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
